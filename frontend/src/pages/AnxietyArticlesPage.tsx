import { useState } from "react";

type FilterTab = "Latest" | "Most Popular" | "Beginner Guides" | "Expert Advice" | "Worksheets";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  image: string;
  featured?: boolean;
}

const ARTICLES: Article[] = [
  {
    id: 1,
    title: "The Science of Silence: How Quiet Time Reshapes Your Nervous System",
    excerpt: "New research shows how intentional silence can reduce cortisol levels and alleviate chronic anxiety symptoms within minutes.",
    tag: "Featured",
    date: "",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMo_9kB9kfUpmio14234eqhV-uPiPj9xD1MZr0mw_YaGEN7nIbxr561aoDMlVA7Dxo-ky0DDyNvRwvjBH26ht4IM6Dl2BhA9CvFcoiqeXEvUka8ObFk3G96fcbFgoEvkmMlkBx_Y2XoUVDdNg9XvtFn2z4kD6qEG6KLNf1_m4AzrJo6Mq2xtc7xUFFCmtCL-SI0p8pG-qTEVRoAqAFD8PhqwD0_bCebQBX6xlj6PiyTX2YZ4bBpvuCvBzScO6HsMM2R3hZEvB2w95C",
    featured: true,
  },
  {
    id: 2,
    title: "5 Grounding Techniques for Panic Attacks",
    excerpt: "Immediate, practical steps you can take to regain control when anxiety feels overwhelming and physical symptoms peak.",
    tag: "Expert Advice",
    date: "Oct 24, 2023",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFGTI6ccABFAM4Ms_Be8u7Xi-EKE83MUl-I4A7iTk8NbX-lnvw0dorBM6DRzDegTsIVPsCho8SE3Avz9NGF3butjHyVNmNH_39HRlaSUfzL1fEuNYSQ7v0iKpAOWRShO0IQNhYPoU8l2o7OmypBeQPPqCO_zUKYoompTNYm4Foq3a9SXe5BvFKgIbXUdngAWrLfWEYRLo0Jyl9tuFs67IHZ7JBS0Y_lPUIk0Mo-kRMj8f0inyLOhhp48MNx9TnboniiZnhwDtj-42A",
  },
  {
    id: 3,
    title: "Social Anxiety in the Digital Age",
    excerpt: "How social media impacts our perception of social interaction and strategies for digital boundaries.",
    tag: "Community",
    date: "Oct 21, 2023",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTXeVs1YL9Dz_4wg6F0LfivUM8I6mu3Dqvb4CPR9A9TAo5R5SU_qHgBtLIZOKsCVN6T0t9S0SOZsVstCpRcWajqV3-qhzuoshPOt04e0t4MoCFNsGkAPtdjEmZQqWGChZwIBpERG1t6QCPTY812UmyO28CaNHpF6_nYi6w6_QjWWm1RuILY4MCMFF2Nv7qQWSVnARtDnIM8RYjrDr0J8lRyRheX9ouqC4FksPwxARzah_VqUdYSD1kvz7rEErMVSZ62UZYdvQigpzv",
  },
  {
    id: 4,
    title: "Cognitive Reframing for Daily Worry",
    excerpt: "A step-by-step guide to challenging your catastrophic thoughts and building a more balanced perspective.",
    tag: "Therapy Insight",
    date: "Oct 18, 2023",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwUGHNSBek_QWnwAmxN55zYyvBjFQ_k-XSBjZhl9KjaIWH8rj1wJGyrPwmYqFUM4lFJn--gmzVZNvM3wd46GBMLloPn1VdSqRvjiicL3aAvqI-gYWFyi7ZNVuSXW_3ECFEDmIKe46i_mXFE7oMkE1D5VOCa2vVxKWlUUk-7OZxfLbGhhoqbZv4wEzSQNmq8KI2b7p24CZAbW39X9-PHtuU4_9lDTX-dhvv7105z1gvla4mk8CRk8yoFBRYHHv-EFm8fzCRWTyX14eS",
  },
  {
    id: 5,
    title: "Nighttime Anxiety: Why It Happens",
    excerpt: "Understanding the biological and psychological reasons why anxiety often peaks when we try to sleep.",
    tag: "Sleep Science",
    date: "Oct 15, 2023",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCe_9cw-6FXaoMT5UPVAJYtXfgPaXXmQxDurHna7Ny8kMGvQk0kDsAxCoFBNJmdDaVL2LAvudS07MEfj6aIsTvcukW7HxOPp0DlnBmdAJ2GWmIK3KO6L2TEciIhpFtiUIprhMZRyhr6k9wikZdtfo6Q5WwpDJDyPF__MAs7N9d31sUCdYTQH4RHhNMZR4aD8j-ksrhvLDqZdB-g80AAebIXryQEJ12H2kTnIQNyhoYfLA2Yxsex0RX8Ja3LTXy7x5IuzJ8ePdSi65l6",
  },
];

