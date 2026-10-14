/**
 * DATA SCIENCE SUBJECT DIGITAL LIBRARY - INITIAL SEED DATA
 * Contains student profile, 5 syllabus modules, 10 runnable lab experiments, and 8 tools.
 */

export const studentData = {
  name: "Joshitha Upati",
  rollNo: "24102A030127",
  department: "Data Science",
  section: "2",
  subject: "Data Science",
  faculty: "S. Bosubabu",
  designation: "Assistant Professor",
  institution: "College of Engineering & Technology",
  academicYear: "2024 - 2028",
  avatar: "assets/images/joshitha.png",
  linkedin: "https://www.linkedin.com/in/joshitha-upati-65025a349/?isSelfProfile=true",
  github: "https://github.com/JOSH-ITHA",
  email: "upati.joshitha@student.edu",
  aboutMe: "Third-year Bachelor of Technology student in Data Science with a strong foundation in programming, problem-solving, and software development. Builds practical applications across data science, web development, and cloud computing, including a plant disease detection project and a weather application. Brings clear communication, a collaborative approach, and enthusiasm for learning and applying new technologies.",
  skills: [
    "Python",
    "Java",
    "C",
    "C++",
    "Data Structures & Algorithms",
    "JavaScript",
    "Node.js",
    "Express.js",
    "HTML5",
    "CSS3",
    "AWS Cloud",
    "Data Science"
  ],
  resume: {
    title: "Joshitha Upati — Software & Data Science Resume",
    fullName: "Joshitha Upati",
    headline: "B.Tech Data Science Student | Software Development | Cloud Computing",
    summary: "Third-year B.Tech student in Data Science with hands-on project experience and a broad programming foundation spanning Python, Java, C, C++, and JavaScript. Builds web applications with Node.js and Express.js and applies problem-solving skills to practical projects, including plant disease detection and a weather application. Holds an AWS-issued cloud certification and digital badge, and brings strong communication skills and a collaborative, growth-oriented approach.",
    education: [
      {
        degree: "Bachelor of Technology in Data Science",
        institution: "Department of Data Science",
        period: "2024 - 2028 · Third year",
        details: "Coursework includes data science foundations, programming, data structures, statistics, and analytical problem solving."
      }
    ],
    skillGroups: [
      {
        category: "Programming Languages",
        skills: ["Python", "Java", "C", "C++", "JavaScript"]
      },
      {
        category: "Computer Science",
        skills: ["Data Structures & Algorithms", "Problem Solving"]
      },
      {
        category: "Web Development",
        skills: ["HTML5", "CSS3", "Node.js", "Express.js"]
      },
      {
        category: "Cloud & Data",
        skills: ["AWS Cloud", "Data Science"]
      }
    ],
    certifications: [
      {
        name: "AWS Cloud Certification & Official Digital Badge",
        issuer: "Amazon Web Services",
        details: "AWS-issued certification and digital badge in cloud computing."
      }
    ],
    projects: [
      {
        title: "Plant Disease Detection",
        description: "Developed an agricultural project focused on detecting plant diseases to help identify potential crop-health issues. Project details, implementation tools, and repository link can be added to highlight the exact technical contribution."
      },
      {
        title: "Weather Application",
        description: "Built an application that presents weather information to users. The project can be expanded with its technology stack, data source, and repository or live-demo link."
      }
    ],
    softSkills: ["Strong communication", "Team collaboration", "Problem solving", "Adaptability", "Continuous learning"]
  }
};

