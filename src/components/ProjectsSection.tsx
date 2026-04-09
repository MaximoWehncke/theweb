import { motion } from "framer-motion";
import { ExternalLink, GitlabIcon as Github } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce app with cart, checkout, and Stripe integration. Built for a course project and handles real payment flows.",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "Task Management API",
    description:
      "RESTful API with JWT auth, role-based access control, and real-time WebSocket notifications for team collaboration.",
    tech: ["Express", "TypeScript", "MongoDB", "Socket.io"],
    github: "https://github.com",
  },
  {
    title: "Weather Dashboard",
    description:
      "Responsive weather app pulling live data from OpenWeather API with location search, 5-day forecasts, and chart visualizations.",
    tech: ["React", "Tailwind CSS", "Chart.js", "REST API"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "Dev Portfolio CLI",
    description:
      "A terminal-style portfolio you can run with npx. Showcases projects, skills, and contact info in a fun interactive CLI format.",
    tech: ["Node.js", "TypeScript", "Ink", "CLI"],
    github: "https://github.com",
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

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-spacing">
      <div className="container">
        <SectionHeading number="01" title="Projects" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {projects.map((p) => (
            <motion.div
              key={p.title}
              variants={item}
              className="group bg-card border border-border rounded-lg p-6 glow-card flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <div className="flex gap-3">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`${p.title} GitHub`}
                  >
                    <Github size={18} />
                  </a>
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`${p.title} live demo`}
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                {p.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-full bg-secondary text-primary font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
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
