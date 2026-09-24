import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { storageService } from '../services/storage';
import { Complaint, VendorCheckResult } from '../types';
import { PrintableReportModal } from '../components/PrintableReportModal';
import {
  BarChart3,
  TrendingUp,
  ShieldAlert,
  AlertTriangle,
  RefreshCw,
  Download,
  Filter,
  Eye,
  Layers
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const { t, language } = useLanguage();

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [vendorChecks, setVendorChecks] = useState<VendorCheckResult[]>([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState<string>('all');
  const [selectedModalComplaint, setSelectedModalComplaint] = useState<Complaint | null>(null);

  const loadData = () => {
    setComplaints(storageService.getComplaints());
    setVendorChecks(storageService.getVendorChecks());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleReset = () => {
    if (window.confirm(language === 'hi' ? 'क्या आप डेमो डेटा रीसेट करना चाहते हैं?' : 'Reset demo dataset to default initial state?')) {
      storageService.resetDemoData();
      loadData();
    }
  };

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({
      complaints,
      vendorChecks,
      exportedAt: new Date().toISOString(),
      disclaimer: 'Synthetic prototype data for educational demonstration.'
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `aaharsetu_synthetic_data_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Metrics calculation
  const totalComplaints = complaints.length;
  const hygieneCount = complaints.filter((c) => c.detectedCategory === 'Hygiene').length;
  const packagingCount = complaints.filter((c) => c.detectedCategory === 'Packaging').length;
  const spoilageCount = complaints.filter((c) => c.detectedCategory === 'Spoilage/Expired Food').length;
  const highPriorityCount = complaints.filter((c) => c.prototypePriority === 'High').length;
  const totalVendorChecks = vendorChecks.length;
  const avgVendorScore = totalVendorChecks > 0
    ? Math.round(vendorChecks.reduce((acc, v) => acc + v.score, 0) / totalVendorChecks)
    : 0;

  // Chart 1: Monthly Trend
  const monthlyTrendData = [
    { month: 'Jan', reports: 12, resolved: 10 },
    { month: 'Feb', reports: 19, resolved: 16 },
    { month: 'Mar', reports: 24, resolved: 21 },
    { month: 'Apr', reports: 31, resolved: 28 },
    { month: 'May', reports: 38 + totalComplaints - 5, resolved: 33 }
  ];

  // Chart 2: Category Distribution
  const categoryCounts: Record<string, number> = {
    'Hygiene': 0,
    'Contamination': 0,
    'Adulteration': 0,
    'Packaging': 0,
    'Labelling': 0,
    'Spoilage/Expired Food': 0,
    'Food Premises': 0,
    'Other': 0
  };

  complaints.forEach((c) => {
    if (categoryCounts[c.detectedCategory] !== undefined) {
      categoryCounts[c.detectedCategory]++;
    } else {
      categoryCounts['Other']++;
    }
  });

  const categoryChartData = Object.entries(categoryCounts).map(([cat, count]) => ({
    name: cat,
    count
  }));

  // Chart 3: Priority Distribution
  const priorityData = [
    { name: 'High Priority', value: complaints.filter((c) => c.prototypePriority === 'High').length, color: '#e11d48' },
    { name: 'Medium Priority', value: complaints.filter((c) => c.prototypePriority === 'Medium').length, color: '#d97706' },
    { name: 'Low Priority', value: complaints.filter((c) => c.prototypePriority === 'Low').length, color: '#059669' }
  ];

  // Filtered complaints table
  const filteredComplaints = complaints.filter((c) => {
    const matchCat = selectedCategoryFilter === 'all' || c.detectedCategory === selectedCategoryFilter;
    const matchPri = selectedPriorityFilter === 'all' || c.prototypePriority === selectedPriorityFilter;
    return matchCat && matchPri;
  });

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold border border-blue-300">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'सिंथेटिक एनालिटिक्स डैशबोर्ड' : 'Synthetic Analytics Dashboard'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
            {t('dashboardTitle')}
          </h1>
          <p className="text-sm text-slate-600">
            {t('dashboardSubtitle')}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-300 shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>{t('exportData')}</span>
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t('resetDemoData')}</span>
          </button>
        </div>
      </div>

      {/* Synthetic Data Disclaimer Callout */}
      <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3 shadow-xs">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">
            {language === 'hi' ? 'सिंथेटिक डेटा अस्वीकरण:' : 'Synthetic Demo Dataset Notice:'}
          </p>
          <p className="mt-0.5 text-amber-800 text-xs">
            {t('dashboardSyntheticNotice')}
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Complaints */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('metricTotalComplaints')}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{totalComplaints}</div>
          <span className="text-[11px] text-slate-500 block">
            {spoilageCount} Spoilage • {hygieneCount} Hygiene • {packagingCount} Packaging
          </span>
        </div>

        {/* High Priority */}
        <div className="bg-rose-50/70 p-5 rounded-2xl border border-rose-200 shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
            {t('metricHighPriority')}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-rose-700">{highPriorityCount}</div>
          <span className="text-[11px] text-rose-600 block">
            {Math.round((highPriorityCount / (totalComplaints || 1)) * 100)}% of total logged
          </span>
        </div>

        {/* Vendor Checks */}
        <div className="bg-teal-50/70 p-5 rounded-2xl border border-teal-200 shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
            {t('metricVendorChecks')}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-teal-800">{totalVendorChecks}</div>
          <span className="text-[11px] text-teal-700 block">
            Self-assessment audits
          </span>
        </div>

        {/* Avg Vendor Score */}
        <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            {t('metricAvgHygieneScore')}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-800">{avgVendorScore}/100</div>
          <span className="text-[11px] text-emerald-700 block">
            Benchmark rating
          </span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Trend Area Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>{t('chartMonthlyTrend')}</span>
            </h3>
            <span className="text-xs text-slate-400 font-semibold">Synthetic Timeline</span>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    color: '#fff',
                    border: 'none',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="reports" stroke="#059669" strokeWidth={2} fillOpacity={1} fill="url(#colorReports)" name="Submissions" />
                <Area type="monotone" dataKey="resolved" stroke="#0284c7" strokeWidth={2} fillOpacity={0} strokeDasharray="4 4" name="Resolved Guidance" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Breakdown Donut */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>{t('chartPriorityDist')}</span>
            </h3>
            <span className="text-xs text-slate-400">Risk Severity</span>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    color: '#fff',
                    border: 'none',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Custom Legend */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-slate-100">
            {priorityData.map((p, i) => (
              <div key={i} className="space-y-0.5">
                <span className="w-2.5 h-2.5 rounded-full inline-block mr-1" style={{ backgroundColor: p.color }}></span>
                <span className="font-bold text-slate-800 block text-xs">{p.value}</span>
                <span className="text-[10px] text-slate-500">{p.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown Bar Chart */}
        <div className="lg:col-span-3 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-700" />
              <span>{t('chartCategoryDist')}</span>
            </h3>
            <span className="text-xs text-slate-400">8 Categories</span>
          </div>

          <div className="h-56 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} interval={0} angle={-15} textAnchor="end" />
                <YAxis stroke="#94a3b8" fontSize={12} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    color: '#fff',
                    border: 'none',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="count" fill="#0f766e" radius={[6, 6, 0, 0]} name="Logged Incidents" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Incidents Table with Filters */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-black text-slate-900 text-lg">
              {t('recentReports')}
            </h3>
            <p className="text-xs text-slate-500">
              {filteredComplaints.length} {language === 'hi' ? 'मामले प्रदर्शित' : 'incidents matching filters'}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-2.5 py-1.5 rounded-xl border border-slate-200">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="bg-transparent font-semibold text-slate-800 focus:outline-none"
              >
                <option value="all">{language === 'hi' ? 'सभी श्रेणियां' : 'All Categories'}</option>
                <option value="Hygiene">Hygiene</option>
                <option value="Spoilage/Expired Food">Spoilage/Expired Food</option>
                <option value="Adulteration">Adulteration</option>
                <option value="Packaging">Packaging</option>
                <option value="Labelling">Labelling</option>
                <option value="Contamination">Contamination</option>
                <option value="Food Premises">Food Premises</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-2.5 py-1.5 rounded-xl border border-slate-200">
              <select
                value={selectedPriorityFilter}
                onChange={(e) => setSelectedPriorityFilter(e.target.value)}
                className="bg-transparent font-semibold text-slate-800 focus:outline-none"
              >
                <option value="all">{language === 'hi' ? 'सभी प्राथमिकता' : 'All Priorities'}</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table / List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-extrabold tracking-wider">
                <th className="py-3 px-3">ID & Date</th>
                <th className="py-3 px-3">Product</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Priority</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredComplaints.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-3">
                    <span className="font-mono font-bold text-slate-900 block">{c.id}</span>
                    <span className="text-[11px] text-slate-400">{c.date}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-slate-900 block max-w-xs truncate">{c.foodName}</span>
                    <span className="text-[11px] text-slate-500 max-w-xs truncate block">{c.location}</span>
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-700">
                    {c.detectedCategory}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${getPriorityBadgeClass(c.prototypePriority)}`}>
                      {c.prototypePriority}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 font-medium">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5"></span>
                    {c.status}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => setSelectedModalComplaint(c)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{language === 'hi' ? 'देखें' : 'Report'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Report Modal */}
      {selectedModalComplaint && (
        <PrintableReportModal
          complaint={selectedModalComplaint}
          onClose={() => setSelectedModalComplaint(null)}
        />
      )}
    </div>
  );
};
