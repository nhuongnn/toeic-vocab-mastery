import json

words = [
    {
        "id": "finance-142",
        "word": "evaluation",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ɪˌvæl.juˈeɪ.ʃən/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/evaluation--_us_1.mp3",
            "syllableBreakdown": "e·val·u·a·tion",
            "stressPattern": "○ˌ●○●○",
            "commonMistakes": "Learners often misplace the primary stress on the second syllable (*e-VAL-u-a-tion*) instead of the fourth syllable (*e-val-u-A-tion* /ɪˌvæl.juˈeɪ.ʃən/). Another frequent mistake is omitting the /j/ glide in the third syllable, pronouncing it as */ɪˌvæl.uˈeɪ.ʃən/* instead of /ju/, or slurring the penultimate diphthong /eɪ/ into a flat monophthong /e/. In business communication, non-native speakers also frequently confuse 'evaluation' (systematic appraisal of worth, operational efficiency, or performance against benchmarks) with 'valuation' (the specific mathematical computation of monetary dollar worth for an asset, company, or security)."
        },
        "etymology": {
            "origin": "Middle French 'évaluation' (action of estimating value), noun of action formed from the verb 'évaluer', which derived from Old French 'esvaloir' ('to value, estimate'), compounded from Latin prefix 'ex-' ('out, thoroughly') + 'valere' ('to be strong, be worthy, have value').",
            "rootWord": "Latin prefix ex- (out, thoroughly) + valere (to be strong, be of worth)",
            "rootMeaning": "'To draw out the true worth' or 'determine the intrinsic strength or monetary value of something'",
            "evolution": "Originating in medieval French fiscal administration where tax assessors and guild magistrates evaluated ('évalué') trade duties and commercial property, the noun 'évaluation' entered the English lexicon in the late 18th century (around 1793) as an analytical term during the Scottish Enlightenment and the rise of political economy. By the early 20th century, its purview expanded from basic financial appraisal and balance-sheet asset assessment to systematic project analysis, investment appraisal, and performance appraisal across modern corporate governance.",
            "relatedLanguages": [
                "French: évaluation (assessment, appraisal, estimate)",
                "Spanish: evaluación (evaluation, assessment, testing)",
                "Italian: valutazione (valuation, appraisal, assessment)",
                "German: Evaluation / Evaluierung (formal assessment, project evaluation)",
                "Portuguese: avaliação (assessment, valuation)"
            ],
            "firstRecordedUse": "Late 18th century (c. 1793, in economic treatises concerning asset appraisal and trade duties)"
        },
        "deepMeaning": {
            "coreConcept": "The systematic, rigorous assessment or appraisal of the value, viability, performance, financial health, or return on investment of a project, asset, security, proposal, or employee based on predefined benchmarks, metrics, or financial models.",
            "spatialContext": "Corporate boardroom presentations, private equity investment committee meetings, corporate credit analysis cubicles, financial due diligence data rooms, and performance review conference rooms.",
            "temporalContext": "Annual fiscal performance reviews, post-merger integration milestones, quarterly capital expenditure assessments, and pre-deal due diligence windows prior to funding approvals.",
            "emotionalTone": "Objective, analytical, rigorous, critical, and discerning.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "culturalContext": "A standard corporate accountability mechanism across US and international enterprises. Institutional lenders and corporate boards mandate independent evaluations before approving major capital expenditures. High-frequency keyword on the TOEIC exam in Part 5 (noun vs verb/adjective derivatives) and Part 7 (performance evaluations, vendor selection memos, project review reports).",
            "howNativesThink": "To native English business speakers, 'evaluation' represents a structured, evidence-based judgment process rather than an off-the-cuff opinion. In corporate finance and investment, an evaluation asks: 'Did this initiative deliver its projected ROI?' or 'Does the business model justify our capital allocation?' While closely related to 'assessment' and 'appraisal', natives use 'evaluation' when looking backward or holistically at performance, outcome metrics, and operational efficiency against established KPIs. Importantly, in Wall Street and M&A contexts, natives distinguish 'financial evaluation' (judging an overall deal's strategic and financial merit) from 'valuation' (calculating the precise dollar figure a business or stock is worth).",
            "mentalImage": "A senior financial analyst sitting beside an open spreadsheet on dual monitors, comparing a five-year discounted cash flow model against actual capital expenditures, with a red pen noting variance percentages on an executive summary report.",
            "whenNotToUse": "Do not confuse with 'valuation' when the specific task is calculating an asset's or company's price in exact monetary currency (say 'company valuation is $2 billion', not 'company evaluation is $2 billion'). Avoid using it as a synonym for casual personal opinions or unverified guesses.",
            "whenToUse": "Use when referring to systematic appraisals of projects, bids, vendor proposals, employee performance, financial investments, or risk profiles (e.g., 'preliminary evaluation of the acquisition target', 'comprehensive financial evaluation', 'post-project evaluation report', 'vendor bid evaluation')."
        },
        "examples": {
            "daily": [
                "After careful evaluation of the tenant's credit score and employment history, the landlord approved the lease agreement.",
                "The car mechanic provided a comprehensive evaluation of the transmission before estimating the repair costs.",
                "Our family completed a thorough evaluation of different mortgage lenders before deciding on a thirty-year fixed loan."
            ],
            "business": [
                "The chief financial officer presented an objective evaluation of the prospective joint venture during yesterday's board meeting.",
                "The procurement committee completed its technical and financial evaluation of all five vendor proposals submitted for the enterprise software contract.",
                "Following an annual portfolio evaluation, the investment committee decided to rebalance thirty percent of the pension fund into fixed-income securities."
            ],
            "conversation": [
                "\"Has the risk management division finalized their evaluation of the overseas plant expansion?\" / \"Yes, their evaluation concluded that fluctuating currency exchange rates pose a significant hazard to operating margins.\"",
                "\"When will the executive board review our capital expenditure evaluation?\" / \"They scheduled the presentation for next Thursday, right after the quarterly revenue audit.\"",
                "\"Did the independent auditors agree with management's evaluation of the goodwill impairment?\" / \"They concurred with the underlying assumptions, but recommended revising the terminal growth rate downward.\""
            ],
            "collocations": [
                "comprehensive evaluation",
                "financial evaluation",
                "preliminary evaluation",
                "performance evaluation",
                "rigorous evaluation",
                "conduct an evaluation"
            ]
        },
        "wordFamily": {
            "noun": "evaluation, evaluator",
            "verb": "evaluate",
            "adjective": "evaluative, evaluable",
            "adverb": "evaluatively"
        },
        "visual": {
            "imageKeyword": "financial evaluation investment committee review spreadsheet analytics boardroom",
            "imageDescription": "A corporate financial analyst reviewing a comprehensive evaluation report on a tablet, with detailed bar charts, ROI metrics, and financial risk scorecards visible on an office desk.",
            "mnemonic": "E-VALUE-ATION: Focus on the root VALUE in the middle. You are systematically drawing out and testing the VALUE of an investment or plan!"
        },
        "video": {
            "description": "A corporate finance case study explaining how private equity firms conduct thorough financial and operational evaluations of acquisition targets before submitting formal buyout bids."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                6,
                7
            ],
            "exampleQuestion": "Following a rigorous _____ of all submitted bids, the municipal transit authority awarded the light rail modernization contract to Siemens Mobility.\n(A) evaluate\n(B) evaluated\n(C) evaluation\n(D) evaluator",
            "tips": "In TOEIC Part 5, determine the part of speech required following the preposition 'following' and indefinite article + adjective 'a rigorous'. The blank must be filled by a singular abstract noun: (C) 'evaluation' (the assessment process). Choice (A) 'evaluate' is a verb; choice (B) 'evaluated' is a past participle; and choice (D) 'evaluator' is a person noun (the individual conducting the test), which is illogical here since one does not conduct an appraisal 'of all submitted bids' by being a person. Collocations like 'conduct an evaluation' and 'performance evaluation' are high-frequency targets in Part 7 memos."
        },
        "synonyms": [
            "assessment",
            "appraisal",
            "analysis",
            "review",
            "scrutiny",
            "audit"
        ],
        "antonyms": [
            "guess",
            "conjecture",
            "speculation",
            "neglect",
            "dismissal"
        ],
        "relatedWords": [
            "valuation",
            "benchmark",
            "feasibility study",
            "due diligence",
            "metric",
            "cost-benefit analysis",
            "scorecard"
        ]
    },
    {
        "id": "finance-143",
        "word": "expense",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ɪkˈspɛns/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/expense--_us_1.mp3",
            "syllableBreakdown": "ex·pense",
            "stressPattern": "○●",
            "commonMistakes": "Learners often mispronounce the first unstressed syllable /ɪk/ as /ɛk/ with excessive force (*EK-spens* instead of /ɪkˈspɛns/), or mistakenly voice the final consonant cluster to /z/ (*ex-penz* instead of voiceless /s/). In accounting writing and speaking, non-native speakers also frequently confuse 'expense' (an expired operational cost incurred to generate revenue on the income statement) with 'expenditure' (any total outflow of cash to acquire an asset, whether capitalized or expensed) and 'cost' (the cash given up to acquire any resource)."
        },
        "etymology": {
            "origin": "Middle English 'expense', borrowed from Anglo-French and Old French 'despense' / 'espense' (outlay, spending, money disbursed), directly from Late Latin 'expensa' (outlay of money, costs), the neuter plural of 'expensus', the past participle of classical Latin 'expendere' ('to weigh out money, disburse, pay'), formed from 'ex-' ('out') + 'pendere' ('to hang down, weigh on a balance scale').",
            "rootWord": "Latin ex- (out) + pendere (to weigh, measure on a scale)",
            "rootMeaning": "'To weigh out money from the treasury balance' — reflecting ancient Roman commerce where metal currency was physically weighed rather than simply counted",
            "evolution": "In ancient Rome, unminted bullion or coin (*aes*) was weighed out (*expendere*) on a balance scale by a designated magistrate (*libripens*) when discharging public debts. Through Late Latin *expensa* and Norman French administrative record-keeping, the term entered Middle English by the late 14th century to denote monetary disbursements by royal and monastic households. With the advent of double-entry bookkeeping in Renaissance Venice and Victorian corporate accounting, 'expense' acquired its modern technical definition: an operational outflow or liability consumption that offsets current revenue during a specific accounting period.",
            "relatedLanguages": [
                "French: dépense (spending, expense, outlay)",
                "Spanish: expensa / gasto (expense, disbursement, upkeep cost)",
                "Italian: spesa (expense, outlay, shopping)",
                "Portuguese: despesa (expense, expenditure)",
                "German: Spesen (pl., business travel expenses, minor commercial charges)"
            ],
            "firstRecordedUse": "Late 14th century (c. 1380, in Middle English fiscal accounts of royal exchequers)"
        },
        "deepMeaning": {
            "coreConcept": "The operational cost or cash outflow incurred by an individual or business entity in the process of generating revenue, maintaining operations, or acquiring consumables; in financial accounting, a recognized reduction in equity or assets resulting from ordinary business operations during a specific accounting period.",
            "spatialContext": "Corporate income statements (P&L ledgers), accounts payable departments, corporate travel and entertainment (T&E) reporting portals (like Concur or Expensify), tax returns, and personal monthly bank statements.",
            "temporalContext": "Monthly accounting closes, quarterly earnings announcements, end-of-year tax filing cycles, and weekly corporate reimbursement submission deadlines.",
            "emotionalTone": "Prudent, cautionary, fiscal, restrictive, and vigilant.",
            "formalityLevel": "neutral",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "culturalContext": "Corporate expense policies ('T&E guidelines') are deeply embedded in Anglo-American business culture, governing allowable per diems, client entertainment limits, and compliance with IRS tax deduction laws. On the TOEIC exam, 'expense' is ubiquitous: Part 3 conversations about travel reimbursement, Part 4 talks about budget cuts, Part 5 grammar questions (distinguishing 'expense' from 'expensive' / 'expensively'), and Part 7 expense voucher forms, itemized receipts, and quarterly financial reports.",
            "howNativesThink": "To native English speakers, 'expense' evokes two dominant everyday workplace realities: (1) corporate overhead and operational costs that erode profit margins ('we must cut expenses to remain profitable'), and (2) employee business spending that requires itemized reimbursement via an 'expense report' ('put lunch on your corporate card and submit an expense report'). Native financial officers strictly distinguish between an 'expense' (an immediate charge against earnings, like rent, utilities, or travel) and a 'capital expenditure' (CapEx, an investment in long-term equipment that sits on the balance sheet as an asset and depreciates over time). Idiomatically, natives frequently use 'at the expense of' to denote a sacrifice or tradeoff.",
            "mentalImage": "A sales director laying paper receipts for client dinners, airport taxis, and hotel lodging onto a conference table while attaching digital scanned copies to an online corporate expense report spreadsheet.",
            "whenNotToUse": "Do not confuse 'expense' with 'capital expenditure' (money spent on fixed long-term physical assets). Do not use 'expense' as a countable plural when referring to abstract monetary expenditure in general where 'cost' or 'spending' is idiomatic, although 'expenses' (plural) is standard for business travel outlays or miscellaneous overhead.",
            "whenToUse": "Use when referring to business operating costs (e.g., 'operating expense', 'capital expense vs operating expense', 'tax-deductible expense'), employee travel and entertainment outlays (e.g., 'submit an expense claim', 'expense account'), or financial outflows on an income statement."
        },
        "examples": {
            "daily": [
                "Keeping track of daily utility bills and groceries helps our family minimize unnecessary household expense.",
                "The airline agreed to cover hotel lodging and meal expenses after our connecting flight was canceled due to mechanical issues.",
                "He saved every parking ticket and toll receipt to claim the travel expense on his personal income tax return."
            ],
            "business": [
                "The controller urged department heads to curtail non-essential travel expense to meet end-of-year margin targets.",
                "All corporate credit card charges must be accompanied by itemized receipts and submitted on an expense report within thirty days.",
                "Operating expenses for the research and development division increased by eight percent due to accelerated clinical testing."
            ],
            "conversation": [
                "\"Did the accounts payable department approve your expense report for the Chicago sales conference?\" / \"Not yet; they requested an itemized receipt for the client dinner on Tuesday before issuing the reimbursement check.\"",
                "\"Why did our net income drop even though overall quarterly revenue rose by ten percent?\" / \"A sharp rise in freight expense and warehouse utility costs wiped out the gross margin gains.\"",
                "\"Can I bill client entertainment directly to my corporate expense account?\" / \"Yes, provided that the total expenditure remains within the twenty-five dollar per-person limit set by company policy.\""
            ],
            "collocations": [
                "operating expense",
                "travel expense",
                "expense report",
                "curtail expenses",
                "at the expense of",
                "itemized expense"
            ]
        },
        "wordFamily": {
            "noun": "expense, expensiveness, expenditure",
            "verb": "expense",
            "adjective": "expensive, inexpensive",
            "adverb": "expensively, inexpensively"
        },
        "visual": {
            "imageKeyword": "corporate expense report receipts calculator credit card finance spreadsheet",
            "imageDescription": "An organized corporate desk featuring a digital tablet displaying an approved expense reimbursement report, alongside itemized restaurant and hotel receipts, a calculator, and a corporate credit card.",
            "mnemonic": "EX-PENSE: EX (out) + PENSE (weigh / pay money). Money that is weighed OUT of your wallet or company treasury!"
        },
        "video": {
            "description": "An accounting tutorial explaining the fundamental difference between operating expenses (OpEx) on the income statement and capital expenditures (CapEx) on the balance sheet."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                6,
                7
            ],
            "exampleQuestion": "Employees traveling on official company business are required to submit an itemized _____ report with original receipts within fourteen business days of their return.\n(A) expensively\n(B) expense\n(C) expensive\n(D) expending",
            "tips": "In TOEIC Part 5, test-takers often encounter compound noun structures where a noun modifies another noun. In the noun phrase 'an itemized _____ report', the blank functions as a noun adjunct specifying the type of report: (B) 'expense' (creating the established business compound 'expense report'). Choice (A) 'expensively' is an adverb and cannot modify a noun; choice (C) 'expensive' is an adjective meaning high-priced (which would illogically describe the report itself as costly); and choice (D) 'expending' is a participle. Additionally, watch out for the idiomatic prepositional phrase 'at the expense of' in Part 7 reading passages."
        },
        "synonyms": [
            "outlay",
            "expenditure",
            "cost",
            "disbursement",
            "overhead",
            "charge"
        ],
        "antonyms": [
            "income",
            "revenue",
            "profit",
            "gain",
            "earnings"
        ],
        "relatedWords": [
            "operating cost",
            "reimbursement",
            "receipt",
            "accounts payable",
            "deduction",
            "overhead",
            "per diem"
        ]
    },
    {
        "id": "finance-144",
        "word": "exposure",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ɪkˈspoʊ.ʒɚ/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/exposure--_us_1.mp3",
            "syllableBreakdown": "ex·po·sure",
            "stressPattern": "○●○",
            "commonMistakes": "Learners frequently mispronounce the final syllable /ʒɚ/, substituting an unvoiced /ʃ/ sound (sounding like *ex-po-shure*) or an affricate /dʒ/ (*ex-po-jure*). Another common mistake is placing equal stress on all syllables instead of cleanly stressing the second syllable /spoʊ/. In business usage, learners often confuse financial 'exposure' (the quantified vulnerability or total capital at risk to a specific market hazard, borrower default, or currency fluctuation) with public relations 'exposure' (brand publicity and media visibility)."
        },
        "etymology": {
            "origin": "Formed in Middle English / Early Modern English from the verb 'expose' + nominal suffix '-ure' (denoting action, process, or condition), modeled on Old French 'exposicion' / 'esposure', derived from Latin 'exponere' ('to put out, set forth, exhibit, lay open to danger'), from 'ex-' ('out') + 'ponere' ('to put, place').",
            "rootWord": "Latin ex- (out) + ponere (to put, set, place)",
            "rootMeaning": "'To place outside' or 'leave uncovered and vulnerable to external elements or hazards'",
            "evolution": "Originally used in classical antiquity and the Middle Ages for physically placing an infant or object out in the open, unprotected from weather or predators (*expositio*). By the 16th and 17th centuries, 'exposure' entered English to signify being subjected to cold, disease, or public revelation of a secret. In 19th-century photography, it gained the specialized meaning of subjecting sensitized film to light. During the mid-20th century, with the mathematical formalization of modern portfolio theory, insurance underwriting, and foreign exchange trading, 'exposure' became a cornerstone financial term denoting the total monetary capital at risk to an adverse market movement, default, or currency fluctuation.",
            "relatedLanguages": [
                "French: exposition (exposure to risk / exhibition / photography)",
                "Spanish: exposición (exposure to risk / display / exhibition)",
                "Italian: esposizione (exposure to risk / exhibition)",
                "Portuguese: exposição (exposure / display)",
                "German: Exposition / Risikoengagement (financial exposure, risk position)"
            ],
            "firstRecordedUse": "Early 17th century (c. 1605, in William Shakespeare's 'Troilus and Cressida'; financial risk sense formalized mid-20th century)"
        },
        "deepMeaning": {
            "coreConcept": "The state of being subject to, or unprotected from, a specific financial hazard, market risk, or commercial loss; specifically, the total dollar amount, proportion of assets, or liability open to loss from fluctuations in interest rates, currency exchange rates, commodity prices, or counterparty default.",
            "spatialContext": "Institutional trading floors, commercial bank credit risk committee meetings, treasury department currency hedging desks, asset management risk dashboards (Bloomberg/Refinitiv terminals), and insurance actuarial bureaus.",
            "temporalContext": "Continuous real-time portfolio monitoring, daily Value-at-Risk (VaR) recalculations, quarterly financial disclosures (Form 10-Q), and stress-testing periods during market volatility.",
            "emotionalTone": "Vulnerable, cautious, analytical, vigilant, and defensive.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "culturalContext": "Following the 2008 global financial crisis and subsequent banking regulations (Basel III / Dodd-Frank), monitoring credit and liquidity exposure became mandatory across commercial banking. On the TOEIC exam, 'exposure' appears frequently in Part 7 annual reports and financial press releases (discussing international market risks or brand awareness campaigns), as well as Part 5 grammar questions testing noun selection.",
            "howNativesThink": "To native financial professionals, 'exposure' is all about risk quantification and vulnerability: 'What is our exposure to European sovereign debt?' or 'How much currency exposure do we carry on Yen-denominated receivables?' Natives mentally picture money standing defenseless in a storm. They immediately think of risk mitigation strategies like hedging, diversification, or setting strict credit limits. Conversely, in marketing and public relations, 'exposure' carries a completely positive connotation, meaning media coverage, audience reach, and public prominence. Native speakers instinctively know which sense applies based on whether the context is balance sheet risk management or brand advertising.",
            "mentalImage": "A risk officer examining a heat map on a wall-sized monitor inside an investment bank, highlighting red zones showing excessive counterparty exposure to commercial real estate loans.",
            "whenNotToUse": "Do not confuse with 'disclosure' (the act of revealing non-public information or filing regulatory reports) or 'liability' (a legally enforceable financial debt or obligation). Exposure measures the potential vulnerability to loss, not the guaranteed debt itself.",
            "whenToUse": "Use when quantifying financial risk vulnerability (e.g., 'foreign exchange exposure', 'credit exposure', 'limit our risk exposure', 'interest rate exposure'), media/marketing visibility (e.g., 'brand exposure', 'media exposure'), or environmental/hazard vulnerability (e.g., 'exposure to toxic chemicals')."
        },
        "examples": {
            "daily": [
                "Wearing high-SPF sunscreen protects your skin against long-term exposure to harmful ultraviolet rays.",
                "The young entrepreneur gained valuable media exposure after appearing on a national morning television talk show.",
                "Homeowners who leave water pipes uninsulated during freezing weather risk severe exposure to burst pipe damage."
            ],
            "business": [
                "To mitigate foreign exchange exposure, the multinational corporation entered into forward contracts for its euro-denominated receivables.",
                "The commercial bank tightened lending criteria to decrease its overall credit exposure to commercial real estate developers.",
                "Sponsoring the international technology summit provided our brand with widespread exposure among enterprise software buyers."
            ],
            "conversation": [
                "\"Are you concerned about our portfolio's exposure to volatile crude oil prices?\" / \"Yes, which is why the risk committee recommended purchasing commodity futures to hedge our downside.\"",
                "\"How did the sudden devaluation of the Argentine peso affect our regional subsidiary?\" / \"Fortunately, our treasury desk had hedged ninety percent of our local currency exposure last quarter.\"",
                "\"Will purchasing advertising space at the airport terminal give us sufficient corporate exposure?\" / \"It will expose our brand to over two million international business travelers each month.\""
            ],
            "collocations": [
                "limit exposure",
                "credit exposure",
                "currency exposure",
                "risk exposure",
                "gain exposure",
                "hedge against exposure"
            ]
        },
        "wordFamily": {
            "noun": "exposure",
            "verb": "expose",
            "adjective": "exposed, expository",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "financial risk exposure trading desk analytics heat map hedge corporate finance",
            "imageDescription": "A risk management executive analyzing a visual risk dashboard showing portfolio exposure across global currencies, with pie charts and bar graphs highlighting hedging allocations.",
            "mnemonic": "EX-POSURE: EX (out) + POSE (place/stand). Your capital is PLACED OUT in the open without an umbrella!"
        },
        "video": {
            "description": "A treasury risk management video tutorial demonstrating how multinational corporations measure and hedge foreign exchange and interest rate exposure using derivative contracts."
        },
        "toeicContext": {
            "commonParts": [
                4,
                5,
                6,
                7
            ],
            "exampleQuestion": "By purchasing forward foreign exchange contracts, the manufacturing firm successfully reduced its financial _____ to currency fluctuations.\n(A) expose\n(B) exposed\n(C) exposure\n(D) exposing",
            "tips": "In TOEIC Part 5, identify the part of speech required following the compound adjective 'financial' and before the prepositional phrase 'to currency fluctuations'. The blank requires a noun: (C) 'exposure' (the state of being vulnerable to financial risk). Choice (A) 'expose' is a base verb; choice (B) 'exposed' is a past tense verb or past participle; and choice (D) 'exposing' is a present participle or gerund. Remember the common collocation 'reduce/limit financial exposure to' often tested in Part 6 and Part 7 corporate financial reviews."
        },
        "synonyms": [
            "vulnerability",
            "risk",
            "liability",
            "susceptibility",
            "peril",
            "openness"
        ],
        "antonyms": [
            "protection",
            "insulation",
            "shielding",
            "coverage",
            "immunity",
            "hedging"
        ],
        "relatedWords": [
            "hedging",
            "credit risk",
            "derivative",
            "volatility",
            "counterparty",
            "Value at Risk",
            "sensitivity analysis"
        ]
    }
]

