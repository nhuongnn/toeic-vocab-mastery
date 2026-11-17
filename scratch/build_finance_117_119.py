import json

words_data = [
    {
        "id": "finance-117",
        "word": "debtor",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/ˈdɛt.ɚ/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/debtor--_us_1.mp3",
            "syllableBreakdown": "deb·tor",
            "stressPattern": "●○",
            "commonMistakes": "Learners frequently articulate the silent letter 'b', pronouncing it erroneously as /ˈdɛb.tɚ/ or /ˈdeb-tər/. The 'b' is completely silent in English; it was inserted during the Renaissance by pedantic scholars to reflect Latin 'debitum', even though Middle English had always pronounced it without a 'b' (from Anglo-Norman dettur). Furthermore, test-takers often confuse 'debtor' (the entity that owes money / liability) with 'creditor' (the entity to whom money is owed / asset), leading to inverted answers on TOEIC financial reading passages."
        },
        "etymology": {
            "origin": "Middle English dettour, borrowed through Anglo-Norman and Old French detur / deteur, from Latin dēbitor ('one who owes'), from dēbēre ('to owe'), originally a contraction of de- ('away, from') and habēre ('to have, hold').",
            "rootWord": "Latin dēbēre (to owe, literally 'to have something from someone') / dēbitor (debtor)",
            "rootMeaning": "'A person or entity holding property or funds derived from another, creating a legal obligation of restitution'",
            "evolution": "In Roman civil law, a dēbitor entered into a formal legal nexus creating personal or proprietary liability toward a creditor. Anglo-Norman courts transmitted the term into English common law as dettour in the 13th century. During the 16th century, humanists respelled the word with an unpronounced 'b' to align with Classical Latin dēbitor. With the development of modern commercial bankruptcy laws in the 19th and 20th centuries, 'debtor' expanded from penal connotations into a precise technical designation for any person or corporation seeking orderly debt restructuring under court protection (e.g., debtor-in-possession).",
            "relatedLanguages": [
                "French: débiteur (debtor) / dette (debt)",
                "Spanish: deudor (debtor) / deuda (debt)",
                "Italian: debitore (debtor) / debito (debt)",
                "Portuguese: devedor (debtor) / dívida (debt)",
                "German: Schuldner (debtor / borrower)"
            ],
            "firstRecordedUse": "Early 13th century (circa 1225 in Middle English legal texts as dettur)"
        },
        "deepMeaning": {
            "coreConcept": "A person, corporation, municipality, or sovereign state that has a legally enforceable obligation to pay a monetary sum or return value to another entity (the creditor) under the terms of a loan, commercial contract, bond indenture, or court decree.",
            "spatialContext": "Credit risk evaluation departments, bankruptcy courtrooms, commercial loan offices, corporate debt advisory suites, and accounts receivable collections agencies.",
            "temporalContext": "Net 30/60/90 payment term intervals, monthly loan amortization due dates, bankruptcy reorganization timelines, and quarterly debt-service evaluations.",
            "emotionalTone": "Legally rigorous, objective, commercially vigilant, and cautious regarding credit default risks.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "To a native English speaker and financial professional, 'debtor' is an exact legal and balance-sheet term rather than a casual synonym for 'someone who borrowed money' (which is simply 'borrower'). In British and Commonwealth accounting, native speakers immediately associate 'debtors' with trade receivables ('accounts receivable'). In North American corporate restructuring, 'debtor' carries immense procedural dignity—a company operating under Chapter 11 bankruptcy protection is formally designated as the 'debtor-in-possession' (DIP), tasked with rehabilitating its business while safeguarding creditor assets. Natives maintain instant reciprocal clarity: the debtor holds the liability; the creditor holds the asset.",
            "mentalImage": "A commercial restructuring attorney and credit risk manager sitting across a mahogany conference table reviewing a distressed company's balance sheet, negotiating an extension of debt maturities with senior lenders.",
            "whenToUse": "Use in legal contracts, commercial credit assessments, loan documentation, corporate restructuring filings, and formal accounting reports (e.g., 'primary debtor', 'debtor-in-possession financing', 'solvent debtor', 'pursuing a delinquent debtor').",
            "whenNotToUse": "Do not use 'debtor' in casual conversation when talking about a friend who owes you ten dollars for lunch; use 'borrower' or everyday phrasing ('he owes me ten dollars'). Never confuse with 'creditor' (the lender or supplier who extended credit).",
            "culturalContext": "Historically, English common law subjected debtors to punitive imprisonment in notorious debtors' prisons (such as the Fleet and Marshalsea). The 19th and 20th centuries brought a profound cultural and legal transformation in Anglo-American commercial philosophy, replacing punishment with equitable bankruptcy systems designed to give honest corporate and individual debtors a 'fresh start'. In TOEIC exam scenarios, debtor-creditor relationships frequently appear in contract disputes, credit checks, and financial recovery memos."
        },
        "examples": {
            "daily": [
                "The non-profit credit counseling agency assisted the struggling debtor in consolidating several high-interest loans into one affordable monthly installment.",
                "Under federal consumer protection regulations, collection representatives are strictly forbidden from contacting a debtor after eight o'clock in the evening.",
                "The landlord issued a formal written notice advising the debtor that overdue residential rent must be transferred within ten business days."
            ],
            "business": [
                "The syndicated banking group initiated formal arbitration proceedings to seize pledged equipment collateral from the defaulting corporate debtor.",
                "During the Chapter 11 reorganization process, the bankruptcy judge granted the debtor-in-possession permission to secure fifty million dollars in emergency liquidity.",
                "Our credit control department reviews the trade debtor aging schedule every Friday to flag high-risk commercial accounts before they turn into uncollectible bad debt."
            ],
            "conversation": [
                "\"Has the overseas distributor acknowledged the overdue shipping invoices?\" / \"Yes, the debtor sent an official payment confirmation this morning indicating that the full balance will be wired by Friday.\"",
                "\"Why is the bankruptcy judge closely scrutinizing our airline's aircraft leasing expenses?\" / \"Because as a Chapter 11 debtor, the airline cannot enter into major long-term lease obligations without explicit judicial authorization.\""
            ],
            "collocations": [
                "corporate debtor",
                "trade debtor",
                "delinquent debtor",
                "debtor-in-possession",
                "solvent debtor",
                "debtor ledger"
            ]
        },
        "wordFamily": {
            "noun": "debt, debtor, indebtedness",
            "verb": "indebt",
            "adjective": "indebted, debt-ridden",
            "adverb": "indebtedly"
        },
        "visual": {
            "imageKeyword": "commercial loan restructuring corporate debtor financial records table meeting",
            "imageDescription": "A financial restructuring advisor and corporate accountant reviewing loan agreements, balance sheets, and debt amortization schedules across a boardroom table.",
            "mnemonic": "DEBTOR has a silent 'B', just like DEBT: the DEBTOR is the person or company that carries the DEBT!"
        },
        "video": {
            "description": "An educational corporate finance video outlining the legal obligations of a debtor-in-possession during Chapter 11 reorganization and explaining how creditors negotiate debt-for-equity swaps."
        },
        "toeicContext": {
            "commonParts": [
                5,
                6,
                7
            ],
            "exampleQuestion": "Under the terms of the revised restructuring agreement, the corporate _____ must submit certified quarterly revenue audits to the syndicate of lenders.\n(A) debtor\n(B) debt\n(C) debited\n(D) debiting",
            "tips": "In TOEIC Part 5, carefully distinguish between personal/agent nouns and abstract non-person nouns. Preceded by the adjective 'corporate' and functioning as the subject of the modal verb 'must submit' (an intentional action performed by a legal person or company), the sentence requires the personal/entity noun (A) 'debtor'. Choice (B) 'debt' is the abstract financial obligation itself, which cannot 'submit' revenue audits. Choices (C) 'debited' and (D) 'debiting' are verb forms that cannot serve as the subject noun here. In Part 7, identify debtor-creditor roles in business memos to determine who is paying and who is collecting."
        },
        "synonyms": [
            "borrower",
            "obligor",
            "loan recipient",
            "defaulter",
            "mortgagor"
        ],
        "antonyms": [
            "creditor",
            "lender",
            "obligee",
            "claimant"
        ],
        "relatedWords": [
            "accounts receivable",
            "insolvency",
            "bankruptcy",
            "default",
            "collateral",
            "promissory note",
            "credit rating"
        ]
    },
    {
        "id": "finance-118",
        "word": "deductible",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/dɪˈdʌk.tə.bəl/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/deductible--_us_1.mp3",
            "syllableBreakdown": "de·duct·i·ble",
            "stressPattern": "○●○○",
            "commonMistakes": "Learners frequently misplace the primary stress onto the initial syllable, saying /ˈdɛd.ək.tə.bəl/ instead of the correct second-syllable stress /dɪˈdʌk.tə.bəl/. Additionally, non-native speakers often stumble on the dual grammatical role: while 'deductible' functions as an adjective in 'tax-deductible expense', in insurance and benefits administration it functions prominently as a COUNTABLE NOUN representing the initial out-of-pocket sum (e.g., 'a $500 deductible'). Avoid confusing 'deductible' with 'premium' (the recurring maintenance payment) or 'co-payment' (a fixed fee per doctor visit)."
        },
        "etymology": {
            "origin": "Formed from Latin dēdūcere ('to lead down, draw away, subtract'), from de- ('down, away from') and dūcere ('to lead, guide'), combined with the Latin adjectival suffix -ibilis ('capable of being').",
            "rootWord": "Latin dēdūcere (to lead down, withdraw, subtract) + -ibilis (able to be)",
            "rootMeaning": "'Capable of being drawn off, removed, or subtracted from a total amount'",
            "evolution": "In late 16th-century English legal and scholastic treatises, 'deductible' arose as an adjective describing amounts that could be subtracted from gross inheritances or values that could be deduced by logical reasoning. During the early 20th century, with the rapid expansion of standardized commercial automobile, marine, and casualty insurance policies across the United States, insurance underwriters nominalized the adjective. The noun 'deductible' was formally established to designate the initial loss amount that the policyholder contractually agreed to absorb before indemnification took effect.",
            "relatedLanguages": [
                "French: déductible (deductible) / déduire (to deduct)",
                "Spanish: deducible (deductible) / deducir (to deduct)",
                "Italian: deducibile (deductible) / dedurre (to deduct)",
                "Portuguese: dedutível (deductible) / deduzir (to deduct)",
                "German: Selbstbeteiligung (insurance deductible / policyholder copay)"
            ],
            "firstRecordedUse": "Late 16th century (circa 1590 as an adjective); early 20th century (c. 1927 as an insurance noun)"
        },
        "deepMeaning": {
            "coreConcept": "A predetermined, contractually specified monetary sum that an insured person or company must pay out of pocket toward covered medical expenses or property damage before an insurance provider begins disbursing claim reimbursements.",
            "spatialContext": "Corporate human resources benefit portals, medical billing offices, commercial insurance brokerage desks, fleet maintenance dispatch centers, and claims adjustment departments.",
            "temporalContext": "Annual policy renewal periods, healthcare open enrollment windows, calendar-year claim accumulation cycles, and post-accident claim filings.",
            "emotionalTone": "Contractual, pragmatic, cost-evaluative, and risk-sharing.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "For native English speakers, particularly in North America, the noun 'deductible' is deeply intertwined with personal finance and workplace benefit packages. When selecting health or automotive insurance, natives intuitively weigh the trade-off: a high deductible means significantly lower monthly premiums, but creates exposure to substantial upfront expenses if an emergency strikes. Employees actively track whether they have 'met their deductible' for the calendar year, knowing that subsequent medical procedures will be covered at much higher co-insurance rates. In corporate risk management, companies deliberately select substantial deductibles on property and vehicle fleets to prevent small nuisance claims from driving up corporate premiums.",
            "mentalImage": "An employee reviewing health insurance enrollment options on a laptop screen, comparing a high-deductible health plan featuring a $3,000 threshold with a traditional plan featuring a $500 deductible.",
            "whenToUse": "Use when discussing commercial liability, automotive coverage, employee healthcare plans, property casualty insurance, and claims reimbursement rules (e.g., 'pay the deductible', 'annual deductible', 'comprehensive collision deductible', 'meet the deductible').",
            "whenNotToUse": "Do not confuse the noun 'deductible' (an insurance out-of-pocket threshold) with 'deduction' (a subtraction from gross salary or taxable income). Do not use 'deductible' to describe the periodic insurance cost (which is the 'premium').",
            "culturalContext": "In the United States, the prevalence of High-Deductible Health Plans (HDHPs) paired with tax-advantaged Health Savings Accounts (HSAs) has made 'deductible' one of the most intensely analyzed terms in corporate benefits. In British English, the equivalent term in general insurance is often called an 'excess', though 'deductible' is standard in commercial marine and corporate reinsurance. In TOEIC Part 7, deductibles frequently appear in company travel policies, auto rental agreements, and medical benefits summaries."
        },
        "examples": {
            "daily": [
                "After the hailstorm dented the hood of her vehicle, Susan had to pay a $500 deductible to the repair shop before her comprehensive auto coverage paid the balance.",
                "Because our family met our annual medical deductible in September, the insurer covered ninety percent of the remaining specialist visits this year.",
                "He decided to choose an apartment renter's insurance policy with a higher deductible in order to reduce his monthly premium payments."
            ],
            "business": [
                "The corporate human resources director announced that the company would deposit $1,000 into each employee's HSA to help offset the increased health insurance deductible.",
                "Under the terms of the commercial fleet policy, the logistics firm carries a $5,000 collision deductible on each delivery truck.",
                "The enterprise property insurance policy features a separate $50,000 deductible for damage caused by windstorms or flooding."
            ],
            "conversation": [
                "\"Did the human resources department modify our medical coverage options for the upcoming fiscal year?\" / \"Yes, the individual in-network deductible was raised from $750 to $1,000, though prescription co-pays remain unchanged.\"",
                "\"How much out-of-pocket expense will our company incur for the water leak repairs in the warehouse?\" / \"We only have to pay our $2,500 property deductible; the commercial insurer will reimburse the remaining eighteen thousand dollars.\""
            ],
            "collocations": [
                "annual deductible",
                "insurance deductible",
                "meet a deductible",
                "pay a deductible",
                "high-deductible health plan",
                "collision deductible"
            ]
        },
        "wordFamily": {
            "noun": "deductible, deduction",
            "verb": "deduct",
            "adjective": "deductible",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "insurance deductible calculation policy documents pen healthcare claim form",
            "imageDescription": "An insurance claims adjuster and policyholder reviewing a damaged property repair estimate alongside an insurance declaration page highlighting the deductible amount.",
            "mnemonic": "DEDUCTIBLE: The insurance company DEDUCTS this initial amount from your claim check—so YOU pay it first!"
        },
        "video": {
            "description": "An instructional human resources orientation video breaking down the mechanics of employer health plans, illustrating how annual deductibles, co-insurance percentages, and out-of-pocket maximums interact."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                7
            ],
            "exampleQuestion": "Under the corporate travel insurance policy, staff members filing a claim for damaged electronic equipment are responsible for paying a $100 _____ per incident.\n(A) deductible\n(B) deduct\n(C) deductibly\n(D) deduction",
            "tips": "In TOEIC Part 5, test developers frequently exploit confusing word family forms and subtle noun differences. Preceded by the indefinite article 'a' and a specific monetary amount ('a $100 _____') and followed by the phrase 'per incident', the sentence requires the countable insurance noun (A) 'deductible'. Choice (B) 'deduct' is a base verb; choice (C) 'deductibly' is an adverb; and choice (D) 'deduction' refers to a subtraction from wages or taxable income, not an insurance threshold. In Part 7, look for reading passages detailing rental vehicle insurance or health plan choices where candidates must calculate total employee out-of-pocket costs."
        },
        "synonyms": [
            "out-of-pocket threshold",
            "policy excess",
            "insured contribution",
            "co-insurance share",
            "retention limit"
        ],
        "antonyms": [
            "first-dollar coverage",
            "full indemnity",
            "zero-deductible coverage"
        ],
        "relatedWords": [
            "insurance premium",
            "co-payment",
            "out-of-pocket maximum",
            "claim",
            "underwriting",
            "policyholder",
            "indemnity"
        ]
    },
    {
        "id": "finance-119",
        "word": "deduction",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/dɪˈdʌk.ʃən/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/deduction--_us_1.mp3",
            "syllableBreakdown": "de·duc·tion",
            "stressPattern": "○●○",
            "commonMistakes": "Learners sometimes mistakenly place stress on the initial syllable (*ˈdɛd-ək-ʃən*) instead of the medial syllable (/dɪˈdʌk.ʃən/). A major semantic error in business contexts is confusing a 'tax deduction' (an allowable expense subtracted from gross income to lower taxable income) with a 'tax credit' (a direct dollar-for-dollar subtraction from the final tax bill). Additionally, candidates should distinguish 'payroll deductions' (amounts withheld from gross earnings for taxes, retirement, or benefits) from insurance 'deductibles'."
        },
        "etymology": {
            "origin": "Middle English deduccioun, borrowed from Anglo-French deduction and directly from Latin dēductiō ('a leading away, subtraction, reduction'), from dēdūcere ('to lead down, draw away, subtract'), formed from de- ('down, away') and dūcere ('to lead, guide').",
            "rootWord": "Latin dēdūcere (to lead down, subtract) / dēductiō (subtraction, leading off)",
            "rootMeaning": "'The act or result of subtracting, taking away, or diminishing an aggregate sum'",
            "evolution": "In Classical Latin, dēductiō referred to drawing water from a stream or escorting an official, as well as the mathematical subtraction of figures. During medieval scholasticism, it took on philosophical weight as logical inference (deducing specific truths from general axioms). By the late 14th century, English commercial accounts used 'deduction' to describe abatements, discounts, or subtractions from revenue totals. In modern tax law and payroll accounting, 'deduction' serves as the statutory designation for allowable expenses that reduce gross income prior to calculating tax liability, as well as mandatory and voluntary withholdings on wage stubs.",
            "relatedLanguages": [
                "French: déduction (deduction / tax deduction)",
                "Spanish: deducción (deduction / income subtraction)",
                "Italian: deduzione (deduction / logical deduction / tax write-off)",
                "Portuguese: dedução (deduction / tax deduction)",
                "German: Abzug (deduction / payroll deduction / discount)"
            ],
            "firstRecordedUse": "Late 14th century (circa 1390 in Middle English, initially denoting mathematical subtraction and legal abatement)"
        },
        "deepMeaning": {
            "coreConcept": "The act of subtracting an amount from a gross total, or the specific monetary sum so subtracted—most prominently an allowable business or personal expense subtracted from gross income to arrive at taxable net income, or an amount withheld from an employee's gross paycheck for taxes, benefits, or retirement savings.",
            "spatialContext": "Corporate payroll desks, certified public accounting offices, government revenue service processing centers, and tax compliance software interfaces.",
            "temporalContext": "Bi-weekly or monthly payroll disbursement dates, quarterly corporate estimated tax filings, and annual fiscal tax return deadlines.",
            "emotionalTone": "Accurate, legally compliant, financially disciplined, and fiscally advantageous.",
            "formalityLevel": "formal",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "Native speakers associate 'deduction' with two universal corporate experiences: reading their pay stubs and filing annual tax returns. On a pay stub, 'deductions' are the withholdings (taxes, 401(k), health premiums) that bridge gross pay to net take-home pay. During tax season, 'deduction' is celebrated as a lawful expense write-off that shrinks taxable income. Americans immediately differentiate between taking the 'standard deduction' (a flat statutory amount) and 'itemizing deductions' (tallying mortgage interest, state taxes, and charitable gifts). In corporate financial accounting, natives understand that maximizing legitimate operational deductions lowers corporate income tax, directly preserving cash reserves.",
            "mentalImage": "A senior certified public accountant reviewing client travel receipts, corporate equipment depreciation schedules, and charitable contribution acknowledgments to compute allowable deductions on an enterprise tax filing.",
            "whenToUse": "Use when discussing tax write-offs, allowable business expenses, salary withholdings, payroll slips, or mathematical reductions from gross billings (e.g., 'tax deduction', 'payroll deduction', 'standard deduction', 'itemized deduction', 'allowable deduction').",
            "whenNotToUse": "Do not confuse with 'tax credit' (which directly reduces taxes owed, rather than reducing taxable income). Do not use 'deduction' to describe the initial out-of-pocket insurance threshold (use 'deductible').",
            "culturalContext": "In the United States, the UK, Canada, and Australia, tax deductions form a cornerstone of fiscal policy, designed by governments to incentivize specific behaviors such as retirement saving, home ownership, and corporate research investments. The debate over which deductions to allow or cap is a staple of national economic policy. In TOEIC examinations, questions featuring payroll deductions and corporate expense write-offs appear regularly in Part 5 sentence completion and Part 7 workplace correspondence."
        },
        "examples": {
            "daily": [
                "She carefully examined her monthly pay stub to confirm that the automatic deduction for her health savings account was recorded accurately.",
                "Homeowners in the region can claim a legitimate tax deduction for the interest paid on their primary residential mortgage.",
                "The tax preparer reminded him to retain all charitable donation receipts so they could be filed as an itemized deduction."
            ],
            "business": [
                "The enterprise claimed substantial accelerated depreciation deductions on newly commissioned industrial machinery to minimize its corporate tax liability.",
                "Our payroll department updated the accounting software to incorporate the pre-tax deduction for employee commuter transit benefits.",
                "Following the corporate tax audit, the revenue authority confirmed that all claimed client entertainment expenses qualified as allowable business deductions."
            ],
            "conversation": [
                "\"Why is my net pay this month slightly less than last month's paycheck?\" / \"Take a look at the deductions column; your increased 401(k) retirement contribution took effect on this pay cycle.\"",
                "\"Can our architectural firm write off the entire travel expense for the urban planning conference?\" / \"Yes, legitimate business travel and professional seminar fees qualify as a fully allowable tax deduction under corporate tax rules.\""
            ],
            "collocations": [
                "tax deduction",
                "payroll deduction",
                "standard deduction",
                "itemized deduction",
                "allowable deduction",
                "pre-tax deduction"
            ]
        },
        "wordFamily": {
            "noun": "deduction, deductible",
            "verb": "deduct",
            "adjective": "deductible, deductive",
            "adverb": "deductively"
        },
        "visual": {
            "imageKeyword": "tax deduction corporate accounting receipts calculator audit laptop forms",
            "imageDescription": "A certified tax accountant using a calculator and dual-monitor tax software to itemize allowable corporate expense receipts and calculate final deductions.",
            "mnemonic": "DEDUCTION is a REDUCTION: you DEDUCT eligible expenses to REDUCE your total taxable income!"
        },
        "video": {
            "description": "A concise corporate accounting tutorial explaining the fundamental difference between tax deductions and tax credits, demonstrating how allowable business expenses reduce overall corporate tax burdens."
        },
        "toeicContext": {
            "commonParts": [
                5,
                6,
                7
            ],
            "exampleQuestion": "Employees may authorize a voluntary payroll _____ to transfer funds directly from their monthly salary into a company-sponsored pension plan.\n(A) deduction\n(B) deduct\n(C) deducted\n(D) deductible",
            "tips": "In TOEIC Part 5, test questions frequently test the distinction between common business nouns and collocations. Preceded by the adjective phrase 'voluntary payroll' and the indefinite article 'a', the blank functions as the direct object noun meaning an amount withheld from wages: (A) 'deduction'. The collocation 'payroll deduction' is a staple of TOEIC workplace passages. Choice (B) 'deduct' is a base verb; choice (C) 'deducted' is a past participle or past verb form; and choice (D) 'deductible' is either an insurance threshold noun or an adjective, neither of which fits the payroll withholding context. In Part 7, watch for pay stubs itemizing gross pay, net pay, and various pre-tax or post-tax deductions."
        },
        "synonyms": [
            "subtraction",
            "reduction",
            "tax write-off",
            "allowance",
            "withholding",
            "abatement"
        ],
        "antonyms": [
            "addition",
            "increment",
            "surcharge",
            "taxable addition"
        ],
        "relatedWords": [
            "payroll",
            "withholding",
            "taxable income",
            "itemization",
            "gross pay",
            "net pay",
            "tax credit"
        ]
    }
]

with open("scratch/finance_117_119.json", "w", encoding="utf-8") as f:
    json.dump({"words": words_data}, f, indent=4, ensure_ascii=False)

print("Saved scratch/finance_117_119.json successfully!")
