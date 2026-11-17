import json

entries = [
    {
        "id": "finance-111",
        "word": "credit",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/ˈkrɛd.ɪt/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/credit--_us_1.mp3",
            "syllableBreakdown": "cred-it",
            "stressPattern": "primary stress on the first syllable (CRED-it)",
            "commonMistakes": "Learners frequently mispronounce the first vowel /ɛ/ as a tense /eɪ/ (*cray-dit*) or replace the unstressed short /ɪ/ in the second syllable with an overly enunciated /iː/ (*cred-eet*). In accounting and banking contexts, non-native speakers also frequently confuse 'credit' with 'debit' (an accounting entry representing an asset or expense increase) or mistakenly assume 'credit' refers exclusively to physical plastic payment cards rather than borrowing capacity or vendor trade terms."
        },
        "etymology": {
            "origin": "Middle French 'crédit' (belief, trust, loan), borrowed via Italian 'credito', directly from Latin 'crēditum' (a loan, a thing entrusted to another), the neuter past participle of 'crēdere' (to trust, entrust, believe).",
            "rootWord": "Latin 'crēdere' (to trust, believe, place confidence in), formed from Proto-Indo-European *ḱred-dʰē- ('to put one's heart into', from *ḱerd- [heart] + *dʰē- [to place, set])",
            "rootMeaning": "'crēdere' (to trust or place confidence in) — fundamentally signifying the institutional faith or financial trust placed in a debtor that borrowed funds or delivered merchandise will be repaid in full",
            "evolution": "Entering Middle English in the early 15th century as a term for 'belief, faith, or personal credibility'. By the mid-16th century, commercial expansion across Renaissance Europe extended the word to mercantile transactions: the trust permitting a merchant to acquire goods without immediate cash settlement. By the late 16th century, it was formalized in Venetian double-entry bookkeeping as the right-hand ledger entry ('credit' / 'avere'). In modern banking and corporate finance, it encapsulates borrowing capacity, revolving debt facilities, credit ratings, and trade financing (net terms).",
            "relatedLanguages": [
                "French: crédit (loan, credit facility, reputation)",
                "Italian: credito (credit, loan, claims, faith)",
                "Spanish: crédito (credit, loan, standing, reputation)",
                "German: Kredit (loan, commercial credit, borrowing facility)"
            ],
            "firstRecordedUse": "Early 15th century (as 'trust/belief'); mid-16th century (in commercial banking, loans, and double-entry bookkeeping)"
        },
        "deepMeaning": {
            "coreConcept": "A contractual arrangement whereby a borrower or purchaser obtains money, goods, or services upfront based on the legal commitment that repayment will occur at a future date; in accounting, a bookkeeping entry on the right side of a ledger account that increases liabilities, equity, or revenue, or decreases assets and expenses; more broadly, an entity's established financial standing, reliability, and borrowing capacity.",
            "spatialContext": "Commercial banking underwriting suites, corporate treasury workstations, accounts payable and accounts receivable reconciliation systems, credit rating agency offices (Moody's, S&P), and retail checkout terminals.",
            "temporalContext": "Continuous during vendor invoice payment cycles (e.g., Net 30 or Net 60 terms), quarterly debt facility evaluations, and annual corporate creditworthiness reviews.",
            "emotionalTone": "Analytical, prudent, authoritative, and trust-oriented.",
            "formalityLevel": "formal",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "Native speakers perceive 'credit' primarily through the lens of trust, solvency, and commercial leverage. In everyday personal finance, 'credit' instinctively triggers thoughts of credit scores (FICO score), credit limits, and credit card balances. In a corporate executive setting, native speakers view credit as vital operational liquidity: having strong credit or an active line of credit allows an enterprise to fund working capital, weather seasonal downturns, bridge receivables gaps, and negotiate advantageous trade terms without depleting cash reserves.",
            "mentalImage": "A corporate treasurer and a commercial bank loan officer seated across a conference desk reviewing a multi-million-dollar syndicated revolving line of credit agreement alongside projected cash-flow spreadsheets.",
            "whenToUse": "Use when referencing borrowing power, credit ratings, revolving lines of credit, commercial supplier trade terms ('buy on credit', 'extend credit to clients'), store merchandise refunds ('store credit'), or double-entry bookkeeping entries ('post a credit to accounts payable').",
            "whenNotToUse": "Do not use 'credit' when referring to actual hard currency in hand (use 'cash' or 'liquid funds'). Do not confuse the financial noun 'credit' with academic course units ('earned 3 college credits') or creative attribution ('give credit to the design team') unless those specific figurative senses are explicitly intended; in accounting, never confuse 'credit' with 'debit'.",
            "culturalContext": "In Western market economies, credit is the essential engine of business operations and consumer commerce. From corporate credit ratings (investment grade vs. speculative junk status) that determine borrowing costs across international bond markets to consumer credit scores governing mortgage approvals, creditworthiness is equated with economic viability and institutional integrity. In commercial supply chains, trade credit (such as 2/10 Net 30) accounts for the vast majority of business-to-business transactions."
        },
        "examples": {
            "daily": [
                "After maintaining a flawless repayment history for five consecutive years, Sophia saw her credit score rise into the excellent tier.",
                "The department store customer service desk issued me a fifty-dollar store credit after I returned the defective blender without a paper receipt.",
                "Before approving the lease application for the downtown apartment, the property management firm conducted a comprehensive credit check."
            ],
            "business": [
                "To support its rapid international expansion, the manufacturing corporation secured a twenty-million-dollar revolving line of credit from its primary commercial lender.",
                "The finance committee agreed to extend thirty-day trade credit to the regional distributor after thoroughly reviewing their audited balance sheet.",
                "A sudden downgrade in the corporation's credit rating by major rating agencies substantially increased the interest rates on its newly issued corporate bonds."
            ],
            "conversation": [
                "\"Has the commercial lender approved our application for the revolving line of credit?\" \"Yes, the credit analyst confirmed this morning that our five-million-dollar facility was authorized at an interest rate of four point two percent.\"",
                "\"Can we offer net-60 payment terms to the overseas supplier on this procurement contract?\" \"Not immediately; corporate policy mandates that our treasury department verify their credit references before we extend commercial credit.\"",
                "\"I noticed an unexplained entry on our July vendor billing statement.\" \"That is a five-hundred-dollar credit issued by the manufacturer to reimburse us for freight damage on the previous delivery.\""
            ],
            "collocations": [
                "line of credit",
                "credit rating",
                "credit limit",
                "extend credit",
                "credit score",
                "credit facility"
            ]
        },
        "wordFamily": {
            "noun": "credit, creditor, creditworthiness, accreditation",
            "verb": "credit",
            "adjective": "creditworthy, creditable, credited",
            "adverb": "creditably"
        },
        "visual": {
            "imageKeyword": "corporate credit agreement handshake banker executive financial desk",
            "imageDescription": "A commercial banker and a corporate finance director shaking hands across a boardroom table with an approved multi-million-dollar credit agreement, financial charts, and a fountain pen resting on the document.",
            "mnemonic": "CREDIT comes from Latin CREDERE ('to believe, trust'): When a bank gives you CREDIT, they BELIEVE you are honest and TRUST you will repay every dollar."
        },
        "video": {
            "description": "A Bloomberg financial documentary breaking down how corporate credit ratings work, examining how rating agencies evaluate sovereign and corporate debt, and demonstrating the operational mechanics of revolving credit facilities."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                7
            ],
            "exampleQuestion": "To finance the acquisition of state-of-the-art warehouse equipment, Apex Logistics successfully negotiated a ten-million-dollar revolving _____ of credit with a consortium of commercial lenders. (A) term (B) line (C) mark (D) rate",
            "tips": "In TOEIC Part 5, high-frequency corporate financial collocations are regularly tested. The compound noun 'line of credit' is an established financial term designating an approved credit facility allowing a company to borrow funds up to a set limit as needed. While 'interest rate' and 'payment terms' are common business terms, neither collocates grammatically with 'of credit' in this sentence structure."
        },
        "synonyms": [
            "borrowing capacity",
            "financing facility",
            "loan facility",
            "trade credit",
            "financial standing"
        ],
        "antonyms": [
            "debit",
            "cash payment",
            "insolvency",
            "default"
        ],
        "relatedWords": [
            "creditworthiness",
            "liquidity",
            "revolving loan",
            "credit limit",
            "collateral",
            "interest rate",
            "balance sheet"
        ]
    },
    {
        "id": "finance-112",
        "word": "creditor",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈkrɛd.ɪ.tər/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/creditor--_us_1.mp3",
            "syllableBreakdown": "cred-i-tor",
            "stressPattern": "primary stress on the first syllable (CRED-i-tor)",
            "commonMistakes": "Learners often place stress incorrectly on the second syllable (*cre-DI-tor*) or fail to reduce the final syllable to a schwa /ər/, pronouncing it as a heavy vowel /ɔːr/ (*cred-i-TORE*). Legally and conceptually in business, non-native speakers also frequently confuse 'creditor' (the party to whom money is owed; the lender) with 'debtor' (the party who owes money; the borrower)."
        },
        "etymology": {
            "origin": "Middle English 'creditour', borrowed from Anglo-Norman 'creditur' and Old French 'crediteur', from Latin 'crēditor' (a lender, one who trusts another with money), an agent noun formed from the past participle stem of 'crēdere' (to trust, entrust, believe) + agent suffix '-or'.",
            "rootWord": "Latin 'crēditor' (lender, creditor), derived from 'crēdere' (to believe, entrust) + '-tor' (agent suffix designating the person performing the action)",
            "rootMeaning": "'one who entrusts money or merchandise to another on trust' — someone who extends capital or delivers goods prior to payment relying upon the debtor's contractual promise of repayment",
            "evolution": "Introduced into English legal and mercantile language in the late 13th to 14th centuries via Anglo-Norman law French. It established the formal contractual relationship between lenders and borrowers in English common law and court of chancery proceedings. By the 17th and 18th centuries, with the emergence of formal bankruptcy acts in Great Britain, 'creditor' developed specialized legal distinctions, such as 'secured creditor' (holding a mortgage, lien, or pledge on physical collateral) versus 'unsecured creditor' (relying solely on general contractual claims), distinctions that govern modern corporate insolvency law worldwide.",
            "relatedLanguages": [
                "French: créancier (creditor; Old French: créditeur)",
                "Italian: creditore (creditor, lender, claimant)",
                "Spanish: acreedor / creditor (creditor, lender, claimant)",
                "German: Kreditor / Gläubiger (creditor; Gläubiger literally means 'believer/truster', directly mirroring Latin credere)"
            ],
            "firstRecordedUse": "Late 13th to early 14th century (c. 1300 in Middle English legal deeds and commercial statutes)"
        },
        "deepMeaning": {
            "coreConcept": "A person, financial institution, corporation, or government body that extends credit, lends capital, or supplies goods and services to another party under an agreement that the monetary obligation will be repaid at a later date; in accounting and insolvency law, a party holding a legally enforceable financial claim against a debtor's assets or revenues.",
            "spatialContext": "Corporate bankruptcy and restructuring courtrooms, loan syndication departments of commercial banks, corporate credit management suites, and debt recovery legal practices.",
            "temporalContext": "Operative during standard vendor invoicing terms (Net 30/60/90 days), periodic bond coupon payment dates, debt covenant monitoring cycles, and corporate restructuring or liquidation proceedings.",
            "emotionalTone": "Strict, legalistic, assertive, and risk-conscious.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "In professional and legal English, native speakers associate 'creditor' with legal leverage, contractual rights, and financial risk exposure. A creditor is not merely a passive party who provided funds; they possess legal claims on the debtor's assets. In corporate turnaround scenarios, the phrase 'negotiating with creditors' indicates intense pressure, where secured creditors (banks holding collateral) hold immense sway over whether a struggling enterprise survives through reorganization or is forced into asset liquidation.",
            "mentalImage": "A formal creditors' committee meeting in a downtown skyscraper conference room where corporate restructuring attorneys, commercial lenders, and trade suppliers review a debt repayment plan submitted by an insolvent corporation.",
            "whenToUse": "Use in corporate finance, banking, accounting, and legal insolvency contexts when identifying entities owed money (e.g., 'secured creditor', 'satisfy outstanding claims of creditors', 'file for creditor protection', 'official creditors' committee').",
            "whenNotToUse": "Do not use 'creditor' to describe the entity that owes money (that is the 'debtor' or 'borrower'). Do not use 'creditor' for an equity investor who purchases shares (equity shareholders own equity in the company, whereas creditors hold debt obligations). Do not confuse with 'credit card issuer' unless specifically referring to the issuing bank in its formal legal lending capacity.",
            "culturalContext": "Under Chapter 11 of the United States Bankruptcy Code and corporate administration regimes in the UK and Commonwealth, creditors hold statutory governance rights to form official committees, inspect corporate accounting records, vote on reorganization plans, and demand court-ordered liquidations. Maintaining transparent relations with trade creditors is essential for preserving vendor supply chains and avoiding credit freezes."
        },
        "examples": {
            "daily": [
                "After consolidating his personal debts, Marcus established an automatic monthly transfer to ensure each creditor received the agreed minimum payment.",
                "The consumer credit counseling agency contacted each creditor on her behalf to negotiate a reduction in outstanding interest charges.",
                "Under federal fair debt collection practices, a creditor cannot contact a borrower with aggressive telephone calls outside normal waking hours."
            ],
            "business": [
                "During the corporate restructuring proceedings, senior secured creditors held priority claims against the company's real estate assets and production facilities.",
                "The retail chain filed for creditor protection under insolvency statutes to renegotiate its extensive commercial store leases without facing liquidation.",
                "The chief financial officer reassured major trade creditors that all pending vendor invoices would be settled in full following the close of the quarterly bond offering."
            ],
            "conversation": [
                "\"Has the suppliers' consortium accepted our revised debt repayment schedule?\" \"Most trade creditors agreed to the sixty-day extension, but our main transportation contractor is requesting a twenty percent upfront deposit.\"",
                "\"Why is our legal counsel meeting with the commercial banking syndicate this morning?\" \"The syndicate is our largest secured creditor, and corporate bylaws require their formal consent before we proceed with the overseas plant acquisition.\"",
                "\"What will happen to our outstanding invoices if the wholesale client files for bankruptcy?\" \"We are classified as an unsecured creditor, which means our reimbursement will depend on whatever dividend the bankruptcy trustee recovers from liquidating their inventory.\""
            ],
            "collocations": [
                "secured creditor",
                "unsecured creditor",
                "creditor protection",
                "satisfy creditors",
                "creditors' committee",
                "primary creditor"
            ]
        },
        "wordFamily": {
            "noun": "creditor, credit, debt, debtor",
            "verb": "credit",
            "adjective": "creditor (attributive), creditable",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "corporate bankruptcy restructuring creditors committee lawyers boardroom",
            "imageDescription": "Corporate restructuring attorneys and bank representatives seated around a polished mahogany boardroom table examining legal debt schedules, bankruptcy filings, and loan covenant documents.",
            "mnemonic": "CREDITOR ends in -OR like DOCTOR or DONOR: The CREDIT-OR is the actor who gives the credit and expects the return; the DEBT-OR is the one who bears the debt."
        },
        "video": {
            "description": "A corporate finance lecture explaining Chapter 11 bankruptcy restructuring, illustrating how secured and unsecured creditors form committees, negotiate debt-for-equity swaps, and vote on reorganization plans."
        },
        "toeicContext": {
            "commonParts": [
                5,
                6,
                7
            ],
            "exampleQuestion": "Under the terms of the court-approved debt reorganization agreement, the struggling logistics firm must submit monthly cash-flow forecasts to its primary _____ until all overdue liabilities are satisfied. (A) credit (B) creditors (C) credible (D) credited",
            "tips": "In TOEIC Part 5, test questions frequently target noun morphology and contextual semantics. Following the possessive determiner 'its' and the adjective 'primary', the sentence requires a plural agent noun referring to the entities that receive financial reports and hold debt claims: (B) 'creditors'. 'Credit' (A) is an abstract noun that cannot receive forecasts, while 'credible' (C) is an adjective and 'credited' (D) is a past participle."
        },
        "synonyms": [
            "lender",
            "claimant",
            "debt-holder",
            "loan provider",
            "underwriter"
        ],
        "antonyms": [
            "debtor",
            "borrower",
            "obligor"
        ],
        "relatedWords": [
            "debtor",
            "insolvency",
            "liquidation",
            "collateral",
            "accounts payable",
            "lien",
            "bankruptcy"
        ]
    },
    {
        "id": "finance-113",
        "word": "currency",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈkɜːr.ən.si/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/currency--_us_1.mp3",
            "syllableBreakdown": "cur-ren-cy",
            "stressPattern": "primary stress on the first syllable (CUR-ren-cy)",
            "commonMistakes": "Learners often pronounce the first syllable as /kɑːr/ (*car-en-cy*) or over-trill the /r/, rather than using the correct central vowel /ɜːr/ (US) or /ʌ/ (UK). Furthermore, some non-native speakers confuse the financial noun 'currency' (money in circulation, national legal tender) with 'current' (a flow of water/electricity or present-day) or 'currently' (at the present moment), or wrongly assume 'currency' refers only to physical paper bills rather than foreign exchange units and official digital balances."
        },
        "etymology": {
            "origin": "Formed in English in the mid-17th century from the adjective 'current' (flowing, running, circulating, from Anglo-Norman 'curraunt' and Old French 'corant'), from the present participle of Latin 'currere' (to run, move quickly, flow) + abstract noun suffix '-cy'.",
            "rootWord": "Latin 'currere' (to run, flow, move rapidly), with its present participle 'currens' (running, circulating)",
            "rootMeaning": "'currens' (running, flowing) — literally designating 'that which is continuously flowing or passing freely from hand to hand in the marketplace as a recognized medium of exchange'",
            "evolution": "Coined in English around 1650 to describe the condition of 'flowing or passing freely from person to person', applied initially to circulating ideas, news, or beliefs (having 'widespread currency'). By 1699, English philosopher John Locke formally applied the term to circulating coins and money in his economic treatise 'Considerations of the Lowering of Interest', defining it as money currently passing in trade. Throughout the 18th and 19th centuries, it evolved into the standard term for a nation's official monetary system (legal tender) and international foreign exchange.",
            "relatedLanguages": [
                "French: devise (foreign currency), monnaie (currency, money), courant (running, current; from Latin currere)",
                "Italian: valuta (currency), corrente (flowing, current; from Latin currere)",
                "Spanish: divisa (foreign currency), moneda (currency), corriente (running, current; from Latin currere)",
                "German: Währung (currency), Kurs (exchange rate, market price; derived from Latin cursus / currere)"
            ],
            "firstRecordedUse": "Mid-17th century (c. 1650 for the circulation of ideas/news); late 17th century (c. 1699 by John Locke specifically for circulating monetary tender)"
        },
        "deepMeaning": {
            "coreConcept": "A standardized system of money issued by a sovereign government or central bank that circulates as legal tender and serves as a medium of exchange, unit of account, and store of value; in international commerce, the monetary unit of a specific country used in cross-border settlements and foreign exchange markets; secondarily, the quality of being generally accepted, prevalent, or up to date.",
            "spatialContext": "Foreign exchange (Forex) trading floors, central bank vaults, corporate treasury management terminals, international airport currency exchange counters, and cross-border e-commerce billing engines.",
            "temporalContext": "Fluctuating continuously around the clock (twenty-four hours a day across global financial centers), revalued during quarterly multinational financial consolidation, and tracked following central bank monetary policy updates.",
            "emotionalTone": "Analytical, macroeconomic, neutral, and volatile.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Native speakers understand 'currency' on two essential levels. In daily personal life and travel, it denotes foreign or local physical and digital money—such as converting US dollars to euros or Japanese yen before traveling abroad. In corporate business and multinational commerce, 'currency' immediately signifies foreign exchange (FX) volatility, currency risk, and exchange rate hedging. Corporate executives constantly evaluate whether currency fluctuations will erode quarterly profit margins on overseas sales, or whether billing in local currency will make product pricing more competitive.",
            "mentalImage": "A foreign exchange trader sitting at a multi-screen trading desk analyzing real-time candlestick charts and fluctuating currency cross-rate tables for the euro, US dollar, and British pound.",
            "whenToUse": "Use when discussing national monetary units ('domestic currency', 'foreign currency'), exchange rates ('currency conversion', 'currency fluctuation'), corporate foreign exchange risk management ('currency hedging', 'currency swap'), or the widespread acceptance of a concept ('the term has gained currency across modern management theory').",
            "whenNotToUse": "Do not use 'currency' when referring casually to small pocket coins and change (prefer 'cash', 'coins', or 'change'). Do not confuse 'currency' with 'capital' (wealth invested into productive assets) or 'revenue' (income generated from business operations).",
            "culturalContext": "In global commerce and the TOEIC exam, currency is a central topic reflecting multinational supply chains and worldwide commerce. Multinational enterprises must constantly manage currency risk to protect earnings from foreign exchange swings. The US dollar's dominant role as the world's primary reserve and invoicing currency shapes international trade contracts and commodities pricing worldwide."
        },
        "examples": {
            "daily": [
                "Before traveling across Europe for summer vacation, Liam exchanged five hundred dollars into the local currency at a bank downtown.",
                "Most member nations of the European Union retired their traditional national currencies in favor of adopting the shared euro currency.",
                "The cross-border e-commerce platform enables international customers to view prices and complete checkout in their home currency."
            ],
            "business": [
                "To protect operating margins against foreign exchange volatility, the multinational exporter established a currency hedging contract with its investment bank.",
                "A sharp depreciation in the domestic currency made imported raw materials considerably more expensive for domestic manufacturing plants.",
                "When compiling its consolidated annual financial statements, the corporation translated the earnings of its overseas subsidiaries into US dollars at prevailing currency rates."
            ],
            "conversation": [
                "\"Should we invoice our Japanese distributor in US dollars or in their local currency?\" \"Corporate finance policy dictates billing all foreign accounts in US dollars to eliminate foreign exchange risk for our operations.\"",
                "\"Why did our European branch report a sudden decline in operating revenue last quarter?\" \"Although unit sales were stable, adverse currency fluctuations devalued the euro against our reporting currency, shrinking converted revenue figures.\"",
                "\"Does your treasury department employ any currency hedging instruments?\" \"Yes, we routinely utilize forward currency contracts to lock in exchange rates for large overseas supply shipments six months in advance.\""
            ],
            "collocations": [
                "foreign currency",
                "local currency",
                "currency fluctuation",
                "currency exchange rate",
                "currency depreciation",
                "currency hedging"
            ]
        },
        "wordFamily": {
            "noun": "currency, current, non-currency",
            "verb": "",
            "adjective": "current",
            "adverb": "currently"
        },
        "visual": {
            "imageKeyword": "foreign currency banknotes exchange rates financial market trading screen",
            "imageDescription": "A clean, photorealistic composition of neatly stacked world banknotes—US dollars, euros, British pounds, and Japanese yen—arranged beside an electronic tablet displaying real-time foreign exchange candlestick charts.",
            "mnemonic": "CURRENCY flows like a CURRENT in a river: derived from Latin CURRERE ('to run, flow'). Money that is actively RUNNING and FLOWING through the market is CURRENCY."
        },
        "video": {
            "description": "A Financial Times educational documentary explaining how global foreign exchange (Forex) markets establish currency values and illustrating how multinational companies mitigate foreign exchange risk through hedging strategies."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                7
            ],
            "exampleQuestion": "Because the manufacturer sources the majority of its electronic semiconductors from overseas vendors, unpredictable _____ in the value of the domestic currency can heavily affect annual profit margins. (A) fluctuations (B) fluctuates (C) fluctuated (D) fluctuating",
            "tips": "In TOEIC Part 5, sentence completion items often test word forms within common financial collocations. Here, the blank follows the adjective 'unpredictable' and precedes a prepositional phrase, requiring a plural noun: (A) 'fluctuations'. 'Currency fluctuations' is a high-frequency business collocation referring to shifts in foreign exchange rates that impact multinational procurement costs."
        },
        "synonyms": [
            "legal tender",
            "medium of exchange",
            "money",
            "foreign exchange",
            "coinage"
        ],
        "antonyms": [],
        "relatedWords": [
            "exchange rate",
            "forex",
            "depreciation",
            "appreciation",
            "hedging",
            "devaluation",
            "inflation"
        ]
    }
]

with open('scratch/finance_111_113.json', 'w', encoding='utf-8') as f:
    json.dump({"words": entries}, f, indent=2, ensure_ascii=False)

print("Saved scratch/finance_111_113.json successfully.")
