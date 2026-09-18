import { AlertCircle } from "lucide-react";

interface AuthErrorProps {
  message?: string | null;
}

export function AuthError({ message }: AuthErrorProps) {
  if (!message) return null;

  return (
    <div className="flex items-start gap-2.5 p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 text-xs text-rose-300 animate-in fade-in slide-in-from-top-1 duration-200">
      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
      <span className="leading-relaxed">{message}</span>
    </div>
  );
}
