import { ImprovementItem, KnowledgeItem } from '../types';

export interface VendorQuestion {
  id: number;
  questionEn: string;
  questionHi: string;
  guidanceEn: string;
  guidanceHi: string;
  category: 'food_protection' | 'water_sanitation' | 'waste_management' | 'personal_hygiene' | 'storage_pest';
  weight: number;
}

export const VENDOR_QUESTIONS: VendorQuestion[] = [
  {
    id: 1,
    questionEn: 'Is prepared food kept covered?',
    questionHi: 'क्या तैयार भोजन हमेशा ढका हुआ रहता है?',
    guidanceEn: 'Use mesh nets, clean lids, or glass sneeze guards to protect cooked items from dust and insects.',
    guidanceHi: 'पके हुए भोजन को धूल और मक्खियों से बचाने के लिए जालीदार ढक्कन या कांच की शील्ड का उपयोग करें।',
    category: 'food_protection',
    weight: 10
  },
  {
    id: 2,
    questionEn: 'Is drinking/washing water kept clean?',
    questionHi: 'क्या पीने और बर्तन धोने का पानी साफ और सुरक्षित है?',
    guidanceEn: 'Use potable municipal water or boiled/filtered water. Store in clean, covered dispensing containers with a tap.',
    guidanceHi: 'साफ पीने योग्य पानी का उपयोग करें और इसे नल वाले बंद कंटेनर में रखें।',
    category: 'water_sanitation',
    weight: 10
  },
  {
    id: 3,
    questionEn: 'Are raw and cooked foods separated?',
    questionHi: 'क्या कच्चा और पका हुआ भोजन अलग-अलग रखा जाता है?',
    guidanceEn: 'Prevent cross-contamination by using dedicated bowls, knives, and chopping boards for raw veggies/meat and ready food.',
    guidanceHi: 'कच्चे और पके भोजन के लिए अलग-अलग बर्तन, चाकू और कटिंग बोर्ड का प्रयोग करें।',
    category: 'food_protection',
    weight: 10
  },
  {
    id: 4,
    questionEn: 'Are serving utensils clean?',
    questionHi: 'क्या परोसने और पकाने के बर्तन पूरी तरह साफ हैं?',
    guidanceEn: 'Wash spoons, tongs, and ladles in fresh running water with detergent. Do not wipe with dirty table towels.',
    guidanceHi: 'चम्मच, चिमटे और करछुल को साबुन और साफ पानी से धोएं। गंदे कपड़े से न पोंछें।',
    category: 'water_sanitation',
    weight: 10
  },
  {
    id: 5,
    questionEn: 'Is waste stored away from food preparation?',
    questionHi: 'क्या कूड़ा-कचरा खाना पकाने की जगह से दूर और ढक्कन वाले डिब्बे में रखा जाता है?',
    guidanceEn: 'Keep a foot-pedal covered dustbin at least 3-4 feet away from the stove and food assembly counter.',
    guidanceHi: 'कूड़ेदान को ढक्कन वाला रखें और चूल्हे या भोजन तैयार करने की जगह से दूर रखें।',
    category: 'waste_management',
    weight: 10
  },
  {
    id: 6,
    questionEn: 'Is the preparation area clean?',
    questionHi: 'क्या खाना बनाने और परोसने का काउंटर पूरी तरह साफ-सुथरा है?',
    guidanceEn: 'Wipe stainless steel or laminate counters regularly with food-safe sanitizing solution.',
    guidanceHi: 'काउंटर और मेज को साफ कपड़े और कीटाणुनाशक घोल से बार-बार पोंछते रहें।',
    category: 'food_protection',
    weight: 10
  },
  {
    id: 7,
    questionEn: 'Is hand hygiene maintained?',
    questionHi: 'क्या भोजन बनाते और परोसते समय हाथों की स्वच्छता बनाए रखी जाती है?',
    guidanceEn: 'Wash hands thoroughly with soap after handling currency notes, cleaning, or handling raw items.',
    guidanceHi: 'पैसे लेने या कच्चा सामान छूने के बाद हमेशा साबुन और पानी से हाथ धोएं।',
    category: 'personal_hygiene',
    weight: 10
  },
  {
    id: 8,
    questionEn: 'Are food-contact surfaces cleaned regularly?',
    questionHi: 'क्या भोजन के संपर्क में आने वाली सतहों को नियमित रूप से साफ किया जाता है?',
    guidanceEn: 'Sanitize frying pans, griddles, chopping boards, and storage racks at regular daily intervals.',
    guidanceHi: 'तवा, कटिंग बोर्ड और रैक को दिन में नियमित रूप से साफ और सुखा कर रखें।',
    category: 'water_sanitation',
    weight: 10
  },
  {
    id: 9,
    questionEn: 'Are perishable foods stored appropriately?',
    questionHi: 'क्या जल्दी खराब होने वाली सामग्री (दही, पनीर, चटनी) ठंडी जगह या बर्फ के साथ रखी जाती है?',
    guidanceEn: 'Keep dairy, chutneys, and sauces in insulated ice boxes or below 5°C to avoid bacterial growth in summer.',
    guidanceHi: 'दही, हरी चटनी और पनीर को धूप से बचाकर इंसुलेटेड आइस बॉक्स में रखें।',
    category: 'storage_pest',
    weight: 10
  },
  {
    id: 10,
    questionEn: 'Are pests/insects prevented from contacting food?',
    questionHi: 'क्या मक्खियों, मच्छरों और चूहों को भोजन के संपर्क में आने से रोका जाता है?',
    guidanceEn: 'Use mesh nets, insect screens, fly traps, and seal food bins tightly at all times.',
    guidanceHi: 'मक्खियों को दूर रखने के लिए जालीदार पर्दे और एयर-टाइट डिब्बों का उपयोग करें।',
    category: 'storage_pest',
    weight: 10
  }
];

