import json

words = [
    {
        "id": "finance-083",
        "word": "benchmark",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈbentʃ.mɑːrk/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/benchmark--_us_1.mp3",
            "syllableBreakdown": "bench·mark",
            "stressPattern": "●○",
            "commonMistakes": "Learners often soften the affricate /tʃ/ into a fricative /ʃ/ (saying 'bensh-mark') or omit the final unvoiced velar plosive /k/. In non-rhotic accents, the vowel in 'mark' is lengthened to /ɑː/ without the postvocalic /r/, but American business English articulates the retroflex /ɑːr/ distinctly."
        },
        "etymology": {
            "origin": "Compound of Middle/Old English 'bench' (benc, a raised stone or wooden support) and 'mark' (mearc, boundary, sign, or impression).",
            "rootWord": "benc + mearc",
            "rootMeaning": "A surveyor's horizontal notch cut into stone to support a leveling rod or bench",
            "evolution": "Originally a 19th-century land surveying term (first recorded c. 1838) denoting a chiseled groove cut into masonry to anchor an angle iron supporting a surveyor's measuring staff at a fixed elevation. In the 1970s, management scientists and corporate strategists (pioneered by Xerox) transferred the concept to business processes to signify an exemplary performance standard. In financial markets, it became the established term for a standard market index (e.g., S&P 500, MSCI EAFE) or interest rate used to gauge investment fund returns and assess managerial risk-adjusted performance.",
            "relatedLanguages": [
                "French: point de référence / indice de référence",
                "German: Richtwert / Bezugsgröße / Benchmark",
                "Spanish: punto de referencia / índice de referencia",
                "Italian: parametro di riferimento / benchmark"
            ],
            "firstRecordedUse": "Surveying: c. 1838; Financial and corporate performance standard: early 1970s"
        },
        "deepMeaning": {
            "coreConcept": "A standardized reference point, recognized market index, or operational standard of excellence against which the financial performance, investment yield, operating efficiency, or quality of other entities, assets, or portfolios are comparatively measured.",
            "spatialContext": "Asset management trading floors, institutional investment research terminals (Bloomberg/FactSet workstations), financial executive boardrooms, and corporate KPI analytics dashboards.",
            "temporalContext": "Quarterly investment portfolio reviews, annual fund manager performance appraisals, daily financial market closing index calculations, and multi-year corporate competitive re-evaluations.",
            "emotionalTone": "Analytical, objective, authoritative, and evaluative.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Native finance professionals treat a 'benchmark' as the indispensable comparative anchor: an absolute return percentage (e.g., 9%) is fundamentally meaningless until measured against its relevant benchmark index (e.g., if the benchmark gained 15%, the fund underperformed by 600 basis points). Instinctively, native speakers associate 'benchmark' with rigor, transparency, and fiduciary accountability—beating the benchmark justifies active management fees (alpha), while trailing it signals underperformance.",
            "mentalImage": "A portfolio manager in front of a dual-screen Bloomberg terminal pointing at a comparative line graph, tracking the upward trajectory of a high-yield tech fund against the dashed white baseline of the benchmark S&P 500 Index.",
            "whenToUse": "Use when referencing comparison standards for financial assets, market indices (e.g., S&P 500, SOFR), industry standard operational metrics (e.g., cost per acquisition, DSO), or establishing baseline quality thresholds in organizational audits.",
            "whenNotToUse": "Do not confuse with a 'target' or 'goal' (a target is an aspirational future objective, whereas a benchmark is a recognized, existing standard of measurement). Avoid confusing with a 'threshold' (a minimum pass/fail cutoff point).",
            "culturalContext": "In Anglo-American institutional finance, regulatory frameworks like ERISA and SEC disclosure mandates require mutual funds and pension plans to publish benchmark comparisons in prospectuses so retail and institutional investors can objectively assess management competence."
        },
        "examples": {
            "daily": [
                "Before renovating their kitchen, they researched regional remodeling costs to set a sensible budget benchmark.",
                "The high school used national standardized test results as a benchmark to assess the rigor of its new science curriculum.",
                "Completing a ten-kilometer run under fifty minutes served as her primary fitness benchmark before training for the half marathon."
            ],
            "business": [
                "The active equity fund posted an annual return of 14.8%, outperforming its benchmark Russell 2000 Index by nearly three hundred basis points.",
                "Our supply chain consultancy established operational cost benchmarks across twelve distribution facilities to identify warehouse inefficiencies.",
                "Following the regulatory discontinuation of LIBOR, global financial institutions adopted the Secured Overnight Financing Rate (SOFR) as the principal interest rate benchmark for corporate lending."
            ],
            "conversation": [
                "\"Our emerging markets fund gained eight percent this past fiscal quarter, but client sentiment remains lukewarm.\" / \"That's because the regional benchmark index jumped twelve percent during the same timeframe, so clients feel our active allocation lagged.\"",
                "\"How should we evaluate the pricing structure submitted by the third-party IT vendor?\" / \"Let's compare their proposed hourly rates against the industry benchmark figures in Gartner's latest procurement analysis.\""
            ],
            "collocations": [
                "benchmark index",
                "industry benchmark",
                "outperform the benchmark",
                "serve as a benchmark",
                "benchmark rate",
                "performance benchmark"
            ]
        },
        "wordFamily": {
            "noun": "benchmark",
            "verb": "benchmark",
            "adjective": "benchmarked"
        },
        "visual": {
            "imageKeyword": "financial analyst comparing portfolio performance benchmark line chart Bloomberg terminal",
            "imageDescription": "A financial analyst analyzing a dual-axis line chart on a high-resolution terminal, where a solid blue trend line representing fund performance is tracked against a dotted yellow baseline representing the market benchmark index.",
            "mnemonic": "A stone mason cuts a mark into a stone BENCH to establish a fixed level: a BENCH-MARK is the permanent reference mark against which all heights and performances are measured!"
        },
        "video": {
            "description": "An institutional investment explainer illustrating how asset managers select a benchmark index like the S&P 500 to evaluate portfolio risk, alpha generation, and tracking error."
        },
        "toeicContext": {
            "commonParts": [
                5,
                6,
                7
            ],
            "exampleQuestion": "Although the global equity fund achieved positive returns for two consecutive quarters, it failed to surpass the industry _____ established by leading institutional investors. (A) benchmark (B) benchmarks (C) benchmarked (D) benchmarking",
            "tips": "In TOEIC Part 5, identify the correct noun form functioning as the head of the noun phrase. Preceded by the definite article 'the' and the noun adjunct 'industry', and followed by the modifying past participle phrase 'established by...', the sentence requires the singular countable noun (A) 'benchmark'. Choice (B) is plural and does not fit the singular context; choice (C) is a past participle; and choice (D) is a gerund/participle."
        },
        "synonyms": [
            "yardstick",
            "reference standard",
            "touchstone",
            "gauge",
            "criterion",
            "barometer"
        ],
        "antonyms": [],
        "relatedWords": [
            "baseline",
            "index",
            "outperform",
            "tracking error",
            "alpha",
            "metric",
            "Key Performance Indicator (KPI)"
        ]
    },
    {
        "id": "finance-084",
        "word": "beneficiary",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "advanced",
        "toeicFrequency": 7,
        "pronunciation": {
            "ipa": "/ˌben.əˈfɪʃ.i.er.i/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/beneficiary--_us_1.mp3",
            "syllableBreakdown": "ben·e·fi·ci·ar·y",
            "stressPattern": "ˌ●○ˈ●○○○",
            "commonMistakes": "Learners frequently misplace the primary stress onto the fourth syllable (saying 'bene-fi-SHEE-ary') or articulate the 'ci' as /si/ rather than palatalizing it into the postalveolar fricative /ʃ/ ('fish'). Additionally, non-native speakers often confuse 'beneficiary' (the party receiving proceeds) with 'benefactor' (the party giving or funding them)."
        },
        "etymology": {
            "origin": "Borrowed from Anglo-Norman / Middle French 'bénéficiaire', from Late Latin 'beneficiārius' (one holding a privilege, exemption, or grant), derived from Latin 'beneficium' (kindness, favor, grant), compounded from 'bene' (well) and 'facere' (to do, make).",
            "rootWord": "bene + facere -> beneficium -> beneficiārius",
            "rootMeaning": "Doing well or doing good; one who receives a grant, favor, or property interest",
            "evolution": "In Roman military and imperial administration, a 'beneficiarius' was a soldier or official exempt from burdensome menial duties by special favor of a commander. In Medieval canon law, it evolved to designate a cleric holding an ecclesiastical benefice (church land generating income). By the 16th and 17th centuries, English courts of equity adapted the word into trust law to distinguish the 'trustee' (holding legal title) from the 'beneficiary' (holding equitable beneficial interest). During the 19th and 20th centuries, it became fundamental to life insurance contracts, estate planning, pension plans, and international banking (designating the receiving party of letters of credit and wire remittances).",
            "relatedLanguages": [
                "French: bénéficiaire",
                "Spanish: beneficiario",
                "Italian: beneficiario",
                "Portuguese: beneficiário",
                "German: Begünstigter / Bezugsberechtigter"
            ],
            "firstRecordedUse": "Ecclesiastical/legal treatises: early 17th century (c. 1605); Modern commercial trust law: late 17th century"
        },
        "deepMeaning": {
            "coreConcept": "A natural person, corporation, trust, or legal entity designated and legally entitled to receive assets, cash disbursements, insurance payouts, trust proceeds, or financial remittances from an estate, contract, pension, trust, or international payment instrument.",
            "spatialContext": "Estate planning law offices, commercial banking wire transfer operations rooms, insurance claims settlement departments, corporate HR benefits portals, and institutional trust wealth management suites.",
            "temporalContext": "Critical life milestones (starting a new corporate job, marriage, birth of children, retirement enrollment), annual benefits re-enrollment periods, probate execution upon a grantor's death, and immediate settlement of international trade letters of credit.",
            "emotionalTone": "Formal, fiduciary, protective, and legalistic.",
            "formalityLevel": "formal",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "To native speakers, 'beneficiary' immediately suggests formal legal or financial paperwork containing designated recipient lines—specifically life insurance policies, 401(k) accounts, and family trusts. Native speakers intuitively contrast 'beneficiary' with 'benefactor' (the provider/donor) and 'trustee' (the administrator/fiduciary). In corporate banking and global commerce, it is the universally recognized counterpart to the remitter/applicant on wire payments and documentary letters of credit.",
            "mentalImage": "An employee completing digital benefits enrollment on a corporate laptop, entering their spouse's full legal name and birthdate into the form field clearly labeled 'Primary Beneficiary (100%)' for the employer-paid life insurance policy.",
            "whenToUse": "Use when identifying parties entitled to inherit trust property, receive life insurance proceeds, collect pension distributions, or receive funds via wire transfers and commercial letters of credit.",
            "whenNotToUse": "Do not confuse with 'benefactor' (the individual or organization providing the donation or endowment). Do not use for casual, informal gift recipients (use 'recipient'). Do not confuse with 'dependent' (a dependent relies on you for daily living expenses for income tax purposes, whereas a beneficiary is legally designated to receive asset distributions).",
            "culturalContext": "In American corporate culture, updating one's 'beneficiary designations' on 401(k) and life insurance accounts is emphasized during annual open enrollment, as beneficiary designations legally supersede instructions in a standard will. In international trade under ICC UCP 600 rules, the 'Beneficiary' is the seller/exporter who receives payment once compliant shipping documents are presented."
        },
        "examples": {
            "daily": [
                "When opening his brokerage account, Marcus named his sister as the payable-on-death beneficiary.",
                "Following the birth of their twins, the couple updated their estate plan to designate the children as secondary beneficiaries.",
                "She contacted the customer service department to change the primary beneficiary on her individual retirement account."
            ],
            "business": [
                "The corporate human resources department reminded employees to review and update the designated beneficiary on their group term life insurance policies.",
                "Under the stipulations of the irrevocable trust, the corporate trustee must distribute quarterly dividend income to each named beneficiary until age twenty-five.",
                "The issuing bank verified that all required shipping documents matched the letter of credit terms before wiring payment to the overseas beneficiary."
            ],
            "conversation": [
                "\"Have you submitted your benefits enrollment forms for the upcoming fiscal year?\" / \"Almost done—I just need to input my spouse's information as the primary beneficiary on the corporate life insurance policy.\"",
                "\"Why was the international wire remittance held up by the compliance division?\" / \"The recipient bank reported that the legal entity name on the commercial invoice didn't exactly match the beneficiary name on the account.\""
            ],
            "collocations": [
                "designated beneficiary",
                "primary beneficiary",
                "contingent beneficiary",
                "sole beneficiary",
                "name a beneficiary",
                "beneficiary of a trust"
            ]
        },
        "wordFamily": {
            "noun": "beneficiary",
            "verb": "benefit",
            "adjective": "beneficial",
            "adverb": "beneficially"
        },
        "visual": {
            "imageKeyword": "signing life insurance policy document beneficiary designation pen table",
            "imageDescription": "A close-up shot of an executive signing an estate planning document on a polished walnut desk, with a silver fountain pen poised beside a section titled 'Designation of Primary Beneficiary' and 'Contingent Beneficiary'.",
            "mnemonic": "BENE means 'good' and -FICIARY means 'receiver': the BENEFICIARY is the legal person who receives the good payout!"
        },
        "video": {
            "description": "A corporate HR benefits and estate planning tutorial explaining the legal distinctions between primary and contingent beneficiaries for group life insurance and retirement plans."
        },
        "toeicContext": {
            "commonParts": [
                5,
                6,
                7
            ],
            "exampleQuestion": "Corporate policy requires all employees to designate a contingent _____ in their group life insurance file in the event that the primary recipient predeceases them. (A) beneficiary (B) beneficial (C) beneficially (D) benefit",
            "tips": "In TOEIC Part 5, test your understanding of derivational morphology following adjectives. The word 'contingent' is an adjective modifying the direct object of 'designate'. Therefore, a countable noun indicating a designated recipient is required: (A) 'beneficiary'. Choice (B) is an adjective; (C) is an adverb; and (D) is an abstract noun or verb that cannot logically be modified by 'contingent' to mean a designated person."
        },
        "synonyms": [
            "recipient",
            "payee",
            "heir",
            "inheritor",
            "assignee",
            "trust recipient"
        ],
        "antonyms": [
            "benefactor",
            "grantor",
            "settlor",
            "testator"
        ],
        "relatedWords": [
            "trustee",
            "inheritance",
            "fiduciary",
            "contingent",
            "annuity",
            "letter of credit",
            "probate"
        ]
    },
    {
        "id": "finance-085",
        "word": "billing",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈbɪl.ɪŋ/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/billing--_us_1.mp3",
            "syllableBreakdown": "bill·ing",
            "stressPattern": "●○",
            "commonMistakes": "Learners from languages without the short lax vowel /ɪ/ often pronounce the first syllable with a long tense vowel /iː/ (sounding like 'beeling'). Another frequent error is dropping the final velar nasal /ŋ/ to an alveolar /n/ ('billin''), or pausing unnaturally between the root and suffix."
        },
        "etymology": {
            "origin": "Formed in Middle/Early Modern English from the noun 'bill' (via Anglo-Norman and Old French 'bille', medieval Latin 'billa', from classical Latin 'bulla', meaning an inscribed amulet, round metal seal, or sealed papal decree) combined with the Germanic gerund/participial suffix '-ing'.",
            "rootWord": "bulla -> bille -> bill + -ing",
            "rootMeaning": "A sealed official document or list; the act of drawing up itemized accounts and demanding payment",
            "evolution": "In classical Latin, 'bulla' referred to a round metal medallion or seal attached to official decrees (such as a Papal Bull). In medieval Anglo-Norman legal drafting, 'bille' came to designate the parchment document itself, specifically a petition, formal list, or bond of debt. By the 15th century in London merchant guilds, a 'bill' designated an itemized invoice of goods delivered or debts owed. In the late 19th and early 20th centuries, with industrial utility expansion and modern corporate bookkeeping, 'billing' became an established mass noun designating the systematic process, schedule, and aggregate volume of invoicing customers.",
            "relatedLanguages": [
                "French: facturation",
                "Spanish: facturación",
                "Italian: fatturazione",
                "German: Rechnungsstellung / Abrechnung",
                "Portuguese: faturamento"
            ],
            "firstRecordedUse": "Late 19th century (c. 1875 in commercial bookkeeping manuals)"
        },
        "deepMeaning": {
            "coreConcept": "The operational accounting process, cycle, and administrative function of preparing, itemizing, dispatching, and tracking invoices or fee statements to customers for delivered products, contracted labor, or ongoing subscriptions, as well as the total monetary revenue charged in a given period.",
            "spatialContext": "Accounts receivable (AR) offices, medical billing departments, corporate shared service centers, SaaS billing administration portals (e.g., Stripe, NetSuite), and customer billing support centers.",
            "temporalContext": "Standard monthly closing billing runs (e.g., net-30 terms), bi-weekly professional services hour reconciliations, recurring subscription anniversary dates, and quarter-end fiscal cutoffs.",
            "emotionalTone": "Administrative, procedural, precise, and transactional.",
            "formalityLevel": "neutral",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Native English speakers perceive 'billing' in two primary dimensions: first, as an operational function or department ('contact billing for an adjusted statement'); and second, as an administrative cadence ('the monthly billing cycle'). In professional service industries (consulting, legal, engineering), 'billing' is directly tied to business survival and profitability, evoking 'billable hours', 'billing rates', and 'realization rates'. In consumer everyday life, it is intimately associated with the 'billing address' required to pass credit card security checks (AVS).",
            "mentalImage": "An accounts receivable specialist sitting at a dual-monitor workstation, matching digital purchase orders to delivery receipts before executing a batch export of electronic billing statements.",
            "whenToUse": "Use when discussing invoice generation, payment cycle timelines, customer accounts receivable workflows, credit card address verification, professional fee tracking, and billing dispute resolution.",
            "whenNotToUse": "Do not confuse with 'invoice' (an invoice is the individual document itself, whereas billing is the overall process, schedule, or collective volume). Do not confuse with 'payment' or 'remittance' (billing is the creditor's demand for payment, while remittance is the debtor's settlement of the debt).",
            "culturalContext": "In North American and global enterprise commerce, billing efficiency is a key financial metric tied to Days Sales Outstanding (DSO) and working capital liquidity. E-commerce systems universally mandate a 'billing address' matching the cardholder's bank file to prevent credit card fraud. In professional service firms, the pressure to maintain high 'billing' (billable hours) defines career progression for associates."
        },
        "examples": {
            "daily": [
                "Please verify that your billing address matches the postal address on file with your credit card issuer.",
                "She called customer support to clarify an unexpected service charge on her monthly internet billing.",
                "The gym membership agreement includes automated monthly billing on the first day of each calendar month."
            ],
            "business": [
                "By transitioning to an automated cloud billing system, the accounting department reduced invoicing delays and improved cash collections.",
                "Under the terms of the master service agreement, milestone billing will occur upon formal client sign-off on each project deliverable.",
                "The management consulting firm recorded record billings this past quarter due to heightened demand for digital transformation advisory services."
            ],
            "conversation": [
                "\"Our enterprise client called to contest an unexpected line item on their recent statement.\" / \"I will transfer their account manager to the billing department so we can review the contracted scope of work.\"",
                "\"Why has our accounts receivable balance increased so sharply this month?\" / \"A software migration temporarily halted our automated billing cycle for two weeks, delaying invoice delivery to clients.\""
            ],
            "collocations": [
                "billing cycle",
                "billing address",
                "billing department",
                "monthly billing",
                "automated billing",
                "billing discrepancy"
            ]
        },
        "wordFamily": {
            "noun": "billing",
            "verb": "bill",
            "adjective": "billable"
        },
        "visual": {
            "imageKeyword": "accounts receivable specialist processing electronic invoice billing statements computer",
            "imageDescription": "An accounts receivable specialist working in a modern office, cross-checking itemized digital invoices against client ledger entries on a desktop monitor before approving the monthly batch billing run.",
            "mnemonic": "BILL + ING: BILL is the itemized charge, and -ING is the continuous operational cycle of dispatching invoices to collect cash!"
        },
        "video": {
            "description": "An enterprise financial software tutorial demonstrating how an automated subscription billing system generates electronic invoices, collects recurring customer payments, and flags failed charges."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                7
            ],
            "exampleQuestion": "Due to a planned system maintenance window this weekend, subscribers may experience a temporary delay in their monthly _____ cycle. (A) billing (B) billed (C) bills (D) billable",
            "tips": "In TOEIC Part 5, test your knowledge of high-frequency business compound nouns. In the phrase 'monthly _____ cycle', the blank must be filled by the noun adjunct (A) 'billing' to form the standard collocation 'billing cycle' (the recurring period between invoice statements). Choice (B) is a past participle; choice (C) is a plural noun which is unidiomatic here (*bills cycle); and choice (D) 'billable' is an adjective that typically modifies hours or expenses (e.g., 'billable hours'). In Part 7, look out for customer service emails resolving 'billing errors' or 'billing inquiries'."
        },
        "synonyms": [
            "invoicing",
            "charging",
            "statement issuance",
            "accounts receivable processing",
            "fee assessment",
            "debiting"
        ],
        "antonyms": [
            "remittance",
            "settlement",
            "disbursement",
            "crediting"
        ],
        "relatedWords": [
            "invoice",
            "statement",
            "accounts receivable",
            "billable hours",
            "credit memo",
            "payment gateway",
            "Days Sales Outstanding (DSO)"
        ]
    }
]

with open("scratch/finance_083_085.json", "w", encoding="utf-8") as f:
    json.dump({"words": words}, f, indent=2, ensure_ascii=False)

print("Generated scratch/finance_083_085.json successfully with 3 words.")
