export interface PersonalInfo {
  name: string;
  titles: string[];
  email: string;
  phone: string;
  location: string;
  summary: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
}

export interface LanguageItem {
  language: string;
  fluency: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  skills: string[];
  interests: string[];
  languages: LanguageItem[];
  hobbies: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
}

export const resumeData: ResumeData = {
  personalInfo: {
    name: "Máximo Augusto Wehncke",
    titles: ["Software Engineering Student", "Ski Instructor"],
    email: "maximowehncke@gmail.com",
    phone: "(+54) 92972 507823",
    location: "Arcos 1167, CABA, Buenos Aires",
    summary:
      "Motivated and versatile student with a passion for both software and sports. Raised in a small southern Argentinian town, bringing grounded work ethic and strong adaptability to every challenge. Certified ski instructor with great interpersonal abilities. Used to balancing academic commitment with hands-on work, whether it's tackling complex programming challenges or teaching on the slopes. Enthusiastic about continuous learning, teamwork, and solving practical problems.",
  },
  skills: [
    "Adapting to new software",
    "Assist in Object-Oriented (OOP) Programming labs",
    "Communicate technical ideas clearly",
  ],
  interests: [
    "Artificial intelligence / machine learning",
    "Videogame developing",
  ],
  languages: [
    { language: "Spanish", fluency: "Native" },
    { language: "English", fluency: "Upper Intermediate" },
  ],
  hobbies: [
    "Playing guitar / drums",
    "Volleyball",
    "Skiing",
    "Reading",
    "Traveling",
  ],
  experience: [
    {
      role: "Object Oriented Programming (OOP) Assistant",
      company: "Instituto Tecnológico de Buenos Aires (ITBA)",
      period: "August 2024 – Present",
      bullets: [
        "Guide students with basic and intermediate Java programming tasks.",
        "Clarify object-oriented concepts like inheritance, encapsulation, and polymorphism.",
        "Help debug and review students' code submissions.",
      ],
    },
    {
      role: "Real Estate Sales Assistant",
      company: "Tierras del Sur Negocios Inmobiliarios y Rurales",
      period: "January 2025 – February 2025",
      bullets: [
        "Accompanied clients to property viewings, including remote or hard-to-access locations.",
      ],
    },
    {
      role: "Ski Instructor",
      company: "Cerro Chapelco",
      period: "Winter Seasons 2021 & 2022",
      bullets: [
        "Conducted individual and group ski lessons.",
        "Adapted teaching style to various learning speeds and ages.",
      ],
    },
  ],
  education: [
    {
      degree: "Software Engineering",
      institution: "Instituto Tecnológico de Buenos Aires (ITBA)",
      period: "March 2022 – Present",
    },
    {
      degree: "Bachelor of Economics",
      institution:
        "Colegio San Pablo Apóstol, San Martín de los Andes, Neuquén, Argentina",
      period: "March 2017 – December 2021",
    },
    {
      degree: "Level 1 Ski Instructor Course",
      institution: "AADIDESS",
      period: "Winter Season 2020",
    },
  ],
};
