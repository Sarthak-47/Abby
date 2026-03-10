import { create } from 'zustand';
import axios from 'axios';
import useAuthStore from './useAuthStore';

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const useChatStore = create((set, get) => ({
    messages: [],
    sessionId: null,
    isTyping: false,
    error: null,

    fetchHistory: async () => {
        try {
            const { data } = await api.get('/chat/history');
            set({ messages: data.messages || [], sessionId: data.sessionId });
        } catch (err) {
            set({ error: err.message });
        }
    },

    sendMessage: async (text) => {
        const { messages, sessionId } = get();
        const tempMsg = { _id: Date.now(), sender: 'USER', content: text, emotionDetected: '...' };
        set({ messages: [...messages, tempMsg], isTyping: true });

        try {
            const { data } = await api.post('/chat/send', { message: text, sessionId });
            set({
                messages: [...messages, data.userMessage, data.aiResponse],
                sessionId: data.sessionId,
                isTyping: false
            });
        } catch (err) {
            set({ error: err.message, isTyping: false });
            set({ messages: messages.filter(m => m._id !== tempMsg._id) });
        }
    }
}));

export default useChatStore;
