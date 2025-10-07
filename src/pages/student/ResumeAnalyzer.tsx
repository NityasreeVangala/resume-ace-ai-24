import StudentNav from "@/components/student/StudentNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText } from "lucide-react";

const StudentResumeAnalyzer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--student-light))] to-background">
      <StudentNav />
      
      <div className="container py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[hsl(var(--student-primary))]">AI Resume Analyzer</h1>
          <p className="text-muted-foreground">Get your ATS score and detailed analysis to improve your resume</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-2 border-[hsl(var(--student-accent))]">
            <CardHeader>
              <CardTitle>Upload Your Resume</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-[hsl(var(--student-accent))] rounded-lg p-12 text-center hover:border-[hsl(var(--student-primary))] transition-colors cursor-pointer">
                <Upload className="h-16 w-16 mx-auto mb-4 text-[hsl(var(--student-primary))]" />
                <h3 className="font-semibold mb-2">Drag and drop or click to upload</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Supported formats: PDF, DOC, DOCX (Max 5MB)
                </p>
                <Button className="bg-[hsl(var(--student-primary))] hover:bg-[hsl(var(--student-secondary))]">
                  Choose File
                </Button>
              </div>
              <div className="bg-[hsl(var(--student-light))] p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Get instant ATS score and detailed analysis</strong>
                  <br />
                  Our AI will analyze your resume for:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>• ATS compatibility score</li>
                  <li>• Keywords optimization</li>
                  <li>• Formatting suggestions</li>
                  <li>• Content improvements</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[hsl(var(--student-accent))]">
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">No Resume Uploaded</h3>
                <p className="text-sm text-muted-foreground">
                  Upload your resume to get instant AI-powered analysis and suggestions
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentResumeAnalyzer;
