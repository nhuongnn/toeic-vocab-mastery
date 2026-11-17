import json

words_data = [
    {
        "id": "finance-270",
        "word": "stamp duty",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈstæmp ˌduː.t̬i/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/stamp_duty--_us_1.mp3",
            "syllableBreakdown": "stamp du-ty",
            "stressPattern": "Primary stress on 'stamp', secondary stress on the first syllable of 'duty': STAMP du-ty (/ˈstæmp ˌduː.t̬i/, ● ˌ●○)",
            "commonMistakes": "Learners frequently mispronounce the vowel in 'stamp' as /ɑː/ or /ʌ/ instead of the short front /æ/, or produce an over-aspirated /t/ instead of the alveolar tap /t̬/ in American speech. Conceptually, non-native speakers often confuse stamp duty with postage or mailing stamps; in commercial law and taxation, stamp duty specifically denotes a mandatory transaction tax levied by governments on legal documents, real estate deeds, conveyances, and share transfers."
        },
        "etymology": {
            "origin": "English compound combining 'stamp' (from Middle English stampen, from Old English stempan 'to pound, crush, imprint', influenced by Middle Dutch stampen, Proto-Germanic *stampōną) and 'duty' (from Anglo-Norman duete 'obligation, debt, tax', from Old French deu 'owed', from Latin debitus, debere 'to owe').",
            "rootWord": "Proto-Germanic *stampōną (to imprint, stamp) + Latin debere / debitus (to owe, be indebted)",
            "rootMeaning": "'A legally mandated tax verified by an impressed physical stamp certifying the discharge of debt or compliance'",
            "evolution": "First devised in the Dutch Republic in 1624, stamp duty was introduced to England under William and Mary in the Stamp Act of 1694 to finance the war against France, requiring legal documents, deeds, and parchment to bear an embossed revenue seal. The tax provoked the American Revolution following the notorious 1765 Stamp Act ('No taxation without representation'). In modern commercial and property law across the UK (now Stamp Duty Land Tax), Australia, Singapore, and Hong Kong, physical revenue stamps have transitioned to digital certificates, but the statutory term remains standard for ad valorem real estate and transfer taxes.",
            "relatedLanguages": [
                "French: droit de timbre",
                "Spanish: impuesto de timbre / impuesto sobre actos jurídicos documentados",
                "German: Stempelsteuer / Stempelabgabe",
                "Italian: imposta di bollo"
            ],
            "firstRecordedUse": "Late 17th century (circa 1694, during the enactment of the English 5 & 6 Will. & Mar. c. 21 tax statutes)"
        },
        "deepMeaning": {
            "coreConcept": "A mandatory statutory tax levied by national or subnational governments on the execution of specific legal instruments, most prominently deeds transferring ownership of real estate property, commercial leases, mortgages, and share acquisitions.",
            "spatialContext": "Conveyancing solicitor offices, land registry departments, corporate real estate closing conference rooms, and municipal tax revenue payment portals.",
            "temporalContext": "Assessed and payable upon the formal execution, completion, or settlement of a property conveyance or commercial contract (typically required within fourteen to thirty days of closing).",
            "emotionalTone": "Formal, non-negotiable, transactional, and legally binding.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "In Commonwealth countries (UK, Australia, New Zealand, Canada) as well as Singapore and Hong Kong, native speakers instinctively view 'stamp duty' (often abbreviated in the UK as SDLT) as a major, non-negotiable cash hurdle when buying a home or acquiring commercial premises. It is never associated with post office stamps; rather, it is calculated as an upfront capital expenditure that must be wired during conveyancing closing alongside solicitor fees and property survey disbursements.",
            "mentalImage": "A conveyancing attorney seated at a desk reviewing a settlement breakdown on two monitors, verifying that the escrow deposit includes the exact stamp duty land tax payment owed to the inland revenue authority before registering the commercial deed of transfer.",
            "whenToUse": "Use when discussing transaction taxes, upfront closing costs in real estate conveyancing, transfer fees on commercial leases, statutory deed validation, or equity transfer duties in international commerce.",
            "whenNotToUse": "Do not use for postal postage fees, value-added taxes (VAT), general sales taxes, or recurring municipal property taxes (such as UK council tax or US municipal real estate taxes). In domestic US real estate, the equivalent is typically termed a 'real estate transfer tax' or 'deed tax'.",
            "culturalContext": "Changes to stamp duty thresholds and temporary 'stamp duty holidays' introduced by finance ministers to stimulate the property market are major economic news events in the UK and Australia. In corporate mergers and acquisitions, stamp duty considerations often dictate whether a transaction is structured as a share sale or an asset transfer."
        },
        "examples": {
            "daily": [
                "When purchasing their first two-bedroom flat, the couple had to budget an extra eight thousand pounds specifically for government stamp duty.",
                "The real estate agent used an online calculator to demonstrate how much stamp duty would be owed on houses in different price brackets.",
                "First-time homebuyers in several metropolitan regions qualify for partial exemptions from paying statutory stamp duty."
            ],
            "business": [
                "The finance department factored an estimated three hundred thousand dollars in stamp duty into the capital budget for the new warehouse facility.",
                "Corporate legal counsel advised restructuring the transaction as an asset acquisition to reduce the foreign subsidiary's stamp duty exposure.",
                "The commercial tenancy agreement could not be officially registered with the municipal authority until all applicable stamp duty was remitted."
            ],
            "conversation": [
                "\"Did you receive the itemized closing statement from our conveyancer?\" — \"Yes, but the total closing disbursement is slightly higher than anticipated because the commercial property falls into a higher stamp duty tier.\"",
                "\"Is our regional branch lease officially registered with the revenue board?\" — \"We wired the required stamp duty this morning, so the certified tenancy documents should be confirmed by Thursday.\"",
                "\"Why is the acquisition committee reviewing the docklands deal again?\" — \"Because the recent revision in statutory stamp duty rates adds an unbudgeted seven percent to our initial capital outlay.\""
            ],
            "collocations": [
                "pay stamp duty",
                "stamp duty exemption",
                "stamp duty threshold",
                "stamp duty land tax",
                "stamp duty relief",
                "calculate stamp duty"
            ]
        },
        "wordFamily": {
            "noun": "stamp duty",
            "verb": "",
            "adjective": "stampable",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "stamp duty real estate closing legal documents tax revenue seal property deed",
            "imageDescription": "An official real estate property deed lying on an oak conference table with an embossed tax revenue seal, brass house keys, and a financial closing cost worksheet highlighting the stamp duty calculation next to a fountain pen.",
            "mnemonic": "To make a real estate deed DUTY-bound in law, the government STAMPS it with a heavy transaction tax! STAMP DUTY = the legal tax stamped on property transfers."
        },
        "video": {
            "description": "A property law educational lecture explaining how stamp duty land tax brackets operate in commercial real estate settlements and how conveyancers file digital returns with national revenue agencies."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                7
            ],
            "exampleQuestion": "Under local real estate regulations, commercial tenants are required to submit the certified lease agreement and remit the applicable _______ duty within thirty days of execution.\n(A) stamp\n(B) stamped\n(C) stampede\n(D) stamping",
            "tips": "In TOEIC Part 5 questions dealing with property acquisitions, contracts, or tax compliance, recognize the compound noun 'stamp duty' (A). The noun 'stamp' joins with 'duty' to form the established legal tax term. Distractor (B) 'stamped' is a past participle, (C) 'stampede' is an unrelated noun, and (D) 'stamping' is a gerund that cannot form this fixed compound."
        },
        "synonyms": [
            "transfer tax",
            "documentary stamp tax",
            "deed tax",
            "conveyance tax",
            "land transaction tax",
            "stamp tax"
        ],
        "antonyms": [],
        "relatedWords": [
            "conveyancing",
            "closing costs",
            "real estate settlement",
            "deed of transfer",
            "ad valorem tax",
            "land registry",
            "escrow account"
        ]
    },
    {
        "id": "finance-271",
        "word": "statement",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈsteɪt.mənt/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/statement--_us_1.mp3",
            "syllableBreakdown": "state-ment",
            "stressPattern": "Primary stress on the first syllable: STATE-ment (/ˈsteɪt.mənt/, ●○)",
            "commonMistakes": "Learners often articulate the second syllable with a full vowel /-mɛnt/ instead of a relaxed schwa /-mənt/. In workplace English, non-native speakers also sometimes confuse a spoken or public declaration ('official statement') with an accounting document ('bank statement', 'financial statement', 'billing statement'), which requires analyzing the surrounding financial context to determine whether monetary balances or press remarks are intended."
        },
        "etymology": {
            "origin": "Formed in Early Modern English from the verb 'state' (derived from Latin status 'manner of standing, condition, position', past participle of stare 'to stand') + the noun suffix '-ment' (from Latin -mentum, denoting an instrument, concrete entity, or result of an action).",
            "rootWord": "Latin status / stare (to stand, establish, hold position) + -mentum (suffix denoting a tangible result or medium)",
            "rootMeaning": "'A tangible or documented presentation of that which is formally set down, established, or brought to a fixed stand'",
            "evolution": "In late 16th-century English, 'to state' meant to set forth formally. By the 1770s, British commercial merchants and banking houses used 'statement' specifically for an itemized summary of accounts showing credits, debits, and unsettled balances. As modern accounting conventions consolidated under GAAP and IFRS in the late 19th and 20th centuries, the term became central to corporate reporting frameworks, producing foundational statutory records such as 'financial statement', 'income statement', and 'statement of cash flows'.",
            "relatedLanguages": [
                "French: relevé (de compte) / état (financier)",
                "Spanish: estado (financiero) / extracto (bancario)",
                "German: Abrechnung / Auszug / Abschluss",
                "Italian: estratto conto / rendiconto"
            ],
            "firstRecordedUse": "Late 18th century for commercial accounting summaries (general sense of formal verbal declaration recorded from circa 1605)"
        },
        "deepMeaning": {
            "coreConcept": "A formalized, structured written or electronic document providing an itemized record of financial transactions, account activity, debits, credits, and resulting balances over a specified accounting or billing period.",
            "spatialContext": "Online banking portals, corporate general ledger databases (ERP systems), audit documentation binders, monthly billing mailers, and corporate annual financial reports.",
            "temporalContext": "Generated on fixed, recurring schedules—monthly for bank, credit card, and vendor accounts; quarterly and annually for audited corporate financial filings.",
            "emotionalTone": "Objective, formal, transparent, and authoritative.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "To native speakers, 'statement' in a financial context immediately evokes either personal banking oversight ('reviewing my monthly statement') or corporate fiscal transparency ('quarterly financial statements'). Unlike an 'invoice' (which demands payment for particular goods) or a 'receipt' (which acknowledges a single past payment), a financial statement represents an authoritative chronological overview of all ledger entries, providing a verifiable record of assets, liabilities, and liquidity.",
            "mentalImage": "A corporate accountant examining a printed monthly bank statement alongside an enterprise resource planning ledger, highlighting reconciling entries with a yellow marker to verify that all electronic wire transfers cleared before the fiscal close.",
            "whenToUse": "Use when referring to itemized periodic account summaries (bank statement, credit card statement), standardized corporate accounting reports (financial statement, income statement, cash flow statement), or consolidated billing reports.",
            "whenNotToUse": "Do not confuse with an 'invoice' or 'bill' (a request for payment on a single purchase) or a 'receipt' (proof of completed transaction). When ambiguity is possible, specify whether a bank statement, financial statement, or press release is meant.",
            "culturalContext": "In consumer finance across North America and Europe, 'going paperless' for monthly utility and bank statements is heavily incentivized for ecological sustainability and fraud prevention. In corporate governance, publicly traded corporations face strict regulatory mandates (such as SEC Form 10-Q and 10-K filings) requiring audited financial statements, which directly dictate market capitalization and investor confidence."
        },
        "examples": {
            "daily": [
                "I logged into my online banking account to download the latest PDF statement before preparing my personal tax return.",
                "The monthly credit card statement showed an unrecognized subscription charge that needed to be disputed immediately.",
                "Many banking institutions encourage customers to opt into electronic statements to reduce paper waste and protect against mail theft."
            ],
            "business": [
                "External auditors requested certified bank statements for all overseas accounts before certifying the annual financial report.",
                "According to the consolidated financial statement, operating income increased by twelve percent despite higher freight costs.",
                "The treasury department prepares a monthly cash flow statement to ensure the subsidiary maintains adequate working capital."
            ],
            "conversation": [
                "\"Have you examined the vendor account statement for October?\" — \"Yes, there is an unresolved discrepancy between their invoiced deliveries and our receiving dock logs that I am investigating.\"",
                "\"Did the bank upload our merchant processing statement yet?\" — \"It became available this morning on the merchant portal, and the interchange fees align perfectly with our contractual rates.\"",
                "\"When will the preliminary earnings statement be published?\" — \"The investor relations team plans to release the financial statement tomorrow morning at seven o'clock prior to market opening.\""
            ],
            "collocations": [
                "bank statement",
                "financial statement",
                "income statement",
                "statement of cash flows",
                "account statement",
                "billing statement"
            ]
        },
        "wordFamily": {
            "noun": "statement",
            "verb": "state",
            "adjective": "stated",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "monthly bank statement document financial account balance figures desk calculator",
            "imageDescription": "A printed monthly bank statement document laid out on a clean desk, displaying aligned transaction dates, descriptions, credits, debits, and opening and closing balances, positioned beside a digital calculator and an office stylus.",
            "mnemonic": "A financial STATEMENT formally STATES the exact reality of your bank balance: every deposit and withdrawal is clearly STATED on the sheet!"
        },
        "video": {
            "description": "An accounting tutorial showing business students how to reconcile a monthly bank statement against internal ledger balances to detect outstanding checks and unrecorded service charges."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                7
            ],
            "exampleQuestion": "Corporate clients can review their monthly account _______ and download detailed transaction records through the encrypted commercial banking portal.\n(A) stated\n(B) statements\n(C) statelier\n(D) statehood",
            "tips": "In TOEIC Part 5 questions featuring corporate banking and administrative processes, identify the plural compound noun 'account statements' (B). Following the plural possessive determiner 'their' and compound modifier 'monthly account', the sentence requires the plural noun 'statements'. Distractor (A) 'stated' is a past participle verb, (C) 'statelier' is a comparative adjective, and (D) 'statehood' is an unrelated abstract noun denoting sovereign political status."
        },
        "synonyms": [
            "account summary",
            "financial report",
            "bank statement",
            "balance sheet",
            "ledger summary",
            "bill of account"
        ],
        "antonyms": [],
        "relatedWords": [
            "reconciliation",
            "balance sheet",
            "cash flow",
            "income statement",
            "general ledger",
            "transaction history",
            "audit trail"
        ]
    },
    {
        "id": "finance-272",
        "word": "stewardship",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "advanced",
        "toeicFrequency": 7,
        "pronunciation": {
            "ipa": "/ˈstuː.ɚd.ʃɪp/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/stewardship--_us_1.mp3",
            "syllableBreakdown": "stew-ard-ship",
            "stressPattern": "Primary stress on the first syllable: STEW-ard-ship (/ˈstuː.ɚd.ʃɪp/, ●○○)",
            "commonMistakes": "Learners often erroneously place the stress on the second syllable (*stew-ARD-ship*) or pronounce the unstressed middle syllable /-ɚd/ as a heavy, prolonged /-ɑːrd/. Conceptually, learners frequently confuse stewardship with routine task administration; in professional finance and governance, stewardship specifically denotes the ethical, fiduciary duty to safeguard, nurture, and responsibly preserve capital and resources on behalf of stakeholders and future generations."
        },
        "etymology": {
            "origin": "Derived from Middle English steward, from Old English stīweard / stiġweard (a compound of stīġ 'hall, pen, household enclosure' + weard 'ward, keeper, guardian'), combined with the Old English suffix -scipe (forming abstract nouns denoting condition, office, or dignity, cognate with modern English -ship).",
            "rootWord": "Old English stīġ (hall, enclosure, estate) + weard (guardian, protector, keeper) + -scipe (state, condition, office)",
            "rootMeaning": "'The office, responsibility, and moral obligation of a trusted guardian managing an estate on behalf of the owner'",
            "evolution": "In Anglo-Saxon and medieval Norman manors, the 'steward' served as the lord's chief administrative officer, managing manorial accounts, rents, and agricultural production with fiduciary fidelity. Over centuries, English common law and civic traditions broadened this into a moral philosophy of responsible custody. In 20th- and 21st-century corporate governance, 'stewardship' was codified through institutional frameworks like the UK Stewardship Code (2010), requiring institutional asset managers, pension boards, and corporate directors to act as active, ethical custodians of investor capital and ESG sustainability.",
            "relatedLanguages": [
                "German: Treuhänderschaft / verantwortungsvolle Verwaltung",
                "Dutch: rentmeesterschap / beheerderschap",
                "French: intendance / gestion fiduciaire / intendance responsable",
                "Spanish: administración responsable / gestión fiduciaria",
                "Italian: gestione responsabile / tutela fiduciaria"
            ],
            "firstRecordedUse": "Late 14th century (circa 1380s in Middle English for the administrative office of a steward; modern corporate governance sense emerged in the mid-to-late 20th century)"
        },
        "deepMeaning": {
            "coreConcept": "The ethical, prudent, and fiduciary responsibility to manage, protect, and enhance financial assets, corporate resources, or environmental capital entrusted to an individual or governing body, prioritizing long-term value preservation and stakeholder accountability over short-term speculative exploitation.",
            "spatialContext": "Corporate boardrooms, institutional asset management firms, pension fund trustee offices, endowment foundations, and ESG governance committee chambers.",
            "temporalContext": "Encompasses multi-year, multi-decade, or intergenerational time horizons; assessed through annual governance audits, long-term portfolio performance, and proxy voting engagement.",
            "emotionalTone": "Ethical, responsible, visionary, and prudential.",
            "formalityLevel": "formal",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "To native business executives, investment trustees, and institutional fund managers, 'stewardship' carries a profound fiduciary and moral weight that simple 'management' does not. While a manager organizes daily operations, a steward is a guardian entrusted with someone else's wealth, obligated to pass it forward in stronger condition. Native speakers frequently encounter the word in corporate mission statements, university endowment reviews, and ESG investor reports emphasizing sustainable capital allocation.",
            "mentalImage": "A board of trustees seated around a polished conference table in an executive boardroom, reviewing a thirty-year endowment preservation strategy that balances conservative dividend growth with long-term capital protection to fund academic research indefinitely.",
            "whenToUse": "Use when discussing fiduciary duty, long-term capital preservation, ethical management of corporate funds, institutional investor responsibility, endowment administration, or ESG oversight.",
            "whenNotToUse": "Do not use for low-level clerical supervision or day-to-day administrative errands (e.g., do not say 'stewardship of the stationery supplies'). Avoid applying to short-term speculative trading strategies or aggressive leveraged asset buyouts.",
            "culturalContext": "In Anglo-American corporate governance, institutional investors (such as sovereign wealth funds and pension providers) are legally held to rigorous 'stewardship codes', requiring them to actively engage corporate leadership on executive compensation, board independence, and climate risk."
        },
        "examples": {
            "daily": [
                "As treasurer of the community scholarship foundation, Eleanor demonstrated exemplary stewardship by keeping administrative overhead below five percent.",
                "Families that build generational enterprises emphasize financial stewardship so subsequent generations respect and preserve their assets.",
                "The charity's transparent annual report assured contributors that every donation was handled with rigorous fiscal stewardship."
            ],
            "business": [
                "Under the chief executive's disciplined stewardship, the manufacturing firm eliminated its debt obligations while doubling funding for green technology.",
                "Institutional pension funds commended the asset manager's prudent stewardship in safeguarding retirement savings throughout the market downturn.",
                "The board of directors established an ESG oversight committee to guarantee stricter environmental and financial stewardship across all subsidiaries."
            ],
            "conversation": [
                "\"Why did the proxy advisory group endorse the board's proposed executive package?\" — \"They specifically praised the executive team's responsible capital stewardship and sustained focus on long-term shareholder returns.\"",
                "\"How does our university endowment plan to adopt modern sustainability standards?\" — \"We are updating our investment guidelines to emphasize active stewardship, mandating that fund managers vote proxies in favor of transparent governance.\"",
                "\"What convinced the trustees to partner with this particular asset management firm?\" — \"Their forty-year track record of disciplined fiduciary stewardship matched our institution's conservative risk profile.\""
            ],
            "collocations": [
                "financial stewardship",
                "prudent stewardship",
                "stewardship of resources",
                "fiduciary stewardship",
                "corporate stewardship",
                "responsible stewardship"
            ]
        },
        "wordFamily": {
            "noun": "stewardship",
            "verb": "steward",
            "adjective": "",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "corporate board financial stewardship fiduciary investment governance meeting trustees",
            "imageDescription": "A group of corporate directors and trustees seated at a polished conference table in an executive boardroom, attentively analyzing a long-term capital allocation chart illustrating sustainable portfolio growth and risk mitigation.",
            "mnemonic": "A STEWARD is a guardian who WARDS off financial danger: STEWARDSHIP is the wise, protective GUARDIANSHIP of company capital for future generations!"
        },
        "video": {
            "description": "An executive education webinar on fiduciary governance and institutional stewardship, explaining how institutional investors execute stewardship codes through proxy voting and board engagement."
        },
        "toeicContext": {
            "commonParts": [
                4,
                5,
                6,
                7
            ],
            "exampleQuestion": "Under the prudent _______ of its newly appointed Chief Financial Officer, the logistics corporation successfully restructured its commercial debt obligations.\n(A) steward\n(B) stewardship\n(C) stewardess\n(D) stewarded",
            "tips": "In TOEIC Part 5 advanced leadership and corporate finance questions, following the preposition 'under the' and modifier 'prudent', the sentence requires the abstract noun (B) 'stewardship', referring to wise and responsible financial management. Distractor (A) 'steward' designates a person rather than the managerial quality, (C) 'stewardess' is an outdated noun for a female flight attendant, and (D) 'stewarded' is a past participle verb."
        },
        "synonyms": [
            "fiduciary administration",
            "responsible custodianship",
            "asset preservation",
            "guardianship",
            "trusteeship",
            "prudential governance"
        ],
        "antonyms": [
            "mismanagement",
            "negligence",
            "squandering",
            "maladministration",
            "wastefulness"
        ],
        "relatedWords": [
            "fiduciary duty",
            "corporate governance",
            "ESG investing",
            "trustee",
            "capital preservation",
            "stakeholder value",
            "accountability"
        ]
    }
]

output_data = {
    "result": {
        "words": words_data
    }
}

with open("scratch/finance_270_272.json", "w", encoding="utf-8") as f:
    json.dump(output_data, f, indent=2, ensure_ascii=False)

print("Saved scratch/finance_270_272.json successfully!")
