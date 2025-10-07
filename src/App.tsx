import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Student Pages
import StudentDashboard from "./pages/student/Dashboard";
import StudentJobs from "./pages/student/Jobs";
import StudentProfile from "./pages/student/Profile";
import StudentResumeAnalyzer from "./pages/student/ResumeAnalyzer";
import StudentApplications from "./pages/student/Applications";

// Recruiter Pages
import RecruiterDashboard from "./pages/recruiter/Dashboard";
import RecruiterJobs from "./pages/recruiter/Jobs";
import RecruiterPostJob from "./pages/recruiter/PostJob";
import RecruiterApplicants from "./pages/recruiter/Applicants";
import RecruiterProfile from "./pages/recruiter/Profile";

// Placement Pages
import PlacementDashboard from "./pages/placement/Dashboard";
import PlacementStudents from "./pages/placement/Students";
import PlacementRecruiters from "./pages/placement/Recruiters";
import PlacementJobs from "./pages/placement/Jobs";
import PlacementDrives from "./pages/placement/Drives";
import PlacementReports from "./pages/placement/Reports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/jobs" element={<StudentJobs />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/resume-analyzer" element={<StudentResumeAnalyzer />} />
          <Route path="/student/applications" element={<StudentApplications />} />
          
          {/* Recruiter Routes */}
          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
          <Route path="/recruiter/jobs" element={<RecruiterJobs />} />
          <Route path="/recruiter/post-job" element={<RecruiterPostJob />} />
          <Route path="/recruiter/applicants" element={<RecruiterApplicants />} />
          <Route path="/recruiter/profile" element={<RecruiterProfile />} />
          
          {/* Placement Routes */}
          <Route path="/placement/dashboard" element={<PlacementDashboard />} />
          <Route path="/placement/students" element={<PlacementStudents />} />
          <Route path="/placement/recruiters" element={<PlacementRecruiters />} />
          <Route path="/placement/jobs" element={<PlacementJobs />} />
          <Route path="/placement/drives" element={<PlacementDrives />} />
          <Route path="/placement/reports" element={<PlacementReports />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
