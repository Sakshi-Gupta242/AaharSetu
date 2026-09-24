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
    riskFactor: 'Microbial decomposition / Potential anaerobic gas production (e.g., Clostridium botulinum risk in canned/pouched foods)',
    weight: 12,
  },
  // Contamination
  {
    category: 'Contamination',
    keywords: ['fly', 'flies', 'cockroach', 'insect', 'worm', 'worms', 'dead insect', 'hair', 'stone', 'sand', 'glass shard', 'plastic piece', 'metal staple', 'stapler pin', 'dust', 'drain', 'sewage'],
    riskFactor: 'Physical or biological foreign body contamination vector',
    weight: 11,
  },
  // Adulteration
  {
    category: 'Adulteration',
    keywords: ['synthetic', 'artificial color', 'chemical', 'bright yellow', 'bright green', 'malachite green', 'starch', 'detergent', 'urea', 'chalk', 'mineral oil', 'adulterated', 'fake', 'burning plastic', 'wax coating'],
    riskFactor: 'Chemical adulterant / Non-permitted industrial color toxicity',
    weight: 11,
  },
  // Packaging
  {
    category: 'Packaging',
    keywords: ['seal broken', 'torn pack', 'punctured', 'leaking packet', 'tampered', 'open pouch', 'dented can', 'rusted tin', 'loose cap', 'foil damaged'],
    riskFactor: 'Loss of hermetic barrier leading to atmospheric exposure & oxidation',
    weight: 9,
  },
  // Labelling
  {
    category: 'Labelling',
    keywords: ['missing expiry', 'no date', 'no best before', 'fssai missing', 'no fssai license', 'no veg non-veg mark', 'no green dot', 'no allergen warning', 'misleading label', 'rubbed off date', 'tampered date', 'reprinted date'],
    riskFactor: 'Regulatory transparency gap / Undeclared allergen exposure hazard',
    weight: 8,
  },
  // Hygiene
  {
    category: 'Hygiene',
    keywords: ['dirty hands', 'unwashed hands', 'no gloves', 'dirty cloth', 'dirty apron', 'coughing', 'sneezing', 'dirty nails', 'bare hands', 'wiped on dirty towel', 'uncovered food', 'unwashed plate', 'dirty water for washing'],
    riskFactor: 'Direct human-to-food cross-contamination vector (Staphylococcus/Enteric pathogens)',
    weight: 9,
  },
  // Food Premises
  {
    category: 'Food Premises',
    keywords: ['open drain', 'garbage heap', 'stagnant water', 'dusty road', 'near toilet', 'uncovered dustbin', 'mice', 'rats', 'rodents', 'dirty floor', 'greasy walls', 'waterlogging'],
    riskFactor: 'Environmental vector breeding / Airborne dust & microbial drift',
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
    explanation = 'Elevated acute food-safety hazard detected. Microbial toxins (such as anaerobic gas formation in sealed packages), severe foreign contaminant, or synthetic chemical adulterant risk identified.';
    actions.push('Do not consume or taste the affected item under any circumstances.');
    actions.push('Preserve packaging, batch number, and purchase receipt in a secure bag for evidence.');
    actions.push('If consumed and experiencing nausea, vomiting or cramps, consult a healthcare professional.');
    actions.push('Alert the retail merchant or stall vendor immediately to halt further distribution.');
  } else if (hasMedKeyword || finalCategory === 'Hygiene' || finalCategory === 'Packaging' || finalCategory === 'Food Premises') {
    priority = 'Medium';
    explanation = 'Moderate hygiene or packaging integrity vulnerability identified. Presents a risk of gradual microbial proliferation or cross-contamination.';
    actions.push('Refrain from consuming items exposed to open dust or questionable handling.');
    actions.push('Politely notify the vendor regarding unhygienic practices or broken seals.');
    actions.push('Document the stall location, date, and time for record keeping.');
    actions.push('Choose vendors practicing covered storage and clean potable water usage.');
  } else {
    priority = 'Low';
    explanation = 'Informational observation or minor administrative/labeling variance without acute physiological hazard indicators.';
    actions.push('Verify manufacturing and expiry dates on packaging before purchasing.');
    actions.push('Check for standard regulatory FSSAI registration numbers on packaged goods.');
    actions.push('Share constructive hygiene feedback with the vendor.');
  }

  if (detectedRiskFactors.length === 0) {
    detectedRiskFactors.push('General food quality observation requiring standard hygiene verification');
  }

  return {
    category: finalCategory,
    detectedRiskFactors,
    prototypePriority: priority,
    explanation,
    recommendedActions: actions
  };
}
