import { useState } from "react";
import { Link } from "react-router-dom";

const CATEGORIES = ["All Articles", "Anxiety", "Depression", "Self-Care", "Sleep Hygiene", "Work-Life Balance"];

interface Article {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  authorAvatar: string;
  readTime: string;
  image: string;
}

const ARTICLES: Article[] = [
  {
    id: 1,
    category: "Anxiety",
    title: "Managing Social Anxiety in the Modern Workplace",
    excerpt: "Practical tips for navigating meetings, networking events, and collaborative environments without feeling overwhelmed.",
    author: "Marcus Thorne",
    authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmQBxZy3iUx_wqsofl7yHvk8PZqZJ1U9eBPokwfw5-Kp4kEhSXjQnVHHUhmU2Na6nzpV8-KzdI3Xgug-fYikSvtFAZbS7lOW8m1gZ3r-ilSkQgg1xgsTQDu_QDizytoOA6PcKJ_04OpO-uns5d7P8P1nK0vRjKDoR0mO1OeXx1beIrJzwy752gbt8oNjbIoiru-sRMLcZporcsGynoFExMv7UH9eGxeil6RwnBMzT2RptYu5yqJ7RceNJ9EFmDjyS5P-NYq3YlCXCN",
    readTime: "8",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAj4L5HKCZqSh9bdEiqlDXY9FsvCfuXlAiTYx48Ye3mgzjC83RBrM7wlbWeSbIJU1G78dZz5LUliEI_fpL3ZxGwwH2XOt7F8n-Jl0C_jT2PeD6DumuD3KKmGQiTxDCwHC8vnf17_kRTth8Np2P6qId_xsAguxWvlm6yyeIQAWv2uCJMWso0OLwYTCoFWGv5ic0WYyF_bON7uQgNaYtHWXUtFE4fchHlRyYQ_DDHc9EYvuhCyeXIugJ6H1eaXBKGnMf_1v8Q0KWe1Nx8",
  },
  {
    id: 2,
    category: "Sleep",
    title: "The Science of Deep Sleep: Why Your Brain Needs It",
    excerpt: "Explore the neurological processes that occur during REM sleep and how they impact your cognitive performance daily.",
    author: "Emily Watson",
    authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1Lc5hrdYQA3ACfyN0ojAUNkb5C7IBKH6ho2yo07hlxRiNH-hu-811kdFefYmd63qRJnf1936wYv9ivl-sazdxXkUXUHLDKMUddattTyvmGvSmXLRGtx0VDHkpJfI8IA7M6qDk8iLHfNmClJwaYSg-OX7wBay7wqqT85VkEHh3YeEb-sdDZMyzTvcursZ7xRdlTVxFm9SIlnSEfMYe50x_6h70RU6l1RUFmh7wOV6gMCo6sm5TGUZ2joB-0zl0JymbT7IxDaS3cyYT",
    readTime: "15",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBL13tF4lS-HoNJPhITUe18FSmCC2VaWP-cwjEy5n3prpbuXECKKv9V6UbU1A4wJmNj5scF8VQlww5hk7_dcHQ4G9rCY9VbWAkEVw556elK_Nz8ErBQoPMxVR7YgkOvGueKwD3SaT_Pb2k3HAm8X-leLnP5dnym58RUNjPwdf0S58ZO9cu70_RSuPwziJ1IgQNALVP_PKFK1aYJreoWXhtJ7U9ktGlPIoh3KxZMrM9qlTA50gVgygdXqwi8v4YxZ0cORXrHMANLiNx3",
  },
  {
    id: 3,
    category: "Self-Care",
    title: "Journaling: Your Gateway to Emotional Clarity",
    excerpt: "How writing just 10 minutes a day can transform your self-awareness and help process complex emotions effectively.",
    author: "James Wilson",
    authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3vNdLweIShO6YcWSz5_wCBvlGwr9R-5FhONYW8OjBIdT2KKA3_xfDiE3IeEI0-qPFjxqlGNOZ29OU-Qbw8VflWmPCFjntqW97B3DWxvsl9YZCGatzXuIK0FbgWBpxmnsJvnZ-PeCuJHWhQVHFtpbOhIGpQVxSuL-q68VlTFOGkAf1QL820qB3UktRkbDXo9deqGWCFQx3zKg0v8im1bTCrt46sg45XbH140Kt8QyGK0xMqMa0_HP2K7uE3zWDBHek9a8AGDtb4cfG",
    readTime: "6",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMUkkz_MD0zGT0Fj3yM7eOjh8MycF8Fg8FvQLXxDlczwqJznnmfURAXhFsuCpHliXmaX0qIfTTxaoP899hItKSPqtY28yM3TOiFmR18WgZLqOfLMVadM_dSJai25pTlmR2yDczxUWsXoyuc5qWS6CK1lxmKJyYXt9QTlgLnqzqSRA-Z5dymf6gg4d3hG49bFr-mL98v5wpjKd09chEEmYp41WiVY9LtusawqXVqll2_I5xZU3hilhzj2rqliqAE0JX54Ym4AOOp5tP",
  },
  {
    id: 4,
    category: "Depression",
    title: "Breaking the Stigma: Understanding Depressive Cycles",
    excerpt: "A deep dive into the physiology of depression and the importance of professional support networks.",
    author: "Dr. Linda May",
    authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCddxi9SH_VO5cB-NNZFO2EdxKGTn67-PdnFs7zlpKhon5nMAI7XY2G_nJpp0C5FYFS0QxApN7EVoyHsVtW3N3aLne8a8wnj8Gdkw6I49yPOjhsUVR3iu-zTHyZ1vDb3QS5TJPDMlajoLt1nc6u6wrt7B5aeJhMNMv-SnF0XfH4jno_ztN-N36cnEGn181Ctey9_MSht4o2qb8Ud3HsfYUuz3K7g6Hv5VbUq40wEo9dDB087sS6_AHUwBSAgpzymwFLvqmJzipI1T5y",
    readTime: "20",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3u8hS_mBqKwOGbSkQdylxRaPV1moo-NguaS4v4zNbyOWmpygpVy3Ci3P8MD2XT-EiCAAwJTiNBO3Uv4H1bl2I0MXX6Ke4QnE6EGpf2em-eoI7noVpAuh10HaTqku1QHTLX-I7Ikvl1YelczQslOYAUtAeVtIMcXa8O28ye9est7D6McM--JWojZ1yDm6OTTOrxzitCIMj9UTlOpkAa_LzzS7kdJq1wevK1_cUm0HXZpnx0XOony9kzwh3UMhWfrCa7d2ASS70k-I6",
  },
  {
    id: 5,
    category: "Relationships",
    title: "The Power of Empathy in Healthy Relationships",
    excerpt: "Learning active listening and emotional validation to strengthen bonds with partners, friends, and family.",
    author: "Sofia Vergara",
    authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPHftaXfKHA_gFMbo-We9X1ggOhupKSbQyK2a__QmkOPUrZY2Dja5jPGlDPJUulef5f9TElCikY3QlSdcyeLJKYQ8cZAfMLZfQHaFK0ZUAAtpzX_PEoCaQmC24GVwkPUxU6eI_XuGkP5SiCVc49uSkqUbyeH974QowznLXWdgn9SHhC4B9cZXmUwPvcaXKcyDDzeAw3KsHxSArizLS9Lzj7ct6jTy68KgK4lTVBWHOsn3fRhJAGVo3nf2QPPMgVisfSiJ8n-Nspzbt",
    readTime: "10",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaTPKMWvwxsfi3sC0Vw3FcYBiwoOUiubXYZyA0vxGxM1LIp5JyZQgj_WQNvA3jWkr3u4R5sHkZafo4jWAR9DqxVPYeHzYZhc8TUd4vLILLC1V25HEEif_0B5Hq6JHKwJTbP8doHZvvmP_EZHEmux9Q42xE1dY6Exy1c8sWBUTx3bYD9BF6HN-SmqoUv_KSapq2uA03NMAbxOp21ZYXCggKj35pwh-3AfuZvoQT2sX7OsGFNFPVBgSXI088FvsuAy7ZbB02oK2Udvyl",
  },
  {
    id: 6,
    category: "Productivity",
    title: "Why Perfectionism is Your Enemy, Not Your Friend",
    excerpt: "Deconstructing the \"hustle culture\" mentality and learning to embrace progress over absolute perfection.",
    author: "Alex Reed",
    authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRXFSH_y_GCvvN4AQ5uOk5KFSnX1ou5odPJVN3zBd4_Y8Cgv0yE-Rnr3Mjk7G4IL-DwpiHgpALX1EqTvdeVfl730HdFTXaCV0m-0rKzZFzT3BHruK47JlkL5ofonquxtl5MrVjz0T2h5mNLMKC7GH5Dc0jGyINJJMcN_be6WSBcO-URIf1rL9rhVZ7gYBcoYC-t2b541MBrFRWjJM4YFNNq0v1qbkxBbc2kf1UKPD99J_ScWSync6AcvHq7XhQO-b9HoLiA65hLAtl",
    readTime: "12",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLTlwfZFFZaA3MsYfAlrIzBQJ0XRn3N99yDZsYpdEqKBHz5nNlsSi_F3ybUN3TijwBVag0vBEAmsPpRcDJ1n833PLb4gP66wRhXU-e5bAbluRo4hmuyfI8KL9SoSDkCb7hKORnJwpbSnzOv7pqv0abm9pC-dUCdg2Q1uiyfJ4DNBK-OoiA2TlJLGI5T-KqbKX3aabBO85bcmMfjusF7rGZIzxy8ijqnDjeyAJtzl3M1yWc0kn2XwFot_ql3v5HBf4cCZ2mIq74Nird",
  },
];

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [email, setEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f8] font-['Inter']">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 px-6 md:px-20 py-4 bg-white sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-[#13ecec]">
            <div className="size-8 bg-[#13ecec] rounded-lg flex items-center justify-center text-[#102222]">
              <span className="material-symbols-outlined">psychology</span>
            </div>
            <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-tight">MindCare</h2>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {["Articles", "Therapists", "Exercises", "Community"].map((item) => (
              <a
                key={item}
                href="#"
                className={`text-sm font-medium transition-colors ${
                  item === "Articles"
                    ? "text-[#13ecec] font-semibold border-b-2 border-[#13ecec] pb-1"
                    : "text-slate-600 hover:text-[#13ecec]"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 justify-end gap-4 md:gap-8 items-center">
          <div className="hidden sm:flex flex-col min-w-40 h-10 max-w-64">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div className="text-slate-400 flex border-none bg-slate-100 items-center justify-center pl-4 rounded-l-lg">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input
                className="flex w-full min-w-0 flex-1 border-none bg-slate-100 text-slate-900 focus:ring-0 h-full placeholder:text-slate-400 px-4 rounded-r-lg pl-2 text-sm outline-none"
                placeholder="Search articles..."
              />
            </div>
          </div>
          <div className="bg-[#13ecec]/20 p-1 rounded-full border border-[#13ecec]/30">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8"
              style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBviLFxn7-eu2uW_q6lPK35oC7SGkM1PzENM-6oukUSKOxwDcHD1XsYLqqgK8StZDRGNjl7zJXrQdJ3b-1S1I7zdjFv5a6sPkOPdEomhViEGVEBupz4AIowa5YxsT1kSn1M5J15u2QSTE-1Zh1yb6263llhympYqdqVvckYts1vjkArq-L1NmRA87R-oXZXgtBgZXyl_bna3EE05n2DO_XvgG2MawwL_HLa5vmqBbdjwxY6G925GjxxEX8Go0MOZSftpXznL7VVRuof")` }}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-8">
        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex border-b border-slate-200 gap-8 min-w-max">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex flex-col items-center justify-center border-b-2 pb-3 font-medium text-sm transition-colors ${
                  activeCategory === cat
                    ? "border-[#13ecec] text-slate-900 font-semibold"
                    : "border-transparent text-slate-500 hover:text-[#13ecec]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#13ecec]">auto_awesome</span>
            Featured Today
          </h2>
          <div className="group relative overflow-hidden rounded-xl bg-white shadow-sm border border-slate-200 flex flex-col md:flex-row">
            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
              <div
                className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDu2vC9nroX8W9duzdCq9d_Jww6jvLhIIjUImnFGeom4ui9xFKyD8qsIFH3WdIauv1I9GGUB7ZQABv-0MAKnzt9oSQ6DTVPTOZ1Xxsz02zYQUnemcvRcR8b8WOQunuBx2gQIEdAuFM27raL3-xP-21j-hcv6jO3XHFt7IXgDfekm7Ou5aPjpbsMLm3J4lLAZQoepZxHBbjXGnuGynb6SDn54-AxGKAPjaxPKSrkKLgp0fdX439J9QQUv_MEW0YB4JVKO4JJ-Z1jg9GD")` }}
              />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <span className="text-[#13ecec] font-bold text-xs uppercase tracking-widest mb-3">Holistic Health</span>
              <h3 className="text-3xl font-bold mb-4 leading-tight group-hover:text-[#13ecec] transition-colors">
                Finding Calm: A Comprehensive Guide to Daily Mindfulness
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Discover how simple daily rituals and breathing techniques can significantly lower cortisol levels and improve your long-term mental resilience.
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <div
                    className="size-10 rounded-full bg-cover"
                    style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAES097I7wWa1-NaEkuA8pdKg40goQu7d6sNVr-RnN7w1OgJeZeHCAYQx2AlVNP-c3OzmCAn5qJpgXuYMmMh4CHGGjWq6R9l4mk-zWcKGIhlceX40zqVBMNRvxx0rcWDeM5hATBvISeNwGvYiEu7qI4VyHNs84UPK4Hwvj7ixi_qLTyopjUEVPnPRJBbZXinLvd-yhO0a8sIdbPoAef6kFm9fqWTDaaY6T3vl-Gx48DJ2LleOEhBI_xMTPRqad87svlnURL9j_HNgDY")` }}
                  />
                  <div>
                    <p className="text-sm font-semibold">Dr. Sarah Chen</p>
                    <p className="text-xs text-slate-400">Psychologist • 12 min read</p>
                  </div>
                </div>
                <button className="bg-[#13ecec] hover:bg-[#13ecec]/80 text-slate-900 px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-lg shadow-[#13ecec]/20">
                  Read Article
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Articles Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Latest Insights</h2>
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
              {(["Grid", "List"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode.toLowerCase() as "grid" | "list")}
                  className={`p-1 px-3 rounded text-sm font-medium transition-all ${
                    viewMode === mode.toLowerCase() ? "bg-white shadow-sm" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTICLES.map((article) => (
              <article
                key={article.id}
                className="flex flex-col bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all group"
              >
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#13ecec] border border-[#13ecec]/20">
                    {article.category}
                  </div>
                  <div
                    className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url("${article.image}")` }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h4 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-[#13ecec] transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-slate-600 text-sm line-clamp-3 mb-6">{article.excerpt}</p>
                  <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-full bg-cover" style={{ backgroundImage: `url("${article.authorAvatar}")` }} />
                      <span className="text-xs font-semibold">{article.author}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      {article.readTime} min read
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex items-center justify-center gap-2">
            <button className="size-10 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-slate-400">chevron_left</span>
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`size-10 flex items-center justify-center rounded-lg font-medium transition-all ${
                  currentPage === page
                    ? "bg-[#13ecec] text-slate-900 font-bold shadow-lg shadow-[#13ecec]/20"
                    : "border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}
            <span className="text-slate-300">...</span>
            <button className="size-10 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors font-medium">
              12
            </button>
            <button className="size-10 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-slate-400">chevron_right</span>
            </button>
          </div>
        </section>

        {/* Newsletter */}
        <section className="mt-20 bg-[#13ecec]/10 rounded-2xl p-8 md:p-12 text-center border border-[#13ecec]/20">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Get MindCare in Your Inbox</h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Weekly mindfulness tips, expert advice, and resources to help you maintain your mental well-being journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 bg-white px-6 py-3 focus:ring-2 focus:ring-[#13ecec] focus:border-[#13ecec] outline-none text-sm"
              placeholder="Your email address"
            />
            <button className="bg-[#13ecec] hover:bg-[#13ecec]/80 text-slate-900 font-bold px-8 py-3 rounded-xl transition-all">
              Subscribe
            </button>
          </div>
          <p className="mt-4 text-[10px] text-slate-400">We respect your privacy. Unsubscribe at any time.</p>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 py-12 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 text-[#13ecec] mb-6">
              <span className="material-symbols-outlined">psychology</span>
              <h2 className="text-slate-900 text-xl font-bold">MindCare</h2>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Providing accessible mental health resources and professional support for everyone, everywhere.
            </p>
            <div className="flex gap-4">
              {["share", "public", "mail"].map((icon) => (
                <a key={icon} href="#" className="text-slate-400 hover:text-[#13ecec] transition-colors">
                  <span className="material-symbols-outlined">{icon}</span>
                </a>
              ))}
            </div>
          </div>
          {[
            { title: "Resources", links: ["Article Library", "Guided Meditations", "Crisis Support", "Community Forum"] },
            { title: "Company", links: ["About Us", "Our Mission", "Careers", "Contact"] },
            { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">{col.title}</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-[#13ecec] transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-[1200px] mx-auto px-6 mt-12 pt-8 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">© 2024 MindCare Wellness Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}