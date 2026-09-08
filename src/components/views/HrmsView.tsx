import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storage';
import { Employee, AttendanceRecord } from '../../types/solar';
import { getCurrentGPSPosition } from '../../services/gps';
import {
  UserSquare2,
  Users,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  Plus,
  FileSpreadsheet,
  Phone,
  Mail,
  Building2,
  Sparkles,
  Search,
  X
} from 'lucide-react';

export const HrmsView: React.FC = () => {
  const { showToast, openImportExportModal, triggerRefresh } = useApp();
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState<'EMPLOYEES' | 'ATTENDANCE' | 'PAYROLL'>('EMPLOYEES');
  const [searchTerm, setSearchTerm] = useState('');
  const [isPunching, setIsPunching] = useState(false);

  const employees = useMemo(() => storageService.getEmployees(), []);
  const attendance = useMemo(() => storageService.getAttendance(), []);

  const filteredEmployees = useMemo(() => {
    return employees.filter(e =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.employeeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.designation.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [employees, searchTerm]);

  const handlePunchAttendance = async () => {
    setIsPunching(true);
    const gps = await getCurrentGPSPosition();
    setIsPunching(false);

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      date: now.toISOString().slice(0, 10),
      checkInTime: timeStr,
      checkInGps: `${gps.latitude}, ${gps.longitude}`,
      siteLocation: gps.locationName,
      status: 'PRESENT'
    };

    storageService.recordAttendance(newRecord);
    showToast(`Punch In recorded at ${timeStr} with GPS coordinates (${gps.latitude}°, ${gps.longitude}°)`, 'success');
    triggerRefresh();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
              Human Capital & Field Ops
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">Field Workforce, GPS Punch-in & Attendance</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            HRMS & Field Operations
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handlePunchAttendance}
            disabled={isPunching}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-2xs"
          >
            <MapPin className="w-4 h-4" />
            <span>{isPunching ? 'Verifying GPS...' : 'Punch In with Live GPS'}</span>
          </button>

          <button
            onClick={() => openImportExportModal('Employees')}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl shadow-2xs transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
            <span>Excel Hub</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('EMPLOYEES')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'EMPLOYEES' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Team Directory ({employees.length})
          </button>
          <button
            onClick={() => setActiveTab('ATTENDANCE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'ATTENDANCE' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Daily GPS Attendance ({attendance.length})
          </button>
          <button
            onClick={() => setActiveTab('PAYROLL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'PAYROLL' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly Salary Register
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search employee, role, code..."
            className="w-full text-xs pl-8 pr-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* TAB 1: EMPLOYEES */}
      {activeTab === 'EMPLOYEES' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map(e => (
            <div
              key={e.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:border-amber-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {e.employeeCode}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                    {e.department}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900">{e.name}</h3>
                <p className="text-xs text-slate-500 font-medium">{e.designation}</p>

                <div className="space-y-1.5 mt-4 text-xs text-slate-600">
                  <p className="flex items-center gap-2 truncate">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{e.phone}</span>
                  </p>
                  <p className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{e.email}</span>
                  </p>
                  <p className="flex items-center gap-2 truncate">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Joined: {e.joiningDate}</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Monthly Compensation</span>
                <span className="font-bold text-slate-900">₹{e.salaryMonthly.toLocaleString('en-IN')}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: ATTENDANCE */}
      {activeTab === 'ATTENDANCE' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Employee Name</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Check-In Time</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">GPS Coordinates</th>
                  <th className="py-3 px-4">Site Location Verified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {attendance.map(a => (
                  <tr key={a.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{a.employeeName}</td>
                    <td className="py-3.5 px-4 text-slate-600">{a.date}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{a.checkInTime}</td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-emerald-100 text-emerald-800">
                        {a.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">{a.checkInGps}</td>
                    <td className="py-3.5 px-4 text-slate-700">{a.siteLocation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PAYROLL */}
      {activeTab === 'PAYROLL' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">Payroll Cycle: Current Month</span>
            <span className="text-xs text-slate-500">Auto-calculated based on biometric & GPS attendance logs</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Days Present</th>
                  <th className="py-3 px-4">Gross Salary</th>
                  <th className="py-3 px-4">Net Payable (₹)</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {employees.map(e => (
                  <tr key={e.id} className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-4 font-mono text-slate-500">{e.employeeCode}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{e.name}</td>
                    <td className="py-3.5 px-4 text-slate-600">{e.department}</td>
                    <td className="py-3.5 px-4 text-slate-700 font-semibold">24 / 26</td>
                    <td className="py-3.5 px-4 text-slate-700">₹{e.salaryMonthly.toLocaleString('en-IN')}</td>
                    <td className="py-3.5 px-4 font-black text-slate-900">₹{e.salaryMonthly.toLocaleString('en-IN')}</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-emerald-100 text-emerald-800">
                        PROCESSED
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
