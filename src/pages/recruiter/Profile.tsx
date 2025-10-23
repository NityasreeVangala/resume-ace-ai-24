import React, { useState } from "react";
import axios from "axios";
import RecruiterNav from "@/components/recruiter/RecruiterNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const RecruiterProfile = () => {
  const { toast } = useToast();

  const [companyInfo, setCompanyInfo] = useState({
    companyName: "Infosys",
    industry: "Information Technology",
    companyDescription: "Leading global technology and consulting company...",
  });

  const [recruiterInfo, setRecruiterInfo] = useState({
    recruiterName: "John Doe",
    designation: "HR Manager",
    email: "john@infosys.com",
    phone: "+91 98765 12345",
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState("");

  // Input handlers
  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCompanyInfo({ ...companyInfo, [e.target.id]: e.target.value });
  };

  const handleRecruiterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecruiterInfo({ ...recruiterInfo, [e.target.id]: e.target.value });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
      setLogoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Create/Update profile
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      // Update profile
      await axios.post(`${API_BASE_URL}/recruiter/profile`, { companyInfo, recruiterInfo });

      // Upload logo if selected
      if (logoFile) {
        const formData = new FormData();
        formData.append("logo", logoFile);
        await axios.post(`${API_BASE_URL}/recruiter/profile/logo`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      toast({
        title: "Profile Updated Successfully",
        description: "Your company and recruiter information has been saved.",
      });
    } catch (err) {
      console.error("⚠️ Error updating profile:", err);
      setError("Failed to update profile. Using example fallback.");
      toast({
        title: "Profile Update Fallback",
        description: "Example data has been used due to API failure.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete profile
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your profile? This action cannot be undone.")) return;

    setDeleteLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/recruiter/profile`);
      toast({
        title: "Profile Deleted",
        description: "Your profile has been removed successfully.",
      });
      // Reset state to empty
      setCompanyInfo({ companyName: "", industry: "", companyDescription: "" });
      setRecruiterInfo({ recruiterName: "", designation: "", email: "", phone: "" });
      setLogoFile(null);
      setLogoPreview("");
    } catch (err) {
      console.error("⚠️ Error deleting profile:", err);
      toast({ title: "Delete Failed", description: "Could not delete your profile." });
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--recruiter-light))] to-background">
      <RecruiterNav />

      <div className="container py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[hsl(var(--recruiter-primary))]">Recruiter Profile</h1>
          <p className="text-muted-foreground">Manage your company and recruiter information</p>
        </div>

        {error && <p className="text-red-500 text-center font-medium">{error}</p>}

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
                    <Input id="companyName" value={companyInfo.companyName} onChange={handleCompanyChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input id="industry" value={companyInfo.industry} onChange={handleCompanyChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyDescription">Company Description</Label>
                  <Textarea id="companyDescription" rows={4} value={companyInfo.companyDescription} onChange={handleCompanyChange} />
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
                    <Input id="recruiterName" value={recruiterInfo.recruiterName} onChange={handleRecruiterChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input id="designation" value={recruiterInfo.designation} onChange={handleRecruiterChange} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={recruiterInfo.email} onChange={handleRecruiterChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" value={recruiterInfo.phone} onChange={handleRecruiterChange} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                className="bg-[hsl(var(--recruiter-primary))] hover:bg-[hsl(var(--recruiter-secondary))]"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>

              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={handleDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : <><Trash2 className="inline mr-2"/>Delete Profile</>}
              </Button>
            </div>
          </div>

          {/* Company Logo */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Logo</CardTitle>
              </CardHeader>
              <CardContent>
                <label className="border-2 border-dashed border-[hsl(var(--recruiter-accent))] rounded-lg p-8 text-center hover:border-[hsl(var(--recruiter-primary))] transition-colors cursor-pointer block">
                  {logoPreview ? <img src={logoPreview} alt="Logo Preview" className="mx-auto mb-2 h-24 w-24 object-contain" /> : <Upload className="h-8 w-8 mx-auto mb-2 text-[hsl(var(--recruiter-primary))]" />}
                  <p className="text-sm text-muted-foreground">{logoPreview ? "Change Logo" : "Click to upload logo"}</p>
                  <input type="file" className="hidden" accept="image/*" onChange={handleLogoChange} />
                </label>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;

