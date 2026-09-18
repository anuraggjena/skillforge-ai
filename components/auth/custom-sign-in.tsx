"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignIn, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { AuthSocialButtons } from "./auth-social-buttons";
import { AuthError } from "./auth-error";
import { AuthVerificationForm } from "./auth-verification-form";

export function CustomSignIn() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { isSignedIn, isLoaded: isUserLoaded } = useUser();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Verification step state
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verifyingFactor, setVerifyingFactor] = useState<string | null>(null);

  // If user is already signed in, redirect to dashboard
  useEffect(() => {
    if (isUserLoaded && isSignedIn) {
      router.replace("/dashboard");
    }
  }, [isSignedIn, isUserLoaded, router]);

  // Handle OAuth sign in
  const handleOAuth = async (strategy: "oauth_github" | "oauth_google") => {
    if (!isLoaded || !signIn) return;
    setError(null);

    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sign-in/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err: unknown) {
      console.error("OAuth error:", err);
      const clerkError = err as { errors?: Array<{ message?: string; longMessage?: string }> };
      setError(
        clerkError?.errors?.[0]?.longMessage ||
        clerkError?.errors?.[0]?.message ||
        "Failed to authenticate with social provider. Please try again."
      );
    }
  };

  // Handle Email / Password Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signIn || isLoading) return;
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn.create({
        identifier: email.trim(),
        password: password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else if (result.status === "needs_first_factor" || result.status === "needs_second_factor") {
        setPendingVerification(true);
        setVerifyingFactor(result.status);
      } else {
        console.warn("Unhandled sign-in status:", result.status);
        setError("Additional verification required. Please check your credentials.");
      }
    } catch (err: unknown) {
      console.error("Sign-in error:", err);
      const clerkError = err as { errors?: Array<{ message?: string; longMessage?: string }> };
      setError(
        clerkError?.errors?.[0]?.longMessage ||
        clerkError?.errors?.[0]?.message ||
        "Invalid email or password. Please verify your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Code Verification (2FA / First factor)
  const handleVerifyCode = async (code: string) => {
    if (!isLoaded || !signIn || isLoading) return;
    setError(null);
    setIsLoading(true);

    try {
      let result;
      if (verifyingFactor === "needs_second_factor") {
        result = await signIn.attemptSecondFactor({
          strategy: "totp",
          code,
        });
      } else {
        result = await signIn.attemptFirstFactor({
          strategy: "email_code",
          code,
        });
      }

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        setError("Verification code is incorrect or expired. Please try again.");
      }
    } catch (err: unknown) {
      console.error("Verification error:", err);
      const clerkError = err as { errors?: Array<{ message?: string; longMessage?: string }> };
      setError(
        clerkError?.errors?.[0]?.longMessage ||
        clerkError?.errors?.[0]?.message ||
        "Failed to verify code. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[460px] mx-auto lg:mx-0 rounded-2xl border border-[#E8E5D5]/15 bg-[#080808]/85 backdrop-blur-xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden"
    >
      {/* Subtle Inner Highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E8E5D5]/25 to-transparent" />

      {/* Card Header: Brand Logo & Title */}
      <div className="mb-7 space-y-3">
        <div className="flex items-center gap-2.5">
          <Image
            src="/logo.svg"
            alt="SkillForge"
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <span
            className="text-lg font-bold tracking-tight text-[#E8E5D5]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            skillforge.dev
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#E8E5D5] leading-snug">
            Welcome{" "}
            <span className="font-serif-editorial italic font-normal text-[#F4F1E8]">
              back.
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-[#E8E5D5]/65 mt-1 font-normal">
            Continue building real projects.
          </p>
        </div>
      </div>

      {pendingVerification ? (
        <AuthVerificationForm
          identifier={email}
          onVerify={handleVerifyCode}
          onCancel={() => {
            setPendingVerification(false);
            setError(null);
          }}
          isLoading={isLoading}
          error={error}
        />
      ) : (
        <div className="space-y-5">
          {/* Social OAuth Buttons */}
          <AuthSocialButtons onOAuth={handleOAuth} disabled={isLoading || !isLoaded} />

          {/* Low-opacity Divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className="w-full border-t border-[#E8E5D5]/10" />
            <span className="px-3 bg-[#080808] text-[11px] font-mono text-[#E8E5D5]/40 uppercase tracking-widest relative">
              or
            </span>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="email-input"
                className="block text-xs font-medium text-[#E8E5D5]/80"
              >
                Email address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#E8E5D5]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E5D5]/15 bg-[#0D0D0D] text-xs sm:text-sm text-[#E8E5D5] placeholder-[#E8E5D5]/35 focus:outline-none focus:border-[#E8E5D5]/60 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password-input"
                  className="block text-xs font-medium text-[#E8E5D5]/80"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#E8E5D5]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E8E5D5]/15 bg-[#0D0D0D] text-xs sm:text-sm text-[#E8E5D5] placeholder-[#E8E5D5]/35 focus:outline-none focus:border-[#E8E5D5]/60 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#E8E5D5]/40 hover:text-[#E8E5D5]/80 transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Clerk Bot Protection CAPTCHA Mount Point */}
            <div id="clerk-captcha" className="empty:hidden" />

            {/* Error Message */}
            <AuthError message={error} />

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isLoaded || !email.trim() || !password}
              className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#E8E5D5] hover:bg-white text-black font-semibold text-xs sm:text-sm transition-all duration-200 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(232,229,213,0.25)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer group"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-black" />
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Sign Up Navigation */}
          <div className="pt-3 border-t border-[#E8E5D5]/10 text-center text-xs text-[#E8E5D5]/60">
            <span>Don&apos;t have an account? </span>
            <Link
              href="/sign-up"
              className="font-medium text-[#E8E5D5] hover:text-white hover:underline underline-offset-4 transition-colors"
            >
              Sign up →
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
}
