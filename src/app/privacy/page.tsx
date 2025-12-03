import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight">Privacy</h1>

        <p className="text-sm text-slate-300">
          KnowAGuy is a simple networking project. This page explains in plain language what data is collected and how it is used.
        </p>

        <section className="space-y-2 text-sm text-slate-300">
          <h2 className="text-base font-semibold text-slate-100">What we collect</h2>
          <ul className="list-disc pl-4 space-y-1">
            <li>Your email and password through Firebase Authentication.</li>
            <li>Profile details you choose to add, like name, headline, city, mode, skills and plugs.</li>
            <li>Basic technical logs from the hosting services, like IP address and browser type, which are standard for most web apps.</li>
          </ul>
        </section>

        <section className="space-y-2 text-sm text-slate-300">
          <h2 className="text-base font-semibold text-slate-100">How it is stored</h2>
          <ul className="list-disc pl-4 space-y-1">
            <li>Authentication and profiles are stored in Google Firebase services.</li>
            <li>The site is hosted on Vercel, which may log requests for security and performance.</li>
          </ul>
        </section>

        <section className="space-y-2 text-sm text-slate-300">
          <h2 className="text-base font-semibold text-slate-100">How we use your data</h2>
          <ul className="list-disc pl-4 space-y-1">
            <li>To let you create and edit your KnowAGuy card.</li>
            <li>To show your card to other users inside the product.</li>
            <li>To keep the site secure and running.</li>
          </ul>
        </section>

        <section className="space-y-2 text-sm text-slate-300">
          <h2 className="text-base font-semibold text-slate-100">What we do not do</h2>
          <ul className="list-disc pl-4 space-y-1">
            <li>We do not sell your personal data.</li>
            <li>We do not share your profile outside the product except through the services listed above.</li>
          </ul>
        </section>

        <section className="space-y-2 text-sm text-slate-300">
          <h2 className="text-base font-semibold text-slate-100">Your choices</h2>
          <ul className="list-disc pl-4 space-y-1">
            <li>You can edit or clear your profile fields at any time after logging in.</li>
            <li>If you want your account fully removed you can contact the owner of this project.</li>
          </ul>
        </section>

        <p className="text-xs text-slate-500">
          This privacy text is a simple explanation for an early stage product. As the project grows this page will be updated and a more formal policy can be added.
        </p>

        <Link href="/" className="text-sm text-slate-300 underline">
          Back to KnowAGuy
        </Link>
      </div>
    </main>
  );
}
