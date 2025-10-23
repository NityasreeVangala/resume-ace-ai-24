import { useEffect, useState } from "react";
import axios from "axios";
import StudentNav from "@/components/student/StudentNav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, TrendingUp, Eye, Clock, MapPin, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "../../config/api";
import Modal from "react-modal";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  description: string;
  status?: string;
}

const StudentDashboard = () => {
  const { toast } = useToast();
  const studentName = localStorage.getItem("userName") || "Nitya";

  const [stats, setStats] = useState<any[]>([]);
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyLoadingIds, setApplyLoadingIds] = useState<string[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<Job>({
    id: "",
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "Full-time",
    posted: "",
    description: "",
    status: "Pending",
  });

  // Demo fallback data
  const demoStats = [
    { label: "Jobs Applied", value: "12", change: "+3 this week", icon: Briefcase },
    { label: "Pending Interviews", value: "3", change: "2 this week", icon: Clock },
    { label: "Offers Received", value: "2", change: "+1 new offer", icon: TrendingUp },
    { label: "Profile Views", value: "45", change: "+12 this week", icon: Eye },
  ];

  const demoJobs: Job[] = [
    { id: "1", title: "Frontend Developer", company: "Google", location: "Bangalore", salary: "₹7-12 LPA", type: "Full-time", posted: "2 days ago", description: "Work on front-end using React and TypeScript", status: "Pending" },
    { id: "2", title: "Backend Engineer", company: "Microsoft", location: "Hyderabad", salary: "₹10-15 LPA", type: "Full-time", posted: "3 days ago", description: "Develop APIs using Node.js and .NET", status: "Pending" },
    { id: "3", title: "Data Scientist", company: "Amazon", location: "Mumbai", salary: "₹12-18 LPA", type: "Full-time", posted: "5 days ago", description: "Analyze large datasets using Python & ML", status: "Pending" },
  ];

  // Fetch general dashboard stats and jobs
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [statsRes, jobsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/dashboard/stats`),
          axios.get(`${API_BASE_URL}/dashboard/jobs`),
        ]);

        const jobsData = (jobsRes.data || demoJobs).map((job: any) => ({
          ...job,
          id: job._id || job.id,
        }));

        setStats(statsRes.data || demoStats);
        setRecommendedJobs(jobsData);
        setFilteredJobs(jobsData);
      } catch (err: any) {
        console.error(err);
        setStats(demoStats);
        setRecommendedJobs(demoJobs);
        setFilteredJobs(demoJobs);
        setError("Could not connect to backend. Showing demo data.");
        toast({ title: "Offline Mode", description: "Using demo data", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [toast]);

  // Search/filter jobs
  useEffect(() => {
    const filtered = recommendedJobs.filter(job =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [search, recommendedJobs]);

  const openModal = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleApply = (job: Job) => {
    // Demo apply without student ID
    setRecommendedJobs(prev =>
      prev.map(j => j.id === job.id ? { ...j, status: "Applied" } : j)
    );
    toast({ title: "Application Sent", description: `You applied to ${job.title} at ${job.company}` });
    setIsModalOpen(false);
  };

  const openEditModal = (job: Job) => {
    setEditForm(job);
    setIsEditModalOpen(true);
  };

  const handleEditSave = () => {
    if (!editForm.title || !editForm.company) {
      toast({ title: "All fields required", variant: "destructive" });
      return;
    }
    setRecommendedJobs(prev =>
      prev.map(job => job.id === editForm.id ? editForm : job)
    );
    toast({ title: "Application updated successfully" });
    setIsEditModalOpen(false);
  };

  const handleDelete = (job: Job) => {
    if (!confirm(`Are you sure you want to delete your application for ${job.title}?`)) return;
    setRecommendedJobs(prev => prev.filter(j => j.id !== job.id));
    toast({ title: "Application deleted" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(var(--student-light))] to-background">
        <p className="text-lg font-medium text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--student-light))] to-background">
      <StudentNav />
      <div className="container py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[hsl(var(--student-primary))]">Hi {studentName} 👋</h1>
          {error && <p className="text-red-500">{error}</p>}
          <p className="text-muted-foreground">Welcome back to CampusCatalyst! Here's what's happening with job applications today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border-2 hover:border-[hsl(var(--student-accent))] transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                {stat.icon && <stat.icon className="h-4 w-4 text-[hsl(var(--student-primary))]" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recommended Jobs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Recommended for You</h2>
              <p className="text-muted-foreground">Based on general data</p>
            </div>
            <Input
              placeholder="Search jobs..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="max-w-xs"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <Card key={job.id} className="hover:shadow-lg transition-all border-2 hover:border-[hsl(var(--student-accent))]">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <CardDescription className="font-medium">{job.company}</CardDescription>
                    </div>
                    <Badge className="bg-[hsl(var(--student-primary))]">{job.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-muted-foreground"><MapPin className="h-4 w-4 mr-2" />{job.location}</div>
                    <div className="flex items-center text-muted-foreground"><DollarSign className="h-4 w-4 mr-2" />{job.salary}</div>
                    <div className="flex items-center text-muted-foreground"><Clock className="h-4 w-4 mr-2" />Posted {job.posted}</div>
                    <div>Status: <Badge className={job.status === "Applied" ? "bg-green-500" : "bg-yellow-500"}>{job.status || "Pending"}</Badge></div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      className="flex-1 bg-[hsl(var(--student-primary))] hover:bg-[hsl(var(--student-secondary))]"
                      onClick={() => handleApply(job)}
                      disabled={applyLoadingIds.includes(job.id) || job.status === "Applied"}
                    >
                      {applyLoadingIds.includes(job.id) ? "Applying..." : "Apply Now"}
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => openModal(job)}>Details</Button>
                    <Button variant="outline" className="flex-1" onClick={() => openEditModal(job)}>Edit</Button>
                    <Button variant="destructive" className="flex-1" onClick={() => handleDelete(job)}>Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Job Details Modal */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          ariaHideApp={false}
          style={{ content: { inset: '10% 20%', padding: '2rem', borderRadius: '0.5rem' } }}
        >
          {selectedJob && (
            <>
              <h2 className="text-xl font-bold mb-2">{selectedJob.title}</h2>
              <p className="mb-2 font-medium">{selectedJob.company}</p>
              <p className="mb-2">{selectedJob.description}</p>
              <p className="mb-2"><MapPin className="h-4 w-4 inline mr-1" />{selectedJob.location}</p>
              <p className="mb-2"><DollarSign className="h-4 w-4 inline mr-1" />{selectedJob.salary}</p>
              <p className="mb-2">Status: <Badge className={selectedJob.status === "Applied" ? "bg-green-500" : "bg-yellow-500"}>{selectedJob.status || "Pending"}</Badge></p>
              <div className="flex space-x-2 mt-4">
                <Button onClick={() => handleApply(selectedJob)}>
                  Apply Now
                </Button>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>Close</Button>
              </div>
            </>
          )}
        </Modal>

        {/* Edit Application Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          ariaHideApp={false}
          style={{ content: { inset: '10% 20%', padding: '2rem', borderRadius: '0.5rem' } }}
        >
          <h2 className="text-xl font-bold mb-4">Edit Application</h2>
          <div className="space-y-2">
            <Input placeholder="Job Title" value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} />
            <Input placeholder="Company" value={editForm.company} onChange={e => setEditForm({ ...editForm, company: e.target.value })} />
            <Input placeholder="Location" value={editForm.location} onChange={e => setEditForm({ ...editForm, location: e.target.value })} />
            <Input placeholder="Salary" value={editForm.salary} onChange={e => setEditForm({ ...editForm, salary: e.target.value })} />
            <select value={editForm.status} onChange={e => setEditForm({ ...editForm, status: e.target.value })} className="border p-2 rounded w-full">
              <option value="Pending">Pending</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button onClick={handleEditSave}>Save</Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default StudentDashboard;
