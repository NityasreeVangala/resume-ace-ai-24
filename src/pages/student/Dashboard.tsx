import StudentNav from "@/components/student/StudentNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, TrendingUp, Eye, Clock, MapPin, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const stats = [
    { label: "Jobs Applied", value: "12", change: "+3 this week", icon: Briefcase },
    { label: "Pending Interviews", value: "3", change: "2 this week", icon: Clock },
    { label: "Offers Received", value: "2", change: "+1 new offer", icon: TrendingUp },
    { label: "Profile Views", value: "45", change: "+12 this week", icon: Eye },
  ];

  const recommendedJobs = [
    {
      title: "Frontend Developer",
      company: "Google",
      location: "Bangalore, India",
      salary: "₹7-12 LPA",
      type: "Full-time",
      posted: "2 days ago",
    },
    {
      title: "Backend Engineer",
      company: "Microsoft",
      location: "Hyderabad, India",
      salary: "₹10-15 LPA",
      type: "Full-time",
      posted: "3 days ago",
    },
    {
      title: "Data Scientist",
      company: "Amazon",
      location: "Mumbai, India",
      salary: "₹12-18 LPA",
      type: "Full-time",
      posted: "5 days ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--student-light))] to-background">
      <StudentNav />
      
      <div className="container py-8 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[hsl(var(--student-primary))]">Hi Nitya 👋</h1>
          <p className="text-muted-foreground">
            Welcome back to CampusCatalyst! Here's what's happening with your job applications today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border-2 hover:border-[hsl(var(--student-accent))] transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className="h-4 w-4 text-[hsl(var(--student-primary))]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recommended Jobs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Recommended for You</h2>
              <p className="text-muted-foreground">Based on your profile and preferences</p>
            </div>
            <Link to="/student/jobs">
              <Button variant="outline">View All Jobs</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedJobs.map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-all border-2 hover:border-[hsl(var(--student-accent))]">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <CardDescription className="font-medium">{job.company}</CardDescription>
                    </div>
                    <Badge className="bg-[hsl(var(--student-primary))]">{job.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <DollarSign className="h-4 w-4 mr-2" />
                      {job.salary}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      Posted {job.posted}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-[hsl(var(--student-primary))] hover:bg-[hsl(var(--student-secondary))]">
                      Apply Now
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
