import React, { useState, useMemo } from "react";
import { Plus, Search, Filter, MoreVertical, StickyNote, X } from "lucide-react";
import { toast } from "sonner";

export default function Notes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "", source: "keep" });
  
  const [notes, setNotes] = useState([
    { id: 1, title: "Meeting Notes: Sync", content: "Discussed the new roadmap and timeline for Q4. Action items: 1. Finalize designs by Friday. 2. Schedule review with stakeholders.", date: "Today", source: "keep", color: "bg-yellow-50" },
    { id: 2, title: "Grocery List", content: "- Milk\n- Eggs\n- Bread\n- Apples\n- Coffee", date: "Yesterday", source: "apple", color: "bg-white" },
    { id: 3, title: "Project Ideas", content: "1. Unified Hub for all services\n2. AI-powered email assistant\n3. Smart calendar scheduling", date: "Oct 24", source: "onenote", color: "bg-purple-50" },
    { id: 4, title: "Books to Read", content: "1. The Design of Everyday Things\n2. Thinking, Fast and Slow\n3. Atomic Habits", date: "Oct 20", source: "keep", color: "bg-blue-50" },
    { id: 5, title: "Travel Itinerary", content: "Flight details: UA 123, departing at 8:00 AM. Hotel: The Grand, checking in at 3:00 PM.", date: "Oct 15", source: "apple", color: "bg-white" },
    { id: 6, title: "Workout Plan", content: "Monday: Chest & Triceps\nWednesday: Back & Biceps\nFriday: Legs & Core", date: "Oct 10", source: "onenote", color: "bg-green-50" },
  ]);

  const getSourceColor = (source: string) => {
    switch(source) {
      case 'keep': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'onenote': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'apple': return 'bg-zinc-100 text-zinc-700 border-zinc-200';
      default: return 'bg-zinc-100 text-zinc-600 border-zinc-200';
    }
  };

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.title.trim()) {
      toast.error("Note title is required");
      return;
    }
    
    const note = {
      id: Date.now(),
      title: newNote.title,
      content: newNote.content,
      date: "Just now",
      source: newNote.source,
      color: "bg-white"
    };
    
    setNotes([note, ...notes]);
    setIsCreateModalOpen(false);
    setNewNote({ title: "", content: "", source: "keep" });
    toast.success("Note created successfully");
  };

  const filteredNotes = useMemo(() => {
    return notes.filter(note => 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [notes, searchQuery]);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Unified Notes</h1>
          <p className="text-zinc-500 mt-1">All your notes in one place.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search notes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300 transition-all w-64"
            />
          </div>
          <button 
            onClick={() => toast.info('Filter options opened')}
            className="p-2 bg-white border border-zinc-200 rounded-lg text-zinc-600 hover:bg-zinc-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Note
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500">
            <StickyNote className="w-12 h-12 mb-4 text-zinc-300" />
            <p>No notes found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div 
                key={note.id} 
                className={`rounded-2xl border border-zinc-200/60 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer relative group ${note.color}`}
              >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.info('Note options opened');
                  }}
                  className="p-1 text-zinc-400 hover:text-zinc-600 rounded-md hover:bg-black/5 transition-colors"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getSourceColor(note.source)}`}>
                  {note.source}
                </span>
              </div>
              
              <h3 className="font-semibold text-zinc-900 mb-2">{note.title}</h3>
              <p className="text-sm text-zinc-600 whitespace-pre-line line-clamp-4 mb-4">
                {note.content}
              </p>
              
              <div className="flex items-center justify-between text-xs text-zinc-500 mt-auto pt-4 border-t border-black/5">
                <span>{note.date}</span>
                <StickyNote className="w-3.5 h-3.5 opacity-50" />
              </div>
            </div>
          ))}
        </div>
        )}
      </div>

      {/* Create Note Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-zinc-100">
              <h2 className="text-xl font-semibold text-zinc-900">Create New Note</h2>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateNote} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Title</label>
                <input 
                  type="text" 
                  required
                  value={newNote.title}
                  onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300"
                  placeholder="Note title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Content</label>
                <textarea 
                  value={newNote.content}
                  onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300 resize-none h-32"
                  placeholder="Write your note here..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Save to</label>
                <select 
                  value={newNote.source}
                  onChange={(e) => setNewNote({...newNote, source: e.target.value})}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300"
                >
                  <option value="keep">Google Keep</option>
                  <option value="apple">Apple Notes</option>
                  <option value="onenote">Microsoft OneNote</option>
                </select>
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  Create Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
