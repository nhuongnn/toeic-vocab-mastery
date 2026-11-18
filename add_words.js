const fs = require("fs");
const word1 = {
  "id": "hr-139",
  "word": "confirmation",
  "partOfSpeech": ["noun"],
  "category": "hr-personnel",
  "level": "advanced",
  "toeicFrequency": 7,
  "pronunciation": {
    "ipa": "/ˌkɒn.fərˈmeɪ.ʃən/",
    "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/confirmation--_us_1.mp3",
    "syllableBreakdown": "con-fir-ma-tion",
    "stressPattern": "●○○●○",
    "commonMistakes": "Learners often misplace primary stress on the second syllable (con-FIR-ma-tion) instead of the fourth syllable (con-fir-MA-tion). Additionally, non-native speakers sometimes confuse 'confirmation' (the formal act or document verifying an arrangement, appointment, booking, or personnel appointment) with 'affirmation' (a solemn emotional statement or declaration of truth)."
  },
  "etymology": {
    "origin": "Derived from Middle English, from Old French 'confirmacion', and directly from Latin 'confirmationem' (nominative 'confirmatio'), a noun of action from the past participle stem of 'confirmare' (to strengthen, establish, make firm), composed of the intensive prefix 'com-' (together, thoroughly) + 'firmare' (to make firm, from 'firmus', firm or steadfast).",
    "rootWord": "Latin confirmare (com- intensive + firmare, to make firm or establish)",
    "rootMeaning": "The act of making firm, thoroughly establishing, or officially corroborating a previous arrangement, booking, or appointment",
    "evolution": "The term entered Middle English legal and ecclesiastical terminology in the 14th century, initially denoting the formal ratification of a bishop's appointment or legal charter. Over subsequent centuries, its usage broadened into commercial, administrative, and corporate contexts to describe written or electronic receipts, reservation verifications, and formal job offers or employee status transitions.",
    "relatedLanguages": [
      "French: confirmation",
      "Spanish: confirmacion",
      "German: Bestatigung",
      "Italian: conferma"
    ],
    "firstRecordedUse": "Late 14th century (Middle English ecclesiastical and legal administrative records)"
  },
  "deepMeaning": {
    "coreConcept": "A formal written, electronic, or verbal statement, document, or verification issued by an authority or organization that definitively validates, secures, or corroborates a previous booking, appointment, reservation, or employee probationary status.",
    "spatialContext": "Corporate human resources portals, travel booking desks, hotel reception terminals, legal compliance archives, and administrative email inboxes.",
    "temporalContext": "Following booking requests, probationary employment milestone reviews, hotel check-in procedures, and flight reservation completions.",
    "emotionalTone": "Definitive, authoritative, reassuring, official, and conclusive.",
    "formalityLevel": "formal",
    "connotation": "positive"
  },
  "nativeMindset": {
    "howNativesThink": "Native English speakers view confirmation as an essential piece of evidentiary paperwork or digital notification that eliminates ambiguity and provides legal or operational peace of mind. Without a confirmation number or written confirmation, business arrangements are treated as tentative or incomplete.",
    "mentalImage": "An executive assistant reviewing a printed hotel and flight confirmation itinerary on a corporate desk while speaking on a headset with a travel coordinator.",
    "whenToUse": "Use when referring to reservation receipts, booking verifications, probationary employment status approvals, or official administrative authorizations.",
    "whenNotToUse": "Do not use to describe initial inquiries, preliminary estimates, or speculative brainstorming discussions.",
    "culturalContext": "In modern global commerce and travel industries, automated and manual confirmations serve as legally binding receipts and customer service benchmarks."
  },
  "examples": {
    "daily": [
      "She checked her email inbox for the booking confirmation before heading to the airport for her morning flight to Atlanta.",
      "The hotel sent a reservation confirmation containing the check-in time and cancellation policy directly to his smartphone.",
      "Please keep your payment confirmation receipt in a safe place until the merchandise is delivered."
    ],
    "business": [
      "Human resources issued an official employment confirmation letter to verify the candidate salary and start date for mortgage approval purposes.",
      "The procurement department awaited written confirmation from the overseas supplier before wiring the final installment.",
      "Candidates must sign and return their interview appointment confirmation within forty-eight hours to secure their slot."
    ],
    "conversation": [
      "Colleague A: Did you receive the flight confirmation from the travel agency yet? Colleague B: Yes, it just arrived in my inbox with all the seat assignments and boarding pass details.",
      "Manager: Has the new hire completed their ninety-day probationary period? HR Specialist: We are processing his employment confirmation paperwork today."
    ],
    "collocations": [
      "written confirmation",
      "booking confirmation",
      "reservation confirmation",
      "order confirmation",
      "receive confirmation",
      "await confirmation"
    ]
  },
  "wordFamily": {
    "noun": "confirmation",
    "verb": "confirm",
    "adjective": "confirmed",
    "adverb": "confirmedly"
  },
  "visual": {
    "imageKeyword": "printed booking confirmation document email smartphone office desk",
    "imageDescription": "A professional desk featuring a printed airline and hotel confirmation document alongside a smartphone displaying an email confirmation message and a sleek pen.",
    "mnemonic": "A confirmation makes a temporary booking firm and solid so you know it is secure."
  },
  "video": {
    "description": "An administrative training tutorial demonstrating how enterprise resource planning software automatically generates order and reservation confirmations for global clients."
  },
  "toeicContext": {
    "commonParts": [3, 4, 7],
    "exampleQuestion": "All workshop attendees will receive an email _____ containing their assigned seminar room and schedule as soon as their registration fee is processed.\n(A) confirmation\n(B) confirming\n(C) confirmed\n(D) confirm",
    "tips": "In TOEIC Part 5 and 6 questions, notice that email confirmation is a standard noun compound. Following possessive adjectives or determiners like an email, a noun is required."
  },
  "synonyms": ["verification", "validation", "authorization", "ratification", "approval", "endorsement"],
  "antonyms": ["cancellation", "rejection", "denial", "revocation"],
  "relatedWords": ["reservation", "booking", "receipt", "itinerary", "verification", "approval"]
};

