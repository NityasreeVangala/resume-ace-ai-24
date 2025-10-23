import React, { useEffect, useState } from "react";
import axios from "axios";
import PlacementNav from "@/components/placement/PlacementNav";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Users, Building2, Briefcase, TrendingUp, Trash, Edit, Plus } from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const PlacementDashboard = () => {
  const { toast } = useToast();

  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    placements: "",
    percentage: "",
    avgPackage: "",
  });

  const fallbackStats = {
    totalStudents: 1247,
    totalRecruiters: 89,
    totalJobs: 156,
    totalPlacements: 423,
  };

  const fallbackRecentActivity = [
    { title: "Student Placement Confirmed", description: "Rahul Sharma placed at TCS", time: "2 hours ago" },
    { title: "New Recruiter Registered", description: "Infosys joined the platform", time: "5 hours ago" },
    { title: "Job Listing Published", description: "Software Developer role by Wipro", time: "1 day ago" },
  ];

  const fallbackDepartmentData = [
    { name: "CSE", placements: 145, percentage: 87, avgPackage: 8.5 },
    { name: "IT", placements: 128, percentage: 85, avgPackage: 8.2 },
    { name: "AI & DS", placements: 98, percentage: 82, avgPackage: 9.1 },
    { name: "ECE", placements: 85, percentage: 76, avgPackage: 7.2 },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError("");

      try {
        const [statsRes, activityRes, deptRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/placement/dashboard/stats`),
          axios.get(`${API_BASE_URL}/placement/dashboard/recent-activity`),
          axios.get(`${API_BASE_URL}/placement/dashboard/departments`),
        ]);

        setStats(statsRes.data);
        setRecentActivity(activityRes.data);
        setDepartmentData(deptRes.data);
      } catch (err) {
        console.error("⚠️ Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Showing fallback data.");
        setStats(fallbackStats);
        setRecentActivity(fallbackRecentActivity);
        setDepartmentData(fallbackDepartmentData);

        toast({
          title: "Dashboard Data Fallback",
          description: "Using fallback example data due to an API error.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const COLORS = [
    "#6366f1", "#ec4899", "#f59e0b", "#10b981", "#8b5cf6", "#3b82f6",
  ];

  // CRUD Handlers
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleAddOrEditDepartment = () => {
    try {
      let updatedDepartments;
      if (editingDepartment) {
        updatedDepartments = departmentData.map((dept) =>
          dept.name === editingDepartment.name
            ? { ...formData, avgPackage: parseFloat(formData.avgPackage) }
            : dept
        );
        toast({ title: "Department Updated Successfully" });
      } else {
        updatedDepartments = [
          ...departmentData,
          { ...formData, avgPackage: parseFloat(formData.avgPackage) },
        ];
        toast({ title: "New Department Added" });
      }

      setDepartmentData(updatedDepartments);
      setModalOpen(false);
      setEditingDepartment(null);
      setFormData({ name: "", placements: "", percentage: "", avgPackage: "" });
    } catch (err) {
      console.error("Error in add/edit:", err);
      toast({ title: "Error Saving Department" });
    }
  };

  const handleEdit = (dept) => {
    setEditingDepartment(dept);
    setFormData({ ...dept });
    setModalOpen(true);
  };

  const handleDelete = (deptName) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      setDepartmentData(departmentData.filter((d) => d.name !== deptName));
      toast({ title: "Department Deleted" });
    }
  };

  if (loading) return <p className="text-center mt-10 font-medium">Loading dashboard...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--placement-light))] to-background">
      <PlacementNav />

      <div className="container py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[hsl(var(--placement-primary))]">Welcome Back!</h1>
          <p className="text-muted-foreground">
            Admin Dashboard - Here's what's happening with placements today.
          </p>
        </div>

        {error && <p className="text-red-500 text-center font-medium">{error}</p>}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Students", value: stats?.totalStudents || "—", icon: Users },
            { label: "Active Recruiters", value: stats?.totalCompanies || stats?.totalRecruiters || "—", icon: Building2 },
            { label: "Job Listings", value: stats?.totalJobs || "—", icon: Briefcase },
            { label: "Placements", value: stats?.placementsDone || stats?.totalPlacements || "—", icon: TrendingUp },
          ].map((stat, index) => (
            <Card key={index} className="border-2 hover:border-[hsl(var(--placement-accent))] transition-all">
              <CardHeader className="flex items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className="h-4 w-4 text-[hsl(var(--placement-primary))]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Department Section */}
        <div className="flex justify-between items-center mt-6">
          <h2 className="text-xl font-bold text-[hsl(var(--placement-primary))]">Department-wise Placements</h2>
          <Button onClick={() => setModalOpen(true)} className="flex items-center gap-2">
            <Plus /> Add Department
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {departmentData.map((dept, index) => (
            <Card key={index} className="border-2 hover:border-[hsl(var(--placement-accent))] transition-all">
              <CardHeader className="flex justify-between items-center">
                <CardTitle>{dept.name}</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(dept)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(dept.name)}>
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p>Placements: {dept.placements}</p>
                <p>Percentage: {dept.percentage}%</p>
                <p>Average Package: ₹{dept.avgPackage} LPA</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Placement Distribution</CardTitle>
            <CardDescription>Stream-wise placement breakdown</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  dataKey="placements"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Modal for Add/Edit Department */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingDepartment ? "Edit Department" : "Add Department"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {["name", "placements", "percentage", "avgPackage"].map((field) => (
              <Input
                key={field}
                id={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                type={field === "name" ? "text" : "number"}
                value={formData[field]}
                onChange={handleFormChange}
              />
            ))}
            <Button onClick={handleAddOrEditDepartment} className="w-full">
              {editingDepartment ? "Update Department" : "Add Department"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlacementDashboard;
