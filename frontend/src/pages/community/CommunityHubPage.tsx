import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiMessageCircle, FiShare2, FiMoreHorizontal, FiPlus, FiCheck, FiX } from 'react-icons/fi';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';


// ── Axios instance ──
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Interfaces ──
interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: number;
}

interface Story {
  id: string;
  author: string;
  authorId: string;
  authorType: 'anonymous' | 'user';
  createdAt: number;
  category: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  likedBy: string[];
  comments: Comment[];
  isLiked: boolean;
  showComments: boolean;
}

interface Group {
  id: string;
  name: string;
  members: number;
  active: number;
  isJoined: boolean;
}

// ── Helper: map MongoDB doc → Story UI ──
const mapStory = (s: any, currentUserId?: string): Story => ({
  id:           s._id,
  author:       s.author,
  authorId:     s.authorId || '',
  authorType:   s.authorType,
  createdAt:    new Date(s.createdAt).getTime(),
  category:     s.category,
  title:        s.title,
  content:      s.content,
  tags:         s.tags || [],
  likes:        s.likes,
  likedBy:      s.likedBy || [],
  // isLiked dựa theo userId thực
  isLiked:      currentUserId ? (s.likedBy || []).includes(currentUserId) : false,
  showComments: false,
  comments: (s.comments || []).map((c: any): Comment => ({
    id:        c._id,
    author:    c.author,
    content:   c.content,
    createdAt: new Date(c.createdAt).getTime(),
  })),
});

