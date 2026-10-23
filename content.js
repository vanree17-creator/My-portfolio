/*
 * ============================================================
 *  content.js — ALL the text on the website lives in this file.
 *  To update the portfolio, edit ONLY this file:
 *    - change text between the quotes "..."
 *    - to add a project, copy one { ... } block inside "projects"
 *      and paste it after a comma.
 *  You never need to touch index.html or style.css.
 * ============================================================
 */
const CONTENT = {
  name: "Evance Daniel Komba",
  title: "Telecommunication Engineering Student · ML & Full-Stack Developer",
  location: "Mbeya, Tanzania",
  email: "evancekomba17@gmail.com",

  // These words are "typed" one after another after "I am a". Start each with a consonant so "a" reads correctly.
  roles: ["Machine Learning Developer", "Full-Stack Web Developer", "Future AI Engineer", "Problem Solver"],

  // Put a square photo in the "assets" folder and write its file name here,
  // e.g. "assets/photo.jpg". Leave it as "" to show initials instead.
  photo:"assets/photo.jpg",

  // Put the CV in the "assets" folder, e.g. "assets/Evance-Komba-CV.pdf".
  // Leave it as "" to hide the "Download CV" button.
  cv:"",

  shortBio:
    "I build machine learning models and full-stack web applications that solve real problems in Africa.",

  about: [
    "I am a first-year Telecommunication Engineering student at the University of Mbeya, Tanzania. I build machine learning models and full-stack web applications, such as AGRI-SENSE AI, a tool that helps farmers understand and solve soil problems.",
    "My goal is to become a skilled machine learning and deep learning engineer and full-stack developer who uses technology to help solve real-world problems.",
  ],

  openTo: [
    "Internships",
    "Junior developer roles",
    "Freelance web projects",
    "Research assistant positions",
    "Scholarships",
  ],

  languages: "Kiswahili (native) · English (working proficiency)",

  // Skills are grouped. Add or remove words inside the [ ... ] lists.
  skills: [
    { group: "Machine Learning", items: ["Python", "pandas", "scikit-learn", "TensorFlow"] },
    { group: "Artificial Intelligence", items: ["NLP", "Computer vision", "LLMs", "Prompt engineering"] },
    { group: "Front-end", items: ["HTML", "CSS", "JavaScript", "React"] },
    { group: "Back-end", items: ["FastAPI", "Django", "Node.js"] },
    { group: "Databases", items: ["PostgreSQL", "MongoDB"] },
    { group: "Tools", items: ["Git & GitHub", "Docker", "Linux", "Jupyter"] },
  ],

  // category must be one or more of: "ML", "AI", "Web"
  projects: [
    {
      name: "AGRI-SENSE AI",
      category: ["ML", "AI", "Web"],
      problem: "Helps farmers identify and solve soil problems on their farms using machine learning.",
      did: "Collected the data, trained the machine learning model, and built an API and web interface to serve predictions.",
      tech: ["Python", "FastAPI", "React"],
      result: "End-to-end system: from raw data to a working web app.",
      link: "https://github.com/vanree17-creator/AGRI-SENSE-AI",
    },
    {
      name: "Catarina's Delights",
      category: ["Web"],
      problem: "Lets customers order products online and have them delivered to where they are.",
      did: "Built the full-stack website: front-end pages, back-end API and ordering flow.",
      tech: ["Python", "FastAPI", "React"],
      result: "Deployed online.",
      link: "https://github.com/vanree17-creator/webpage",
    },
    {
      name: "Zindi Data Science Competitions",
      category: ["ML"],
      problem: "Practising machine learning on real African datasets in public competitions.",
      did: "Explored data, engineered features and trained models to compete on Zindi leaderboards.",
      tech: ["Python", "pandas", "scikit-learn"],
      result: "Ongoing — see my Zindi profile.",
      link: "https://zindi.world/users/vanree_thon",
    },
  ],

  education: [
    {
      degree: "BSc Telecommunication Engineering",
      school: "University of Mbeya",
      years: "Year 1 · Expected graduation 2029",
      details: "Relevant courses: Machine Learning, Data Structures, Web Development, Databases.",
    },
  ],

  // Communities and organisations. Copy a { ... } block to add another.
  // "link" can be "" if there is no web page.
  communities: [
    {
      name: "Signi AI Hub",
      role: "Member",
      details: "Part of an AI community where I learn, share knowledge and work with others on artificial intelligence.",
      link: "",
    },
  ],

  links: [
    { label: "GitHub", url: "https://github.com/vanree17-creator" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/evance-komba-31a51742b/" },
    { label: "Zindi", url: "https://zindi.world/users/vanree_thon" },
  ],
};