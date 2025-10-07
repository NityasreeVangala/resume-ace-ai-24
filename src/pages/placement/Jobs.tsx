import PlacementNav from "@/components/placement/PlacementNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const PlacementJobs = () => {
  const jobs = [
    {
      title: "Software Engineer",
      company: "Google",
      package: "₹15-20 LPA",
      location: "Bangalore",
      status: "Open",
      applications: 42,
    },
    {
      title: "Data Analyst",
      company: "Microsoft",
      package: "₹10-15 LPA",
      location: "Hyderabad",
      status: "Open",
      applications: 35,
    },
    {
      title: "Frontend Developer",
      company: "Amazon",
      package: "₹12-18 LPA",
      location: "Mumbai",
      status: "Open",
      applications: 28,
    },
    {
      title: "Backend Developer",
      company: "Infosys",
      package: "₹6-10 LPA",
      location: "Pune",
      status: "Closed",
      applications: 65,
    },
    {
      title: "Product Manager",
      company: "Wipro",
      package: "₹8-14 LPA",
      location: "Chennai",
      status: "Open",
      applications: 22,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--placement-light))] to-background">
      <PlacementNav />
      
      <div className="container py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[hsl(var(--placement-primary))]">Manage Job Listings</h1>
          <p className="text-muted-foreground">View and manage all job postings</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <CardTitle>All Job Listings</CardTitle>
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs..."
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
                    <TableHead>Job Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.company}</TableCell>
                      <TableCell>{job.package}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>
                        <Badge className={job.status === "Open" ? "bg-green-500" : "bg-gray-500"}>
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{job.applications}</TableCell>
                      <TableCell className="space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Edit</Button>
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

export default PlacementJobs;
