import { useState } from "react";

interface Article {
  id: number;
  title: string;
  tags: string;
  author: string;
  status: "Published" | "Draft" | "Pending";
  date: string;
  selected: boolean;
}

type TabFilter = "All Articles" | "Published" | "Drafts" | "Pending";

const INITIAL_ARTICLES: Article[] = [
  { id: 1, title: "Understanding Anxiety in Teens", tags: "Mental Health, Teenagers", author: "Dr. Sarah Johnson", status: "Published", date: "Oct 12, 2023", selected: false },
  { id: 2, title: "Daily Mindfulness Practices", tags: "Meditation, Lifestyle", author: "Marcus Chen", status: "Draft", date: "Oct 14, 2023", selected: false },
  { id: 3, title: "Nutrition and Mental Clarity", tags: "Diet, Wellness", author: "Elena Rodriguez", status: "Pending", date: "Oct 15, 2023", selected: false },
  { id: 4, title: "Coping Mechanisms for Burnout", tags: "Work, Stress", author: "Dr. Sarah Johnson", status: "Published", date: "Oct 08, 2023", selected: false },
];

const STATUS_STYLES: Record<Article["status"], string> = {
  Published: "bg-emerald-100 text-emerald-700",
  Draft: "bg-amber-100 text-amber-700",
  Pending: "bg-blue-100 text-blue-700",
};

