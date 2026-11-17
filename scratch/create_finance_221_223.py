import json
import re

words_data = [
    {
        "id": "finance-221",
        "word": "premium",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈpriː.mi.əm/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/premium--_us_1.mp3",
            "syllableBreakdown": "pre-mi-um",
            "stressPattern": "Primary stress on first syllable: PRE-mi-um (/ˈpriː.mi.əm/, ●○○)",
            "commonMistakes": "Learners frequently mispronounce the first vowel as a short /e/ (as in 'premise' or 'prep', saying */ˈprɛm.i.əm/*) instead of the correct long /iː/ ('pree'). Additionally, the final unstressed syllable '-um' should have a reduced schwa /əm/, not a full /ʌm/ or /uːm/. In financial contexts, take care not to confuse the noun 'premium' (the amount paid for insurance or above par value) with its adjectival usage meaning 'high-grade' or 'deluxe'."
        },
        "etymology": {
            "origin": "Latin praemium (reward, prize, booty, advantage taken before others), formed from prae (before) + emere (to take, buy, acquire)",
            "rootWord": "Latin prae- (before, in front) + emere (to take, obtain, buy)",
            "rootMeaning": "'That which is taken or chosen before others; a prior reward, prerogative advantage, or consideration paid'",
            "evolution": "In ancient Rome, 'praemium' denoted a soldier's war booty, bounty, or a public reward bestowed for exceptional civic service. In Late Middle English (early 17th century), it entered Anglo-legal and commercial parlance via commercial maritime contracts to describe the consideration or lump sum paid to underwriters in exchange for indemnification against oceanic disaster. By the 18th century, with the rise of the London Stock Exchange and modern bond markets, 'premium' acquired its secondary financial meaning: the excess value of a security, stock, or currency above its stated par value (e.g., trading at a premium vs. at a discount). In modern corporate finance and HR, it also denotes an extra incentive paid above baseline compensation (e.g., risk premium, overtime premium).",
            "relatedLanguages": [
                "French: prime (insurance premium, bonus, subsidy)",
                "Spanish: prima (insurance premium, bounty)",
                "Italian: premio (prize, award, insurance premium)",
                "Portuguese: prêmio (prize, insurance premium)",
                "German: Prämie (bonus, insurance premium, subsidy)"
            ],
            "firstRecordedUse": "Early 17th century (circa 1600 in English commercial maritime law and marine underwriting indentures)"
        },
        "deepMeaning": {
            "coreConcept": "In corporate finance and insurance, a periodic payment required to maintain coverage under an insurance policy, or the surplus amount by which a security, currency, or corporate acquisition offer exceeds its nominal face value, par value, or prevailing market benchmark.",
            "spatialContext": "Insurance broker portals, corporate treasury risk desks, benefits enrollment intranets, bond trading screens, and corporate merger & acquisition (M&A) deal valuations.",
            "temporalContext": "Paid on recurring billing schedules (monthly, quarterly, or annually for insurance policies) or settled at transaction closing (for bond pricing or corporate acquisition premiums).",
            "emotionalTone": "Pragmatic, contractual, and risk-oriented; represents the explicit economic cost of mitigating uncertainty or securing an asset of superior perceived value.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "To native English speakers in business, 'premium' immediately branches into two dominant financial scenarios: either the recurring price tag for safety ('health insurance premium', 'liability premium') or paying extra above standard cost ('paying a premium', 'trading at a premium', 'acquisition premium'). Native speakers instinctively understand that paying a premium implies willingly surrendering additional capital to gain protection, urgency, or top-tier prestige.",
            "mentalImage": "A risk management director at a corporate desk examining an insurance policy declaration page, comparing annual liability premiums against deductible thresholds before authorizing quarterly wire transfers.",
            "whenToUse": "Use when discussing scheduled payments made to insurance carriers to sustain coverage (health, property, casualty, workers' comp). Also use in capital markets when bond prices trade above their $1,000 face value (bond premium) or when an acquiring corporation offers a share price above the target's current trading price (takeover/acquisition premium).",
            "whenNotToUse": "Do not confuse with 'deductible' (the out-of-pocket sum the policyholder must pay before the insurer covers a loss) or 'dividend' (a distribution of corporate earnings). Do not use 'premium' to refer to a penalty fee for late payment (which is a fine or late charge).",
            "culturalContext": "In Anglo-American corporate benefits and employee contracts, the division of health insurance premiums between employer and employee (the 'premium contribution split') is a central negotiation point during annual open enrollment and union bargaining. In Wall Street M&A, offering a 30-40% premium over a target company's share price is customary to convince shareholders to tender their shares."
        },
        "examples": {
            "daily": [
                "My monthly health insurance premium increased by twelve dollars after our regional plan updated its prescription formulary.",
                "Homeowners living in flood-prone coastal counties often face exorbitant insurance premiums.",
                "He pays his automobile insurance premium on a semi-annual schedule to avoid installment service charges."
            ],
            "business": [
                "The board approved a forty percent acquisition premium to persuade the target company's shareholders to endorse the merger.",
                "Due to an exceptional safety record over the past three fiscal years, our company negotiated a fifteen percent reduction in its workers' compensation premium.",
                "Because market interest rates dropped below the coupon rate, the utility company's ten-year debentures are currently trading at a premium."
            ],
            "conversation": [
                "\"How much does our corporate group health plan require employees to contribute toward the dependent coverage premium?\" — \"The company covers seventy-five percent of the base employee premium, while employees cover sixty percent of the supplemental dependent premium via payroll deduction.\"",
                "\"Why did the board offer such a steep premium for that boutique cybersecurity firm?\" — \"Our competitors were preparing rival bids, so management had to pay a thirty-five percent premium over Friday's closing market valuation to secure exclusivity.\"",
                "\"Will our commercial property insurance premium spike after the water damage claim we filed last November?\" — \"Our broker assured us that because the pipe rupture was ruled accidental, our annual premium should only adjust for standard regional inflation.\""
            ],
            "collocations": [
                "insurance premium",
                "pay a premium",
                "at a premium",
                "annual premium",
                "acquisition premium",
                "risk premium"
            ]
        },
        "wordFamily": {
            "noun": "premium",
            "adjective": "premium"
        },
        "visual": {
            "imageKeyword": "commercial insurance policy document premium payment calculation broker desk",
            "imageDescription": "A corporate risk officer sitting at a mahogany desk reviewing an insurance declaration sheet showing itemized premium amounts, next to a calculator and signed policy binder.",
            "mnemonic": "PREMIUM comes from PRE (before) + EMERE (to buy/take). You pay your insurance premium BEFORE disaster strikes, or pay extra beforehand to take something of superior value!"
        },
        "video": {
            "description": "A financial analyst explainer outlining how corporate risk managers calculate insurance premiums versus self-insured retention levels, and how bond coupon rates determine whether debt trades at a premium or a discount."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                7
            ],
            "exampleQuestion": "To ensure uninterrupted liability coverage for our fleet vehicles, the quarterly insurance _______ must be remitted to the underwriter before March 31.\n(A) premium\n(B) premium's\n(C) premium-based\n(D) premier",
            "tips": "In TOEIC Part 5 financial and HR contexts, 'premium' is commonly tested as a noun collocated with 'insurance', 'annual', or 'health'. Notice the noun phrase 'quarterly insurance _______', which requires the singular head noun (A) premium. Beware of distractors like (D) premier, which is an adjective meaning 'first in importance' or a noun referring to a prime minister."
        },
        "synonyms": [
            "surcharge",
            "bonus",
            "markup",
            "installment",
            "fee",
            "bounty"
        ],
        "antonyms": [
            "discount",
            "rebate",
            "deduction",
            "allowance"
        ],
        "relatedWords": [
            "deductible",
            "underwriter",
            "coverage",
            "par value",
            "policyholder",
            "indemnity",
            "actuary"
        ]
    },
    {
        "id": "finance-222",
        "word": "prepayment",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˌpriːˈpeɪ.mənt/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/prepayment--_us_1.mp3",
            "syllableBreakdown": "pre-pay-ment",
            "stressPattern": "Secondary stress on first syllable, primary stress on second syllable: pre-PAY-ment (/ˌpriːˈpeɪ.mənt/, ˌ○●○)",
            "commonMistakes": "Learners often put primary stress on the prefix ('PRE-payment') or mispronounce the prefix with a short /e/ (*prɛ-payment*) instead of the long /priː/. Another common mistake is treating 'prepayment' as a verb (*'we prepayment the invoice'* instead of 'we prepay the invoice' or 'we made a prepayment'). In written business English, non-native speakers also confuse 'prepayment' (paying early or in advance of a contractual deadline or delivery) with 'down payment' (an initial partial payment for a large purchase financed over time)."
        },
        "etymology": {
            "origin": "Early Modern English compound combining the Latin-derived prefix pre- (prae-, before) with the Anglo-French verb payer (to pay, satisfy, pacify, from Latin pacare) and the noun suffix -ment (Latin -mentum, denoting the action, result, or instrument)",
            "rootWord": "Latin prae- (before) + pacare (to pacify, settle, pay) + -mentum (noun suffix)",
            "rootMeaning": "'The act or state of settling an obligation or satisfying a debt beforehand'",
            "evolution": "The base verb 'pay' came into English via Old French paier in the 12th century, originally meaning 'to pacify or satisfy a creditor'. By the 17th and 18th centuries, mercantile contracts across Britain and colonial trade routes began using 'prepay' to demand cash before ocean shipment to hedge against merchant default. In the 19th and early 20th centuries, with the institutionalization of long-term commercial loans and mortgages, 'prepayment' became a codified legal term in banking to address borrowers paying off principal balance ahead of amortization maturity, leading to standardized contractual clauses such as 'prepayment penalties'.",
            "relatedLanguages": [
                "French: prépaiement (prepayment, advance payment)",
                "Spanish: prepago (prepayment, pay-in-advance)",
                "Italian: prepagamento (prepayment)",
                "Portuguese: pré-pagamento (prepayment, advance payment)",
                "German: Vorauszahlung (prepayment, payment in advance)"
            ],
            "firstRecordedUse": "Mid-19th century (circa 1850s in banking treatises, postal delivery regulations, and mortgage indentures)"
        },
        "deepMeaning": {
            "coreConcept": "The settlement of a debt, contractual obligation, or commercial invoice before its official due date, or the payment for goods and services prior to their receipt or performance, frequently involving loan principal reductions or upfront procurement deposits.",
            "spatialContext": "Commercial lending institutions, accounts payable and receivable ledgers, corporate treasury systems (ERP software like SAP or Oracle), procurement purchasing desks, and mortgage servicing dashboards.",
            "temporalContext": "Occurs prior to delivery (in vendor procurement), before maturity (in debt retirement), or at periodic fiscal reconciliation cut-offs when recognizing prepaid expenses.",
            "emotionalTone": "Proactive, risk-mitigating, and prudent; demonstrates fiscal solvency and a desire to eliminate future interest burdens or vendor credit risk.",
            "formalityLevel": "formal",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "To a native corporate controller or loan officer, 'prepayment' triggers two specific thoughts: in procurement, it signifies strict vendor terms ('we require 50% prepayment before manufacturing begins'); in lending and mortgages, it signifies paying off principal ahead of schedule, which saves the borrower interest but deprives the lender of expected yield, often triggering a 'prepayment penalty'. Natives clearly distinguish prepayment (paying the whole or part early) from a routine 'deposit' or 'installment'.",
            "mentalImage": "A corporate treasurer reviewing a commercial loan amortization schedule on a computer monitor, calculating interest savings from submitting an unscheduled lump-sum principal prepayment.",
            "whenToUse": "Use when referring to paying off a debt, credit facility, bond, or loan before its maturity date. Also use in supply chain contracts where an exporter or vendor requires cash in advance before fabricating or shipping merchandise.",
            "whenNotToUse": "Do not confuse with 'reimbursement' (paying someone back for expenses they already incurred out-of-pocket) or 'remittance' (the general sending of funds). Do not use 'prepayment' when referring to a refundable security deposit (such as for rental equipment).",
            "culturalContext": "In North American commercial real estate and corporate debt financing, 'prepayment penalty' and 'yield maintenance' clauses are fiercely negotiated. Lenders rely on fixed multi-year interest income; if a corporate borrower refinances and prepays early when interest rates drop, the lender demands a prepayment fee to offset lost yield."
        },
        "examples": {
            "daily": [
                "The residential lease agreement required a prepayment of the first and last months' rent before moving in.",
                "By making a modest monthly prepayment toward his vehicle loan principal, he shortened the debt repayment term by fourteen months.",
                "Hotel reservations booked through discount travel portals usually mandate full prepayment with no refund option."
            ],
            "business": [
                "The supplier insisted on a thirty percent prepayment before ordering the specialized raw materials required for custom fabrication.",
                "Our treasury department calculated that an early prepayment of the revolving credit facility would save the company over forty thousand dollars in accrued interest.",
                "Under the terms of the commercial mortgage, any loan prepayment executed within the first five years incurs a two percent penalty."
            ],
            "conversation": [
                "\"Why does the overseas vendor's pro forma invoice include a request for full prepayment?\" — \"Because this is our initial purchase order with them, their credit policy requires prepayment until our corporate credit history is established.\"",
                "\"Are there any contractual restrictions if we decide to execute a prepayment on our commercial equipment lease?\" — \"Section 8 states that we can make a partial prepayment without penalties, provided we submit written notification thirty days in advance.\"",
                "\"How should the accounting department record the prepayment for next year's software licensing subscription?\" — \"Log it under prepaid expenses as a current asset on the balance sheet, then amortize it monthly over the course of the contract year.\""
            ],
            "collocations": [
                "prepayment penalty",
                "require prepayment",
                "loan prepayment",
                "prepayment clause",
                "full prepayment",
                "early prepayment"
            ]
        },
        "wordFamily": {
            "noun": "prepayment",
            "verb": "prepay",
            "adjective": "prepaid"
        },
        "visual": {
            "imageKeyword": "commercial loan agreement prepayment penalty clause banking document desk",
            "imageDescription": "A close-up shot of a corporate loan contract open on a banker's desk, with a fountain pen resting beside a highlighted section titled 'Prepayment Terms and Conditions'.",
            "mnemonic": "PREPAYMENT = PRE (before) + PAYMENT. Paying before the clock runs out—whether paying a supplier upfront or paying off a loan before maturity!"
        },
        "video": {
            "description": "A corporate finance tutorial illustrating how loan prepayment impacts corporate cash flow, accounting for prepaid assets on the balance sheet, and evaluating prepayment penalty risks."
        },
        "toeicContext": {
            "commonParts": [
                3,
                5,
                6,
                7
            ],
            "exampleQuestion": "Due to international shipping uncertainties, the manufacturer requires full _______ of all overseas invoices prior to dispatching cargo from the warehouse.\n(A) prepaying\n(B) prepay\n(C) prepayment\n(D) prepaid",
            "tips": "A frequent TOEIC Part 5 structure requires identifying the head noun following an adjective like 'full', 'partial', or 'prompt'. In this frame ('requires full _______ of all overseas invoices'), the quantifier/adjective 'full' modifies the singular noun (C) prepayment. While 'prepaying' is a gerund, standard business English prefers the established nominal form 'prepayment' when referring to the payment sum or condition."
        },
        "synonyms": [
            "advance payment",
            "down payment",
            "upfront payment",
            "retainer",
            "deposit",
            "advance"
        ],
        "antonyms": [
            "arrears",
            "late payment",
            "deferred payment",
            "delinquency"
        ],
        "relatedWords": [
            "amortization",
            "principal",
            "prepaid expense",
            "penalty clause",
            "maturity date",
            "refinancing",
            "escrow"
        ]
    },
    {
        "id": "finance-223",
        "word": "price-earnings",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "advanced",
        "toeicFrequency": 7,
        "pronunciation": {
            "ipa": "/ˌpraɪsˈɜːr.nɪŋz/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/price-earnings--_us_1.mp3",
            "syllableBreakdown": "price-earn-ings",
            "stressPattern": "Compound noun with primary stress on earnings: price-EARN-ings (/ˌpraɪsˈɜːr.nɪŋz/, ˌ●●○)",
            "commonMistakes": "Non-native speakers frequently drop the plural 's' at the end of 'earnings', incorrectly saying *price-earning*. In fast speech, learners sometimes elide the 's' sound in 'price' or mispronounce the central nurse vowel /ɜːr/ in 'earnings' as /ɑːr/ or /eə/. Grammatically, learners often omit the word 'ratio' when speaking casually, forgetting that 'price-earnings' almost exclusively functions as an attributive noun modifier preceding 'ratio' (P/E ratio), or when used as a noun, it stands as an elliptical short form for the price-earnings ratio."
        },
        "etymology": {
            "origin": "20th-century financial English compound formed from 'price' (Old French pris, from Latin pretium, value/worth) and 'earnings' (Old English earnian, to reap, harvest, or labor for reward)",
            "rootWord": "Latin pretium (price, reward, value) + Old English earnian (to earn, deserve, harvest)",
            "rootMeaning": "'The comparative relationship between the market purchase price of a share and the underlying net profits harvested per share'",
            "evolution": "Before the 1920s, stock valuations in Wall Street and the City of London were evaluated largely by dividend yield and book value of tangible assets. Following the 1929 stock market crash, security analysts Benjamin Graham and David Dodd published their seminal work 'Security Analysis' (1934), pioneering modern fundamental equity valuation. They formalized the ratio of a company's market stock price to its per-share net earnings (P/E), demonstrating how investors could determine whether equities were undervalued or dangerously speculative. Throughout the late 20th century, 'price-earnings' became the single most recognized valuation metric in global financial journalism, equity research, and investment banking.",
            "relatedLanguages": [
                "French: cours-bénéfice (price-to-earnings ratio, PER)",
                "Spanish: precio-beneficio (price-to-earnings ratio, PER)",
                "Italian: prezzo-utili (price-to-earnings ratio)",
                "Portuguese: preço-lucro (price-to-earnings ratio)",
                "German: Kurs-Gewinn-Verhältnis (share price to profit ratio, KGV)"
            ],
            "firstRecordedUse": "1930s (following Graham and Dodd's institutionalization of security analysis in American investment finance)"
        },
        "deepMeaning": {
            "coreConcept": "A fundamental equity valuation metric expressing the proportion between a public company's current share price and its net earnings per share (EPS), utilized by investors and corporate analysts to gauge market expectations, assess relative valuation against industry peers, and determine whether a stock is overvalued or undervalued.",
            "spatialContext": "Wall Street brokerage research notes, financial press portals (The Wall Street Journal, Financial Times, Bloomberg terminals), equity analyst presentation slides, and annual shareholder reports.",
            "temporalContext": "Recalculated daily as market share prices fluctuate, and structurally revised four times per year following quarterly corporate earnings announcements.",
            "emotionalTone": "Analytical, discerning, comparative, and market-driven; reflects investor sentiment ranging from speculative optimism (high multiple) to defensive skepticism (low multiple).",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "To native financial professionals and individual investors, 'price-earnings' (often abbreviated colloquially as 'P/E' or called the 'earnings multiple') is the universal yardstick of market valuation. A native speaker immediately evaluates the number: a price-earnings of 12 implies a mature, low-growth dividend stock or a troubled company, whereas a price-earnings of 50 indicates high-growth tech optimism where investors are paying a high premium for anticipated future profits. Natives understand that it answers the core question: 'How many dollars am I paying for every single dollar of current earnings?'",
            "mentalImage": "A portfolio manager sitting in front of a multi-monitor trading station, comparing a scatter plot of tech stock valuations displaying market price on the vertical axis and price-earnings multiples on the horizontal axis.",
            "whenToUse": "Use when evaluating stock market valuation, analyzing corporate financial health, comparing company multiples within the same industry sector, or presenting equity research to investors.",
            "whenNotToUse": "Do not use when analyzing companies with negative earnings (unprofitable startups), as the metric becomes mathematically undefined (negative P/E is typically omitted or marked N/A). Do not confuse with 'price-to-book' (P/B) or 'debt-to-equity' ratios.",
            "culturalContext": "In Western capital markets, quarterly earnings season brings intense scrutiny to price-earnings multiples. Institutional fund managers use price-earnings expansion or contraction to justify upgrading or downgrading sovereign equity markets, while financial media frequently warn of market bubbles when the aggregate S&P 500 price-earnings ratio exceeds historical averages."
        },
        "examples": {
            "daily": [
                "Before buying shares in the renewable energy company, she checked its price-earnings to see if the stock was overpriced.",
                "Financial news commentators spent the morning debating whether the tech sector's elevated price-earnings is sustainable.",
                "Conservative retail investors often seek established dividend-paying utility stocks with a modest price-earnings."
            ],
            "business": [
                "Trading at a trailing price-earnings of twenty-four, the enterprise software provider commands a substantial premium over traditional hardware competitors.",
                "The equity research report recommended downgrading the conglomerate because its price-earnings multiple had detached from realistic revenue growth projections.",
                "During the investor conference, the chief financial officer highlighted that our current price-earnings remains attractive relative to the industry benchmark."
            ],
            "conversation": [
                "\"Why is the stock price tumbling even though the company posted record profits this morning?\" — \"Their quarterly earnings grew by eight percent, but investors expected twelve percent, so the market compressed their price-earnings multiple.\"",
                "\"How does our pharmaceutical client compare against its domestic competitors in terms of valuation?\" — \"It is currently trading at a price-earnings of sixteen, whereas the peer group average is closer to twenty-one, suggesting it may be undervalued.\"",
                "\"Should we use forward or trailing figures when calculating the acquisition candidate's price-earnings?\" — \"Most institutional analysts prefer forward price-earnings based on projected twelve-month consensus estimates.\""
            ],
            "collocations": [
                "price-earnings ratio",
                "forward price-earnings",
                "trailing price-earnings",
                "price-earnings multiple",
                "high price-earnings",
                "low price-earnings"
            ]
        },
        "wordFamily": {
            "noun": "price-earnings",
            "adjective": "price-earnings-based"
        },
        "visual": {
            "imageKeyword": "stock market equity valuation price earnings multiple analyst screen financial chart",
            "imageDescription": "A financial terminal displaying stock candlestick charts alongside a fundamental valuation panel highlighting corporate price-earnings multiples and EPS quarterly forecasts.",
            "mnemonic": "PRICE-EARNINGS = PRICE divided by EARNINGS. It tells you exactly how much PRICE you must pay for each dollar of corporate EARNINGS!"
        },
        "video": {
            "description": "An investment banking tutorial breaking down how to interpret the price-earnings ratio, comparing trailing versus forward P/E, and using sector averages to identify undervalued equities."
        },
        "toeicContext": {
            "commonParts": [
                5,
                6,
                7
            ],
            "exampleQuestion": "According to the equity analyst's report, the semiconductor manufacturer's favorable _______ ratio indicates that its shares are currently undervalued compared to industry peers.\n(A) price-earnings\n(B) price-earning\n(C) priced-earnings\n(D) pricing-earned",
            "tips": "In TOEIC business and investment passages (especially Part 7 articles or Part 5 vocabulary questions), financial compounds are tested for exact standard phrasing. The correct financial term is '(A) price-earnings' (always featuring 'earnings' with a plural -s, as in 'price-earnings ratio'). Beware of distractors like (B) price-earning which omit the essential plural 's', or participle distortions like (C) and (D)."
        },
        "synonyms": [
            "P/E ratio",
            "earnings multiple",
            "valuation multiple",
            "price-to-earnings",
            "equity multiple",
            "earnings ratio"
        ],
        "antonyms": [
            "earnings yield",
            "dividend yield",
            "book value"
        ],
        "relatedWords": [
            "earnings per share",
            "valuation",
            "market capitalization",
            "equity",
            "multiple",
            "benchmark",
            "undervalued"
        ]
    }
]

output = {
    "result": {
        "words": words_data
    }
}

with open("scratch/finance_221_223.json", "w", encoding="utf-8") as f:
    json.dump(output, f, indent=4, ensure_ascii=False)

print("Saved scratch/finance_221_223.json successfully!")
