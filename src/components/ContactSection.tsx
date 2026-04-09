import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { SectionHeading } from "./ProjectsSection";

const contacts = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com",
    display: "github.com/yourname",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com",
    display: "linkedin.com/in/yourname",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:hello@example.com",
    display: "hello@example.com",
  },
];

const ContactSection = () => {
  return (
    <section id="contact" className="section-spacing">
      <div className="container">
        <SectionHeading number="04" title="Get In Touch" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-lg"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            I'm currently looking for internship opportunities. Whether you have
            a question or just want to say hi, feel free to reach out—I'll do my
            best to get back to you.
          </p>

          <div className="space-y-4">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <c.icon
                  size={18}
                  className="text-muted-foreground group-hover:text-primary transition-colors"
                />
                <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  {c.display}
                </span>
              </a>
            ))}
          </div>

          <a
            href="mailto:hello@example.com"
            className="inline-block mt-10 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Say Hello
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
