import { useState } from "react";

export default function ArticleDetailPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="bg-[#f6f8f8] text-slate-900 font-['Inter'] min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-[#f6f8f8]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#13ecec] p-1.5 rounded-lg">
                <span className="material-symbols-outlined text-[#102222] text-2xl font-bold">psychology</span>
              </div>
              <h2 className="text-slate-900 text-xl font-bold tracking-tight">MindCare</h2>
            </div>
            <div className="hidden md:flex flex-1 justify-center max-w-md mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400">search</span>
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border-none bg-slate-100 rounded-xl focus:ring-2 focus:ring-[#13ecec] text-sm transition-all outline-none"
                  placeholder="Search for topics..."
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              {["bookmark", "share"].map((icon) => (
                <button
                  key={icon}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined">{icon}</span>
                </button>
              ))}
              <div className="h-8 w-8 rounded-full bg-[#13ecec]/20 border border-[#13ecec]/30 overflow-hidden">
                <img
                  alt="User Profile"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8MM7iud_mewn-cAVf86DhSQ9i_xVa_VYMBLT9yMGtmQli1KTONspjVADMdcVVi4jMKt9drCKFLP6Cq7WwJu-qY3O0xHgSiF3gT5-sALek815GsyvhaLGAzb8e4IKvpiCxPK7aHjcPhxj8iWwqhUVn-8gWNkqJ6kUd6k3fKBSI3Z3ac-LiXSk0TQ0xR_SiSQNunvL9jnj7uW-2DHJ_miPXH_2lIlB7NeK7jS9Q73CVBDdheidJUd4wNO38rQN6xO81ZvPMIIy_00Vy"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-8">
          {["Home", "Mental Health"].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <a href="#" className="hover:text-[#13ecec] transition-colors">{item}</a>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
            </span>
          ))}
          <span className="text-slate-900">Stress Management</span>
        </nav>

        {/* Article */}
        <article>
          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
              Understanding Mindfulness in Modern Life: A Guide to Inner Peace
            </h1>
            <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-slate-200">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-[#13ecec]/20">
                  <img
                    alt="Author"
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJop0mT76HXmSzW28VauPiZ21qyAOkf7EK3HoeOydZBNx23rowIsv6BZuAJyE0JD-whwsNt30pSpoKma44bk1GyFxysn5xW8ZavYx60w7EymNATBrx3mZoY7tiYW0a_-6LosYXHW8_5nBobzAsYu8LVdEAwrG8gsDElgQ4-LrCSJpueQ8A0AKge1wqZcn3qRlehC5wtihBwJaaP89gKOnW2caFY7MNHoBC_eRIm82F4aaMMU8yMQcIQXDzok0ME7S4WmxA3nGxV1k3"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-slate-900 font-bold">Dr. Sarah Jenkins</p>
                    <span className="material-symbols-outlined text-[#13ecec] text-sm">verified</span>
                  </div>
                  <p className="text-slate-500 text-sm">Clinical Psychologist • Oct 12, 2023 • 8 min read</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#13ecec] text-[#102222] font-bold rounded-lg hover:brightness-110 transition-all">
                  <span className="material-symbols-outlined text-lg">add</span>
                  Follow
                </button>
                <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <span className="material-symbols-outlined text-slate-600">more_horiz</span>
                </button>
              </div>
            </div>
          </header>

          {/* Hero Image */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-xl">
            <img
              alt="Mindfulness Hero"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH2LbG0dRawrhEFJkO3OxsPd8tgE5rZHuHUZ8HModZcsFNh4M0KXbMH27Vv3ljbVXerCjLaPbKG1JAZUFo-uMU47TA6df6uhJ19YYn7nxks5rcbwrxF17wFRw8jgBnm3gLN3eVcvLV0c8qk86ZojJ6DgxyizBL8wFsHP8jAHonOT7EnTK66mCto4H_yro4XYQCV5EGYKnq6Z-1zNvRgnx_Voew29BkxPoAA0EjlEfjvEzj9G36XBy9Lu2bYqu8O5V193QIBt6hZJFl"
            />
            <div className="absolute bottom-4 right-4 bg-[#102222]/50 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs">
              Photo by Unsplash
            </div>
          </div>

          {/* Body */}
          <div className="max-w-none">
            <p className="text-xl leading-relaxed text-slate-700 font-medium mb-8">
              In today's fast-paced digital world, the concept of "being present" has never been more vital—or more difficult to achieve. As we navigate the complexities of modern careers and constant connectivity, mindfulness offers a sanctuary for the mind.
            </p>
            <p className="text-slate-700 leading-relaxed mb-6">
              Mindfulness is the basic human ability to be fully present, aware of where we are and what we're doing, and not overly reactive or overwhelmed by what's going on around us. While mindfulness is something we all naturally possess, it's more readily available to us when we practice it on a daily basis.
            </p>
            <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-900">The Science Behind the Calm</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Research suggests that mindfulness practice can lead to changes in the brain's physical structure. Specifically, it can increase density in the prefrontal cortex, the area responsible for higher-order brain functions such as awareness, concentration, and decision-making.
            </p>
            <div className="my-8 p-6 bg-[#13ecec]/10 border-l-4 border-[#13ecec] rounded-r-xl italic text-slate-800">
              "Mindfulness isn't about clearing your mind of all thoughts. It's about observing your thoughts without judgment and returning your focus to the present moment."
            </div>
            <p className="text-slate-700 leading-relaxed mb-6">
              Whenever you bring awareness to what you're directly experiencing via your senses, or to your state of mind via your thoughts and emotions, you're being mindful. And there's growing research showing that when you train your brain to be mindful, you're actually remodeling the physical structure of your brain.
            </p>
            <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-900">Simple Ways to Practice</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              You don't need a meditation cushion or a silent retreat to begin. You can practice mindfulness while washing the dishes, walking to your car, or even during a stressful meeting. The key is intentionality.
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-8 text-slate-700">
              <li><strong>Set a daily intention:</strong> Start your morning by deciding how you want to feel throughout the day.</li>
              <li><strong>Focus on your breath:</strong> When you feel overwhelmed, take three deep breaths, noticing the sensation of air entering and leaving.</li>
              <li><strong>Eat mindfully:</strong> Notice the texture, smell, and taste of your food instead of scrolling through your phone.</li>
            </ul>
          </div>

          {/* Tags & Share */}
          <div className="mt-16 flex flex-col md:flex-row md:items-center justify-between gap-6 py-8 border-t border-slate-200">
            <div className="flex flex-wrap gap-2">
              {["#Mindfulness", "#MentalHealth", "#SelfCare"].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">{tag}</span>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Share:</span>
              <div className="flex gap-2">
                {["share", "mail", "link"].map((icon) => (
                  <button
                    key={icon}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-[#13ecec] transition-all group"
                  >
                    <span className="material-symbols-outlined text-slate-600 group-hover:text-[#102222]">{icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <section className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-slate-900">Related Articles</h3>
            <a href="#" className="text-[#13ecec] font-bold hover:underline flex items-center gap-1">
              View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                tag: "Physical Well-being",
                title: "The Connection Between Daily Movement and Mental Clarity",
                meta: "5 min read • By Dr. Mark Thompson",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBK3sfMzV8MPIPiAo7WxZ2br4AELAGT98N74NinBUvirEEwC0jhEpbVtsw4e63ifhmASByhbnVp-FAjCqyS22nT7qsS9IunerBKPZcv69Bl2WOVo51kaFp-vRA9Tco5djUyM4YoaSzGOZdLxmq9bEZPV8Y_vjyfuIk0gMQMMGQCPpaS-SYMED7NKmb6WxysRIgzyKzyuE4ndH8_gldiSis_ceyFfdYaQe5omoB8Cro3nfO__oib2G8L9Txflu89xVo_8zqdP1hVCGvP",
              },
              {
                tag: "Habits",
                title: "How Morning Journaling Can Transform Your Productivity",
                meta: "4 min read • By Elena Rivera",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWnRzPwyLQlo8RVcjBEArgiHFUqD-w12H7CJbYowSK4ZZPUzYSvoINoDJNQS0QrQ6U-SdBjYj34ubVyif9x_gkL_gyKkj6otwUmM2_pqnk6SJw6uY_oYFITj8jQl8a9a6835p-Sme4ri36DrQZBqeKGEvH0dxR0ofYFVDizlYXvIuzPVu1VlNXtr962xCFZWyfKKYqCz-LWsnSnwLq_s3FwHMLccxiu2RwzntWCWVnfSZfjREf7h-RpKunS6h1MT2-sc5Ls0usXF6J",
              },
            ].map((article) => (
              <div key={article.title} className="group cursor-pointer">
                <div className="aspect-video rounded-xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all">
                  <img
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={article.img}
                  />
                </div>
                <p className="text-[#13ecec] text-xs font-bold uppercase tracking-widest mb-2">{article.tag}</p>
                <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#13ecec] transition-colors line-clamp-2">{article.title}</h4>
                <p className="text-slate-500 text-sm mt-2">{article.meta}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="mt-20 p-8 md:p-12 rounded-3xl bg-slate-900 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to our Wellness Newsletter</h3>
              <p className="text-slate-400 text-lg">Weekly insights and science-backed tips delivered to your inbox.</p>
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-[#13ecec] outline-none min-w-[300px] text-white placeholder:text-slate-400"
                placeholder="Your email address"
              />
              <button className="px-8 py-3 bg-[#13ecec] text-[#102222] font-bold rounded-xl hover:brightness-110 transition-all whitespace-nowrap">
                Join Now
              </button>
            </div>
          </div>
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#13ecec]/10 rounded-full blur-3xl" />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-24 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="bg-[#13ecec] p-1 rounded-lg">
                <span className="material-symbols-outlined text-[#102222] text-xl font-bold">psychology</span>
              </div>
              <h2 className="text-slate-900 text-lg font-bold">MindCare</h2>
            </div>
            <div className="flex gap-8 text-sm font-medium text-slate-500">
              {["Privacy Policy", "Terms of Service", "Contact"].map((link) => (
                <a key={link} href="#" className="hover:text-[#13ecec] transition-colors">{link}</a>
              ))}
            </div>
            <p className="text-sm text-slate-500">© 2023 MindCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}