export default function ManageArticlesPage() {
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [activeTab, setActiveTab] = useState<TabFilter>("All Articles");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);

  const selectedCount = articles.filter((a) => a.selected).length;

  const toggleSelectAll = () => {
    const next = !selectAll;
    setSelectAll(next);
    setArticles(articles.map((a) => ({ ...a, selected: next })));
  };

  const toggleSelect = (id: number) => {
    setArticles(articles.map((a) => (a.id === id ? { ...a, selected: !a.selected } : a)));
  };

  const deleteSelected = () => {
    setArticles(articles.filter((a) => !a.selected));
    setSelectAll(false);
  };

  const filtered = articles.filter((a) => {
    const matchesTab =
      activeTab === "All Articles" ||
      (activeTab === "Published" && a.status === "Published") ||
      (activeTab === "Drafts" && a.status === "Draft") ||
      (activeTab === "Pending" && a.status === "Pending");
    const matchesSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.author.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-[#f6f8f8] font-['Inter'] text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#13ecec]/20 bg-white flex flex-col shrink-0">
        <div className="p-6 flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-[#13ecec] flex items-center justify-center text-[#102222] font-bold text-xl">
              MC
            </div>
            <div>
              <h1 className="text-slate-900 text-base font-bold leading-none">MindCare Admin</h1>
              <p className="text-slate-500 text-xs font-medium">Mental Health Portal</p>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            {[
              { icon: "dashboard", label: "Dashboard", active: false },
              { icon: "description", label: "Articles", active: true },
              { icon: "group", label: "Users", active: false },
              { icon: "menu_book", label: "Resources", active: false },
            ].map((item) => (
              <a
                key={item.label}
                href="#"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  item.active
                    ? "bg-[#13ecec]/20 text-slate-900"
                    : "text-slate-600 hover:bg-[#13ecec]/10"
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="text-sm font-semibold">{item.label}</span>
              </a>
            ))}
            <div className="my-4 border-t border-[#13ecec]/10" />
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-[#13ecec]/10 transition-colors">
              <span className="material-symbols-outlined">settings</span>
              <span className="text-sm font-semibold">Settings</span>
            </a>
          </nav>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="p-8 pb-4">
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div>
              <h2 className="text-4xl font-black tracking-tight text-slate-900">Manage Articles</h2>
              <p className="text-slate-500 text-base">Create, edit, and organize your mental health content.</p>
            </div>
            <button className="flex items-center justify-center gap-2 rounded-lg h-11 px-6 bg-[#13ecec] text-slate-900 text-sm font-bold shadow-lg shadow-[#13ecec]/20 hover:brightness-105 transition-all">
              <span className="material-symbols-outlined">add</span>
              <span>Create New Article</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { label: "Total Articles", value: "1,284", trend: "+12%", up: true },
              { label: "Published", value: "1,102", trend: "+5%", up: true },
              { label: "Drafts", value: "182", trend: "-2%", up: false },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2 rounded-xl p-6 border border-[#13ecec]/20 bg-white">
                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <p className="text-slate-900 text-3xl font-bold">{stat.value}</p>
                  <p className={`text-sm font-bold flex items-center ${stat.up ? "text-emerald-500" : "text-rose-500"}`}>
                    <span className="material-symbols-outlined text-sm">{stat.up ? "trending_up" : "trending_down"}</span>
                    {stat.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* Table Section */}
        <section className="p-8 pt-4">
          <div className="bg-white border border-[#13ecec]/10 rounded-xl overflow-hidden shadow-sm">
            {/* Filters */}
            <div className="p-4 border-b border-[#13ecec]/10 flex flex-col gap-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex gap-1 bg-[#f6f8f8] p-1 rounded-lg">
                  {(["All Articles", "Published", "Drafts", "Pending"] as TabFilter[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                        activeTab === tab
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  {["filter_list", "file_download"].map((icon) => (
                    <button
                      key={icon}
                      className="flex items-center gap-2 px-3 py-2 border border-[#13ecec]/20 rounded-lg text-xs font-bold text-slate-600 hover:bg-[#13ecec]/5"
                    >
                      <span className="material-symbols-outlined text-lg">{icon}</span>
                      {icon === "filter_list" ? "Filter" : "Export"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative w-full">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#f6f8f8] border-none rounded-lg focus:ring-2 focus:ring-[#13ecec]/50 text-sm outline-none"
                  placeholder="Search by title, author, or tags..."
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#13ecec]/10 bg-[#f6f8f8]/50">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={toggleSelectAll}
                        className="rounded border-[#13ecec]/30 text-[#13ecec] focus:ring-[#13ecec]"
                      />
                    </th>
                    {["Article Title", "Author", "Status", "Date", ""].map((h) => (
                      <th key={h} className={`px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider ${!h ? "text-right" : ""}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#13ecec]/5">
                  {filtered.map((article) => (
                    <tr key={article.id} className="hover:bg-[#13ecec]/5 transition-colors group">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={article.selected}
                          onChange={() => toggleSelect(article.id)}
                          className="rounded border-[#13ecec]/30 text-[#13ecec] focus:ring-[#13ecec]"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900">{article.title}</span>
                          <span className="text-xs text-slate-500">{article.tags}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{article.author}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${STATUS_STYLES[article.status]}`}>
                          {article.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{article.date}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 hover:bg-[#13ecec]/20 rounded-md text-slate-600" title="View">
                            <span className="material-symbols-outlined text-lg">visibility</span>
                          </button>
                          <button className="p-1.5 hover:bg-[#13ecec]/20 rounded-md text-slate-600" title="Edit">
                            <span className="material-symbols-outlined text-lg">edit</span>
                          </button>
                          <button className="p-1.5 hover:bg-rose-100 rounded-md text-rose-500" title="Delete">
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-[#13ecec]/10 flex items-center justify-between">
              <p className="text-xs text-slate-500 font-medium">Showing 1 to 10 of 1,284 articles</p>
              <div className="flex items-center gap-2">
                <button className="p-2 border border-[#13ecec]/20 rounded-lg text-slate-500 hover:bg-[#13ecec]/10 disabled:opacity-30" disabled>
                  <span className="material-symbols-outlined text-lg">chevron_left</span>
                </button>
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`size-8 rounded-lg text-xs font-bold transition-all ${
                      currentPage === page ? "bg-[#13ecec] text-slate-900" : "text-slate-500 hover:bg-[#13ecec]/10"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <span className="text-slate-500">...</span>
                <button className="size-8 rounded-lg text-slate-500 text-xs font-bold hover:bg-[#13ecec]/10">128</button>
                <button className="p-2 border border-[#13ecec]/20 rounded-lg text-slate-500 hover:bg-[#13ecec]/10">
                  <span className="material-symbols-outlined text-lg">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedCount > 0 && (
            <div className="mt-6 flex items-center justify-between p-4 bg-[#13ecec]/10 border border-[#13ecec]/30 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#13ecec]">info</span>
                <p className="text-sm font-semibold">{selectedCount} article{selectedCount > 1 ? "s" : ""} selected</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-sm font-bold text-slate-600 hover:text-slate-900">Archive</button>
                <button onClick={deleteSelected} className="text-sm font-bold text-rose-500 hover:text-rose-600">
                  Delete Permanently
                </button>
                <div className="h-4 w-px bg-[#13ecec]/30" />
                <button className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold">
                  Bulk Publish
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}