import json

data = {
  "words": [
    {
      "id": "finance-191",
      "word": "management accounting",
      "partOfSpeech": ["noun"],
      "category": "finance",
      "level": "advanced",
      "toeicFrequency": 7,
      "pronunciation": {
        "ipa": "/ˈmæn.ɪdʒ.mənt əˈkaʊn.tɪŋ/",
        "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/management--_us_1.mp3",
        "syllableBreakdown": "man-age-ment ac-count-ing",
        "stressPattern": "Primary stress on the first syllable of 'management' and second syllable of 'accounting': MAN-age-ment ac-COUNT-ing (/ˈmæn.ɪdʒ.mənt əˈkaʊn.tɪŋ/, ●○○ ○●○)",
        "commonMistakes": "Learners often stress the second syllable of 'management' (*man-AGE-ment*), mispronounce the medial vowel as /eɪ/ (*man-age-ment* instead of the unstressed /ɪ/ or /ə/), or pronounce the silent /e/. In 'accounting', learners frequently misplace the primary stress onto the initial syllable (*AC-count-ing*) rather than the second (/əˈkaʊn.tɪŋ/). Conceptually, non-native speakers frequently conflate 'management accounting' (internal, forward-looking financial reporting and cost control designed exclusively for executives and managers to steer strategy) with 'financial accounting' (retrospective, externally audited financial statements governed by GAAP/IFRS prepared for shareholders, creditors, and tax authorities)."
      },
      "etymology": {
        "origin": "Compound term formed from English 'management' (via Italian maneggiare and Old French mesnagement) and 'accounting' (from Anglo-Norman acompter / Old French aconter, derived from Classical Latin computare)",
        "rootWord": "maneggiare (to handle or train horses, from Latin manus 'hand') + computare (to calculate, compute, from com- 'together' + putare 'to reckon, think')",
        "rootMeaning": "'Guiding and directing operations through hands-on calculation and reckoning of figures together'",
        "evolution": "The word 'management' evolved in the 16th century from Italian maneggiare (literally 'to handle with the hand', particularly horses in a manège, from Latin manus 'hand'), later transitioning through French into English to describe corporate governance and business administration. 'Accounting' developed from Anglo-Norman acompter and Old French aconter, derived from Latin computare ('to sum up, calculate'). The specialized discipline of 'management accounting' (historically originating as 'cost accounting' during the Second Industrial Revolution) emerged in the late 19th and early 20th centuries as complex manufacturing plants, railroads, and mass production operations required internal cost allocation, variance analysis, and operational forecasting. In 1919, the National Association of Cost Accountants (now the Institute of Management Accountants, IMA) was founded in the US, and the Chartered Institute of Management Accountants (CIMA) was chartered in the UK, formally distinguishing management accounting from statutory public bookkeeping.",
        "relatedLanguages": [
          "French: comptabilité de gestion / comptabilité analytique (management accounting, cost accounting)",
          "Spanish: contabilidad de gestión / contabilidad directiva (management accounting)",
          "Italian: contabilità direzionale / contabilità gestionale (managerial accounting)",
          "German: internes Rechnungswesen / Controlling (internal management accounting, controlling)",
          "Portuguese: contabilidade gerencial (management accounting)"
        ],
        "firstRecordedUse": "Mid-20th century (circa 1950s in professional accounting literature and corporate management texts, evolving from early 20th-century 'cost accounting')"
      },
      "deepMeaning": {
        "coreConcept": "The internal corporate accounting and analytical discipline dedicated to collecting, measuring, analyzing, and presenting proprietary financial and operational data exclusively to internal organizational leaders to support strategic planning, cost control, performance evaluation, and managerial decision-making.",
        "spatialContext": "Corporate finance suites, divisional executive offices, manufacturing plant control rooms, cost accounting desks, and strategic planning boardrooms.",
        "temporalContext": "Conducted on continuous, agile operational timelines (daily flash cost summaries, weekly labor variance reviews, monthly divisional performance scorecards, and annual rolling budget forecasts) rather than statutory quarterly filing deadlines.",
        "emotionalTone": "Proactive, strategic, analytical, and performance-oriented; emphasizes future operational efficiency, cost discipline, and strategic clarity.",
        "formalityLevel": "formal",
        "connotation": "positive"
      },
      "nativeMindset": {
        "howNativesThink": "To native business leaders, management accounting is the enterprise's dashboard and navigation system. While financial accounting functions like a rearview mirror—showing outside parties what already happened under rigid legal accounting standards—management accounting looks through the windshield into the future. It is not constrained by GAAP or IFRS; instead, it provides whatever metrics internal leaders need to answer practical commercial questions: 'What is our break-even unit volume?', 'Which product lines are generating positive contribution margins?', and 'Should we manufacture this subassembly internally or outsource it to an overseas vendor?'.",
        "mentalImage": "A senior management accountant pointing at a dual-monitor dashboard displaying standard cost variance charts, contribution margin breakdowns by product tier, and quarterly overhead absorption rates while conferring with a manufacturing plant manager.",
        "whenToUse": "Use when discussing internal cost control, variance analysis, operational budgeting, contribution margin calculations, make-or-buy decisions, forecasting, and departmental resource allocation.",
        "whenNotToUse": "Do not use when referring to public shareholder annual reports, SEC 10-K filings, independent CPA external audits, or corporate tax returns (which fall strictly under 'financial accounting' or 'tax accounting'). Do not confuse with routine bookkeeping or basic payroll recording.",
        "culturalContext": "In North American and Commonwealth corporate governance, management accounting is institutionalized through elite certifications such as the CMA (Certified Management Accountant) in the US and CIMA (Chartered Institute of Management Accountants) in the UK. Management accountants are viewed not merely as clerks or scorekeepers, but as strategic business partners who sit alongside operations managers to engineer profitable business models."
      },
      "examples": {
        "daily": [
          "Before authorizing the purchase of new espresso machines, the cafe owner used basic management accounting to calculate how many daily drink sales would cover the lease.",
          "She decided to enroll in an evening course on management accounting to learn how healthcare clinics allocate staffing costs to patient services.",
          "The regional retail supervisor reviewed management accounting reports to compare utility expenses and staffing hours across four suburban branches."
        ],
        "business": [
          "Through rigorous management accounting, the leadership team discovered that freight logistics costs had exceeded initial quarterly forecasts by 14 percent.",
          "The vice president of operations relied on management accounting data to model the break-even volume required before commissioning the new automated assembly line.",
          "Our internal audit team commended the management accounting department for standardizing cost-center variance tracking across all overseas manufacturing subsidiaries."
        ],
        "conversation": [
          "\"Why is executive management requesting a management accounting audit of the packaging department?\" — \"They suspect our unit labor costs are escalating faster than our raw material expenses.\"",
          "\"Does this report need to follow US GAAP or IFRS guidelines?\" — \"No, it’s strictly an internal management accounting analysis for next Monday's resource allocation meeting.\"",
          "\"How did you determine the optimal wholesale price for our new software subscription?\" — \"Our management accounting team ran a multi-tiered contribution margin and churn-sensitivity model.\""
        ],
        "collocations": [
          "strategic management accounting",
          "management accounting system",
          "management accounting techniques",
          "management accounting reports",
          "management accounting principles",
          "role of management accounting"
        ]
      },
      "wordFamily": {
        "noun": "management accounting, management accountant, management",
        "verb": "manage, account",
        "adjective": "managerial, accountable",
        "adverb": "managerially, accountably"
      },
      "visual": {
        "imageKeyword": "management accounting cost variance dashboard meeting executive analysis",
        "imageDescription": "A management accountant analyzing a brightly lit multi-screen financial dashboard showing cost variance graphs, overhead absorption bars, and divisional profitability heatmaps during an operational strategy meeting.",
        "mnemonic": "MANAGEMENT ACCOUNTING: It's accounting tailored directly for MANAGEMENT's eyes to steer the business ahead, not for the IRS or outside banks!"
      },
      "video": {
        "description": "A chartered management accountant walking through how real-time management accounting reports empower plant managers to diagnose overhead cost spikes and recalibrate manufacturing schedules."
      },
      "toeicContext": {
        "commonParts": [3, 4, 5, 7],
        "exampleQuestion": "The executive committee will rely on the latest _______ accounting figures to evaluate whether opening a distribution hub in Seattle is financially feasible.\n(A) manage\n(B) management\n(C) managing\n(D) manageably",
        "tips": "In TOEIC Part 5, compound noun collocations in corporate finance appear frequently. The phrase 'management accounting' (kế toán quản trị) functions as a recognized compound noun where 'management' acts as a noun adjunct modifying 'accounting'. Choice (A) 'manage' is a verb; choice (C) 'managing' is a participle/gerund (while 'managing director' exists, 'managing accounting' is unidiomatic and incorrect); and choice (D) 'manageably' is an adverb which cannot modify the noun 'accounting'."
      },
      "synonyms": [
        "managerial accounting",
        "internal accounting",
        "cost accounting",
        "operational accounting",
        "management reporting",
        "cost and management accounting"
      ],
      "antonyms": [
        "financial accounting",
        "external accounting",
        "statutory accounting",
        "tax accounting"
      ],
      "relatedWords": [
        "variance analysis",
        "cost allocation",
        "budgeting",
        "break-even analysis",
        "overhead absorption",
        "contribution margin",
        "forecasting"
      ]
    },
    {
      "id": "finance-192",
      "word": "margin",
      "partOfSpeech": ["noun"],
      "category": "finance",
      "level": "essential",
      "toeicFrequency": 9,
      "pronunciation": {
        "ipa": "/ˈmɑːr.dʒɪn/",
        "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/margin--_us_1.mp3",
        "syllableBreakdown": "mar-gin",
        "stressPattern": "Primary stress on the first syllable: MAR-gin (/ˈmɑːr.dʒɪn/, ●○)",
        "commonMistakes": "Learners often mispronounce the second syllable with a hard velar plosive /g/ (*MAR-ghin*) or an elongated vowel /iː/ (*mar-JEEN*); the correct pronunciation utilizes the voiced post-alveolar affricate /dʒ/ followed by the short vowel /ɪ/ (/ˈmɑːr.dʒɪn/). In commercial finance, learners frequently confuse 'margin' (profit expressed as a percentage of selling price or revenue) with 'markup' (the percentage added directly to cost to reach the selling price). Another common error is assuming 'margin' only refers to the white border on a printed document, failing to recognize its pervasive usage in business profitability (gross margin, operating margin) and securities trading (margin trading, margin calls)."
      },
      "etymology": {
        "origin": "Classical Latin margo (stem margin-, meaning 'border, brink, boundary, edge') via Old French margin / marge and Middle English margin",
        "rootWord": "margo (border, edge, boundary, brink)",
        "rootMeaning": "'A peripheral boundary, outer edge, or border space'",
        "evolution": "Derived from the Latin noun margo (genitive marginis), denoting the border or brink of an area, river, or writing tablet. It entered Old French as marge and margin, passing into Middle English during the late 14th century to signify the unprinted border of a manuscript page. In the mid-to-late 19th century, Anglo-American commerce and commodity markets extended the concept metaphorically to financial cushions: first, as the spread between the wholesale production cost and the retail selling price (profit margin), and second, as the cash collateral deposited with a broker to absorb potential market losses when trading on borrowed funds (buying on margin). In modern corporate accounting and equity valuation, margin ratios serve as primary indicators of operational leverage and pricing power.",
        "relatedLanguages": [
          "French: marge (margin, profit margin, border)",
          "Spanish: margen (margin, edge, profit spread)",
          "Italian: margine (margin, edge, financial spread)",
          "Portuguese: margem (margin, border, profit margin)",
          "German: Marge / Gewinnspanne (margin, profit margin)"
        ],
        "firstRecordedUse": "Late 14th century (for document borders); mid-to-late 19th century (in commercial accounting and stock exchange trading)"
      },
      "deepMeaning": {
        "coreConcept": "In corporate finance and trade, the difference between the cost of producing or acquiring goods/services and their selling price, expressed as a monetary amount or percentage ratio of revenue (e.g., gross margin, operating margin); in securities and futures trading, the minimum collateral equity required in an investor's account to secure leveraged credit extended by a broker.",
        "spatialContext": "Financial spreadsheet models, corporate earnings statements, equity trading desks, brokerage trading applications, and executive pricing review rooms.",
        "temporalContext": "Tracked in real time on financial trading platforms; calculated quarterly and annually in corporate earnings releases; evaluated periodically during retail pricing reviews and vendor contract renegotiations.",
        "emotionalTone": "Prudent, evaluative, protective, and commercially discerning; indicates financial resilience, pricing power, and operational efficiency.",
        "formalityLevel": "formal",
        "connotation": "positive"
      },
      "nativeMindset": {
        "howNativesThink": "To native business people, 'margin' represents profitability, viability, and safety buffer all in one. When executives speak of 'expanding margins' or 'compressing margins', they are assessing whether the business is gaining or losing pricing power relative to its cost structure. In general speech, natives use 'margin' to describe breathing room or tolerance ('margin of error', 'margin of safety'). In financial markets, 'buying on margin' carries the psychological connotation of leveraged risk—amplifying gains during bull runs, but exposing traders to devastating liquidation via a 'margin call' during downturns.",
        "mentalImage": "A commercial pricing director examining a financial dashboard displaying a green bar chart highlighting an operating margin expansion from 18% to 23%, set alongside a line graph tracking unit cost reductions.",
        "whenToUse": "Use when discussing commercial profitability metrics (gross margin, profit margin, operating margin), safety buffers (margin of error, margin of safety), or leveraged brokerage accounts (margin requirement, margin call).",
        "whenNotToUse": "Do not confuse with 'markup' (markup is calculated on cost: [Price - Cost] / Cost; margin is calculated on selling price: [Price - Cost] / Price). Do not use 'margin' when referring simply to total top-line gross revenue or unit sales volume.",
        "culturalContext": "In Wall Street and corporate earnings culture, margin expansion is often celebrated more enthusiastically than revenue growth, as it proves management efficiency and competitive moat. Major discount retailers (such as Walmart or Costco) deliberately maintain low single-digit margins relying on high inventory turnover, whereas enterprise software (SaaS) and luxury fashion companies justify premium equity valuations with gross margins exceeding 70 to 80 percent."
      },
      "examples": {
        "daily": [
          "Before printing the lease agreement, she adjusted the document margins to one inch so the signature blocks would fit neatly on one page.",
          "The neighborhood bakery maintains a modest profit margin by using seasonal local ingredients and baking everything in controlled batches.",
          "The regional soccer team advanced to the championship round by a razor-thin margin of just one penalty goal."
        ],
        "business": [
          "By renegotiating bulk supplier agreements, the consumer electronics manufacturer increased its gross margin by 250 basis points.",
          "The brokerage issued an urgent margin call requiring the hedge fund to deposit supplementary cash collateral before market close.",
          "Software-as-a-service corporations typically command higher valuation multiples because their gross margins routinely surpass eighty percent."
        ],
        "conversation": [
          "\"Why did our stock tumble despite a ten-percent surge in overall sales volume?\" — \"Investors were alarmed by the two-percent contraction in our operating margin caused by surging ocean freight rates.\"",
          "\"Can we offer a fifteen percent discount to secure the enterprise software contract?\" — \"That would cut too deeply into our profit margin; let's offer extended customer onboarding support instead.\"",
          "\"Did the trader satisfy the margin requirement for the overnight futures contracts?\" — \"Yes, funds were wired into the clearing account thirty minutes before the closing bell.\""
        ],
        "collocations": [
          "profit margin",
          "operating margin",
          "gross margin",
          "margin of error",
          "margin call",
          "slim / narrow margin",
          "wide / healthy margin"
        ]
      },
      "wordFamily": {
        "noun": "margin, marginality, marginalization",
        "verb": "margin, marginalize",
        "adjective": "marginal, marginalized",
        "adverb": "marginally"
      },
      "visual": {
        "imageKeyword": "profit margin corporate financial report bar chart profitability percentage growth",
        "imageDescription": "A clean financial earnings report on a tablet screen showing an escalating bar chart of quarterly operating margins with a green highlight on net profit percentage, next to a stainless steel pen.",
        "mnemonic": "MARGIN: Think of the outer EDGE (Latin 'margo') of your revenue—the precious layer of profit left over after paying all your costs!"
      },
      "video": {
        "description": "A Wall Street equity analyst breaking down how operating margin expansion drives corporate enterprise value and explaining the mathematical difference between profit margin and product markup."
      },
      "toeicContext": {
        "commonParts": [3, 4, 5, 7],
        "exampleQuestion": "Due to unexpected spikes in raw material and international shipping costs, Apex Manufacturing reported a notable decline in its operating _______ for the second quarter.\n(A) margin\n(B) marginally\n(C) marginal\n(D) marginalize",
        "tips": "In TOEIC Part 5 and Part 6, financial business collocations like 'operating margin' (biên lợi nhuận hoạt động), 'profit margin' (biên lợi nhuận), and 'gross margin' (biên lợi nhuận gộp) appear frequently. The possessive pronoun 'its' and participle adjective 'operating' must be followed by a noun, making 'margin' (A) the only grammatically and contextually correct choice. Choice (B) 'marginally' is an adverb, choice (C) 'marginal' is an adjective, and choice (D) 'marginalize' is a verb."
      },
      "synonyms": [
        "profit margin",
        "spread",
        "leeway",
        "surplus",
        "cushion",
        "allowance"
      ],
      "antonyms": [
        "deficit",
        "shortfall",
        "loss"
      ],
      "relatedWords": [
        "markup",
        "gross profit",
        "operating income",
        "collateral",
        "leverage",
        "break-even point",
        "cost of goods sold"
      ]
    },
    {
      "id": "finance-193",
      "word": "market",
      "partOfSpeech": ["noun"],
      "category": "finance",
      "level": "essential",
      "toeicFrequency": 9,
      "pronunciation": {
        "ipa": "/ˈmɑːr.kɪt/",
        "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/market--_us_1.mp3",
        "syllableBreakdown": "mar-ket",
        "stressPattern": "Primary stress on the first syllable: MAR-ket (/ˈmɑːr.kɪt/, ●○)",
        "commonMistakes": "Learners frequently mispronounce the second syllable as /ket/ or /kæt/ with a full open vowel rather than the reduced short vowel /ɪ/ or /ə/ (/ˈmɑːr.kɪt/). In business English, learners often use 'market' too generically where more precise terms are expected, such as confusing 'market' (the overarching economic arena, aggregate buyers, or financial exchange) with 'marketplace' (a specific physical bazaar or digital commercial platform like Amazon), or misusing 'in the market for' versus 'on the market' ('on the market' = available for purchase; 'in the market for' = actively seeking to buy). Another common error is treating 'market' strictly as a physical building rather than recognizing its broad economic meaning as aggregate demand and supply."
      },
      "etymology": {
        "origin": "Classical Latin mercatus (trade, commerce, marketplace, buying and selling), via Old Northern French / Anglo-Norman market (variant of Old French marchiet)",
        "rootWord": "mercatus (trade, marketplace), derived from the past participle of mercari (to trade, traffic, buy), from merx (merchandise, wares)",
        "rootMeaning": "'A gathering, place, or system for buying, selling, and trafficking merchandise'",
        "evolution": "Tracing back to Classical Latin mercatus (from the verb mercari 'to buy, trade' and noun merx 'merchandise', which also gave English 'merchant', 'commerce', and 'mercantile'). Following the Norman Conquest of 1066, it was borrowed from Anglo-Norman and Old Northern French market into late Old English / early Middle English (circa 1150) to designate a chartered public place where buyers and sellers assembled to trade provisions and livestock. By the 16th and 17th centuries, with the founding of institutions like the Royal Exchange in London, 'market' broadened to include securities and commodities exchanges. During the Scottish Enlightenment, economists such as Adam Smith abstracted 'market' into the overarching mechanism of voluntary exchange and price discovery driven by supply, demand, and the 'invisible hand'.",
        "relatedLanguages": [
          "French: marché (market, contract, deal)",
          "Spanish: mercado (market, marketplace, commerce)",
          "Italian: mercato (market, trade, fair)",
          "Portuguese: mercado (market, trade, commercial arena)",
          "German: Markt (market, marketplace)"
        ],
        "firstRecordedUse": "12th century (circa 1154 in the Anglo-Saxon Chronicle, recording licensed trading markets)"
      },
      "deepMeaning": {
        "coreConcept": "An economic arena, aggregate body of actual and potential buyers and sellers, or structured institutional exchange wherein goods, services, commodities, or financial instruments are transacted, and where equilibrium prices are determined through competitive supply and demand forces.",
        "spatialContext": "Securities and commodity trading floors, institutional electronic trading terminals (Bloomberg/Refinitiv), corporate sales and marketing headquarters, international trade conventions, and retail commercial zones.",
        "temporalContext": "Structured around formal exchange trading hours (e.g., 9:30 AM to 4:00 PM EST), macroeconomic business cycles (bull and bear markets), and seasonal consumer demand quarters (Q1 through Q4).",
        "emotionalTone": "Dynamic, competitive, objective, and volatile; mirrors consumer confidence, corporate sentiment, and aggregate liquidity.",
        "formalityLevel": "formal",
        "connotation": "neutral"
      },
      "nativeMindset": {
        "howNativesThink": "To native speakers, 'market' shifts fluidly across everyday, corporate, and financial registers. In daily life, it denotes physical trade ('farmers' market') or commercial availability ('a house on the market', 'I’m in the market for a new laptop'). In corporate strategy, it signifies the competitive landscape of buyers ('capturing market share', 'entering the European market', 'identifying an untapped market'). In financial discourse, 'the market' is often personified as a discerning collective intelligence ('The market digested the earnings report', 'The bond market reacted to the inflation data'). Natives instinctively pair it with prepositions: products are brought 'to market', assets are placed 'on the market', and buyers are 'in the market'.",
        "mentalImage": "A split view: on one side, an illuminated financial exchange trading floor showing real-time ticker prices across global equity indices; on the other, a corporate strategy war room with executives studying demographic heatmaps depicting regional consumer adoption rates.",
        "whenToUse": "Use when discussing financial exchanges (stock market, capital market), commercial trading volume, target customer segments (target market, niche market), supply/demand dynamics, or corporate market share.",
        "whenNotToUse": "Do not confuse 'market' with 'marketplace' (a specific physical bazaar or software platform facilitating transactions) or 'supermarket' (a grocery store). Avoid using 'market' as a verb when the intended meaning is simply 'advertise' or 'sell' without comprehensive strategic promotion and distribution planning.",
        "culturalContext": "In Anglo-American economic thought, 'free market' capitalism and market-driven competition are considered fundamental social and economic cornerstones. Evening news broadcasts routinely feature major market index updates (Dow Jones, S&P 500, FTSE 100) as primary indicators of national economic health. Common idioms like 'let the market decide' reflect cultural reliance on decentralized price discovery."
      },
      "examples": {
        "daily": [
          "On Saturday mornings, residents walk down to the neighborhood market to purchase fresh organic produce and artisanal bread.",
          "After their third child was born, the couple decided they were in the market for a spacious minivan with modern safety features.",
          "The heritage townhouse has only been on the market for three days, but it has already received several competitive offers."
        ],
        "business": [
          "The pharmaceutical firm expanded its market share across Latin America by launching an affordable generic variant of the antibiotic.",
          "Volatile energy prices caused the bond market to experience sharp fluctuations ahead of the central bank's quarterly interest rate decision.",
          "Extensive consumer research confirmed that there is an underserved market for plant-based ready-to-eat convenience meals in urban centers."
        ],
        "conversation": [
          "\"How did the stock market respond to the unexpected announcement of the merger?\" — \"Technology shares surged by three percent, though defensive utility stocks remained largely flat.\"",
          "\"When does our development team expect to bring the new electric vehicle battery to market?\" — \"Assuming regulatory safety certifications are finalized by August, commercial rollout will begin in October.\"",
          "\"Why are we delaying the launch of our enterprise accounting platform?\" — \"Recent economic data suggests that capital market conditions are too uncertain for clients to commit to major IT overhauls right now.\""
        ],
        "collocations": [
          "market share",
          "stock market",
          "target market",
          "emerging market",
          "bring to market",
          "on the market",
          "market volatility"
        ]
      },
      "wordFamily": {
        "noun": "market, marketer, marketing, marketplace",
        "verb": "market",
        "adjective": "marketable",
        "adverb": "marketably"
      },
      "visual": {
        "imageKeyword": "financial stock market exchange display board corporate trading analytics",
        "imageDescription": "A high-tech financial exchange trading floor featuring an expansive electronic board displaying glowing green and red stock market indices, currency rates, and volumetric trading graphs.",
        "mnemonic": "MARKET: From Latin 'mercatus' (merchandise). A MARKET is where MERChants gather to trade MERChandise!"
      },
      "video": {
        "description": "An instructional finance documentary demonstrating how modern global electronic financial markets match liquidity providers with institutional investors to discover fair asset prices."
      },
      "toeicContext": {
        "commonParts": [3, 4, 5, 6, 7],
        "exampleQuestion": "By introducing an innovative subscription model, Vertex Solutions successfully captured a substantial share of the domestic enterprise software _______ within eighteen months.\n(A) market\n(B) marketable\n(C) marketed\n(D) marketing",
        "tips": "In TOEIC Part 5, test-takers are frequently evaluated on high-frequency business collocations and compound nouns such as 'market share' (thị phần) and 'software market' (thị trường phần mềm). In this sentence, the noun phrase 'the domestic enterprise software _______' requires a head noun to complete the compound object of the preposition 'of'. Choice (A) 'market' correctly creates the compound 'software market'. Choice (B) 'marketable' is an adjective, choice (C) 'marketed' is a past participle/verb, and choice (D) 'marketing' refers to the activity/discipline of promoting products rather than the commercial arena of buyers itself."
      },
      "synonyms": [
        "marketplace",
        "exchange",
        "trading arena",
        "commercial sector",
        "target demographic",
        "bazaar"
      ],
      "antonyms": [
        "command economy",
        "state monopoly",
        "planned economy"
      ],
      "relatedWords": [
        "market share",
        "supply and demand",
        "liquidity",
        "commodities",
        "capital market",
        "bull market",
        "bear market"
      ]
    }
  ]
}

