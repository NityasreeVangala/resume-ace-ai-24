import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

// ✅ Helper function to check auth
const isAuthorized = (role: string) => {
  const authToken = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");
  return !!authToken && userRole === role;
};

// ✅ ProtectedRoute component
const ProtectedRoute = ({ role, children }: { role: string; children: JSX.Element }) => {
  return isAuthorized(role) ? children : <Navigate to="/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Student Routes */}
          <Route
            path="/student/dashboard"
            element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>}
          />
          <Route
            path="/student/jobs"
            element={<ProtectedRoute role="student"><StudentJobs /></ProtectedRoute>}
          />
          <Route
            path="/student/profile"
            element={<ProtectedRoute role="student"><StudentProfile /></ProtectedRoute>}
          />
          <Route
            path="/student/resume-analyzer"
            element={<ProtectedRoute role="student"><StudentResumeAnalyzer /></ProtectedRoute>}
          />
          <Route
            path="/student/applications"
            element={<ProtectedRoute role="student"><StudentApplications /></ProtectedRoute>}
          />

          {/* Recruiter Routes */}
          <Route
            path="/recruiter/dashboard"
            element={<ProtectedRoute role="recruiter"><RecruiterDashboard /></ProtectedRoute>}
          />
          <Route
            path="/recruiter/jobs"
            element={<ProtectedRoute role="recruiter"><RecruiterJobs /></ProtectedRoute>}
          />
          <Route
            path="/recruiter/post-job"
            element={<ProtectedRoute role="recruiter"><RecruiterPostJob /></ProtectedRoute>}
          />
          <Route
            path="/recruiter/applicants"
            element={<ProtectedRoute role="recruiter"><RecruiterApplicants /></ProtectedRoute>}
          />
          <Route
            path="/recruiter/profile"
            element={<ProtectedRoute role="recruiter"><RecruiterProfile /></ProtectedRoute>}
          />

          {/* Placement Routes */}
          <Route
            path="/placement/dashboard"
            element={<ProtectedRoute role="placement"><PlacementDashboard /></ProtectedRoute>}
          />
          <Route
            path="/placement/students"
            element={<ProtectedRoute role="placement"><PlacementStudents /></ProtectedRoute>}
          />
          <Route
            path="/placement/recruiters"
            element={<ProtectedRoute role="placement"><PlacementRecruiters /></ProtectedRoute>}
          />
          <Route
            path="/placement/jobs"
            element={<ProtectedRoute role="placement"><PlacementJobs /></ProtectedRoute>}
          />
          <Route
            path="/placement/drives"
            element={<ProtectedRoute role="placement"><PlacementDrives /></ProtectedRoute>}
          />
          <Route
            path="/placement/reports"
            element={<ProtectedRoute role="placement"><PlacementReports /></ProtectedRoute>}
          />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
