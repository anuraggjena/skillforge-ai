import { Metadata } from "next";
import { LegalPageShell, LegalSection, LegalSectionItem } from "@/components/legal/legal-page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy | Skillforge.dev",
  description:
    "Learn how Skillforge.dev collects, processes, protects, and handles your personal information, developer data, and code submissions.",
};

const privacySections: LegalSectionItem[] = [
  { id: "introduction", number: "01", title: "Introduction & Overview" },
  { id: "information-collected", number: "02", title: "Information We Collect" },
  { id: "how-we-use", number: "03", title: "How We Use Information" },
  { id: "ai-processing", number: "04", title: "AI Processing & Google Gemini" },
  { id: "github-integration", number: "05", title: "GitHub Integration & Permissions" },
  { id: "public-portfolios", number: "06", title: "Public Profiles & Portfolios" },
  { id: "file-uploads", number: "07", title: "File & Resume Uploads" },
  { id: "third-parties", number: "08", title: "Third-Party Service Providers" },
  { id: "data-retention", number: "09", title: "Data Retention & Deletion" },
  { id: "security", number: "10", title: "Data Security Practices" },
  { id: "user-rights", number: "11", title: "Your Rights & Privacy Choices" },
  { id: "children", number: "12", title: "Children's Privacy" },
  { id: "international-transfers", number: "13", title: "International Data Transfers" },
  { id: "policy-changes", number: "14", title: "Changes to This Privacy Policy" },
  { id: "contact-privacy", number: "15", title: "Contact Information" },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      subtitle="— Transparent Data Practices"
      lastUpdated="September 18, 2026"
      intro="At Skillforge.dev, we are committed to respecting your privacy and safeguarding your personal information. This Privacy Policy explains what data we collect, how we use it to power your developer experience, and the choices you have regarding your information."
      sections={privacySections}
    >
      {/* 01. Introduction & Overview */}
      <LegalSection id="introduction" number="01" title="Introduction & Overview">
        <p>
          Skillforge.dev (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) provides an intelligent platform that assists developers
          in generating software project ideas, tracking development milestones, receiving AI-powered feedback, and building public
          engineering portfolios.
        </p>
        <p>
          This Privacy Policy applies to all personal data and developer information collected when you access or use our website
          (<code className="text-[#E8E5D5] bg-[#E8E5D5]/10 px-1.5 py-0.5 rounded font-mono text-xs">skillforge.dev</code>), web application,
          APIs, and related services.
        </p>
      </LegalSection>

      {/* 02. Information We Collect */}
      <LegalSection id="information-collected" number="02" title="Information We Collect">
        <p>
          We only collect data necessary to provide, personalize, and improve the Skillforge.dev experience. The categories of information
          we collect include:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-[#E8E5D5]/80">
          <li>
            <strong>Account and Authentication Information:</strong> When you register through our authentication provider (Clerk),
            we collect your name, email address, avatar image URL, and unique authentication identifier. If you authenticate with GitHub,
            we receive basic profile details authorized through OAuth.
          </li>
          <li>
            <strong>Developer Profile Information:</strong> Information you choose to add to your developer profile, such as your username,
            headline, bio, selected skill tags, and portfolio visibility preferences.
          </li>
          <li>
            <strong>Project and Challenge Activity:</strong> Project configurations, generated milestones, daily challenge attempts,
            progress statuses, earned experience points (XP), performance ratings, and skill levels.
          </li>
          <li>
            <strong>GitHub Repository Metadata:</strong> When you connect a repository to a project, we collect repository names,
            URLs, commit histories, branch names, and relevant code files submitted for milestone evaluation.
          </li>
          <li>
            <strong>Uploaded Documents:</strong> Resumes or PDF documents uploaded through our file service (UploadThing) to tailor project recommendations.
          </li>
          <li>
            <strong>Technical and Usage Data:</strong> Standard server logs, browser type, device information, and interaction timestamps
            recorded during platform navigation.
          </li>
        </ul>
      </LegalSection>

      {/* 03. How We Use Information */}
      <LegalSection id="how-we-use" number="03" title="How We Use Information">
        <p>
          We use the information we collect for the following specific purposes:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-[#E8E5D5]/80">
          <li>To create and manage your Skillforge.dev account and authenticate your sessions;</li>
          <li>To generate tailored software project roadmaps, micro-tasks, and milestone breakdowns based on your declared tech stack;</li>
          <li>To run automated AI code reviews and deliver actionable feedback on your repository submissions;</li>
          <li>To track challenge completions, award XP, update skill levels, and display progress metrics on your dashboard;</li>
          <li>To host and display your public developer portfolio at your designated username URL (if enabled);</li>
          <li>To maintain platform security, detect malicious activity, and ensure service reliability.</li>
        </ul>
      </LegalSection>

      {/* 04. AI Processing & Google Gemini */}
      <LegalSection id="ai-processing" number="04" title="AI Processing & Google Gemini">
        <p>
          Skillforge.dev utilizes Google Gemini APIs to provide generative capabilities, including project scaffolding, milestone hint generation,
          and code review evaluation.
        </p>
        <p>
          <strong>Data Flow during AI Generation:</strong> When you request a new project roadmap, hint, or code review, relevant prompt text
          (such as your selected technologies, project description, milestone requirements, or submitted code snippets) is transmitted to the
          Google Gemini API for processing. We do not sell your prompts or submitted code to third parties.
        </p>
      </LegalSection>

      {/* 05. GitHub Integration & Permissions */}
      <LegalSection id="github-integration" number="05" title="GitHub Integration & Permissions">
        <p>
          Skillforge.dev allows you to connect your GitHub account via OAuth. This integration is used to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-[#E8E5D5]/80">
          <li>Verify repository ownership and link projects to active code repositories;</li>
          <li>Inspect commit logs and file changes to evaluate milestone completion;</li>
          <li>Display repository statistics on your dashboard and public portfolio (if enabled).</li>
        </ul>
        <p>
          We only request the OAuth scopes necessary to read the repositories you explicitly select for project evaluation. You can disconnect
          your GitHub account or revoke permissions at any time through your GitHub account security settings or the Skillforge.dev dashboard.
        </p>
      </LegalSection>

      {/* 06. Public Profiles & Portfolios */}
      <LegalSection id="public-portfolios" number="06" title="Public Profiles & Portfolios">
        <p>
          Skillforge.dev allows users to showcase their work through public developer portfolios (at <code className="text-[#E8E5D5] bg-[#E8E5D5]/10 px-1.5 py-0.5 rounded font-mono text-xs">/portfolio/[username]</code>).
        </p>
        <p>
          By default, your profile visibility can be configured in your account settings:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-[#E8E5D5]/80">
          <li><strong>Public Profile:</strong> Your username, display name, avatar, bio, headline, earned skills, completed projects, XP level, and resume link (if attached) will be publicly indexable and visible to visitors.</li>
          <li><strong>Private Profile:</strong> Your portfolio URL is restricted and will not display personal or project details to unauthenticated visitors.</li>
        </ul>
      </LegalSection>

      {/* 07. File & Resume Uploads */}
      <LegalSection id="file-uploads" number="07" title="File & Resume Uploads">
        <p>
          If you choose to upload a resume or profile file, the document is securely transferred and hosted via our cloud file delivery
          integration (UploadThing).
        </p>
        <p>
          Your uploaded resume is used to parse technical skills and display a downloadable link on your public portfolio if you have made
          your portfolio public. You can remove or replace your uploaded resume at any time via your account settings.
        </p>
      </LegalSection>

      {/* 08. Third-Party Service Providers */}
      <LegalSection id="third-parties" number="08" title="Third-Party Service Providers">
        <p>
          We engage trusted third-party service providers (sub-processors) to perform operational functions on our behalf. These include:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-[#E8E5D5]/80">
          <li><strong>Clerk:</strong> User authentication, session management, and OAuth identity integration;</li>
          <li><strong>Database Infrastructure:</strong> Cloud-hosted PostgreSQL managed database for structured application data;</li>
          <li><strong>Google Cloud / Gemini:</strong> Artificial intelligence APIs for project generation and milestone review;</li>
          <li><strong>UploadThing:</strong> Secure file upload handling and media storage;</li>
          <li><strong>Vercel / Hosting Provider:</strong> Cloud hosting, serverless functions, and content delivery.</li>
        </ul>
        <p>
          These providers are authorized to process your information only as necessary to provide services to us and are contractually
          obligated to protect your information.
        </p>
      </LegalSection>

      {/* 09. Data Retention & Deletion */}
      <LegalSection id="data-retention" number="09" title="Data Retention & Deletion">
        <p>
          We retain your personal data and project history for as long as your account remains active or as needed to provide you with the Service.
        </p>
        <p>
          If you wish to delete your account and associated personal data, you may request deletion through your dashboard settings or by
          contacting us at anuragjena14@gmail.com. Upon account deletion, your user record, projects, challenge records, and uploaded files will be
          permanently purged from our primary databases in accordance with standard backup rotation cycles.
        </p>
      </LegalSection>

      {/* 10. Data Security Practices */}
      <LegalSection id="security" number="10" title="Data Security Practices">
        <p>
          We implement commercially reasonable administrative, technical, and physical security measures to protect your information against
          unauthorized access, loss, alteration, or disclosure.
        </p>
        <p>
          All network communication between your browser and our servers is encrypted in transit using Transport Layer Security (TLS/HTTPS).
          Authentication tokens and sensitive environment keys are managed securely and never exposed to the client browser.
        </p>
      </LegalSection>

      {/* 11. Your Rights & Privacy Choices */}
      <LegalSection id="user-rights" number="11" title="Your Rights & Privacy Choices">
        <p>
          Depending on your location and applicable data protection laws, you may have the right to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-[#E8E5D5]/80">
          <li><strong>Access and Export:</strong> Request a copy of the personal data we hold about you;</li>
          <li><strong>Rectification:</strong> Update or correct inaccurate personal or profile information via your account settings;</li>
          <li><strong>Erasure (Right to be Forgotten):</strong> Request the permanent deletion of your account and associated records;</li>
          <li><strong>Profile Visibility Controls:</strong> Toggle your developer portfolio between public and private status at any time;</li>
          <li><strong>Revoke Integrations:</strong> Disconnect your GitHub OAuth integration directly from your profile settings.</li>
        </ul>
      </LegalSection>

      {/* 12. Children's Privacy */}
      <LegalSection id="children" number="12" title="Children's Privacy">
        <p>
          Skillforge.dev is designed for software developers, students, and professionals. The Service is not intended for children under
          the age of 13 (or under 16 in certain jurisdictions). We do not knowingly collect personal data from children. If we become aware
          that a child has provided us with personal information, we will take immediate steps to delete such data.
        </p>
      </LegalSection>

      {/* 13. International Data Transfers */}
      <LegalSection id="international-transfers" number="13" title="International Data Transfers">
        <p>
          Skillforge.dev operates globally, and your information may be transferred to and processed in servers located outside your home country
          or jurisdiction. By using the Service, you acknowledge and consent to the transfer and processing of your information in jurisdictions
          where our cloud infrastructure and third-party sub-processors operate.
        </p>
      </LegalSection>

      {/* 14. Changes to This Privacy Policy */}
      <LegalSection id="policy-changes" number="14" title="Changes to This Privacy Policy">
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our technology, regulatory requirements, or feature additions.
          When changes occur, the updated policy will be published on this page with a revised &quot;Last updated&quot; date.
        </p>
        <p>
          We encourage you to review this Privacy Policy periodically to stay informed about how we protect your personal data.
        </p>
      </LegalSection>

      {/* 15. Contact Information */}
      <LegalSection id="contact-privacy" number="15" title="Contact Information">
        <p>
          If you have questions, comments, or data privacy requests regarding this Privacy Policy, please reach out to us:
        </p>
        <div className="p-4 rounded-xl border border-[#E8E5D5]/15 bg-[#E8E5D5]/[0.02] space-y-1 font-mono text-xs text-[#E8E5D5]/80">
          <p><strong className="text-[#E8E5D5]">Data Controller:</strong> Skillforge.dev</p>
          <p><strong className="text-[#E8E5D5]">Privacy & Support Email:</strong> anuragjena14@gmail.com</p>
          <p><strong className="text-[#E8E5D5]">Website:</strong> skillforge.dev</p>
          <p><strong className="text-[#E8E5D5]">Jurisdiction:</strong> [Jurisdiction]</p>
        </div>
      </LegalSection>
    </LegalPageShell>
  );
}
