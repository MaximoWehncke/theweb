import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import NetworkOverlay from "@/components/NetworkOverlay";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Dynamic Network Traffic Simulation Overlay */}
      <NetworkOverlay />

      {/* Lightweight Hardware-Accelerated Ambient Glow System (0% CPU/Blur Lag) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft static radial glow - Top Right */}
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-primary/10 opacity-60 pointer-events-none" />
        {/* Soft static radial glow - Bottom Left */}
        <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] rounded-full bg-primary/10 opacity-50 pointer-events-none" />
        {/* Subtle center ambient radial highlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.04] pointer-events-none" />
      </div>

      {/* High-Tech Network Cyber Grid Background (Lightweight CSS SVG Matrix) */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="container relative z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl pointer-events-auto data-no-hop"
          data-no-hop
          data-hero-text-card
        >
          <p className="text-primary text-sm mb-4 tracking-wider font-mono">
            Hi! My name is
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-4">
            <span className="text-foreground">Máximo Wehncke</span>
            <span className="text-primary">.</span>
          </h1>
          <h2 className="text-2xl md:text-4xl md:whitespace-nowrap font-bold text-muted-foreground mb-6">
            Software engineer in the making.
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed text-sm md:text-base md:whitespace-nowrap">
            CS student at{" "}
            <a
              href="https://itba.edu.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground underline hover:text-primary transition-colors underline-offset-4 hover:underline font-medium"
            >
              ITBA
            </a>
            . Former competitive skier. Love building backend.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="#projects"
              className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity shadow-sm"
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
          className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto data-no-hop"
          data-no-hop
        >
          <a href="#projects" aria-label="Scroll to projects">
            <ArrowDown
              className="text-muted-foreground animate-bounce"
              size={20}
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
