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
    guidanceEn: 'Prevent cross-contamination by using dedicated bowls, knives, and chopping boards for raw ingredients and ready food.',
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
    guidanceEn: 'Keep dairy, chutneys, and sauces in insulated ice boxes or below 5°C to avoid rapid spoilage in warm weather.',
    guidanceHi: 'दही, हरी चटनी और पनीर को धूप से बचाकर इंसुलेटेड आइस बॉक्स में रखें।',
    category: 'storage_pest',
    weight: 10
  },
  {
    id: 10,
    questionEn: 'Are pests/insects prevented from contacting food?',
    questionHi: 'क्या मक्खियों, मच्छरों और कीटों को भोजन के संपर्क में आने से रोका जाता है?',
    guidanceEn: 'Use mesh nets, insect screens, and seal food storage containers tightly at all times.',
    guidanceHi: 'मक्खियों को दूर रखने के लिए जालीदार ढक्कन और एयर-टाइट डिब्बों का उपयोग करें।',
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
    vendorBenefit: 'Helps protect food from insects and airborne dust.',
    vendorBenefitHi: 'मक्खियों और धूल से बचाव में सहायक।',
    targetQuestionIds: [1, 10],
    practicalTip: 'Wipe mesh weekly with warm water and detergent.',
    practicalTipHi: 'हफ्ते में एक बार गर्म पानी से जाली साफ करें।',
    iconName: 'ShieldCheck'
  },
  {
    id: 'handwash-dispenser-kit',
    name: 'Handwash Dispenser + Antibacterial Liquid Soap (500ml)',
    nameHi: 'हैंडवॉश डिस्पेंसर + लिक्विड सोप (500ml)',
    category: 'personal_hygiene',
    categoryLabel: 'Personal Hygiene',
    categoryLabelHi: 'व्यक्तिगत स्वच्छता',
    cost: 95,
    impact: 'High',
    description: 'Refillable pump dispenser paired with liquid soap for quick vendor and staff hand washing.',
    descriptionHi: 'रिफिलेबल पंप डिस्पेंसर और साबुन जिससे पैसे लेने के बाद तुरंत हाथ धोए जा सकें।',
    vendorBenefit: 'Supports basic routine hand hygiene at minimal cost.',
    vendorBenefitHi: 'कम लागत में बुनियादी हाथ स्वच्छता बनाए रखने में सहायक।',
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
    vendorBenefit: 'Prevents direct hand contact with trash lids.',
    vendorBenefitHi: 'ढक्कन छूने की आवश्यकता नहीं होती।',
    targetQuestionIds: [5],
    practicalTip: 'Line with a bin bag and empty regularly throughout the day.',
    practicalTipHi: 'अंदर थैली लगाएं और नियमित रूप से खाली करें।',
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
    vendorBenefit: 'Keeps ingredients protected from humidity and pests.',
    vendorBenefitHi: 'सामग्री को नमी और कीटों से सुरक्षित रखता है।',
    targetQuestionIds: [3, 9, 10],
    practicalTip: 'Use first-in, first-out practice for ingredient freshness.',
    practicalTipHi: 'पहले बनी सामग्री पहले इस्तेमाल करें।',
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
    description: 'Separate green tongs for ready-to-eat items and red tongs for raw fillings.',
    descriptionHi: 'पके खाने के लिए हरा चिमटा तथा कच्ची सामग्री के लिए अलग चिमटा।',
    vendorBenefit: 'Helps prevent cross-contamination between raw and cooked items.',
    vendorBenefitHi: 'कच्चे और पके भोजन में संपर्क रोकने में सहायक।',
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
    vendorBenefit: 'Avoids dipping hands or dirty mugs into the water reservoir.',
    vendorBenefitHi: 'पानी में हाथ या मग डुबोने से बचाव होता है।',
    targetQuestionIds: [2, 4],
    practicalTip: 'Clean container regularly and refill only with potable water.',
    practicalTipHi: 'जार को नियमित रूप से धोएं और साफ पानी भरें।',
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
    description: 'Fast-drying cloths: Blue for counter surfaces, Yellow for dish drying.',
    descriptionHi: 'जल्दी सूखने वाले माइक्रोफाइबर कपड़े - मेज पोंछने और बर्तन सुखाने के लिए अलग कपड़े।',
    vendorBenefit: 'Separates surface cleaning cloths from dish drying towels.',
    vendorBenefitHi: 'काउंटर और बर्तन पोंछने के कपड़े अलग रहते हैं।',
    targetQuestionIds: [4, 6, 8],
    practicalTip: 'Wash with warm soapy water at the end of each working day.',
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
    description: 'Portable cooler bag to keep perishable chutneys and curd cool during hot daytime hours.',
    descriptionHi: 'गर्मी के मौसम में हरी चटनी, दही और दूध को ठंडा रखने के लिए इंसुलेटेड बैग।',
    vendorBenefit: 'Helps keep temperature-sensitive toppings cool without electricity.',
    vendorBenefitHi: 'बिना बिजली के चटनी और दही को ठंडा रखने में मददगार।',
    targetQuestionIds: [9],
    practicalTip: 'Freeze gel packs overnight before placing in the cooler bag.',
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
    description: 'Practical food handler apparel to prevent loose hair from falling into food items.',
    descriptionHi: 'भोजन बनाते समय बालों को खाने में गिरने से रोकने के लिए एप्रन और सिर की जाली।',
    vendorBenefit: 'Helps prevent stray hair from falling into food preparations.',
    vendorBenefitHi: 'खाने में बाल गिरने की संभावना कम करता है।',
    targetQuestionIds: [7],
    practicalTip: 'Wash apron regularly after daily stall closure.',
    practicalTipHi: 'दुकान बंद करने के बाद एप्रन को नियमित रूप से धोएं।',
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
    description: 'Protective mesh curtain to shield front display cases and ingredient shelves from dust and flies.',
    descriptionHi: 'स्टॉल के काउंटर या खिड़की पर लगाने के लिए जाली जिससे धूल और कीड़े अंदर न आएं।',
    vendorBenefit: 'Provides a barrier against airborne dust and flies.',
    vendorBenefitHi: 'धूल और मक्खियों को बाहर रखने में सहायक।',
    targetQuestionIds: [1, 10],
    practicalTip: 'Secure firmly to the stall frame with velcro or hooks.',
    practicalTipHi: 'स्टॉल के फ्रेम पर वेल्क्रो या हुक से लगाएं।',
    iconName: 'ShieldAlert'
  }
];

