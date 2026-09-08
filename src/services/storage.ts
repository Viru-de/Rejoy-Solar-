import {
  SolarProject,
  Customer,
  Lead,
  ProjectStage,
  PaymentRecord,
  ExpenseRecord,
  Employee,
  AttendanceRecord,
  ServiceTicket,
  AMCContract,
  AppNotification,
  SystemSettings,
  SiteSurveyData,
  Quotation,
  WorkflowStageKey,
  StageStatus,
  LeadStatus
} from '../types/solar';

const STORAGE_KEYS = {
  LEADS: 'solar_erp_leads_v2',
  CUSTOMERS: 'solar_erp_customers_v2',
  PROJECTS: 'solar_erp_projects_v2',
  PAYMENTS: 'solar_erp_payments_v2',
  EXPENSES: 'solar_erp_expenses_v2',
  EMPLOYEES: 'solar_erp_employees_v2',
  ATTENDANCE: 'solar_erp_attendance_v2',
  SERVICE_TICKETS: 'solar_erp_service_tickets_v2',
  AMC_CONTRACTS: 'solar_erp_amc_contracts_v2',
  NOTIFICATIONS: 'solar_erp_notifications_v2',
  SETTINGS: 'solar_erp_settings_v2',
  SURVEYS: 'solar_erp_surveys_v2',
  QUOTATIONS: 'solar_erp_quotations_v2',
};

// Initial realistic data
const initialEmployees: Employee[] = [
  {
    id: 'emp-1',
    employeeCode: 'EMP001',
    name: 'Vikram Patel',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    department: 'Management',
    designation: 'Managing Director & Super Admin',
    phone: '+91 98250 11223',
    email: 'vikram.patel@solarpulse.com',
    joiningDate: '2021-01-15',
    salaryMonthly: 180000,
    status: 'ACTIVE'
  },
  {
    id: 'emp-2',
    employeeCode: 'EMP002',
    name: 'Amit Sharma',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    department: 'Operations',
    designation: 'Senior Project Manager',
    phone: '+91 98251 22334',
    email: 'amit.sharma@solarpulse.com',
    joiningDate: '2021-04-01',
    salaryMonthly: 95000,
    status: 'ACTIVE'
  },
  {
    id: 'emp-3',
    employeeCode: 'EMP003',
    name: 'Rajesh Kumar',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    department: 'Engineering',
    designation: 'Lead Site Survey & Civil Engineer',
    phone: '+91 98252 33445',
    email: 'rajesh.kumar@solarpulse.com',
    joiningDate: '2022-02-10',
    salaryMonthly: 65000,
    status: 'IN FIELD',
    currentSiteLocation: 'Sanand Industrial Estate, Plot 42'
  },
  {
    id: 'emp-4',
    employeeCode: 'EMP004',
    name: 'Priya Verma',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    department: 'Sales',
    designation: 'Sales Manager - Commercial & Industrial',
    phone: '+91 98253 44556',
    email: 'priya.verma@solarpulse.com',
    joiningDate: '2021-08-15',
    salaryMonthly: 75000,
    status: 'ACTIVE'
  },
  {
    id: 'emp-5',
    employeeCode: 'EMP005',
    name: 'Rahul Mehta',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150',
    department: 'Sales',
    designation: 'Solar Sales Executive',
    phone: '+91 98254 55667',
    email: 'rahul.mehta@solarpulse.com',
    joiningDate: '2023-03-01',
    salaryMonthly: 45000,
    status: 'ACTIVE'
  },
  {
    id: 'emp-6',
    employeeCode: 'EMP006',
    name: 'Dinesh Yadav',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    department: 'Structure',
    designation: 'Structure Fabrication Lead',
    phone: '+91 98255 66778',
    email: 'dinesh.yadav@solarpulse.com',
    joiningDate: '2022-06-15',
    salaryMonthly: 48000,
    status: 'IN FIELD'
  },
  {
    id: 'emp-7',
    employeeCode: 'EMP007',
    name: 'Manoj Tiwari',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150',
    department: 'Installation',
    designation: 'Solar Module Installation Lead',
    phone: '+91 98256 77889',
    email: 'manoj.tiwari@solarpulse.com',
    joiningDate: '2022-09-01',
    salaryMonthly: 46000,
    status: 'IN FIELD'
  },
  {
    id: 'emp-8',
    employeeCode: 'EMP008',
    name: 'Ankit Joshi',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
    department: 'Electrical',
    designation: 'Senior Electrical Engineer (LT/HT)',
    phone: '+91 98257 88990',
    email: 'ankit.joshi@solarpulse.com',
    joiningDate: '2021-11-20',
    salaryMonthly: 62000,
    status: 'ACTIVE'
  },
  {
    id: 'emp-9',
    employeeCode: 'EMP009',
    name: 'Sneha Kulkarni',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
    department: 'Finance',
    designation: 'Chief Accountant & Tally Specialist',
    phone: '+91 98258 99001',
    email: 'sneha.kulkarni@solarpulse.com',
    joiningDate: '2021-03-10',
    salaryMonthly: 68000,
    status: 'ACTIVE'
  },
  {
    id: 'emp-10',
    employeeCode: 'EMP010',
    name: 'Neha Gupta',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    department: 'HR',
    designation: 'HR & Admin Manager',
    phone: '+91 98259 00112',
    email: 'neha.gupta@solarpulse.com',
    joiningDate: '2022-01-05',
    salaryMonthly: 58000,
    status: 'ACTIVE'
  },
  {
    id: 'emp-11',
    employeeCode: 'EMP011',
    name: 'Rohit Verma',
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150',
    department: 'Service',
    designation: 'Service Manager & Solar Technician',
    phone: '+91 98260 11223',
    email: 'rohit.verma@solarpulse.com',
    joiningDate: '2022-08-12',
    salaryMonthly: 52000,
    status: 'ACTIVE'
  }
];

const initialCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'ABC Industries Ltd.',
    companyName: 'ABC Heavy Engineering Private Limited',
    customerType: 'Industrial',
    phone: '+91 98795 44321',
    email: 'procurement@abcindustries.in',
    siteAddress: 'Plot No. 42-45, GIDC Industrial Estate, Sanand',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '382110',
    gstNumber: '24AAACA1234F1Z5',
    electricityConsumerNo: 'SAN-HT-99210',
    sanctionedLoadKw: 150,
    status: 'ACTIVE',
    activeProjectId: 'proj-1',
    createdAt: '2026-08-10T09:00:00Z',
    updatedAt: '2026-09-06T14:30:00Z'
  },
  {
    id: 'cust-2',
    name: 'Zenith Textiles Mills',
    companyName: 'Zenith Spinning & Weaving Ltd.',
    customerType: 'Industrial',
    phone: '+91 98240 88776',
    email: 'planthead@zenithtextiles.com',
    siteAddress: 'Survey No. 118, NH-48, Sachin',
    city: 'Surat',
    state: 'Gujarat',
    pincode: '394230',
    gstNumber: '24AAACZ5678G2Z4',
    electricityConsumerNo: 'SUR-HT-44812',
    sanctionedLoadKw: 350,
    status: 'ACTIVE',
    activeProjectId: 'proj-2',
    createdAt: '2026-07-15T11:00:00Z',
    updatedAt: '2026-09-05T16:00:00Z'
  },
  {
    id: 'cust-3',
    name: 'Apex Super Specialty Hospital',
    companyName: 'Apex Healthcare Foundation',
    customerType: 'Commercial',
    phone: '+91 98255 12345',
    email: 'admin@apexhospital.org',
    siteAddress: 'Ring Road, Near Judges Bungalow, Bodakdev',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380054',
    gstNumber: '24AABCA9012H3Z1',
    electricityConsumerNo: 'AHM-LT-55421',
    sanctionedLoadKw: 60,
    status: 'ACTIVE',
    activeProjectId: 'proj-3',
    createdAt: '2026-08-20T10:30:00Z',
    updatedAt: '2026-09-04T12:00:00Z'
  },
  {
    id: 'cust-4',
    name: 'GreenTech Logistics Hub',
    companyName: 'GreenTech Warehousing LLP',
    customerType: 'Commercial',
    phone: '+91 97277 65432',
    email: 'operations@greentechlogistics.in',
    siteAddress: 'Warehousing Zone, Changodar',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '382213',
    gstNumber: '24AAAFG3456J4Z7',
    electricityConsumerNo: 'CHN-HT-12345',
    sanctionedLoadKw: 80,
    status: 'COMPLETED',
    activeProjectId: 'proj-4',
    createdAt: '2026-05-10T08:00:00Z',
    updatedAt: '2026-08-28T17:00:00Z'
  },
  {
    id: 'cust-5',
    name: 'Sunrise Cold Storage & Agro',
    companyName: 'Sunrise Agri Infrastructure Pvt Ltd',
    customerType: 'Agricultural',
    phone: '+91 98980 11998',
    email: 'info@sunrisecoldstorage.com',
    siteAddress: 'Mahuva Highway, Talaja Road',
    city: 'Bhavnagar',
    state: 'Gujarat',
    pincode: '364140',
    gstNumber: '24AAACS7890K5Z9',
    electricityConsumerNo: 'BHV-HT-88712',
    sanctionedLoadKw: 120,
    status: 'ACTIVE',
    activeProjectId: 'proj-5',
    createdAt: '2026-07-01T09:15:00Z',
    updatedAt: '2026-09-02T11:45:00Z'
  }
];

