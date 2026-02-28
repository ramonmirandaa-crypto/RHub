import { Search, Filter, Phone, Mail, MoreVertical, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function Contacts() {
  const contacts = [
    { id: 1, name: "Sarah Jenkins", role: "Product Manager", company: "TechCorp", email: "sarah@techcorp.com", phone: "+1 (555) 123-4567", location: "San Francisco, CA", source: "google", avatar: "https://picsum.photos/seed/2/40/40" },
    { id: 2, name: "Michael Chen", role: "Lead Engineer", company: "StartupInc", email: "michael@startupinc.io", phone: "+1 (555) 987-6543", location: "New York, NY", source: "microsoft", avatar: "https://picsum.photos/seed/5/40/40" },
    { id: 3, name: "Emily Davis", role: "Designer", company: "CreativeStudio", email: "emily@creative.design", phone: "+1 (555) 456-7890", location: "London, UK", source: "apple", avatar: "https://picsum.photos/seed/6/40/40" },
    { id: 4, name: "David Wilson", role: "Marketing Director", company: "GlobalBrands", email: "david.w@globalbrands.com", phone: "+1 (555) 234-5678", location: "Chicago, IL", source: "google", avatar: "https://picsum.photos/seed/4/40/40" },
    { id: 5, name: "Jessica Taylor", role: "Sales Rep", company: "SalesForce", email: "jtaylor@salesforce.com", phone: "+1 (555) 876-5432", location: "Austin, TX", source: "microsoft", avatar: "https://picsum.photos/seed/7/40/40" },
  ];

  const getSourceColor = (source: string) => {
    switch(source) {
      case 'google': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'microsoft': return 'bg-sky-100 text-sky-700 border-sky-200';
      case 'apple': return 'bg-zinc-100 text-zinc-700 border-zinc-200';
      default: return 'bg-zinc-100 text-zinc-600 border-zinc-200';
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Unified Contacts</h1>
          <p className="text-zinc-500 mt-1">All your contacts in one place.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search contacts..." 
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
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-200/60 bg-zinc-50/50 text-xs font-medium text-zinc-500 uppercase tracking-wider">
          <div className="col-span-4 pl-2">Name</div>
          <div className="col-span-3">Contact Info</div>
          <div className="col-span-3">Location</div>
          <div className="col-span-2 text-right pr-2">Source</div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <div 
              key={contact.id} 
              className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-100 items-center hover:bg-zinc-50/80 transition-all duration-200 cursor-pointer group"
            >
              <div className="col-span-4 flex items-center gap-3 pl-2">
                <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full ring-2 ring-white shadow-sm" referrerPolicy="no-referrer" />
                <div>
                  <h3 className="font-medium text-zinc-900">{contact.name}</h3>
                  <p className="text-xs text-zinc-500">{contact.role} at {contact.company}</p>
                </div>
              </div>
              
              <div className="col-span-3 space-y-1">
                <div className="flex items-center gap-2 text-sm text-zinc-600">
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="truncate">{contact.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-600">
                  <Phone className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{contact.phone}</span>
                </div>
              </div>
              
              <div className="col-span-3 flex items-center gap-2 text-sm text-zinc-600">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>{contact.location}</span>
              </div>
              
              <div className="col-span-2 flex items-center justify-end gap-4 pr-2">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getSourceColor(contact.source)}`}>
                  {contact.source}
                </span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.info('Contact options opened');
                  }}
                  className="p-1 text-zinc-400 hover:text-zinc-600 rounded-md hover:bg-zinc-100 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
