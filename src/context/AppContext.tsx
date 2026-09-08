import React, { createContext, useContext, useState, useEffect } from 'react';
import { Customer, SolarProject, AppNotification, SystemSettings } from '../types/solar';
import { storageService } from '../services/storage';
import { ExportModule } from '../services/exportImport';

export type AppView =
  | 'dashboard'
  | 'crm_leads'
  | 'crm_customers'
  | 'crm_quotations'
  | 'projects_all'
  | 'projects_stage_filtered'
  | 'customer_control_center'
  | 'finance'
  | 'hrms'
  | 'service'
  | 'reports'
  | 'settings'
  | 'customer_portal';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  text: string;
}

interface AppContextType {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  selectedCustomerId: string | null;
  selectedProjectId: string | null;
  openCustomerControlCenter: (customerId: string, projectId?: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isWhatsAppOpen: boolean;
  whatsAppData: {
    recipientPhone: string;
    recipientName: string;
    type: any;
    data: any;
  } | null;
  openWhatsAppModal: (phone: string, name: string, type: any, data: any) => void;
  closeWhatsAppModal: () => void;
  isImportExportOpen: boolean;
  importExportModule: ExportModule;
  openImportExportModal: (module: ExportModule) => void;
  closeImportExportModal: () => void;
  notifications: AppNotification[];
  unreadNotificationsCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  settings: SystemSettings;
  updateSettings: (newSettings: SystemSettings) => void;
  toasts: ToastMessage[];
  showToast: (text: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  stageFilterKey: string | null;
  setStageFilterKey: (key: string | null) => void;
  refreshTrigger: number;
  triggerRefresh: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<AppView>('dashboard');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>('cust-1');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>('proj-1');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [whatsAppData, setWhatsAppData] = useState<{
    recipientPhone: string;
    recipientName: string;
    type: any;
    data: any;
  } | null>(null);

  const [isImportExportOpen, setIsImportExportOpen] = useState(false);
  const [importExportModule, setImportExportModule] = useState<ExportModule>('Leads');
  const [stageFilterKey, setStageFilterKey] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [settings, setSettings] = useState<SystemSettings>(() => storageService.getSettings());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = () => setRefreshTrigger(prev => prev + 1);

  useEffect(() => {
    setNotifications(storageService.getNotifications());
    setSettings(storageService.getSettings());

    const handleStorageUpdate = () => {
      setNotifications(storageService.getNotifications());
      setSettings(storageService.getSettings());
    };

    window.addEventListener('solarpulse_storage_updated', handleStorageUpdate);
    return () => window.removeEventListener('solarpulse_storage_updated', handleStorageUpdate);
  }, [refreshTrigger]);

  const openCustomerControlCenter = (customerId: string, projectId?: string) => {
    setSelectedCustomerId(customerId);
    if (projectId) {
      setSelectedProjectId(projectId);
    } else {
      const customers = storageService.getCustomers();
      const c = customers.find(item => item.id === customerId);
      if (c && c.activeProjectId) {
        setSelectedProjectId(c.activeProjectId);
      }
    }
    setActiveView('customer_control_center');
  };

  const openWhatsAppModal = (phone: string, name: string, type: any, data: any) => {
    setWhatsAppData({
      recipientPhone: phone,
      recipientName: name,
      type,
      data
    });
    setIsWhatsAppOpen(true);
  };

  const closeWhatsAppModal = () => {
    setIsWhatsAppOpen(false);
    setWhatsAppData(null);
  };

  const openImportExportModal = (module: ExportModule) => {
    setImportExportModule(module);
    setIsImportExportOpen(true);
  };

  const closeImportExportModal = () => {
    setIsImportExportOpen(false);
  };

  const markNotificationRead = (id: string) => {
    storageService.markNotificationAsRead(id);
    setNotifications(storageService.getNotifications());
  };

  const markAllNotificationsRead = () => {
    storageService.markAllNotificationsAsRead();
    setNotifications(storageService.getNotifications());
  };

  const updateSettings = (newSettings: SystemSettings) => {
    storageService.saveSettings(newSettings);
    setSettings(newSettings);
    showToast('System configuration saved successfully', 'success');
  };

  const showToast = (text: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedCustomerId,
        selectedProjectId,
        openCustomerControlCenter,
        isSearchOpen,
        setIsSearchOpen,
        isWhatsAppOpen,
        whatsAppData,
        openWhatsAppModal,
        closeWhatsAppModal,
        isImportExportOpen,
        importExportModule,
        openImportExportModal,
        closeImportExportModal,
        notifications,
        unreadNotificationsCount,
        markNotificationRead,
        markAllNotificationsRead,
        settings,
        updateSettings,
        toasts,
        showToast,
        removeToast,
        stageFilterKey,
        setStageFilterKey,
        refreshTrigger,
        triggerRefresh
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
