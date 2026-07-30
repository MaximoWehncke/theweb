import { createFileRoute, Link } from "@tanstack/react-router";
import WebResume from "@/components/resume/WebResume";
import { Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/resume")({
  component: ResumePage,
});

function ResumePage() {
  const handleDownloadPDF = () => {
    // Placeholder handler for PDF download
    alert("PDF download function will be wired up in the next step!");
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Navigation & Actions Top Bar */}
        <div className="flex justify-between items-center bg-card/20 border border-border p-3 rounded-lg backdrop-blur-sm">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Portfolio</span>
          </Link>
          
          <Button 
            onClick={handleDownloadPDF}
            variant="outline"
            className="relative border-primary/30 text-primary hover:bg-primary/10 hover:text-primary hover:border-primary flex items-center gap-2 h-9 px-4 text-xs font-semibold rounded transition-all duration-300 shadow-[var(--glow-orange)] hover:shadow-[var(--glow-orange-strong)]"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download PDF</span>
          </Button>
        </div>

        {/* Render the WebResume component */}
        <main className="py-2">
          <WebResume />
        </main>
        
      </div>
    </div>
  );
}