// ── Helper: thời gian tương đối ──
function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 10) return 'Vừa xong';
  if (seconds < 60) return `${seconds} giây trước`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} ngày trước`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} tuần trước`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} tháng trước`;
  return `${Math.floor(months / 12)} năm trước`;
}

// ────────────────────────────────────────────────────────────────
const CommunityHubPage: React.FC = () => {
  // ── Lấy user đang đăng nhập từ AuthContext ──
  const { user, isAuthenticated } = useAuth();

  const [activeTab, setActiveTab]     = useState<'feed' | 'trending' | 'stories' | 'guidelines'>('feed');
  const [showPostModal, setShowPostModal] = useState(false);
  const [newPost, setNewPost]         = useState({ title: '', content: '', tags: '', isAnonymous: false });
  const [newComments, setNewComments] = useState<{ [key: string]: string }>({});
  const [, setTick]                   = useState(0);

  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  const [groups, setGroups] = useState<Group[]>([
    { id: '1', name: 'Exam Anxiety',       members: 1200, active: 15, isJoined: false },
    { id: '2', name: 'Night Owls Support', members: 850,  active: 4,  isJoined: true  },
  ]);

  // ── Re-render mỗi 30s ──
  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 30_000);
    return () => clearInterval(timer);
  }, []);

  // ── Load stories ──
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await api.get('/stories');
        // truyền userId thực để tính đúng isLiked
        setStories(res.data.data.map((s: any) => mapStory(s, user?._id)));
      } catch {
        setError('Không thể tải dữ liệu. Kiểm tra backend đã chạy chưa.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  // ── Like / Unlike ──
  const handleLike = async (id: string) => {
    if (!isAuthenticated || !user) return;
    try {
      const res = await api.patch(`/stories/${id}/like`, { userId: user._id });
      const updated = res.data.data;
      setStories(prev => prev.map(s =>
        s.id === id
          ? {
              ...s,
              likes:   updated.likes,
              likedBy: updated.likedBy,
              isLiked: (updated.likedBy || []).includes(user._id),
            }
          : s
      ));
    } catch (err) {
      console.error('Like thất bại:', err);
    }
  };

  // ── Toggle comments ──
  const handleToggleComments = (id: string) => {
    setStories(prev => prev.map(s =>
      s.id === id ? { ...s, showComments: !s.showComments } : s
    ));
  };

  // ── Thêm comment ──
  const handleAddComment = async (storyId: string) => {
    const text = newComments[storyId]?.trim();
    if (!text) return;
    // Tên hiển thị: dùng fullName nếu đã login, ngược lại "Khách"
    const commentAuthor = user?.fullName || 'Khách';
    try {
      const res = await api.post(`/stories/${storyId}/comments`, {
        author:   commentAuthor,
        authorId: user?._id || null,
        content:  text,
      });
      const updated = res.data.data;
      setStories(prev => prev.map(s =>
        s.id === storyId
          ? {
              ...s,
              comments: (updated.comments || []).map((c: any): Comment => ({
                id:        c._id,
                author:    c.author,
                content:   c.content,
                createdAt: new Date(c.createdAt).getTime(),
              })),
            }
          : s
      ));
      setNewComments(prev => ({ ...prev, [storyId]: '' }));
    } catch (err) {
      console.error('Comment thất bại:', err);
    }
  };

  // ── Join/Leave group ──
  const handleToggleGroup = (id: string) => {
    setGroups(prev => prev.map(g =>
      g.id === id
        ? { ...g, isJoined: !g.isJoined, members: g.isJoined ? g.members - 1 : g.members + 1 }
        : g
    ));
  };

  // ── Tạo bài mới ──
  const handleCreatePost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    const tags = newPost.tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)
      .map(t => (t.startsWith('#') ? t : `#${t}`));

    // Tên tác giả: ẩn danh hoặc dùng fullName thực
    const authorName = newPost.isAnonymous
      ? 'Anonymous'
      : (user?.fullName || 'Người dùng');

    try {
      const res = await api.post('/stories', {
        author:     authorName,
        authorId:   newPost.isAnonymous ? null : user?._id,
        authorType: newPost.isAnonymous ? 'anonymous' : 'user',
        category:   tags[0] || '#General',
        title:      newPost.title,
        content:    newPost.content,
        tags,
      });
      setStories(prev => [mapStory(res.data.data, user?._id), ...prev]);
      setNewPost({ title: '', content: '', tags: '', isAnonymous: false });
      setShowPostModal(false);
    } catch (err) {
      console.error('Đăng bài thất bại:', err);
    }
  };

  // ── Filter ──
  const filteredStories = activeTab === 'trending'
    ? [...stories].sort((a, b) => b.likes - a.likes)
    : stories;

  const trendingTopics = ['#ExamStress', '#SelfCare', '#SleepHygiene', '#Mindfulness', '#StudentLife', '#FreshmanTips'];

  const guidelines = [
    'Keep it respectful and kind. We are here to support one another.',
    'Protect anonymity. Do not share personal identifying info of others.',
    'No medical advice. Consult professionals for clinical concerns.',
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">

      {/* ── Modal tạo bài ── */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold">Chia sẻ câu chuyện</h2>
              <button onClick={() => setShowPostModal(false)} className="text-slate-400 hover:text-slate-600">
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Hiển thị đang đăng với tên ai */}
            {isAuthenticated && user && !newPost.isAnonymous && (
              <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-slate-50 dark:bg-slate-700 rounded-xl">
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                  {user.fullName?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  Đăng với tên <span className="font-bold">{user.fullName}</span>
                </span>
              </div>
            )}

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Tiêu đề bài viết..."
                value={newPost.title}
                onChange={e => setNewPost(p => ({ ...p, title: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <textarea
                placeholder="Chia sẻ câu chuyện của bạn..."
                rows={5}
                value={newPost.content}
                onChange={e => setNewPost(p => ({ ...p, content: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
              />
              <input
                type="text"
                placeholder="Tags (ví dụ: SelfCare, Stress) — cách nhau bằng dấu phẩy"
                value={newPost.tags}
                onChange={e => setNewPost(p => ({ ...p, tags: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newPost.isAnonymous}
                  onChange={e => setNewPost(p => ({ ...p, isAnonymous: e.target.checked }))}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400">Đăng ẩn danh</span>
              </label>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPostModal(false)}
                className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Huỷ
              </button>
              <button
                onClick={handleCreatePost}
                disabled={!newPost.title.trim() || !newPost.content.trim()}
                className="flex-1 py-3 rounded-xl bg-primary text-slate-900 text-sm font-bold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Đăng bài
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6">

          {/* Hero */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Community Hub</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">A safe space for students to connect, share, and grow together.</p>
          </div>

          {/* Tabs */}
          <div className="border-b border-slate-200 dark:border-slate-700">
            <div className="flex gap-8 overflow-x-auto">
              {(['feed', 'trending', 'stories', 'guidelines'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 pt-4 text-sm font-medium capitalize whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'border-primary text-slate-900 dark:text-white'
                      : 'border-transparent text-slate-500 hover:text-primary'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* ── Main Content ── */}
            <div className="lg:col-span-8 space-y-6">

              {/* Create Post */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                {/* Avatar user thực */}
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                  {isAuthenticated && user
                    ? user.fullName?.charAt(0).toUpperCase()
                    : '👤'}
                </div>
                <button
                  onClick={() => setShowPostModal(true)}
                  className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-500 text-left px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  {isAuthenticated && user
                    ? `Chia sẻ điều gì đó, ${user.fullName?.split(' ').pop()}...`
                    : 'Share a story or ask for support anonymously...'}
                </button>
              </div>

              {/* Featured Groups */}
              {activeTab === 'feed' && (
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Featured Groups</h2>
                    <Link to="/community/groups" className="text-primary text-sm font-semibold hover:underline">View All</Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {groups.map(group => (
                      <div key={group.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/40 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">🧠</div>
                          <div className="flex-1">
                            <h3 className="font-bold">{group.name}</h3>
                            <p className="text-sm text-slate-500">{group.members.toLocaleString()} members • {group.active} active now</p>
                          </div>
                          <button
                            onClick={() => handleToggleGroup(group.id)}
                            className={`p-2 rounded-lg transition-colors ${group.isJoined ? 'bg-primary text-slate-900' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
                          >
                            {group.isJoined ? <FiCheck className="w-5 h-5" /> : <FiPlus className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Stories / Feed */}
              {activeTab !== 'guidelines' && (
                <section>
                  <h2 className="text-xl font-bold mb-4">
                    {activeTab === 'trending' ? '🔥 Trending Stories' : 'Recent Stories'}
                  </h2>

                  {loading && (
                    <div className="text-center py-12 text-slate-400 text-sm">Đang tải dữ liệu...</div>
                  )}
                  {!loading && error && (
                    <div className="text-center py-12 text-red-400 text-sm">{error}</div>
                  )}
                  {!loading && !error && filteredStories.length === 0 && (
                    <div className="text-center py-12 text-slate-400 text-sm">
                      Chưa có bài viết nào. Hãy là người đầu tiên chia sẻ!
                    </div>
                  )}

                  {!loading && !error && (
                    <div className="space-y-4">
                      {filteredStories.map(story => (
                        <article key={story.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                                  {story.authorType === 'anonymous'
                                    ? '🎭'
                                    : story.author.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <p className="text-sm font-bold">{story.author}</p>
                                  <p className="text-xs text-slate-500">
                                    {getTimeAgo(story.createdAt)} in {story.category}
                                  </p>
                                </div>
                              </div>
                              <button className="text-slate-400 hover:text-primary">
                                <FiMoreHorizontal className="w-5 h-5" />
                              </button>
                            </div>

                            <h3 className="text-lg font-bold mb-2">{story.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{story.content}</p>

                            <div className="flex flex-wrap gap-2">
                              {story.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-medium text-slate-600 dark:text-slate-400">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-700 flex items-center gap-6">
                            <button
                              onClick={() => handleLike(story.id)}
                              disabled={!isAuthenticated}
                              title={!isAuthenticated ? 'Đăng nhập để like' : ''}
                              className={`flex items-center gap-2 transition-colors ${
                                story.isLiked
                                  ? 'text-red-500'
                                  : 'text-slate-500 hover:text-red-500'
                              } disabled:opacity-40 disabled:cursor-not-allowed`}
                            >
                              <FiHeart className={`w-5 h-5 ${story.isLiked ? 'fill-current' : ''}`} />
                              <span className="text-sm font-medium">{story.likes}</span>
                            </button>
                            <button
                              onClick={() => handleToggleComments(story.id)}
                              className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors"
                            >
                              <FiMessageCircle className="w-5 h-5" />
                              <span className="text-sm font-medium">{story.comments.length}</span>
                            </button>
                            <button className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors ml-auto">
                              <FiShare2 className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Comments */}
                          {story.showComments && (
                            <div className="px-6 pb-5 bg-slate-50 dark:bg-slate-700/50 space-y-3">
                              {story.comments.length === 0 && (
                                <p className="text-sm text-slate-400 text-center py-2">Chưa có comment nào. Hãy là người đầu tiên!</p>
                              )}
                              {story.comments.map(c => (
                                <div key={c.id} className="flex gap-3">
                                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                                    {c.author.charAt(0).toUpperCase()}
                                  </div>
                                  <div className="bg-white dark:bg-slate-800 rounded-xl px-4 py-2 flex-1">
                                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{c.author}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{c.content}</p>
                                    <p className="text-xs text-slate-400 mt-1">{getTimeAgo(c.createdAt)}</p>
                                  </div>
                                </div>
                              ))}
                              <div className="flex gap-2 pt-2">
                                <input
                                  type="text"
                                  placeholder={
                                    isAuthenticated
                                      ? `Bình luận với tên ${user?.fullName}...`
                                      : 'Viết comment...'
                                  }
                                  value={newComments[story.id] || ''}
                                  onChange={e => setNewComments(p => ({ ...p, [story.id]: e.target.value }))}
                                  onKeyDown={e => e.key === 'Enter' && handleAddComment(story.id)}
                                  className="flex-1 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-primary"
                                />
                                <button
                                  onClick={() => handleAddComment(story.id)}
                                  className="px-4 py-2 bg-primary text-slate-900 rounded-full text-sm font-bold hover:opacity-90"
                                >
                                  Gửi
                                </button>
                              </div>
                            </div>
                          )}
                        </article>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Guidelines */}
              {activeTab === 'guidelines' && (
                <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
                  <h2 className="text-2xl font-bold mb-6">Community Guidelines</h2>
                  <div className="space-y-4">
                    {guidelines.map((g, i) => (
                      <div key={i} className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                        <span className="text-primary font-bold text-lg">{i + 1}.</span>
                        <p className="text-slate-600 dark:text-slate-400">{g}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Sidebar ── */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                <h2 className="text-lg font-bold mb-4">Trending Topics</h2>
                <div className="flex flex-wrap gap-2">
                  {trendingTopics.map(topic => (
                    <button
                      key={topic}
                      onClick={() => setActiveTab('trending')}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm font-medium hover:bg-primary/20 hover:text-primary transition-all"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                <h2 className="text-lg font-bold mb-4">⚖️ Safety Guidelines</h2>
                <ul className="space-y-3">
                  {guidelines.map((g, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <span className="text-primary font-bold">{i + 1}.</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-6 py-2.5 rounded-lg border border-primary text-primary text-sm font-bold hover:bg-primary/5 transition-colors">
                  Read Full Guidelines
                </button>
              </div>

              <div className="bg-primary/10 rounded-xl p-5 border border-primary/20">
                <h2 className="text-lg font-bold mb-4">Next Workshop</h2>
                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg flex items-center gap-4">
                  <div className="flex flex-col items-center justify-center bg-primary text-slate-900 font-bold px-3 py-1 rounded-md">
                    <span className="text-xs uppercase">Oct</span>
                    <span className="text-lg">24</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">Stress-Free Finals Prep</p>
                    <p className="text-xs text-slate-500">6:00 PM • Zoom</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default CommunityHubPage;