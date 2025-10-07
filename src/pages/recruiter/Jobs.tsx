import RecruiterNav from "@/components/recruiter/RecruiterNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const RecruiterJobs = () => {
  const jobs = [
    {
      title: "Software Engineer",
      applicants: 42,
      status: "Active",
      posted: "01 Oct 2025",
    },
    {
      title: "Data Analyst",
      applicants: 25,
      status: "Active",
      posted: "05 Oct 2025",
    },
    {
      title: "Frontend Developer",
      applicants: 38,
      status: "Active",
      posted: "03 Oct 2025",
    },
    {
      title: "Product Manager",
      applicants: 15,
      status: "Closed",
      posted: "20 Sept 2025",
    },
    {
      title: "Backend Developer",
      applicants: 28,
      status: "Active",
      posted: "28 Sept 2025",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--recruiter-light))] to-background">
      <RecruiterNav />
      
      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[hsl(var(--recruiter-primary))]">My Job Listings</h1>
            <p className="text-muted-foreground">Manage all your job postings</p>
          </div>
          <Link to="/recruiter/post-job">
            <Button className="bg-[hsl(var(--recruiter-primary))] hover:bg-[hsl(var(--recruiter-secondary))]">
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </Link>
        </div>

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
                  {jobs.map((job, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.applicants}</TableCell>
                      <TableCell>
                        <Badge className={job.status === "Active" ? "bg-green-500" : "bg-gray-500"}>
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{job.posted}</TableCell>
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

export default RecruiterJobs;
