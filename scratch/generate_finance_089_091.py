import json
import re

words = [
    {
        "id": "finance-089",
        "word": "borrowing",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈbɑːr.oʊ.ɪŋ/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/borrowing--_us_1.mp3",
            "syllableBreakdown": "bor-row-ing",
            "stressPattern": "First syllable stress: /ˈbɑːr.oʊ.ɪŋ/ (●○○)",
            "commonMistakes": "Learners frequently confuse the verbal noun borrowing with lending (borrowing is receiving funds under an obligation to repay, whereas lending is providing funds to a borrower). Phonetically, non-native speakers often compress the middle vowel /oʊ/, pronouncing it like boring (/ˈbɔː.rɪŋ/). Additionally, learners often fail to recognize that the plural form borrowings specifically designates total outstanding debt liabilities on corporate balance sheets."
        },
        "etymology": {
            "origin": "Old English via Proto-Germanic",
            "rootWord": "borgian (to borrow, lend on security, give a pledge) + -ing (verbal noun suffix)",
            "rootMeaning": "'The act of giving or receiving a pledge/guarantee of return'",
            "evolution": "Originates from Old English borgian (to borrow, give a pledge or surety), derived from Proto-Germanic *burgōną (to guarantee, protect, provide surety), cognate with borg (pledge, bail, security). In Anglo-Saxon and early medieval customary law, borrowing was fundamentally an exchange secured by a personal guarantor or physical pledge (borh). During the 14th century in Middle English, the addition of the verbal noun suffix -ing established borrowing as the ongoing activity of taking loans. In modern corporate accounting and macroeconomics, the term specifically designates capital obtained through credit lines, bank facilities, and debt issuance, often appearing in the plural as corporate borrowings.",
            "relatedLanguages": [
                "German: borgen (to borrow/lend), Bürgschaft (surety, guarantee)",
                "Dutch: borgen (to guarantee, secure)",
                "Old Norse: borga (to guarantee, borrow)",
                "Gothic: baurgs (fortress, shelter)"
            ],
            "firstRecordedUse": "14th century (Middle English as a verbal noun denoting the procurement of a loan or pledge)"
        },
        "deepMeaning": {
            "coreConcept": "The commercial practice or financial process of acquiring funds, capital, or liquidity from an external lender (such as a commercial bank, bond market, or syndicate) under a binding legal contract to repay the principal along with interest over a predetermined maturity schedule; in corporate accounting, the plural form borrowings denotes the aggregate debt liabilities recorded on a balance sheet.",
            "spatialContext": "Corporate treasury offices, commercial credit loan departments, syndicate bank underwriting rooms, bond trading desks, and balance sheet liability ledgers.",
            "temporalContext": "Tracked continuously by treasury analysts against debt covenant thresholds; reviewed quarterly during earnings announcements and scheduled debt amortization dates.",
            "emotionalTone": "Strategic, prudent, analytical, and risk-conscious; necessary for scaling enterprise operations but tempered by debt solvency concerns.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "To a native financial executive, borrowing is viewed objectively as debt leverage—an indispensable capital allocation tool evaluated against the Weighted Average Cost of Capital (WACC). Native speakers immediately associate the word with borrowing costs (interest rates) and borrowing capacity. In earnings calls and financial press, whether borrowing is fixed-rate or variable-rate signals corporate exposure to central bank monetary policy shifts.",
            "mentalImage": "A corporate treasurer and chief financial officer reviewing an interactive treasury dashboard in a glass boardroom, analyzing projected debt service coverage ratios against rising benchmark interest rates to evaluate a fifty-million-dollar credit facility.",
            "whenToUse": "Use when discussing the acquisition of debt capital, commercial bank credit lines, government debt issuance (public sector borrowing), total corporate debt liabilities (short-term borrowings), or debt service expenses (borrowing costs).",
            "whenNotToUse": "Never confuse with lending (the creditor's provision of funds) or equity financing (raising capital through share issuance with no debt repayment obligation). Do not use borrowing to describe non-repayable government grants or donations.",
            "culturalContext": "In Anglo-American corporate finance, corporate borrowing is treated as standard commercial leverage to boost return on equity rather than a sign of insolvency, provided debt-to-EBITDA ratios remain prudent. Central banks like the Federal Reserve adjust benchmark lending rates specifically to stimulate or cool down corporate and consumer borrowing."
        },
        "examples": {
            "daily": [
                "With mortgage interest rates rising sharply, household borrowing for home purchases has slowed considerably.",
                "Before applying for a vehicle loan, Karen compared borrowing rates across multiple regional credit unions.",
                "Our family decided to curtail discretionary borrowing until we had completely paid off our outstanding credit card balances."
            ],
            "business": [
                "The board of directors approved twenty million dollars in short-term borrowing to bridge the cash flow gap before quarterly receivables are collected.",
                "Due to successive central bank rate hikes, the manufacturing firm's annual borrowing costs increased by nearly eight percent.",
                "The corporate debt restructuring plan aims to reduce total balance sheet borrowings by retiring high-yield debentures ahead of maturity."
            ],
            "conversation": [
                "\"Are we funding the automated warehouse expansion through an equity issue or commercial borrowing?\" — \"The treasury committee recommended bank borrowing because corporate bond yields remain favorable.\"",
                "\"Has the controller completed the updated debt amortization schedule?\" — \"Yes, and it confirms that our long-term borrowings remain well below our debt covenant ceiling.\"",
                "\"Why did the central bank raise the benchmark rate this morning?\" — \"They are trying to cool down inflation by making consumer and corporate borrowing more expensive.\""
            ],
            "collocations": [
                "borrowing costs",
                "borrowing capacity",
                "short-term borrowing",
                "government borrowing",
                "borrowing limit",
                "heavy borrowing"
            ]
        },
        "wordFamily": {
            "noun": "borrowing, borrower",
            "verb": "borrow",
            "adjective": "borrowed"
        },
        "visual": {
            "imageKeyword": "corporate loan agreement signing treasury finance",
            "imageDescription": "A corporate finance director in a formal boardroom signing a multi-million-dollar syndicated loan agreement, flanked by debt amortization schedules, financial calculators, and legal documents.",
            "mnemonic": "BORROW-ING: When a company BORROWS, capital flows IN, but watch the interest GROWING!"
        },
        "video": {
            "description": "A corporate treasury masterclass explaining how commercial borrowing instruments—such as revolving credit facilities, syndicated term loans, and corporate bonds—are structured, priced against SOFR benchmarks, and managed on the balance sheet."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                7
            ],
            "exampleQuestion": "Due to unexpected delays in collecting overseas receivables, the logistics firm had to increase its short-term ______ to meet upcoming payroll obligations.\n(A) borrow\n(B) borrowed\n(C) borrowing\n(D) borrower",
            "tips": "In TOEIC Part 5, possessive determiners (its) combined with compound modifiers (short-term) require a head noun. The sentence describes acquiring debt capital to satisfy working capital needs, making (C) borrowing the correct noun. Choice (A) is a base verb, (B) is a past participle/verb, and (D) borrower refers to an entity that takes a loan, which cannot logically be increased to meet payroll."
        },
        "synonyms": [
            "debt financing",
            "credit acquisition",
            "loan capital",
            "indebtedness",
            "leveraging",
            "debt issuance"
        ],
        "antonyms": [
            "lending",
            "debt repayment",
            "equity financing",
            "loan redemption",
            "debt retirement"
        ],
        "relatedWords": [
            "debt liability",
            "credit facility",
            "interest rate",
            "principal",
            "debt covenant",
            "leverage",
            "amortization"
        ]
    },
    {
        "id": "finance-090",
        "word": "broker",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/ˈbroʊ.kər/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/broker--_us_1.mp3",
            "syllableBreakdown": "bro-ker",
            "stressPattern": "First syllable stress: /ˈbroʊ.kər/ (●○)",
            "commonMistakes": "Learners often pronounce the diphthong /oʊ/ as a short vowel /ɒ/ or /ɔː/, producing 'brocker'. In financial contexts, learners frequently confuse a 'broker' (an agent who executes trades on behalf of clients without taking principal risk) with a 'dealer' or 'market maker' (who buys and sells securities from their own inventory). Furthermore, learners sometimes forget that 'broker' also functions as a transitive verb meaning to negotiate or arrange a commercial deal."
        },
        "etymology": {
            "origin": "Anglo-Norman French via Old French and Late Latin",
            "rootWord": "brocour / brokeor (retailer, wine tapster, middleman)",
            "rootMeaning": "'One who broaches/taps a wine cask to sell wine in small retail lots; an intermediary trader'",
            "evolution": "Originates from Anglo-Norman 'brocour' and Old French 'brocheor' (a tapster or wine retailer), derived from 'brochier' (to pierce or tap a cask), from Late Latin 'brocca' (a pointed tool, spike). The term originally referred to someone licensed to tap wine casks and sell wine in smaller measures. By extension, it came to describe an authorized retail middleman or agent who negotiated sales between wholesale merchants and consumers. By the late 14th century in Middle English, 'broker' became established in mercantile law as an independent agent negotiating contracts, commodities, real estate, or securities between buyers and sellers for a commission.",
            "relatedLanguages": [
                "French: courtier (broker, from curatier/curator)",
                "Spanish: corredor (de comercio / de bolsa)",
                "Italian: mediatore / broker",
                "German: Makler / Vermittler",
                "Dutch: makelaar"
            ],
            "firstRecordedUse": "Late 14th century (c. 1377 in Middle English statutes regulating mercantile agents and city guilds)"
        },
        "deepMeaning": {
            "coreConcept": "A licensed individual or institutional intermediary who facilitates, negotiates, and executes transactions between buyers and sellers in specialized markets—such as equities, bonds, real estate, foreign exchange, commodities, or insurance—earning a commission or transaction fee without holding inventory risk.",
            "spatialContext": "Financial exchange floors, commercial real estate brokerage offices, customs clearance ports, electronic trading platforms, and institutional wealth advisory desks.",
            "temporalContext": "Active during financial market operating hours (e.g., 9:30 AM to 4:00 PM EST for US equities) and throughout multi-week property closing or policy negotiation windows.",
            "emotionalTone": "Enterprising, persuasive, transactional, and client-focused.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Native speakers view a 'broker' as the vital bridge between a buyer and seller in high-value, complex, or strictly regulated transactions where direct peer-to-peer trading is inefficient or prohibited by law. Natives instinctively identify the domain immediately: 'stockbroker', 'real estate broker', 'insurance broker', or 'mortgage broker'. They expect the broker to provide objective valuation, market access, and execution speed in exchange for a fair percentage fee.",
            "mentalImage": "A commercial real estate broker in a tailored suit guiding two corporate executives through a panoramic 20th-floor commercial office space, pointing out zoning allowances, fiber optic cabling, and square footage flexibility.",
            "whenToUse": "Use when referring to licensed individual intermediaries or agency firms representing buyers or sellers in finance, real estate, insurance, customs, or commodities (e.g., 'licensed customs broker', 'prime broker', 'mortgage broker'). Also use as a verb: 'to broker an agreement'.",
            "whenNotToUse": "Do not use for the buyer or seller themselves (the principals). Do not use 'broker' for an internal purchasing clerk or a simple retail store cashier who merely rings up inventory.",
            "culturalContext": "In North America and the UK, brokers are regulated under stringent compliance regimes (such as FINRA and the SEC in the US). In business and political journalism, 'power broker' and 'deal broker' describe influential figures capable of bringing warring factions or competing corporate titans to consensus."
        },
        "examples": {
            "daily": [
                "We consulted an independent mortgage broker to find a home loan with the lowest closing fees.",
                "Her stockbroker recommended rebalancing her portfolio by selling volatile tech stocks and acquiring blue-chip dividend shares.",
                "The real estate broker scheduled an open house for Sunday afternoon to attract prospective neighborhood buyers."
            ],
            "business": [
                "Our international shipping department relies on a licensed customs broker to ensure all import declarations comply with federal trade regulations.",
                "The corporate insurance broker presented three comprehensive property and casualty proposals from competing underwriters.",
                "An institutional securities broker executed the block purchase of two million shares without causing undue market volatility."
            ],
            "conversation": [
                "\"Did the commercial broker locate an office space that matches our expansion criteria?\" — \"Yes, she negotiated a lease proposal for two floors in the downtown financial district.\"",
                "\"Why are we paying higher transaction fees on foreign exchange trades?\" — \"Our currency broker raised their spreads due to heightened market turbulence.\"",
                "\"Who handled the negotiations during the joint venture talks?\" — \"A seasoned investment broker helped mediate the valuation dispute between both companies.\""
            ],
            "collocations": [
                "real estate broker",
                "mortgage broker",
                "customs broker",
                "insurance broker",
                "prime broker",
                "licensed broker"
            ]
        },
        "wordFamily": {
            "noun": "broker, brokerage",
            "verb": "broker",
            "adjective": "brokered"
        },
        "visual": {
            "imageKeyword": "licensed stock broker multi screen trading desk",
            "imageDescription": "A professional financial broker wearing a communication headset monitoring four high-resolution screens displaying real-time stock order books, market candlestick charts, and transaction execution tickets.",
            "mnemonic": "BROKER: The key intermediary who connects BUYERS and SELLERS so nobody goes BROKE!"
        },
        "video": {
            "description": "An instructional finance documentary showing the daily routine of a securities broker, following client buy and sell orders from electronic routing to exchange floor execution and post-trade allocation."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                7
            ],
            "exampleQuestion": "Before signing the lease on the new regional distribution warehouse, corporate management consulted an experienced commercial property ______ to evaluate prevailing market rents.\n(A) broker\n(B) brokered\n(C) brokerage\n(D) brokering",
            "tips": "In TOEIC Part 5, test questions frequently test distinctions between an agent noun (person) and an institution/abstract noun. Following the adjectives 'experienced commercial property', the sentence refers to a human professional who was 'consulted' to evaluate lease terms. Therefore, the agent noun (A) 'broker' is the correct choice. Choice (C) 'brokerage' refers to the firm or commission fee, while (B) and (D) are verb forms."
        },
        "synonyms": [
            "intermediary",
            "middleman",
            "financial agent",
            "negotiator",
            "dealmaker",
            "liaison"
        ],
        "antonyms": [
            "principal",
            "end-buyer",
            "final consumer",
            "direct seller"
        ],
        "relatedWords": [
            "commission",
            "client",
            "securities",
            "real estate",
            "clearing",
            "counterparty",
            "fiduciary"
        ]
    },
    {
        "id": "finance-091",
        "word": "brokerage",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈbroʊ.kər.ɪdʒ/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/brokerage--_us_1.mp3",
            "syllableBreakdown": "bro-ker-age",
            "stressPattern": "First syllable stress: /ˈbroʊ.kər.ɪdʒ/ (●○○)",
            "commonMistakes": "Learners frequently mispronounce the final suffix '-age' as /eɪdʒ/ or /ɑːʒ/ instead of the unstressed /ɪdʒ/ (rhyming with 'shortage'). Conceptually, non-native speakers often confuse 'brokerage' (the fee charged or the intermediary firm itself) with 'broker' (the individual human agent). Learners must recognize the two primary definitions: (1) the institution or firm ('a Wall Street brokerage'), and (2) the commission fee paid for intermediary service ('pay brokerage on the transaction')."
        },
        "etymology": {
            "origin": "Middle English from Anglo-Norman French brocage / brokerage",
            "rootWord": "brocour (broker) + -age (suffix indicating fee, service, business, or condition)",
            "rootMeaning": "'The business, service, or fee of a commercial broker/middleman'",
            "evolution": "Formed in late Middle English (c. 1380–1400) by combining the Anglo-Norman root 'brocour' with the Latin-derived suffix '-aticum' / Old French '-age', designating the commission paid for an agent's services or the institutional office where transactions were recorded. By the 18th and 19th centuries, as organized stock and commodity exchanges flourished in London and New York, the word expanded from merely meaning a 'commission fee' to signifying the brokerage firm or investment house itself (e.g., brokerage company, brokerage account).",
            "relatedLanguages": [
                "French: courtage (brokerage fee or business, from courtier)",
                "Spanish: corretaje (brokerage commission)",
                "Italian: brokeraggio / provvigione",
                "German: Courtage / Maklergebühr (brokerage fee)"
            ],
            "firstRecordedUse": "Late 14th century (c. 1390 in English commercial statutes regarding commissions of merchant intermediaries)"
        },
        "deepMeaning": {
            "coreConcept": "A multifaceted financial concept encompassing: (1) a licensed intermediary firm or financial institution that executes buy and sell orders in securities, commodities, or real estate for clients; (2) the commission fee or percentage charged by an intermediary for executing a transaction; and (3) a custodial investment account held with a financial brokerage firm.",
            "spatialContext": "Securities firm headquarters, retail wealth management branches, secure online trading interfaces, and real estate brokerage offices.",
            "temporalContext": "Levied instantaneously upon trade execution and settlement (e.g., T+1 settlement cycles); accounts maintained continuously over long-term investment horizons.",
            "emotionalTone": "Institutional, regulated, objective, and fiduciary.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "When native speakers say 'brokerage', they think of either the firm that holds their money ('Which brokerage do you use? Charles Schwab, Fidelity, or Vanguard?') or the fee associated with a transaction ('brokerage charges'). In personal finance, 'brokerage account' represents taxable investment accounts separate from tax-advantaged retirement vehicles (like IRAs or 401(k)s). In commercial business, it denotes institutional investment banks and brokerage houses that execute large block orders.",
            "mentalImage": "An investor sitting at a dual-monitor home workstation logging into their online brokerage dashboard, viewing an asset allocation pie chart showing equities, municipal bonds, and cash equivalents alongside recent trade execution confirmations.",
            "whenToUse": "Use when referring to intermediary firms ('brokerage firm', 'real estate brokerage'), client investment accounts ('brokerage account'), or transaction commissions ('brokerage fee', 'brokerage commission').",
            "whenNotToUse": "Do not use 'brokerage' to refer to a single human agent (that is a 'broker'). Do not use 'brokerage' for standard commercial bank deposit checking accounts that do not support securities or asset trading.",
            "culturalContext": "The deregulation of brokerage commissions in the 1970s and the subsequent revolution of zero-commission digital brokerages (like Robinhood and E*TRADE) transformed retail participation in financial markets across the English-speaking world, making brokerage terminology part of daily vernacular."
        },
        "examples": {
            "daily": [
                "David transferred five thousand dollars from his checking account into his online brokerage account to buy shares of an index fund.",
                "The home seller was surprised to find that the brokerage fee accounted for six percent of the final property sale price.",
                "She chose that particular brokerage because it offered an easy-to-use mobile app and low foreign transaction fees."
            ],
            "business": [
                "The commercial real estate brokerage negotiated a ten-year lease agreement for our new corporate headquarters.",
                "Several boutique brokerage houses were selected to underwrite and distribute the company's initial public offering.",
                "To reduce operational overhead, the asset management firm shifted order routing to a low-cost electronic brokerage platform."
            ],
            "conversation": [
                "\"Which brokerage firm manages your company's executive equity compensation plan?\" — \"We use an institutional brokerage that provides integrated tax reporting and automated vesting schedules.\"",
                "\"Did you check whether there are any hidden brokerage charges on this international bond trade?\" — \"The compliance officer confirmed that our flat fee agreement covers all brokerage expenses.\"",
                "\"Why did they choose that regional real estate brokerage?\" — \"Their commercial division has an extensive network of corporate tenants looking for warehouse space.\""
            ],
            "collocations": [
                "brokerage firm",
                "brokerage account",
                "brokerage fee",
                "discount brokerage",
                "full-service brokerage",
                "online brokerage"
            ]
        },
        "wordFamily": {
            "noun": "brokerage, broker",
            "verb": "broker",
            "adjective": "brokered"
        },
        "visual": {
            "imageKeyword": "modern brokerage firm office financial advisory reception",
            "imageDescription": "The sleek corporate reception area of an investment brokerage firm featuring polished marble floors, an LED financial ticker scrolling market indices along the wall, and private client conference suites.",
            "mnemonic": "BROKER-AGE: The institutional AGEncy where your BROKER manages your portfolio across every AGE of life!"
        },
        "video": {
            "description": "An educational video analyzing how brokerage firms operate, contrasting full-service wealth management houses with zero-commission electronic discount brokerages, and explaining how brokerage accounts safeguard investor assets."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                7
            ],
            "exampleQuestion": "Prospective investors are strongly encouraged to review the schedule of ______ fees before opening a discretionary trading account.\n(A) broker\n(B) brokerages\n(C) brokerage\n(D) brokered",
            "tips": "In TOEIC Part 5 and Part 6, noun-noun compounds are heavily tested. The noun 'fees' is conventionally modified by the noun adjunct 'brokerage' to form the standard collocation 'brokerage fees' (the transaction commissions charged by an investment house). Choice (C) 'brokerage' is the correct modifier. Choice (A) is typically used for the person ('the broker's fees'), while (B) is plural and cannot modify 'fees', and (D) is a past participle."
        },
        "synonyms": [
            "brokerage firm",
            "brokerage house",
            "investment firm",
            "commission fee",
            "agency",
            "intermediation service"
        ],
        "antonyms": [
            "direct trade",
            "in-house trading",
            "principal transaction",
            "disintermediation"
        ],
        "relatedWords": [
            "brokerage account",
            "custody",
            "portfolio",
            "trading platform",
            "underwriting",
            "spread",
            "dividend"
        ]
    }
]

