import Sidebar from '../../components/Sidebar';

export default function ToolsLayout({ children }) {
    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-auto p-8 relative">
                {children}
            </div>
        </div>
    );
}
