
import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate on mount with a slight delay for better perception
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden px-6 md:px-12 pt-16">
      <div className="max-w-7xl mx-auto w-full z-10">
        <div className="flex flex-col items-center text-center">
          <div 
            className={`mb-6 opacity-0 ${isVisible ? "animate-fade-in" : ""}`}
            style={{ animationDelay: "0.2s" }}
          >
            <span className="px-3 py-1 rounded-full bg-theme-green/10 border border-theme-green/30 text-theme-green text-xs font-medium">
              Create Notes & Polls with QR Codes
            </span>
          </div>
          
          <h1 
            className={`text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 opacity-0 ${
              isVisible ? "animate-fade-in" : ""
            }`}
            style={{ animationDelay: "0.4s" }}
          >
            Share <span className="text-gradient">Ideas</span> and <br/>
            Collect <span className="text-gradient">Feedback</span> Instantly
          </h1>
          
          <p 
            className={`text-lg md:text-xl text-foreground/70 max-w-2xl mb-10 opacity-0 ${
              isVisible ? "animate-fade-in" : ""
            }`}
            style={{ animationDelay: "0.6s" }}
          >
            Create notes and polls with just a few clicks. Share them instantly with 
            beautiful QR codes. No account needed for basic access.
          </p>
          
          <div 
            className={`flex flex-col sm:flex-row gap-4 mb-20 opacity-0 ${
              isVisible ? "animate-fade-in" : ""
            }`}
            style={{ animationDelay: "0.8s" }}
          >
            <a href="#notes" className="btn-primary">
              Create a Note
            </a>
            <a href="#polls" className="btn-outline">
              Create a Poll
            </a>
          </div>
        </div>
      </div>

      {/* Animated down arrow */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#notes" aria-label="Scroll down">
          <ArrowDown className="h-8 w-8 text-theme-green opacity-70 hover:opacity-100 transition-opacity" />
        </a>
      </div>

      {/* Background effects */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-theme-green/20 rounded-full filter blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-theme-green/10 rounded-full filter blur-[120px]" />
      </div>
    </section>
  );
};

export default Hero;
