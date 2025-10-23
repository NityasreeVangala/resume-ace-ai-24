import { useEffect, useState } from "react";
import axios from "axios";
import RecruiterNav from "@/components/recruiter/RecruiterNav";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Clock, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "../../config/api";
import Modal from "react-modal";

interface Job {
  _id?: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  description: string;
}

const RecruiterDashboard = () => {
  const { toast } = useToast();
  const recruiterName = localStorage.getItem("userName") || "Recruiter";

  // State
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newJob, setNewJob] = useState<Job>({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "Full-time",
    posted: "",
    description: "",
  });

  // Demo fallback
  const demoJobs: Job[] = [
    {
      title: "Frontend Developer",
      company: "Google",
      location: "Bangalore",
      salary: "₹7-12 LPA",
      type: "Full-time",
      posted: "2 days ago",
      description: "Build amazing React applications",
    },
    {
      title: "Backend Engineer",
      company: "Microsoft",
      location: "Hyderabad",
      salary: "₹10-15 LPA",
      type: "Full-time",
      posted: "3 days ago",
      description: "Develop robust APIs with Node.js",
    },
  ];

  // Fetch jobs posted by this recruiter
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const recruiterId = localStorage.getItem("userId");
        const res = await axios.get(`${API_BASE_URL}/recruiter/jobs/${recruiterId}`);

        setJobs(res.data || demoJobs);
        setFilteredJobs(res.data || demoJobs);
      } catch (err: any) {
        console.error(err);
        setJobs(demoJobs);
        setFilteredJobs(demoJobs);
        setError("Could not connect to backend. Showing demo data.");
        toast({ title: "Offline Mode", description: "Using demo data", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [toast]);

  // Filter/search jobs
  useEffect(() => {
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [search, jobs]);

  const openModal = () => setIsModalOpen(true);

  const handleCreateJob = async () => {
    if (!newJob.title || !newJob.company) {
      toast({ title: "All fields required", variant: "destructive" });
      return;
    }
    try {
      const recruiterId = localStorage.getItem("userId");
      const res = await axios.post(`${API_BASE_URL}/recruiter/jobs/${recruiterId}`, newJob);
      setJobs((prev) => [...prev, res.data]);
      setFilteredJobs((prev) => [...prev, res.data]);
      toast({ title: "Job Posted", description: `${newJob.title} created successfully` });
      setIsModalOpen(false);
      setNewJob({ title: "", company: "", location: "", salary: "", type: "Full-time", posted: "", description: "" });
    } catch (err: any) {
      toast({ title: "Failed to create job", description: err.message, variant: "destructive" });
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading jobs...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--recruiter-light))] to-background">
      <RecruiterNav />

      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Hi {recruiterName} 👋</h1>
          <Button onClick={openModal}>Post New Job</Button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <Input
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filteredJobs.map((job, index) => (
            <Card key={index} className="hover:shadow-lg transition-all border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>{job.company}</CardDescription>
                  </div>
                  <Badge>{job.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p>{job.description}</p>
                <p className="text-sm text-muted-foreground">{job.location}</p>
                <p className="text-sm text-muted-foreground">Salary: {job.salary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Post Job Modal */}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} ariaHideApp={false} className="modal-content">
        <h2 className="text-xl font-bold mb-4">Post New Job</h2>
        <div className="space-y-2">
          <Input placeholder="Job Title" value={newJob.title} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} />
          <Input placeholder="Company" value={newJob.company} onChange={(e) => setNewJob({ ...newJob, company: e.target.value })} />
          <Input placeholder="Location" value={newJob.location} onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} />
          <Input placeholder="Salary" value={newJob.salary} onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })} />
          <Input placeholder="Type (Full-time / Part-time)" value={newJob.type} onChange={(e) => setNewJob({ ...newJob, type: e.target.value })} />
          <Input placeholder="Description" value={newJob.description} onChange={(e) => setNewJob({ ...newJob, description: e.target.value })} />
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateJob}>Post Job</Button>
        </div>
      </Modal>
    </div>
  );
};

export default RecruiterDashboard;
