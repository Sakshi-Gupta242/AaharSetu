import { CategoryType, PriorityLevel } from '../types';

export interface ClassificationResult {
  category: CategoryType;
  detectedRiskFactors: string[];
  prototypePriority: PriorityLevel;
  explanation: string;
  recommendedActions: string[];
}

interface KeywordRule {
  category: CategoryType;
  keywords: string[];
  riskFactor: string;
  weight: number;
}

const CATEGORY_RULES: KeywordRule[] = [
  // Spoilage / Expired Food
  {
    category: 'Spoilage/Expired Food',
    keywords: ['swollen', 'bloated', 'puffed', 'puffed up', 'bulging', 'foul smell', 'stink', 'sour taste', 'rotten', 'fermented', 'fungus', 'mold', 'green mold', 'white film', 'slimy', 'curdled', 'expired', 'past expiry', 'bad smell'],
    riskFactor: 'Possible spoilage or packaging-related food safety concern (loss of seal/fermentation indicator). Note: This prototype cannot determine the actual cause or confirm contamination.',
    weight: 12,
  },
  // Contamination
  {
    category: 'Contamination',
    keywords: ['fly', 'flies', 'cockroach', 'insect', 'worm', 'worms', 'dead insect', 'hair', 'stone', 'sand', 'glass shard', 'plastic piece', 'metal staple', 'stapler pin', 'dust', 'drain', 'sewage'],
    riskFactor: 'Visible physical or biological foreign matter observed in food handling area.',
    weight: 11,
  },
  // Adulteration
  {
    category: 'Adulteration',
    keywords: ['synthetic', 'artificial color', 'chemical', 'bright yellow', 'bright green', 'malachite green', 'starch', 'detergent', 'urea', 'chalk', 'mineral oil', 'adulterated', 'fake', 'burning plastic', 'wax coating'],
    riskFactor: 'Suspected non-permitted color additive or foreign substance indicator requiring laboratory verification.',
    weight: 11,
  },
  // Packaging
  {
    category: 'Packaging',
    keywords: ['seal broken', 'torn pack', 'punctured', 'leaking packet', 'tampered', 'open pouch', 'dented can', 'rusted tin', 'loose cap', 'foil damaged'],
    riskFactor: 'Packaging integrity compromise or compromised protective barrier.',
    weight: 9,
  },
  // Labelling
  {
    category: 'Labelling',
    keywords: ['missing expiry', 'no date', 'no best before', 'fssai missing', 'no fssai license', 'no veg non-veg mark', 'no green dot', 'no allergen warning', 'misleading label', 'rubbed off date', 'tampered date', 'reprinted date'],
    riskFactor: 'Missing or illegible mandatory packaging label information (e.g. date of manufacture, expiry, or ingredients).',
    weight: 8,
  },
  // Hygiene
  {
    category: 'Hygiene',
    keywords: ['dirty hands', 'unwashed hands', 'no gloves', 'dirty cloth', 'dirty apron', 'coughing', 'sneezing', 'dirty nails', 'bare hands', 'wiped on dirty towel', 'uncovered food', 'unwashed plate', 'dirty water for washing'],
    riskFactor: 'Observable hygiene lapse during food preparation, serving, or utensil cleaning.',
    weight: 9,
  },
  // Food Premises
  {
    category: 'Food Premises',
    keywords: ['open drain', 'garbage heap', 'stagnant water', 'dusty road', 'near toilet', 'uncovered dustbin', 'mice', 'rats', 'rodents', 'dirty floor', 'greasy walls', 'waterlogging'],
    riskFactor: 'Environmental hygiene concern in vicinity of food preparation area.',
    weight: 8,
  }
];

