import PlacementNav from "@/components/placement/PlacementNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, Briefcase, TrendingUp, Calendar, DollarSign } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const PlacementDashboard = () => {
  const stats = [
    { label: "Total Students", value: "1,247", change: "↑ 12% vs last month", icon: Users },
    { label: "Active Recruiters", value: "89", change: "↑ 5% vs last month", icon: Building2 },
    { label: "Job Listings", value: "156", change: "↑ 18% vs last month", icon: Briefcase },
    { label: "Placements", value: "423", change: "↑ 8% vs last month", icon: TrendingUp },
    { label: "Placement Rate", value: "78.5%", change: "", icon: TrendingUp },
    { label: "Average Package", value: "₹6.2 LPA", change: "", icon: DollarSign },
    { label: "Ongoing Drives", value: "12", change: "", icon: Calendar },
  ];

  const recentActivity = [
    {
      title: "Student Placement Confirmed",
      description: "Rahul Sharma placed at TCS",
      time: "2 hours ago",
    },
    {
      title: "New Recruiter Registered",
      description: "Infosys joined the platform",
      time: "5 hours ago",
    },
    {
      title: "Job Listing Published",
      description: "Software Developer role by Wipro",
      time: "1 day ago",
    },
    {
      title: "Placement Drive Scheduled",
      description: "Amazon campus drive on Dec 20",
      time: "2 days ago",
    },
  ];

  const departmentData = [
    { name: "CSE", fullName: "Computer Science and Engineering", placements: 145, percentage: 87, avgPackage: 8.5 },
    { name: "IT", fullName: "Information Technology", placements: 128, percentage: 85, avgPackage: 8.2 },
    { name: "AI & DS", fullName: "Artificial Intelligence and Data Science", placements: 98, percentage: 82, avgPackage: 9.1 },
    { name: "ECE", fullName: "Electronics and Communication Engineering", placements: 85, percentage: 76, avgPackage: 7.2 },
    { name: "EEE", fullName: "Electrical and Electronics Engineering", placements: 72, percentage: 74, avgPackage: 6.8 },
    { name: "Mechanical", fullName: "Mechanical Engineering", placements: 68, percentage: 71, avgPackage: 6.5 },
    { name: "Mechatronics", fullName: "Mechatronics Engineering", placements: 45, percentage: 69, avgPackage: 6.9 },
    { name: "Civil", fullName: "Civil Engineering", placements: 52, percentage: 65, avgPackage: 5.8 },
  ];

  const chartConfig = {
    placements: {
      label: "Placements",
      color: "hsl(var(--placement-primary))",
    },
    percentage: {
      label: "Percentage",
      color: "hsl(var(--placement-accent))",
    },
  };

  const COLORS = [
    "hsl(var(--placement-primary))",
    "hsl(var(--placement-accent))",
    "hsl(var(--placement-secondary))",
    "#8b5cf6",
    "#ec4899",
    "#f59e0b",
    "#10b981",
    "#6366f1",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--placement-light))] to-background">
      <PlacementNav />
      
      <div className="container py-8 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[hsl(var(--placement-primary))]">Welcome Back!</h1>
          <p className="text-muted-foreground">Admin Dashboard - Here's what's happening with your placements today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.slice(0, 4).map((stat, index) => (
            <Card key={index} className="border-2 hover:border-[hsl(var(--placement-accent))] transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className="h-4 w-4 text-[hsl(var(--placement-primary))]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.slice(4).map((stat, index) => (
            <Card key={index} className="border-2 hover:border-[hsl(var(--placement-accent))] transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className="h-4 w-4 text-[hsl(var(--placement-primary))]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start justify-between border-b pb-4 last:border-0">
                  <div className="space-y-1">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                  <p className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Placement Distribution Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Placement Distribution</CardTitle>
              <CardDescription>Stream-wise placement breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="placements"
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Department-wise Placement Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Bar Chart - Placements */}
          <Card>
            <CardHeader>
              <CardTitle>Stream-wise Placements</CardTitle>
              <CardDescription>Number of students placed per stream</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--foreground))" fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="placements" fill="hsl(var(--placement-primary))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Bar Chart - Average Package */}
          <Card>
            <CardHeader>
              <CardTitle>Average Package by Stream</CardTitle>
              <CardDescription>Package in LPA across departments</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--foreground))" fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="avgPackage" fill="hsl(var(--placement-accent))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlacementDashboard;
