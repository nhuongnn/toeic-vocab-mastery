import json
import re

words = [
    {
        "id": "finance-225",
        "word": "principal",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈprɪn.sə.pəl/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/principal--_us_1.mp3",
            "syllableBreakdown": "prin-ci-pal",
            "stressPattern": "Primary stress on the first syllable: PRIN-ci-pal (/ˈprɪn.sə.pəl/, ●○○)",
            "commonMistakes": "Learners frequently confuse 'principal' with its exact homophone 'principle' (a fundamental truth, doctrine, or moral rule). In banking and commerce, the capital sum or leading person is always spelled with '-pal', never '-ple'. Phonetically, non-native speakers often over-pronounce the unstressed second and third syllables as /prɪnˈsɪ.pæl/ or /ˈprɪn.saɪ.pəl/ instead of reducing both unstressed vowels to natural schwas: /ˈprɪn.sə.pəl/. In financial terminology, learners also confuse 'principal' (the base capital balance owed or invested) with 'interest' (the cost or yield of borrowing), failing to understand that amortization payments are split between principal reduction and accrued interest."
        },
        "etymology": {
            "origin": "Classical Latin principalis ('first in importance, original, chief'), from princeps ('first taker, sovereign, chief leader'), compounded from primus ('first') + capere ('to seize, take')",
            "rootWord": "princeps (primus 'first' + capere 'to take')",
            "rootMeaning": "'First in rank, original stake, or primary stakeholder'",
            "evolution": "Originating from Latin 'principalis' (chief, leading) via 'princeps', the word entered Anglo-Norman and Old French before emerging in Middle English during the 14th century as an adjective denoting highest importance and a noun designating a leader or head of an institution. By the late 16th century (circa 1580s), English merchant courts, usury laws, and mercantile bookkeeping formalized 'principal' as a distinct financial noun to separate the original loan or investment capital from accrued interest. Concurrently in English agency and contract law, 'principal' became the legal term for the primary party who empowers an agent or broker to act on their behalf. In modern banking, mortgages, and bond markets, 'principal' strictly denotes the face value of a debt or the remaining loan balance before interest.",
            "relatedLanguages": [
                "French: principal (chief, principal capital sum)",
                "Spanish: principal (capital amount, chief, primary party)",
                "Italian: principale (main, principal capital sum, employer)",
                "German: Prinzipal (master, principal in agency; in banking: Hauptbetrag / Kapitalstamm)",
                "Portuguese: principal (capital sum, primary stakeholder)"
            ],
            "firstRecordedUse": "Late 14th century (for 'ruler or chief person'); late 16th century (circa 1580s in commercial accounting for 'the original capital sum lent or invested')"
        },
        "deepMeaning": {
            "coreConcept": "In banking and debt financing, the original capital sum of money lent, borrowed, or invested, upon which interest, yields, or returns are calculated; in bond markets, the par value or face value of a debt instrument that must be repaid to bondholders upon maturity; in agency and contract law, the primary individual, corporation, or entity that authorizes a representative, broker, or agent to conduct transactions and incur obligations on its behalf.",
            "spatialContext": "Commercial lending offices, mortgage underwriting departments, investment banking debt syndicate desks, loan amortization software interfaces, and corporate debt ledger records.",
            "temporalContext": "Amortized through scheduled monthly or quarterly debt service payments; redeemed as a single bullet repayment upon bond maturity; calculated over multi-year loan horizons (e.g., 5-year commercial notes, 30-year commercial mortgages).",
            "emotionalTone": "Authoritative, contractual, prudent, and fiduciary; conveys foundational capital integrity that must be safeguarded, tracked, and returned.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "To native speakers, 'principal' represents the raw, underlying capital—the money itself, as opposed to the 'rent' paid to use that money ('interest'). When looking at a mortgage, student loan, or corporate credit facility, native speakers instinctively track the principal balance because reducing principal is the only way to eliminate debt permanently. In contract and brokerage discussions, natives recognize the 'principal' as the person or entity with ultimate skin in the game: the owner who bears the financial risk and directs the broker or agent. Native schoolchildren and professionals alike rely on the memory rule: 'The school principal is your PAL who expects you to follow the princi-PLE (rule).'",
            "mentalImage": "A loan amortization schedule displayed on a financial analyst's dual-screen workstation, featuring a declining blue line representing the remaining principal balance and a bar chart detailing how each $10,000 monthly debt service installment is allocated between interest expense and principal reduction.",
            "whenToUse": "Use when referring to the original capital sum of a loan or bond, the remaining balance of borrowed money excluding interest, or the main party in an agency agreement (e.g., 'repay the principal', 'principal and interest', 'principal balance', 'agent acting on behalf of the principal').",
            "whenNotToUse": "Never use 'principal' to denote a moral rule, fundamental truth, ethical standard, or scientific theorem (always use 'principle'). Do not use 'principal' to describe interest charges, borrowing fees, or operating income.",
            "culturalContext": "In Anglo-American commercial banking and consumer debt management, 'paying down the principal' is a major milestone of fiscal responsibility. Loan structures often specify whether borrowers can make 'principal-only prepayments' without penalty. In financial securities law, FINRA and SEC regulations strictly govern whether broker-dealers act in an 'agency capacity' (matching buyers and sellers for a commission) or a 'principal capacity' (trading from their own inventory for a markup)."
        },
        "examples": {
            "daily": [
                "By applying her annual employment bonus directly toward her mortgage principal, Elena cut five years off her thirty-year loan term.",
                "The monthly student loan billing statement breaks down each payment into accrued interest, loan fees, and remaining principal balance.",
                "A fixed-rate certificate of deposit offers risk-averse savers complete peace of mind because the initial principal is federally insured against market losses."
            ],
            "business": [
                "Under the covenants of the revolving credit facility, the corporate borrower must begin amortizing the loan principal in equal semi-annual tranches starting in the third fiscal year.",
                "When the five-year corporate bonds matured yesterday, the treasury department wired eighty million dollars to clear the outstanding principal owed to institutional bondholders.",
                "The syndicated lending syndicate agreed to restructure the commercial real estate financing by deferring principal repayments for eighteen months while keeping interest obligations current."
            ],
            "conversation": [
                "\"Why has our outstanding loan balance barely budged after twelve monthly payments?\" — \"During the first year of an amortized commercial loan, almost ninety percent of your monthly installment covers accrued interest rather than principal reduction.\"",
                "\"Did the investment bank execute this foreign exchange trade as an agent or as a principal?\" — \"They acted as a principal, executing the transaction directly against their proprietary trading desk and charging a small spread.\"",
                "\"Can we make an extra lump-sum payment toward the loan principal without incurring an early prepayment penalty?\" — \"Yes, our commercial loan covenant allows penalty-free principal curtailments of up to fifteen percent per fiscal year.\""
            ],
            "collocations": [
                "principal and interest",
                "principal balance",
                "repay / pay down the principal",
                "loan principal",
                "principal repayment",
                "original principal"
            ]
        },
        "wordFamily": {
            "noun": "principal, principality",
            "verb": "",
            "adjective": "principal",
            "adverb": "principally"
        },
        "visual": {
            "imageKeyword": "loan amortization schedule mortgage principal interest breakdown corporate finance spreadsheet",
            "imageDescription": "A high-resolution financial spreadsheet on a corporate laptop displaying a loan amortization schedule with highlighted columns showing monthly payment breakdown between 'Principal Reduction' and 'Interest Paid', next to an approved loan agreement and a pen.",
            "mnemonic": "Remember: The PRINCI-PAL is your 'PAL' who lent you the original CAPITAL sum! A princi-PLE is a fundamental moral ru-LE."
        },
        "video": {
            "description": "A commercial banking training video demonstrating the mechanics of amortized debt, explaining how monthly installments gradually shift from interest payments to principal reduction and how extra principal prepayments significantly reduce total lifetime interest."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                7
            ],
            "exampleQuestion": "To reduce total borrowing costs over the life of the commercial mortgage, the board voted to apply surplus operating cash directly toward the loan's _______ balance.\n(A) principal\n(B) principle\n(C) principally\n(D) principled",
            "tips": "In TOEIC Part 5, test writers frequently test the classic homophone trap between 'principal' and 'principle'. When modifying 'balance' in a debt, loan, or investment context, the correct word is the noun adjunct 'principal' (A), referring to the original borrowed sum. Choice (B) 'principle' is a noun meaning a fundamental moral doctrine, belief, or scientific law and cannot modify financial debt balances. Choice (C) 'principally' is an adverb, and choice (D) 'principled' is an adjective meaning possessing high ethical morals."
        },
        "synonyms": [
            "capital sum",
            "original investment",
            "loan balance",
            "face value",
            "par value",
            "primary capital"
        ],
        "antonyms": [
            "interest",
            "accrued interest",
            "dividend",
            "finance charge",
            "penalty fee"
        ],
        "relatedWords": [
            "amortization",
            "interest rate",
            "maturity date",
            "debt service",
            "prepayment penalty",
            "promissory note",
            "par value"
        ]
    },
    {
        "id": "finance-226",
        "word": "privatization",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "advanced",
        "toeicFrequency": 7,
        "pronunciation": {
            "ipa": "/ˌpraɪ.və.t̬əˈzeɪ.ʃən/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/privatization--_us_1.mp3",
            "syllableBreakdown": "pri-va-ti-za-tion",
            "stressPattern": "Primary stress on the fourth syllable, secondary stress on the first: PRI-va-ti-ZA-tion (/ˌpraɪ.və.t̬əˈzeɪ.ʃən/, ˌ○○●○)",
            "commonMistakes": "Learners frequently misplace the primary stress onto the third syllable (*pri-VAT-i-za-tion* or *pri-va-TI-za-tion*) instead of the penultimate fourth syllable: /ˌpraɪ.və.t̬əˈzeɪ.ʃən/. British English speakers pronounce the fourth syllable with an unreduced diphthong: /ˌpraɪ.və.taɪˈzeɪ.ʃən/. Conceptually, learners often confuse 'privatization' (transferring government-owned assets, public utilities, or state enterprises into private commercial ownership) with 'going private' / 'a take-private buyout' (when a publicly listed corporation's shares are bought by private equity investors and delisted from the stock exchange). Note also the spelling difference: American English uses '-ization', whereas British and Commonwealth English typically write '-isation'."
        },
        "etymology": {
            "origin": "Formed from private (from Latin privatus, 'withdrawn from public life, set apart, belonging to an individual', past participle of privare 'to deprive, separate, release') + verb suffix -ize + nominal suffix -ation",
            "rootWord": "privatus (set apart, belonging to an individual, personal, not public)",
            "rootMeaning": "'The process of making private or transferring from public/state ownership to private control'",
            "evolution": "Stemming from Latin 'privatus' (belonging to an individual as opposed to the state), the adjective 'private' entered English via Old French in the late 14th century. The noun 'privatization' emerged in economic scholarship during the late 1930s (first recorded in 1936-1938 translating German economic writings on the sale of state-owned railway and banking shares). The term achieved worldwide geopolitical and economic prominence in the late 1970s and 1980s under British Prime Minister Margaret Thatcher and the Reagan administration, when governments dismantled state monopolies (such as British Telecom, British Gas, and regional water boards) by floating shares to retail and institutional investors. In modern corporate finance and public policy, privatization encompasses full asset divestitures, commercial concessions, and public-private partnerships (PPPs) across transportation, energy, and municipal infrastructure.",
            "relatedLanguages": [
                "French: privatisation (transfer of state assets to the private sector)",
                "Spanish: privatización (privatization of public enterprises or services)",
                "Italian: privatizzazione (denationalization, privatization)",
                "German: Privatisierung (privatization of state-owned companies)",
                "Portuguese: privatização (privatization)"
            ],
            "firstRecordedUse": "Late 1930s (circa 1936-1938 in economic monographs on state divestment); universally adopted in international finance during the 1980s"
        },
        "deepMeaning": {
            "coreConcept": "The legal and economic process of transferring the ownership, operational management, or service delivery of state-owned enterprises, public utilities, infrastructure networks, or government agencies from the public sector to private sector corporations, institutional investors, or public shareholders, through initial public offerings (IPOs), trade sales, long-term concession leases, or public-private partnerships.",
            "spatialContext": "Government treasury ministries, legislative committee hearing chambers, investment bank advisory suites, infrastructure consortium boardrooms, and privatized utility operations control centers.",
            "temporalContext": "Spans multi-year political and regulatory review phases; bidding auctions and share flotation rounds typically take 12 to 36 months to complete; concession agreements often run for 20 to 50 years.",
            "emotionalTone": "Transformative, politically charged, strategic, and market-driven; associated with capital injection and operational modernization, but often scrutinized regarding tariffs, public accountability, and employment levels.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "To native speakers, 'privatization' signals a major structural shift in how society operates a vital public resource—like passenger rail, water systems, telecom networks, or airports. Economically, business-minded natives associate privatization with free-market discipline: cutting bureaucratic waste, attracting private equity capital, upgrading obsolete technology, and fostering competitive consumer choice. Conversely, civic advocates scrutinize privatization for potential fare increases, workforce cuts, and the loss of direct democratic oversight. In corporate and financial reporting, natives instinctively analyze the deal structure: Is it a 100% equity sale, a minority stake listing, or a long-term lease concession?",
            "mentalImage": "A formal government press briefing where the minister of infrastructure and a multinational consortium chairman sign a multi-billion-dollar concession deed to privatize the national cargo port, displayed alongside digital renderings of automated container cranes and expanded maritime berths.",
            "whenToUse": "Use when describing the sale, divestment, or concession of government assets, public utilities, state transport networks, or municipal services to private corporations or equity investors (e.g., 'the privatization of the national airline', 'partial privatization of the state energy grid', 'opponents of healthcare privatization').",
            "whenNotToUse": "Do not use 'privatization' to describe a public corporation buying back its shares to delist from the stock market (that is 'going private' or a 'leveraged buyout/take-private transaction'). Do not use it for internal confidentiality policies or non-disclosure agreements.",
            "culturalContext": "In Anglo-American economic history, privatization defined the late-20th-century economic shift toward market deregulation. In TOEIC reading passages (Articles, Reports, and Memos in Part 7), privatization frequently appears in articles discussing municipal infrastructure upgrades, public transit overhauls, toll road concessions, and public-private consortia bidding on airport modernizations."
        },
        "examples": {
            "daily": [
                "Commuter advocacy groups voiced strong concerns regarding the proposed privatization of the suburban commuter rail line, citing potential fare increases.",
                "Following the privatization of the municipal waste management service, homeowners received automated recycling bins and a digital pickup schedule.",
                "The city council held an open town hall meeting to debate whether the privatization of the downtown parking facilities would benefit taxpayers in the long run."
            ],
            "business": [
                "A consortium of international pension funds submitted a winning five-billion-dollar bid for the complete privatization of the state-owned toll highway network.",
                "The ministry of finance published a comprehensive white paper detailing the regulatory requirements that will precede the privatization of the national telecommunications provider.",
                "Leading global investment banks were hired to structure and underwrite the multi-tranche share flotation for the energy utility's phased privatization."
            ],
            "conversation": [
                "\"Has the transport ministry finalized the privatization plan for the regional cargo airports?\" — \"Not yet; parliamentary committee members are still reviewing safeguards to ensure safety standards and landing slot access remain strictly regulated.\"",
                "\"Why did the municipality decide to pursue the privatization of its water treatment facilities?\" — \"The city lacked the capital reserves needed for EPA-mandated pipe replacements, so a private water management firm agreed to fund two hundred million dollars in capital upgrades in exchange for a twenty-five-year concession.\"",
                "\"Will union employees retain their seniority and pension benefits once the privatization transaction closes?\" — \"Yes, the divestiture covenants legally require the purchasing consortium to honor all existing collective bargaining agreements for at least five years.\""
            ],
            "collocations": [
                "complete / partial privatization",
                "privatization of state assets",
                "privatization program / plan",
                "oppose / support privatization",
                "privatization proceeds",
                "privatization initiative"
            ]
        },
        "wordFamily": {
            "noun": "privatization, privacy, private",
            "verb": "privatize",
            "adjective": "private, privatized",
            "adverb": "privately"
        },
        "visual": {
            "imageKeyword": "infrastructure privatization public private partnership contract signing corporate finance",
            "imageDescription": "Government officials and private infrastructure executives gathered around a dark mahogany boardroom table signing official asset transfer deeds, with scale models of a modernized international airport terminal visible in the foreground.",
            "mnemonic": "PRIVATIZATION turns PUBLIC administration into PRIVATE operations: PUBLIC -> PRIVATE-ization!"
        },
        "video": {
            "description": "An economic documentary case study on the privatization of European municipal water utilities and rail systems, demonstrating the financial bidding mechanisms, concession agreements, infrastructure investment results, and post-sale regulatory monitoring."
        },
        "toeicContext": {
            "commonParts": [
                5,
                6,
                7
            ],
            "exampleQuestion": "Financial analysts anticipate that the upcoming _______ of the state-owned postal and courier service will stimulate market competition and enhance operational efficiency.\n(A) privatize\n(B) privatized\n(C) privatization\n(D) privately",
            "tips": "In TOEIC Part 5 grammar questions, suffix discrimination among derivative forms of a word is very common. In this sentence, the blank is preceded by the definite article 'the' and the adjective modifier 'upcoming', and followed by the prepositional phrase 'of the state-owned postal and courier service', functioning as the subject of the clause ('... will stimulate'). The position strictly requires a noun. Choice (C) 'privatization' is the noun form. Choice (A) 'privatize' is a verb; choice (B) 'privatized' is a past participle/adjective; and choice (D) 'privately' is an adverb."
        },
        "synonyms": [
            "denationalization",
            "commercialization",
            "deregulation",
            "asset divestiture",
            "public divestment",
            "private sector transfer"
        ],
        "antonyms": [
            "nationalization",
            "municipalization",
            "state ownership",
            "public ownership",
            "socialization"
        ],
        "relatedWords": [
            "privatize",
            "state-owned enterprise",
            "public-private partnership",
            "concession agreement",
            "divestiture",
            "deregulation",
            "tender offer"
        ]
    },
    {
        "id": "finance-227",
        "word": "procurement",
        "partOfSpeech": [
            "noun"
        ],
        "category": "finance",
        "level": "advanced",
        "toeicFrequency": 7,
        "pronunciation": {
            "ipa": "/prəˈkjʊr.mənt/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/procurement--_us_1.mp3",
            "syllableBreakdown": "pro-cure-ment",
            "stressPattern": "Primary stress on the second syllable: pro-CURE-ment (/prəˈkjʊr.mənt/, ○●○)",
            "commonMistakes": "Learners frequently misplace primary stress on the initial syllable (*PRO-cure-ment*) instead of the second syllable: /prəˈkjʊr.mənt/. Non-native speakers also frequently omit the palatal glide /j/ before the vowel, pronouncing the second syllable as /kʊr/ or /kɜːr/ rather than /kjʊr/. In corporate and exam contexts, candidates often mistakenly treat 'procurement' as an exact synonym for simple 'purchasing' or 'buying'. While purchasing is transactional (placing a purchase order, paying invoices), 'procurement' is an overarching strategic lifecycle encompassing supplier discovery, request for proposals (RFPs), competitive vendor evaluation, contract negotiation, compliance auditing, and supply chain risk mitigation."
        },
        "etymology": {
            "origin": "Anglo-Norman procurement and Old French procurement ('management, care, acquisition, obtaining'), from procurer ('to obtain, manage, take care of'), from Classical Latin procurare ('to manage, administer, care for as an agent'), compounded from pro- ('on behalf of, for') + curare ('to care for, attend to', from cura 'care, diligence')",
            "rootWord": "procurare (pro 'on behalf of' + curare 'to take care of')",
            "rootMeaning": "'Taking care of on behalf of another; administering, obtaining, or managing resources with diligence'",
            "evolution": "Stemming from Latin 'procurare' (to manage, care for, or act as an agent), the noun passed through Anglo-Norman legal administrative usage into Middle English during the early 14th century (circa 1300), originally referring to the act of bringing about an event, managing legal affairs, or securing property through an appointed representative ('procurator' or 'proctor'). In the 19th and early 20th centuries, military logistics and government ministries adopted 'procurement' to specify the formal system of requisitioning, inspecting, and purchasing munitions, uniforms, and provisions. During the late 20th century, modern enterprise resource planning (ERP) systems elevated 'procurement' into a core strategic discipline within multinational corporations, governing global supply chains, competitive vendor bidding, vendor lifecycle management, and enterprise spend analytics.",
            "relatedLanguages": [
                "French: approvisionnement (procurement, sourcing), procuration (proxy, power of attorney)",
                "Spanish: aprovisionamiento / procura (procurement, supply acquisition), procuración (administration, legal proxy)",
                "Italian: approvvigionamento (procurement, supply acquisition), procuramento (procurement)",
                "German: Beschaffungswesen / Beschaffung (procurement, purchasing logistics)",
                "Portuguese: aprovisionamento / compras estratégicas (procurement, strategic sourcing)"
            ],
            "firstRecordedUse": "Early 14th century (circa 1300 in English legal and governance texts for 'the act of managing or obtaining'); early-to-mid 20th century in formal military and corporate supply management"
        },
        "deepMeaning": {
            "coreConcept": "The systematic, strategic business and governmental discipline of discovering, vetting, negotiating, purchasing, and managing the acquisition of raw materials, manufactured goods, capital equipment, professional services, or construction works from external vendors; encompassing the entire lifecycle from demand forecasting and requests for proposals (RFPs) to competitive bidding, contract administration, quality control, and vendor performance monitoring.",
            "spatialContext": "Enterprise procurement departments, corporate supply chain operations centers, cloud e-procurement dashboards (e.g., SAP Ariba, Coupa), government contracting tender offices, and supplier negotiation boardrooms.",
            "temporalContext": "Conducted continuously throughout quarterly operating budgets; major capital expenditure (CapEx) and defense procurement contracts follow multi-month competitive RFP cycles and multi-year delivery timelines.",
            "emotionalTone": "Strategic, meticulous, vigilant, fiscally disciplined, and compliance-focused; balances cost reduction against quality assurance, regulatory integrity, and supply security.",
            "formalityLevel": "formal",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "To native professionals, 'procurement' is the corporate gatekeeper of expenditures and external supplier relationships. When someone says, 'This purchase has to go through procurement,' natives know it cannot simply be bought on a company credit card; it requires three competitive vendor bids, a formal purchase requisition, a master services agreement (MSA), vendor insurance verification, and legal sign-off. Native speakers associate procurement with cost efficiency, ethical compliance (preventing kickbacks and conflicts of interest), supplier diversity, and supply chain risk management. In public sector discourse, 'defense procurement' or 'municipal procurement' highlights accountability for taxpayer dollars.",
            "mentalImage": "A corporate procurement director seated before a dual-screen workstation running enterprise sourcing software, comparing three detailed supplier tender bids across pricing matrices, delivery lead times, ESG certifications, and liability terms before awarding a supply contract.",
            "whenToUse": "Use when referring to formal corporate, institutional, or government purchasing systems, strategic vendor sourcing, supply chain contracting, and requisition policies (e.g., 'procurement department', 'procurement guidelines', 'defense procurement', 'streamline corporate procurement', 'public procurement process').",
            "whenNotToUse": "Do not use 'procurement' for informal personal shopping, everyday grocery buying, or simple retail consumer transactions (do not say 'my weekend grocery procurement'). Do not confuse with routine accounts payable invoicing or internal inventory stocking.",
            "culturalContext": "In modern corporate governance, chief procurement officers (CPOs) hold executive seats, focusing on ethical sourcing, reducing carbon footprints in supply chains, and preventing vendor disruptions. In the TOEIC exam, procurement is a staple topic in Part 3 conversations (dealing with late equipment shipments, vendor price renegotiations) and Part 7 reading passages (requests for bids, purchase order memos, commercial supply contracts)."
        },
        "examples": {
            "daily": [
                "The school district updated its procurement policy to ensure that all cafeteria dairy products are sourced from local family farms.",
                "Before ordering customized ergonomic chairs for the new office floor, Marcus submitted a purchase requisition through the digital procurement portal.",
                "An unforeseen delay in the procurement of imported architectural glass postponed the completion of the civic library by six weeks."
            ],
            "business": [
                "To reduce supply chain overhead by twelve percent, the automotive manufacturer consolidated its global procurement operations under a single enterprise software platform.",
                "The vice president of procurement negotiated a five-year master supply agreement that secured guaranteed raw material volumes and stabilized pricing against market volatility.",
                "All vendor proposals for the airport expansion project must adhere strictly to federal government procurement guidelines regarding fair competition and quality standards."
            ],
            "conversation": [
                "\"Has our procurement department approved the contract for the new cybersecurity vendor?\" — \"They are conducting the final compliance and data privacy review this afternoon, so the signed agreement should be ready by tomorrow morning.\"",
                "\"Why can't our marketing department hire that creative agency directly?\" — \"Any corporate consulting agreement valued at over twenty-five thousand dollars must undergo competitive bidding through procurement to ensure market-rate pricing.\"",
                "\"How did your team manage to lower shipping expenditures by eight percent this quarter?\" — \"Our procurement specialists renegotiated our freight carrier contracts by consolidating our global shipping volume under two primary logistics providers.\""
            ],
            "collocations": [
                "procurement department / division",
                "procurement process / procedures",
                "procurement guidelines / policy",
                "public / defense procurement",
                "strategic procurement",
                "procurement specialist / manager"
            ]
        },
        "wordFamily": {
            "noun": "procurement, procurer, procurator",
            "verb": "procure",
            "adjective": "procurable",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "corporate procurement manager supplier contract review supply chain office",
            "imageDescription": "A procurement manager at a sleek corporate desk reviewing a detailed vendor bid evaluation spreadsheet on a monitor while highlighting clauses in a printed commercial supply contract, with sample manufactured components nearby.",
            "mnemonic": "PROCUREMENT: PRO (in advance) + CURE (take care of) = Taking care of company needs in advance through strategic sourcing and contracting!"
        },
        "video": {
            "description": "A corporate supply chain case study demonstrating how a multinational retailer transformed its procurement department, replacing fragmented paper purchasing with automated e-procurement software and competitive reverse auctions."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                7
            ],
            "exampleQuestion": "To ensure competitive pricing and regulatory compliance, all capital equipment purchases exceeding fifty thousand dollars must be reviewed by the central _______ division.\n(A) procure\n(B) procurement\n(C) procurable\n(D) procuring",
            "tips": "In TOEIC Part 5, test candidates frequently encounter questions testing compound nouns that name corporate divisions and departments (e.g., 'procurement division', 'human resources department', 'accounting office'). In this sentence, the blank directly precedes the head noun 'division'. The noun 'procurement' (B) acts as a noun adjunct to identify the specific corporate division responsible for strategic purchasing. Choice (A) 'procure' is a verb; choice (C) 'procurable' is an adjective; and choice (D) 'procuring' is a present participle/gerund, which does not form the standard organizational title."
        },
        "synonyms": [
            "strategic sourcing",
            "purchasing",
            "acquisition",
            "commercial buying",
            "supplier contracting",
            "materials acquisition"
        ],
        "antonyms": [
            "divestment",
            "disposal",
            "sale",
            "liquidation",
            "distribution",
            "divestiture"
        ],
        "relatedWords": [
            "procure",
            "request for proposal (RFP)",
            "vendor vetting",
            "supply chain logistics",
            "purchase requisition",
            "competitive bidding",
            "contract negotiation"
        ]
    }
]

with open("scratch/finance_225_227.json", "w", encoding="utf-8") as f:
    json.dump({"words": words}, f, indent=2, ensure_ascii=False)

print("Saved scratch/finance_225_227.json successfully!")
