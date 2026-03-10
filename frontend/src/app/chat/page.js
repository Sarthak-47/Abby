'use client';

import { useState, useEffect, useRef } from 'react';
import useChatStore from '../../store/useChatStore';
import { Send, Loader2 } from 'lucide-react';

export default function ChatPage() {
    const { messages, fetchHistory, sendMessage, isTyping } = useChatStore();
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() && !isTyping) {
            sendMessage(input);
            setInput('');
        }
    };

    const getEmotionColor = (emotion) => {
        switch (emotion) {
            case 'sadness': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'anxiety': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'anger': return 'bg-red-100 text-red-800 border-red-200';
            case 'overthinking': return 'bg-purple-100 text-purple-800 border-purple-200';
            default: return 'bg-slate-100 text-slate-600 border-slate-200';
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 relative">
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
                {messages.map((msg, idx) => {
                    const isUser = msg.sender === 'USER';
                    return (
                        <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[75%] rounded-2xl p-4 shadow-sm ${isUser ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'}`}>
                                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                {isUser && msg.emotionDetected && msg.emotionDetected !== 'neutral' && msg.emotionDetected !== 'unknown' && msg.emotionDetected !== '...' && (
                                    <div className={`text-[10px] mt-2 px-2 py-0.5 rounded-full inline-block border font-medium ${getEmotionColor(msg.emotionDetected)}`}>
                                        detected: {msg.emotionDetected}
                                    </div>
                                )}
                                {msg.emotionDetected === '...' && (
                                    <div className="text-[10px] mt-2 px-2 py-0.5 rounded-full inline-block border bg-slate-100 text-slate-500">
                                        analyzing emotion...
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none p-4 shadow-sm flex items-center space-x-2">
                            <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
                            <span className="text-sm text-slate-500">Abby is typing...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-slate-100">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex items-center bg-slate-50 rounded-full border border-slate-200 pr-2 pl-6 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                    <input
                        type="text"
                        className="flex-1 bg-transparent outline-none text-slate-700 disabled:opacity-50"
                        placeholder="Type your message to Abby..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isTyping}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isTyping}
                        className="p-3 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white transition-colors disabled:opacity-50 disabled:bg-slate-300 ml-2"
                    >
                        <Send className="w-5 h-5 ml-0.5" />
                    </button>
                </form>
            </div>
        </div>
    );
}
