import { useEffect, useState } from "react";
import axios from "axios";
import RecruiterNav from "@/components/recruiter/RecruiterNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Modal from "react-modal";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const RecruiterApplicants = () => {
  const { toast } = useToast();

  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [deletingApplicantId, setDeletingApplicantId] = useState<number | null>(null);

  // Demo fallback
  const fallbackApplicants = [
    { id: 1, name: "Nitya Vangala", jobTitle: "Software Engineer", status: "Under Review", appliedDate: "02 Oct 2025", resume: "Link to resume.pdf" },
    { id: 2, name: "Rahul Sharma", jobTitle: "Data Analyst", status: "Interview", appliedDate: "03 Oct 2025", resume: "Link to resume.pdf" },
    { id: 3, name: "Priya Patel", jobTitle: "Frontend Developer", status: "Under Review", appliedDate: "04 Oct 2025", resume: "Link to resume.pdf" },
    { id: 4, name: "Arjun Reddy", jobTitle: "Backend Developer", status: "Selected", appliedDate: "28 Sept 2025", resume: "Link to resume.pdf" },
    { id: 5, name: "Sneha Kumar", jobTitle: "Product Manager", status: "Rejected", appliedDate: "25 Sept 2025", resume: "Link to resume.pdf" },
  ];

  // Fetch applicants
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/api/recruiter/applicants`);
        setApplicants(res.data.length ? res.data : fallbackApplicants);
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch applicants — showing example data.");
        setApplicants(fallbackApplicants);
        toast({
          title: "Offline / Demo Mode",
          description: "Showing example applicant data due to server issue.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, []);

  // Search filter
  const filteredApplicants = applicants.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open modal
  const openModal = (applicant: any) => {
    setSelectedApplicant(applicant);
    setModalOpen(true);
  };

  // Update applicant status
  const handleStatusUpdate = async (newStatus: string) => {
    if (!selectedApplicant) return;

    setStatusUpdating(true);
    const prevStatus = selectedApplicant.status;

    // Optimistic UI update
    setSelectedApplicant({ ...selectedApplicant, status: newStatus });
    setApplicants((prev) =>
      prev.map((a) => (a.id === selectedApplicant.id ? { ...a, status: newStatus } : a))
    );

    try {
      await axios.put(`${API_BASE_URL}/api/recruiter/applicants/${selectedApplicant.id}/status`, { status: newStatus });
      toast({ title: "Status updated!", description: `${selectedApplicant.name} is now "${newStatus}"` });
    } catch (err) {
      // Revert on error
      setSelectedApplicant({ ...selectedApplicant, status: prevStatus });
      setApplicants((prev) =>
        prev.map((a) => (a.id === selectedApplicant.id ? { ...a, status: prevStatus } : a))
      );
      toast({ title: "Failed to update status", variant: "destructive" });
    } finally {
      setStatusUpdating(false);
    }
  };

  // Delete applicant
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this applicant?")) return;

    setDeletingApplicantId(id);
    const prevApplicants = [...applicants];

    // Optimistic UI
    setApplicants((prev) => prev.filter((a) => a.id !== id));

    try {
      await axios.delete(`${API_BASE_URL}/api/recruiter/applicants/${id}`);
      toast({ title: "Applicant deleted successfully!" });
    } catch (err) {
      setApplicants(prevApplicants); // revert on failure
      toast({ title: "Failed to delete applicant", variant: "destructive" });
    } finally {
      setDeletingApplicantId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--recruiter-light))] to-background">
      <RecruiterNav />
      <div className="container py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[hsl(var(--recruiter-primary))]">Applicants</h1>
          <p className="text-muted-foreground">Review and manage all candidate applications</p>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name, job title, or status..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-md w-full mb-4"
        />

        <Card>
          <CardHeader>
            <CardTitle>All Applicants</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-[hsl(var(--recruiter-primary))]" />
                <p className="mt-2 text-muted-foreground">Loading applicants...</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate Name</TableHead>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplicants.map((applicant) => (
                      <TableRow key={applicant.id}>
                        <TableCell className="font-medium">{applicant.name}</TableCell>
                        <TableCell>{applicant.jobTitle}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              applicant.status === "Selected"
                                ? "bg-green-500"
                                : applicant.status === "Rejected"
                                ? "bg-red-500"
                                : applicant.status === "Interview"
                                ? "bg-blue-500"
                                : "bg-yellow-500"
                            }
                          >
                            {applicant.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{applicant.appliedDate}</TableCell>
                        <TableCell className="space-x-2">
                          <Button variant="outline" size="sm" onClick={() => openModal(applicant)}>
                            View Resume
                          </Button>
                          <Button
                            size="sm"
                            className="bg-[hsl(var(--recruiter-primary))]"
                            onClick={() => handleDelete(applicant.id)}
                            disabled={deletingApplicantId === applicant.id}
                          >
                            {deletingApplicantId === applicant.id ? "Deleting..." : "Delete"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {error && !loading && (
              <div className="flex flex-col items-center justify-center py-6 text-red-500">
                <AlertCircle className="h-6 w-6 mb-2" />
                <p>{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal */}
        <Modal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          ariaHideApp={false}
          className="modal-content max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg outline-none"
        >
          {selectedApplicant && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">{selectedApplicant.name}</h2>
              <p className="font-medium">{selectedApplicant.jobTitle}</p>
              <p>Status: {selectedApplicant.status}</p>
              <p>Applied Date: {selectedApplicant.appliedDate}</p>
              <p>Resume: <a href={selectedApplicant.resume} target="_blank" className="text-blue-600 underline">View</a></p>

              <div className="flex space-x-2 mt-4">
                {["Under Review", "Interview", "Selected", "Rejected"].map((status) => (
                  <Button
                    key={status}
                    onClick={() => handleStatusUpdate(status)}
                    disabled={statusUpdating || selectedApplicant.status === status}
                    className={`${
                      selectedApplicant.status === status ? "opacity-50 cursor-not-allowed" : "bg-[hsl(var(--recruiter-primary))]"
                    }`}
                  >
                    {statusUpdating && selectedApplicant.status !== status ? "Updating..." : status}
                  </Button>
                ))}
                <Button variant="outline" onClick={() => setModalOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default RecruiterApplicants;
