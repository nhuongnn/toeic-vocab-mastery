import json
import re
import sys

words = [
    {
        "id": "finance-114",
        "word": "custody",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈkʌs.tə.di/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/custody--_us_1.mp3",
            "syllableBreakdown": "cus-to-dy",
            "stressPattern": "●○○",
            "commonMistakes": "Learners often mispronounce the first vowel /ʌ/ as /ʊ/ (producing 'coos-tody') or obscure the final unstressed /i/ sound. Conceptually, non-native speakers frequently assume 'custody' refers only to child custody in family law or police detention in criminal justice. In corporate banking and investment finance, 'custody' specifically refers to the safekeeping, settlement, and fiduciary administration of investment securities and portfolio assets by an authorized custodian bank."
        },
        "etymology": {
            "origin": "Anglo-Norman French and Classical Latin",
            "rootWord": "Latin custodia (safekeeping, guardianship, watch), from custos (guardian, keeper, protector)",
            "rootMeaning": "'The state or act of watching over, guarding, or protecting valuable property or persons'",
            "evolution": "In classical Roman jurisprudence, 'custodia' denoted the protective care and legal liability assumed by a bailee or guardian over entrusted chattels. Borrowed into Anglo-Norman as 'custodie', the word entered Middle English in the late 14th century (c. 1380s) to describe official guardianship of individuals and title deeds. By the 19th-century expansion of securities markets, institutional trusts began designating specialized banks to hold physical stock certificates and bearer bonds in 'safe custody'. In modern financial services, global custody evolved into an electronic multi-trillion-dollar sub-industry managing trade settlement, dividend collection, and asset segregation.",
            "relatedLanguages": [
                "French: garde / curatelle (custody, guardianship) and custode (keeper)",
                "Spanish: custodia (safekeeping, guardianship)",
                "Italian: custodia (custody, safe-keeping, care)",
                "German: Verwahrung (safe-keeping, custody) / Depotverwaltung (securities custody)"
            ],
            "firstRecordedUse": "Late 14th century (c. 1382, in Middle English legal rolls and early biblical translations)"
        },
        "deepMeaning": {
            "coreConcept": "The legal safekeeping, administrative care, and fiduciary holding of institutional securities, equities, cash, or physical financial collateral by an authorized financial institution (custodian bank) to prevent unauthorized commingling, theft, or administrative loss.",
            "spatialContext": "Custodian bank trust vaults, electronic central securities depositories (e.g., Euroclear, DTCC), institutional clearinghouses, and global transaction banking offices.",
            "temporalContext": "Active continuously during daily trade settlement windows (T+1 and T+2 settlement cycles), corporate action distributions, and quarterly institutional audit inspections.",
            "emotionalTone": "Fiduciary, protective, rigorous, and compliance-driven.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "In institutional capital markets, native financial practitioners draw a sharp distinction between managing assets and holding custody of assets. An investment advisor decides which equities or bonds to purchase, but regulations forbid them from touching the client's money directly—the assets must sit in the custody of an independent custodian bank. Hearing 'third-party custody' immediately provides native investors with reassurance against fraud, commingling, and institutional collapse.",
            "mentalImage": "An institutional trust officer in a tailored dark suit standing beside high-security vault terminals inside a major custodian bank, verifying digital asset ownership records and segregated client bond certificates across dual security monitors.",
            "whenToUse": "Use when discussing institutional safekeeping of securities, third-party depository services, custodial brokerage accounts, chain of custody for financial records, or escrow arrangements (e.g., 'assets held in custody', 'global custody agreement', 'safe custody vault').",
            "whenNotToUse": "Do not confuse 'custody' with 'asset management' or 'ownership' (a custodian merely holds and safeguards securities on behalf of the beneficial owner). In corporate finance settings, avoid confusing financial custody with parental child custody or police arrest detention.",
            "culturalContext": "Following major financial scandals such as the collapse of Lehman Brothers and the Bernard Madoff fraud, Anglo-American regulatory bodies (including the US SEC and the UK FCA) instituted strict custody rules mandating independent custodial segregation to ensure client funds cannot be co-mingled or used for proprietary bank trading."
        },
        "examples": {
            "daily": [
                "The commercial bank charges a nominal quarterly account fee to keep physical share certificates in safe custody.",
                "Prior to moving overseas for three years, Julian transferred custody of his family heirlooms to a secure private depository.",
                "Parents often open a custodial savings account to maintain legal custody of college investment funds until their child reaches the age of majority."
            ],
            "business": [
                "The municipal pension board selected a premier investment bank to provide global custody and clearing services for its five-billion-dollar fixed-income portfolio.",
                "Under current federal compliance regulations, registered investment advisors must verify that an accredited financial institution retains custody of all client securities.",
                "The external audit verified an unbroken chain of custody for the original property deeds and loan collateral held in the corporate archives."
            ],
            "conversation": [
                "\"Why is the endowment foundation transferring its investment custody to State Street Bank?\" / \"State Street offers lower transactional fees and automated withholding tax reclamation across foreign stock exchanges.\"",
                "\"Does our brokerage firm hold client funds directly on its own balance sheet?\" / \"No, compliance regulations mandate that an independent trust bank maintains legal custody of all customer assets to prevent commingling.\""
            ],
            "collocations": [
                "custody of assets",
                "custody services",
                "custody fee",
                "chain of custody",
                "safe custody",
                "take custody"
            ]
        },
        "wordFamily": {
            "noun": "custody, custodian",
            "verb": "",
            "adjective": "custodial",
            "adverb": "custodially"
        },
        "visual": {
            "imageKeyword": "bank vault securities custody safe deposit trust department financial institution",
            "imageDescription": "A high-security institutional trust depository with a heavy reinforced steel vault door open in the background, where a financial compliance officer reviews digital custody certificates and bound deed dossiers on a granite desk.",
            "mnemonic": "CUSTODY comes from CUSTODIAN (the caretaker who guards and maintains). A trusted CUSTODIAN maintains CUSTODY of valuable securities to keep them completely safe!"
        },
        "video": {
            "description": "An institutional finance educational brief illustrating how global custodian banks safeguard securities portfolios, execute dividend distributions, and protect investor capital through strict asset segregation."
        },
        "toeicContext": {
            "commonParts": [
                5,
                6,
                7
            ],
            "exampleQuestion": "To comply with international regulatory standards, the investment fund must place all client equity holdings into the _____ of an independent custodian bank.\n(A) custodian\n(B) custody\n(C) custodial\n(D) custodian's",
            "tips": "In TOEIC Part 5, the prepositional frame 'into the _____ of' requires an abstract head noun denoting safekeeping. Choice (B) 'custody' is the correct noun completing the established collocation 'the custody of'. Choice (A) refers to the agent or institution rather than the condition of care, (C) is an adjective, and (D) is a possessive noun requiring an additional noun modifier."
        },
        "synonyms": [
            "safekeeping",
            "guardianship",
            "trusteeship",
            "protection",
            "charge",
            "care"
        ],
        "antonyms": [
            "relinquishment",
            "abandonment",
            "release",
            "discharge"
        ],
        "relatedWords": [
            "custodian bank",
            "safekeeping",
            "depository",
            "securities settlement",
            "fiduciary duty",
            "custodial account",
            "trustee"
        ]
    },
    {
        "id": "finance-115",
        "word": "debit",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/ˈdeb.ɪt/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/debit--_us_1.mp3",
            "syllableBreakdown": "deb-it",
            "stressPattern": "●○",
            "commonMistakes": "Learners often pronounce 'debit' with a tense long /iː/ vowel (sounding like 'dee-bit') or confuse it with the monosyllabic 'debt' (/dɛt/). In financial theory, beginners frequently confuse the accounting definition with consumer banking; while a debit card deducts money from a personal checking account, in double-entry bookkeeping a debit entry actually increases asset and expense accounts while decreasing liability and equity accounts."
        },
        "etymology": {
            "origin": "Middle English via Old French from Latin",
            "rootWord": "Latin dēbitum (what is owed, debt), from dēbēre (to owe, literally 'to have from someone')",
            "rootMeaning": "'A sum of money owed or entered as a deduction/obligation'",
            "evolution": "Derived from Latin 'dēbitum' (neuter past participle of 'dēbēre', from 'dē-' 'away from' + 'habēre' 'to have'). In 15th-century Italian Renaissance mercantile bookkeeping codified by Luca Pacioli, entries made on the left page of a ledger were headed 'deve dare' (he must give / debtor), abbreviated in accounting as 'Dr.'. Borrowed through Old French 'débit', the noun entered late Middle English (c. 1470s) to denote an entry recording a sum owed. In modern accounting and retail banking, it expanded to designate the left side of a ledger account, direct account withdrawals, and point-of-sale debit card transactions.",
            "relatedLanguages": [
                "French: débit (debit, flow, sales outlet)",
                "Spanish: débito (debit, financial liability)",
                "Italian: debito (debt, debit entry)",
                "German: Debet / Soll (debit side of an account)"
            ],
            "firstRecordedUse": "Late 15th century (c. 1475–1480, in English mercantile ledger rolls and early merchant accounting manuals)"
        },
        "deepMeaning": {
            "coreConcept": "An accounting entry recorded on the left-hand column of a double-entry general ledger that increases an asset or expense account or decreases a liability, revenue, or owner's equity account; in retail banking, a direct electronic deduction from a customer's deposit account.",
            "spatialContext": "Enterprise resource planning (ERP) ledger interfaces (SAP, Oracle NetSuite), corporate bookkeeping spreadsheets, point-of-sale payment terminals, and online banking transaction portals.",
            "temporalContext": "Posted synchronously during point-of-sale card swipes, nightly interbank batch settlements, automated recurring billing runs, and month-end journal ledger reconciliations.",
            "emotionalTone": "Precise, objective, transactional, and systematic.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Native speakers operate on two distinct conceptual levels with 'debit'. At retail checkout, 'debit' represents immediate cash payment directly out of one's checking account via PIN entry, contrasting with 'credit' where the card issuer pays upfront and bills the consumer later. In corporate finance, accountants view 'debit' strictly through Pacioli's double-entry symmetry: every debit must be matched with a corresponding credit. Native accountants do not view debits as inherently negative; adding cash to the bank ledger is recorded as a debit.",
            "mentalImage": "A corporate accountant examining an accounting software general ledger on dual monitors, confirming that a two-thousand-dollar debit to the computer equipment account perfectly balances an equivalent credit to accounts payable.",
            "whenToUse": "Use when referring to double-entry accounting journal entries ('record a debit to cash'), retail banking card transactions ('pay by debit card', 'direct debit authorization'), or bank statement deductions ('a debit appears on your monthly statement').",
            "whenNotToUse": "Do not confuse with 'credit' (the right-hand ledger entry or deferred borrowed funds). Do not confuse the noun 'debit' (an individual transaction entry or deduction) with 'debt' (the cumulative borrowed money owed to lenders).",
            "culturalContext": "In North American and British commerce, point-of-sale payment prompts constantly ask 'Debit or credit?'. In corporate payroll and commercial vendor invoicing, automated 'pre-authorized direct debit' is the dominant mechanism for recurring business-to-business expense collection."
        },
        "examples": {
            "daily": [
                "I inserted my debit card at the gas station pump and entered my four-digit PIN to pay for the fuel directly from checking.",
                "A five-dollar monthly service debit appeared on my checking account statement because the minimum balance was not maintained.",
                "Setting up an automated direct debit ensures that our household electric and water bills are paid promptly on the due date."
            ],
            "business": [
                "The corporate controller instructed the bookkeeping team to enter a debit to the research expenditure account for the laboratory supplies purchase.",
                "When the wholesale vendor shipped the incorrect components, our procurement department issued an official debit memo requesting an immediate refund.",
                "Under standard double-entry bookkeeping protocols, every debit posted to the general ledger must be balanced by an equal and offsetting credit."
            ],
            "conversation": [
                "\"Why is there an unexpected debit of nine hundred dollars listed on the corporate account ledger?\" / \"That is the recurring monthly software licensing payment for our cloud servers.\"",
                "\"Should we record this equipment depreciation as a debit or a credit entry?\" / \"Record it as a debit to the depreciation expense account and credit accumulated depreciation.\""
            ],
            "collocations": [
                "debit card",
                "direct debit",
                "debit balance",
                "debit note",
                "automatic debit",
                "record a debit"
            ]
        },
        "wordFamily": {
            "noun": "debit, debitor",
            "verb": "debit",
            "adjective": "debited",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "accountant double entry ledger spreadsheet debit entry office desk",
            "imageDescription": "A staff accountant entering numerical debit figures into the left column of a corporate bookkeeping ledger displayed on a workstation screen, referencing paper invoices and an electronic desktop adding machine.",
            "mnemonic": "DEBIT begins with 'D': Debit = Drive IN to assets, and always sits on the LEFT of the ledger page!"
        },
        "video": {
            "description": "A comprehensive corporate accounting instructional video demonstrating how journal debits and credits operate within enterprise double-entry bookkeeping systems."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                7
            ],
            "exampleQuestion": "The accounting software automatically generates a _____ to the office supplies expense account as soon as a department manager approves an electronic invoice.\n(A) debited\n(B) debit\n(C) debiting\n(D) debits",
            "tips": "In TOEIC Part 5, following the indefinite article 'a', a singular countable noun is required to serve as the direct object of the transitive verb 'generates'. Choice (B) 'debit' is the correct singular noun. Choice (A) is a past participle/verb, choice (C) is a present participle, and choice (D) is plural, which conflicts with the singular determiner 'a'."
        },
        "synonyms": [
            "charge",
            "deduction",
            "withdrawal",
            "ledger entry",
            "assessment"
        ],
        "antonyms": [
            "credit",
            "deposit",
            "credit entry",
            "addition"
        ],
        "relatedWords": [
            "double-entry bookkeeping",
            "general ledger",
            "debit card",
            "credit balance",
            "journal entry",
            "direct debit",
            "accounts payable"
        ]
    },
    {
        "id": "finance-116",
        "word": "debt",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/det/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/debt--_us_1.mp3",
            "syllableBreakdown": "debt",
            "stressPattern": "●",
            "commonMistakes": "The single most pervasive pronunciation mistake among English language learners is pronouncing the silent letter 'b' (saying */dɛbt/* instead of the correct monosyllable /dɛt/ or /det/). Conceptually, candidates often confuse 'debt' (the cumulative borrowed money owed to lenders) with 'deficit' (the annual budget shortfall between revenue and spending), or with 'equity' (ownership shares where repayment is not legally mandated)."
        },
        "etymology": {
            "origin": "Middle English via Old French from Classical Latin",
            "rootWord": "Latin dēbitum (that which is owed, debt), from dēbēre (to owe, to be bound)",
            "rootMeaning": "'A sum of money or goods that one is under an obligation to pay or render to another'",
            "evolution": "In passing from Latin 'dēbitum' into Old French, the consonant cluster simplified, yielding 'dete' / 'dette'. Middle English borrowed the term in the early 13th century as 'dette'. During the 16th-century Renaissance, English scholarly scribes and lexicographers deliberately inserted a silent 'b' into the spelling (re-forming it as 'debt') to visibly advertise its classical Latin pedigree from 'dēbitum', although English speakers never pronounced the consonant. In commercial history, debt evolved from feudal pledges into tradable financial contracts, promissory notes, sovereign bonds, and corporate syndicated debentures.",
            "relatedLanguages": [
                "French: dette (debt, obligation)",
                "Spanish: deuda (debt, liability)",
                "Italian: debito (debt, obligation)",
                "German: Schuld / Verbindlichkeit (debt, liability, financial obligation)"
            ],
            "firstRecordedUse": "c. 1225 (in Early Middle English texts as 'dette', reflecting Anglo-Norman French usage)"
        },
        "deepMeaning": {
            "coreConcept": "A specific sum of money borrowed by an entity (the debtor) from an external party (the creditor) under a legally binding contract stipulating mandatory repayment of the principal, usually with periodic interest, across an agreed maturity schedule.",
            "spatialContext": "Corporate balance sheet liability ledgers, commercial credit underwriting departments, corporate treasury boardrooms, fixed-income bond trading floors, and rating agency analyst offices.",
            "temporalContext": "Monitored quarterly for debt covenant compliance; debt-service interest paid monthly or semi-annually; principal retired or refinanced upon bond maturity dates.",
            "emotionalTone": "Disciplined, cautious, analytical, and risk-sensitive.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "In modern corporate capitalism, native financial executives do not view corporate debt as an embarrassing obligation, but as 'leverage'—an essential financial tool that lowers the weighted average cost of capital because interest payments are tax-deductible. However, native speakers maintain a healthy respect for default risk: excessive debt leaves corporations vulnerable during economic downturns. Collocations like 'servicing the debt' and 'debt-to-equity ratio' are central to corporate health discussions.",
            "mentalImage": "A chief financial officer in a glass-walled conference room presenting a debt maturity schedule on a widescreen display, pointing out how refinancing twenty million dollars of high-yield debt into lower-coupon notes will protect operating cash flow.",
            "whenToUse": "Use when discussing borrowed capital, corporate liabilities, loans, bonds, debt restructuring, or national obligations (e.g., 'corporate debt', 'debt financing', 'debt service', 'bad debt', 'retire outstanding debt').",
            "whenNotToUse": "Do not confuse 'debt' with 'deficit' (a deficit is an annual spending gap, whereas debt is the accumulated total owed). Do not confuse with 'equity' (capital raised through selling shares, requiring no debt repayment). Do not confuse with 'debit' (a ledger bookkeeping entry).",
            "culturalContext": "Anglo-American corporate finance relies heavily on public and private debt markets (bonds, commercial paper, syndicated loans). Credit rating agencies like Moody's and Standard & Poor's wield significant market power by evaluating corporate and sovereign creditworthiness, directly dictating corporate borrowing costs."
        },
        "examples": {
            "daily": [
                "Through disciplined monthly budgeting, Sarah was able to pay off all her outstanding credit card debt within eighteen months.",
                "Many college graduates struggle with substantial student loan debt as they enter their initial professional careers.",
                "Before approving our home mortgage application, the bank verified that our total monthly debt payments were below thirty-six percent of income."
            ],
            "business": [
                "The telecommunications corporation issued fifty million dollars in senior corporate debt to fund the expansion of its fiber-optic network.",
                "By taking advantage of declining benchmark interest rates, the manufacturing firm refinanced its floating-rate debt into long-term fixed debentures.",
                "The board of directors approved a strategic debt restructuring initiative to extend bond maturities and protect working capital reserves."
            ],
            "conversation": [
                "\"How does the logistics company intend to pay for the new distribution warehouse?\" / \"They plan to utilize a mixture of commercial debt financing and retained operating profits.\"",
                "\"Why did the credit rating agency downgrade the retailer's corporate debt?\" / \"The retailer's debt-to-equity ratio rose sharply after their aggressive retail store acquisition last quarter.\""
            ],
            "collocations": [
                "debt financing",
                "debt restructuring",
                "debt service",
                "outstanding debt",
                "bad debt",
                "debt-to-equity ratio"
            ]
        },
        "wordFamily": {
            "noun": "debt, debtor, indebtedness",
            "verb": "",
            "adjective": "indebted, debt-free",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "chief financial officer reviewing corporate debt charts boardroom presentation",
            "imageDescription": "A chief financial officer presenting a financial chart showing declining corporate debt levels and bond amortization schedules on a boardroom presentation display to attentive executive directors.",
            "mnemonic": "DEBT has a silent 'B' for 'Borrowed' and 'Burden'. You Borrowed the money, so you have the Burden of paying off the DEBT!"
        },
        "video": {
            "description": "A corporate finance case study analyzing how large enterprises manage balance sheet debt leverage, satisfy debt covenants, and optimize capital structure."
        },
        "toeicContext": {
            "commonParts": [
                3,
                5,
                6,
                7
            ],
            "exampleQuestion": "By successfully refinancing its long-term _____, the manufacturing corporation reduced its annual interest expenses by nearly twelve percent.\n(A) debt\n(B) indebted\n(C) debtless\n(D) indebtednesses",
            "tips": "In TOEIC Part 5, following the possessive pronoun 'its' and the compound modifier 'long-term', the sentence requires a head noun functioning as the direct object of the gerund 'refinancing'. Choice (A) 'debt' is the correct standard commercial noun. Choice (B) is an adjective, choice (C) is an adjective, and choice (D) is an unidiomatic plural form of an abstract state."
        },
        "synonyms": [
            "liability",
            "obligation",
            "indebtedness",
            "arrears",
            "borrowing",
            "encumbrance"
        ],
        "antonyms": [
            "asset",
            "credit",
            "receivable",
            "surplus",
            "equity"
        ],
        "relatedWords": [
            "debt financing",
            "debt-to-equity ratio",
            "principal",
            "bond indenture",
            "amortization",
            "default risk",
            "creditor"
        ]
    }
]

output = {"words": words}
with open("scratch/finance_114_116.json", "w", encoding="utf-8") as f:
    json.dump(output, f, indent=4, ensure_ascii=False)

print("Saved scratch/finance_114_116.json successfully.")
