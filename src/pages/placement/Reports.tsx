import PlacementNav from "@/components/placement/PlacementNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, Download, TrendingUp } from "lucide-react";

const PlacementReports = () => {
  const departmentStats = [
    { name: "Computer Science", total: 150, placed: 128, percentage: 85.3, avgPackage: "₹8.5 LPA" },
    { name: "Electronics", total: 120, placed: 94, percentage: 78.3, avgPackage: "₹7.2 LPA" },
    { name: "Mechanical", total: 100, placed: 72, percentage: 72.0, avgPackage: "₹6.5 LPA" },
    { name: "Civil", total: 80, placed: 52, percentage: 65.0, avgPackage: "₹5.8 LPA" },
  ];

  const topRecruiters = [
    { company: "Infosys", hires: 45, avgPackage: "₹6.0 LPA" },
    { company: "TCS", hires: 38, avgPackage: "₹5.5 LPA" },
    { company: "Wipro", hires: 32, avgPackage: "₹6.2 LPA" },
    { company: "Google", hires: 12, avgPackage: "₹18.0 LPA" },
    { company: "Microsoft", hires: 10, avgPackage: "₹15.0 LPA" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--placement-light))] to-background">
      <PlacementNav />
      
      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[hsl(var(--placement-primary))]">Reports & Analytics</h1>
            <p className="text-muted-foreground">Generate detailed placement reports and statistics</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="2025">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-[hsl(var(--placement-primary))] hover:bg-[hsl(var(--placement-secondary))]">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Overall Placement Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[hsl(var(--placement-primary))]">78.5%</div>
              <p className="text-sm text-muted-foreground flex items-center mt-2">
                <TrendingUp className="h-4 w-4 mr-1" />
                +5.2% from last year
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Average Package</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[hsl(var(--placement-primary))]">₹6.8 LPA</div>
              <p className="text-sm text-muted-foreground flex items-center mt-2">
                <TrendingUp className="h-4 w-4 mr-1" />
                +8.5% from last year
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Students Placed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[hsl(var(--placement-primary))]">346</div>
              <p className="text-sm text-muted-foreground mt-2">
                Out of 441 eligible students
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Department-wise Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Department-wise Placement Statistics</CardTitle>
              <CardDescription>Detailed breakdown by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentStats.map((dept, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{dept.name}</span>
                      <span className="text-muted-foreground">
                        {dept.placed}/{dept.total} ({dept.percentage}%)
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Avg Package: {dept.avgPackage}</span>
                    </div>
                    <div className="h-2 bg-[hsl(var(--placement-lighter))] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[hsl(var(--placement-primary))] rounded-full"
                        style={{ width: `${dept.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Recruiters */}
          <Card>
            <CardHeader>
              <CardTitle>Top Recruiters</CardTitle>
              <CardDescription>Companies with most hires</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topRecruiters.map((recruiter, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div>
                      <p className="font-medium">{recruiter.company}</p>
                      <p className="text-sm text-muted-foreground">Avg Package: {recruiter.avgPackage}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[hsl(var(--placement-primary))]">{recruiter.hires}</p>
                      <p className="text-xs text-muted-foreground">hires</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlacementReports;
