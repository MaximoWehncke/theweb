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
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          <div className="bg-card border border-border rounded-lg p-6 md:p-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                I'm a Software Engineering student who likes building things
                from the ground up. I gravitate toward backend and systems work
                — REST APIs, authentication, low-level networking — over
                frontend development, and I'd rather understand how something
                works underneath than just get it running. That's part of why,
                working collaboratively at university, we've built things like a
                proxy server and an OS kernel from scratch in C instead of
                relying on existing libraries — I think understanding the
                abstractions we were using is crucial.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                I was raised in San Martín de los Andes, a small town in
                Patagonia, Argentina. Before studying software engineering, I
                competed in alpine skiing at a national level, training across
                multiple winters in France, Italy, and the United States. That
                level of commitment from a young age taught me discipline and
                how to stick with something long-term.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Later, at 17, I earned my professional{" "}
                <span className="text-primary">ski instructor </span>
                certification. Teaching both kids and adults taught me patience
                and how to adapt to very different people and learning styles —
                something I still notice in how I approach TAing and explaining
                technical concepts to students today.
              </p>
            </div>

            {/* Terminal-style element */}
            <div className="mt-6 lg:mt-0 bg-background rounded-md border border-border p-4 font-mono text-xs">
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
              <p className="text-foreground mt-1">Open to work!</p>
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
