import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { GraduationCap, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "../config/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, role } = response.data;

      // Store token
      if (remember) localStorage.setItem("authToken", token);
      else sessionStorage.setItem("authToken", token);

      localStorage.setItem("userRole", role);

      toast({
        title: "Login Successful",
        description: "Welcome back to CampusCatalyst!",
      });

      // ✅ Navigation with small delay to ensure storage updates
      setTimeout(() => {
        if (role === "student") navigate("/student/dashboard");
        else if (role === "recruiter") navigate("/recruiter/dashboard");
        else if (role === "placement") navigate("/placement/dashboard");
        else navigate("/login");
      }, 50);
    } catch (err: any) {
      toast({
        title: "Login Failed",
        description: err.response?.data?.message || err.message || "Invalid credentials",
        variant: "destructive",
      });
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(var(--auth-light))] via-background to-[hsl(var(--auth-accent))]">
      <div className="container grid lg:grid-cols-2 gap-8 items-center p-4">
        {/* Left section */}
        <div className="hidden lg:block space-y-6">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-12 w-12 text-[hsl(var(--auth-primary))]" />
            <span className="text-4xl font-bold text-[hsl(var(--auth-primary))]">
              CampusCatalyst
            </span>
          </div>
          <h1 className="text-4xl font-bold text-[hsl(var(--auth-primary))]">
            Welcome Back
          </h1>
          <p className="text-xl text-muted-foreground">
            Empowering students and recruiters to collaborate, and create successful careers.
          </p>
        </div>

        {/* Right section */}
        <Card className="w-full max-w-md mx-auto shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Sign in to your account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(checked) => setRemember(checked as boolean)}
                  disabled={loading}
                />
                <label htmlFor="remember" className="text-sm font-medium leading-none">
                  Remember me
                </label>
              </div>

              <Button type="submit" className="w-full flex items-center justify-center" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              Don’t have an account?{" "}
              <Link to="/register" className="text-[hsl(var(--auth-primary))] hover:underline font-medium">
                Register here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
