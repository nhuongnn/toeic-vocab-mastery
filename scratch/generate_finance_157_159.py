import json
import re

gain_entry = {
    "id": "finance-157",
    "word": "gain",
    "partOfSpeech": [
        "noun"
    ],
    "category": "finance",
    "level": "essential",
    "toeicFrequency": 9,
    "pronunciation": {
        "ipa": "/ɡeɪn/",
        "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/gain--_us_1.mp3",
        "syllableBreakdown": "gain",
        "stressPattern": "●",
        "commonMistakes": "Learners frequently substitute the diphthong /eɪ/ with a flat monophthong /e/ or /ɛ/, making it sound like 'gen' (/ɡɛn/), or shorten the vowel before the voiced alveolar nasal /n/. In financial discussions, non-native speakers also frequently confuse 'gain' with 'revenue' or 'profit', improperly using 'gain' to denote ordinary top-line customer billings rather than an increase in asset value or non-operating surplus."
    },
    "etymology": {
        "origin": "Middle English gayne / gain, borrowed from Anglo-Norman gain / gayn (noun) and Old French gaaignier (verb, 'to earn, win, harvest, cultivate land'), from Frankish *waidanjan ('to pasture, forage, hunt for food'), derived from Proto-Germanic *waidōną ('to hunt, pasture').",
        "rootWord": "Frankish *waidanjan / Old French gaaignier",
        "rootMeaning": "to graze, pasture, hunt for sustenance, or harvest crops from the land",
        "evolution": "Originating in Germanic pastoral and hunting vocabulary, Frankish *waidanjan was adopted into Gallo-Romance and Old French as 'gaaignier' (to till the soil, reap agricultural yield). The derived noun 'gain' denoted the tangible harvest or produce won from labor. Following the Norman Conquest, the word entered Middle English during the 14th century, expanding from agrarian yields to commercial profits and mercantile winnings. By the advent of modern double-entry bookkeeping and 20th-century GAAP/IFRS standards, 'gain' became strictly defined in corporate finance as an increase in net equity resulting from peripheral or incidental asset transactions rather than primary day-to-day operations.",
        "relatedLanguages": [
            "French: gain (profit, earnings, financial increase)",
            "Italian: guadagno (earnings, profit, financial return - via Gothic ga-waidjan)",
            "Spanish: ganancia (profit, financial gain, margin)",
            "German: Weide (pasture, forage - retaining the Proto-Germanic root)",
            "Portuguese: ganho (gain, earnings, profit)"
        ],
        "firstRecordedUse": "Late 14th century (c. 1380, in Middle English mercantile and legal chronicles)"
    },
    "deepMeaning": {
        "coreConcept": "An increase in net assets, financial surplus, or capital value generated from peripheral or non-operating transactions—such as disposing of property, plant, and equipment above book value, investment portfolio appreciation, or favorable foreign currency fluctuations—or more broadly, the quantitative financial excess realized when the proceeds from an asset sale exceed its original purchase basis.",
        "spatialContext": "Income statements (specifically classified below operating income under 'Other Income and Expenses' / non-operating items), corporate cash flow statements under investing activities, institutional trading desks, and tax schedules for realized capital gains.",
        "temporalContext": "Fiscal quarter closes, annual financial audits, portfolio rebalancing dates, mark-to-market valuation reconciliations, and asset divestiture closings.",
        "emotionalTone": "Lucrative, strategic, calculated, and advantageous.",
        "formalityLevel": "formal",
        "connotation": "positive"
    },
    "nativeMindset": {
        "howNativesThink": "Native financial professionals maintain a strict mental boundary between 'revenue' and 'gain'. While revenue represents the continuous, predictable top-line inflow from selling primary products or services, a 'gain' is perceived as an incremental surplus or value bump—typically from selling off an appreciated capital asset (like real estate or machinery) or favorable market movements (stock appreciation, currency shifts). Traders and portfolio managers instinctively think in terms of 'paper gains' (unrealized gains) versus 'locked-in gains' (realized capital gains), prioritizing risk management to protect accumulated gains from sudden market reversals.",
        "mentalImage": "A financial director pointing to a multi-step income statement on a projected display screen, highlighting a $3.5 million non-operating gain from the sale of an outdated distribution depot, which raised net income despite flat manufacturing sales.",
        "whenToUse": "Use when referring to financial capital appreciation, surplus realized upon disposing of fixed or financial assets, currency exchange windfalls, portfolio growth, or percentage increases in equity values (e.g., 'capital gains', 'unrealized gain', 'net gain on disposal').",
        "whenNotToUse": "Do not use 'gain' to denote regular sales revenue, client fees, or gross turnover earned from day-to-day core operations (e.g., say 'quarterly revenue increased by 10%', not 'quarterly gain increased by 10%'). Do not confuse with gross operating profit.",
        "culturalContext": "In Anglo-American capital markets and tax regimes (IRS in the United States, HMRC in the UK), 'capital gains' are subject to specialized tax rates differentiating short-term holdings from long-term investments held over one year. Wall Street analysts scrutinize quarterly earnings reports to distinguish organic operating growth from artificial earnings bumps caused by one-off asset sales ('one-off gains')."
    },
    "examples": {
        "daily": [
            "After holding the diversified index fund for nearly a decade, she realized a handsome capital gain when selling her shares to purchase a townhouse.",
            "The tech-heavy stock index posted sharp gains during early morning trading following positive inflation data.",
            "Small, consistent efficiency gains in household budgeting helped them eliminate their credit card debt within six months."
        ],
        "business": [
            "The quarterly earnings report highlighted a pre-tax gain of $12.5 million from the divestiture of the company's European warehousing network.",
            "Unrealized foreign exchange gains bolstered net income, shielding the multinational conglomerate from slumping domestic retail volumes.",
            "Asset managers cautioned clients that recent equity gains could be eroded if the central bank raises benchmark interest rates."
        ],
        "conversation": [
            "\"Why did our fourth-quarter net earnings exceed projections by twenty percent even though manufacturing output was down?\" / \"We booked a substantial one-time gain of eight million dollars after divesting our minority stake in the logistics joint venture.\"",
            "\"Should we liquidate our position in the commercial real estate fund today?\" / \"I strongly suggest locking in our fifteen-percent gain before the upcoming policy meeting creates further bond yield volatility.\""
        ],
        "collocations": [
            "capital gain",
            "realized gain",
            "unrealized gain",
            "net gain",
            "foreign exchange gain",
            "post a gain"
        ]
    },
    "wordFamily": {
        "noun": "gain",
        "verb": "gain",
        "adjective": "gainful",
        "adverb": "gainfully"
    },
    "visual": {
        "imageKeyword": "stock market capital gain financial chart green candlestick upward trend balance sheet",
        "imageDescription": "A dual-monitor trading workstation showing a green candlestick financial chart soaring past previous resistance levels, beside an audited balance sheet highlighting capital gains and positive portfolio equity balances.",
        "mnemonic": "GAIN: When you sell an asset for more than you gave, the GAIN is the extra profit you bag and save!"
    },
    "video": {
        "description": "A corporate finance tutorial illustrating how to distinguish operating revenue from a 'gain on disposal of fixed assets' on a multi-step income statement under US GAAP."
    },
    "toeicContext": {
        "commonParts": [
            4,
            5,
            6,
            7
        ],
        "exampleQuestion": "Due to the profitable divestiture of its non-core logistics subsidiary, Vanguard Energy reported a net _____ of $18.4 million in its second-quarter earnings release. (A) gain (B) gained (C) gainfully (D) gaining",
        "tips": "In TOEIC Part 5, grammatical classification items often position the blank following a modifying adjective like 'net' or 'capital' and preceding a prepositional phrase like 'of [amount]'. The sentence requires the countable singular noun (A) 'gain'. Choice (B) is a past-tense verb, (C) is an adverb meaning productively, and (D) is a present participle or gerund."
    },
    "synonyms": [
        "capital appreciation",
        "financial surplus",
        "profit",
        "net increase",
        "return",
        "capital increment"
    ],
    "antonyms": [
        "loss",
        "capital loss",
        "deficit",
        "depreciation",
        "decline"
    ],
    "relatedWords": [
        "book value",
        "cost basis",
        "divestiture",
        "proceeds",
        "mark-to-market",
        "unrealized profit",
        "capital gains tax"
    ]
}

