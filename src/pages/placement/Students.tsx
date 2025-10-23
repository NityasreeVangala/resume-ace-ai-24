import React, { useEffect, useState } from "react";
import axios from "axios";
import PlacementNav from "@/components/placement/PlacementNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const PlacementStudents = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Fallback example data
  const fallbackStudents = [
    { name: "Nitya Sharma", rollNo: "CS2021001", department: "Computer Science", cgpa: "8.5", status: "Placed", company: "Google" },
    { name: "Rahul Patel", rollNo: "CS2021002", department: "Computer Science", cgpa: "8.2", status: "Placed", company: "Microsoft" },
    { name: "Priya Kumar", rollNo: "EC2021015", department: "Electronics", cgpa: "7.8", status: "Interviewed", company: "Amazon" },
    { name: "Arjun Reddy", rollNo: "ME2021034", department: "Mechanical", cgpa: "7.5", status: "Not Placed", company: "-" },
    { name: "Sneha Singh", rollNo: "CS2021025", department: "Computer Science", cgpa: "9.1", status: "Placed", company: "Infosys" },
  ];

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await axios.get(`${API_BASE_URL}/placement/students`);
        setStudents(res.data);
        setFilteredStudents(res.data);
      } catch (err) {
        console.error("⚠️ Error fetching students:", err);
        setError("Failed to fetch students. Showing example data.");
        setStudents(fallbackStudents);
        setFilteredStudents(fallbackStudents);

        toast({
          title: "Data Fallback",
          description: "Example student data is being displayed due to a fetch error.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // ✅ Search filter
  useEffect(() => {
    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchQuery, students]);

  // ✅ Action handlers (connect to API later)
  const handleEdit = (rollNo) => {
    toast({ title: "Edit", description: `Edit student with Roll No: ${rollNo}` });
  };

  const handleDelete = (rollNo) => {
    if (window.confirm(`Are you sure you want to delete student ${rollNo}?`)) {
      const updatedStudents = students.filter((s) => s.rollNo !== rollNo);
      setStudents(updatedStudents);
      setFilteredStudents(updatedStudents);
      toast({ title: "Deleted", description: `Student ${rollNo} has been deleted.` });
    }
  };

  if (loading) return <p className="text-center font-medium mt-8">Loading student data...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--placement-light))] to-background">
      <PlacementNav />

      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[hsl(var(--placement-primary))]">Manage Students</h1>
            <p className="text-muted-foreground">View and manage all registered students</p>
          </div>
          <Button className="bg-[hsl(var(--placement-primary))] hover:bg-[hsl(var(--placement-secondary))]">
            Add Student
          </Button>
        </div>

        {error && <p className="text-red-500 text-center font-medium">{error}</p>}

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <CardTitle>All Students</CardTitle>
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
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
                    <TableHead>Name</TableHead>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>CGPA</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.rollNo}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.rollNo}</TableCell>
                      <TableCell>{student.department}</TableCell>
                      <TableCell>{student.cgpa}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            student.status === "Placed"
                              ? "bg-green-500"
                              : student.status === "Interviewed"
                              ? "bg-blue-500"
                              : "bg-yellow-500"
                          }
                        >
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{student.company}</TableCell>
                      <TableCell className="space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(student.rollNo)}>Edit</Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(student.rollNo)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredStudents.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center font-medium py-4">
                        No students found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlacementStudents;
