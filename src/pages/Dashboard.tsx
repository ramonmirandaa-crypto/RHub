import { Mail, MessageSquare, StickyNote, ArrowRight, Calendar, HardDrive } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Good morning, User</h1>
          <p className="text-zinc-500 mt-1">Here's what's happening across your connected services.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => toast.success('Calendar synced')}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors shadow-sm"
          >
            <Calendar className="w-4 h-4" />
            Sync Calendar
          </button>
          <button 
            onClick={() => toast.info('Composing new message')}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors shadow-sm"
          >
            <Mail className="w-4 h-4" />
            Compose
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Emails Widget */}
        <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-sm hover:shadow-md transition-all duration-300 group/card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50/80 flex items-center justify-center text-blue-600 border border-blue-100/50">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold text-zinc-900">Unread Emails</h2>
                <p className="text-sm text-zinc-500">12 across 3 accounts</p>
              </div>
            </div>
            <Link to="/emails" className="text-zinc-400 hover:text-zinc-900 transition-colors opacity-0 group-hover/card:opacity-100">
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 group cursor-pointer p-2 -mx-2 rounded-lg hover:bg-zinc-50 transition-colors">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-zinc-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    Project Update: Q3 Roadmap
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">Sarah Jenkins • 10m ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Messages Widget */}
        <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-sm hover:shadow-md transition-all duration-300 group/card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50/80 flex items-center justify-center text-emerald-600 border border-emerald-100/50">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold text-zinc-900">Recent Messages</h2>
                <p className="text-sm text-zinc-500">5 new messages</p>
              </div>
            </div>
            <Link to="/messages" className="text-zinc-400 hover:text-zinc-900 transition-colors opacity-0 group-hover/card:opacity-100">
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 group cursor-pointer p-2 -mx-2 rounded-lg hover:bg-zinc-50 transition-colors">
                <img src={`https://picsum.photos/seed/${i}/32/32`} alt="Avatar" className="w-8 h-8 rounded-full ring-2 ring-white" referrerPolicy="no-referrer" />
                <div>
                  <p className="text-sm font-medium text-zinc-900 group-hover:text-emerald-600 transition-colors">
                    Design Team
                  </p>
                  <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">Alex: The new mocks look great!</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes Widget */}
        <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-sm hover:shadow-md transition-all duration-300 group/card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50/80 flex items-center justify-center text-amber-600 border border-amber-100/50">
                <StickyNote className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold text-zinc-900">Recent Notes</h2>
                <p className="text-sm text-zinc-500">Updated today</p>
              </div>
            </div>
            <Link to="/notes" className="text-zinc-400 hover:text-zinc-900 transition-colors opacity-0 group-hover/card:opacity-100">
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-3 rounded-xl bg-zinc-50/50 border border-zinc-200/60 group cursor-pointer hover:border-amber-200 hover:bg-amber-50/30 hover:shadow-sm transition-all">
                <p className="text-sm font-medium text-zinc-900 line-clamp-1 group-hover:text-amber-900">Meeting Notes: Sync</p>
                <p className="text-xs text-zinc-500 mt-1">Last edited 2h ago</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
