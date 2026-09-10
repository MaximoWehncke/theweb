import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import WebResume from "@/components/resume/WebResume";
import PdfDocument from "@/components/resume/PdfDocument";
import { pdf } from "@react-pdf/renderer";
import { Download, ArrowLeft, Loader2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/resume")({
  component: ResumePage,
});

function ResumePage() {
  const [isGenerating, setIsGenerating] = useState<"en" | "es" | null>(null);

  const handleDownloadPDF = async (lang: "en" | "es") => {
    try {
      setIsGenerating(lang);
      const blob = await pdf(<PdfDocument lang={lang} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Maximo_Wehncke-CV-${lang === "en" ? "EN" : "ES"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsGenerating(null);
    }
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="relative border-primary/30 text-primary hover:bg-primary/10 hover:text-primary hover:border-primary flex items-center gap-2 h-9 px-4 text-xs font-semibold rounded transition-all duration-300 shadow-[var(--glow-orange)] hover:shadow-[var(--glow-orange-strong)]"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-3.5 w-3.5" />
                    <span>Download PDF</span>
                    <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleDownloadPDF("en")}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownloadPDF("es")}>
                Spanish
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Render the WebResume component */}
        <main className="py-2">
          <WebResume />
        </main>
      </div>
    </div>
  );
}
