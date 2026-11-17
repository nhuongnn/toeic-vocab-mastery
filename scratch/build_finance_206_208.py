import json
import re

words = [
    {
        "id": "finance-206",
        "word": "nominal",
        "partOfSpeech": [
            "adjective"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈnɑː.mɪ.nəl/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/nominal--_us_1.mp3",
            "syllableBreakdown": "nom-i-nal",
            "stressPattern": "Primary stress on the first syllable: NOM-i-nal (/ˈnɑː.mɪ.nəl/, ●○○)",
            "commonMistakes": "Learners often mistakenly stress the second syllable (*no-MIN-al*), confusing its stress rhythm with words like 'original' or 'terminal'. In standard business English, the primary stress falls cleanly on the initial syllable 'nom-' (/nɑːm/ in American English, /nɒm/ in British English), with both subsequent vowels reducing to weak unstressed syllables. Another frequent conceptual mistake in commercial contexts is confusing 'nominal' (meaning existing in name only, symbolic, or unadjusted for inflation) with 'normal' (typical, standard) or 'minimal' (the lowest possible amount; nominal implies a sum charged merely as a token formality rather than an evaluated low price)."
        },
        "etymology": {
            "origin": "Late Middle English via Middle French (nominal) and directly from Classical Latin nominalis ('pertaining to a name or names'), from nomen ('name'), derived from Proto-Indo-European *h₁nómn̥ ('name')",
            "rootWord": "nominalis (pertaining to names), from nomen (name)",
            "rootMeaning": "'Pertaining to or existing in name only; stated on paper rather than representing actual purchasing power or commercial cost'",
            "evolution": "In Classical Latin, 'nominalis' designated matters pertaining to names or grammatical substantives. In 15th-century scholastic philosophy, English adopted the term to describe concepts existing in name alone ('nominalism' as opposed to philosophical 'realism'). By the late 17th century, legal practice adopted 'nominal' to designate legal fictions or symbolic payments ('nominal consideration'). During the late 19th and early 20th centuries, as macroeconomics and central banking matured, economists such as Irving Fisher codified the fundamental financial distinction between 'nominal value' (the stated numerical face value or coupon rate) and 'real value' (purchasing power adjusted for inflation). In modern commerce, the term is equally famous for describing token administrative charges ('nominal fee') that satisfy legal consideration.",
            "relatedLanguages": [
                "French: nominal (nominal, face-value, symbolic)",
                "Spanish: nominal (nominal, stated, token)",
                "Italian: nominale (nominal, face-value)",
                "German: nominal / nominell (nominal, in name only)",
                "Portuguese: nominal (nominal, face-value)"
            ],
            "firstRecordedUse": "Late 15th century (philosophical context); late 18th to late 19th century in modern economic and financial usage"
        },
        "deepMeaning": {
            "coreConcept": "Designating a stated monetary figure, face value, or interest rate that has not been adjusted for the eroding effects of inflation; or, in commercial transactions, denoting an insignificantly small, token fee charged primarily to satisfy contractual, legal, or administrative formalities rather than to cover real operational expenses.",
            "spatialContext": "Commercial banking customer service counters, central bank monetary policy communiqués, corporate prospectus footnotes, bond trading sheets, and symposium registration desks.",
            "temporalContext": "Encountered continuously in annual bond yield announcements, quarterly macroeconomic inflation adjustments, and whenever corporate service providers process token registration or processing fees.",
            "emotionalTone": "Objective, precise, and understated; provides technical clarity regarding stated versus real financial figures, or reassuring relief when referring to negligible out-of-pocket costs.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Native English speakers instantly split 'nominal' based on its commercial context. When paired with 'fee', 'charge', or 'rent' ('a nominal fee'), natives interpret it as 'practically free'—a symbolic payment (such as five or ten dollars) levied simply to formalize an agreement, prevent frivolous no-shows, or satisfy legal paperwork, rather than to generate revenue. Conversely, in capital markets and economics ('nominal interest rate', 'nominal GDP', 'nominal yield'), finance professionals instinctively view it as an unadjusted headline figure, immediately prompting the mental calculation: Real Return = Nominal Return - Inflation Rate.",
            "mentalImage": "An official registration table at an executive industry summit where attendees receive badges, printed guides, and access passes, accompanied by a small signage stating: 'Member registration is complimentary; guests may enter for a nominal administrative fee of $10.'",
            "whenToUse": "Use 'nominal fee/charge' when describing an exceptionally small, token payment requested for administrative processing or symbolic compliance. In corporate finance and macroeconomics, use 'nominal' to specify stated face value, coupon rates, or financial statistics that have not been modified for inflation, fees, or taxes.",
            "whenNotToUse": "Do not use 'nominal' as a general synonym for 'inexpensive', 'cheap', or 'discounted' (e.g., avoid saying 'our department bought nominal office supplies'; use 'budget-friendly' or 'discounted'). Do not confuse 'nominal' with 'minimal' (which denotes the smallest possible quantity among options) or 'marginal' (which implies borderline quality or incremental cost).",
            "culturalContext": "In Anglo-American common law, a binding legal contract requires valid 'consideration'—something of value exchanged between parties. Businesses frequently incorporate a 'nominal consideration' (such as $1.00 or $10.00) into leases, asset transfers, or licensing agreements so the agreement remains enforceable in court without disclosing or assessing fair market value. In consumer banking, regulations like the US Truth in Lending Act (TILA) require financial institutions to state both nominal interest rates and comprehensive Annual Percentage Rates (APR) to prevent misleading borrowers."
        },
        "examples": {
            "daily": [
                "The community botanical conservatory offers free entry to local students, charging only a nominal parking fee of two dollars.",
                "Library patrons who lose their physical membership card can obtain an immediate plastic replacement for a nominal fee of three dollars.",
                "Although participation in the neighborhood charity walk is free, organizers request a nominal registration charge to cover the cost of commemorative wristbands."
            ],
            "business": [
                "While the municipal bond offered an attractive nominal coupon rate of six percent, unexpected inflation reduced the investors' real yield to under two percent.",
                "Corporate clients attending the annual technology expo may utilize the high-speed executive networking lounge for a nominal daily surcharge of fifteen dollars.",
                "The pharmaceutical enterprise transferred the manufacturing rights of an obsolete regional medication to a local research foundation for a nominal sum of one dollar."
            ],
            "conversation": [
                "\"Does the employee wellness program charge staff to use the campus fitness center?\" — \"No, general access is completely free, though booking personal training sessions carries a nominal fee of ten dollars to prevent missed appointments.\"",
                "\"Why does our portfolio report show a disparity between our nominal return and real wealth growth?\" — \"Our nominal portfolio return was seven percent, but three percent consumer inflation dampened our actual purchasing power gains to four percent.\"",
                "\"Did the municipal authority charge our logistics division for reserving the overnight freight unloading bay?\" — \"They only billed us a nominal processing charge to issue official security clearance permits for our commercial drivers.\""
            ],
            "collocations": [
                "nominal fee",
                "nominal charge",
                "nominal interest rate",
                "nominal value",
                "nominal sum",
                "nominal GDP"
            ]
        },
        "wordFamily": {
            "noun": "nominality, nominalism",
            "verb": "nominate",
            "adjective": "nominal",
            "adverb": "nominally"
        },
        "visual": {
            "imageKeyword": "nominal fee token payment receipt registration desk badge lanyard",
            "imageDescription": "A professional conference check-in desk where an attendee taps a contactless payment card onto a small terminal displaying a minimal ten-dollar fee, picking up an official laminated conference lanyard and agenda.",
            "mnemonic": "NOMINAL comes from Latin NOMEN ('name'): It represents a value or cost 'in NAME only'—either an unadjusted face-value label or a price so tiny it barely exists beyond its name!"
        },
        "video": {
            "description": "A financial economist explaining the critical divergence between nominal interest rates and inflation-adjusted real yields using animated comparative charts of corporate bond portfolios."
        },
        "toeicContext": {
            "commonParts": [
                5,
                6,
                7
            ],
            "exampleQuestion": "Members of the chamber of commerce may access the executive conference suites at no charge, while external visitors are subject to a _______ booking fee of fifteen dollars.\n(A) nominal\n(B) nominally\n(C) nominate\n(D) nomination",
            "tips": "In TOEIC Part 5, noun modification is a frequent testing category. Before the noun phrase 'booking fee', an adjective is required to describe the nature of the charge. Choice (A) 'nominal' correctly functions as an adjective meaning very small or token, forming the high-frequency business collocation 'nominal fee'. Choice (B) 'nominally' is an adverb, (C) 'nominate' is a base verb, and (D) 'nomination' is a noun that cannot logically modify 'booking fee'."
        },
        "synonyms": [
            "token",
            "symbolic",
            "unadjusted",
            "face-value",
            "minimal",
            "negligible"
        ],
        "antonyms": [
            "real",
            "inflation-adjusted",
            "substantial",
            "significant",
            "actual"
        ],
        "relatedWords": [
            "real interest rate",
            "face value",
            "par value",
            "purchasing power",
            "coupon rate",
            "token payment",
            "inflation"
        ]
    },
    {
        "id": "finance-207",
        "word": "obligation",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˌɑːb.ləˈɡeɪ.ʃən/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/obligation--_us_1.mp3",
            "syllableBreakdown": "ob-li-ga-tion",
            "stressPattern": "Secondary stress on first syllable, primary stress on third syllable: ob-li-GA-tion (/ˌɑːb.ləˈɡeɪ.ʃən/, ˌ○●○)",
            "commonMistakes": "Learners frequently misplace the primary stress onto the initial syllable (*OB-li-ga-tion*) or the second syllable (*ob-LI-ga-tion*). The primary stress falls squarely on the penultimate syllable '-ga-' (/ˈɡeɪ/), while the initial syllable 'ob-' (/ɑːb/ or /ɒb/) receives secondary stress. Non-native speakers also sometimes confuse prepositions in standard collocations: remember that one is 'under an obligation to do something', has an 'obligation to a creditor', or undertakes an 'obligation for a loan'. Be careful not to confuse 'obligation' (a binding duty or liability) with 'obliging' (an adjective meaning courteous and accommodating)."
        },
        "etymology": {
            "origin": "Middle English via Anglo-Norman and Old French (obligation), directly from Classical Latin obligatio ('a binding, tying, pledging, moral or legal obligation'), derived from the verb obligare ('to bind, tie around, put under moral or legal constraint')",
            "rootWord": "obligatio (a legal binding), from obligare, compounded of ob- ('to, toward, before') + ligare ('to bind, tie, fasten')",
            "rootMeaning": "'The condition or act of being legally or contractually bound to perform a duty, service, or financial repayment'",
            "evolution": "In Roman civil law, 'obligatio' was famously defined in the Institutes of Justinian as 'vinculum juris'—a legal tie binding a party by necessity to perform something according to civil law. In 13th-century Anglo-Norman law, the word specifically denoted a sealed legal deed or written specialty binding a debtor to pay a fixed sum under explicit penalty for non-performance. Entering Middle English in the late 14th century, 'obligation' was used extensively in merchant covenants and wills. As European banking and commercial markets evolved through the 17th and 18th centuries, the term transitioned from personal moral duties to institutional debt securities, where issuers formalize financial obligations to bondholders. Under modern corporate accounting frameworks (IFRS and US GAAP), an obligation represents an unavoidable liability requiring the future transfer of economic benefits resulting from past events.",
            "relatedLanguages": [
                "French: obligation (bond, liability, debenture, moral duty)",
                "Spanish: obligación (obligation, debt bond, legal duty)",
                "Italian: obbligazione (bond, debt instrument, obligation)",
                "Portuguese: obrigação (obligation, corporate bond, duty)",
                "German: Obligation / Verpflichtung (bond, debenture, commitment)"
            ],
            "firstRecordedUse": "Late 14th century (circa 1380s in Middle English legal deeds and commercial transactions)"
        },
        "deepMeaning": {
            "coreConcept": "A legally enforceable, contractually binding duty or recognized financial liability that compels an individual, corporation, or government to perform a specific action, disburse monetary funds, service an outstanding debt, or surrender economic assets to a designated party at specified future dates.",
            "spatialContext": "Corporate treasury departments, credit rating review panels, commercial lending offices, bond trading desks, and contract compliance boardrooms.",
            "temporalContext": "Dictated by contractual debt maturity dates, scheduled loan amortization dates, monthly mortgage billing cycles, and quarterly bond coupon disbursements.",
            "emotionalTone": "Solemn, binding, legally definitive, and fiscally strict; conveys imperative accountability and vigilance against default.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "In professional and financial environments, native English speakers associate 'obligation' with an unyielding contractual chain (rooted in Latin ligare, 'to tie'). Unlike a flexible promise, an obligation carries strict legal and financial penalties if breached: missed debt obligations trigger credit rating downgrades, late fees, or restructuring. In everyday commercial customer interactions, native speakers are intimately familiar with the promotional phrase 'under no obligation to buy', which functions as an explicit psychological reassurance that an inquiry, free trial, or estimate creates zero binding contractual commitment.",
            "mentalImage": "A corporate treasurer reviewing a multi-year debt maturity schedule on dual workstation screens, verifying that dedicated sinking funds and liquid cash reserves are sufficient to service an upcoming thirty-million-dollar bond obligation.",
            "whenToUse": "Use 'obligation' when discussing binding contractual duties, debt-service requirements, corporate liabilities, or official debt instruments (such as 'collateralized debt obligations' or 'general obligation bonds'). It is also essential in customer service and sales contracts to clarify whether conditions are mandatory.",
            "whenNotToUse": "Do not use 'obligation' to describe casual voluntary favors, lighthearted plans, or routine personal preferences (e.g., avoid saying 'I have an obligation to watch the football match'; use 'I plan to' or 'I want to'). For minor operational chores without formal legal enforceability, prefer 'task' or 'responsibility'.",
            "culturalContext": "In Western commercial governance and bankruptcy jurisprudence (such as US Chapter 11 and UK administration), honoring debt obligations is the cornerstone of corporate solvency. Defaulting on a single loan covenant or payment obligation can trigger cross-default clauses across an enterprise's entire credit portfolio. In retail commerce, consumer protection statutes strictly regulate promotional guarantees to prevent sellers from imposing hidden obligations following 'free' consultations."
        },
        "examples": {
            "daily": [
                "Responsible homeowners set aside funds at the start of each month to cover their mortgage obligation before allocating money for discretionary spending.",
                "The residential landscaping company provided a complimentary garden assessment with a written estimate under no obligation to hire their crew.",
                "Following his university graduation, Michael set up automatic bank transfers to steadily pay down his accumulated student loan obligations."
            ],
            "business": [
                "Despite supply chain disruptions, the multinational manufacturer generated sufficient operating cash flow to meet all short-term debt obligations.",
                "The logistics contractor committed a serious breach of its contractual obligations by failing to deliver the industrial turbines by the agreed completion date.",
                "The municipal government issued fifty million dollars in general obligation bonds to finance the construction of the new metropolitan water treatment plant."
            ],
            "conversation": [
                "\"Does our existing revolving credit facility provide adequate liquidity to service next quarter's bond obligations?\" — \"Yes, our treasury team has already sequestered eighteen million dollars in short-term commercial paper for that upcoming coupon payment.\"",
                "\"If we sign up for the sixty-day enterprise cloud trial, are we committed to an annual subscription?\" — \"Not at all; the agreement explicitly states that our company is under no obligation to purchase a long-term enterprise license.\"",
                "\"Why did Moody's revise our corporate credit rating from stable to negative watch?\" — \"The analysts expressed concern over our expanding pension fund obligations relative to projected operational earnings over the next three fiscal years.\""
            ],
            "collocations": [
                "meet financial obligations",
                "fulfill contractual obligations",
                "under no obligation",
                "debt obligations",
                "legal obligation",
                "satisfy an obligation"
            ]
        },
        "wordFamily": {
            "noun": "obligation, obligor, obligee",
            "verb": "oblige, obligate",
            "adjective": "obligatory, obliging, obligated",
            "adverb": "obligatorily, obligingly"
        },
        "visual": {
            "imageKeyword": "corporate bond indenture loan obligation signature seal legal document",
            "imageDescription": "A close-up view of an executive fountain pen resting upon a signed commercial credit agreement featuring an embossed red seal, alongside a financial amortization schedule and an office calculator.",
            "mnemonic": "OB-LIG-ATION: Remember 'LIGAMENT' or 'LIGATURE' (Latin ligare = to tie, bind). An obligation is a legal bond that LIGAMENTS/TIES you firmly to your financial duty!"
        },
        "video": {
            "description": "A corporate finance attorney delivering an instructional seminar on debt covenants, clarifying the legal ramifications of defaulting on senior debt obligations during corporate restructuring."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                7
            ],
            "exampleQuestion": "Prospective clients are invited to receive a comprehensive solar energy assessment for their corporate headquarters under no _______ to purchase equipment.\n(A) oblige\n(B) obligatory\n(C) obligation\n(D) obligating",
            "tips": "In TOEIC Part 5, recognizing fixed prepositional collocations is critical. The prepositional idiom 'under no _______' requires the singular countable noun 'obligation' (C) to form 'under no obligation' (không có nghĩa vụ/ràng buộc phải làm gì), a ubiquitous business English phrase. Choice (A) 'oblige' is a base verb, (B) 'obligatory' is an adjective, and (D) 'obligating' is a participle/verb form."
        },
        "synonyms": [
            "commitment",
            "liability",
            "duty",
            "covenant",
            "debt",
            "responsibility"
        ],
        "antonyms": [
            "discretion",
            "option",
            "exemption",
            "privilege",
            "freedom"
        ],
        "relatedWords": [
            "liability",
            "covenant",
            "debt service",
            "default",
            "maturity",
            "debenture",
            "collateral"
        ]
    },
    {
        "id": "finance-208",
        "word": "operating expense",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "advanced",
        "toeicFrequency": 7,
        "pronunciation": {
            "ipa": "/ˈɑː.pə.reɪ.tɪŋ ɪkˈspens/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/operating_expense--_us_1.mp3",
            "syllableBreakdown": "op-er-at-ing ex-pense",
            "stressPattern": "Compound stress with primary stress on the initial syllable of 'operating' and secondary stress on the second syllable of 'expense': OP-er-at-ing ex-PENSE (/ˈɑː.pə.reɪ.tɪŋ ɪkˈspens/, ●○○○ ○●)",
            "commonMistakes": "Learners often misplace the primary stress onto 'expense' (*operating EX-pense*) or onto the second syllable of 'operating' (*o-PER-at-ing*). In standard corporate English, the first word takes primary compound stress on its initial syllable: /ˈɑː.pə.reɪ.tɪŋ/ (US) or /ˈɒp.ər.eɪ.tɪŋ/ (UK), followed by /ɪkˈspens/. A major conceptual mistake is conflating 'operating expenses' (OpEx: recurring day-to-day administrative and commercial costs like rent, payroll, and utilities) with 'capital expenditures' (CapEx: long-term investments in physical assets like real estate, machinery, or factories). Furthermore, note that while the general category is often pluralized ('operating expenses'), it is also commonly used in the singular ('a major operating expense')."
        },
        "etymology": {
            "origin": "Compound business term formed from the present participle 'operating' (from Latin operari, 'to work, labor', from opus, 'work') and 'expense' (from Anglo-Norman and Old French expense, from Late Latin expensa, feminine past participle of Classical Latin expendere, 'to weigh out, disburse')",
            "rootWord": "operari (to labor, be active) + expendere (to disburse, pay out, from ex- 'out' + pendere 'to hang, weigh')",
            "rootMeaning": "'Monetary funds weighed out and disbursed directly to maintain the continuous working and ongoing commercial labor of an enterprise'",
            "evolution": "The verb 'operate' derived from Latin operari via Late Latin operatus, entering English in the early 17th century to signify running a mechanism or producing an effect. The noun 'expense' entered Middle English in the 14th century through Anglo-Norman legal documents from Latin expendere (referring literally to coins weighed on scales for disbursement). During the mid-to-late 19th century, the expansion of commercial railways and industrial factory complexes necessitated a clear accounting demarcation between long-term capital investments (track laying, locomotives, plant building) and daily running outlays (coal, maintenance, conductor wages). The compound 'operating expense' (now universally abbreviated in corporate financial parlance as OpEx) was codified in early 20th-century cost accounting standards to measure core operational productivity before financing charges and taxation.",
            "relatedLanguages": [
                "French: charge d'exploitation / dépense de fonctionnement (operating expense, running cost)",
                "Spanish: gasto operativo / gasto de explotación (operating expense, operational cost)",
                "Italian: spesa operativa / costo operativo (operating expense)",
                "German: Betriebsausgabe / Betriebskosten (operating expense, operating cost)",
                "Portuguese: despesa operacional (operating expense)"
            ],
            "firstRecordedUse": "Late 19th century (circa 1880s in corporate railway ledgers and industrial accounting reports)"
        },
        "deepMeaning": {
            "coreConcept": "An essential, ongoing expenditure incurred in the regular day-to-day administration and commercial operation of an enterprise—encompassing payroll, office rent, utilities, insurance, maintenance, research and development, and marketing—which is subtracted directly from gross profit on the income statement to calculate operating income (EBIT), strictly differentiated from capital expenditures (CapEx) in long-term fixed assets.",
            "spatialContext": "Corporate accounting departments, enterprise resource planning (ERP) cost centers, financial controller workstations, regional branch administration offices, and quarterly earnings call conference rooms.",
            "temporalContext": "Incurred continuously on a daily basis, recognized monthly under accrual accounting ledgers, and audited on quarterly and annual financial statements (income statements / P&L).",
            "emotionalTone": "Fiscally disciplined, pragmatic, analytical, and vigilant; intrinsically tied to managerial scrutiny, cost containment, and operational efficiency.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "To a native corporate executive or financial analyst, 'operating expense' (routinely abbreviated as 'OpEx') represents the ongoing cost of 'keeping the lights on and engines turning'. Natives immediately conceptualize OpEx in direct contrast to CapEx (capital expenditures). While CapEx purchases durable physical assets that are capitalized and depreciated over several years on the balance sheet, OpEx is fully expensed in the current accounting period against current revenues. When executive leadership announces a goal to 'trim operating expenses', native managers instinctively evaluate office lease renegotiations, software subscription pruning, corporate travel limits, and administrative workflow automation.",
            "mentalImage": "A financial controller reviewing a detailed spreadsheet breakdown of monthly departmental overhead on a dual-monitor desktop workstation, analyzing line-item variances between budgeted and actual utilities, facility leases, and cloud hosting fees.",
            "whenToUse": "Use 'operating expense' (or 'operating expenses', 'OpEx') when referring to ongoing, day-to-day overhead and running costs essential to sustaining corporate operations. It is standard terminology in financial accounting, earnings reports, P&L discussions, and departmental budgeting.",
            "whenNotToUse": "Do not use 'operating expense' to describe major one-off investments in factory machinery, commercial building purchases, or company acquisitions (which are 'capital expenditures' or 'investments'). Furthermore, avoid classifying debt interest payments or corporate income taxes as operating expenses, as these belong below the operating income line (EBIT) as financing and tax costs.",
            "culturalContext": "In corporate finance and equity analysis across North American and Commonwealth markets, the Operating Expense Ratio (OER) is a primary barometer of executive competence. Analysts closely track whether revenue growth outpaces operating expense growth to identify operational leverage. In modern cloud enterprise computing, businesses have largely shifted technology budgeting from CapEx (purchasing on-premises servers) to OpEx (recurring monthly cloud SaaS subscriptions)."
        },
        "examples": {
            "daily": [
                "For a neighborhood specialty café, primary operating expenses include monthly commercial rent, barista hourly wages, dairy inventory, and electricity bills.",
                "The independent software consultant tracks her monthly design application subscriptions and high-speed internet bills as legitimate operating expenses for tax deductions.",
                "Installing smart thermostats and LED fixtures helped the commercial dry cleaner lower its monthly utility operating expense by twelve percent."
            ],
            "business": [
                "By consolidating regional customer service centers and automating ticket routing, the telecom firm reduced annual operating expenses by fourteen million dollars.",
                "The chief financial officer reported that escalating electricity tariffs and server hosting fees accounted for our fastest-growing operating expenses during the third quarter.",
                "Total operating expenses are subtracted directly from gross profit on the income statement to determine the enterprise's operating income before interest and taxes."
            ],
            "conversation": [
                "\"How did the retail division improve its operating margin when total sales remained virtually flat?\" — \"The store managers executed a strict overhead reduction initiative that decreased general operating expenses by nine percent.\"",
                "\"Should our department classify the purchase of twenty new laboratory spectrometers as an operating expense?\" — \"No, laboratory equipment exceeding five thousand dollars is classified as a capital expenditure and depreciated over seven years.\"",
                "\"Why did our administrative operating expenses increase so sharply toward the end of the fourth quarter?\" — \"We expanded our external cybersecurity audit team and rolled out specialized employee compliance training across all regional branches.\""
            ],
            "collocations": [
                "reduce operating expenses",
                "operating expense ratio",
                "cover operating expenses",
                "total operating expenses",
                "day-to-day operating expenses",
                "trim operating expenses"
            ]
        },
        "wordFamily": {
            "noun": "operating expense, operator, operation",
            "verb": "operate, expense",
            "adjective": "operational, operating, expensive",
            "adverb": "operationally, expensively"
        },
        "visual": {
            "imageKeyword": "operating expense income statement budget audit spreadsheet office desk",
            "imageDescription": "A modern executive desk with a digital tablet displaying an income statement table highlighting operating expenses, beside a financial ledger, a calculator, and a cup of coffee.",
            "mnemonic": "OP-EX: Expenses required to keep the business OPERATING day-to-day! If you halt paying them (rent, power, payroll), your operations immediately stop!"
        },
        "video": {
            "description": "A certified corporate accountant walking through an income statement line by line on a whiteboard, explaining how operating expenses (OpEx) differ fundamentally from Cost of Goods Sold and Capital Expenditures."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                7
            ],
            "exampleQuestion": "The regional director commended the logistics department for successfully curbing monthly _______ expenses through optimized delivery routing and fuel-efficiency protocols.\n(A) operate\n(B) operator\n(C) operating\n(D) operationally",
            "tips": "In TOEIC Part 5, business compound recognition is tested frequently. The blank precedes the noun 'expenses' and functions as a participial adjective modifier. The correct form is 'operating' (C), completing the foundational corporate finance compound 'operating expenses' (chi phí hoạt động). Choice (A) 'operate' is a base verb, (B) 'operator' is an agent noun (người vận hành), and (D) 'operationally' is an adverb that cannot directly modify 'expenses'."
        },
        "synonyms": [
            "overhead",
            "running costs",
            "operational expenditures",
            "OpEx",
            "day-to-day expenses",
            "current expenditure"
        ],
        "antonyms": [
            "capital expenditure",
            "CapEx",
            "capital investment",
            "non-operating expense"
        ],
        "relatedWords": [
            "overhead",
            "capital expenditure",
            "operating income",
            "EBIT",
            "income statement",
            "fixed cost",
            "variable cost"
        ]
    }
]

with open("scratch/finance_206_208.json", "w", encoding="utf-8") as f:
    json.dump({"words": words}, f, indent=4, ensure_ascii=False)

print("Saved scratch/finance_206_208.json successfully!")