const initialLeads: Lead[] = [
  {
    id: 'lead-1',
    customerName: 'Shree Ram Plastics',
    companyName: 'Shree Ram Polyfilms Pvt Ltd',
    phone: '+91 98251 77123',
    email: 'purchase@shreeramfilms.com',
    address: 'Phase IV, Vatva GIDC',
    city: 'Ahmedabad',
    solarCapacityKw: 80,
    estimatedValue: 3800000,
    source: 'Website',
    assignedSalespersonId: 'emp-4',
    assignedSalespersonName: 'Priya Verma',
    status: 'QUALIFIED',
    notes: 'Power bill is ₹2.2L/month. High daytime load. Requested site survey scheduling.',
    nextFollowUpDate: '2026-09-09',
    createdAt: '2026-09-03T10:00:00Z',
    updatedAt: '2026-09-06T11:00:00Z'
  },
  {
    id: 'lead-2',
    customerName: 'Kalyan Packaging Solutions',
    companyName: 'Kalyan Corrugators LLP',
    phone: '+91 97129 33445',
    email: 'kalyan.pack@gmail.com',
    address: 'Plot 18, Halol Industrial Area',
    city: 'Vadodara',
    solarCapacityKw: 150,
    estimatedValue: 7200000,
    source: 'Referral',
    assignedSalespersonId: 'emp-5',
    assignedSalespersonName: 'Rahul Mehta',
    status: 'SITE SURVEY',
    notes: 'Survey assigned to Rajesh Kumar. Rooftop is tin-shed. Shadow analysis needed for adjacent chimney.',
    nextFollowUpDate: '2026-09-08',
    createdAt: '2026-09-01T14:30:00Z',
    updatedAt: '2026-09-05T17:15:00Z'
  },
  {
    id: 'lead-3',
    customerName: 'Silver Oak Elite Villas Society',
    companyName: 'Silver Oak Resident Welfare Association',
    phone: '+91 99099 44556',
    email: 'rwa.silveroak@yahoo.com',
    address: 'Off SG Highway, Gota',
    city: 'Ahmedabad',
    solarCapacityKw: 35,
    estimatedValue: 1850000,
    source: 'Direct Call',
    assignedSalespersonId: 'emp-5',
    assignedSalespersonName: 'Rahul Mehta',
    status: 'PROPOSAL',
    notes: 'Common utility meter. Submitted proposal with 540W Mono PERC bifacial modules.',
    nextFollowUpDate: '2026-09-10',
    createdAt: '2026-08-25T16:00:00Z',
    updatedAt: '2026-09-04T09:30:00Z'
  },
  {
    id: 'lead-4',
    customerName: 'Navkar Diamond Tools',
    companyName: 'Navkar Precision Tools Corp',
    phone: '+91 98254 99002',
    email: 'navkardiamond@rediffmail.com',
    address: 'Katargam GIDC',
    city: 'Surat',
    solarCapacityKw: 50,
    estimatedValue: 2450000,
    source: 'Exhibition',
    assignedSalespersonId: 'emp-4',
    assignedSalespersonName: 'Priya Verma',
    status: 'NEGOTIATION',
    notes: 'Quotation sent. Customer asked for 5% discount on turnkey EPC and 5-year AMC inclusion.',
    nextFollowUpDate: '2026-09-07',
    createdAt: '2026-08-18T11:20:00Z',
    updatedAt: '2026-09-06T15:00:00Z'
  },
  {
    id: 'lead-5',
    customerName: 'Balaji Cold Chain Logistics',
    companyName: 'Balaji Agro Cold Storage',
    phone: '+91 98242 11889',
    email: 'balajicold@gmail.com',
    address: 'Deesa Road, Chhapi',
    city: 'Palanpur',
    solarCapacityKw: 200,
    estimatedValue: 9500000,
    source: 'Agent',
    assignedSalespersonId: 'emp-4',
    assignedSalespersonName: 'Priya Verma',
    status: 'NEW',
    notes: 'Inquiry received via agent commission network. 200 kW ground mount + rooftop mix.',
    nextFollowUpDate: '2026-09-07',
    createdAt: '2026-09-07T03:30:00Z',
    updatedAt: '2026-09-07T03:30:00Z'
  }
];

