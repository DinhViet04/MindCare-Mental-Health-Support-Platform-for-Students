import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Tự động gắn token vào mỗi request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Types ──
export interface Comment {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface Story {
  _id: string;
  author: string;
  authorType: 'anonymous' | 'user';
  category: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  likedBy: string[];
  comments: Comment[];
  createdAt: string;
}

// ── API calls ──
export const storyService = {

  // Lấy tất cả stories
  getAll: async (): Promise<Story[]> => {
    const res = await api.get('/stories');
    return res.data.data;
  },

  // Tạo story mới
  create: async (payload: {
    author: string;
    authorType: string;
    category: string;
    title: string;
    content: string;
    tags: string[];
  }): Promise<Story> => {
    const res = await api.post('/stories', payload);
    return res.data.data;
  },

  // Like / Unlike
  toggleLike: async (storyId: string, userId: string): Promise<Story> => {
    const res = await api.patch(`/stories/${storyId}/like`, { userId });
    return res.data.data;
  },

  // Thêm comment
  addComment: async (storyId: string, payload: {
    author: string;
    content: string;
  }): Promise<Story> => {
    const res = await api.post(`/stories/${storyId}/comments`, payload);
    return res.data.data;
  },
};