goodwill_entry = {
    "id": "finance-158",
    "word": "goodwill",
    "partOfSpeech": [
        "noun"
    ],
    "category": "finance",
    "level": "intermediate",
    "toeicFrequency": 8,
    "pronunciation": {
        "ipa": "/ˌɡʊdˈwɪl/",
        "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/goodwill--_us_1.mp3",
        "syllableBreakdown": "good·will",
        "stressPattern": "○●",
        "commonMistakes": "Learners frequently mispronounce the first syllable by using the long tense vowel /uː/ ('good' rhyming with 'food') instead of the short lax vowel /ʊ/ ('good' rhyming with 'wood'). In business environments, non-native speakers also confuse the general ethical/diplomatic meaning ('benevolence, friendly relations') with the rigorous accounting definition, mistakenly assuming 'goodwill' is just a vague public relations concept rather than a capitalized, auditable balance-sheet asset subject to annual impairment testing."
    },
    "etymology": {
        "origin": "Middle English god wille / good-will, formed by compounding Old English gōd ('virtuous, beneficial, favorable') and willa / wille ('will, wish, desire, intentional disposition'), from Proto-Germanic *gōdaz and *wiljô.",
        "rootWord": "Old English gōd + willa",
        "rootMeaning": "benevolent disposition, favorable intention, or gracious favor toward others",
        "evolution": "Originally denoting moral benevolence or peaceful intent in medieval theology and Anglo-Saxon legal oaths, 'goodwill' took on a mercantile dimension in late 16th-century English common law and merchant custom (c. 1571). It referred to the established trade reputation, customer loyalty, and ongoing local patronage built up by an innkeeper or shopkeeper that transferred to a new proprietor upon the sale of the business premises. With the industrial revolution and 20th-century standardization of corporate accounting (culminating in modern US GAAP ASC 350 and IFRS 3), 'goodwill' was codified into an essential balance-sheet metric: an intangible asset quantifying the purchase price premium paid in a corporate acquisition above the net fair market value of all identifiable tangible and intangible assets and liabilities.",
        "relatedLanguages": [
            "Dutch: goodwill (absorbed into Dutch corporate accounting) / welwillendheid (benevolence)",
            "German: Firmenwert / Geschäfts- oder Firmenwert (goodwill in accounting) / Wohlwollen (goodwill/benevolence)",
            "French: écart d'acquisition / survaleur (accounting goodwill) / bienveillance (benevolent goodwill)",
            "Spanish: fondo de comercio (commercial accounting goodwill) / plusvalía comprada / buena voluntad",
            "Italian: avviamento (commercial/accounting goodwill) / benevolenza"
        ],
        "firstRecordedUse": "Early 13th century (c. 1225, in the sense of moral benevolence); late 16th century (c. 1571, in commercial transfer deeds and merchant partnerships)"
    },
    "deepMeaning": {
        "coreConcept": "An intangible balance-sheet asset recognized in financial accounting when an acquiring company purchases a business entity for a price exceeding the aggregate fair market value of its identifiable net tangible and intangible assets, representing unquantifiable strategic premiums such as proprietary brand loyalty, intellectual capital, skilled executive leadership, customer retention, and superior competitive positioning.",
        "spatialContext": "Consolidated corporate balance sheets under non-current intangible assets, M&A due diligence virtual data rooms, acquisition purchase price allocation (PPA) workpapers, and SEC 10-K regulatory filings.",
        "temporalContext": "Recorded at the completion of an M&A merger or buyout transaction; reviewed at least annually during fiscal year-end financial statement preparation for potential impairment testing under GAAP and IFRS rules.",
        "emotionalTone": "Prestige-driven, strategic, high-stakes, and vulnerable to valuation risk.",
        "formalityLevel": "formal",
        "connotation": "positive"
    },
    "nativeMindset": {
        "howNativesThink": "In standard corporate parlance, native speakers comfortably operate across two layers of 'goodwill': the relational layer ('a goodwill ambassador', 'building goodwill with local regulators') and the financial balance-sheet layer. To a native CFO or investment banker, financial goodwill represents the exact premium you paid because a company's brand, customer loyalty, and team cannot be bought piece-by-piece from a catalog. However, seasoned native analysts view massive goodwill figures with healthy skepticism: if the post-merger integration falters, that paper asset will be abruptly wiped out as a non-cash 'goodwill impairment charge', crushing quarterly net earnings.",
        "mentalImage": "Two executive teams shaking hands across a glass conference table in a high-rise tower to seal a $500 million buyout, while an accounting controller at the back of the room opens a ledger spreadsheet to allocate $120 million to intangible goodwill because the brand's cult customer base far exceeds its physical warehouse assets.",
        "whenToUse": "Use in business combinations, M&A valuations, corporate balance-sheet reporting, purchase price allocation analyses, discussions of brand equity premium, or when detailing goodwill impairment write-downs in audited reports.",
        "whenNotToUse": "Do not use 'goodwill' to designate physical property, machinery, liquid working capital, or identifiable intellectual property like registered patents or software copyrights (which must be listed as distinct intangible assets). Avoid using it to describe routine day-to-day employee kindness.",
        "culturalContext": "In Western capitalism and securities regulation (such as the SEC in the US and the IASB internationally), goodwill accounting is among the most scrutinized areas in corporate audits. When prominent tech conglomerates or media titans overpay for acquisitions and subsequently announce billions in 'goodwill write-downs', it serves as a major market event covered extensively in Bloomberg, CNBC, and the Financial Times."
    },
    "examples": {
        "daily": [
            "The hotel chain offered complimentary weekend vouchers to all affected guests as an expression of goodwill after the plumbing malfunction.",
            "Decades of fair pricing and personalized service have earned the family-owned pharmacy enormous goodwill within the surrounding neighborhood.",
            "Waiving the customary late payment penalty for first-time customers proved to be an invaluable way to foster lasting goodwill."
        ],
        "business": [
            "Following the $450 million acquisition of the renewable energy startup, the corporation recorded $85 million in goodwill on its consolidated balance sheet.",
            "Weaker-than-expected European sales prompted the electronics conglomerate to record a $1.2 billion non-cash goodwill impairment charge in the final quarter.",
            "External auditors reviewed the fair-value modeling assumptions to ensure the carrying value of the reporting unit's goodwill remained justified."
        ],
        "conversation": [
            "\"Why does the purchase price of the boutique marketing agency exceed its physical net assets by thirty million dollars?\" / \"That premium reflects goodwill—specifically their prestigious client roster, proprietary design methodologies, and ninety-percent customer retention rate.\"",
            "\"Did the audit committee express concern about the recent semiconductor buyout?\" / \"Yes, they noted that if component demand drops next quarter, we may be forced to book an impairment against the newly acquired goodwill.\""
        ],
        "collocations": [
            "goodwill impairment",
            "impairment of goodwill",
            "record goodwill",
            "carrying value of goodwill",
            "customer goodwill",
            "gesture of goodwill"
        ]
    },
    "wordFamily": {
        "noun": "goodwill",
        "adjective": "goodwill-related"
    },
    "visual": {
        "imageKeyword": "corporate merger acquisition balance sheet intangible asset goodwill business executive handshake",
        "imageDescription": "Two corporate executives in tailored business suits shaking hands over a signed acquisition contract in a sunlit glass boardroom, with an illuminated digital balance sheet overlay displaying 'Intangible Assets: Goodwill' in clear ledger typeface.",
        "mnemonic": "GOODWILL: When a company's GOOD name and customer WILLingness to buy are worth millions more than its physical gear!"
    },
    "video": {
        "description": "A corporate accounting case study examining how an international media conglomerate calculates purchase price allocation and performs annual goodwill impairment tests under IFRS 3."
    },
    "toeicContext": {
        "commonParts": [
            4,
            5,
            6,
            7
        ],
        "exampleQuestion": "Following its high-profile acquisition of the regional fiber-optic network, Omnicom Media booked $42 million in _____ under the non-current intangible assets section of its balance sheet. (A) goodwill (B) goodness (C) willingly (D) goodwill's",
        "tips": "In TOEIC Part 5 financial accounting questions, the preposition 'in' requires an uncountable noun denoting an asset category. (A) 'goodwill' is the recognized accounting term for the excess purchase price over net identifiable assets in an acquisition. Choice (B) refers to moral virtue, (C) is an adverb, and (D) is an ungrammatical possessive noun."
    },
    "synonyms": [
        "acquisition premium",
        "brand equity",
        "intangible asset value",
        "commercial reputation",
        "customer patronage",
        "business reputation"
    ],
    "antonyms": [
        "negative goodwill",
        "badwill",
        "ill will",
        "animosity"
    ],
    "relatedWords": [
        "impairment charge",
        "purchase price allocation",
        "fair market value",
        "intangible asset",
        "mergers and acquisitions",
        "carrying value",
        "due diligence"
    ]
}

