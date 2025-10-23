import React, { useEffect, useState } from "react";
import axios from "axios";
import RecruiterNav from "@/components/recruiter/RecruiterNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const RecruiterJobs = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingJob, setEditingJob] = useState<any>(null);
  const [deletingJobId, setDeletingJobId] = useState<string | null>(null);

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/recruiter/my-jobs`);
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Unable to fetch jobs.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Delete job
  const handleDelete = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    setDeletingJobId(jobId);
    const originalJobs = [...jobs];
    setJobs(jobs.filter(job => job._id !== jobId));

    try {
      await axios.delete(`${API_BASE_URL}/recruiter/my-jobs/${jobId}`);
      toast({ title: "Job deleted successfully!" });
    } catch (err) {
      console.error("Delete failed:", err);
      toast({ title: "Failed to delete job", variant: "destructive" });
      setJobs(originalJobs);
    } finally {
      setDeletingJobId(null);
    }
  };

  // Edit job
  const handleEdit = (job: any) => setEditingJob(job);

  const handleSaveEdit = async (updatedJob: any) => {
    const originalJobs = [...jobs];
    setJobs(jobs.map(job => (job._id === updatedJob._id ? updatedJob : job)));
    setEditingJob(null);

    try {
      await axios.put(`${API_BASE_URL}/recruiter/my-jobs/${updatedJob._id}`, updatedJob);
      toast({ title: "Job updated successfully!" });
    } catch (err) {
      console.error("Update failed:", err);
      toast({ title: "Failed to update job", variant: "destructive" });
      setJobs(originalJobs);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <p className="text-lg font-semibold text-muted-foreground">Loading job listings...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--recruiter-light))] to-background">
      <RecruiterNav />
      <div className="container py-8 space-y-8">
        {error && <p className="text-red-500 text-center font-medium">{error}</p>}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[hsl(var(--recruiter-primary))]">My Job Listings</h1>
            <p className="text-muted-foreground">Manage all your job postings</p>
          </div>
          <Link to="/recruiter/post-job">
            <Button className="bg-[hsl(var(--recruiter-primary))] hover:bg-[hsl(var(--recruiter-secondary))]">
              <Plus className="h-4 w-4 mr-2" /> Post New Job
            </Button>
          </Link>
        </div>

        {/* Job Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Job Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Applicants</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Posted On</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.length > 0 ? jobs.map(job => (
                    <TableRow key={job._id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.applicants || 0}</TableCell>
                      <TableCell>
                        <Badge className={job.status === "Active" ? "bg-green-500" : "bg-gray-500"}>
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(job)}>
                          <Edit2 className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(job._id)}
                          disabled={deletingJobId === job._id}
                        >
                          {deletingJobId === job._id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4 mr-1" />}
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        No job listings found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Modal */}
        {editingJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-md w-96">
              <h2 className="text-xl font-semibold mb-4">Edit Job</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editingJob.title}
                  onChange={e => setEditingJob({ ...editingJob, title: e.target.value })}
                />
                <select
                  className="w-full border rounded px-3 py-2"
                  value={editingJob.status}
                  onChange={e => setEditingJob({ ...editingJob, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={() => setEditingJob(null)}>Cancel</Button>
                <Button className="bg-[hsl(var(--recruiter-primary))]" onClick={() => handleSaveEdit(editingJob)}>Save</Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default RecruiterJobs;