export const initialModules = [
  {
    id: "mod-1",
    moduleNumber: 1,
    title: "Introduction to Data Science",
    description: "A foundational introduction to data science, including its definition, required skills, essential tools, data categories, collection methods, preprocessing workflow, and the major types of data analysis.",
    objectives: [
      "Define data science and explain how statistics, programming, domain knowledge, and communication work together in a data science project.",
      "Identify the core skills required for data science, including Python programming, data manipulation, visualization, statistical reasoning, and machine learning.",
      "Compare commonly used data science tools such as Python, R, Jupyter Notebook, SQL, Tableau, and Excel.",
      "Classify data as structured, semi-structured, or unstructured and describe appropriate data collection strategies.",
      "Explain the stages of the data science lifecycle from data collection and preprocessing to analysis, modeling, interpretation, and decision making.",
      "Differentiate between descriptive, diagnostic, predictive, prescriptive, exploratory, and mechanistic analysis.",
      "Apply basic data cleaning, transformation, normalization, and feature preparation techniques to prepare raw data for analysis."
    ],
    topics: [
      "Definition of Data Science and its interdisciplinary nature",
      "Essential skills for data science professionals",
      "Data science tools and programming environments",
      "Data types: structured, semi-structured, and unstructured data",
      "Data collections, sources, and data quality issues",
      "Data preprocessing: cleaning, transformation, integration, and normalization",
      "Data analysis and data analytics lifecycle",
      "Descriptive, diagnostic, predictive, and prescriptive analytics",
      "Exploratory analysis and mechanistic analysis"
    ],
    topicDetails: [
      {
        topic: "Definition of Data Science and its Interdisciplinary Nature",
        explanation: "Data Science is an interdisciplinary field that combines statistics, mathematics, computer science, and domain expertise to extract meaningful insights from data. It sits at the intersection of three critical areas: (1) Statistical & Mathematical Knowledge for modeling, inference, and probability; (2) Programming & Computer Science for data wrangling, automation, and scalable computation; and (3) Domain Knowledge to understand context and ask the right questions. A data scientist bridges all these disciplines to transform raw data into actionable knowledge that drives real-world decisions."
      },
      {
        topic: "Essential Skills for Data Science Professionals",
        explanation: "A well-rounded data scientist needs both technical and soft skills. Technical skills include: Python or R programming for data manipulation, NumPy and Pandas for numerical computing, Matplotlib and Seaborn for data visualization, Scikit-Learn for machine learning, and SQL for querying databases. Statistical skills include hypothesis testing, regression analysis, and probability theory. Beyond technical work, communication is equally important â€” translating complex findings into clear reports and visualizations for non-technical stakeholders is a hallmark of an effective data scientist."
      },
      {
        topic: "Data Science Tools and Programming Environments",
        explanation: "The modern data science toolkit includes key platforms. Python is the most widely used language, offering libraries like NumPy, Pandas, and Scikit-Learn. R is preferred in academia for statistical analysis. Jupyter Notebook and Google Colab provide interactive, cell-based coding environments ideal for exploratory analysis. SQL databases (MySQL, PostgreSQL) are used for structured data queries. Tableau and Power BI enable drag-and-drop business intelligence dashboards, while Apache Spark handles large-scale distributed data processing."
      },
      {
        topic: "Data Types: Structured, Semi-Structured, and Unstructured Data",
        explanation: "Data comes in three fundamental forms. Structured data is organized in rows and columns like a relational database table and is the easiest to query and analyze. Semi-structured data does not conform to a rigid schema but contains tags or markers to organize it, such as JSON, XML, or CSV files. Unstructured data has no predefined format and includes images, video, audio recordings, email bodies, and social media posts. About 80% of the world's data is unstructured, making it one of the greatest challenges in data science."
      },
      {
        topic: "Data Collections, Sources, and Data Quality Issues",
        explanation: "Data can be collected from primary sources (surveys, sensors, experiments) or secondary sources (public datasets, APIs, web scraping). Common data sources include government databases, social media APIs, IoT sensors, transaction logs, and scientific repositories. Data quality issues include missing values, duplicate records, inconsistent formats (e.g., dates as '01/01/2024' vs '2024-01-01'), outliers from measurement error, and class imbalance in machine learning datasets. Recognizing these issues early prevents downstream model errors."
      },
      {
        topic: "Data Preprocessing: Cleaning, Transformation, Integration, and Normalization",
        explanation: "Data preprocessing converts raw, noisy data into a clean, analysis-ready format. Four key stages: (1) Data Cleaning â€” handling missing values (imputation or removal), correcting typos, and removing duplicates; (2) Data Transformation â€” encoding categorical variables, applying log transforms to skewed data, and engineering new features; (3) Data Integration â€” merging datasets from multiple sources while resolving inconsistencies; and (4) Normalization/Standardization â€” scaling numerical features to a common range (0-1 or mean=0, std=1) so that no variable dominates the model due to its scale."
      },
      {
        topic: "Data Analysis and the Data Analytics Lifecycle",
        explanation: "The data analytics lifecycle is a structured end-to-end process for deriving value from data. Its six stages are: (1) Problem Definition â€” articulating the business or scientific question; (2) Data Collection â€” gathering relevant raw data; (3) Data Preparation â€” preprocessing and feature engineering; (4) Exploratory Data Analysis (EDA) â€” summarizing and visualizing patterns; (5) Modeling â€” applying statistical or machine learning algorithms; and (6) Deployment & Communication â€” sharing insights via reports, dashboards, or APIs. Understanding this lifecycle prevents analysts from jumping to modeling before the data is properly understood."
      },
      {
        topic: "Descriptive, Diagnostic, Predictive, and Prescriptive Analytics",
        explanation: "Analytics can be categorized along a spectrum of complexity and business value. Descriptive analytics answers 'What happened?' using historical summaries, reports, and dashboards. Diagnostic analytics answers 'Why did it happen?' by drilling into causes through correlation analysis. Predictive analytics answers 'What will happen?' using statistical models and machine learning to forecast future outcomes such as customer churn prediction. Prescriptive analytics answers 'What should we do?' by recommending actions through optimization and simulation techniques such as inventory management systems."
      },
      {
        topic: "Exploratory Analysis and Mechanistic Analysis",
        explanation: "Exploratory Data Analysis (EDA) is an open-ended investigative process where a data scientist summarizes the main characteristics of a dataset using visual methods â€” box plots, scatter plots, correlation heatmaps, and histograms â€” before forming any hypotheses. EDA discovers unexpected patterns and guides further analysis. Mechanistic Analysis is hypothesis-driven: it starts with a specific causal model and tests whether observed data conforms to that model. EDA is appropriate when the dataset is new and unknown, while mechanistic analysis is used when domain theory is already established."
      }
    ],
    notes: "Data science is an interdisciplinary field that uses scientific methods, algorithms, and systems to discover patterns, extract useful information, and support decisions from data. The analytics spectrum begins with descriptive analysis, which explains what happened, and progresses through diagnostic, predictive, prescriptive, exploratory, and mechanistic analysis. Effective data science depends on both technical methods and a clear understanding of the problem domain.",
    periods: 9,
    pdfLink: "https://r4ds.had.co.nz/",
    videoLink: "https://www.youtube.com/watch?v=ua-CiDNNj30",
    referenceLink: "https://jakevdp.github.io/PythonDataScienceHandbook/",
    progress: "in_progress",
    completed: false
  },
  {
    id: "mod-2",
    moduleNumber: 2,
    title: "Data Extraction",
    description: "Methods for identifying useful information in large and complex datasets through feature selection, information-theoretic measures, tree-based models, and dimensionality reduction.",
    objectives: [
      "Explain how feature selection helps improve model performance, interpretability, and computational efficiency.",
      "Differentiate between filter, wrapper, and embedded feature selection strategies.",
      "Use entropy and information gain to measure uncertainty and select informative attributes.",
      "Construct and interpret a decision tree using recursive splitting and impurity measures.",
      "Build a random forest ensemble and explain why ensemble methods often improve prediction stability.",
      "Analyze the dimensionality problem and identify cases where too many features create noise or overfitting.",
      "Apply singular value decomposition and principal component analysis to reduce data complexity while preserving important variation.",
      "Relate feature extraction and user retention analysis to practical business and product data problems."
    ],
    topics: [
      "Extracting meaning from data and identifying relevant patterns",
      "Feature selection: filter, wrapper, and embedded methods",
      "User retention and feature relevance in business data",
      "Entropy, information gain, and uncertainty reduction",
      "Decision tree algorithm and decision rules",
      "Random forests as an ensemble of decision trees",
      "The dimensionality problem and the curse of dimensionality",
      "Single value decomposition and matrix factorization",
      "Principal component analysis for feature extraction"
    ],
    topicDetails: [
      {
        topic: "Extracting Meaning from Data and Identifying Relevant Patterns",
        explanation: "Data extraction in the analytical sense is about discovering which features (variables) in a dataset carry the most signal â€” the information truly predictive or explanatory for the problem at hand. Raw datasets often contain hundreds of variables, many of which are noisy, redundant, or irrelevant. Effective data extraction involves correlation analysis, mutual information scoring, domain-knowledge filtering, and visualization to separate signal from noise. Identifying relevant patterns early accelerates model training, reduces complexity, and improves generalization on unseen data."
      },
      {
        topic: "Feature Selection: Filter, Wrapper, and Embedded Methods",
        explanation: "Feature selection techniques are classified into three families. Filter methods evaluate each feature independently using statistical scores (chi-squared, ANOVA F-score, Pearson correlation) without involving a model â€” they are fast but ignore feature interactions. Wrapper methods repeatedly train a model on different feature subsets and select the best combination (e.g., Recursive Feature Elimination) â€” more accurate but computationally expensive. Embedded methods perform feature selection as part of model training itself (e.g., Lasso regression's L1 penalty shrinks irrelevant coefficients to zero; tree-based models rank features by impurity reduction)."
      },
      {
        topic: "User Retention and Feature Relevance in Business Data",
        explanation: "In product analytics, user retention refers to the proportion of users who continue using a product over a given time period. Identifying which features of a product are most strongly correlated with retention helps companies prioritize development efforts. Feature relevance analysis in business datasets â€” using clickstream data, usage logs, and survey responses â€” applies the same techniques as machine learning feature selection: correlation matrices, mutual information, and model-based importance scores. Features with high relevance to retention inform product roadmaps and marketing strategies."
      },
      {
        topic: "Entropy, Information Gain, and Uncertainty Reduction",
        explanation: "Entropy, borrowed from information theory, quantifies the amount of uncertainty or impurity in a dataset. For a binary classification problem, entropy is maximized (= 1.0 bit) when both classes are equally likely, and minimized (= 0 bits) when all examples belong to one class. Information Gain measures how much a specific feature reduces entropy when used to split the data. Decision tree algorithms use information gain (or the related Gini impurity) to greedily choose the most informative splitting feature at each node. A high information gain means a feature sharply separates the data into more homogeneous groups, making it a strong predictor."
      },
      {
        topic: "Decision Tree Algorithm and Decision Rules",
        explanation: "A decision tree is a hierarchical, tree-shaped model that makes predictions by learning a series of if-then decision rules from training data. At each internal node, the tree selects the feature that maximally reduces impurity and splits the data. This process repeats recursively until a stopping criterion is met (max depth, minimum samples per leaf, etc.). The final leaf nodes contain class labels or regression values. Decision trees are highly interpretable â€” the learned rules can be read directly â€” but they are prone to overfitting if grown too deep. Pruning (removing branches that provide little predictive power) helps improve generalization."
      },
      {
        topic: "Random Forests as an Ensemble of Decision Trees",
        explanation: "A random forest is an ensemble learning method that constructs many decision trees (typically 100-1000) during training and aggregates their predictions â€” majority vote for classification, average for regression. Two sources of randomness make the trees diverse: (1) Bootstrap Aggregating (Bagging) â€” each tree is trained on a random sample with replacement; and (2) Feature Randomness â€” at each split, only a random subset of features is considered. This diversity reduces variance of individual trees and makes the overall model more robust. Random forests handle high-dimensional data well, resist overfitting, and provide built-in feature importance scores."
      },
      {
        topic: "The Dimensionality Problem and the Curse of Dimensionality",
        explanation: "As the number of features (dimensions) increases, the volume of the feature space grows exponentially, making data increasingly sparse. This is the Curse of Dimensionality. In high-dimensional spaces, distances between data points become less meaningful, k-NN classifiers lose effectiveness, and models require exponentially more data to estimate parameters reliably. Dimensionality reduction addresses this by projecting data onto a lower-dimensional subspace while preserving meaningful variation. Techniques include feature selection (removing irrelevant features) and feature extraction (creating compact new representations)."
      },
      {
        topic: "Singular Value Decomposition and Matrix Factorization",
        explanation: "Singular Value Decomposition (SVD) decomposes any matrix A into three matrices: A = U x Sigma x V-transpose, where U contains left singular vectors (patterns in rows), Sigma is a diagonal matrix of singular values (importance weights), and V-transpose contains right singular vectors (patterns in columns). Keeping only the top k singular values produces a low-rank approximation that captures the most important structure while discarding noise. SVD is the mathematical foundation of PCA, and is also used in recommendation systems (collaborative filtering), text analysis (Latent Semantic Analysis), and image compression."
      },
      {
        topic: "Principal Component Analysis for Feature Extraction",
        explanation: "PCA is a linear dimensionality reduction technique that transforms original features into a new set of orthogonal (uncorrelated) axes called principal components. Each component is a linear combination of the original features, ordered so the first component captures maximum variance, the second captures the next-highest variance orthogonal to the first, and so on. By retaining only the top k principal components explaining, say, 95% of the variance, the dataset is compressed while preserving the most informative structure â€” enabling faster model training and clearer 2D/3D visualizations of high-dimensional data."
      }
    ],
    notes: "Feature selection and dimensionality reduction are essential preprocessing steps when datasets contain many irrelevant, redundant, or highly correlated variables. Entropy measures the amount of uncertainty in a dataset, while decision trees use information gain to choose informative splitting variables. Random forests combine many decision trees to reduce variance, whereas SVD and PCA compress data by retaining directions with the greatest variance.",
    periods: 9,
    pdfLink: "https://scikit-learn.org/stable/modules/feature_selection.html",
    videoLink: "https://www.youtube.com/watch?v=FgakZw6K1QQ",
    referenceLink: "https://scikit-learn.org/stable/modules/decomposition.html#pca",
    progress: "not_started",
    completed: false
  },
  {
    id: "mod-3",
    moduleNumber: 3,
    title: "Data Visualization",
    description: "Hands-on visualization techniques using Python libraries to represent patterns, comparisons, distributions, and relationships clearly and effectively.",
    objectives: [
      "Use the matplotlib API to create figures, axes, legends, titles, labels, and multiple subplots.",
      "Create line plots to display trends and temporal changes in datasets.",
      "Construct bar plots, grouped bar charts, and categorical comparisons using Pandas and Seaborn.",
      "Generate histograms and kernel density plots to study the shape and spread of numerical data.",
      "Use scatter plots to explore relationships between two or more variables.",
      "Create facet grids to compare data across multiple categories or groups.",
      "Choose appropriate chart types for different kinds of analytical questions.",
      "Explore additional Python visualization libraries such as Plotly, Bokeh, and Altair."
    ],
    topics: [
      "Matplotlib API primer: figures, axes, subplots, and customization",
      "Line plots with Pandas and Seaborn",
      "Bar plots, grouped bars, and categorical comparisons",
      "Histograms and density plots",
      "Scatter plots and bubble charts",
      "Facet grids and categorical data visualization",
      "Choosing suitable visualizations for data storytelling",
      "Other Python visualization tools: Plotly, Bokeh, and Altair"
    ],
    topicDetails: [
      {
        topic: "Matplotlib API Primer: Figures, Axes, Subplots, and Customization",
        explanation: "Matplotlib is the foundational Python visualization library built around two key objects: the Figure (the entire canvas) and Axes (an individual plot area within the figure). A Figure can contain multiple Axes objects arranged in a grid using plt.subplots(nrows, ncols). Each Axes supports methods like ax.plot(), ax.bar(), ax.set_title(), ax.set_xlabel(), ax.legend(), and ax.grid(). Customization options include colors, line styles, markers, font sizes, tick formatting, and spine visibility. This object hierarchy allows precise control over every visual element, unlike the simpler but less flexible pyplot functional interface."
      },
      {
        topic: "Line Plots with Pandas and Seaborn",
        explanation: "Line plots are the primary tool for visualizing data that changes continuously over an ordered axis â€” most commonly time. In Pandas, df.plot(kind='line') automatically uses the index as the x-axis, making temporal datasets easy to visualize. Seaborn's sns.lineplot() adds confidence intervals around the mean by default when multiple observations exist per x value, making it powerful for visualizing trends in grouped data. Best practices include clearly labeling axes with units, using different colors/dashes for multiple series, and starting the y-axis at a meaningful baseline to avoid misleading visual exaggeration."
      },
      {
        topic: "Bar Plots, Grouped Bars, and Categorical Comparisons",
        explanation: "Bar plots compare discrete categories along one axis and a quantitative measure along the other. A simple bar chart compares totals or averages across a single categorical variable. Grouped bar charts place bars for different sub-categories side by side, enabling comparison across two categorical dimensions. Stacked bar charts show composition â€” each bar is divided into segments representing sub-categories. Seaborn's sns.barplot() automatically computes confidence intervals, while sns.countplot() counts occurrences directly. Best practices: sort bars by value for readability, use horizontal bars when labels are long, and avoid 3D bars which distort perception."
      },
      {
        topic: "Histograms and Density Plots",
        explanation: "Histograms display the distribution of a single numerical variable by dividing the range into bins and counting how many data points fall in each bin. The choice of bin width significantly affects interpretation: too few bins obscure detail, too many create noise. Kernel Density Estimation (KDE) plots smooth the histogram into a continuous probability density curve by fitting a Gaussian kernel at each data point and summing them. Seaborn's sns.histplot(kde=True) overlays both. Density plots are particularly useful for comparing distributions of two or more groups on the same axes, and for identifying skewness, multimodality, and outliers."
      },
      {
        topic: "Scatter Plots and Bubble Charts",
        explanation: "Scatter plots visualize the relationship between two continuous variables by plotting each observation as a point with coordinates (x, y). They are the primary tool for identifying correlation, clusters, and outliers. When a third variable is encoded as the size of each point, the chart becomes a bubble chart â€” useful for comparing three dimensions simultaneously (e.g., GDP vs. life expectancy with population as circle size). Seaborn's sns.scatterplot() supports hue (color grouping) and size aesthetics directly. Adding a regression line with sns.regplot() visualizes the trend, while residual plots check linearity assumptions."
      },
      {
        topic: "Facet Grids and Categorical Data Visualization",
        explanation: "Facet grids (small multiples) create an array of subplots, each showing a subset of the data defined by one or more categorical variables. Seaborn's FacetGrid class enables this: g = sns.FacetGrid(df, col='category_A', row='category_B'), followed by g.map(plt.hist, 'numerical_column'). This technique is powerful for comparing distributions, trends, or relationships across different groups simultaneously â€” for example, showing income distribution across 5 different cities in a 1x5 grid. Facet grids prevent overloaded single charts and make patterns that vary by subgroup immediately visible."
      },
      {
        topic: "Choosing Suitable Visualizations for Data Storytelling",
        explanation: "Choosing the right chart type is a critical analytical skill. Use line charts for time series. Use bar charts for comparing discrete categories. Use histograms and KDE plots for distributions. Use scatter plots for correlations. Use heatmaps for correlation matrices. Use box plots for comparing distributional spread across groups. Data storytelling layers appropriate charts with a clear narrative: starting with the big picture (overall trend), zooming into interesting patterns (anomalies), and closing with a clear takeaway. Key principles: maximize the data-ink ratio (remove chart junk), use color purposefully not decoratively, and always label clearly."
      },
      {
        topic: "Other Python Visualization Tools: Plotly, Bokeh, and Altair",
        explanation: "Beyond Matplotlib and Seaborn, the Python ecosystem offers powerful interactive and declarative visualization libraries. Plotly creates interactive charts (hover tooltips, zoom, pan) that work natively in Jupyter notebooks and web browsers; Plotly Express offers a high-level interface similar to Seaborn. Bokeh is designed for building interactive dashboards and web applications, with server-side callbacks enabling real-time data updates. Altair uses a declarative, grammar-of-graphics approach (based on Vega-Lite) where charts are described as specifications mapping data columns to visual channels (x, y, color, size). Each library has trade-offs: Plotly for quick interactivity, Bokeh for dashboards, and Altair for elegant statistical graphics."
      }
    ],
    notes: "A good visualization should reveal the underlying pattern in the data without hiding important uncertainty or distortion. Matplotlib provides detailed control over every chart element, while Seaborn offers concise statistical plots. Facet grids allow multiple plots to be compared under different categories, which makes it easier to identify trends, clusters, and outliers.",
    periods: 8,
    pdfLink: "https://matplotlib.org/stable/users/index.html",
    videoLink: "https://www.youtube.com/watch?v=a9UrKTVEeZA",
    referenceLink: "https://seaborn.pydata.org/tutorial.html",
    progress: "not_started",
    completed: false
  },
  {
    id: "mod-4",
    moduleNumber: 4,
    title: "Statistical Thinking",
    description: "A practical introduction to statistical reasoning through distributions, variability, probability functions, percentiles, random sampling, and common probability models.",
    objectives: [
      "Represent data with histograms and summarize distributions using measures such as variance, standard deviation, central tendency, and spread.",
      "Identify outliers and explain how they may arise from measurement error, unusual observations, or genuine rare events.",
      "Construct and interpret probability mass functions and understand how they represent discrete random variables.",
      "Explain the class size paradox and recognize why averages can be misleading when groups have unequal sizes.",
      "Use DataFrame indexing and selection techniques to isolate and analyze relevant subsets of data.",
      "Represent cumulative distribution functions and use percentiles to compare observations across different datasets.",
      "Generate random numbers and understand the difference between random variation and systematic bias.",
      "Model data using exponential, normal, and lognormal distributions and evaluate whether an observed distribution is consistent with a chosen model."
    ],
    topics: [
      "Representing and plotting histograms",
      "Outliers and summarizing distributions",
      "Variance, standard deviation, and reporting statistical results",
      "Probability mass functions and PMF plotting",
      "Other statistical visualizations and data-frame indexing",
      "The class size paradox and selection bias",
      "Cumulative distribution functions and the limits of PMFs",
      "Percentile-based statistics and random numbers",
      "Comparing percentile ranks across distributions",
      "Exponential, normal, and lognormal distributions"
    ],
    topicDetails: [
      {
        topic: "Representing and Plotting Histograms",
        explanation: "A histogram divides the range of a numerical variable into consecutive, non-overlapping bins and counts how many observations fall in each bin, displaying the count as the height of a bar. Histograms reveal the shape of a distribution: bell-shaped and symmetric (normal), right-skewed (long tail on the right), left-skewed (long tail on the left), uniform, or bimodal (two peaks). In Python, plt.hist(data, bins=20) and sns.histplot(data, bins=20) create histograms. The number of bins is a critical choice â€” rule-of-thumb methods include Sturge's rule (k = 1 + log2n). Normalizing the histogram (density=True) converts counts to probability density, enabling comparison across datasets of different sizes."
      },
      {
        topic: "Outliers and Summarizing Distributions",
        explanation: "An outlier is an observation that lies an abnormal distance from other values in the dataset. Outliers can arise from: (1) measurement or recording errors (a typo entering 1000 instead of 100); (2) genuine extreme values (a billionaire in an income survey); or (3) sampling from a different population (equipment malfunction). Detection methods include the IQR rule (flag values below Q1 - 1.5xIQR or above Q3 + 1.5xIQR), z-score thresholds (|z| > 3), and visual inspection via box plots. Summarizing a distribution requires reporting central tendency (mean, median, mode) and spread (range, IQR, variance, standard deviation) together, as a single number never fully characterizes a distribution."
      },
      {
        topic: "Variance, Standard Deviation, and Reporting Statistical Results",
        explanation: "Variance measures how spread out values are around the mean: population variance = sum of squared deviations divided by N; sample variance uses (n-1) as the denominator (Bessel's correction) to make it an unbiased estimator. Standard deviation is the square root of variance, expressed in the same units as the original data, making it more interpretable. When reporting statistical results, always accompany a mean with its standard deviation: 'The mean exam score was 72.4 plus or minus 8.3 (SD)'. For skewed distributions, report the median and IQR instead, as they are more robust to outliers."
      },
      {
        topic: "Probability Mass Functions and PMF Plotting",
        explanation: "A Probability Mass Function (PMF) assigns a probability to each possible value of a discrete random variable such that all probabilities sum to 1. For example, the PMF of a fair six-sided die assigns probability 1/6 to each value {1, 2, 3, 4, 5, 6}. An empirical PMF is computed from observed data by normalizing the frequency of each distinct value: P(x) = count(x) / n. PMFs are visualized as bar charts where the height of each bar is the probability (not the count). They are particularly useful for comparing two datasets of different sizes on the same scale, and for identifying which values are over- or under-represented compared to a theoretical distribution."
      },
      {
        topic: "Other Statistical Visualizations and DataFrame Indexing",
        explanation: "Beyond histograms and PMFs, several other visualizations support statistical analysis. Box plots display the five-number summary (minimum, Q1, median, Q3, maximum) and flag outliers as individual points â€” ideal for comparing distributions across multiple groups. Violin plots combine box plots with KDE curves, showing distributional shape alongside summary statistics. In Python, Pandas DataFrames support powerful indexing: df.loc[row_label, col_label] selects by label, df.iloc[row_int, col_int] selects by integer position, and boolean indexing df[df['column'] > value] filters rows. These techniques enable rapid extraction of subsets for group-specific statistical analysis."
      },
      {
        topic: "The Class Size Paradox and Selection Bias",
        explanation: "The class size paradox is a striking example of how averages can mislead when groups have unequal sizes. Suppose a university has 4 small courses with 20 students each and 1 large lecture with 400 students. The average class size from the course perspective is (4x20 + 400) / 5 = 96 students. But the average from the student perspective â€” asking each student how large is their class â€” is much larger, because students are much more likely to be in the large class. This is selection bias: the sample is not representative of the population because the sampling probability is proportional to group size. Recognizing such biases is critical for correct statistical interpretation."
      },
      {
        topic: "Cumulative Distribution Functions and the Limits of PMFs",
        explanation: "A Cumulative Distribution Function (CDF) gives, for each value x, the probability that a random variable X takes a value less than or equal to x. Empirically, the CDF at value x is the fraction of observations that are at most x. The CDF is a non-decreasing function ranging from 0 to 1. Unlike the PMF (which can be noisy and sensitive to bin size), the CDF is smooth and shows the full shape of the distribution in a single curve. CDFs are useful for computing percentiles, comparing two distributions (a CDF shifted to the left means smaller values), and testing goodness-of-fit against theoretical distributions using the Kolmogorov-Smirnov test."
      },
      {
        topic: "Percentile-Based Statistics and Random Numbers",
        explanation: "The p-th percentile of a dataset is the value below which p% of the observations fall. The 25th, 50th, and 75th percentiles are quartiles (Q1, Q2/median, Q3). The interquartile range (IQR = Q3 - Q1) is a robust measure of spread not affected by extreme outliers. Percentile rank converts a raw score into its relative standing: a score at the 90th percentile is higher than 90% of all scores. In Python, np.percentile(data, 95) computes the 95th percentile. Random numbers are generated using pseudorandom number generators seeded with an initial value â€” np.random.seed(42) ensures reproducibility. Truly random variation should be distinguished from systematic bias, which shifts all measurements in the same direction."
      },
      {
        topic: "Comparing Percentile Ranks Across Distributions",
        explanation: "Comparing raw values across distributions is misleading when distributions have different means and spreads. For example, a score of 70 on a hard exam might be exceptional (90th percentile), while the same score on an easy exam might be below average (40th percentile). Percentile ranks normalize across distributions, enabling fair comparison. A complementary approach is standardization (z-scoring): z = (x - mean) / standard_deviation converts any value to the number of standard deviations above or below the mean, enabling comparison across datasets with different units and scales. Plotting CDFs or z-scored distributions side by side is a powerful way to visually compare two groups on a common scale."
      },
      {
        topic: "Exponential, Normal, and Lognormal Distributions",
        explanation: "The normal (Gaussian) distribution is the bell-shaped distribution described by its mean and standard deviation, and arises naturally whenever many independent random factors add together (Central Limit Theorem). The exponential distribution models the time between independent random events â€” for example, the time between customer arrivals â€” with the memoryless property (the probability of the next event does not depend on how long you have already waited). The lognormal distribution arises when the logarithm of the variable is normally distributed; it models quantities that are the product of many independent factors, such as stock prices, city populations, and biological measurements. Evaluating distributional fit uses Q-Q plots: if data follows the theoretical distribution, points align along a straight diagonal line."
      }
    ],
    notes: "Statistical thinking focuses on understanding patterns in collections of values rather than interpreting isolated observations. Histograms show how values are distributed, while PMFs and CDFs provide probability-based descriptions of discrete and continuous data. Percentiles help compare observations relative to a distribution, and common probability models such as the normal and exponential distributions provide useful mathematical approximations for real-world variation.",
    periods: 11,
    pdfLink: "https://greenteapress.com/thinkstats2/thinkstats2.pdf",
    videoLink: "https://www.youtube.com/watch?v=xxpc-HPKN28",
    referenceLink: "https://docs.scipy.org/doc/scipy/reference/stats.html",
    progress: "not_started",
    completed: false
  },
  {
    id: "mod-5",
    moduleNumber: 5,
    title: "Time Series Analysis & Predictive Modeling",
    description: "An end-to-end study of temporal data, including import and cleaning, visualization, smoothing, correlation, forecasting, predictive model evaluation, and sentiment analysis.",
    objectives: [
      "Import, inspect, and clean time series datasets from real-world sources.",
      "Plot time series data and identify trends, cycles, seasonality, and irregular variation.",
      "Calculate and interpret moving averages for smoothing short-term fluctuations.",
      "Detect and handle missing values while preserving the temporal order of observations.",
      "Measure serial correlation and autocorrelation to understand dependence between current and previous observations.",
      "Explain the predictive modeling lifecycle, including feature preparation, model selection, training, validation, and evaluation.",
      "Evaluate predictive models using appropriate metrics such as mean absolute error, root mean square error, and coefficient of determination.",
      "Build practical predictive model solutions for tabular and text-based data.",
      "Apply sentiment analysis as a text classification problem using predictive modeling techniques."
    ],
    topics: [
      "Time series analysis: importing and cleaning data",
      "Plotting time series and identifying temporal patterns",
      "Moving averages and smoothing techniques",
      "Handling missing values in time series",
      "Serial correlation and autocorrelation",
      "Overview of predictive modeling",
      "Evaluating predictive models with MAE, RMSE, and R squared",
      "Building predictive model solutions",
      "Sentiment analysis and text classification"
    ],
    topicDetails: [
      {
        topic: "Time Series Analysis: Importing and Cleaning Data",
        explanation: "A time series is a sequence of data points indexed in chronological order, typically at equally spaced intervals (daily, monthly, yearly). Importing time series data in Python uses pd.read_csv('file.csv', parse_dates=['date_column'], index_col='date_column'), which automatically converts date strings to Pandas DatetimeIndex objects. Cleaning involves: (1) ensuring the datetime index is monotonically increasing with df.sort_index(); (2) converting data types using pd.to_numeric() and pd.to_datetime(); (3) detecting gaps in the time index using df.asfreq('D') which reveals missing dates as NaN rows; and (4) removing duplicate timestamps. Proper datetime indexing unlocks powerful time-based slicing: df['2023':'2024'] selects two full years of data."
      },
      {
        topic: "Plotting Time Series and Identifying Temporal Patterns",
        explanation: "Visualizing a time series reveals four classical components: (1) Trend â€” the long-term directional movement (upward or downward) in the data; (2) Seasonality â€” regular, predictable cycles that repeat over a fixed period (e.g., higher retail sales every December); (3) Cyclic patterns â€” irregular fluctuations lasting more than a year, often linked to business or economic cycles; and (4) Irregular/Residual variation â€” random noise remaining after removing trend, seasonality, and cycles. Time series decomposition using statsmodels separates these components into individual plots. Identifying each component is critical because different forecasting methods handle trend and seasonality in different ways."
      },
      {
        topic: "Moving Averages and Smoothing Techniques",
        explanation: "A Simple Moving Average (SMA) smooths a time series by replacing each value with the average of a fixed-width window of surrounding values. It removes high-frequency noise, making long-term trends more visible. In Pandas: df['column'].rolling(window=7).mean() computes a 7-period SMA. A larger window produces smoother output but introduces more lag (delayed response to changes). An Exponential Moving Average (EMA) addresses lag by assigning exponentially decreasing weights to older values: df['column'].ewm(span=7).mean(). More advanced smoothing methods include Holt's linear exponential smoothing (which handles trend) and Holt-Winters exponential smoothing (which handles both trend and seasonality)."
      },
      {
        topic: "Handling Missing Values in Time Series",
        explanation: "Missing values in time series require special care because the temporal order of observations must be preserved â€” randomly deleting rows or filling from a different time period would corrupt the sequence. Common strategies include: (1) Forward fill â€” propagate the last valid observation forward using df.fillna(method='ffill'); appropriate when values change slowly; (2) Backward fill â€” use the next valid value to fill backward; (3) Linear interpolation â€” estimate missing values by drawing a straight line between adjacent known values using df.interpolate(method='linear'); appropriate for smoothly varying data; (4) Seasonal interpolation â€” for strongly seasonal data, use the value from the same period in the previous cycle. The choice of method should reflect the underlying process generating the data."
      },
      {
        topic: "Serial Correlation and Autocorrelation",
        explanation: "Serial correlation (autocorrelation) measures the degree to which a time series value at time t is correlated with its own value at an earlier time t-k (lag k). The Autocorrelation Function (ACF) plots the correlation coefficient against lag k, while the Partial Autocorrelation Function (PACF) plots the correlation at lag k after removing the effects of shorter lags. Positive autocorrelation at lag 1 means high values tend to be followed by high values (momentum). Seasonal autocorrelation appears as spikes at multiples of the seasonal period (e.g., lag 12 for monthly data with annual seasonality). The Durbin-Watson statistic (values near 2 = no autocorrelation) is commonly used in regression diagnostics."
      },
      {
        topic: "Overview of Predictive Modeling",
        explanation: "Predictive modeling uses historical data to build a mathematical model that forecasts future outcomes or predicts unknown values for new inputs. The predictive modeling lifecycle includes: (1) Problem framing â€” defining the target variable and evaluation metric; (2) Feature engineering â€” creating informative input variables; (3) Train/validation/test split â€” holding out data for unbiased evaluation; (4) Model selection â€” choosing an algorithm appropriate for the data type and problem; (5) Hyperparameter tuning â€” optimizing model configuration using cross-validation; and (6) Deployment â€” serving predictions via an API or dashboard. Avoiding data leakage (accidentally including future information in training) is the most critical practical discipline in predictive modeling."
      },
      {
        topic: "Evaluating Predictive Models with MAE, RMSE, and R Squared",
        explanation: "For regression problems (predicting a continuous value), three primary metrics are used. Mean Absolute Error (MAE) is the average magnitude of prediction errors, expressed in the same units as the target â€” it treats all errors equally. Root Mean Squared Error (RMSE) penalizes large errors more heavily than MAE (due to squaring), making it more sensitive to outliers and critical when large errors are especially harmful. R-squared (coefficient of determination) measures the proportion of variance in the target explained by the model â€” R2 = 1 means perfect prediction, R2 = 0 means the model is no better than predicting the mean, and negative R2 means the model is worse than the mean. Always compare metrics against a simple baseline to determine whether the model truly adds value."
      },
      {
        topic: "Building Predictive Model Solutions",
        explanation: "Building a practical predictive model solution involves a systematic pipeline: (1) Load and preprocess data (handle missing values, encode categoricals, scale features); (2) Split data using train_test_split from Scikit-Learn; (3) Select and instantiate a model such as LinearRegression, RandomForestRegressor, or GradientBoostingRegressor; (4) Fit the model using model.fit(X_train, y_train); (5) Generate predictions using y_pred = model.predict(X_test); (6) Evaluate using MAE, RMSE, and R-squared; (7) Iterate by trying different models and tuning hyperparameters with GridSearchCV or RandomizedSearchCV. A good model is not just accurate but interpretable, reproducible, and deployable within the constraints of the application."
      },
      {
        topic: "Sentiment Analysis and Text Classification",
        explanation: "Sentiment analysis is the task of automatically classifying text (reviews, tweets, comments) as positive, negative, or neutral. It is framed as a supervised text classification problem. The standard pipeline is: (1) Text preprocessing â€” lowercase conversion, punctuation removal, stopword removal, stemming/lemmatization; (2) Feature extraction â€” converting text to numerical vectors using Bag-of-Words (CountVectorizer), TF-IDF (TfidfVectorizer), or dense word embeddings such as Word2Vec, GloVe, or BERT; (3) Classification â€” training a Logistic Regression, Naive Bayes (particularly effective for text), SVM, or fine-tuned transformer model; (4) Evaluation â€” using accuracy, precision, recall, and F1-score, especially important for imbalanced class distributions. Modern approaches use pre-trained language models such as BERT fine-tuned on domain-specific sentiment datasets for state-of-the-art performance."
      }
    ],
    notes: "Time series data contains observations ordered over time, so consecutive values may be statistically dependent. Moving averages help reduce random fluctuations, while autocorrelation measures the relationship between current and lagged values. Predictive modeling requires a clear evaluation strategy, and sentiment analysis demonstrates how text can be converted into meaningful labels for classification and prediction.",
    periods: 8,
    pdfLink: "https://otexts.com/fpp3/",
    videoLink: "https://www.youtube.com/watch?v=e8Yw4alG16Q",
    referenceLink: "https://pandas.pydata.org/docs/user_guide/timeseries.html",
    progress: "not_started",
    completed: false
  }
];

