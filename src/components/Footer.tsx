import { Cat, Link } from "lucide-react";

const Footer = () => (
  <footer className="py-6 border-t border-border">
    <div className="container flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left */}
      <p className="text-xs text-muted-foreground">© 2026 Máximo Wehncke</p>

      {/* Right */}
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/MaximoWehncke"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <Cat size={18} />
        </a>

        <a
          href="https://linkedin.com/in/máximo-wehncke-b02197248"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <Link size={18} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
