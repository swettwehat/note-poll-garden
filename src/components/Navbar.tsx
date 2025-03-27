
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { title: "Notes", href: "#notes" },
    { title: "Polls", href: "#polls" },
    { title: "Login", href: "/auth" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 ${
        scrolled ? "py-3 bg-theme-black/80 backdrop-blur-lg shadow-lg" : "py-5 bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link 
          to="/" 
          className="font-bold text-xl md:text-2xl text-gradient"
        >
          QrNotes
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              to={link.href}
              className={`text-sm font-medium transition-all duration-300 hover:text-theme-green focus-ring ${
                link.title === "Login" ? "btn-primary" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus-ring p-1 rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-theme-green" />
          ) : (
            <Menu className="h-6 w-6 text-theme-green" />
          )}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-theme-black/95 backdrop-blur-lg border-b border-theme-green/20 shadow-lg py-5 px-6 md:hidden animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.href}
                  className={`text-base font-medium transition-all duration-300 hover:text-theme-green py-2 px-3 ${
                    link.title === "Login" ? "btn-primary w-full text-center" : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
