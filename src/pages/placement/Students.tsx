import PlacementNav from "@/components/placement/PlacementNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const PlacementStudents = () => {
  const students = [
    {
      name: "Nitya Sharma",
      rollNo: "CS2021001",
      department: "Computer Science",
      cgpa: "8.5",
      status: "Placed",
      company: "Google",
    },
    {
      name: "Rahul Patel",
      rollNo: "CS2021002",
      department: "Computer Science",
      cgpa: "8.2",
      status: "Placed",
      company: "Microsoft",
    },
    {
      name: "Priya Kumar",
      rollNo: "EC2021015",
      department: "Electronics",
      cgpa: "7.8",
      status: "Interviewed",
      company: "Amazon",
    },
    {
      name: "Arjun Reddy",
      rollNo: "ME2021034",
      department: "Mechanical",
      cgpa: "7.5",
      status: "Not Placed",
      company: "-",
    },
    {
      name: "Sneha Singh",
      rollNo: "CS2021025",
      department: "Computer Science",
      cgpa: "9.1",
      status: "Placed",
      company: "Infosys",
    },
  ];

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

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <CardTitle>All Students</CardTitle>
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  className="pl-10"
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
                  {students.map((student, index) => (
                    <TableRow key={index}>
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
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
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
