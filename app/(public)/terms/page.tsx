import { Metadata } from "next";
import { LegalPageShell, LegalSection, LegalSectionItem } from "@/components/legal/legal-page-shell";

export const metadata: Metadata = {
  title: "Terms of Service | Skillforge.dev",
  description:
    "Review the terms, conditions, and guidelines governing your access to and use of Skillforge.dev.",
};

const termsSections: LegalSectionItem[] = [
  { id: "acceptance", number: "01", title: "Acceptance of Terms" },
  { id: "description", number: "02", title: "Description of the Service" },
  { id: "accounts", number: "03", title: "User Accounts & Authentication" },
  { id: "responsibilities", number: "04", title: "User Responsibilities & Conduct" },
  { id: "user-content", number: "05", title: "User Content & Code Submissions" },
  { id: "github-integrations", number: "06", title: "GitHub & Third-Party Integrations" },
  { id: "ai-feedback", number: "07", title: "AI-Generated Content & Feedback" },
  { id: "portfolios", number: "08", title: "Developer Portfolios & Public Profiles" },
  { id: "file-uploads", number: "09", title: "File & Resume Uploads" },
  { id: "intellectual-property", number: "10", title: "Intellectual Property Rights" },
  { id: "prohibited-use", number: "11", title: "Prohibited Uses" },
  { id: "availability", number: "12", title: "Service Availability & Modifications" },
  { id: "disclaimers", number: "13", title: "Disclaimers & Limitations of Liability" },
  { id: "termination", number: "14", title: "Termination & Suspension" },
  { id: "governing-law", number: "15", title: "Governing Law & Jurisdiction" },
  { id: "changes", number: "16", title: "Changes to These Terms" },
  { id: "contact", number: "17", title: "Contact Information" },
];

