import RecruiterNav from "@/components/recruiter/RecruiterNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const RecruiterApplicants = () => {
  const applicants = [
    {
      name: "Nitya Vangala",
      jobTitle: "Software Engineer",
      status: "Under Review",
      appliedDate: "02 Oct 2025",
    },
    {
      name: "Rahul Sharma",
      jobTitle: "Data Analyst",
      status: "Interview",
      appliedDate: "03 Oct 2025",
    },
    {
      name: "Priya Patel",
      jobTitle: "Frontend Developer",
      status: "Under Review",
      appliedDate: "04 Oct 2025",
    },
    {
      name: "Arjun Reddy",
      jobTitle: "Backend Developer",
      status: "Selected",
      appliedDate: "28 Sept 2025",
    },
    {
      name: "Sneha Kumar",
      jobTitle: "Product Manager",
      status: "Rejected",
      appliedDate: "25 Sept 2025",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--recruiter-light))] to-background">
      <RecruiterNav />
      
      <div className="container py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[hsl(var(--recruiter-primary))]">Applicants</h1>
          <p className="text-muted-foreground">Review and manage all candidate applications</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Applicants</CardTitle>
          </CardHeader>
          <CardContent>
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
                  {applicants.map((applicant, index) => (
                    <TableRow key={index}>
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
                        <Button variant="outline" size="sm">View Resume</Button>
                        <Button size="sm" className="bg-[hsl(var(--recruiter-primary))]">Contact</Button>
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

export default RecruiterApplicants;
