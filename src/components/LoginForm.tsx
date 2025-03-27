
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

type FormType = "login" | "signup";

const LoginForm = () => {
  const [formType, setFormType] = useState<FormType>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleFormType = () => {
    setFormType(formType === "login" ? "signup" : "login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, this would call an authentication API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful authentication
      if (formType === "login") {
        toast.success("Logged in successfully");
        localStorage.setItem("isLoggedIn", "true");
      } else {
        toast.success("Account created successfully");
        localStorage.setItem("isLoggedIn", "true");
      }
      
      // In a real app, we would redirect or update auth state here
    } catch (error) {
      toast.error(formType === "login" 
        ? "Failed to log in. Please check your credentials." 
        : "Failed to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-primary max-w-md w-full mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">
          {formType === "login" ? "Welcome Back" : "Create an Account"}
        </h2>
        <p className="text-foreground/70">
          {formType === "login" 
            ? "Log in to access unlimited notes and polls" 
            : "Sign up for unlimited access to all features"
          }
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail className="h-4 w-4 text-foreground/60" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input-primary w-full pl-10"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock className="h-4 w-4 text-foreground/60" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-primary w-full pl-10 pr-10"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-foreground/60 hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            formType === "login" ? "Login" : "Sign Up"
          )}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-foreground/70">
          {formType === "login" 
            ? "Don't have an account?" 
            : "Already have an account?"
          }
          <button
            type="button"
            onClick={toggleFormType}
            className="ml-1 text-theme-green hover:text-theme-lightGreen focus-ring transition-colors duration-300"
          >
            {formType === "login" ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
