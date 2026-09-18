import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SignUpSSOCallbackPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <AuthenticateWithRedirectCallback
        signInForceRedirectUrl="/dashboard"
        signUpForceRedirectUrl="/dashboard"
      />
    </div>
  );
}
