import json
import re
import sys

words = [
  {
    "id": "finance-102",
    "word": "consolidation",
    "partOfSpeech": [
      "noun"
    ],
    "category": "finance",
    "level": "advanced",
    "toeicFrequency": 7,
    "pronunciation": {
      "ipa": "/kənˌsɑː.lɪˈdeɪ.ʃən/",
      "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/consolidation--_us_1.mp3",
      "syllableBreakdown": "con·sol·i·da·tion",
      "stressPattern": "○◐○●○",
      "commonMistakes": "Learners often misplace primary stress onto the second syllable (*con-SOL-i-da-tion) rather than the penultimate syllable /deɪ/ (con-sol-i-DA-tion), or compress the five syllables into four by omitting the weak medial vowel /ɪ/ or /ə/. In American English, the second syllable vowel is an unrounded open back /ɑː/, whereas British English uses a rounded /ɒ/ (/kənˌsɒl.ɪˈdeɪ.ʃən/). Another frequent pitfall is confusing financial consolidation (combining subsidiary accounts into unified corporate financial statements) with operational consolidation (closing branch offices to centralize logistics), though both signify combining separate entities into a unified whole."
    },
    "etymology": {
      "origin": "Late Middle English via Anglo-French 'consolidation' and directly from Late Latin 'consolidātiō' (a making firm, uniting, or securing), the noun of action from the past-participle stem of 'consolidāre' ('to make firm, bind together, consolidate').",
      "rootWord": "Latin com- ('together, thoroughly') + solidāre ('to make solid, firm, whole'), from solidus ('firm, whole, undivided, solid')",
      "rootMeaning": "'The act or state of joining together into a solid, undivided, cohesive whole'",
      "evolution": "In Roman civil law, 'consolidatio' specifically designated the legal reunion of usufruct (the right to enjoy the property of another) with the bare legal title or ownership of property, extinguishing the temporary split. The term entered Anglo-Norman and Middle English legal and administrative registers in the late 14th to early 15th century. By the 18th century, it was used by British statesmen to describe the fiscal uniting of distinct public revenue streams and government debts (notably William Pitt's Consolidated Fund Act of 1787). In late 19th- and early 20th-century corporate capitalism, it expanded into financial accounting to mean aggregating parent and subsidiary accounts into unified financial statements, as well as industrial mergers.",
      "relatedLanguages": [
        "French: consolidation (f.)",
        "Spanish: consolidación (f.)",
        "Italian: consolidazione / consolidamento (m.)",
        "German: Konsolidierung (f.)",
        "Portuguese: consolidação (f.)"
      ],
      "firstRecordedUse": "Early 15th century (c. 1425 in legal registers regarding property; early 18th century in public debt and corporate finance)"
    },
    "deepMeaning": {
      "coreConcept": "In corporate finance and financial accounting, consolidation is the process of combining the financial statements, balance sheets, and operational results of a parent company and its legally separate subsidiaries into a single, unified group reporting package, eliminating intercompany transactions, receivables, and payables. In broader financial contexts, it denotes: (1) debt consolidation—merging multiple liabilities into a single structured loan; (2) industry consolidation—market restructuring where competing enterprises merge or are acquired into larger entities; and (3) technical market analysis—a period where asset prices fluctuate within a defined, narrow corridor following an extended directional trend.",
      "spatialContext": "Corporate controllership offices, group financial consolidation software platforms (e.g., SAP BPC, Oracle Hyperion, OneStream), multinational audit conference rooms, investment banking M&A bullpen suites, and regulatory financial filing databases.",
      "temporalContext": "Executed during month-end, quarter-end (10-Q), and annual fiscal close cycles (10-K) to prepare consolidated annual reports; during strategic corporate merger transitions; and on trading desks assessing price charts before breakout volatility.",
      "emotionalTone": "Structured, authoritative, disciplined, and cohesive.",
      "formalityLevel": "formal",
      "connotation": "neutral"
    },
    "nativeMindset": {
      "howNativesThink": "To native corporate executives and accountants, 'consolidation' immediately triggers thoughts of 'eliminating intercompany balances' and 'seeing the full picture of the corporate family'. Instead of looking at twenty standalone subsidiary ledgers, consolidation pulls them together so that an investor or auditor sees the enterprise as one cohesive economic unit. In banking or personal finance, natives hear 'consolidation' and think of simplifying burdensome chaos into one manageable monthly obligation (e.g., debt consolidation loan). In mergers and acquisitions, it connotes industry maturity—weaker players being absorbed by market leaders to eliminate redundancies.",
      "mentalImage": "A corporate group reporting controller sitting before multi-monitor screens running financial consolidation software, verifying that internal sales between a German manufacturing subsidiary and a US distribution unit are fully eliminated so the consolidated balance sheet reflects genuine third-party revenues.",
      "whenToUse": "Use when discussing consolidated financial statements under US GAAP/IFRS, aggregating subsidiary accounts, combining several debts into a single financing package (debt consolidation), corporate mergers that reduce the number of competitors in a sector (industry consolidation), or technical chart analysis where a stock pauses in a tight trading range.",
      "whenNotToUse": "Do not use 'consolidation' when referring to a simple mathematical addition or sum of unrelated numbers (use 'sum', 'aggregate', or 'total'). Do not use it for liquidating or dissolving a company (use 'liquidation' or 'dissolution'). Avoid using it as a verb when the noun is required.",
      "culturalContext": "In US corporate reporting (under SEC guidelines and FASB ASC 810 / IFRS 10), parent corporations controlling more than 50% voting rights in an entity must issue consolidated financial statements to prevent companies from hiding debt or toxic liabilities in off-balance-sheet vehicles (a major regulatory reaction to Enron). In retail finance, debt consolidation represents a multi-billion-dollar lending industry targeting consumers seeking to merge high-interest credit card debt into fixed-rate personal loans."
    },
    "examples": {
      "daily": [
        "After reviewing her credit card balances, Sarah applied for a debt consolidation loan with a single monthly payment and lower interest rate.",
        "The local school district completed a consolidation of three underutilized elementary campuses into one modern educational facility.",
        "He spent Saturday morning organizing his paperwork, carrying out a complete consolidation of his multiple banking and investment accounts."
      ],
      "business": [
        "During the annual fiscal close, the multinational retailer prepared consolidated financial statements that eliminated all intercompany sales between its regional subsidiaries.",
        "The telecommunications sector is undergoing rapid consolidation as two major national providers finalized a twenty-billion-dollar merger.",
        "Technical analysts noted that the stock entered a multi-week consolidation phase between forty-two and forty-five dollars before breaking out to new record highs."
      ],
      "conversation": [
        "\"Has the audit committee approved the group balance sheet yet?\" / \"Not until our team finishes the consolidation of the newly acquired European subsidiaries.\"",
        "\"Why are the interest charges on our commercial debt so much lower this quarter?\" / \"Treasury finalized a debt consolidation package that rolled three short-term credit lines into a single ten-year note at four percent.\"",
        "\"What does the chart pattern suggest for next week's trading?\" / \"The currency pair has been in tight consolidation for five days, which usually signals an upcoming breakout once economic data is released.\""
      ],
      "collocations": [
        "consolidated financial statements",
        "debt consolidation",
        "industry consolidation",
        "consolidation phase",
        "balance sheet consolidation",
        "market consolidation"
      ]
    },
    "wordFamily": {
      "noun": "consolidation, consolidator",
      "verb": "consolidate",
      "adjective": "consolidated, consolidating",
      "adverb": "consolidatively"
    },
    "visual": {
      "imageKeyword": "consolidated financial statements corporate balance sheet multi screen financial chart",
      "imageDescription": "A group financial controller analyzing multi-entity reporting data across two large monitors, highlighting eliminating entries and combining subsidiary assets into a unified corporate balance sheet.",
      "mnemonic": "CON (together) + SOLID (firm/unbroken): Consolidation brings scattered pieces together into one solid, unified whole!"
    },
    "video": {
      "description": "A corporate finance tutorial walking through the step-by-step preparation of consolidated financial statements, demonstrating how intercompany transactions and unrealized profits are eliminated to reflect a true group balance sheet."
    },
    "toeicContext": {
      "commonParts": [
        5,
        6,
        7
      ],
      "exampleQuestion": "Following the corporate merger, the accounting department completed the _____ of all subsidiary ledgers into a single enterprise resource system.\n(A) consolidate\n(B) consolidated\n(C) consolidation\n(D) consolidates",
      "tips": "In TOEIC Part 5, pay close attention to noun-phrase structure after a definite article. The phrase 'the _____ of all subsidiary ledgers' requires a head noun to serve as the object of the verb 'completed'. Choice (C) 'consolidation' is the correct noun form. Choice (A) is the base verb, (B) is the past participle or adjective, and (D) is the third-person singular present verb."
    },
    "synonyms": [
      "amalgamation",
      "unification",
      "integration",
      "merger",
      "centralization",
      "synthesis"
    ],
    "antonyms": [
      "separation",
      "division",
      "decentralization",
      "fragmentation",
      "divestiture",
      "breakup"
    ],
    "relatedWords": [
      "subsidiary",
      "intercompany elimination",
      "parent company",
      "mergers and acquisitions (M&A)",
      "debt restructuring",
      "holding company",
      "pro forma statements"
    ]
  },
  {
    "id": "finance-103",
    "word": "contingency",
    "partOfSpeech": [
      "noun"
    ],
    "category": "finance",
    "level": "advanced",
    "toeicFrequency": 7,
    "pronunciation": {
      "ipa": "/kənˈtɪn.dʒən.si/",
      "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/contingency--_us_1.mp3",
      "syllableBreakdown": "con·tin·gen·cy",
      "stressPattern": "○●○○",
      "commonMistakes": "Learners frequently misplace the primary stress onto the third syllable (*con-tin-GEN-cy) or mispronounce the medial 'g' as a hard plosive /ɡ/ rather than the voiced affricate /dʒ/ ('con-tin-jen-see'). Another common error is confusing the noun 'contingency' (a potential future event or reserve fund) with the adjective 'contingent' (dependent upon something else, as in 'contingent on approval'). In business writing, non-native speakers sometimes mistakenly use 'contingency' where 'emergency' or 'urgency' is intended; an emergency is a sudden crisis happening now, whereas a contingency is an anticipated possible event prepared for in advance."
    },
    "etymology": {
      "origin": "Late Middle English / Early Modern English, borrowed from Medieval Latin 'contingentia' (a happening, possibility, chance event), from Latin 'contingēns', present participle of 'contingere' ('to touch, reach, happen, befall').",
      "rootWord": "Latin com- ('together, with') + tangere ('to touch')",
      "rootMeaning": "'That which touches or borders upon; an event that may touch us or come to pass by circumstance'",
      "evolution": "In Scholastic philosophy and Aristotelian logic, 'contingentia' designated the condition of that which is neither impossible nor necessary—something that may or may not happen depending on circumstances. In late 17th- and 18th-century English commercial contracts and marine underwriting, merchants began adding clauses for unforeseen contingencies (such as storms, ship seizures, or trade embargoes). By the 19th and 20th centuries, it evolved into standard financial and accounting terminology: allocating a 'contingency budget' in project finance, setting aside a 'contingency fund' for unforeseen expenses, and recognizing 'contingent liabilities' in balance sheet footnote disclosures.",
      "relatedLanguages": [
        "French: contingence (f.)",
        "Spanish: contingencia (f.)",
        "Italian: contingenza (f.)",
        "German: Eventualität / Kontingenz (f.)",
        "Portuguese: contingência (f.)"
      ],
      "firstRecordedUse": "Mid-16th century (c. 1540s–1560s in philosophical debate; early 18th century in financial and legal contracts)"
    },
    "deepMeaning": {
      "coreConcept": "An uncertain future event, unforeseen circumstance, or potential emergency that cannot be predicted with complete certainty; in finance, budgeting, and project management, it specifically designates: (1) a dedicated reserve fund or financial buffer (contingency fund/reserve) set aside within a budget to absorb cost overruns or unexpected operational disruptions; (2) a contractual condition upon which the execution of an agreement depends (e.g., financing contingency in real estate); and (3) a contingent liability—a potential obligation whose existence depends on the outcome of a future event, such as pending litigation.",
      "spatialContext": "Capital budgeting spreadsheets, construction job trailers, risk assessment committee boardrooms, corporate legal department suites, commercial insurance underwriting offices, and real estate closing conference rooms.",
      "temporalContext": "Established during initial project cost estimations, evaluated periodically during risk management audits, triggered when unexpected disruptions or cost spikes occur, and disclosed in quarterly and annual financial statements under footnote disclosures.",
      "emotionalTone": "Prudent, cautionary, strategic, and protective.",
      "formalityLevel": "formal",
      "connotation": "neutral"
    },
    "nativeMindset": {
      "howNativesThink": "To a native project manager, chief financial officer, or legal counsel, 'contingency' is the ultimate financial safety net. Natives do not view an unexpected crisis as a total surprise; they assume unexpected things will happen, which is why a viable budget or contract without a 'contingency' is considered reckless or amateurish. When budgeting, natives instinctively ask, 'Did you build in a 10% contingency?' In real estate or contracts, native buyers think of 'contingency' as an escape hatch—a legal safeguard that allows them to walk away with their deposit intact if the property inspection fails or financing falls through.",
      "mentalImage": "A construction project manager and financial analyst reviewing a fifty-million-dollar commercial building spreadsheet, highlighting an eight percent contingency line item reserved specifically for supply chain delays or material price spikes.",
      "whenToUse": "Use when discussing risk management strategies (contingency plan), earmarked reserve funds for unforeseen expenses (contingency fund/budget), contractual safeguard conditions (financing contingency, inspection contingency), or potential legal liabilities that depend on future rulings (contingent liability).",
      "whenNotToUse": "Do not use 'contingency' to describe a crisis that is already currently occurring (use 'emergency', 'crisis', or 'disaster'). Do not use 'contingency' when you mean a permanent recurring operating expense (such as rent or payroll). Avoid confusing with 'contiguity' (physical adjacency) or 'contingent' (adjective).",
      "culturalContext": "In North American commercial real estate, 'contingency clauses' (appraisal, inspection, loan commitment) are standard buyer protections; waiving contingencies in a hot market is considered high-risk. In accounting standards (ASC 450 under US GAAP and IAS 37 under IFRS), firms must categorize loss contingencies as probable, reasonably possible, or remote, requiring balance sheet accrual or footnote disclosure to ensure transparency for shareholders."
    },
    "examples": {
      "daily": [
        "When renovating their kitchen, the homeowners set aside a three-thousand-dollar contingency for unexpected plumbing repairs.",
        "Before embarking on the cross-country road trip, they made a contingency plan in case severe winter weather blocked the mountain passes.",
        "Our family maintains a small cash contingency in a high-yield savings account for surprise automotive expenses."
      ],
      "business": [
        "The chief financial officer insisted on allocating a ten percent contingency in the annual capital expenditure budget to absorb potential supply chain inflation.",
        "Under the purchase agreement, the acquisition was subject to a strict financing contingency that allowed the buyer to withdraw if credit terms were unfavorable.",
        "The engineering firm activated its operational contingency plan when server downtime threatened to delay the client's product launch."
      ],
      "conversation": [
        "\"Did the project budget include room for cost overruns on raw materials?\" / \"Yes, we established a five-hundred-thousand-dollar contingency fund specifically for commodity price volatility.\"",
        "\"Has the real estate contract gone through?\" / \"Not quite; the buyers have a home inspection contingency that gives them until Friday to request repairs.\"",
        "\"What happens if the primary overseas supplier cannot ship the microchips on time?\" / \"We have a supply chain contingency in place with a secondary manufacturer based in Mexico.\""
      ],
      "collocations": [
        "contingency plan",
        "contingency fund",
        "contingency fee",
        "contingency budget",
        "unforeseen contingency",
        "contingency reserve"
      ]
    },
    "wordFamily": {
      "noun": "contingency, contingent",
      "verb": "",
      "adjective": "contingent",
      "adverb": "contingently"
    },
    "visual": {
      "imageKeyword": "contingency plan risk management budget buffer emergency fund corporate planning",
      "imageDescription": "A project director pointing to a brightly highlighted contingency allocation column on a digital project management gantt chart during a corporate risk assessment briefing.",
      "mnemonic": "CONTIN-GEN-CY: A CONTINuous hedge against unpredictable GENerations of CYnical surprises!"
    },
    "video": {
      "description": "An executive risk management masterclass demonstrating how corporate planners calculate contingency reserves in multi-million-dollar capital infrastructure budgets to hedge against unforeseen market shocks."
    },
    "toeicContext": {
      "commonParts": [
        3,
        4,
        5,
        7
      ],
      "exampleQuestion": "To protect the development project against unexpected material price increases, the board approved an additional eight percent _____ in the capital expenditure budget.\n(A) contingent\n(B) contingently\n(C) contingency\n(D) contingencies",
      "tips": "In TOEIC Part 5, determine the grammatical role of the blank. Following the adjective phrase 'an additional eight percent', the blank serves as the singular direct object of the verb 'approved' (referring to a singular contingency reserve or fund). Choice (C) 'contingency' correctly functions as the noun head. Choice (A) is an adjective, choice (B) is an adverb, and choice (D) is plural (which conflicts with the singular indefinite article 'an')."
    },
    "synonyms": [
      "eventuality",
      "emergency reserve",
      "safeguard",
      "buffer",
      "proviso",
      "prerequisite"
    ],
    "antonyms": [
      "certainty",
      "inevitability",
      "assurance",
      "guarantee",
      "predetermination"
    ],
    "relatedWords": [
      "contingency plan",
      "contingent liability",
      "risk mitigation",
      "cost overrun",
      "escrow",
      "due diligence",
      "emergency fund"
    ]
  },
  {
    "id": "finance-104",
    "word": "contribution",
    "partOfSpeech": [
      "noun"
    ],
    "category": "finance",
    "level": "advanced",
    "toeicFrequency": 7,
    "pronunciation": {
      "ipa": "/ˌkɑːn.trɪˈbjuː.ʃən/",
      "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/contribution--_us_1.mp3",
      "syllableBreakdown": "con·tri·bu·tion",
      "stressPattern": "◐○●○",
      "commonMistakes": "Learners often misplace primary stress on the second syllable (*con-TRIB-u-tion) by analogy with the verb 'conTRIBute'. In the noun, stress shifts to the third syllable /bjuː/ (/ˌkɑːn.trɪˈbjuː.ʃən/). Another mistake is omitting the /j/ glide in the third syllable (pronouncing it as 'con-tri-BOO-shun' instead of 'con-tri-BYOO-shun'). In business finance and accounting, learners often overlook the technical concept of 'contribution margin' (selling price per unit minus variable cost per unit), mistakenly assuming that 'contribution' only refers to charitable donations or non-monetary effort."
    },
    "etymology": {
      "origin": "Late Middle English, borrowed from Anglo-French 'contribution' and directly from Late Latin 'contribūtiō' (a bringing together, joint collection, distribution of payments), from 'contribūtus', the past participle of 'contribuere' ('to bring together, unite, impart, contribute').",
      "rootWord": "Latin com- ('together, with') + tribuere ('to assign, allot, grant, bestow, or divide among tribes'), derived from tribus ('tribe')",
      "rootMeaning": "'To pay or allot one's share together with others into a common fund'",
      "evolution": "In ancient Roman administration, 'tribuere' was the distribution or levying of property taxes among the Roman voting tribes ('tribus'). The prefixed compound 'contribuere' meant paying one's proportional tax assessment into the public treasury. It entered Anglo-Norman legal documents and Middle English in the late 14th century to denote taxes, subsidies, or military tributes exacted from communities. In 18th- and 19th-century commercial partnership law, it referred to capital invested by each partner into a joint-stock firm. In 20th-century managerial accounting, economists developed cost-volume-profit analysis and introduced 'contribution margin' to measure how sales revenue contributes toward paying down fixed overhead costs and generating operating profit.",
      "relatedLanguages": [
        "French: contribution (f.)",
        "Spanish: contribución (f.)",
        "Italian: contribuzione / contributo (m.)",
        "German: Beitrag (m.) / Kontribution (f.)",
        "Portuguese: contribuição (f.)"
      ],
      "firstRecordedUse": "Late 14th century (c. 1386, in Middle English legal charters and Geoffrey Chaucer's writings)"
    },
    "deepMeaning": {
      "coreConcept": "The act of giving, investing, or allotting capital, assets, or effort toward a common fund, venture, or shared goal; in corporate finance, taxation, and managerial accounting, it specifically encompasses: (1) contribution margin—the residual revenue remaining after deducting all variable costs from sales, representing the portion of revenue that contributes directly to covering fixed overhead costs and generating operating profit; (2) capital contribution—equity funds or property transferred by partners or shareholders into an enterprise; (3) retirement plan contribution—periodic payments made by employees and employers into pension, 401(k), or superannuation funds; and (4) charitable / philanthropic contribution—tax-deductible financial donations made by corporations or individuals.",
      "spatialContext": "Management accounting dashboards, break-even analysis charts, payroll and employee benefits administrative portals, investment partnership closing agreements, and corporate tax compliance filings.",
      "temporalContext": "Tracked monthly in cost-volume-profit reports; calculated bi-weekly or monthly in payroll retirement matching cycles; recorded annually in partnership tax filings (Schedule K-1) and corporate charitable donation tax deductions.",
      "emotionalTone": "Constructive, participatory, valuable, and accountable.",
      "formalityLevel": "formal",
      "connotation": "positive"
    },
    "nativeMindset": {
      "howNativesThink": "To a native finance professional, 'contribution' has two primary resonances depending on context: profitability analysis and compensation benefits. When reviewing a product line or business unit, an accountant does not merely look at net profit; they look at 'contribution margin'—asking whether a product covers its variable costs and leaves enough to help pay for the building and executive salaries. When speaking with HR or personal finance advisors, natives immediately associate 'contribution' with their retirement wealth: 'What percentage is your 401(k) contribution, and does the company match it?' They view employee contributions as disciplined long-term wealth building, while employer matching is seen as 'free money'.",
      "mentalImage": "A managerial cost accountant displaying a break-even chart on a conference room screen, pointing out the positive contribution margin of a newly launched medical device line that covers fixed factory overhead.",
      "whenToUse": "Use when discussing cost-volume-profit (CVP) analysis and contribution margins, equity investments made by business partners (capital contribution), employee and employer retirement payments (401(k) / pension contribution), or corporate charitable giving (tax-deductible contribution).",
      "whenNotToUse": "Do not use 'contribution' to describe compulsory statutory penalty taxes or fines (use 'levy', 'fine', or 'penalty'). Do not confuse with 'distribution' (which is paying profits or dividends out of a company to shareholders, whereas a contribution puts capital in). Avoid using when 'attribution' (assigning cause or authorship) is intended.",
      "culturalContext": "In the United States and UK, corporate matching of employee retirement contributions (e.g., 401(k) match up to 6%) is one of the most critical employment benefits for attracting corporate talent. In corporate taxation under the IRS Code Section 170, charitable contributions offer major tax write-offs for enterprises. In management accounting, 'contribution margin ratio' is the universal metric used across business schools and boardrooms to evaluate whether a product is worth manufacturing."
    },
    "examples": {
      "daily": [
        "Mark increased his monthly retirement contribution to six percent of his gross salary to take full advantage of the employer match.",
        "The local community center thanked neighborhood residents for their financial contributions toward repairing the community playground.",
        "Every family member made a small contribution to the grocery budget for the holiday reunion dinner."
      ],
      "business": [
        "The financial controller calculated that the premium subscription tier yielded an impressive sixty-five percent contribution margin after subtracting direct server and support costs.",
        "Under the terms of the limited liability company agreement, each founding partner made an initial capital contribution of one hundred thousand dollars.",
        "The corporation announced a five-million-dollar philanthropic contribution to fund renewable energy research at the national university."
      ],
      "conversation": [
        "\"Why are we keeping this product line if its net profit is barely above zero?\" / \"Because its contribution margin is fifty thousand dollars a month, which helps cover our factory's fixed rent and insurance.\"",
        "\"Does the firm offer a matching retirement program for new hires?\" / \"Yes, the company matches one hundred percent of your 401(k) contribution up to four percent of your salary.\"",
        "\"Are the charitable donations we made to the food bank deductible on this year's tax return?\" / \"Yes, corporate contributions to verified non-profit organizations qualify for full deductions under current tax regulations.\""
      ],
      "collocations": [
        "contribution margin",
        "capital contribution",
        "employer matching contribution",
        "charitable contribution",
        "pension contribution",
        "voluntary contribution"
      ]
    },
    "wordFamily": {
      "noun": "contribution, contributor",
      "verb": "contribute",
      "adjective": "contributory, contributing",
      "adverb": "contributively"
    },
    "visual": {
      "imageKeyword": "contribution margin break even financial chart retirement matching 401k",
      "imageDescription": "A financial analyst and operations manager reviewing a colorful cost-volume-profit chart on a tablet, analyzing product unit revenue, variable costs, and resulting contribution margin.",
      "mnemonic": "CON (together) + TRIBUTE (give payment): A contribution is paying your share into the pool—whether into a 401(k) or to cover corporate fixed overhead!"
    },
    "video": {
      "description": "A management accounting explainer detailing the calculation of unit contribution margin and break-even point, illustrating how revenue over variable expenses directly fuels corporate profitability."
    },
    "toeicContext": {
      "commonParts": [
        3,
        4,
        5,
        7
      ],
      "exampleQuestion": "To maximize retirement savings, employees are strongly encouraged to increase their monthly 401(k) _____ before the end of the open enrollment period.\n(A) contribute\n(B) contributor\n(C) contribution\n(D) contributory",
      "tips": "In TOEIC Part 5, analyze the noun phrase following the possessive pronoun 'their' and modifying terms 'monthly 401(k)'. The blank requires a noun referring to the payment amount or allotment itself. Choice (C) 'contribution' is the correct abstract/financial noun. Choice (A) is a verb, choice (B) 'contributor' refers to the person who contributes (an employee cannot increase their person), and choice (D) is an adjective."
    },
    "synonyms": [
      "donation",
      "allotment",
      "endowment",
      "capital injection",
      "subscription",
      "offering"
    ],
    "antonyms": [
      "withdrawal",
      "distribution",
      "deduction",
      "divestment",
      "disinvestment"
    ],
    "relatedWords": [
      "contribution margin",
      "break-even point",
      "variable cost",
      "fixed overhead",
      "401(k) plan",
      "capital account",
      "matching fund"
    ]
  }
]

output = {"words": words}

with open("scratch/finance_102_104.json", "w", encoding="utf-8") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

print("Saved scratch/finance_102_104.json successfully.")
