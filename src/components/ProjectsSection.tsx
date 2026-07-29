import { useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Code2, Cat, Play } from "lucide-react";
import { Button } from "./ui/button";

export interface Project {
  title: string;
  category: "Personal" | "University";
  description: string;
  tech: string[];
  github: string;
  demo?: string;
  videoUrl?: string;
  posterUrl: string;
  slug?: string;
}

const projects: Project[] = [
  {
    title: "Moneytrackker",
    category: "Personal",
    description:
      "Full-stack financial management platform for tracking expenses, income, and category budgets with real-time updates. Features a high-performance Go REST API built with Chi, sqlc, and PostgreSQL with JWT authentication, paired with a modern React SPA powered by TanStack Router, TanStack Query, and Tailwind CSS.",
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
    github: "https://github.com/MaximoWehncke/moneytrackker",
    demo: "https://moneytrackker.maximowehncke.com",
    posterUrl: "/images/og-image.png",
  },
  {
    title: "Valise - Hotel Management",
    category: "University",
    description:
      "Multi-tiered hospitality and hotel management platform for owners, staff, and guests. Built with a Spring MVC & Spring Security REST API, Hibernate/JPA, and PostgreSQL backend, integrated with a React 19 SPA featuring TanStack Router, TanStack Query, and i18next internationalization.",
    tech: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "PostgreSQL",
      "React",
      "TypeScript",
      "TanStack Router",
      "TanStack Query",
      "Tailwind CSS",
    ],
    github: "https://github.com/paw-2025b-02/tp0",
    posterUrl: "/images/og-image.png",
  },
  {
    title: "MatchPoint",
    category: "University",
    description:
      "Full-stack sports venue booking and matchmaking platform built as a monorepo. Features a Remix (React) web app with server-side API routes deployed on Vercel, paired with a React Native (Expo) mobile application and PostgreSQL database.",
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
    github: "https://github.com/itba-tpietravallo/TPE-IS1",
    posterUrl: "/images/og-image.png",
  },
  {
    title: "SOCKS5 Proxy & Management Server",
    category: "University",
    description:
      "High-performance, non-blocking asynchronous SOCKS5 proxy server built from scratch in C using POSIX I/O multiplexing (select/pselect/epoll) and finite state machines (FSM). Includes an out-of-band SCTP/TCP management protocol client, user authentication, and Docker benchmark suite.",
    tech: [
      "C",
      "POSIX Sockets",
      "FSM",
      "SOCKS5 Protocol",
      "SCTP",
      "Docker",
      "Makefile",
    ],
    github: "https://github.com/Protos-2025/Socks5Proxy",
    posterUrl: "/images/og-image.png",
    videoUrl: "/videos/protos.webm",
  },
  {
    title: "CPlus Compiler Toolchain",
    category: "University",
    description:
      "A custom programming language compiler toolchain built with Flex (lexical analysis), Bison (LALR parsing), C, and CMake. Performs AST construction, semantic analysis, symbol table management, and target code generation.",
    tech: [
      "C",
      "Flex",
      "Bison",
      "CMake",
      "AST & Parsing",
      "Compiler Design",
      "Docker",
    ],
    github: "https://github.com/TLA-2025-0mega/cplus",
    posterUrl: "/images/og-image.png",
    videoUrl: "/videos/tla.webm",
  },
  {
    title: "FlowPay - Mobile Payment Platform",
    category: "University",
    description:
      "Native Android mobile digital wallet built in Kotlin using Jetpack Compose and Material Design 3. Features real-time balance streaming with reactive StateFlow, multi-language support (English/Spanish), dynamic dark mode, and tablet layouts.",
    tech: [
      "Kotlin",
      "Jetpack Compose",
      "Android",
      "Material Design 3",
      "StateFlow",
      "REST API",
      "Gradle",
    ],
    github: "https://github.com/fspivak/TP3_HCI_2025",
    posterUrl: "/images/og-image.png",
  },
  {
    title: "Vector Paint Canvas Studio",
    category: "University",
    description:
      "An object-oriented vector graphics drawing desktop engine built in Java and JavaFX. Features layered canvas state management, geometric shape hierarchy (Circles, Ellipses, Rectangles, Squares), movable/copiable interfaces, undo/redo state tracking, and custom rendering.",
    tech: [
      "Java",
      "JavaFX",
      "Object-Oriented Design",
      "Design Patterns",
      "UML Architecture",
    ],
    github: "https://github.com/itba-tpietravallo/TPE-POO-2024",
    posterUrl: "/images/og-image.png",
    videoUrl: "/videos/poo.webm",
  },
  {
    title: "x86-64 OS Kernel & Userland",
    category: "University",
    description:
      "A 64-bit bare-metal operating system kernel built from scratch in C and x86-64 Assembly. Features a preemptive priority scheduler, custom Buddy memory allocator, POSIX-style semaphores, anonymous IPC pipes, VGA graphics, and hardware audio drivers.",
    tech: [
      "C",
      "x86-64 Assembly",
      "OS Kernels",
      "Preemptive Scheduling",
      "IPC & Semaphores",
      "Buddy Memory Allocator",
      "VGA Drivers",
      "QEMU",
    ],
    github: "https://github.com/lmoliveto/TP2-SO-2025",
    posterUrl: "/images/og-image.png",
    videoUrl: "/videos/so.webm",
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
            {p.category}
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

        <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
          {p.description}
        </p>

        {/* For future deep dive */}
        {p.slug && (
          <a
            href={`/projects/${p.slug}`}
            className="text-sm text-primary hover:underline mb-4 block"
          >
            Read full case study &rarr;
          </a>
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
