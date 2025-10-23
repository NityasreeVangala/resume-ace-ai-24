import React, { useEffect, useState } from "react";
import axios from "axios";
import RecruiterNav from "@/components/recruiter/RecruiterNav";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

type Job = {
  _id?: string;
  jobTitle: string;
  company: string;
  location: string;
  jobType: string;
  salary: string;
  deadline: string;
  description: string;
  requirements: string;
};

const RecruiterJobs = () => {
  const { toast } = useToast();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState<Job>({
    jobTitle: "",
    company: "",
    location: "",
    jobType: "",
    salary: "",
    deadline: "",
    description: "",
    requirements: "",
  });

  // Fetch jobs from backend
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/recruiter/jobs`);
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch jobs. Showing fallback example.");
      setJobs([
        {
          _id: "1",
          jobTitle: "Software Engineer",
          company: "Infosys",
          location: "Bangalore",
          jobType: "full-time",
          salary: "₹7-12 LPA",
          deadline: "2025-12-31",
          description: "Develop software applications...",
          requirements: "JavaScript, React, Node.js",
        },
      ]);
      toast({
        title: "Fallback Jobs Loaded",
        description: "Example jobs displayed due to API failure.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleJobTypeChange = (value: string) => {
    setFormData({ ...formData, jobType: value });
  };

  // Open modal for edit or create
  const openModal = (job?: Job) => {
    if (job) {
      setEditingJob(job);
      setFormData(job);
    } else {
      setEditingJob(null);
      setFormData({
        jobTitle: "",
        company: "",
        location: "",
        jobType: "",
        salary: "",
        deadline: "",
        description: "",
        requirements: "",
      });
    }
    setModalOpen(true);
  };

  // Create or Update job
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingJob?._id) {
        // Update
        const res = await axios.put(`${API_BASE_URL}/recruiter/jobs/${editingJob._id}`, formData);
        setJobs(jobs.map(job => (job._id === editingJob._id ? res.data : job)));
        toast({ title: "Job Updated", description: "Job successfully updated." });
      } else {
        // Create
        const res = await axios.post(`${API_BASE_URL}/recruiter/jobs`, formData);
        setJobs([...jobs, res.data]);
        toast({ title: "Job Created", description: "Job successfully posted." });
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to save job." });
    }
  };

  // Delete job
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/recruiter/jobs/${id}`);
      setJobs(jobs.filter(job => job._id !== id));
      toast({ title: "Job Deleted", description: "Job removed successfully." });
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to delete job." });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--recruiter-light))] to-background">
      <RecruiterNav />
      <div className="container py-8 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[hsl(var(--recruiter-primary))]">Manage Jobs</h1>
          <Button onClick={() => openModal()}>Post New Job</Button>
        </div>

        {loading && <p>Loading jobs...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid gap-6">
          {jobs.map(job => (
            <Card key={job._id} className="border-2 hover:border-[hsl(var(--recruiter-accent))] transition-all">
              <CardHeader className="flex justify-between items-center">
                <CardTitle>{job.jobTitle}</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => openModal(job)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(job._id!)}>Delete</Button>
                </div>
              </CardHeader>
              <CardContent>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Type:</strong> {job.jobType}</p>
                <p><strong>Salary:</strong> {job.salary}</p>
                <p><strong>Deadline:</strong> {job.deadline}</p>
                <p><strong>Description:</strong> {job.description}</p>
                <p><strong>Requirements:</strong> {job.requirements}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal for Create/Edit */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{editingJob ? "Edit Job" : "Post New Job"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input id="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" value={formData.company} onChange={handleChange} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" value={formData.location} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobType">Job Type</Label>
                  <Select value={formData.jobType} onValueChange={handleJobTypeChange} required>
                    <SelectTrigger><SelectValue placeholder="Select job type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary</Label>
                  <Input id="salary" value={formData.salary} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input id="deadline" type="date" value={formData.deadline} onChange={handleChange} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={formData.description} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea id="requirements" value={formData.requirements} onChange={handleChange} required />
              </div>
              <div className="flex gap-4 mt-2">
                <Button type="submit">{editingJob ? "Update Job" : "Post Job"}</Button>
                <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default RecruiterJobs;
