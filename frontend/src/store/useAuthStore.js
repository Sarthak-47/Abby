import { create } from 'zustand';
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import axios from 'axios';

const useAuthStore = create((set, get) => ({
    user: null,
    token: null,
    loading: true,
    error: null,

    initializeAuth: () => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const token = await user.getIdToken();
                    const res = await axios.post('http://localhost:5000/api/auth/sync', {}, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    set({ user: res.data.user, token, loading: false });
                } catch (e) {
                    console.error('Auth sync error:', e);
                    set({ error: e.message, loading: false });
                }
            } else {
                set({ user: null, token: null, loading: false });
            }
        });
        return unsubscribe;
    },

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    signup: async (email, password) => {
        set({ loading: true, error: null });
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    logout: async () => {
        await signOut(auth);
        set({ user: null, token: null });
    }
}));

export default useAuthStore;
