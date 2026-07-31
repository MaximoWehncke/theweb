import { motion } from "framer-motion";
import { resumeData } from "@/lib/resume";
import {
  Mail,
  Phone,
  MapPin,
  Code,
  Languages,
  Heart,
  Compass,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};

export default function WebResume() {
  const {
    personalInfo,
    skills,
    interests,
    languages,
    hobbies,
    experience,
    education,
  } = resumeData;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full bg-background text-foreground font-mono leading-relaxed space-y-8"
    >
      {/* Header section with glow background */}
      <motion.header
        variants={itemVariants}
        className="relative border border-border p-6 md:p-8 rounded-lg bg-card/50 overflow-hidden shadow-[var(--glow-orange)] transition-all duration-300 hover:shadow-[var(--glow-orange-strong)]"
      >
        {/* Subtle decorative glowing orb */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-8 relative z-10">
          {/* Photo and Identity */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 md:gap-6 text-center sm:text-left w-full md:w-auto">
            {/* Rounded Profile Photo */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-primary/50 shadow-[var(--glow-orange)] group-hover:border-primary transition-all duration-300">
              <img
                src="/images/resume-photo.png"
                alt={personalInfo.name}
                className="w-full h-full object-cover scale-[1.35] translate-y-1 group-hover:scale-[1.4] transition-transform duration-300"
              />
            </div>

            {/* Identity Text */}
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gradient-orange">
                {personalInfo.name}
              </h1>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                {personalInfo.titles.map((title, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded text-xs font-semibold bg-primary/10 text-primary border border-primary/20"
                  >
                    {title}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2 text-sm text-muted-foreground w-full md:w-auto border-t border-border/50 md:border-none pt-4 md:pt-0">
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center justify-center sm:justify-start md:justify-start gap-2 hover:text-primary transition-colors py-0.5"
            >
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <span className="truncate">{personalInfo.email}</span>
            </a>
            <a
              href={`tel:${personalInfo.phone}`}
              className="flex items-center justify-center sm:justify-start md:justify-start gap-2 hover:text-primary transition-colors py-0.5"
            >
              <Phone className="h-4 w-4 text-primary shrink-0" />
              <span>{personalInfo.phone}</span>
            </a>
            <div className="flex items-center justify-center sm:justify-start md:justify-start gap-2 py-0.5">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <span className="text-center sm:text-left leading-none">
                {personalInfo.location}
              </span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Profile Summary */}
      <motion.section
        variants={itemVariants}
        className="border border-border p-6 rounded-lg bg-card/30"
      >
        <h2 className="text-lg font-bold text-primary mb-3 flex items-center gap-2 tracking-wider uppercase border-b border-border pb-1">
          <span className="w-1.5 h-4 bg-primary inline-block rounded-sm"></span>
          Summary
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed text-justify">
          {personalInfo.summary}
        </p>
      </motion.section>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column: Experience & Education */}
        <div className="md:col-span-2 space-y-8">
          {/* Experience */}
          <motion.section variants={itemVariants} className="space-y-6">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2 tracking-wider uppercase border-b border-border pb-1">
              <span className="w-1.5 h-4 bg-primary inline-block rounded-sm"></span>
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative pl-4 border-l-2 border-border hover:border-primary transition-all duration-300"
                >
                  {/* Timeline bullet dot */}
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-border group-hover:bg-primary transition-colors" />

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                    <div>
                      <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors">
                        {item.role}
                      </h3>
                      <p className="text-sm font-semibold text-primary">
                        {item.company}
                      </p>
                      {item.location && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground/80 font-normal mt-0.5 mb-1.5">
                          <MapPin className="h-3 w-3 text-primary/70 shrink-0" />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap bg-muted/50 px-2 py-0.5 rounded border border-border">
                      {item.period}
                    </span>
                  </div>

                  <ul className="list-none space-y-1.5 text-sm text-muted-foreground">
                    {item.bullets.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="flex items-start gap-2">
                        <span className="text-primary mt-1 shrink-0">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Education */}
          <motion.section variants={itemVariants} className="space-y-6">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2 tracking-wider uppercase border-b border-border pb-1">
              <span className="w-1.5 h-4 bg-primary inline-block rounded-sm"></span>
              Education
            </h2>
            <div className="space-y-6">
              {education.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative pl-4 border-l-2 border-border hover:border-primary transition-all duration-300"
                >
                  {/* Timeline bullet dot */}
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-border group-hover:bg-primary transition-colors" />

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                    <div>
                      <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors">
                        {item.degree}
                      </h3>
                      <p className="text-sm font-semibold text-primary">
                        {item.institution}
                      </p>
                      {item.location && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground/80 font-normal mt-0.5">
                          <MapPin className="h-3 w-3 text-primary/70 shrink-0" />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap bg-muted/50 px-2 py-0.5 rounded border border-border">
                      {item.period}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Right column: Skills, Languages, Interests, Hobbies */}
        <div className="space-y-8">
          {/* Skills */}
          <motion.section
            variants={itemVariants}
            className="border border-border p-5 rounded-lg bg-card/20 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.5)]"
          >
            <h2 className="text-base font-bold text-primary mb-4 flex items-center gap-2 tracking-wider uppercase border-b border-border pb-1">
              <Code className="h-4 w-4 shrink-0" />
              Skills
            </h2>
            <div className="flex flex-col gap-2">
              {skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="text-xs border border-border bg-card/60 rounded px-3 py-2 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-card transition-all duration-300"
                >
                  {skill}
                </div>
              ))}
            </div>
          </motion.section>

          {/* Languages */}
          <motion.section
            variants={itemVariants}
            className="border border-border p-5 rounded-lg bg-card/20 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.5)]"
          >
            <h2 className="text-base font-bold text-primary mb-4 flex items-center gap-2 tracking-wider uppercase border-b border-border pb-1">
              <Languages className="h-4 w-4 shrink-0" />
              Languages
            </h2>
            <div className="space-y-3">
              {languages.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="font-bold text-foreground">
                    {item.language}
                  </span>
                  <span className="text-xs text-muted-foreground bg-muted/60 px-2 py-0.5 rounded border border-border">
                    {item.fluency}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Interests */}
          <motion.section
            variants={itemVariants}
            className="border border-border p-5 rounded-lg bg-card/20 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.5)]"
          >
            <h2 className="text-base font-bold text-primary mb-4 flex items-center gap-2 tracking-wider uppercase border-b border-border pb-1">
              <Compass className="h-4 w-4 shrink-0" />
              Interests
            </h2>
            <div className="flex flex-col gap-2">
              {interests.map((interest, idx) => (
                <div
                  key={idx}
                  className="text-xs border border-border bg-card/60 rounded px-3 py-2 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-card transition-all duration-300"
                >
                  {interest}
                </div>
              ))}
            </div>
          </motion.section>

          {/* Hobbies */}
          <motion.section
            variants={itemVariants}
            className="border border-border p-5 rounded-lg bg-card/20 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.5)]"
          >
            <h2 className="text-base font-bold text-primary mb-4 flex items-center gap-2 tracking-wider uppercase border-b border-border pb-1">
              <Heart className="h-4 w-4 shrink-0" />
              Hobbies
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {hobbies.map((hobby, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground px-2.5 py-1 rounded border border-border transition-colors duration-200"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
}
