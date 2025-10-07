import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, LayoutDashboard, Briefcase, User, UserCheck, LogOut, Plus } from "lucide-react";

const RecruiterNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/recruiter/dashboard" className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-[hsl(var(--recruiter-primary))]" />
          <span className="text-xl font-bold text-[hsl(var(--recruiter-primary))]">CampusCatalyst</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-2">
          <Link to="/recruiter/dashboard">
            <Button variant={isActive("/recruiter/dashboard") ? "default" : "ghost"} size="sm" className={isActive("/recruiter/dashboard") ? "bg-[hsl(var(--recruiter-primary))]" : ""}>
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <Link to="/recruiter/jobs">
            <Button variant={isActive("/recruiter/jobs") ? "default" : "ghost"} size="sm" className={isActive("/recruiter/jobs") ? "bg-[hsl(var(--recruiter-primary))]" : ""}>
              <Briefcase className="h-4 w-4 mr-2" />
              My Jobs
            </Button>
          </Link>
          <Link to="/recruiter/applicants">
            <Button variant={isActive("/recruiter/applicants") ? "default" : "ghost"} size="sm" className={isActive("/recruiter/applicants") ? "bg-[hsl(var(--recruiter-primary))]" : ""}>
              <UserCheck className="h-4 w-4 mr-2" />
              Applicants
            </Button>
          </Link>
          <Link to="/recruiter/post-job">
            <Button variant={isActive("/recruiter/post-job") ? "default" : "ghost"} size="sm" className={isActive("/recruiter/post-job") ? "bg-[hsl(var(--recruiter-primary))]" : ""}>
              <Plus className="h-4 w-4 mr-2" />
              Post Job
            </Button>
          </Link>
          <Link to="/recruiter/profile">
            <Button variant={isActive("/recruiter/profile") ? "default" : "ghost"} size="sm" className={isActive("/recruiter/profile") ? "bg-[hsl(var(--recruiter-primary))]" : ""}>
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </Link>
        </div>

        <Link to="/login">
          <Button variant="ghost" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default RecruiterNav;
