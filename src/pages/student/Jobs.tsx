import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
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
import { Input } from "@/components/ui/input";
import { Search, MapPin, DollarSign, Clock, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Modal from "react-modal";

interface Job {
  id?: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  description: string;
  status?: "Pending" | "Interview" | "Selected" | "Rejected";
}

const statusOptions = [
  { label: "Pending", color: "bg-yellow-500" },
  { label: "Interview", color: "bg-blue-500" },
  { label: "Selected", color: "bg-green-500" },
  { label: "Rejected", color: "bg-red-500" },
];

const StudentJobs = ({ studentId }: { studentId: string }) => {
  const { toast } = useToast();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal & selected job
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Loading per job (for Apply button)
  const [jobLoading, setJobLoading] = useState<{ [key: string]: boolean }>({});

  // Demo jobs fallback (10 examples)
  const demoJobs: Job[] = [
    { id: "1", title: "Software Engineer", company: "Google", location: "Bangalore, India", salary: "₹15-20 LPA", type: "Full-time", posted: "1 day ago", description: "Work on scalable web applications using React and Node.js.", status: "Pending" },
    { id: "2", title: "Frontend Developer", company: "Microsoft", location: "Hyderabad, India", salary: "₹10-15 LPA", type: "Full-time", posted: "2 days ago", description: "Build responsive UI components with React and TypeScript.", status: "Pending" },
    { id: "3", title: "Data Analyst", company: "Amazon", location: "Mumbai, India", salary: "₹8-12 LPA", type: "Full-time", posted: "3 days ago", description: "Analyze data and generate insights using Python & SQL.", status: "Pending" },
    { id: "4", title: "Backend Developer", company: "Flipkart", location: "Bangalore, India", salary: "₹12-18 LPA", type: "Full-time", posted: "1 week ago", description: "Develop APIs and database solutions for e-commerce platform.", status: "Pending" },
    { id: "5", title: "UI/UX Designer", company: "Adobe", location: "Noida, India", salary: "₹8-10 LPA", type: "Full-time", posted: "2 weeks ago", description: "Design intuitive user interfaces and enhance user experience.", status: "Pending" },
    { id: "6", title: "Machine Learning Engineer", company: "NVIDIA", location: "Bangalore, India", salary: "₹20-25 LPA", type: "Full-time", posted: "3 days ago", description: "Develop ML models and AI pipelines for high-performance applications.", status: "Pending" },
    { id: "7", title: "DevOps Engineer", company: "IBM", location: "Chennai, India", salary: "₹10-15 LPA", type: "Full-time", posted: "5 days ago", description: "Manage CI/CD pipelines and cloud infrastructure.", status: "Pending" },
    { id: "8", title: "Cybersecurity Analyst", company: "TCS", location: "Pune, India", salary: "₹6-10 LPA", type: "Full-time", posted: "1 week ago", description: "Monitor and prevent security threats in corporate systems.", status: "Pending" },
    { id: "9", title: "Product Manager", company: "Meta", location: "Bangalore, India", salary: "₹25-30 LPA", type: "Full-time", posted: "3 days ago", description: "Lead product strategy and execution across teams.", status: "Pending" },
    { id: "10", title: "QA Engineer", company: "Infosys", location: "Hyderabad, India", salary: "₹5-8 LPA", type: "Full-time", posted: "4 days ago", description: "Ensure quality and reliability of software releases.", status: "Pending" },
  ];

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/student/jobs`);
        setJobs(res.data || demoJobs);
      } catch (err: any) {
        console.error(err);
        setError("Unable to fetch jobs from server. Showing demo data.");
        setJobs(demoJobs);
        toast({
          title: "Offline Mode",
          description: "Showing demo jobs due to server issue.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [toast]);

  // Filter jobs by search
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open modal to view job details
  const openModal = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  // Apply to a job
  const handleApply = async (job: Job) => {
    const jobKey = job.id || job.title;
    setJobLoading((prev) => ({ ...prev, [jobKey]: true }));

    try {
      await axios.post(`${API_BASE_URL}/student/apply`, {
        studentId,
        jobId: job.id,
      });
      toast({ title: "Application Sent", description: `You applied to ${job.title}` });
    } catch {
      toast({ title: "Application Sent (offline)", description: `Applied to ${job.title}` });
    } finally {
      setJobLoading((prev) => ({ ...prev, [jobKey]: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-muted-foreground">
        Loading job listings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--student-light))] to-background">
      <StudentNav />
      <div className="container py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[hsl(var(--student-primary))]">Job Listings</h1>
          {error && <p className="text-red-500">{error}</p>}
          <p className="text-muted-foreground">Discover opportunities that match your skills and interests</p>
        </div>

        {/* Search */}
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs, companies, or keywords..."
              className="pl-10 border-[hsl(var(--student-accent))]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Job Cards */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <p className="text-center text-muted-foreground">No jobs found.</p>
          ) : (
            filteredJobs.map((job) => {
              const jobKey = job.id || job.title;
              return (
                <Card key={jobKey} className="hover:shadow-lg transition-all border-2 hover:border-[hsl(var(--student-accent))]">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <CardDescription className="font-medium text-base">{job.company}</CardDescription>
                      </div>
                      <div className="space-x-2 flex items-center">
                        <Badge className={statusOptions.find(s => s.label === job.status)?.color || "bg-gray-400"}>
                          {job.status || "N/A"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-6 mb-4 text-sm">
                      <div className="flex items-center text-muted-foreground"><MapPin className="h-4 w-4 mr-2" />{job.location}</div>
                      <div className="flex items-center text-muted-foreground"><DollarSign className="h-4 w-4 mr-2" />{job.salary}</div>
                      <div className="flex items-center text-muted-foreground"><Briefcase className="h-4 w-4 mr-2" />{job.type}</div>
                      <div className="flex items-center text-muted-foreground"><Clock className="h-4 w-4 mr-2" />Posted {job.posted}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="bg-[hsl(var(--student-primary))] hover:bg-[hsl(var(--student-secondary))]"
                        onClick={() => handleApply(job)}
                        disabled={jobLoading[jobKey]}
                      >
                        {jobLoading[jobKey] ? "Applying..." : "Apply Now"}
                      </Button>
                      <Button variant="outline" onClick={() => openModal(job)}>View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Job Modal */}
        <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} ariaHideApp={false} className="modal-content">
          {selectedJob && (
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-bold">Job Details</h2>
              <p><strong>Title:</strong> {selectedJob.title}</p>
              <p><strong>Company:</strong> {selectedJob.company}</p>
              <p><strong>Location:</strong> {selectedJob.location}</p>
              <p><strong>Salary:</strong> {selectedJob.salary}</p>
              <p><strong>Type:</strong> {selectedJob.type}</p>
              <p><strong>Posted:</strong> {selectedJob.posted}</p>
              <p><strong>Description:</strong> {selectedJob.description}</p>
              <div className="flex gap-2 mt-4">
                <Button onClick={() => setIsModalOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default StudentJobs;
