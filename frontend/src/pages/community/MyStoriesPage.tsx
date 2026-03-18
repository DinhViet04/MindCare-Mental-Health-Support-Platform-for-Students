import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const MyStoriesPage: React.FC = () => {
  const { user } = useAuth();
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;
    const load = async () => {
      try {
        const res = await api.get(`/stories/user/${user._id}`);
        setStories(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  if (loading) return <div className="text-center py-10">Đang tải...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Bài viết của tôi</h1>
      {stories.length === 0 ? (
        <p className="text-slate-400 text-center py-10">Bạn chưa có bài viết nào.</p>
      ) : (
        <div className="space-y-4">
          {stories.map(s => (
            <div key={s._id} className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
              <h2 className="font-bold text-lg mb-1">{s.title}</h2>
              <p className="text-slate-500 text-sm mb-2">{s.content}</p>
              <div className="flex gap-3 text-xs text-slate-400">
                <span>❤️ {s.likes} likes</span>
                <span>💬 {s.comments.length} comments</span>
                <span>{new Date(s.createdAt).toLocaleDateString('vi-VN')}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyStoriesPage;