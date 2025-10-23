import React, { useEffect, useState } from "react";
import axios from "axios";
import PlacementNav from "@/components/placement/PlacementNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Trash, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const PlacementRecruiters = () => {
  const { toast } = useToast();

  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [formData, setFormData] = useState({
    company: "",
    hrName: "",
    email: "",
    industry: "",
    status: "Pending",
    jobsPosted: 0,
  });

  const fallbackRecruiters = [
    { company: "Google", hrName: "John Smith", email: "john@google.com", industry: "Technology", status: "Approved", jobsPosted: 5 },
    { company: "Microsoft", hrName: "Sarah Johnson", email: "sarah@microsoft.com", industry: "Technology", status: "Approved", jobsPosted: 8 },
    { company: "Infosys", hrName: "Raj Kumar", email: "raj@infosys.com", industry: "IT Services", status: "Approved", jobsPosted: 12 },
    { company: "Wipro", hrName: "Priya Patel", email: "priya@wipro.com", industry: "IT Services", status: "Pending", jobsPosted: 3 },
    { company: "TCS", hrName: "Amit Sharma", email: "amit@tcs.com", industry: "IT Services", status: "Approved", jobsPosted: 15 },
  ];

  // Fetch recruiters
  const fetchRecruiters = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_BASE_URL}/placement/recruiters`);
      setRecruiters(res.data);
    } catch (err) {
      console.error("⚠️ Error fetching recruiters:", err);
      setError("Failed to fetch recruiters. Showing example data.");
      setRecruiters(fallbackRecruiters);
      toast({
        title: "Data Fallback",
        description: "Example recruiters are being displayed due to a fetch error.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Open modal for add/edit
  const openModal = (recruiter = null) => {
    if (recruiter) {
      setEditData(recruiter);
      setFormData(recruiter);
    } else {
      setEditData(null);
      setFormData({ company: "", hrName: "", email: "", industry: "", status: "Pending", jobsPosted: 0 });
    }
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => setModalOpen(false);

  // Add or Edit Recruiter
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        // Update
        await axios.put(`${API_BASE_URL}/placement/recruiters/${editData.email}`, formData);
        toast({ title: "Recruiter Updated", description: `${formData.company} updated successfully.` });
      } else {
        // Create
        await axios.post(`${API_BASE_URL}/placement/recruiters`, formData);
        toast({ title: "Recruiter Added", description: `${formData.company} added successfully.` });
      }
      closeModal();
      fetchRecruiters();
    } catch (err) {
      console.error("⚠️ Error saving recruiter:", err);
      toast({ title: "Error", description: "Failed to save recruiter." });
    }
  };

  // Approve recruiter
  const approveRecruiter = async (email) => {
    try {
      await axios.put(`${API_BASE_URL}/placement/recruiters/approve/${email}`);
      toast({ title: "Recruiter Approved", description: "Recruiter status updated to Approved." });
      fetchRecruiters();
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to approve recruiter." });
    }
  };

  // Delete recruiter
  const deleteRecruiter = async (email) => {
    if (!confirm("Are you sure you want to delete this recruiter?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/placement/recruiters/${email}`);
      toast({ title: "Recruiter Deleted", description: "Recruiter removed successfully." });
      fetchRecruiters();
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to delete recruiter." });
    }
  };

  // Filter recruiters by search term
  const filteredRecruiters = recruiters.filter((r) =>
    r.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.hrName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--placement-light))] to-background">
      <PlacementNav />

      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[hsl(var(--placement-primary))]">Manage Recruiters</h1>
            <p className="text-muted-foreground">View and manage all registered recruiters</p>
          </div>
          <Button onClick={() => openModal()} className="bg-[hsl(var(--placement-primary))] hover:bg-[hsl(var(--placement-secondary))]">
            Add Recruiter
          </Button>
        </div>

        {error && <p className="text-red-500 text-center font-medium">{error}</p>}
        {loading ? (
          <p className="text-center font-medium">Loading recruiters...</p>
        ) : (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <CardTitle>All Recruiters</CardTitle>
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search recruiters..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>HR Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Jobs Posted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecruiters.map((recruiter, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{recruiter.company}</TableCell>
                        <TableCell>{recruiter.hrName}</TableCell>
                        <TableCell>{recruiter.email}</TableCell>
                        <TableCell>{recruiter.industry}</TableCell>
                        <TableCell>
                          <Badge className={recruiter.status === "Approved" ? "bg-green-500" : "bg-yellow-500"}>
                            {recruiter.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{recruiter.jobsPosted}</TableCell>
                        <TableCell className="space-x-2">
                          <Button size="sm" variant="outline" onClick={() => openModal(recruiter)}><Edit className="h-3 w-3 mr-1" /> Edit</Button>
                          {recruiter.status === "Pending" && (
                            <Button size="sm" className="bg-[hsl(var(--placement-primary))]" onClick={() => approveRecruiter(recruiter.email)}>Approve</Button>
                          )}
                          <Button size="sm" variant="destructive" onClick={() => deleteRecruiter(recruiter.email)}><Trash className="h-3 w-3 mr-1" /> Delete</Button>
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

      {/* Add/Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editData ? "Edit Recruiter" : "Add Recruiter"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" value={formData.company} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hrName">HR Name</Label>
              <Input id="hrName" value={formData.hrName} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={formData.email} onChange={handleChange} required disabled={!!editData} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input id="industry" value={formData.industry} onChange={handleChange} required />
            </div>
            <DialogFooter className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
              <Button type="submit">{editData ? "Update" : "Add"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlacementRecruiters;
