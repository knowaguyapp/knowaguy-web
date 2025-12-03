import Link from "next/link";

export default function HomeLandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-8 gap-10">
        {/* TOP NAV */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-slate-700">
              <span className="text-xs font-semibold tracking-tight">
                KG
              </span>
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">
                KnowAGuy
              </p>
              <p className="text-xs text-slate-400">
                Network is net worth.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/app"
              className="hidden rounded-full border border-slate-700 px-3 py-1 text-slate-200 hover:bg-slate-900 md:inline"
            >
              Open app
            </Link>
          </div>
        </header>

        {/* HERO */}
        <section className="grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center">
          <div className="space-y-5">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              One card for what you do{" "}
              <span className="text-slate-300">and what you have access to.</span>
            </h1>
            <p className="text-sm text-slate-300 md:text-base">
              KnowAGuy is a simple card that works for the club promoter, the gym
              trainer, the student creator and the founder in the boardroom.
              Show what you do and what you can unlock, in one clean place.
            </p>

            <div className="flex flex-wrap gap-3 text-xs text-slate-200">
              <span className="rounded-full bg-slate-900 px-3 py-1">
                Nightlife plugs and guestlist
              </span>
              <span className="rounded-full bg-slate-900 px-3 py-1">
                Founders, operators and clients
              </span>
              <span className="rounded-full bg-slate-900 px-3 py-1">
                Creators, coaches and trainers
              </span>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <Link
                href="/app"
                className="inline-flex items-center justify-center rounded-full bg-slate-100 px-6 py-2.5 text-sm font-semibold text-slate-900 hover:bg-white"
              >
                Open the web app
              </Link>
              <p className="text-xs text-slate-400">
                No waitlist. Sign up with email and create your card in under a minute.
              </p>
            </div>
          </div>

          {/* SIMPLE PREVIEW BOX */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-sm text-slate-200">
            <p className="text-xs font-medium text-slate-400 mb-2">
              Example card
            </p>
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-slate-50">
                    Jordan, 23
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Promoter and media, runs events and helps founders with launch nights.
                  </p>
                </div>
                <span className="rounded-full bg-slate-900 px-2 py-1 text-[10px] text-slate-200">
                  Toronto
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 text-[10px] mt-1">
                <span className="rounded-full bg-slate-900 px-2 py-1">
                  Mode: Nightlife and business
                </span>
                <span className="rounded-full bg-slate-900 px-2 py-1">
                  Looking for: guests, collabs, clients
                </span>
                <span className="rounded-full bg-slate-900 px-2 py-1">
                  Skills: content, sales, ops
                </span>
                <span className="rounded-full bg-slate-900 px-2 py-1">
                  Plugs: clubs, gyms, studios
                </span>
              </div>
              <p className="mt-2 text-[11px] text-slate-400">
                Contact: @yourhandle on IG
              </p>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              The real app lets you create your own card, search others and copy contact in one place.
            </p>
          </div>
        </section>

        {/* WHO IT IS FOR */}
        <section className="space-y-4">
          <h2 className="text-base font-semibold text-slate-100">
            Who is KnowAGuy for
          </h2>
          <div className="grid gap-4 md:grid-cols-3 text-sm">
            <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <p className="text-xs font-medium text-slate-300">
                Nightlife and plugs
              </p>
              <p className="text-xs text-slate-400">
                Promoters, hosts, DJs and people who can unlock guestlist, tables, studios or cars.
              </p>
            </div>
            <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <p className="text-xs font-medium text-slate-300">
                Founders and operators
              </p>
              <p className="text-xs text-slate-400">
                Early stage founders, freelancers and operators who want clients, hires or investors, without a stiff profile.
              </p>
            </div>
            <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <p className="text-xs font-medium text-slate-300">
                Creators and coaches
              </p>
              <p className="text-xs text-slate-400">
                Trainers, editors, designers and coaches who mix online work with local plugs and in person work.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="space-y-4">
          <h2 className="text-base font-semibold text-slate-100">
            How it works
          </h2>
          <ol className="grid gap-4 md:grid-cols-3 text-sm">
            <li className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <p className="text-xs font-medium text-slate-300">
                1. Create your card
              </p>
              <p className="text-xs text-slate-400">
                Sign up with email, add your name, city, what you do and what you have access to.
              </p>
            </li>
            <li className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <p className="text-xs font-medium text-slate-300">
                2. Add skills and plugs
              </p>
              <p className="text-xs text-slate-400">
                Add your skills, plugs and contact so people know if you are a nightlife plug, a CEO, a creator or a mix.
              </p>
            </li>
            <li className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <p className="text-xs font-medium text-slate-300">
                3. Explore and connect
              </p>
              <p className="text-xs text-slate-400">
                Browse cards, filter by city or mode and copy contact when you find someone who fits what you are looking for.
              </p>
            </li>
          </ol>
        </section>

        {/* FOOTER */}
        <footer className="mt-4 border-t border-slate-800 pt-4 text-xs text-slate-500 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-medium text-slate-300">KnowAGuy</p>
            <p>
              A clean way to show what you do and what you unlock. Nightlife and business in the same network.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/terms" className="hover:text-slate-300 underline">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-slate-300 underline">
              Privacy
            </Link>
            <a
              href="mailto:you@example.com"
              className="hover:text-slate-300 underline"
            >
              Contact
            </a>
            <Link
              href="/app"
              className="rounded-full border border-slate-700 px-3 py-1 text-slate-200 hover:bg-slate-900"
            >
              Open app
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