export const IMPROVEMENT_CATALOGUE: ImprovementItem[] = [
  {
    id: 'mesh-cover-set',
    name: 'Food-Grade Stainless Wire Mesh Covers (Set of 3)',
    nameHi: 'स्टेनलेस स्टील जालीदार ढक्कन सेट (3 पीस)',
    category: 'food_protection',
    categoryLabel: 'Food Protection',
    categoryLabelHi: 'खाद्य सुरक्षा एवं ढकना',
    cost: 140,
    impact: 'High',
    description: 'High-durability wire mesh domes to keep hot fried foods, snacks, and sweets covered while allowing steam ventilation.',
    descriptionHi: 'गर्म नाश्ते और पके भोजन को मक्खियों और धूल से सुरक्षित रखने के लिए जालीदार ढक्कन।',
    vendorBenefit: 'Stops flies and dust instantly. High customer visual trust.',
    vendorBenefitHi: 'मक्खियों और धूल से तुरंत बचाव। ग्राहकों का भरोसा बढ़ता है।',
    targetQuestionIds: [1, 10],
    practicalTip: 'Wipe mesh weekly with warm water and detergent.',
    practicalTipHi: 'हफ्ते में एक बार गर्म पानी से जाली साफ करें।',
    iconName: 'ShieldCheck'
  },
  {
    id: 'handwash-dispenser-kit',
    name: 'Handwash Dispenser + Antibacterial Liquid Soap (500ml)',
    nameHi: 'हैंडवॉश डिस्पेंसर + एंटीबैक्टीरियल लिक्विड सोप (500ml)',
    category: 'personal_hygiene',
    categoryLabel: 'Personal Hygiene',
    categoryLabelHi: 'व्यक्तिगत स्वच्छता',
    cost: 95,
    impact: 'High',
    description: 'Refillable pump dispenser paired with hygiene liquid soap for quick vendor and staff hand sanitation.',
    descriptionHi: 'रिफिलेबल पंप डिस्पेंसर और साबुन जिससे पैसे लेने के बाद तुरंत हाथ धोए जा सकें।',
    vendorBenefit: 'Cuts human-to-food bacterial transfer by up to 90%.',
    vendorBenefitHi: 'हाथों से भोजन में बैक्टीरिया फैलने का खतरा 90% कम होता है।',
    targetQuestionIds: [7],
    practicalTip: 'Place next to your water container for effortless routine use.',
    practicalTipHi: 'पानी के कंटेनर के ठीक पास रखें ताकि हाथ धोना आसान हो।',
    iconName: 'Hand'
  },
  {
    id: 'pedal-dustbin',
    name: 'Foot-Pedal Hands-Free Covered Dustbin (15 Litre)',
    nameHi: 'पैडल वाला ढक्कनदार कूड़ेदान (15 लीटर)',
    category: 'waste_management',
    categoryLabel: 'Waste Management',
    categoryLabelHi: 'कचरा प्रबंधन',
    cost: 210,
    impact: 'High',
    description: 'Pedal-operated lidded dustbin so hands never touch the trash lid while discarding food scraps.',
    descriptionHi: 'पैडल से खुलने वाला ढक्कनदार डस्टबिन ताकि कचरा फेंकते समय हाथ गंदे न हों।',
    vendorBenefit: 'Eliminates bin lid contact contamination; keeps stray dogs/flies away.',
    vendorBenefitHi: 'ढक्कन छूने की जरूरत नहीं, बदबू और मक्खियों से बचाव।',
    targetQuestionIds: [5],
    practicalTip: 'Line with biodegradable bin liner and empty at least twice daily.',
    practicalTipHi: 'अंदर थैली लगाएं और दिन में दो बार खाली करें।',
    iconName: 'Trash2'
  },
  {
    id: 'airtight-storage-boxes',
    name: 'Transparent Food-Grade Airtight Storage Tubs (Set of 4)',
    nameHi: 'पारदर्शी एयर-टाइट स्टोरेज डिब्बे (4 का सेट)',
    category: 'storage_pest',
    categoryLabel: 'Storage & Pest Control',
    categoryLabelHi: 'भंडारण एवं कीट नियंत्रण',
    cost: 180,
    impact: 'Medium',
    description: 'BPA-free snap-lock containers for sliced onions, prepared garnishes, paneer, and raw spices.',
    descriptionHi: 'कटी सब्जियों, मसालों और पनीर को सुरक्षित और ताजा रखने के लिए लॉक वाले पारदर्शी डिब्बे।',
    vendorBenefit: 'Keeps ingredients fresh for 2x longer, zero pest infiltration.',
    vendorBenefitHi: 'सामग्री दोगुनी देर तक ताजी रहती है, नमी और कीड़ों से सुरक्षा।',
    targetQuestionIds: [3, 9, 10],
    practicalTip: 'Label containers with prep date for inventory rotation.',
    practicalTipHi: 'डिब्बों पर तारीख लिखकर पहले बनी सामग्री पहले इस्तेमाल करें।',
    iconName: 'Box'
  },
  {
    id: 'color-coded-tongs-boards',
    name: 'Color-Coded Serving Tongs & Chopping Mats',
    nameHi: 'कलर-कोडेड सर्विंग चिमटा और कटिंग बोर्ड सेट',
    category: 'food_protection',
    categoryLabel: 'Food Protection',
    categoryLabelHi: 'खाद्य सुरक्षा एवं ढकना',
    cost: 160,
    impact: 'High',
    description: 'Separate green tongs for ready-to-eat salads and red tongs for raw fillings or meat.',
    descriptionHi: 'सलाद और पके खाने के लिए हरा चिमटा तथा कच्ची सामग्री के लिए अलग चिमटा।',
    vendorBenefit: 'Eliminates cross-contamination between raw ingredients and cooked meals.',
    vendorBenefitHi: 'कच्चे और पके भोजन में बैक्टीरिया मिलने से रोकता है।',
    targetQuestionIds: [3, 4],
    practicalTip: 'Hang tongs on hooks rather than resting them directly on tables.',
    practicalTipHi: 'चिमटों को मेज पर रखने की बजाय हुक पर टांगें।',
    iconName: 'Utensils'
  },
  {
    id: 'tap-water-container',
    name: 'Food-Grade 10L Water Dispenser Jug with Tap',
    nameHi: '10 लीटर नल वाला फूड-ग्रेड वॉटर कैन',
    category: 'water_sanitation',
    categoryLabel: 'Water & Sanitation',
    categoryLabelHi: 'पानी एवं स्वच्छता',
    cost: 240,
    impact: 'High',
    description: 'Dedicated enclosed container with spigot tap for clean hand-washing and utensil rinsing.',
    descriptionHi: 'नल लगा हुआ बंद पानी का जार जिससे बिना हाथ डुबोए साफ पानी निकाला जा सके।',
    vendorBenefit: 'Prevents dipping dirty hands or mugs into the common water storage.',
    vendorBenefitHi: 'पानी में गंदे हाथ या मग डालने से होने वाली गंदगी रुकती है।',
    targetQuestionIds: [2, 4],
    practicalTip: 'Scrub internal jug surface daily and refill only with safe drinking water.',
    practicalTipHi: 'रोजाना जार को अंदर से धोएं और केवल पीने योग्य पानी भरें।',
    iconName: 'Droplet'
  },
  {
    id: 'microfiber-cleaning-cloths',
    name: 'Color-Coded Microfiber Counter Cloths (Pack of 5)',
    nameHi: 'माइक्रोफाइबर काउंटर सफाई कपड़े (5 का पैक)',
    category: 'water_sanitation',
    categoryLabel: 'Water & Sanitation',
    categoryLabelHi: 'पानी एवं स्वच्छता',
    cost: 90,
    impact: 'Medium',
    description: 'Fast-drying microfiber cloths: Blue for counter surfaces, Yellow for dish drying, Red for floor spills.',
    descriptionHi: 'जल्दी सूखने वाले माइक्रोफाइबर कपड़े - मेज पोंछने और बर्तन सुखाने के लिए अलग कपड़े।',
    vendorBenefit: 'Stops transfer of grime from tables onto customer plates.',
    vendorBenefitHi: 'एक ही गंदे कपड़े से मेज और प्लेट पोंछने की आदत खत्म होती है।',
    targetQuestionIds: [4, 6, 8],
    practicalTip: 'Soak in hot soapy water at the end of each shift.',
    practicalTipHi: 'दिन के अंत में गर्म साबुन के पानी में धोकर सुखाएं।',
    iconName: 'Sparkles'
  },
  {
    id: 'insulated-cool-box',
    name: 'Thermal Insulated Chutney / Dairy Bag with 2 Gel Ice Packs',
    nameHi: 'इंसुलेटेड कूल बैग + 2 आइस जेल पैक',
    category: 'storage_pest',
    categoryLabel: 'Storage & Pest Control',
    categoryLabelHi: 'भंडारण एवं कीट नियंत्रण',
    cost: 290,
    impact: 'High',
    description: 'Portable thermal cooler bag to keep mint chutney, curd, and milk chilled below 8°C even during hot afternoons.',
    descriptionHi: 'गर्मी के मौसम में हरी चटनी, दही और दूध को ठंडा रखने के लिए इंसुलेटेड बैग।',
    vendorBenefit: 'Prevents chutney souring and curd spoilage on hot street carts.',
    vendorBenefitHi: 'गर्मी में चटनी खट्टी होने और दही खराब होने से बचाता है।',
    targetQuestionIds: [9],
    practicalTip: 'Freeze gel ice packs overnight in home freezer.',
    practicalTipHi: 'जेल पैक को रात में फ्रीजर में जमाकर सुबह बैग में रखें।',
    iconName: 'ThermometerSnowflake'
  },
  {
    id: 'hairnets-apron-kit',
    name: 'Washable Heavy-Duty Apron + 5 Reusable Hairnets',
    nameHi: 'धोने योग्य एप्रन + 5 हेयरनेट कैप सेट',
    category: 'personal_hygiene',
    categoryLabel: 'Personal Hygiene',
    categoryLabelHi: 'व्यक्तिगत स्वच्छता',
    cost: 110,
    impact: 'Medium',
    description: 'Professional vendor apparel that prevents stray hair from falling into food while cooking or packaging.',
    descriptionHi: 'भोजन बनाते समय बालों को खाने में गिरने से रोकने के लिए एप्रन और सिर की जाली।',
    vendorBenefit: '100% hair-fall prevention and pristine professional stall appearance.',
    vendorBenefitHi: 'खाने में बाल गिरने की शिकायत खत्म और स्टॉल का पेशेवर रूप।',
    targetQuestionIds: [7],
    practicalTip: 'Wash apron daily after stall closure.',
    practicalTipHi: 'दुकान बंद करने के बाद एप्रन को रोजाना धोएं।',
    iconName: 'UserCheck'
  },
  {
    id: 'fly-curtain-mesh',
    name: 'Magnetic Fly & Dust Mesh Screen for Stall Window/Display',
    nameHi: 'मैग्नेटिक फ्लाई व डस्ट जालीदार पर्दा',
    category: 'storage_pest',
    categoryLabel: 'Storage & Pest Control',
    categoryLabelHi: 'भंडारण एवं कीट नियंत्रण',
    cost: 175,
    impact: 'Medium',
    description: 'Quick-attach mesh curtain with weighted bottom to shield front display cases and open ingredient shelves.',
    descriptionHi: 'स्टॉल के काउंटर या खिड़की पर लगाने के लिए जाली जिससे धूल और कीड़े अंदर न आएं।',
    vendorBenefit: 'Keeps airborne dust and flies out while allowing breeze.',
    vendorBenefitHi: 'हवा आने देता है पर धूल और मक्खियों को बाहर रखता है।',
    targetQuestionIds: [1, 10],
    practicalTip: 'Fix with velcro strips to stall wooden or metal frame.',
    practicalTipHi: 'वेल्क्रो पट्टी से स्टॉल के फ्रेम पर आसानी से लगाएं।',
    iconName: 'ShieldAlert'
  }
];

