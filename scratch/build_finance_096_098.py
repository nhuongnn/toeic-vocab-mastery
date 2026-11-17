import json
import re
import sys

words_data = [
    {
        "id": "finance-096",
        "word": "cash",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/kæʃ/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/cash--_us_1.mp3",
            "syllableBreakdown": "cash",
            "stressPattern": "primary stress on the single syllable (CASH)",
            "commonMistakes": "Learners often substitute the final voiceless postalveolar fricative /ʃ/ with an alveolar sibilant /s/ (sounding like 'cass') or an affricate /tʃ/ ('catch'). In East Asian language backgrounds, speakers frequently append an intrusive paragogic vowel, pronouncing it as /kæʃuː/. Learners should also keep the short front vowel /æ/ crisp rather than drawing it out into a diphthong /eɪ/ or centralizing it to an open back /ɑː/."
        },
        "etymology": {
            "origin": "Late Middle English (denoting a money box, chest, or till), borrowed from Middle French 'caisse' ('money box, safe'), from Old Provençal 'caissa', from Latin 'capsa' ('box, repository, coffer'), from the verb 'capere' ('to take, hold, contain'). The semantic meaning shifted in the late 16th century from the coffer or box to the coins and ready money contained within it.",
            "rootWord": "Latin 'capsa' (box, chest, coffer) via Middle French 'caisse'",
            "rootMeaning": "'A box or receptacle for money' — metonymically transferred from the physical iron-banded money coffer to the tangible coins and currency stored inside.",
            "evolution": "In Roman antiquity, 'capsa' referred to cylindrical containers used by scribes and noblemen to protect scrolls and valuables. During medieval merchant trade in Provençal and northern Italian banking houses, 'caissa' and 'cassa' identified the merchant's secure money till. Elizabethan merchants incorporated 'cash' into English around 1590 to describe a cashier's physical drawer ('money in the cash'). By the 17th and 18th centuries, it shifted entirely from the container to the contents, becoming standard English for circulating specie, notes, and coins. In modern accounting under GAAP and IFRS, 'cash' occupies the top line of current assets on the balance sheet, representing legal tender and demand deposits with zero withdrawal restrictions.",
            "relatedLanguages": [
                "French: caisse (f. - cashbox, till, cash desk), argent liquide (m. - cash)",
                "Spanish: caja (f. - cashbox, till), dinero en efectivo (m. - physical cash)",
                "Italian: cassa (f. - cashbox, cashier desk), contanti (m. pl. - ready cash)",
                "German: Kasse (f. - cash desk, register), Bargeld (n. - physical cash)"
            ],
            "firstRecordedUse": "c. 1590s (in English commercial records and merchant account books)"
        },
        "deepMeaning": {
            "coreConcept": "Money in the tangible form of paper currency notes and minted coins, or immediately available funds in bank demand deposit accounts that can be disbursed or withdrawn without prior notice, penalties, or restrictions; the most liquid asset class on an entity's balance sheet.",
            "spatialContext": "Point-of-sale cash registers, automated teller machines (ATMs), locked petty cash lockboxes in administrative suites, commercial bank teller drawers, armored transport vehicles, and the topmost line item under current assets on a corporate balance sheet.",
            "temporalContext": "Exchanged instantaneously at checkout counters during physical sales, counted and balanced at the end of each daily business shift, disbursed on demand for small incidental office receipts, and reconciled daily in corporate treasury accounts.",
            "emotionalTone": "Tangible, dependable, practical, and unambiguous.",
            "formalityLevel": "neutral",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "To native speakers, 'cash' is the ultimate embodiment of instant finality and unconditional liquidity. Unlike debit cards, credit accounts, or promissory notes, a cash transaction settles immediately with zero credit risk, billing delays, or merchant interchange fees. In consumer culture, cash carries psychological weight ('cold hard cash') and bargaining leverage ('I can pay cash right now for a lower price'). In corporate leadership, executives live by the maxim 'cash is king,' knowing that while paper accounting revenue may look impressive on an income statement, an enterprise collapses overnight if it lacks physical or demand-deposit cash to honor payroll and vendor invoices.",
            "mentalImage": "A retail shift supervisor kneeling before an open safe in a back office, sliding stacks of twenty-dollar bills and rolled quarters into a heavy-duty deposit bag while reconciling the register receipt tape against the physical count.",
            "whenToUse": "Use when referring to physical banknotes and coinage ('pay in cash', 'spare cash', 'petty cash'), immediate liquid funds in demand accounts ('cash and cash equivalents'), or transaction methods devoid of credit instruments ('all-cash deal').",
            "whenNotToUse": "Do not use 'cash' to denote total net worth, real estate holdings, long-term bonds, or general corporate wealth (use 'assets', 'capital', or 'equity'). Do not confuse with the computing homophone 'cache' (a temporary high-speed data store). Avoid using 'cash' when an explicit credit instrument like a check, promissory note, or line of credit is involved.",
            "culturalContext": "In Anglo-American commercial practices, despite widespread digitization and cashless payment terminals, petty cash funds remain a fixture in office administration for reimbursing minor day-to-day out-of-pocket expenses (such as courier postage, taxi fares, or coffee supplies). In financial disclosures, cash under FDIC insurance or bank guarantees provides stability against systemic runs."
        },
        "examples": {
            "daily": [
                "The parking attendant told us that the garage's card reader was down and they could only accept cash.",
                "She visited the automated teller machine around the corner to withdraw fifty dollars in cash for lunch.",
                "He keeps an envelope with a small amount of emergency cash in the glove compartment of his car."
            ],
            "business": [
                "The corporate treasurer kept forty million dollars in liquid cash to ensure the enterprise could honor short-term supplier obligations.",
                "Employees traveling for client meetings must submit their original receipts to the administrative assistant to receive petty cash reimbursements.",
                "The acquisition was finalized as an all-cash transaction valued at eight hundred fifty million dollars."
            ],
            "conversation": [
                "\"Does the cafeteria accept corporate credit cards for catered team lunches?\" — \"They do, but paying in cash at the counter is much faster during the noon rush.\"",
                "\"We ran out of postage stamps for the registered mail packages.\" — \"Take fifteen dollars from the office petty cash drawer and grab a book of stamps at the post office down the block.\"",
                "\"Why did our board turn down the equipment supplier's lease-to-own financing terms?\" — \"We have sufficient cash reserves to buy the machines outright and save ten percent in financing charges.\""
            ],
            "collocations": [
                "petty cash",
                "cash reserves",
                "pay in cash",
                "cash and cash equivalents",
                "cash discount",
                "cash register"
            ]
        },
        "wordFamily": {
            "noun": "cash, cashier, cashbox",
            "verb": "cash",
            "adjective": "cash, cashless",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "cash banknotes coins register petty cash retail",
            "imageDescription": "A high-angle view of a cashier's hands sorting neatly stacked twenty-dollar banknotes into separated compartments of an open stainless-steel cash drawer alongside coin rolls.",
            "mnemonic": "CASH comes from CAISSE (French money box): Cash originally referred to the sturdy box holding coins — remember that cash is the ready money inside the till!"
        },
        "video": {
            "description": "A financial literacy tutorial demonstrating how commercial retail businesses manage daily register counts, end-of-shift reconciliations, and safe deposits, contrasting physical cash handling with electronic payments."
        },
        "toeicContext": {
            "commonParts": [
                1,
                3,
                5,
                7
            ],
            "exampleQuestion": "To take advantage of the prompt payment incentive, clients must settle their outstanding invoices _____ cash within ten business days of delivery.\n(A) in\n(B) by\n(C) on\n(D) with",
            "tips": "In TOEIC Part 5, preposition collocations with payment terms are heavily tested. Physical cash takes 'in cash' (e.g., 'pay in cash', 'settle in cash'), whereas financial instruments and electronic payment methods take 'by' (e.g., 'by check', 'by credit card', 'by wire transfer'). Choosing (B) 'by' with 'cash' is a common distractor trap."
        },
        "synonyms": [
            "currency",
            "legal tender",
            "ready money",
            "banknotes and coinage",
            "liquid funds",
            "specie"
        ],
        "antonyms": [
            "credit",
            "debt",
            "accounts receivable",
            "illiquid assets"
        ],
        "relatedWords": [
            "petty cash",
            "cashier",
            "liquidity",
            "disbursement",
            "bank deposit",
            "working capital",
            "cash equivalent"
        ]
    },
    {
        "id": "finance-097",
        "word": "cash flow",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈkæʃ ˌfloʊ/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/cash_flow--_us_1.mp3",
            "syllableBreakdown": "cash-flow",
            "stressPattern": "primary stress on the first element, secondary stress on the second (CASH-flow)",
            "commonMistakes": "Learners often put equal emphasis on both words or stress 'flow' (*cash-FLOW) rather than the first element (/ˈkæʃ ˌfloʊ/). Non-native speakers also frequently slur the final /ʃ/ of 'cash' directly into the /fl/ cluster, omitting the sibilant release. In vowels, learners from non-English backgrounds often shorten the rounded diphthong /oʊ/ to an open monophthong /ɒ/ or /ɔː/."
        },
        "etymology": {
            "origin": "Mid-20th-century financial compound originating in American accounting and corporate securities analysis, uniting 'cash' (from Middle French 'caisse', box/safe, from Latin 'capsa') and 'flow' (from Old English 'flōwan', to stream or surge like water, from Proto-Germanic '*flōwanan', from PIE '*pleu-', to flow, swim).",
            "rootWord": "Middle French 'caisse' (money box) + Old English 'flōwan' (to stream, flow)",
            "rootMeaning": "'The streaming movement of money' — conceptualizing monetary funds as a fluid current circulating through business operations, investments, and debt financing.",
            "evolution": "Prior to the 1950s, corporate valuation centered almost exclusively on accrual-based income statements and net book value on balance sheets. However, analysts realized that companies reporting healthy net profits could still go bankrupt if cash was tied up in slow-moving inventory or overdue client receivables. In the early 1950s, Wall Street investment pioneers like Benjamin Graham's disciples and corporate controllers formalized 'cash flow' analysis. In 1987, the Financial Accounting Standards Board issued FASB Statement No. 95, establishing the 'Statement of Cash Flows' as an obligatory component of audited financial reporting alongside the balance sheet and income statement.",
            "relatedLanguages": [
                "French: flux de trésorerie (m.), cash-flow (m., widespread in finance)",
                "Spanish: flujo de caja (m.), flujo de efectivo (m.)",
                "German: Cashflow (m.), Kapitalfluss (m.), Geldfluss (m.)",
                "Italian: flusso di cassa (m.), rendiconto finanziario (m. - cash flow statement)"
            ],
            "firstRecordedUse": "c. 1950–1954 in American accounting journals and equity research bulletins"
        },
        "deepMeaning": {
            "coreConcept": "The net aggregate of cash and cash equivalents moving into and out of an enterprise or financial project over a specified reporting period; segmented into operating, investing, and financing activities to determine true solvency, debt-servicing ability, and operational viability independent of non-cash accrual accounting.",
            "spatialContext": "The corporate Statement of Cash Flows, executive treasury dashboards, Enterprise Resource Planning (ERP) liquidity modules, commercial bank credit risk underwriting rooms, and venture capital boardroom presentations.",
            "temporalContext": "Tracked continuously by treasury teams on a 13-week rolling forecast, reconciled weekly against vendor disbursement runs and customer collections, and published quarterly (10-Q) and annually (10-K) in public financial disclosures.",
            "emotionalTone": "Vital, realistic, vigilant, and solvency-focused.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "To native business leaders and finance professionals, 'cash flow' is the lifeblood and cardiovascular system of a company. They intuitively separate paper profits from actual cash liquidity: 'Profit is an opinion, but cash is a fact.' A company can operate for quarters at an accounting loss if it generates positive operating cash flow, but even the most profitable firm will collapse into involuntary receivership the day its cash flow cannot support payroll or vendor payables. In startup environments, founders obsess over 'burn rate' and 'runway,' both of which are direct expressions of cash flow timing.",
            "mentalImage": "A chief financial officer pointing to a downward trendline on a dual-monitor cash dashboard during an executive meeting, explaining why vendor payments must be staggered over forty-five days to protect operating cash flow until major quarterly receivables arrive.",
            "whenToUse": "Use when discussing the dynamic movement of money into and out of an organization, evaluating corporate solvency and liquidity ('positive cash flow', 'negative cash flow'), analyzing the cash flow statement, or evaluating investment return models ('discounted cash flow').",
            "whenNotToUse": "Do not use 'cash flow' as an interchangeable term for gross revenue or sales volume (revenue measures accrued earnings, not cash collected). Do not use it to describe a static lump sum of currency in a safe or bank account (that is simply 'cash' or 'cash reserves').",
            "culturalContext": "In Anglo-American enterprise commerce, payment terms (such as 'Net 30', 'Net 60', or early payment discounts like '2/10 Net 30') are designed specifically to optimize cash flow cycles. Large corporations often enforce extended payment schedules on suppliers to bolster their own free cash flow, making cash flow management the primary operational headache for small-to-medium enterprises (SMEs)."
        },
        "examples": {
            "daily": [
                "Operating a local catering business taught Marco that maintaining positive cash flow is more critical than booking high-revenue holiday parties months away.",
                "The freelance web developer offered clients a five percent prompt-payment discount to ensure predictable monthly cash flow.",
                "Higher mortgage interest rates and unexpected home heating repairs severely tightened the household's cash flow this winter."
            ],
            "business": [
                "Although the tech startup expanded sales by fifty percent, rapid hiring and marketing spending caused a negative operating cash flow of two million dollars.",
                "The corporate treasurer negotiated a revolving credit facility to insulate the firm's cash flow against seasonal dips in wholesale orders.",
                "By accelerating invoice collections and reducing inventory holding days, the manufacturing firm generated record free cash flow for the fiscal year."
            ],
            "conversation": [
                "\"Why did leadership postpone purchasing new warehouse packaging machinery?\" — \"Our projected cash flow for the upcoming quarter is too tight to absorb substantial capital expenditures right now.\"",
                "\"Should we accept this major government contract with ninety-day billing terms?\" — \"We need to arrange a bridge loan first; otherwise, waiting three months for payment will cripple our operating cash flow.\"",
                "\"Did the auditor find any discrepancies in our quarterly financial disclosures?\" — \"No, but she noted that cash flow from operations decreased due to an accumulation of unpaid client receivables.\""
            ],
            "collocations": [
                "operating cash flow",
                "free cash flow",
                "positive cash flow",
                "cash flow statement",
                "cash flow forecast",
                "cash flow problem"
            ]
        },
        "wordFamily": {
            "noun": "cash flow, cashflow",
            "verb": "",
            "adjective": "cash-flow",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "cash flow statement liquidity financial report business chart",
            "imageDescription": "A corporate executive analyzing a color-coded financial waterfall chart on an ultra-wide monitor, illustrating quarterly cash inflows from customer contracts versus outflows for vendor bills and payroll.",
            "mnemonic": "Imagine CASH as water flowing through a pipeline: If outflows exceed inflows, your cash reservoir runs dry and the business machine shuts down!"
        },
        "video": {
            "description": "A corporate accounting lecture detailing how to construct and interpret the Statement of Cash Flows, walking step-by-step through operating, investing, and financing cash activities with animated balance-sheet reconciliation."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                6,
                7
            ],
            "exampleQuestion": "By adopting automated invoicing software and offering prompt-payment discounts, Crestview Logistics managed to improve its operating _____ considerably.\n(A) flow\n(B) flowing\n(C) flown\n(D) flowery",
            "tips": "In TOEIC Part 5, 'cash flow' is a very high-frequency compound noun. When 'operating', 'positive', or 'free' modifies 'cash', test questions commonly test whether the test-taker recognizes the head noun 'flow' rather than verbal participles ('flowing', 'flown') or adjectives ('flowery'). Always identify 'cash flow' as an inseparable compound noun unit in financial contexts."
        },
        "synonyms": [
            "liquidity",
            "cash receipts and disbursements",
            "net cash movement",
            "fund flow",
            "working capital circulation",
            "operational liquidity"
        ],
        "antonyms": [
            "cash flow deficit",
            "cash crunch",
            "illiquidity",
            "insolvency"
        ],
        "relatedWords": [
            "operating cash flow (OCF)",
            "free cash flow (FCF)",
            "Statement of Cash Flows",
            "working capital",
            "burn rate",
            "accounts receivable",
            "liquidity ratio"
        ]
    },
    {
        "id": "finance-098",
        "word": "clearing",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈklɪr.ɪŋ/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/clearing--_us_1.mp3",
            "syllableBreakdown": "clear-ing",
            "stressPattern": "primary stress on the first syllable (CLEAR-ing)",
            "commonMistakes": "Learners often over-lengthen the initial vowel into a pure tense /iː/ (pronouncing 'clee-ring' /ˈkliː.rɪŋ/) instead of using the near-close near-front lax vowel /ɪ/ or diphthong /ɪər/. In addition, speakers from Asian language backgrounds often pronounce the final velar nasal /ŋ/ as an alveolar nasal /n/ ('clearin''). In business contexts, non-native speakers also frequently confuse 'clearing' (the interbank netting and reconciliation process) with 'clearance' (customs permission or retail discount sales)."
        },
        "etymology": {
            "origin": "Middle English 'clering', verbal noun derived from the verb 'clear' / 'cleren' ('to make bright, transparent, free from hindrance or debt'), borrowed from Old French 'cler' ('clear, luminous, open'), from Latin 'clarus' ('clear, bright, manifest, famous'), combined with the English nominal suffix '-ing'. The specific banking and securities netting sense originated in late 18th-century London.",
            "rootWord": "Latin 'clarus' (clear, plain, unencumbered) -> Old French 'cler' -> English 'clear' + '-ing'",
            "rootMeaning": "'The act of settling and clarifying accounts to remove mutual claims and unencumber balances' — making obligations between parties crystal clear and settled.",
            "evolution": "Originally referring to the clearing of land or weather, the term entered financial history around 1770 in London. Bank runners ('walk-clerks') from competing private banks who walked the city streets to collect cash on checks drawn on each other began meeting informally at the Five Bells tavern on Lombard Street. They realized they could swap checks, cancel out mutual debts, and settle only the remaining net balance in gold or Bank of England notes. In 1773, they established the formal London Bankers' Clearing House. Over the 19th and 20th centuries, this principle expanded globally into commodities, equities, futures, and modern Automated Clearing House (ACH) electronic fund networks, serving as the central counterparty infrastructure of modern banking.",
            "relatedLanguages": [
                "French: compensation (f. - banking clearing), chambre de compensation (f. - clearing house)",
                "Spanish: compensación (f. - clearing/settlement), cámara de compensación (f. - clearinghouse)",
                "German: Clearing (n., standard banking term), Abrechnung (f.), Verrechnung (f.)",
                "Italian: compensazione (f. - interbank clearing), stanza di compensazione (f. - clearinghouse)"
            ],
            "firstRecordedUse": "c. 1773 in London banking records establishing the Bankers' Clearing House; general verbal noun use dates to late 14th-century Middle English"
        },
        "deepMeaning": {
            "coreConcept": "The operational process in banking and financial capital markets whereby mutual payment instructions, checks, derivative contracts, or securities trades between financial institutions are transmitted, verified, matched, and netted prior to final legal settlement; orchestrated by a clearinghouse to minimize counterparty settlement risk.",
            "spatialContext": "Automated Clearing House (ACH) operations centers, central counterparty clearinghouses (CCPs such as DTCC, LCH.Clearnet, Euroclear), interbank wire transfer processing rooms, and commercial bank treasury operations desks.",
            "temporalContext": "Executed in continuous automated reconciliation batches throughout the trading day, followed by end-of-day or overnight multilateral netting cutoffs aligned with central bank reserve settlement windows (e.g., T+1 securities settlement or daily ACH batch cycles).",
            "emotionalTone": "Systematic, regulatory, authoritative, and risk-mitigating.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "To native financial professionals, 'clearing' is the indispensable backend plumbing that connects the execution of a transaction to its ultimate legal finality (settlement). They distinguish three stages: trading (agreeing to a price), clearing (calculating and netting mutual obligations, validating accounts, and ensuring collateral is posted), and settlement (the irrevocable transfer of money and ownership). When a consumer hears that a check is 'clearing,' they understand there is a holding period while their bank verifies sufficient funds at the paying bank. In institutional finance, clearing represents counterparty risk protection: clearinghouses act as the buyer to every seller and seller to every buyer.",
            "mentalImage": "A financial operations supervisor in a secure banking facility reviewing automated electronic queues on a wall monitor, verifying that millions of interbank payment records have completed netting through the Automated Clearing House before the 5:00 PM Federal Reserve window.",
            "whenToUse": "Use when describing the banking process of processing and netting checks, electronic fund transfers (ACH), securities trades, or futures contracts ('check clearing', 'clearing house', 'clearing member', 'clearing bank', 'trade clearing'). Also used in maritime and cross-border trade for 'customs clearing' (clearing cargo through border inspections).",
            "whenNotToUse": "Do not confuse 'clearing' with final 'settlement' (clearing is the netting and validation phase; settlement is the actual delivery of cash or securities). Do not confuse with 'clearance' (which refers to official permission/authorization, physical space beneath an obstacle, or a discount inventory liquidation sale).",
            "culturalContext": "In the US, direct deposit paychecks, social security disbursements, and automated utility bill drafts rely exclusively on the Automated Clearing House (ACH) network managed by NACHA and the Federal Reserve. In TOEIC test scenarios (especially Parts 3, 4, and 7), bank notices frequently inform customers about standard check clearing holds (typically two business days) and cutoff times for same-day electronic clearing."
        },
        "examples": {
            "daily": [
                "The customer service agent explained that the deposited out-of-state check would need two business days for clearing before the funds could be withdrawn.",
                "Our direct deposit salary payment completed clearing overnight and was available in my checking account on Friday morning.",
                "She received an email notification from the bank stating that the electronic bill payment was currently in clearing."
            ],
            "business": [
                "The multinational bank serves as a direct clearing member on major derivatives exchanges, handling trade reconciliation for institutional hedge funds.",
                "By utilizing multilateral clearing, commercial banks reduced gross interbank payment obligations by more than ninety percent before final central bank settlement.",
                "The corporate treasurer established an automated clearing house system to streamline vendor disbursements and reduce paper check processing costs."
            ],
            "conversation": [
                "\"Why hasn't the supplier confirmed receipt of our invoice wire payment yet?\" — \"Our bank sent the instruction yesterday afternoon, but because of the banking holiday, interbank clearing will require an extra twenty-four hours.\"",
                "\"Can our trading desk execute trades with unsettled proceeds from yesterday's equity sales?\" — \"Yes, but complete clearing and final settlement take one full business day under the new T+1 settlement rules.\"",
                "\"Did the freight forwarder encounter any delays with our container shipment at the terminal?\" — \"No, customs clearing was completed early this morning, and the carrier is en route to our distribution center.\""
            ],
            "collocations": [
                "clearing house",
                "clearing member",
                "check clearing",
                "clearing bank",
                "automated clearing house (ACH)",
                "clearing process"
            ]
        },
        "wordFamily": {
            "noun": "clearing, clearance, clarity, clearinghouse",
            "verb": "clear",
            "adjective": "clear, cleared, clearing",
            "adverb": "clearly"
        },
        "visual": {
            "imageKeyword": "bank clearing house automated payment data center financial system",
            "imageDescription": "A modern banking operations operations center with technicians monitoring real-time digital transaction data streams and interbank reconciliation progress bars across multi-screen display arrays.",
            "mnemonic": "CLEARING makes the accounts CLEAR: It nets out billions of crisscrossing bank payments so only the net difference needs to be paid!"
        },
        "video": {
            "description": "An educational animation by a central bank detailing how an Automated Clearing House (ACH) and central counterparty clearinghouse function, illustrating how bilateral payments are netted and settled securely."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                7
            ],
            "exampleQuestion": "Commercial account holders should be aware that incoming checks deposited after 4:00 P.M. will undergo the interbank _____ process on the following business day.\n(A) clearing\n(B) clearest\n(C) clear\n(D) clearly",
            "tips": "In TOEIC Part 5, test questions frequently test compound noun or gerund usage before nouns like 'process', 'house', 'bank', or 'period'. Test-takers often mistakenly choose the adjective 'clear' (C) or adverb 'clearly' (D) instead of recognizing the established financial term 'clearing process' (A)."
        },
        "synonyms": [
            "interbank reconciliation",
            "netting",
            "settlement processing",
            "transaction verification",
            "multilateral netting",
            "payment validation"
        ],
        "antonyms": [
            "non-settlement",
            "transaction dishonor",
            "payment rejection",
            "settlement failure"
        ],
        "relatedWords": [
            "clearinghouse",
            "Automated Clearing House (ACH)",
            "settlement",
            "counterparty risk",
            "netting",
            "central counterparty (CCP)",
            "reconciliation"
        ]
    }
]

# Write to scratch json
output_path = "scratch/finance_096_098.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump({"words": words_data}, f, indent=2, ensure_ascii=False)

print(f"Wrote {len(words_data)} words to {output_path}")
