import { useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Cat } from "lucide-react";

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
      "Golang",
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
    title: "Operating System Kernel & Userland",
    category: "University",
    description:
      "A 64-bit bare-metal operating system kernel built from scratch in C and x86-64 Assembly. Features a preemptive priority scheduler, custom Buddy memoryallocator, POSIX-style semaphores, anonymous IPC pipes, VGA graphics, and hardware audio drivers.",
    tech: [
      "C",
      "Assembly",
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
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
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
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            poster={p.posterUrl}
            className="w-full h-full object-contain bg-slate-950"
          >
            <source src={p.videoUrl} type="video/webm" />
            <img
              src={p.posterUrl}
              alt={p.title}
              className="w-full h-full object-contain bg-slate-950"
            />
          </video>
        ) : (
          <img
            src={p.posterUrl}
            alt={p.title}
            className="w-full h-full object-contain bg-slate-950"
          />
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
            className="text-sm text-sidebar-accent-foreground hover:underline mb-4 block"
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
