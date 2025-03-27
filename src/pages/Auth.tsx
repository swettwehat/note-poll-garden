
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import LoginForm from "../components/LoginForm";

const Auth = () => {
  return (
    <div className="min-h-screen flex flex-col bg-theme-black">
      <header className="p-4 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <Link 
            to="/" 
            className="flex items-center text-sm text-foreground/70 hover:text-theme-green transition-colors duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
          </Link>
        </div>
      </header>
      
      <main className="flex-1 p-6 md:p-12 flex items-center justify-center">
        <div className="w-full max-w-md animate-fade-in">
          <LoginForm />
        </div>
      </main>
      
      <footer className="py-6 px-6 border-t border-border text-center">
        <p className="text-sm text-foreground/50">
          © {new Date().getFullYear()} QrNotes. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Auth;
