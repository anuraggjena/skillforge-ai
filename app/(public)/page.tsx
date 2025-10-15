"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Code, BotMessageSquare, Target, User } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/shared/footer";

export default function LandingPage() {
  // Variant for the container to orchestrate the stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // This will apply a 0.2s delay between each child animation
      },
    },
  };

  // Variant for the individual items (cards)
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="container mx-auto px-4 md:px-6">
        {/* --- Hero Section --- */}
        <section id="home" className="py-20 md:py-32 text-center aurora-background">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            {/* ... Hero content remains the same ... */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            Stop Learning in a Vacuum.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              SkillForge is your AI mentor. Turn theory into tangible skills with projects tailored just for you, get instant feedback, and build a portfolio that gets you hired.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/sign-up">
                {/* This button will now use the solid --primary color in light mode and look better */}
                <Button size="lg" className="shadow-md hover:cursor-pointer">
                  Start Building for Free
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        <Separator />

        {/* --- Features Section --- */}
        <section id="features" className="py-20 md:py-24">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Platform for Applied Learning</h2>
            <p className="text-muted-foreground mb-12">
              SkillForge bridges the gap between knowing and doing.
            </p>
          </div>
          
          {/* CHANGE 1: We wrap the grid in a div to constrain its width on larger screens */}
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {/* Card 1 */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "tween", stiffness: 400, damping: 10 }}
              >
                <Card className="h-full border shadow-md">
                  {/* CHANGE 2: We reduce the padding inside the card header */}
                  <CardHeader className="p-4"> 
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>AI-Powered Projects</CardTitle>
                    <CardDescription>
                      Choose your skills, and our AI generates Micro-Projects for practice or Real-World Projects for your portfolio.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "tween", stiffness: 400, damping: 10 }}
              >
                <Card className="h-full border shadow-md">
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
                      <Code className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Instant Code Feedback</CardTitle>
                    <CardDescription>
                      Submit your project and our AI acts as your personal code reviewer, providing feedback on quality and best practices.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "tween", stiffness: 400, damping: 10 }}
              >
                <Card className="h-full border shadow-md">
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
                      <BotMessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Build a Verified Portfolio</CardTitle>
                    <CardDescription>
                      Every completed project adds to your portfolio, showcasing not just the product but the skills you&apos;ve proven.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* --- Testimonials Section --- */}
        <section id="testimonials" className="py-20 md:py-24 bg-secondary/30 rounded-lg">
          <div className="text-center max-w-2xl mx-auto">
            {/* ... Testimonials header remains the same ... */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Aspiring Developers</h2>
            <p className="text-muted-foreground mb-12">
              See what our first users are saying about their journey with SkillForge.
            </p>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8"
          >
            <motion.div variants={itemVariants}>
              <Card className="border shadow-md">
                {/* ... Testimonial 1 content ... */}
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <User className="h-10 w-10 rounded-full mr-4" />
                    <div>
                      <p className="font-semibold">Sarah L.</p>
                      <p className="text-sm text-muted-foreground">Frontend Developer</p>
                    </div>
                  </div>
                  <p className="italic">&quot;I was stuck in tutorial hell... my portfolio&apos;s never looked better.&quot;</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card className="border shadow-md">
                {/* ... Testimonial 2 content ... */}
                <CardContent className="pt-6">
                   <div className="flex items-center mb-4">
                    <User className="h-10 w-10 rounded-full mr-4" />
                    <div>
                      <p className="font-semibold">Michael B.</p>
                      <p className="text-sm text-muted-foreground">Data Science Student</p>
                    </div>
                  </div>
                  <p className="italic">&quot;The AI feedback is like having a senior developer on call 24/7. It pointed out mistakes I didn&apos;t even know I was making. Absolutely invaluable.&quot;</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </section>
        
        {/* --- Final CTA Section --- */}
        <section className="text-center py-20 md:py-32">
          {/* ... CTA content remains the same ... */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Forge Your Future?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Stop waiting for the perfect project idea. Start building, get feedback, and accelerate your career today.
            </p>
            <Link href="/sign-up">
              <Button size="lg" className="shadow-md hover:cursor-pointer">
                Claim Your Free Account
              </Button>
            </Link>
          </motion.div>
        </section>

      </div>
      <Footer />
    </>
  );
}