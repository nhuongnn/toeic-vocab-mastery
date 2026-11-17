import json
import os

words_data = [
    {
        "id": "finance-065",
        "word": "actuary",
        "partOfSpeech": ["noun"],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈæk.tʃu.er.i/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/actuary--_us_1.mp3",
            "syllableBreakdown": "ac·tu·ar·y",
            "stressPattern": "First syllable stress: /ˈæk.tʃu.er.i/ (AK-choo-air-ee)",
            "commonMistakes": "Learners often compress this word into three syllables ('ak-chree') or erroneously shift stress to the second syllable ('ak-TOO-uh-ree'). Pronounce all four syllables distinctly, stressing the first syllable 'AK'."
        },
        "etymology": {
            "origin": "Latin",
            "rootWord": "actuarius (from actum: deed, public decree, register)",
            "rootMeaning": "actum (record, public deed); actuarius (a keeper of public records, shorthand scribe, accountant)",
            "evolution": "In ancient Rome, an 'actuarius' was an official shorthand clerk who recorded Senate proceedings and financial accounts. In 1762, the Equitable Life Assurance Society in London appointed an 'Actuary' as its chief administrative officer. Under mathematician Edward Rowe Mores, the position evolved from clerical record-keeping into applying mathematical probability and mortality tables to calculate life insurance premiums and annuities, establishing the modern mathematical profession.",
            "relatedLanguages": [
                "Latin: actuarius",
                "French: actuaire",
                "Spanish: actuario",
                "Italian: attuario",
                "German: Aktuar"
            ],
            "firstRecordedUse": "Mid-16th century (in clerical sense); 1762 (modern mathematical/insurance sense)"
        },
        "deepMeaning": {
            "coreConcept": "A certified business mathematician who utilizes probability theory, statistics, and demographic models to evaluate financial risks and ensure the long-term solvency of insurance policies, pensions, and annuity funds.",
            "spatialContext": "Insurance underwriting headquarters, actuarial consulting firms, pension supervisory offices, catastrophe modeling laboratories, and regulatory oversight agencies.",
            "temporalContext": "Quarterly reserve evaluations, annual pension solvency valuations, policy repricing cycles, and multi-decade demographic liability forecasting.",
            "emotionalTone": "Analytical, rigorous, prudent, and mathematically objective.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Native speakers associate 'actuary' with elite quantitative rigor and grueling multi-year credentialing exams. Unlike accountants who record past financial performance, actuaries model the probabilistic future—evaluating how mortality rates, medical inflation, or extreme weather events will impact a fund's cash reserves thirty or forty years ahead.",
            "mentalImage": "A risk specialist seated in a glass-walled corporate office before multiple monitors displaying Monte Carlo simulations, mortality curves, and pension asset-liability models.",
            "whenToUse": "Use when referencing accredited professionals who calculate financial risk, price insurance policies, analyze longevity trends, evaluate employee benefit solvency, or model catastrophe reserves.",
            "whenNotToUse": "Do not confuse with an accountant (who tallies historical revenues and debits), an auditor (who verifies financial compliance), an underwriter (who evaluates individual risk applications), or a broker (who sells insurance products).",
            "culturalContext": "Consistently recognized across the UK and North America as one of the most intellectually prestigious, well-compensated, and stable white-collar professions. In financial governance, certified actuaries bear legal statutory responsibility to sign off on insurance reserves and corporate pension solvency."
        },
        "examples": {
            "daily": [
                "Before selecting an annuity option for retirement, my uncle consulted an actuary to model his projected benefits over a thirty-year horizon.",
                "She spent seven years working full-time while studying for the rigorous professional examinations required to become a certified fellow actuary.",
                "The personal finance podcast invited a consulting actuary to explain how rising average life expectancies influence retirement planning."
            ],
            "business": [
                "The chief actuary reported to the board of directors that a twelve percent increase in claims reserves was necessary following record storm damages.",
                "Prior to launching the hybrid term-life policy, the insurance firm submitted the risk modeling equations to an independent actuary for validation.",
                "According to the actuary's annual valuation, the company's defined-benefit pension plan holds sufficient capital assets to meet its future obligations through 2050."
            ],
            "conversation": [
                "\"Why has the underwriting committee postponed the rollout of our coastal flood insurance packages?\" — \"The chief actuary requested two additional weeks to incorporate the latest storm surge simulations into the pricing tables.\"",
                "\"Does human resources calculate the projected pension fund obligations internally?\" — \"No, corporate governance guidelines mandate that we contract an external consulting actuary to conduct an independent annual audit.\""
            ],
            "collocations": [
                "chief actuary",
                "consulting actuary",
                "actuary's valuation report",
                "certified actuary",
                "pension actuary",
                "independent actuary"
            ]
        },
        "wordFamily": {
            "noun": "actuary, actuarial science",
            "verb": "",
            "adjective": "actuarial",
            "adverb": "actuarially"
        },
        "visual": {
            "imageKeyword": "actuary analyzing risk models insurance charts spreadsheet",
            "imageDescription": "A professional actuary in corporate attire examining demographic life tables and stochastic probability charts across dual high-resolution displays to compute insurance reserve requirements.",
            "mnemonic": "ACT-U-AR-Y: The mathematician who calculates the EXACT numbers before the insurer signs the ACT!"
        },
        "video": {
            "description": "An educational video explaining the actuarial profession, illustrating how mathematical probability models, mortality tables, and risk simulations ensure the solvency of insurance companies and pension funds."
        },
        "toeicContext": {
            "commonParts": [5, 6, 7],
            "exampleQuestion": "To confirm that the newly established retirement fund complies with federal solvency requirements, management engaged an independent _____ to assess its future obligations. (A) actuary (B) actuarial (C) actuarially (D) actuation",
            "tips": "Following the indefinite article 'an' and descriptive adjective 'independent', the sentence structure requires a singular count noun representing a qualified professional: (A) actuary. Choice (B) is an adjective, (C) is an adverb, and (D) is an unrelated mechanical noun."
        },
        "synonyms": [
            "risk analyst",
            "underwriting mathematician",
            "pension analyst",
            "risk consultant",
            "statistical risk modeler"
        ],
        "antonyms": [],
        "relatedWords": [
            "actuarial",
            "underwriting",
            "solvency",
            "liability",
            "mortality table",
            "premium",
            "pension fund"
        ]
    },
    {
        "id": "finance-066",
        "word": "adjustment",
        "partOfSpeech": ["noun"],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/əˈdʒʌst.mənt/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/adjustment--_us_1.mp3",
            "syllableBreakdown": "ad·just·ment",
            "stressPattern": "Second syllable stress: /əˈdʒʌst.mənt/ (uh-JUST-munt)",
            "commonMistakes": "Learners sometimes pause between 'ad' and 'just' as if they were separated words (*ad-just-ment*), or distort the central short vowel /ʌ/ into /uː/ (*ad-joost-ment*). Pronounce the first syllable as an unstressed schwa /ə/ and blend smoothly into the stressed syllable 'JUST'."
        },
        "etymology": {
            "origin": "Old French / Latin",
            "rootWord": "ajuster (from Latin: ad- + juxta: near, close to)",
            "rootMeaning": "ad- (to, toward) + juxta (near, beside, in proper position); ajuster (to bring to a standard, balance, or make level)",
            "evolution": "Originated from Old French 'ajuster' (to regulate, set in order, align with a standard), derived from Late Latin 'adjuxtare' (from 'ad-' + 'juxta'). In the 17th century, English combined the verb with the noun suffix '-ment' to denote the act of rectifying an imbalance or calibrating measurements. In commerce and bookkeeping, it rapidly became the standard term for modifying ledger entries to reconcile discrepancies or account for accruals and depreciations.",
            "relatedLanguages": [
                "French: ajustement",
                "Spanish: ajuste",
                "Italian: aggiustamento",
                "German: Anpassung"
            ],
            "firstRecordedUse": "Mid-17th century (circa 1640s)"
        },
        "deepMeaning": {
            "coreConcept": "A financial modification, corrective entry, or monetary revision made to an account, ledger balance, invoice, or pricing schedule to correct an error, reflect updated asset values, or reconcile differences.",
            "spatialContext": "General ledgers, balance sheet reconciliation spreadsheets, retail point-of-sale registers, insurance loss adjustment files, and bank statements.",
            "temporalContext": "Month-end accounting closes, annual financial statement audits, quarterly inventory counts, and immediate billing dispute settlements.",
            "emotionalTone": "Objective, corrective, precise, and regulatory.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "In corporate and financial settings, native speakers understand 'adjustment' as fixing a numerical imbalance to bring recorded figures into harmony with economic reality. Whether adjusting an invoice for a customer who was overcharged, recording an inventory adjustment after physical stock shrinkage, or posting adjusting entries for depreciation, it implies meticulous accuracy rather than structural disruption.",
            "mentalImage": "An accounting manager scrutinizing a digital trial balance, entering an adjusting debit line to reconcile physical warehouse stock with recorded inventory totals before the quarterly close.",
            "whenToUse": "Use when modifying financial figures, issuing customer credits or refunds for billing mistakes, updating asset valuations, applying inflation adjustments, or recording accruals and prepayments in bookkeeping.",
            "whenNotToUse": "Do not use 'adjustment' to describe sweeping corporate reorganizations or mergers; do not confuse with a fine or penalty (an adjustment corrects a figure to its rightful value rather than imposing a punishment).",
            "culturalContext": "In North American retail and banking, a 'price adjustment' is a standard customer right if a purchased product goes on sale within a specified window. In corporate governance, adjusting journal entries are mandatory under GAAP and IFRS to satisfy the accrual accounting principle."
        },
        "examples": {
            "daily": [
                "When the electronics store marked down the television forty dollars two days after I bought it, customer service issued a price adjustment to my credit card.",
                "After I identified a mistaken roaming charge on my monthly cell phone bill, the representative applied an immediate billing adjustment.",
                "The checking account statement showed an adjustment of twenty-five dollars to refund an improperly assessed maintenance fee."
            ],
            "business": [
                "The corporate controller approved a forty-thousand-dollar inventory adjustment to write off stock damaged during warehouse renovations.",
                "To offset rising grocery and fuel expenses, the labor union negotiated a four percent cost-of-living adjustment for all manufacturing personnel.",
                "Following the annual audit, external accountants recommended a balance sheet adjustment to reflect the amortized value of software patents."
            ],
            "conversation": [
                "\"Why does our payable statement not match the supplier's latest invoice?\" — \"The vendor posted a credit adjustment to reimburse us for merchandise that arrived defective last week.\"",
                "\"Can we finalize the quarterly earnings press release this afternoon?\" — \"We need to wait for the tax department to complete their final deferred tax adjustment before releasing the figures.\""
            ],
            "collocations": [
                "price adjustment",
                "inventory adjustment",
                "cost-of-living adjustment",
                "make an adjustment",
                "adjusting entry",
                "balance sheet adjustment"
            ]
        },
        "wordFamily": {
            "noun": "adjustment, adjuster",
            "verb": "adjust",
            "adjective": "adjustable, adjusted",
            "adverb": "adjustably"
        },
        "visual": {
            "imageKeyword": "accounting adjustment spreadsheet ledger balance invoice correction",
            "imageDescription": "A close-up of a digital spreadsheet on an executive laptop screen showing highlighted credit and debit adjusting entries alongside a printed balance sheet and calculator.",
            "mnemonic": "AD-JUST-MENT: Moving numbers until the accounts are JUST right and perfectly balanced!"
        },
        "video": {
            "description": "A financial accounting tutorial explaining adjusting journal entries, illustrating how accountants record accrued revenues, accrued expenses, and depreciation to comply with accrual accounting standards."
        },
        "toeicContext": {
            "commonParts": [3, 4, 5, 7],
            "exampleQuestion": "Following a thorough review of the warehouse logs, the head accountant will make a necessary _____ to the recorded asset valuation. (A) adjust (B) adjuster (C) adjustment (D) adjustable",
            "tips": "In TOEIC Part 5, collocations with 'make a / an' frequently test noun recognition. Preceded by the indefinite article 'a' and modifying adjective 'necessary', the blank requires the abstract count noun: (C) adjustment. Choice (A) is a base verb, (B) is a person who inspects claims, and (D) is an adjective."
        },
        "synonyms": [
            "modification",
            "correction",
            "alteration",
            "reconciliation",
            "amendment",
            "calibration"
        ],
        "antonyms": [
            "status quo",
            "unaltered state",
            "fixity",
            "stagnation"
        ],
        "relatedWords": [
            "adjust",
            "accrual",
            "reconciliation",
            "depreciation",
            "credit balance",
            "ledger entry",
            "discrepancy"
        ]
    },
    {
        "id": "finance-067",
        "word": "allocation",
        "partOfSpeech": ["noun"],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˌæl.əˈkeɪ.ʃən/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/allocation--_us_1.mp3",
            "syllableBreakdown": "al·lo·ca·tion",
            "stressPattern": "Third syllable stress: /ˌæl.əˈkeɪ.ʃən/ (al-oh-KAY-shun)",
            "commonMistakes": "Learners often mistakenly stress the second syllable (*al-LOC-a-tion*) or pronounce the third vowel as a flat short /æ/. The secondary stress falls on the first syllable 'AL', while the primary stress is on the third syllable 'KAY', followed by a soft '-shun'."
        },
        "etymology": {
            "origin": "Latin / Medieval Latin",
            "rootWord": "allocare (from Latin: ad- + locare: to place, put in a position)",
            "rootMeaning": "ad- (to, toward) + locus (place); allocare (to assign to a specific place, grant, or earmark funds)",
            "evolution": "Derived from Medieval Latin 'allocare', a compound of 'ad-' (to) and 'locare' (to place, from 'locus'). In 14th-century Anglo-Latin exchequer records, 'allocatio' described the formal allowance or disbursement of royal funds for designated expenses. By the 17th century, it was used in English for apportioning resources. In modern corporate finance and portfolio theory, it refers specifically to the strategic distribution of capital, budgets, IPO shares, or assets across defined categories.",
            "relatedLanguages": [
                "French: allocation",
                "Spanish: asignación / colocación",
                "Italian: allocazione",
                "German: Allokation / Zuweisung"
            ],
            "firstRecordedUse": "Late 16th to early 17th century"
        },
        "deepMeaning": {
            "coreConcept": "The deliberate, strategic distribution or apportionment of financial resources, capital, investment assets, or budgetary funds among different departments, projects, or asset classes.",
            "spatialContext": "Corporate boardroom budget summits, asset management terminals, investment syndicate trading desks, and municipal finance council chambers.",
            "temporalContext": "Annual fiscal budgeting cycles, quarterly portfolio rebalancing, initial public offering (IPO) share allotments, and capital expenditure project approvals.",
            "emotionalTone": "Strategic, disciplined, equitable, and decisive.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Native speakers associate 'allocation' with intentional, macro-level decision-making about distributing finite resources. In wealth management, 'asset allocation' is universally understood as dividing an investment portfolio across stocks, bonds, and cash to balance risk and return. In corporate offices, 'budget allocation' determines whether an initiative receives funding to hire staff and purchase equipment.",
            "mentalImage": "A chief financial officer presenting a segmented visual chart to executive stakeholders, detailing the strategic distribution of annual venture capital across artificial intelligence research, manufacturing, and global marketing.",
            "whenToUse": "Use when discussing how capital, budgets, IPO shares, operational resources, or investment portfolios are systematically apportioned among competing priorities.",
            "whenNotToUse": "Do not confuse with 'donation' (charitable gift without return expectations) or 'expenditure' (the direct outlay of cash); allocation represents the strategic assignment or earmarking of funds prior to their disbursement.",
            "culturalContext": "In modern portfolio theory (MPT), asset allocation is recognized as determining more than ninety percent of long-term investment return variability. In corporate governance, prudent capital allocation is regarded as the paramount measure of executive competence and shareholder value creation."
        },
        "examples": {
            "daily": [
                "The financial planner recommended an asset allocation consisting of seventy percent diversified equities and thirty percent fixed-income securities.",
                "Our local municipal council approved an increased budget allocation to repair aging residential water pipelines.",
                "Before applying for college grants, she reviewed the state's scholarship allocation guidelines for STEM undergraduates."
            ],
            "business": [
                "The board of directors authorized a capital allocation of seventy-five million dollars toward constructing a high-efficiency distribution center.",
                "During the annual planning summit, the executive committee increased the budget allocation for cybersecurity infrastructure by twenty percent.",
                "Investment banks managing the technology firm's initial public offering completed the share allocation to institutional investors ahead of schedule."
            ],
            "conversation": [
                "\"Has the software development division received its capital allocation for next year's cloud migration?\" — \"Yes, the finance committee approved the full twelve-million-dollar funding package this morning.\"",
                "\"Why was our regional sales travel budget curtailed for the upcoming quarter?\" — \"Executive management decided that corporate resource allocation needed to prioritize domestic digital marketing campaigns.\""
            ],
            "collocations": [
                "asset allocation",
                "budget allocation",
                "capital allocation",
                "resource allocation",
                "share allocation",
                "allocation of funds"
            ]
        },
        "wordFamily": {
            "noun": "allocation, allocator",
            "verb": "allocate",
            "adjective": "allocative, allocated",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "capital asset allocation pie chart business budget investment",
            "imageDescription": "A team of financial analysts examining an interactive glowing asset allocation pie chart on a digital conference table, displaying diversified investment distribution.",
            "mnemonic": "AL-LOCATION: Putting your money in the right LOCATION for optimal growth!"
        },
        "video": {
            "description": "A corporate finance instructional video explaining strategic capital allocation, demonstrating how executive teams distribute cash flow among research, capital expenditures, dividends, and debt reduction."
        },
        "toeicContext": {
            "commonParts": [3, 4, 5, 7],
            "exampleQuestion": "The executive committee praised the chief financial officer for her prudent _____ of corporate capital across high-growth international divisions. (A) allocate (B) allocator (C) allocation (D) allocated",
            "tips": "Following the possessive pronoun 'her' and modifying adjective 'prudent', the sentence requires a noun describing the act or process of distributing resources: (C) allocation. Choice (A) is a base verb, (B) refers to the person who allocates, and (D) is a past participle."
        },
        "synonyms": [
            "apportionment",
            "allotment",
            "distribution",
            "assignment",
            "earmarking",
            "dispensation"
        ],
        "antonyms": [
            "withholding",
            "consolidation",
            "centralization",
            "retention"
        ],
        "relatedWords": [
            "allocate",
            "asset class",
            "budget",
            "capital expenditure",
            "diversification",
            "apportion",
            "portfolio"
        ]
    }
]

with open("scratch/finance_065_067.json", "w", encoding="utf-8") as f:
    json.dump({"words": words_data}, f, indent=2, ensure_ascii=False)

print("Saved scratch/finance_065_067.json successfully!")
