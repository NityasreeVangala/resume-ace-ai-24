import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import StudentNav from "@/components/student/StudentNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  gradYear: string;
  cgpa: string;
  photo: string;
}

const StudentProfile = () => {
  const { toast } = useToast();

  const [profile, setProfile] = useState<Profile>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    college: "",
    branch: "",
    gradYear: "",
    cgpa: "",
    photo: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const demoProfile: Profile = {
    firstName: "Nitya",
    lastName: "Sharma",
    email: "nitya@example.com",
    phone: "+91 98765 43210",
    college: "XYZ Institute of Technology",
    branch: "Computer Science & Engineering",
    gradYear: "2026",
    cgpa: "8.5",
    photo: "",
  };

  // Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/student/profile`, { withCredentials: true });
        setProfile(res.data || demoProfile);
        setPhotoPreview(res.data?.photo || null);
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch profile — showing example data.");
        setProfile(demoProfile);
        toast({
          title: "Offline Mode",
          description: "Showing example profile data due to server issue.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [toast]);

  // Calculate profile completion
  const calculateCompletion = () => {
    const fields: (keyof Profile)[] = ["firstName", "lastName", "email", "phone", "college", "branch", "gradYear", "cgpa", "photo"];
    const filled = fields.filter((f) => profile[f] && profile[f].toString().trim() !== "").length;
    return Math.floor((filled / fields.length) * 100);
  };

  // Save profile
  const handleSave = async () => {
    try {
      await axios.put(`${API_BASE_URL}/student/profile`, profile, { withCredentials: true });
      toast({ title: "Profile updated successfully!", variant: "default" });
    } catch (err: any) {
      console.error(err);
      toast({ title: "Failed to update profile. Please try again.", variant: "destructive" });
    }
  };

  // Handle photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setProfile({ ...profile, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-muted-foreground">
        Loading your profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--student-light))] to-background">
      <StudentNav />

      <div className="container py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[hsl(var(--student-primary))]">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and resume</p>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
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
                    <Input
                      id="college"
                      value={profile.college}
                      onChange={(e) => setProfile({ ...profile, college: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch</Label>
                    <Input
                      id="branch"
                      value={profile.branch}
                      onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gradYear">Graduation Year</Label>
                    <Input
                      id="gradYear"
                      value={profile.gradYear}
                      onChange={(e) => setProfile({ ...profile, gradYear: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cgpa">CGPA/Percentage</Label>
                    <Input
                      id="cgpa"
                      value={profile.cgpa}
                      onChange={(e) => setProfile({ ...profile, cgpa: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              className="bg-[hsl(var(--student-primary))] hover:bg-[hsl(var(--student-secondary))]"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>

          {/* Right section */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Completion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{calculateCompletion()}% Complete</span>
                  </div>
                  <Progress value={calculateCompletion()} className="h-2" />
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
                <label className="border-2 border-dashed border-[hsl(var(--student-accent))] rounded-lg p-4 text-center cursor-pointer hover:border-[hsl(var(--student-primary))] transition-colors flex flex-col items-center">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Profile" className="h-32 w-32 rounded-full object-cover mb-2" />
                  ) : (
                    <Upload className="h-8 w-8 mb-2 text-[hsl(var(--student-primary))]" />
                  )}
                  <span className="text-sm text-muted-foreground">Click to upload photo</span>
                  <Input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                </label>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
