import json
import re
import sys

words_data = [
    {
        "id": "finance-120",
        "word": "deferral",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/dɪˈfɜːr.əl/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/deferral--_us_1.mp3",
            "syllableBreakdown": "de·fer·ral",
            "stressPattern": "○●○",
            "commonMistakes": "Learners frequently place primary stress on the first syllable (*DE-fer-ral) by analogy with 'different' or 'deference', rather than correctly placing primary stress on the second syllable /dɪˈfɜːr.əl/. Non-native candidates also frequently confuse 'deferral' (the formal postponement of an action, payment, or income recognition) with 'deference' (/ˈdef.ər.əns/, meaning polite submission or respect toward authority). In financial accounting, candidates often fail to distinguish a 'deferral' (cash is received or paid before goods or services are delivered, creating unearned revenue or prepaid expense) from an 'accrual' (revenue or expense is recognized before cash changes hands)."
        },
        "etymology": {
            "origin": "Formed in English by combining the verb 'defer' (from Anglo-Norman and Old French 'différer', from Latin 'differre') with the Latin-derived abstract noun suffix '-al' (from Latin '-alis').",
            "rootWord": "Latin differre (from dis- 'apart, away' + ferre 'to carry, bear')",
            "rootMeaning": "'To carry over to a later date, postpone, or put off to another time'",
            "evolution": "In Classical Latin, 'differre' meant to scatter, disperse, or put off. In Old French, it branched into 'déférer' (to yield or submit, leading to 'deference') and 'différer' (to delay or postpone, leading to 'defer'). By the mid-19th century in British legal and administrative procedure, the suffix '-al' was attached to denote the official act of granting a postponement. With the rise of standardized corporate accounting frameworks in the 20th century under US GAAP and IFRS, 'deferral' acquired a precise technical designation: postponing the recognition of revenues or expenses on the income statement until the period in which the corresponding economic activity occurs.",
            "relatedLanguages": [
                "French: report (deferral / postponement) / différé (deferred payment)",
                "Spanish: aplazamiento (deferral) / diferimiento (tax or accounting deferral)",
                "Italian: differimento (deferral) / rinvio (postponement)",
                "German: Stundung (tax/debt deferral) / Rechnungsabgrenzung (accounting accrual/deferral)",
                "Portuguese: diferimento (deferral) / adiamento (postponement)"
            ],
            "firstRecordedUse": "Mid-19th century (c. 1860s in legal, civil service, and commercial debt proceedings)"
        },
        "deepMeaning": {
            "coreConcept": "The official postponement or rescheduling of an action, payment, or accounting recognition to a future date; in accrual accounting, it specifically denotes holding back the recognition of revenue collected in advance (unearned revenue) or expenses paid in advance (prepaid assets) until the underlying goods or services are actually delivered or consumed.",
            "spatialContext": "Corporate controllership offices, general ledger accounting software suites (SAP S/4HANA, Oracle NetSuite), tax advisory boardrooms, commercial loan servicing departments, and university registrar offices.",
            "temporalContext": "Fiscal period-end adjusting entries, multi-year subscription billing schedules, annual corporate tax filings (Schedule M-3 book-to-tax reconciliations), and structured loan forbearance windows.",
            "emotionalTone": "Prudent, legally binding, procedurally deliberate, and risk-mitigating.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Native English speakers and finance professionals instinctively view 'deferral' through the lens of timing rather than elimination. They immediately grasp that a deferral is neither a debt cancellation nor a default; rather, it is a sanctioned shift in timing. When an accountant hears 'revenue deferral', they picture cash arriving today that cannot be counted as profit until the contract is fulfilled next quarter. When a retail borrower hears 'payment deferral', they realize principal payments are paused temporarily to provide breathing room, though interest may continue accruing. Natives strictly separate 'deferral' (planned, approved shift) from 'delay' (unwanted friction or tardiness).",
            "mentalImage": "A senior financial accountant seated before a dual-screen workstation, adjusting a journal entry in ERP software to move an upfront $120,000 annual software subscription payment from cash receipts into a 'Deferred Revenue' liability account on the corporate balance sheet.",
            "whenToUse": "Use when discussing formal postponement of payments (loan payment deferral), tax liabilities (tax deferral via retirement plans or capital gains rollover), revenue/expense recognition under accrual accounting (deferred revenue, expense deferral), or administrative schedules (academic deferral, jury duty deferral).",
            "whenNotToUse": "Do not use 'deferral' for informal lateness or accidental schedule slips (use 'delay' or 'postponement'). Do not use it when debt is completely forgiven or written off (use 'debt forgiveness', 'cancellation', or 'write-off'). Never confuse with 'deference' (respectful submission to authority or someone else's opinion).",
            "culturalContext": "In American and British corporate culture, tax deferral mechanisms—such as 401(k) payroll contributions, traditional IRAs, and corporate depreciation deferrals—form the bedrock of institutional capital accumulation. Under US GAAP (ASC 606) and international IFRS 15 standards, revenue deferral rules are rigorously monitored by external auditors to prevent companies from prematurely inflating quarterly earnings. In TOEIC contexts, deferrals appear frequently in commercial banking correspondence, loan restructuring notices, and corporate financial statements."
        },
        "examples": {
            "daily": [
                "After experiencing temporary financial hardship, the recent graduate applied for a six-month deferral on her federal student loan repayments.",
                "The university admissions committee granted him a one-year deferral so he could work at an environmental non-profit before starting his studies.",
                "Homeowners affected by the regional flooding were granted an emergency deferral on their municipal property tax installments."
            ],
            "business": [
                "Under ASC 606 revenue recognition guidelines, the enterprise recognized a six-month deferral of software licensing revenue until the implementation phase was completed.",
                "The chief financial officer recommended a tax deferral strategy by utilizing accelerated capital depreciation on new semiconductor fabrication machinery.",
                "Due to supply disruptions, the board of directors authorized a formal deferral of the plant modernization project until the fourth fiscal quarter."
            ],
            "conversation": [
                "\"Has the commercial lender responded to our request to pause principal payments on the equipment lease?\" / \"Yes, they approved a ninety-day loan deferral, though we are still required to cover the monthly accrued interest.\"",
                "\"Why does our quarterly operating income look lower than anticipated despite strong advance customer cash collections?\" / \"Because client payments for multi-year maintenance agreements required revenue deferral on the balance sheet rather than immediate income recognition.\""
            ],
            "collocations": [
                "tax deferral",
                "revenue deferral",
                "payment deferral",
                "loan deferral",
                "grant a deferral",
                "request a deferral"
            ]
        },
        "wordFamily": {
            "noun": "deferral, deferment",
            "verb": "defer",
            "adjective": "deferred, deferrable",
            "adverb": "deferredly"
        },
        "visual": {
            "imageKeyword": "deferred revenue accounting balance sheet calendar clock spreadsheet",
            "imageDescription": "A professional financial analyst reviewing an adjusting journal entry for deferred revenue on an enterprise software interface, beside an open paper calendar and an elegant metallic desk clock.",
            "mnemonic": "DEFERRAL = DE-lay to the FU-ture: you DE-FER recognition of cash or payment today and carry it forward to a future fiscal period."
        },
        "video": {
            "description": "A certified corporate controller delivering a concise whiteboard presentation explaining the mechanics of revenue and expense deferrals, demonstrating how unearned contract payments transfer from balance sheet liabilities to earned revenue over time."
        },
        "toeicContext": {
            "commonParts": [
                5,
                6,
                7
            ],
            "exampleQuestion": "In light of unprecedented shipping disruptions, the executive committee voted unanimously in favor of a temporary _____ of the regional warehouse expansion.\n(A) deferral\n(B) defer\n(C) deferred\n(D) deferring",
            "tips": "In TOEIC Part 5, questions frequently test parts of speech following an adjective phrase. Preceded by the indefinite article 'a' and the modifier 'temporary', the blank requires a singular countable noun: (A) 'deferral'. Choice (B) 'defer' is a base verb; choice (C) 'deferred' is a past participle or adjective; and choice (D) 'deferring' is a present participle or gerund that cannot take the indefinite article 'a' followed by the preposition 'of'. In Part 7 reading passages, look for 'payment deferral' or 'tax deferral' in banking agreements, loan restructuring notices, and corporate financial disclosures."
        },
        "synonyms": [
            "postponement",
            "deferment",
            "rescheduling",
            "moratorium",
            "adjournment",
            "suspension"
        ],
        "antonyms": [
            "acceleration",
            "advancement",
            "expedition",
            "immediate settlement"
        ],
        "relatedWords": [
            "accrual",
            "deferred revenue",
            "prepaid expense",
            "amortization",
            "forbearance",
            "matching principle",
            "tax liability"
        ]
    },
    {
        "id": "finance-121",
        "word": "deflation",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/dɪˈfleɪ.ʃən/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/deflation--_us_1.mp3",
            "syllableBreakdown": "de·fla·tion",
            "stressPattern": "○●○",
            "commonMistakes": "Learners often articulate the stressed second syllable with the short vowel /æ/ (*de-FLA-tion, rhyming with 'cat') rather than the correct diphthong /eɪ/ (/dɪˈfleɪ.ʃən/, rhyming with 'nation'). In macroeconomics, candidates frequently confuse 'deflation' (an absolute, widespread decline in general price levels, with negative inflation rates) with 'disinflation' (a slowdown in the rate of positive price inflation, where prices are still rising, but at a reduced pace). In TOEIC Part 7 economic analyses, test-takers must recognize that deflation increases the real purchasing burden of debt."
        },
        "etymology": {
            "origin": "Formed in 19th-century English from the verb 'deflate' (from Latin 'deflare', meaning 'to blow down or let out air') plus the Latin-derived abstract noun suffix '-tion' (from Latin '-tio / -tionem').",
            "rootWord": "Latin deflare (from prefix de- 'down, away' + flare 'to blow, puff')",
            "rootMeaning": "'To blow away, release air from an inflated vessel, or reduce volume'",
            "evolution": "Originally used in physics and physiology during the early 19th century to describe releasing trapped air from a balloon or lung cavity. In the 1890s, political economists in Great Britain and the United States adopted 'inflation' and 'deflation' as monetary metaphors: just as a tire or bladder inflates or deflates with air, a nation's currency volume and aggregate price levels expand or shrink. Following the Wall Street Crash of 1929 and the catastrophic Great Depression, economist Irving Fisher formalized the 'debt-deflation theory', cementing 'deflation' as the technical term for a macroeconomic contraction characterized by falling prices, contracting credit, and mounting defaults.",
            "relatedLanguages": [
                "French: déflation (economic deflation)",
                "Spanish: deflación (deflation)",
                "Italian: deflazione (deflation)",
                "German: Deflation (deflation)",
                "Portuguese: deflação (deflation)"
            ],
            "firstRecordedUse": "Late 19th century (c. 1891 in political economy and monetary policy debates)"
        },
        "deepMeaning": {
            "coreConcept": "A sustained and broad-based decrease in the general price level of goods and services throughout an economy over an extended period, typically caused by a contraction in the supply of money and credit or a severe collapse in aggregate consumer and business demand. While it increases the purchasing power of cash in the short term, deflation can ignite a devastating deflationary spiral, as consumers postpone purchases expecting lower prices, eroding corporate revenues, forcing wage reductions and layoffs, and dramatically raising the real burden of debt.",
            "spatialContext": "Central bank monetary policy conference rooms (Federal Reserve Board of Governors, European Central Bank, Bank of Japan), economic research institutes, sovereign debt trading desks, and macroeconomic newsrooms.",
            "temporalContext": "Severe economic recessions, post-asset bubble collapses (e.g., the 1930s Great Depression, Japan's Lost Decades throughout the 1990s and 2000s), and periods of aggressive monetary tightening or sovereign fiscal austerity.",
            "emotionalTone": "Grave, cautionary, economically restrictive, and alarming to monetary policymakers.",
            "formalityLevel": "formal",
            "connotation": "negative"
        },
        "nativeMindset": {
            "howNativesThink": "While everyday consumers might initially assume that falling prices sound wonderful ('everything is getting cheaper!'), native economists and financial professionals regard deflation as one of the most perilous macroeconomic threats—far more insidious and difficult to reverse than moderate inflation. They recognize that if prices decline continuously, consumers stop buying cars, houses, and electronics today because they expect them to be cheaper next quarter. Businesses cannot maintain margins, so they freeze hiring, cut wages, and default on fixed loans whose nominal repayment amounts never decrease. Natives instinctively associate deflation with stagnation, negative benchmark interest rates, and central bank intervention.",
            "mentalImage": "A central bank governor pointing to an interactive digital chart displaying a red, downward-trending Consumer Price Index dipping below zero percent, while empty retail shopping arcades in an urban center illustrate the freeze in aggregate consumer demand.",
            "whenToUse": "Use 'deflation' when analyzing economy-wide price index drops, central bank quantitative easing or interest rate cuts designed to boost price levels, debt-deflation cycles, or historical economic stagnation (such as Japan's multi-decade battle against price deflation).",
            "whenNotToUse": "Do not use 'deflation' to describe a price drop in a single commodity or product category, such as falling crude oil prices or cheaper microchips (use 'price decline', 'sector drop', or 'cost reduction'). Do not use it when inflation is merely slowing down from 8% to 4% (that is 'disinflation'). Do not confuse with physical tire puncture in a financial context.",
            "culturalContext": "In modern economic history, fear of deflation drives central banking philosophy across Western economies. The Federal Reserve and European Central Bank explicitly target a 2% annual inflation rate specifically to maintain a buffer zone preventing the economy from slipping into deflation. Japan's prolonged struggle with deflationary psychology reshaped global macroeconomics, leading to unconventional policies like quantitative easing and negative interest rates. In TOEIC Part 7, articles from financial newspapers and quarterly economic outlooks frequently discuss central bank strategies to ward off deflation."
        },
        "examples": {
            "daily": [
                "During the prolonged economic downturn, persistent deflation meant that electronics and consumer appliances became noticeably cheaper with each passing season.",
                "Real estate analysts noted that potential homebuyers were delaying property purchases because regional deflation led them to anticipate further price drops.",
                "Elderly retirees on fixed savings accounts benefited briefly from deflation as their static pension payments purchased more groceries at the supermarket."
            ],
            "business": [
                "The central bank lowered its benchmark interest rate to negative 0.1 percent in an aggressive measure to combat chronic domestic deflation.",
                "Commercial manufacturing conglomerates struggled to maintain operating profit margins amid sustained wholesale price deflation across the industrial sector.",
                "Economists warned that unaddressed debt deflation would dramatically increase the real repayment burden on heavily leveraged corporate borrowers."
            ],
            "conversation": [
                "\"Wouldn't consumers benefit if general retail prices kept falling every month?\" / \"In theory yes, but prolonged deflation actually triggers severe layoffs and wage cuts because corporations cannot sustain their operating revenues.\"",
                "\"What was the primary takeaway from the central bank governor's press conference?\" / \"The monetary policy committee signaled an extension of bond purchases to counteract persistent deflationary pressures across the domestic economy.\""
            ],
            "collocations": [
                "deflationary spiral",
                "risk of deflation",
                "combat deflation",
                "price deflation",
                "threat of deflation",
                "persistent deflation"
            ]
        },
        "wordFamily": {
            "noun": "deflation, deflator, deflationist",
            "verb": "deflate",
            "adjective": "deflationary, deflated",
            "adverb": "deflationarily"
        },
        "visual": {
            "imageKeyword": "deflation economic crisis falling prices red arrow financial chart money",
            "imageDescription": "A downward-sloping neon red arrow charting a drop on a stock exchange monitor against a backdrop of financial newspapers and stacks of coins.",
            "mnemonic": "DEFLATION = The economic balloon loses air (DE-FLATE); prices drop flat, consumer spending deflates, and corporate growth collapses."
        },
        "video": {
            "description": "An educational macroeconomic video outlining the anatomy of the deflationary spiral, demonstrating how falling consumer prices lead to delayed spending, corporate revenue shortfalls, workforce downsizing, and prolonged recession."
        },
        "toeicContext": {
            "commonParts": [
                4,
                6,
                7
            ],
            "exampleQuestion": "To safeguard the national economy against the looming threat of _____, the monetary board implemented an emergency reduction in benchmark interest rates.\n(A) deflation\n(B) deflationary\n(C) deflated\n(D) deflate",
            "tips": "In TOEIC Part 5, test writers frequently test part-of-speech selection following prepositional constructions. In the phrase 'the looming threat of _____', the preposition 'of' must be followed by a noun functioning as its object: (A) 'deflation'. Choice (B) 'deflationary' is an adjective that would require a following noun (e.g., 'deflationary spiral'); choice (C) 'deflated' is a past participle or adjective; and choice (D) 'deflate' is a base verb. In Part 7 reading comprehension, passages discussing central bank monetary policy, consumer price index (CPI) updates, and economic forecasts regularly contrast 'deflation' with 'inflation'."
        },
        "synonyms": [
            "economic contraction",
            "price decline",
            "monetary shrinkage",
            "downward price spiral",
            "currency appreciation",
            "recessionary downturn"
        ],
        "antonyms": [
            "inflation",
            "hyperinflation",
            "price surge",
            "reflation"
        ],
        "relatedWords": [
            "disinflation",
            "stagflation",
            "consumer price index",
            "monetary policy",
            "quantitative easing",
            "purchasing power",
            "recession"
        ]
    },
    {
        "id": "finance-122",
        "word": "denomination",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "advanced",
        "toeicFrequency": 7,
        "pronunciation": {
            "ipa": "/dɪˌnɑː.məˈneɪ.ʃən/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/denomination--_us_1.mp3",
            "syllableBreakdown": "de·nom·i·na·tion",
            "stressPattern": "○ˌ○●○",
            "commonMistakes": "Learners often stumble over the rhythm of this five-syllable word, incorrectly placing primary stress on the second syllable (*de-NOM-i-na-tion) rather than placing primary stress on the fourth syllable /neɪ/ (/dɪˌnɑː.məˈneɪ.ʃən/). Non-native speakers also frequently confuse the financial meaning of 'denomination' (the face value or stated unit of currency, coins, or bonds) with its religious meaning (a recognized autonomous branch of a church or faith). In corporate finance contexts, learners must understand that debt instruments are issued in specific currency denominations (such as euro-denominated bonds) as well as face-value denominations (such as $1,000 par value)."
        },
        "etymology": {
            "origin": "Borrowed into Middle English from Old French 'denomination', from Classical Latin 'dēnōminātiō' ('a calling by name or designation'), from the verb 'dēnōmināre'.",
            "rootWord": "Latin dēnōmināre (from prefix de- 'completely, formally' + nōmināre 'to name', from nōmen 'name')",
            "rootMeaning": "'To give a formal name, specific designation, or numerical value to something'",
            "evolution": "In Classical Latin and Roman rhetoric, 'dēnōminātiō' meant designating something by an explicit title or name (metonymy). The term entered Middle English via Anglo-Norman and Old French in the late 14th century to denote the formal classification or naming of objects. In arithmetic, it gave rise to 'denominator' (the part of a fraction that names the unit of division). During the commercial expansion of the 17th and 18th centuries in England, bankers and mint masters applied 'denomination' specifically to the legal face value stamped on coins and printed on paper banknotes. By the 20th century, international finance expanded the term to designate the base currency of sovereign debt issues (e.g., dollar denomination) and minimum investment increments in bond prospectuses.",
            "relatedLanguages": [
                "French: coupure (banknote denomination) / dénomination (naming / currency denomination)",
                "Spanish: denominación (denomination / face value)",
                "Italian: taglio (banknote denomination) / denominazione (naming / face value)",
                "German: Stückelung (banknote/bond denomination) / Denomination (currency denomination)",
                "Portuguese: denominação (denomination / face value)"
            ],
            "firstRecordedUse": "Late 14th century (c. 1387 in the general sense of naming or classification; early 18th century for banknote and coin face values)"
        },
        "deepMeaning": {
            "coreConcept": "In banking, currency operations, and corporate finance, denomination refers to the officially designated, legal face value assigned to individual banknotes, coins, stamps, or financial securities (such as bonds or shares). It also denotes the specific unit of currency in which a financial asset, transaction, contract, or debt facility is expressed and settled (e.g., debt issued in US dollar denomination).",
            "spatialContext": "Commercial bank teller windows, automated teller machine (ATM) cash cassettes, central bank currency printing and minting bureaus, fixed-income underwriting syndicates, and currency exchange kiosks.",
            "temporalContext": "Daily cash deposits and withdrawals, central bank currency redesign and demonetization rollouts, corporate bond issuance pricing dates, and international trade contract settlements.",
            "emotionalTone": "Precise, transactional, regulatory, and legally standardized.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "To a native English speaker, 'denomination' answers the immediate practical question: 'What size bills or face value are we talking about?' At a bank counter or ATM, natives think of denominations as the physical bill sizes ($1, $5, $10, $20, $50, $100); when withdrawing a large sum, they instinctively specify whether they want 'small denominations' for pocket change or 'large denominations' for compact storage. In investment banking and fixed-income markets, professionals use 'denomination' to indicate the base currency of an instrument (e.g., 'a bond issued in yen denomination') or the minimum tradeable increment (e.g., 'available in denominations of $10,000'). Natives strictly distinguish 'denomination' (the unit size or currency type) from 'amount' (the total monetary total).",
            "mentalImage": "A commercial bank teller counting and separating crisp stacks of twenty-dollar and one-hundred-dollar banknotes into organized cash drawers on a marble bank counter, while a client specifies their preferred bill denominations.",
            "whenToUse": "Use 'denomination' when specifying the face value of banknotes or coins (e.g., 'high-denomination bills', 'available in denominations of $5 and $10'), the face par value of bonds (e.g., 'issued in $1,000 denominations'), or the base currency of international securities and loans (e.g., 'foreign currency denomination').",
            "whenNotToUse": "Do not use 'denomination' to refer to a person's total account balance or the price of an item (use 'total', 'sum', or 'amount'). Do not say 'the denomination of this shirt is $50' (say 'the price of this shirt is $50'). Be careful not to confuse the financial term with a religious denomination (a branch of a religion) when parsing context.",
            "culturalContext": "In American and British retail environments, convenience stores and late-night gas stations frequently post notices stating 'No bills in denominations over $20 accepted' to minimize robbery risk and prevent counterfeit circulation. In global sovereign finance, developing nations that issue debt denominated in foreign currencies (like USD) face substantial foreign exchange exposure if their domestic currency depreciates. In TOEIC Part 3 and Part 7, conversations at bank counters, currency exchange booths, and instructions on commercial order forms frequently feature 'denomination'."
        },
        "examples": {
            "daily": [
                "When withdrawing four hundred dollars from the bank teller, she requested the entire amount in twenty-dollar denominations.",
                "The automated ticket kiosk at the train station only accepts banknotes in denominations of ten dollars or less.",
                "Small retail shops and street vendors often prefer customers to pay in small denominations because making change for large bills is difficult."
            ],
            "business": [
                "The newly authorized municipal green bonds were issued in minimum denominations of $5,000 to attract both retail and institutional investors.",
                "To curb cross-border tax evasion and counterfeit operations, the central monetary authority decided to discontinue the highest-denomination banknote.",
                "The multinational corporation restructured its overseas credit facility to switch the debt denomination from Swiss francs to euros."
            ],
            "conversation": [
                "\"How would you like your cash withdrawal disbursed today?\" / \"Could I have two hundred dollars in fifty-dollar denominations and the remaining fifty in tens, please?\"",
                "\"Why did the parking garage machine reject my fifty-dollar bill?\" / \"The digital payment terminal clearly indicates that it does not accept currency in denominations higher than twenty dollars.\""
            ],
            "collocations": [
                "large denomination",
                "small denomination",
                "currency denomination",
                "banknote denomination",
                "issued in denominations of",
                "high-denomination bill"
            ]
        },
        "wordFamily": {
            "noun": "denomination, denominator, denominationalism",
            "verb": "denominate",
            "adjective": "denominational, denominated",
            "adverb": "denominationally"
        },
        "visual": {
            "imageKeyword": "banknotes denomination currency bank teller counting cash bills money",
            "imageDescription": "A close-up view of a bank teller's hands organizing neatly bound stacks of newly minted banknotes sorted by denomination into fifty and one-hundred dollar bills.",
            "mnemonic": "DENOMINATION = DE-NOMINATE (name the value): the official NAME and face VALUE stamped on every banknote or bond in the nation."
        },
        "video": {
            "description": "A documentary segment showcasing the currency printing process at a national bureau of engraving, detailing how various banknote denominations are embedded with specialized security threads, watermarks, and color-shifting ink."
        },
        "toeicContext": {
            "commonParts": [
                3,
                5,
                7
            ],
            "exampleQuestion": "The government infrastructure development bonds will be made available to individual investors in _____ of $1,000, $5,000, and $10,000.\n(A) denominations\n(B) denominate\n(C) denominational\n(D) denominating",
            "tips": "In TOEIC Part 5, test questions frequently target fixed business collocations and prepositional structures. The standard financial pattern 'in denominations of [amount]' requires the plural noun: (A) 'denominations'. Choice (B) 'denominate' is a base verb; choice (C) 'denominational' is an adjective (commonly referring to religious or factional groupings); and choice (D) 'denominating' is a present participle or gerund. In Part 3 banking dialogues and Part 7 notices, listen and look for customer requests regarding preferred bill denominations or retail notices regarding accepted currency sizes."
        },
        "synonyms": [
            "face value",
            "par value",
            "unit value",
            "nominal value",
            "currency unit",
            "bill size"
        ],
        "antonyms": [],
        "relatedWords": [
            "banknote",
            "legal tender",
            "currency",
            "par value",
            "face value",
            "specie",
            "cash breakdown"
        ]
    }
]

with open("scratch/finance_120_122.json", "w", encoding="utf-8") as f:
    json.dump({"words": words_data}, f, indent=4, ensure_ascii=False)

print("Saved scratch/finance_120_122.json successfully!")
