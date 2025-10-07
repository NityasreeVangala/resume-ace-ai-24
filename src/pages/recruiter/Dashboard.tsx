import RecruiterNav from "@/components/recruiter/RecruiterNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Users, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const RecruiterDashboard = () => {
  const stats = [
    { label: "Active Job Posts", value: "6", change: "+2 this week", icon: Briefcase },
    { label: "Total Applications", value: "152", change: "+18 new today", icon: Users },
    { label: "Hires Completed", value: "18", change: "+3 this month", icon: TrendingUp },
    { label: "Pending Interviews", value: "12", change: "5 scheduled this week", icon: Clock },
  ];

  const recentApplicants = [
    {
      name: "Nitya Vangala",
      position: "Software Engineer",
      status: "Under Review",
      appliedDate: "02 Oct 2025",
      time: "2 hours ago",
    },
    {
      name: "Rahul Sharma",
      position: "Data Analyst",
      status: "Interview",
      appliedDate: "03 Oct 2025",
      time: "5 hours ago",
    },
    {
      name: "Priya Patel",
      position: "Frontend Developer",
      status: "Under Review",
      appliedDate: "04 Oct 2025",
      time: "1 day ago",
    },
  ];

  const jobListings = [
    { title: "Software Engineer", applicants: 42, status: "Active", posted: "01 Oct 2025" },
    { title: "Data Analyst", applicants: 25, status: "Active", posted: "05 Oct 2025" },
    { title: "Frontend Developer", applicants: 38, status: "Active", posted: "03 Oct 2025" },
    { title: "Product Manager", applicants: 15, status: "Closed", posted: "20 Sept 2025" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--recruiter-light))] to-background">
      <RecruiterNav />
      
      <div className="container py-8 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[hsl(var(--recruiter-primary))]">Welcome back, John</h1>
          <p className="text-muted-foreground">
            HR Manager at Infosys • Here's your recruitment summary for this week
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border-2 hover:border-[hsl(var(--recruiter-accent))] transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className="h-4 w-4 text-[hsl(var(--recruiter-primary))]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Applicants */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Applicants</CardTitle>
                  <CardDescription>Review and manage candidate applications</CardDescription>
                </div>
                <Link to="/recruiter/applicants">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentApplicants.map((applicant, index) => (
                <div key={index} className="flex items-start justify-between border-b pb-4 last:border-0">
                  <div className="space-y-1">
                    <p className="font-medium">{applicant.name}</p>
                    <p className="text-sm text-muted-foreground">{applicant.position}</p>
                    <p className="text-xs text-muted-foreground">Applied on {applicant.appliedDate}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge variant="outline" className="border-[hsl(var(--recruiter-accent))]">
                      {applicant.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{applicant.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* My Job Listings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>My Job Listings</CardTitle>
                  <CardDescription>Manage your active and closed positions</CardDescription>
                </div>
                <Link to="/recruiter/post-job">
                  <Button size="sm" className="bg-[hsl(var(--recruiter-primary))] hover:bg-[hsl(var(--recruiter-secondary))]">
                    Post Job
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {jobListings.map((job, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="space-y-1">
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-muted-foreground">{job.applicants} applicants</p>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge className={job.status === "Active" ? "bg-green-500" : "bg-gray-500"}>
                      {job.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{job.posted}</p>
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

export default RecruiterDashboard;