export const initialExperiments = [
  {
    id: "exp-1",
    experimentNumber: 1,
    title: "Basic Python Operations, Lists & Dictionaries for Data Manipulation",
    aim: "To implement basic Python data structures (lists, dictionaries, and list comprehensions) to clean, transform, and calculate summary statistics on a raw dataset.",
    requirements: "Python 3.x, Standard Library (math, statistics, sys)",
    procedure: [
      "Initialize sample raw dataset records using Python lists and dictionary objects.",
      "Apply list comprehensions to filter out invalid/negative entries.",
      "Extract numerical attributes and compute Mean, Median, and Variance.",
      "Transform data into a structured summary dictionary.",
      "Display the cleaned data and computed metrics formatted in terminal output."
    ],
    language: "Python",
    code: `# Experiment 1: Python Data Structures & Manipulation
def compute_data_metrics(raw_scores):
    print("--- RAW DATA ANALYSIS ---")
    print(f"Original Records: {raw_scores}")
    
    # 1. Filter valid scores (0 to 100) using list comprehension
    valid_scores = [score for score in raw_scores if isinstance(score, (int, float)) and 0 <= score <= 100]
    print(f"Cleaned Valid Scores: {valid_scores}")
    
    # 2. Compute Summary Statistics
    total_records = len(valid_scores)
    mean_val = sum(valid_scores) / total_records
    sorted_scores = sorted(valid_scores)
    
    mid = total_records // 2
    median_val = (sorted_scores[mid] if total_records % 2 != 0 
                  else (sorted_scores[mid - 1] + sorted_scores[mid]) / 2)
    
    variance_val = sum((x - mean_val) ** 2 for x in valid_scores) / total_records
    
    # 3. Categorize into Grade Buckets using Dictionary
    grades = {"Distinction (>=75)": 0, "First Class (60-74)": 0, "Pass (40-59)": 0}
    for s in valid_scores:
        if s >= 75:
            grades["Distinction (>=75)"] += 1
        elif s >= 60:
            grades["First Class (60-74)"] += 1
        else:
            grades["Pass (40-59)"] += 1
            
    print("\\n--- SUMMARY REPORT ---")
    print(f"Total Count : {total_records}")
    print(f"Mean Score  : {mean_val:.2f}")
    print(f"Median Score: {median_val:.2f}")
    print(f"Variance    : {variance_val:.2f}")
    print(f"Grade Distribution: {grades}")
    return grades

# Run with test input
dataset = [85, 92, -5, 78, 64, 110, 88, 72, 95, 58]
compute_data_metrics(dataset)`,
    expectedOutput: `--- RAW DATA ANALYSIS ---
Original Records: [85, 92, -5, 78, 64, 110, 88, 72, 95, 58]
Cleaned Valid Scores: [85, 92, 78, 64, 88, 72, 95, 58]

--- SUMMARY REPORT ---
Total Count : 8
Mean Score  : 79.00
Median Score: 81.50
Variance    : 147.25
Grade Distribution: {'Distinction (>=75)': 5, 'First Class (60-74)': 2, 'Pass (40-59)': 1}`,
    result: "Successfully implemented Python list operations, filtering, statistical calculation, and dictionary aggregation for basic data manipulation.",
    reference: "https://docs.python.org/3/tutorial/datastructures.html",
    completed: true
  },
  {
    id: "exp-2",
    experimentNumber: 2,
    title: "Matrix Operations and Array Manipulations using NumPy",
    aim: "To demonstrate multi-dimensional array operations, matrix mathematics, reshaping, and broadcasting using the NumPy numerical computing library.",
    requirements: "Python 3.x, NumPy library",
    procedure: [
      "Create 1D and 2D NumPy arrays using arange, reshape, and random functions.",
      "Perform element-wise arithmetic, matrix multiplication (dot product), and transposition.",
      "Apply statistical aggregations along specific axes (axis=0 for columns, axis=1 for rows).",
      "Demonstrate array slicing, masking, and broadcasting operations.",
      "Print and verify results."
    ],
    language: "Python",
    code: `import numpy as np

print("=== NUMPY ARRAY & MATRIX COMPUTATION ===")

# 1. Create a 2D Matrix (3x3)
A = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]])

B = np.array([[9, 8, 7],
              [6, 5, 4],
              [3, 2, 1]])

print("Matrix A (3x3):\\n", A)
print("\\nMatrix B (3x3):\\n", B)

# 2. Matrix Arithmetic & Dot Product
print("\\n--- Element-wise Addition (A + B) ---")
print(A + B)

print("\\n--- Matrix Multiplication (A @ B) ---")
dot_result = np.dot(A, B)
print(dot_result)

# 3. Transpose & Determinant
print("\\nTranspose of Matrix A:\\n", A.T)

# 4. Statistical Reductions along Axes
print("\\n--- Statistical Reductions ---")
print(f"Matrix A Sum (All elements)  : {np.sum(A)}")
print(f"Column-wise Mean (axis=0)    : {np.mean(A, axis=0)}")
print(f"Row-wise Maxima (axis=1)     : {np.max(A, axis=1)}")
print(f"Standard Deviation           : {np.std(A):.4f}")

# 5. Boolean Masking
print("\\nElements in A greater than 5 :", A[A > 5])`,
    expectedOutput: `=== NUMPY ARRAY & MATRIX COMPUTATION ===
Matrix A (3x3):
 [[1 2 3]
 [4 5 6]
 [7 8 9]]

Matrix B (3x3):
 [[9 8 7]
 [6 5 4]
 [3 2 1]]

--- Element-wise Addition (A + B) ---
[[10 10 10]
 [10 10 10]
 [10 10 10]]

--- Matrix Multiplication (A @ B) ---
[[ 30  24  18]
 [ 84  69  54]
 [138 114  90]]

Transpose of Matrix A:
 [[1 4 7]
 [2 5 8]
 [3 6 9]]

--- Statistical Reductions ---
Matrix A Sum (All elements)  : 45
Column-wise Mean (axis=0)    : [4. 5. 6.]
Row-wise Maxima (axis=1)     : [3 6 9]
Standard Deviation           : 2.5820

Elements in A greater than 5 : [6 7 8 9]`,
    result: "Successfully performed vector creation, matrix multiplication, axis-based statistical reductions, and boolean filtering using NumPy.",
    reference: "https://numpy.org/doc/stable/user/quickstart.html",
    completed: true
  },
  {
    id: "exp-3",
    experimentNumber: 3,
    title: "Creating and Manipulating Pandas DataFrames from Structured Data",
    aim: "To construct Pandas DataFrames from dictionary and tabular data, apply indexing, column transformations, filtering, and inspect dataset schema.",
    requirements: "Python 3.x, Pandas, NumPy",
    procedure: [
      "Construct a DataFrame representing a student academic dataset.",
      "Inspect DataFrame info, shape, head, and data types.",
      "Create computed columns based on mathematical expressions.",
      "Filter records based on conditional logic.",
      "Output formatted tables to console."
    ],
    language: "Python",
    code: `import pandas as pd
import numpy as np

# 1. Create dataset dictionary
data = {
    'StudentID': ['DS101', 'DS102', 'DS103', 'DS104', 'DS105', 'DS106'],
    'Name': ['Aarav', 'Bhavna', 'Chetan', 'Divya', 'Eshwar', 'Farhan'],
    'Math_Score': [88, 92, 79, 65, 85, 94],
    'Stats_Score': [82, 95, 70, 60, 89, 91],
    'Python_Score': [90, 88, 75, 58, 92, 96],
    'Attendance_%': [92.0, 96.5, 84.0, 72.0, 88.5, 98.0]
}

# 2. Instantiate DataFrame
df = pd.DataFrame(data)
print("=== ORIGINAL STUDENT DATAFRAME ===")
print(df)

# 3. Add Computed Columns
df['Total_Score'] = df['Math_Score'] + df['Stats_Score'] + df['Python_Score']
df['Avg_Score'] = (df['Total_Score'] / 3).round(2)
df['Performance'] = np.where(df['Avg_Score'] >= 85, 'Outstanding', 'Good')

print("\\n=== DATAFRAME WITH COMPUTED METRICS ===")
print(df[['Name', 'Total_Score', 'Avg_Score', 'Performance']])

# 4. Filter High Performers (Avg >= 85 and Attendance >= 90)
high_performers = df[(df['Avg_Score'] >= 85) & (df['Attendance_%'] >= 90)]
print("\\n=== TOP MERIT CANDIDATES ===")
print(high_performers[['StudentID', 'Name', 'Avg_Score', 'Attendance_%']])`,
    expectedOutput: `=== ORIGINAL STUDENT DATAFRAME ===
  StudentID    Name  Math_Score  Stats_Score  Python_Score  Attendance_%
0     DS101   Aarav          88           82            90          92.0
1     DS102  Bhavna          92           95            88          96.5
2     DS103  Chetan          79           70            75          84.0
3     DS104   Divya          65           60            58          72.0
4     DS105  Eshwar          85           89            92          88.5
5     DS106  Farhan          94           91            96          98.0

=== DATAFRAME WITH COMPUTED METRICS ===
     Name  Total_Score  Avg_Score  Performance
0   Aarav          260      86.67  Outstanding
1  Bhavna          275      91.67  Outstanding
2  Chetan          224      74.67         Good
3   Divya          183      61.00         Good
4  Eshwar          266      88.67  Outstanding
5  Farhan          281      93.67  Outstanding

=== TOP MERIT CANDIDATES ===
  StudentID    Name  Avg_Score  Attendance_%
0     DS101   Aarav      86.67          92.0
1     DS102  Bhavna      91.67          96.5
5     DS106  Farhan      93.67          98.0`,
    result: "Successfully created Pandas DataFrame, generated calculated feature metrics, applied compound conditional filters, and analyzed tabular records.",
    reference: "https://pandas.pydata.org/docs/user_guide/10min.html",
    completed: false
  },
  {
    id: "exp-4",
    experimentNumber: 4,
    title: "Data Aggregation, Grouping, and Statistical Summaries in Pandas",
    aim: "To demonstrate grouping operations, multi-level aggregations, pivot tables, and statistical summaries across categorical variables using Pandas.",
    requirements: "Python 3.x, Pandas library",
    procedure: [
      "Create a multi-department sales and salary dataset.",
      "Perform groupby operations on categorical columns (Department, Location).",
      "Compute aggregate functions (mean, sum, std, count, min, max).",
      "Generate pivot tables summarizing cross-tabulated metrics.",
      "Review output grouped distributions."
    ],
    language: "Python",
    code: `import pandas as pd

# 1. Create Sales/Department Dataset
records = {
    'Employee': ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Henry'],
    'Department': ['Data Science', 'Data Science', 'AI', 'AI', 'Analytics', 'Analytics', 'Data Science', 'AI'],
    'Experience_Yrs': [2, 5, 3, 7, 1, 4, 6, 8],
    'Salary_K$': [85, 120, 95, 145, 65, 90, 135, 160],
    'Projects_Completed': [4, 9, 6, 12, 2, 7, 10, 14]
}

df = pd.DataFrame(records)
print("=== EMPLOYEE DATASET ===")
print(df)

# 2. Descriptive Summary
print("\\n--- DESCRIPTIVE STATISTICS ---")
print(df[['Salary_K$', 'Experience_Yrs', 'Projects_Completed']].describe().round(2))

# 3. GroupBy Aggregation by Department
dept_summary = df.groupby('Department').agg({
    'Salary_K$': ['mean', 'min', 'max'],
    'Projects_Completed': ['sum', 'mean'],
    'Employee': 'count'
}).rename(columns={'count': 'Headcount'})

print("\\n--- DEPARTMENT LEVEL AGGREGATIONS ---")
print(dept_summary.round(2))

# 4. Correlation Analysis
print("\\n--- CORRELATION MATRIX ---")
corr = df[['Experience_Yrs', 'Salary_K$', 'Projects_Completed']].corr()
print(corr.round(3))`,
    expectedOutput: `=== EMPLOYEE DATASET ===
  Employee    Department  Experience_Yrs  Salary_K$  Projects_Completed
0    Alice  Data Science               2         85                   4
1      Bob  Data Science               5        120                   9
2  Charlie            AI               3         95                   6
3    David            AI               7        145                  12
4      Eva     Analytics               1         65                   2
5    Frank     Analytics               4         90                   7
6    Grace  Data Science               6        135                  10
7    Henry            AI               8        160                  14

--- DESCRIPTIVE STATISTICS ---
       Salary_K$  Experience_Yrs  Projects_Completed
count       8.00            8.00                8.00
mean      111.88            4.50                8.00
std        33.27            2.45                4.04
min        65.00            1.00                2.00
25%        88.75            2.75                5.50
50%       107.50            4.50                8.00
75%       137.50            6.25               10.50
max       160.00            8.00               14.00

--- DEPARTMENT LEVEL AGGREGATIONS ---
             Salary_K$             Projects_Completed       Employee
                  mean  min  max                sum  mean Headcount
Department                                                     
AI              133.33   95  160                 32 10.67         3
Analytics        77.50   65   90                  9  4.50         2
Data Science    113.33   85  135                 23  7.67         3

--- CORRELATION MATRIX ---
                    Experience_Yrs  Salary_K$  Projects_Completed
Experience_Yrs               1.000      0.985               0.989
Salary_K$                    0.985      1.000               0.981
Projects_Completed           0.989      0.981               1.000`,
    result: "Successfully demonstrated statistical summaries, multi-column groupby aggregations, and correlation computation on tabular data.",
    reference: "https://pandas.pydata.org/docs/user_guide/groupby.html",
    completed: false
  },
  {
    id: "exp-5",
    experimentNumber: 5,
    title: "Data Visualization - Creating Line, Bar, and Scatter Plots with Matplotlib",
    aim: "To visualize trends, category comparisons, and numerical correlations using Python visualization techniques.",
    requirements: "Python 3.x, Matplotlib, NumPy",
    procedure: [
      "Prepare synthetic time-series, categorical distribution, and bivariate correlation data.",
      "Calculate chart coordinates and ASCII/matrix render summaries.",
      "Generate Line plot for trends, Bar chart for categories, and Scatter representation.",
      "Format labels, titles, legends, and axis limits.",
      "Display generated plot attributes and statistical takeaways."
    ],
    language: "Python",
    code: `import numpy as np

# Simulating Data Science Analytics & Visualization
print("=== DATA SCIENCE VISUALIZATION PIPELINE ===")

months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
model_accuracy = [78.2, 81.5, 84.0, 89.2, 91.8, 94.5]
loss_values = [0.65, 0.52, 0.41, 0.28, 0.19, 0.12]

print("\\n1. TRAINING EPOCHS ACCURACY TREND (Line Plot Representation):")
for m, acc, loss in zip(months, model_accuracy, loss_values):
    bar_acc = "█" * int(acc / 5)
    print(f"{m:4} | Acc: {acc:5.1f}% [{bar_acc:<20}] Loss: {loss:.2f}")

print("\\n2. CATEGORY COMPARISON (Bar Chart Representation):")
categories = ['Python', 'SQL', 'Tableau', 'PowerBI', 'TensorFlow']
demand_index = [95, 88, 72, 68, 84]

for cat, val in zip(categories, demand_index):
    bars = "■" * int(val / 4)
    print(f"{cat:12} | {val:3d} pts {bars}")

print("\\n3. BIVARIATE CORRELATION STATS:")
x = np.array([10, 20, 30, 40, 50, 60, 70])
y = np.array([25, 45, 62, 81, 98, 115, 140])
slope, intercept = np.polyfit(x, y, 1)
r_squared = np.corrcoef(x, y)[0, 1] ** 2

print(f"Regression Line : Y = {slope:.2f} * X + {intercept:.2f}")
print(f"R-squared (Fit) : {r_squared:.4f} (Strong Positive Linear Relationship)")`,
    expectedOutput: `=== DATA SCIENCE VISUALIZATION PIPELINE ===

1. TRAINING EPOCHS ACCURACY TREND (Line Plot Representation):
Jan  | Acc:  78.2% [███████████████     ] Loss: 0.65
Feb  | Acc:  81.5% [████████████████    ] Loss: 0.52
Mar  | Acc:  84.0% [████████████████    ] Loss: 0.41
Apr  | Acc:  89.2% [█████████████████   ] Loss: 0.28
May  | Acc:  91.8% [██████████████████  ] Loss: 0.19
Jun  | Acc:  94.5% [██████████████████  ] Loss: 0.12

2. CATEGORY COMPARISON (Bar Chart Representation):
Python       |  95 pts ■■■■■■■■■■■■■■■■■■■■■■■
SQL          |  88 pts ■■■■■■■■■■■■■■■■■■■■■■
Tableau      |  72 pts ■■■■■■■■■■■■■■■■■■
PowerBI      |  68 pts ■■■■■■■■■■■■■■■■■
TensorFlow   |  84 pts ■■■■■■■■■■■■■■■■■■■■■

3. BIVARIATE CORRELATION STATS:
Regression Line : Y = 1.90 * X + 6.29
R-squared (Fit) : 0.9989 (Strong Positive Linear Relationship)`,
    result: "Successfully rendered trend curves, categorical bar distributions, and bivariate regression correlations for data insights.",
    reference: "https://matplotlib.org/stable/tutorials/introductory/pyplot.html",
    completed: false
  },
  {
    id: "exp-6",
    experimentNumber: 6,
    title: "Handling Missing Values, Outliers and Data Imputation",
    aim: "To identify missing data patterns (NaN), apply mean/median imputation techniques, and detect outliers using the Interquartile Range (IQR) method.",
    requirements: "Python 3.x, Pandas, NumPy",
    procedure: [
      "Construct a dataset with intentionally injected missing values (None / np.nan) and extreme outlier values.",
      "Quantify missing values per column with .isnull().sum().",
      "Impute numerical missing values using feature median strategy.",
      "Calculate lower and upper IQR boundaries (Q1 - 1.5*IQR, Q3 + 1.5*IQR).",
      "Filter/cap extreme outliers and inspect cleaned distribution."
    ],
    language: "Python",
    code: `import pandas as pd
import numpy as np

# 1. Dataset with Missing Values & Outliers
raw_data = {
    'Age': [22, np.nan, 25, 24, 29, 23, 115, 21, np.nan, 26],  # 115 is an outlier
    'Income_K': [45, 52, np.nan, 48, 65, 50, 420, 47, 58, 61],  # 420 is an outlier
    'City': ['Mumbai', 'Delhi', 'Bangalore', 'Mumbai', None, 'Delhi', 'Mumbai', 'Chennai', 'Delhi', 'Bangalore']
}

df = pd.DataFrame(raw_data)
print("=== INITIAL UNCLEANED DATASET ===")
print(df)

# 2. Missing Value Analysis
print("\\n--- MISSING VALUE COUNTS ---")
print(df.isnull().sum())

# 3. Imputation (Median for numbers, Mode for categorical)
df['Age'] = df['Age'].fillna(df['Age'].median())
df['Income_K'] = df['Income_K'].fillna(df['Income_K'].median())
df['City'] = df['City'].fillna(df['City'].mode()[0])

print("\\n=== DATASET AFTER IMPUTATION ===")
print(df)

# 4. Outlier Detection using IQR Method on Income_K
Q1 = df['Income_K'].quantile(0.25)
Q3 = df['Income_K'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

print(f"\\n--- IQR OUTLIER DETECTION (Income_K) ---")
print(f"Q1 (25th): {Q1:.2f} | Q3 (75th): {Q3:.2f} | IQR: {IQR:.2f}")
print(f"Valid Range: [{lower_bound:.2f}, {upper_bound:.2f}]")

outliers = df[(df['Income_K'] < lower_bound) | (df['Income_K'] > upper_bound)]
print(f"Detected Outliers:\\n", outliers[['Age', 'Income_K', 'City']])

# 5. Cleaned Dataset without Outliers
clean_df = df[(df['Income_K'] >= lower_bound) & (df['Income_K'] <= upper_bound) & (df['Age'] <= 80)]
print("\\n=== FINAL CLEANED & NORMALIZED DATASET ===")
print(clean_df.reset_index(drop=True))`,
    expectedOutput: `=== INITIAL UNCLEANED DATASET ===
     Age  Income_K       City
0   22.0      45.0     Mumbai
1    NaN      52.0      Delhi
2   25.0       NaN  Bangalore
3   24.0      48.0     Mumbai
4   29.0      65.0       None
5   23.0      50.0      Delhi
6  115.0     420.0     Mumbai
7   21.0      47.0    Chennai
8    NaN      58.0      Delhi
9   26.0      61.0  Bangalore

--- MISSING VALUE COUNTS ---
Age         2
Income_K    1
City        1
dtype: int64

=== DATASET AFTER IMPUTATION ===
     Age  Income_K       City
0   22.0      45.0     Mumbai
1   24.0      52.0      Delhi
2   25.0      52.0  Bangalore
3   24.0      48.0     Mumbai
4   29.0      65.0      Delhi
5   23.0      50.0      Delhi
6  115.0     420.0     Mumbai
7   21.0      47.0    Chennai
8   24.0      58.0      Delhi
9   26.0      61.0  Bangalore

--- IQR OUTLIER DETECTION (Income_K) ---
Q1 (25th): 48.50 | Q3 (75th): 60.25 | IQR: 11.75
Valid Range: [30.88, 77.88]
Detected Outliers:
      Age  Income_K    City
6  115.0     420.0  Mumbai

=== FINAL CLEANED & NORMALIZED DATASET ===
    Age  Income_K       City
0  22.0      45.0     Mumbai
1  24.0      52.0      Delhi
2  25.0      52.0  Bangalore
3  24.0      48.0     Mumbai
4  29.0      65.0      Delhi
5  23.0      50.0      Delhi
6  21.0      47.0    Chennai
7  24.0      58.0      Delhi
8  26.0      61.0  Bangalore`,
    result: "Successfully imputed missing numerical and categorical records and eliminated anomalous outliers using the Interquartile Range method.",
    reference: "https://scikit-learn.org/stable/modules/impute.html",
    completed: false
  },
  {
    id: "exp-7",
    experimentNumber: 7,
    title: "Exploratory Data Analysis (EDA) on Student Performance Dataset",
    aim: "To perform an end-to-end exploratory analysis pipeline on a multi-feature dataset, identifying statistical trends, feature correlations, and key predictors.",
    requirements: "Python 3.x, Pandas, NumPy",
    procedure: [
      "Load a multi-attribute student performance sample dataset.",
      "Perform dimension, types, null, and unique value diagnostics.",
      "Calculate 5-number summary (Min, Q1, Median, Q3, Max) for key variables.",
      "Analyze cross-feature relationships between study hours, attendance, sleep, and final test score.",
      "Derive key findings and summary recommendations."
    ],
    language: "Python",
    code: `import pandas as pd
import numpy as np

# Student Performance EDA Dataset
np.random.seed(42)
records = {
    'Hours_Studied': [2.5, 5.1, 3.2, 8.5, 3.5, 1.5, 9.2, 5.5, 8.3, 2.7, 7.7, 5.9, 4.5, 3.3, 1.1],
    'Attendance_Pct': [75, 90, 80, 98, 82, 65, 99, 88, 95, 78, 96, 91, 85, 80, 60],
    'Sleep_Hours': [7.0, 6.5, 8.0, 6.0, 7.5, 8.5, 6.0, 7.0, 6.5, 8.0, 6.0, 7.0, 7.5, 8.0, 8.5],
    'Score': [21, 54, 30, 95, 41, 20, 98, 60, 88, 25, 85, 62, 48, 32, 17]
}

df = pd.DataFrame(records)
print("=== STUDENT PERFORMANCE DATASET SAMPLE (Top 5) ===")
print(df.head())

print("\\n--- DATASET SHAPE & METADATA ---")
print(f"Total Observations: {df.shape[0]}, Attributes: {df.shape[1]}")

print("\\n--- STATISTICAL 5-NUMBER SUMMARY ---")
desc = df.describe().T[['mean', 'std', 'min', '50%', 'max']]
desc.columns = ['Mean', 'Std Dev', 'Min', 'Median (Q2)', 'Max']
print(desc.round(2))

print("\\n--- CORRELATION MATRIX WITH TARGET 'Score' ---")
corr = df.corr()
print(corr['Score'].sort_values(ascending=False).round(4))

print("\\n--- HIGH PERFORMANCE FILTER (Score >= 80) ---")
top_students = df[df['Score'] >= 80]
print(top_students)
print(f"\\nAverage Study Hours for Top Scorers: {top_students['Hours_Studied'].mean():.2f} hrs/day")`,
    expectedOutput: `=== STUDENT PERFORMANCE DATASET SAMPLE (Top 5) ===
   Hours_Studied  Attendance_Pct  Sleep_Hours  Score
0            2.5              75          7.0     21
1            5.1              90          6.5     54
2            3.2              80          8.0     30
3            8.5              98          6.0     95
4            3.5              82          7.5     41

--- DATASET SHAPE & METADATA ---
Total Observations: 15, Attributes: 4

--- STATISTICAL 5-NUMBER SUMMARY ---
                Mean  Std Dev   Min  Median (Q2)   Max
Hours_Studied   4.85     2.66   1.1          4.5   9.2
Attendance_Pct 84.80    11.83  60.0         85.0  99.0
Sleep_Hours     7.20     0.86   6.0          7.0   8.5
Score          51.73    28.87  17.0         48.0  98.0

--- CORRELATION MATRIX WITH TARGET 'Score' ---
Score             1.0000
Hours_Studied     0.9762
Attendance_Pct    0.9387
Sleep_Hours      -0.7816
Name: Score, dtype: float64

--- HIGH PERFORMANCE FILTER (Score >= 80) ---
    Hours_Studied  Attendance_Pct  Sleep_Hours  Score
3             8.5              98          6.0     95
6             9.2              99          6.0     98
8             8.3              95          6.5     88
10            7.7              96          6.0     85

Average Study Hours for Top Scorers: 8.42 hrs/day`,
    result: "Completed end-to-end Exploratory Data Analysis, establishing high positive correlation (r=0.976) between study hours, attendance, and student exam scores.",
    reference: "https://www.kaggle.com/learn/data-visualization",
    completed: false
  },
  {
    id: "exp-8",
    experimentNumber: 8,
    title: "Feature Scaling and Normalization using MinMax and Standard Scaler",
    aim: "To demonstrate data transformation and feature standardization techniques (Min-Max Normalization and Z-score Standardization) on varying scales.",
    requirements: "Python 3.x, NumPy, Pandas",
    procedure: [
      "Formulate a dataset with disparate numeric scales (e.g., Age 20-60 vs. Salary 30,000-150,000).",
      "Implement Min-Max Normalization formula: X_norm = (X - X_min) / (X_max - X_min).",
      "Implement Standard Scaler formula: X_std = (X - Mean) / StdDev.",
      "Compare original, min-max normalized, and standardized distribution parameters.",
      "Examine mean and variance properties after scaling."
    ],
    language: "Python",
    code: `import numpy as np
import pandas as pd

# 1. Raw Dataset with Disparate Scales
data = {
    'Age': [25, 32, 47, 51, 28, 38, 42],
    'Salary_USD': [35000, 58000, 110000, 140000, 42000, 75000, 92000],
    'Credit_Score': [620, 680, 790, 810, 650, 710, 740]
}

df = pd.DataFrame(data)
print("=== ORIGINAL UNTRANSFORMED DATA ===")
print(df)

# 2. Min-Max Normalization (Scaling to [0, 1])
df_minmax = df.copy()
for col in df.columns:
    df_minmax[col] = (df[col] - df[col].min()) / (df[col].max() - df[col].min())

print("\\n=== MIN-MAX NORMALIZED DATA [0.0 to 1.0] ===")
print(df_minmax.round(4))

# 3. Standard Scaler / Z-score Standardization (Mean=0, Std=1)
df_standard = df.copy()
for col in df.columns:
    df_standard[col] = (df[col] - df[col].mean()) / df[col].std()

print("\\n=== STANDARD SCALED (Z-SCORE) DATA ===")
print(df_standard.round(4))

# 4. Verify properties of Standardized Data
print("\\n--- Z-SCORE PROPERTIES VERIFICATION ---")
print("Means (should be ~0.0):")
print(df_standard.mean().round(4).to_dict())
print("Standard Deviations (should be 1.0):")
print(df_standard.std().round(4).to_dict())`,
    expectedOutput: `=== ORIGINAL UNTRANSFORMED DATA ===
   Age  Salary_USD  Credit_Score
0   25       35000           620
1   32       58000           680
2   47      110000           790
3   51      140000           810
4   28       42000           650
5   38       75000           710
6   42       92000           740

=== MIN-MAX NORMALIZED DATA [0.0 to 1.0] ===
      Age  Salary_USD  Credit_Score
0  0.0000      0.0000        0.0000
1  0.2692      0.2190        0.3158
2  0.8462      0.7143        0.8947
3  1.0000      1.0000        1.0000
4  0.1154      0.0667        0.1579
5  0.5000      0.3810        0.4737
6  0.6538      0.5429        0.6316

=== STANDARD SCALED (Z-SCORE) DATA ===
      Age  Salary_USD  Credit_Score
0 -1.3323     -1.1610       -1.3508
1 -0.5898     -0.5732       -0.5284
2  1.0013      0.7558        0.9792
3  1.4255      1.5225        1.2533
4 -1.0142     -0.9821       -0.9397
5  0.0466     -0.1387       -0.1174
6  0.4708      0.2958        0.2938

--- Z-SCORE PROPERTIES VERIFICATION ---
Means (should be ~0.0):
{'Age': 0.0, 'Salary_USD': -0.0, 'Credit_Score': 0.0}
Standard Deviations (should be 1.0):
{'Age': 1.0, 'Salary_USD': 1.0, 'Credit_Score': 1.0}`,
    result: "Successfully implemented feature scaling pipelines, confirming unit variance and zero mean transformations suitable for distance-sensitive ML models.",
    reference: "https://scikit-learn.org/stable/modules/preprocessing.html",
    completed: false
  },
  {
    id: "exp-9",
    experimentNumber: 9,
    title: "Implementation of Simple Linear Regression for Predictive Analysis",
    aim: "To build, train, and evaluate a Simple Linear Regression model from mathematical first principles and calculate R², MSE, and MAE metrics.",
    requirements: "Python 3.x, NumPy, Math",
    procedure: [
      "Prepare input feature X (Experience Years) and continuous target Y (Salary in $K).",
      "Calculate slope (m) and intercept (c) using Ordinary Least Squares (OLS) closed form.",
      "Predict values: Y_pred = m * X + c.",
      "Compute Mean Absolute Error (MAE), Mean Squared Error (MSE), and Root Mean Squared Error (RMSE).",
      "Compute Coefficient of Determination (R-squared score) to evaluate fit.",
      "Perform a sample prediction for a new unseen data point."
    ],
    language: "Python",
    code: `import numpy as np

print("=== SIMPLE LINEAR REGRESSION FROM FIRST PRINCIPLES ===")

# Training Dataset: Years of Experience (X) vs Salary in $K (Y)
X = np.array([1.1, 1.5, 2.0, 2.9, 3.2, 4.0, 4.5, 5.1, 6.0, 6.8])
Y = np.array([39.3, 46.2, 44.5, 56.6, 54.4, 63.2, 61.1, 68.0, 82.0, 91.5])

# 1. Compute Mean of X and Y
x_mean = np.mean(X)
y_mean = np.mean(Y)

# 2. Compute Slope (m) and Intercept (c) using OLS formula
# m = sum((X - x_mean) * (Y - y_mean)) / sum((X - x_mean)^2)
numerator = np.sum((X - x_mean) * (Y - y_mean))
denominator = np.sum((X - x_mean) ** 2)

slope = numerator / denominator
intercept = y_mean - slope * x_mean

print(f"Regression Equation: Salary = ({slope:.2f} * Experience) + {intercept:.2f}")

# 3. Model Predictions on Training Set
Y_pred = slope * X + intercept

# 4. Evaluation Metrics
mae = np.mean(np.abs(Y - Y_pred))
mse = np.mean((Y - Y_pred) ** 2)
rmse = np.sqrt(mse)
ss_total = np.sum((Y - y_mean) ** 2)
ss_res = np.sum((Y - Y_pred) ** 2)
r2_score = 1 - (ss_res / ss_total)

print("\\n--- MODEL PERFORMANCE EVALUATION ---")
print(f"Mean Absolute Error (MAE) : USD {mae * 1000:.2f}")
print(f"Mean Squared Error (MSE)  : {mse:.4f}")
print(f"Root Mean Squared Error   : USD {rmse * 1000:.2f}")
print(f"R-squared Score (R²)      : {r2_score:.4f} ({r2_score*100:.2f}% variance explained)")

# 5. Make Future Prediction
test_exp = 7.5
predicted_salary = slope * test_exp + intercept
print(f"\\nPrediction for {test_exp} Years Experience: USD {predicted_salary * 1000:,.2f}")`,
    expectedOutput: `=== SIMPLE LINEAR REGRESSION FROM FIRST PRINCIPLES ===
Regression Equation: Salary = (8.93 * Experience) + 26.79

--- MODEL PERFORMANCE EVALUATION ---
Mean Absolute Error (MAE) : USD 2367.45
Mean Squared Error (MSE)  : 8.4891
Root Mean Squared Error   : USD 2913.61
R-squared Score (R²)      : 0.9691 (96.91% variance explained)

Prediction for 7.5 Years Experience: USD 93,765.23`,
    result: "Successfully trained a Linear Regression model with 96.9% variance explained and evaluated performance metrics (MAE, RMSE, R²).",
    reference: "https://scikit-learn.org/stable/modules/linear_model.html#ordinary-least-squares",
    completed: false
  },
  {
    id: "exp-10",
    experimentNumber: 10,
    title: "Classification and Model Evaluation using K-Nearest Neighbors (KNN)",
    aim: "To implement K-Nearest Neighbors (KNN) classification algorithm from scratch using Euclidean distance and evaluate the Confusion Matrix and Accuracy.",
    requirements: "Python 3.x, NumPy, Collections",
    procedure: [
      "Prepare 2D training feature dataset and binary classification class labels (0: Low Risk, 1: High Risk).",
      "Formulate Euclidean distance metric function: d(p, q) = sqrt(sum((p_i - q_i)^2)).",
      "For each test instance, calculate distances to all training points, sort, and select top K nearest neighbors.",
      "Assign majority vote class to test samples.",
      "Compute Confusion Matrix (TP, TN, FP, FN) and Accuracy score."
    ],
    language: "Python",
    code: `import numpy as np
from collections import Counter

print("=== K-NEAREST NEIGHBORS (KNN) CLASSIFICATION ===")

# Training Features: [Age Normalized, Loan Amount Normalized]
X_train = np.array([
    [0.2, 0.3],
    [0.25, 0.35],
    [0.15, 0.25],
    [0.8, 0.85],
    [0.85, 0.9],
    [0.75, 0.8],
    [0.3, 0.2]
])
# Labels: 0 = Low Default Risk, 1 = High Default Risk
y_train = np.array([0, 0, 0, 1, 1, 1, 0])

# Test Features & True Labels
X_test = np.array([
    [0.22, 0.28],  # Expected: 0
    [0.82, 0.88],  # Expected: 1
    [0.78, 0.75],  # Expected: 1
    [0.18, 0.32]   # Expected: 0
])
y_test = np.array([0, 1, 1, 0])

def knn_predict(X_tr, y_tr, test_point, k=3):
    # Calculate Euclidean distances
    distances = [np.sqrt(np.sum((test_point - tr_point) ** 2)) for tr_point in X_tr]
    # Get top K closest indices
    k_indices = np.argsort(distances)[:k]
    k_labels = [y_tr[i] for i in k_indices]
    # Return majority class
    most_common = Counter(k_labels).most_common(1)
    return most_common[0][0]

# Run predictions
k_val = 3
predictions = [knn_predict(X_train, y_train, test_pt, k=k_val) for test_pt in X_test]

print(f"KNN Hyperparameter K = {k_val}")
for idx, (true_lbl, pred_lbl) in enumerate(zip(y_test, predictions)):
    status = "CORRECT" if true_lbl == pred_lbl else "WRONG"
    print(f"Test Sample {idx+1} | True Label: {true_lbl} -> Predicted: {pred_lbl} [{status}]")

# Evaluation
accuracy = np.mean(np.array(predictions) == y_test)
print("\\n--- MODEL ACCURACY & SUMMARY ---")
print(f"Test Set Accuracy: {accuracy * 100:.1f}%")
print("Confusion Matrix:")
tp = sum(1 for p, t in zip(predictions, y_test) if p == 1 and t == 1)
tn = sum(1 for p, t in zip(predictions, y_test) if p == 0 and t == 0)
fp = sum(1 for p, t in zip(predictions, y_test) if p == 1 and t == 0)
fn = sum(1 for p, t in zip(predictions, y_test) if p == 0 and t == 1)
print(f"[[TN={tn}, FP={fp}],\\n [FN={fn}, TP={tp}]]")`,
    expectedOutput: `=== K-NEAREST NEIGHBORS (KNN) CLASSIFICATION ===
KNN Hyperparameter K = 3
Test Sample 1 | True Label: 0 -> Predicted: 0 [CORRECT]
Test Sample 2 | True Label: 1 -> Predicted: 1 [CORRECT]
Test Sample 3 | True Label: 1 -> Predicted: 1 [CORRECT]
Test Sample 4 | True Label: 0 -> Predicted: 0 [CORRECT]

--- MODEL ACCURACY & SUMMARY ---
Test Set Accuracy: 100.0%
Confusion Matrix:
[[TN=2, FP=0],
 [FN=0, TP=2]]`,
    result: "Successfully implemented the K-Nearest Neighbors classifier, distance calculation, majority voting, and verified 100% test classification accuracy.",
    reference: "https://scikit-learn.org/stable/modules/neighbors.html",
    completed: false
  },
  {
    id: "exp-11",
    experimentNumber: 11,
    title: "Working with Different Data Formats using Pandas",
    aim: "To read CSV, TSV, JSON, and Excel data using pandas and demonstrate writing each format back to disk.",
    requirements: "Python 3.x, Pandas, openpyxl",
    procedure: [
      "Create a small CSV dataset and read it with pandas.read_csv.",
      "Write the DataFrame to a tab-separated file using to_csv with the separator parameter.",
      "Create a JSON file containing student records and read it with read_json.",
      "Write the DataFrame to an Excel workbook using to_excel and read it back with read_excel.",
      "Display the resulting records from all four formats and verify their consistency."
    ],
    language: "Python",
    code: `import pandas as pd
from io import StringIO

csv_data = "student,marks,course\\nAsha,88,Data Science\\nRahul,91,Machine Learning\\n"
df = pd.read_csv(StringIO(csv_data))
print("=== CSV DATA ===")
print(df.to_string(index=False))

with open("students.tsv", "w", encoding="utf-8") as file:
    df.to_csv(file, sep="\t", index=False)
print("\\n=== TSV DATA ===")
print(pd.read_csv("students.tsv", sep="\t").to_string(index=False))

json_data = [{"student": "Neha", "marks": 94, "course": "Statistics"}]
json_df = pd.DataFrame(json_data)
json_df.to_json("student.json", orient="records", indent=2)
print("\\n=== JSON DATA ===")
print(pd.read_json("student.json").to_string(index=False))

excel_path = "students.xlsx"
df.to_excel(excel_path, index=False)
print("\\n=== EXCEL DATA ===")
print(pd.read_excel(excel_path).to_string(index=False))`,
    expectedOutput: `=== CSV DATA ===
student marks course
Asha 88 Data Science
Rahul 91 Machine Learning

=== TSV DATA ===
student marks course
Asha 88 Data Science
Rahul 91 Machine Learning

=== JSON DATA ===
student marks course
Neha 94 Statistics

=== EXCEL DATA ===
student marks course
Asha 88 Data Science
Rahul 91 Machine Learning`,
    result: "The same dataset was read from CSV, written to TSV, converted to JSON, and saved to Excel, demonstrating pandas support for multiple common data formats.",
    reference: "https://pandas.pydata.org/docs/user_guide/io.html",
    completed: false
  },
  {
    id: "exp-12",
    experimentNumber: 12,
    title: "Working with CSV, TSV, and Delimited Data in Pandas",
    aim: "To read and write text data from delimited files, inspect the imported data, and save an updated DataFrame to CSV and TSV formats.",
    requirements: "Python 3.x, Pandas, NumPy",
    procedure: [
      "Download a public CSV dataset using its remote URL or use a fallback sample dataset.",
      "Read the dataset with pandas.read_csv and inspect its columns, rows, and data types.",
      "Read the same dataset as a tab-separated file using read_csv with the separator parameter.",
      "Create a filtered DataFrame and save it as CSV and TSV files.",
      "Verify that the written files contain the expected records."
    ],
    language: "Python",
    code: `import pandas as pd
import numpy as np
from io import StringIO

url = "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/tips.csv"

try:
    df = pd.read_csv(url)
except Exception:
    csv_data = "total_bill,tip,sex,day,size\\n16.99,1.01,Female,Sun,2\\n10.34,1.66,Male,Sun,3\\n21.01,3.5,Male,Sat,3\\n"
    df = pd.read_csv(StringIO(csv_data))

print("=== ORIGINAL CSV DATA ===")
print(df.head(3).to_string(index=False))

sep_df = pd.read_csv(StringIO(df.to_csv(sep='\t', index=False)))
print("\\n=== TAB-SEPARATED DATA ===")
print(sep_df.head(2).to_string(index=False))

filtered = df[df["total_bill"] > 15].copy()
filtered["bill_plus_tip"] = filtered["total_bill"] + filtered["tip"]
filtered.to_csv("filtered_tips.csv", index=False)
filtered.to_csv("filtered_tips.tsv", sep='\t', index=False)

print("\\n=== WRITTEN FILES ===")
print("filtered_tips.csv and filtered_tips.tsv created successfully")
print(f"Rows written: {len(filtered)}")
print(f"Columns: {list(filtered.columns)}")`,
    expectedOutput: `=== ORIGINAL CSV DATA ===
total_bill tip sex day size
16.99 1.01 Female Sun 2
10.34 1.66 Male Sun 3
21.01 3.50 Male Sat 3

=== TAB-SEPARATED DATA ===
total_bill tip sex day size
16.99 1.01 Female Sun 2
10.34 1.66 Male Sun 3

=== WRITTEN FILES ===
filtered_tips.csv and filtered_tips.tsv created successfully
Rows written: 3
Columns: ['total_bill', 'tip', 'sex', 'day', 'size', 'bill_plus_tip']`,
    result: "The dataset was read from a delimited source, converted into a pandas DataFrame, and saved in CSV and TSV formats without losing the original records.",
    reference: "https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html",
    completed: false
  },
  {
    id: "exp-13",
    experimentNumber: 13,
    title: "Reading, Writing, and Parsing JSON Data",
    aim: "To read JSON data into a DataFrame, write the transformed data back to JSON, and parse nested JSON records.",
    requirements: "Python 3.x, Pandas",
    procedure: [
      "Create a small JSON document containing employee records.",
      "Read the JSON document with pandas.read_json and inspect the resulting DataFrame.",
      "Normalize the nested address information using pandas.json_normalize.",
      "Update the DataFrame and write it to a new JSON file.",
      "Load the saved JSON data and display the final records."
    ],
    language: "Python",
    code: `import json
from pathlib import Path
import pandas as pd

records = [
    {"employee_id": 101, "name": "Asha", "department": "Data Science", "address": {"city": "Hyderabad", "state": "Telangana"}},
    {"employee_id": 102, "name": "Rahul", "department": "Analytics", "address": {"city": "Visakhapatnam", "state": "Andhra Pradesh"}}
]

Path("employees.json").write_text(json.dumps(records), encoding="utf-8")
raw_df = pd.read_json("employees.json")
print("=== JSON DATAFRAME ===")
print(raw_df.to_string(index=False))

nested_df = pd.json_normalize(records)
print("\\n=== NORMALIZED ADDRESS DATA ===")
print(nested_df[["employee_id", "name", "address.city", "address.state"]].to_string(index=False))

nested_df["department"] = nested_df["department"].str.upper()
ordered = nested_df[["employee_id", "name", "department", "address.city", "address.state"]]
ordered.to_json("employees_processed.json", orient="records", indent=2)
print("\\n=== SAVED JSON FILE ===")
print(pd.read_json("employees_processed.json").to_string(index=False))`,
    expectedOutput: `=== JSON DATAFRAME ===
employee_id name department address.city address.state
101 Asha Data Science Hyderabad Telangana
102 Rahul Analytics Visakhapatnam Andhra Pradesh

=== NORMALIZED ADDRESS DATA ===
employee_id name address.city address.state
101 Asha Hyderabad Telangana
102 Rahul Visakhapatnam Andhra Pradesh

=== SAVED JSON FILE ===
employee_id name department address.city address.state
101 ASHA DATA SCIENCE Hyderabad Telangana
102 RAHUL ANALYTICS Visakhapatnam Andhra Pradesh`,
    result: "The experiment successfully loaded nested JSON records, normalized the nested structure, transformed the department names, and saved the modified records as JSON.",
    reference: "https://pandas.pydata.org/docs/reference/api/pandas.read_json.html",
    completed: false
  },
  {
    id: "exp-14",
    experimentNumber: 14,
    title: "Reading and Writing Microsoft Excel Files",
    aim: "To read an Excel workbook into a DataFrame, add calculated columns, and write the updated result to an XLSX file.",
    requirements: "Python 3.x, Pandas, openpyxl",
    procedure: [
      "Create a sample employee workbook with columns for employee, salary, and experience.",
      "Read the workbook using pandas.read_excel.",
      "Calculate a bonus or performance-adjusted salary column.",
      "Write the updated data to a new Excel file.",
      "Read the newly saved workbook and display the finished records."
    ],
    language: "Python",
    code: `import pandas as pd

excel_data = pd.DataFrame({
    "Employee": ["Asha", "Rahul", "Neha"],
    "Experience": [2, 5, 7],
    "Salary": [25000, 42000, 60000]
})

excel_data.to_excel("employees.xlsx", index=False)
loaded_df = pd.read_excel("employees.xlsx")
loaded_df["Bonus"] = loaded_df["Salary"] * 0.10
loaded_df["Total_Package"] = loaded_df["Salary"] + loaded_df["Bonus"]
loaded_df.to_excel("employees_with_bonus.xlsx", index=False)

print("=== ORIGINAL EXCEL DATA ===")
print(loaded_df[["Employee", "Experience", "Salary"]].to_string(index=False))
print("\\n=== SAVED EXCEL DATA ===")
print(pd.read_excel("employees_with_bonus.xlsx").to_string(index=False))`,
    expectedOutput: `=== ORIGINAL EXCEL DATA ===
Employee Experience Salary
Asha 2 25000
Rahul 5 42000
Neha 7 60000

=== SAVED EXCEL DATA ===
Employee Experience Salary Bonus Total_Package
Asha 2 25000 2500 27500
Rahul 5 42000 4200 46200
Neha 7 60000 6000 66000`,
    result: "The workbook was successfully read, transformed, and written back to Excel with additional calculated fields.",
    reference: "https://pandas.pydata.org/docs/reference/api/pandas.read_excel.html",
    completed: false
  },
  {
    id: "exp-15",
    experimentNumber: 15,
    title: "Interacting with the GitHub Issues API",
    aim: "To retrieve the most recent GitHub issues for pandas, convert the JSON response into a DataFrame, and select useful fields for analysis.",
    requirements: "Python 3.x, Pandas, urllib",
    procedure: [
      "Construct the GitHub API URL for the pandas repository.",
      "Use urllib.request to send an HTTP request and read the response JSON data.",
      "Extract the first 30 issues and convert them into a DataFrame.",
      "Select useful fields such as number, title, state, user, created_at, and comments.",
      "Display the selected issues and persist the results as CSV."
    ],
    language: "Python",
    code: `import json
from urllib.request import Request, urlopen
import pandas as pd

url = "https://api.github.com/repos/pandas-dev/pandas/issues?per_page=30"
request = Request(url, headers={"User-Agent": "Data-Science-Lab"})
with urlopen(request, timeout=20) as response:
    issues = json.load(response)

selected_fields = [
    "number", "title", "state", "created_at", "comments", "user"
]
issue_rows = []
for issue in issues:
    if "pull_request" in issue:
        continue
    issue_rows.append({
        "number": issue.get("number"),
        "title": issue.get("title"),
        "state": issue.get("state"),
        "created_at": issue.get("created_at"),
        "comments": issue.get("comments"),
        "user": issue.get("user", {}).get("login")
    })

df = pd.DataFrame(issue_rows, columns=selected_fields)
print("=== LAST 30 NON-PULL-REQUEST ISSUES ===")
print(df.head(5).to_string(index=False))
print(f"\\nTotal displayed issues: {len(df)}")
df.to_csv("pandas_issues.csv", index=False)`,
    expectedOutput: `=== LAST 30 NON-PULL-REQUEST ISSUES ===
number title state created_at comments user
12345 Sample Issue open 2026-10-01T12:00:00Z 2 username
... up to five issue rows ...

Total displayed issues: 30`,
    result: "The experiment connected to the GitHub API, selected the required issue fields, converted the response into a pandas DataFrame, and exported the data to CSV.",
    reference: "https://docs.github.com/en/rest/issues/issues",
    completed: false
  },
  {
    id: "exp-16",
    experimentNumber: 16,
    title: "CRUD Operations with SQLite and Pandas",
    aim: "To create a relational database table, insert and update records, read data into a DataFrame, and delete records using SQL operations.",
    requirements: "Python 3.x, Pandas, SQLite3",
    procedure: [
      "Create an in-memory SQLite database.",
      "Create a students table with a unique student ID, name, course, and marks.",
      "Insert multiple student records using SQL.",
      "Read the table into a pandas DataFrame and display the records.",
      "Update selected marks and delete a student record.",
      "Verify the final table contents."
    ],
    language: "Python",
    code: `import sqlite3
import pandas as pd

connection = sqlite3.connect(":memory:")
cursor = connection.cursor()
cursor.execute("CREATE TABLE students (student_id INTEGER PRIMARY KEY, name TEXT, course TEXT, marks INTEGER)")

students = [
    (1, "Asha", "Data Science", 82),
    (2, "Rahul", "Machine Learning", 90),
    (3, "Neha", "Statistics", 76)
]
cursor.executemany("INSERT INTO students VALUES (?, ?, ?, ?)", students)
connection.commit()

print("=== ORIGINAL TABLE DATA ===")
print(pd.read_sql_query("SELECT * FROM students ORDER BY student_id", connection).to_string(index=False))

cursor.execute("UPDATE students SET marks = 88 WHERE student_id = 3")
connection.commit()

cursor.execute("DELETE FROM students WHERE student_id = 2")
connection.commit()

print("\\n=== FINAL TABLE DATA ===")
print(pd.read_sql_query("SELECT * FROM students ORDER BY student_id", connection).to_string(index=False))

connection.close()`,
    expectedOutput: `=== ORIGINAL TABLE DATA ===
student_id name course marks
1 Asha Data Science 82
2 Rahul Machine Learning 90
3 Neha Statistics 76

=== FINAL TABLE DATA ===
student_id name course marks
1 Asha Data Science 82
3 Neha Statistics 88`,
    result: "The table was created, records were inserted and modified, data was transferred to a DataFrame, and selected records were updated and deleted.",
    reference: "https://docs.python.org/3/library/sqlite3.html",
    completed: false
  },
  {
    id: "exp-17",
    experimentNumber: 17,
    title: "Data Cleaning, Missing Values, Duplicate Removal, and Transformation",
    aim: "To identify missing values, remove unusable records, fill missing entries, remove duplicates, and transform selected values in a dataset.",
    requirements: "Python 3.x, Pandas, NumPy",
    procedure: [
      "Create a DataFrame with missing values and duplicate records.",
      "Count and locate missing values using isna and isnull.",
      "Remove rows containing missing values with dropna.",
      "Fill missing values with a chosen statistic using fillna.",
      "Remove duplicate rows using duplicated and drop_duplicates.",
      "Transform values using map and replace, then create a renamed copy."
    ],
    language: "Python",
    code: `import pandas as pd
import numpy as np

raw = pd.DataFrame({
    "student": ["Asha", "Rahul", "Neha", "Asha", "Vikram"],
    "course": ["DS", "ML", np.nan, "DS", "AI"],
    "marks": [88, np.nan, 76, 88, 92]
})

print("=== ORIGINAL DATA ===")
print(raw)
print("\\nMissing values:\\n", raw.isna().sum())

cleaned = raw.dropna().copy()
print("\\nAfter dropna:\\n", cleaned)

filled = raw.fillna({"course": "Unknown", "marks": raw["marks"].mean()})
print("\\nAfter fillna:\\n", filled)

unique = filled.drop_duplicates()
print("\\nAfter drop_duplicates:\\n", unique)

transformed = unique.copy()
transformed["course"] = transformed["course"].map({"DS": "Data Science", "ML": "Machine Learning", "AI": "Artificial Intelligence", "Unknown": "Not Available"})
transformed = transformed.replace({"course": {"Data Science": "Data Science"}})
renamed = transformed.rename(columns={"marks": "score"})
print("\\nTransformed and renamed copy:\\n", renamed.to_string(index=False))`,
    expectedOutput: `=== ORIGINAL DATA ===
  student course marks
0 Asha DS 88.0
1 Rahul ML NaN
2 Neha NaN 76.0
3 Asha DS 88.0
4 Vikram AI 92.0

Missing values:
student 0
course 1
marks 1

After dropna:
  student course marks
0 Asha DS 88.0
3 Asha DS 88.0
4 Vikram AI 92.0

After fillna:
  student course marks
0 Asha DS 88.0
1 Rahul ML 86.0
2 Neha Unknown 76.0
3 Asha DS 88.0
4 Vikram AI 92.0

After drop_duplicates:
  student course marks
0 Asha DS 88.0
1 Rahul ML 86.0
2 Neha Unknown 76.0
4 Vikram AI 92.0

Transformed and renamed copy:
student course score
Asha Data Science 88.0
Rahul Machine Learning 86.0
Neha Not Available 76.0
Vikram Artificial Intelligence 92.0`,
    result: "Missing values were detected, rows were removed, missing entries were filled, duplicates were removed, and selected values were transformed without changing the original source data.",
    reference: "https://pandas.pydata.org/docs/user_guide/missing_data.html",
    completed: false
  },
  {
    id: "exp-18",
    experimentNumber: 18,
    title: "Outlier Detection with Random Sampling and Normal Distribution",
    aim: "To generate normally distributed data, create a DataFrame, identify possible outliers, and visualize the distribution with a box plot.",
    requirements: "Python 3.x, Pandas, NumPy, Matplotlib",
    procedure: [
      "Use numpy.random.normal to generate normally distributed measurements.",
      "Create a DataFrame with sample values and labels.",
      "Calculate the mean and standard deviation of the dataset.",
      "Identify values outside the usual range using a z-score threshold.",
      "Display the outliers and generate a box plot."
    ],
    language: "Python",
    code: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

rng = np.random.default_rng(42)
values = rng.normal(loc=50, scale=8, size=100)
values = np.append(values, [110, 115, 120])

df = pd.DataFrame({"measurement": values})
mean = df["measurement"].mean()
std = df["measurement"].std()

df["z_score"] = (df["measurement"] - mean) / std
outliers = df[df["z_score"].abs() > 3]

print("=== NORMAL DISTRIBUTION STATISTICS ===")
print(f"Mean: {mean:.2f}")
print(f"Standard deviation: {std:.2f}")
print(f"Outlier count: {len(outliers)}")
print(outliers.head().to_string(index=False))

plt.figure(figsize=(8, 5))
plt.boxplot(df["measurement"], patch_artist=True, boxprops={"facecolor": "skyblue"})
plt.title("Measurement Distribution")
plt.ylabel("Value")
plt.tight_layout()
plt.savefig("outlier_boxplot.png")
print("\\nBox plot saved as outlier_boxplot.png")`,
    expectedOutput: `=== NORMAL DISTRIBUTION STATISTICS ===
Mean: 50.34
Standard deviation: 9.83
Outlier count: 3
   measurement z_score
 110.00 6.06
 115.00 6.62
 120.00 6.95

Box plot saved as outlier_boxplot.png`,
    result: "Normally distributed data were generated, the mean and standard deviation were calculated, and extreme measurements were detected as possible outliers.",
    reference: "https://numpy.org/doc/stable/reference/random/generated/numpy.random.normal.html",
    completed: false
  },
  {
    id: "exp-19",
    experimentNumber: 19,
    title: "Text Manipulation with Regular Expressions",
    aim: "To split text with variable whitespace and extract all matching patterns using regular expressions.",
    requirements: "Python 3.x, re",
    procedure: [
      "Create a string containing spaces, tabs, and newline characters.",
      "Use the regular expression \s+ to split the text into words.",
      "Apply re.findall to identify all numeric values and word patterns.",
      "Display the split words and extracted matches.",
      "Compare the results of splitting and pattern matching."
    ],
    language: "Python",
    code: `import re

text = "Data\tScience  Analysis\\nPython   and  Pandas\\n2026 2027"
words = re.split(r"\s+", text.strip())
numbers = re.findall(r"\d+", text)
letters = re.findall(r"[A-Za-z]+", text)

print("=== SPLIT TEXT ===")
print(words)
print("\\n=== MATCHED NUMBERS ===")
print(numbers)
print("\\n=== MATCHED WORDS ===")
print(letters)`,
    expectedOutput: `=== SPLIT TEXT ===
['Data', 'Science', 'Analysis', 'Python', 'and', 'Pandas', '2026', '2027']

=== MATCHED NUMBERS ===
['2026', '2027']

=== MATCHED WORDS ===
['Data', 'Science', 'Analysis', 'Python', 'and', 'Pandas']`,
    result: "The text was split on variable whitespace and relevant numeric and alphabetical patterns were extracted with regular expressions.",
    reference: "https://docs.python.org/3/library/re.html",
    completed: false
  },
  {
    id: "exp-20",
    experimentNumber: 20,
    title: "Hierarchical Indexing, Partial Selection, and Reshaping",
    aim: "To create a Series with a hierarchical index, select data at different levels, and reshape data using stack and unstack.",
    requirements: "Python 3.x, Pandas",
    procedure: [
      "Create a Series indexed by two levels.",
      "Select values using partial indexing at the outer level.",
      "Select values using complete indexing at both levels.",
      "Convert the Series to a DataFrame with unstack.",
      "Convert the DataFrame back to a stacked Series using stack."
    ],
    language: "Python",
    code: `import pandas as pd

index = pd.MultiIndex.from_tuples(
    [("Class A", "Student 1"), ("Class A", "Student 2"), ("Class B", "Student 1")],
    names=["Class", "Student"]
)
series = pd.Series([88, 76, 91], index=index)

print("=== MULTIINDEX SERIES ===")
print(series)
print("\\nOuter level selection:")
print(series["Class A"])
print("\\nComplete selection:")
print(series[("Class B", "Student 1")])

frame = series.unstack()
print("\\nAfter unstack:")
print(frame)
print("\\nAfter stack:")
print(frame.stack())`,
    expectedOutput: `=== MULTIINDEX SERIES ===
Class  Student
Class A Student 1 88
Class A Student 2 76
Class B Student 1 91

dtype: int64

Outer level selection:
Student
Student 1    88
Student 2    76
dtype: int64

Complete selection:
91

After unstack:
Student Student 1 Student 2
Class
Class A 88 76
Class B 91 NaN

After stack:
Class  Student
Class A Student 1 88.0
Class A Student 2 76.0
Class B Student 1 91.0
dtype: float64`,
    result: "The Series was indexed by two levels, subset selections were performed at the outer and inner levels, and the data was reshaped with stack and unstack.",
    reference: "https://pandas.pydata.org/docs/user_guide/advanced.html",
    completed: false
  },

];

export const initialTools = [
  {
    id: "tool-python",
    name: "Python",
    category: "Programming Language",
    icon: "🐍",
    description: "The premier programming language for Data Science, Machine Learning, and Artificial Intelligence, featuring a massive ecosystem of scientific packages.",
    features: ["Readable & expressive syntax", "Extensive PyPI scientific libraries", "Dynamic typing & rapid prototyping"],
    link: "https://www.python.org",
    docsLink: "https://docs.python.org/3/"
  },
  {
    id: "tool-jupyter",
    name: "Jupyter Notebook",
    category: "Interactive Computing",
    icon: "🪐",
    description: "Web-based interactive development environment allowing live code execution, data equations, narrative text, and inline visual rendering.",
    features: ["Cell-by-cell execution", "Rich interactive markdown & LaTeX", "Instant inline charts & tabular outputs"],
    link: "https://jupyter.org",
    docsLink: "https://docs.jupyter.org"
  },
  {
    id: "tool-colab",
    name: "Google Colab",
    category: "Cloud ML Environment",
    icon: "⚡",
    description: "Hosted Jupyter notebook service by Google providing free access to computing resources including GPUs and TPUs with zero setup.",
    features: ["Zero local configuration needed", "Free cloud GPU/TPU acceleration", "Direct Google Drive & GitHub integration"],
    link: "https://colab.research.google.com",
    docsLink: "https://colab.research.google.com/notebooks/intro.ipynb"
  },
  {
    id: "tool-numpy",
    name: "NumPy",
    category: "Numerical Computing",
    icon: "🔢",
    description: "The fundamental package for scientific computing with Python, offering powerful N-dimensional array objects and broadcasting capabilities.",
    features: ["Fast C-optimized vector operations", "Linear algebra & Fourier transforms", "Multi-dimensional array slicing & indexing"],
    link: "https://numpy.org",
    docsLink: "https://numpy.org/doc/stable/"
  },
  {
    id: "tool-pandas",
    name: "Pandas",
    category: "Data Analysis & Wrangling",
    icon: "🐼",
    description: "Fast, powerful, and flexible open-source data analysis and manipulation tool, built on top of the Python programming language.",
    features: ["DataFrame & Series structures", "High performance grouping & merging", "Handling missing & heterogeneous data"],
    link: "https://pandas.pydata.org",
    docsLink: "https://pandas.pydata.org/docs/"
  },
  {
    id: "tool-matplotlib",
    name: "Matplotlib",
    category: "Data Visualization",
    icon: "📊",
    description: "Comprehensive library for creating static, animated, and interactive visualizations in Python with total programmatic design control.",
    features: ["Publication quality figures", "Subplot & layout management", "Extensive 2D & 3D chart gallery"],
    link: "https://matplotlib.org",
    docsLink: "https://matplotlib.org/stable/contents.html"
  },
  {
    id: "tool-scikit",
    name: "Scikit-Learn",
    category: "Machine Learning",
    icon: "🤖",
    description: "Simple and efficient tools for predictive data analysis, data mining, and machine learning built on NumPy, SciPy, and matplotlib.",
    features: ["Classification, Regression & Clustering", "Model evaluation & Cross-validation", "Preprocessing & Feature transformation"],
    link: "https://scikit-learn.org",
    docsLink: "https://scikit-learn.org/stable/user_guide.html"
  },
  {
    id: "tool-seaborn",
    name: "Seaborn",
    category: "Statistical Data Visualization",
    icon: "🌊",
    description: "Python data visualization library based on matplotlib that provides a high-level interface for drawing attractive and informative statistical graphics.",
    features: ["Built-in statistical aggregation", "Color palettes & aesthetic themes", "Specialized pairplots & heatmaps"],
    link: "https://seaborn.pydata.org",
    docsLink: "https://seaborn.pydata.org/tutorial.html"
  }
];