const word2 = {
  "id": "hr-140",
  "word": "conformance",
  "partOfSpeech": ["noun"],
  "category": "hr-personnel",
  "level": "advanced",
  "toeicFrequency": 7,
  "pronunciation": {
    "ipa": "/kənˈfɔːr.məns/",
    "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/conformance--_us_1.mp3",
    "syllableBreakdown": "con-for-mance",
    "stressPattern": "○●○○",
    "commonMistakes": "Learners often confuse 'conformance' (strict adherence to standards, regulations, or specifications) with 'conference' (a formal meeting or convention). Additionally, non-native speakers sometimes mix up conformance with 'compliance', though conformance often specifically emphasizes matching design specifications or quality standards."
  },
  "etymology": {
    "origin": "Formed in English from the verb conform (derived from Middle English conformen, from Old French conformer, from Latin conformare, meaning to form together, fashion like, shape according to, from com- + formare, to form) + the nominal suffix -ance.",
    "rootWord": "Latin conformare (com- together + formare, to shape or form)",
    "rootMeaning": "The state or quality of being shaped, structured, or operated in exact agreement with established standards, rules, or specifications",
    "evolution": "The term emerged in English administrative and legal discourse during the late 16th century, initially relating to religious conformity with church liturgy. In the 20th century, with the rise of industrial engineering, ISO quality management standards, and regulatory oversight, conformance became a foundational technical term in manufacturing, aerospace, and corporate governance.",
    "relatedLanguages": [
      "French: conformite",
      "Spanish: conformidad",
      "German: Konformitat",
      "Italian: conformita"
    ],
    "firstRecordedUse": "Late 16th century (religious and legal administrative texts; later adopted in 20th-century industrial engineering and quality assurance)"
  },
  "deepMeaning": {
    "coreConcept": "The strict state, act, or quality of adhering completely to established engineering specifications, regulatory guidelines, quality standards, or organizational policies without deviation.",
    "spatialContext": "Quality assurance testing laboratories, ISO audit compliance offices, manufacturing plant production floors, and corporate legal departments.",
    "temporalContext": "Quarterly quality audits, pre-shipment inspections, manufacturing assembly checks, and regulatory compliance reviews.",
    "emotionalTone": "Rigorous, exacting, disciplined, objective, and uncompromising.",
    "formalityLevel": "formal",
    "connotation": "neutral"
  },
  "nativeMindset": {
    "howNativesThink": "In engineering and corporate compliance environments, native speakers view conformance as the ultimate benchmark of professional quality and safety. It implies that every product, process, or employee behavior matches the exact blueprint or standard mandated by law or corporate policy.",
    "mentalImage": "An OSHA safety inspector examining factory machinery blueprints while measuring clearance distances with a precision caliper to verify strict conformance.",
    "whenToUse": "Use when discussing adherence to technical standards, ISO certifications, quality control specifications, or regulatory rules.",
    "whenNotToUse": "Do not use to describe general agreement in a conversation or casual social conformity.",
    "culturalContext": "In global manufacturing and regulated industries (e.g., medical devices, aerospace, automotive), proving conformance to international standards is legally mandatory for market access."
  },
  "examples": {
    "daily": [
      "The building inspector checked every electrical installation to ensure full conformance with municipal fire safety codes.",
      "She reviewed the furniture assembly manual to guarantee exact conformance with the manufacturer instructions.",
      "The community center was constructed in strict conformance with local zoning ordinances."
    ],
    "business": [
      "The quality assurance director certified that all exported microchips were manufactured in strict conformance with ISO 9001 standards.",
      "External auditors examined the company financial records to verify conformance with international accounting principles.",
      "Failure to maintain operational conformance with environmental protection regulations can result in severe financial penalties."
    ],
    "conversation": [
      "Auditor: Did the new production line pass the latest stress tests? Plant Manager: Yes, every component was tested and verified for complete conformance with safety specifications.",
      "Project Lead: Are our software security protocols meeting industry benchmarks? Chief Technology Officer: Our recent audit confirmed total conformance with ISO 27001 standards."
    ],
    "collocations": [
      "in conformance with",
      "strict conformance",
      "regulatory conformance",
      "quality conformance",
      "ensure conformance",
      "maintain conformance"
    ]
  },
  "wordFamily": {
    "noun": "conformance",
    "verb": "conform",
    "adjective": "conformable",
    "adverb": "conformably"
  },
  "visual": {
    "imageKeyword": "quality control inspection machinery measurement blueprint ISO standards",
    "imageDescription": "An industrial quality inspector in a modern manufacturing plant comparing machine parts against digital engineering schematics on a tablet.",
    "mnemonic": "To achieve conformance, your work must conform to the exact form of the standard."
  },
  "video": {
    "description": "An industrial engineering documentary explaining how ISO quality management systems audit manufacturing facilities to ensure strict conformance with global standards."
  },
  "toeicContext": {
    "commonParts": [6, 7],
    "exampleQuestion": "Factory supervisors must conduct weekly equipment audits to ensure ongoing _____ with occupational health and safety regulations.\n(A) conformance\n(B) conforming\n(C) conform\n(D) conformable",
    "tips": "In TOEIC Part 5 and 6 questions, prepositional phrases like ensure ongoing conformance with frequently require a noun such as conformance or compliance."
  },
  "synonyms": ["compliance", "adherence", "observance", "conformity", "consistency", "alignment"],
  "antonyms": ["nonconformance", "deviation", "noncompliance", "violation", "infraction"],
  "relatedWords": ["compliance", "specification", "standard", "audit", "regulation", "adherence"]
};

