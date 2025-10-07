import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Brain, Target, TrendingUp, Users, Briefcase, BarChart3, FileSearch, MessageSquare } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import resumeAnalysis from "@/assets/resume-analysis.jpg";
import jobMatching from "@/assets/job-matching.jpg";
import dashboardAnalytics from "@/assets/dashboard-analytics.jpg";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--landing-light))] via-background to-[hsl(var(--landing-light))]">
        <div className="container py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-[hsl(var(--landing-primary))] via-[hsl(var(--landing-secondary))] to-[hsl(var(--landing-accent))] bg-clip-text text-transparent">
                  Embark On The Journey
                </span>
                <br />
                Of A Lifetime
              </h1>
              <p className="text-xl text-muted-foreground">
                Unlock your career potential with AI-powered resume analysis, curated job listings, and personalized career dashboards.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-[hsl(var(--landing-primary))] hover:bg-[hsl(var(--landing-secondary))]">
                    Start Your Journey
                  </Button>
                </Link>
                <Link to="#features">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground">
                10k+ students • 500+ companies • 95% success rate
              </p>
            </div>
            <div className="relative">
              <img
                src={heroImage}
                alt="Students collaborating"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Three Communities Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Three Communities</h2>
            <p className="text-xl text-muted-foreground">
              Empowering Students discover opportunities • Recruiters find talent • Placement cells manage success
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground">Everything you need to accelerate your career</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 hover:border-[hsl(var(--landing-accent))] transition-all hover:shadow-lg">
              <CardContent className="pt-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-[hsl(var(--landing-light))] flex items-center justify-center">
                  <Brain className="h-6 w-6 text-[hsl(var(--landing-primary))]" />
                </div>
                <h3 className="font-semibold text-xl">AI Resume Analysis</h3>
                <p className="text-muted-foreground">
                  Get intelligent feedback on your resume with our advanced AI technology. Optimize your CV for maximum impact.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-[hsl(var(--landing-accent))] transition-all hover:shadow-lg">
              <CardContent className="pt-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-[hsl(var(--landing-light))] flex items-center justify-center">
                  <Target className="h-6 w-6 text-[hsl(var(--landing-primary))]" />
                </div>
                <h3 className="font-semibold text-xl">Curated Job Listings</h3>
                <p className="text-muted-foreground">
                  Access thousands of job opportunities tailored to your skills and preferences with smart job matching.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-[hsl(var(--landing-accent))] transition-all hover:shadow-lg">
              <CardContent className="pt-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-[hsl(var(--landing-light))] flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-[hsl(var(--landing-primary))]" />
                </div>
                <h3 className="font-semibold text-xl">Career Dashboard</h3>
                <p className="text-muted-foreground">
                  Track your application progress, skill development, and career growth all in one place.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-[hsl(var(--landing-accent))] transition-all hover:shadow-lg">
              <CardContent className="pt-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-[hsl(var(--landing-light))] flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-[hsl(var(--landing-primary))]" />
                </div>
                <h3 className="font-semibold text-xl">Interview Preparation</h3>
                <p className="text-muted-foreground">
                  Practice with AI-powered mock interviews and get real-time feedback to ace your next interview.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* For Students Section */}
      <section id="for-students" className="py-20 bg-gradient-to-br from-[hsl(var(--student-light))] to-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">For Students</h2>
              <p className="text-lg text-muted-foreground">
                Discover your perfect career path with AI-powered resume optimization, personalized job recommendations, and comprehensive interview preparation tools.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <FileSearch className="h-5 w-5 text-[hsl(var(--student-primary))] mt-1" />
                  <span>Resume Analysis with ATS scoring</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Target className="h-5 w-5 text-[hsl(var(--student-primary))] mt-1" />
                  <span>Smart job matching based on your profile</span>
                </li>
                <li className="flex items-start space-x-3">
                  <BarChart3 className="h-5 w-5 text-[hsl(var(--student-primary))] mt-1" />
                  <span>Application tracking dashboard</span>
                </li>
              </ul>
              <Link to="/register">
                <Button size="lg" className="bg-[hsl(var(--student-primary))] hover:bg-[hsl(var(--student-secondary))]">
                  Get Started as Student
                </Button>
              </Link>
            </div>
            <div>
              <img src={resumeAnalysis} alt="Resume Analysis" className="rounded-2xl shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* For Recruiters Section */}
      <section id="for-recruiters" className="py-20 bg-gradient-to-br from-[hsl(var(--recruiter-light))] to-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img src={jobMatching} alt="Job Matching" className="rounded-2xl shadow-xl" />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold">For Recruiters</h2>
              <p className="text-lg text-muted-foreground">
                Find top talent efficiently with advanced filtering, AI-powered candidate matching, and streamlined communication tools for campus hiring.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-[hsl(var(--recruiter-primary))] mt-1" />
                  <span>Talent Discovery with smart filtering</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Briefcase className="h-5 w-5 text-[hsl(var(--recruiter-primary))] mt-1" />
                  <span>Efficient job posting and management</span>
                </li>
                <li className="flex items-start space-x-3">
                  <MessageSquare className="h-5 w-5 text-[hsl(var(--recruiter-primary))] mt-1" />
                  <span>Direct communication with candidates</span>
                </li>
              </ul>
              <Link to="/register">
                <Button size="lg" className="bg-[hsl(var(--recruiter-primary))] hover:bg-[hsl(var(--recruiter-secondary))]">
                  Get Started as Recruiter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* For Placement Cells Section */}
      <section id="for-placement" className="py-20 bg-gradient-to-br from-[hsl(var(--placement-light))] to-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">For Placement Cells</h2>
              <p className="text-lg text-muted-foreground">
                Manage campus recruitment seamlessly with centralized dashboards, automated workflows, and real-time tracking of placement activities.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <BarChart3 className="h-5 w-5 text-[hsl(var(--placement-primary))] mt-1" />
                  <span>Analytics Dashboard for placement insights</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-[hsl(var(--placement-primary))] mt-1" />
                  <span>Student Management system</span>
                </li>
                <li className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-[hsl(var(--placement-primary))] mt-1" />
                  <span>Comprehensive placement reports</span>
                </li>
              </ul>
              <Link to="/register">
                <Button size="lg" className="bg-[hsl(var(--placement-primary))] hover:bg-[hsl(var(--placement-secondary))]">
                  Get Started as Placement Officer
                </Button>
              </Link>
            </div>
            <div>
              <img src={dashboardAnalytics} alt="Dashboard Analytics" className="rounded-2xl shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
