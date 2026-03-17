import { useState } from "react";

interface Payout {
  id: string;
  date: string;
  amount: string;
  method: string;
  status: "Completed" | "Pending";
}

const PAYOUTS: Payout[] = [
  { id: "#MC-94821", date: "Oct 24, 2023", amount: "$2,450.00", method: "Bank Transfer (**** 4291)", status: "Completed" },
  { id: "#MC-94755", date: "Oct 17, 2023", amount: "$1,800.00", method: "PayPal (j.smith@expert.com)", status: "Completed" },
  { id: "#MC-94612", date: "Oct 10, 2023", amount: "$3,100.00", method: "Bank Transfer (**** 4291)", status: "Completed" },
];

const CHART_DATA = [
  { month: "May", barH: 40, fillH: 60 },
  { month: "Jun", barH: 55, fillH: 75 },
  { month: "Jul", barH: 45, fillH: 65 },
  { month: "Aug", barH: 70, fillH: 85 },
  { month: "Sep", barH: 65, fillH: 80 },
  { month: "Oct", barH: 90, fillH: 95, active: true },
];

const SERVICES = [
  { label: "1:1 Counseling", amount: "$8,400", pct: 68 },
  { label: "Group Workshops", amount: "$2,800", pct: 22, opacity: "60" },
  { label: "Expert Consultations", amount: "$1,250", pct: 10, opacity: "30" },
];

const STATS = [
  { label: "Total Revenue", value: "$12,450.00", icon: "trending_up", sub: "+12.5%", subLabel: "vs last month", green: true },
  { label: "Pending Balance", value: "$850.00", icon: "schedule", sub: "Clears in 3-5 days", green: false },
  { label: "Available for Withdrawal", value: "$3,200.00", icon: "account_balance", sub: "Instant payout available", green: false, italic: true },
  { label: "Total Sessions", value: "142", icon: "groups", sub: "+8%", subLabel: "avg. productivity", green: true },
];

type ViewMode = "Weekly View" | "Monthly View" | "Quarterly View";

