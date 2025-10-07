import PlacementNav from "@/components/placement/PlacementNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const PlacementRecruiters = () => {
  const recruiters = [
    {
      company: "Google",
      hrName: "John Smith",
      email: "john@google.com",
      industry: "Technology",
      status: "Approved",
      jobsPosted: 5,
    },
    {
      company: "Microsoft",
      hrName: "Sarah Johnson",
      email: "sarah@microsoft.com",
      industry: "Technology",
      status: "Approved",
      jobsPosted: 8,
    },
    {
      company: "Infosys",
      hrName: "Raj Kumar",
      email: "raj@infosys.com",
      industry: "IT Services",
      status: "Approved",
      jobsPosted: 12,
    },
    {
      company: "Wipro",
      hrName: "Priya Patel",
      email: "priya@wipro.com",
      industry: "IT Services",
      status: "Pending",
      jobsPosted: 3,
    },
    {
      company: "TCS",
      hrName: "Amit Sharma",
      email: "amit@tcs.com",
      industry: "IT Services",
      status: "Approved",
      jobsPosted: 15,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--placement-light))] to-background">
      <PlacementNav />
      
      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[hsl(var(--placement-primary))]">Manage Recruiters</h1>
            <p className="text-muted-foreground">View and manage all registered recruiters</p>
          </div>
          <Button className="bg-[hsl(var(--placement-primary))] hover:bg-[hsl(var(--placement-secondary))]">
            Add Recruiter
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <CardTitle>All Recruiters</CardTitle>
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search recruiters..."
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
                  {recruiters.map((recruiter, index) => (
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
                        <Button variant="outline" size="sm">View</Button>
                        {recruiter.status === "Pending" && (
                          <Button size="sm" className="bg-[hsl(var(--placement-primary))]">Approve</Button>
                        )}
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

export default PlacementRecruiters;
