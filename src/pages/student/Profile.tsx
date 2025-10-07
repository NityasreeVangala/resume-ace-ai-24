import StudentNav from "@/components/student/StudentNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Upload } from "lucide-react";

const StudentProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--student-light))] to-background">
      <StudentNav />
      
      <div className="container py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[hsl(var(--student-primary))]">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and resume</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Nitya" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Sharma" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="nitya@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="college">College/University</Label>
                    <Input id="college" defaultValue="XYZ Institute of Technology" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch</Label>
                    <Input id="branch" defaultValue="Computer Science & Engineering" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gradYear">Graduation Year</Label>
                    <Input id="gradYear" defaultValue="2026" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cgpa">CGPA/Percentage</Label>
                    <Input id="cgpa" defaultValue="8.5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="bg-[hsl(var(--student-primary))] hover:bg-[hsl(var(--student-secondary))]">
              Save Changes
            </Button>
          </div>

          <div className="space-y-6">
            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Completion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>80% Complete</span>
                  </div>
                  <Progress value={80} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Add more details to increase visibility
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Upload Photo */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Photo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-[hsl(var(--student-accent))] rounded-lg p-8 text-center hover:border-[hsl(var(--student-primary))] transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-[hsl(var(--student-primary))]" />
                  <p className="text-sm text-muted-foreground">Click to upload photo</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
