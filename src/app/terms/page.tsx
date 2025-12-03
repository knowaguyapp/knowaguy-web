import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight">Terms of use</h1>

        <p className="text-sm text-slate-300">
          This is an early version of KnowAGuy. By using the product you agree to use it in a fair and respectful way.
        </p>

        <ul className="space-y-2 text-sm text-slate-300 list-disc pl-4">
          <li>Be respectful. No harassment, hate speech or threats.</li>
          <li>You are responsible for what you share and who you contact.</li>
          <li>No spam, scams or illegal activity.</li>
          <li>Do not share private information that you are not comfortable sharing.</li>
          <li>We may update or remove features at any time while we are still building.</li>
        </ul>

        <p className="text-xs text-slate-500">
          These terms are a simple guide for now. This is not formal legal advice. If you continue to use KnowAGuy you agree to follow local laws and these basic rules.
        </p>

        <Link href="/" className="text-sm text-slate-300 underline">
          Back to KnowAGuy
        </Link>
      </div>
    </main>
  );
}
