import json
import jsonschema

SCHEMA = {
    "type": "object",
    "properties": {
        "words": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {"type": "string"},
                    "word": {"type": "string"},
                    "partOfSpeech": {"type": "array", "items": {"type": "string"}},
                    "category": {"type": "string"},
                    "level": {"type": "string", "enum": ["essential", "intermediate", "advanced"]},
                    "toeicFrequency": {"type": "number"},
                    "pronunciation": {
                        "type": "object",
                        "properties": {
                            "ipa": {"type": "string"},
                            "audioUrl": {"type": "string"},
                            "syllableBreakdown": {"type": "string"},
                            "stressPattern": {"type": "string"},
                            "commonMistakes": {"type": "string"}
                        },
                        "required": ["ipa", "syllableBreakdown", "stressPattern", "commonMistakes"]
                    },
                    "etymology": {
                        "type": "object",
                        "properties": {
                            "origin": {"type": "string"},
                            "rootWord": {"type": "string"},
                            "rootMeaning": {"type": "string"},
                            "evolution": {"type": "string"},
                            "relatedLanguages": {"type": "array", "items": {"type": "string"}},
                            "firstRecordedUse": {"type": "string"}
                        },
                        "required": ["origin", "rootWord", "rootMeaning", "evolution", "relatedLanguages", "firstRecordedUse"]
                    },
                    "deepMeaning": {
                        "type": "object",
                        "properties": {
                            "coreConcept": {"type": "string"},
                            "spatialContext": {"type": "string"},
                            "temporalContext": {"type": "string"},
                            "emotionalTone": {"type": "string"},
                            "formalityLevel": {"type": "string", "enum": ["formal", "neutral", "informal"]},
                            "connotation": {"type": "string", "enum": ["positive", "neutral", "negative"]}
                        },
                        "required": ["coreConcept", "spatialContext", "temporalContext", "emotionalTone", "formalityLevel", "connotation"]
                    },
                    "nativeMindset": {
                        "type": "object",
                        "properties": {
                            "howNativesThink": {"type": "string"},
                            "mentalImage": {"type": "string"},
                            "whenToUse": {"type": "string"},
                            "whenNotToUse": {"type": "string"},
                            "culturalContext": {"type": "string"}
                        },
                        "required": ["howNativesThink", "mentalImage", "whenToUse", "whenNotToUse", "culturalContext"]
                    },
                    "examples": {
                        "type": "object",
                        "properties": {
                            "daily": {"type": "array", "items": {"type": "string"}},
                            "business": {"type": "array", "items": {"type": "string"}},
                            "conversation": {"type": "array", "items": {"type": "string"}},
                            "collocations": {"type": "array", "items": {"type": "string"}}
                        },
                        "required": ["daily", "business", "conversation", "collocations"]
                    },
                    "wordFamily": {
                        "type": "object",
                        "properties": {
                            "noun": {"type": "string"},
                            "verb": {"type": "string"},
                            "adjective": {"type": "string"},
                            "adverb": {"type": "string"}
                        }
                    },
                    "visual": {
                        "type": "object",
                        "properties": {
                            "imageKeyword": {"type": "string"},
                            "imageDescription": {"type": "string"},
                            "mnemonic": {"type": "string"}
                        },
                        "required": ["imageKeyword", "imageDescription", "mnemonic"]
                    },
                    "video": {
                        "type": "object",
                        "properties": {
                            "description": {"type": "string"}
                        },
                        "required": ["description"]
                    },
                    "toeicContext": {
                        "type": "object",
                        "properties": {
                            "commonParts": {"type": "array", "items": {"type": "number"}},
                            "exampleQuestion": {"type": "string"},
                            "tips": {"type": "string"}
                        },
                        "required": ["commonParts", "exampleQuestion", "tips"]
                    },
                    "synonyms": {"type": "array", "items": {"type": "string"}},
                    "antonyms": {"type": "array", "items": {"type": "string"}},
                    "relatedWords": {"type": "array", "items": {"type": "string"}}
                },
                "required": [
                    "id", "word", "partOfSpeech", "category", "level", "toeicFrequency",
                    "pronunciation", "etymology", "deepMeaning", "nativeMindset",
                    "examples", "wordFamily", "visual", "video", "toeicContext",
                    "synonyms", "antonyms", "relatedWords"
                ]
            }
        }
    },
    "required": ["words"]
}

