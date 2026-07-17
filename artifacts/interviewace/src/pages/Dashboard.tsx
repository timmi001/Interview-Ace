import React, { useState } from "react";
import { useUser, useClerk } from "@clerk/react";
import { 
  Menu, Bell, ChevronRight, ChevronLeft, Home, FileText, Clock, BarChart2, User, 
  Check, Lock, Trophy, Star, Globe, Shield, HelpCircle, Heart, Share2, Pencil, 
  Flame, Target, Award, TrendingUp, BookOpen, Zap, Code, LogOut 
} from "lucide-react";

// Mock Data
const CATEGORIES = [
  { id: "aptitude", icon: "💼", title: "Aptitude", count: "320+", bg: "bg-[#FEF3C7]", fg: "text-amber-600", color: "bg-amber-500", topics: ["Number Series", "Logical Reasoning", "Data Interpretation", "Coding-Decoding", "Blood Relations", "Clock & Calendar", "Percentages & Ratios", "Profit & Loss"] },
  { id: "numerical", icon: "🧮", title: "Numerical", count: "250+", bg: "bg-[#E0F2FE]", fg: "text-blue-500", color: "bg-blue-500", topics: ["Arithmetic", "Algebra Basics", "Geometry", "Statistics", "Probability", "Number Systems", "Mensuration", "Time & Work"] },
  { id: "verbal", icon: "💬", title: "Verbal", count: "280+", bg: "bg-[#DCFCE7]", fg: "text-green-500", color: "bg-green-500", topics: ["Reading Comprehension", "Sentence Correction", "Vocabulary", "Synonyms & Antonyms", "Fill in the Blanks", "Para Jumbles", "Error Detection", "Idioms & Phrases"] },
  { id: "hr-interview", icon: "👥", title: "HR Interview", count: "150+", bg: "bg-[#FCE7F3]", fg: "text-pink-500", color: "bg-pink-500", topics: ["Tell Me About Yourself", "Strengths & Weaknesses", "Why This Company?", "Situational Questions", "Salary Negotiation", "Career Goals", "Teamwork Scenarios"] },
  { id: "technical", icon: <Code className="w-6 h-6 text-purple-600" />, title: "Technical", count: "400+", bg: "bg-[#F3E8FF]", fg: "text-purple-600", color: "bg-purple-600", topics: ["Data Structures", "Algorithms", "System Design", "OOP Concepts", "Database Queries", "Web Technologies", "OS Concepts", "Networking Basics"] }
];

export function Dashboard() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [page, setPage] = useState("home");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const displayName = user?.firstName || user?.username || "there";
  const initials = (() => {
    if (user?.firstName && user?.lastName) return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    if (user?.firstName) return user.firstName.slice(0, 2).toUpperCase();
    if (user?.username) return user.username.slice(0, 2).toUpperCase();
    return "ME";
  })();

  const triggerToast = () => {
    setToastMessage("Quiz Starting...");
    setTimeout(() => { setToastMessage(null); }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center font-['Inter']">
      <div className="w-full max-w-[430px] bg-white min-h-screen relative text-slate-900 shadow-2xl overflow-hidden flex flex-col">
        {toastMessage && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full font-semibold shadow-xl z-[100] animate-in slide-in-from-top-4 fade-in duration-300 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            {toastMessage}
          </div>
        )}
        {page === "home" && <HomeView setPage={setPage} displayName={displayName} initials={initials} />}
        {page === "practice" && <PracticeView setPage={setPage} triggerToast={triggerToast} />}
        {page === "mock-tests" && <MockTestsView setPage={setPage} triggerToast={triggerToast} />}
        {page === "progress" && <ProgressView setPage={setPage} />}
        {page === "profile" && <ProfileView setPage={setPage} displayName={displayName} initials={initials} signOut={() => signOut()} />}
        {["aptitude", "numerical", "verbal", "hr-interview", "technical"].includes(page) && (
          <CategoryView categoryId={page} setPage={setPage} triggerToast={triggerToast} />
        )}
        {page === "daily-challenge" && <DailyChallengeView setPage={setPage} triggerToast={triggerToast} />}
        {page === "notifications" && <NotificationsView setPage={setPage} />}
        <BottomNav page={page} setPage={setPage} />
      </div>
    </div>
  );
}

