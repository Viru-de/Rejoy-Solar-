import React, { useState } from 'react';
import { useAuth, PRESET_PERSONAS } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  Sun,
  Search,
  Bell,
  CheckCheck,
  ChevronDown,
  Menu,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

interface HeaderProps {
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu }) => {
  const { currentUser, switchPersona } = useAuth();
  const {
    setIsSearchOpen,
    notifications,
    unreadNotificationsCount,
    markNotificationRead,
    markAllNotificationsRead,
    openCustomerControlCenter,
    setActiveView
  } = useApp();

  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 bg-white border-b border-slate-200/80 shadow-2xs">
      {/* Left: Mobile hamburger & Brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div
          onClick={() => setActiveView('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-white shadow-xs group-hover:scale-105 transition-transform">
            <Sun className="w-5 h-5" />
          </div>
          <div className="hidden sm:block">
            <span className="text-base font-black tracking-tight text-slate-900 flex items-center gap-1">
              SolarPulse <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-200">EPC</span>
            </span>
            <p className="text-[10px] text-slate-600 font-medium tracking-wide">Turnkey Solar ERP & CRM</p>
          </div>
        </div>
      </div>

      {/* Middle: Global Search Input trigger */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-2 bg-slate-100/80 hover:bg-slate-100 border border-slate-200/80 rounded-xl text-xs text-slate-500 transition-all hover:border-slate-300"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <span className="font-normal">Search leads, customers, projects, quotations, invoices...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 rounded-sm shadow-2xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls: Search Icon (Mobile), Notifications, Persona Switcher */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="md:hidden p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowPersonaMenu(false);
            }}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white shadow-2xs animate-pulse">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Notifications</span>
                  <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 font-bold text-[10px] rounded-full">
                    {unreadNotificationsCount}
                  </span>
                </div>
                {unreadNotificationsCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] font-semibold text-amber-600 hover:text-amber-800 flex items-center gap-1"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <p className="p-6 text-center text-xs text-slate-400">No notifications yet</p>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.customerId) {
                          openCustomerControlCenter(n.customerId, n.projectId);
                        }
                        setShowNotifications(false);
                      }}
                      className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors ${!n.read ? 'bg-amber-50/40' : ''}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900">{n.title}</span>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">
                          {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{n.message}</p>
                      {n.projectName && (
                        <div className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-amber-700">
                          <span>{n.projectName}</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Persona Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowPersonaMenu(!showPersonaMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all bg-white shadow-2xs"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-200 text-amber-800 font-bold flex items-center justify-center text-xs">
              {currentUser.name.charAt(0)}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[110px]">{currentUser.name}</p>
              <p className="text-[10px] font-semibold text-amber-700 leading-tight">{currentUser.role}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
          </button>

          {showPersonaMenu && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95">
              <div className="px-4 pb-2.5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Test Role Personas</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Switch between 15 EPC operational roles</p>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold">
                  1-Click Test
                </span>
              </div>

              <div className="max-h-88 overflow-y-auto p-2 space-y-1">
                {PRESET_PERSONAS.map((item) => {
                  const isSelected = currentUser.id === item.profile.id;
                  return (
                    <div
                      key={item.profile.id}
                      onClick={() => {
                        switchPersona(item.profile);
                        setShowPersonaMenu(false);
                      }}
                      className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-start justify-between gap-2 ${
                        isSelected ? 'bg-amber-50 border border-amber-200/80 shadow-2xs' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{item.profile.name}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold border ${item.badgeColor}`}>
                            {item.profile.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.description}</p>
                      </div>
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
