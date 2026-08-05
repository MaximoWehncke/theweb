import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import NetworkOverlay from "@/components/NetworkOverlay";

const HeroSection = () => {
  // Mouse tracking for soft reactive background movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for lag effect
  const springX = useSpring(mouseX, { stiffness: 45, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 25 });

  // Map mouse coordinates to subtle parallax offsets
  const glow1X = useTransform(springX, [0, 1920], [-40, 40]);
  const glow1Y = useTransform(springY, [0, 1080], [-40, 40]);

  const glow2X = useTransform(springX, [0, 1920], [40, -40]);
  const glow2Y = useTransform(springY, [0, 1080], [40, -40]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Dynamic Network Traffic Simulation Overlay */}
      <NetworkOverlay />

      {/* Ambient drifting glow — pure CSS, autonomous motion + GPU-only mouse reactive parallax */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glow 1 (Top-Right) */}
        <motion.div
          style={{ x: glow1X, y: glow1Y }}
          className="absolute -top-24 -right-24 w-[500px] h-[500px]"
        >
          <div className="glow-drift-1 w-full h-full rounded-full bg-primary/10 blur-[100px]" />
        </motion.div>

        {/* Glow 2 (Bottom-Left) */}
        <motion.div
          style={{ x: glow2X, y: glow2Y }}
          className="absolute -bottom-24 -left-24 w-[500px] h-[500px]"
        >
          <div className="glow-drift-2 w-full h-full rounded-full bg-primary/10 blur-[100px]" />
        </motion.div>

        {/* Center Ambient circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.04]" />
      </div>

      {/* Cyber grid background */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Soft fade into the next (black) section */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent to-background pointer-events-none z-10" />

      {/* Beautiful flowing wave divider transition to mask the separation into ProjectsSection */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] pointer-events-none z-20">
        <svg
          className="relative block w-full h-[60px] md:h-[100px] min-w-[1200px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          {/* Wave 1: Slow, deep base layer */}
          <motion.path
            d="M0,40 C300,70 600,10 900,60 L1200,30 L1200,120 L0,120 Z"
            className="fill-background/40"
            animate={{
              d: [
                "M0,40 C300,70 600,10 900,60 L1200,30 L1200,120 L0,120 Z",
                "M0,30 C300,50 600,30 900,45 L1200,40 L1200,120 L0,120 Z",
                "M0,40 C300,70 600,10 900,60 L1200,30 L1200,120 L0,120 Z",
              ],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Wave 2: Mid-level fluid layer */}
          <motion.path
            d="M0,50 C300,20 600,80 900,30 L1200,60 L1200,120 L0,120 Z"
            className="fill-background/70"
            animate={{
              d: [
                "M0,50 C300,20 600,80 900,30 L1200,60 L1200,120 L0,120 Z",
                "M0,40 C350,55 650,35 950,55 L1200,45 L1200,120 L0,120 Z",
                "M0,50 C300,20 600,80 900,30 L1200,60 L1200,120 L0,120 Z",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Wave 3: Top Crisp solid background layer to merge perfectly */}
          <motion.path
            d="M0,60 C300,30 600,90 900,40 L1200,70 L1200,120 L0,120 Z"
            className="fill-background"
            animate={{
              d: [
                "M0,60 C300,30 600,90 900,40 L1200,70 L1200,120 L0,120 Z",
                "M0,55 C350,75 650,50 950,80 L1200,60 L1200,120 L0,120 Z",
                "M0,60 C300,30 600,90 900,40 L1200,70 L1200,120 L0,120 Z",
              ],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>

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
          className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto data-no-hop z-30"
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