function HomeView({ setPage, displayName, initials }: { setPage: (p: string) => void; displayName: string; initials: string }) {
  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 pt-8">
        <div className="flex items-center gap-5">
          <button onClick={() => setPage("notifications")} className="relative p-1 hover:opacity-80 transition-opacity">
            <Bell className="w-6 h-6 text-slate-700" />
            <span className="absolute -top-0 -right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">3</span>
          </button>
          <button onClick={() => setPage("profile")} className="w-10 h-10 rounded-full bg-[#0357EE] text-white flex items-center justify-center font-bold text-sm border-2 border-white shadow-sm font-['Poppins'] hover:opacity-90 transition-opacity">{initials}</button>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto pb-28 px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <section className="mb-6">
          <h1 className="text-2xl font-bold font-['Poppins'] text-slate-900 tracking-tight">Hello, {displayName} 👋</h1>
          <p className="text-slate-500 text-sm mt-1">Let's practice and get hired!</p>
        </section>
        <section className="mb-8">
          <div className="bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] rounded-[24px] p-6 relative overflow-hidden shadow-lg shadow-purple-500/20">
            <div className="relative z-10 w-[65%]">
              <h2 className="text-white text-[22px] font-bold font-['Poppins'] mb-2 leading-tight tracking-tight">Practice today, <br />Get hired tomorrow.</h2>
              <p className="text-purple-100 text-[11px] mb-5 opacity-90 font-medium">Real questions. Real practice. Real results.</p>
              <button onClick={() => setPage("practice")} className="bg-white text-[#7C3AED] text-sm font-bold py-2.5 px-4 rounded-full inline-flex items-center gap-1 shadow-sm hover:bg-purple-50 transition-colors">
                Start Practice <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
            <div className="absolute -right-2 -bottom-2 w-[55%] h-[120%] flex items-end justify-end pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full object-contain opacity-95" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="25" y="25" width="55" height="70" rx="8" fill="#F5F3FF" stroke="#C4B5FD" strokeWidth="2" transform="rotate(-5 50 50)" />
                <rect x="42" y="18" width="22" height="12" rx="4" fill="#A78BFA" transform="rotate(-5 50 50)" />
                <line x1="38" y1="45" x2="65" y2="45" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" transform="rotate(-5 50 50)" />
                <line x1="38" y1="55" x2="60" y2="55" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" transform="rotate(-5 50 50)" />
                <path d="M40 68 L48 76 L65 58" stroke="#4CAF50" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M85 35 L70 70 L60 75 L65 65 L80 30 Z" fill="#FF9F43" stroke="#FFF" strokeWidth="1" />
                <path d="M60 75 L65 65 L63 63 Z" fill="#333" />
              </svg>
            </div>
          </div>
        </section>
        <section className="mb-8 -mx-6">
          <div className="px-6 flex justify-between items-end mb-4">
            <h3 className="text-[17px] font-bold font-['Poppins'] tracking-tight text-slate-900">Practice by Category</h3>
            <button onClick={() => setPage("practice")} className="text-[#0357EE] text-sm font-semibold hover:underline mb-0.5">View all</button>
          </div>
          <div className="flex overflow-x-auto gap-3.5 px-6 pb-2 [&::-webkit-scrollbar]:hidden snap-x">
            {CATEGORIES.map((cat) => (
              <button key={cat.id} onClick={() => setPage(cat.id)} className={`snap-start shrink-0 w-[125px] ${cat.bg} rounded-[24px] p-4 flex flex-col justify-between h-[135px] text-left hover:scale-[1.02] transition-transform active:scale-95`}>
                <div className="w-11 h-11 bg-white/70 rounded-full flex items-center justify-center text-[22px] shadow-sm mb-3">{cat.icon}</div>
                <div>
                  <h4 className="font-bold font-['Poppins'] text-[15px] text-slate-800 leading-tight">{cat.title}</h4>
                  <p className="text-[11px] text-slate-600 font-medium mt-1">{cat.count} Questions</p>
                </div>
              </button>
            ))}
          </div>
        </section>
        <section className="mb-8">
          <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-[24px] p-4 flex items-center gap-4">
            <div className="w-14 h-14 shrink-0 bg-[#FFF8E7] rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 7C5 7 3 16 12 21C21 16 19 7 19 7M5 7H19M5 7C5 7 2 8 2 11C2 14 5 15 5 15M19 7C19 7 22 8 22 11C22 14 19 15 19 15M8 3V7M16 3V7M12 2V7" stroke="#FF9F43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold font-['Poppins'] text-[15px] text-slate-900">Daily Challenge</h3>
              <p className="text-[11px] text-slate-500 mt-0.5 mb-2 leading-tight pr-2">10 questions a day keeps rejection away.</p>
              <button onClick={() => setPage("daily-challenge")} className="text-[#7C3AED] text-xs font-bold flex items-center gap-0.5 hover:opacity-80 transition-opacity">
                Start Challenge <ChevronRight className="w-3 h-3 stroke-[3]" />
              </button>
            </div>
            <div className="relative w-[60px] h-[60px] shrink-0 flex items-center justify-center mr-1">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#F5F3FF" strokeWidth="3.5" />
                <circle cx="18" cy="18" r="16" fill="none" stroke="#7C3AED" strokeWidth="3.5" strokeDasharray="100.5" strokeDashoffset="40.2" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-0.5">
                <span className="text-[13px] font-bold text-slate-800 leading-none">6/10</span>
                <span className="text-[8px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Done</span>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-4">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-[17px] font-bold font-['Poppins'] tracking-tight text-slate-900">Recent Practice</h3>
            <button onClick={() => setPage("practice")} className="text-[#0357EE] text-sm font-semibold hover:underline mb-0.5">View all</button>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={() => setPage("numerical")} className="bg-white border border-slate-100/80 shadow-[0_4px_20px_rgb(0,0,0,0.04)] rounded-[20px] p-4 flex items-center gap-4 text-left hover:border-slate-200 transition-colors">
              <div className="w-12 h-12 shrink-0 bg-[#E8F5E9] rounded-full flex items-center justify-center text-[#4CAF50]"><Check className="w-6 h-6 stroke-[2.5]" /></div>
              <div className="flex-1">
                <h4 className="font-bold text-[14px] text-slate-900 font-['Poppins']">Numerical Ability Test</h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-1">
                  <span>20 Questions</span><span className="w-1 h-1 rounded-full bg-slate-300"></span><span>Today</span>
                </div>
              </div>
              <span className="text-[#4CAF50] font-bold text-[15px]">85%</span>
            </button>
            <button onClick={() => setPage("verbal")} className="bg-white border border-slate-100/80 shadow-[0_4px_20px_rgb(0,0,0,0.04)] rounded-[20px] p-4 flex items-center gap-4 text-left hover:border-slate-200 transition-colors">
              <div className="w-12 h-12 shrink-0 bg-[#FFF3E0] rounded-full flex items-center justify-center text-[#FF9F43]"><Clock className="w-6 h-6 stroke-[2.5]" /></div>
              <div className="flex-1">
                <h4 className="font-bold text-[14px] text-slate-900 font-['Poppins']">Verbal Reasoning Test</h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-1">
                  <span>15 Questions</span><span className="w-1 h-1 rounded-full bg-slate-300"></span><span>Yesterday</span>
                </div>
              </div>
              <span className="text-[#FF9F43] font-bold text-[15px]">73%</span>
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

function PracticeView({ setPage, triggerToast }: any) {
  return (
    <div className="flex-1 overflow-y-auto pb-28 [&::-webkit-scrollbar]:hidden bg-slate-50/50">
      <header className="flex items-center gap-3 px-6 py-4 pt-8 sticky top-0 bg-white/90 backdrop-blur-md z-40">
        <button onClick={() => setPage("home")} className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors"><ChevronLeft className="w-6 h-6 text-slate-700" /></button>
        <div>
          <h2 className="text-xl font-bold font-['Poppins'] text-slate-900 leading-tight">Practice</h2>
          <p className="text-slate-500 text-[11px] mt-0.5">Choose what to practice today</p>
        </div>
      </header>
      <div className="px-6 py-2 pb-6">
        <div className="grid grid-cols-2 gap-3.5">
          {CATEGORIES.map(cat => (
            <button onClick={() => setPage(cat.id)} key={cat.id} className={`flex flex-col justify-between p-4 rounded-[24px] ${cat.bg} h-[145px] hover:scale-[1.02] transition-transform text-left border border-white/50 shadow-sm`}>
              <div className="w-11 h-11 bg-white/70 rounded-full flex items-center justify-center text-[22px] shadow-sm">{cat.icon}</div>
              <div>
                <h4 className="font-bold font-['Poppins'] text-[14px] text-slate-800 leading-tight mb-1">{cat.title}</h4>
                <div className="flex justify-between items-center">
                  <p className="text-[11px] text-slate-600 font-medium">{cat.count} Qs</p>
                  <div className={`w-5 h-5 rounded-full bg-white/60 flex items-center justify-center ${cat.fg}`}><ChevronRight className="w-3 h-3" strokeWidth={3} /></div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="px-6 py-2">
        <h3 className="font-bold font-['Poppins'] text-[16px] text-slate-900 mb-4">Featured Sets</h3>
        <div className="space-y-3">
          {[
            { title: "Full Practice Test", desc: "50 Questions • All categories", time: "60 min", color: "bg-purple-500" },
            { title: "Quick 10 Min", desc: "10 Questions • Mixed topics", time: "10 min", color: "bg-blue-500" },
            { title: "Weak Areas", desc: "15 Questions • Based on history", time: "20 min", color: "bg-orange-500" },
          ].map((set, i) => (
            <div key={i} className="bg-white border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-[20px] p-4 pl-5 flex items-center gap-4 relative overflow-hidden">
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${set.color}`} />
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 font-['Poppins'] text-[14px]">{set.title}</h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">{set.desc}</p>
              </div>
              <div className="flex flex-col items-end gap-2.5">
                <span className="bg-slate-50 text-slate-600 border border-slate-100 text-[10px] font-bold px-2 py-1 rounded-md">{set.time}</span>
                <button onClick={triggerToast} className="text-[#0357EE] text-[11px] font-bold hover:underline flex items-center gap-0.5">Start <ChevronRight className="w-3 h-3" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockTestsView({ setPage, triggerToast }: any) {
  const [activeTab, setActiveTab] = useState("All");
  return (
    <div className="flex-1 overflow-y-auto pb-28 [&::-webkit-scrollbar]:hidden bg-slate-50/50">
      <header className="px-6 py-4 pt-8 sticky top-0 bg-white/90 backdrop-blur-md z-40">
        <h2 className="text-xl font-bold font-['Poppins'] text-slate-900">Mock Tests</h2>
        <p className="text-slate-500 text-xs mt-1">Simulate real interview conditions</p>
      </header>
      <div className="flex gap-2 overflow-x-auto px-6 py-2 pb-4 [&::-webkit-scrollbar]:hidden snap-x">
        {["All", "Aptitude", "Technical", "HR"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`snap-start shrink-0 px-5 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors ${activeTab === tab ? "bg-[#0357EE] text-white shadow-md shadow-blue-500/20" : "bg-white text-slate-600 border border-slate-100 hover:bg-slate-50"}`}>{tab}</button>
        ))}
      </div>
      <div className="px-6 py-2">
        <div className="bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] rounded-[24px] p-6 text-white mb-6 shadow-lg shadow-purple-500/20 relative overflow-hidden">
          <div className="relative z-10 w-[75%]">
            <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">Upcoming Live Test</span>
            <h3 className="font-bold font-['Poppins'] text-[17px] mt-3 leading-snug">Global Tech Assessment</h3>
            <p className="text-purple-100 text-[11px] mt-1.5 mb-5 flex items-center gap-1.5 font-medium"><Clock className="w-3.5 h-3.5"/> Starts in 2h 45m</p>
            <button onClick={triggerToast} className="bg-white text-[#7C3AED] text-[12px] font-bold py-2 px-5 rounded-full shadow-sm hover:bg-purple-50 transition-colors">Register Now</button>
          </div>
          <div className="absolute -right-6 -bottom-6 opacity-10"><Target className="w-36 h-36" strokeWidth={1} /></div>
        </div>
        <div className="space-y-3.5">
          {[
            { title: "Google Style", tag: "Technical", level: "Hard", levelColor: "text-red-500", time: "45 min", q: "40", users: "1.2k", avg: "65%" },
            { title: "Banking Assessment", tag: "Aptitude", level: "Medium", levelColor: "text-orange-500", time: "60 min", q: "50", users: "3.4k", avg: "72%" },
            { title: "Startup Culture Fit", tag: "HR", level: "Easy", levelColor: "text-green-500", time: "30 min", q: "20", users: "850", avg: "88%" },
          ].filter(t => activeTab === "All" || t.tag === activeTab).map((test, i) => (
            <div key={i} className="bg-white border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-[24px] p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0"><Target className="w-5 h-5 text-slate-400" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900 font-['Poppins'] text-[14px]">{test.title}</h4>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[11px] text-slate-500 font-medium">{test.tag}</span>
                      <span className="text-[11px] text-slate-300">•</span>
                      <span className={`text-[11px] font-bold ${test.levelColor}`}>{test.level}</span>
                    </div>
                  </div>
                </div>
                <span className="bg-slate-50 text-slate-600 border border-slate-100 text-[10px] font-bold px-2 py-1 rounded-md">{test.time}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                <div className="flex gap-3 text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5 text-slate-400"/> {test.q}</span>
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-slate-400"/> {test.users}</span>
                  <span className="flex items-center gap-1"><BarChart2 className="w-3.5 h-3.5 text-slate-400"/> {test.avg}</span>
                </div>
                <button onClick={triggerToast} className="bg-[#0357EE] text-white text-[11px] font-bold px-5 py-2 rounded-full shadow-sm shadow-blue-500/20 hover:bg-blue-700 transition-colors">Start</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProgressView({ setPage }: any) {
  return (
    <div className="flex-1 overflow-y-auto pb-28 [&::-webkit-scrollbar]:hidden bg-slate-50/50">
      <header className="px-6 py-4 pt-8 sticky top-0 bg-white/90 backdrop-blur-md z-40">
        <h2 className="text-xl font-bold font-['Poppins'] text-slate-900">My Progress</h2>
        <p className="text-slate-500 text-xs mt-1">Keep track of your learning journey</p>
      </header>
      <div className="px-6 py-2">
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: FileText, bg: "bg-blue-50", color: "text-blue-500", val: "12", label: "Practiced" },
            { icon: TrendingUp, bg: "bg-green-50", color: "text-green-500", val: "78%", label: "Avg Score" },
            { icon: Flame, bg: "bg-orange-50", color: "text-orange-500", val: "4", label: "Day Streak" },
          ].map((s, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-[20px] p-4 text-center shadow-sm">
              <div className={`w-8 h-8 mx-auto ${s.bg} ${s.color} rounded-full flex items-center justify-center mb-2`}><s.icon className="w-4 h-4" /></div>
              <div className="font-bold font-['Poppins'] text-lg text-slate-900">{s.val}</div>
              <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] mb-6">
          <h3 className="font-bold font-['Poppins'] text-[15px] mb-6 text-slate-900">Weekly Activity</h3>
          <div className="flex items-end justify-between h-32 mt-2 px-2">
            {[40,70,45,90,60,30,80].map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-[18px] h-24 bg-slate-50 rounded-full overflow-hidden flex items-end">
                  <div className="w-full bg-[#0357EE] rounded-full transition-all duration-500" style={{height:`${h}%`}}></div>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">{['M','T','W','T','F','S','S'][i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] mb-6">
          <h3 className="font-bold font-['Poppins'] text-[15px] mb-5 text-slate-900">Performance by Category</h3>
          <div className="space-y-4">
            {[
              {title:'Aptitude',percent:82,color:'bg-[#4CAF50]'},
              {title:'Numerical',percent:75,color:'bg-[#0357EE]'},
              {title:'Verbal',percent:68,color:'bg-[#FF9F43]'},
              {title:'HR Interview',percent:90,color:'bg-[#7C3AED]'},
              {title:'Technical',percent:61,color:'bg-red-500'},
            ].map(cat => (
              <div key={cat.title}>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-700">{cat.title}</span>
                  <span className="text-slate-900 font-bold">{cat.percent}%</span>
                </div>
                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color} rounded-full`} style={{width:`${cat.percent}%`}} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <h3 className="font-bold font-['Poppins'] text-[15px] mb-4 text-slate-900 px-1">Recent Achievements</h3>
        <div className="space-y-3">
          {[
            {icon:Flame,bg:"bg-orange-50",color:"text-orange-500",fill:true,title:"7-Day Streak",desc:"Practiced consistently for a week."},
            {icon:Target,bg:"bg-blue-50",color:"text-blue-500",fill:false,title:"First 100 Questions",desc:"Completed your first milestone."},
            {icon:Zap,bg:"bg-purple-50",color:"text-purple-500",fill:true,title:"Speed Demon",desc:"Answered 10 questions in under 5 mins."},
          ].map((a,i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-[20px] p-4 flex items-center gap-4 shadow-sm">
              <div className={`w-12 h-12 rounded-full ${a.bg} ${a.color} flex items-center justify-center shrink-0`}>
                <a.icon className="w-6 h-6" fill={a.fill ? "currentColor" : "none"} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{a.title}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileView({ setPage, displayName, initials, signOut }: any) {
  return (
    <div className="flex-1 overflow-y-auto pb-28 [&::-webkit-scrollbar]:hidden bg-slate-50/50">
      <header className="px-6 py-4 pt-8 sticky top-0 bg-white/90 backdrop-blur-md z-40">
        <h2 className="text-xl font-bold font-['Poppins'] text-slate-900">Profile</h2>
      </header>
      <div className="px-6 py-4 text-center flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0357EE] to-blue-400 text-white flex items-center justify-center font-bold text-3xl border-4 border-white shadow-lg font-['Poppins'] mb-4 relative">
          {initials}
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-white text-slate-700 rounded-full flex items-center justify-center shadow-md border border-slate-100">
            <Pencil className="w-4 h-4" />
          </button>
        </div>
        <h3 className="text-[20px] font-bold font-['Poppins'] text-slate-900">{displayName}</h3>
        <p className="text-[12px] text-slate-500 font-medium mt-1">Job Seeker • InterviewAce member</p>
      </div>
      <div className="px-6 py-2 mb-6">
        <div className="bg-white border border-slate-100 rounded-[24px] p-4 flex justify-between items-center shadow-sm divide-x divide-slate-50">
          {[
            {val: "12", label:"Questions"},
            {val: "78%", label:"Avg Score"},
            {val: "4", label:"Streak 🔥", blue:true},
          ].map((s,i) => (
            <div key={i} className="flex-1 text-center">
              <div className={`font-bold font-['Poppins'] text-lg ${s.blue ? 'text-[#0357EE]' : 'text-slate-900'}`}>{s.val}</div>
              <div className="text-[10px] font-medium text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 pb-6">
        <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-3 px-2">Account</h3>
        <div className="bg-white border border-slate-100 rounded-[24px] shadow-sm mb-6 overflow-hidden">
          {[
            {icon:Pencil,label:"Edit Profile"},
            {icon:Bell,label:"Notifications",action:()=>setPage("notifications")},
            {icon:Star,label:"Subscription",chip:"Pro Plan",iconColor:"text-amber-500",bg:"bg-amber-50"},
            {icon:Globe,label:"Language"},
            {icon:Shield,label:"Privacy"},
          ].map((item,i) => (
            <button key={i} onClick={item.action} className="w-full flex items-center justify-between p-4 px-5 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-9 h-9 rounded-full ${item.bg||'bg-slate-50'} flex items-center justify-center ${item.iconColor||'text-slate-600'}`}><item.icon className="w-4 h-4" /></div>
                <span className="font-semibold text-sm text-slate-800">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.chip && <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2.5 py-1 rounded-full">{item.chip}</span>}
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
            </button>
          ))}
        </div>
        <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-3 px-2">Support</h3>
        <div className="bg-white border border-slate-100 rounded-[24px] shadow-sm mb-6 overflow-hidden">
          {[{icon:HelpCircle,label:"Help Center"},{icon:Heart,label:"Rate App"},{icon:Share2,label:"Share App"}].map((item,i) => (
            <button key={i} className="w-full flex items-center justify-between p-4 px-5 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-600"><item.icon className="w-4 h-4" /></div>
                <span className="font-semibold text-sm text-slate-800">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>
          ))}
        </div>
        <button onClick={signOut} className="w-full flex items-center justify-center gap-2 py-4 text-red-500 font-bold text-[14px] hover:bg-red-50 rounded-full transition-colors">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </div>
  );
}

function CategoryView({ categoryId, setPage, triggerToast }: any) {
  const cat = CATEGORIES.find(c => c.id === categoryId);
  const [activeTab, setActiveTab] = useState("All");
  if (!cat) return null;
  return (
    <div className="flex-1 overflow-y-auto pb-28 [&::-webkit-scrollbar]:hidden bg-slate-50/50">
      <header className="px-6 py-4 pt-8 sticky top-0 bg-white/90 backdrop-blur-md z-40 border-b border-slate-100/50">
        <div className="flex items-center gap-3">
          <button onClick={() => setPage("practice")} className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors"><ChevronLeft className="w-6 h-6 text-slate-700" /></button>
          <div className={`w-10 h-10 rounded-full ${cat.bg} flex items-center justify-center text-xl`}>{cat.icon}</div>
          <div className="flex-1">
            <h2 className="font-bold font-['Poppins'] text-lg text-slate-900 leading-tight">{cat.title}</h2>
            <p className="text-[11px] text-slate-500">{cat.count} Questions</p>
          </div>
        </div>
      </header>
      <div className="px-6 py-4">
        <div className="bg-white rounded-[20px] p-4 flex justify-between items-center shadow-sm border border-slate-100 mb-5">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Your Stats</div>
            <div className="flex gap-4">
              <div><span className="font-bold text-slate-900">42</span> <span className="text-[10px] text-slate-500">Done</span></div>
              <div><span className="font-bold text-green-500">85%</span> <span className="text-[10px] text-slate-500">Accuracy</span></div>
            </div>
          </div>
          <div className={`w-12 h-12 rounded-full ${cat.bg} flex items-center justify-center`}><Award className={`w-6 h-6 ${cat.fg}`} /></div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden snap-x">
          {["All","Easy","Medium","Hard"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`snap-start shrink-0 px-4 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-colors ${activeTab===tab ? "bg-slate-800 text-white" : "bg-white text-slate-500 border border-slate-200"}`}>{tab}</button>
          ))}
        </div>
        <div className="space-y-3">
          {cat.topics.map((topic, i) => {
            const difficulty = i%3===0?"Easy":i%3===1?"Medium":"Hard";
            const diffColor = difficulty==="Easy"?"text-green-500 bg-green-50":difficulty==="Medium"?"text-orange-500 bg-orange-50":"text-red-500 bg-red-50";
            const progress = i===0?100:i===1?40:0;
            const locked = i>3;
            if (activeTab!=="All" && activeTab!==difficulty) return null;
            return (
              <div key={i} className="bg-white border border-slate-100 shadow-[0_4px_15px_rgb(0,0,0,0.02)] rounded-[20px] p-4">
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full ${cat.bg} ${cat.fg} font-bold flex items-center justify-center shrink-0 text-[13px]`}>{i+1}</div>
                  <div className="flex-1 pt-0.5">
                    <h4 className="font-bold text-slate-900 text-[14px] leading-tight mb-1.5">{topic}</h4>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${diffColor}`}>{difficulty}</span>
                      <span className="text-[11px] text-slate-400 font-medium">10 Questions</span>
                    </div>
                  </div>
                  <div className="pt-1">
                    {locked ? (
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100"><Lock className="w-3.5 h-3.5 text-slate-300" /></div>
                    ) : (
                      <button onClick={triggerToast} className={`px-4 py-1.5 rounded-full text-[11px] font-bold ${progress===100?'bg-green-50 text-green-600':'bg-[#0357EE] text-white shadow-sm shadow-blue-500/20'}`}>{progress===100?'Review':'Start'}</button>
                    )}
                  </div>
                </div>
                {!locked && (
                  <div className="w-full bg-slate-50 h-1.5 mt-4 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${progress===100?'bg-green-500':'bg-[#0357EE]'}`} style={{width:`${progress}%`}} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DailyChallengeView({ setPage, triggerToast }: any) {
  return (
    <div className="flex-1 overflow-y-auto pb-28 [&::-webkit-scrollbar]:hidden bg-slate-50/50">
      <header className="px-6 py-4 pt-8 sticky top-0 bg-white/90 backdrop-blur-md z-40 flex items-center gap-3">
        <button onClick={() => setPage("home")} className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors"><ChevronLeft className="w-6 h-6 text-slate-700" /></button>
        <h2 className="text-xl font-bold font-['Poppins'] text-slate-900 flex items-center gap-2">Daily Challenge <Trophy className="w-5 h-5 text-yellow-500" fill="currentColor"/></h2>
      </header>
      <div className="px-6 py-2">
        <p className="text-slate-500 text-[13px] mb-4">Complete 10 questions to keep your streak alive!</p>
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-[16px] p-3 mb-6 text-white text-center font-bold text-sm shadow-md shadow-orange-500/20 flex items-center justify-center gap-2">
          <Flame className="w-4 h-4" fill="currentColor" /> 7-Day Streak! Keep it up!
        </div>
        <div className="relative w-48 h-48 mx-auto my-8">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#F5F3FF" strokeWidth="10" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="#7C3AED" strokeWidth="10" strokeDasharray="263.89" strokeDashoffset="105.55" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold font-['Poppins'] text-slate-900">6/10</span>
          </div>
        </div>
        <p className="text-center text-slate-500 text-[13px] font-medium mb-8">6 of 10 questions completed</p>
        <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 p-2 mb-6">
          {[1,2,3,4,5,6,7,8,9,10].map(i => {
            const done = i<=6;
            return (
              <div key={i} className="flex items-center gap-4 p-3 border-b border-slate-50 last:border-0">
                <div className="w-5 text-[11px] font-bold text-slate-400 text-center">{i}</div>
                <div className="flex-1"><h4 className={`text-[13px] font-semibold ${done?'text-slate-400 line-through':'text-slate-800'}`}>{i%2===0?'Data Interpretation':'Sentence Correction'}</h4></div>
                <div>
                  {done ? (
                    <div className="flex items-center gap-2"><span className="text-[10px] text-slate-400 font-medium">1m 12s</span><div className="w-5 h-5 rounded-full bg-green-100 text-green-500 flex items-center justify-center"><Check className="w-3 h-3 stroke-[3]" /></div></div>
                  ) : (<div className="w-5 h-5 rounded-full border-2 border-slate-200" />)}
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={triggerToast} className="w-full bg-[#7C3AED] text-white font-bold py-4 rounded-[20px] shadow-lg shadow-purple-500/20 text-[15px] hover:bg-purple-700 transition-colors">Continue Challenge →</button>
        <p className="text-center text-slate-400 text-[11px] font-medium mt-4">Resets in 4h 32m</p>
      </div>
    </div>
  );
}

function NotificationsView({ setPage }: any) {
  return (
    <div className="flex-1 overflow-y-auto pb-28 [&::-webkit-scrollbar]:hidden bg-slate-50/50">
      <header className="px-6 py-4 pt-8 sticky top-0 bg-white/90 backdrop-blur-md z-40 flex justify-between items-center border-b border-slate-100/50">
        <div className="flex items-center gap-3">
          <button onClick={() => setPage("home")} className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors"><ChevronLeft className="w-6 h-6 text-slate-700" /></button>
          <h2 className="text-xl font-bold font-['Poppins'] text-slate-900">Notifications</h2>
        </div>
        <button className="text-[#0357EE] text-[12px] font-bold">Mark all read</button>
      </header>
      <div className="py-2">
        <div className="px-6 py-3">
          <h3 className="font-bold text-[11px] text-slate-400 uppercase tracking-wider mb-4">Today</h3>
          <div className="space-y-4">
            {[
              {icon:Trophy,bg:"bg-blue-50",color:"text-blue-500",text:"You completed the Daily Challenge!",time:"2 hours ago",unread:true},
              {icon:BarChart2,bg:"bg-green-50",color:"text-green-500",text:"Your Aptitude score improved by 12%!",time:"5 hours ago",unread:true},
              {icon:Flame,bg:"bg-orange-50",color:"text-orange-500",text:"7-Day streak! Don't break it tomorrow",time:"8:00 AM",unread:false},
            ].map((n,i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className={`w-10 h-10 shrink-0 ${n.bg} ${n.color} rounded-full flex items-center justify-center`}><n.icon className="w-5 h-5" /></div>
                <div className="flex-1 pt-0.5">
                  <p className={`text-[13px] ${n.unread?'font-bold text-slate-900':'text-slate-700'} leading-snug`}>{n.text}</p>
                  <span className="text-[11px] text-slate-400 font-medium">{n.time}</span>
                </div>
                {n.unread && <div className="w-2.5 h-2.5 rounded-full bg-[#0357EE] mt-1.5" />}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-1 bg-slate-100 my-2" />
        <div className="px-6 py-3">
          <h3 className="font-bold text-[11px] text-slate-400 uppercase tracking-wider mb-4">Yesterday</h3>
          <div className="space-y-4">
            {[
              {icon:BookOpen,text:"New verbal questions added to the pool.",time:"Yesterday"},
              {icon:Target,text:"Mock test results ready. View detailed analysis.",time:"Yesterday"},
            ].map((n,i) => (
              <div key={i} className="flex gap-4 items-start opacity-70">
                <div className="w-10 h-10 shrink-0 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center"><n.icon className="w-5 h-5" /></div>
                <div className="flex-1 pt-0.5">
                  <p className="text-[13px] text-slate-700 leading-snug">{n.text}</p>
                  <span className="text-[11px] text-slate-400 font-medium">{n.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BottomNav({ page, setPage }: { page: string, setPage: (p: string) => void }) {
  const getActive = () => {
    if (["home","daily-challenge","notifications"].includes(page)) return "home";
    if (["practice","aptitude","numerical","verbal","hr-interview","technical"].includes(page)) return "practice";
    if (page==="mock-tests") return "mock-tests";
    if (page==="progress") return "progress";
    if (page==="profile") return "profile";
    return "home";
  };
  const activeTab = getActive();
  const tabs = [
    {id:"home",icon:Home,label:"Home"},
    {id:"practice",icon:FileText,label:"Practice"},
    {id:"mock-tests",icon:Clock,label:"Mock Tests"},
    {id:"progress",icon:BarChart2,label:"Progress"},
    {id:"profile",icon:User,label:"Profile"},
  ];
  return (
    <nav className="absolute bottom-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-100 rounded-t-[24px] px-6 py-4 pb-6 shadow-[0_-10px_40px_rgb(0,0,0,0.06)] flex justify-between items-center z-50">
      {tabs.map(tab => {
        const active = activeTab===tab.id;
        return (
          <button key={tab.id} onClick={() => setPage(tab.id)} className={`flex flex-col items-center gap-1.5 transition-colors ${active?'text-[#0357EE]':'text-slate-400 hover:text-slate-600'}`}>
            <tab.icon className="w-6 h-6" fill={active?'currentColor':'none'} strokeWidth={active?1.5:2} />
            <span className={`text-[10px] ${active?'font-bold':'font-medium'}`}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}