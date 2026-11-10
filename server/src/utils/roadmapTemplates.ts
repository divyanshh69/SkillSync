export interface SkillTemplate {
  name: string;
  category: string;
  importance: 'Essential' | 'Recommended' | 'Advanced';
  description: string;
}

export interface PhaseTemplate {
  phaseNumber: number;
  title: string;
  subtitle: string;
  description: string;
  skills: SkillTemplate[];
}

export interface CareerRoadmapTemplate {
  targetCareer: string;
  phases: PhaseTemplate[];
}

export const CAREER_ROADMAPS: Record<string, PhaseTemplate[]> = {
  // 1. Full-Stack Developer
  'Full-Stack Developer': [
    {
      phaseNumber: 1,
      title: "Frontend & Core Web Foundations",
      subtitle: "Mastering the browser runtime, semantic HTML, and modern JS",
      description: "Foundational mastery of browser APIs, clean component hierarchies, and collaborative git workflows.",
      skills: [
        { name: "Modern JavaScript (ES6+)", category: "Frontend", importance: "Essential", description: "Async/await, closures, promises, destructuring, array methods, and event loop." },
        { name: "HTML5 & Semantic Web", category: "Frontend", importance: "Essential", description: "Semantic markup, accessibility landmarks, form validation, and SEO best practices." },
        { name: "CSS3 & Modern Tailwind", category: "Frontend", importance: "Essential", description: "Utility-first design, flexbox/grid layout systems, responsive breakpoints, and animations." },
        { name: "Git & Version Control", category: "DevOps & Tooling", importance: "Essential", description: "Branching workflows, conventional commits, rebase, merge conflict resolution, and PR reviews." },
        { name: "TypeScript Fundamentals", category: "Frontend", importance: "Essential", description: "Static typing, generics, utility types, unions, and strict compiler configs." }
      ]
    },
    {
      phaseNumber: 2,
      title: "Reactive Web & State Architecture",
      subtitle: "Production UI development, state management, and performance",
      description: "Building resilient client-side applications with reactive state lifecycles and accessible component primitives.",
      skills: [
        { name: "React 18 & Component Patterns", category: "Frontend", importance: "Essential", description: "Hooks, reconciliation, component composition, custom hooks, and concurrent features." },
        { name: "State Management (Zustand/Context)", category: "Frontend", importance: "Recommended", description: "Client store architecture, selector subscriptions, state hydration, and persistence." },
        { name: "Asynchronous Data Fetching", category: "Frontend", importance: "Essential", description: "REST querying, abort controllers, loading states, cache invalidation, and error boundaries." },
        { name: "Responsive & Mobile-First Design", category: "Frontend", importance: "Essential", description: "Mobile layout viewports, touch targets, container queries, and cross-browser testing." },
        { name: "Component Testing with Vitest", category: "DevOps & Tooling", importance: "Recommended", description: "Unit testing React components with Testing Library, user event mocks, and test coverage." }
      ]
    },
    {
      phaseNumber: 3,
      title: "Backend Foundations & API Engineering",
      subtitle: "Server runtimes, relational databases & secure APIs",
      description: "Architecting reliable server-side services with authenticated boundaries, transactional safety, and clean API contracts.",
      skills: [
        { name: "Node.js & Express Fundamentals", category: "Backend & APIs", importance: "Essential", description: "HTTP modules, middleware pipelines, error handling, route handlers, and stream I/O." },
        { name: "RESTful API Design & Routing", category: "Backend & APIs", importance: "Essential", description: "Resource-oriented endpoints, HTTP status codes, pagination, and request validation." },
        { name: "JWT Authentication & Security", category: "Backend & APIs", importance: "Essential", description: "Access & refresh token rotation, bcrypt hashing, httpOnly cookies, and route guards." },
        { name: "PostgreSQL & Relational Schemas", category: "Databases", importance: "Essential", description: "Normalization, primary & foreign keys, indexing, ACID transactions, and joins." },
        { name: "Prisma / Drizzle ORM", category: "Databases", importance: "Recommended", description: "Type-safe database queries, schema modeling, relationships, and migration generation." }
      ]
    },
    {
      phaseNumber: 4,
      title: "Full-Stack Integration & Scalability",
      subtitle: "SSR, real-time channels, caching layers, and containerization",
      description: "Bridging client and server into unified frameworks with distributed caches and containerized runtimes.",
      skills: [
        { name: "Next.js App Router & Server Actions", category: "Frontend", importance: "Essential", description: "Server components, streaming SSR, layouts, route handlers, and server actions." },
        { name: "Redis Caching & Session Storage", category: "Databases", importance: "Recommended", description: "Key-value cache eviction policies, TTL, pub/sub, and distributed session storage." },
        { name: "WebSockets & Event-Driven APIs", category: "Backend & APIs", importance: "Recommended", description: "Bidirectional real-time channels, Socket.io, heartbeat pings, and reconnection logic." },
        { name: "Docker Containerization", category: "DevOps & Tooling", importance: "Recommended", description: "Dockerfiles, multi-stage builds, docker-compose orchestration, and volume mounts." }
      ]
    },
    {
      phaseNumber: 5,
      title: "Production Systems & Cloud Delivery",
      subtitle: "CI/CD automation, cloud deployment, and system observability",
      description: "Delivering resilient multi-tier applications to cloud infrastructure with automated quality gates and telemetry.",
      skills: [
        { name: "CI/CD with GitHub Actions", category: "DevOps & Tooling", importance: "Essential", description: "Automated linting, test suites, Docker image building, and automated deployment pipelines." },
        { name: "Cloud Deployment (AWS/Render/Vercel)", category: "DevOps & Tooling", importance: "Essential", description: "Environment variables, SSL certificates, custom domains, and edge runtime configuration." },
        { name: "System Design & Microservices Basics", category: "Architecture & Security", importance: "Recommended", description: "Load balancing, horizontal scaling, database replication, and CAP theorem trade-offs." },
        { name: "Error Monitoring & Telemetry (Sentry)", category: "DevOps & Tooling", importance: "Recommended", description: "Application observability, distributed tracing, source maps, and exception logging." }
      ]
    }
  ],

  // 2. Frontend Developer
  'Frontend Developer': [
    {
      phaseNumber: 1,
      title: "Web Standards & Modern JavaScript",
      subtitle: "Semantic markup, modern CSS styling, and JavaScript ES6+",
      description: "Mastering the modern browser runtime, responsive styling primitives, and clean JavaScript workflows.",
      skills: [
        { name: "Semantic HTML5 & Accessibility (WCAG)", category: "Frontend", importance: "Essential", description: "Landmarks, ARIA roles, keyboard navigation, and web accessibility standards." },
        { name: "Modern CSS, Flexbox & Grid Layouts", category: "Frontend", importance: "Essential", description: "CSS custom properties, container queries, animations, and modern layouts." },
        { name: "JavaScript ES6+ Deep Dive", category: "Frontend", importance: "Essential", description: "Closures, prototypes, promises, async/await, and event propagation." },
        { name: "Tailwind CSS & Utility-First Styling", category: "Frontend", importance: "Essential", description: "Design tokens, arbitrary values, dark mode systems, and responsive utility classes." },
        { name: "Git & Collaborative Workflows", category: "DevOps & Tooling", importance: "Essential", description: "Conventional commits, interactive rebasing, branching, and pull requests." }
      ]
    },
    {
      phaseNumber: 2,
      title: "React 18 & TypeScript Engineering",
      subtitle: "Component architecture, strict typing, and client routing",
      description: "Building type-safe, maintainable single-page applications with modern React paradigms.",
      skills: [
        { name: "TypeScript Strict Typing & Generics", category: "Frontend", importance: "Essential", description: "Type narrowing, generic components, Discriminated Unions, and utility types." },
        { name: "React 18 Component Architecture", category: "Frontend", importance: "Essential", description: "Custom hooks, forwardRefs, memoization boundaries, and concurrent rendering." },
        { name: "Client-Side Routing & Code Splitting", category: "Frontend", importance: "Essential", description: "Nested layouts, route loaders, lazy loading, and error boundaries." },
        { name: "Async Query Caching (TanStack Query)", category: "Frontend", importance: "Recommended", description: "Stale-while-revalidate, optimistic mutations, pagination, and infinite queries." },
        { name: "Unit & Component Testing with Vitest", category: "DevOps & Tooling", importance: "Recommended", description: "Testing Library, user-event simulations, and component accessibility testing." }
      ]
    },
    {
      phaseNumber: 3,
      title: "State Architecture & UI Component Systems",
      subtitle: "Global store design, headless primitives, and validation",
      description: "Structuring scalable client stores, accessible headless design systems, and resilient input forms.",
      skills: [
        { name: "Global State Management (Zustand)", category: "Frontend", importance: "Essential", description: "Store slicing, middleware persistence, selectors, and state normalization." },
        { name: "Headless UI & Radix Primitives", category: "Frontend", importance: "Recommended", description: "Accessible modal dialogs, dropdowns, tooltips, and focus traps." },
        { name: "Form State & Zod Schema Validation", category: "Frontend", importance: "Essential", description: "Controlled inputs, dynamic field arrays, async validation, and error messaging." },
        { name: "Framer Motion & Micro-Interactions", category: "Frontend", importance: "Recommended", description: "Layout animations, gesture recognizers, exit transitions, and spring physics." }
      ]
    },
    {
      phaseNumber: 4,
      title: "Full-Stack React & Next.js Ecosystem",
      subtitle: "Server components, streaming SSR, and edge architecture",
      description: "Harnessing the Next.js App Router for hybrid client-server rendering and optimal web performance.",
      skills: [
        { name: "Next.js App Router & Server Components", category: "Frontend", importance: "Essential", description: "RSC architecture, streaming server-side rendering, and parallel routes." },
        { name: "Server Actions & Mutation Workflows", category: "Frontend", importance: "Essential", description: "Progressive enhancement, server revalidation, and optimistic feedback." },
        { name: "Static Site Generation (SSG) & ISR", category: "Frontend", importance: "Recommended", description: "Incremental static regeneration, dynamic params, and edge caching." },
        { name: "Search Engine Optimization & Metadata", category: "Frontend", importance: "Recommended", description: "Dynamic OpenGraph tags, sitemaps, structured schema JSON-LD, and robots.txt." }
      ]
    },
    {
      phaseNumber: 5,
      title: "Frontend Performance & Production Systems",
      subtitle: "Core Web Vitals, virtualization, and CI/CD delivery",
      description: "Pushing web apps to elite performance levels with bundle audits, virtualization, and automated pipelines.",
      skills: [
        { name: "Core Web Vitals & Performance Auditing", category: "Frontend", importance: "Essential", description: "Optimizing LCP, INP, and CLS; eliminating layout shifts and memory leaks." },
        { name: "List Virtualization & Windowing", category: "Frontend", importance: "Recommended", description: "Windowed infinite scrolling with @tanstack/react-virtual for large datasets." },
        { name: "Component Storybook & Visual Tests", category: "DevOps & Tooling", importance: "Recommended", description: "Isolating design components, documenting props, and visual regression tests." },
        { name: "Automated Vercel / Cloudflare CI/CD", category: "DevOps & Tooling", importance: "Essential", description: "Preview environments, edge middleware, custom domains, and automated deployments." }
      ]
    }
  ],

  // 3. Backend Developer
  'Backend Developer': [
    {
      phaseNumber: 1,
      title: "System Foundations & Runtimes",
      subtitle: "Node.js core modules, TypeScript, and Linux systems",
      description: "Solidifying low-level backend foundations, asynchronous runtimes, and command-line automation.",
      skills: [
        { name: "Node.js Core Architecture & Event Loop", category: "Backend & APIs", importance: "Essential", description: "Process lifecycles, streams, buffer management, and non-blocking I/O." },
        { name: "Strict TypeScript for Server Applications", category: "Backend & APIs", importance: "Essential", description: "Strict typing, type guards, interfaces, and backend module resolution." },
        { name: "Linux Administration & Bash Scripting", category: "DevOps & Tooling", importance: "Essential", description: "File permissions, cron jobs, environment variables, and shell utilities." },
        { name: "Git Branching & Release Management", category: "DevOps & Tooling", importance: "Essential", description: "Semantic versioning, release tags, merge strategies, and code reviews." },
        { name: "Data Structures & Algorithm Complexity", category: "Architecture & Security", importance: "Recommended", description: "Hash tables, binary search, Big-O analysis, and memory efficiency." }
      ]
    },
    {
      phaseNumber: 2,
      title: "RESTful Services & Middleware Pipelines",
      subtitle: "Express / Fastify, schema validation, and error management",
      description: "Designing structured, predictable web APIs with robust validation and unified middleware error handling.",
      skills: [
        { name: "Express.js & Modular Route Architecture", category: "Backend & APIs", importance: "Essential", description: "Middleware chaining, controllers, service layers, and request parsing." },
        { name: "RESTful API Standards & HTTP Semantics", category: "Backend & APIs", importance: "Essential", description: "Idempotent verbs, status codes, cursor pagination, and response contracts." },
        { name: "Request Validation with Zod", category: "Backend & APIs", importance: "Essential", description: "Schema coercion, nested validation rules, and automated error formatting." },
        { name: "Structured Logging & Telemetry (Pino)", category: "Backend & APIs", importance: "Recommended", description: "JSON log streams, request correlation IDs, and contextual metadata." },
        { name: "Automated Integration Testing (Supertest)", category: "DevOps & Tooling", importance: "Recommended", description: "End-to-end endpoint tests, mock dependencies, and test database setups." }
      ]
    },
    {
      phaseNumber: 3,
      title: "Relational Persistence & Data Modeling",
      subtitle: "PostgreSQL, indexing, ORMs, and caching layers",
      description: "Modeling high-integrity relational schemas with performance indexing, transactions, and caching.",
      skills: [
        { name: "PostgreSQL Schema Design & Normalization", category: "Databases", importance: "Essential", description: "Foreign keys, constraints, table normalization, and data integrity." },
        { name: "SQL Indexing & Query Optimization", category: "Databases", importance: "Essential", description: "B-Tree indexes, composite keys, EXPLAIN ANALYZE, and query profiling." },
        { name: "Prisma ORM & Migration Pipelines", category: "Databases", importance: "Essential", description: "Declarative modeling, relations, schema migrations, and type-safe queries." },
        { name: "ACID Transactions & Row Locking", category: "Databases", importance: "Recommended", description: "Isolation levels, optimistic vs. pessimistic locking, and race conditions." },
        { name: "Redis In-Memory Caching Strategies", category: "Databases", importance: "Recommended", description: "Cache-aside patterns, TTL expiration, eviction policies, and cache invalidation." }
      ]
    },
    {
      phaseNumber: 4,
      title: "API Security, Authentication & Messaging",
      subtitle: "JWT tokens, rate limiting, and asynchronous job queues",
      description: "Protecting endpoints against malicious traffic and offloading intensive tasks to background queues.",
      skills: [
        { name: "JWT Auth & Refresh Token Rotation", category: "Architecture & Security", importance: "Essential", description: "Short-lived tokens, secure httpOnly cookies, and token blacklisting." },
        { name: "Bcrypt Hashing & Secret Protection", category: "Architecture & Security", importance: "Essential", description: "Salt rounds, timing-safe equality checks, and env secret management." },
        { name: "API Rate Limiting & OWASP Hardening", category: "Architecture & Security", importance: "Essential", description: "Token bucket algorithms, CORS policies, helmet headers, and sanitization." },
        { name: "Asynchronous Job Queues (BullMQ/Redis)", category: "Backend & APIs", importance: "Recommended", description: "Worker processes, retry policies, backoff timers, and concurrency control." },
        { name: "WebSockets & Event-Driven APIs", category: "Backend & APIs", importance: "Recommended", description: "Bidirectional Socket.io rooms, heartbeat pings, and event broadcasts." }
      ]
    },
    {
      phaseNumber: 5,
      title: "Microservices, Docker & Cloud Architecture",
      subtitle: "Multi-stage containers, CI/CD pipelines, and cloud hosting",
      description: "Deploying containerized backend microservices with automated pipelines, metrics, and health probes.",
      skills: [
        { name: "Docker Multi-Stage Containerization", category: "DevOps & Tooling", importance: "Essential", description: "Slim Alpine images, non-root users, build caching, and Docker Compose." },
        { name: "CI/CD Deployment with GitHub Actions", category: "DevOps & Tooling", importance: "Essential", description: "Automated test runs, container build verification, and deployment webhooks." },
        { name: "Cloud Deployment (AWS ECS / Fly.io / Render)", category: "DevOps & Tooling", importance: "Essential", description: "Health check probes, rolling updates, environment variables, and domains." },
        { name: "System Design & Distributed Scalability", category: "Architecture & Security", importance: "Recommended", description: "Horizontal scaling, reverse proxies, database read-replicas, and CAP theorem." }
      ]
    }
  ],

  // 4. Data Scientist
  'Data Scientist': [
    {
      phaseNumber: 1,
      title: "Python & Numerical Computing",
      subtitle: "Python foundations, NumPy arrays, and Pandas DataFrames",
      description: "Mastering the scientific Python stack for numerical manipulation and tabular data wrangling.",
      skills: [
        { name: "Python for Data Science (Core & OOP)", category: "AI & Data Science", importance: "Essential", description: "Data structures, comprehension syntax, functions, and object-oriented scripts." },
        { name: "NumPy Vectorized Arrays & Math", category: "AI & Data Science", importance: "Essential", description: "Broadcasting, indexing, matrix multiplication, and vector operations." },
        { name: "Pandas DataFrames & Manipulation", category: "AI & Data Science", importance: "Essential", description: "Filtering, grouping, merging, pivot tables, and datetime manipulation." },
        { name: "Jupyter Environments & Git for Data", category: "DevOps & Tooling", importance: "Essential", description: "Interactive notebook workflows, reproducible kernels, and git versioning." },
        { name: "Data Ingestion & File Formats", category: "Databases", importance: "Recommended", description: "Parsing CSV, JSON, Parquet, and Excel files with optimized chunking." }
      ]
    },
    {
      phaseNumber: 2,
      title: "Data Exploration, SQL & Visualization",
      subtitle: "Relational queries, exploratory analysis, and visual storytelling",
      description: "Extracting insights from relational databases and creating clear visual charts from complex data.",
      skills: [
        { name: "SQL for Data Analysis & Window Functions", category: "Databases", importance: "Essential", description: "Aggregations, joins, subqueries, CTEs, and window functions (RANK, LAG/LEAD)." },
        { name: "Data Cleaning & Outlier Imputation", category: "AI & Data Science", importance: "Essential", description: "Handling missing values, IQR outlier detection, and data type casting." },
        { name: "Data Visualization with Matplotlib & Seaborn", category: "AI & Data Science", importance: "Essential", description: "Distribution plots, heatmaps, box plots, and publication-ready formatting." },
        { name: "Interactive Visual Dashboards (Plotly)", category: "AI & Data Science", importance: "Recommended", description: "Interactive charts, hover tooltips, facets, and geographical maps." },
        { name: "Feature Engineering & Categorical Encoding", category: "AI & Data Science", importance: "Essential", description: "One-hot encoding, target encoding, standard scaling, and log transforms." }
      ]
    },
    {
      phaseNumber: 3,
      title: "Statistical Inference & Probability",
      subtitle: "Probability distributions, hypothesis testing, and A/B experiments",
      description: "Grounding data decisions in rigorous inferential statistics, hypothesis testing, and experimental design.",
      skills: [
        { name: "Probability Theory & Common Distributions", category: "AI & Data Science", importance: "Essential", description: "Normal, Binomial, Poisson distributions, and Bayes Theorem fundamentals." },
        { name: "Hypothesis Testing & p-Value Analysis", category: "AI & Data Science", importance: "Essential", description: "t-tests, ANOVA, Chi-square tests, confidence intervals, and Type I/II errors." },
        { name: "A/B Testing & Experimentation Design", category: "AI & Data Science", importance: "Essential", description: "Sample size calculation, statistical power, variance reduction, and guardrail metrics." },
        { name: "Correlation, Causation & Multicollinearity", category: "AI & Data Science", importance: "Recommended", description: "Pearson vs. Spearman correlation, VIF analysis, and confounding variables." }
      ]
    },
    {
      phaseNumber: 4,
      title: "Applied Machine Learning & Predictive Modeling",
      subtitle: "Supervised algorithms, validation strategies, and ensemble methods",
      description: "Training predictive models on real-world datasets with rigorous cross-validation and hyperparameter tuning.",
      skills: [
        { name: "Supervised Learning (Regression & Classification)", category: "AI & Data Science", importance: "Essential", description: "Linear regression, logistic regression, decision trees, and baseline modeling." },
        { name: "Model Evaluation & Validation Strategies", category: "AI & Data Science", importance: "Essential", description: "K-fold cross-validation, confusion matrices, ROC-AUC, Precision/Recall, and F1." },
        { name: "Tree-Based Ensembles (Random Forest / XGBoost)", category: "AI & Data Science", importance: "Essential", description: "Bagging, gradient boosting, feature importance, and hyperparameter tuning." },
        { name: "Unsupervised Learning (K-Means & PCA)", category: "AI & Data Science", importance: "Recommended", description: "Clustering algorithms, dimensionality reduction, and customer segmentation." }
      ]
    },
    {
      phaseNumber: 5,
      title: "Production ML Pipelines & Data Apps",
      subtitle: "Scikit-Learn pipelines, Streamlit apps, and business communication",
      description: "Deploying automated model pipelines into interactive web applications and presenting data storytelling.",
      skills: [
        { name: "Scikit-Learn Pipelines & Model Serialization", category: "AI & Data Science", importance: "Essential", description: "Composing preprocessing pipelines, joblib serialization, and model artifacts." },
        { name: "Interactive Data Applications with Streamlit", category: "AI & Data Science", importance: "Essential", description: "Deploying interactive machine learning apps with live user input widgets." },
        { name: "Automated Data Pipelines & Basic ETL", category: "DevOps & Tooling", importance: "Recommended", description: "Data workflow scheduling, validation checks, and data refresh scripts." },
        { name: "Data Storytelling & Executive Communication", category: "Soft Skills", importance: "Essential", description: "Translating statistical findings into actionable business impact and slide decks." }
      ]
    }
  ],

  // 5. AI/ML Engineer
  'AI/ML Engineer': [
    {
      phaseNumber: 1,
      title: "Software Engineering & Math for AI",
      subtitle: "Python programming, linear algebra, and development environments",
      description: "Building the software and mathematical foundation required for modern deep learning systems.",
      skills: [
        { name: "Advanced Python & Scientific OOP", category: "AI & Data Science", importance: "Essential", description: "Generators, decorators, typing, dataclasses, and performant Python design." },
        { name: "Linear Algebra & Vector Calculus", category: "AI & Data Science", importance: "Essential", description: "Matrix decompositions, eigenvalues, gradients, and partial derivatives." },
        { name: "NumPy & Tensor Operations", category: "AI & Data Science", importance: "Essential", description: "High-dimensional tensor slicing, broadcasting, and matrix products." },
        { name: "Git & Reproducible Research Setup", category: "DevOps & Tooling", importance: "Essential", description: "Environment management (conda/venv), git workflows, and experiment logging." },
        { name: "Linux & CUDA GPU Acceleration Basics", category: "DevOps & Tooling", importance: "Recommended", description: "NVIDIA driver checks, torch.cuda device management, and memory allocation." }
      ]
    },
    {
      phaseNumber: 2,
      title: "Machine Learning Foundations & Pipelines",
      subtitle: "Classical ML, Scikit-Learn pipelines, and feature engineering",
      description: "Designing end-to-end machine learning pipelines from raw data to hyperparameter-tuned models.",
      skills: [
        { name: "Classical ML Algorithms & Optimization", category: "AI & Data Science", importance: "Essential", description: "Gradient descent, loss functions, regularization (L1/L2), and convex optimization." },
        { name: "Scikit-Learn Pipeline Architecture", category: "AI & Data Science", importance: "Essential", description: "Custom transformers, ColumnTransformer, and leakage-free cross-validation." },
        { name: "Advanced Feature Engineering", category: "AI & Data Science", importance: "Essential", description: "Interaction features, embeddings extraction, scaling, and handling imbalanced data." },
        { name: "Tree-Based Gradient Boosting (XGBoost/LightGBM)", category: "AI & Data Science", importance: "Essential", description: "Ensemble learning, learning rate schedules, early stopping, and Optuna tuning." }
      ]
    },
    {
      phaseNumber: 3,
      title: "Deep Learning & Neural Architectures",
      subtitle: "PyTorch tensors, backpropagation, and transformer blocks",
      description: "Implementing neural network architectures with PyTorch from foundational MLPs to modern Transformers.",
      skills: [
        { name: "PyTorch Core: Tensors & Autograd", category: "AI & Data Science", importance: "Essential", description: "nn.Module lifecycles, custom training loops, optimizers, and backprop." },
        { name: "Deep Neural Networks (MLPs & Activations)", category: "AI & Data Science", importance: "Essential", description: "Batch normalization, dropout, ReLU/GeLU, and vanishing gradient prevention." },
        { name: "Convolutional Networks (CNNs) for Vision", category: "AI & Data Science", importance: "Recommended", description: "Convolutions, pooling, transfer learning (ResNet), and data augmentation." },
        { name: "Transformer Architecture & Self-Attention", category: "AI & Data Science", importance: "Essential", description: "Multi-head attention, positional encodings, feedforward layers, and masking." }
      ]
    },
    {
      phaseNumber: 4,
      title: "LLMs, Vector Search & RAG Systems",
      subtitle: "Gemini API, semantic embeddings, vector databases, and orchestration",
      description: "Building production Retrieval-Augmented Generation (RAG) applications powered by large language models.",
      skills: [
        { name: "Google Gemini API & Prompt Orchestration", category: "AI & Data Science", importance: "Essential", description: "System instructions, structured output schemas, function calling, and temperature." },
        { name: "Text Embeddings & Semantic Similarity", category: "AI & Data Science", importance: "Essential", description: "Cosine distance, embedding models, chunking strategies, and token overlap." },
        { name: "Vector Databases & Indexing (pgvector)", category: "Databases", importance: "Essential", description: "HNSW indexes, IVFFlat, vector storage, and hybrid keyword-vector search." },
        { name: "Retrieval-Augmented Generation (RAG) Pipelines", category: "AI & Data Science", importance: "Essential", description: "Context assembly, citation generation, re-ranking, and hallucination reduction." },
        { name: "LangChain / LlamaIndex Frameworks", category: "AI & Data Science", importance: "Recommended", description: "Document loaders, vector stores, recursive splitters, and conversational chains." }
      ]
    },
    {
      phaseNumber: 5,
      title: "MLOps, Containerization & Inference Serving",
      subtitle: "FastAPI model serving, Docker images, and experiment telemetry",
      description: "Packaging machine learning models into robust, low-latency microservices with automated deployment.",
      skills: [
        { name: "Model Serving with FastAPI & Async Workers", category: "Backend & APIs", importance: "Essential", description: "REST endpoints, batch inference, Pydantic schemas, and concurrency." },
        { name: "Docker Containerization for ML Deployments", category: "DevOps & Tooling", importance: "Essential", description: "Optimizing container sizes, CPU/GPU runtime images, and health checks." },
        { name: "Experiment Tracking & Registry (MLflow/W&B)", category: "DevOps & Tooling", importance: "Recommended", description: "Logging hyperparameters, model artifacts, metrics curves, and model versioning." },
        { name: "Cloud Deployment & Inference Optimization", category: "DevOps & Tooling", importance: "Essential", description: "Deploying to cloud container services, model quantization, and latency tuning." }
      ]
    }
  ],

  // 6. Cybersecurity Analyst
  'Cybersecurity Analyst': [
    {
      phaseNumber: 1,
      title: "Networking & Operating Systems Foundations",
      subtitle: "TCP/IP architecture, Linux administration, and network tools",
      description: "Understanding network communication layers, protocols, and secure system administration.",
      skills: [
        { name: "TCP/IP Protocols & OSI Model", category: "Security & Systems", importance: "Essential", description: "Packet routing, subnets, DNS, DHCP, ports, and transport protocols." },
        { name: "Linux System Administration & Permissions", category: "Security & Systems", importance: "Essential", description: "User groups, chmod/chown, process inspection, systemd, and cron." },
        { name: "Bash Scripting & Automation", category: "Security & Systems", importance: "Essential", description: "Automating security audits, parsing log files, and shell pipelines." },
        { name: "Network Troubleshooting Utilities", category: "Security & Systems", importance: "Essential", description: "Ping, traceroute, netstat, dig, and socket inspection tools." },
        { name: "Git & Documentation Standards", category: "DevOps & Tooling", importance: "Recommended", description: "Documenting security policies, scripts, and versioning configuration files." }
      ]
    },
    {
      phaseNumber: 2,
      title: "Security Principles & Threat Fundamentals",
      subtitle: "CIA triad, OWASP vulnerabilities, and cryptography basics",
      description: "Analyzing threat vectors, application security risks, and fundamental cryptographic mechanisms.",
      skills: [
        { name: "Security Architecture & The CIA Triad", category: "Security & Systems", importance: "Essential", description: "Confidentiality, Integrity, Availability, least privilege, and defense-in-depth." },
        { name: "OWASP Top 10 Web Vulnerabilities", category: "Security & Systems", importance: "Essential", description: "SQL Injection, XSS, CSRF, broken access control, and security misconfigurations." },
        { name: "Cryptography Fundamentals & PKI", category: "Security & Systems", importance: "Essential", description: "Symmetric vs. asymmetric ciphers, hashing (SHA-256), TLS/SSL, and certificates." },
        { name: "Identity & Access Management (IAM)", category: "Security & Systems", importance: "Essential", description: "RBAC, Multi-Factor Authentication, OAuth2 concepts, and directory services." },
        { name: "Social Engineering & Phishing Defense", category: "Soft Skills", importance: "Recommended", description: "Spear-phishing vectors, user awareness training, and credential harvesting defense." }
      ]
    },
    {
      phaseNumber: 3,
      title: "Defensive Operations & SIEM Telemetry",
      subtitle: "Log analysis, packet inspection, and intrusion detection",
      description: "Monitoring network traffic, identifying anomalous behavior, and analyzing SIEM security events.",
      skills: [
        { name: "Network Packet Analysis with Wireshark", category: "Security & Systems", importance: "Essential", description: "PCAP inspection, protocol filtering, stream reconstruction, and anomaly detection." },
        { name: "SIEM Operations & Log Analysis (Splunk)", category: "Security & Systems", importance: "Essential", description: "Search processing language, alert correlations, dashboarding, and log ingestion." },
        { name: "Intrusion Detection Systems (Snort / Suricata)", category: "Security & Systems", importance: "Essential", description: "Signature-based detection, writing custom IDS rules, and alerting." },
        { name: "Firewall Configuration & Network Segmentation", category: "Security & Systems", importance: "Recommended", description: "Stateful packet filtering, DMZ architecture, and iptables configuration." }
      ]
    },
    {
      phaseNumber: 4,
      title: "Vulnerability Assessment & Auditing",
      subtitle: "Port scanning, vulnerability scanners, and risk scoring",
      description: "Discovering active services, performing vulnerability assessments, and calculating security risk.",
      skills: [
        { name: "Port Scanning & Reconnaissance (Nmap)", category: "Security & Systems", importance: "Essential", description: "SYN stealth scans, service fingerprinting, OS detection, and NSE scripts." },
        { name: "Vulnerability Scanning (Nessus / OpenVAS)", category: "Security & Systems", importance: "Essential", description: "Automated vulnerability scanning, false positive elimination, and reporting." },
        { name: "Web Application Security Testing (Burp Suite)", category: "Security & Systems", importance: "Recommended", description: "HTTP proxy interception, automated fuzzing, and parameter tampering." },
        { name: "CVSS Risk Scoring & Remediation Planning", category: "Security & Systems", importance: "Essential", description: "Common Vulnerability Scoring System, patch prioritization, and mitigation." }
      ]
    },
    {
      phaseNumber: 5,
      title: "Incident Response & Security Compliance",
      subtitle: "Incident handling playbooks, forensics, and NIST standards",
      description: "Responding to active incidents, preserving digital evidence, and complying with security frameworks.",
      skills: [
        { name: "Incident Response Lifecycle (NIST SP 800-61)", category: "Security & Systems", importance: "Essential", description: "Preparation, detection, containment, eradication, and lessons learned." },
        { name: "Digital Forensics & Chain of Custody", category: "Security & Systems", importance: "Recommended", description: "Memory acquisition, disk imaging, evidence preservation, and audit logs." },
        { name: "Security Governance (ISO 27001 / SOC 2 / NIST)", category: "Security & Systems", importance: "Recommended", description: "Compliance audits, policy enforcement, third-party risk, and documentation." },
        { name: "Incident Reporting & Stakeholder Debriefing", category: "Soft Skills", importance: "Essential", description: "Authoring executive incident summaries and root-cause post-mortem reports." }
      ]
    }
  ],

  // 7. UI/UX Designer
  'UI/UX Designer': [
    {
      phaseNumber: 1,
      title: "Design Principles & Visual Fundamentals",
      subtitle: "Typography, color theory, layout grids, and design thinking",
      description: "Mastering the core aesthetic and functional visual primitives of modern digital product design.",
      skills: [
        { name: "Visual Hierarchy & Layout Principles", category: "UI & Design", importance: "Essential", description: "Focal points, balance, proximity, contrast, and alignment across screen sizes." },
        { name: "Typography, Readability & Font Systems", category: "UI & Design", importance: "Essential", description: "Type scales, vertical rhythm, font pairing, line heights, and optical sizing." },
        { name: "Color Theory & Accessible Contrast Ratios", category: "UI & Design", importance: "Essential", description: "Color palettes, semantic coloring, WCAG AA/AAA contrast, and dark mode." },
        { name: "Design Thinking Framework", category: "UI & Design", importance: "Essential", description: "Empathize, Define, Ideate, Prototype, and Test problem-solving processes." },
        { name: "Grid Systems & Responsive Layout Grids", category: "UI & Design", importance: "Essential", description: "8pt grid systems, column grids, margins, gutters, and fluid scaling." }
      ]
    },
    {
      phaseNumber: 2,
      title: "User Research & Information Architecture",
      subtitle: "User interviews, persona creation, and wireframing",
      description: "Conducting user research to uncover pain points and mapping clear product navigation structures.",
      skills: [
        { name: "User Research & Interview Methodologies", category: "UI & Design", importance: "Essential", description: "Generative interviews, usability observation, surveys, and affinity mapping." },
        { name: "User Personas & Journey Mapping", category: "UI & Design", importance: "Essential", description: "Empathy maps, user archetypes, end-to-end journey maps, and friction points." },
        { name: "Information Architecture & User Flows", category: "UI & Design", importance: "Essential", description: "Site maps, hierarchical structures, decision trees, and screen task flows." },
        { name: "Low-Fidelity Wireframing & Rapid Sketching", category: "UI & Design", importance: "Essential", description: "Paper wireframes, grayscale digital layouts, and structural iterations." }
      ]
    },
    {
      phaseNumber: 3,
      title: "Figma Mastery & Interactive Prototyping",
      subtitle: "Auto-layout, interactive variants, and micro-interactions",
      description: "Building production-grade UI screens and clickable prototypes using advanced Figma features.",
      skills: [
        { name: "Figma Auto-Layout & Responsive Constraints", category: "UI & Design", importance: "Essential", description: "Nested auto-layout, hug/fill rules, min/max dimensions, and adaptive views." },
        { name: "Component Architecture & Interactive Variants", category: "UI & Design", importance: "Essential", description: "Master components, boolean properties, variant states, and overrides." },
        { name: "Advanced Prototyping & Smart Animate", category: "UI & Design", importance: "Essential", description: "Transitions, overlay menus, drag interactions, and mobile device previews." },
        { name: "Usability Testing Protocols & Feedback Analysis", category: "UI & Design", importance: "Recommended", description: "Moderated testing scripts, task completion rates, and prototype iteration." }
      ]
    },
    {
      phaseNumber: 4,
      title: "Design Systems & Developer Collaboration",
      subtitle: "Design tokens, component libraries, and handoff specs",
      description: "Scaling UI consistency through design token architecture and seamless developer handoff.",
      skills: [
        { name: "Design Token Architecture (Figma Variables)", category: "UI & Design", importance: "Essential", description: "Color modes, spacing tokens, typography variables, and themes." },
        { name: "Reusable Component Libraries & UI Kits", category: "UI & Design", importance: "Essential", description: "Button sets, form inputs, modal dialogs, data tables, and iconography." },
        { name: "Accessibility Testing (WCAG 2.1 AA Compliance)", category: "UI & Design", importance: "Essential", description: "Screen reader focus order, target touch sizes (48x48px), and color-blind modes." },
        { name: "Developer Handoff Specs & Inspect Workflows", category: "UI & Design", importance: "Essential", description: "CSS export, asset export, edge-case documentation, and Code Connect." }
      ]
    },
    {
      phaseNumber: 5,
      title: "Product Strategy & Portfolio Case Studies",
      subtitle: "End-to-end case studies, UX metrics, and stakeholder presentation",
      description: "Synthesizing product design into compelling case studies with measurable business outcomes.",
      skills: [
        { name: "End-to-End Product Design Case Studies", category: "UI & Design", importance: "Essential", description: "Before/after audits, hypothesis framing, design rationale, and solutions." },
        { name: "UX Metrics & Business KPI Measurement", category: "UI & Design", importance: "Recommended", description: "Task success rate, SUS scores, conversion rate impact, and drop-off analysis." },
        { name: "Design Presentation & Stakeholder Buy-in", category: "Soft Skills", importance: "Essential", description: "Articulating design decisions, handling critique, and executive alignment." },
        { name: "No-Code Portfolio Publishing (Framer/Webflow)", category: "Frontend", importance: "Recommended", description: "Publishing a responsive design portfolio with custom domain and animations." }
      ]
    }
  ]
};

/**
 * Fallback template for custom/other careers
 */
export function getTemplateForCareer(career: string): PhaseTemplate[] {
  // Direct match
  if (CAREER_ROADMAPS[career]) {
    return CAREER_ROADMAPS[career];
  }

  const lower = career.toLowerCase();
  if (lower.includes('front')) return CAREER_ROADMAPS['Frontend Developer'];
  if (lower.includes('back') || lower.includes('cloud')) return CAREER_ROADMAPS['Backend Developer'];
  if (lower.includes('data')) return CAREER_ROADMAPS['Data Scientist'];
  if (lower.includes('ai') || lower.includes('ml') || lower.includes('machine') || lower.includes('intelligence')) return CAREER_ROADMAPS['AI/ML Engineer'];
  if (lower.includes('security') || lower.includes('cyber')) return CAREER_ROADMAPS['Cybersecurity Analyst'];
  if (lower.includes('design') || lower.includes('ui') || lower.includes('ux')) return CAREER_ROADMAPS['UI/UX Designer'];

  // Default to Full-Stack Developer as strong general software engineering foundation
  return CAREER_ROADMAPS['Full-Stack Developer'];
}

