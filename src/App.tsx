import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Mail, StickyNote, MessageSquare, Settings, Search, Bell, Users, HardDrive, Image as ImageIcon, Menu, ChevronLeft, CheckSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Toaster, toast } from "sonner";
import Dashboard from "./pages/Dashboard";
import Emails from "./pages/Emails";
import Notes from "./pages/Notes";
import Messages from "./pages/Messages";
import Contacts from "./pages/Contacts";
import Drives from "./pages/Drives";
import Photos from "./pages/Photos";
import Tasks from "./pages/Tasks";
import SettingsPage from "./pages/Settings";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function Sidebar({ isCollapsed, toggleCollapse }: { isCollapsed: boolean, toggleCollapse: () => void }) {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Mail, label: "Emails", path: "/emails" },
    { icon: StickyNote, label: "Notes", path: "/notes" },
    { icon: CheckSquare, label: "Tasks", path: "/tasks" },
    { icon: HardDrive, label: "Drives", path: "/drives" },
    { icon: Users, label: "Contacts", path: "/contacts" },
    { icon: MessageSquare, label: "Messages", path: "/messages" },
    { icon: ImageIcon, label: "Photos", path: "/photos" },
  ];

  return (
    <motion.div 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
      className="bg-[#fbfbfb] border-r border-zinc-200/60 flex flex-col h-screen sticky top-0 z-40 overflow-hidden shrink-0"
    >
      <div className="p-6 flex items-center justify-between h-20">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.h1 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="text-xl font-semibold tracking-tight flex items-center gap-2.5 whitespace-nowrap overflow-hidden"
            >
              <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center shadow-sm shrink-0">
                <span className="text-white font-bold text-sm">UH</span>
              </div>
              Unified Hub
            </motion.h1>
          )}
        </AnimatePresence>
        {isCollapsed && (
          <div className="w-8 h-8 mx-auto bg-zinc-900 rounded-lg flex items-center justify-center shadow-sm shrink-0">
            <span className="text-white font-bold text-sm">UH</span>
          </div>
        )}
      </div>
      
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto mt-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              isActive 
                ? "bg-white text-zinc-900 shadow-sm border border-zinc-200/60" 
                : "text-zinc-500 hover:bg-zinc-100/80 hover:text-zinc-900 border border-transparent",
              isCollapsed && "justify-center px-0"
            )}
            title={isCollapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-200/60 space-y-2">
        <NavLink
          to="/settings"
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
            isActive 
              ? "bg-white text-zinc-900 shadow-sm border border-zinc-200/60" 
              : "text-zinc-500 hover:bg-zinc-100/80 hover:text-zinc-900 border border-transparent",
            isCollapsed && "justify-center px-0"
          )}
          title={isCollapsed ? "Settings" : undefined}
        >
          <Settings className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span className="whitespace-nowrap">Settings</span>}
        </NavLink>
      </div>
    </motion.div>
  );
}

function Topbar({ toggleSidebar, isSidebarCollapsed }: { toggleSidebar: () => void, isSidebarCollapsed: boolean }) {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      toast.success(`Searching for: ${e.currentTarget.value}`);
      e.currentTarget.value = '';
    }
  };

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-zinc-200/60 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={toggleSidebar}
          className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
        >
          {isSidebarCollapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
        <div className="relative w-full max-w-md group hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search across all services... (Press Enter)" 
            onKeyDown={handleSearch}
            className="w-full pl-10 pr-4 py-2 bg-zinc-100/50 border border-zinc-200/80 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300 focus:bg-white transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-zinc-200/60 overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-zinc-100 bg-zinc-50/50 flex justify-between items-center">
                  <h3 className="font-semibold text-sm text-zinc-900">Notifications</h3>
                  <button 
                    onClick={() => {
                      toast.success("All notifications marked as read");
                      setShowNotifications(false);
                    }}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <div className="p-4 border-b border-zinc-50 hover:bg-zinc-50 transition-colors cursor-pointer">
                    <p className="text-sm text-zinc-900"><span className="font-semibold">Sarah Jenkins</span> shared a file with you.</p>
                    <p className="text-xs text-zinc-500 mt-1">10 minutes ago</p>
                  </div>
                  <div className="p-4 border-b border-zinc-50 hover:bg-zinc-50 transition-colors cursor-pointer">
                    <p className="text-sm text-zinc-900"><span className="font-semibold">Google Calendar</span>: Sync successful.</p>
                    <p className="text-xs text-zinc-500 mt-1">1 hour ago</p>
                  </div>
                  <div className="p-4 hover:bg-zinc-50 transition-colors cursor-pointer">
                    <p className="text-sm text-zinc-900"><span className="font-semibold">System</span>: New sign-in detected.</p>
                    <p className="text-xs text-zinc-500 mt-1">Yesterday</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div 
          onClick={() => toast.info("Profile settings coming soon")}
          className="w-8 h-8 bg-zinc-200 rounded-full overflow-hidden border border-zinc-200 shadow-sm cursor-pointer hover:ring-2 hover:ring-zinc-200 transition-all"
        >
          <img src="https://picsum.photos/seed/user/100/100" alt="User" referrerPolicy="no-referrer" />
        </div>
      </div>
    </header>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={<PageWrapper><Dashboard /></PageWrapper>} />
        <Route path="/emails" element={<PageWrapper><Emails /></PageWrapper>} />
        <Route path="/notes" element={<PageWrapper><Notes /></PageWrapper>} />
        <Route path="/tasks" element={<PageWrapper><Tasks /></PageWrapper>} />
        <Route path="/drives" element={<PageWrapper><Drives /></PageWrapper>} />
        <Route path="/contacts" element={<PageWrapper><Contacts /></PageWrapper>} />
        <Route path="/messages" element={<PageWrapper><Messages /></PageWrapper>} />
        <Route path="/photos" element={<PageWrapper><Photos /></PageWrapper>} />
        <Route path="/settings" element={<PageWrapper><SettingsPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <Router>
      <div className="flex min-h-screen bg-[#f5f5f5] font-sans">
        <Toaster position="top-right" richColors />
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        />
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar 
            isSidebarCollapsed={isSidebarCollapsed}
            toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
          />
          <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              <AnimatedRoutes />
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}
