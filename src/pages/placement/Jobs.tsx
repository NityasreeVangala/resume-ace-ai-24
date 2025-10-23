import React, { useEffect, useState } from "react";
import axios from "axios";
import PlacementNav from "@/components/placement/PlacementNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Trash2, Edit, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const PlacementJobs = () => {
  const { toast } = useToast();

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Dialog states
  const [openDialog, setOpenDialog] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    package: "",
    location: "",
    status: "Open",
    applications: 0,
  });

  const fallbackJobs = [
    {
      title: "Software Engineer",
      company: "Google",
      package: "₹15-20 LPA",
      location: "Bangalore",
      status: "Open",
      applications: 42,
    },
    {
      title: "Data Analyst",
      company: "Microsoft",
      package: "₹10-15 LPA",
      location: "Hyderabad",
      status: "Open",
      applications: 35,
    },
  ];

  // Fetch Jobs
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${API_BASE_URL}/placement/jobs`);
        setJobs(res.data);
        setFilteredJobs(res.data);
      } catch (err) {
        console.error("⚠️ Error fetching jobs:", err);
        setError("Failed to fetch jobs. Showing example data.");
        setJobs(fallbackJobs);
        setFilteredJobs(fallbackJobs);

        toast({
          title: "Data Fallback",
          description:
            "Example jobs are being displayed due to a fetch error.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Search/filter
  useEffect(() => {
    if (searchQuery === "") setFilteredJobs(jobs);
    else
      setFilteredJobs(
        jobs.filter(
          (job) =>
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
  }, [searchQuery, jobs]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Open dialog for new or edit
  const handleOpenDialog = (job = null) => {
    if (job) {
      setEditingJob(job);
      setFormData({ ...job });
    } else {
      setEditingJob(null);
      setFormData({
        title: "",
        company: "",
        package: "",
        location: "",
        status: "Open",
        applications: 0,
      });
    }
    setOpenDialog(true);
  };

  // Create or Update job
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedJobs;
      if (editingJob) {
        // Update job
        await axios.put(`${API_BASE_URL}/placement/jobs/${editingJob.id}`, formData);
        updatedJobs = jobs.map((job) =>
          job.id === editingJob.id ? formData : job
        );
        toast({ title: "Job Updated", description: "Job updated successfully" });
      } else {
        // Create job
        const res = await axios.post(`${API_BASE_URL}/placement/jobs`, formData);
        updatedJobs = [...jobs, res.data || formData];
        toast({ title: "Job Created", description: "Job added successfully" });
      }
      setJobs(updatedJobs);
      setFilteredJobs(updatedJobs);
      setOpenDialog(false);
    } catch (err) {
      console.error("⚠️ Error saving job:", err);
      toast({ title: "Error", description: "Failed to save job" });
    }
  };

  // Delete job
  const handleDelete = async (jobId) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/placement/jobs/${jobId}`);
      const updatedJobs = jobs.filter((job) => job.id !== jobId);
      setJobs(updatedJobs);
      setFilteredJobs(updatedJobs);
      toast({ title: "Job Deleted", description: "Job removed successfully" });
    } catch (err) {
      console.error("⚠️ Error deleting job:", err);
      toast({ title: "Error", description: "Failed to delete job" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--placement-light))] to-background">
      <PlacementNav />

      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[hsl(var(--placement-primary))]">
              Manage Job Listings
            </h1>
            <p className="text-muted-foreground">
              View and manage all job postings
            </p>
          </div>
          <Button
            className="bg-[hsl(var(--placement-primary))] hover:bg-[hsl(var(--placement-secondary))]"
            onClick={() => handleOpenDialog()}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Job
          </Button>
        </div>

        {error && <p className="text-red-500 text-center font-medium">{error}</p>}

        {loading ? (
          <p className="text-center font-medium">Loading job listings...</p>
        ) : (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <CardTitle>All Job Listings</CardTitle>
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Package</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applications</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredJobs.map((job) => (
                      <TableRow key={job.id || job.title}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>{job.company}</TableCell>
                        <TableCell>{job.package}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              job.status === "Open" ? "bg-green-500" : "bg-gray-500"
                            }
                          >
                            {job.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{job.applications}</TableCell>
                        <TableCell className="space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenDialog(job)}
                          >
                            <Edit className="h-3 w-3 mr-1" /> Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(job.id)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" /> Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Dialog for Add/Edit Job */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingJob ? "Edit Job" : "Add Job"}</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              id="title"
              placeholder="Job Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <Input
              id="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
              required
            />
            <Input
              id="package"
              placeholder="Salary/Package"
              value={formData.package}
              onChange={handleChange}
              required
            />
            <Input
              id="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <Input
              id="status"
              placeholder="Status (Open/Closed)"
              value={formData.status}
              onChange={handleChange}
              required
            />
            <DialogFooter>
              <Button type="submit">
                {editingJob ? "Update Job" : "Add Job"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlacementJobs;
