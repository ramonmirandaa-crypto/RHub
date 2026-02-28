import React, { useState, useMemo } from "react";
import { Plus, Search, Filter, MoreVertical, CheckCircle2, Circle, Calendar as CalendarIcon, Tag, X } from "lucide-react";
import { toast } from "sonner";

export default function Tasks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "", category: "Work", source: "todo" });
  
  const [tasks, setTasks] = useState([
    { id: 1, title: "Review Q4 Roadmap", description: "Review the latest draft and provide feedback.", dueDate: "Today", source: "todo", category: "Work", completed: false },
    { id: 2, title: "Buy groceries", description: "Milk, eggs, bread, and coffee.", dueDate: "Tomorrow", source: "apple", category: "Personal", completed: false },
    { id: 3, title: "Schedule dentist appointment", description: "Call Dr. Smith's office.", dueDate: "Oct 28", source: "keep", category: "Health", completed: true },
    { id: 4, title: "Prepare presentation slides", description: "For the all-hands meeting next week.", dueDate: "Oct 30", source: "todo", category: "Work", completed: false },
    { id: 5, title: "Pay utility bills", description: "Electricity and water bills are due.", dueDate: "Oct 31", source: "apple", category: "Finance", completed: false },
  ]);

  const getSourceColor = (source: string) => {
    switch(source) {
      case 'keep': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'todo': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'apple': return 'bg-zinc-100 text-zinc-700 border-zinc-200';
      default: return 'bg-zinc-100 text-zinc-600 border-zinc-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Work': return 'bg-purple-100 text-purple-700';
      case 'Personal': return 'bg-emerald-100 text-emerald-700';
      case 'Health': return 'bg-rose-100 text-rose-700';
      case 'Finance': return 'bg-amber-100 text-amber-700';
      default: return 'bg-zinc-100 text-zinc-700';
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const newStatus = !task.completed;
        toast.success(newStatus ? 'Task completed' : 'Task uncompleted');
        return { ...task, completed: newStatus };
      }
      return task;
    }));
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      toast.error("Task title is required");
      return;
    }
    
    const task = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate || "No date",
      category: newTask.category,
      source: newTask.source,
      completed: false
    };
    
    setTasks([task, ...tasks]);
    setIsCreateModalOpen(false);
    setNewTask({ title: "", description: "", dueDate: "", category: "Work", source: "todo" });
    toast.success("Task created successfully");
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Unified Tasks</h1>
          <p className="text-zinc-500 mt-1">Manage your to-dos across all services.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
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
            New Task
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-zinc-200/60 shadow-sm overflow-hidden flex flex-col">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-200/60 bg-zinc-50/50 text-xs font-medium text-zinc-500 uppercase tracking-wider">
          <div className="col-span-6 pl-2">Task</div>
          <div className="col-span-2">Due Date</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2 text-right pr-2">Source</div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-zinc-500">
              <CheckCircle2 className="w-12 h-12 mb-4 text-zinc-300" />
              <p>No tasks found.</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div 
                key={task.id} 
                className={`grid grid-cols-12 gap-4 p-4 border-b border-zinc-100 items-center hover:bg-zinc-50/80 transition-all duration-200 cursor-pointer group ${task.completed ? 'opacity-60' : ''}`}
              >
              <div className="col-span-6 flex items-start gap-3 pl-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTask(task.id);
                  }}
                  className="mt-0.5 text-zinc-400 hover:text-indigo-600 transition-colors shrink-0"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>
                <div>
                  <h3 className={`font-medium ${task.completed ? 'text-zinc-500 line-through' : 'text-zinc-900'}`}>
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">{task.description}</p>
                  )}
                </div>
              </div>
              
              <div className="col-span-2 flex items-center gap-1.5 text-sm text-zinc-600">
                <CalendarIcon className="w-3.5 h-3.5 text-zinc-400" />
                <span className={task.dueDate === 'Today' ? 'text-rose-600 font-medium' : ''}>
                  {task.dueDate}
                </span>
              </div>
              
              <div className="col-span-2 flex items-center gap-1.5">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 ${getCategoryColor(task.category)}`}>
                  <Tag className="w-3 h-3" />
                  {task.category}
                </span>
              </div>
              
              <div className="col-span-2 flex items-center justify-end gap-4 pr-2">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getSourceColor(task.source)}`}>
                  {task.source}
                </span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.info('Task options opened');
                  }}
                  className="p-1 text-zinc-400 hover:text-zinc-600 rounded-md hover:bg-zinc-100 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          )))}
        </div>
      </div>

      {/* Create Task Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-zinc-100">
              <h2 className="text-xl font-semibold text-zinc-900">Create New Task</h2>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateTask} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Title</label>
                <input 
                  type="text" 
                  required
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300"
                  placeholder="What needs to be done?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Description</label>
                <textarea 
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300 resize-none h-24"
                  placeholder="Add details..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Due Date</label>
                  <input 
                    type="date" 
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Category</label>
                  <select 
                    value={newTask.category}
                    onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                    className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300"
                  >
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Health">Health</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Save to</label>
                <select 
                  value={newTask.source}
                  onChange={(e) => setNewTask({...newTask, source: e.target.value})}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300"
                >
                  <option value="todo">Microsoft To Do</option>
                  <option value="keep">Google Keep</option>
                  <option value="apple">Apple Reminders</option>
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
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
