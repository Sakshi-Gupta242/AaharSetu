import { Complaint } from '../types';

export const INITIAL_DEMO_COMPLAINTS: Complaint[] = [
  {
    id: 'AS-2025-0841',
    foodName: 'Swollen Packaged Mango Juice (250ml)',
    description: 'Purchased a sealed tetrapack carton from a local retail corner. The carton was noticeably swollen with bulging sides. Upon opening slightly, it emitted a sour pungent fermenting gas smell.',
    category: 'Spoilage/Expired Food',
    detectedCategory: 'Spoilage/Expired Food',
    location: 'Karol Bagh Market, New Delhi',
    stallType: 'Packaged Retail / Corner Shop',
    date: '2025-05-12',
    detectedRiskFactors: [
      'Possible spoilage or packaging-related food safety concern (loss of seal/fermentation indicator). Note: This prototype cannot determine the actual cause or confirm contamination.',
      'Compromised hermetic container seal'
    ],
    prototypePriority: 'High',
    priorityExplanation: 'Possible spoilage or packaging-related food safety concern. Note: This prototype cannot determine the actual cause, confirm contamination, or provide laboratory analysis.',
    recommendedActions: [
      'Do not consume or taste the affected item.',
      'Preserve packaging, batch number, and purchase receipt in a secure bag for evidence.',
      'Alert the retail merchant immediately regarding the observed condition.'
    ],
    status: 'Flagged for Guidance',
    createdAt: '2025-05-12T10:15:00.000Z',
    synthetic: true
  },
  {
    id: 'AS-2025-0842',
    foodName: 'Cooked Samosas & Kachoris Exposed Near Open Drain',
    description: 'Fried snacks were placed in open trays directly on a low wooden stool next to an overflowing roadside drain without any glass shield or mesh lid. Flies were resting on the fried items.',
    category: 'Hygiene',
    detectedCategory: 'Hygiene',
    location: 'Sector 18 Market, Noida',
    stallType: 'Street Food Cart / Fryer Stall',
    date: '2025-05-14',
    detectedRiskFactors: [
      'Observable hygiene lapse during food storage (uncovered food near open drain)',
      'Environmental hygiene concern in vicinity of food preparation area'
    ],
    prototypePriority: 'Medium',
    priorityExplanation: 'Moderate hygiene vulnerability identified based on submitted description. Note: This prototype cannot determine actual bacterial levels or confirm contamination.',
    recommendedActions: [
      'Refrain from consuming items exposed to open dust or fly contact.',
      'Politely encourage vendor to install transparent mesh domes or sneeze guards.',
      'Choose stalls with elevated counters and covered display cases.'
    ],
    status: 'Under Review',
    createdAt: '2025-05-14T14:30:00.000Z',
    synthetic: true
  },
  {
    id: 'AS-2025-0843',
    foodName: 'Synthetic Bright Green Marinated Paneer Tikka',
    description: 'The raw marinated paneer had an unnaturally fluorescent bright green hue that left severe green dye stains on fingers that did not wash off easily with soap, indicating non-permitted industrial dye.',
    category: 'Adulteration',
    detectedCategory: 'Adulteration',
    location: 'Laxmi Nagar Food Lane, East Delhi',
    stallType: 'Tandoor & Snack Counter',
    date: '2025-05-16',
    detectedRiskFactors: [
      'Suspected non-permitted color additive or foreign substance indicator requiring laboratory verification.'
    ],
    prototypePriority: 'High',
    priorityExplanation: 'Suspected non-permitted color additive indicator reported. Note: This educational prototype cannot perform chemical analysis or confirm adulteration without laboratory testing.',
    recommendedActions: [
      'Avoid consumption of foods with suspicious synthetic staining dyes.',
      'Document stall location and product details.',
      'Seek naturally seasoned and colored food options.'
    ],
    status: 'Flagged for Guidance',
    createdAt: '2025-05-16T18:45:00.000Z',
    synthetic: true
  },
  {
    id: 'AS-2025-0844',
    foodName: 'Packaged Roasted Namkeen Mix without Expiry Date',
    description: 'Purchased a sealed packet of spicy mixture. The mandatory "Date of Packaging" and "Best Before / Expiry" sections on the back panel were completely blank with only sticker residue remaining.',
    category: 'Labelling',
    detectedCategory: 'Labelling',
    location: 'Hauz Khas Village Entrance, New Delhi',
    stallType: 'Packaged Retail Stall',
    date: '2025-05-18',
    detectedRiskFactors: [
      'Missing or illegible mandatory packaging label information (e.g. date of manufacture, expiry, or ingredients).'
    ],
    prototypePriority: 'Low',
    priorityExplanation: 'Administrative and labeling transparency observation without immediate physical hazard indicators in the submitted description.',
    recommendedActions: [
      'Check for fresh aroma before consuming; do not consume if stale or rancid.',
      'Return packet to shopkeeper and request verified labeled stock.',
      'Verify standard product labeling on packaged goods.'
    ],
    status: 'Resolved',
    createdAt: '2025-05-18T11:20:00.000Z',
    synthetic: true
  },
  {
    id: 'AS-2025-0845',
    foodName: 'Chutney & Curd Stored in Open Sun at 40°C',
    description: 'Mint chutney and sweet curd toppings for chaat were kept in open metal bowls in direct scorching sunlight without any ice cooling. The curd was bubbling with an offensive sour odor.',
    category: 'Spoilage/Expired Food',
    detectedCategory: 'Spoilage/Expired Food',
    location: 'Chandni Chowk Chaat Corner, Old Delhi',
    stallType: 'Chaat / Street Food Cart',
    date: '2025-05-19',
    detectedRiskFactors: [
      'Possible spoilage or packaging-related food safety concern (unrefrigerated perishable storage in heat). Note: This prototype cannot determine the actual cause or confirm contamination.',
      'Uncovered perishable food exposure'
    ],
    prototypePriority: 'High',
    priorityExplanation: 'Possible spoilage or packaging-related food safety concern. Note: This prototype cannot determine actual bacterial levels, confirm contamination, or provide clinical advice.',
    recommendedActions: [
      'Do not consume warm souring dairy items from open street containers.',
      'Advise stall operator to maintain curd and chutneys over ice beds.'
    ],
    status: 'Under Review',
    createdAt: '2025-05-19T16:10:00.000Z',
    synthetic: true
  }
];
