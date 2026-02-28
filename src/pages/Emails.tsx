import { Search, Filter, Star, Archive, Trash2, Mail } from "lucide-react";
import { toast } from "sonner";

export default function Emails() {
  const emails = [
    { id: 1, sender: "Google Cloud", subject: "Your invoice is ready", preview: "Your invoice for the period of October 1 - October 31 is now available.", time: "10:23 AM", read: false, source: "gmail" },
    { id: 2, sender: "Sarah Jenkins", subject: "Project Update: Q3 Roadmap", preview: "Hi team, I wanted to share the latest updates on our Q3 roadmap. We're making good progress.", time: "Yesterday", read: true, source: "outlook" },
    { id: 3, sender: "Apple", subject: "Your receipt from Apple", preview: "Thank you for your purchase. Here is your receipt.", time: "Oct 24", read: true, source: "icloud" },
    { id: 4, sender: "GitHub", subject: "[github/docs] New release", preview: "A new release has been published in the github/docs repository.", time: "Oct 23", read: false, source: "gmail" },
    { id: 5, sender: "Microsoft Teams", subject: "You have been added to a team", preview: "You have been added to the 'Design System' team.", time: "Oct 22", read: true, source: "outlook" },
  ];

  const getSourceColor = (source: string) => {
    switch(source) {
      case 'gmail': return 'bg-red-100 text-red-600 border-red-200';
      case 'outlook': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'icloud': return 'bg-zinc-100 text-zinc-600 border-zinc-200';
      default: return 'bg-zinc-100 text-zinc-600 border-zinc-200';
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Unified Inbox</h1>
          <p className="text-zinc-500 mt-1">All your emails in one place.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search emails..." 
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

      <div className="flex-1 bg-white rounded-2xl border border-zinc-200/60 shadow-sm overflow-hidden flex flex-col">
        <div className="flex items-center gap-4 p-4 border-b border-zinc-200/60 bg-zinc-50/50">
          <button 
            onClick={() => toast.success('Emails archived')}
            className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-md hover:bg-zinc-100 transition-colors"
          >
            <Archive className="w-4 h-4" />
          </button>
          <button 
            onClick={() => toast.success('Emails moved to trash')}
            className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-md hover:bg-zinc-100 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-zinc-300 mx-2"></div>
          <button 
            onClick={() => toast.success('Emails marked as read')}
            className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-md hover:bg-zinc-100 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {emails.map((email) => (
            <div 
              key={email.id} 
              className={`flex items-start gap-4 p-4 border-b border-zinc-100 cursor-pointer transition-all duration-200 group/email ${email.read ? 'bg-white hover:bg-zinc-50/80 hover:shadow-sm' : 'bg-blue-50/30 hover:bg-blue-50/60 hover:shadow-sm'}`}
            >
              <div className="flex items-center gap-3 mt-1 opacity-60 group-hover/email:opacity-100 transition-opacity">
                <input 
                  type="checkbox" 
                  className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500" 
                  onClick={(e) => e.stopPropagation()}
                />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.success(email.read ? 'Email starred' : 'Email unstarred');
                  }}
                  className="text-zinc-300 hover:text-amber-400 transition-colors"
                >
                  <Star className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${email.read ? 'text-zinc-700' : 'text-zinc-900'}`}>
                      {email.sender}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getSourceColor(email.source)}`}>
                      {email.source}
                    </span>
                  </div>
                  <span className={`text-xs whitespace-nowrap ${email.read ? 'text-zinc-500' : 'text-blue-600 font-medium'}`}>
                    {email.time}
                  </span>
                </div>
                <p className={`text-sm mb-1 ${email.read ? 'text-zinc-600' : 'text-zinc-900 font-medium'}`}>
                  {email.subject}
                </p>
                <p className="text-sm text-zinc-500 line-clamp-1">
                  {email.preview}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