export const KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    id: 'who-5-keys',
    title: 'WHO Five Keys to Safer Food (Global Hygiene Standard)',
    titleHi: 'WHO सुरक्षित भोजन की 5 बुनियादी कुंजियाँ',
    category: 'Core Hygiene Principles',
    categoryHi: 'मुख्य स्वच्छता सिद्धांत',
    keywords: ['who', '5 keys', 'basic', 'hygiene', 'temperature', 'cooking', 'storage', 'safe food'],
    summary: 'The five core pillars established by the World Health Organization to prevent foodborne illness.',
    summaryHi: 'विश्व स्वास्थ्य संगठन द्वारा खाद्य जनित बीमारियों को रोकने के लिए 5 मुख्य नियम।',
    content: `The World Health Organization (WHO) outlines 5 fundamental practices for safe food preparation:
1. **Keep Clean**: Wash hands before handling food and frequently during preparation. Sanitize all surfaces and equipment.
2. **Separate Raw and Cooked**: Separate raw meat, poultry, and seafood from ready-to-eat foods. Use dedicated knives and cutting boards.
3. **Cook Thoroughly**: Cook foods thoroughly, especially meat, poultry, eggs, and seafood (core temperature >70°C). Reheat cooked food thoroughly.
4. **Keep Food at Safe Temperatures**: Do not leave cooked food at room temperature for more than 2 hours. Refrigerate perishable food promptly below 5°C. Keep hot food steaming (>60°C).
5. **Use Safe Water and Raw Materials**: Use potable water, select fresh wholesome foods, choose pasteurized milk, and wash fruits/vegetables thoroughly.`,
    contentHi: `विश्व स्वास्थ्य संगठन (WHO) के अनुसार सुरक्षित भोजन के 5 बुनियादी नियम:
1. **स्वच्छता रखें**: खाना छूने से पहले और बनाते समय बार-बार हाथ धोएं। सभी बर्तनों और काउंटर को साफ रखें।
2. **कच्चे और पके भोजन को अलग रखें**: कच्ची सामग्री और तैयार भोजन के लिए अलग चाकू और बोर्ड का उपयोग करें।
3. **अच्छी तरह पकाएं**: भोजन को उचित तापमान (70°C से ऊपर) पर पूरी तरह पकाएं।
4. **सुरक्षित तापमान पर रखें**: पके भोजन को 2 घंटे से अधिक सामान्य तापमान पर न छोड़ें। ठंडी चीजें 5°C से नीचे और गर्म चीजें 60°C से ऊपर रखें।
5. **सुरक्षित पानी और कच्चा माल प्रयोग करें**: केवल साफ पीने योग्य पानी और ताजी सामग्री का उपयोग करें।`,
    sourceTitle: 'WHO Five Keys to Safer Food Manual',
    sourceUrl: 'https://www.who.int/activities/promoting-safe-food-handling',
    sourceType: 'WHO Guideline'
  },
  {
    id: 'swollen-packaging-risk',
    title: 'Understanding Bloated / Swollen Food Packaging',
    titleHi: 'फूले हुए या सूजे हुए फूड पैकेट का जोखिम',
    category: 'Packaging & Spoilage',
    categoryHi: 'पैकेजिंग एवं खराबी',
    keywords: ['swollen', 'bloated', 'packet', 'juice', 'tetrapack', 'gas', 'botulism', 'can', 'pouched', 'sour'],
    summary: 'Why sealed food containers bulge and why consuming them poses severe health hazards.',
    summaryHi: 'सील पैक डिब्बे या टेट्रापैक क्यों फूलते हैं और उन्हें खाना क्यों खतरनाक है।',
    content: `When a sealed food pouch, can, or juice carton is swollen or bulged:
- **Cause**: Microorganisms (bacteria or yeasts) inside the package have fermented sugars or decomposed organic matter, generating carbon dioxide and gases. In airtight low-acid conditions, anaerobic spore-formers like *Clostridium botulinum* or gas-producing spoilage organisms can proliferate.
- **Risk**: Ingestion can cause acute gastrointestinal poisoning, severe emesis, or life-threatening neurotoxin absorption (Botulism).
- **Safety Action**:
  1. Never taste or consume swollen packaged goods.
  2. Do not puncture or squeeze the package.
  3. Store safely away from children and pets.
  4. Photograph the batch code and alert the seller.`,
    contentHi: `जब कोई सीलबंद जूस, पैकेट या डिब्बा फूला हुआ दिखाई दे:
- **कारण**: अंदर मौजूद बैक्टीरिया या फंगस सामग्री को सड़ाकर गैस (CO2) पैदा करते हैं।
- **खतरा**: इसे पीने या खाने से गंभीर फूड पॉइजनिंग, उल्टी और आंतों का गंभीर संक्रमण हो सकता है।
- **सुरक्षा उपाय**:
  1. कभी भी ऐसे फूले पैकेट का स्वाद न चखें।
  2. पैकेट को दबाएं या फाड़ें नहीं।
  3. बैच नंबर की फोटो लें और दुकानदार को सूचित करें।`,
    sourceTitle: 'FAO / WHO Food Safety Risk Assessment Technical Paper',
    sourceUrl: 'https://www.fao.org/food-safety/scientific-advice/risk-assessment-and-management/en/',
    sourceType: 'Consumer Safety Codex'
  },
  {
    id: 'street-food-hygiene',
    title: 'Essential Hygiene Practices for Small Food Vendors & Stalls',
    titleHi: 'छोटे फ़ूड स्टॉल और ठेलों के लिए आवश्यक स्वच्छता नियम',
    category: 'Vendor Hygiene',
    categoryHi: 'विक्रेता स्वच्छता',
    keywords: ['stall', 'vendor', 'cart', 'street food', 'small shop', 'water', 'gloves', 'apron', 'hygiene'],
    summary: 'Practical, low-cost steps for informal food stalls to prevent contamination.',
    summaryHi: 'छोटे ढाबों और ठेलों पर भोजन को स्वच्छ रखने के कम लागत वाले उपाय।',
    content: `Small food stalls can dramatically enhance safety with simple daily workflows:
1. **Hand Hygiene**: Wash hands with soap after handling currency or cleaning waste.
2. **Covered Stalls**: Keep all fried snacks, chopped garnishes, and sauces under clean wire mesh or glass covers.
3. **Potable Water Management**: Do not dip hands into water containers; use jugs with dispensing taps.
4. **Waste Segregation**: Keep pedal-operated bins away from cooking areas. Empty frequently.
5. **Temperature Control**: Keep chutneys and milk products on ice beds during summer peak heat.`,
    contentHi: `छोटे स्ट्रीट वेंडर इन सरल तरीकों से स्टॉल की स्वच्छता बढ़ा सकते हैं:
1. **हाथों की सफाई**: पैसे लेने या सफाई के बाद साबुन से हाथ धोएं।
2. **भोजन ढक कर रखें**: समोसे, कटी सब्जियां और चटनी हमेशा जाली या शीशे से ढकें।
3. **पानी का सही प्रयोग**: पानी के ड्रम में हाथ न डुबोएं, नल वाले जार का प्रयोग करें।
4. **कूड़ा प्रबंधन**: चूल्हे से दूर ढक्कनदार कूड़ेदान रखें।
5. **चटनी को ठंडा रखें**: गर्मी में हरी चटनी और दही को बर्फ पर रखें ताकि वह खट्टी न हो।`,
    sourceTitle: 'Codex Alimentarius Code of Hygienic Practice for Street-Vended Foods (CXC 43-1997)',
    sourceUrl: 'https://www.fao.org/fao-who-codexalimentarius/codex-texts/codes-of-practice/en/',
    sourceType: 'Street Food Best Practices'
  },
  {
    id: 'adulteration-detection',
    title: 'Recognizing Common Food Adulterants & Synthetic Dyes',
    titleHi: 'खाद्य पदार्थों में मिलावट और हानिकारक रंगों की पहचान',
    category: 'Food Adulteration',
    categoryHi: 'खाद्य मिलावट',
    keywords: ['adulteration', 'color', 'synthetic', 'milk', 'turmeric', 'oil', 'malachite green', 'dye', 'chemical'],
    summary: 'Common household indicators and risks of adulterated food ingredients.',
    summaryHi: 'दैनिक खाद्य पदार्थों में मिलावट के लक्षण और बचाव के तरीके।',
    content: `Adulteration involves unauthorized mixing of inferior or harmful substances into food:
- **Synthetic Colors**: Excessively neon-yellow jalebis or bright emerald green peas often indicate non-permitted industrial dyes (e.g., Metanil Yellow or Malachite Green).
- **Synthetic Milk**: Frothy milk leaving white soap-like residue or chemical smell when boiled indicates detergent or urea adulteration.
- **Cooking Oils**: Turbid or foul-smelling loose oil often indicates non-edible mineral oil blending.
- **Guidance**: Avoid unbranded open spices and artificially bright street sweets. Report questionable batches immediately.`,
    contentHi: `खाद्य मिलावट और नकली रंगों की पहचान:
- **नकली रंग**: अत्यधिक चमकीली पीली जलेबी या बहुत हरी मटर में हानिकारक रासायनिक डाई हो सकती है।
- **सिंथेटिक दूध**: उबालने पर झागदार या साबुन जैसी बदबू आना डिटर्जेंट या यूरिया मिलावट का संकेत हो सकता है।
- **खुला तेल**: अत्यधिक गाढ़ा या बदबूदार खुला तेल मिलावटी हो सकता है।
- **सलाह**: अत्यधिक चमकीले खाद्य पदार्थों से बचें और हमेशा सीलबंद सामान चुनें।`,
    sourceTitle: 'Public Food Quality Guidance & Safety Benchmarks',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/food-safety',
    sourceType: 'Food Safety Standard'
  },
  {
    id: 'food-storage-temperatures',
    title: 'Safe Food Storage Temperatures & The "Danger Zone"',
    titleHi: 'खाद्य भंडारण तापमान और "खतरे का क्षेत्र" (Danger Zone)',
    category: 'Storage & Temperature',
    categoryHi: 'भंडारण एवं तापमान',
    keywords: ['temperature', 'danger zone', 'refrigerator', 'storage', 'spoilage', 'chutney', 'dairy', 'bacteria'],
    summary: 'Why temperatures between 5°C and 60°C trigger rapid bacterial multiplication.',
    summaryHi: '5°C से 60°C के बीच बैक्टीरिया तेजी से क्यों बढ़ते हैं और इससे कैसे बचें।',
    content: `The Temperature **Danger Zone** is between 5°C and 60°C (41°F - 140°F):
- In this temperature range, food poisoning bacteria can double in number every 20 minutes.
- **Rule of Thumb**:
  - Keep cold food **Cold** (under 5°C).
  - Keep hot food **Hot** (above 60°C).
  - Discard high-risk perishables (cooked rice, gravies, dairy, cut melon) left at room temperature for over 2 hours.`,
    contentHi: `तापमान का **खतरे का क्षेत्र (Danger Zone)** 5°C से 60°C के बीच होता है:
- इस तापमान में बैक्टीरिया हर 20 मिनट में दोगुने हो जाते हैं।
- **मुख्य नियम**:
  - ठंडी चीजों को 5°C से नीचे रखें।
  - गर्म भोजन को 60°C से ऊपर भाप निकलता रखें।
  - पके हुए चावल, दाल या पनीर को 2 घंटे से अधिक खुले में न छोड़ें।`,
    sourceTitle: 'WHO Food Safety Guidelines: Temperature Control',
    sourceUrl: 'https://www.who.int/activities/promoting-safe-food-handling',
    sourceType: 'WHO Guideline'
  }
];
