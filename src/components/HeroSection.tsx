import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const isMobile = useIsMobile();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Animated orange orbs — appear and disappear */}
      <motion.div
        className="absolute top-[10%] right-[15%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-primary/[0.2] md:bg-primary/[0.25] blur-[80px] md:blur-[130px]"
        animate={{
          opacity: [0, 1, 0.7, 0],
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [0.8, 1.2, 0.9, 0.8],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[15%] left-[0%] w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full bg-primary/[0.18] md:bg-primary/[0.22] blur-[70px] md:blur-[110px]"
        animate={{
          opacity: [0.6, 0, 0.9, 0.6],
          x: [0, -30, 25, 0],
          y: [0, 40, -20, 0],
          scale: [1, 0.7, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {!isMobile && (
        <>
          <motion.div
            className="absolute top-[45%] right-[5%] w-[450px] h-[450px] rounded-full bg-primary/[0.18] blur-[100px]"
            animate={{
              opacity: [0, 1, 0.4, 0],
              x: [40, -30, 60, 40],
              y: [-20, 50, -60, -20],
              scale: [0.7, 1.2, 0.9, 0.7],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          />
          <motion.div
            className="absolute top-[25%] left-[25%] w-[350px] h-[350px] rounded-full bg-primary/[0.3] blur-[80px]"
            animate={{
              opacity: [0, 1, 0, 0.8, 0],
              scale: [0.4, 1.5, 0.6, 1.2, 0.4],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute bottom-[35%] right-[30%] w-[500px] h-[500px] rounded-full bg-primary/[0.15] blur-[120px]"
            animate={{
              opacity: [0.4, 0, 1, 0, 0.4],
              x: [-20, 40, -60, 20, -20],
              y: [30, -40, 20, -30, 30],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          />
          <motion.div
            className="absolute top-[5%] left-[10%] w-[400px] h-[400px] rounded-full bg-primary/[0.2] blur-[100px]"
            animate={{
              opacity: [0, 0.9, 0, 0.7, 0],
              x: [0, 50, -30, 20, 0],
              y: [0, -30, 60, -20, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5,
            }}
          />
        </>
      )}

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
            Hi! My name is
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-4">
            <span className="text-foreground">Maximo Wehncke</span>
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
              className="text-muted-foreground underline hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              ITBA
            </a>
            . Former competitive skier. Love building backend.
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
