import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold bg-gradient-to-r from-[hsl(var(--landing-primary))] to-[hsl(var(--landing-secondary))] bg-clip-text text-transparent">
            CampusCatalyst
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </Link>
          <Link to="/#for-students" className="text-sm font-medium hover:text-primary transition-colors">
            For Students
          </Link>
          <Link to="/#for-recruiters" className="text-sm font-medium hover:text-primary transition-colors">
            For Recruiters
          </Link>
          <Link to="/#for-placement" className="text-sm font-medium hover:text-primary transition-colors">
            For Placement
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