// Reusable standard workflow stage builder
function buildStandardWorkflowStages(projectId: string, projectCapacityKw: number, progressLevel: '68_PERCENT' | 'EARLY' | 'COMPLETED' | 'DELAYED'): ProjectStage[] {
  const is68 = progressLevel === '68_PERCENT';
  const isCompleted = progressLevel === 'COMPLETED';
  const isDelayed = progressLevel === 'DELAYED';

  const stages: ProjectStage[] = [
    {
      id: `${projectId}-stage-1`,
      stageKey: 'site_survey',
      title: 'Site Survey',
      order: 1,
      department: 'Engineering',
      assignedRole: 'Site Survey Engineer',
      assignedEmployeeId: 'emp-3',
      assignedEmployeeName: 'Rajesh Kumar',
      status: 'COMPLETED',
      priority: 'HIGH',
      startDate: '2026-08-12',
      dueDate: '2026-08-14',
      completedDate: '2026-08-14',
      comments: 'Site survey completed. Roof RCC is sound. 100 kW recommended with south orientation.',
      approvedBy: 'Amit Sharma (PM)',
      approvalDate: '2026-08-15',
      gpsLocation: {
        latitude: 22.9868,
        longitude: 72.3789,
        locationName: 'GIDC Sanand, Plot 42-45',
        capturedAt: '2026-08-14T11:30:00Z'
      },
      checklist: [
        { id: 'chk-1-1', title: 'GPS coordinates & roof orientation verified', completed: true, completedAt: '2026-08-14' },
        { id: 'chk-1-2', title: 'Shadow analysis & obstacle mapping', completed: true, completedAt: '2026-08-14' },
        { id: 'chk-1-3', title: 'Electricity bill & sanctioned load audited', completed: true, completedAt: '2026-08-14' },
        { id: 'chk-1-4', title: 'Structural load bearing & slab condition check', completed: true, completedAt: '2026-08-14' },
        { id: 'chk-1-5', title: 'Cable routing distance to LT panel measured', completed: true, completedAt: '2026-08-14' },
        { id: 'chk-1-6', title: 'Site panoramic photos captured', completed: true, completedAt: '2026-08-14' }
      ],
      photos: [
        { id: 'p-1', url: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=400', caption: 'Rooftop South view prior to installation', type: 'BEFORE', uploadedAt: '2026-08-14T11:40:00Z', uploadedBy: 'Rajesh Kumar' },
        { id: 'p-2', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&q=80&w=400', caption: 'LT panel room measurement inspection', type: 'DURING', uploadedAt: '2026-08-14T12:00:00Z', uploadedBy: 'Rajesh Kumar' }
      ],
      documents: [
        { id: 'doc-1', name: 'Site_Survey_Report_Sanand.pdf', url: '#', fileType: 'pdf', sizeMb: 3.4, uploadedAt: '2026-08-14', uploadedBy: 'Rajesh Kumar' }
      ],
      activities: [
        { id: `${projectId}-act-1-1`, timestamp: '2026-08-12 10:00 AM', user: 'Amit Sharma', role: 'Project Manager', action: 'Assigned site survey to Rajesh Kumar' },
        { id: `${projectId}-act-1-2`, timestamp: '2026-08-14 11:20 AM', user: 'Rajesh Kumar', role: 'Site Survey Engineer', action: 'Captured GPS location (22.9868° N, 72.3789° E)' },
        { id: `${projectId}-act-1-3`, timestamp: '2026-08-14 12:15 PM', user: 'Rajesh Kumar', role: 'Site Survey Engineer', action: 'Completed all 6 checklist items and uploaded 2 survey photos' },
        { id: `${projectId}-act-1-4`, timestamp: '2026-08-15 09:30 AM', user: 'Amit Sharma', role: 'Project Manager', action: 'Approved site survey and unlocked Customer Confirmation' }
      ]
    },
    {
      id: `${projectId}-stage-2`,
      stageKey: 'customer_confirmation',
      title: 'Customer Confirmation & Engineering Approval',
      order: 2,
      department: 'Sales & Engineering',
      assignedRole: 'Project Manager',
      assignedEmployeeId: 'emp-2',
      assignedEmployeeName: 'Amit Sharma',
      status: 'COMPLETED',
      priority: 'HIGH',
      startDate: '2026-08-16',
      dueDate: '2026-08-18',
      completedDate: '2026-08-18',
      comments: '3D shadow simulation & SLD approved by client. Advance payment of ₹2,00,000 cleared.',
      approvedBy: 'Amit Sharma (PM)',
      approvalDate: '2026-08-18',
      checklist: [
        { id: 'chk-2-1', title: 'Solar PV plant layout drawing client sign-off', completed: true, completedAt: '2026-08-18' },
        { id: 'chk-2-2', title: 'Single Line Diagram (SLD) approved', completed: true, completedAt: '2026-08-18' },
        { id: 'chk-2-3', title: 'Turnkey EPC contract executed', completed: true, completedAt: '2026-08-18' },
        { id: 'chk-2-4', title: 'Advance milestone payment verified', completed: true, completedAt: '2026-08-18' }
      ],
      photos: [],
      documents: [
        { id: 'doc-2', name: 'Approved_Single_Line_Diagram_SLD.pdf', url: '#', fileType: 'pdf', sizeMb: 2.1, uploadedAt: '2026-08-18', uploadedBy: 'Amit Sharma' }
      ],
      activities: [
        { id: `${projectId}-act-2-1`, timestamp: '2026-08-18 04:00 PM', user: 'Amit Sharma', role: 'Project Manager', action: 'Client signed off SLD layout drawings. Advance milestone verified.' }
      ]
    },
    {
      id: `${projectId}-stage-3`,
      stageKey: 'civil_work',
      title: 'Civil Work',
      order: 3,
      department: 'Civil',
      assignedRole: 'Civil Team',
      assignedEmployeeId: 'emp-3',
      assignedEmployeeName: 'Rajesh Kumar',
      status: 'COMPLETED',
      priority: 'HIGH',
      startDate: '2026-08-20',
      dueDate: '2026-08-24',
      completedDate: '2026-08-24',
      comments: 'All 28 RCC foundation pedestals cured with M25 grade concrete. Anchor bolts aligned.',
      approvedBy: 'Amit Sharma (PM)',
      approvalDate: '2026-08-25',
      gpsLocation: {
        latitude: 22.9869,
        longitude: 72.3791,
        locationName: 'Roof Pad Civil Zone A',
        capturedAt: '2026-08-24T16:00:00Z'
      },
      checklist: [
        { id: 'chk-3-1', title: 'Foundation marking & grid layout', completed: true, completedAt: '2026-08-21' },
        { id: 'chk-3-2', title: 'Civil roof preparation & waterproofing coat', completed: true, completedAt: '2026-08-22' },
        { id: 'chk-3-3', title: 'Structure foundation pedestal casting (M25)', completed: true, completedAt: '2026-08-23' },
        { id: 'chk-3-4', title: 'Material verification & batch test report', completed: true, completedAt: '2026-08-24' },
        { id: 'chk-3-5', title: 'Anchor fasteners torque testing', completed: true, completedAt: '2026-08-24' },
        { id: 'chk-3-6', title: 'Site cleaned & debris removed', completed: true, completedAt: '2026-08-24' }
      ],
      photos: [
        { id: 'p-3', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=400', caption: 'Foundation marking and casting preparation', type: 'BEFORE', uploadedAt: '2026-08-21T10:00:00Z', uploadedBy: 'Rajesh Kumar' },
        { id: 'p-4', url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=400', caption: 'Concrete pedestals casting in progress', type: 'DURING', uploadedAt: '2026-08-23T15:00:00Z', uploadedBy: 'Rajesh Kumar' },
        { id: 'p-5', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&q=80&w=400', caption: 'Cured foundations with waterproofing completed', type: 'AFTER', uploadedAt: '2026-08-24T16:30:00Z', uploadedBy: 'Rajesh Kumar' }
      ],
      documents: [],
      activities: [
        { id: `${projectId}-act-3-1`, timestamp: '2026-08-20 09:00 AM', user: 'Rajesh Kumar', role: 'Civil Team', action: 'Rajesh started civil work foundation marking' },
        { id: `${projectId}-act-3-2`, timestamp: '2026-08-24 04:30 PM', user: 'Rajesh Kumar', role: 'Civil Team', action: 'Rajesh uploaded 3 photos (Before, During, After)' },
        { id: `${projectId}-act-3-3`, timestamp: '2026-08-24 05:00 PM', user: 'Rajesh Kumar', role: 'Civil Team', action: 'Rajesh completed checklist (6/6)' },
        { id: `${projectId}-act-3-4`, timestamp: '2026-08-25 10:00 AM', user: 'Amit Sharma', role: 'Project Manager', action: 'Project Manager approved civil work' }
      ]
    },
    {
      id: `${projectId}-stage-4`,
      stageKey: 'structure_fabrication',
      title: 'Structure Installation & Fabrication',
      order: 4,
      department: 'Structure',
      assignedRole: 'Structure Team',
      assignedEmployeeId: 'emp-6',
      assignedEmployeeName: 'Dinesh Yadav',
      status: 'COMPLETED',
      priority: 'HIGH',
      startDate: '2026-08-26',
      dueDate: '2026-08-29',
      completedDate: '2026-08-29',
      comments: 'Hot Dip Galvanized (HDG 80 microns) structure assembled. Tilt angle set to 23 degrees south.',
      approvedBy: 'Amit Sharma (PM)',
      approvalDate: '2026-08-30',
      checklist: [
        { id: 'chk-4-1', title: 'HDG structure delivery & coating thickness verification', completed: true, completedAt: '2026-08-26' },
        { id: 'chk-4-2', title: 'Column base mounting & plumb line calibration', completed: true, completedAt: '2026-08-27' },
        { id: 'chk-4-3', title: 'Rafters & purlins bolting with SS304 hardware', completed: true, completedAt: '2026-08-28' },
        { id: 'chk-4-4', title: 'Tilt angle calibration (23° South)', completed: true, completedAt: '2026-08-29' },
        { id: 'chk-4-5', title: 'Wind gust bracing & stability check (150 km/h certified)', completed: true, completedAt: '2026-08-29' }
      ],
      photos: [
        { id: 'p-6', url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=400', caption: 'HDG module mounting structure erection', type: 'DURING', uploadedAt: '2026-08-28T14:00:00Z', uploadedBy: 'Dinesh Yadav' }
      ],
      documents: [],
      activities: [
        { id: `${projectId}-act-4-1`, timestamp: '2026-08-26 10:00 AM', user: 'Dinesh Yadav', role: 'Structure Team', action: 'Started structure erection with HDG materials' },
        { id: `${projectId}-act-4-2`, timestamp: '2026-08-29 05:00 PM', user: 'Dinesh Yadav', role: 'Structure Team', action: 'Completed structure assembly with 23 degree tilt' },
        { id: `${projectId}-act-4-3`, timestamp: '2026-08-30 11:15 AM', user: 'Amit Sharma', role: 'Project Manager', action: 'Approved structure fabrication' }
      ]
    },
    {
      id: `${projectId}-stage-5`,
      stageKey: 'lightning_arrestor',
      title: 'Lightning Arrestor (LA)',
      order: 5,
      department: 'Electrical',
      assignedRole: 'Electrical Team',
      assignedEmployeeId: 'emp-8',
      assignedEmployeeName: 'Ankit Joshi',
      status: 'COMPLETED',
      priority: 'MEDIUM',
      startDate: '2026-08-30',
      dueDate: '2026-09-01',
      completedDate: '2026-09-01',
      comments: 'Early Streamer Emission (ESE) lightning arrestor installed at peak mast (6m elevation).',
      approvedBy: 'Amit Sharma (PM)',
      approvalDate: '2026-09-01',
      checklist: [
        { id: 'chk-5-1', title: 'ESE Lightning arrestor mast mounting', completed: true, completedAt: '2026-08-31' },
        { id: 'chk-5-2', title: 'Copper coated down-conductor strip routing', completed: true, completedAt: '2026-09-01' },
        { id: 'chk-5-3', title: 'Dedicated lightning earthing pit termination', completed: true, completedAt: '2026-09-01' },
        { id: 'chk-5-4', title: 'Lightning strike counter tested', completed: true, completedAt: '2026-09-01' }
      ],
      photos: [],
      documents: [],
      activities: [
        { id: `${projectId}-act-5-1`, timestamp: '2026-09-01 02:00 PM', user: 'Ankit Joshi', role: 'Electrical Team', action: 'Completed ESE LA installation with isolated down conductor' }
      ]
    },
    {
      id: `${projectId}-stage-6`,
      stageKey: 'cdc_earthing',
      title: 'CDC & Earthing Routing',
      order: 6,
      department: 'Electrical',
      assignedRole: 'Electrical Team',
      assignedEmployeeId: 'emp-8',
      assignedEmployeeName: 'Ankit Joshi',
      status: 'COMPLETED',
      priority: 'HIGH',
      startDate: '2026-09-01',
      dueDate: '2026-09-03',
      completedDate: '2026-09-03',
      comments: '25x3 mm GI earthing strip routing across all module arrays and inverter stations.',
      approvedBy: 'Amit Sharma (PM)',
      approvalDate: '2026-09-03',
      checklist: [
        { id: 'chk-6-1', title: '25x3 mm GI earthing strip routing', completed: true, completedAt: '2026-09-02' },
        { id: 'chk-6-2', title: 'Array to array continuity bonding lugs', completed: true, completedAt: '2026-09-02' },
        { id: 'chk-6-3', title: 'DC cable UV-resistant conduits fixing', completed: true, completedAt: '2026-09-03' },
        { id: 'chk-6-4', title: 'Cable tray routing with perforated covers', completed: true, completedAt: '2026-09-03' }
      ],
      photos: [],
      documents: [],
      activities: [
        { id: `${projectId}-act-6-1`, timestamp: '2026-09-03 04:00 PM', user: 'Ankit Joshi', role: 'Electrical Team', action: 'Completed earthing grid routing' }
      ]
    },
    {
      id: `${projectId}-stage-7`,
      stageKey: 'earthing_pits',
      title: 'Chemical Earthing Pits',
      order: 7,
      department: 'Electrical',
      assignedRole: 'Electrical Team',
      assignedEmployeeId: 'emp-8',
      assignedEmployeeName: 'Ankit Joshi',
      status: 'COMPLETED',
      priority: 'HIGH',
      startDate: '2026-09-02',
      dueDate: '2026-09-04',
      completedDate: '2026-09-04',
      comments: '4 chemical earthing pits dug & backfilled with BFC compound. Earth resistance < 1.2 Ohms.',
      approvedBy: 'Amit Sharma (PM)',
      approvalDate: '2026-09-04',
      checklist: [
        { id: 'chk-7-1', title: 'Pit 1: DC System Earthing (Resistance < 2Ω)', completed: true, completedAt: '2026-09-03' },
        { id: 'chk-7-2', title: 'Pit 2: AC System Earthing (Resistance < 2Ω)', completed: true, completedAt: '2026-09-03' },
        { id: 'chk-7-3', title: 'Pit 3: Inverter Body / Enclosure Grounding', completed: true, completedAt: '2026-09-04' },
        { id: 'chk-7-4', title: 'Pit 4: Dedicated Lightning Protection Pit', completed: true, completedAt: '2026-09-04' },
        { id: 'chk-7-5', title: 'Backfill compound (BFC) moisture packing', completed: true, completedAt: '2026-09-04' },
        { id: 'chk-7-6', title: 'Pit chambers with test link & identification tag', completed: true, completedAt: '2026-09-04' }
      ],
      photos: [
        { id: 'p-7', url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400', caption: 'Chemical earth pit testing with digital Earth Tester', type: 'AFTER', uploadedAt: '2026-09-04T15:00:00Z', uploadedBy: 'Ankit Joshi' }
      ],
      documents: [],
      activities: [
        { id: `${projectId}-act-7-1`, timestamp: '2026-09-04 05:00 PM', user: 'Ankit Joshi', role: 'Electrical Team', action: 'Earth test report verified. All readings well under 1.5 Ohms.' }
      ]
    },
    {
      id: `${projectId}-stage-8`,
      stageKey: 'solar_installation',
      title: 'Solar Module Installation',
      order: 8,
      department: 'Installation',
      assignedRole: 'Installation Team',
      assignedEmployeeId: 'emp-7',
      assignedEmployeeName: 'Manoj Tiwari',
      status: isCompleted ? 'COMPLETED' : (is68 ? 'IN PROGRESS' : (isDelayed ? 'BLOCKED' : 'NOT STARTED')),
      priority: 'HIGH',
      startDate: '2026-09-05',
      dueDate: '2026-09-08',
      completedDate: isCompleted ? '2026-08-25' : undefined,
      comments: is68 ? '185 out of 185 panels lifted to rooftop. 130 panels mounted and mid-clamped.' : '',
      approvedBy: isCompleted ? 'Amit Sharma (PM)' : undefined,
      approvalDate: isCompleted ? '2026-08-25' : undefined,
      gpsLocation: {
        latitude: 22.9868,
        longitude: 72.3789,
        locationName: 'Rooftop Array Sector B',
        capturedAt: '2026-09-06T14:15:00Z'
      },
      checklist: [
        { id: 'chk-8-1', title: 'Solar panel unboxing & EL flash test verification', completed: true, completedAt: '2026-09-05' },
        { id: 'chk-8-2', title: 'End clamps & mid clamps torque fastening (8 Nm)', completed: true, completedAt: '2026-09-06' },
        { id: 'chk-8-3', title: 'String wiring with 4 sq mm solar DC cable', completed: isCompleted, completedAt: isCompleted ? '2026-08-24' : undefined },
        { id: 'chk-8-4', title: 'MC4 connector crimping & polarity check', completed: isCompleted, completedAt: isCompleted ? '2026-08-24' : undefined },
        { id: 'chk-8-5', title: 'Voc & Isc string test against simulation specs', completed: isCompleted, completedAt: isCompleted ? '2026-08-25' : undefined },
        { id: 'chk-8-6', title: 'Array cleaning & alignment verification', completed: isCompleted, completedAt: isCompleted ? '2026-08-25' : undefined }
      ],
      photos: [
        { id: 'p-8', url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=400', caption: '100 kW Mono PERC modules mounting in progress', type: 'DURING', uploadedAt: '2026-09-06T11:00:00Z', uploadedBy: 'Manoj Tiwari' }
      ],
      documents: [],
      activities: [
        { id: `${projectId}-act-8-1`, timestamp: '2026-09-05 09:00 AM', user: 'Manoj Tiwari', role: 'Installation Team', action: 'Began module installation on arrays 1 to 6' },
        { id: `${projectId}-act-8-2`, timestamp: '2026-09-06 02:00 PM', user: 'Manoj Tiwari', role: 'Installation Team', action: 'Uploaded progress photo. 70% modules physically mounted' }
      ]
    },
    {
      id: `${projectId}-stage-9`,
      stageKey: 'inverter_installation',
      title: 'Inverter Installation',
      order: 9,
      department: 'Electrical',
      assignedRole: 'Electrical Team',
      assignedEmployeeId: 'emp-8',
      assignedEmployeeName: 'Ankit Joshi',
      status: isCompleted ? 'COMPLETED' : (is68 ? 'IN PROGRESS' : 'NOT STARTED'),
      priority: 'HIGH',
      startDate: '2026-09-06',
      dueDate: '2026-09-09',
      completedDate: isCompleted ? '2026-08-26' : undefined,
      comments: is68 ? 'Sungrow 100 kW 3-phase string inverter mounted in canopy. DC conduits pulled.' : '',
      checklist: [
        { id: 'chk-9-1', title: 'Inverter canopy mounting on weather-shielded wall', completed: true, completedAt: '2026-09-06' },
        { id: 'chk-9-2', title: 'DC string inputs termination (8 MPPT channels)', completed: isCompleted, completedAt: isCompleted ? '2026-08-26' : undefined },
        { id: 'chk-9-3', title: 'Internal surge protection devices (SPD) checked', completed: isCompleted, completedAt: isCompleted ? '2026-08-26' : undefined },
        { id: 'chk-9-4', title: 'Dual body earthing connected', completed: true, completedAt: '2026-09-06' },
        { id: 'chk-9-5', title: 'Ventilation & clearance verification', completed: true, completedAt: '2026-09-06' }
      ],
      photos: [],
      documents: [],
      activities: [
        { id: `${projectId}-act-9-1`, timestamp: '2026-09-06 10:30 AM', user: 'Ankit Joshi', role: 'Electrical Team', action: 'Mounted 100 kW Sungrow grid-tied inverter' }
      ]
    },
    {
      id: `${projectId}-stage-10`,
      stageKey: 'meter_synchronisation',
      title: 'Meter Synchronisation & Discom Bi-Directional Meter',
      order: 10,
      department: 'Engineering & Liaisoning',
      assignedRole: 'Project Manager',
      assignedEmployeeId: 'emp-2',
      assignedEmployeeName: 'Amit Sharma',
      status: isCompleted ? 'COMPLETED' : (isDelayed ? 'OVERDUE' : 'NOT STARTED'),
      priority: 'HIGH',
      dueDate: '2026-09-12',
      completedDate: isCompleted ? '2026-08-27' : undefined,
      comments: isDelayed ? 'Discom meter testing team visit delayed due to inspector unavailability.' : '',
      checklist: [
        { id: 'chk-10-1', title: 'Bi-directional CT/PT Net Meter application filed', completed: isCompleted || is68 },
        { id: 'chk-10-2', title: 'Discom inspection fee receipt verified', completed: isCompleted || is68 },
        { id: 'chk-10-3', title: 'Physical net meter testing in Discom laboratory', completed: isCompleted },
        { id: 'chk-10-4', title: 'Net meter installation & CT sealing by Discom engineer', completed: isCompleted },
        { id: 'chk-10-5', title: 'Initial import/export meter reading joint log signed', completed: isCompleted }
      ],
      photos: [],
      documents: [],
      activities: []
    },
    {
      id: `${projectId}-stage-11`,
      stageKey: 'inverter_wifi_pairing',
      title: 'Inverter WiFi / 4G Dongle Pairing & Cloud Setup',
      order: 11,
      department: 'Service',
      assignedRole: 'Service Manager',
      assignedEmployeeId: 'emp-11',
      assignedEmployeeName: 'Rohit Verma',
      status: isCompleted ? 'COMPLETED' : 'NOT STARTED',
      priority: 'MEDIUM',
      dueDate: '2026-09-13',
      completedDate: isCompleted ? '2026-08-27' : undefined,
      checklist: [
        { id: 'chk-11-1', title: '4G/WiFi data logger dongle inserted', completed: isCompleted },
        { id: 'chk-11-2', title: 'Client portal & plant profile configured on iSolarCloud', completed: isCompleted },
        { id: 'chk-11-3', title: 'Live telemetry verification (kW generation, voltage, frequency)', completed: isCompleted },
        { id: 'chk-11-4', title: 'Client app login credentials handed over', completed: isCompleted }
      ],
      photos: [],
      documents: [],
      activities: []
    },
    {
      id: `${projectId}-stage-12`,
      stageKey: 'acdb_dcdb_fixing',
      title: 'ACDB + DCDB Fixing & Internal Wiring',
      order: 12,
      department: 'Electrical',
      assignedRole: 'Electrical Team',
      assignedEmployeeId: 'emp-8',
      assignedEmployeeName: 'Ankit Joshi',
      status: isCompleted ? 'COMPLETED' : 'NOT STARTED',
      priority: 'HIGH',
      dueDate: '2026-09-14',
      completedDate: isCompleted ? '2026-08-27' : undefined,
      checklist: [
        { id: 'chk-12-1', title: 'IP65 DCDB with fuse & Type II SPD mounting', completed: isCompleted },
        { id: 'chk-12-2', title: 'ACDB with 160A 4-Pole MCCB and class C SPD', completed: isCompleted },
        { id: 'chk-12-3', title: 'Phase indication lamps & multi-function meter connected', completed: isCompleted },
        { id: 'chk-12-4', title: 'Warning labels & shock hazard signage affixed', completed: isCompleted }
      ],
      photos: [],
      documents: [],
      activities: []
    },
    {
      id: `${projectId}-stage-13`,
      stageKey: 'ac_side_electrical',
      title: 'AC Side Electrical Connection & LT Breaker Tapping',
      order: 13,
      department: 'Electrical',
      assignedRole: 'Electrical Team',
      assignedEmployeeId: 'emp-8',
      assignedEmployeeName: 'Ankit Joshi',
      status: isCompleted ? 'COMPLETED' : 'NOT STARTED',
      priority: 'HIGH',
      dueDate: '2026-09-15',
      completedDate: isCompleted ? '2026-08-28' : undefined,
      checklist: [
        { id: 'chk-13-1', title: '3.5C x 95 sq mm XLPE Armoured Aluminium cable pulling', completed: isCompleted },
        { id: 'chk-13-2', title: 'Cable termination with heavy-duty brass glands & lugs', completed: isCompleted },
        { id: 'chk-13-3', title: 'Tapping into factory main LT distribution board (LTDP)', completed: isCompleted },
        { id: 'chk-13-4', title: 'Insulation resistance megger test (1000V DC)', completed: isCompleted }
      ],
      photos: [],
      documents: [],
      activities: []
    },
    {
      id: `${projectId}-stage-14`,
      stageKey: 'final_verification',
      title: 'Final Verification & CEIG / Safety Inspection',
      order: 14,
      department: 'Operations',
      assignedRole: 'Project Manager',
      assignedEmployeeId: 'emp-2',
      assignedEmployeeName: 'Amit Sharma',
      status: isCompleted ? 'COMPLETED' : 'NOT STARTED',
      priority: 'HIGH',
      dueDate: '2026-09-16',
      completedDate: isCompleted ? '2026-08-28' : undefined,
      checklist: [
        { id: 'chk-14-1', title: 'Panels & torque marks verified', completed: isCompleted },
        { id: 'chk-14-2', title: 'Structure rigidity & galvanization verified', completed: isCompleted },
        { id: 'chk-14-3', title: 'Earthing resistance audit certificates verified', completed: isCompleted },
        { id: 'chk-14-4', title: 'ACDB & DCDB safety trip tests passed', completed: isCompleted },
        { id: 'chk-14-5', title: 'Inverter anti-islanding protection verified', completed: isCompleted },
        { id: 'chk-14-6', title: 'Net meter synchronization verified', completed: isCompleted },
        { id: 'chk-14-7', title: 'Safety checklist & fire extinguisher placement checked', completed: isCompleted },
        { id: 'chk-14-8', title: 'Documentation & As-Built drawing bundle prepared', completed: isCompleted }
      ],
      photos: [],
      documents: [],
      activities: []
    },
    {
      id: `${projectId}-stage-15`,
      stageKey: 'final_handover',
      title: 'Final Handover & Commercial Commissioning',
      order: 15,
      department: 'Management',
      assignedRole: 'Project Manager',
      assignedEmployeeId: 'emp-2',
      assignedEmployeeName: 'Amit Sharma',
      status: isCompleted ? 'COMPLETED' : 'NOT STARTED',
      priority: 'HIGH',
      dueDate: '2026-09-17',
      completedDate: isCompleted ? '2026-08-29' : undefined,
      checklist: [
        { id: 'chk-15-1', title: 'Plant commissioning certificate signed with client', completed: isCompleted },
        { id: 'chk-15-2', title: 'Final invoice submitted & final payment receipt acknowledged', completed: isCompleted },
        { id: 'chk-15-3', title: '25-year solar module performance warranty binder delivered', completed: isCompleted },
        { id: 'chk-15-4', title: 'Inverter 5-year replacement warranty certificate delivered', completed: isCompleted },
        { id: 'chk-15-5', title: 'Client maintenance training conducted', completed: isCompleted }
      ],
      photos: [],
      documents: [],
      activities: []
    },
    {
      id: `${projectId}-stage-16`,
      stageKey: 'service_amc',
      title: 'Service / AMC Handover',
      order: 16,
      department: 'Service',
      assignedRole: 'Service Manager',
      assignedEmployeeId: 'emp-11',
      assignedEmployeeName: 'Rohit Verma',
      status: isCompleted ? 'APPROVED' : 'NOT STARTED',
      priority: 'MEDIUM',
      dueDate: '2026-09-20',
      checklist: [
        { id: 'chk-16-1', title: 'Service contract activated in ERP', completed: isCompleted },
        { id: 'chk-16-2', title: 'Annual maintenance visit calendar scheduled (Quarterly)', completed: isCompleted },
        { id: 'chk-16-3', title: 'Emergency breakdown helpline shared with client', completed: isCompleted }
      ],
      photos: [],
      documents: [],
      activities: []
    }
  ];

  return stages;
}

const initialProjects: SolarProject[] = [
  {
    id: 'proj-1',
    projectCode: 'SOL-2026-001',
    customerId: 'cust-1',
    customerName: 'ABC Industries Ltd.',
    title: '100 kW Rooftop Solar Project',
    capacityKw: 100,
    totalValue: 5000000,
    status: 'INSTALLATION',
    currentStageKey: 'solar_installation',
    completionPercentage: 68,
    projectManagerId: 'emp-2',
    projectManagerName: 'Amit Sharma',
    siteAddress: 'Plot No. 42-45, GIDC Industrial Estate, Sanand, Ahmedabad',
    city: 'Ahmedabad',
    startDate: '2026-08-12',
    expectedCompletionDate: '2026-09-18',
    stages: buildStandardWorkflowStages('proj-1', 100, '68_PERCENT'),
    notes: 'Premium commercial rooftop installation with 540W Mono PERC Bifacial modules and Sungrow 100kW Inverter. Client requires early commissioning before month-end billing cycle.',
    createdAt: '2026-08-10T10:00:00Z',
    updatedAt: '2026-09-06T17:00:00Z'
  },
  {
    id: 'proj-2',
    projectCode: 'SOL-2026-002',
    customerId: 'cust-2',
    customerName: 'Zenith Textiles Mills',
    title: '250 kW High Tension Rooftop Solar',
    capacityKw: 250,
    totalValue: 11800000,
    status: 'CIVIL & STRUCTURE',
    currentStageKey: 'structure_fabrication',
    completionPercentage: 35,
    projectManagerId: 'emp-2',
    projectManagerName: 'Amit Sharma',
    siteAddress: 'Survey No. 118, NH-48, Sachin, Surat',
    city: 'Surat',
    startDate: '2026-08-15',
    expectedCompletionDate: '2026-10-05',
    stages: buildStandardWorkflowStages('proj-2', 250, 'EARLY'),
    notes: 'Textile spinning mill rooftop. Structural load reinforcement underway.',
    createdAt: '2026-08-14T11:00:00Z',
    updatedAt: '2026-09-05T16:00:00Z'
  },
  {
    id: 'proj-3',
    projectCode: 'SOL-2026-003',
    customerId: 'cust-3',
    customerName: 'Apex Super Specialty Hospital',
    title: '40 kW Hospital Solar & Emergency Backup Interlock',
    capacityKw: 40,
    totalValue: 2150000,
    status: 'DESIGN & APPROVALS',
    currentStageKey: 'customer_confirmation',
    completionPercentage: 20,
    projectManagerId: 'emp-2',
    projectManagerName: 'Amit Sharma',
    siteAddress: 'Ring Road, Bodakdev, Ahmedabad',
    city: 'Ahmedabad',
    startDate: '2026-08-22',
    expectedCompletionDate: '2026-09-28',
    stages: buildStandardWorkflowStages('proj-3', 40, 'EARLY'),
    notes: 'Hospital load requires zero export interlock until Discom meter arrives.',
    createdAt: '2026-08-21T09:00:00Z',
    updatedAt: '2026-09-04T12:00:00Z'
  },
  {
    id: 'proj-4',
    projectCode: 'SOL-2026-004',
    customerId: 'cust-4',
    customerName: 'GreenTech Logistics Hub',
    title: '50 kW Warehouse Solar PV Plant',
    capacityKw: 50,
    totalValue: 2600000,
    status: 'COMPLETED',
    currentStageKey: 'service_amc',
    completionPercentage: 100,
    projectManagerId: 'emp-2',
    projectManagerName: 'Amit Sharma',
    siteAddress: 'Warehousing Zone, Changodar, Ahmedabad',
    city: 'Ahmedabad',
    startDate: '2026-07-01',
    expectedCompletionDate: '2026-08-25',
    actualCompletionDate: '2026-08-29',
    stages: buildStandardWorkflowStages('proj-4', 50, 'COMPLETED'),
    notes: 'Commissioned on 29 Aug 2026. Generating ~220 units daily. Gold AMC active.',
    createdAt: '2026-06-25T10:00:00Z',
    updatedAt: '2026-08-30T10:00:00Z'
  },
  {
    id: 'proj-5',
    projectCode: 'SOL-2026-005',
    customerId: 'cust-5',
    customerName: 'Sunrise Cold Storage & Agro',
    title: '75 kW Cold Storage Solar PV Plant',
    capacityKw: 75,
    totalValue: 3950000,
    status: 'DELAYED',
    currentStageKey: 'meter_synchronisation',
    completionPercentage: 58,
    projectManagerId: 'emp-2',
    projectManagerName: 'Amit Sharma',
    siteAddress: 'Mahuva Highway, Talaja Road, Bhavnagar',
    city: 'Bhavnagar',
    startDate: '2026-07-10',
    expectedCompletionDate: '2026-08-30',
    stages: buildStandardWorkflowStages('proj-5', 75, 'DELAYED'),
    notes: 'Delayed due to Discom bi-directional meter test certificate backlog at sub-division.',
    createdAt: '2026-07-05T08:00:00Z',
    updatedAt: '2026-09-06T18:00:00Z'
  }
];

const initialPayments: PaymentRecord[] = [
  {
    id: 'pay-1',
    receiptNumber: 'RCPT-2026-001',
    projectId: 'proj-1',
    customerId: 'cust-1',
    customerName: 'ABC Industries Ltd.',
    milestone: 'Advance',
    amount: 2000000,
    status: 'PAID',
    dueDate: '2026-08-15',
    paidDate: '2026-08-16',
    paymentMode: 'Bank NEFT/RTGS',
    transactionReference: 'HDFC-RTGS-9821034',
    notes: 'Advance 40% received upon agreement signing',
    tallySyncStatus: 'SYNCED',
    tallyReference: 'TALLY-VCH-8821'
  },
  {
    id: 'pay-2',
    receiptNumber: 'RCPT-2026-002',
    projectId: 'proj-1',
    customerId: 'cust-1',
    customerName: 'ABC Industries Ltd.',
    milestone: 'Installation',
    amount: 2000000,
    status: 'PAID',
    dueDate: '2026-09-04',
    paidDate: '2026-09-05',
    paymentMode: 'Bank NEFT/RTGS',
    transactionReference: 'ICICI-RTGS-1102938',
    notes: 'Second milestone 40% released upon structure & module delivery at site',
    tallySyncStatus: 'SYNCED',
    tallyReference: 'TALLY-VCH-8904'
  },
  {
    id: 'pay-3',
    receiptNumber: 'RCPT-2026-003',
    projectId: 'proj-1',
    customerId: 'cust-1',
    customerName: 'ABC Industries Ltd.',
    milestone: 'Final Handover',
    amount: 1000000,
    status: 'PENDING',
    dueDate: '2026-09-20',
    notes: 'Final 20% balance payable upon Net Metering sync & handover certificate',
    tallySyncStatus: 'NOT SYNCED'
  },
  {
    id: 'pay-4',
    receiptNumber: 'RCPT-2026-004',
    projectId: 'proj-2',
    customerId: 'cust-2',
    customerName: 'Zenith Textiles Mills',
    milestone: 'Advance',
    amount: 4000000,
    status: 'PAID',
    dueDate: '2026-08-20',
    paidDate: '2026-08-21',
    paymentMode: 'Bank NEFT/RTGS',
    transactionReference: 'SBI-RTGS-5542109',
    notes: 'Advance 35% milestone',
    tallySyncStatus: 'SYNCED',
    tallyReference: 'TALLY-VCH-8833'
  },
  {
    id: 'pay-5',
    receiptNumber: 'RCPT-2026-005',
    projectId: 'proj-4',
    customerId: 'cust-4',
    customerName: 'GreenTech Logistics Hub',
    milestone: 'Advance',
    amount: 1300000,
    status: 'PAID',
    dueDate: '2026-07-05',
    paidDate: '2026-07-06',
    paymentMode: 'Bank NEFT/RTGS',
    tallySyncStatus: 'SYNCED'
  },
  {
    id: 'pay-6',
    receiptNumber: 'RCPT-2026-006',
    projectId: 'proj-4',
    customerId: 'cust-4',
    customerName: 'GreenTech Logistics Hub',
    milestone: 'Final Handover',
    amount: 1300000,
    status: 'PAID',
    dueDate: '2026-08-29',
    paidDate: '2026-08-30',
    paymentMode: 'Bank NEFT/RTGS',
    tallySyncStatus: 'SYNCED'
  },
  {
    id: 'pay-7',
    receiptNumber: 'RCPT-2026-007',
    projectId: 'proj-5',
    customerId: 'cust-5',
    customerName: 'Sunrise Cold Storage & Agro',
    milestone: 'Installation',
    amount: 1500000,
    status: 'OVERDUE',
    dueDate: '2026-08-25',
    notes: 'Payment delayed by client pending Discom inspection clearance',
    tallySyncStatus: 'NOT SYNCED'
  }
];

const initialExpenses: ExpenseRecord[] = [
  {
    id: 'exp-1',
    expenseNumber: 'EXP-2026-081',
    projectId: 'proj-1',
    projectCode: 'SOL-2026-001',
    vendorName: 'Waaree Energies Ltd',
    category: 'Material - Solar Panels',
    amount: 1850000,
    date: '2026-08-25',
    paymentMode: 'Bank NEFT/RTGS',
    referenceNo: 'WAA-INV-44910',
    notes: '185 units of 540W Mono PERC Bifacial Solar PV Modules',
    tallySyncStatus: 'SYNCED'
  },
  {
    id: 'exp-2',
    expenseNumber: 'EXP-2026-082',
    projectId: 'proj-1',
    projectCode: 'SOL-2026-001',
    vendorName: 'Sungrow Power India Pvt Ltd',
    category: 'Material - Inverter',
    amount: 620000,
    date: '2026-08-28',
    paymentMode: 'Bank NEFT/RTGS',
    referenceNo: 'SG-INV-9921',
    notes: '1x 100kW SG100CX 3-Phase Multi-MPPT Inverter',
    tallySyncStatus: 'SYNCED'
  },
  {
    id: 'exp-3',
    expenseNumber: 'EXP-2026-083',
    projectId: 'proj-1',
    projectCode: 'SOL-2026-001',
    vendorName: 'Shreeji Galvanizers & Steel',
    category: 'Structure Steel',
    amount: 420000,
    date: '2026-08-24',
    paymentMode: 'Bank RTGS',
    referenceNo: 'SGS-00219',
    notes: 'Hot Dip Galvanized Solar Mounting Structure 80 micron HDG',
    tallySyncStatus: 'SYNCED'
  },
  {
    id: 'exp-4',
    expenseNumber: 'EXP-2026-084',
    projectId: 'proj-1',
    projectCode: 'SOL-2026-001',
    vendorName: 'Gujarat ReadyMix Concrete Co.',
    category: 'Civil Raw Materials',
    amount: 145000,
    date: '2026-08-21',
    paymentMode: 'Bank Cheque',
    referenceNo: 'RMC-CHQ-104',
    notes: 'M25 ready-mix concrete for roof pedestals',
    tallySyncStatus: 'SYNCED'
  },
  {
    id: 'exp-5',
    expenseNumber: 'EXP-2026-085',
    projectId: 'proj-1',
    projectCode: 'SOL-2026-001',
    vendorName: 'Polycab India Ltd',
    category: 'Material - Cables & BOS',
    amount: 310000,
    date: '2026-09-02',
    paymentMode: 'Bank NEFT',
    referenceNo: 'POLY-8812',
    notes: 'Solar DC 4 sq mm cable 1500m + 3.5C x 95 sq mm XLPE Aluminium AC cable',
    tallySyncStatus: 'NOT SYNCED'
  }
];

const initialAttendance: AttendanceRecord[] = [
  {
    id: 'att-1',
    employeeId: 'emp-3',
    employeeName: 'Rajesh Kumar',
    date: '2026-09-07',
    checkInTime: '09:05 AM',
    gpsCheckIn: {
      latitude: 22.9868,
      longitude: 72.3789,
      locationName: 'Sanand GIDC Plot 42 (ABC Industries Site)'
    },
    siteProjectId: 'proj-1',
    siteProjectTitle: '100 kW Rooftop Solar - ABC Industries',
    status: 'FIELD VISIT'
  },
  {
    id: 'att-2',
    employeeId: 'emp-7',
    employeeName: 'Manoj Tiwari',
    date: '2026-09-07',
    checkInTime: '08:50 AM',
    gpsCheckIn: {
      latitude: 22.9869,
      longitude: 72.3790,
      locationName: 'Sanand GIDC Plot 42 (ABC Industries Site)'
    },
    siteProjectId: 'proj-1',
    siteProjectTitle: '100 kW Rooftop Solar - ABC Industries',
    status: 'FIELD VISIT'
  },
  {
    id: 'att-3',
    employeeId: 'emp-2',
    employeeName: 'Amit Sharma',
    date: '2026-09-07',
    checkInTime: '09:15 AM',
    status: 'PRESENT'
  },
  {
    id: 'att-4',
    employeeId: 'emp-9',
    employeeName: 'Sneha Kulkarni',
    date: '2026-09-07',
    checkInTime: '09:30 AM',
    status: 'PRESENT'
  },
  {
    id: 'att-5',
    employeeId: 'emp-4',
    employeeName: 'Priya Verma',
    date: '2026-09-07',
    checkInTime: '09:10 AM',
    status: 'PRESENT'
  }
];

const initialServiceTickets: ServiceTicket[] = [
  {
    id: 'srv-1',
    ticketId: 'SRV-2026-001',
    customerId: 'cust-4',
    customerName: 'GreenTech Logistics Hub',
    projectId: 'proj-4',
    projectTitle: '50 kW Warehouse Solar PV Plant',
    issue: 'Inverter reported temporary grid undervoltage fault during 12:30 PM power dip.',
    category: 'Inverter Error / Offline',
    priority: 'MEDIUM',
    assignedTechnicianId: 'emp-11',
    assignedTechnicianName: 'Rohit Verma',
    status: 'RESOLVED',
    createdDate: '2026-09-02',
    scheduledDate: '2026-09-03',
    resolvedDate: '2026-09-03',
    notes: 'Firmware AC trip voltage threshold recalibrated to Discom line variance standard. Generating normal 48.2 kW at peak.',
    photos: []
  },
  {
    id: 'srv-2',
    ticketId: 'SRV-2026-002',
    customerId: 'cust-4',
    customerName: 'GreenTech Logistics Hub',
    projectId: 'proj-4',
    projectTitle: '50 kW Warehouse Solar PV Plant',
    issue: 'Scheduled Q3 Routine Solar Panel Dust Cleaning & Thermal Imaging Inspection',
    category: 'Panel Cleaning / Damage',
    priority: 'LOW',
    assignedTechnicianId: 'emp-11',
    assignedTechnicianName: 'Rohit Verma',
    status: 'VISIT SCHEDULED',
    createdDate: '2026-09-05',
    scheduledDate: '2026-09-12',
    notes: 'Water pressure cleaner and thermal drone team booked for Saturday visit.',
    photos: []
  }
];

const initialAMCContracts: AMCContract[] = [
  {
    id: 'amc-1',
    amcCode: 'AMC-2026-01',
    customerId: 'cust-4',
    customerName: 'GreenTech Logistics Hub',
    projectId: 'proj-4',
    projectTitle: '50 kW Warehouse Solar PV Plant',
    planName: 'Gold Preventive (4 Visits/Yr)',
    startDate: '2026-09-01',
    endDate: '2027-08-31',
    renewalDate: '2027-08-15',
    annualAmount: 48000,
    visitsCompleted: 0,
    totalVisits: 4,
    status: 'ACTIVE'
  }
];

const initialNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Site Survey Completed',
    message: 'Rajesh Kumar submitted the detailed survey report for ABC Industries.',
    type: 'SUCCESS',
    timestamp: '2026-09-06 04:30 PM',
    read: false,
    linkType: 'PROJECT',
    linkId: 'proj-1'
  },
  {
    id: 'notif-2',
    title: 'Milestone Payment Received',
    message: '₹20,00,000 received for ABC Industries (Installation Milestone).',
    type: 'INFO',
    timestamp: '2026-09-05 02:15 PM',
    read: false,
    linkType: 'PAYMENT',
    linkId: 'pay-2'
  },
  {
    id: 'notif-3',
    title: 'Project Delayed Warning',
    message: 'Sunrise Cold Storage (75 kW) is delayed on Meter Synchronisation stage.',
    type: 'WARNING',
    timestamp: '2026-09-04 11:00 AM',
    read: true,
    linkType: 'PROJECT',
    linkId: 'proj-5'
  },
  {
    id: 'notif-4',
    title: 'New Solar Lead Assigned',
    message: 'New high-value lead (200 kW Balaji Agro) assigned to Priya Verma.',
    type: 'INFO',
    timestamp: '2026-09-07 09:00 AM',
    read: false,
    linkType: 'LEAD',
    linkId: 'lead-5'
  }
];

const initialSettings: SystemSettings = {
  companyName: 'SolarPulse EPC & Energy Solutions',
  companyAddress: '401-404, Solitaire Heights, SG Highway, Ahmedabad, Gujarat 380054',
  companyPhone: '+91 79 4001 8800',
  companyEmail: 'epc@solarpulse.com',
  companyGst: '24AAECS9921D1Z8',
  currencySymbol: '₹',
  taxRatePercent: 18,
  tallyServerUrl: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_TALLY_SERVER_URL) ? import.meta.env.VITE_TALLY_SERVER_URL : '',
  tallyCompany: 'SolarPulse EPC 2026-27',
  tallyStatus: 'NOT CONFIGURED',
  whatsAppStatus: 'SANDBOX_READY'
};

const initialSurveys: SiteSurveyData[] = [
  {
    id: 'surv-1',
    projectId: 'proj-1',
    customerId: 'cust-1',
    engineerId: 'emp-3',
    engineerName: 'Rajesh Kumar',
    surveyDate: '2026-08-14',
    status: 'APPROVED',
    siteAddress: 'Plot No. 42-45, GIDC Industrial Estate, Sanand, Ahmedabad',
    gps: {
      latitude: 22.9868,
      longitude: 72.3789,
      locationName: 'GIDC Sanand Phase II'
    },
    roofType: 'RCC Flat',
    roofAreaSqFt: 12500,
    shadowFreeAreaSqFt: 11000,
    shadowObstacles: 'Small parapet wall (3ft) on east, negligible shadow impact during peak 9am-4pm.',
    electricityBillNumber: 'SAN-HT-99210',
    monthlyAverageConsumptionUnits: 14500,
    sanctionedLoadKw: 150,
    tariffRatePerUnit: 8.45,
    existingStructureCondition: 'Heavy industrial RCC roof with waterproofing in great shape.',
    recommendedCapacityKw: 100,
    feasibilityScore: 'EXCELLENT',
    photos: [
      {
        id: 'sp-1',
        url: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=400',
        caption: 'South facing roof clear area',
        type: 'BEFORE',
        uploadedAt: '2026-08-14',
        uploadedBy: 'Rajesh Kumar'
      },
      {
        id: 'sp-2',
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&q=80&w=400',
        caption: 'Main LT switchgear panel room',
        type: 'DURING',
        uploadedAt: '2026-08-14',
        uploadedBy: 'Rajesh Kumar'
      }
    ],
    notes: 'Highly recommended for 100 kW grid-tied installation. Estimated monthly generation: 13,500 units saving ~₹1,14,000/mo.',
    reviewedBy: 'Amit Sharma (PM)',
    reviewedAt: '2026-08-15'
  }
];

const initialQuotations: Quotation[] = [
  {
    id: 'quote-1',
    quotationNumber: 'QTN-2026-0042',
    customerId: 'cust-1',
    customerName: 'ABC Industries Ltd.',
    projectId: 'proj-1',
    capacityKw: 100,
    subtotal: 4500000,
    discountAmount: 262712,
    gstPercent: 18,
    gstAmount: 762712,
    totalAmount: 5000000,
    paymentTerms: '40% Advance upon contract, 40% on material delivery at site, 20% on Net Meter commissioning.',
    warrantyDetails: '25 Years Linear Performance Warranty on Solar PV Modules. 5 Years on String Inverter.',
    termsAndConditions: 'Turnkey EPC including CEIG approval, Discom Net Meter liaison, structural calculation, installation, testing and 1 year free O&M.',
    status: 'ACCEPTED',
    validUntil: '2026-09-15',
    createdAt: '2026-08-12',
    acceptedAt: '2026-08-16',
    items: [
      { id: 'qi-1', category: 'Panels', description: 'Tier-1 Mono PERC Bifacial 540W Modules', makeModel: 'Waaree / Adani 540Wp', quantity: 185, unit: 'Nos', unitPrice: 10200, totalPrice: 1887000 },
      { id: 'qi-2', category: 'Inverter', description: '100 kW On-Grid 3-Phase String Inverter with Multi-MPPT', makeModel: 'Sungrow SG100CX', quantity: 1, unit: 'Set', unitPrice: 620000, totalPrice: 620000 },
      { id: 'qi-3', category: 'Structure', description: 'HDG 80 Micron Elevated Module Mounting Structure with 23° Tilt', makeModel: 'Hot Dip Galvanized Steel', quantity: 100, unit: 'kW', unitPrice: 4200, totalPrice: 420000 },
      { id: 'qi-4', category: 'Civil Work', description: 'RCC Pedestal Casting M25 with Anchor Bolts & Chemical Waterproofing', makeModel: 'Civil Pedestals', quantity: 28, unit: 'Pillars', unitPrice: 6000, totalPrice: 168000 },
      { id: 'qi-5', category: 'Electrical', description: 'ACDB, DCDB with SPD Type II, Earthing Pits (4 Nos) & ESE Lightning Protection', makeModel: 'ABB/L&T Breakers + Chemical Earth', quantity: 1, unit: 'Lot', unitPrice: 490000, totalPrice: 490000 },
      { id: 'qi-6', category: 'Installation', description: 'Turnkey Mechanical, Electrical, Cable Trays, Pulling & Commissioning', makeModel: 'SolarPulse Certified Engineering', quantity: 100, unit: 'kW', unitPrice: 6500, totalPrice: 650000 },
      { id: 'qi-7', category: 'Net Metering', description: 'CEIG Drawings, Discom Net Metering Liasoning & Testing', makeModel: 'Discom Standard', quantity: 1, unit: 'Job', unitPrice: 265000, totalPrice: 265000 }
    ]
  }
];

class StorageService {
  private get<T>(key: string, defaultValue: T): T {
    try {
      const stored = localStorage.getItem(key);
      if (!stored) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
      return JSON.parse(stored) as T;
    } catch {
      return defaultValue;
    }
  }

  private set<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      window.dispatchEvent(new Event('solarpulse_storage_updated'));
    } catch (e) {
      console.error('Storage set error:', e);
    }
  }

  // --- Leads ---
  getLeads(): Lead[] {
    return this.get<Lead[]>(STORAGE_KEYS.LEADS, initialLeads);
  }

  saveLead(lead: Lead): void {
    const leads = this.getLeads();
    const index = leads.findIndex(l => l.id === lead.id);
    if (index >= 0) {
      leads[index] = { ...lead, updatedAt: new Date().toISOString() };
    } else {
      leads.unshift({ ...lead, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    this.set(STORAGE_KEYS.LEADS, leads);
  }

  deleteLead(id: string): void {
    const leads = this.getLeads().filter(l => l.id !== id);
    this.set(STORAGE_KEYS.LEADS, leads);
  }

  addLead(leadData: Partial<Lead> & { customerName: string; phone: string; [key: string]: any }): Lead {
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      customerName: leadData.customerName,
      companyName: leadData.companyName || leadData.customerName,
      phone: leadData.phone,
      email: leadData.email || '',
      address: leadData.address || '',
      city: leadData.city || 'Ahmedabad',
      solarCapacityKw: Number(leadData.solarCapacityKw) || 10,
      estimatedValue: Number(leadData.estimatedValue) || 450000,
      source: leadData.source || 'Direct Call',
      assignedSalespersonId: leadData.assignedSalespersonId || leadData.assignedToId || 'emp-4',
      assignedSalespersonName: leadData.assignedSalespersonName || leadData.assignedToName || 'Priya Verma',
      status: (leadData.status as LeadStatus) || 'NEW',
      notes: leadData.notes || '',
      nextFollowUpDate: leadData.nextFollowUpDate || new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.saveLead(newLead);
    return newLead;
  }

  // Convert Lead to Customer & Project
  convertLeadToCustomerAndProject(
    leadId: string,
    convertedByName?: string,
    role?: string
  ): { customer: Customer; project: SolarProject } {
    let lead = this.getLeads().find(l => l.id === leadId);
    if (!lead) {
      const customers = this.getCustomers();
      const projects = this.getProjects();
      return { customer: customers[0], project: projects[0] };
    }

    const customerId = `cust-${Date.now()}`;
    const projectId = `proj-${Date.now()}`;

    const newCustomer: Customer = {
      id: customerId,
      name: lead.customerName,
      companyName: lead.companyName || lead.customerName,
      customerType: 'Commercial',
      phone: lead.phone,
      email: lead.email,
      siteAddress: lead.address,
      city: lead.city,
      state: 'Gujarat',
      pincode: '380001',
      status: 'ACTIVE',
      activeProjectId: projectId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const newProject: SolarProject = {
      id: projectId,
      projectCode: `SOL-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      customerId: customerId,
      customerName: newCustomer.name,
      title: `${lead.solarCapacityKw} kW Rooftop Solar Project`,
      capacityKw: lead.solarCapacityKw,
      totalValue: lead.estimatedValue || lead.solarCapacityKw * 50000,
      status: 'SURVEY',
      currentStageKey: 'site_survey',
      completionPercentage: 10,
      progressPercentage: 10,
      location: lead.city,
      projectManagerId: 'emp-2',
      projectManagerName: convertedByName || 'Amit Sharma',
      siteAddress: lead.address,
      city: lead.city,
      startDate: new Date().toISOString().split('T')[0],
      expectedCompletionDate: new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0],
      stages: buildStandardWorkflowStages(projectId, lead.solarCapacityKw, 'EARLY'),
      notes: `Converted from Lead ID: ${lead.id}${convertedByName ? ` by ${convertedByName} (${role || 'Sales'})` : ''}. ${lead.notes}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Update lead status to WON
    this.saveLead({ ...lead, status: 'WON' });
    this.saveCustomer(newCustomer);
    this.saveProject(newProject);

    this.addNotification({
      title: 'Lead Converted to Active Project',
      message: `${lead.customerName} converted into Customer & Project ${newProject.projectCode} (${lead.solarCapacityKw} kW).`,
      type: 'SUCCESS',
      linkType: 'PROJECT',
      linkId: projectId,
      customerId: customerId,
      projectId: projectId,
      projectName: newProject.title
    });

    return { customer: newCustomer, project: newProject };
  }

  // --- Customers ---
  getCustomers(): Customer[] {
    return this.get<Customer[]>(STORAGE_KEYS.CUSTOMERS, initialCustomers);
  }

  saveCustomer(customer: Customer): void {
    const customers = this.getCustomers();
    const index = customers.findIndex(c => c.id === customer.id);
    if (index >= 0) {
      customers[index] = { ...customer, updatedAt: new Date().toISOString() };
    } else {
      customers.unshift({ ...customer, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    this.set(STORAGE_KEYS.CUSTOMERS, customers);
  }

  // --- Projects & Workflow Automation ---
  getProjects(): SolarProject[] {
    return this.get<SolarProject[]>(STORAGE_KEYS.PROJECTS, initialProjects);
  }

  getProjectById(id: string): SolarProject | undefined {
    return this.getProjects().find(p => p.id === id);
  }

  saveProject(project: SolarProject): void {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === project.id);
    if (index >= 0) {
      projects[index] = { ...project, updatedAt: new Date().toISOString() };
    } else {
      projects.unshift({ ...project, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    this.set(STORAGE_KEYS.PROJECTS, projects);
  }

  // Update a single stage within a project with automatic advancement logic
  updateProjectStage(
    projectId: string,
    stageId: string,
    updates: Partial<ProjectStage>,
    actorName: string,
    actorRole: string
  ): SolarProject | null {
    const project = this.getProjectById(projectId);
    if (!project) return null;

    const stageIndex = project.stages.findIndex(s => s.id === stageId);
    if (stageIndex === -1) return null;

    const currentStage = project.stages[stageIndex];
    const updatedStage: ProjectStage = {
      ...currentStage,
      ...updates
    };

    // If an action took place, log activity
    if (updates.status && updates.status !== currentStage.status) {
      updatedStage.activities = [
        ...(updatedStage.activities || []),
        {
          id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          timestamp: new Date().toLocaleString(),
          user: actorName,
          role: actorRole,
          action: `Stage status changed from ${currentStage.status} to ${updates.status}`,
          details: updates.comments
        }
      ];
    }

    project.stages[stageIndex] = updatedStage;

    // BUSINESS LOGIC: AUTOMATIC WORKFLOW PROGRESSION
    // If a stage is marked COMPLETED or APPROVED, unlock the next stage!
    if (
      (updates.status === 'COMPLETED' || updates.status === 'APPROVED') &&
      stageIndex + 1 < project.stages.length
    ) {
      const nextStage = project.stages[stageIndex + 1];
      if (nextStage.status === 'NOT STARTED') {
        nextStage.status = 'IN PROGRESS';
        nextStage.startDate = new Date().toISOString().split('T')[0];
        nextStage.activities = [
          ...(nextStage.activities || []),
          {
            id: `act-${Date.now()}-auto-${Math.random().toString(36).slice(2, 7)}`,
            timestamp: new Date().toLocaleString(),
            user: 'System Workflow Engine',
            role: 'Automation',
            action: `Automatically unlocked next stage: "${nextStage.title}" because previous stage was completed.`
          }
        ];
        project.currentStageKey = nextStage.stageKey;

        // Notification
        this.addNotification({
          title: `Next Stage Unlocked: ${nextStage.title}`,
          message: `Stage "${updatedStage.title}" completed. "${nextStage.title}" is now active for ${project.customerName}.`,
          type: 'SUCCESS',
          linkType: 'PROJECT',
          linkId: project.id
        });
      }
    }

    // Recalculate Project Completion Percentage dynamically based on completed stages
    const totalStages = project.stages.length;
    const completedStages = project.stages.filter(s => s.status === 'COMPLETED' || s.status === 'APPROVED').length;
    const inProgressStages = project.stages.filter(s => s.status === 'IN PROGRESS').length;
    project.completionPercentage = Math.round(((completedStages + (inProgressStages * 0.4)) / totalStages) * 100);

    // If all stages complete, mark project COMPLETED
    if (completedStages === totalStages) {
      project.status = 'COMPLETED';
      project.actualCompletionDate = new Date().toISOString().split('T')[0];
    } else if (project.stages.some(s => s.status === 'OVERDUE' || s.status === 'BLOCKED')) {
      project.status = 'DELAYED';
    } else {
      project.status = 'INSTALLATION';
    }

    this.saveProject(project);
    return project;
  }

  // Toggle checklist item within a stage
  toggleChecklistItem(
    projectId: string,
    stageId: string,
    checkItemId: string,
    actorName: string,
    actorRole: string
  ): SolarProject | null {
    const project = this.getProjectById(projectId);
    if (!project) return null;

    const stage = project.stages.find(s => s.id === stageId);
    if (!stage) return null;

    const item = stage.checklist.find(c => c.id === checkItemId);
    if (!item) return null;

    item.completed = !item.completed;
    item.completedAt = item.completed ? new Date().toISOString() : undefined;
    item.completedBy = item.completed ? actorName : undefined;

    stage.activities.push({
      id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      timestamp: new Date().toLocaleString(),
      user: actorName,
      role: actorRole,
      action: `${item.completed ? 'Checked' : 'Unchecked'} task: "${item.title}"`
    });

    // If all items checked and stage is in progress, automatically set to COMPLETED
    const allChecked = stage.checklist.every(c => c.completed);
    if (allChecked && stage.status === 'IN PROGRESS') {
      return this.updateProjectStage(projectId, stageId, { status: 'COMPLETED', completedDate: new Date().toISOString().split('T')[0] }, actorName, actorRole);
    }

    this.saveProject(project);
    return project;
  }

  // --- Payments & Invoices ---
  getPayments(): PaymentRecord[] {
    return this.get<PaymentRecord[]>(STORAGE_KEYS.PAYMENTS, initialPayments);
  }

  savePayment(payment: PaymentRecord): void {
    const payments = this.getPayments();
    const index = payments.findIndex(p => p.id === payment.id);
    if (index >= 0) {
      payments[index] = payment;
    } else {
      payments.unshift(payment);
    }
    this.set(STORAGE_KEYS.PAYMENTS, payments);
  }

  // --- Expenses ---
  getExpenses(): ExpenseRecord[] {
    return this.get<ExpenseRecord[]>(STORAGE_KEYS.EXPENSES, initialExpenses);
  }

  saveExpense(expense: ExpenseRecord): void {
    const expenses = this.getExpenses();
    const index = expenses.findIndex(e => e.id === expense.id);
    if (index >= 0) {
      expenses[index] = expense;
    } else {
      expenses.unshift(expense);
    }
    this.set(STORAGE_KEYS.EXPENSES, expenses);
  }

  // --- Employees & HRMS ---
  getEmployees(): Employee[] {
    return this.get<Employee[]>(STORAGE_KEYS.EMPLOYEES, initialEmployees);
  }

  saveEmployee(emp: Employee): void {
    const employees = this.getEmployees();
    const index = employees.findIndex(e => e.id === emp.id);
    if (index >= 0) {
      employees[index] = emp;
    } else {
      employees.unshift(emp);
    }
    this.set(STORAGE_KEYS.EMPLOYEES, employees);
  }

  // --- Attendance ---
  getAttendance(): AttendanceRecord[] {
    return this.get<AttendanceRecord[]>(STORAGE_KEYS.ATTENDANCE, initialAttendance);
  }

  recordAttendance(record: AttendanceRecord): void {
    const attendance = this.getAttendance();
    attendance.unshift(record);
    this.set(STORAGE_KEYS.ATTENDANCE, attendance);
  }

  // --- Service & AMC ---
  getServiceTickets(): ServiceTicket[] {
    return this.get<ServiceTicket[]>(STORAGE_KEYS.SERVICE_TICKETS, initialServiceTickets);
  }

  saveServiceTicket(ticket: ServiceTicket): void {
    const tickets = this.getServiceTickets();
    const index = tickets.findIndex(t => t.id === ticket.id);
    if (index >= 0) {
      tickets[index] = ticket;
    } else {
      tickets.unshift(ticket);
    }
    this.set(STORAGE_KEYS.SERVICE_TICKETS, tickets);
  }

  resolveServiceTicket(ticketId: string, resolutionNotes?: string): void {
    const tickets = this.getServiceTickets();
    const index = tickets.findIndex(t => t.id === ticketId || t.ticketId === ticketId);
    if (index >= 0) {
      tickets[index] = {
        ...tickets[index],
        status: 'RESOLVED',
        resolvedDate: new Date().toISOString().slice(0, 10),
        notes: resolutionNotes ? `${tickets[index].notes ? tickets[index].notes + ' | ' : ''}Resolved: ${resolutionNotes}` : tickets[index].notes
      };
      this.set(STORAGE_KEYS.SERVICE_TICKETS, tickets);
    }
  }

  getRecentActivities(limit: number = 8): Array<{ id: string; action: string; details: string; userName: string; timestamp: string }> {
    const activities: Array<{ id: string; action: string; details: string; userName: string; timestamp: string }> = [];
    const projects = this.getProjects();
    projects.forEach(p => {
      p.stages.forEach(s => {
        s.activities?.forEach((a, aIdx) => {
          // Guarantee unique key across any project, stage, or activity
          const uniqueId = a.id && a.id.startsWith(p.id) ? a.id : `${p.id}-${s.stageKey}-${a.id || aIdx}`;
          activities.push({
            id: uniqueId,
            action: `${p.projectCode} • ${s.title}: ${a.action}`,
            details: a.details || `${s.title} updated`,
            userName: a.user,
            timestamp: a.timestamp
          });
        });
      });
    });

    if (activities.length === 0) {
      return [
        {
          id: 'act-1',
          action: 'SOL-2026-101 • Inverter Installation Completed',
          details: 'Sungrow 100kW string inverter mounted and wired to ACDB panel.',
          userName: 'Ankit Joshi',
          timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
        },
        {
          id: 'act-2',
          action: 'SOL-2026-102 • Module Mounting Finished',
          details: '185 Waaree 540Wp solar panels aligned and torqued to HDG structure.',
          userName: 'Manoj Tiwari',
          timestamp: new Date(Date.now() - 3600000 * 5).toISOString()
        },
        {
          id: 'act-3',
          action: 'SOL-2026-101 • Site Survey Approved',
          details: 'Shadow analysis & RCC roof load bearing report verified.',
          userName: 'Amit Sharma',
          timestamp: new Date(Date.now() - 3600000 * 12).toISOString()
        },
        {
          id: 'act-4',
          action: 'Finance • Advance Milestone Received',
          details: '₹20,00,000 received via RTGS from ABC Industries Ltd.',
          userName: 'Suresh Shah',
          timestamp: new Date(Date.now() - 3600000 * 24).toISOString()
        }
      ];
    }

    return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, limit);
  }

  getAMCContracts(): AMCContract[] {
    return this.get<AMCContract[]>(STORAGE_KEYS.AMC_CONTRACTS, initialAMCContracts);
  }

  saveAMCContract(contract: AMCContract): void {
    const contracts = this.getAMCContracts();
    const index = contracts.findIndex(c => c.id === contract.id);
    if (index >= 0) {
      contracts[index] = contract;
    } else {
      contracts.unshift(contract);
    }
    this.set(STORAGE_KEYS.AMC_CONTRACTS, contracts);
  }

  // --- Site Surveys ---
  getSurveys(): SiteSurveyData[] {
    return this.get<SiteSurveyData[]>(STORAGE_KEYS.SURVEYS, initialSurveys);
  }

  saveSurvey(survey: SiteSurveyData): void {
    const surveys = this.getSurveys();
    const index = surveys.findIndex(s => s.id === survey.id);
    if (index >= 0) {
      surveys[index] = survey;
    } else {
      surveys.unshift(survey);
    }
    this.set(STORAGE_KEYS.SURVEYS, surveys);
  }

  // --- Quotations ---
  getQuotations(): Quotation[] {
    return this.get<Quotation[]>(STORAGE_KEYS.QUOTATIONS, initialQuotations);
  }

  saveQuotation(quote: Quotation): void {
    const quotes = this.getQuotations();
    const index = quotes.findIndex(q => q.id === quote.id);
    if (index >= 0) {
      quotes[index] = quote;
    } else {
      quotes.unshift(quote);
    }
    this.set(STORAGE_KEYS.QUOTATIONS, quotes);
  }

  // --- Notifications ---
  getNotifications(): AppNotification[] {
    return this.get<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, initialNotifications);
  }

  addNotification(notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>): void {
    const notifications = this.getNotifications();
    notifications.unshift({
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      read: false
    });
    this.set(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }

  markNotificationAsRead(id: string): void {
    const notifications = this.getNotifications().map(n => n.id === id ? { ...n, read: true } : n);
    this.set(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }

  markAllNotificationsAsRead(): void {
    const notifications = this.getNotifications().map(n => ({ ...n, read: true }));
    this.set(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }

  // --- Settings ---
  getSettings(): SystemSettings {
    return this.get<SystemSettings>(STORAGE_KEYS.SETTINGS, initialSettings);
  }

  saveSettings(settings: SystemSettings): void {
    this.set(STORAGE_KEYS.SETTINGS, settings);
  }

  // Reset demo data to default fresh state
  resetAllData(): void {
    localStorage.removeItem(STORAGE_KEYS.LEADS);
    localStorage.removeItem(STORAGE_KEYS.CUSTOMERS);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.PAYMENTS);
    localStorage.removeItem(STORAGE_KEYS.EXPENSES);
    localStorage.removeItem(STORAGE_KEYS.EMPLOYEES);
    localStorage.removeItem(STORAGE_KEYS.ATTENDANCE);
    localStorage.removeItem(STORAGE_KEYS.SERVICE_TICKETS);
    localStorage.removeItem(STORAGE_KEYS.AMC_CONTRACTS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.SURVEYS);
    localStorage.removeItem(STORAGE_KEYS.QUOTATIONS);
    window.location.reload();
  }
}

export const storageService = new StorageService();
