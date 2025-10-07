import StudentNav from "@/components/student/StudentNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const StudentApplications = () => {
  const applications = [
    {
      jobTitle: "Software Engineer",
      company: "Infosys",
      status: "Interview",
      appliedDate: "12 Sept 2025",
      statusColor: "bg-blue-500",
    },
    {
      jobTitle: "Frontend Developer",
      company: "TCS",
      status: "Pending",
      appliedDate: "10 Sept 2025",
      statusColor: "bg-yellow-500",
    },
    {
      jobTitle: "Data Analyst",
      company: "Wipro",
      status: "Selected",
      appliedDate: "8 Sept 2025",
      statusColor: "bg-green-500",
    },
    {
      jobTitle: "Backend Developer",
      company: "Accenture",
      status: "Rejected",
      appliedDate: "5 Sept 2025",
      statusColor: "bg-red-500",
    },
    {
      jobTitle: "Full Stack Developer",
      company: "Google",
      status: "Pending",
      appliedDate: "3 Sept 2025",
      statusColor: "bg-yellow-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--student-light))] to-background">
      <StudentNav />
      
      <div className="container py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[hsl(var(--student-primary))]">My Applications</h1>
          <p className="text-muted-foreground">Track all your job applications in one place</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
          </CardHeader>
          <CardContent>
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
                  {applications.map((app, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{app.jobTitle}</TableCell>
                      <TableCell>{app.company}</TableCell>
                      <TableCell>
                        <Badge className={app.statusColor}>{app.status}</Badge>
                      </TableCell>
                      <TableCell>{app.appliedDate}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View</Button>
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

export default StudentApplications;
