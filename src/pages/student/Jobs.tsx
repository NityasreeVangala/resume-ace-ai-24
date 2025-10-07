import StudentNav from "@/components/student/StudentNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MapPin, DollarSign, Clock, Briefcase } from "lucide-react";

const StudentJobs = () => {
  const jobs = [
    {
      title: "Software Engineer",
      company: "Google",
      location: "Bangalore, India",
      salary: "₹15-20 LPA",
      type: "Full-time",
      posted: "1 day ago",
    },
    {
      title: "Frontend Developer",
      company: "Microsoft",
      location: "Hyderabad, India",
      salary: "₹10-15 LPA",
      type: "Full-time",
      posted: "2 days ago",
    },
    {
      title: "Data Analyst",
      company: "Amazon",
      location: "Mumbai, India",
      salary: "₹8-12 LPA",
      type: "Full-time",
      posted: "3 days ago",
    },
    {
      title: "Backend Developer",
      company: "TCS",
      location: "Chennai, India",
      salary: "₹6-10 LPA",
      type: "Full-time",
      posted: "4 days ago",
    },
    {
      title: "Full Stack Developer",
      company: "Infosys",
      location: "Pune, India",
      salary: "₹8-14 LPA",
      type: "Full-time",
      posted: "5 days ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--student-light))] to-background">
      <StudentNav />
      
      <div className="container py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[hsl(var(--student-primary))]">Job Listings</h1>
          <p className="text-muted-foreground">Discover opportunities that match your skills and interests</p>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs, companies, or keywords..."
              className="pl-10 border-[hsl(var(--student-accent))]"
            />
          </div>
          <Button variant="outline" className="border-[hsl(var(--student-accent))]">
            Filters
          </Button>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {jobs.map((job, index) => (
            <Card key={index} className="hover:shadow-lg transition-all border-2 hover:border-[hsl(var(--student-accent))]">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <CardDescription className="font-medium text-base">{job.company}</CardDescription>
                  </div>
                  <Badge className="bg-[hsl(var(--student-primary))]">{job.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-6 mb-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-2" />
                    {job.salary}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Briefcase className="h-4 w-4 mr-2" />
                    {job.type}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    Posted {job.posted}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="bg-[hsl(var(--student-primary))] hover:bg-[hsl(var(--student-secondary))]">
                    Apply Now
                  </Button>
                  <Button variant="outline">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentJobs;