grant_entry = {
    "id": "finance-159",
    "word": "grant",
    "partOfSpeech": [
        "noun"
    ],
    "category": "finance",
    "level": "essential",
    "toeicFrequency": 9,
    "pronunciation": {
        "ipa": "/ɡrænt/",
        "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/grant--_us_1.mp3",
        "syllableBreakdown": "grant",
        "stressPattern": "●",
        "commonMistakes": "Learners often mispronounce the vowel by lengthening it into a diphthong like /eɪ/ (making it sound like 'great' or 'grain') or swallowing the final consonant cluster /nt/, dropping the alveolar stop /t/. In TOEIC listening sections, test takers unfamiliar with British pronunciation may be caught off guard by the broad back vowel /ɡrɑːnt/ versus the American front open /ɡrænt/. Conceptually, learners frequently confuse a 'grant' with a 'loan', failing to recognize that a grant is non-repayable funding subject to compliance covenants."
    },
    "etymology": {
        "origin": "Middle English graunt / grant (noun) and graunten (verb), borrowed from Anglo-Norman graunt / graunter, an alteration of Old French creanter / craanter ('to promise, guarantee, bestow, authorize'), from Vulgar Latin *credentāre ('to believe, entrust, make credible'), derived from Classical Latin crēdere ('to believe, entrust, lend on trust').",
        "rootWord": "Latin crēdere / Vulgar Latin *credentāre -> Anglo-Norman graunter",
        "rootMeaning": "to trust, entrust, formally promise, or bestow on faith",
        "evolution": "In Classical Latin, 'crēdere' meant to entrust or place confidence in, which evolved in Vulgar Latin into '*credentāre' (to guarantee, promise formal backing). Through Old French and Anglo-Norman, the initial hard 'c' voiced into 'g' (creanter -> graanter -> graunter). In medieval England following the Norman Conquest, monarchs issued formal royal charters and patents to 'grant' estates, monopolies, and guild privileges. Over the 18th to 20th centuries, legal and fiscal jurisprudence adapted the word to public finance: a 'grant' became a statutory non-repayable monetary allocation awarded by parliamentary bodies or philanthropic trusts for scientific research, municipal infrastructure, and education. In modern corporate finance and human resources, the term also expanded to signify an official allocation of stock options or equity shares ('stock grant').",
        "relatedLanguages": [
            "Anglo-Norman: graunter (to concede, grant, confirm)",
            "French: subvention (monetary grant) / octroyer (to grant officially)",
            "Spanish: subvención / concesión (grant/subsidy) / creer (to believe - from Latin crēdere)",
            "Italian: concessione / sussidio (grant) / credere (to believe - from Latin crēdere)",
            "Portuguese: subsídio / doação (grant/subsidy) / crer (to believe)"
        ],
        "firstRecordedUse": "Early 13th century (c. 1225, in Anglo-Norman legal charters and Middle English legal rolls)"
    },
    "deepMeaning": {
        "coreConcept": "A non-repayable financial transfer or monetary disbursement bestowed by a government agency, philanthropic foundation, municipal authority, or corporate institution to an individual, research body, enterprise, or non-profit to fund a designated public-interest initiative, scientific research project, or capital development program under stipulated compliance covenants; in executive compensation, an official award of corporate equity or stock options.",
        "spatialContext": "Government agency procurement offices, university sponsored research administration departments, corporate R&D laboratories, municipal economic development centers, and non-profit grant-writing offices.",
        "temporalContext": "Fiscal appropriation cycles, scheduled competitive application deadlines, multi-phase milestone disbursements, and post-award compliance audit cycles.",
        "emotionalTone": "Competitive, merit-based, rigorous, and legally accountable.",
        "formalityLevel": "formal",
        "connotation": "positive"
    },
    "nativeMindset": {
        "howNativesThink": "To native speakers, the word 'grant' fundamentally implies non-repayable capital earned through competitive merit rather than borrowing. Unlike a commercial loan, you never have to repay principal or interest on a grant; unlike venture equity, you don't surrender ownership shares. However, natives know that 'free money' is a misnomer: obtaining a grant entails navigating arduous application processes, and managing a grant involves draconian bookkeeping, expenditure tracking, and performance reporting covenants where any misallocated penny must be returned. In corporate compensation, hearing 'equity grant' or 'stock grant' immediately signals an incentive award of company stock tied to multi-year vesting schedules.",
        "mentalImage": "A university principal investigator and laboratory team gathered in an engineering office, reviewing an official signed award notice from the federal government confirming a $3.2 million renewable energy research grant, alongside a binder containing strict audit guidelines and milestone deadlines.",
        "whenToUse": "Use when referring to government subsidies, philanthropic foundation awards, academic research funding, non-profit community project financing, or corporate employee equity compensation awards (e.g., 'research grant', 'federal grant', 'block grant', 'stock grant').",
        "whenNotToUse": "Do not use 'grant' to describe a commercial bank loan with interest obligations, a private equity investment requiring shareholder seats, a customer payment for commercial goods, or everyday informal cash gifts.",
        "culturalContext": "In North America, the UK, and Europe, public grant programs (such as Small Business Innovation Research / SBIR in the US, Horizon Europe in the EU, and UK Research and Innovation) are vital engines of economic growth and scientific breakthroughs. In TOEIC reading passages (Parts 6 and 7), corporate announcements, municipal press releases, and grant acceptance letters are standard test formats."
    },
    "examples": {
        "daily": [
            "The neighborhood arts council secured a $25,000 community grant to restore the historical downtown mural.",
            "Her graduate research into sustainable agriculture was fully funded through a competitive three-year federal grant.",
            "Local homeowners can apply for a state clean-energy grant to offset the cost of installing residential solar panels."
        ],
        "business": [
            "The biopharmaceutical firm received a $5 million research and development grant from the Department of Health to accelerate vaccine trials.",
            "As part of the annual executive compensation review, the board of directors authorized a restricted stock grant for key technology leaders.",
            "To ensure compliance with the terms of the federal grant, the finance department conducted a comprehensive audit of all project disbursements."
        ],
        "conversation": [
            "\"Did the municipal planning board approve our funding proposal for the urban transit study?\" / \"Yes, we were awarded a two-hundred-thousand-dollar matching grant, provided that private sponsors contribute equal capital by December.\"",
            "\"How will the engineering department finance the new robotics laboratory?\" / \"They just finalized the paperwork for a major technology infrastructure grant from an international philanthropic foundation.\""
        ],
        "collocations": [
            "federal grant",
            "research grant",
            "matching grant",
            "grant application",
            "award a grant",
            "grant funding"
        ]
    },
    "wordFamily": {
        "noun": "grant, grantee, grantor",
        "verb": "grant",
        "adjective": "granted"
    },
    "visual": {
        "imageKeyword": "government research grant laboratory scientist certificate funding approval non-profit",
        "imageDescription": "A lead research scientist in a modern biotechnology laboratory holding an official framed grant approval certificate from an environmental agency, surrounded by advanced analytical instruments and an applauding research team.",
        "mnemonic": "GRANT: Don't take it for GRANTED—it's a GIFT from a foundation or government that you don't have to pay BACK, if you keep your research on TRACK!"
    },
    "video": {
        "description": "An informational seminar by a federal small business administration detailing the application eligibility, proposal writing, and compliance audit standards for federal innovation research grants."
    },
    "toeicContext": {
        "commonParts": [
            3,
            4,
            5,
            6,
            7
        ],
        "exampleQuestion": "GreenTech Solutions was recently awarded a $2.5 million government _____ to develop high-efficiency batteries for commercial electric vehicles. (A) grant (B) granted (C) granting (D) grantable",
        "tips": "In TOEIC Part 5, noun phrase structures frequently feature the sequence: indefinite article ('a') + monetary figure + modifying noun ('government') + [blank]. The position requires the singular countable noun indicating the financial allocation: (A) 'grant'. Choice (B) is a past participle/verb, (C) is a present participle/gerund, and (D) is an adjective."
    },
    "synonyms": [
        "subsidy",
        "financial allocation",
        "funding award",
        "subvention",
        "endowment",
        "stipend"
    ],
    "antonyms": [
        "commercial loan",
        "debt obligation",
        "repayment",
        "levy",
        "assessment"
    ],
    "relatedWords": [
        "grantee",
        "grantor",
        "endowment",
        "disbursement",
        "covenant",
        "compliance audit",
        "proposal"
    ]
}

words = [gain_entry, goodwill_entry, grant_entry]

# Save to words_output.json
with open("words_output.json", "w", encoding="utf-8") as f:
    json.dump(words, f, indent=2, ensure_ascii=False)
print("Saved words_output.json successfully!")