words_data = {
  "words": [
    {
      "id": "comms-151",
      "word": "intranet",
      "partOfSpeech": [
        "noun"
      ],
      "category": "communications",
      "level": "intermediate",
      "toeicFrequency": 8,
      "pronunciation": {
        "ipa": "/ˈɪn.trə.nɛt/",
        "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/intranet--_us_1.mp3",
        "syllableBreakdown": "in-tra-net",
        "stressPattern": "primary stress on the first syllable (IN-tra-net)",
        "commonMistakes": "Learners frequently confuse 'intranet' with 'internet', mispronouncing the prefix as 'inter-' (/ˈɪn.tɚ-/) rather than 'intra-' (/ˈɪn.trə-/). This obscures the critical phonemic distinction differentiating a private internal network from the public worldwide web. Others place undue stress on the final syllable (*in-tra-NET*) or substitute a lax /ɪ/ for the /ɛ/ vowel in '-net'."
      },
      "etymology": {
        "origin": "Modern computing compound formed in the early 1990s from the Latin prefix 'intra-' (meaning within, inside, on the inside) and the English noun 'network' (derived from Old English 'net' + 'weorc').",
        "rootWord": "Latin 'intra' (within, inside) + English 'network'",
        "rootMeaning": "'A network operating strictly within' — denoting a private, firewalled digital communication system restricted exclusively to authenticated internal members of an organization.",
        "evolution": "First documented in telecommunications and computer trade journals circa 1994–1995 as enterprises began deploying World Wide Web protocols (HTTP, HTML, web browsers) across internal Local Area Networks (LANs). By the late 1990s, 'intranet' became the standard term across corporate IT and internal communications for company-wide portals hosting employee directories, policy manuals, benefits forms, and executive memos.",
        "relatedLanguages": [
          "French: intranet",
          "Spanish: intranet",
          "German: Intranet",
          "Italian: intranet"
        ],
        "firstRecordedUse": "Circa 1994 (in computer networking publications such as Network World and Digital News & Review)"
      },
      "deepMeaning": {
        "coreConcept": "A private, secure computer network accessible exclusively to an organization's authorized staff, utilized for sharing internal news, operational resources, human resources tools, and collaborative workflows behind a protective firewall.",
        "spatialContext": "Corporate computer terminals, secure virtual private network (VPN) connections, remote workstations, IT server rooms, and administrative web portals.",
        "temporalContext": "Accessed continuously during daily office hours for time logging, shift handovers, quarterly benefits enrollments, and immediate company policy announcements.",
        "emotionalTone": "Institutional, secure, practical, and collaborative.",
        "formalityLevel": "formal",
        "connotation": "neutral"
      },
      "nativeMindset": {
        "howNativesThink": "Native English speakers view the 'intranet' as the corporate hub and digital town square of an organization. When employees are told 'it's on the intranet', they immediately think of platforms like Microsoft SharePoint, Confluence, or internal portals where time-off requests are logged, expense reports submitted, and company announcements read. It is distinctly contrasted with the 'internet' (public-facing) and 'extranet' (shared with authorized outside partners).",
        "mentalImage": "An employee sitting at a workstation with two monitors, opening a web browser to an internal dashboard displaying company news, a quick-access link to vacation balances, cafeteria menus, and an IT support ticket portal.",
        "whenToUse": "Use when referring to an organization's private, authenticated internal website, knowledge base, or internal communications portal (e.g., 'download the form from the intranet', 'posted on the staff intranet').",
        "whenNotToUse": "Do not use for the public, globally accessible World Wide Web (use 'internet'), nor for an external vendor-accessible portal (use 'extranet'), nor for a physical local network cable (use 'Ethernet cable' or 'LAN').",
        "culturalContext": "In corporate culture across the English-speaking world, the intranet is fundamental to internal branding, employee engagement, and regulatory compliance. TOEIC reading and listening passages regularly feature company memos directing staff to access revised policies, training modules, or holiday schedules via the company intranet."
      },
      "examples": {
        "daily": [
          "I logged into the staff intranet this morning to submit my annual leave request for next month.",
          "New employees are encouraged to explore the company intranet to review safety guidelines and benefits options.",
          "The office manager posted the updated floor plan and parking guidelines on the intranet bulletin board."
        ],
        "business": [
          "The chief information officer announced a scheduled weekend outage to migrate the corporate intranet to a cloud-based server.",
          "Confidential salary bands and internal promotion opportunities are accessible solely through the encrypted corporate intranet.",
          "Internal communications overhauled the company intranet to improve cross-departmental project collaboration and document management."
        ],
        "conversation": [
          "\"Where can I find the reimbursement forms for last week's client dinner?\" \"They're archived under the Finance tab on the employee intranet.\"",
          "\"Why won't the company intranet load on my home computer?\" \"You need to log into the corporate VPN first to pass the security firewall.\""
        ],
        "collocations": [
          "company intranet",
          "corporate intranet",
          "employee intranet",
          "intranet portal",
          "access the intranet",
          "post on the intranet"
        ]
      },
      "wordFamily": {
        "noun": "intranet",
        "verb": "",
        "adjective": "intranet",
        "adverb": ""
      },
      "visual": {
        "imageKeyword": "corporate intranet portal screen employee dashboard office login",
        "imageDescription": "A clean laptop screen displaying a modern enterprise intranet dashboard with widgets for company announcements, departmental directory, employee shift calendar, and quick-link icons.",
        "mnemonic": "INTRA means 'within' (like intravenous): An INTRAnet stays WITHIN the company walls, safe behind the firewall, unlike the INTERnet which connects between the whole wide world!"
      },
      "video": {
        "description": "A corporate IT orientation tutorial demonstrating how newly hired employees navigate the internal intranet portal to access HR forms, update profiles, and submit IT support tickets."
      },
      "toeicContext": {
        "commonParts": [
          3,
          4,
          7
        ],
        "exampleQuestion": "Detailed guidelines regarding the revised telecommuting policy have been posted on the employee _____ for staff review.\n(A) intranet\n(B) internet\n(C) interact\n(D) intersection",
        "tips": "In TOEIC Part 7 and Part 5, ETS tests workplace terminology regarding internal digital infrastructure. The noun adjunct 'employee' before the blank indicates an internal network exclusively for company personnel: (A) 'intranet'. Choice (B) 'internet' refers to the public worldwide network; Choice (C) 'interact' is a verb; and Choice (D) 'intersection' refers to physical traffic road junctions."
      },
      "synonyms": [
        "internal network",
        "private network",
        "corporate portal",
        "internal website",
        "enterprise portal",
        "employee portal"
      ],
      "antonyms": [
        "internet",
        "extranet",
        "public network"
      ],
      "relatedWords": [
        "firewall",
        "VPN",
        "portal",
        "LAN",
        "bandwidth",
        "cybersecurity",
        "server"
      ]
    },
    {
      "id": "comms-152",
      "word": "investigative",
      "partOfSpeech": [
        "adjective"
      ],
      "category": "communications",
      "level": "advanced",
      "toeicFrequency": 7,
      "pronunciation": {
        "ipa": "/ɪnˈvɛs.tɪ.ɡə.tɪv/",
        "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/investigative--_us_1.mp3",
        "syllableBreakdown": "in-ves-ti-ga-tive",
        "stressPattern": "primary stress on the second syllable (in-VES-ti-ga-tive)",
        "commonMistakes": "Learners frequently misplace stress onto the first syllable (*IN-ves-ti-ga-tive*) or the fourth syllable (*in-ves-ti-GA-tive*). Non-native speakers also tend to over-enunciate the unstressed vowels with full vowel values instead of reducing them to schwas (/ə/) or /ɪ/."
      },
      "etymology": {
        "origin": "Formed in late 18th-century English from the verb 'investigate', which derives from Latin 'investigare' (to track, search out, investigate) + adjectival suffix '-ive'.",
        "rootWord": "Latin 'investigare' (from 'in-' meaning into + 'vestigium' meaning footprint, track, trace)",
        "rootMeaning": "'Tracking footprints or following a trail' — originally describing hunting hounds following scent trails, later applied to tracking factual evidence.",
        "evolution": "In Classical Latin, 'investigare' specifically meant tracking footsteps ('vestigia'). By the 16th century, it was adopted into English for intellectual, judicial, and scientific inquiry. The adjectival form 'investigative' emerged in late 18th-century parliamentary inquiries and legal reports. In the 20th century, particularly following the Watergate era, 'investigative journalism' became a distinct media discipline recognized worldwide for uncovering corporate malpractice and governmental corruption.",
        "relatedLanguages": [
          "French: investigatif",
          "Spanish: investigativo",
          "Italian: investigativo",
          "German: investigativ"
        ],
        "firstRecordedUse": "Circa 1785–1790 (in British parliamentary reports and legal commentary)"
      },
      "deepMeaning": {
        "coreConcept": "Characterized by or intended for systematic, in-depth inquiry, examination, and fact-finding to uncover concealed information, establish accountability, or expose wrongdoing.",
        "spatialContext": "Newsroom investigative desks, corporate compliance audit suites, regulatory agency hearing rooms, and forensic accounting offices.",
        "temporalContext": "Spans multi-month deep-dive reporting cycles, post-incident corporate compliance inquiries, or annual governance audit reviews.",
        "emotionalTone": "Inquisitive, rigorous, analytical, skeptical, and objective.",
        "formalityLevel": "formal",
        "connotation": "neutral"
      },
      "nativeMindset": {
        "howNativesThink": "Native speakers associate 'investigative' primarily with deep-dive journalism ('investigative reporter/journalism') or formal corporate and legal inquiries ('investigative committee/panel'). The word carries the connotation of unyielding thoroughness, going far beyond superficial press releases to unearth underlying facts. In business, an 'investigative audit' conveys serious scrutiny triggered by compliance red flags or whistleblower disclosures.",
        "mentalImage": "An investigative reporter in a bustling newsroom examining printed financial balance sheets, highlighting discrepancies with a marker, with a whiteboard mapping key figures and transaction dates in the background.",
        "whenToUse": "Use when describing journalistic work, research methods, committees, or audits dedicated to deep fact-finding, evidence collection, and uncovering hidden realities (e.g., 'investigative reporting', 'investigative committee').",
        "whenNotToUse": "Do not use to describe routine, surface-level administrative checks or passive data collection (use 'routine', 'preliminary', or 'cursory'). Do not confuse with 'investigatory', which is primarily a specialized legal term for statutory powers (e.g., 'investigatory powers').",
        "culturalContext": "In Western media and corporate governance, investigative journalism is hailed as the watchdog of democracy and corporate accountability. In TOEIC passages, articles often profile award-winning investigative journalists or discuss investigative audits initiated to ensure corporate transparency."
      },
      "examples": {
        "daily": [
          "The newspaper's investigative team won a prestigious award for exposing the contamination of local drinking water.",
          "She has a sharp investigative mindset, always double-checking claims before accepting them as factual.",
          "A television documentary featuring investigative interviews with former manufacturing employees will air tonight."
        ],
        "business": [
          "Following allegations of accounting irregularities, the board of directors appointed an independent investigative committee.",
          "The senior investigative journalist requested an interview with the chief financial officer regarding offshore subsidiaries.",
          "Regulatory authorities launched an investigative review into the pharmaceutical company's clinical trial documentation."
        ],
        "conversation": [
          "\"Why is legal hiring external auditors?\" \"They're conducting an investigative inquiry into the vendor procurement discrepancies.\"",
          "\"Did you read that article about the supply chain scandal?\" \"Yes, the investigative reporter spent six months uncovering internal shipping records.\""
        ],
        "collocations": [
          "investigative journalism",
          "investigative reporter",
          "investigative committee",
          "investigative team",
          "investigative report",
          "investigative techniques"
        ]
      },
      "wordFamily": {
        "noun": "investigation, investigator",
        "verb": "investigate",
        "adjective": "investigative, investigatory",
        "adverb": "investigatively"
      },
      "visual": {
        "imageKeyword": "investigative journalism reporter documents magnifying glass whiteboard evidence",
        "imageDescription": "A professional journalist examining leaked financial spreadsheets and typed documents with a magnifying glass beside a detailed evidence board in a contemporary news office.",
        "mnemonic": "In-VESTIG-ative: Think of VESTIGE (a footprint or trace). An investigative reporter follows every vestige of evidence until the truth comes out!"
      },
      "video": {
        "description": "A documentary short examining the meticulous research, source verification, and legal vetting that an investigative journalism team performs before publishing a front-page financial exposé."
      },
      "toeicContext": {
        "commonParts": [
          5,
          6,
          7
        ],
        "exampleQuestion": "Due to his rigorous _____ reporting on environmental violations, Mr. Davies was awarded the National Press Club Citation for Excellence.\n(A) investigate\n(B) investigation\n(C) investigative\n(D) investigatively",
        "tips": "In TOEIC Part 5, ETS frequently tests adjective positioning before a noun. In the noun phrase 'his rigorous _____ reporting', the blank precedes the head noun/gerund 'reporting' and follows the coordinating adjective 'rigorous'. The established media collocation is (C) 'investigative' reporting. Choice (A) is a verb; Choice (B) is a noun, which creates an unidiomatic noun-noun cluster here; and Choice (D) is an adverb."
      },
      "synonyms": [
        "probing",
        "inquisitive",
        "fact-finding",
        "scrutinizing",
        "analytical",
        "exploratory"
      ],
      "antonyms": [
        "superficial",
        "cursory",
        "perfunctory",
        "unexamined"
      ],
      "relatedWords": [
        "journalism",
        "inquiry",
        "scrutiny",
        "audit",
        "whistleblower",
        "evidence",
        "findings"
      ]
    },
    {
      "id": "comms-153",
      "word": "investor relations",
      "partOfSpeech": [
        "noun"
      ],
      "category": "communications",
      "level": "advanced",
      "toeicFrequency": 7,
      "pronunciation": {
        "ipa": "/ɪnˈvɛs.tɚ rɪˈleɪ.ʃənz/",
        "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/investor_relations--_us_1.mp3",
        "syllableBreakdown": "in-ves-tor re-la-tions",
        "stressPattern": "primary stress on the second syllable of both words (in-VES-tor re-LA-tions)",
        "commonMistakes": "Learners often attempt to singularize the term as '*investor relation*', not realizing that like 'public relations' and 'human resources', 'relations' is inherently pluralized in institutional corporate titles. Others mispronounce '-tor' as /-tɔːr/ instead of a reduced rhotic schwa /-tɚ/, or misplace the stress in 'relations'."
      },
      "etymology": {
        "origin": "Modern American corporate communications compound established in the mid-20th century, combining 'investor' (from Latin 'investire', to clothe or surround) and 'relations' (from Latin 'relatio', a bringing back, report, connection).",
        "rootWord": "Latin 'investire' (to clothe/invest capital) + Latin 'relatio' (a report/connection)",
        "rootMeaning": "'The systematic reporting and communicative relationship maintained with capital investors' — bridging corporate leadership with capital markets.",
        "evolution": "Conceived in 1953 by Ralph Cordiner, CEO of General Electric, who created the first designated 'Investor Relations' department to communicate directly with shareowners. The discipline expanded rapidly following the enactment of stricter securities disclosure regulations (such as SEC Rule 10b-5 and later the Sarbanes-Oxley Act of 2002 and Regulation Fair Disclosure). It transformed from a basic PR function into a strategic executive department responsible for earnings calls, roadshows, annual reports, and investor conferences.",
        "relatedLanguages": [
          "French: relations avec les investisseurs",
          "Spanish: relaciones con inversores",
          "German: Investor Relations",
          "Italian: relazioni con gli investitori"
        ],
        "firstRecordedUse": "1953 (established at General Electric; formalized as an industry profession with the founding of the National Investor Relations Institute in 1969)"
      },
      "deepMeaning": {
        "coreConcept": "A strategic corporate management and communications department responsible for integrating finance, communication, and securities law compliance to manage two-way dialogue between a public company, its shareholders, and financial analysts.",
        "spatialContext": "Corporate headquarters executive boardrooms, stock exchange conference suites, investor relations web portals, webcast broadcasting studios, and financial roadshow venues.",
        "temporalContext": "Spikes sharply during quarterly earnings releases (Q1-Q4), annual general meetings (AGMs), analyst investor days, and initial public offerings (IPOs).",
        "emotionalTone": "Professional, transparent, authoritative, strategic, and reassuring.",
        "formalityLevel": "formal",
        "connotation": "neutral"
      },
      "nativeMindset": {
        "howNativesThink": "Native business professionals view 'investor relations' (commonly abbreviated as 'IR') as the company's financial voice and primary liaison with Wall Street. Unlike Public Relations (PR), which targets consumers and the general media, IR specifically communicates with institutional fund managers, equity research analysts, and shareholders who require financial data, forward guidance, and regulatory filings. On any public company's website, the 'Investor Relations' tab is the established location for downloading annual reports (Form 10-K) and accessing earnings conference webcasts.",
        "mentalImage": "An Investor Relations officer standing at a podium in a corporate auditorium, presenting quarterly revenue growth charts and EBITDA margin projections on a large display screen to financial analysts.",
        "whenToUse": "Use when referring to the corporate department, role, or strategic communication process dedicated to interacting with shareholders, investment analysts, and capital markets (e.g., 'contact the investor relations team', 'director of investor relations').",
        "whenNotToUse": "Do not confuse with 'public relations' (which focuses on brand image and general public perception), 'human resources' (internal employee matters), or 'customer support' (product users). Never singularize as '*investor relation*' when referring to the corporate function.",
        "culturalContext": "In Anglo-American capital markets, robust investor relations are critical for maintaining stock valuation, regulatory compliance, and market confidence. Securities regulations (such as Regulation Fair Disclosure) prohibit selective disclosure, making IR the vital gatekeeper ensuring simultaneous market disclosure. In TOEIC reading passages, corporate notices frequently direct shareholders and analysts to the investor relations office."
      },
      "examples": {
        "daily": [
          "Anyone interested in buying shares can visit the investor relations page on the company website to view annual earnings.",
          "I sent an inquiry to the firm's investor relations department to ask about dividend payment dates.",
          "The startup hired a consultant experienced in investor relations to help prepare their pitch deck for venture capital firms."
        ],
        "business": [
          "The head of investor relations prepared executive leadership for tough questions ahead of the quarterly earnings call.",
          "Our investor relations team coordinated a multi-city roadshow to introduce the company's growth strategy to institutional fund managers.",
          "Following the unexpected decline in share price, the CEO and the investor relations officer held an emergency briefing for key stakeholders."
        ],
        "conversation": [
          "\"Where can I download the presentation slides from yesterday's financial webcast?\" \"They're archived under the presentations section of the investor relations portal.\"",
          "\"Who handles calls from Wall Street equity analysts?\" \"All inquiries regarding quarterly guidance are routed directly to investor relations.\""
        ],
        "collocations": [
          "head of investor relations",
          "investor relations department",
          "investor relations team",
          "investor relations portal",
          "investor relations website",
          "investor relations officer"
        ]
      },
      "wordFamily": {
        "noun": "investor relations, investor",
        "verb": "invest",
        "adjective": "investor-related",
        "adverb": ""
      },
      "visual": {
        "imageKeyword": "investor relations presentation conference earnings call finance corporate shareholders",
        "imageDescription": "A senior corporate executive presenting financial earnings charts to an auditorium of institutional investors and analysts, with 'Investor Relations Forum' displayed on the stage banner.",
        "mnemonic": "INVESTOR + RELATIONS: It's the team that maintains smooth RELATIONS with the people who INVEST their money in the company!"
      },
      "video": {
        "description": "A corporate briefing video highlighting the role of an Investor Relations team during quarterly earnings season, from preparing press releases and SEC filings to hosting live shareholder webcasts."
      },
      "toeicContext": {
        "commonParts": [
          3,
          4,
          7
        ],
        "exampleQuestion": "For copies of the audited annual financial report, please submit an inquiry to the _____ relations department.\n(A) investing\n(B) investor\n(C) investment\n(D) invest",
        "tips": "TOEIC Part 5 tests compound nouns denoting corporate divisions. The established business compound is 'investor relations' (the corporate department that communicates with shareholders). Choice (B) 'investor' correctly forms the compound noun adjunct. Choice (A) 'investing' is a participle/gerund, Choice (C) 'investment' refers to capital or financial assets (used in 'investment banking' or 'investment firm', not 'investment relations'), and Choice (D) 'invest' is a verb."
      },
      "synonyms": [
        "IR department",
        "shareholder communications",
        "financial communications",
        "shareholder relations",
        "analyst relations"
      ],
      "antonyms": [],
      "relatedWords": [
        "shareholder",
        "earnings call",
        "quarterly report",
        "analyst",
        "annual report",
        "dividend",
        "equity"
      ]
    },
    {
      "id": "comms-154",
      "word": "issuance",
      "partOfSpeech": [
        "noun"
      ],
      "category": "communications",
      "level": "intermediate",
      "toeicFrequency": 8,
      "pronunciation": {
        "ipa": "/ˈɪʃ.uː.əns/",
        "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/issuance--_us_1.mp3",
        "syllableBreakdown": "is-su-ance",
        "stressPattern": "primary stress on the first syllable (IS-su-ance)",
        "commonMistakes": "Learners often stumble over the 'ss' spelling, either pronouncing it with a harsh /s/ sound as /*ɪs-uː-əns*/ instead of the standard palato-alveolar fricative /ˈɪʃ.uː-/, or misplacing stress onto the second syllable (*is-SU-ance*). Non-native speakers also sometimes confuse the noun 'issuance' (the act of distributing) with 'issue' (a topic, problem, or edition)."
      },
      "etymology": {
        "origin": "Formed in English from the verb 'issue' (from Anglo-Norman and Old French 'issue', past participle of 'issir', to go out, from Latin 'exire') + noun suffix '-ance'.",
        "rootWord": "Anglo-Norman 'issue' (an exit, outflow, egress), from Latin 'exire' (to go out, depart: 'ex-' meaning out + 'ire' meaning to go)",
        "rootMeaning": "'The act or process of sending or flowing out into the world' — originally denoting legal egress and physical outflows.",
        "evolution": "In Norman French and Middle English, 'issue' denoted offspring, legal egress, or revenue from land. By the 17th century, it was applied to the governmental release of currency, decrees, and legal warrants. The formal derived noun 'issuance' emerged in the mid-19th century in Anglo-American legal, banking, and administrative jurisprudence to denote specifically the formal administrative act or process of publishing, delivering, or floating instruments (such as the issuance of patents, passports, visas, bonds, shares, or press releases), distinguishing the action itself from the resulting publication or topic ('the issue').",
        "relatedLanguages": [
          "French: émission / délivrance",
          "Spanish: emisión / expedición",
          "Italian: emissione / rilascio",
          "German: Ausgabe / Emission / Ausstellung"
        ],
        "firstRecordedUse": "Mid-19th century (c. 1850–1865 in US legal statutes and banking treatises regarding currency and bond distribution)"
      },
      "deepMeaning": {
        "coreConcept": "The official act, process, or instance of releasing, distributing, publishing, or delivering authoritative documents, licenses, securities, credentials, or formal public statements.",
        "spatialContext": "Government passport offices, municipal licensing bureaus, corporate legal headquarters, treasury distribution desks, registrar departments, and media press distribution suites.",
        "temporalContext": "Occurs following regulatory approvals, patent grant dates, board authorization of new securities, or scheduled credential renewal cycles.",
        "emotionalTone": "Formal, authoritative, official, procedural, and definitive.",
        "formalityLevel": "formal",
        "connotation": "neutral"
      },
      "nativeMindset": {
        "howNativesThink": "Native English speakers distinguish 'issuance' from 'issue'. While 'issue' can be a noun meaning a problem, a topic, or an edition of a magazine ('the September issue'), 'issuance' specifically refers to the formal, bureaucratic act of granting or putting something into circulation. You don't talk about 'the issuance with our computer system' (that's an 'issue'); you speak of 'the issuance of new shares', 'the issuance of a press release', 'the issuance of a building permit', or 'the issuance of a passport'. It evokes legal authority and institutional stamping.",
        "mentalImage": "An official at a municipal licensing department stamping an embossed seal onto a newly authorized commercial building permit before handing it across the counter to a project manager.",
        "whenToUse": "Use when referring to the formal administrative act of providing, distributing, or publishing official items such as permits, visas, stocks, bonds, certificates, press statements, or executive orders (e.g., 'upon the issuance of the permit', 'the issuance of additional stock').",
        "whenNotToUse": "Never use 'issuance' to mean a personal dilemma, technical glitch, or debate topic (use 'issue' or 'problem'). Avoid using in casual, colloquial conversations where 'giving', 'sending out', or 'granting' sounds more natural.",
        "culturalContext": "In corporate administration, finance, and civil governance, 'issuance' marks the legal moment an instrument becomes active and binding. In TOEIC Part 5, 6, and 7, 'issuance' is a staple in contractual clauses, regulatory notices, and corporate finance announcements (e.g., bond issuance, stock issuance, permit issuance).",
      },
      "examples": {
        "daily": [
          "The consulate notified applicants that the issuance of tourist visas would be delayed by two weeks due to a backlog.",
          "You will receive a temporary paper driving license immediately upon the issuance of your renewal approval.",
          "The university registrar announced that the issuance of official transcripts will now take place through a secure online portal."
        ],
        "business": [
          "The board of directors approved the issuance of five million shares of preferred stock to finance the overseas acquisition.",
          "Construction work on the new regional logistics center must halt until the municipal council completes the issuance of the building permit.",
          "The treasury department coordinated the issuance of municipal bonds to fund local infrastructure improvements."
        ],
        "conversation": [
          "\"When can the contractor begin grading the construction site?\" \"As soon as we receive formal confirmation regarding the issuance of the environmental clearance.\"",
          "\"Why hasn't the corporate press release appeared on the wire yet?\" \"Legal is still finalizing the wording prior to its formal issuance.\""
        ],
        "collocations": [
          "issuance of shares",
          "issuance of permits",
          "bond issuance",
          "date of issuance",
          "issuance of visas",
          "prompt issuance"
        ]
      },
      "wordFamily": {
        "noun": "issuance, issue, issuer",
        "verb": "issue, reissue",
        "adjective": "issued, unissued",
        "adverb": ""
      },
      "visual": {
        "imageKeyword": "issuance of permit certificate legal stamp official document authorization",
        "imageDescription": "A close-up shot of an official document bearing a gold embossed legal seal and signature, being stamped with an official date of issuance beside a fountain pen.",
        "mnemonic": "IS-SU-ance: When an authority ISSUES a vital license or stock certificate, the official act of doing so is called ISSUANCE."
      },
      "video": {
        "description": "An educational finance segment explaining the step-by-step process of corporate bond issuance, detailing how investment banks underwrite, price, and distribute new debt securities to market buyers."
      },
      "toeicContext": {
        "commonParts": [
          5,
          6,
          7
        ],
        "exampleQuestion": "Contractors may not break ground on the hotel development prior to the official _____ of all required environmental permits.\n(A) issue\n(B) issuing\n(C) issuance\n(D) issued",
        "tips": "TOEIC Part 5 frequently tests the formal nominalization of legal and administrative actions. Following the adjective 'official' and preceding the prepositional phrase 'of all required...', the context demands the formal abstract noun representing the administrative act: (C) 'issuance'. While 'issue' (A) can be a noun, 'issuance' is the precise, formal legal term for the administrative act of releasing or granting official instruments. Choice (B) 'issuing' is a gerund, and Choice (D) is a past participle/verb."
      },
      "synonyms": [
        "release",
        "distribution",
        "publication",
        "circulation",
        "granting",
        "promulgation"
      ],
      "antonyms": [
        "revocation",
        "cancellation",
        "withdrawal",
        "recall",
        "withholding"
      ],
      "relatedWords": [
        "issue",
        "issuer",
        "permit",
        "license",
        "securities",
        "decree",
        "promulgate"
      ]
    }
  ]
}

jsonschema.validate(instance=words_data, schema=SCHEMA)
print("VALIDATION SUCCESSFUL! All 4 entries conform 100% to schema.")
