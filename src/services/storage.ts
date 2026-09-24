import { Complaint, VendorCheckResult, KnowledgeItem, ImprovementItem } from '../types';
import { INITIAL_DEMO_COMPLAINTS } from '../data/demoComplaints';
import { KNOWLEDGE_BASE, IMPROVEMENT_CATALOGUE } from '../data/catalogue';

const COMPLAINTS_KEY = 'aaharsetu_complaints_v1';
const VENDOR_CHECKS_KEY = 'aaharsetu_vendor_checks_v1';

export const storageService = {
  // Complaints
  getComplaints(): Complaint[] {
    try {
      const data = localStorage.getItem(COMPLAINTS_KEY);
      if (!data) {
        localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(INITIAL_DEMO_COMPLAINTS));
        return INITIAL_DEMO_COMPLAINTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_DEMO_COMPLAINTS;
    }
  },

  saveComplaint(complaint: Complaint): void {
    const list = this.getComplaints();
    const updated = [complaint, ...list];
    try {
      localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save complaint to localStorage', e);
    }
  },

  getComplaintById(id: string): Complaint | undefined {
    const list = this.getComplaints();
    return list.find((c) => c.id === id);
  },

  // Vendor Checks
  getVendorChecks(): VendorCheckResult[] {
    try {
      const data = localStorage.getItem(VENDOR_CHECKS_KEY);
      if (!data) {
        // Seed default vendor checks
        const defaultChecks: VendorCheckResult[] = [
          {
            id: 'VC-2025-0101',
            stallName: 'Sharma Chaat & Snacks',
            location: 'Sector 15 Market, Faridabad',
            stallType: 'Street Food Cart',
            date: '2025-05-15',
            answers: { 1: 'yes', 2: 'yes', 3: 'no', 4: 'yes', 5: 'no', 6: 'yes', 7: 'yes', 8: 'no', 9: 'no', 10: 'yes' },
            score: 60,
            passedCount: 6,
            failedCount: 4,
            uncertainCount: 0,
            grade: 'Grade C - Needs Improvement',
            gradeHi: 'ग्रेड C - सुधार की आवश्यकता',
            completedPractices: [
              'Food kept covered',
              'Clean water used',
              'Utensils cleaned',
              'Preparation area kept tidy',
              'Hand hygiene maintained',
              'Pests prevented'
            ],
            areasNeedingAttention: [
              'Raw and cooked foods not separated',
              'Waste stored too close to preparation',
              'Food-contact surfaces not sanitized frequently',
              'Perishable items (chutney/curd) not kept cold'
            ],
            priorityImprovements: [
              'Separate raw/cooked tongs and cutting mats',
              'Hands-free covered pedal dustbin',
              'Thermal cooler bag for curd & chutneys'
            ],
            createdAt: '2025-05-15T09:00:00.000Z'
          },
          {
            id: 'VC-2025-0102',
            stallName: 'Gupta Sweets & Snacks Corner',
            location: 'Connaught Place Outer Circle, New Delhi',
            stallType: 'Permanent Sweet Stall',
            date: '2025-05-17',
            answers: { 1: 'yes', 2: 'yes', 3: 'yes', 4: 'yes', 5: 'yes', 6: 'yes', 7: 'yes', 8: 'yes', 9: 'yes', 10: 'yes' },
            score: 100,
            passedCount: 10,
            failedCount: 0,
            uncertainCount: 0,
            grade: 'Grade A - Excellent Hygiene',
            gradeHi: 'ग्रेड A - उत्कृष्ट स्वच्छता',
            completedPractices: [
              'All 10 benchmark practices observed systematically'
            ],
            areasNeedingAttention: [],
            priorityImprovements: ['Maintain routine daily log audits'],
            createdAt: '2025-05-17T11:30:00.000Z'
          }
        ];
        localStorage.setItem(VENDOR_CHECKS_KEY, JSON.stringify(defaultChecks));
        return defaultChecks;
      }
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  saveVendorCheck(check: VendorCheckResult): void {
    const list = this.getVendorChecks();
    const updated = [check, ...list];
    try {
      localStorage.setItem(VENDOR_CHECKS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save vendor check', e);
    }
  },

  getLatestVendorCheck(): VendorCheckResult | null {
    const list = this.getVendorChecks();
    return list.length > 0 ? list[0] : null;
  },

  // Knowledge & Retrieval
  searchKnowledge(query: string): KnowledgeItem[] {
    const q = query.toLowerCase().trim();
    if (!q) return KNOWLEDGE_BASE;

    return KNOWLEDGE_BASE.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q) || item.titleHi.includes(q);
      const matchSummary = item.summary.toLowerCase().includes(q) || item.summaryHi.includes(q);
      const matchContent = item.content.toLowerCase().includes(q) || item.contentHi.includes(q);
      const matchKeywords = item.keywords.some((k) => q.includes(k) || k.includes(q));
      return matchTitle || matchSummary || matchContent || matchKeywords;
    });
  },

  getKnowledgeBase(): KnowledgeItem[] {
    return KNOWLEDGE_BASE;
  },

  getImprovementCatalogue(): ImprovementItem[] {
    return IMPROVEMENT_CATALOGUE;
  },

  resetDemoData(): void {
    localStorage.removeItem(COMPLAINTS_KEY);
    localStorage.removeItem(VENDOR_CHECKS_KEY);
    this.getComplaints();
    this.getVendorChecks();
  }
};
