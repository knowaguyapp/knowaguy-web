"use client";

import { useState } from "react";
import { auth, db } from "./lib/firebase";
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

type UserProfile = {
  id: string;
  displayName?: string;
  city?: string;
  headline?: string;
  mode?: string;
  lookingFor?: string;
  skills?: string[];
  plugs?: string[];
};

export default function HomePage() {
  const [status, setStatus] = useState<string>("Not signed in");
  const [userId, setUserId] = useState<string | null>(null);

  // Your profile fields
  const [displayName, setDisplayName] = useState("");
  const [city, setCity] = useState("");
  const [headline, setHeadline] = useState("");
  const [mode, setMode] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [plugsInput, setPlugsInput] = useState("");
  const [authMode, setAuthMode] = useState<"signup" | "login">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);


  // Other people
  const [profiles, setProfiles] = useState<UserProfile[]>([]);

async function handleSignUp() {
  setAuthError(null);
  setAuthLoading(true);
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const uid = result.user.uid;
    setUserId(uid);
    setStatus(`Signed up as ${uid}`);

    // Load or create profile doc
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);

    if (snap.exists()) {
      const data = snap.data() as any;
      setDisplayName(data.displayName || "");
      setCity(data.city || "");
      setHeadline(data.headline || "");
      setMode(data.mode || "");
      setLookingFor(data.lookingFor || "");
    } else {
      await setDoc(
        userRef,
        {
          email,
          onboardingCompleted: false,
          isVisible: true,
        },
        { merge: true }
      );
      setStatus("Signed up, now fill your card");
    }

    await loadProfiles();
  } catch (err: any) {
    console.error(err);
    setAuthError(err.message || "Sign up failed");
    setStatus("Sign up error");
  } finally {
    setAuthLoading(false);
  }
}

