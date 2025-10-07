import PlacementNav from "@/components/placement/PlacementNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, Briefcase, TrendingUp, Calendar, DollarSign } from "lucide-react";

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
    { name: "Computer Science", placements: 120, percentage: 85 },
    { name: "Electronics", placements: 75, percentage: 78 },
    { name: "Mechanical", placements: 60, percentage: 72 },
    { name: "Civil", placements: 45, percentage: 65 },
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

          {/* Department-wise Placements */}
          <Card>
            <CardHeader>
              <CardTitle>Department-wise Placements</CardTitle>
              <CardDescription>Placement statistics by department</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {departmentData.map((dept, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{dept.name}</span>
                    <span className="text-muted-foreground">{dept.placements} placements ({dept.percentage}%)</span>
                  </div>
                  <div className="h-2 bg-[hsl(var(--placement-lighter))] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[hsl(var(--placement-primary))] rounded-full"
                      style={{ width: `${dept.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlacementDashboard;
