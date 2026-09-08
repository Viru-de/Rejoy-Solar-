import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types/solar';

export interface PersonaOption {
  profile: UserProfile;
  description: string;
  badgeColor: string;
}

export const PRESET_PERSONAS: PersonaOption[] = [
  {
    profile: {
      id: 'emp-1',
      name: 'Vikram Patel',
      email: 'vikram.patel@solarpulse.com',
      role: 'Super Admin',
      phone: '+91 98250 11223',
      department: 'Management',
      designation: 'Managing Director'
    },
    description: 'Full system control, financial authority & executive oversight',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
  },
  {
    profile: {
      id: 'emp-2',
      name: 'Amit Sharma',
      email: 'amit.sharma@solarpulse.com',
      role: 'Project Manager',
      phone: '+91 98251 22334',
      department: 'Operations',
      designation: 'Senior Project Manager'
    },
    description: 'Manages all projects, approves workflow stages, coordinates teams',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
  },
  {
    profile: {
      id: 'emp-3',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@solarpulse.com',
      role: 'Site Survey Engineer',
      phone: '+91 98252 33445',
      department: 'Engineering',
      designation: 'Lead Site Survey Engineer'
    },
    description: 'Executes technical surveys, captures GPS & roof feasibility',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
  },
  {
    profile: {
      id: 'emp-4',
      name: 'Priya Verma',
      email: 'priya.verma@solarpulse.com',
      role: 'Sales Manager',
      phone: '+91 98253 44556',
      department: 'Sales',
      designation: 'Sales Manager C&I'
    },
    description: 'Leads, CRM pipeline, quotation builder, customer conversion',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  {
    profile: {
      id: 'emp-5',
      name: 'Rahul Mehta',
      email: 'rahul.mehta@solarpulse.com',
      role: 'Sales Executive',
      phone: '+91 98254 55667',
      department: 'Sales',
      designation: 'Solar Consultant'
    },
    description: 'Handles new inquiries, proposal follow-ups, and lead logging',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
  },
  {
    profile: {
      id: 'emp-6',
      name: 'Dinesh Yadav',
      email: 'dinesh.yadav@solarpulse.com',
      role: 'Structure Team',
      phone: '+91 98255 66778',
      department: 'Structure',
      designation: 'Structure Fabrication Lead'
    },
    description: 'Structure mounting checklists, fabrication photos & tilt alignment',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-300'
  },
  {
    profile: {
      id: 'emp-3-civil',
      name: 'Suresh Patel',
      email: 'suresh.patel@solarpulse.com',
      role: 'Civil Team',
      phone: '+91 98252 88771',
      department: 'Civil',
      designation: 'Civil Foreman'
    },
    description: 'Foundation casting, pedestal waterproofing, civil task checklists',
    badgeColor: 'bg-stone-100 text-stone-800 border-stone-300'
  },
  {
    profile: {
      id: 'emp-7',
      name: 'Manoj Tiwari',
      email: 'manoj.tiwari@solarpulse.com',
      role: 'Installation Team',
      phone: '+91 98256 77889',
      department: 'Installation',
      designation: 'Module Installation Lead'
    },
    description: 'Solar PV module clamping, string cabling, and field safety',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300'
  },
  {
    profile: {
      id: 'emp-8',
      name: 'Ankit Joshi',
      email: 'ankit.joshi@solarpulse.com',
      role: 'Electrical Team',
      phone: '+91 98257 88990',
      department: 'Electrical',
      designation: 'Senior Electrical Engineer'
    },
    description: 'Inverters, ACDB/DCDB, LT breaker tapping, chemical earth pits',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
  },
  {
    profile: {
      id: 'emp-9',
      name: 'Sneha Kulkarni',
      email: 'sneha.kulkarni@solarpulse.com',
      role: 'Accountant',
      phone: '+91 98258 99001',
      department: 'Finance',
      designation: 'Chief Accountant'
    },
    description: 'Payments, invoices, ledger, cash flow, and Tally sync queue',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
  },
  {
    profile: {
      id: 'emp-10',
      name: 'Neha Gupta',
      email: 'neha.gupta@solarpulse.com',
      role: 'HR Manager',
      phone: '+91 98259 00112',
      department: 'HR',
      designation: 'HR & Operations Manager'
    },
    description: 'Employee directory, daily attendance, GPS logs, payroll & leave',
    badgeColor: 'bg-pink-100 text-pink-800 border-pink-300'
  },
  {
    profile: {
      id: 'emp-11',
      name: 'Rohit Verma',
      email: 'rohit.verma@solarpulse.com',
      role: 'Service Manager',
      phone: '+91 98260 11223',
      department: 'Service',
      designation: 'Solar Service & AMC Head'
    },
    description: 'Service breakdown tickets, preventive maintenance, AMC renewals',
    badgeColor: 'bg-yellow-100 text-yellow-800 border-yellow-300'
  },
  {
    profile: {
      id: 'tech-1',
      name: 'Ketan Solanki',
      email: 'ketan.solanki@solarpulse.com',
      role: 'Technician',
      phone: '+91 98261 44556',
      department: 'Service',
      designation: 'Field Solar Technician'
    },
    description: 'On-site breakdown troubleshooting, inverter repair, panel washing',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-300'
  },
  {
    profile: {
      id: 'cust-user-1',
      name: 'J.P. Shah (ABC Industries)',
      email: 'procurement@abcindustries.in',
      role: 'Customer',
      phone: '+91 98795 44321',
      customerId: 'cust-1',
      assignedProjects: ['proj-1']
    },
    description: 'Client Portal: view 100 kW project progress, invoices, warranties',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  }
];

interface AuthContextType {
  currentUser: UserProfile;
  currentRole: UserRole;
  switchPersona: (profile: UserProfile) => void;
  canAccessModule: (moduleName: string) => boolean;
  canApproveStage: () => boolean;
  canEditFinancials: () => boolean;
  canAccessHR: () => boolean;
  isCustomer: boolean;
  isFieldStaff: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('solarpulse_active_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return PRESET_PERSONAS[0].profile; // Default Super Admin
  });

  useEffect(() => {
    localStorage.setItem('solarpulse_active_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const switchPersona = (profile: UserProfile) => {
    setCurrentUser(profile);
  };

  const isCustomer = currentUser.role === 'Customer';
  const isSuperAdmin = currentUser.role === 'Super Admin' || currentUser.role === 'Admin';
  const isProjectManager = currentUser.role === 'Project Manager';
  const isFieldStaff = [
    'Site Survey Engineer',
    'Civil Team',
    'Structure Team',
    'Installation Team',
    'Electrical Team',
    'Technician'
  ].includes(currentUser.role);

  const canApproveStage = (): boolean => {
    return isSuperAdmin || isProjectManager;
  };

  const canEditFinancials = (): boolean => {
    return isSuperAdmin || currentUser.role === 'Accountant';
  };

  const canAccessHR = (): boolean => {
    return isSuperAdmin || currentUser.role === 'HR Manager';
  };

  const canAccessModule = (moduleName: string): boolean => {
    if (isSuperAdmin) return true;

    if (isCustomer) {
      // Customer can ONLY access Customer Portal views
      return ['customer_portal', 'my_project', 'my_documents', 'my_payments', 'service_request'].includes(moduleName);
    }

    switch (moduleName) {
      case 'dashboard':
        return true;
      case 'crm':
      case 'leads':
      case 'quotations':
        return ['Sales Manager', 'Sales Executive', 'Project Manager'].includes(currentUser.role);
      case 'customers':
      case 'projects':
      case 'workflow':
        return true; // All staff can see customer/project context
      case 'site_survey':
        return isSuperAdmin || isProjectManager || currentUser.role === 'Site Survey Engineer' || currentUser.role.includes('Sales');
      case 'finance':
      case 'invoices':
      case 'accounting':
      case 'tally':
        return isSuperAdmin || currentUser.role === 'Accountant';
      case 'hrms':
      case 'employees':
      case 'attendance':
      case 'payroll':
        return isSuperAdmin || currentUser.role === 'HR Manager';
      case 'service':
      case 'amc':
        return isSuperAdmin || isProjectManager || currentUser.role === 'Service Manager' || currentUser.role === 'Technician';
      case 'reports':
        return isSuperAdmin || isProjectManager || currentUser.role === 'Sales Manager' || currentUser.role === 'Accountant';
      case 'settings':
      case 'roles':
        return isSuperAdmin;
      default:
        return true;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole: currentUser.role,
        switchPersona,
        canAccessModule,
        canApproveStage,
        canEditFinancials,
        canAccessHR,
        isCustomer,
        isFieldStaff
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
