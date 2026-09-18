"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignUp, useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Loader2, User, AtSign } from "lucide-react";
import Image from "next/image";
import { AuthSocialButtons } from "./auth-social-buttons";
import { AuthError } from "./auth-error";
import { AuthVerificationForm } from "./auth-verification-form";

export function CustomSignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { isSignedIn, isLoaded: isUserLoaded } = useUser();
  const router = useRouter();

  // Multi-step state: 1 or 2
  const [step, setStep] = useState<1 | 2>(1);

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Verification step state (OTP)
  const [pendingVerification, setPendingVerification] = useState(false);

  // If user is already signed in, redirect to dashboard
  useEffect(() => {
    if (isUserLoaded && isSignedIn) {
      router.replace("/dashboard");
    }
  }, [isSignedIn, isUserLoaded, router]);

  // Handle OAuth sign up
  const handleOAuth = async (strategy: "oauth_github" | "oauth_google") => {
    if (!isLoaded || !signUp) return;
    setError(null);

    try {
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sign-up/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err: unknown) {
      console.error("OAuth error:", err);
      const clerkError = err as { errors?: Array<{ message?: string; longMessage?: string }> };
      setError(
        clerkError?.errors?.[0]?.longMessage ||
        clerkError?.errors?.[0]?.message ||
        "Failed to sign up with social provider. Please try again."
      );
    }
  };

  // Step 1 Validation -> Proceed to Step 2
  const handleProceedToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim()) {
      setError("Please enter your first name.");
      return;
    }
    if (!lastName.trim()) {
      setError("Please enter your last name.");
      return;
    }

    setStep(2);
  };

  // Step 2 Submission -> Clerk Sign-Up & Email OTP
  const handleSubmitSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signUp || isLoading) return;
    setError(null);

    if (!email.trim() || !password) {
      setError("Please provide both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      // Create Clerk user with all details
      await signUp.create({
        emailAddress: email.trim(),
        password: password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        ...(username.trim() ? { username: username.trim().toLowerCase() } : {}),
      });

      // Prepare email verification code (OTP)
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);
    } catch (err: unknown) {
      console.error("Sign-up error:", err);
      const clerkError = err as { errors?: Array<{ message?: string; longMessage?: string }> };
      setError(
        clerkError?.errors?.[0]?.longMessage ||
        clerkError?.errors?.[0]?.message ||
        "Failed to create account. Please verify your details and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP Code Verification
  const handleVerifyCode = async (code: string) => {
    if (!isLoaded || !signUp || isLoading) return;
    setError(null);
    setIsLoading(true);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: code.trim(),
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        console.warn("Unhandled sign-up verification status:", result.status);
        setError("Verification was not completed. Please try again.");
      }
    } catch (err: unknown) {
      console.error("Verification error:", err);
      const clerkError = err as { errors?: Array<{ message?: string; longMessage?: string }> };
      setError(
        clerkError?.errors?.[0]?.longMessage ||
        clerkError?.errors?.[0]?.message ||
        "Invalid verification code. Please check and try again."
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

      {/* Card Header: Brand Logo, Step Indicator & Title */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between">
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

          {!pendingVerification && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#E8E5D5]/15 bg-[#0D0D0D] font-mono text-[11px] font-medium text-[#E8E5D5]/80">
              <span className={step === 1 ? "text-amber-400 font-semibold" : "text-[#E8E5D5]/50"}>
                {step}
              </span>
              <span className="text-[#E8E5D5]/30">/</span>
              <span className="text-[#E8E5D5]/50">2</span>
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#E8E5D5] leading-snug">
            Create an{" "}
            <span className="font-serif-editorial italic font-normal text-[#F4F1E8]">
              account.
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-[#E8E5D5]/65 mt-1 font-normal">
            {pendingVerification
              ? "Verify your email with the one-time password."
              : step === 1
              ? "Step 1 of 2 — Personal Details"
              : "Step 2 of 2 — Account Credentials"}
          </p>
        </div>

        {/* Multi-step Progress Line */}
        {!pendingVerification && (
          <div className="w-full h-1 bg-[#E8E5D5]/10 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-gradient-to-r from-amber-400/80 to-[#E8E5D5] transition-all duration-300 ease-out"
              style={{ width: step === 1 ? "50%" : "100%" }}
            />
          </div>
        )}
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
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              {/* Social OAuth Buttons */}
              <AuthSocialButtons onOAuth={handleOAuth} disabled={isLoading || !isLoaded} />

              {/* Low-opacity Divider */}
              <div className="relative flex items-center justify-center my-4">
                <div className="w-full border-t border-[#E8E5D5]/10" />
                <span className="px-3 bg-[#080808] text-[11px] font-mono text-[#E8E5D5]/40 uppercase tracking-widest relative">
                  or sign up with email
                </span>
              </div>

              {/* Step 1 Form: Personal Details */}
              <form onSubmit={handleProceedToStep2} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {/* First Name */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="signup-first-name"
                      className="block text-xs font-medium text-[#E8E5D5]/80"
                    >
                      First name <span className="text-amber-400/80">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#E8E5D5]/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="signup-first-name"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Ada"
                        autoComplete="given-name"
                        required
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E8E5D5]/15 bg-[#0D0D0D] text-xs sm:text-sm text-[#E8E5D5] placeholder-[#E8E5D5]/35 focus:outline-none focus:border-[#E8E5D5]/60 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="signup-last-name"
                      className="block text-xs font-medium text-[#E8E5D5]/80"
                    >
                      Last name <span className="text-amber-400/80">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#E8E5D5]/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="signup-last-name"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Lovelace"
                        autoComplete="family-name"
                        required
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E8E5D5]/15 bg-[#0D0D0D] text-xs sm:text-sm text-[#E8E5D5] placeholder-[#E8E5D5]/35 focus:outline-none focus:border-[#E8E5D5]/60 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Optional Username Handle */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="signup-username"
                      className="block text-xs font-medium text-[#E8E5D5]/80"
                    >
                      Username / Handle
                    </label>
                    <span className="text-[10px] font-mono text-[#E8E5D5]/40">optional</span>
                  </div>
                  <div className="relative">
                    <AtSign className="w-4 h-4 text-[#E8E5D5]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="signup-username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="adalovelace"
                      autoComplete="username"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E5D5]/15 bg-[#0D0D0D] text-xs sm:text-sm text-[#E8E5D5] placeholder-[#E8E5D5]/35 focus:outline-none focus:border-[#E8E5D5]/60 transition-colors"
                    />
                  </div>
                </div>

                {/* Error Message */}
                <AuthError message={error} />

                {/* Next Step Button */}
                <button
                  type="submit"
                  disabled={!firstName.trim() || !lastName.trim()}
                  className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#E8E5D5] hover:bg-white text-black font-semibold text-xs sm:text-sm transition-all duration-200 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(232,229,213,0.25)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer group"
                >
                  <span>Continue to Credentials (2/2)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              {/* Sign In Navigation */}
              <div className="pt-3 border-t border-[#E8E5D5]/10 text-center text-xs text-[#E8E5D5]/60">
                <span>Already have an account? </span>
                <Link
                  href="/sign-in"
                  className="font-medium text-[#E8E5D5] hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  Sign in →
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              {/* Step 2 Form: Email & Password */}
              <form onSubmit={handleSubmitSignUp} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="signup-email-input"
                    className="block text-xs font-medium text-[#E8E5D5]/80"
                  >
                    Email address <span className="text-amber-400/80">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#E8E5D5]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="signup-email-input"
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
                  <label
                    htmlFor="signup-password-input"
                    className="block text-xs font-medium text-[#E8E5D5]/80"
                  >
                    Password <span className="text-amber-400/80">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#E8E5D5]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="signup-password-input"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a secure password"
                      autoComplete="new-password"
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
                  <p className="text-[11px] text-[#E8E5D5]/40 font-normal">
                    Use 8+ characters. Avoid common or previously breached passwords.
                  </p>
                </div>

                {/* Clerk Bot Protection CAPTCHA Mount Point */}
                <div id="clerk-captcha" className="empty:hidden" />

                {/* Error Message */}
                <AuthError message={error} />

                {/* Actions: Back & Create Account */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      setStep(1);
                    }}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-full border border-[#E8E5D5]/20 bg-[#0D0D0D] hover:bg-[#151515] text-[#E8E5D5] text-xs font-medium transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isLoading || !isLoaded || !email.trim() || !password}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#E8E5D5] hover:bg-white text-black font-semibold text-xs sm:text-sm transition-all duration-200 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(232,229,213,0.25)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer group"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                    ) : (
                      <>
                        <span>Sign Up & Verify</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Sign In Navigation */}
              <div className="pt-3 border-t border-[#E8E5D5]/10 text-center text-xs text-[#E8E5D5]/60">
                <span>Already have an account? </span>
                <Link
                  href="/sign-in"
                  className="font-medium text-[#E8E5D5] hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  Sign in →
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}
