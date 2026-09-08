import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Toast } from './components/common/Toast';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { WhatsAppModal } from './components/common/WhatsAppModal';
import { ImportExportModal } from './components/common/ImportExportModal';

import { DashboardView } from './components/views/DashboardView';
import { CustomerControlCenterView } from './components/views/CustomerControlCenterView';
import { CrmView } from './components/views/CrmView';
import { ProjectsView } from './components/views/ProjectsView';
import { FinanceView } from './components/views/FinanceView';
import { HrmsView } from './components/views/HrmsView';
import { ServiceView } from './components/views/ServiceView';
import { ReportsView } from './components/views/ReportsView';
import { SettingsView } from './components/views/SettingsView';
import { CustomerPortalView } from './components/views/CustomerPortalView';

const MainLayout: React.FC = () => {
  const { activeView } = useApp();
  const { isCustomer } = useAuth();

  const renderActiveView = () => {
    // If the active role is Customer and they are on dashboard or customer portal, show customer view
    if (isCustomer && (activeView === 'dashboard' || activeView === 'customer_portal')) {
      return <CustomerPortalView />;
    }

    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'customer_control_center':
        return <CustomerControlCenterView />;
      case 'crm_leads':
        return <CrmView defaultTab="LEADS" />;
      case 'crm_customers':
        return <CrmView defaultTab="CUSTOMERS" />;
      case 'crm_quotations':
        return <CrmView defaultTab="QUOTATIONS" />;
      case 'projects_all':
      case 'projects_stage_filtered':
        return <ProjectsView />;
      case 'finance':
        return <FinanceView />;
      case 'hrms':
        return <HrmsView />;
      case 'service':
        return <ServiceView />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      case 'customer_portal':
        return <CustomerPortalView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 flex flex-col font-sans antialiased selection:bg-amber-100 selection:text-amber-900">
      {/* Top Universal App Header */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Collapsible Navigation Sidebar */}
        <Sidebar />

        {/* Primary Operational Stage Canvas */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-8">
          <div className="max-w-7xl mx-auto">
            {renderActiveView()}
          </div>
        </main>
      </div>

      {/* Mobile Responsive Bottom Navigation */}
      <MobileBottomNav />

      {/* Global Application Modals & Notification Toasters */}
      <GlobalSearchModal />
      <WhatsAppModal />
      <ImportExportModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </AuthProvider>
  );
}