# Validation
print(f"Total words: {len(words)}")
for w in words:
    assert len(w["examples"]["daily"]) == 3, f"{w['id']} daily != 3"
    assert len(w["examples"]["business"]) == 3, f"{w['id']} business != 3"
    assert len(w["examples"]["conversation"]) in [2, 3], f"{w['id']} conversation not in [2, 3]"
    assert 5 <= len(w["examples"]["collocations"]) <= 6, f"{w['id']} collocations not 5-6"
    assert 4 <= len(w["synonyms"]) <= 6, f"{w['id']} synonyms not 4-6"
    assert 5 <= len(w["relatedWords"]) <= 7, f"{w['id']} relatedWords not 5-7"
    assert w["level"] in ["essential", "intermediate", "advanced"]
    assert w["deepMeaning"]["formalityLevel"] in ["formal", "neutral", "informal"]
    assert w["deepMeaning"]["connotation"] in ["positive", "neutral", "negative"]
    
    # Check for forbidden patterns
    text = json.dumps(w)
    assert "factor" not in text.lower() or "factor" not in [s.lower() for s in w["synonyms"]], f"factor in {w['id']}"
    assert "reconciled the ledger entries" not in text, f"boilerplate in {w['id']}"
    assert "core germanic commercial root" not in text.lower(), f"boilerplate in {w['id']}"
    assert "preservation through centuries" not in text.lower(), f"boilerplate in {w['id']}"
    assert "borr..." not in text, f"placeholder in {w['id']}"
    assert "brok..." not in text, f"placeholder in {w['id']}"
    print(f"Validated {w['id']}: {w['word']}")

with open("scratch/finance_089_091.json", "w") as f:
    json.dump(words, f, indent=4)

print("Saved scratch/finance_089_091.json successfully.")
