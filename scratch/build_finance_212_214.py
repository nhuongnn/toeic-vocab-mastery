import json

words_data = [
    {
        "id": "finance-212",
        "word": "payee",
        "partOfSpeech": ["noun"],
        "category": "finance",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/peɪˈiː/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/payee--_us_1.mp3",
            "syllableBreakdown": "pay-ee",
            "stressPattern": "○●",
            "commonMistakes": "Learners often place stress on the initial syllable /ˈpeɪ.iː/ by false analogy with 'payer' /ˈpeɪ.ər/. In English commercial and legal terminology, the recipient suffix '-ee' always carries the primary stress /peɪˈiː/. Another common mistake is contracting both vowels into a single syllable like 'pay'."
        },
        "etymology": {
            "origin": "Anglo-French legal terminology, formed in English law from 'pay' (verb) + '-ee' (passive recipient suffix, from Old French past participle '-é', from Latin '-atus').",
            "rootWord": "pay + -ee",
            "rootMeaning": "the party to whom money is paid or owed; the designated recipient of payment",
            "evolution": "The verb 'pay' entered Middle English from Old French 'paier' ('to satisfy, appease a creditor'), derived from Latin 'pacare' ('to pacify, appease'), from 'pax' ('peace'). In 18th-century English common law and mercantile jurisprudence, the legal suffix '-ee' was systematically coupled with agent nouns ending in '-er' (payer/payee, drawer/drawee, endorser/endorsee). 'Payee' became the standard legal designation for the individual or corporate entity named on a commercial check, draft, or promissory note entitled to negotiate or receive the funds upon presentation.",
            "relatedLanguages": [
                "French: bénéficiaire / payé",
                "Spanish: beneficiario / tomador",
                "Italian: beneficiario / prenditore",
                "German: Zahlungsempfänger / Remittent",
                "Dutch: begunstigde / nemer"
            ],
            "firstRecordedUse": "Mid-18th century (c. 1750s, in English banking jurisprudence and commercial statutes)"
        },
        "deepMeaning": {
            "coreConcept": "The specific individual, business entity, or institution formally designated on a check, wire transfer, invoice, or electronic payment order to receive the disbursed funds.",
            "spatialContext": "The 'Pay to the order of' designated line on corporate paper checks, automated accounts payable processing dashboards, electronic wire remittance slips, and online banking payee directories.",
            "temporalContext": "Established during vendor onboarding, printed upon check generation, confirmed during pre-settlement clearing cycles, and audited during monthly bank reconciliations.",
            "emotionalTone": "Objective, formal, contractual, and legally binding.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Native English speakers instinctively link 'payee' to the 'Pay to the order of' line on a check or the 'Manage Payees' tab in modern banking apps. There is a rigid mental contrast between 'payer' (who initiates and gives money) and 'payee' (who receives and cashes money). In corporate accounting, native professionals emphasize ensuring the legal payee name matches registered banking details down to the punctuation mark to prevent rejected wire settlements or fraud compliance flags.",
            "mentalImage": "An accounts payable officer sitting before dual monitors, verifying the corporate tax ID and legal business title on a vendor's invoice against the payee line of an outgoing five-figure electronic funds transfer.",
            "whenToUse": "Use when identifying the legally named recipient of a payment, check, wire transfer, or recurring bill (e.g., 'named payee', 'electronic payee', 'verify the payee', 'designated payee').",
            "whenNotToUse": "Do not use 'payee' for the party issuing the funds (that is the 'payer', 'remitter', or 'drawer'). Avoid using 'payee' to describe an heir or life insurance policy beneficiary unless specifically discussing the issuance of the payout check itself.",
            "culturalContext": "In Anglo-American commercial banking, checks cannot legally clear without the signature or electronic endorsement of the exact named payee. Furthermore, UK and global banking systems have rolled out 'Confirmation of Payee' protocols as a mandatory fraud defense mechanism to verify bank account names before wires execute."
        },
        "examples": {
            "daily": [
                "Before mailing the rent check to the management office, David ensured his landlord's registered agency was written as the payee.",
                "When setting up recurring payments for your electric utility, be sure to enter the payee information exactly as printed on your monthly statement.",
                "The teller explained that the cashier's check could only be deposited into an account bearing the name of the designated payee."
            ],
            "business": [
                "The corporate treasury department requires an authorized Form W-9 before adding any independent contractor as a new payee in the ERP system.",
                "Due to a clerical typo in the payee field, the bank temporarily rejected the multimillion-dollar international supplier wire.",
                "Under revised auditing controls, any check alteration affecting the payee line requires an immediate void and reissue by the finance director."
            ],
            "conversation": [
                "\"Who should I enter as the payee on the travel reimbursement request?\" / \"List the regional airline directly if the corporate office is booking the flights on your behalf.\"",
                "\"Why was our invoice payment returned by the vendor's financial institution?\" / \"The registered corporate name of the payee didn't match their new incorporated subsidiary.\"",
                "\"Can I endorse this reimbursement check over to you?\" / \"No, the bank requires that the original payee deposit it into their own account first.\""
            ],
            "collocations": [
                "designated payee",
                "named payee",
                "payee information",
                "add a payee",
                "payee details",
                "authorized payee"
            ]
        },
        "wordFamily": {
            "noun": "payee, payer, payment, pay",
            "verb": "pay",
            "adjective": "payable, paid",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "blank check paper pay to the order of line fountain pen desk payee",
            "imageDescription": "A close-up shot of a pristine corporate check on an executive mahogany desk, showing a fountain pen pointed at the line reading 'Pay to the Order of' with payee details neatly typed.",
            "mnemonic": "Pay-EE = The rEcipiEnt who rEceivEs the monEy (double E receives!), whereas pay-ER is the sendER of the payment!"
        },
        "video": {
            "description": "An educational corporate banking video demonstrating how accounts payable clerks verify and configure payee accounts to prevent fraudulent wire diversions."
        },
        "toeicContext": {
            "commonParts": [3, 4, 5, 7],
            "exampleQuestion": "Please ensure that the supplier's full corporate title is printed as the official _____ on the check before forwarding it to the comptroller for signature.\n(A) payable\n(B) payment\n(C) payee\n(D) payer",
            "tips": "In Part 5 vocabulary and word form questions, distinguish between participant nouns (-er vs -ee). The blank is preceded by the adjective 'official' and followed by 'on the check', referring to the receiving party of the payment. Choice (C) 'payee' correctly refers to the recipient of the funds. Choice (D) 'payer' is the party paying (the company writing the check), choice (B) 'payment' is the transaction itself, and choice (A) 'payable' is an adjective or accounting liability balance."
        },
        "synonyms": [
            "recipient",
            "beneficiary",
            "remittee",
            "assignee",
            "creditor",
            "addressee of payment"
        ],
        "antonyms": [
            "payer",
            "remitter",
            "drawer",
            "maker",
            "debtor"
        ],
        "relatedWords": [
            "remittance",
            "disbursement",
            "negotiable instrument",
            "endorsement",
            "accounts payable",
            "routing number",
            "wire transfer"
        ]
    },
    {
        "id": "finance-213",
        "word": "payer",
        "partOfSpeech": ["noun"],
        "category": "finance",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/ˈpeɪ.ər/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/payer--_us_1.mp3",
            "syllableBreakdown": "pay-er",
            "stressPattern": "●○",
            "commonMistakes": "Learners frequently confuse 'payer' with 'payee' in both pronunciation and role. In 'payer', primary stress is firmly on the first syllable /ˈpeɪ.ər/, whereas 'payee' is stressed on the final syllable /peɪˈiː/. Additionally, non-native speakers often compress 'payer' into a single monosyllabic vowel /ˈpɛər/ (sounding like 'pair' or 'pear') rather than maintaining the distinct two-syllable sequence /ˈpeɪ.ər/."
        },
        "etymology": {
            "origin": "Middle English 'payer', formed from 'pay' (verb) + '-er' (agent suffix designating the person or party performing the action), from Old French 'paier' ('to appease, satisfy a debt'), from Latin 'pacare' ('to pacify, appease'), from 'pax' ('peace').",
            "rootWord": "pay + -er",
            "rootMeaning": "one who remits payment, satisfies a monetary obligation, or discharges a debt",
            "evolution": "In medieval English trade documents and town rolls, 'payer' described the debtor or guildsman delivering money to settle an account. By the 17th and 18th centuries, mercantile law formalized 'payer' as the counterpart to 'payee' across commercial instruments like promissory notes and drafts. During the 20th century, with the expansion of public taxation, insurance industries, and healthcare systems, 'payer' evolved to denote institutional funding bodies, giving rise to terms such as 'taxpayer', 'third-party payer', and 'single-payer system'.",
            "relatedLanguages": [
                "French: payeur",
                "Spanish: pagador",
                "Italian: pagatore",
                "German: Zahler / Zahlender",
                "Dutch: betaler"
            ],
            "firstRecordedUse": "Late 14th century (c. 1380s, in Middle English mercantile ordinances and legal charters)"
        },
        "deepMeaning": {
            "coreConcept": "The individual, corporate organization, financial entity, or government institution that provides the funds, disburses settlement, or incurs the financial liability for a purchase, debt, or contracted service.",
            "spatialContext": "Corporate treasury desks, accounts payable departments, point-of-sale customer checkout counters, online payment gateway interfaces, and health insurance billing networks.",
            "temporalContext": "Engaged upon contract execution, invoice settlement due dates, regular payroll disbursements, quarterly estimated tax schedules, and loan amortization intervals.",
            "emotionalTone": "Authoritative, responsible, legally accountable, and transactional.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Native English speakers view a 'payer' as the entity holding the financial purse strings and bearing the legal responsibility to disburse money. In consumer life, people identify as 'prompt bill payers'. In healthcare and insurance, 'payer' is the institutional term used by hospitals and clinics to denote insurance carriers or government agencies (e.g., Medicare) that reimburse healthcare providers. In public finance, compound terms like 'taxpayer' invoke strong civic accountability.",
            "mentalImage": "A corporate comptroller reviewing cash flow forecasts, electronically authorizing batch payments to suppliers while verifying that the company's checking account has sufficient liquidity to act as payer.",
            "whenToUse": "Use when identifying the party who disburses or owes the money, whether a consumer settling bills, a firm clearing commercial invoices, or an institutional insurer funding healthcare claims (e.g., 'prompt payer', 'late payer', 'third-party payer', 'commercial payer').",
            "whenNotToUse": "Do not use 'payer' for the entity receiving the money (that is the 'payee' or 'creditor'). In healthcare contexts, avoid confusing the 'payer' (insurance company or public program) with the 'provider' (the doctor, clinic, or hospital delivering treatment).",
            "culturalContext": "In US and global healthcare economics, the multi-payer model (commercial insurers alongside public programs) forms the foundational vocabulary of medical billing and corporate benefits negotiations, where health systems classify revenue streams by 'payer mix'."
        },
        "examples": {
            "daily": [
                "Because she has always been a disciplined bill payer, her credit score remained excellent throughout college.",
                "When dividing the catering costs for the family reunion, Uncle Robert offered to be the primary payer and collect cash later.",
                "If the tenant listed on the apartment lease falls behind on rent, the landlord will notify the secondary payer named in the contract."
            ],
            "business": [
                "The hospital's billing department submitted the surgery pre-authorization forms directly to the patient's commercial health insurance payer.",
                "Our credit management software automatically categorizes clients with outstanding receivables past sixty days as high-risk payers.",
                "Under the revised procurement agreement, the multinational buyer agreed to serve as the sole payer for all cross-border customs clearing fees."
            ],
            "conversation": [
                "\"Why was the shipment of raw materials delayed at the port?\" / \"The supplier's finance team was waiting for the payer's bank to confirm that the letter of credit had been funded.\"",
                "\"Does your medical practice accept out-of-network insurance?\" / \"Yes, but patients must pay upfront and file a reimbursement claim directly with their designated health insurance payer.\"",
                "\"Our records indicate that this commercial client has been a consistently slow payer.\" / \"Then we should require a fifty percent upfront deposit before starting the next construction phase.\""
            ],
            "collocations": [
                "prompt payer",
                "late payer",
                "third-party payer",
                "designated payer",
                "commercial payer",
                "reliable payer"
            ]
        },
        "wordFamily": {
            "noun": "payer, payee, payment, pay",
            "verb": "pay",
            "adjective": "payable, paid",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "contactless credit card payment terminal transaction payer hand receipt",
            "imageDescription": "A customer's hand tapping a contactless corporate credit card on an illuminated payment terminal, with digital confirmation appearing on screen designating the payer's account.",
            "mnemonic": "Pay-ER: The ER suffix signifies the doER or givER of money (like givER or providER)—the PAYER hands over the funds!"
        },
        "video": {
            "description": "An instructional business seminar explaining the distinct roles of payers, payees, and financial intermediaries in commercial invoice clearing networks."
        },
        "toeicContext": {
            "commonParts": [3, 4, 5, 7],
            "exampleQuestion": "Because the manufacturing conglomerate has earned an industry-wide reputation as a prompt _____, suppliers routinely extend thirty-day interest-free trade credit.\n(A) payable\n(B) payee\n(C) payer\n(D) paying",
            "tips": "In TOEIC Part 5, test takers must select the noun that correctly fits the collocation 'prompt _____'. Suppliers offer favorable credit terms to a customer that pays quickly and reliably. Choice (C) 'payer' refers to the entity discharging payments. Choice (B) 'payee' is the entity receiving funds (the supplier itself), choice (A) 'payable' is an adjective or accounting liability line, and (D) 'paying' is a participle/gerund."
        },
        "synonyms": [
            "remitter",
            "disburser",
            "debtor",
            "funder",
            "settler of accounts",
            "subscriber"
        ],
        "antonyms": [
            "payee",
            "recipient",
            "creditor",
            "beneficiary",
            "collector"
        ],
        "relatedWords": [
            "remittance",
            "disbursement",
            "accounts payable",
            "invoice",
            "credit rating",
            "settlement",
            "third-party billing"
        ]
    },
    {
        "id": "finance-214",
        "word": "pension",
        "partOfSpeech": ["noun"],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈpɛn.ʃən/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/pension--_us_1.mp3",
            "syllableBreakdown": "pen-sion",
            "stressPattern": "●○",
            "commonMistakes": "Learners often mistakenly voice the middle consonant cluster as /ʒən/ (rhyming with 'vision' /ˈvɪʒ.ən/), whereas 'pension' is pronounced with the unvoiced postalveolar fricative /ʃən/. In French, the word is pronounced /pɑ̃.sjɔ̃/ with nasalized vowels; learners sometimes inadvertently carry over French phonology into English. Another frequent mistake is shifting stress to the final syllable."
        },
        "etymology": {
            "origin": "Old French 'pension' ('regular payment, rent, stipend'), from Latin 'pensionem' (nominative 'pensio', 'a payment, installment, weighing out of bullion'), from past participle stem of 'pendere' ('to weigh, pay, hang').",
            "rootWord": "pensio (from pendere)",
            "rootMeaning": "a weighing out of money; a regular payment or periodic stipend",
            "evolution": "In ancient Rome, before minted currency became universal, uncoined bronze or silver had to be weighed out ('pendere') to settle commercial transactions, producing the noun 'pensio' (an installment or payment). In medieval and Renaissance Europe, monarchs and aristocrats granted a 'pension' as a regular allowance or retainer to reward courtiers, military commanders, and scholars. By the late 19th and early 20th centuries, through industrial labor agreements and social security legislation, 'pension' became institutionalized as an employer- or state-funded retirement annuity ensuring regular income for workers who completed a qualifying tenure.",
            "relatedLanguages": [
                "French: pension (de retraite)",
                "Spanish: pensión / jubilación",
                "Italian: pensione",
                "German: Pension / Rente",
                "Dutch: pensioen"
            ],
            "firstRecordedUse": "Early 14th century (c. 1310s, denoting a stipend or payment; retirement annuity sense established by the mid-19th century)"
        },
        "deepMeaning": {
            "coreConcept": "A regular, fixed sum of money paid at scheduled intervals to an individual following retirement from active service, funded throughout working years through accumulated contributions by the employee, employer, or government.",
            "spatialContext": "Corporate human resources benefits departments, actuarial consulting firms, institutional pension fund investment trading desks, retirement planning agencies, and government social security offices.",
            "temporalContext": "Accumulated over decades of employment through biweekly or monthly payroll deductions; disbursed monthly or quarterly upon reaching retirement age until the pensioner's death.",
            "emotionalTone": "Reassuring, dignified, stable, protective, and future-oriented.",
            "formalityLevel": "formal",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "To native English speakers, a 'pension' represents lifetime financial security after a career of hard work. In corporate and public sector contexts, natives distinguish sharply between a traditional 'defined-benefit pension' (where the employer guarantees a fixed monthly paycheck for life regardless of market swings) and modern 'defined-contribution plans' (like a 401(k) or personal pension, where investment risk rests on the employee). In the UK and Commonwealth countries, 'state pension' refers to basic government retirement benefits. Native speakers readily associate pensions with actuarial funding levels, corporate solvency, and union negotiations.",
            "mentalImage": "A retired school administrator or corporate engineer reviewing their monthly annuity deposit statement at a sunlit breakfast table, knowing their cost-of-living expenses are fully covered by their employer-sponsored pension.",
            "whenToUse": "Use when referring to retirement income funds, superannuation schemes, employer-sponsored retirement plans, or government retirement stipends (e.g., 'defined-benefit pension', 'pension fund', 'draw a pension', 'pension contributions').",
            "whenNotToUse": "Do not use 'pension' to refer to ordinary active salaries, severance pay, unemployment benefits, or temporary bonuses. In standard TOEIC business contexts, avoid using 'pension' in its archaic or French sense of a boarding house or guest inn.",
            "culturalContext": "The historic retreat of private sector corporations from traditional defined-benefit pensions toward individual retirement accounts (such as 401(k) plans in the US) has transformed corporate liability management, labor union bargaining, and global capital markets, where trillion-dollar institutional pension funds remain among the most powerful equity and sovereign debt investors."
        },
        "examples": {
            "daily": [
                "After thirty-two years of service as a postal worker, my grandfather retired with a dependable monthly pension.",
                "Young professionals are encouraged to check their state pension forecast online to ensure they meet the minimum qualifying contribution years.",
                "She decided to defer drawing her corporate pension until age sixty-seven to maximize her annual annuity payments."
            ],
            "business": [
                "The company's annual financial report noted that the corporate defined-benefit pension fund was fully funded with an actuarial surplus.",
                "During union contract negotiations, management proposed increasing matching pension contributions by two percent over the next four years.",
                "Institutional pension funds voted their proxy shares against the proposed executive compensation package at the annual general meeting."
            ],
            "conversation": [
                "\"Does your new employment offer include a traditional defined-benefit pension?\" / \"No, but the company offers a competitive defined-contribution plan with a six percent employer match.\"",
                "\"Why is the airline's management restructuring its legacy pension obligations?\" / \"The actuarial deficit grew too large to sustain under fluctuating interest rates and extended retiree life expectancies.\"",
                "\"Have you received your annual pension benefit projection statement?\" / \"Yes, it estimates that my retirement annuity will replace approximately seventy percent of my current base salary.\""
            ],
            "collocations": [
                "defined-benefit pension",
                "pension fund",
                "pension scheme",
                "pension contribution",
                "draw a pension",
                "state pension"
            ]
        },
        "wordFamily": {
            "noun": "pension, pensioner, pensionary",
            "verb": "pension",
            "adjective": "pensionable",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "senior retired couple financial planning pension document terrace sunset",
            "imageDescription": "A happy senior retired couple sitting on an outdoor terrace overlooking a garden, reviewing their monthly pension statements and retirement portfolio charts over morning coffee.",
            "mnemonic": "PEN-sion: Regular PEN-nies paid to senior citIZENS to protect their future peace of mind!"
        },
        "video": {
            "description": "An educational personal finance and institutional investing video detailing how corporate pension funds manage assets and liabilities to guarantee lifetime retirement disbursements."
        },
        "toeicContext": {
            "commonParts": [3, 4, 5, 7],
            "exampleQuestion": "Full-time personnel who have completed at least ten consecutive years with the municipal authority become eligible to receive monthly _____ benefits upon retirement.\n(A) pension\n(B) pensioner\n(C) pensionable\n(D) pensioned",
            "tips": "In Part 5, analyze the noun phrase 'monthly _____ benefits'. The blank requires a noun adjunct that modifies 'benefits' to indicate the specific type of post-retirement compensation. Choice (A) 'pension' forms the common business collocation 'pension benefits'. Choice (B) 'pensioner' refers to the retired individual who receives the benefit, choice (C) 'pensionable' is an adjective typically modifying 'salary' or 'age' (e.g., pensionable earnings), and choice (D) is a past participle adjective."
        },
        "synonyms": [
            "retirement annuity",
            "superannuation",
            "retirement benefit",
            "stipend",
            "allowance",
            "retirement income"
        ],
        "antonyms": [
            "active salary",
            "earned wage",
            "hourly pay"
        ],
        "relatedWords": [
            "retirement",
            "annuity",
            "actuary",
            "vesting",
            "contribution",
            "401(k)",
            "superannuation"
        ]
    }
]

with open("scratch/finance_212_214.json", "w", encoding="utf-8") as f:
    json.dump({"result": {"words": words_data}}, f, indent=4, ensure_ascii=False)

print("Saved scratch/finance_212_214.json successfully!")
