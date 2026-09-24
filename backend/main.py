"""
AAHARSETU API Backend Server
"Safer Food. Smarter Communities."
Inclusive Food Safety & Community Assistance Platform
Independent Student Prototype exploring AI, NLP, and Food Safety Workflows.
DISCLAIMER: This is an educational prototype and not an official FSSAI system.
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid

app = FastAPI(
    title="AaharSetu Food Safety & Community Assistance API",
    description="Educational prototype backend providing rule-based complaint classification, vendor gap analysis, and grounded knowledge retrieval.",
    version="1.0.0"
)

# Enable CORS for React Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Models ---

class ComplaintInput(BaseModel):
    food_name: str = Field(..., description="Name of the food item or product")
    description: str = Field(..., description="Observation details")
    category: Optional[str] = "Auto"
    location: Optional[str] = "Local Area"
    stall_type: Optional[str] = "Street Food Stall"
    date: Optional[str] = None
    evidence_url: Optional[str] = None

class ClassificationOutput(BaseModel):
    id: str
    food_name: str
    description: str
    detected_category: str
    prototype_priority: str
    detected_risk_factors: List[str]
    priority_explanation: str
    recommended_actions: List[str]
    disclaimer: str
    created_at: str

class VendorEvaluationInput(BaseModel):
    stall_name: str
    location: str
    stall_type: str
    answers: Dict[int, str] # question_id -> 'yes' | 'no' | 'not_sure'
    budget: Optional[int] = 500

class AssistantQuery(BaseModel):
    query: str
    language: Optional[str] = "en"

# --- In-Memory Seed Store ---
SEED_COMPLAINTS = [
    {
        "id": "AS-2025-0841",
        "food_name": "Swollen Packaged Mango Juice (250ml)",
        "description": "Purchased a sealed tetrapack carton that was swollen with an unusual sour smell.",
        "detected_category": "Spoilage/Expired Food",
        "prototype_priority": "High",
        "detected_risk_factors": [
            "Possible spoilage or packaging-related food safety concern (loss of seal/fermentation indicator). Note: This prototype cannot determine the actual cause or confirm contamination.",
            "Compromised hermetic container seal"
        ],
        "priority_explanation": "Possible spoilage or packaging-related food safety concern. Note: This prototype cannot determine the actual cause, confirm contamination, or provide laboratory analysis.",
        "recommended_actions": [
            "Do not consume or taste the affected item.",
            "Preserve packaging, batch number, and purchase receipt in a secure bag.",
            "Alert the retail merchant or store management immediately."
        ],
        "disclaimer": "This is an educational prototype and not an official inspection or regulatory decision.",
        "created_at": "2025-05-12T10:15:00Z"
    }
]

# --- Rule Engine ---
CATEGORY_RULES = [
    {
        "category": "Spoilage/Expired Food",
        "keywords": ["swollen", "bloated", "puffed", "sour", "rotten", "fermented", "fungus", "mold", "curdled", "expired", "bad smell", "foul smell"],
        "risk": "Possible spoilage or packaging-related food safety concern. Note: This prototype cannot determine the actual cause or confirm contamination without laboratory testing."
    },
    {
        "category": "Contamination",
        "keywords": ["fly", "flies", "cockroach", "insect", "worm", "hair", "stone", "glass", "plastic", "metal", "dust"],
        "risk": "Visible physical or biological foreign matter observed in food handling area."
    },
    {
        "category": "Adulteration",
        "keywords": ["synthetic", "artificial color", "chemical", "bright yellow", "malachite green", "detergent", "urea", "chalk", "adulterated"],
        "risk": "Suspected non-permitted color additive or foreign substance indicator requiring laboratory verification."
    },
    {
        "category": "Packaging",
        "keywords": ["seal broken", "torn", "punctured", "leaking", "tampered", "dented", "rusted"],
        "risk": "Packaging integrity compromise or compromised protective barrier."
    },
    {
        "category": "Labelling",
        "keywords": ["missing expiry", "no date", "no best before", "fssai missing", "no veg non-veg mark"],
        "risk": "Missing or illegible mandatory packaging label information."
    },
    {
        "category": "Hygiene",
        "keywords": ["dirty hands", "unwashed", "no gloves", "dirty cloth", "coughing", "sneezing", "bare hands"],
        "risk": "Observable hygiene lapse during food preparation, serving, or utensil cleaning."
    },
    {
        "category": "Food Premises",
        "keywords": ["open drain", "garbage", "stagnant water", "toilet", "uncovered dustbin", "rats", "mice"],
        "risk": "Environmental hygiene concern in vicinity of food preparation area."
    }
]

def classify_text(text: str, user_cat: Optional[str] = "Auto"):
    text_lower = text.lower()
    scores = {rule["category"]: 0 for rule in CATEGORY_RULES}
    scores["Other"] = 1
    factors = []

    for rule in CATEGORY_RULES:
        matched = False
        for kw in rule["keywords"]:
            if kw in text_lower:
                scores[rule["category"]] += 10
                matched = True
        if matched:
            factors.append(rule["risk"])

    top_cat = max(scores, key=scores.get)
    final_cat = user_cat if (user_cat and user_cat != "Auto" and user_cat in scores) else (top_cat if scores[top_cat] > 1 else "Other")

    is_high = any(k in text_lower for k in ["swollen", "bloated", "puffed", "baby", "sick", "vomit", "poison", "glass", "rat", "insect", "chemical", "mold"]) or final_cat in ["Spoilage/Expired Food", "Adulteration"]
    is_med = any(k in text_lower for k in ["expired", "foul", "dirty", "uncovered", "torn", "drain"]) or final_cat in ["Hygiene", "Packaging", "Food Premises"]

    if is_high:
        priority = "High"
        exp = "Possible spoilage or packaging-related food safety concern. Note: This prototype cannot determine the actual cause, confirm contamination, or provide laboratory analysis."
        actions = [
            "Do not consume or taste the affected item.",
            "Preserve packaging, batch number, and purchase receipt in a secure bag.",
            "Alert the retail merchant or stall vendor immediately."
        ]
    elif is_med:
        priority = "Medium"
        exp = "Moderate hygiene or packaging vulnerability identified based on submitted description. Note: This prototype cannot determine actual bacterial levels or confirm contamination."
        actions = [
            "Refrain from consuming items exposed to open dust or questionable handling.",
            "Politely inform the vendor regarding clean handling practices.",
            "Document stall location and observation for community records."
        ]
    else:
        priority = "Low"
        exp = "Informational observation or minor administrative/labeling variance without acute hazard indicators in the submitted description."
        actions = [
            "Verify manufacturing and expiry dates on packaging before purchase.",
            "Check for standard product information on packaged goods.",
            "Share constructive hygiene feedback with the vendor."
        ]

    if not factors:
        factors.append("General food quality observation requiring standard hygiene verification")

    return final_cat, priority, factors, exp, actions

# --- Routes ---

@app.get("/")
def root():
    return {
        "platform": "AaharSetu",
        "tagline": "Safer Food. Smarter Communities.",
        "description": "Inclusive Food Safety & Community Assistance Platform (Student Prototype)",
        "disclaimer": "This is an independent educational student prototype and not an official FSSAI system.",
        "status": "operational",
        "endpoints": [
            "/api/health",
            "/api/classify",
            "/api/complaints",
            "/api/vendor-check/evaluate",
            "/api/assistant/query",
            "/api/analytics"
        ]
    }

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

@app.post("/api/classify", response_model=ClassificationOutput)
def classify_complaint_endpoint(data: ComplaintInput):
    full_text = f"{data.food_name} {data.description}"
    cat, priority, factors, exp, actions = classify_text(full_text, data.category)
    new_id = f"AS-2025-{str(uuid.uuid4())[:4].upper()}"

    result = {
        "id": new_id,
        "food_name": data.food_name,
        "description": data.description,
        "detected_category": cat,
        "prototype_priority": priority,
        "detected_risk_factors": factors,
        "priority_explanation": exp,
        "recommended_actions": actions,
        "disclaimer": "Prototype Priority Assessment: This is an educational prototype and not an official inspection or regulatory decision.",
        "created_at": datetime.utcnow().isoformat()
    }
    SEED_COMPLAINTS.append(result)
    return result

@app.get("/api/complaints")
def get_complaints(category: Optional[str] = None, priority: Optional[str] = None):
    results = SEED_COMPLAINTS
    if category and category != "all":
        results = [c for c in results if c["detected_category"] == category]
    if priority and priority != "all":
        results = [c for c in results if c["prototype_priority"] == priority]
    return results

@app.post("/api/vendor-check/evaluate")
def evaluate_vendor(data: VendorEvaluationInput):
    yes_count = sum(1 for a in data.answers.values() if a == "yes")
    total_q = max(len(data.answers), 10)
    score = round((yes_count / total_q) * 100)

    if score >= 80:
        grade = "Grade A - Excellent Hygiene"
    elif score >= 60:
        grade = "Grade B - Good Hygiene"
    elif score >= 40:
        grade = "Grade C - Needs Improvement"
    else:
        grade = "Critical - Immediate Action Needed"

    return {
        "stall_name": data.stall_name,
        "score": score,
        "grade": grade,
        "passed_count": yes_count,
        "budget": data.budget,
        "disclaimer": "This is an educational self-assessment and not an official compliance certification."
    }

@app.post("/api/assistant/query")
def assistant_query(data: AssistantQuery):
    q = data.query.lower()
    if any(k in q for k in ["store", "temperature", "danger", "heat", "cold"]):
        return {
            "query": data.query,
            "answer": "Keep perishable foods below 5°C or steaming hot above 60°C. Perishable items left at ambient temperature for over 2 hours should be discarded.",
            "sources": [
                {
                    "title": "WHO Food Safety Guidelines: Temperature Control for Food Handlers",
                    "organization": "World Health Organization (WHO)",
                    "url": "https://www.who.int/activities/promoting-safe-food-handling",
                    "type": "WHO Public Hygiene Manual"
                }
            ],
            "disclaimer": "Educational knowledge assistant. For acute illness, seek clinical medical evaluation."
        }
    elif any(k in q for k in ["hygiene", "vendor", "stall", "clean", "water", "hand"]):
        return {
            "query": data.query,
            "answer": "Wash hands with potable water and soap before handling food and after handling money. Keep food preparation surfaces clean and keep prepared food covered from flies and dust.",
            "sources": [
                {
                    "title": "Codex Alimentarius Code of Hygienic Practice for Street-Vended Foods (CXC 43-1997)",
                    "organization": "FAO / WHO Codex Alimentarius Commission",
                    "url": "https://www.fao.org/fao-who-codexalimentarius/codex-texts/codes-of-practice/en/",
                    "type": "International Food Standard"
                }
            ],
            "disclaimer": "Educational knowledge assistant. For acute illness, seek clinical medical evaluation."
        }
    elif any(k in q for k in ["swollen", "bloated", "packet", "juice", "spoiled"]):
        return {
            "query": data.query,
            "answer": "When a packaged food container is swollen or damaged, do not taste or consume it. Retain batch information and notify the retailer.",
            "sources": [
                {
                    "title": "Food Safety and Quality Guidelines for Consumers",
                    "organization": "World Health Organization (WHO)",
                    "url": "https://www.who.int/news-room/fact-sheets/detail/food-safety",
                    "type": "Public Food Safety Factsheet"
                }
            ],
            "disclaimer": "Educational knowledge assistant. This prototype cannot determine contamination without laboratory testing."
        }
    else:
        return {
            "query": data.query,
            "answer": "Relevant information was not found in the current knowledge base.",
            "sources": [],
            "disclaimer": "Educational knowledge assistant. Not an official FSSAI information system."
        }

@app.get("/api/analytics")
def get_analytics():
    return {
        "total_complaints": len(SEED_COMPLAINTS),
        "synthetic_notice": "Dashboard statistics shown in this student prototype use synthetic/demo data and do not represent official FSSAI statistics.",
        "spoilage_count": sum(1 for c in SEED_COMPLAINTS if c["detected_category"] == "Spoilage/Expired Food"),
        "high_priority_count": sum(1 for c in SEED_COMPLAINTS if c["prototype_priority"] == "High")
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
