export type CategoryType =
  | 'Hygiene'
  | 'Contamination'
  | 'Adulteration'
  | 'Packaging'
  | 'Labelling'
  | 'Spoilage/Expired Food'
  | 'Food Premises'
  | 'Other';

export type PriorityLevel = 'Low' | 'Medium' | 'High';

export interface Complaint {
  id: string;
  foodName: string;
  description: string;
  category: CategoryType;
  detectedCategory: CategoryType;
  location: string;
  stallType?: string;
  date: string;
  evidenceUrl?: string;
  detectedRiskFactors: string[];
  prototypePriority: PriorityLevel;
  priorityExplanation: string;
  recommendedActions: string[];
  status: 'Under Review' | 'Flagged for Guidance' | 'Resolved' | 'Archived';
  createdAt: string;
  synthetic?: boolean;
}

export interface VendorCheckAnswer {
  questionId: number;
  answer: 'yes' | 'no' | 'not_sure';
}

export interface VendorCheckResult {
  id: string;
  stallName: string;
  location: string;
  stallType: string;
  date: string;
  answers: Record<number, 'yes' | 'no' | 'not_sure'>;
  score: number; // 0 to 100
  passedCount: number;
  failedCount: number;
  uncertainCount: number;
  grade: 'Grade A - Excellent Hygiene' | 'Grade B - Good Hygiene' | 'Grade C - Needs Improvement' | 'Critical - Immediate Action Needed';
  gradeHi: string;
  completedPractices: string[];
  areasNeedingAttention: string[];
  priorityImprovements: string[];
  createdAt: string;
}

export interface ImprovementItem {
  id: string;
  name: string;
  nameHi: string;
  category: 'food_protection' | 'water_sanitation' | 'waste_management' | 'personal_hygiene' | 'storage_pest';
  categoryLabel: string;
  categoryLabelHi: string;
  cost: number; // in INR
  impact: 'High' | 'Medium' | 'Low';
  description: string;
  descriptionHi: string;
  vendorBenefit: string;
  vendorBenefitHi: string;
  targetQuestionIds: number[];
  practicalTip: string;
  practicalTipHi: string;
  iconName: string;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  titleHi: string;
  category: string;
  categoryHi: string;
  keywords: string[];
  summary: string;
  summaryHi: string;
  content: string;
  contentHi: string;
  sourceTitle: string;
  sourceOrganization: string;
  sourceUrl: string;
  sourceType: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sources?: Array<{
    title: string;
    organization?: string;
    url: string;
    type: string;
  }>;
  suggestedFollowups?: string[];
}

export type Language = 'en' | 'hi';
