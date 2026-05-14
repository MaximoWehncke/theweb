import { motion } from "framer-motion";
import { SectionHeading } from "./ProjectsSection";

const skillGroups = [
  {
    category: "Languages",
    skills: ["TypeScript", "Java", "C", "Python", "SQL"],
  },
  {
    category: "Frameworks & Libraries",
    skills: ["React", "Node.js", "Spring Boot"],
  },
  {
    category: "Tools & Technologies",
    skills: ["Git", "Docker", "PostgreSQL", "Linux"],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="section-spacing">
      <div className="container">
        <SectionHeading number="02" title="Skills" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-semibold text-primary mb-4 tracking-wider uppercase">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1.5 rounded-md bg-secondary text-foreground border border-border hover:border-primary/50 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
