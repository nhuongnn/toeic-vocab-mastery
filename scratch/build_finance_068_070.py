import json
import os
import re

words_data = [
    {
        "id": "finance-068",
        "word": "allowance",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/əˈlaʊ.əns/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/allowance--_us_1.mp3",
            "syllableBreakdown": "al-low-ance",
            "stressPattern": "○●○",
            "commonMistakes": "Learners often place primary stress mistakenly on the first syllable (saying */ˈæ.laʊ.əns/* instead of /əˈlaʊ.əns/). Another frequent pronunciation error is misarticulating the vowel in the second syllable, pronouncing the diphthong /aʊ/ (as in 'how') like /oʊ/ (as in 'slow'), making it sound like 'a-low-ance'. In corporate usage, learners frequently confuse an 'allowance' (a predetermined fixed stipend granted upfront regardless of individual itemized receipts) with a 'reimbursement' (an exact repayment for actual incurred expenses backed by receipts). In accounting contexts, candidates sometimes confuse the 'allowance for doubtful accounts' (a contra-asset balance sheet reserve) with an actual cash outflow or write-off."
        },
        "etymology": {
            "origin": "Middle English 'alowaunce', borrowed from Anglo-Norman and Old French 'alouance' (approval, allocation, sanction), derived from the Old French verb 'alouer' / 'aloer' (to place, allocate, approve).",
            "rootWord": "Old French alouer (to allocate, approve), blending Latin allocāre (ad- 'to' + locāre 'to place') and allaudāre (ad- 'to' + laudāre 'to praise, commend')",
            "rootMeaning": "'That which is allotted or granted; an approved portion, stipend, or authorized deduction'",
            "evolution": "In 14th-century Anglo-Norman legal and merchant proceedings, 'alouance' denoted an official judicial sanction, recognized claim, or permissible deduction in estate accounting. By the late 16th century, English commercial guilds and merchant shipping used the word to designate a standardized daily food ration or monetary stipend provided to crew members. In 19th-century commercial double-entry bookkeeping, the term became standard for balance sheet valuation adjustments (such as 'allowance for bad debts') to record prudent reserves against credit defaults. Today, in corporate human resources and taxation, it standardly refers to designated recurring stipends (housing, travel, per diem) and statutory tax exemptions.",
            "relatedLanguages": [
                "French: allocation (allowance, grant, benefit) / indemnité (stipend)",
                "Spanish: asignación (allowance, allocation) / provisión (accounting allowance)",
                "Italian: indennità (allowance, allowance payment) / fondo svalutazione crediti (allowance for doubtful accounts)",
                "German: Zulage (allowance, extra payment) / Aufwandsentschädigung (expense allowance) / Wertberichtigung (accounting valuation allowance)"
            ],
            "firstRecordedUse": "Late 14th century (c. 1380, in late Middle English legal records and Chaucer's writings meaning 'commendation, sanction, or permissible deduction')"
        },
        "deepMeaning": {
            "coreConcept": "A predetermined sum of money or quantitative limit allocated on a regular basis for a designated purpose (such as travel, housing, or personal expenses), or in accounting and finance, a contra-asset valuation reserve deducted from gross asset accounts to reflect anticipated future losses, bad debts, or depreciation.",
            "spatialContext": "Corporate HR compensation software portals, travel expense tracking dashboards (such as SAP Concur or Expensify), airport check-in luggage scales, and corporate balance sheet ledgers under current assets.",
            "temporalContext": "Disbursed semi-monthly or monthly alongside corporate payroll; calculated on a daily basis for business travel per diems; re-evaluated quarterly or annually during balance sheet audit reconciliations.",
            "emotionalTone": "Objective, regulated, protective, and equitable.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Native English speakers intuitively grasp 'allowance' across two primary professional spheres: corporate compensation and financial accounting. In employment, native professionals view an allowance as a predictable, non-repayable stipend granted upfront for a defined necessity (e.g., 'car allowance', 'per diem meal allowance', 'relocation allowance')—distinct from an itemized expense report where every penny must match a receipt. In finance and auditing, native accountants immediately visualize a 'buffer' or 'cushion': an allowance for doubtful accounts is money set aside because leadership realistically expects a certain percentage of credit customers to default, preserving conservative balance sheet integrity.",
            "mentalImage": "A corporate operations manager reviewing a travel expense portal on a laptop, approving a daily per diem allowance for an engineer flying overseas, while an adjacent financial ledger displays the quarterly allowance for doubtful accounts deducted from accounts receivable.",
            "whenToUse": "Use 'allowance' when specifying contractual employee stipends (e.g., 'daily meal allowance', 'relocation allowance', 'fuel allowance'), airline luggage thresholds ('baggage allowance'), statutory tax withholdings ('personal allowance', 'withholding allowance'), or balance sheet contra accounts ('allowance for uncollectible accounts').",
            "whenNotToUse": "Do not use 'allowance' when an employee submits exact receipts for full backward reimbursement of actual costs incurred (use 'reimbursement' or 'expense claim'). Do not use 'allowance' for an employee's base compensation (use 'salary' or 'wage'). In accounting, do not confuse 'allowance' with an actual debt write-off ('bad debt expense' or 'charge-off').",
            "culturalContext": "In Anglo-American business culture, stipends such as 'per diem allowances' for travel are standardized by government benchmarks (such as the US General Services Administration - GSA rates) to streamline corporate travel without requiring employees to track micro-receipts. For domestic families in English-speaking countries, an 'allowance' is also the traditional weekly pocket money given to children to teach basic personal financial literacy. In TOEIC test design, candidates encounter 'allowance' frequently in airline notices regarding carry-on baggage limits, HR compensation packages for expatriate transfers, and expense policy guidelines."
        },
        "examples": {
            "daily": [
                "The airline attendant informed passengers that their ticket included a carry-on baggage allowance of ten kilograms.",
                "During his summer internship in Chicago, David received a modest transportation allowance to cover subway and bus fares.",
                "To help our teenage daughter learn budgeting, we deposit a weekly allowance of twenty-five dollars into her savings account."
            ],
            "business": [
                "The updated corporate travel policy provides international sales directors with a per diem meal allowance of eighty dollars.",
                "Following an increase in overdue client invoices, the accounting department adjusted the company's allowance for doubtful accounts upward by two percent.",
                "The executive relocation package included a temporary housing allowance covering fully furnished accommodations for up to three months."
            ],
            "conversation": [
                "Speaker A: 'Does our firm cover dinner expenses during the regional training seminar in Dallas?'\nSpeaker B: 'Yes, corporate policy grants an evening meal allowance of forty-five dollars, so you do not need to save itemized grocery receipts as long as you stay within that cap.'",
                "Speaker A: 'Why did net accounts receivable drop on the balance sheet even though gross sales rose?'\nSpeaker B: 'The controller expanded the allowance for credit losses to account for potential customer defaults amid higher interest rates.'"
            ],
            "collocations": [
                "baggage allowance",
                "travel allowance",
                "housing allowance",
                "per diem allowance",
                "allowance for doubtful accounts",
                "tax allowance"
            ]
        },
        "wordFamily": {
            "noun": "allowance, allowances",
            "verb": "allow",
            "adjective": "allowable",
            "adverb": "allowably"
        },
        "visual": {
            "imageKeyword": "business travel per diem expense report calculator credit card",
            "imageDescription": "A clean business desk featuring an approved travel itinerary, corporate credit card, passport, and a tablet displaying an itemized daily meal and lodging allowance spreadsheet.",
            "mnemonic": "ALLOW + ANCE: The company ALLOWS an approved financial advANCE for your business travel expenses!"
        },
        "video": {
            "description": "A corporate accounting tutorial explaining the difference between gross receivables and net realizable value using the allowance method for bad debts."
        },
        "toeicContext": {
            "commonParts": [
                3,
                5,
                6,
                7
            ],
            "exampleQuestion": "Under the company's revised travel policy, field technicians traveling overseas are granted a daily meal _____ of seventy-five dollars.\n(A) allowance\n(B) allow\n(C) allowable\n(D) allowably",
            "tips": "TOEIC Part 5 frequently tests word family recognition in compound noun phrases and after descriptive modifiers. Preceded by the compound noun modifier 'daily meal', the blank requires a head noun: (A) allowance. Choice (B) 'allow' is a verb, Choice (C) 'allowable' is an adjective, and Choice (D) 'allowably' is an adverb. In Part 7, look for 'baggage allowance' in airline notifications and 'housing allowance' in overseas assignment job postings."
        },
        "synonyms": [
            "stipend",
            "per diem",
            "allocation",
            "provision",
            "subsidy",
            "grant"
        ],
        "antonyms": [],
        "relatedWords": [
            "contra-asset",
            "reimbursement",
            "per diem",
            "doubtful accounts",
            "write-off",
            "entitlement",
            "withholding"
        ]
    },
    {
        "id": "finance-069",
        "word": "amortization",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "advanced",
        "toeicFrequency": 7,
        "pronunciation": {
            "ipa": "/ˌæm.ɚ.t̬əˈzeɪ.ʃən/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/amortization--_us_1.mp3",
            "syllableBreakdown": "am-or-ti-za-tion",
            "stressPattern": "○○○●○",
            "commonMistakes": "Learners frequently confuse 'amortization' with 'depreciation': depreciation applies exclusively to tangible fixed assets (such as machinery, vehicles, and office buildings), whereas amortization applies strictly to intangible assets (such as patents, trademarks, software licenses, and goodwill) or debt reduction schedules. Phonetically, non-native speakers often struggle with the vowel reduction in the unstressed medial syllables /ɚ.t̬ə/, or fail to stress the fourth syllable /zeɪ/, incorrectly placing emphasis on the second syllable (*uh-MOR-tiz-a-tion*). Note that British English speakers often pronounce it /əˌmɔː.taɪˈzeɪ.ʃən/ with an /aɪ/ diphthong, which can surprise test-takers accustomed to General American."
        },
        "etymology": {
            "origin": "Middle English 'amortisen', borrowed from Anglo-Norman and Old French 'amortir' / 'amortiss-' (to deaden, extinguish, alienate in mortmain), from Vulgar Latin '*admortire' (to kill off, deaden).",
            "rootWord": "Vulgar Latin *admortire, from Latin ad- ('to, toward') + mors / mortis ('death')",
            "rootMeaning": "'To bring to death; to extinguish or deaden a debt or capital expenditure over time until it is reduced to zero'",
            "evolution": "In 13th-century English feudal law (Statute of Mortmain, 1279), 'amortization' denoted the alienation of land or tenements into mortmain ('dead hand' of the Church or an immortal corporation, thereby extinguishing feudal dues to the Crown). In 18th-century public finance, European treasuries adapted the term to describe sinking funds established for the systematic extinction of sovereign debts. In 20th-century corporate accounting under GAAP and IFRS, amortization was formalized alongside depreciation to denote the gradual expensing of intangible capital assets over their estimated economic useful lives, and in commercial banking, to represent the phased repayment of loan principal through scheduled installments.",
            "relatedLanguages": [
                "French: amortissement (amortization, depreciation, debt repayment)",
                "Spanish: amortización (amortization, debt payoff, write-off)",
                "Italian: ammortamento (amortization, depreciation)",
                "German: Amortisation (amortization, payback) / Abschreibung (depreciation, write-down)"
            ],
            "firstRecordedUse": "14th century (c. 1387 in Middle English legal rolls concerning land alienation; 18th century in public debt repayment)"
        },
        "deepMeaning": {
            "coreConcept": "The systematic, gradual expensing of the acquisition cost of an intangible asset (such as patents, copyrights, trademarks, software licenses, or goodwill) over its projected useful economic life; also, the scheduled repayment of a loan or debt liability in regular installments comprising both principal and interest until fully retired.",
            "spatialContext": "Corporate balance sheets (accumulated amortization deducted under intangible non-current assets), income statements under operating expenses (within Depreciation and Amortization / EBITDA), debt financing schedules, and commercial banking loan amortization calculators.",
            "temporalContext": "Calculated monthly or quarterly during financial closing periods; reflected annually on income statements and corporate 10-K filings; spread over loan durations typically spanning 5 to 30 years.",
            "emotionalTone": "Analytical, rigorous, objective, and financially prudent.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Native financial professionals and accountants immediately distinguish amortization into two distinct operational contexts: intangible asset expensing and debt liquidation. When looking at corporate income statements, natives view amortization as a non-cash expense—an accounting mechanism that spreads the high upfront price tag of intellectual property or proprietary software over the years it actually generates revenue (matching principle), which is why EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) is a universal metric used to gauge core cash-generation capability. In lending and real estate, native speakers immediately picture an 'amortization schedule'—a detailed table showing how each monthly payment gradually shifts from being mostly interest in the early years to mostly principal paydown near maturity.",
            "mentalImage": "A financial controller reviewing a dual-monitor setup: one screen displaying an amortization schedule for a $5 million commercial mortgage detailing principal reduction over ten years, while the other screen shows the quarterly non-cash amortization expense line for enterprise resource planning (ERP) software licenses on the operating income statement.",
            "whenToUse": "Use 'amortization' when referring to the gradual write-off of intangible capital assets (e.g., 'patent amortization', 'amortization of goodwill', 'amortization of software licenses') or the structured repayment of long-term debt liabilities (e.g., 'loan amortization schedule', 'fully amortized mortgage').",
            "whenNotToUse": "Do not use 'amortization' when writing down physical, tangible capital assets like factory equipment, computer servers, or office buildings (use 'depreciation'). Do not use it for natural resource extraction like timber or oil reserves (use 'depletion'). Do not use it for sudden, unplanned impairments where an asset's market value collapses abruptly (use 'write-down' or 'impairment charge').",
            "culturalContext": "In Anglo-American corporate accounting (GAAP and IFRS), amortization is central to modern tech and pharmaceutical companies whose greatest balance sheet values are intangible (patents, drug formulas, software codes). In the financial markets, Wall Street analysts routinely focus on EBITDA to compare operating performance across capital-intensive versus intellectual-property-heavy firms without distortion from debt structures and amortization rules. In TOEIC Part 7, amortization frequently surfaces in annual corporate summaries, executive board briefings, commercial lease discussions, and loan refinancing notices."
        },
        "examples": {
            "daily": [
                "Before signing their thirty-year home mortgage, the couple examined the amortization schedule to see how much principal they would pay off in the first five years.",
                "The auto lender provided a clear monthly amortization breakdown showing the exact division between finance charges and loan principal.",
                "Using an online loan calculator, Marcus adjusted his monthly car payments to see if he could accelerate the amortization of his auto loan."
            ],
            "business": [
                "The corporate financial statements recorded a three-million-dollar non-cash expense for the amortization of proprietary software licenses acquired during the merger.",
                "Because the acquisition of the biotechnology startup involved several valuable patents, the finance director established a fifteen-year amortization schedule for the intangible assets.",
                "Operating cash flow remained robust despite the net loss, primarily because a significant portion of operating expenses consisted of non-cash depreciation and amortization."
            ],
            "conversation": [
                "Speaker A: 'Why does our operating margin appear lower this quarter even though product sales jumped fifteen percent?'\nSpeaker B: 'We started recording the straight-line amortization of the enterprise database license we purchased last January, which added sixty thousand dollars in quarterly expenses.'",
                "Speaker A: 'Can we pay an additional five hundred dollars per month toward the principal on our commercial property loan?'\nSpeaker B: 'Certainly; extra principal payments will accelerate your loan amortization and substantially reduce total interest charges over the remaining term.'"
            ],
            "collocations": [
                "amortization schedule",
                "loan amortization",
                "straight-line amortization",
                "depreciation and amortization",
                "amortization expense",
                "accumulated amortization"
            ]
        },
        "wordFamily": {
            "noun": "amortization",
            "verb": "amortize",
            "adjective": "amortized, amortizable",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "loan amortization schedule spreadsheet financial chart debt reduction",
            "imageDescription": "A clean business workstation featuring a dual-monitor setup with a detailed loan amortization schedule displaying monthly payments of principal versus interest alongside a declining balance bar chart.",
            "mnemonic": "MORT = Death (like mortal/mortuary): Amortization is the process of putting a debt or intangible asset cost to 'death' step-by-step over time!"
        },
        "video": {
            "description": "An educational corporate finance video explaining how to construct a loan amortization table in Excel and how straight-line amortization of intangible assets affects quarterly earnings."
        },
        "toeicContext": {
            "commonParts": [
                5,
                6,
                7
            ],
            "exampleQuestion": "The finance committee agreed to spread the cost of the newly acquired enterprise software over five years through annual straight-line _____.\n(A) amortize\n(B) amortization\n(C) amortized\n(D) amortizing",
            "tips": "In TOEIC Part 5, recognizing word forms after compound adjective modifiers is crucial. Preceded by the adjective phrase 'annual straight-line', the blank requires a head noun: (B) amortization. Choice (A) is a base verb, Choice (C) is a past participle/adjective, and Choice (D) is a present participle/gerund acting as an action rather than the standard accounting head noun. In Part 7 financial reports, look out for the acronym 'D&A' (Depreciation and Amortization) listed under operating costs."
        },
        "synonyms": [
            "debt retirement",
            "liquidation",
            "systematic write-off",
            "cost allocation",
            "loan redemption",
            "phased repayment"
        ],
        "antonyms": [],
        "relatedWords": [
            "depreciation",
            "intangible asset",
            "schedule",
            "principal",
            "interest",
            "goodwill",
            "EBITDA"
        ]
    },
    {
        "id": "finance-070",
        "word": "analyst",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈæn.ə.lɪst/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/analyst--_us_1.mp3",
            "syllableBreakdown": "an-a-lyst",
            "stressPattern": "●○○",
            "commonMistakes": "Learners frequently misplace stress onto the second syllable, mistakenly saying */əˈnæl.ɪst/* by confusing it with the noun 'analysis' (/əˈnæl.ə.sɪs/) or the verb 'analyze' (/ˈæn.ə.laɪz/). Notice the stress contrast: 'AN-a-lyst' (●○○) versus 'a-NAL-y-sis' (○●○○). Another common mistake is pronouncing the final syllable '-lyst' as '-leest' (/liːst/) or '-lized' (/laɪzd/) instead of /lɪst/. In grammar questions, candidates frequently confuse the person noun 'analyst' with the abstract noun 'analysis' or the plural noun 'analyses'."
        },
        "etymology": {
            "origin": "Borrowed into English in the mid-17th century from French 'analyste', formed from Medieval Latin / Ancient Greek 'analysis' + the agent suffix '-iste' (from Latin '-ista', Greek '-ιστής').",
            "rootWord": "Ancient Greek ἀνάλυσις (análusis: 'a dissolving, unloosing, resolution of a whole into parts'), from ἀναλύειν (analýein: aná 'up, throughout' + lýein 'to loosen, unbind')",
            "rootMeaning": "'One who unlooses, unties, or dissects complex wholes into constituent components to understand their essential nature'",
            "evolution": "First recorded in English in the 1650s in philosophy and mathematics, referring to a mathematician who solves algebraic problems by resolving equations into component parts. In the 18th century, it was applied to chemistry (assaying mineral substances). With the 20th-century expansion of global stock exchanges, corporate treasuries, and computing, 'financial analyst', 'security analyst' (pioneered by Benjamin Graham and David Dodd in their 1934 landmark treatise 'Security Analysis'), and 'systems analyst' emerged as essential corporate professional designations for individuals who process complex numerical data to guide executive capital decisions.",
            "relatedLanguages": [
                "French: analyste (analyst)",
                "Spanish: analista (analyst)",
                "Italian: analista (analyst)",
                "German: Analyst (financial/market analyst) / Analytiker (scientific analyst)"
            ],
            "firstRecordedUse": "Mid-17th century (c. 1655 in mathematical and philosophical treatises)"
        },
        "deepMeaning": {
            "coreConcept": "A skilled professional specialist who systematically dissects complex financial records, market trends, operating metrics, and economic data to identify patterns, build forecasting models, evaluate investment viability, and provide actionable strategic guidance to corporate leadership, fund managers, or clients.",
            "spatialContext": "Open-plan corporate headquarters, financial planning and analysis (FP&A) departments, investment banking trading floors, equity research bullpens, conference rooms during executive earnings previews, and dual-monitor workstation desks running Excel financial models, Bloomberg Terminals, and BI dashboards.",
            "temporalContext": "Working intensely during quarterly earnings seasons, fiscal year-end budgeting cycles, weekly executive variance review meetings, and real-time market trading hours (such as 9:30 AM to 4:00 PM EST for securities analysts).",
            "emotionalTone": "Analytical, rigorous, objective, astute, and methodical.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "To a native speaker, an 'analyst' is the quintessential quantitative problem-solver of the corporate world. In corporate organizational hierarchy, an analyst is often the foundational intellectual engine—the person who actually crunches the numbers, tracks variances in spreadsheets, and builds the forecast models that directors and vice presidents present to the board. In Wall Street and financial market parlance, 'analysts' (specifically sell-side equity analysts or buy-side research analysts) are market arbiters whose earnings estimates, price targets, and 'buy/hold/sell' ratings can instantly move stock prices across global exchanges.",
            "mentalImage": "A financial analyst wearing business attire seated at a dual-monitor trading workstation, analyzing a multi-tab financial model on one screen and cross-referencing a competitor's 10-Q filing on the other while preparing a quarterly variance report for the finance director.",
            "whenToUse": "Use 'analyst' when referring to an individual professional whose primary job responsibility is evaluating data, investments, budgets, or operational systems (e.g., 'financial analyst', 'credit analyst', 'budget analyst', 'market research analyst', 'systems analyst').",
            "whenNotToUse": "Do not use 'analyst' when referring to the investigative process or written report itself (use 'analysis'). Do not use it for high-level executives whose primary duty is managing team personnel and authorizing budgets rather than building models (use 'finance manager', 'director', or 'controller').",
            "culturalContext": "In Anglo-American business culture, an entry-level 'financial analyst' position at an investment bank, consulting firm, or Fortune 500 company is one of the most competitive and prestigious career launchpads for university graduates, requiring long hours of modeling and presentation building. The Chartered Financial Analyst (CFA) designation is globally recognized as the gold standard in investment ethics and analysis. In the TOEIC exam, 'analyst' appears frequently in Part 5 word-form questions (contrasting 'analyst' vs. 'analysis' vs. 'analyze') and in Part 7 corporate memos, recruitment ads, and market research summaries."
        },
        "examples": {
            "daily": [
                "A senior market analyst appeared on the morning news show to discuss the impact of rising interest rates on consumer spending.",
                "My cousin works as an investment analyst in New York, where he spends his days assessing commercial real estate portfolios.",
                "The sports analyst accurately predicted which teams would qualify for the international tournament based on player performance metrics."
            ],
            "business": [
                "Our lead financial analyst created a discounted cash flow model to estimate the return on investment for the proposed factory expansion.",
                "Following yesterday's quarterly earnings surprise, several Wall Street equity analysts upgraded the pharmaceutical company's stock from 'Hold' to 'Buy'.",
                "The budget analyst met with department heads to investigate why travel expenditures exceeded annual projections by twelve percent."
            ],
            "conversation": [
                "Speaker A: 'Who compiled the financial projections for tomorrow's executive board presentation?'\nSpeaker B: 'Our senior financial analyst put together the three-year forecast, and the finance director has already reviewed and approved it.'",
                "Speaker A: 'Did you hear that an influential credit analyst downgraded the sovereign debt of several emerging markets?'\nSpeaker B: 'Yes, which is why our treasury team is reallocating corporate cash reserves into shorter-term government securities.'"
            ],
            "collocations": [
                "financial analyst",
                "market analyst",
                "credit analyst",
                "budget analyst",
                "senior analyst",
                "industry analyst"
            ]
        },
        "wordFamily": {
            "noun": "analyst, analysts, analysis, analyses",
            "verb": "analyze",
            "adjective": "analytical, analytic",
            "adverb": "analytically"
        },
        "visual": {
            "imageKeyword": "financial analyst working dual monitor computer spreadsheet finance office",
            "imageDescription": "A professional financial analyst sitting at an office desk with two large monitors displaying financial charts, stock trend graphs, and data spreadsheets while taking notes with a pen.",
            "mnemonic": "ANALYST = ANALYsis + specialiST: The specialist who conducts the financial analysis!"
        },
        "video": {
            "description": "A day-in-the-life documentary following a corporate financial analyst detailing how they conduct financial modeling, forecast revenue, and present variance reports to executive management."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                6,
                7
            ],
            "exampleQuestion": "The chief investment officer praised the lead financial _____ for correctly anticipating the sudden surge in tech sector valuations.\n(A) analyst\n(B) analysis\n(C) analyze\n(D) analytically",
            "tips": "TOEIC Part 5 tests the classic person noun vs. abstract noun trap ('analyst' vs. 'analysis'). Preceded by the title 'lead financial' and followed by a human pronoun/clause referring to who did the action ('for correctly anticipating'), the blank must be a person noun: (A) analyst. Choice (B) 'analysis' is the abstract report/process, Choice (C) 'analyze' is a verb, and Choice (D) 'analytically' is an adverb. Always check whether the context requires the human professional or the report."
        },
        "synonyms": [
            "evaluator",
            "researcher",
            "specialist",
            "assessor",
            "examiner",
            "forecaster"
        ],
        "antonyms": [],
        "relatedWords": [
            "analysis",
            "forecasting",
            "financial modeling",
            "equity research",
            "due diligence",
            "valuation",
            "portfolio"
        ]
    }
]

with open("scratch/finance_068_070.json", "w", encoding="utf-8") as f:
    json.dump({"words": words_data}, f, indent=2, ensure_ascii=False)

print("Saved scratch/finance_068_070.json successfully!")
