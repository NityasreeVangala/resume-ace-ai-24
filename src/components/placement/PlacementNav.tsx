import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, LayoutDashboard, Users, Briefcase, Calendar, FileText, LogOut, Building2 } from "lucide-react";

const PlacementNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/placement/dashboard" className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-[hsl(var(--placement-primary))]" />
          <span className="text-xl font-bold text-[hsl(var(--placement-primary))]">CampusCatalyst</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-2">
          <Link to="/placement/dashboard">
            <Button variant={isActive("/placement/dashboard") ? "default" : "ghost"} size="sm" className={isActive("/placement/dashboard") ? "bg-[hsl(var(--placement-primary))]" : ""}>
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <Link to="/placement/students">
            <Button variant={isActive("/placement/students") ? "default" : "ghost"} size="sm" className={isActive("/placement/students") ? "bg-[hsl(var(--placement-primary))]" : ""}>
              <Users className="h-4 w-4 mr-2" />
              Students
            </Button>
          </Link>
          <Link to="/placement/recruiters">
            <Button variant={isActive("/placement/recruiters") ? "default" : "ghost"} size="sm" className={isActive("/placement/recruiters") ? "bg-[hsl(var(--placement-primary))]" : ""}>
              <Building2 className="h-4 w-4 mr-2" />
              Recruiters
            </Button>
          </Link>
          <Link to="/placement/jobs">
            <Button variant={isActive("/placement/jobs") ? "default" : "ghost"} size="sm" className={isActive("/placement/jobs") ? "bg-[hsl(var(--placement-primary))]" : ""}>
              <Briefcase className="h-4 w-4 mr-2" />
              Job Listings
            </Button>
          </Link>
          <Link to="/placement/drives">
            <Button variant={isActive("/placement/drives") ? "default" : "ghost"} size="sm" className={isActive("/placement/drives") ? "bg-[hsl(var(--placement-primary))]" : ""}>
              <Calendar className="h-4 w-4 mr-2" />
              Placement Drives
            </Button>
          </Link>
          <Link to="/placement/reports">
            <Button variant={isActive("/placement/reports") ? "default" : "ghost"} size="sm" className={isActive("/placement/reports") ? "bg-[hsl(var(--placement-primary))]" : ""}>
              <FileText className="h-4 w-4 mr-2" />
              Reports
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

export default PlacementNav;
