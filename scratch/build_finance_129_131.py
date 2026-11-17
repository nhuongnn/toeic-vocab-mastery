import json

words_data = [
    {
        "id": "finance-129",
        "word": "down payment",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "advanced",
        "toeicFrequency": 7,
        "pronunciation": {
            "ipa": "/ˈdaʊn ˌpeɪ.mənt/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/down_payment--_us_1.mp3",
            "syllableBreakdown": "down·pay·ment",
            "stressPattern": "●·●○",
            "commonMistakes": "Learners often place excessive stress on the suffix '-ment' (saying /daʊn peɪˈment/), whereas primary stress belongs on 'down' and secondary stress on 'pay'. Another frequent mistake is reducing the diphthong /aʊ/ in 'down' to a monophthong (/dɑːn/ or /dɔːn/). In financial contexts, non-native speakers often confuse a 'down payment' (an initial partial cash outlay toward buying an asset on credit that builds equity and reduces loan principal) with a 'security deposit' (a refundable sum protecting a landlord against leasehold damage) or 'earnest money' (an initial deposit held in escrow to prove good faith while negotiating a purchase contract)."
        },
        "etymology": {
            "origin": "Modern English commercial compound formed from the adverb 'down' (from Old English 'dūne', an apheresis of 'ofdūne' meaning 'from the hill, downward onto the ground or counter') and 'payment' (from Old French 'paiement', from 'paier' meaning 'to appease or satisfy a creditor', derived from Latin 'pācāre', 'to quiet, appease, or bring peace', from 'pāx', 'peace').",
            "rootWord": "Old English ofdūne (downward, cash laid down on the counter) + Latin pācāre (to satisfy or appease a creditor)",
            "rootMeaning": "'Money laid down immediately on the counter to appease a seller and initiate an asset purchase'",
            "evolution": "The idiom 'to pay down' arose in 17th-century England, denoting coin placed physically onto the counting table ('cash down on the nail') to seal a trade. During the industrial expansion and consumer credit revolution of the late 19th century, particularly in American real estate and mortgage banking, the noun phrase 'down payment' became formal legal terminology for the mandatory upfront equity stake required from a borrower before a lending institution would finance the remaining balance.",
            "relatedLanguages": [
                "French: acompte / apport initial",
                "Spanish: pago inicial / enganche / cuota inicial",
                "German: Anzahlung / Eigenkapital",
                "Italian: acconto / anticipo"
            ],
            "firstRecordedUse": "Late 19th century (c. 1888, in American real estate and mortgage financing agreements)"
        },
        "deepMeaning": {
            "coreConcept": "An initial upfront lump-sum payment made in liquid funds at the time of purchasing a major capital asset (such as commercial real estate, industrial machinery, or a vehicle) on credit, representing a fixed percentage of the total purchase price while the balance is financed through a loan or mortgage.",
            "spatialContext": "Commercial bank lending suites, real estate title and escrow settlement offices, dealership finance departments, and corporate capital expenditure balance sheet schedules.",
            "temporalContext": "Loan origination dates, commercial leasehold closings, property deed signing ceremonies, and annual budget capital expenditure cycles.",
            "emotionalTone": "Substantial, legally committed, risk-mitigating, and financially significant.",
            "formalityLevel": "formal",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "Native speakers regard a 'down payment' as 'skin in the game'—the concrete personal capital a buyer risks upfront to demonstrate creditworthiness and commitment. Psychologically, it transforms an abstract financing agreement into real equity. The higher the down payment, the lower the monthly debt service, the lower the loan-to-value (LTV) ratio, and the more favorable the interest rate. In commercial corporate procurement, negotiating down payment percentages is critical for preserving working capital reserves.",
            "mentalImage": "A corporate real estate director seated across from an escrow officer and a bank vice president, sliding a signed certified cashier's check across the mahogany conference table to cover the 20 percent down payment on a new distribution warehouse.",
            "whenToUse": "Use when discussing upfront cash contributions required to purchase capital equipment, real estate properties, motor vehicles, or company acquisitions funded through debt financing or installment plans.",
            "whenNotToUse": "Do not use for refundable deposits against rental unit wear and tear (use 'security deposit'), temporary good-faith deposits held in escrow during inspection contingencies (use 'earnest money'), or routine recurring installment payments (use 'debt service' or 'monthly installment').",
            "culturalContext": "In American and British commerce, accumulating a 20 percent down payment is historically considered the benchmark of financial stability, eliminating the requirement for private mortgage insurance (PMI). In TOEIC Part 3 and Part 7 texts, down payments are frequently highlighted in corporate procurement negotiations, equipment vendor bids, and real estate leasing agreements."
        },
        "examples": {
            "daily": [
                "After five years of disciplined budgeting, the young couple saved enough money to make a twenty percent down payment on their first townhouse.",
                "The auto dealership required a $2,500 cash down payment before processing the lease paperwork for the hybrid sedan.",
                "Putting down a larger down payment will significantly lower your monthly mortgage payments and save thousands in interest over the life of the loan."
            ],
            "business": [
                "Apex Manufacturing agreed to wire a fifteen percent down payment to the German machinery supplier upon contract execution, with the remaining balance due upon delivery and testing.",
                "The commercial loan officer indicated that lowering the required down payment from 25 percent to 20 percent would require board-level credit committee approval.",
                "To conserve cash reserves for payroll during expansion, the enterprise negotiated terms allowing an initial down payment of just ten percent on the office complex."
            ],
            "conversation": [
                "\"Have we finalized the financing terms for the new fleet of delivery vans?\" / \"Yes, the fleet manager negotiated a ten percent down payment with thirty-six monthly installments at a fixed interest rate.\"",
                "\"Will our current cash reserves cover the down payment on the downtown warehouse?\" / \"Yes, the CFO approved transferring $350,000 into the escrow account before Friday's closing deadline.\"",
                "\"Does the equipment vendor offer financing with zero down payment?\" / \"They do, but opting for no down payment increases our monthly equipment finance charges by nearly twelve percent.\""
            ],
            "collocations": [
                "make a down payment",
                "put down a down payment",
                "substantial down payment",
                "minimum down payment",
                "down payment requirement",
                "twenty percent down payment"
            ]
        },
        "wordFamily": {
            "noun": "down payment",
            "verb": "pay down",
            "adjective": "down-payment",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "bank closing table signing loan contract certified check down payment keys",
            "imageDescription": "A close-up shot of an executive signing a commercial loan agreement beside a certified cashier's check showing a substantial down payment amount, next to a silver pen and corporate office keys.",
            "mnemonic": "DOWN PAYMENT: Put cash DOWN on the table immediately to lower the rest of your loan PAYMENT!"
        },
        "video": {
            "description": "A financial advisory seminar explaining how the size of a down payment influences loan-to-value ratios, amortization tables, and overall borrowing costs in commercial asset acquisition."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                7
            ],
            "exampleQuestion": "To qualify for the commercial mortgage at the advertised prime interest rate, the borrower must make an initial down _____ of at least twenty percent at closing.\n(A) pay\n(B) payment\n(C) paying\n(D) payable",
            "tips": "In TOEIC Part 5, test writers frequently assess compound nouns related to banking and commerce. The phrase 'down _____' forms the standard financial compound noun 'down payment'. Preceded by the adjective 'initial' and followed by the preposition 'of', the blank requires the noun 'payment' (choice B). Choice (A) is a base verb; (C) is a present participle or gerund; and (D) is an adjective."
        },
        "synonyms": [
            "initial payment",
            "upfront payment",
            "front money",
            "initial installment",
            "cash deposit",
            "equity contribution"
        ],
        "antonyms": [
            "final payment",
            "balloon payment",
            "full settlement",
            "balance due"
        ],
        "relatedWords": [
            "principal",
            "mortgage",
            "loan-to-value ratio",
            "installment",
            "amortization",
            "escrow",
            "collateral"
        ]
    },
    {
        "id": "finance-130",
        "word": "due diligence",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "advanced",
        "toeicFrequency": 7,
        "pronunciation": {
            "ipa": "/ˌduː ˈdɪl.ə.dʒəns/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/due_diligence--_us_1.mp3",
            "syllableBreakdown": "due dil·i·gence",
            "stressPattern": "●·●○○",
            "commonMistakes": "Learners often misstress 'diligence' by emphasizing the third syllable (/dɪ.lɪˈdʒɛns/) rather than the first (/ˈdɪl.ə.dʒəns/). Non-native speakers also frequently confuse 'due diligence' with casual research or informal background checking; in reality, it denotes an exhaustive, formal, legally required investigative audit into an entity's financial statements, tax liabilities, pending lawsuits, and commercial contracts before finalizing an investment or merger."
        },
        "etymology": {
            "origin": "Anglo-French legal compound pairing 'due' (from Anglo-Norman and Old French 'deu', past participle of 'devoir', meaning 'to owe, be obligated by duty', from Latin 'dēbēre', 'to owe') with 'diligence' (from Old French 'diligence', from Latin 'dīligentia', 'attentiveness, scrupulous care, industry', from 'dīligere', 'to esteem, select, attend to with care').",
            "rootWord": "Latin dēbēre (to owe, be bound by duty) + dīligere (to choose or examine with scrupulous care)",
            "rootMeaning": "'The requisite degree of scrupulous attentiveness and investigation owed under legal or contractual obligation'",
            "evolution": "The term originated in 16th-century English common law to define the standard of reasonable care that a prudent person is obligated to exercise in commercial affairs. Its specific modern corporate and financial significance was codified in the United States by the Securities Act of 1933 (Section 11), which established the 'due diligence defense'—protecting broker-dealers and underwriters from liability if they proved they conducted a comprehensive, reasonable investigation of a company's registration statements. It evolved into the universal corporate term for comprehensive pre-acquisition investigative audits.",
            "relatedLanguages": [
                "French: diligence raisonnable / devoir de diligence",
                "Spanish: diligencia debida",
                "German: Sorgfaltspflicht / Due Diligence",
                "Italian: dovuta diligenza / due diligence"
            ],
            "firstRecordedUse": "Late 16th century in legal jurisprudence (c. 1598); formally established in statutory securities finance in 1933"
        },
        "deepMeaning": {
            "coreConcept": "A comprehensive, systematic investigation, legal audit, and financial analysis conducted by accountants, attorneys, and investment bankers to verify all material facts, commercial assets, intellectual property, and liabilities of a prospective business partner or acquisition target prior to signing a definitive agreement.",
            "spatialContext": "Virtual data rooms (VDRs), corporate law offices, M&A investment banking deal rooms, private equity conference suites, and corporate audit committee meetings.",
            "temporalContext": "The formal pre-closing evaluation window (typically 30 to 90 days following the signing of a letter of intent / LOI), pre-IPO regulatory reviews, and supplier qualification audits.",
            "emotionalTone": "Scrupulous, analytical, skeptical, prudent, and protective.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "To native business executives and corporate attorneys, 'due diligence' (often abbreviated simply as 'DD') is the vital safeguard against catastrophic financial misrepresentation. The prevailing mindset is 'trust, but verify'. Dealmakers scrutinize balance sheets, undisclosed environmental liabilities, customer concentration risks, and pending litigation. In broader business culture, 'doing your due diligence' has also become an idiomatic standard meaning doing thorough homework and verifying all facts before executing any major initiative.",
            "mentalImage": "A team of forensic accountants and corporate legal counsel in a glass-walled conference room late at night, cross-examining digitized vendor contracts, audited tax filings, and patent registry deeds displayed across multi-monitor workstations.",
            "whenToUse": "Use when referencing the rigorous investigative audit preceding mergers and acquisitions (M&A), private equity buyouts, commercial real estate acquisitions, venture capital funding, or major vendor partnerships.",
            "whenNotToUse": "Do not use for casual, routine checks like proofreading an email for typos, quickly skimming a newsletter, or verifying a calendar appointment (say 'double-check' or 'verify').",
            "culturalContext": "In Anglo-American corporate governance, failure to exercise due diligence exposes corporate directors and executives to personal liability for breach of fiduciary duty. In TOEIC Parts 3, 4, and 7, due diligence is a frequent topic in corporate press releases, business meeting dialogues, and memos detailing impending mergers or supplier selections."
        },
        "examples": {
            "daily": [
                "Before signing the purchase agreement on the historic home, she performed due diligence by ordering a foundation inspection and reviewing historical zoning records.",
                "Smart consumers do their due diligence by comparing warranty terms, customer reviews, and financing rates before purchasing an electric vehicle.",
                "He exercised due diligence by checking the contractor's state licensing status and verifying customer references before paying a project deposit."
            ],
            "business": [
                "The private equity firm commenced a sixty-day due diligence review to inspect the target technology company's proprietary source code and client renewal rates.",
                "During environmental due diligence, independent soil testing uncovered contamination on the industrial site, leading the buyer to demand a $2 million purchase price reduction.",
                "Both pharmaceutical corporations established a shared virtual data room to expedite the mutual due diligence process before finalizing their cross-border merger."
            ],
            "conversation": [
                "\"Has the investment committee voted to approve the acquisition of Nexa Systems?\" / \"Not yet; our legal team is still conducting due diligence on several unresolved patent infringement claims.\"",
                "\"Why was the commercial real estate transaction delayed by three weeks?\" / \"The buyer's engineering firm requested additional time to complete due diligence on the building's structural integrity and HVAC systems.\"",
                "\"How extensive was the due diligence conducted prior to selecting our new cloud infrastructure provider?\" / \"We spent over a month auditing their data privacy policies, server redundancy protocols, and SOC 2 compliance certifications.\""
            ],
            "collocations": [
                "conduct due diligence",
                "perform due diligence",
                "due diligence process",
                "due diligence period",
                "financial due diligence",
                "legal due diligence"
            ]
        },
        "wordFamily": {
            "noun": "due diligence",
            "verb": "",
            "adjective": "due-diligence",
            "adverb": "diligently"
        },
        "visual": {
            "imageKeyword": "corporate due diligence audit virtual data room legal review financial analysis",
            "imageDescription": "A team of financial analysts and corporate lawyers examining forensic accounting spreadsheets and highlighted contracts on laptop screens in a modern boardroom.",
            "mnemonic": "DUE DILIGENCE: You owe a legal DUTY (due) to inspect every detail with CARE (diligence) before closing a multi-million-dollar deal!"
        },
        "video": {
            "description": "A corporate finance instructional video illustrating the essential phases of M&A due diligence, explaining how virtual data rooms, quality-of-earnings reports, and compliance audits protect investor capital."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                7
            ],
            "exampleQuestion": "Before finalizing the multi-million-dollar corporate acquisition, the investment panel hired an independent accounting firm to _____ thorough due diligence on the target firm's liabilities.\n(A) conduct\n(B) conductor\n(C) conducted\n(D) conducting",
            "tips": "In TOEIC Part 5, test takers must recognize standard business verb-noun collocations. 'Due diligence' is overwhelmingly paired with transitive action verbs such as 'conduct', 'perform', 'execute', or 'carry out'. Following the infinitive marker 'to' after the object 'an independent accounting firm', the blank requires the base verb form: (A) 'conduct'. Choice (B) is an agent noun; (C) is a past tense verb/participle; and (D) is a present participle or gerund."
        },
        "synonyms": [
            "investigative audit",
            "comprehensive inquiry",
            "formal investigation",
            "background assessment",
            "scrutiny",
            "feasibility audit"
        ],
        "antonyms": [
            "negligence",
            "dereliction of duty",
            "carelessness",
            "imprudence",
            "willful blindness"
        ],
        "relatedWords": [
            "audit",
            "merger and acquisition (M&A)",
            "virtual data room (VDR)",
            "fiduciary duty",
            "compliance",
            "liability",
            "letter of intent (LOI)"
        ]
    },
    {
        "id": "finance-131",
        "word": "duration",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/duˈreɪ.ʃən/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/duration--_us_1.mp3",
            "syllableBreakdown": "du·ra·tion",
            "stressPattern": "○●○",
            "commonMistakes": "Learners often improperly stress the initial syllable (saying /ˈdʊə.reɪ.ʃən/ or /ˈduː.rə.ʃən/), whereas the primary stress falls squarely on the middle syllable /-reɪ-/. Another common error is mispronouncing the suffix '-tion' as /-sən/ or /-tʃən/ instead of /-ʃən/. In financial investment contexts, non-native speakers frequently confuse 'duration' (a technical calculation in years quantifying a bond's price volatility relative to benchmark interest rate changes) with simple 'maturity' (the calendar date when a bond's principal must be repaid)."
        },
        "etymology": {
            "origin": "Late Middle English borrowing from Anglo-Norman and Old French 'duracion', derived from Late Latin 'dūrātiō' ('continuance, lasting quality, endurance'), from the Latin verb 'dūrāre' ('to harden, hold out, last, continue'), from the Proto-Indo-European root '*deru-' / '*dreu-' ('to be firm, solid, steadfast; tree, wood').",
            "rootWord": "Latin dūrāre (to last, endure, continue)",
            "rootMeaning": "'Continuance or endurance over a defined interval of time'",
            "evolution": "In Classical Latin, 'dūrus' signified hard or steadfast, yielding 'dūrāre' to express endurance over time. Late Latin 'dūrātiō' entered Norman administrative law to designate the temporal validity of charters and leases, passing into Middle English during the late 14th century. In 1938, Canadian economist Frederick Macaulay introduced 'duration' into financial mathematics as the cash-flow weighted time to maturity of a bond, cementing its role as the primary metric for interest rate risk management.",
            "relatedLanguages": [
                "French: durée",
                "Spanish: duración",
                "Italian: durata",
                "Portuguese: duração",
                "German: Dauer"
            ],
            "firstRecordedUse": "Late 14th century (c. 1386, in Geoffrey Chaucer's 'The Knight's Tale')"
        },
        "deepMeaning": {
            "coreConcept": "The entire length or span of time during which an action, condition, agreement, or event continues to exist; in portfolio management and fixed-income finance, a specialized metric measuring the sensitivity of a bond's market price to fluctuations in prevailing interest rates.",
            "spatialContext": "Corporate training rooms, executive scheduling calendars, bond trading desks, portfolio management offices, and project management Gantt charts.",
            "temporalContext": "Contract validity periods (a twelve-month software lease), conference run times, project implementation milestones, and fixed-income holding horizons.",
            "emotionalTone": "Objective, temporal, structured, and measurable.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Native speakers naturally conceive of 'duration' as a bounded temporal span connecting a starting point to an endpoint. Hearing the formal phrase 'for the duration of...' triggers an immediate awareness of conditions that apply continuously from beginning to end (such as 'for the duration of the flight' or 'for the duration of the contract'). In institutional finance, portfolio managers instinctively associate 'duration' with interest rate exposure: a bond fund with a duration of 6 years will drop roughly 6% in price for every 1% increase in interest rates.",
            "mentalImage": "A corporate project manager pointing to a Gantt chart displayed on a wall monitor, outlining the six-week duration of the software testing phase, while a treasury analyst nearby calculates the modified duration of the company's bond portfolio.",
            "whenToUse": "Use when formally specifying the full length or time span of an event, lease, presentation, contract, flight, or maintenance window, or when discussing interest-rate risk in bond portfolio management.",
            "whenNotToUse": "Do not confuse with 'deadline' (a specific cutoff point in time), 'period' (which can refer to an era or recurring interval), or 'term' (which often focuses on legal conditions and rights rather than the continuous flow of time).",
            "culturalContext": "In professional workplace English and TOEIC administrative notices, 'for the duration of [event]' is a standard formal idiom used in company memos, facility repair updates, and client contracts to indicate unbroken rules or service terms."
        },
        "examples": {
            "daily": [
                "Airline regulations require all passengers to keep their mobile phones in airplane mode for the entire duration of the flight.",
                "The introductory museum tour has an estimated duration of forty-five minutes and concludes in the sculpture garden.",
                "Temporary visitors are granted parking permits valid only for the duration of the weekend academic symposium."
            ],
            "business": [
                "The commercial lease agreement specifies that tenant improvement allowances remain valid for the duration of the five-year occupancy term.",
                "In anticipation of the central bank's upcoming interest rate hike, the asset manager adjusted the bond portfolio to reduce its overall duration.",
                "The engineering team implemented automated workflows that shortened the expected duration of the factory retooling project by nearly three weeks."
            ],
            "conversation": [
                "\"What is the expected duration of tomorrow's quarterly earnings presentation?\" / \"The presentation itself will last approximately forty-five minutes, followed by a fifteen-minute question-and-answer session.\"",
                "\"Will our remote access privileges remain active while the corporate server is upgraded?\" / \"No, VPN connections will be temporarily suspended for the duration of the four-hour maintenance window.\"",
                "\"Why is our treasury committee shifting funds into short-term commercial paper?\" / \"They want a shorter portfolio duration to safeguard our fixed-income capital against rising interest rates.\""
            ],
            "collocations": [
                "for the duration of",
                "total duration",
                "short duration",
                "extended duration",
                "expected duration",
                "duration of the contract"
            ]
        },
        "wordFamily": {
            "noun": "duration",
            "verb": "endure",
            "adjective": "durational",
            "adverb": "durably"
        },
        "visual": {
            "imageKeyword": "project management timeline gantt chart calendar hourglass duration schedule",
            "imageDescription": "A business executive's desk showing an interactive Gantt chart timeline across a laptop screen next to an elegant glass hourglass, highlighting the scheduled duration of project phases.",
            "mnemonic": "DURATION: Think of DURABILITY—it measures how long a project or contract can enDURE over time!"
        },
        "video": {
            "description": "An instructional project management lecture detailing critical path scheduling techniques to accurately forecast task duration and prevent operational bottlenecks."
        },
        "toeicContext": {
            "commonParts": [
                2,
                3,
                4,
                5,
                7
            ],
            "exampleQuestion": "Technicians performing maintenance on the manufacturing assembly line must wear protective earplugs for the _____ of their shifts.\n(A) duration\n(B) durable\n(C) durably\n(D) durability",
            "tips": "In TOEIC Part 5, test writers frequently test common prepositional idioms of time. The phrase 'for the _____ of' is a standard formal idiom: 'for the duration of' (meaning throughout the entire time period of). Positioned after the definite article 'the' and before the prepositional phrase 'of their shifts', the blank requires a noun referring to a span of time: (A) 'duration'. Choice (B) 'durable' is an adjective; (C) 'durably' is an adverb; and (D) 'durability' is an abstract noun denoting physical resistance to wear and tear."
        },
        "synonyms": [
            "time span",
            "length of time",
            "period",
            "term",
            "time frame",
            "continuance"
        ],
        "antonyms": [
            "instant",
            "moment",
            "cessation",
            "termination",
            "abrupt end"
        ],
        "relatedWords": [
            "maturity",
            "timeline",
            "timeframe",
            "tenure",
            "interval",
            "span",
            "Macaulay duration"
        ]
    }
]

with open("scratch/finance_129_131.json", "w", encoding="utf-8") as f:
    json.dump({"words": words_data}, f, indent=2, ensure_ascii=False)

print("Saved scratch/finance_129_131.json successfully.")
