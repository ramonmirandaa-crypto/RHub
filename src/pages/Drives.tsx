import { Search, Filter, HardDrive, Folder, FileText, Image as ImageIcon, MoreVertical, Download, Cloud } from "lucide-react";
import { toast } from "sonner";

export default function Drives() {
  const files = [
    { id: 1, name: "Q4 Financial Report.xlsx", type: "file", size: "2.4 MB", modified: "Oct 24, 2023", source: "microsoft", icon: FileText },
    { id: 2, name: "Project Assets", type: "folder", size: "--", modified: "Oct 23, 2023", source: "google", icon: Folder },
    { id: 3, name: "Vacation Photos", type: "folder", size: "--", modified: "Oct 20, 2023", source: "apple", icon: Folder },
    { id: 4, name: "Server Backup.zip", type: "file", size: "1.2 GB", modified: "Oct 15, 2023", source: "nextcloud", icon: HardDrive },
    { id: 5, name: "Design System.fig", type: "file", size: "84 MB", modified: "Oct 10, 2023", source: "google", icon: ImageIcon },
    { id: 6, name: "Client Presentation.pptx", type: "file", size: "15 MB", modified: "Oct 5, 2023", source: "microsoft", icon: FileText },
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

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Unified Drives</h1>
          <p className="text-zinc-500 mt-1">All your cloud files in one place.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search files..." 
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
          <div className="col-span-5 pl-2">Name</div>
          <div className="col-span-2">Modified</div>
          <div className="col-span-2">Size</div>
          <div className="col-span-3 text-right pr-2">Source</div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {files.map((file) => (
            <div 
              key={file.id} 
              className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-100 items-center hover:bg-zinc-50/80 transition-all duration-200 cursor-pointer group"
            >
              <div className="col-span-5 flex items-center gap-3 pl-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${file.type === 'folder' ? 'bg-amber-50/80 text-amber-600 border-amber-100/50' : 'bg-blue-50/80 text-blue-600 border-blue-100/50'}`}>
                  <file.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-zinc-900">{file.name}</h3>
                  <p className="text-xs text-zinc-500 capitalize">{file.type}</p>
                </div>
              </div>
              
              <div className="col-span-2 text-sm text-zinc-600">
                {file.modified}
              </div>
              
              <div className="col-span-2 text-sm text-zinc-600">
                {file.size}
              </div>
              
              <div className="col-span-3 flex items-center justify-end gap-4 pr-2">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getSourceColor(file.source)}`}>
                  {file.source}
                </span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.success(`Downloading ${file.name}`);
                    }}
                    className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-md hover:bg-zinc-100 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.info('File options opened');
                    }}
                    className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-md hover:bg-zinc-100 transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
