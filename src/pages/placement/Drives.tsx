import PlacementNav from "@/components/placement/PlacementNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";

const PlacementDrives = () => {
  const drives = [
    {
      name: "Amazon Campus Drive",
      company: "Amazon",
      date: "20 Dec 2025",
      eligibleBranches: "CS, EC, IT",
      status: "Scheduled",
      registrations: 45,
    },
    {
      name: "Google Recruitment",
      company: "Google",
      date: "15 Dec 2025",
      eligibleBranches: "CS, IT",
      status: "Ongoing",
      registrations: 38,
    },
    {
      name: "Microsoft Hiring Drive",
      company: "Microsoft",
      date: "05 Dec 2025",
      eligibleBranches: "CS, EC, IT, EE",
      status: "Completed",
      registrations: 52,
    },
    {
      name: "Infosys Mass Recruitment",
      company: "Infosys",
      date: "25 Nov 2025",
      eligibleBranches: "All Branches",
      status: "Completed",
      registrations: 120,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--placement-light))] to-background">
      <PlacementNav />
      
      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[hsl(var(--placement-primary))]">Placement Drives</h1>
            <p className="text-muted-foreground">Organize and monitor recruitment drives</p>
          </div>
          <Button className="bg-[hsl(var(--placement-primary))] hover:bg-[hsl(var(--placement-secondary))]">
            <Plus className="h-4 w-4 mr-2" />
            Schedule New Drive
          </Button>
        </div>

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

export default PlacementDrives;
