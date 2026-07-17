import { Show, SignInButton, SignUpButton } from "@clerk/react";
import { Dashboard } from "@/pages/Dashboard";

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 font-['Inter']">
      <div className="w-full max-w-[430px] text-center">
        {/* Logo */}
        <div className="w-16 h-16 rounded-2xl bg-[#0357EE] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
          <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 16h20M14 20h14M14 28h20M14 32h10" stroke="#BFDBFE" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="34" cy="30" r="8" fill="#7C3AED"/>
            <path d="M31 30l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 className="text-3xl font-bold font-['Poppins'] text-slate-900 mb-3">InterviewAce</h1>
        <p className="text-slate-500 text-base mb-10 leading-relaxed">
          Practice aptitude, verbal, technical, and HR questions.<br />
          Get hired faster.
        </p>

        <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
          <SignUpButton mode="redirect">
            <button className="bg-[#0357EE] text-white font-bold py-3.5 rounded-2xl text-[15px] text-center shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors w-full">
              Get started — it's free
            </button>
          </SignUpButton>
          <SignInButton mode="redirect">
            <button className="bg-white text-slate-700 font-semibold py-3.5 rounded-2xl text-[15px] text-center border border-slate-200 hover:bg-slate-50 transition-colors w-full">
              Sign in
            </button>
          </SignInButton>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          {[
            { n: "1,400+", label: "Questions" },
            { n: "5",      label: "Categories" },
            { n: "Free",   label: "To start" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-bold text-lg text-slate-900 font-['Poppins']">{s.n}</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Show when="signed-out">
        <LandingPage />
      </Show>
      <Show when="signed-in">
        <Dashboard />
      </Show>
    </>
  );
}