output_payload = {"words": words}

with open("scratch/finance_142_144.json", "w", encoding="utf-8") as f:
    json.dump(output_payload, f, indent=2, ensure_ascii=False)

print("Saved scratch/finance_142_144.json successfully.")

# Run strict validations
required_word_keys = [
    "id", "word", "partOfSpeech", "category", "level", "toeicFrequency",
    "pronunciation", "etymology", "deepMeaning", "nativeMindset",
    "examples", "wordFamily", "visual", "video", "toeicContext",
    "synonyms", "antonyms", "relatedWords"
]

pronunciation_req = ["ipa", "syllableBreakdown", "stressPattern", "commonMistakes"]
etymology_req = ["origin", "rootWord", "rootMeaning", "evolution", "relatedLanguages", "firstRecordedUse"]
deepMeaning_req = ["coreConcept", "spatialContext", "temporalContext", "emotionalTone", "formalityLevel", "connotation"]
nativeMindset_req = ["howNativesThink", "mentalImage", "whenToUse", "whenNotToUse", "culturalContext"]
examples_req = ["daily", "business", "conversation", "collocations"]
visual_req = ["imageKeyword", "imageDescription", "mnemonic"]
video_req = ["description"]
toeicContext_req = ["commonParts", "exampleQuestion", "tips"]

