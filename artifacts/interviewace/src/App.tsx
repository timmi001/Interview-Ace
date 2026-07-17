import { ClerkProvider, SignIn, SignUp, Show } from "@clerk/react";
import { publishableKeyFromHost } from "@clerk/react/internal";
import { shadcn } from "@clerk/themes";
import { Switch, Route, useLocation, Router as WouterRouter } from "wouter";
import { Dashboard } from "@/pages/Dashboard";

// REQUIRED — copy verbatim per Replit Clerk setup
const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);

// Empty in dev (Clerk hits FAPI directly), auto-set in prod
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

if (!clerkPubKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY");
}

const clerkAppearance = {
  theme: shadcn,
  cssLayerName: "clerk",
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
    socialButtonsVariant: "blockButton" as const,
    socialButtonsPlacement: "top" as const,
  },
  variables: {
    colorPrimary: "#0357EE",
    colorForeground: "#0f172a",
    colorMutedForeground: "#64748b",
    colorDanger: "#ef4444",
    colorBackground: "#ffffff",
    colorInput: "#f8fafc",
    colorInputForeground: "#0f172a",
    colorNeutral: "#e2e8f0",
    fontFamily: "Inter, sans-serif",
    borderRadius: "0.875rem",
  },
  elements: {
    rootBox: "w-full flex justify-center",
    cardBox: "bg-white rounded-[24px] w-[420px] max-w-full overflow-hidden shadow-xl shadow-slate-200/60",
    card: "!shadow-none !border-0 !bg-transparent !rounded-none",
    footer: "!shadow-none !border-0 !bg-transparent !rounded-none",
    headerTitle: "text-slate-900 font-bold",
    headerSubtitle: "text-slate-500",
    socialButtonsBlockButtonText: "text-slate-700 font-semibold",
    formFieldLabel: "text-slate-700 font-semibold",
    footerActionLink: "text-[#0357EE] font-semibold",
    footerActionText: "text-slate-500",
    dividerText: "text-slate-400",
    identityPreviewEditButton: "text-[#0357EE]",
    formFieldSuccessText: "text-green-600",
    alertText: "text-slate-700",
    logoBox: "justify-center",
    logoImage: "w-12 h-12",
    socialButtonsBlockButton: "border-slate-200 hover:bg-slate-50",
    formButtonPrimary: "bg-[#0357EE] hover:bg-blue-700",
    formFieldInput: "border-slate-200 bg-slate-50 text-slate-900",
    footerAction: "bg-slate-50",
    dividerLine: "bg-slate-200",
    alert: "bg-slate-50",
    otpCodeFieldInput: "border-slate-200",
    formFieldRow: "",
    main: "",
  },
};

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 font-['Inter']">
      <div className="w-full max-w-[430px] text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#0357EE] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
          <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
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
          <a
            href={`${basePath}/sign-up`}
            className="bg-[#0357EE] text-white font-bold py-3.5 rounded-2xl text-[15px] text-center shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors block"
          >
            Get started — it's free
          </a>
          <a
            href={`${basePath}/sign-in`}
            className="bg-white text-slate-700 font-semibold py-3.5 rounded-2xl text-[15px] text-center border border-slate-200 hover:bg-slate-50 transition-colors block"
          >
            Sign in
          </a>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          {[
            { n: "1,400+", label: "Questions" },
            { n: "5", label: "Categories" },
            { n: "Free", label: "To start" },
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

function SignInPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-slate-50 px-4">
      <SignIn
        routing="path"
        path={`${basePath}/sign-in`}
        signUpUrl={`${basePath}/sign-up`}
        appearance={clerkAppearance}
      />
    </div>
  );
}

function SignUpPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-slate-50 px-4">
      <SignUp
        routing="path"
        path={`${basePath}/sign-up`}
        signInUrl={`${basePath}/sign-in`}
        appearance={clerkAppearance}
      />
    </div>
  );
}

function HomeRoute() {
  return (
    <>
      <Show when="signed-in">
        <Dashboard />
      </Show>
      <Show when="signed-out">
        <LandingPage />
      </Show>
    </>
  );
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      afterSignOutUrl={basePath || "/"}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <Switch>
        <Route path="/" component={HomeRoute} />
        {/* /*? matches bare URL and Clerk OAuth sub-paths — do not change */}
        <Route path="/sign-in/*?" component={SignInPage} />
        <Route path="/sign-up/*?" component={SignUpPage} />
      </Switch>
    </ClerkProvider>
  );
}

export default function App() {
  return (
    <WouterRouter base={basePath}>
      <ClerkProviderWithRoutes />
    </WouterRouter>
  );
}
