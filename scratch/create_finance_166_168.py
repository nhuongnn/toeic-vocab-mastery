import json

words_data = [
    {
        "id": "finance-166",
        "word": "holding",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈhoʊl.dɪŋ/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/holding--_us_1.mp3",
            "syllableBreakdown": "hold·ing",
            "stressPattern": "●○",
            "commonMistakes": "Learners often articulate the diphthong /oʊ/ as a flat monophthong /ɔː/ or /ɒ/, making it sound like 'hall-ding', or drop the final velar nasal /ŋ/ into /n/ ('holdin'). In financial English, non-native speakers also frequently confuse the singular and plural forms: while 'holding company' uses the singular noun as a compound modifier, an investor's or fund's portfolio of securities or assets is virtually always referred to in the plural as 'holdings'."
        },
        "etymology": {
            "origin": "Old English healdan (to keep custody of, guard, possess) + Middle English nominal suffix -ing.",
            "rootWord": "Proto-Germanic *haldaną (to hold, tend, guard), from PIE *kel- (to drive, urge onward)",
            "rootMeaning": "'The act or state of keeping, possessing, or guarding property or land'",
            "evolution": "In medieval English common law (c. 12th-14th century), 'holding' denoted agricultural land or tenements held under feudal tenancy from a lord. With the rise of joint-stock corporations and securities exchanges in the 19th century, the term shifted from physical acreage to financial equity stakes, securities, and bonds held in an investment portfolio. By the late 19th century (c. 1890s), American corporate law coined 'holding company' to describe an enterprise formed specifically to own controlling shares in other operating businesses.",
            "relatedLanguages": [
                "Dutch: houden (to hold, keep) / holding (borrowed financial term)",
                "German: halten (to hold, preserve) / Beteiligung (financial holding, stake)",
                "Danish: holde (to hold, keep)",
                "French: holding (holding company) / participation (equity holding)",
                "Spanish: holding (holding company) / participación accionaria (stock holding)"
            ],
            "firstRecordedUse": "c. 950 for the general verbal noun of custody; mid-19th century (c. 1870s) for securities and investment portfolios; c. 1890 for holding companies."
        },
        "deepMeaning": {
            "coreConcept": "A legally owned asset, equity stake, bond, parcel of real estate, or subsidiary interest held by an individual investor, financial institution, or corporation; in corporate structure, a legal entity ('holding company') established to own controlling interests in other commercial corporations. In portfolio management, the plural form ('holdings') refers to the aggregate collection of investments.",
            "spatialContext": "Asset management trading floors, institutional portfolio dashboards (e.g. Bloomberg Terminals), SEC Form 13F regulatory filing systems, and conglomerate boardroom executive suites.",
            "temporalContext": "Quarterly portfolio reporting deadlines (such as SEC Form 13F disclosures), annual fund rebalancing periods, and conglomerate consolidation cycles.",
            "emotionalTone": "Authoritative, strategic, proprietary, and prudent.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Native English speakers instinctively distinguish three core financial applications of 'holding': 1) Plural 'holdings', representing the distinct securities, equities, or properties in an investment fund or private account (e.g., 'energy holdings', 'liquid holdings'); 2) Singular attributive modifier in corporate governance ('holding company', 'holding structure'), indicating an entity that owns other businesses rather than producing goods directly; 3) Percentage ownership stake ('a 25% holding in the venture'). In everyday financial conversation, natives almost never use the singular 'a holding' to describe a single stock; they refer to 'a share', 'a position', or 'holdings' collectively.",
            "mentalImage": "An institutional fund manager reviewing an executive dashboard display featuring a circular pie chart breakdown of top equity holdings (semiconductors, municipal bonds, and cash equivalents) alongside an organizational chart linking a parent holding company to its operating subsidiaries.",
            "whenToUse": "Use when referencing the investments, equities, or physical real estate owned by a person, fund, or sovereign entity (e.g., 'disclose portfolio holdings', 'liquidate foreign currency holdings'), or when identifying a parent conglomerate designed to control operating subsidiaries (e.g., 'bank holding company', 'multinational holding firm').",
            "whenNotToUse": "Do not use 'holding' when referring to cash flow transactions or everyday consumer expenses. Do not confuse a 'holding company' (which exercises ownership and capital allocation) with an 'operating company' (which manufactures products, hires operational labor, and serves customers directly). Avoid using singular 'holding' when referring to an individual stock purchase; say 'position', 'stock', or 'holding stake'.",
            "culturalContext": "In Anglo-American corporate finance, the holding company structure—exemplified by conglomerates like Berkshire Hathaway or Alphabet Inc.—serves as a primary legal vehicle for asset protection, tax efficiency, and capital redeployment across diverse industry verticals. Furthermore, under U.S. federal securities law, institutional investment managers overseeing more than $100 million in assets must file Form 13F quarterly, making institutional 'holdings' a matter of public record closely tracked by Wall Street analysts."
        },
        "examples": {
            "daily": [
                "After reviewing her retirement plan, Elena instructed her wealth advisor to rebalance her portfolio holdings to favor lower-risk index funds.",
                "The monthly brokerage statement provides an itemized valuation of all equity and bond holdings in the family trust account.",
                "Local property investors often register their residential real estate holdings under individual LLCs to limit personal liability."
            ],
            "business": [
                "Following the corporate restructuring, the parent holding company will retain full ownership of the intellectual property while licensing it to operating subsidiaries.",
                "The sovereign wealth fund reduced its holdings in commercial office towers in response to sustained remote-working trends across major financial centers.",
                "Under federal securities regulations, institutional fund managers must disclose their long equity holdings at the conclusion of each fiscal quarter."
            ],
            "conversation": [
                "\"Is the investment committee planning to divest from any retail sector holdings before the fiscal year wraps up?\" / \"Yes, analysts recommended trimming our holdings in department store chains to increase liquidity for emerging tech investments.\"",
                "\"Why did the founders choose to establish a holding company rather than expanding the original operating entity?\" / \"It allows them to isolate operational risk across different international markets and streamline their corporate tax structure.\"",
                "\"Did the quarterly treasury audit reconcile our overseas currency holdings accurately?\" / \"Yes, all foreign exchange holdings were marked to market based on the latest central bank closing rates.\""
            ],
            "collocations": [
                "portfolio holdings",
                "holding company",
                "disclose equity holdings",
                "liquidate holdings",
                "foreign currency holdings",
                "majority holding"
            ]
        },
        "wordFamily": {
            "noun": "holding, holdings, holder",
            "verb": "hold",
            "adjective": "held, holding",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "portfolio holdings stock chart investment ledger corporate holding company structure",
            "imageDescription": "A financial analyst analyzing a high-resolution investment dashboard showing asset allocation pie charts of institutional holdings next to a legal conglomerate corporate structure diagram.",
            "mnemonic": "HOLD-ING: An investor HOLDS onto valuable stocks and assets for the future, or a parent firm HOLDS controlling shares of other companies!"
        },
        "video": {
            "description": "A financial analyst illustrates how corporate holding companies manage diverse business subsidiaries and explains how institutional investors disclose quarterly equity holdings on Form 13F."
        },
        "toeicContext": {
            "commonParts": [
                5,
                6,
                7
            ],
            "exampleQuestion": "To mitigate liability and optimize cross-border tax management, the logistics enterprise reorganized its regional subsidiaries under a newly established _____ company.\n(A) hold\n(B) holding\n(C) holder\n(D) held",
            "tips": "In TOEIC Part 5, test-takers frequently encounter the established business compound noun 'holding company' (a parent corporation that holds controlling stock in subsidiaries). While (A) 'hold' is the base verb/noun, (C) 'holder' refers to an individual or physical device, and (D) 'held' is a past participle, only the gerund-participle noun (B) 'holding' correctly functions as the modifier in this standard corporate term. Additionally, look out for the plural noun 'holdings' in Part 7 investor newsletters and annual reports to denote investment portfolios (e.g., 'energy holdings', 'cash holdings')."
        },
        "synonyms": [
            "assets",
            "investments",
            "portfolio",
            "equity stake",
            "securities",
            "possessions"
        ],
        "antonyms": [
            "liabilities",
            "debts",
            "divestitures",
            "obligations"
        ],
        "relatedWords": [
            "holding company",
            "subsidiary",
            "portfolio",
            "asset allocation",
            "equity stake",
            "conglomerate",
            "divestment"
        ]
    },
    {
        "id": "finance-167",
        "word": "incentive",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ɪnˈsen.tɪv/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/incentive--_us_1.mp3",
            "syllableBreakdown": "in·cen·tive",
            "stressPattern": "○●○",
            "commonMistakes": "Learners often place stress incorrectly on the first syllable (/ˈɪn.sən.tɪv/) or flatten the middle vowel. The primary stress rests firmly on the second syllable: in-CEN-tive. Additionally, because the suffix '-ive' is commonly associated with adjectives (like 'creative' or 'active'), non-native speakers frequently mistakenly believe 'incentive' is purely an adjective, failing to recognize it as a versatile, highly countable business noun meaning a financial inducement or reward."
        },
        "etymology": {
            "origin": "Late Latin incentīvus (setting the tune, provocative, inciting), from Classical Latin incinere (to strike up a melody, blow a trumpet), composed of in- (into, upon) + canere (to sing, sound a musical instrument).",
            "rootWord": "Latin in- (into, upon) + canere (to sing, sound)",
            "rootMeaning": "'Setting the tune or rhythm,' hence that which incites, inspires, or prompts movement and action",
            "evolution": "In Classical Latin musical theory, 'incentivus' described striking up a chant or setting a musical tempo. In Late Latin and medieval rhetoric, the word took on the psychological figurative sense of a stimulus or provocation that moves the mind. It entered the English language in the late 16th century (c. 1590s) meaning a motive or incitement. By the late 19th and early 20th century, with the rise of industrial management theory and microeconomics, 'incentive' was formalized in corporate finance and labor economics to denote financial bonuses, commission schedules, tax exemptions, and subsidies designed to stimulate specific economic behavior or productivity.",
            "relatedLanguages": [
                "Italian: incentivo (incentive, stimulus)",
                "Spanish: incentivo (incentive, bonus)",
                "French: incitation (incentive, inducement) / incitatif (incentive measure)",
                "Portuguese: incentivo (incentive, encouragement)",
                "German: Anreiz (incentive, stimulus) / Leistungsanreiz (performance incentive)"
            ],
            "firstRecordedUse": "Late 16th century (c. 1590s as a noun denoting an incitement or provocation to action); early 20th century in formal corporate compensation and economic policy."
        },
        "deepMeaning": {
            "coreConcept": "A monetary or non-monetary reward, tax concession, subsidy, or contractual provision intentionally offered to motivate individuals, employees, or corporate entities to attain higher performance, increase output, adopt desirable practices, or finalize a commercial agreement.",
            "spatialContext": "Corporate compensation committee boardrooms, sales office performance tracking boards, municipal economic development agency headquarters, and commercial contract negotiation tables.",
            "temporalContext": "Quarterly sales commission disbursement cycles, annual performance review bonus calculations, municipal economic development grant windows, and seasonal consumer rebate campaigns.",
            "emotionalTone": "Motivational, energizing, rewarding, and strategic.",
            "formalityLevel": "formal",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "To a native speaker, an 'incentive' is always an intentional, designed mechanism: someone created this reward specifically to channel behavior toward a designated outcome ('incentive alignment'). Natives categorize incentives into financial forms (year-end cash bonuses, stock options, commission escalators, municipal tax credits) and non-monetary forms (extra paid leave, public accolades, flexible schedules). They also recognize the concept of negative incentives (penalties or fees meant to deter behavior). In corporate vernacular, 'incentive' implies mutual benefit: the organization achieves higher revenue or innovation, and the participant gains tangible reward.",
            "mentalImage": "A corporate vice president of sales unveiling an end-of-quarter incentive scheme on an auditorium screen, displaying a tiered cash bonus ladder alongside luxury travel packages for top-performing account executives.",
            "whenToUse": "Use when discussing motivational mechanisms, bonus compensation, or policy inducements: e.g., 'financial incentive', 'sales incentive plan', 'government tax incentives', 'strong incentive to meet deadlines', 'incentive compensation'.",
            "whenNotToUse": "Do not confuse 'incentive' with 'motivation' (motivation is internal psychological drive, whereas an incentive is the external reward that inspires it). Do not use 'incentive' for standard base wages or unconditional routine salary. Avoid using it for unintended or spontaneous windfalls.",
            "culturalContext": "In modern corporate capitalism, especially across the United States and the Commonwealth, incentive structures form the bedrock of sales compensation and executive leadership alignment. Performance-based incentives (such as stock option grants) are legally required to be disclosed in annual proxy statements (SEC Form DEF 14A). Furthermore, state and local governments routinely leverage competitive tax incentives and capital grants to lure corporate headquarters and manufacturing facilities to their jurisdictions."
        },
        "examples": {
            "daily": [
                "The municipal energy board introduced a cash incentive for homeowners who replace aging gas furnaces with high-efficiency heat pumps.",
                "To reduce traffic congestion during morning rush hours, the transit authority created a fare incentive for commuters traveling prior to seven o'clock.",
                "The supermarket loyalty program provides an extra discount incentive for customers who bring their own reusable shopping bags."
            ],
            "business": [
                "The executive compensation committee structured the CEO's incentive package to vest over five years based on compound annual revenue growth.",
                "Several Midwestern states competed aggressively for the electric vehicle manufacturing plant by offering comprehensive tax incentives and subsidized utility rates.",
                "To accelerate client invoice settlements before the fiscal close, the controller authorized a two percent cash incentive for payments received within ten business days."
            ],
            "conversation": [
                "\"Will the new commission structure offer enough incentive for our senior sales representatives to pursue enterprise accounts?\" / \"Yes, introducing uncapped quarterly bonuses and recurring revenue shares will definitely motivate them to close larger deals.\"",
                "\"Did the regional development council approve our application for renewable energy incentives?\" / \"Yes, we qualified for a thirty percent property tax abatement over the next ten years for our solar installation.\"",
                "\"Is there any financial incentive for our engineering team if they finish the software release ahead of the holiday rush?\" / \"The project sponsor authorized a completion bonus of ten thousand dollars if the code passes quality assurance two weeks early.\""
            ],
            "collocations": [
                "financial incentive",
                "tax incentive",
                "incentive program",
                "provide an incentive",
                "performance-based incentive",
                "economic incentive"
            ]
        },
        "wordFamily": {
            "noun": "incentive, incentivization",
            "verb": "incentivize",
            "adjective": "incentive, incentivized",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "financial incentive corporate sales bonus performance reward tax rebate handshake",
            "imageDescription": "A professional corporate conference room where an executive presents a framed achievement award and bonus check beside a digital chart demonstrating quarterly sales incentives.",
            "mnemonic": "IN-CEN-TIVE: Sounds like 'IN-CENTS-GIVE'—management gives cents and dollars IN your compensation to encourage superior performance!"
        },
        "video": {
            "description": "A human resources and corporate finance seminar explaining how structured incentive plans, performance bonuses, and stock options motivate employees and enhance organizational retention."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                7
            ],
            "exampleQuestion": "To attract skilled engineering personnel to its suburban research campus, Biovance Therapeutics offered generous financial _____, including signing bonuses and relocation allowances.\n(A) incentivizes\n(B) incentives\n(C) incentivized\n(D) incentivizing",
            "tips": "In TOEIC Part 5, questions frequently test your ability to identify 'incentive' as a countable noun that requires a plural form following modifying adjectives like 'generous', 'financial', or 'economic'. Choice (A) is a third-person singular present verb, (C) is a past-tense verb or past participle, and (D) is a present participle or gerund. Choice (B) 'incentives' correctly serves as the plural noun direct object of the transitive verb 'offered'. In Part 7, look for related terms such as 'tax incentive', 'performance incentive', and 'incentive scheme' in corporate memos, contract proposals, and public notices."
        },
        "synonyms": [
            "inducement",
            "stimulus",
            "bonus",
            "perk",
            "encouragement",
            "concession"
        ],
        "antonyms": [
            "disincentive",
            "deterrent",
            "penalty",
            "drawback",
            "discouragement"
        ],
        "relatedWords": [
            "bonus",
            "commission",
            "tax credit",
            "subsidy",
            "compensation",
            "performance bonus",
            "rebate"
        ]
    },
    {
        "id": "finance-168",
        "word": "income",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/ˈɪn.kʌm/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/income--_us_1.mp3",
            "syllableBreakdown": "in·come",
            "stressPattern": "●○",
            "commonMistakes": "Learners commonly place the stress on the second syllable (*in-COME*) or pronounce the second syllable with a long, rounded /oʊ/ as in 'home' (/ˈɪn.koʊm/). In standard American and British English, the stress is on the first syllable, and the second syllable contains an unstressed short wedge /ʌ/ or schwa /əm/ (/ˈɪn.kʌm/). In financial semantics, learners also frequently conflate 'income' with 'revenue' or 'salary': whereas revenue represents gross top-line receipts and salary is an employee's fixed contract pay, 'net income' in corporate accounting specifically designates bottom-line profit after all operational expenses and taxes."
        },
        "etymology": {
            "origin": "Middle English income (an entrance, arrival, advent), compounded from Old English prefix in- + verb cuman (to come).",
            "rootWord": "Proto-Germanic *inkwemaną (to enter, come into), from *in (in) + *kwemaną (to come), from PIE *gʷem- (to step, go, come)",
            "rootMeaning": "'That which comes in'—originally referring to an entrance or arrival, later applied to financial receipts entering a treasury or household",
            "evolution": "In Old and early Middle English (c. 1300), 'income' literally denoted an entrance, influx, or arrival. In late medieval Scotland and northern England (15th century), the word acquired a commercial meaning: the yield, rents, or money coming in from estate land or trade. By the late 16th and 17th centuries, it supplanted older French terms to describe all periodic monetary earnings from labor, investments, or commercial property. The formalization of modern 'income tax' by the British Treasury in 1799 during the Napoleonic Wars established the term globally across public finance, tax administration, and corporate accounting (the 'income statement').",
            "relatedLanguages": [
                "Dutch: inkomen (income, revenue, earnings)",
                "German: Einkommen (income, earnings, compensation)",
                "Swedish: inkomst (income)",
                "Danish: indkomst (income)",
                "French: revenu (income, revenue)",
                "Spanish: ingresos (income, revenue, earnings)",
                "Italian: reddito (income, yield)"
            ],
            "firstRecordedUse": "c. 1300 (originally meaning 'entrance' or 'arrival'); late 15th to early 16th century for financial earnings and receipts."
        },
        "deepMeaning": {
            "coreConcept": "Money, earnings, or monetary gain received periodically by an individual or household from labor, business enterprise, investments, or government transfers; in corporate finance and accounting, the net profit or surplus remaining after deducting cost of goods sold, operating expenses, interest, and taxes from total revenue (i.e., 'net income' or 'the bottom line').",
            "spatialContext": "Personal tax preparation offices, bank mortgage qualification departments, corporate accounting suites preparing profit-and-loss (P&L) statements, and government fiscal auditing agencies.",
            "temporalContext": "Bi-weekly or monthly payroll deposits, quarterly corporate earnings disclosures, annual personal income tax filing deadlines (e.g., April 15 in the US), and annual corporate fiscal year-end reconciliations.",
            "emotionalTone": "Stable, rewarding, foundational, and financially validating.",
            "formalityLevel": "neutral",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "Native speakers regard 'income' as a comprehensive umbrella category representing any money flowing inward over time. In personal finance, natives instinctively separate 'income' into earned income (salary, hourly wages, commissions) and unearned or passive income (dividends, rental receipts, interest, royalties). In business, they immediately differentiate between top-line revenue ('what you take in') and net income ('what you actually keep after expenses'). Furthermore, natives distinguish 'income' (a dynamic flow of incoming cash over a period) from 'wealth' (a static reservoir of accumulated assets).",
            "mentalImage": "A corporate financial controller pointing a pen at the final highlighted line item of an audited profit-and-loss statement labeled 'Net Income after Taxes', surrounded by comparative bar graphs showing quarterly profit growth.",
            "whenToUse": "Use when discussing total monetary earnings of an individual or household (e.g., 'taxable income', 'disposable income', 'supplementary income'), or when analyzing the net profitability of a business (e.g., 'net income', 'operating income', 'income statement').",
            "whenNotToUse": "Do not use 'income' when you specifically mean 'wealth' or 'net worth' (wealth measures accumulated total assets minus debts, not cash flow). Do not confuse corporate 'net income' with gross 'revenue' or 'sales'—using income when referring to top-line receipts before costs is a major accounting error.",
            "culturalContext": "Income is a defining socioeconomic metric in English-speaking societies, governing personal credit ratings, mortgage borrowing limits, and progressive taxation tiers ('income tax brackets'). On Wall Street, quarterly net income per share (EPS, or earnings per share) is the primary benchmark used by institutional analysts to evaluate corporate performance. In the TOEIC exam, income statements, proof-of-income documentation for loan applications, and median household income surveys are staple topics in Parts 3, 4, and 7."
        },
        "examples": {
            "daily": [
                "Many working professionals supplement their primary income by taking on freelance consulting projects or tutoring online during weekends.",
                "When reviewing our home mortgage application, the bank requested two consecutive years of federal tax returns to verify our household income.",
                "Seniors living on a fixed retirement income must carefully budget for rising prescription drug prices and heating costs."
            ],
            "business": [
                "Despite rising raw material expenditures, the industrial manufacturer reported a twelve percent increase in net income for the third quarter.",
                "Financial analysts thoroughly examine a company's income statement to evaluate whether profit margin growth is sustainable over the fiscal year.",
                "Higher international logistics costs and currency fluctuations significantly curtailed the distributor's operating income during the second half of the year."
            ],
            "conversation": [
                "\"Did our operating income rebound after the enterprise software deployment streamlined warehouse operations?\" / \"Yes, reduced overhead and labor hours helped increase our quarterly operating income by nearly nine percent.\"",
                "\"What types of documentation do we need to submit as proof of income for the corporate credit line?\" / \"The bank requires our audited income statement, corporate tax returns for the past two years, and recent balance sheet disclosures.\"",
                "\"Is the company's dividend payout covered adequately by our current net income?\" / \"Comfortably; our net income exceeds the total projected dividend distribution by more than thirty percent.\""
            ],
            "collocations": [
                "net income",
                "operating income",
                "income statement",
                "taxable income",
                "disposable income",
                "generate income"
            ]
        },
        "wordFamily": {
            "noun": "income, incomer",
            "verb": "come in",
            "adjective": "incoming",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "income statement corporate financial earnings chart revenue net profit ledger",
            "imageDescription": "An executive desk displaying an audited corporate income statement alongside a calculator, financial charts with upward-trending green profit bars, and a digital tablet showing quarterly net income.",
            "mnemonic": "IN-COME: Money that COMES IN to your personal bank account or corporate ledger! Gross revenue comes in, expenses go out, and net income stays in your pocket!"
        },
        "video": {
            "description": "A financial educator breaks down the structure of an authentic corporate income statement, illustrating how gross revenue flows down to operating profit and bottom-line net income."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                7
            ],
            "exampleQuestion": "Despite substantial supply chain disruptions and increased transportation tariffs, Sterling Pharmaceuticals reported an eight percent increase in net _____ for the fourth quarter.\n(A) incoming\n(B) income\n(C) incomely\n(D) incomes",
            "tips": "In TOEIC Part 5, the compound business term 'net income' (the bottom-line profit remaining after deducting all expenses, taxes, and interest from gross revenue) is a high-frequency financial collocation. Notice that the blank is preceded by the adjective 'net' and followed by a prepositional phrase indicating time ('for the fourth quarter'). Choice (B) 'income' correctly forms the singular uncountable compound noun 'net income'. Choice (A) 'incoming' is an adjective, choice (C) is a non-existent word, and choice (D) 'incomes' is an unnatural plural in corporate earnings contexts where net income represents a consolidated aggregate sum."
        },
        "synonyms": [
            "earnings",
            "revenue",
            "profit",
            "yield",
            "proceeds",
            "remuneration"
        ],
        "antonyms": [
            "expenditure",
            "expenses",
            "outgoings",
            "loss",
            "deficit"
        ],
        "relatedWords": [
            "income statement",
            "net income",
            "operating income",
            "gross income",
            "taxable income",
            "revenue",
            "cash flow"
        ]
    }
]

with open("scratch/finance_166_168.json", "w", encoding="utf-8") as f:
    json.dump({"words": words_data}, f, indent=2, ensure_ascii=False)

print("Saved scratch/finance_166_168.json successfully!")