export default function TermsOfServicePage() {
  return (
    <LegalPageShell
      title="Terms of Service"
      subtitle="— Clear Guidelines for Developers"
      lastUpdated="September 18, 2026"
      intro="Welcome to Skillforge.dev. These Terms of Service (&quot;Terms&quot;) set forth the legally binding terms and conditions governing your access to and use of the Skillforge.dev website, services, developer workspace, and related features."
      sections={termsSections}
    >
      {/* 01. Acceptance of Terms */}
      <LegalSection id="acceptance" number="01" title="Acceptance of Terms">
        <p>
          By creating an account, accessing, or using the Skillforge.dev platform (the &quot;Service&quot;),
          you acknowledge that you have read, understood, and agree to be bound by these Terms and our
          Privacy Policy. If you do not agree with any part of these Terms, you must not access or use the Service.
        </p>
        <p>
          If you are using the Service on behalf of an organization, company, or legal entity, you represent
          and warrant that you have the authority to bind that entity to these Terms.
        </p>
      </LegalSection>

      {/* 02. Description of the Service */}
      <LegalSection id="description" number="02" title="Description of the Service">
        <p>
          Skillforge.dev is an intelligent developer empowerment platform designed to bridge the gap between
          theoretical learning and practical execution. The platform enables developers to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-[#E8E5D5]/80">
          <li>Generate customized, structured full-stack and micro project roadmaps with step-by-step milestones;</li>
          <li>Engage in interactive daily coding challenges categorized by difficulty and skill domain;</li>
          <li>Connect GitHub repositories to track progress and receive automated AI evaluation on project milestones;</li>
          <li>Build verifiable developer portfolios showcasing completed work, skill tags, and experience points (XP);</li>
          <li>Upload resumes to contextualize project recommendations and portfolio presentations.</li>
        </ul>
        <p>
          Skillforge.dev continuously refines its AI models and developer tooling to improve the learning experience.
        </p>
      </LegalSection>

      {/* 03. User Accounts & Authentication */}
      <LegalSection id="accounts" number="03" title="User Accounts & Authentication">
        <p>
          To access core features of the Service, you must create an account via our authentication provider
          (Clerk) using a verified email address or third-party OAuth provider (such as GitHub).
        </p>
        <p>
          You agree to provide accurate, current, and complete information during registration and keep your
          account information updated. You are solely responsible for maintaining the confidentiality of your
          account credentials and for all activities that occur under your account. You agree to notify us immediately
          of any unauthorized use or security breach involving your account.
        </p>
      </LegalSection>

      {/* 04. User Responsibilities & Conduct */}
      <LegalSection id="responsibilities" number="04" title="User Responsibilities & Conduct">
        <p>
          You agree to use Skillforge.dev in a lawful, ethical, and professional manner. When interacting with
          the platform, you agree not to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-[#E8E5D5]/80">
          <li>Violate any local, national, or international laws or regulations;</li>
          <li>Impersonate any person, developer, or entity, or falsely claim affiliation with any entity;</li>
          <li>Interfere with, disrupt, or compromise the integrity or security of our servers and networks;</li>
          <li>Attempt to reverse engineer, decompile, or extract source code from non-open-source portions of the Service;</li>
          <li>Submit malicious code, vulnerabilities, or automated scrapers that degrade platform availability for others.</li>
        </ul>
      </LegalSection>

      {/* 05. User Content & Code Submissions */}
      <LegalSection id="user-content" number="05" title="User Content & Code Submissions">
        <p>
          You retain all ownership rights and intellectual property in the original source code, project solutions,
          descriptions, and written materials you create and submit through the Service (&quot;User Content&quot;).
        </p>
        <p>
          By submitting User Content to Skillforge.dev (including repository links, project submissions, and challenge solutions),
          you grant Skillforge.dev a non-exclusive, worldwide, royalty-free license to process, analyze, format, and display
          that content solely for the purpose of operating the Service, generating automated code reviews, calculating progress metrics,
          and rendering your developer portfolio.
        </p>
      </LegalSection>

      {/* 06. GitHub & Third-Party Integrations */}
      <LegalSection id="github-integrations" number="06" title="GitHub & Third-Party Integrations">
        <p>
          Skillforge.dev allows users to link their GitHub accounts to verify repositories, track commits, and receive
          intelligent feedback on project milestones. By connecting your GitHub account:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-[#E8E5D5]/80">
          <li>You authorize Skillforge.dev to access specified repository metadata, commit history, and code files in accordance with the permissions granted during OAuth authorization;</li>
          <li>You warrant that you have the right and permissions to connect and analyze the repositories you submit;</li>
          <li>You acknowledge that third-party services like GitHub are subject to their own terms and privacy policies.</li>
        </ul>
      </LegalSection>

      {/* 07. AI-Generated Content & Feedback */}
      <LegalSection id="ai-feedback" number="07" title="AI-Generated Content & Feedback">
        <p>
          Skillforge.dev utilizes advanced artificial intelligence models (including Google Gemini) to generate
          project architectures, coding milestone suggestions, challenge hints, and automated feedback.
        </p>
        <p>
          <strong>Informational and Educational Nature:</strong> AI-generated suggestions, code snippets, architectural patterns,
          and code reviews are provided solely for educational and self-improvement purposes. While we strive for accuracy, AI outputs
          may occasionally contain inaccuracies, bugs, or non-optimal patterns. You are responsible for reviewing, testing, and verifying
          any AI-suggested code before deploying it to production systems.
        </p>
      </LegalSection>

      {/* 08. Developer Portfolios & Public Profiles */}
      <LegalSection id="portfolios" number="08" title="Developer Portfolios & Public Profiles">
        <p>
          Skillforge.dev provides developer portfolio pages (accessible at <code className="text-[#E8E5D5] bg-[#E8E5D5]/10 px-1.5 py-0.5 rounded font-mono text-xs">/portfolio/[username]</code>).
        </p>
        <p>
          If you set your profile to &quot;Public&quot; in your settings, you understand and agree that your public profile information—including
          your username, headline, bio, completed projects, skill badges, experience level (XP), and public resume link (if enabled)—will
          be visible to anyone on the internet. You may switch your profile visibility to private at any time through your account dashboard.
        </p>
      </LegalSection>

      {/* 09. File & Resume Uploads */}
      <LegalSection id="file-uploads" number="09" title="File & Resume Uploads">
        <p>
          The platform permits users to upload developer resumes and profile assets via our file hosting integration (UploadThing).
          You agree only to upload documents that you have created or have explicit authorization to distribute.
        </p>
        <p>
          You must not upload files that contain sensitive personal data (such as social security numbers or banking details),
          malicious software, or content that infringes upon third-party copyrights. Skillforge.dev reserves the right to remove files
          that violate these standards.
        </p>
      </LegalSection>

      {/* 10. Intellectual Property Rights */}
      <LegalSection id="intellectual-property" number="10" title="Intellectual Property Rights">
        <p>
          The Skillforge.dev name, branding, logo, user interface designs, website code, graphics, documentation, and original challenge
          structures are the exclusive intellectual property of Skillforge.dev and its licensors.
        </p>
        <p>
          Except as explicitly permitted in these Terms, you may not copy, modify, distribute, sell, or lease any part of our proprietary
          platform or software without prior written permission from Skillforge.dev.
        </p>
      </LegalSection>

      {/* 11. Prohibited Uses */}
      <LegalSection id="prohibited-use" number="11" title="Prohibited Uses">
        <p>
          You agree not to misuse the Service. Prohibited activities include:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-[#E8E5D5]/80">
          <li>Abusing AI generation endpoints with automated high-frequency spam or scripts designed to exhaust API resources;</li>
          <li>Falsifying repository ownership or progress metrics to artificially manipulate XP or leaderboard rankings;</li>
          <li>Submitting harassing, defamatory, obscene, or hateful content in public profiles or project descriptions;</li>
          <li>Using the platform to build or train competing AI model evaluation datasets without authorization.</li>
        </ul>
      </LegalSection>

      {/* 12. Service Availability & Modifications */}
      <LegalSection id="availability" number="12" title="Service Availability & Modifications">
        <p>
          We strive to provide continuous platform uptime and responsive AI generation services. However, the Service is provided on an
          &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. We may occasionally perform maintenance, release updates, or modify features
          which could result in temporary interruptions.
        </p>
        <p>
          We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time with or without notice.
        </p>
      </LegalSection>

      {/* 13. Disclaimers & Limitations of Liability */}
      <LegalSection id="disclaimers" number="13" title="Disclaimers & Limitations of Liability">
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, SKILLFORGE.DEV AND ITS AFFILIATES, OFFICERS, DIRECTORS, AND AGENTS DISCLAIM ALL
          WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </p>
        <p>
          IN NO EVENT SHALL SKILLFORGE.DEV BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF
          PROFITS, DATA, OR REPUTATION, ARISING OUT OF OR IN CONNECTION WITH YOUR ACCESS TO OR USE OF (OR INABILITY TO USE) THE SERVICE, EVEN IF
          ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        </p>
      </LegalSection>

      {/* 14. Termination & Suspension */}
      <LegalSection id="termination" number="14" title="Termination & Suspension">
        <p>
          You may terminate your account at any time through your dashboard settings or by contacting our support team.
        </p>
        <p>
          We reserve the right to suspend or terminate your access to the Service immediately, without prior notice or liability, if you breach
          these Terms or engage in conduct that harms the platform, other users, or third-party service providers.
        </p>
      </LegalSection>

      {/* 15. Governing Law & Jurisdiction */}
      <LegalSection id="governing-law" number="15" title="Governing Law & Jurisdiction">
        <p>
          These Terms and any dispute arising out of or related to them shall be governed by and construed in accordance with the laws of
          [Jurisdiction], without regard to its conflict of law provisions.
        </p>
        <p>
          Any legal action or proceeding arising under these Terms will be brought exclusively in the courts located in [Jurisdiction], and
          the parties hereby irrevocably consent to the personal jurisdiction and venue therein.
        </p>
      </LegalSection>

      {/* 16. Changes to These Terms */}
      <LegalSection id="changes" number="16" title="Changes to These Terms">
        <p>
          We may update these Terms from time to time to reflect changes in our service offerings, technical architecture, or applicable legal
          obligations. When changes are made, we will update the &quot;Last updated&quot; date at the top of this page.
        </p>
        <p>
          Your continued use of Skillforge.dev after any changes constitute your acceptance of the revised Terms. We encourage you to review
          this page periodically.
        </p>
      </LegalSection>

      {/* 17. Contact Information */}
      <LegalSection id="contact" number="17" title="Contact Information">
        <p>
          If you have any questions, concerns, or legal inquiries regarding these Terms of Service, please contact us:
        </p>
        <div className="p-4 rounded-xl border border-[#E8E5D5]/15 bg-[#E8E5D5]/[0.02] space-y-1 font-mono text-xs text-[#E8E5D5]/80">
          <p><strong className="text-[#E8E5D5]">Entity:</strong> Skillforge.dev</p>
          <p><strong className="text-[#E8E5D5]">Email:</strong> anuragjena14@gmail.com</p>
          <p><strong className="text-[#E8E5D5]">Platform:</strong> skillforge.dev</p>
        </div>
      </LegalSection>
    </LegalPageShell>
  );
}