export function classifyComplaint(description: string, foodName: string = '', userCategory?: string): ClassificationResult {
  const text = `${foodName.toLowerCase()} ${description.toLowerCase()}`;
  
  const categoryScores: Record<CategoryType, number> = {
    'Hygiene': 0,
    'Contamination': 0,
    'Adulteration': 0,
    'Packaging': 0,
    'Labelling': 0,
    'Spoilage/Expired Food': 0,
    'Food Premises': 0,
    'Other': 1 // base
  };

  const detectedRiskFactors: string[] = [];

  // Match keyword rules
  CATEGORY_RULES.forEach((rule) => {
    let matchedInRule = false;
    for (const kw of rule.keywords) {
      if (text.includes(kw)) {
        categoryScores[rule.category] += rule.weight;
        matchedInRule = true;
      }
    }
    if (matchedInRule && !detectedRiskFactors.includes(rule.riskFactor)) {
      detectedRiskFactors.push(rule.riskFactor);
    }
  });

  // Determine top category
  let topCategory: CategoryType = 'Other';
  let maxScore = 0;

  (Object.keys(categoryScores) as CategoryType[]).forEach((cat) => {
    if (categoryScores[cat] > maxScore) {
      maxScore = categoryScores[cat];
      topCategory = cat;
    }
  });

  // If user explicitly picked a valid category, respect it but keep risk factors
  const finalCategory: CategoryType = (userCategory && userCategory !== 'Auto' && userCategory !== 'Other' && categoryScores[userCategory as CategoryType] !== undefined)
    ? (userCategory as CategoryType)
    : (maxScore > 1 ? topCategory : 'Other');

  // Determine priority
  let priority: PriorityLevel = 'Low';
  let explanation = '';
  const actions: string[] = [];

  const isHighRiskKeywords = [
    'swollen', 'bloated', 'puffed', 'baby', 'infant', 'child', 'sick', 'vomiting', 'diarrhea',
    'hospital', 'poison', 'chemical', 'glass', 'dead insect', 'rat', 'cockroach', 'urea', 'detergent', 'mold'
  ];

  const isMediumRiskKeywords = [
    'expired', 'foul smell', 'dirty water', 'uncovered', 'torn pack', 'hair', 'stone', 'open drain', 'synthetic color'
  ];

  const hasHighKeyword = isHighRiskKeywords.some((k) => text.includes(k));
  const hasMedKeyword = isMediumRiskKeywords.some((k) => text.includes(k));

  if (hasHighKeyword || finalCategory === 'Spoilage/Expired Food' || finalCategory === 'Adulteration' || (finalCategory === 'Contamination' && (text.includes('insect') || text.includes('glass') || text.includes('rat')))) {
    priority = 'High';
    explanation = 'Possible spoilage or packaging-related food safety concern. Note: This prototype cannot determine the actual cause, confirm contamination, or provide laboratory analysis.';
    actions.push('Do not consume or taste the affected item.');
    actions.push('Preserve packaging, batch number, and purchase receipt in a secure bag for evidence.');
    actions.push('If feeling unwell after consuming any food, consult a qualified healthcare professional.');
    actions.push('Notify the vendor or store management regarding the observed condition.');
  } else if (hasMedKeyword || finalCategory === 'Hygiene' || finalCategory === 'Packaging' || finalCategory === 'Food Premises') {
    priority = 'Medium';
    explanation = 'Moderate hygiene or packaging integrity vulnerability identified based on submitted description. Note: This prototype cannot determine actual bacterial levels or confirm contamination.';
    actions.push('Refrain from consuming items exposed to open dust or questionable handling.');
    actions.push('Politely inform the stall operator regarding clean handling and covering practices.');
    actions.push('Document the stall location, date, and observation for record keeping.');
  } else {
    priority = 'Low';
    explanation = 'Informational observation or minor administrative/labeling variance without acute hazard indicators in the submitted description.';
    actions.push('Verify manufacturing and expiry dates on packaging before purchasing.');
    actions.push('Check for standard product information on packaged goods.');
    actions.push('Share constructive hygiene feedback with the vendor.');
  }

  if (detectedRiskFactors.length === 0) {
    detectedRiskFactors.push('General food observation requiring standard hygiene verification');
  }

  return {
    category: finalCategory,
    detectedRiskFactors,
    prototypePriority: priority,
    explanation,
    recommendedActions: actions
  };
}
