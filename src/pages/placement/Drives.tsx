// src/pages/placement/Drives.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import PlacementNav from "@/components/placement/PlacementNav";
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
import { Plus, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// --------- INLINE MODAL COMPONENTS ---------
const Modal = ({ open, onClose, children }: any) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-4 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

const ModalContent = ({ children }: any) => <div className="space-y-4">{children}</div>;
const ModalHeader = ({ children }: any) => <div className="border-b pb-2 font-bold text-lg">{children}</div>;
const ModalBody = ({ children }: any) => <div className="pt-2">{children}</div>;
const ModalFooter = ({ children }: any) => <div className="pt-2 border-t flex justify-end space-x-2">{children}</div>;

// --------- MAIN COMPONENT ---------
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const PlacementDrives = () => {
  const { toast } = useToast();

  const [drives, setDrives] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDrive, setEditingDrive] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    date: "",
    eligibleBranches: "",
    status: "Scheduled",
    registrations: 0,
  });

  const fallbackDrives = [
    {
      name: "Amazon Campus Drive",
      company: "Amazon",
      date: "2025-12-20",
      eligibleBranches: "CS, EC, IT",
      status: "Scheduled",
      registrations: 45,
    },
    {
      name: "Google Recruitment",
      company: "Google",
      date: "2025-12-15",
      eligibleBranches: "CS, IT",
      status: "Ongoing",
      registrations: 38,
    },
  ];

  // Fetch drives
  useEffect(() => {
    const fetchDrives = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${API_BASE_URL}/placement/drives`);
        setDrives(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch placement drives. Showing example data.");
        setDrives(fallbackDrives);

        toast({
          title: "Data Fallback",
          description: "Example drives are displayed due to fetch error.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDrives();
  }, []);

  const openModal = (drive: any = null) => {
    setEditingDrive(drive);
    setFormData(
      drive || {
        name: "",
        company: "",
        date: "",
        eligibleBranches: "",
        status: "Scheduled",
        registrations: 0,
      }
    );
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingDrive(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDrive) {
      try {
        const updatedDrive = { ...editingDrive, ...formData };
        setDrives((prev) =>
          prev.map((d) => (d === editingDrive ? updatedDrive : d))
        );
        await axios.put(`${API_BASE_URL}/placement/drives/${editingDrive.id}`, formData);
        toast({ title: "Drive updated successfully" });
        closeModal();
      } catch (err) {
        console.error(err);
        toast({ title: "Failed to update drive" });
      }
    } else {
      try {
        const newDrive = { ...formData };
        setDrives((prev) => [...prev, newDrive]);
        await axios.post(`${API_BASE_URL}/placement/drives`, formData);
        toast({ title: "Drive created successfully" });
        closeModal();
      } catch (err) {
        console.error(err);
        toast({ title: "Failed to create drive" });
      }
    }
  };

  const handleDelete = async (drive: any) => {
    if (!confirm(`Are you sure you want to delete "${drive.name}"?`)) return;

    try {
      setDrives((prev) => prev.filter((d) => d !== drive));
      await axios.delete(`${API_BASE_URL}/placement/drives/${drive.id}`);
      toast({ title: "Drive deleted successfully" });
    } catch (err) {
      console.error(err);
      toast({ title: "Failed to delete drive" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--placement-light))] to-background">
      <PlacementNav />
      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[hsl(var(--placement-primary))]">Placement Drives</h1>
            <p className="text-muted-foreground">Organize and monitor recruitment drives</p>
          </div>
          <Button className="bg-[hsl(var(--placement-primary))] hover:bg-[hsl(var(--placement-secondary))]" onClick={() => openModal()}>
            <Plus className="h-4 w-4 mr-2" /> Schedule New Drive
          </Button>
        </div>

        {error && <p className="text-red-500 text-center font-medium">{error}</p>}
        {loading ? (
          <p className="text-center font-medium">Loading placement drives...</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>All Placement Drives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Drive Name</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Eligible Branches</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Registrations</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {drives.map((drive, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{drive.name}</TableCell>
                        <TableCell>{drive.company}</TableCell>
                        <TableCell>{drive.date}</TableCell>
                        <TableCell>{drive.eligibleBranches}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              drive.status === "Completed"
                                ? "bg-gray-500"
                                : drive.status === "Ongoing"
                                ? "bg-blue-500"
                                : "bg-green-500"
                            }
                          >
                            {drive.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{drive.registrations} students</TableCell>
                        <TableCell className="space-x-2">
                          <Button variant="outline" size="sm" onClick={() => openModal(drive)}>
                            <Edit className="h-3 w-3 mr-1" /> Edit
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(drive)}>
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

      {/* Modal for Create/Edit */}
      {modalOpen && (
        <Modal open={modalOpen} onClose={closeModal}>
          <ModalContent>
            <ModalHeader>{editingDrive ? "Edit Placement Drive" : "Schedule New Drive"}</ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Drive Name</Label>
                  <Input id="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" value={formData.company} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" value={formData.date} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="eligibleBranches">Eligible Branches</Label>
                  <Input id="eligibleBranches" value={formData.eligibleBranches} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Input id="status" value={formData.status} onChange={handleChange} />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={handleSubmit}
                className="bg-[hsl(var(--placement-primary))] hover:bg-[hsl(var(--placement-secondary))]"
              >
                {editingDrive ? "Update Drive" : "Create Drive"}
              </Button>
              <Button variant="outline" onClick={closeModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default PlacementDrives;
