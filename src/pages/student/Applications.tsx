import { useEffect, useState } from "react";
import StudentNav from "@/components/student/StudentNav";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import Modal from "react-modal";
import { API_BASE_URL } from "../../config/api";

interface Application {
  jobTitle: string;
  company: string;
  status: string;
  appliedDate: string;
  _id?: string;
}

const statusOptions = [
  { label: "Pending", color: "bg-yellow-500" },
  { label: "Interview", color: "bg-blue-500" },
  { label: "Selected", color: "bg-green-500" },
  { label: "Rejected", color: "bg-red-500" },
];

const StudentApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const studentName = localStorage.getItem("userName") || "John Doe";

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [modalForm, setModalForm] = useState({
    jobTitle: "",
    company: "",
    status: "Pending",
    appliedDate: "",
  });

  // 10 Demo applications
  const demoApplications: Application[] = [
    { _id: "1", jobTitle: `Software Engineer (${studentName})`, company: "Infosys", status: "Interview", appliedDate: "12 Sept 2025" },
    { _id: "2", jobTitle: `Frontend Developer (${studentName})`, company: "TCS", status: "Pending", appliedDate: "10 Sept 2025" },
    { _id: "3", jobTitle: `Data Analyst (${studentName})`, company: "Wipro", status: "Selected", appliedDate: "8 Sept 2025" },
    { _id: "4", jobTitle: `Backend Developer (${studentName})`, company: "Accenture", status: "Rejected", appliedDate: "5 Sept 2025" },
    { _id: "5", jobTitle: `Full Stack Developer (${studentName})`, company: "Google", status: "Pending", appliedDate: "3 Sept 2025" },
    { _id: "6", jobTitle: `Mobile App Developer (${studentName})`, company: "Microsoft", status: "Interview", appliedDate: "1 Sept 2025" },
    { _id: "7", jobTitle: `UI/UX Designer (${studentName})`, company: "Amazon", status: "Selected", appliedDate: "30 Aug 2025" },
    { _id: "8", jobTitle: `DevOps Engineer (${studentName})`, company: "Infosys", status: "Pending", appliedDate: "28 Aug 2025" },
    { _id: "9", jobTitle: `QA Engineer (${studentName})`, company: "TCS", status: "Rejected", appliedDate: "25 Aug 2025" },
    { _id: "10", jobTitle: `Cloud Architect (${studentName})`, company: "Google", status: "Interview", appliedDate: "22 Aug 2025" },
  ];

  // Fetch applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/student/applications`);
        const serverData: Application[] = res.data;

        // Merge server data with demo applications, remove duplicates by jobTitle+company
        const mergedMap = new Map<string, Application>();
        [...serverData, ...demoApplications].forEach((app) => {
          mergedMap.set(`${app.jobTitle}-${app.company}`, app);
        });

        const mergedData = Array.from(mergedMap.values());
        setApplications(mergedData);
        setFilteredApplications(mergedData);
      } catch (err) {
        console.warn("Server unreachable, using demo applications");
        setApplications(demoApplications);
        setFilteredApplications(demoApplications);
        toast({
          title: "Offline Mode",
          description: "Using demo applications",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [toast]);

  // Filter applications
  useEffect(() => {
    setFilteredApplications(
      applications.filter(
        (app) =>
          app.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
          app.company.toLowerCase().includes(search.toLowerCase()) ||
          app.status.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, applications]);

  const handleDelete = (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this application?")) return;
    const updated = applications.filter((app) => app._id !== id);
    setApplications(updated);
    setFilteredApplications(updated);
    toast({ title: "Application deleted" });
  };

  const handleSave = () => {
    if (!modalForm.jobTitle || !modalForm.company) {
      toast({ title: "All fields required", variant: "destructive" });
      return;
    }

    if (editingApp?._id) {
      // Edit
      const updatedApps = applications.map((app) =>
        app._id === editingApp._id ? { ...editingApp, ...modalForm } : app
      );
      setApplications(updatedApps);
      setFilteredApplications(updatedApps);
      toast({ title: "Application updated" });
    } else {
      // Add new
      const newApp: Application = { ...modalForm, _id: `${Date.now()}` };
      const updatedApps = [newApp, ...applications];
      setApplications(updatedApps);
      setFilteredApplications(updatedApps);
      toast({ title: "Application added" });
    }

    setIsModalOpen(false);
    setEditingApp(null);
    setModalForm({ jobTitle: "", company: "", status: "Pending", appliedDate: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--student-light))] to-background">
      <StudentNav />
      <div className="container py-8 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[hsl(var(--student-primary))]">My Applications</h1>
          <Button onClick={() => setIsModalOpen(true)}>Add Application</Button>
        </div>

        <Input
          placeholder="Search by job, company, or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4"
        />

        <Card>
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center text-muted-foreground">Loading applications...</p>
            ) : filteredApplications.length === 0 ? (
              <p className="text-center text-muted-foreground">No applications found.</p>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((app) => (
                      <TableRow key={app._id || app.jobTitle}>
                        <TableCell className="font-medium">{app.jobTitle}</TableCell>
                        <TableCell>{app.company}</TableCell>
                        <TableCell>
                          <Badge className={statusOptions.find(s => s.label === app.status)?.color}>
                            {app.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{app.appliedDate}</TableCell>
                        <TableCell className="space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingApp(app);
                              setModalForm(app);
                              setIsModalOpen(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(app._id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          ariaHideApp={false}
          className="modal-content"
        >
          <div className="p-4 space-y-2">
            <h2 className="text-xl font-bold">{editingApp ? "Edit Application" : "Add Application"}</h2>
            <Input
              placeholder="Job Title"
              value={modalForm.jobTitle}
              onChange={(e) => setModalForm({ ...modalForm, jobTitle: e.target.value })}
            />
            <Input
              placeholder="Company"
              value={modalForm.company}
              onChange={(e) => setModalForm({ ...modalForm, company: e.target.value })}
            />
            <Input
              placeholder="Applied Date"
              value={modalForm.appliedDate}
              onChange={(e) => setModalForm({ ...modalForm, appliedDate: e.target.value })}
            />
            <select
              value={modalForm.status}
              onChange={(e) => setModalForm({ ...modalForm, status: e.target.value })}
              className="border p-2 rounded w-full"
            >
              {statusOptions.map((s) => (
                <option key={s.label} value={s.label}>{s.label}</option>
              ))}
            </select>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleSave}>{editingApp ? "Update" : "Add"}</Button>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default StudentApplications;
