import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold bg-gradient-to-r from-[hsl(var(--landing-primary))] via-[hsl(var(--landing-secondary))] to-[hsl(var(--landing-accent))] bg-clip-text text-transparent">
            CampusCatalyst
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </a>
          <a href="#for-students" className="text-sm font-medium hover:text-primary transition-colors">
            For Students
          </a>
          <a href="#for-recruiters" className="text-sm font-medium hover:text-primary transition-colors">
            For Recruiters
          </a>
          <a href="#for-placement" className="text-sm font-medium hover:text-primary transition-colors">
            For Placement
          </a>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/register">
            <Button className="bg-gradient-to-r from-[hsl(var(--landing-secondary))] to-[hsl(var(--landing-accent))] hover:opacity-90 transition-smooth">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-4">
            <a href="#features" className="block text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#for-students" className="block text-sm font-medium hover:text-primary transition-colors">
              For Students
            </a>
            <a href="#for-recruiters" className="block text-sm font-medium hover:text-primary transition-colors">
              For Recruiters
            </a>
            <a href="#for-placement" className="block text-sm font-medium hover:text-primary transition-colors">
              For Placement
            </a>
            <div className="flex flex-col space-y-2 pt-4">
              <Link to="/login">
                <Button variant="ghost" className="w-full">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button className="w-full bg-gradient-to-r from-[hsl(var(--landing-secondary))] to-[hsl(var(--landing-accent))]">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
