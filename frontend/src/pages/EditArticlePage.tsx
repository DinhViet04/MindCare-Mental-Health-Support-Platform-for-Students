import { useState } from "react";

interface VersionEntry {
  id: number;
  label: string;
  modifier: string;
  date: string;
  current?: boolean;
}

const VERSIONS: VersionEntry[] = [
  { id: 1, label: "Current Version (v2.4)", modifier: "Jane Doe", date: "Today, 10:45 AM", current: true },
  { id: 2, label: "Draft Version (v2.3)", modifier: "Oct 23, 2023", date: "04:12 PM" },
  { id: 3, label: "Initial Draft (v1.0)", modifier: "Oct 20, 2023", date: "09:00 AM" },
];

export default function EditArticlePage() {
  const [title, setTitle] = useState("Understanding Mindfulness in Modern Workplace");
  const [content, setContent] = useState(
    `Mindfulness is the psychological process of purposely bringing one's attention to experiences occurring in the present moment without judgment...

In today's fast-paced corporate environment, the ability to remain centered is not just a luxury—it's a critical skill for mental health and productivity. When we focus on the breath, we activate the parasympathetic nervous system, which helps counteract the stress response.

Research from Harvard suggests that wandering minds are less happy. By training ourselves to be present, we can improve our emotional regulation and decrease workplace anxiety significantly.`
  );
  const [status, setStatus] = useState<"Draft" | "Published">("Published");
  const [selectedCategory, setSelectedCategory] = useState("Workplace Wellness");
  const [tags, setTags] = useState(["Mindfulness", "Workplace"]);
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f8] font-['Inter'] text-slate-900">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-[#13ecec]/10 px-6 md:px-40 py-3 bg-[#f6f8f8]">
        <div className="flex items-center gap-4 text-slate-900">
          <span className="material-symbols-outlined text-3xl text-[#13ecec]">psychology</span>
          <h2 className="text-lg font-bold leading-tight tracking-tight">MindCare</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="hidden md:flex items-center gap-9">
            {["Dashboard", "Articles"].map((item) => (
              <a key={item} href="#" className="text-sm font-medium hover:text-[#13ecec] transition-colors">{item}</a>
            ))}
          </div>
          <button className="flex cursor-pointer items-center justify-center rounded-lg h-10 bg-[#13ecec]/10 text-slate-900 px-3 hover:bg-[#13ecec]/20">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
          </button>
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#13ecec]/20"
            style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAeWf5WJedwRqaGUsm-49NudUoImaG5RzxmjOkg7uM8gMf5SFdp2q2Tfkp-8Sn9YV46TG0wcbGx1oboReXibxbC6L7xrEpwxS98NAE5FRN0XSKhOWRRqdI7oH7P9a_aSjDp-4Bm1CEASwup2o4jUaCeA3S2LpIi2H3kroOtxm-Sg-W8YdqbW-fI73DSX3SnYhFt5tyknI-3-JHlqpL87smPPyuRc1OaCp1u90xUgPlQN0QtpkwZ4PP8j5d-B_0Qsd3tFkzfY82rVrv6")` }}
          />
        </div>
      </header>

      <main className="flex-1 flex flex-col px-6 md:px-40 py-6 max-w-[1200px] mx-auto w-full">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap gap-2 mb-6">
          {["Home", "My Articles"].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <a href="#" className="text-[#13ecec] text-sm font-medium">{item}</a>
              <span className="text-[#13ecec]/50 text-sm font-medium">/</span>
            </span>
          ))}
          <span className="text-slate-500 text-sm font-medium">Edit Article</span>
        </nav>

        <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
          <div>
            <h1 className="text-slate-900 tracking-tight text-3xl md:text-4xl font-bold">Edit Article</h1>
            <p className="text-slate-500 text-sm">Last saved: Oct 24, 2023 - 10:45 AM • ID: #MC-9421</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-red-100 text-red-600 text-sm font-semibold hover:bg-red-200 transition-colors">
              <span className="material-symbols-outlined mr-2 text-lg">delete</span>
              Delete
            </button>
            <button className="flex items-center justify-center rounded-lg h-10 px-6 bg-[#13ecec] text-slate-900 text-sm font-bold hover:brightness-110 transition-all">
              Update Article
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Editor column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-[#13ecec]/10 shadow-sm">
              <label className="block mb-6">
                <span className="text-slate-700 text-sm font-semibold mb-2 block">Article Title</span>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-[#13ecec]/20 bg-[#f6f8f8] focus:border-[#13ecec] focus:ring-2 focus:ring-[#13ecec]/30 h-12 text-lg font-medium px-4 outline-none"
                />
              </label>
              <label className="block mb-6">
                <span className="text-slate-700 text-sm font-semibold mb-2 block">Content</span>
                <div className="border border-[#13ecec]/20 rounded-lg overflow-hidden">
                  <div className="bg-[#13ecec]/5 border-b border-[#13ecec]/10 p-2 flex gap-2">
                    {["format_bold", "format_italic", "format_list_bulleted", "link"].map((icon) => (
                      <button key={icon} className="p-1 hover:bg-[#13ecec]/20 rounded">
                        <span className="material-symbols-outlined text-xl">{icon}</span>
                      </button>
                    ))}
                    <button className="p-1 hover:bg-[#13ecec]/20 rounded ml-auto">
                      <span className="material-symbols-outlined text-xl">image</span>
                    </button>
                  </div>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full border-none bg-[#f6f8f8] focus:ring-0 p-4 leading-relaxed resize-none outline-none text-slate-700"
                    rows={15}
                  />
                </div>
              </label>
            </div>

            {/* Version History */}
            <div className="bg-white p-6 rounded-xl border border-[#13ecec]/10 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#13ecec]">history</span>
                Version History
              </h3>
              <div className="space-y-4">
                {VERSIONS.map((v) => (
                  <div
                    key={v.id}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      v.current ? "bg-[#13ecec]/5 border border-[#13ecec]/10" : "hover:bg-slate-50 transition-colors"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`size-8 rounded-full flex items-center justify-center ${
                          v.current ? "bg-[#13ecec]/20 text-[#13ecec]" : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        <span className="material-symbols-outlined">{v.current ? "edit" : "restore"}</span>
                      </div>
                      <div>
                        <p className={`text-sm ${v.current ? "font-semibold" : "font-medium"}`}>{v.label}</p>
                        <p className="text-xs text-slate-500">
                          Modified by {v.modifier} {v.date}
                        </p>
                      </div>
                    </div>
                    <button
                      className={`text-xs font-bold uppercase tracking-wider ${
                        v.current ? "text-[#13ecec]" : "text-slate-400 hover:text-[#13ecec] transition-colors"
                      }`}
                    >
                      {v.current ? "Preview" : "Restore"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publishing Status */}
            <div className="bg-white p-6 rounded-xl border border-[#13ecec]/10 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">Publishing Status</h3>
              <div className="flex h-12 w-full items-center justify-center rounded-xl bg-[#f6f8f8] p-1 mb-4">
                {(["Draft", "Published"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`flex h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-bold transition-all ${
                      status === s
                        ? "bg-white shadow-md text-[#13ecec]"
                        : "text-slate-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="bg-[#13ecec]/10 p-3 rounded-lg flex items-start gap-3">
                <span className="material-symbols-outlined text-[#13ecec] text-lg">info</span>
                <p className="text-xs text-slate-600">
                  Currently live and visible to all users. Updating will push changes immediately.
                </p>
              </div>
            </div>

            {/* Article Settings */}
            <div className="bg-white p-6 rounded-xl border border-[#13ecec]/10 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">Article Settings</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold text-slate-500 block mb-2">Category</span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full rounded-lg border border-[#13ecec]/20 bg-[#f6f8f8] focus:border-[#13ecec] focus:ring-2 focus:ring-[#13ecec]/30 h-10 text-sm px-3 outline-none"
                  >
                    {["Mental Health", "Workplace Wellness", "Meditation", "Psychology"].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-500 block mb-2">Tags</span>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded-full bg-[#13ecec]/20 text-slate-700 text-xs"
                      >
                        {tag}
                        <button onClick={() => removeTag(tag)} className="ml-1 material-symbols-outlined text-[14px]">
                          close
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTag()}
                    className="w-full rounded-lg border border-[#13ecec]/20 bg-[#f6f8f8] focus:border-[#13ecec] h-10 text-sm px-3 outline-none"
                    placeholder="Add tag..."
                  />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-500 block mb-2">Cover Image</span>
                  <div className="relative group aspect-video rounded-lg overflow-hidden border-2 border-dashed border-[#13ecec]/30">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105"
                      style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuArjif25H5z4wONTYDVfRb093Upf_xXzft20x2FS04kimpX0TFWHT9T02UQRA7-4KrhZxZtoEDnwpa8Nuxo--egg-P98JzIqDzMW7WbSfzXZpVfONYlFE6cZTyUIWHIjKyuyqRYdKISqMz45bxeyYC7DThxrt4G_Cp158XSW5q1oz9BFCtrg8tjNgR_Ix52F8hVVxIOXnmzvObq7Q_jdmWEjxOaTlcDo7e-rGvKJy2mP80Ax2Ti4AleW1mGYNtryYG-eFSmnAF-guRc")` }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                      <span className="text-white text-xs font-bold flex items-center">
                        <span className="material-symbols-outlined mr-1">edit</span> Replace Image
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto px-6 md:px-40 py-10 border-t border-[#13ecec]/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#13ecec]">psychology</span>
            <span className="font-bold">MindCare</span>
          </div>
          <p className="text-sm text-slate-500">© 2023 MindCare Editorial. All rights reserved.</p>
          <div className="flex gap-6">
            {["help", "settings"].map((icon) => (
              <a key={icon} href="#" className="text-slate-500 hover:text-[#13ecec] transition-colors">
                <span className="material-symbols-outlined">{icon}</span>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}