for w in words:
    for k in required_word_keys:
        assert k in w, f"Missing key {k} in word {w['word']}"
    for k in pronunciation_req:
        assert k in w["pronunciation"], f"Missing pronunciation key {k} in {w['word']}"
    for k in etymology_req:
        assert k in w["etymology"], f"Missing etymology key {k} in {w['word']}"
    for k in deepMeaning_req:
        assert k in w["deepMeaning"], f"Missing deepMeaning key {k} in {w['word']}"
    for k in nativeMindset_req:
        assert k in w["nativeMindset"], f"Missing nativeMindset key {k} in {w['word']}"
    for k in examples_req:
        assert k in w["examples"], f"Missing examples key {k} in {w['word']}"
    for k in visual_req:
        assert k in w["visual"], f"Missing visual key {k} in {w['word']}"
    for k in video_req:
        assert k in w["video"], f"Missing video key {k} in {w['word']}"
    for k in toeicContext_req:
        assert k in w["toeicContext"], f"Missing toeicContext key {k} in {w['word']}"
    assert w["deepMeaning"]["formalityLevel"] in ["formal", "neutral", "informal"]
    assert w["deepMeaning"]["connotation"] in ["positive", "neutral", "negative"]
    assert w["level"] in ["essential", "intermediate", "advanced"]
    assert len(w["examples"]["daily"]) == 3, f"Expected 3 daily examples for {w['word']}"
    assert len(w["examples"]["business"]) == 3, f"Expected 3 business examples for {w['word']}"
    assert len(w["examples"]["conversation"]) >= 2, f"Expected >= 2 conversation examples for {w['word']}"
    assert len(w["examples"]["collocations"]) >= 5, f"Expected >= 5 collocations for {w['word']}"
    assert len(w["synonyms"]) >= 4, f"Expected >= 4 synonyms for {w['word']}"
    assert len(w["relatedWords"]) >= 5, f"Expected >= 5 relatedWords for {w['word']}"

    # Check for placeholder phrases
    full_text = json.dumps(w)
    assert "factor" not in [s.lower() for s in w["synonyms"]], f"Placeholder 'factor' found in synonyms of {w['word']}"
    assert "management" not in [s.lower() for s in w["synonyms"]], f"Placeholder 'management' found in synonyms of {w['word']}"
    assert "reconciled the ledger entries" not in full_text
    assert "standard practice" not in full_text
    assert "Financial Integrity Secures Corporate Capital Growth" not in full_text
    assert "A foundational professional concept" not in full_text

print("ALL STRICT VALIDATIONS PASSED CLEANLY!")