export const KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    id: 'who-5-keys',
    title: 'WHO Five Keys to Safer Food (Global Public Hygiene Manual)',
    titleHi: 'WHO सुरक्षित भोजन की 5 बुनियादी कुंजियाँ',
    category: 'Core Hygiene Principles',
    categoryHi: 'मुख्य स्वच्छता सिद्धांत',
    keywords: ['who', '5 keys', 'basic', 'hygiene', 'temperature', 'cooking', 'storage', 'safe food'],
    summary: 'The five core pillars established by the World Health Organization to prevent foodborne contamination.',
    summaryHi: 'विश्व स्वास्थ्य संगठन द्वारा खाद्य जनित संदूषण को रोकने के लिए 5 मुख्य नियम।',
    content: `The World Health Organization (WHO) outlines 5 fundamental practices for safe food handling:
1. **Keep Clean**: Wash hands before handling food and frequently during preparation. Sanitize preparation surfaces and utensils.
2. **Separate Raw and Cooked**: Separate raw meat, poultry, and seafood from ready-to-eat foods. Use dedicated knives and cutting boards.
3. **Cook Thoroughly**: Cook foods thoroughly, especially meat, poultry, eggs, and seafood (ensure steaming core temperature).
4. **Keep Food at Safe Temperatures**: Do not leave cooked food at ambient room temperature for more than 2 hours. Refrigerate perishable food promptly below 5°C. Keep hot food hot (>60°C).
5. **Use Safe Water and Raw Materials**: Use potable water, select fresh wholesome ingredients, and wash raw vegetables thoroughly.`,
    contentHi: `विश्व स्वास्थ्य संगठन (WHO) के अनुसार सुरक्षित भोजन के 5 बुनियादी नियम:
1. **स्वच्छता रखें**: खाना छूने से पहले और बनाते समय बार-बार हाथ धोएं।
2. **कच्चे और पके भोजन को अलग रखें**: कच्ची सामग्री और तैयार भोजन के लिए अलग चाकू और बोर्ड का उपयोग करें।
3. **अच्छी तरह पकाएं**: भोजन को उचित तापमान पर पूरी तरह पकाएं।
4. **सुरक्षित तापमान पर रखें**: पके भोजन को 2 घंटे से अधिक सामान्य तापमान पर न छोड़ें। ठंडी चीजें 5°C से नीचे और गर्म चीजें 60°C से ऊपर रखें।
5. **सुरक्षित पानी और कच्चा माल प्रयोग करें**: केवल साफ पीने योग्य पानी और ताजी सामग्री का उपयोग करें।`,
    sourceTitle: 'WHO Five Keys to Safer Food Manual',
    sourceOrganization: 'World Health Organization (WHO)',
    sourceUrl: 'https://www.who.int/activities/promoting-safe-food-handling',
    sourceType: 'WHO Public Hygiene Manual'
  },
  {
    id: 'swollen-packaging-risk',
    title: 'Public Guidance on Bulging or Swollen Packaged Food Containers',
    titleHi: 'फूले हुए या क्षतिग्रस्त पैकेज्ड फूड पर सार्वजनिक मार्गदर्शन',
    category: 'Packaging & Spoilage',
    categoryHi: 'पैकेजिंग एवं खराबी',
    keywords: ['swollen', 'bloated', 'packet', 'juice', 'tetrapack', 'gas', 'can', 'pouched', 'sour', 'bulging'],
    summary: 'Guidance on identifying swollen or damaged packaging and safe consumer handling steps.',
    summaryHi: 'फूले या क्षतिग्रस्त पैकेटों की पहचान और उपभोक्ता सुरक्षा के बुनियादी कदम।',
    content: `When a sealed food pouch, tetrapack, or can is noticeably swollen or bulging:
- **Observation**: Bulging typically indicates that packaging seal integrity has been compromised or internal gas formation has occurred due to product spoilage.
- **Limitation**: This educational prototype cannot confirm the actual biological agent or determine contamination without laboratory testing.
- **Public Safety Recommendation**:
  1. Do not taste or consume food from swollen, bulging, or severely damaged packaging.
  2. Do not puncture or squeeze the container.
  3. Keep the package safely away from children and pets.
  4. Retain batch/lot numbers and notify the retail vendor or store management.`,
    contentHi: `जब कोई सीलबंद पैकेट, टेट्रापैक या डिब्बा फूला हुआ दिखाई दे:
- **अवलोकन**: फूला हुआ पैकेट सील खराब होने या उत्पाद में खराबी के कारण गैस बनने का संकेत हो सकता है।
- **सीमा**: यह प्रोटोटाइप प्रयोगशाला परीक्षण के बिना वास्तविक कारण निर्धारित नहीं कर सकता।
- **सुरक्षा सलाह**:
  1. ऐसे फूले पैकेट का स्वाद कभी न चखें।
  2. पैकेट को दबाएं या फाड़ें नहीं।
  3. बैच नंबर सुरक्षित रखें और दुकानदार को सूचित करें।`,
    sourceTitle: 'Food Safety and Quality Guidelines for Consumers',
    sourceOrganization: 'Food and Agriculture Organization (FAO) & World Health Organization (WHO)',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/food-safety',
    sourceType: 'Public Food Safety Factsheet'
  },
  {
    id: 'street-food-hygiene',
    title: 'Codex General Principles for Street-Vended Foods (CXC 43-1997)',
    titleHi: 'स्ट्रीट-वेंडिंग खाद्य स्वच्छता के लिए कोडेक्स सिद्धांत',
    category: 'Vendor Hygiene',
    categoryHi: 'विक्रेता स्वच्छता',
    keywords: ['stall', 'vendor', 'cart', 'street food', 'small shop', 'water', 'gloves', 'apron', 'hygiene'],
    summary: 'Public hygiene recommendations for informal and small-scale food preparation stalls.',
    summaryHi: 'छोटे ढाबों और ठेलों पर भोजन को स्वच्छ रखने के अंतरराष्ट्रीय दिशानिर्देश।',
    content: `The Codex Alimentarius Regional Code of Hygienic Practice for Street-Vended Foods outlines essential basic steps:
1. **Hand Washing**: Wash hands with clean water and soap before handling food and after handling money or waste.
2. **Covering Food**: Keep prepared items, cooked dishes, and sliced garnishes covered with clean screens, lids, or glass sneeze guards.
3. **Potable Water**: Use clean potable water for cooking, cleaning, and beverage preparation; store in clean covered containers with dispensing taps.
4. **Waste Disposal**: Keep covered, hands-free waste bins at a distance from food preparation surfaces.
5. **Cold Storage for Perishables**: Keep perishable toppings and dairy cool with ice beds or insulation during warm weather.`,
    contentHi: `स्ट्रीट-वेंडिंग खाद्य स्वच्छता के मुख्य दिशानिर्देश:
1. **हाथों की सफाई**: पैसे लेने या सफाई के बाद साबुन और पानी से हाथ धोएं।
2. **भोजन ढक कर रखें**: पके भोजन और कटी सब्जियों को हमेशा साफ जाली या ढक्कन से ढकें।
3. **साफ पानी**: खाना बनाने और बर्तन धोने के लिए साफ पानी का उपयोग करें।
4. **कूड़ा प्रबंधन**: चूल्हे से दूर ढक्कनदार कूड़ेदान रखें।
5. **ठंडा भंडारण**: गर्मी में चटनी और दूध उत्पादों को बर्फ पर रखें।`,
    sourceTitle: 'Codex Alimentarius Code of Hygienic Practice for Street-Vended Foods (CXC 43-1997)',
    sourceOrganization: 'FAO / WHO Codex Alimentarius Commission',
    sourceUrl: 'https://www.fao.org/fao-who-codexalimentarius/codex-texts/codes-of-practice/en/',
    sourceType: 'International Food Standard'
  },
  {
    id: 'adulteration-detection',
    title: 'Recognizing Unsafe Food Additives and Synthetic Dye Indicators',
    titleHi: 'खाद्य मिलावट और असुरक्षित रासायनिक रंगों के संकेतक',
    category: 'Food Adulteration',
    categoryHi: 'खाद्य मिलावट',
    keywords: ['adulteration', 'color', 'synthetic', 'milk', 'turmeric', 'oil', 'malachite green', 'dye', 'chemical'],
    summary: 'General public observations and precautions regarding unauthorized additives in foods.',
    summaryHi: 'दैनिक खाद्य पदार्थों में मिलावट के सामान्य लक्षण और एहतियाती कदम।',
    content: `Food adulteration involves unauthorized addition of non-food-grade or inferior substances:
- **Synthetic Colors**: Unnaturally bright or fluorescent colors (such as neon yellows or intense greens) may indicate non-permitted industrial dyes.
- **Physical/Chemical Checks**: Laboratory chemical testing is required for definitive confirmation of adulteration.
- **Consumer Precaution**: Avoid consuming items with abnormal chemical odors, synthetic staining, or questionable texture. Report suspected batches to store managers.`,
    contentHi: `खाद्य मिलावट और अप्राकृतिक रंगों के संबंध में जानकारी:
- **अप्राकृतिक रंग**: अत्यधिक चमकीले या फ्लोरोसेंट रंग हानिकारक रासायनिक डाई का संकेत हो सकते हैं।
- **पुष्टि**: मिलावट की पुष्टि केवल अधिकृत प्रयोगशाला परीक्षण से ही संभव है।
- **सलाह**: रासायनिक गंध या असामान्य रंग वाले खाद्य पदार्थों के सेवन से बचें।`,
    sourceTitle: 'WHO Food Safety Guidelines: Chemical Hazards & Contaminants',
    sourceOrganization: 'World Health Organization (WHO)',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/food-safety',
    sourceType: 'Public Health Factsheet'
  },
  {
    id: 'food-storage-temperatures',
    title: 'Food Storage Temperature Safety & The 5°C - 60°C Temperature Range',
    titleHi: 'खाद्य भंडारण तापमान और 5°C - 60°C तापमान सीमा',
    category: 'Storage & Temperature',
    categoryHi: 'भंडारण एवं तापमान',
    keywords: ['temperature', 'danger zone', 'refrigerator', 'storage', 'spoilage', 'chutney', 'dairy', 'bacteria'],
    summary: 'Public guidance on safe hot and cold holding temperatures for perishable foods.',
    summaryHi: 'जल्दी खराब होने वाले खाद्य पदार्थों के लिए ठंडे और गर्म तापमान के सुरक्षा नियम।',
    content: `Perishable foods left at ambient temperatures between 5°C and 60°C (41°F - 140°F) are vulnerable to rapid quality deterioration:
- **Cold Foods**: Store perishable items (dairy, chutneys, cooked gravies) below 5°C.
- **Hot Foods**: Maintain cooked hot foods above 60°C before serving.
- **Time Limit**: Discard perishable cooked food left at ambient room temperature for more than 2 hours.`,
    contentHi: `5°C से 60°C के बीच का तापमान खाद्य गुणवत्ता को तेजी से प्रभावित करता है:
- **ठंडा भोजन**: जल्दी खराब होने वाली चीजें 5°C से नीचे रखें।
- **गर्म भोजन**: परोसने से पहले पके हुए भोजन को 60°C से ऊपर गर्म रखें।
- **समय सीमा**: कमरे के सामान्य तापमान पर 2 घंटे से अधिक खुले रखे पके भोजन का सेवन न करें।`,
    sourceTitle: 'WHO Food Safety Guidelines: Temperature Control for Food Handlers',
    sourceOrganization: 'World Health Organization (WHO)',
    sourceUrl: 'https://www.who.int/activities/promoting-safe-food-handling',
    sourceType: 'WHO Public Hygiene Manual'
  }
];
