import { Search, Filter, Download, Share2, MoreVertical, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

export default function Photos() {
  const photos = [
    { id: 1, url: "https://picsum.photos/seed/p1/600/400", title: "Beach Vacation", date: "Oct 24, 2023", source: "google" },
    { id: 2, url: "https://picsum.photos/seed/p2/400/600", title: "Family Dinner", date: "Oct 22, 2023", source: "apple" },
    { id: 3, url: "https://picsum.photos/seed/p3/600/600", title: "Hiking Trip", date: "Oct 18, 2023", source: "google" },
    { id: 4, url: "https://picsum.photos/seed/p4/800/600", title: "City Skyline", date: "Oct 15, 2023", source: "microsoft" },
    { id: 5, url: "https://picsum.photos/seed/p5/600/800", title: "Office Party", date: "Oct 10, 2023", source: "nextcloud" },
    { id: 6, url: "https://picsum.photos/seed/p6/800/800", title: "New Puppy", date: "Oct 5, 2023", source: "apple" },
    { id: 7, url: "https://picsum.photos/seed/p7/600/400", title: "Concert", date: "Sep 28, 2023", source: "google" },
    { id: 8, url: "https://picsum.photos/seed/p8/400/600", title: "Road Trip", date: "Sep 20, 2023", source: "microsoft" },
  ];

  const getSourceColor = (source: string) => {
    switch(source) {
      case 'google': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'microsoft': return 'bg-sky-100 text-sky-700 border-sky-200';
      case 'apple': return 'bg-zinc-100 text-zinc-700 border-zinc-200';
      case 'nextcloud': return 'bg-sky-100 text-sky-700 border-sky-200';
      default: return 'bg-zinc-100 text-zinc-600 border-zinc-200';
    }
  };

  const handleAction = (action: string) => {
    toast.success(`Photo ${action} successfully`);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Unified Photos</h1>
          <p className="text-zinc-500 mt-1">All your memories in one place.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search photos..." 
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

      <div className="flex-1 overflow-y-auto pb-8">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200/60 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img 
                src={photo.url} 
                alt={photo.title} 
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider backdrop-blur-md bg-white/90 ${getSourceColor(photo.source)}`}>
                    {photo.source}
                  </span>
                  <button 
                    onClick={() => handleAction('menu opened')}
                    className="p-1.5 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                
                <div>
                  <h3 className="text-white font-medium truncate">{photo.title}</h3>
                  <p className="text-white/80 text-xs mt-0.5">{photo.date}</p>
                  
                  <div className="flex items-center gap-2 mt-3">
                    <button 
                      onClick={() => handleAction('downloaded')}
                      className="flex-1 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Save
                    </button>
                    <button 
                      onClick={() => handleAction('shared')}
                      className="flex-1 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