const SIDEBAR_CATEGORIES = [
  { icon: "warning", label: "Anxiety", active: true },
  { icon: "air", label: "Stress Management" },
  { icon: "cloud_off", label: "Depression" },
  { icon: "favorite", label: "Self-Care" },
  { icon: "bedtime", label: "Sleep Hygiene" },
  { icon: "mindfulness", label: "Mindfulness" },
];

const FILTER_TABS: FilterTab[] = ["Latest", "Most Popular", "Beginner Guides", "Expert Advice", "Worksheets"];

export default function AnxietyArticlesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("Latest");
  const [currentPage, setCurrentPage] = useState(1);

  const featured = ARTICLES.find((a) => a.featured);
  const rest = ARTICLES.filter((a) => !a.featured);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#f6f8f8] font-['Inter'] text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-[#f6f8f8]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 text-slate-900">
                <div className="flex items-center justify-center size-8 bg-[#13ecec] rounded-lg text-[#102222]">
                  <span className="material-symbols-outlined font-bold">psychology</span>
                </div>
                <h2 className="text-xl font-bold tracking-tight">MindCare</h2>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                {["Articles", "Therapists", "Community"].map((item) => (
                  <a key={item} href="#" className="text-sm font-medium hover:text-[#13ecec] transition-colors">{item}</a>
                ))}
              </nav>
            </div>
            <div className="flex flex-1 justify-end items-center gap-4">
              <div className="hidden sm:block relative w-full max-w-xs">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                  <span className="material-symbols-outlined text-sm">search</span>
                </div>
                <input
                  className="block w-full rounded-full border-none bg-slate-100 py-2 pl-10 pr-3 text-sm placeholder-slate-500 focus:ring-2 focus:ring-[#13ecec] outline-none"
                  placeholder="Search resources..."
                  type="text"
                />
              </div>
              <div className="size-10 rounded-full bg-[#13ecec]/20 flex items-center justify-center border border-[#13ecec]/30 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAi0SbHEqUSWdJe9aJVpzD2mz7bucl8zJXw8a9w_5D_pkvPwUa9HH4seDbgRYkDClz_ZkkDjiPuQKKddiIwKUme-zOq9NuGnu-TDI15o9rAA2-OxIGtjIdY9DSTpf-xVIL8Mny8iSlwMwSHAx6EyivJG1cIq4sDhQVmCy48HuC2K4K7DikjvDmHAo1-pacezQ4h4d8dJjhIcAk29faTzA0xKPf_dVblT_scC9QtnnMj79nnUmSFLFaP9hsjcnEFGdmwVUlhXcNeQJZb"
                  alt="User"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-8 text-sm text-slate-500">
          <a href="#" className="hover:text-[#13ecec]">Home</a>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <a href="#" className="hover:text-[#13ecec]">Articles</a>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-slate-900 font-medium">Anxiety</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Categories</h3>
                <nav className="space-y-1">
                  {SIDEBAR_CATEGORIES.map((cat) => (
                    <a
                      key={cat.label}
                      href="#"
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        cat.active
                          ? "bg-[#13ecec]/10 text-[#13ecec] font-medium"
                          : "hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">{cat.icon}</span>
                      <span>{cat.label}</span>
                    </a>
                  ))}
                </nav>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#13ecec]/20 to-transparent border border-[#13ecec]/20">
                <h4 className="font-bold mb-2">Need Help?</h4>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  Connect with professional therapists specializing in anxiety management.
                </p>
                <button className="w-full py-2 bg-[#13ecec] text-[#102222] text-xs font-bold rounded-lg hover:opacity-90 transition-opacity">
                  Find a Therapist
                </button>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1">
            {/* Category Header */}
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="size-16 rounded-2xl bg-[#13ecec]/10 flex items-center justify-center text-[#13ecec]">
                  <span className="material-symbols-outlined text-4xl">psychology_alt</span>
                </div>
                <div>
                  <h1 className="text-4xl font-black tracking-tight mb-1">Anxiety</h1>
                  <p className="text-slate-500 max-w-2xl text-sm">
                    Understanding and managing anxiety with evidence-based strategies, cognitive behavioral insights, and expert advice for a calmer life.
                  </p>
                </div>
              </div>
              {/* Filter tabs */}
              <div className="flex items-center gap-2 py-4 overflow-x-auto border-b border-slate-200">
                {FILTER_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                      activeFilter === tab
                        ? "bg-slate-900 text-white"
                        : "hover:bg-slate-200 text-slate-600"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Featured */}
              {featured && (
                <article className="md:col-span-2 group">
                  <div className="relative overflow-hidden rounded-2xl bg-slate-100 aspect-[21/9]">
                    <img
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={featured.image}
                      alt={featured.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#102222]/80 via-[#102222]/20 to-transparent flex flex-col justify-end p-8">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#13ecec] text-[#102222] text-xs font-bold w-fit mb-4">
                        Featured
                      </span>
                      <h3 className="text-3xl font-bold text-white mb-2 leading-tight max-w-2xl">{featured.title}</h3>
                      <p className="text-slate-200 mb-4 max-w-xl text-sm">{featured.excerpt}</p>
                      <div className="flex items-center gap-3 text-white text-sm">
                        <img
                          className="size-6 rounded-full border border-white/20"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAv4Kjf_RZ1qkb33QobaL78E1BmqIO01Wc-cOTq_oOQ42a5WJOiL0XE06UmT3eMa08pvWrBOPmpOhCvo422tvPGL3bUeZmXyrT5mkGYGgkGPsU1IQmNW0FHACKS0BNhTBmeqFQnDNkva6i_TApf2MfQbIyGf_3n_YpBX8IuBFLLo6aX2WD0Pn-gBocuVIVly2T-Rtj7XXAtyj1p6TCUYPYNAkIy5ED8Wff3WMyjLxzI5fXku16iXB-vCz0rbgPadDldAvyZ2zQQsMT1"
                          alt="Dr. Sarah Jenkins"
                        />
                        <span>Dr. Sarah Jenkins</span>
                        <span className="opacity-50">•</span>
                        <span>8 min read</span>
                      </div>
                    </div>
                  </div>
                </article>
              )}

              {/* Regular articles */}
              {rest.map((article) => (
                <article key={article.id} className="flex flex-col gap-4 group">
                  <div className="overflow-hidden rounded-xl bg-slate-100 aspect-video">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src={article.image}
                      alt={article.title}
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 group-hover:text-[#13ecec] transition-colors">{article.title}</h4>
                    <p className="text-slate-500 text-sm line-clamp-2 mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-slate-400 uppercase tracking-widest font-bold">
                      <span>{article.tag}</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-center gap-2">
              <button className="size-10 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`size-10 rounded-lg font-medium transition-all ${
                    currentPage === page
                      ? "bg-[#13ecec] text-[#102222] font-bold"
                      : "border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="size-10 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Newsletter */}
      <section className="mt-12 bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Get weekly mental health insights</h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Join 50,000+ others receiving our evidence-based guide to emotional well-being.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              className="flex-1 rounded-lg bg-slate-800 border-none px-4 py-3 text-sm focus:ring-2 focus:ring-[#13ecec] outline-none text-white placeholder:text-slate-400"
              placeholder="Enter your email"
              type="email"
            />
            <button className="bg-[#13ecec] text-[#102222] px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f6f8f8] py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center size-6 bg-[#13ecec] rounded-md text-[#102222]">
              <span className="material-symbols-outlined text-xs font-bold">psychology</span>
            </div>
            <span className="font-bold tracking-tight">MindCare</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
            {["Privacy Policy", "Terms of Service", "Contact Support"].map((link) => (
              <a key={link} href="#" className="hover:text-[#13ecec] transition-colors">{link}</a>
            ))}
          </div>
          <p className="text-xs text-slate-400">© 2023 MindCare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}