const word3 = {
  "id": "hr-141",
  "word": "consent",
  "partOfSpeech": ["noun"],
  "category": "hr-personnel",
  "level": "intermediate",
  "toeicFrequency": 8,
  "pronunciation": {
    "ipa": "/kənˈsɛnt/",
    "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/consent--_us_1.mp3",
    "syllableBreakdown": "con-sent",
    "stressPattern": "○●",
    "commonMistakes": "Learners often confuse the noun/verb 'consent' (permission or agreement) with 'content' (satisfaction or the subjects covered in a document). Additionally, non-native speakers sometimes misuse the preposition, saying 'consent for' instead of 'consent to'."
  },
  "etymology": {
    "origin": "Derived from Middle English 'consenten' (verb) and 'consent' (noun), from Old French 'consentir', from Latin 'consentire' (to feel together, agree), composed of 'com-' (together) + 'sentire' (to feel, perceive).",
    "rootWord": "Latin consentire (com- together + sentire, to feel or perceive)",
    "rootMeaning": "To feel together in agreement, granting voluntary permission or concurrence",
    "evolution": "The term entered Middle English in the 14th century through Anglo-Norman legal and theological terminology, denoting voluntary agreement, assent, or permission. Over the centuries, it became a cornerstone concept in constitutional law, contract law, medical ethics, human resources, and data privacy regulations (such as GDPR).",
    "relatedLanguages": [
      "French: consentement",
      "Spanish: consentimiento",
      "German: Zustimmung",
      "Italian: consenso"
    ],
    "firstRecordedUse": "14th century (Middle English legal, administrative, and theological texts)"
  },
  "deepMeaning": {
    "coreConcept": "Permission, voluntary agreement, or official concurrence given by an individual, employee, or stakeholder to allow an action, procedure, contract, or data collection to take place.",
    "spatialContext": "Human resources onboarding departments, corporate legal signing rooms, clinical medical research facilities, and data privacy compliance portals.",
    "temporalContext": "Prior to background checks, contract execution, medical treatments, data processing agreements, and corporate restructuring announcements.",
    "emotionalTone": "Voluntary, respectful, legally binding, deliberate, and authoritative.",
    "formalityLevel": "formal",
    "connotation": "positive"
  },
  "nativeMindset": {
    "howNativesThink": "In professional, legal, and institutional contexts, native speakers treat consent as an absolute prerequisite that protects individual rights and shields organizations from liability. Operating without explicit consent is viewed as a serious ethical and legal breach.",
    "mentalImage": "An employee signing a written background check consent form across an executive desk while an HR manager hands over a secure pen.",
    "whenToUse": "Use when referring to formal permission, contractual assent, background check authorizations, or data privacy agreements.",
    "whenNotToUse": "Do not use to describe mere passive tolerance or general happiness.",
    "culturalContext": "In modern corporate governance and employment law, obtaining documented employee or client consent is mandatory for background screenings, data handling, and major corporate transactions."
  },
  "examples": {
    "daily": [
      "Minors participating in the school research study must obtain written parental consent before joining.",
      "She gave her full consent for the contractor to begin remodeling the office reception area.",
      "Users must check the box to grant consent for cookie tracking on the company website."
    ],
    "business": [
      "Human resources cannot initiate a criminal background check on job applicants without receiving signed written consent.",
      "The merger between the two pharmaceutical firms requires regulatory consent from antitrust authorities before finalization.",
      "Shareholders gave their unanimous consent to restructure the corporate board during the annual general meeting."
    ],
    "conversation": [
      "HR Manager: Can we proceed with contacting the applicant previous employers? Recruiter: Yes, we received her signed consent form this morning.",
      "Attorney: Did the client agree to the settlement terms? Paralegal: He gave his verbal consent over the phone and is signing the formal agreement now."
    ],
    "collocations": [
      "written consent",
      "informed consent",
      "give consent",
      "obtain consent",
      "without consent",
      "consent form"
    ]
  },
  "wordFamily": {
    "noun": "consent",
    "verb": "consent",
    "adjective": "consenting",
    "adverb": "consistently"
  },
  "visual": {
    "imageKeyword": "signed consent form human resources background check office desk pen",
    "imageDescription": "A close-up of a professional human resources consent form resting on a wooden desk, featuring a signature line and a fountain pen.",
    "mnemonic": "To consent is to send your agreement together with someone else request."
  },
  "video": {
    "description": "A corporate compliance webinar explaining the legal requirements for obtaining informed employee consent during background screenings and data privacy audits."
  },
  "toeicContext": {
    "commonParts": [5, 6, 7],
    "exampleQuestion": "According to company policy, background checks cannot be conducted on prospective employees without their explicit written _____.\\n(A) consent\\n(B) content\\n(C) container\\n(D) context",
    "tips": "In TOEIC Part 5 vocabulary questions, distinguish between easily confused lookalikes: consent (permission), content (satisfaction or substance), and context (surrounding circumstances)."
  },
  "synonyms": ["permission", "agreement", "authorization", "assent", "approval", "endorsement"],
  "antonyms": ["dissent", "opposition", "refusal", "denial", "prohibition"],
  "relatedWords": ["permission", "authorization", "agreement", "assent", "approval", "compliance"]
};

const data = JSON.parse(fs.readFileSync("toeic_vocab.json", "utf8"));
data.words.push(word1, word2, word3);
fs.writeFileSync("toeic_vocab.json", JSON.stringify(data, null, 2));
console.log("Successfully added 3 words via add_words.js. Total words:", data.words.length);
