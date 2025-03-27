
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import NoteCreator from "../components/NoteCreator";
import PollCreator from "../components/PollCreator";

const Index = () => {
  // Add animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        
        if (isVisible) {
          element.classList.add('animated');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-theme-black text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <NoteCreator />
      <PollCreator />
      
      {/* Features Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="px-3 py-1 rounded-full bg-theme-green/10 border border-theme-green/30 text-theme-green text-xs font-medium">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Simple, powerful tools designed to help you share information and collect feedback with ease.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Beautiful QR Codes",
                description: "Instantly create custom QR codes for your notes and polls that can be scanned by any device."
              },
              {
                title: "No Account Required",
                description: "Get started right away without signing up. Create up to 3 notes and 1 poll for free."
              },
              {
                title: "Real-time Results",
                description: "See poll results update in real-time as participants submit their responses."
              },
              {
                title: "Simple Sharing",
                description: "Share your content via QR codes or copyable links to reach your audience instantly."
              },
              {
                title: "Minimalist Design",
                description: "Clean, distraction-free interface focuses on what matters—your content."
              },
              {
                title: "Mobile Friendly",
                description: "Create and view notes and polls on any device with our responsive design."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="card-primary hover:border-theme-green/30 transition-colors duration-300 animate-on-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-bold mb-3 text-gradient">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-t from-theme-black to-theme-darkGray">
        <div className="max-w-7xl mx-auto text-center animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-10">
            Create your first note or poll in seconds. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/auth" className="btn-primary">
              Create Free Account
            </a>
            <a href="#notes" className="btn-outline">
              Try It Now
            </a>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 px-6 md:px-12 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="font-bold text-xl text-gradient">QrNotes</span>
            <p className="text-sm text-foreground/60 mt-2">
              Share ideas and collect feedback instantly.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
            <a href="#" className="text-sm text-foreground/70 hover:text-theme-green transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-foreground/70 hover:text-theme-green transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-foreground/70 hover:text-theme-green transition-colors duration-300">
              Contact
            </a>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-border/30 text-center">
          <p className="text-sm text-foreground/50">
            © {new Date().getFullYear()} QrNotes. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
