import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo login logic - in real app, would authenticate with backend
    if (email && password) {
      // For demo purposes, redirect based on email domain
      if (email.includes("student")) {
        navigate("/student/dashboard");
      } else if (email.includes("recruiter")) {
        navigate("/recruiter/dashboard");
      } else if (email.includes("placement")) {
        navigate("/placement/dashboard");
      } else {
        navigate("/student/dashboard");
      }
      
      toast({
        title: "Login Successful",
        description: "Welcome back to CampusCatalyst!",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(var(--auth-light))] via-background to-[hsl(var(--auth-accent))]">
      <div className="container grid lg:grid-cols-2 gap-8 items-center p-4">
        <div className="hidden lg:block space-y-6">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-12 w-12 text-[hsl(var(--auth-primary))]" />
            <span className="text-4xl font-bold text-[hsl(var(--auth-primary))]">CampusCatalyst</span>
          </div>
          <h1 className="text-4xl font-bold text-[hsl(var(--auth-primary))]">
            Welcome Back
          </h1>
          <p className="text-xl text-muted-foreground">
            Empowering students and recruiters to collaborate, and create successful careers.
          </p>
        </div>

        <Card className="w-full max-w-md mx-auto shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign in to your account</CardTitle>
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
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-[hsl(var(--auth-accent))] focus:border-[hsl(var(--auth-primary))]"
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
                  className="border-[hsl(var(--auth-accent))] focus:border-[hsl(var(--auth-primary))]"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(checked) => setRemember(checked as boolean)}
                />
                <label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Remember me
                </label>
              </div>
              <Button type="submit" className="w-full bg-[hsl(var(--auth-primary))] hover:bg-[hsl(var(--auth-secondary))]">
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              By continuing, you agree to our{" "}
              <Link to="/terms" className="text-[hsl(var(--auth-primary))] hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-[hsl(var(--auth-primary))] hover:underline">
                Privacy Policy
              </Link>
            </div>
            <div className="text-sm text-center">
              Don't have an account?{" "}
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
