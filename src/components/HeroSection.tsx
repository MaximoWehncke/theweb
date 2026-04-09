import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Animated orange orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/[0.07] blur-[120px]"
        animate={{ x: [0, 60, -30, 0], y: [0, -40, 50, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 left-[10%] w-[350px] h-[350px] rounded-full bg-primary/[0.05] blur-[100px]"
        animate={{ x: [0, -50, 40, 0], y: [0, 60, -30, 0], scale: [1, 0.85, 1.15, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[60%] right-[15%] w-[250px] h-[250px] rounded-full bg-primary/[0.04] blur-[80px]"
        animate={{ x: [0, 30, -60, 0], y: [0, -50, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="text-primary text-sm mb-4 tracking-wider">
            Hi, my name is
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-4">
            <span className="text-foreground">Maximo Wehncke</span>
            <span className="text-primary">.</span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-muted-foreground mb-6">
            I build things for the web.
          </h2>
          <p className="text-muted-foreground max-w-lg mb-10 leading-relaxed text-sm md:text-base">
            Software Engineering student passionate about crafting clean,
            efficient, and user-focused applications. Currently seeking
            internship opportunities to grow and contribute.
          </p>

          <div className="flex gap-4 flex-wrap">
            <a
              href="#projects"
              className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-md border border-primary text-primary font-medium text-sm hover:bg-primary/10 transition-colors"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a href="#projects" aria-label="Scroll to projects">
            <ArrowDown className="text-muted-foreground animate-bounce" size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
