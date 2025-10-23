import { useState, useRef } from "react";
import axios from "axios";
import StudentNav from "@/components/student/StudentNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

interface AnalysisResult {
  atsScore: string;
  keywords: string;
  tips: string;
}

const StudentResumeAnalyzer = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Demo/fallback analysis
  const demoAnalysis: AnalysisResult = {
    atsScore: "85%",
    keywords: "Good",
    tips: "Keep your resume concise and clear.",
  };

  // Validate uploaded file
  const validateFile = (file: File) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSizeMB = 5;

    if (!allowedTypes.includes(file.type)) {
      setError("Unsupported file format. Use PDF, DOC, or DOCX.");
      return false;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError("File size exceeds 5MB limit.");
      return false;
    }
    return true;
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      setAnalysis(null);
      setError("");
    }
  };

  // Drag & drop handlers
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
      setAnalysis(null);
      setError("");
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  // Upload and analyze resume
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await axios.post(`${API_BASE_URL}/api/student/analyze-resume`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAnalysis(response.data || demoAnalysis);
      toast({ title: "Analysis Complete!", variant: "default" });
    } catch (err) {
      console.error(err);
      setError("Failed to analyze resume — showing example analysis.");
      setAnalysis(demoAnalysis);

      toast({
        title: "Offline / Demo Mode",
        description: "Showing example analysis due to server issue.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--student-light))] to-background">
      <StudentNav />

      <div className="container py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[hsl(var(--student-primary))]">AI Resume Analyzer</h1>
          <p className="text-muted-foreground">
            Get your ATS score and detailed analysis to improve your resume
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card className="border-2 border-[hsl(var(--student-accent))]">
            <CardHeader>
              <CardTitle>Upload Your Resume</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                className="border-2 border-dashed border-[hsl(var(--student-accent))] rounded-lg p-12 text-center hover:border-[hsl(var(--student-primary))] transition-colors cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-16 w-16 mx-auto mb-4 text-[hsl(var(--student-primary))]" />
                <h3 className="font-semibold mb-2">Drag & drop or click to upload</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Supported formats: PDF, DOC, DOCX (Max 5MB)
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {file && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Selected: <strong>{file.name}</strong>
                  </p>
                )}
              </div>

              <Button
                onClick={handleUpload}
                disabled={!file || loading}
                className="w-full bg-[hsl(var(--student-primary))] hover:bg-[hsl(var(--student-secondary))]"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Analyzing...
                  </>
                ) : (
                  "Analyze Resume"
                )}
              </Button>

              {error && (
                <p className="text-red-500 text-sm flex items-center justify-center mt-2">
                  <AlertCircle className="h-4 w-4 mr-1" /> {error}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <Card className="border-2 border-[hsl(var(--student-accent))]">
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Loader2 className="h-10 w-10 animate-spin text-[hsl(var(--student-primary))] mb-3" />
                  <p className="text-muted-foreground">Analyzing your resume...</p>
                </div>
              ) : analysis ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <CheckCircle className="h-5 w-5" /> Analysis Complete
                  </div>
                  <div className="bg-[hsl(var(--student-light))] p-4 rounded-lg space-y-2">
                    <p>
                      <strong>ATS Score:</strong> {analysis.atsScore}
                    </p>
                    <p>
                      <strong>Keyword Match:</strong> {analysis.keywords}
                    </p>
                    <p>
                      <strong>Formatting Tips:</strong> {analysis.tips}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No Resume Uploaded</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload your resume to get instant AI-powered analysis and suggestions
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentResumeAnalyzer;