export default function RevenueDashboardPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("Monthly View");

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f8] font-['Inter'] text-slate-900">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 bg-white px-6 py-3 lg:px-40">
        <div className="flex items-center gap-4">
          <div className="size-8 text-[#13ecec]">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" />
            </svg>
          </div>
          <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">MindCare Expert</h2>
        </div>
        <div className="flex flex-1 justify-end gap-4 items-center">
          <div className="flex gap-2">
            {["notifications", "settings"].map((icon) => (
              <button key={icon} className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 text-slate-700">
                <span className="material-symbols-outlined">{icon}</span>
              </button>
            ))}
          </div>
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#13ecec]"
            style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDrseIDFLDC_P0a7L_OXpF33uPcn7cLlBNlZTSyUQOXsBZdBOW1ENbDPIhqiYUw_uOn4WMusbWACMMo0dJY25JBGY_MNCIAmizFHsgoZ7tKf9PiaBOODBowI7AW3vw5sgyurAJ169wmjYPFrBU2JZtSMWsGtW9IpAAoSS-lwxW626O89JIC1dg2W6iLv4-UzBJo55ls9vt8XfcDfMYpwzvLaphXO3J07VNgtPcu9JvV8uFiiuJsi2yMG5wXvrMGaka0dbCIg5XK65IJ")` }}
          />
        </div>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row lg:px-40">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex flex-col gap-4 border-r border-slate-200 p-4 bg-white">
          <div className="flex flex-col gap-2">
            {[
              { icon: "dashboard", label: "Dashboard", active: false },
              { icon: "calendar_today", label: "Schedule", active: false },
              { icon: "account_balance_wallet", label: "Revenue", active: true },
              { icon: "group", label: "Clients", active: false },
              { icon: "analytics", label: "Analytics", active: false },
            ].map((item) => (
              <a
                key={item.label}
                href="#"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active
                    ? "bg-[#13ecec]/20 text-slate-900"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span className={`material-symbols-outlined ${item.active ? "text-[#13ecec]" : ""}`}>
                  {item.icon}
                </span>
                <p className={`text-sm ${item.active ? "font-bold" : "font-medium"}`}>{item.label}</p>
              </a>
            ))}
          </div>
          <div className="mt-auto p-4 bg-[#13ecec]/10 rounded-xl">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Expert Support</p>
            <p className="text-sm mt-1 mb-3">Need help with your finances?</p>
            <button className="w-full py-2 bg-[#13ecec] text-slate-900 font-bold text-xs rounded-lg uppercase tracking-wide">
              Contact Billing
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col p-6 overflow-y-auto">
          {/* Title */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
            <div>
              <h1 className="text-slate-900 text-3xl font-black leading-tight tracking-tight">Financial Overview</h1>
              <p className="text-slate-500 text-base">Track your earnings and payout performance for October 2023</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-900 rounded-lg text-sm font-bold border border-slate-200">
                <span className="material-symbols-outlined text-lg">download</span>
                Export Report
              </button>
              <button className="flex items-center gap-2 px-6 py-2 bg-[#13ecec] text-slate-900 rounded-lg text-sm font-bold shadow-lg shadow-[#13ecec]/20">
                <span className="material-symbols-outlined text-lg">payments</span>
                Withdraw Funds
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2 rounded-xl p-6 bg-white border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start">
                  <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                  <span className={`material-symbols-outlined ${stat.green || stat.label.includes("Available") ? "text-[#13ecec]" : "text-slate-400"}`}>
                    {stat.icon}
                  </span>
                </div>
                <p className="text-slate-900 text-3xl font-bold leading-tight">{stat.value}</p>
                <div className={`flex items-center gap-1 text-sm ${stat.green ? "text-emerald-500 font-bold" : "text-slate-500"}`}>
                  {stat.green && <span className="material-symbols-outlined text-sm">arrow_upward</span>}
                  <span className={stat.italic ? "italic text-xs" : ""}>{stat.sub}</span>
                  {stat.subLabel && <span className="text-slate-400 font-normal ml-1">{stat.subLabel}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Chart + Service Breakdown */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Earnings Trend Chart */}
            <div className="xl:col-span-2 flex flex-col gap-6 p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Earnings Trend</h3>
                <select
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value as ViewMode)}
                  className="bg-slate-50 border-none rounded-lg text-xs font-bold text-slate-600 focus:ring-[#13ecec] outline-none px-3 py-2"
                >
                  {(["Weekly View", "Monthly View", "Quarterly View"] as ViewMode[]).map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div className="h-64 flex items-end justify-between gap-2 pt-4 px-2">
                {CHART_DATA.map((bar) => (
                  <div key={bar.month} className="flex flex-col items-center flex-1 gap-2">
                    <div
                      className="w-full bg-slate-100 rounded-t-lg relative"
                      style={{ height: `${bar.barH}%` }}
                    >
                      <div
                        className={`absolute bottom-0 w-full rounded-t-lg ${bar.active ? "bg-[#13ecec]" : "bg-[#13ecec]/50"}`}
                        style={{ height: `${bar.fillH}%` }}
                      />
                    </div>
                    <span className={`text-[10px] font-bold uppercase ${bar.active ? "text-[#13ecec]" : "text-slate-400"}`}>
                      {bar.month}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-6 mt-2 text-xs font-medium text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-slate-300" />
                  <span>Last Year</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-[#13ecec]" />
                  <span>Current Period</span>
                </div>
              </div>
            </div>

            {/* Revenue by Service */}
            <div className="flex flex-col gap-6 p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold">Revenue by Service</h3>
              <div className="flex flex-col gap-5">
                {SERVICES.map((svc) => (
                  <div key={svc.label} className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-700">{svc.label}</span>
                      <span className="font-bold">{svc.amount}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${svc.opacity ? `bg-[#13ecec]/${svc.opacity}` : "bg-[#13ecec]"}`}
                        style={{
                          width: `${svc.pct}%`,
                          backgroundColor: svc.opacity
                            ? `color-mix(in srgb, #13ecec ${svc.opacity}%, transparent)`
                            : "#13ecec",
                        }}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400">{svc.pct}% of total revenue</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <button className="w-full py-2 text-[#13ecec] text-xs font-bold hover:bg-[#13ecec]/5 rounded-lg transition-colors uppercase tracking-widest">
                  View Detailed Service Breakdown
                </button>
              </div>
            </div>
          </div>

          {/* Recent Payouts Table */}
          <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-bold">Recent Payouts</h3>
              <a href="#" className="text-[#13ecec] text-xs font-bold uppercase hover:underline">See All Activity</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
                  <tr>
                    {["Transaction ID", "Date", "Amount", "Method", "Status"].map((h) => (
                      <th key={h} className="px-6 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100">
                  {PAYOUTS.map((p) => (
                    <tr key={p.id}>
                      <td className="px-6 py-4 font-medium">{p.id}</td>
                      <td className="px-6 py-4">{p.date}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{p.amount}</td>
                      <td className="px-6 py-4">{p.method}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-700">
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}