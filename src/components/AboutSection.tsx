import { motion } from "framer-motion";
import { SectionHeading } from "./ProjectsSection";

const AboutSection = () => {
  return (
    <section id="about" className="section-spacing">
      <div className="container">
        <SectionHeading number="03" title="About Me" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
            <p className="text-muted-foreground text-sm leading-relaxed">
              I'm a Software Engineering student who thrives on turning ideas
              into working software. I'm drawn to full-stack development—I enjoy
              the challenge of designing clean APIs just as much as crafting
              intuitive user interfaces.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              My approach to code is shaped by curiosity and a desire to
              understand how things work under the hood. I'm always
              experimenting with new technologies and building projects that
              push my skills forward.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Outside of code, I work as a{" "}
              <span className="text-primary">ski instructor</span>—an
              experience that's taught me discipline, clear communication, and
              the ability to break down complex concepts for different audiences.
              Skills that translate directly into writing better software and
              collaborating with teams.
            </p>

            {/* Terminal-style element */}
            <div className="mt-6 bg-background rounded-md border border-border p-4 font-mono text-xs">
              <div className="flex gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
              </div>
              <p className="text-muted-foreground">
                <span className="text-primary">$</span> cat interests.txt
              </p>
              <p className="text-foreground mt-1">
                web development, system design, open source, skiing ⛷️
              </p>
              <p className="text-muted-foreground mt-2">
                <span className="text-primary">$</span> echo $STATUS
              </p>
              <p className="text-foreground mt-1">
                Open to internship opportunities 🚀
              </p>
              <p className="text-muted-foreground mt-2">
                <span className="text-primary">$</span>{" "}
                <span className="animate-blink">▌</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
