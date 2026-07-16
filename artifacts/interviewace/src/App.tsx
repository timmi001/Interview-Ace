import { useEffect, useRef } from "react";
import { ClerkProvider, SignIn, SignUp, Show, useClerk } from "@clerk/react";
import { publishableKeyFromHost } from "@clerk/react/internal";
import { shadcn } from "@clerk/themes";
import { Switch, Route, useLocation, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { Dashboard } from "@/pages/Dashboard";

const queryClient = new QueryClient();

// REQUIRED — copy verbatim
const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);
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
  },
  variables: {
    colorPrimary: "#0357EE",
    colorForeground: "#0F172A",
    colorMutedForeground: "#64748B",
    colorDanger: "#EF4444",
    colorBackground: "#FFFFFF",
    colorInput: "#F8FAFC",
    colorInputForeground: "#0F172A",
    colorNeutral: "#E2E8F0",
    fontFamily: "'Inter', sans-serif",
    borderRadius: "0.75rem",
  },
  elements: {
    rootBox: "w-full flex justify-center",
    cardBox: "bg-white rounded-2xl w-[440px] max-w-full overflow-hidden shadow-xl border border-slate-100",
    card: "!shadow-none !border-0 !bg-transparent !rounded-none",
    footer: "!shadow-none !border-0 !bg-transparent !rounded-none",
    headerTitle: "text-slate-900 font-bold font-['Poppins']",
    headerSubtitle: "text-slate-500",
    socialButtonsBlockButtonText: "text-slate-700 font-semibold",
    formFieldLabel: "text-slate-700 font-medium",
    footerActionLink: "text-[#0357EE] font-semibold hover:text-blue-700",
    footerActionText: "text-slate-500",
    dividerText: "text-slate-400",
    identityPreviewEditButton: "text-[#0357EE]",
    formFieldSuccessText: "text-green-600",
    alertText: "text-slate-700",
    logoBox: "justify-center mb-2",
    logoImage: "h-10 w-auto",
    socialButtonsBlockButton: "border border-slate-200 hover:bg-slate-50",
    formButtonPrimary: "bg-[#0357EE] hover:bg-blue-700 text-white font-semibold",
    formFieldInput: "bg-slate-50 border-slate-200 text-slate-900",
    footerAction: "bg-slate-50/50",
    dividerLine: "bg-slate-200",
    alert: "border-slate-200",
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
          <a
            href={`${basePath}/sign-up`}
            className="bg-[#0357EE] text-white font-bold py-3.5 rounded-2xl text-[15px] text-center shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors"
          >
            Get started — it's free
          </a>
          <a
            href={`${basePath}/sign-in`}
            className="bg-white text-slate-700 font-semibold py-3.5 rounded-2xl text-[15px] text-center border border-slate-200 hover:bg-slate-50 transition-colors"
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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} />
    </div>
  );
}

function SignUpPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} />
    </div>
  );
}

function HomeRedirect() {
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

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const qc = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsub = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (prevUserIdRef.current !== undefined && prevUserIdRef.current !== userId) {
        qc.clear();
      }
      prevUserIdRef.current = userId;
    });
    return unsub;
  }, [addListener, qc]);

  return null;
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
      localization={{
        signIn: { start: { title: "Welcome back", subtitle: "Sign in to your InterviewAce account" } },
        signUp: { start: { title: "Create your account", subtitle: "Start practicing. Get hired." } },
      }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <Switch>
          <Route path="/" component={HomeRedirect} />
          <Route path="/sign-in/*?" component={SignInPage} />
          <Route path="/sign-up/*?" component={SignUpPage} />
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </QueryClientProvider>
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
