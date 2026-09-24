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
      'Microbial decomposition / Potential anaerobic gas production (e.g., Clostridium botulinum risk in canned/pouched foods)',
      'Loss of hermetic seal / packaging fermentation failure'
    ],
    prototypePriority: 'High',
    priorityExplanation: 'Elevated acute food-safety hazard detected. Microbial toxins or anaerobic fermentation inside airtight beverage container identified.',
    recommendedActions: [
      'Do not consume or taste the affected item under any circumstances.',
      'Preserve packaging, batch number, and purchase receipt in a secure bag for evidence.',
      'Alert the retail merchant immediately to halt sale of this batch.'
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
      'Direct human-to-food cross-contamination vector (Staphylococcus/Enteric pathogens)',
      'Environmental vector breeding / Airborne dust & microbial drift'
    ],
    prototypePriority: 'Medium',
    priorityExplanation: 'Moderate hygiene vulnerability identified. Presents a risk of vector-borne cross-contamination from flies and roadside drain aerosols.',
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
      'Chemical adulterant / Non-permitted industrial color toxicity (Possible Malachite Green / non-food grade coloring)'
    ],
    prototypePriority: 'High',
    priorityExplanation: 'High chemical hazard potential. Use of non-food grade color additives may pose acute toxicological and gastrointestinal risks.',
    recommendedActions: [
      'Avoid consumption of foods with neon or synthetic staining dyes.',
      'Document stall name and product batch with clear photo evidence.',
      'Seek natural herb/spice colored food options.'
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
      'Regulatory transparency gap / Undeclared shelf life & allergen exposure hazard'
    ],
    prototypePriority: 'Low',
    priorityExplanation: 'Administrative and labeling transparency violation. Low immediate toxicity risk unless signs of rancidity or mold are present.',
    recommendedActions: [
      'Check for fresh oil odor before consuming; discard if stale or rancid.',
      'Return packet to shopkeeper and request verified labeled stock.',
      'Verify FSSAI license printing on packaged goods.'
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
      'Temperature Danger Zone abuse (Prolonged storage above 35°C promoting rapid bacterial multiplication)',
      'Uncovered perishable food exposure'
    ],
    prototypePriority: 'High',
    priorityExplanation: 'High microbiological spoilage risk. Dairy products stored at ambient summer heat ferment rapidly and harbor high bacterial loads.',
    recommendedActions: [
      'Do not consume warm souring dairy items from open street containers.',
      'Advise stall operator to maintain curd and chutneys over ice beds.'
    ],
    status: 'Under Review',
    createdAt: '2025-05-19T16:10:00.000Z',
    synthetic: true
  }
];
