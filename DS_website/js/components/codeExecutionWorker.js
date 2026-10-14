const SQL_JS_VERSION = '1.13.0';

function restrictNetworkAccess() {
  const blocked = () => {
    throw new Error('Network access is disabled in the student-code sandbox.');
  };
  self.fetch = blocked;
  self.importScripts = blocked;
  self.XMLHttpRequest = undefined;
  self.WebSocket = undefined;
  self.EventSource = undefined;
  self.Worker = undefined;
  self.SharedWorker = undefined;
}

function printable(value) {
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

async function executeJavaScript(code, standardInput) {
  restrictNetworkAccess();
  const lines = [];
  const write = (...values) => lines.push(values.map(printable).join(' '));
  const consoleOutput = { log: write, info: write, warn: write, error: write, debug: write };
  const inputLines = standardInput.split(/\r?\n/);
  const prompt = message => {
    if (message) write(message);
    if (inputLines.length === 0) throw new Error('Input Error: prompt() needs another value from Standard Input.');
    return inputLines.shift();
  };
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
  const execute = new AsyncFunction('console', 'prompt', code);
  await execute(consoleOutput, prompt);
  return lines.join('\n') || '(Program executed successfully with no output returned.)';
}

async function executeSql(code, version) {
  importScripts(`https://cdnjs.cloudflare.com/ajax/libs/sql.js/${version}/sql-wasm.js`);
  const SQL = await initSqlJs({
    locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/${version}/${file}`
  });
  restrictNetworkAccess();

  const database = new SQL.Database();
  try {
    database.run(`
      CREATE TABLE sample_students (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        subject TEXT NOT NULL,
        marks INTEGER NOT NULL
      );
      INSERT INTO sample_students (name, subject, marks) VALUES
        ('Aarav', 'Statistics', 88),
        ('Meera', 'Python', 94),
        ('Ishaan', 'Databases', 81);
    `);
    const results = database.exec(code);
    const output = results.length
      ? results.map(result => {
        const rows = result.values.slice(0, 500);
        const body = rows.map(row => row.map(value => value === null ? 'NULL' : String(value)).join(' | ')).join('\n');
        const truncated = result.values.length > rows.length ? `\n... ${result.values.length - rows.length} more rows omitted` : '';
        return [result.columns.join(' | '), body, truncated].filter(Boolean).join('\n');
      }).join('\n\n')
      : 'Query executed successfully. No rows returned.';

    return `Sample database: sample_students (id, name, subject, marks)\n\n${output}`;
  } finally {
    database.close();
  }
}

self.onmessage = async event => {
  const { id, language, code, standardInput, sqlJsVersion } = event.data || {};
  try {
    const output = language === 'JavaScript'
      ? await executeJavaScript(code, standardInput || '')
      : await executeSql(code, sqlJsVersion || SQL_JS_VERSION);
    self.postMessage({ id, success: true, output });
  } catch (error) {
    self.postMessage({ id, success: false, output: error?.stack || error?.message || String(error) });
  }
};
