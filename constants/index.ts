import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { z } from "zod";

export const mappings = {
  "react.js": "react",
  reactjs: "react",
  react: "react",
  "next.js": "nextjs",
  nextjs: "nextjs",
  next: "nextjs",
  "vue.js": "vuejs",
  vuejs: "vuejs",
  vue: "vuejs",
  "express.js": "express",
  expressjs: "express",
  express: "express",
  "node.js": "nodejs",
  nodejs: "nodejs",
  node: "nodejs",
  mongodb: "mongodb",
  mongo: "mongodb",
  mongoose: "mongoose",
  mysql: "mysql",
  postgresql: "postgresql",
  sqlite: "sqlite",
  firebase: "firebase",
  docker: "docker",
  kubernetes: "kubernetes",
  aws: "aws",
  azure: "azure",
  gcp: "gcp",
  digitalocean: "digitalocean",
  heroku: "heroku",
  photoshop: "photoshop",
  "adobe photoshop": "photoshop",
  html5: "html5",
  html: "html5",
  css3: "css3",
  css: "css3",
  sass: "sass",
  scss: "sass",
  less: "less",
  tailwindcss: "tailwindcss",
  tailwind: "tailwindcss",
  bootstrap: "bootstrap",
  jquery: "jquery",
  typescript: "typescript",
  ts: "typescript",
  javascript: "javascript",
  js: "javascript",
  "angular.js": "angular",
  angularjs: "angular",
  angular: "angular",
  "ember.js": "ember",
  emberjs: "ember",
  ember: "ember",
  "backbone.js": "backbone",
  backbonejs: "backbone",
  backbone: "backbone",
  nestjs: "nestjs",
  graphql: "graphql",
  "graph ql": "graphql",
  apollo: "apollo",
  webpack: "webpack",
  babel: "babel",
  "rollup.js": "rollup",
  rollupjs: "rollup",
  rollup: "rollup",
  "parcel.js": "parcel",
  parceljs: "parcel",
  npm: "npm",
  yarn: "yarn",
  git: "git",
  github: "github",
  gitlab: "gitlab",
  bitbucket: "bitbucket",
  figma: "figma",
  prisma: "prisma",
  redux: "redux",
  flux: "flux",
  redis: "redis",
  selenium: "selenium",
  cypress: "cypress",
  jest: "jest",
  mocha: "mocha",
  chai: "chai",
  karma: "karma",
  vuex: "vuex",
  "nuxt.js": "nuxt",
  nuxtjs: "nuxt",
  nuxt: "nuxt",
  strapi: "strapi",
  wordpress: "wordpress",
  contentful: "contentful",
  netlify: "netlify",
  vercel: "vercel",
  "aws amplify": "amplify",
  
  // Additional tools from the interview roles
  "Splunk": "splunk",
  "CrowdStrike Falcon": "crowdstrike-falcon",
  "Kali Linux": "kali-linux",
  "Metasploit": "metasploit",
  "Cobalt Strike": "cobalt-strike",
  "BloodHound": "bloodhound",
  "Nmap": "nmap",
  "Burp Suite": "burp-suite",
  "AWS Security Hub": "aws-security-hub",
  "Prowler": "prowler",
  "GCP Security Command Center": "gcp-security-command-center",
  "Kube-bench": "kube-bench",
  "Trivy": "trivy",
  "Snyk": "snyk",
  "HashiCorp Vault": "hashicorp-vault",
  "Wireshark": "wireshark",
  "Zeek": "zeek",
  "SonarQube": "sonarqube",
  
  // Data Analyst Tools
  "Python": "python",
  "R": "r",
  "SQL": "sql",
  "Tableau": "tableau",
  "Power BI": "power-bi",
  "Apache Hadoop": "apache-hadoop",
  "Apache Spark": "apache-spark",
  "BigQuery": "bigquery",
  "Pandas": "pandas",
  "Matplotlib": "matplotlib",
  "Seaborn": "seaborn",
  "Excel": "excel",
  "Jupyter Notebook": "jupyter-notebook",
  "D3.js": "d3js",
  "Snowflake": "snowflake",
  "Google Analytics": "google-analytics",
  "AWS Redshift": "aws-redshift",
  "DataRobot": "datarobot"
};


