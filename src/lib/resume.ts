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
  location: string;
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
    email: "resume@maximowehncke.com",
    phone: "(+54) 92972 507823",
    location: "Arcos 1167, CABA, Buenos Aires",
    summary: `Software Engineering student at Instituto Tecnológico de Buenos Aires (ITBA). 
		Focused on backend systems and infrastructure — REST APIs, authentication, and low-level
		networking — with projects ranging from a solo Go-based finance API to a collaborative SOCKS5 
		proxy built in C. Also a certified ski instructor, having taught at Cerro Chapelco.`,
  },
  skills: [
    "Backend API design & authentication (REST, JWT)",
    "Systems programming in C (I/O multiplexing, finite state machines)",
    "Go, Java, TypeScript across production and coursework projects",
    "Communicate technical concepts clearly (OOP teaching assistant)",
  ],
  interests: [
    "Backend systems & network programming",
    "API design & authentication (REST, JWT)",
    "Self-hosted infrastructure (VPS, Docker, reverse proxies)",
  ],
  languages: [
    { language: "Spanish", fluency: "Native" },
    { language: "English", fluency: "Upper Intermediate" },
    { language: "Italian", fluency: "Basic" },
  ],
  hobbies: [
    "Playing guitar / drums",
    "Volleyball",
    "Skiing",
    "Reading",
    "Running",
  ],
  experience: [
    {
      role: "Object Oriented Programming (OOP) Assistant",
      company: "ITBA",
      location: "Buenos Aires, Argentina",
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
      location: "San Martín de los Andes, Argentina",
      period: "January 2025 – February 2025",
      bullets: [
        "Accompanied clients to property viewings, including remote or hard-to-access locations.",
      ],
    },
    {
      role: "Ski Instructor",
      company: "Cerro Chapelco",
      location: "San Martín de los Andes, Argentina",
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
      degree: "Exchange Semester",
      institution: "Politecnico di Torino, Turin, Italy",
      period: "February 2026 – July 2026",
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
