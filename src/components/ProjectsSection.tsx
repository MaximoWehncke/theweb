import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Code2, Cat, Play } from "lucide-react";
import { Button } from "./ui/button";

export interface Project {
  id?: string;
  title: string;
  subject?: string;
  inProgress: boolean;
  category: "Personal" | "University";
  description: string;
  tech: string[];
  concepts?: string[];
  objectives?: string;
  github: string;
  demo?: string;
  videoUrl?: string;
  posterUrl: string;
  slug?: string;
}

const projects: Project[] = [
  {
    id: "moneytrackker",
    title: "Moneytrackker",
    category: "Personal",
    inProgress: true,
    description: `Full-stack financial management platform for tracking expenses, income, and category budgets with real-time updates. Features a high-performance Go REST API built with Chi, and PostgreSQL with JWT authentication, paired with a React SPA powered by TanStack Router, TanStack Query, and Tailwind CSS.`,
    tech: [
      "React",
      "TypeScript",
      "Go (Golang)",
      "Chi Router",
      "PostgreSQL",
      "sqlc",
      "TanStack Query",
      "TanStack Router",
      "Tailwind CSS",
    ],
    concepts: ["JWT Authentication", "REST API Design"],
    objectives:
      "I wanted to learn how to develop a REST API in Go, see the benefits in performance, and understand how to keep a full-stack app production-ready and available.",
    github: "https://github.com/MaximoWehncke/moneytrackker",
    demo: "https://moneytrackker.maximowehncke.com",
    posterUrl: "/images/og-image.png",
  },
  {
    id: "socks5-proxy",
    title: "SOCKS5 Proxy & Management Server",
    category: "University",
    inProgress: false,
    subject: "Communication Protocols",
    description: `High-performance, non-blocking asynchronous SOCKS5 proxy server built from scratch in C using POSIX I/O multiplexing (select/pselect/epoll) and finite state machines (FSM). Includes an out-of-band SCTP/TCP management protocol client, user authentication, and Docker benchmark suite.`,
    tech: [
      "C",
      "POSIX Sockets",
      "SOCKS5 Protocol",
      "SCTP",
      "Docker",
      "Makefile",
    ],
    concepts: [
      "Finite State Machines",
      "I/O Multiplexing (select/epoll)",
      "Non-blocking I/O",
    ],
    objectives: `The course objective was to apply all the concepts and protocols learned in class to develop the proxy, learning how to use POSIX I/O multiplexing to implement a non-blocking asynchronous server.`,
    github: "https://github.com/Protos-2025/Socks5Proxy",
    posterUrl: "/images/og-image.png",
    videoUrl: "/videos/protos.webm",
  },
  {
    id: "x86-kernel",
    title: "x86-64 OS Kernel & Userland",
    category: "University",
    inProgress: false,
    subject: "Operating Systems",
    description: `A 64-bit bare-metal operating system kernel built from scratch in C and x86-64 Assembly. Features a preemptive priority scheduler, custom Buddy memory allocator, POSIX-style semaphores, anonymous IPC pipes, VGA graphics, and hardware audio drivers.`,
    tech: ["C", "x86-64 Assembly", "VGA Drivers", "QEMU"],
    concepts: [
      "Preemptive Scheduling",
      "IPC & Semaphores",
      "Buddy Memory Allocator",
      "OS Kernel Design",
    ],
    objectives: `The course objective was to apply, in practice, all the theoretical concepts learned in class — such as processes, scheduling, and memory allocation — to develop a kernel that can run on a real machine.`,
    github: "https://github.com/lmoliveto/TP2-SO-2025",
    posterUrl: "/images/og-image.png",
    videoUrl: "/videos/so.webm",
  },
  {
    id: "cplus-compiler",
    title: "CPlus Compiler Toolchain",
    category: "University",
    inProgress: false,
    subject: "Language Theory and Compilers",
    description: `A custom programming language compiler toolchain built with Flex (lexical analysis), Bison (LALR parsing), C, and CMake. Performs AST construction, semantic analysis, symbol table management, and target code generation.`,
    tech: ["C", "Flex", "Bison", "CMake", "Docker"],
    concepts: [
      "AST Construction",
      "Semantic Analysis",
      "LALR Parsing",
      "Compiler Design",
    ],
    objectives: `The course objective was to narrow the gap between the theory and practice of compiler design, learning how to use Flex and Bison to build a compiler.`,
    github: "https://github.com/TLA-2025-0mega/cplus",
    posterUrl: "/images/og-image.png",
    videoUrl: "/videos/tla.webm",
  },
  {
    id: "valise",
    title: "Valise - Hotel Management",
    category: "University",
    inProgress: false,
    subject: "Web Application Project",
    description: `Multi-tiered hospitality and hotel management platform for owners, staff, and guests. Built with a Spring MVC & Spring Security REST API, Hibernate/JPA, and PostgreSQL backend, integrated with a React 19 SPA featuring TanStack Router, TanStack Query, and i18next internationalization.`,
    tech: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "Hibernate/JPA",
      "PostgreSQL",
      "React",
      "TypeScript",
      "TanStack Router",
      "TanStack Query",
      "Tailwind CSS",
      "i18next",
    ],
    concepts: ["Multi-tenant Architecture", "Role-based Access Control"],
    objectives: `The course objective was to first learn the traditional, more server-side inclined way of developing a web application using JSP, then build a backend with the goal of clearly understanding the REST and HATEOAS concepts.`,
    github: "https://github.com/paw-2025b-02/tp0",
    posterUrl: "/images/og-image.png",
  },
  {
    id: "matchpoint",
    title: "MatchPoint",
    category: "University",
    inProgress: false,
    subject: "Software Engineering I",
    description: `Full-stack sports venue booking and matchmaking platform built as a monorepo. Features a Remix (React) web app with server-side API routes deployed on Vercel, paired with a React Native (Expo) mobile application and PostgreSQL database.`,
    tech: [
      "Remix",
      "React",
      "React Native",
      "Expo",
      "TypeScript",
      "PostgreSQL",
      "Tailwind CSS",
      "Vercel",
    ],
    concepts: ["Monorepo Architecture", "Matchmaking Algorithms"],
    objectives: `The course objective was to learn how to develop the full pipeline, from initial development to a production-ready application that effectively solves a real-life problem, picking up concepts such as SCRUM and CI/CD along the way.`,
    github: "https://github.com/itba-tpietravallo/TPE-IS1",
    posterUrl: "/images/og-image.png",
  },
  {
    id: "vector-paint",
    title: "Vector Paint Canvas Studio",
    category: "University",
    inProgress: false,
    subject: "Object-Oriented Programming",
    description: `An object-oriented vector graphics drawing desktop engine built in Java and JavaFX. Features layered canvas state management, geometric shape hierarchy (Circles, Ellipses, Rectangles, Squares), movable/copiable interfaces, undo/redo state tracking, and custom rendering.`,
    tech: ["Java", "JavaFX"],
    concepts: [
      "Object-Oriented Design",
      "Design Patterns",
      "UML Architecture",
      "Undo/Redo State Tracking",
    ],
    objectives: `The course objective was to solidify the Object-Oriented Design concepts learned in class.`,
    github: "https://github.com/itba-tpietravallo/TPE-POO-2024",
    posterUrl: "/images/og-image.png",
    videoUrl: "/videos/poo.webm",
  },
  {
    id: "flowpay",
    title: "FlowPay - Mobile Payment Platform",
    category: "University",
    inProgress: false,
    subject: "Human-Computer Interaction",
    description: `Native Android mobile digital wallet built in Kotlin using Jetpack Compose and Material Design 3. Features real-time balance streaming with reactive StateFlow, multi-language support (English/Spanish), dynamic dark mode, and tablet layouts.`,
    tech: [
      "Kotlin",
      "Jetpack Compose",
      "Android",
      "Material Design 3",
      "StateFlow",
      "REST API",
      "Gradle",
    ],
    concepts: ["Reactive State Management", "Internationalization (i18n)"],
    objectives: `The course objective was to learn the main concepts of HCI, such as user interface, user experience, and user behavior.`,
    github: "https://github.com/fspivak/TP3_HCI_2025",
    posterUrl: "/images/og-image.png",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ProjectCard = ({ p }: { p: Project }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "objectives">(
    "overview",
  );

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      variants={item}
      className="group bg-card border border-border rounded-lg overflow-hidden glow-card flex flex-col"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-video w-full bg-muted overflow-hidden border-b border-border">
        {/* In Progress Badge */}
        {p.inProgress && (
          <div className="absolute top-3 left-3 z-10">
            <span className="flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider bg-primary/20 text-primary border border-primary/30 backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
              </span>
              In Progress
            </span>
          </div>
        )}

        {p.videoUrl ? (
          <>
            <img
              src={p.posterUrl}
              alt={p.title}
              className="w-full h-full object-cover"
            />
            <video
              ref={videoRef}
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            >
              <source src={p.videoUrl} type="video/webm" />
            </video>
          </>
        ) : (
          <img
            src={p.posterUrl}
            alt={p.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Video Preview indicator badge */}
        {p.videoUrl && (
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-white/90 text-xs font-medium border border-white/15 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
            <Play size={12} className="fill-current text-primary" />
            <span>Video Preview</span>
          </div>
        )}

        <div className="absolute top-3 right-3 z-10">
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium backdrop-blur-md ${
              p.category === "University"
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "bg-primary/20 text-primary border border-primary/30"
            }`}
          >
            {p.subject ? `${p.category} • ${p.subject}` : p.category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 transition-transform duration-300 group-hover:scale-[1.02] origin-top">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors pr-2">
            {p.title}
          </h3>
          <div className="flex items-center gap-3 shrink-0">
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.title} GitHub repository`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Cat size={20} />
              </a>
            )}
            {p.demo && (
              <a
                href={p.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.title} live demo`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>

        {/* Tab Switcher for Overview / Objectives */}
        {p.objectives && (
          <div className="flex items-center gap-1 mb-4 border-b border-border/50 pb-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`text-xs font-medium px-2.5 py-1 rounded-md transition-colors ${
                activeTab === "overview"
                  ? "bg-secondary text-primary font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("objectives")}
              className={`text-xs font-medium px-2.5 py-1 rounded-md transition-colors ${
                activeTab === "objectives"
                  ? "bg-secondary text-primary font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              Objectives
            </button>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === "overview" || !p.objectives ? (
          <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
            {p.description}
          </p>
        ) : (
          <div className="bg-muted/30 border-l-2 border-primary p-3.5 rounded-r-md mb-5 flex-1 text-sm text-muted-foreground leading-relaxed italic">
            {p.objectives}
          </div>
        )}

        {/* For future deep dive */}
        {p.slug && (
          <a
            href={`/projects/${p.slug}`}
            className="text-sm text-primary hover:underline mb-4 block"
          >
            Read full case study &rarr;
          </a>
        )}

        {/* Concepts */}
        {p.concepts && p.concepts.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {p.concepts.map((concept) => (
              <span
                key={concept}
                className="text-[11px] px-2 py-0.5 rounded border border-border/60 bg-muted/40 text-muted-foreground font-medium"
              >
                {concept}
              </span>
            ))}
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {p.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded-full bg-secondary text-primary font-medium"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-spacing">
      <div className="container">
        <SectionHeading number="01" title="Projects" />

        <p className="text-muted-foreground text-base mb-8 leading-relaxed">
          Here are some of the projects I’ve worked on. The university projects
          were developed throughout my studies at ITBA in collaboration with
          friends and colleagues, while the personal projects are my own
          individual work, built independently to explore new ideas and
          workflows.
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {projects.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export const SectionHeading = ({
  number,
  title,
}: {
  number: string;
  title: string;
}) => (
  <div className="flex items-center gap-3 mb-10">
    <span className="text-primary text-sm font-medium">{number}.</span>
    <h2 className="text-2xl font-bold text-foreground">{title}</h2>
    <div className="flex-1 h-px bg-border ml-4" />
  </div>
);

export default ProjectsSection;
