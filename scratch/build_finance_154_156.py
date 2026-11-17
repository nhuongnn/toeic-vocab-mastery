import json

words_data = [
    {
        "id": "finance-154",
        "word": "fraud",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/frɔːd/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/fraud--_us_1.mp3",
            "syllableBreakdown": "fraud",
            "stressPattern": "●",
            "commonMistakes": "Learners often mispronounce the vowel digraph 'au' as a German or Spanish-style diphthong /aʊ/ (rhyming with 'crowd' or 'loud'), producing */fraʊd/ instead of the standard open-mid back vowel /frɔːd/ (rhyming with 'broad' or 'flawed'). In business discussions, non-native speakers also frequently confuse 'fraud' (a deliberate, criminal deception designed to illicitly obtain money or property) with non-criminal accounting errors, bookkeeping discrepancies, or simple regulatory non-compliance. Furthermore, 'fraud' should not be used as an informal synonym for petty consumer complaints or minor contractual disputes."
        },
        "etymology": {
            "origin": "Middle English 'fraude', borrowed from Old French 'fraude' ('deceit, trickery, fraud'), derived from Latin 'fraus' (genitive 'fraudis', meaning 'deceit, trickery, injury, delusion, or dishonesty').",
            "rootWord": "Latin fraus (deliberate deceit, injury, or treachery)",
            "rootMeaning": "'Intentional deceit or trickery committed to cause damage or achieve illicit gain'",
            "evolution": "In classical Roman jurisprudence, 'fraus' designated intentional trickery, bad faith, or wrongful harm that invalidated legal agreements. The term entered Anglo-Norman and Middle English legal courts around the mid-14th century to identify criminal deception resulting in financial deprivation. By the 18th and 19th centuries, English common law and mercantile courts formalized 'fraud' into civil liability (misrepresentation inducing a contract) and criminal offenses (forgery, embezzlement, securities manipulation, and corporate financial statement fabrication).",
            "relatedLanguages": [
                "French: fraude",
                "Spanish: fraude",
                "Italian: frode",
                "German: Betrug / Untreue"
            ],
            "firstRecordedUse": "Mid-14th century (c. 1350-1375, in Middle English legal statutes and literary records)"
        },
        "deepMeaning": {
            "coreConcept": "The intentional perversion of truth, deliberate deception, or illicit concealment of material facts designed to unlawfully deprive an individual or enterprise of money, property, or legal rights, or to secure an unfair, dishonest financial advantage.",
            "spatialContext": "Corporate forensic auditing suites, commercial bank risk and compliance departments, securities regulatory enforcement chambers (such as the SEC), courtroom witness stands, and internal whistleblower verification units.",
            "temporalContext": "During quarterly forensic audit reconciliations, unexpected whistleblower disclosures, post-merger due diligence discoveries, and continuous automated transaction monitoring cycles.",
            "emotionalTone": "Severe, accusatory, legally binding, highly scrutinized, and ethically damning.",
            "formalityLevel": "formal",
            "connotation": "negative"
        },
        "nativeMindset": {
            "howNativesThink": "To a native English speaker in finance and corporate governance, 'fraud' instantly connotes intentionality and criminal culpability. Unlike an innocent clerical error, mathematical miscalculation, or poor business judgment, fraud requires 'mens rea' (a deliberate intent to deceive). Natives instinctively associate the word with corporate scandals (such as Enron, WorldCom, or Wirecard), forensic accountants scouring balance sheets, whistleblower reports, and frozen bank assets. In corporate policies and banking communications, 'fraud' is treated as an existential risk requiring biometric security, dual controls, and rigid compliance safeguards.",
            "mentalImage": "A senior forensic auditor in an archive room illuminated by fluorescent lights, cross-referencing falsified bank reconciliation statements with phantom vendor invoices marked with red 'FLAGGED - SUSPECT TRANSACTION' stamps, alongside compliance attorneys reviewing digital audit logs.",
            "whenToUse": "Use when identifying deliberate criminal deceit, falsified accounting records, unauthorized credit card transactions, identity theft, counterfeit billing schemes, or securities manipulation in corporate, banking, and legal contexts.",
            "whenNotToUse": "Do not use to describe unintentional bookkeeping mistakes or computational blunders (use 'accounting error', 'clerical oversight', or 'ledger discrepancy'), lawful but aggressive tax planning (use 'tax minimization' or 'tax avoidance'), or minor customer service misunderstandings.",
            "culturalContext": "In the United States, landmark corporate accounting scandals prompted the passage of the Sarbanes-Oxley Act of 2002, which introduced severe criminal penalties for corporate fraud and mandated strict internal accounting controls. In the TOEIC exam, 'fraud' frequently appears in Part 3 and Part 7 texts dealing with corporate security protocols, automated credit card transaction alerts, identity theft prevention notices, and forensic audit reports."
        },
        "examples": {
            "daily": [
                "The bank's fraud detection team immediately froze my credit card after noticing three unauthorized transactions from an unfamiliar location.",
                "Consumers are advised to check their credit reports at least once a year to guard against identity fraud and fraudulent loan applications.",
                "Local police warned residents to beware of an online rental fraud where deceptive listings demanded upfront security deposits for non-existent apartments."
            ],
            "business": [
                "An exhaustive forensic audit uncovered that the regional subsidiary had committed securities fraud by booking fictitious sales revenues over several quarters.",
                "To curb payment fraud, the multinational treasury mandated dual cryptographic approval for all outbound international wire transfers exceeding ten thousand dollars.",
                "The corporate board appointed a special independent committee to investigate whistleblower allegations of procurement fraud within the logistics division."
            ],
            "conversation": [
                "\"Our merchant payment gateway flagged three consecutive chargebacks from the same overseas IP address.\" / \"We should lock the corresponding customer accounts immediately and report the incident to our fraud prevention team.\"",
                "\"Why are the external auditors reviewing all physical warehouse receipts from the third quarter?\" / \"They uncovered evidence of systematic billing fraud involving phantom suppliers and falsified delivery notes.\"",
                "\"Has the company completed rolling out the new security tokens to all remote employees?\" / \"Yes, the IT department mandated two-step verification to protect our corporate banking portals against credential fraud.\""
            ],
            "collocations": [
                "commit fraud",
                "detect fraud",
                "fraud prevention",
                "accounting fraud",
                "corporate fraud",
                "wire fraud"
            ]
        },
        "wordFamily": {
            "noun": "fraud, fraudster, fraudulence",
            "verb": "defraud",
            "adjective": "fraudulent",
            "adverb": "fraudulently"
        },
        "visual": {
            "imageKeyword": "forensic auditor inspecting suspicious financial ledger with magnifying glass and red flagged stamps",
            "imageDescription": "A forensic auditor examining fraudulent invoice entries in a corporate balance sheet through a magnifying glass, alongside bank statements stamped with a red 'FRAUD DETECTED' seal.",
            "mnemonic": "FRAUD: When an executive FAILS to uphold honesty and deliberately Robs Assets Under Deception, it is FRAUD!"
        },
        "video": {
            "description": "An investigative corporate governance documentary illustrating how forensic accountants and internal auditors identified fictitious revenue entries and complex invoice fraud inside a publicly traded company."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                7
            ],
            "exampleQuestion": "To safeguard client accounts against unauthorized transactions, the financial institution recently established an advanced _____ prevention unit equipped with real-time automated monitoring tools.\n(A) fraud\n(B) fraudulent\n(C) fraudulently\n(D) defrauded",
            "tips": "In TOEIC Part 5, test developers regularly examine noun adjuncts modifying following nouns in corporate settings. In the compound phrase '_____ prevention unit', the blank functions as a noun modifying 'prevention unit'. Therefore, the noun (A) 'fraud' is correct, forming the standard institutional collocation 'fraud prevention unit'. Choice (B) is an adjective, (C) is an adverb, and (D) is a past participle/verb form."
        },
        "synonyms": [
            "deception",
            "swindle",
            "misrepresentation",
            "illicit deceit",
            "forgery",
            "embezzlement"
        ],
        "antonyms": [
            "honesty",
            "integrity",
            "transparency",
            "authenticity",
            "probity"
        ],
        "relatedWords": [
            "whistleblower",
            "forensic audit",
            "collusion",
            "misappropriation",
            "compliance",
            "money laundering",
            "falsification"
        ]
    },
    {
        "id": "finance-155",
        "word": "fund",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/fʌnd/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/fund--_us_1.mp3",
            "syllableBreakdown": "fund",
            "stressPattern": "●",
            "commonMistakes": "Learners often substitute the short open-mid back unrounded vowel /ʌ/ (the 'strut' vowel) with the near-close near-back rounded vowel /ʊ/ (as in 'put' or 'foot'), pronouncing it */fʊnd/, or with the open rounded vowel /ɒ/ (as in British 'fond'), leading to confusion between 'fund' (/fʌnd/) and 'fond' (/fɒnd/). In corporate contexts, non-native speakers also frequently confuse the singular countable noun 'fund' (a dedicated pool or investment entity, such as an emergency fund, mutual fund, or pension fund) with the plural noun 'funds' (available liquid cash resources) or the uncountable process noun 'funding' (the act or mechanism of providing capital)."
        },
        "etymology": {
            "origin": "Borrowed from French 'fond' ('bottom, foundation, capital, stock of goods'), derived from Latin 'fundus' ('bottom, base, foundation, piece of land, rural estate').",
            "rootWord": "Latin fundus (bottom, base, foundational estate)",
            "rootMeaning": "'A solid base, bottom, or foundational reservoir of resources'",
            "evolution": "In classical Latin, 'fundus' denoted the bottom or base of a physical structure, or an immovable rural farmstead providing the bedrock of family wealth. In Old and Middle French, 'fond' developed an extended mercantile sense of foundational stock, store of goods, or capital assets. The word was adopted into English during the late 17th century (c. 1665) to designate permanent government debts secured by tax revenues ('the Public Funds'), and soon expanded into general financial usage to signify any dedicated pool of capital earmarked for a specific expenditure, giving rise to investment trusts, mutual funds, and corporate reserves.",
            "relatedLanguages": [
                "French: fonds / fondation",
                "Spanish: fondo",
                "Italian: fondo",
                "German: Fonds / Stiftungskapital"
            ],
            "firstRecordedUse": "Late 17th century (c. 1665, in British parliamentary acts establishing national debt revenues)"
        },
        "deepMeaning": {
            "coreConcept": "A distinct sum or pool of money deliberately set aside, dedicated, or accumulated for a designated purpose, project, or beneficiary, or an institutional investment vehicle that aggregates capital from multiple investors to acquire securities, bonds, or other financial assets.",
            "spatialContext": "Institutional investment firm headquarters, municipal treasury offices, university endowment investment boards, commercial bank trust divisions, and corporate controller workstations.",
            "temporalContext": "Annual endowment distributions, quarterly mutual fund portfolio balancing cycles, corporate venture fund allocations, and emergency capital release events.",
            "emotionalTone": "Disciplined, structured, secure, forward-looking, and legally earmarked.",
            "formalityLevel": "formal",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "To a native English speaker, 'fund' conveys an intentional, designated pool of capital governed by a clear mandate. A fund rarely exists in the abstract; it is always tied to an explicit mission—a 'pension fund' exists to support retired employees, an 'emergency fund' provides a personal safety net during income loss, a 'slush fund' carries illicit connotations of bribery or unaccounted expenditures, and an 'index fund' offers passive exposure to equity markets. In the plural ('funds'), natives mean spendable cash on hand (e.g. 'insufficient funds'). Grammatically, native speakers distinguish precisely between the container ('the fund'), the money inside it ('funds'), and the act of providing capital ('funding').",
            "mentalImage": "An investment committee assembled in a glass-walled conference room overlooking a metropolis, reviewing real-time asset allocations for a five-hundred-million-dollar pension fund distributed across government treasury bonds, infrastructure trusts, and blue-chip equities.",
            "whenToUse": "Use when referring to a dedicated pool of money earmarked for a specified objective (such as an emergency fund, retirement fund, petty cash fund, or scholarship fund) or an institutional investment vehicle (such as an index fund, mutual fund, hedge fund, or sovereign wealth fund).",
            "whenNotToUse": "Do not use 'a fund' as an uncountable mass noun when referring to generic liquid bank balances (use plural 'funds' or 'liquid cash'), and avoid using it to designate an everyday individual checking account unless that account is formally restricted under trust or corporate governance rules.",
            "culturalContext": "In North American and British personal finance, accumulating an emergency fund of three to six months' living expenses is considered the bedrock of financial security, while institutional pension funds and mutual funds manage trillions of dollars in collective employee retirement savings. In the TOEIC exam, 'fund' appears constantly in Part 3 and Part 4 announcements and Part 7 texts concerning corporate retirement plans, community development grants, and capital improvement budgets.",
        },
        "examples": {
            "daily": [
                "Financial planners advise households to build an emergency fund equal to at least six months of essential living expenses.",
                "The community center launched a neighborhood donation fund to help restore the historic downtown library after the flood.",
                "To prepare for long-term retirement, Marcus automatically transfers ten percent of his monthly salary into a diversified index fund."
            ],
            "business": [
                "The board of trustees voted unanimously to allocate eight percent of the university endowment fund toward green technology research.",
                "Our private equity partner announced the closing of a two-hundred-million-dollar venture capital fund targeting early-stage logistics platforms.",
                "The corporate treasurer established a contingency fund of five million dollars to buffer against international currency fluctuations."
            ],
            "conversation": [
                "\"Which investment vehicle did you select for your voluntary retirement savings?\" / \"I allocated seventy percent to a broad market index fund and thirty percent to a municipal bond fund.\"",
                "\"Does the administrative department have sufficient reserves in the equipment replacement fund?\" / \"Yes, there is currently fifty thousand dollars set aside to upgrade our office printing and scanning hardware.\"",
                "\"Has the municipal council authorized expenditures from the infrastructure revitalization fund?\" / \"The committee approved releasing twelve million dollars this morning to begin resurfacing regional transit routes.\""
            ],
            "collocations": [
                "emergency fund",
                "pension fund",
                "mutual fund",
                "hedge fund",
                "slush fund",
                "index fund"
            ]
        },
        "wordFamily": {
            "noun": "fund, funding, fundraiser",
            "verb": "fund, refund",
            "adjective": "funded, fundable",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "glass jar labeled emergency fund filled with coins beside investment growth chart on tablet",
            "imageDescription": "A close-up photograph of a clear glass savings jar marked 'Contingency Fund' containing neatly stacked coins and currency, positioned beside a digital tablet displaying an ascending mutual fund investment graph.",
            "mnemonic": "FUND: The FOUNDATION of every sound financial enterprise is a well-maintained FUND of capital!"
        },
        "video": {
            "description": "An institutional finance educational tutorial analyzing the governance, portfolio diversification rules, and fiduciary duties associated with operating corporate pension funds and mutual funds."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                7
            ],
            "exampleQuestion": "Employees enrolled in the corporate retirement program may allocate their monthly contributions among several mutual _____ managed by Vanguard Global.\n(A) funding\n(B) funded\n(C) funds\n(D) funder",
            "tips": "In TOEIC Part 5, test items frequently test common compound nouns and plural count noun agreement in employee compensation and finance. 'Mutual fund' is an established financial compound noun. Following the quantifier 'several', the countable noun requires the plural form 'funds' (choice C). Choice (A) 'funding' is an uncountable gerund/noun meaning financial support; (B) 'funded' is a past participle; and (D) 'funder' refers to a person or financing sponsor."
        },
        "synonyms": [
            "capital pool",
            "financial reserve",
            "endowment",
            "trust",
            "kitty",
            "treasury"
        ],
        "antonyms": [
            "debt",
            "deficit",
            "liability",
            "overdraft"
        ],
        "relatedWords": [
            "allocation",
            "portfolio",
            "endowment",
            "fiduciary duty",
            "liquidity",
            "capital expenditure",
            "trustee"
        ]
    },
    {
        "id": "finance-156",
        "word": "funding",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈfʌn.dɪŋ/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/funding--_us_1.mp3",
            "syllableBreakdown": "fund·ing",
            "stressPattern": "●○",
            "commonMistakes": "Learners often place excessive secondary stress on the unstressed inflectional suffix '-ing', articulating */ˈfʌnˈdɪŋ/ instead of keeping primary trochaic stress strictly on the initial syllable (/ˈfʌn.dɪŋ/). A very common grammatical error is treating 'funding' as a countable noun with an indefinite article (e.g. saying *'we received a funding'* instead of the correct *'we secured funding'* or *'we received a grant'*). Non-native speakers also frequently confuse 'funding' (the uncountable provision of financial backing or money supplied for a project) with 'fund' (the countable entity or pooled repository holding money)."
        },
        "etymology": {
            "origin": "Formed in Modern English from the verb 'fund' (derived from French 'fond', from Latin 'fundus' meaning 'base, bottom, foundation') combined with the Germanic verbal noun suffix '-ing' (from Old English '-ing' / '-ung').",
            "rootWord": "Latin fundus (base, foundation) + Old English -ing (action, process, or result of)",
            "rootMeaning": "'The act, process, or condition of providing foundational financial backing to an enterprise'",
            "evolution": "While the verb 'to fund' gained traction in 18th-century Britain regarding managing and backing the national debt, the verbal mass noun 'funding' surged into standard English during the mid-20th century. Its prominence grew rapidly alongside the postwar expansion of university scientific research grants, government infrastructure subsidies, and institutional venture capital rounds, coming to signify the systematic provision of monetary backing necessary to execute initiatives and sustain organizations.",
            "relatedLanguages": [
                "French: financement",
                "Spanish: financiación / financiamiento",
                "Italian: finanziamento",
                "German: Finanzierung / Fördermittel"
            ],
            "firstRecordedUse": "Early 20th century (c. 1910-1925, in institutional budgeting, academic grant allocations, and public finance reports)"
        },
        "deepMeaning": {
            "coreConcept": "Financial resources or capital provided by an organization, governmental agency, financial institution, or private investor for a designated initiative or operation; the formal act or ongoing process of securing, allocating, and dispensing monetary backing to support projects, scientific research, or business expansion.",
            "spatialContext": "Venture capital pitch boardrooms, governmental grant evaluation committees, corporate R&D budgeting suites, university research laboratories, and startup incubator headquarters.",
            "temporalContext": "During annual grant application cycles, corporate fiscal budget reviews, venture capital financing rounds (Seed, Series A, Series B), and municipal bond issuance meetings.",
            "emotionalTone": "Vital, enabling, competitive, goal-oriented, and resource-securing.",
            "formalityLevel": "formal",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "To a native English speaker, 'funding' is the essential lifeblood that transforms ambitious concepts into operational reality. Without funding, scientific studies pause, tech startups exhaust their cash runway, and public programs terminate. Psychologically, native speakers treat 'funding' as an uncountable, prized asset: you 'seek funding', 'secure funding', 'cut funding', or 'divert funding'. The milestone 'funding secured' signals that the primary obstacle to execution has been removed. Natives naturally differentiate 'funding' (outside institutional or investor support) from ordinary commercial operating revenue generated from sales.",
            "mentalImage": "An enthusiastic team of biomedical software developers and startup founders in front of a conference room presentation screen, high-fiving as they receive an official electronic letter confirming a four-million-dollar government grant for clinical innovation.",
            "whenToUse": "Use when discussing monetary capital or financial backing supplied for research projects, startup growth, public works, educational programs, or nonprofit initiatives (e.g. 'federal funding', 'seed funding', 'grant funding', 'crowdfunding').",
            "whenNotToUse": "Do not treat 'funding' as a countable noun (never say 'three fundings' or 'a funding'; use 'three grants', 'three funding rounds', or 'a round of funding'). Do not use 'funding' for routine personal consumer spending (use 'allowance', 'spending money', or 'personal savings').",
            "culturalContext": "In Silicon Valley and modern innovation hubs, the venture capital 'funding round' is a defining cultural and economic rite of passage, determining which technologies scale into global enterprises. In public policy, allocating federal funding shapes healthcare, education, and transportation infrastructure. In the TOEIC exam, 'funding' frequently features in Part 3 and Part 7 passages involving municipal project approvals, corporate sponsorships, research grants, and budget reduction memos."
        },
        "examples": {
            "daily": [
                "The community youth theater will be forced to cancel its summer workshop unless it receives additional funding from local sponsors.",
                "Many independent documentary filmmakers rely on online crowdfunding to cover their equipment rentals and post-production editing costs.",
                "The state legislature approved emergency funding to rebuild community bridges damaged by severe spring flooding."
            ],
            "business": [
                "Novalis Therapeutics secured twenty-five million dollars in Series B funding to accelerate clinical development of its autoimmune therapy.",
                "Due to municipal budget cuts, the metropolitan transit authority announced plans to reduce funding for weekend commuter rail services.",
                "The multinational corporation confirmed that ongoing funding for the artificial intelligence lab would be tied to verifiable commercial milestones."
            ],
            "conversation": [
                "\"Has the venture capital syndicate finalized the terms for our next round of funding?\" / \"Yes, their partners agreed to lead an eight-million-dollar Series A round, and the final term sheet should arrive tomorrow.\"",
                "\"Why was the corporate mentorship initiative postponed until the third quarter?\" / \"The finance director had to temporarily divert funding to address critical server infrastructure upgrades.\"",
                "\"Are our research scientists eligible to submit a grant application for the clean energy initiative?\" / \"Yes, but the deadline to submit our formal funding proposal to the Department of Energy is next Friday at five o'clock.\""
            ],
            "collocations": [
                "secure funding",
                "seek funding",
                "cut funding",
                "government funding",
                "seed funding",
                "receive funding"
            ]
        },
        "wordFamily": {
            "noun": "funding, fund, funder",
            "verb": "fund, refund",
            "adjective": "funded, self-funding, underfunded",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "biotech founders smiling shaking hands with venture capital investor signing funding term sheet",
            "imageDescription": "Two technology startup co-founders enthusiastically shaking hands with a venture capital partner across a modern wooden conference table after signing a multi-million-dollar funding agreement.",
            "mnemonic": "FUNDING: The act of put-ING a solid financial FUND beneath your dream to help it take off!"
        },
        "video": {
            "description": "A venture finance masterclass explaining the mechanics of startup funding rounds, from angel syndicates and convertible notes to institutional Series A term sheets."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                7
            ],
            "exampleQuestion": "The executive committee will review the department's proposal next Tuesday before deciding whether to approve additional _____ for the cybersecurity overhaul.\n(A) funder\n(B) funding\n(C) fundable\n(D) funded",
            "tips": "In TOEIC Part 5, test questions frequently require choosing the correct noun derivative following a transitive verb and an adjective modifier. The transitive verb 'approve' and modifier 'additional' require an uncountable head noun representing financial capital. Choice (B) 'funding' correctly completes the sentence to mean 'additional financial support'. Choice (A) 'funder' refers to a sponsor or financing entity; (C) 'fundable' is an adjective; and (D) 'funded' is a past participle."
        },
        "synonyms": [
            "financial backing",
            "capitalization",
            "monetary support",
            "financing",
            "subsidy",
            "grant aid"
        ],
        "antonyms": [
            "defunding",
            "divestment",
            "withholding of funds",
            "budget cuts"
        ],
        "relatedWords": [
            "venture capital",
            "grant proposal",
            "seed round",
            "subsidies",
            "sponsorship",
            "disbursement",
            "runway"
        ]
    }
]

output_path = "scratch/finance_154_156.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump({"words": words_data}, f, indent=4, ensure_ascii=False)

print(f"Wrote {len(words_data)} words to {output_path}")
