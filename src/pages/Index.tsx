import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Brain, Target, TrendingUp, Users, Briefcase, BarChart3, 
  FileSearch, MessageSquare, Upload, CheckCircle, Sparkles,
  Building2, Trophy, Clock
} from "lucide-react";
import heroImage from "@/assets/hero-landing.jpg";
import dashboardPreview from "@/assets/dashboard-preview.jpg";
import recruiterFlow from "@/assets/recruiter-flow.jpg";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--landing-primary))] via-[hsl(var(--landing-secondary))] to-[hsl(var(--landing-accent))] text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container py-24 md:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Your Career, Accelerated
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                AI-powered campus placement for students, recruiters & placement cells. Transform your job search with intelligent resume scoring, smart matching, and comprehensive analytics.
              </p>
              
              {/* Primary CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-white text-[hsl(var(--landing-primary))] hover:bg-white/90 shadow-elegant hover-lift">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 hover-lift">
                    Sign In
                  </Button>
                </Link>
              </div>

              {/* Role Quick Links */}
              <div className="flex flex-wrap gap-3">
                <Link to="/register">
                  <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
                    I'm a Student
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
                    I'm a Recruiter
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
                    Placement Cell
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <p className="text-sm text-white/80 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[hsl(var(--landing-light))] animate-pulse"></span>
                10,000+ students • 500+ companies • 95% success rate
              </p>
            </div>
            <div className="relative animate-fade-in">
              <div className="absolute inset-0 bg-white/10 rounded-2xl blur-3xl"></div>
              <img
                src={heroImage}
                alt="Students collaborating in modern workspace"
                className="rounded-2xl shadow-elegant hover-lift relative object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-[hsl(var(--landing-secondary))]">10K+</div>
              <div className="text-sm text-muted-foreground">Students Registered</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-[hsl(var(--landing-secondary))]">500+</div>
              <div className="text-sm text-muted-foreground">Partner Companies</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-[hsl(var(--landing-secondary))]">8K+</div>
              <div className="text-sm text-muted-foreground">Placements Made</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-[hsl(var(--landing-secondary))]">₹12L</div>
              <div className="text-sm text-muted-foreground">Average Package</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-gradient-to-br from-[hsl(var(--landing-light))]/20 to-background">
        <div className="container">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to accelerate your career journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 hover:border-[hsl(var(--landing-accent))] transition-smooth hover-lift group">
              <CardContent className="pt-6 space-y-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[hsl(var(--landing-secondary))] to-[hsl(var(--landing-accent))] flex items-center justify-center group-hover:scale-110 transition-smooth">
                  <Brain className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-semibold text-xl">AI Resume Analysis</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get ATS scores and personalized suggestions to optimize your resume for maximum impact.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-[hsl(var(--landing-accent))] transition-smooth hover-lift group">
              <CardContent className="pt-6 space-y-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[hsl(var(--landing-secondary))] to-[hsl(var(--landing-accent))] flex items-center justify-center group-hover:scale-110 transition-smooth">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-semibold text-xl">Smart Job Matching</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Save hours in shortlisting with AI-powered candidate-job matching algorithms.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-[hsl(var(--landing-accent))] transition-smooth hover-lift group">
              <CardContent className="pt-6 space-y-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[hsl(var(--landing-secondary))] to-[hsl(var(--landing-accent))] flex items-center justify-center group-hover:scale-110 transition-smooth">
                  <BarChart3 className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-semibold text-xl">Analytics Dashboard</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Track application progress, engagement metrics, and placement success rates in real-time.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-[hsl(var(--landing-accent))] transition-smooth hover-lift group">
              <CardContent className="pt-6 space-y-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[hsl(var(--landing-secondary))] to-[hsl(var(--landing-accent))] flex items-center justify-center group-hover:scale-110 transition-smooth">
                  <MessageSquare className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-semibold text-xl">Interview Preparation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Increase interview invites with AI-powered mock interviews and real-time feedback.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">How It Works</h2>
            <p className="text-xl text-muted-foreground">Get started in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-[hsl(var(--landing-secondary))] to-[hsl(var(--landing-accent))] flex items-center justify-center text-white font-bold text-2xl">
                1
              </div>
              <Upload className="h-12 w-12 mx-auto text-[hsl(var(--landing-accent))]" />
              <h3 className="text-xl font-semibold">Upload Resume</h3>
              <p className="text-muted-foreground">
                Create your profile and upload your resume to get started
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-[hsl(var(--landing-secondary))] to-[hsl(var(--landing-accent))] flex items-center justify-center text-white font-bold text-2xl">
                2
              </div>
              <Sparkles className="h-12 w-12 mx-auto text-[hsl(var(--landing-accent))]" />
              <h3 className="text-xl font-semibold">Get AI Insights</h3>
              <p className="text-muted-foreground">
                Receive ATS scores and personalized improvement suggestions
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-[hsl(var(--landing-secondary))] to-[hsl(var(--landing-accent))] flex items-center justify-center text-white font-bold text-2xl">
                3
              </div>
              <CheckCircle className="h-12 w-12 mx-auto text-[hsl(var(--landing-accent))]" />
              <h3 className="text-xl font-semibold">Apply & Track</h3>
              <p className="text-muted-foreground">
                Apply to matched jobs and track your applications in one place
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Students */}
      <section id="for-students" className="py-20 bg-gradient-to-br from-[hsl(var(--student-light))]/30 to-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-[hsl(var(--student-primary))]/10 rounded-full text-[hsl(var(--student-primary))] font-semibold text-sm">
                For Students
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">Discover Your Perfect Career Path</h2>
              <p className="text-lg text-muted-foreground">
                Get AI-powered resume optimization, personalized job recommendations, and comprehensive interview preparation tools.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <FileSearch className="h-6 w-6 text-[hsl(var(--student-primary))] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Resume Analysis</div>
                    <div className="text-sm text-muted-foreground">ATS scoring and optimization suggestions</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Target className="h-6 w-6 text-[hsl(var(--student-primary))] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Smart Job Matching</div>
                    <div className="text-sm text-muted-foreground">Personalized job recommendations based on your skills</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <BarChart3 className="h-6 w-6 text-[hsl(var(--student-primary))] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Application Tracking</div>
                    <div className="text-sm text-muted-foreground">Monitor your application progress and interview status</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <MessageSquare className="h-6 w-6 text-[hsl(var(--student-primary))] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Interview Prep</div>
                    <div className="text-sm text-muted-foreground">AI-powered mock interviews with real-time feedback</div>
                  </div>
                </li>
              </ul>
              <Link to="/register">
                <Button size="lg" className="bg-[hsl(var(--student-primary))] hover:bg-[hsl(var(--student-secondary))] shadow-elegant">
                  Get Started as Student
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--student-primary))] to-[hsl(var(--student-accent))] rounded-2xl blur-3xl opacity-20"></div>
              <img src={dashboardPreview} alt="AI Resume Analysis Dashboard" className="rounded-2xl shadow-elegant hover-lift relative object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* For Recruiters */}
      <section id="for-recruiters" className="py-20 bg-gradient-to-br from-[hsl(var(--recruiter-light))]/30 to-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--recruiter-primary))] to-[hsl(var(--recruiter-accent))] rounded-2xl blur-3xl opacity-20"></div>
              <img src={recruiterFlow} alt="Recruiter Dashboard" className="rounded-2xl shadow-elegant hover-lift relative object-cover" loading="lazy" />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <div className="inline-block px-4 py-2 bg-[hsl(var(--recruiter-primary))]/10 rounded-full text-[hsl(var(--recruiter-primary))] font-semibold text-sm">
                For Recruiters
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">Find Top Talent Efficiently</h2>
              <p className="text-lg text-muted-foreground">
                Advanced filtering, AI-powered candidate matching, and streamlined communication for campus hiring.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-[hsl(var(--recruiter-primary))] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Talent Discovery</div>
                    <div className="text-sm text-muted-foreground">Smart filtering and AI-powered candidate search</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Briefcase className="h-6 w-6 text-[hsl(var(--recruiter-primary))] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Bulk Job Posting</div>
                    <div className="text-sm text-muted-foreground">Efficient job management and candidate tracking</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <MessageSquare className="h-6 w-6 text-[hsl(var(--recruiter-primary))] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Direct Communication</div>
                    <div className="text-sm text-muted-foreground">Seamless candidate engagement and interview scheduling</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <BarChart3 className="h-6 w-6 text-[hsl(var(--recruiter-primary))] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Analytics Dashboard</div>
                    <div className="text-sm text-muted-foreground">Track hiring metrics and optimize your recruitment</div>
                  </div>
                </li>
              </ul>
              <Link to="/register">
                <Button size="lg" className="bg-[hsl(var(--recruiter-primary))] hover:bg-[hsl(var(--recruiter-secondary))] shadow-elegant">
                  Get Started as Recruiter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* For Placement Cells */}
      <section id="for-placement" className="py-20 bg-gradient-to-br from-[hsl(var(--placement-light))]/30 to-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-[hsl(var(--placement-primary))]/10 rounded-full text-[hsl(var(--placement-primary))] font-semibold text-sm">
                For Placement Cells
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">Manage Campus Recruitment Seamlessly</h2>
              <p className="text-lg text-muted-foreground">
                Centralized dashboards, automated workflows, and real-time tracking of all placement activities.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <BarChart3 className="h-6 w-6 text-[hsl(var(--placement-primary))] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Student Management</div>
                    <div className="text-sm text-muted-foreground">Complete oversight of student profiles and applications</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Building2 className="h-6 w-6 text-[hsl(var(--placement-primary))] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Company Coordination</div>
                    <div className="text-sm text-muted-foreground">Manage drives, schedules, and recruiter relationships</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <TrendingUp className="h-6 w-6 text-[hsl(var(--placement-primary))] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Comprehensive Reports</div>
                    <div className="text-sm text-muted-foreground">Detailed analytics and placement success tracking</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-[hsl(var(--placement-primary))] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Event Scheduling</div>
                    <div className="text-sm text-muted-foreground">Automated workflows and calendar management</div>
                  </div>
                </li>
              </ul>
              <Link to="/register">
                <Button size="lg" className="bg-[hsl(var(--placement-primary))] hover:bg-[hsl(var(--placement-secondary))] shadow-elegant">
                  Get Started as Placement Officer
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--placement-primary))] to-[hsl(var(--placement-accent))] rounded-2xl blur-3xl opacity-20"></div>
              <img src={dashboardPreview} alt="Placement Analytics Dashboard" className="rounded-2xl shadow-elegant hover-lift relative object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">Join thousands of satisfied users</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-elegant">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center space-x-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Trophy key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">
                  "CampusCatalyst helped me improve my resume score from 65% to 92%. I landed my dream job within 2 weeks!"
                </p>
                <div className="space-y-1">
                  <div className="font-semibold">Priya Sharma</div>
                  <div className="text-sm text-muted-foreground">Software Engineer, Google</div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-elegant">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center space-x-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Trophy key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">
                  "As a recruiter, this platform saves me hours every week. The AI matching is incredibly accurate."
                </p>
                <div className="space-y-1">
                  <div className="font-semibold">Rahul Mehta</div>
                  <div className="text-sm text-muted-foreground">HR Manager, TCS</div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-elegant">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center space-x-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Trophy key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">
                  "Our placement rate increased by 40% after using CampusCatalyst. The analytics are game-changing!"
                </p>
                <div className="space-y-1">
                  <div className="font-semibold">Dr. Anjali Verma</div>
                  <div className="text-sm text-muted-foreground">Placement Officer, IIT Delhi</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-[hsl(var(--landing-primary))] via-[hsl(var(--landing-secondary))] to-[hsl(var(--landing-accent))] text-white">
        <div className="container text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to Accelerate Your Career?</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Join 10,000+ students and 500+ companies already using CampusCatalyst
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-[hsl(var(--landing-primary))] hover:bg-white/90 shadow-elegant hover-lift">
                Get Started Free
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 hover-lift">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
