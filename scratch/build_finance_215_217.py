import json

words_data = {
    "words": [
        {
            "id": "finance-215",
            "word": "percentage",
            "partOfSpeech": [
                "noun"
            ],
            "category": "finance",
            "level": "intermediate",
            "toeicFrequency": 8,
            "pronunciation": {
                "ipa": "/pərˈsen.tɪdʒ/",
                "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/percentage--_us_1.mp3",
                "syllableBreakdown": "per-cen-tage",
                "stressPattern": "Unstressed first syllable, primary stress on second syllable: per-CEN-tage (/pərˈsen.tɪdʒ/, ○●○)",
                "commonMistakes": "Non-native learners universally confuse 'percent' and 'percentage'. 'Percent' (%) must strictly follow an explicit numeral (e.g., '15 percent', '40 percent'), whereas 'percentage' is a noun preceded by determiners or adjectives without an explicit preceding number (e.g., 'a high percentage of market share', 'what percentage of revenue?'). Writing *'15 percentage'* or *'a high percent of users'* is a critical grammatical error frequently penalized in TOEIC Part 5. Additionally, non-native speakers frequently confuse 'percentage points' with 'percent' when describing changes in rates (a jump from 4% to 6% is a 2 percentage point increase, but a 50 percent relative increase). Phonetically, learners often mispronounce the final unstressed suffix '-tage' as *-tahzh* or *-teydzh* instead of the correct reduced /tɪdʒ/."
            },
            "etymology": {
                "origin": "Modern English formation from Medieval Latin per centum (by the hundred) compounded with the Anglo-Norman / Middle French noun suffix -age",
                "rootWord": "Medieval Latin per centum (by the hundred) + English suffix -age (denoting rate, relation, or condition, from Latin -aticum)",
                "rootMeaning": "'A rate, proportion, or commission duty calculated by each hundred'",
                "evolution": "The mathematical computation of interest, customs tariffs, and maritime cargo fees by hundredths traces back to late Roman law (centesima rerum venalium). In Renaissance Italy, merchant banking hubs in Genoa, Venice, and Florence standardized ledger accounting using 'per cento', abbreviated in commerce as 'p 100' or with early loop symbols that evolved into the modern '%' sign. In the 16th and 17th centuries, English merchants adopted the commercial Latin phrase 'per centum'. By the late 18th century (circa 1788), English financial commentators and political economists combined 'per cent' with the substantive suffix '-age' (parallel to 'brokerage' and 'mileage') to denote the abstract mathematical ratio, commission cut, or statistical rate itself rather than an explicit numerical quantity. In contemporary corporate finance and accounting, 'percentage' represents the universal standard for normalizing growth, cost structures, and profitability across disparate enterprise scales.",
                "relatedLanguages": [
                    "French: pourcentage (percentage, proportion)",
                    "Spanish: porcentaje (percentage, rate)",
                    "Italian: percentuale (percentage)",
                    "Portuguese: porcentagem (percentage)",
                    "German: Prozentsatz (percentage rate, quota)"
                ],
                "firstRecordedUse": "Late 18th century (circa 1788 in British parliamentary commercial records and mercantile handbooks)"
            },
            "deepMeaning": {
                "coreConcept": "A mathematical rate, fractional proportion, or relative share expressed as parts per hundred, utilized in corporate accounting, financial analysis, and operational reporting to standardize and evaluate margins, returns, capital allocations, and performance trends independent of absolute currency or volume amounts.",
                "spatialContext": "Corporate financial dashboards, executive board presentations, spreadsheet comparative columns (e.g., % of total revenue, QoQ % change), investor earnings call decks, and financial terminals (Bloomberg, FactSet).",
                "temporalContext": "Continuously referenced during monthly closing cycles, quarterly earnings releases (QoQ), year-over-year (YoY) comparative audits, and annual budgeting reviews.",
                "emotionalTone": "Analytical, objective, comparative, and evaluative; provides proportion and scale clarity by stripping out raw size differences.",
                "formalityLevel": "formal",
                "connotation": "neutral"
            },
            "nativeMindset": {
                "howNativesThink": "To native business speakers, 'percentage' immediately signals relative scale rather than raw dollars: an increase of $50,000 means very little in isolation, but an '80 percentage surge in overhead' or 'a 2 percentage point margin compression' instantly triggers alarm or approval. Natives intuitively treat 'percentage' as both a statistical ratio ('the percentage of defective units') and a contractual slice of financial upside ('an equity percentage' or 'a percentage of gross licensing revenue'). Grammatically, native speakers instinctively never place an exact numeral directly before 'percentage' (never *'12 percentage'*), reserving 'percent' exclusively for explicit figures.",
                "mentalImage": "A senior financial analyst standing before a dual-screen presentation in a glass conference room, pointing to a segmented donut chart that highlights the percentage share of quarterly operating income generated by international cloud subscriptions.",
                "whenToUse": "Use when referring to a proportional ratio, fractional share, or relative rate without an explicit preceding number (e.g., 'a substantial percentage of our workforce', 'the percentage of non-performing loans declined', 'calculate the margin percentage'). Also use when discussing negotiated commission cuts or royalty participation stakes.",
                "whenNotToUse": "NEVER use immediately after a specific numeral (use 'percent' or '%' instead, e.g., '12 percent', not *'12 percentage'*). Do not confuse with 'percentile' (which designates a rank in a distribution curve, such as scoring in the 90th percentile). Avoid using 'percentage points' interchangeably with 'percent' when describing changes between two interest or margin rates.",
                "culturalContext": "In North American and Commonwealth corporate culture, executive compensation, KPI scorecards, and institutional shareholder audits revolve fundamentally around percentage metrics: gross margin percentage, return on invested capital (ROIC), customer churn percentage, and YoY revenue growth percentage. Wall Street analysts value margin percentage expansion far more than top-line dollar volume because percentage margins prove genuine pricing power and operational leverage."
            },
            "examples": {
                "daily": [
                    "Only a small percentage of suburban commuters take public transit during non-peak weekend hours.",
                    "The packaging label clearly lists the percentage of recommended daily fiber provided in each serving.",
                    "A significant percentage of online shoppers abandon their shopping carts when unexpected shipping fees are added at checkout."
                ],
                "business": [
                    "Despite a ten percent increase in top-line sales, our gross margin percentage contracted due to soaring oceanic freight expenses.",
                    "The investment committee voted to raise the portfolio's asset allocation percentage dedicated to green infrastructure bonds.",
                    "By adopting automated optical inspection on the assembly line, the electronics plant decreased the percentage of defective circuit boards to under 0.1 percent."
                ],
                "conversation": [
                    "\"What percentage of our annual operational budget is earmarked for cybersecurity upgrades?\" — \"Currently about eleven percent, but the chief information officer is lobbying to raise that allocation next quarter.\"",
                    "\"Did the seasonal promotional discount succeed in boosting our e-commerce conversion rates?\" — \"Yes, the percentage of website visitors completing a purchase jumped from two to four and a half percent over the holiday weekend.\"",
                    "\"Are commercial leasing agents compensated with a fixed salary or a percentage of newly signed contracts?\" — \"They receive a baseline salary plus a five percent commission percentage on gross annual lease values.\""
                ],
                "collocations": [
                    "percentage of",
                    "high percentage",
                    "low percentage",
                    "percentage increase",
                    "percentage decrease",
                    "margin percentage",
                    "percentage point"
                ]
            },
            "wordFamily": {
                "noun": "percentage",
                "adjective": "percentage-based",
                "adverb": "percentagewise"
            },
            "visual": {
                "imageKeyword": "financial analyst executive presentation pie chart percentage breakdown boardroom screen",
                "imageDescription": "A sharp, modern corporate boardroom where a financial analyst gestures toward an interactive digital screen showing a brightly segmented pie chart and comparative bar graphs analyzing the percentage distribution of operating costs across global subsidiaries.",
                "mnemonic": "PERCENTAGE = PER CENT (for every 100) + -AGE (measure or rate). It literally measures what portion out of 100 parts your share represents!"
            },
            "video": {
                "description": "A corporate financial analysis masterclass demonstrating how investment analysts calculate gross margin percentage and operating profit percentage from corporate income statements to compare the relative efficiency of competing retail giants."
            },
            "toeicContext": {
                "commonParts": [
                    5,
                    6,
                    7
                ],
                "exampleQuestion": "Thanks to the newly negotiated freight contract, the logistics provider reduced the _______ of transit delays caused by regional hub congestion.\n(A) percentage\n(B) percent\n(C) percentiles\n(D) percentage-wise",
                "tips": "A staple TOEIC Part 5 grammatical trap involves choosing between 'percent' and 'percentage'. Remember this cardinal rule: 'percent' is used after a specific number (e.g., '15 percent', 'over 50 percent'), whereas 'percentage' is a noun that follows determiners (such as 'the', 'a', 'what', or qualitative adjectives like 'small' or 'large') and is typically paired with 'of + noun'. In this sentence, preceded by the definite article 'the' and followed by 'of transit delays', the head noun '(A) percentage' is the only grammatically correct option."
            },
            "synonyms": [
                "proportion",
                "share",
                "fraction",
                "ratio",
                "quota",
                "allocation"
            ],
            "antonyms": [
                "whole",
                "entirety",
                "totality",
                "aggregate"
            ],
            "relatedWords": [
                "percent",
                "percentile",
                "basis point",
                "rate",
                "margin",
                "proportion",
                "yield"
            ]
        },
        {
            "id": "finance-216",
            "word": "performance",
            "partOfSpeech": [
                "noun"
            ],
            "category": "finance",
            "level": "advanced",
            "toeicFrequency": 7,
            "pronunciation": {
                "ipa": "/pərˈfɔːr.məns/",
                "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/performance--_us_1.mp3",
                "syllableBreakdown": "per-for-mance",
                "stressPattern": "Unstressed first syllable, primary stress on second syllable: per-FOR-mance (/pərˈfɔːr.məns/, ○●○)",
                "commonMistakes": "Non-native speakers frequently misplace the primary stress onto the first syllable (*PER-for-mance*) rather than the second syllable (/pərˈfɔːr.məns/). Another frequent pronunciation mistake is pronouncing the vowel in '-for-' as an unreduced /oʊ/ (like 'cone') or slurring it, rather than a clear rhotic /ɔːr/ vowel in American English or /ɔː/ in British English. Grammatically, English learners frequently treat 'performance' as countable (*'we reviewed several performances of our subsidiaries'*) when discussing financial results; in finance, corporate results and financial health are almost always discussed as an uncountable mass noun ('strong quarterly performance', 'underlying financial performance') unless explicitly referring to artistic stage shows or distinct theatrical acts. Additionally, in contracts, learners confuse a 'performance bond' (a financial surety bond guaranteeing completion of contractual obligations) with investment returns."
            },
            "etymology": {
                "origin": "Anglo-Norman and Middle French parforner / parfournir (to accomplish, complete, carry out thoroughly), from Old French par- (thoroughly, completely, from Latin per-) + fournir (to furnish, accomplish, provide, of Germanic/Frankish origin *frumjan), combined with the noun suffix -ance (from Latin -antia).",
                "rootWord": "Anglo-Norman parfournir / Middle English parfourmen (to execute, carry through to completion) + -ance (action or condition)",
                "rootMeaning": "'The complete fulfillment, execution, or carrying through of a duty, promise, or operational undertaking'",
                "evolution": "In feudal Anglo-Norman legal documents (14th century), 'performance' originally designated the fulfillment of a solemn covenant, vow, or legal obligation (such as the performance of a contract or tenure service). During the 16th and 17th centuries, the term broadened into theatrical and artistic execution (staging an exhibition or play). By the 19th-century Industrial Revolution and the rise of joint-stock corporations and mechanical engineering, 'performance' was adopted to denote the operational efficiency, output capability, and power delivery of machinery, steam engines, and financial enterprises. In 20th-century modern portfolio theory and corporate finance, the term became institutionalized as the definitive quantitative measurement of investment yield, asset management alpha/beta, return on equity (ROE), and fiscal achievement relative to peer benchmarks and market indices.",
                "relatedLanguages": [
                    "French: performance (achievement, return, performance)",
                    "Spanish: rendimiento (performance, yield) / desempeño (execution, track record)",
                    "Italian: rendimento (performance, yield) / prestazione (fulfillment, execution)",
                    "German: Wertentwicklung (portfolio performance, value development) / Leistungsfähigkeit (capacity, performance)"
                ],
                "firstRecordedUse": "Late 14th century (circa 1380–1400 in Anglo-Norman and Middle English legal and administrative records for the execution of covenants; 19th century in modern financial reporting for investment yield)"
            },
            "deepMeaning": {
                "coreConcept": "The quantitative measurement and qualitative evaluation of how effectively an investment portfolio, financial asset, business unit, or enterprise generates yields, executes strategic budgets, and achieves profitability over a specified period relative to capital invested and predetermined market benchmarks.",
                "spatialContext": "Quarterly earnings conference rooms, institutional investment committee decks, Bloomberg terminal portfolio monitors (PORT screen), annual shareholder reports (Form 10-K), and wealth management client review suites.",
                "temporalContext": "Analyzed continuously in real-time trading desks, reviewed systematically at monthly accounting closes, quarterly earnings releases (Q1-Q4), and annual fiscal audits.",
                "emotionalTone": "Objective, evaluative, accountability-driven, and rigorous; reflects either fiscal triumph (outperformance) or financial vulnerability (underperformance).",
                "formalityLevel": "formal",
                "connotation": "neutral"
            },
            "nativeMindset": {
                "howNativesThink": "In finance and corporate executive suites, native speakers immediately associate 'performance' with bottom-line results, scorecard metrics, and return on investment (ROI). It is never abstract: natives instinctively ask 'Performance against what?'—demanding a benchmark (e.g., against the budget, against the prior year, or against the S&P 500 index). Furthermore, natives instinctively recognize the SEC-mandated phrase 'past performance is no guarantee of future results' as the cornerstone of investment risk disclosures. In corporate governance, it ties directly to incentives ('performance bonuses', 'performance-based compensation', 'performance share units').",
                "mentalImage": "A portfolio manager sitting in front of a multi-monitor trading desk at an asset management firm, comparing a green upward-trending graph of the fund's year-to-date performance against the gray benchmark line of the MSCI World Index.",
                "whenToUse": "Use when evaluating financial yields, investment returns, company profitability, operational efficiency, budget adherence, or contractual fulfillment (e.g., 'portfolio performance', 'financial performance was buoyed by international sales', 'performance appraisal', 'performance bond').",
                "whenNotToUse": "Do not use 'performance' as a countable noun when referring to financial results (do not say *'our company had three great performances this year'*; say 'three quarters of strong performance'). Do not confuse with 'productivity' (which refers to output per unit of input/hour) or 'capacity' (the maximum theoretical output). In contract law, distinguish 'specific performance' (an equitable court order compelling a party to execute exact contract terms) from mere financial yield.",
                "culturalContext": "In Anglo-American capital markets and corporate governance, 'performance' is the supreme arbiter of corporate survival. Executives are compensated primarily through performance-based equity grants (options and restricted stock units), and asset managers face immediate capital flight if their fund's net performance lags benchmark indices for two consecutive quarters. Wall Street culture equates performance directly with competence and value creation."
            },
            "examples": {
                "daily": [
                    "Before choosing a retirement index fund, Marcus carefully researched its five-year annualized performance and expense ratio.",
                    "The family's financial advisor explained that the high-yield savings account offered reliable performance without exposing their emergency fund to stock market volatility.",
                    "Rising fuel prices and supply chain delays had a noticeable impact on the delivery company's overall quarterly performance."
                ],
                "business": [
                    "The board of directors attributed the enterprise's stellar financial performance to aggressive cost discipline and double-digit subscription growth in North America.",
                    "Due to sustained underperformance relative to the benchmark index, the pension fund reassigned thirty percent of its assets to an actively managed quantitative fund.",
                    "Under the newly enacted executive compensation package, executive bonuses are strictly tied to key performance indicators, including return on equity and free cash flow generation."
                ],
                "conversation": [
                    "\"How did our emerging markets portfolio fare during the recent market correction?\" — \"Surprisingly well; its risk-adjusted performance actually beat the benchmark by nearly two hundred basis points.\"",
                    "\"Will the chief financial officer address the division's sluggish performance at tomorrow's all-hands meeting?\" — \"Yes, she plans to present a restructuring plan aimed at restoring operating margins by the fourth quarter.\"",
                    "\"Are employee merit increases linked directly to annual performance reviews this cycle?\" — \"Yes, department heads have been instructed to align salary adjustments strictly with individual and team performance metrics.\""
                ],
                "collocations": [
                    "financial performance",
                    "portfolio performance",
                    "quarterly performance",
                    "past performance",
                    "performance-based compensation",
                    "key performance indicator"
                ]
            },
            "wordFamily": {
                "noun": "performance",
                "verb": "perform",
                "adjective": "performing",
                "adverb": "performatively"
            },
            "visual": {
                "imageKeyword": "hedge fund manager reviewing portfolio performance dashboard financial charts monitors",
                "imageDescription": "An experienced portfolio manager standing before glowing trading monitors displaying interactive financial line charts, percentage return metrics, and comparative equity benchmarks indicating quarterly investment performance.",
                "mnemonic": "PER-FORM-ANCE = Thoroughly (PER-) FORMING and executing your financial commitments and investment goals to achieve measurable returns!"
            },
            "video": {
                "description": "An executive briefing by a chief investment officer analyzing quarterly portfolio performance, breaking down sector asset allocation, return on invested capital (ROIC), and alpha generation against benchmark indices."
            },
            "toeicContext": {
                "commonParts": [
                    5,
                    6,
                    7
                ],
                "exampleQuestion": "Due to the outstanding financial _______ of the renewable energy division, senior leadership announced plans to expand operations into Southeast Asia.\n(A) perform\n(B) performing\n(C) performance\n(D) performed",
                "tips": "A recurring Part 5 question type tests noun vs. verb forms following compound noun or adjective modifiers. In the phrase 'the outstanding financial _______ of the renewable energy division', the definite article 'the' and the adjective 'financial' require a head noun. Choice (C) 'performance' correctly completes the noun phrase acting as the object of the preposition 'Due to'. Distinguish this from the verb base (A), participle/gerund (B), or past tense verb (D)."
            },
            "synonyms": [
                "financial yield",
                "operating results",
                "profitability",
                "track record",
                "return on investment",
                "execution"
            ],
            "antonyms": [
                "underperformance",
                "nonperformance",
                "default",
                "stagnation",
                "insolvency"
            ],
            "relatedWords": [
                "benchmark",
                "alpha",
                "key performance indicator",
                "return on equity",
                "yield",
                "outperform",
                "underperform"
            ]
        },
        {
            "id": "finance-217",
            "word": "perpetuity",
            "partOfSpeech": [
                "noun"
            ],
            "category": "finance",
            "level": "intermediate",
            "toeicFrequency": 8,
            "pronunciation": {
                "ipa": "/ˌpɜːr.pəˈtuː.ə.t̬i/",
                "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/perpetuity--_us_1.mp3",
                "syllableBreakdown": "per-pe-tu-i-ty",
                "stressPattern": "Secondary stress on first syllable, unstressed second syllable, primary stress on third syllable: per-pe-TU-i-ty (/ˌpɜːr.pəˈtuː.ə.t̬i/, ˌ○●○○)",
                "commonMistakes": "Non-native learners often stumble over the five syllables of 'per-pe-tu-i-ty', frequently placing stress mistakenly on the second syllable (*per-PET-u-ity*) instead of the third syllable (/ˌpɜːr.pəˈtuː.ə.t̬i/). In American English, the 't' before the final '-y' is flapped (/t̬i/), while British English features the 'yod' sound /tjuː/. Grammatically, learners frequently misuse the preposition when using the idiomatic adverbial phrase; it is strictly 'in perpetuity' (e.g., 'leased in perpetuity'), never *'at perpetuity'* or *'to perpetuity'*. Financially, learners confuse an 'annuity' (cash flows for a finite, specified number of years) with a 'perpetuity' (an infinite, unending stream of cash flows with no terminal date)."
            },
            "etymology": {
                "origin": "Middle English perpetuite, borrowed from Anglo-Norman perpetuité and Old French perpetuité, directly from Latin perpetuitās (uninterrupted duration, continuity, everlasting quality), derived from perpetuus (continuous, uninterrupted, unbroken, perpetual), which combines per- (through, throughout) + petere (to aim at, rush toward, seek).",
                "rootWord": "Latin perpetuus (continuous, unbroken, enduring through time) + abstract noun suffix -itās (-ity, state or condition)",
                "rootMeaning": "'The state or condition of continuing without interruption or termination forever'",
                "evolution": "In Classical Rome, 'perpetuitas' denoted uninterrupted political office or civic stability. During the Middle Ages, Canon law and English Common Law adopted the concept in land tenure and feudal estates (leading to the famous 'Rule Against Perpetuities', established to prevent feudal landowners from tying up land title across generations forever). In 18th-century British public finance, the Chancellor of the Exchequer created 'Consols' (Perpetual Annuities in 1751) which paid interest indefinitely with no redemption date. In 20th-century corporate valuation and financial economics, Myron Gordon and subsequent financial theorists integrated the perpetuity formula (PV = C/r) into modern Discounted Cash Flow (DCF) modeling to compute terminal values for businesses projected into perpetual operation.",
                "relatedLanguages": [
                    "French: perpétuité (perpetuity, endlessness; as in à perpétuité)",
                    "Spanish: perpetuidad (perpetuity; en perpetuidad)",
                    "Italian: perpetuità (perpetuity; in perpetuità)",
                    "Portuguese: perpetuidade (perpetuity; em perpetuidade)",
                    "German: ewige Rente (perpetuity / perpetual annuity) / Ewigkeit (perpetuity, eternity)"
                ],
                "firstRecordedUse": "Late 14th century (circa 1380–1400 in Middle English legal charters and testamentary deeds of endowment)"
            },
            "deepMeaning": {
                "coreConcept": "A financial instrument, stream of cash payments, or contractual legal condition characterized by an indefinite, unending duration without an expiration or maturity date; specifically in corporate valuation, a continuous cash flow stream modeled to estimate terminal value via capitalization formulas.",
                "spatialContext": "Investment banking valuation spreadsheets (DCF terminal value calculation cells), endowment fund charter agreements, corporate merger contracts, perpetual bond prospectus documentation, and real estate easement registries.",
                "temporalContext": "Theoretical infinite time horizon; in corporate finance, modeled at the end of a 5-to-10-year explicit forecasting horizon to capture all future enterprise cash flows.",
                "emotionalTone": "Monumental, permanent, formal, and legally absolute; conveys binding permanence and unending financial continuity.",
                "formalityLevel": "formal",
                "connotation": "neutral"
            },
            "nativeMindset": {
                "howNativesThink": "To a native finance professional or corporate attorney, 'perpetuity' triggers two immediate associations: the mathematical perpetuity formula (PV = C/r used in business valuation) and the legal phrase 'in perpetuity' (meaning forever, without renegotiation). When an investment banker discusses terminal value, they think of the company generating stable cash flows in perpetuity. When a corporate lawyer hears a patent or software license granted 'in perpetuity', they immediately recognize that the licensee will never need to renew or repay licensing fees.",
                "mentalImage": "An investment banking analyst in a skyscraper conference room reviewing a financial model on an Excel sheet, adjusting the terminal growth rate in a Gordon Growth perpetuity formula to value a software company's ongoing enterprise value.",
                "whenToUse": "Use in corporate finance and investment valuation when referring to infinite cash flow streams, perpetual bonds (consols), preferred dividends, or terminal value calculations. In contract law and commercial agreements, use the phrase 'in perpetuity' when rights, mineral easements, trademark licenses, or royalty obligations are granted forever without expiration.",
                "whenNotToUse": "Do not use 'perpetuity' for contracts with standard expiration, renewal, or sunset clauses. Do not confuse with 'annuity' (an annuity has a fixed term of years, such as a 20-year annuity). Avoid casual usage in informal conversation where 'indefinitely', 'forever', or 'permanently' would sound far more natural.",
                "culturalContext": "In Anglo-American finance and common law, perpetuity holds profound historical and economic significance. Anglo-American property law has wrestled with the 'Rule Against Perpetuities' for centuries to prevent dead benefactors from controlling wealth indefinitely. In capital markets, British 'consols' funded the Napoleonic Wars through perpetual debt. In modern Wall Street DCF modeling, the 'perpetuity growth method' routinely accounts for 60% to 80% of a company's total estimated enterprise value, making terminal perpetuity assumptions the most heavily scrutinized figures in mergers and acquisitions."
            },
            "examples": {
                "daily": [
                    "Under the terms of the deed, the conservation trust acquired the rights to protect the coastal woodland in perpetuity.",
                    "The family estate established a university scholarship fund designed to pay out an annual student stipend in perpetuity.",
                    "When the photographer signed the digital asset buyout, she granted the advertising agency the right to use her photographs in perpetuity."
                ],
                "business": [
                    "To determine the firm's acquisition value, the investment bank calculated the present value of future cash flows using a three percent growth perpetuity model.",
                    "The municipal utility issued perpetual bonds that offer institutional investors a steady five percent coupon payment in perpetuity.",
                    "The technology licensing contract explicitly stipulates that the royalty payments on the patented chipset will continue in perpetuity unless mutually revoked."
                ],
                "conversation": [
                    "\"Why is the terminal value accounting for seventy percent of the target company's total valuation?\" — \"Because our DCF model assumes stable, cash-generating operations in perpetuity beyond the five-year forecast window.\"",
                    "\"Does this commercial copyright agreement require an annual renewal fee?\" — \"No, our legal team negotiated a one-time upfront fee that grants us global publishing rights in perpetuity.\"",
                    "\"Are perpetual bonds common in today's corporate credit market?\" — \"They are relatively rare compared to fixed-maturity debentures, though major banks occasionally issue them as Tier 1 capital instruments in perpetuity.\""
                ],
                "collocations": [
                    "in perpetuity",
                    "grant in perpetuity",
                    "hold in perpetuity",
                    "growing perpetuity",
                    "value of a perpetuity",
                    "perpetuity formula"
                ]
            },
            "wordFamily": {
                "noun": "perpetuity",
                "verb": "perpetuate",
                "adjective": "perpetual",
                "adverb": "perpetually"
            },
            "visual": {
                "imageKeyword": "investment banker valuation spreadsheet DCF terminal value perpetuity mathematical formula financial model",
                "imageDescription": "An investment banker in a sleek corporate office examining a complex Discounted Cash Flow valuation model on a high-resolution display, highlighting the formula calculating terminal value in perpetuity alongside financial statements.",
                "mnemonic": "PERPETUITY sounds like PERPETUAL + UNITY. Think of a cash flow stream that continues PERPETUALLY into the infinite future without ever stopping!"
            },
            "video": {
                "description": "A financial modeling tutorial by a former Wall Street analyst explaining how to calculate the present value of a perpetuity and apply the Gordon Growth Model to derive enterprise terminal value in discounted cash flow analyses."
            },
            "toeicContext": {
                "commonParts": [
                    5,
                    6,
                    7
                ],
                "exampleQuestion": "Under the newly signed licensing agreement, the media corporation acquired the exclusive distribution rights to the award-winning documentary series in _______.\n(A) perpetual\n(B) perpetually\n(C) perpetuity\n(D) perpetuate",
                "tips": "A classic TOEIC Part 5 prepositional phrase question tests recognition of fixed business idioms. The preposition 'in' followed by a blank at the end of a clause describing rights or duration requires the abstract noun forming the established idiom 'in perpetuity' (meaning forever/indefinitely). Choice (C) 'perpetuity' is correct. The adjective (A), adverb (B), and verb (D) cannot serve as the object of the preposition 'in' in this structure."
            },
            "synonyms": [
                "eternity",
                "permanence",
                "endlessness",
                "perpetual annuity",
                "infinite duration",
                "perpetuation"
            ],
            "antonyms": [
                "transience",
                "impermanence",
                "temporariness",
                "expiration",
                "finite duration"
            ],
            "relatedWords": [
                "annuity",
                "terminal value",
                "discounted cash flow",
                "perpetual bond",
                "consol",
                "capitalization rate",
                "Gordon growth model"
            ]
        }
    ]
}

with open("scratch/finance_215_217.json", "w", encoding="utf-8") as f:
    json.dump(words_data, f, indent=4, ensure_ascii=False)

print("Saved scratch/finance_215_217.json successfully!")
