import React from "react";
import { 
  Menu, 
  Bell, 
  ChevronRight, 
  Home, 
  FileText, 
  Clock, 
  BarChart2, 
  User, 
  Check, 
  Code 
} from "lucide-react";

export function Dashboard() {
  return (
    <div className="max-w-[430px] mx-auto bg-white min-h-screen relative font-['Inter'] text-slate-900 shadow-2xl overflow-hidden flex flex-col">
      {/* Top Nav */}
      <header className="flex items-center justify-between px-6 py-4 pt-8">
        <button className="p-2 -ml-2 rounded-full hover:bg-slate-50 transition-colors">
          <Menu className="w-6 h-6 text-slate-700" />
        </button>
        <div className="flex items-center gap-5">
          <button className="relative p-1">
            <Bell className="w-6 h-6 text-slate-700" />
            <span className="absolute -top-0 -right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
              3
            </span>
          </button>
          <button className="w-10 h-10 rounded-full bg-[#0357EE] text-white flex items-center justify-center font-bold text-sm border-2 border-white shadow-sm font-['Poppins']">
            AK
          </button>
        </div>
      </header>

      {/* Main Scrollable Content */}
      <main className="flex-1 overflow-y-auto pb-28 px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Welcome */}
        <section className="mb-6">
          <h1 className="text-2xl font-bold font-['Poppins'] text-slate-900 tracking-tight">
            Hello, Adekunle 👋
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Let's practice and get hired!
          </p>
        </section>

        {/* Hero Banner */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] rounded-[24px] p-6 relative overflow-hidden shadow-lg shadow-purple-500/20">
            <div className="relative z-10 w-[65%]">
              <h2 className="text-white text-[22px] font-bold font-['Poppins'] mb-2 leading-tight tracking-tight">
                Practice today, <br />
                Get hired tomorrow.
              </h2>
              <p className="text-purple-100 text-[11px] mb-5 opacity-90 font-medium">
                Real questions. Real practice. Real results.
              </p>
              <button className="bg-white text-[#7C3AED] text-sm font-bold py-2.5 px-4 rounded-full inline-flex items-center gap-1 shadow-sm hover:bg-purple-50 transition-colors">
                Start Practice <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
            {/* Right side illustration (SVG inline) */}
            <div className="absolute -right-2 -bottom-2 w-[55%] h-[120%] flex items-end justify-end pointer-events-none">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full object-contain opacity-95"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Clipboard Base */}
                <rect x="25" y="25" width="55" height="70" rx="8" fill="#F5F3FF" stroke="#C4B5FD" strokeWidth="2" transform="rotate(-5 50 50)" />
                <rect x="42" y="18" width="22" height="12" rx="4" fill="#A78BFA" transform="rotate(-5 50 50)" />
                {/* Lines */}
                <line x1="38" y1="45" x2="65" y2="45" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" transform="rotate(-5 50 50)" />
                <line x1="38" y1="55" x2="60" y2="55" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" transform="rotate(-5 50 50)" />
                {/* Checkmarks */}
                <path d="M40 68 L48 76 L65 58" stroke="#4CAF50" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                {/* Pen */}
                <path d="M85 35 L70 70 L60 75 L65 65 L80 30 Z" fill="#FF9F43" stroke="#FFF" strokeWidth="1" />
                <path d="M60 75 L65 65 L63 63 Z" fill="#333" />
              </svg>
            </div>
          </div>
        </section>

        {/* Practice Categories */}
        <section className="mb-8 -mx-6">
          <div className="px-6 flex justify-between items-end mb-4">
            <h3 className="text-[17px] font-bold font-['Poppins'] tracking-tight text-slate-900">
              Practice by Category
            </h3>
            <a href="#" className="text-[#0357EE] text-sm font-semibold hover:underline mb-0.5">
              View all
            </a>
          </div>
          <div className="flex overflow-x-auto gap-3.5 px-6 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x">
            {[
              { icon: "💼", title: "Aptitude", count: "320+ Questions", bg: "bg-[#FEF3C7]" },
              { icon: "🧮", title: "Numerical", count: "250+ Questions", bg: "bg-[#E0F2FE]" },
              { icon: "💬", title: "Verbal", count: "280+ Questions", bg: "bg-[#DCFCE7]" },
              { icon: "👥", title: "HR Interview", count: "150+ Questions", bg: "bg-[#FCE7F3]" },
              { icon: <Code className="w-6 h-6 text-purple-600" />, title: "Technical", count: "400+ Questions", bg: "bg-[#F3E8FF]" },
            ].map((cat, i) => (
               <button 
                 key={i} 
                 className={`snap-start shrink-0 w-[125px] ${cat.bg} rounded-[24px] p-4 flex flex-col justify-between h-[135px] text-left hover:scale-[1.02] transition-transform active:scale-95`}
               >
                 <div className="w-11 h-11 bg-white/70 rounded-full flex items-center justify-center text-[22px] shadow-sm mb-3">
                   {cat.icon}
                 </div>
                 <div>
                   <h4 className="font-bold font-['Poppins'] text-[15px] text-slate-800 leading-tight">
                     {cat.title}
                   </h4>
                   <p className="text-[11px] text-slate-600 font-medium mt-1">
                     {cat.count}
                   </p>
                 </div>
               </button>
            ))}
          </div>
        </section>

        {/* Daily Challenge Card */}
        <section className="mb-8">
          <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-[24px] p-4 flex items-center gap-4">
            <div className="w-14 h-14 shrink-0 bg-[#FFF8E7] rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 7C5 7 3 16 12 21C21 16 19 7 19 7M5 7H19M5 7C5 7 2 8 2 11C2 14 5 15 5 15M19 7C19 7 22 8 22 11C22 14 19 15 19 15M8 3V7M16 3V7M12 2V7" stroke="#FF9F43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold font-['Poppins'] text-[15px] text-slate-900">
                Daily Challenge
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5 mb-2 leading-tight pr-2">
                10 questions a day keeps rejection away.
              </p>
              <button className="text-[#7C3AED] text-xs font-bold flex items-center gap-0.5 hover:opacity-80 transition-opacity">
                Start Challenge <ChevronRight className="w-3 h-3 stroke-[3]" />
              </button>
            </div>
            <div className="relative w-[60px] h-[60px] shrink-0 flex items-center justify-center mr-1">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#F5F3FF" strokeWidth="3.5" />
                <circle 
                  cx="18" cy="18" r="16" 
                  fill="none" 
                  stroke="#7C3AED" 
                  strokeWidth="3.5" 
                  strokeDasharray="100.5" 
                  strokeDashoffset="40.2" 
                  strokeLinecap="round" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-0.5">
                <span className="text-[13px] font-bold text-slate-800 leading-none">6/10</span>
                <span className="text-[8px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Done</span>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Practice Section */}
        <section className="mb-4">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-[17px] font-bold font-['Poppins'] tracking-tight text-slate-900">
              Recent Practice
            </h3>
            <a href="#" className="text-[#0357EE] text-sm font-semibold hover:underline mb-0.5">
              View all
            </a>
          </div>
          <div className="flex flex-col gap-3">
            {/* Card 1 */}
            <button className="bg-white border border-slate-100/80 shadow-[0_4px_20px_rgb(0,0,0,0.04)] rounded-[20px] p-4 flex items-center gap-4 text-left hover:border-slate-200 transition-colors">
              <div className="w-12 h-12 shrink-0 bg-[#E8F5E9] rounded-full flex items-center justify-center text-[#4CAF50]">
                <Check className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[14px] text-slate-900 font-['Poppins']">
                  Numerical Ability Test
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-1">
                  <span>20 Questions</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span>Today</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[#4CAF50] font-bold text-[15px]">85%</span>
              </div>
            </button>

            {/* Card 2 */}
            <button className="bg-white border border-slate-100/80 shadow-[0_4px_20px_rgb(0,0,0,0.04)] rounded-[20px] p-4 flex items-center gap-4 text-left hover:border-slate-200 transition-colors">
              <div className="w-12 h-12 shrink-0 bg-[#FFF3E0] rounded-full flex items-center justify-center text-[#FF9F43]">
                <Clock className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[14px] text-slate-900 font-['Poppins']">
                  Verbal Reasoning Test
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-1">
                  <span>15 Questions</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span>Yesterday</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[#FF9F43] font-bold text-[15px]">73%</span>
              </div>
            </button>
          </div>
        </section>
      </main>

      {/* Bottom Nav */}
      <nav className="absolute bottom-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-100 rounded-t-[24px] px-6 py-4 pb-6 shadow-[0_-10px_40px_rgb(0,0,0,0.06)] flex justify-between items-center z-50">
        <button className="flex flex-col items-center gap-1.5 text-[#0357EE]">
          <Home className="w-6 h-6" fill="currentColor" strokeWidth={1.5} />
          <span className="text-[10px] font-semibold">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors">
          <FileText className="w-6 h-6" strokeWidth={2} />
          <span className="text-[10px] font-medium">Practice</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors">
          <Clock className="w-6 h-6" strokeWidth={2} />
          <span className="text-[10px] font-medium">Mock Tests</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors">
          <BarChart2 className="w-6 h-6" strokeWidth={2} />
          <span className="text-[10px] font-medium">Progress</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors">
          <User className="w-6 h-6" strokeWidth={2} />
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </nav>
    </div>
  );
}
