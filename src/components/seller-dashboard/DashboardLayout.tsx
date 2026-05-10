"use client";

import { useState } from "react";
import { Menu, X, BarChart3, Search, Zap, Wrench } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  header?: React.ReactNode;
}

const tabs = [
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "deep-dive", label: "Deep Dive", icon: Search },
  { id: "diagnostics", label: "Diagnostics", icon: Wrench },
  { id: "actions", label: "Actions", icon: Zap },
];

export function DashboardLayout({
  children,
  activeTab,
  onTabChange,
  header,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-slate-900 text-white transition-all duration-300 overflow-hidden flex flex-col`}
      >
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-lg font-bold">Dashboard</h2>
          <p className="text-sm text-slate-400 mt-1">Seller Tools</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  onTabChange(tab.id);
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-teal-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 text-xs text-slate-400">
          <p>© FashionHero 2026</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        {header ? (
          <div className="flex items-center gap-4 bg-white border-b border-slate-200">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg ml-4"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <div className="flex-1">{header}</div>
          </div>
        ) : (
          <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-slate-900">
                Seller Dashboard
              </h1>
            </div>

            <div className="text-right text-sm text-slate-600">
              <p className="font-medium">Seller Tools</p>
            </div>
          </header>
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
