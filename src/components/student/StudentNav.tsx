import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, LayoutDashboard, Briefcase, User, FileText, LogOut, FolderOpen } from "lucide-react";

const StudentNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/student/dashboard" className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-[hsl(var(--student-primary))]" />
          <span className="text-xl font-bold text-[hsl(var(--student-primary))]">CampusCatalyst</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-2">
          <Link to="/student/dashboard">
            <Button variant={isActive("/student/dashboard") ? "default" : "ghost"} size="sm" className={isActive("/student/dashboard") ? "bg-[hsl(var(--student-primary))]" : ""}>
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <Link to="/student/jobs">
            <Button variant={isActive("/student/jobs") ? "default" : "ghost"} size="sm" className={isActive("/student/jobs") ? "bg-[hsl(var(--student-primary))]" : ""}>
              <Briefcase className="h-4 w-4 mr-2" />
              Job Listings
            </Button>
          </Link>
          <Link to="/student/resume-analyzer">
            <Button variant={isActive("/student/resume-analyzer") ? "default" : "ghost"} size="sm" className={isActive("/student/resume-analyzer") ? "bg-[hsl(var(--student-primary))]" : ""}>
              <FileText className="h-4 w-4 mr-2" />
              Resume Analyzer
            </Button>
          </Link>
          <Link to="/student/applications">
            <Button variant={isActive("/student/applications") ? "default" : "ghost"} size="sm" className={isActive("/student/applications") ? "bg-[hsl(var(--student-primary))]" : ""}>
              <FolderOpen className="h-4 w-4 mr-2" />
              My Applications
            </Button>
          </Link>
          <Link to="/student/profile">
            <Button variant={isActive("/student/profile") ? "default" : "ghost"} size="sm" className={isActive("/student/profile") ? "bg-[hsl(var(--student-primary))]" : ""}>
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

export default StudentNav;