export const interviewer: CreateAssistantDTO = {
  name: "Interviewer",
  firstMessage: "Hello! Thank you for taking the time to speak with me today. I'm excited to learn more about you and your experience.",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
  },
  voice: {
    provider: "11labs",
    voiceId: "sarah",
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.5,
    useSpeakerBoost: true,
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a professional job interviewer conducting a real-time voice interview with a candidate. Your goal is to assess their qualifications, motivation, and fit for the role.

Interview Guidelines:
Follow the structured question flow:
{{questions}}

Engage naturally & react appropriately:
Listen actively to responses and acknowledge them before moving forward.
Ask brief follow-up questions if a response is vague or requires more detail.
Keep the conversation flowing smoothly while maintaining control.
Be professional, yet warm and welcoming:

Use official yet friendly language.
Keep responses concise and to the point (like in a real voice interview).
Avoid robotic phrasing—sound natural and conversational.
Answer the candidate’s questions professionally:

If asked about the role, company, or expectations, provide a clear and relevant answer.
If unsure, redirect the candidate to HR for more details.

Conclude the interview properly:
Thank the candidate for their time.
Inform them that the company will reach out soon with feedback.
End the conversation on a polite and positive note.


- Be sure to be professional and polite.
- Keep all your responses short and simple. Use official language, but be kind and welcoming.
- This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.`,
      },
    ],
  },
  clientMessages: [],
  serverMessages: []
};

export const feedbackSchema = z.object({
  totalScore: z.number(),
  categoryScores: z.tuple([
    z.object({
      name: z.literal("Communication Skills"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Technical Knowledge"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Problem Solving"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Cultural Fit"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Confidence and Clarity"),
      score: z.number(),
      comment: z.string(),
    }),
  ]),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  finalAssessment: z.string(),
});

export const interviewCovers = [
  "/adobe.png",
  "/amazon.png",
  "/facebook.png",
  "/hostinger.png",
  "/pinterest.png",
  "/quora.png",
  "/reddit.png",
  "/skype.png",
  "/spotify.png",
  "/telegram.png",
  "/tiktok.png",
  "/yahoo.png",
];

export const dummyInterviews: Interview[] = [
  {
    id: "1",
    userId: "user1",
    role: "Cybersecurity Professional",
    type: "Technical",
    techstack: [ "Splunk",
  "CrowdStrike Falcon",
  "Burp Suite",
  "SonarQube"],
    level: "Junior",
    questions: ["What is the CIA triad in cybersecurity?",
      "Explain the difference between hashing, encoding, and encryption.",
      "What is the principle of least privilege (PoLP)?",
      "How do you secure a server at the OS and network level?",
      "What is a SIEM and how does it facilitate threat detection?",
      "Describe defense‑in‑depth and its layered security approach.",
      "Differentiate between IDS and IPS.",
      "How would you detect and respond to a ransomware attack?",
      "What is two‑factor authentication and why is it important?",
      "How would you analyze logs to identify a security breach?",
      "What is the difference between black‑box and white‑box testing?",
      "Explain the process of salting and hashing passwords."],
    finalized: false,
    createdAt: "2024-03-15T10:00:00Z",
  },
  {
    id: "2",
    userId: "user1",
    role: "Full Stack Developer",
    type: "Mixed",
    techstack: ["Node.js", "Express", "MongoDB", "React"],
    level: "Senior",
    questions: ["What is Node.js?"],
    finalized: false,
    createdAt: "2024-03-14T15:30:00Z",
  },
  {
    id: "3",
    userId: "user1",
    role: "Data Professional",
    type: "Data",
    techstack: ["Python",
  "SQL",
  "Tableau",
  "Apache Spark",
  ],
    level: "Senior",
    questions: ["You have a dataset with missing values, duplicates, and inconsistent formats. How would you clean it?",
  "Explain strategies for handling outliers in your analysis.",
  "What is the difference between correlation and causation? Can you give an example where correlation might mislead?",
  "How do you test whether two samples come from the same distribution?",
  "Write a SQL query to find the second-highest salary in a table of employee records.",
  "How would you optimize a slow JOIN between two large tables?",
  "Given sales data by region and product, what chart would you choose to highlight underperforming areas?",
  "Describe a dashboard you built in Tableau or Power BI—what KPIs did you include and why?",
  "In Pandas, how do you merge two DataFrames on multiple keys?",
  "Explain how you would use window functions in SQL or equivalent in BigQuery.",
  "Here is a CSV of customer churn. How would you approach analyzing churn drivers?",
  "Design an A/B test to evaluate a new feature on an e‑commerce site.",
  "Tell me about a time when your analysis influenced a key business decision.",
  "How do you prioritize competing requests from stakeholders?"],
    finalized: false,
    createdAt: "2024-03-14T15:30:00Z",
  },
];