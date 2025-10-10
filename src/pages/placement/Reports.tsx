import PlacementNav from "@/components/placement/PlacementNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, Download, TrendingUp } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Legend } from "recharts";

const PlacementReports = () => {
  const departmentStats = [
    { name: "CSE", fullName: "Computer Science and Engineering", total: 167, placed: 145, percentage: 86.8, avgPackage: 8.5, packageNum: 8.5 },
    { name: "IT", fullName: "Information Technology", total: 151, placed: 128, percentage: 84.8, avgPackage: 8.2, packageNum: 8.2 },
    { name: "AI & DS", fullName: "Artificial Intelligence and Data Science", total: 120, placed: 98, percentage: 81.7, avgPackage: 9.1, packageNum: 9.1 },
    { name: "ECE", fullName: "Electronics and Communication Engineering", total: 112, placed: 85, percentage: 75.9, avgPackage: 7.2, packageNum: 7.2 },
    { name: "EEE", fullName: "Electrical and Electronics Engineering", total: 97, placed: 72, percentage: 74.2, avgPackage: 6.8, packageNum: 6.8 },
    { name: "Mechanical", fullName: "Mechanical Engineering", total: 96, placed: 68, percentage: 70.8, avgPackage: 6.5, packageNum: 6.5 },
    { name: "Mechatronics", fullName: "Mechatronics Engineering", total: 65, placed: 45, percentage: 69.2, avgPackage: 6.9, packageNum: 6.9 },
    { name: "Civil", fullName: "Civil Engineering", total: 80, placed: 52, percentage: 65.0, avgPackage: 5.8, packageNum: 5.8 },
  ];

  const chartConfig = {
    placed: {
      label: "Placed",
      color: "hsl(var(--placement-primary))",
    },
    total: {
      label: "Total",
      color: "hsl(var(--placement-lighter))",
    },
    percentage: {
      label: "Percentage",
      color: "hsl(var(--placement-accent))",
    },
  };

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

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Placement Rate Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Placement Rate by Stream</CardTitle>
              <CardDescription>Comparison of placement percentages</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentStats} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--foreground))" fontSize={12} />
                    <YAxis dataKey="name" type="category" stroke="hsl(var(--foreground))" fontSize={12} width={80} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="percentage" fill="hsl(var(--placement-primary))" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Package Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Average Package Trends</CardTitle>
              <CardDescription>Package distribution across streams</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={departmentStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--foreground))" fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="packageNum" 
                      stroke="hsl(var(--placement-accent))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--placement-accent))", r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Department-wise Statistics Table */}
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
                      <span className="font-medium">{dept.fullName}</span>
                      <span className="text-muted-foreground">
                        {dept.placed}/{dept.total} ({dept.percentage}%)
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Avg Package: ₹{dept.avgPackage} LPA</span>
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
