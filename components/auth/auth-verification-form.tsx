"use client";

import { useState } from "react";
import { ArrowRight, Loader2, KeyRound } from "lucide-react";
import { AuthError } from "./auth-error";

interface AuthVerificationFormProps {
  onVerify: (code: string) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
  error: string | null;
  identifier?: string;
}

export function AuthVerificationForm({
  onVerify,
  onCancel,
  isLoading,
  error,
  identifier,
}: AuthVerificationFormProps) {
  const [code, setCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || isLoading) return;
    await onVerify(code.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-mono text-[#E8E5D5]/70">
          <KeyRound className="w-4 h-4 text-amber-400/80" />
          <span>Verification Code</span>
        </div>
        <p className="text-xs text-[#E8E5D5]/60">
          Enter the verification code sent to{" "}
          <span className="text-[#E8E5D5] font-medium">{identifier || "your account"}</span>.
        </p>
      </div>

      <div>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter 6-digit code"
          maxLength={8}
          autoComplete="one-time-code"
          required
          className="w-full px-4 py-3 rounded-xl border border-[#E8E5D5]/20 bg-[#0A0A0A] text-sm text-[#E8E5D5] placeholder-[#E8E5D5]/35 focus:outline-none focus:border-[#E8E5D5]/60 transition-colors font-mono tracking-widest text-center"
        />
      </div>

      <AuthError message={error} />

      <button
        type="submit"
        disabled={isLoading || !code.trim()}
        className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#E8E5D5] hover:bg-white text-black font-semibold text-xs sm:text-sm transition-all duration-200 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(232,229,213,0.2)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-black" />
        ) : (
          <>
            <span>Verify & Continue</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      <div className="text-center pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-[#E8E5D5]/60 hover:text-[#E8E5D5] underline underline-offset-4 transition-colors"
        >
          Cancel and return to login
        </button>
      </div>
    </form>
  );
}
