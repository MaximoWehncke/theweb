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
              As AI tools become more integrated into software development, it’s
              becoming easier to build things without fully understanding what’s
              happening beneath the surface. I think there’s real value in
              resisting that tendency. A big part of my approach to engineering
              is understanding systems deeply — the abstractions, tradeoffs, and
              implementation details behind the software I build.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Before studying software engineering, I competed in alpine skiing
              at a national level. That meant waking up early every weekend to
              train, spending entire seasons around the sport, and pursuing it
              with a level of discipline that shaped a big part of who I am
              today. I also had the opportunity to train across multiple winters
              on places like France, Italy and United States. Following
              something so seriously from a young age taught me consistency,
              discipline, and how to stay committed to long-term goals.{" "}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Later, at 17, I earned my professional{" "}
              <span className="text-primary">ski instructor </span>
              certification. Teaching both kids and adults helped me develop
              clear communication skills, patience, and the ability to adapt to
              very different people and learning styles.
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
                understanding systems, building software, alpine skiing ⛷️
              </p>
              <p className="text-muted-foreground mt-2">
                <span className="text-primary">$</span> echo $STATUS
              </p>
              <p className="text-foreground mt-1">
                Open to internship opportunities!
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
