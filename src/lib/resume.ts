export interface PersonalInfo {
  name: string;
  titles: string[];
  email: string;
  phone: string;
  location: string;
  website: string;
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
  location: string;
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

export const englishResumeData: ResumeData = {
  personalInfo: {
    name: "Máximo Augusto Wehncke",
    titles: ["Software Engineering Student", "Ski Instructor"],
    email: "resume@maximowehncke.com",
    phone: "(+54) 92972 507823",
    location: "Arcos 1167, CABA, Buenos Aires",
    website: "www.maximowehncke.com",
    summary: `Software Engineering student at Instituto Tecnológico de Buenos Aires (ITBA). 
		Focused on backend systems and infrastructure — REST APIs, authentication, and low-level
		networking — with projects ranging from a REST API built with Java and Spring to a SOCKS5 
		proxy built from scratch in C. Also a certified ski instructor, having taught at Cerro Chapelco.`,
  },
  skills: [
    "Backend API design & authentication (REST, JWT)",
    "Systems programming in C (I/O multiplexing, finite state machines)",
    "Go, Java, TypeScript across production and coursework projects",
    "Spring Boot / Spring Security",
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
      location: "Buenos Aires, Argentina",
      period: "March 2022 – Present",
    },
    {
      degree: "Exchange Semester",
      institution: "Politecnico di Torino",
      location: "Turin, Italy",
      period: "February 2026 – July 2026",
    },
    {
      degree: "Cambridge B2 First Certificate (FCE)",
      institution: "Cambridge Assessment English",
      location: "San Martín de los Andes, Argentina",
      period: "2021",
    },
    {
      degree: "Bachelor of Economics",
      institution: "Colegio San Pablo Apóstol",
      location: "San Martín de los Andes, Argentina",
      period: "March 2017 – December 2021",
    },
    {
      degree: "Level 1 Ski Instructor Course",
      institution: "AADIDESS",
      location: "San Martín de los Andes, Argentina",
      period: "Winter Season 2020",
    },
  ],
};

export const spanishResumeData: ResumeData = {
  personalInfo: {
    name: "Máximo Augusto Wehncke",
    titles: ["Estudiante de Ingeniería Informática", "Instructor de esquí"],
    email: "resume@maximowehncke.com",
    phone: "(+54) 92972 507823",
    location: "Arcos 1167, CABA, Buenos Aires",
    website: "www.maximowehncke.com",
    summary: `Estudiante de Ingeniería Informática en el Instituto Tecnológico de Buenos Aires (ITBA). 
		Enfocado en sistemas backend e infraestructura — APIs REST, autenticación y redes 
		de bajo nivel — con proyectos que van desde una API REST desarrollada en equipo con 
		Java y Spring hasta un proxy SOCKS5 en C hecho desde cero. Instructor de esquí certificado, 
		habiendo enseñado en el Cerro Chapelco.`,
  },
  skills: [
    "Diseño de APIs backend y autenticación (REST, JWT)",
    "Programación de sistemas en C (multiplexación de I/O, máquinas de estado finitas)",
    "Go, Java, TypeScript en proyectos productivos y académicos",
    "Spring Boot / Spring Security",
    "Comunicación clara de conceptos técnicos (ayudante de cátedra de POO)",
  ],
  interests: [
    "Sistemas backend y programación de redes",
    "Diseño de APIs y autenticación (REST, JWT)",
    "Infraestructura self-hosted (VPS, Docker, reverse proxies)",
  ],
  languages: [
    { language: "Español", fluency: "Nativo" },
    { language: "Inglés", fluency: "Intermedio Avanzado" },
    { language: "Italiano", fluency: "Básico" },
  ],
  hobbies: [
    "Tocar la guitarra / batería",
    "Vóley",
    "Esquí",
    "Lectura",
    "Running",
  ],
  experience: [
    {
      role: "Ayudante para Programación Orientada a Objetos",
      company: "ITBA",
      location: "Buenos Aires, Argentina",
      period: "Agosto 2024 – Presente",
      bullets: [
        "Guiar a estudiantes en trabajos de programación en Java de nivel básico e intermedio.",
        "Explicar conceptos como herencia, encapsulamiento y polimorfismo.",
        "Ayudar a debuggear y revisar las entregas de código de los estudiantes.",
      ],
    },
    {
      role: "Asistente de Ventas Inmobiliarias",
      company: "Tierras del Sur Negocios Inmobiliarios y Rurales",
      location: "San Martín de los Andes, Argentina",
      period: "Enero 2025 – Febrero 2025",
      bullets: [
        "Acompañar a clientes a visitas de propiedades, incluyendo ubicaciones remotas o de difícil acceso.",
      ],
    },
    {
      role: "Instructor de esquí",
      company: "Cerro Chapelco",
      location: "San Martín de los Andes, Argentina",
      period: "Temporadas de invierno 2021 y 2022",
      bullets: [
        "Dictar clases de esquí individuales y grupales.",
        "Adaptar el estilo de enseñanza a distintos ritmos de aprendizaje y edades.",
      ],
    },
  ],
  education: [
    {
      degree: "Ingeniería Informática",
      institution: "Instituto Tecnológico de Buenos Aires (ITBA)",
      location: "Buenos Aires, Argentina",
      period: "Marzo 2022 – Presente",
    },
    {
      degree: "Intercambio Académico",
      institution: "Politecnico di Torino",
      location: "Turín, Italia",
      period: "Febrero 2026 – Julio 2026",
    },
    {
      degree: "Cambridge B2 First Certificate (FCE)",
      institution: "Cambridge Assessment English",
      location: "San Martín de los Andes, Argentina",
      period: "2021",
    },
    {
      degree: "Bachiller en Economía",
      institution: "Colegio San Pablo Apóstol",
      location: "San Martín de los Andes, Argentina",
      period: "Marzo 2017 – Diciembre 2021",
    },
    {
      degree: "Curso de Instructor de esquí Nivel 1",
      institution: "AADIDESS",
      location: "San Martín de los Andes, Argentina",
      period: "Temporada de invierno 2020",
    },
  ],
};
