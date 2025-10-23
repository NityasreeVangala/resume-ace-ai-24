import React, { useEffect, useState } from "react";
import axios from "axios";
import PlacementNav from "@/components/placement/PlacementNav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const PlacementReports = () => {
  const { toast } = useToast();

  const [departmentStats, setDepartmentStats] = useState([]);
  const [topRecruiters, setTopRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [year, setYear] = useState("2025");

  const fallbackDepartmentStats = [
    { name: "CSE", fullName: "Computer Science and Engineering", total: 167, placed: 145, percentage: 86.8, avgPackage: 8.5 },
    { name: "IT", fullName: "Information Technology", total: 151, placed: 128, percentage: 84.8, avgPackage: 8.2 },
    { name: "AI & DS", fullName: "Artificial Intelligence and Data Science", total: 120, placed: 98, percentage: 81.7, avgPackage: 9.1 },
    { name: "ECE", fullName: "Electronics and Communication Engineering", total: 112, placed: 85, percentage: 75.9, avgPackage: 7.2 },
  ];

  const fallbackTopRecruiters = [
    { company: "Infosys", hires: 45, avgPackage: "₹6.0 LPA" },
    { company: "TCS", hires: 38, avgPackage: "₹5.5 LPA" },
    { company: "Wipro", hires: 32, avgPackage: "₹6.2 LPA" },
    { company: "Google", hires: 12, avgPackage: "₹18.0 LPA" },
    { company: "Microsoft", hires: 10, avgPackage: "₹15.0 LPA" },
  ];

  const fetchReports = async (selectedYear = year) => {
    setLoading(true);
    setError("");

    try {
      const [deptRes, recruiterRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/placement/department-stats?year=${selectedYear}`),
        axios.get(`${API_BASE_URL}/placement/top-recruiters?year=${selectedYear}`)
      ]);

      setDepartmentStats(deptRes.data);
      setTopRecruiters(recruiterRes.data);
    } catch (err) {
      console.error("⚠️ Error fetching reports:", err);
      setError("Failed to fetch reports. Showing example data.");
      setDepartmentStats(fallbackDepartmentStats);
      setTopRecruiters(fallbackTopRecruiters);

      toast({
        title: "Data Fallback",
        description: "Example report data is being displayed due to a fetch error.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(year);
  }, [year]);

  const exportPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const reportElement = document.getElementById("report-container");
    if (!reportElement) return;

    const canvas = await html2canvas(reportElement);
    const imgData = canvas.toDataURL("image/png");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Placement_Report_${year}.pdf`);
  };

  if (loading) return <p className="text-center font-medium mt-8">Loading report data...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--placement-light))] to-background">
      <PlacementNav />

      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[hsl(var(--placement-primary))]">Reports & Analytics</h1>
            <p className="text-muted-foreground">Generate detailed placement reports and statistics</p>
          </div>
          <div className="flex gap-2">
            <Select value={year} onValueChange={(val) => setYear(val)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="bg-[hsl(var(--placement-primary))] hover:bg-[hsl(var(--placement-secondary))]"
              onClick={exportPDF}
            >
              <Download className="h-4 w-4 mr-2" /> Export PDF
            </Button>
          </div>
        </div>

        {error && <p className="text-red-500 text-center font-medium">{error}</p>}

        <div id="report-container" className="space-y-6">
          {/* Department-wise Placement % */}
          <Card>
            <CardHeader>
              <CardTitle>Department-wise Placement %</CardTitle>
              <CardDescription>Shows placement statistics for each department</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentStats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="percentage" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Recruiters */}
          <Card>
            <CardHeader>
              <CardTitle>Top Recruiters</CardTitle>
              <CardDescription>Companies with most hires</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topRecruiters} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="company" />
                  <YAxis />
                  <Bar dataKey="hires" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlacementReports;