print(f"Total words: {len(data['words'])}")
for idx, w in enumerate(data['words']):
    print(f"Word {idx+1}: {w['id']} - {w['word']}")
    # check required fields
    assert "id" in w
    assert "word" in w
    assert "partOfSpeech" in w and isinstance(w["partOfSpeech"], list)
    assert "category" in w
    assert "level" in w and w["level"] in ["essential", "intermediate", "advanced"]
    assert "toeicFrequency" in w and isinstance(w["toeicFrequency"], (int, float))
    assert "pronunciation" in w
    p = w["pronunciation"]
    assert "ipa" in p and "syllableBreakdown" in p and "stressPattern" in p and "commonMistakes" in p
    assert "etymology" in w
    e = w["etymology"]
    assert "origin" in e and "rootWord" in e and "rootMeaning" in e and "evolution" in e and "relatedLanguages" in e and "firstRecordedUse" in e
    assert "deepMeaning" in w
    dm = w["deepMeaning"]
    assert "coreConcept" in dm and "spatialContext" in dm and "temporalContext" in dm and "emotionalTone" in dm
    assert dm["formalityLevel"] in ["formal", "neutral", "informal"]
    assert dm["connotation"] in ["positive", "neutral", "negative"]
    assert "nativeMindset" in w
    nm = w["nativeMindset"]
    assert "howNativesThink" in nm and "mentalImage" in nm and "whenToUse" in nm and "whenNotToUse" in nm and "culturalContext" in nm
    assert "examples" in w
    ex = w["examples"]
    assert "daily" in ex and len(ex["daily"]) >= 3
    assert "business" in ex and len(ex["business"]) >= 3
    assert "conversation" in ex and len(ex["conversation"]) >= 2
    assert "collocations" in ex and len(ex["collocations"]) >= 5
    assert "wordFamily" in w
    wf = w["wordFamily"]
    assert "noun" in wf and "verb" in wf and "adjective" in wf and "adverb" in wf
    assert "visual" in w
    v = w["visual"]
    assert "imageKeyword" in v and "imageDescription" in v and "mnemonic" in v
    assert "video" in w
    assert "description" in w["video"]
    assert "toeicContext" in w
    tc = w["toeicContext"]
    assert "commonParts" in tc and isinstance(tc["commonParts"], list)
    assert "exampleQuestion" in tc and "tips" in tc
    assert "synonyms" in w and len(w["synonyms"]) >= 4
    assert "antonyms" in w and isinstance(w["antonyms"], list)
    assert "relatedWords" in w and len(w["relatedWords"]) >= 5

print("All validations passed successfully!")
