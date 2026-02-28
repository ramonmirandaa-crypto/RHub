import { Search, Filter, MessageSquare, Phone, Video, MoreVertical } from "lucide-react";
import { toast } from "sonner";

export default function Messages() {
  const conversations = [
    { id: 1, name: "Design Team", message: "Alex: The new mocks look great!", time: "10:45 AM", unread: 3, source: "teams", avatar: "https://picsum.photos/seed/1/40/40" },
    { id: 2, name: "Sarah Jenkins", message: "Can we sync at 2 PM?", time: "9:30 AM", unread: 0, source: "gchat", avatar: "https://picsum.photos/seed/2/40/40" },
    { id: 3, name: "Family Group", message: "Mom: See you this weekend!", time: "Yesterday", unread: 0, source: "imessage", avatar: "https://picsum.photos/seed/3/40/40" },
    { id: 4, name: "Engineering Sync", message: "David: Deployment successful.", time: "Oct 24", unread: 12, source: "teams", avatar: "https://picsum.photos/seed/4/40/40" },
    { id: 5, name: "Michael Chen", message: "Thanks for the update.", time: "Oct 23", unread: 0, source: "gchat", avatar: "https://picsum.photos/seed/5/40/40" },
  ];

  const getSourceColor = (source: string) => {
    switch(source) {
      case 'teams': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'gchat': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'imessage': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-zinc-100 text-zinc-600 border-zinc-200';
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Unified Messages</h1>
          <p className="text-zinc-500 mt-1">All your chats in one place.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search messages..." 
              className="pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300 transition-all w-64"
            />
          </div>
          <button 
            onClick={() => toast.info('Filter options opened')}
            className="p-2 bg-white border border-zinc-200 rounded-lg text-zinc-600 hover:bg-zinc-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-zinc-200/60 shadow-sm overflow-hidden flex">
        {/* Sidebar */}
        <div className="w-80 border-r border-zinc-200/60 flex flex-col bg-zinc-50/30">
          <div className="p-4 border-b border-zinc-200/60 bg-white">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Find a chat..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300 transition-all"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((chat) => (
              <div 
                key={chat.id} 
                className={`flex items-start gap-3 p-4 border-b border-zinc-100 cursor-pointer transition-all duration-200 ${chat.id === 1 ? 'bg-white shadow-sm ring-1 ring-zinc-200/60 z-10 relative' : 'hover:bg-white/60'}`}
              >
                <div className="relative shrink-0">
                  <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full ring-2 ring-white shadow-sm" referrerPolicy="no-referrer" />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center shadow-sm ${getSourceColor(chat.source)}`}>
                    <MessageSquare className="w-2 h-2" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-medium truncate ${chat.unread > 0 ? 'text-zinc-900' : 'text-zinc-700'}`}>
                      {chat.name}
                    </h3>
                    <span className={`text-xs whitespace-nowrap ${chat.unread > 0 ? 'text-blue-600 font-medium' : 'text-zinc-500'}`}>
                      {chat.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-sm truncate ${chat.unread > 0 ? 'text-zinc-900 font-medium' : 'text-zinc-500'}`}>
                      {chat.message}
                    </p>
                    {chat.unread > 0 && (
                      <span className="shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-[#fbfbfb]">
          <div className="h-16 border-b border-zinc-200/60 bg-white/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <img src={conversations[0].avatar} alt={conversations[0].name} className="w-8 h-8 rounded-full ring-2 ring-white shadow-sm" referrerPolicy="no-referrer" />
              <div>
                <h2 className="font-semibold text-zinc-900">{conversations[0].name}</h2>
                <p className="text-xs text-zinc-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active now
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => toast.success('Starting voice call')}
                className="p-2 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-100 transition-colors"
              >
                <Phone className="w-5 h-5" />
              </button>
              <button 
                onClick={() => toast.success('Starting video call')}
                className="p-2 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-100 transition-colors"
              >
                <Video className="w-5 h-5" />
              </button>
              <div className="w-px h-6 bg-zinc-200 mx-1"></div>
              <button 
                onClick={() => toast.info('Chat options opened')}
                className="p-2 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-100 transition-colors"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto flex flex-col justify-end">
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <span className="text-xs font-medium text-zinc-400 bg-zinc-100 px-3 py-1 rounded-full">Today</span>
              </div>
              
              <div className="flex items-end gap-3">
                <img src="https://picsum.photos/seed/user/32/32" alt="Me" className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
                <div className="bg-white border border-zinc-200 rounded-2xl rounded-bl-none px-4 py-2.5 max-w-md shadow-sm">
                  <p className="text-sm text-zinc-900">Hey team, how are the new mocks coming along?</p>
                  <span className="text-[10px] text-zinc-400 mt-1 block">10:30 AM</span>
                </div>
              </div>
              
              <div className="flex items-end gap-3 flex-row-reverse">
                <img src={conversations[0].avatar} alt="Alex" className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
                <div className="bg-indigo-600 text-white rounded-2xl rounded-br-none px-4 py-2.5 max-w-md shadow-sm">
                  <p className="text-sm">Alex: The new mocks look great!</p>
                  <span className="text-[10px] text-indigo-200 mt-1 block text-right">10:45 AM</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white border-t border-zinc-200/60">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="w-full pl-4 pr-12 py-3 bg-zinc-50/50 border border-zinc-200/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all shadow-sm"
              />
              <button 
                onClick={() => toast.success('Message sent')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
