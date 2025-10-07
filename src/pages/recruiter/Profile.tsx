import RecruiterNav from "@/components/recruiter/RecruiterNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";

const RecruiterProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--recruiter-light))] to-background">
      <RecruiterNav />
      
      <div className="container py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[hsl(var(--recruiter-primary))]">Recruiter Profile</h1>
          <p className="text-muted-foreground">Manage your company and recruiter information</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" defaultValue="Infosys" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input id="industry" defaultValue="Information Technology" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyDescription">Company Description</Label>
                  <Textarea
                    id="companyDescription"
                    rows={4}
                    defaultValue="Leading global technology and consulting company..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Recruiter Information */}
            <Card>
              <CardHeader>
                <CardTitle>Recruiter Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="recruiterName">Full Name</Label>
                    <Input id="recruiterName" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input id="designation" defaultValue="HR Manager" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john@infosys.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" defaultValue="+91 98765 12345" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="bg-[hsl(var(--recruiter-primary))] hover:bg-[hsl(var(--recruiter-secondary))]">
              Save Changes
            </Button>
          </div>

          <div className="space-y-6">
            {/* Company Logo */}
            <Card>
              <CardHeader>
                <CardTitle>Company Logo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-[hsl(var(--recruiter-accent))] rounded-lg p-8 text-center hover:border-[hsl(var(--recruiter-primary))] transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-[hsl(var(--recruiter-primary))]" />
                  <p className="text-sm text-muted-foreground">Click to upload logo</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;