async function handleLogin() {
  setAuthError(null);
  setAuthLoading(true);
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const uid = result.user.uid;
    setUserId(uid);
    setStatus(`Signed in as ${uid}`);

    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      const data = snap.data() as any;
      setDisplayName(data.displayName || "");
      setCity(data.city || "");
      setHeadline(data.headline || "");
      setMode(data.mode || "");
      setLookingFor(data.lookingFor || "");
      setStatus(`Loaded profile for ${uid}`);
    } else {
      setStatus("Signed in, no profile yet");
    }

    await loadProfiles();
  } catch (err: any) {
    console.error(err);
    setAuthError(err.message || "Login failed");
    setStatus("Login error");
  } finally {
    setAuthLoading(false);
  }
}


  async function handleSignOut() {
    try {
      await signOut(auth);
      setUserId(null);
      setDisplayName("");
      setCity("");
      setHeadline("");
      setMode("");
      setLookingFor("");
      setEmail("");
      setPassword("");
      setAuthError(null);
      setSkillsInput("");
      setPlugsInput("");
      setProfiles([]);
      setStatus("Signed out");
    } catch (err: any) {
      console.error(err);
      setStatus(`Error signing out: ${err.message}`);
    }
  }

  async function handleSaveProfile() {
    if (!userId) {
      setStatus("Sign in first.");
      return;
    }

    try {
      setStatus("Saving profile...");
      const userRef = doc(db, "users", userId);
      const skillsArray = skillsInput
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const plugsArray = plugsInput
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      await setDoc(
        userRef,
        {
          displayName,
          city,
          headline,
          mode,
          lookingFor,
          skills: skillsArray,
          plugs: plugsArray,
          onboardingCompleted: true,
          isVisible: true,
        },
        { merge: true }
      );
      setStatus("Profile saved!");

      // Refresh the list so updated data shows
      await loadProfiles();
    } catch (err: any) {
      console.error(err);
      setStatus(`Error saving: ${err.message}`);
    }
  }

  async function loadProfiles() {
    try {
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);
      const list: UserProfile[] = snapshot.docs.map((d) => {
        const data = d.data() as any;
        return {
          id: d.id,
          displayName: data.displayName,
          city: data.city,
          headline: data.headline,
          mode: data.mode,
          lookingFor: data.lookingFor,
          skills: data.skills || [],
          plugs: data.plugs || [],
        };
      });

      setProfiles(list);
    } catch (err) {
      console.error("Error loading profiles", err);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 py-6">
        {/* TOP NAV */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Simple neutral logo that works for nightlife and business */}
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

          <div className="flex items-center gap-3">
            <p className="hidden text-xs text-slate-400 md:inline">
              For students, founders, creatives, promoters and everyone in between
            </p>
            {userId && (
              <button
                onClick={handleSignOut}
                className="text-xs text-slate-400 underline"
              >
                Sign out
              </button>
            )}
          </div>
        </header>

        {/* MAIN GRID */}
        <div className="grid flex-1 gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-start">
          {/* LEFT: Hero + Your Card */}
          <section className="space-y-5">
            {/* HERO */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 md:p-6">
              <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                One card for all your worlds
                <span className="mt-1 block text-base text-slate-300 md:text-lg">
                  Nightlife plugs, gym trainers, students, CEOs, freelancers and
                  founders all in one clean network.
                </span>
              </h1>

              <p className="mt-3 text-sm text-slate-400">
                Share what you do and what you have access to in a simple card.
                It works if you are a promoter with guestlist, a designer with clients,
                or a founder hiring your next hire.
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-slate-200">
                <span className="rounded-full bg-slate-800 px-3 py-1">
                  Nightlife and plugs
                </span>
                <span className="rounded-full bg-slate-800 px-3 py-1">
                  Career and business
                </span>
                <span className="rounded-full bg-slate-800 px-3 py-1">
                  Creators, coaches, operators
                </span>
              </div>

              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-xs text-slate-400">
                {status}
              </div>
            </div>

            {/* YOUR CARD */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 md:p-6">
              <div className="mb-4 flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-base font-semibold md:text-lg">
                    Your KnowAGuy card
                  </h2>
                  <p className="text-xs text-slate-400">
                    Short, honest and flexible. Works if you run clubs or companies.
                  </p>
                </div>
              </div>

              {!userId && (
                <div className="mb-4 space-y-3">
                  {/* toggle between sign up and login */}
                  <div className="inline-flex rounded-full bg-slate-900 p-1 text-xs">
                    <button
                      type="button"
                      onClick={() => setAuthMode("signup")}
                      className={`px-3 py-1 rounded-full ${
                        authMode === "signup"
                          ? "bg-slate-100 text-slate-900"
                          : "text-slate-300"
                      }`}
                    >
                      Sign up
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthMode("login")}
                      className={`px-3 py-1 rounded-full ${
                        authMode === "login"
                          ? "bg-slate-100 text-slate-900"
                          : "text-slate-300"
                      }`}
                    >
                      Log in
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Email
                      </label>
                      <input
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-slate-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Password
                      </label>
                      <input
                        type="password"
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-slate-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="At least 6 characters"
                      />
                    </div>

                    {authError && (
                      <p className="text-xs text-red-400">
                        {authError}
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={authMode === "signup" ? handleSignUp : handleLogin}
                      disabled={authLoading}
                      className="w-full rounded-full bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-white disabled:opacity-60"
                    >
                      {authLoading
                        ? "Working..."
                        : authMode === "signup"
                        ? "Create account"
                        : "Log in"}
                    </button>
                  </div>
                </div>
              )}
              {userId && (
                <div className="space-y-4">
                  {/* Compact preview */}
                  <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-xs text-slate-300">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="font-medium text-slate-50">
                          {displayName || "Your name"}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {headline || "One line about what you do or what you have access to."}
                        </p>
                      </div>
                      {city && (
                        <span className="rounded-full bg-slate-900 px-2 py-1 text-[10px] text-slate-300">
                          {city}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5 text-[10px]">
                      {mode && (
                        <span className="rounded-full bg-slate-900 px-2 py-1 text-slate-200">
                          Mode: {mode}
                        </span>
                      )}
                      {lookingFor && (
                        <span className="rounded-full bg-slate-900 px-2 py-1 text-slate-200">
                          Looking for: {lookingFor}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Fields */}
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Name
                      </label>
                      <input
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-slate-400"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="e.g. Jordan Lee"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        What do you do or offer
                      </label>
                      <input
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-slate-400"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        placeholder="e.g. Promoter with guestlist and media team, or product manager at a fintech startup"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Location
                      </label>
                      <input
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-slate-400"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Toronto, Remote, or Toronto nightlife"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Mode
                      </label>
                      <input
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-slate-400"
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        placeholder="e.g. Nightlife plug, Creator, Founder, Both"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        What are you looking for
                      </label>
                      <input
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-slate-400"
                        value={lookingFor}
                        onChange={(e) => setLookingFor(e.target.value)}
                        placeholder="e.g. Clients and collabs, guestlist and content, hires and investors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Skills (comma separated)
                      </label>
                      <input
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-slate-400"
                        value={skillsInput}
                        onChange={(e) => setSkillsInput(e.target.value)}
                        placeholder="e.g. Content, sales, coaching"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Plugs or access (comma separated)
                      </label>
                      <input
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-slate-400"
                        value={plugsInput}
                        onChange={(e) => setPlugsInput(e.target.value)}
                        placeholder="e.g. Clubs, gyms, studios, cars"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSaveProfile}
                    className="mt-1 w-full rounded-full bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white"
                  >
                    Save card
                  </button>

                  <button
                    onClick={handleSignOut}
                    className="text-xs text-slate-400 underline"
                  >
                    Sign out and create a new guest card
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* RIGHT: Explore people */}
          <section className="flex max-h-[640px] flex-col rounded-2xl border border-slate-800 bg-slate-900/80 p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-semibold md:text-lg">
                  People on KnowAGuy
                </h2>
                <p className="text-xs text-slate-400">
                  You might see a club plug, a designer, a trainer or a founder in the same list.
                </p>
              </div>
              <button
                onClick={loadProfiles}
                className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-200 hover:bg-slate-800"
              >
                Refresh
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto pr-1 text-sm">
              {profiles.length === 0 && (
                <p className="text-xs text-slate-500">
                  No cards yet. Save yours, or open this site in another browser and create a second one to see how the network list looks.
                </p>
              )}

              {profiles.map((p) => (
                <div
                  key={p.id}
                  className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 transition hover:border-slate-500"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {p.displayName || "Unnamed"}
                      </p>
                      {p.headline && (
                        <p className="text-xs text-slate-400">
                          {p.headline}
                        </p>
                      )}
                      <div className="mt-1 flex flex-wrap gap-1.5 text-[10px]">
                        {p.mode && (
                          <span className="rounded-full bg-slate-900 px-2 py-1 text-slate-200">
                            Mode: {p.mode}
                          </span>
                        )}
                        {p.lookingFor && (
                          <span className="rounded-full bg-slate-900 px-2 py-1 text-slate-200">
                            Looking for: {p.lookingFor}
                          </span>
                          )}
                        {p.skills && p.skills.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1 text-[10px]">
                            {p.skills.map((skill) => (
                              <span
                                key={skill}
                                className="rounded-full bg-slate-900 px-2 py-1 text-slate-200"
                              >
                                Skill: {skill}
                              </span>
                            ))}
                          </div>
                        )}

                        {p.plugs && p.plugs.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1 text-[10px]">
                            {p.plugs.map((plug) => (
                              <span
                                key={plug}
                                className="rounded-full bg-slate-900 px-2 py-1 text-slate-200"
                              >
                                Plug: {plug}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-slate-400">
                        {p.city || "Location not set"}
                      </p>
                      <p className="mt-1 text-[10px] text-slate-500">
                        ID: {p.id.slice(0, 6)}…
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[11px] text-slate-500">
              This is the web MVP. Next steps are richer tags for skills and plugs, and then iOS and Android with swipe and search.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
 