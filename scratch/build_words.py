import json

words_data = [
    {
        "id": "comms-263",
        "word": "webcast",
        "partOfSpeech": ["noun"],
        "category": "communications",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈwɛb.kæst/",
            "syllableBreakdown": "web-cast",
            "stressPattern": "primary stress on the first syllable (WEB-cast)",
            "commonMistakes": "Learners often mispronounce the short /ɛ/ as /eɪ/ (*wayb-cast*) or the short open front /æ/ as /ɑː/ or /ʌ/ (*web-cust*). Non-native speakers also frequently confuse 'webcast' (primarily a one-to-many live or recorded media presentation) with 'webinar' (an interactive online seminar with audience participation, Q&A, and polling) or 'podcast' (audio-focused media distributed via RSS syndication)."
        },
        "etymology": {
            "origin": "Portmanteau compound of 'web' (short for World Wide Web, from Old English 'webb' [woven fabric, net]) and 'broadcast' (from 'broad' [wide] + 'cast' [to throw, from Old Norse 'kasta']). Modeled directly after 'broadcast' and 'telecast'.",
            "rootWord": "web (Old English 'webb' [woven textile, net]) + cast (Old Norse 'kasta' [to throw, fling, scatter])",
            "rootMeaning": "'webb' (interconnected computer network) + 'kasta' (to throw or disperse widely) — literally 'transmitting or scattering audiovisual media signals across the World Wide Web to a widespread audience'",
            "evolution": "The term emerged in the mid-1990s (c. 1995) during the advent of early internet streaming technologies (such as RealAudio and progressive video downloading). While 'broadcast' denoted terrestrial radio and television transmissions across public electromagnetic airwaves, 'webcast' was formulated to designate IP-based live media distribution over packet networks. By the early 2000s, corporate investor relations departments adopted it as the standard industry term for streaming quarterly financial earnings conferences and annual shareholder assemblies.",
            "relatedLanguages": [
                "French: webdiffusion / webémission",
                "Spanish: transmisión web / webcast",
                "German: Webübertragung / Webcast",
                "Italian: trasmissione web / webcast"
            ],
            "firstRecordedUse": "Mid-1990s (c. 1995, during the pioneering live audio internet streaming of concerts and sports matches)"
        },
        "deepMeaning": {
            "coreConcept": "A media presentation or broadcast distributed over the Internet either in real time (live streaming) or on demand, typically structured as a one-to-many transmission from a speaker or executive panel to a large, geographically dispersed audience without extensive peer-to-peer audio dialogue.",
            "spatialContext": "Executive presentation studios, corporate headquarters boardrooms equipped with teleprompters and broadcast lighting, and investor relations web portals.",
            "temporalContext": "Scheduled at fixed calendar broadcast times (commonly coinciding with quarterly financial reporting cycles) and archived for on-demand replay for 30 to 90 days.",
            "emotionalTone": "Polished, authoritative, informative, and corporate.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Native speakers view a 'webcast' as a formal corporate broadcast rather than an informal casual video stream. When hearing the term, business professionals instinctively envision executive leadership, synchronized financial presentation slides, formal script delivery, and a passive digital auditorium where questions are screened through a moderated text chat rather than unmuted verbal discussion.",
            "mentalImage": "A sleek broadcast studio setup where a corporate chief executive and financial director sit before studio cameras and microphones, with synchronized financial charts displaying on a video feed watched simultaneously by thousands of analysts nationwide.",
            "whenToUse": "Use when describing formal corporate announcements, public company quarterly earnings calls, academic symposium keynote streaming, or one-way organizational address events delivered via IP networks (e.g., 'The CEO will unveil the multi-year strategic roadmap during an all-hands webcast this Thursday').",
            "whenNotToUse": "Do not use for informal social media video streams (use 'live stream'), small collaborative video meetings where every attendee is expected to turn on their microphone (use 'video conference' or 'team meeting'), or downloadable episodic talk audio shows (use 'podcast').",
            "culturalContext": "Under United States Securities and Exchange Commission (SEC) Regulation Fair Disclosure (Reg FD), publicly traded corporations are mandated to disclose material non-public information broadly and simultaneously to all investors. The investor relations webcast serves as the legally established gold standard mechanism ensuring equitable market transparency."
        },
        "examples": {
            "daily": [
                "Because I was unable to travel out of state, I watched my sister's university graduation ceremony via the live webcast.",
                "The local natural history museum hosted a fascinating webcast exploring newly uncovered deep-sea coral reefs.",
                "Our neighborhood community council archived the zoning hearing webcast so residents could review the architectural plans at home."
            ],
            "business": [
                "Financial analysts and institutional shareholders can access the live audio webcast of the third-quarter earnings release on the corporate relations webpage.",
                "The multinational technology firm organized a worldwide webcast to introduce its newly appointed chief operating officer to global branch staff.",
                "A technical glitch on the hosting server caused a ten-minute delay in the live webcast, but the presentation proceeded smoothly once the backup stream initiated."
            ],
            "conversation": [
                "\"Were you able to watch the live webcast of the keynote speech yesterday?\" \"I had back-to-back client calls during the broadcast, but I downloaded the archived recording and slide deck this morning.\"",
                "\"Should we host this product announcement as a regular group conference call or a webcast?\" \"A webcast is definitely preferable, since we need to stream high-resolution product demo footage to over eight hundred prospective distributors.\"",
                "\"Will remote attendees have an opportunity to ask questions during the annual shareholder webcast?\" \"Yes, participants can type their inquiries into the moderated Q&A console, and the executive panel will address selected questions at the conclusion.\""
            ],
            "collocations": [
                "live webcast",
                "archived webcast",
                "host a webcast",
                "tune into a webcast",
                "quarterly earnings webcast",
                "webcast presentation"
            ]
        },
        "wordFamily": {
            "noun": "webcast, webcasting, webcaster",
            "verb": "webcast",
            "adjective": "webcast (attributive)",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "corporate executive studio webcast cameras teleprompter",
            "imageDescription": "Two business executives in sharp formal attire seated at a curved anchor desk in an executive broadcast studio, looking directly into studio-grade video cameras with teleprompters displaying financial talking points.",
            "mnemonic": "WEB + BROADCAST = WEBCAST: Broadcasting a live corporate event over the World Wide Web rather than over television or radio towers."
        },
        "video": {
            "description": "A behind-the-scenes walkthrough inside a corporate media control room demonstrating how technical directors switch camera angles, overlay synchronized financial slides, and monitor viewer bandwidth during a live multinational webcast."
        },
        "toeicContext": {
            "commonParts": [3, 4, 7],
            "exampleQuestion": "Because space in the auditorium is strictly limited, regional sales representatives who cannot attend the annual meeting in person are encouraged to view the live _____ online. (A) webcast (B) webcasting (C) webcaster (D) webcasted",
            "tips": "In TOEIC Part 5 vocabulary and grammar items, determine the precise part of speech needed following an adjective modifier like 'live'. The noun 'webcast' (A) correctly denotes the broadcast event serving as the direct object of the transitive verb 'view'. 'Webcasting' refers to the ongoing activity, 'webcaster' designates the broadcasting entity or host, and 'webcasted' is an unnecessary participle form."
        },
        "synonyms": [
            "live stream",
            "online broadcast",
            "internet broadcast",
            "digital video transmission",
            "web transmission"
        ],
        "antonyms": [
            "terrestrial broadcast",
            "in-person presentation",
            "analog transmission"
        ],
        "relatedWords": [
            "webinar",
            "streaming",
            "podcast",
            "teleconference",
            "bandwidth",
            "video feed",
            "keynote"
        ]
    },
    {
        "id": "comms-264",
        "word": "website",
        "partOfSpeech": ["noun"],
        "category": "communications",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈwɛb.saɪt/",
            "syllableBreakdown": "web-site",
            "stressPattern": "primary stress on the first syllable (WEB-site)",
            "commonMistakes": "Learners occasionally replace the diphthong /aɪ/ in 'site' with a lax /ɪ/ or tense /iː/ (*web-sit*), drop the final /t/ consonant, or confuse 'website' (the entire online domain collection of interrelated pages) with 'webpage' (a single, isolated HTML document)."
        },
        "etymology": {
            "origin": "Compound noun formed from 'web' (short for World Wide Web, from Old English 'webb' [woven textile, spider's snare]) and 'site' (from Latin 'situs' [local position, situation, place] via Anglo-Norman and Middle English).",
            "rootWord": "web (Old English 'webb' [interwoven fabric, net]) + site (Latin 'situs' [place, position, geographical station])",
            "rootMeaning": "'webb' (interlinked digital network) + 'situs' (fixed location or ground) — literally 'a designated virtual address or place anchored on the World Wide Web'",
            "evolution": "Coined in the early 1990s (c. 1992–1993) by software engineers and networking pioneers following Tim Berners-Lee's formulation of the World Wide Web architecture at CERN in 1989. In early computer literature and technical manuals, it was typically styled as two capitalized words ('Web site'). As consumer internet adoption exploded through the late 1990s, major editorial authorities, including the Associated Press (AP) and the Chicago Manual of Style, transitioned from 'Web site' to the unified lowercase compound 'website' in 2010.",
            "relatedLanguages": [
                "French: site web / site Internet",
                "Spanish: sitio web / página web",
                "German: Website / Internetseite / Webpräsenz",
                "Italian: sito web / sito Internet"
            ],
            "firstRecordedUse": "Early 1990s (c. 1992, in CERN documentation and USENET computer networking groups)"
        },
        "deepMeaning": {
            "coreConcept": "A connected collection of publicly or privately accessible World Wide Web pages, multimedia files, and databases published under a single domain name and hosted on at least one web server reachable through internet protocols.",
            "spatialContext": "Cloud server infrastructure, digital desktop and mobile browser viewports, corporate data centers, and user experience (UX) layout architectures.",
            "temporalContext": "Operational continuously (24 hours a day, 7 days a week, 365 days a year), punctuated by scheduled server maintenance windows and software deployment cycles.",
            "emotionalTone": "Navigational, informative, commercial, and professional.",
            "formalityLevel": "neutral",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Native speakers regard a 'website' as the indispensable central digital headquarters and commercial identity of any modern business or organization. It is intuitively perceived as a cohesive environment containing interactive forms, catalogs, contact information, and navigational architecture. Native speakers instinctively judge the legitimacy, reliability, and modern standard of an enterprise based on the speed, visual coherence, and mobile responsiveness of its website.",
            "mentalImage": "A clean, modern corporate webpage displayed on a high-resolution laptop monitor, featuring a company header logo, intuitive navigation dropdown menus, high-definition product banners, and a secure HTTPS lock icon in the browser address bar.",
            "whenToUse": "Use when designating an entire domain or complete digital online destination of an organization, enterprise, or individual (e.g., 'Customers can submit warranty inquiries directly through our company website').",
            "whenNotToUse": "Do not use when speaking strictly of a single specific URL page (use 'web page' or 'landing page'), native mobile software packages downloaded from application stores (use 'mobile app'), or internet hardware infrastructures (use 'web server' or 'network host').",
            "culturalContext": "In 21st-century commerce and public life, an official website serves as a primary legal and operational entity. It is subject to legal mandates including accessibility legislation (such as Americans with Disabilities Act / ADA guidelines), data privacy protocols (GDPR in Europe, CCPA in California), and mandatory e-commerce consumer disclosures."
        },
        "examples": {
            "daily": [
                "I visited the municipal government's official website to renew my residential parking permit online.",
                "The recipe website had so many video ads and pop-up banners that my mobile browser crashed.",
                "Before booking theater tickets, I always check the venue's website for seating charts and parking directions."
            ],
            "business": [
                "Our marketing team launched a redesigned corporate website featuring responsive mobile navigation and accelerated page load times.",
                "Online retail revenue rose by 28% after the digital team streamlined the website's checkout process.",
                "The logistics company website includes a customer tracking tool where clients can monitor freight shipments in real time."
            ],
            "conversation": [
                "\"Where can I find the technical specifications for the new commercial generator?\" \"You can download the comprehensive PDF manual directly from the manufacturer's website.\"",
                "\"Has the promotional discounted pricing gone live yet?\" \"Yes, our IT developer updated the product catalog on the website at midnight.\"",
                "\"Our website is experiencing an unusually high bounce rate on the pricing page.\" \"Let's review user session recordings and optimize the call-to-action layout to see if conversion improves.\""
            ],
            "collocations": [
                "official website",
                "corporate website",
                "redesign a website",
                "launch a website",
                "visit a website",
                "browse a website"
            ]
        },
        "wordFamily": {
            "noun": "website, webmaster, webpage",
            "verb": "",
            "adjective": "website (attributive)",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "responsive corporate website design laptop mockup workspace",
            "imageDescription": "A minimalist corporate desk featuring an ultra-thin laptop showing a beautifully structured corporate website with clean typography, intuitive navigation buttons, and corporate branding graphics.",
            "mnemonic": "WEB + SITE: A permanent physical or digital SITE (location) where an organization plants its flag on the World Wide WEB."
        },
        "video": {
            "description": "A digital product agency case study demonstrating UX researchers, front-end developers, and graphic designers conducting usability testing and launching a newly revamped e-commerce website."
        },
        "toeicContext": {
            "commonParts": [3, 4, 7],
            "exampleQuestion": "Detailed specifications regarding warranty coverage, replacement parts, and authorized repair centers can be found on our _____ at www.vanguardmachinery.com. (A) website (B) webmaster (C) webbing (D) webbed",
            "tips": "In TOEIC Part 7 announcements and Part 5 sentence completion, references to online URLs ('www...com') regularly collocate with the noun 'website'. Recognize that 'website' (A) specifies the digital platform itself, whereas 'webmaster' (B) identifies the administrative technician, and 'webbing'/'webbed' are morphological distractors."
        },
        "synonyms": [
            "web portal",
            "internet site",
            "online portal",
            "web page collection",
            "web presence"
        ],
        "antonyms": [
            "brick-and-mortar storefront",
            "physical retail outlet",
            "offline store"
        ],
        "relatedWords": [
            "domain",
            "URL",
            "homepage",
            "webmaster",
            "hyperlink",
            "landing page",
            "e-commerce"
        ]
    },
    {
        "id": "comms-265",
        "word": "weekly",
        "partOfSpeech": ["adverb"],
        "category": "communications",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/ˈwiːk.li/",
            "syllableBreakdown": "week-ly",
            "stressPattern": "primary stress on the first syllable (WEEK-ly)",
            "commonMistakes": "Learners often shorten the long high front vowel /iː/ to a lax /ɪ/ (*wick-ly*). Grammatically, learners frequently forget that 'weekly' functions interchangeably as both an adverb of frequency ('convenes weekly') and an adjective ('a weekly report'), wrongly assuming all words ending in '-ly' must exclusively serve as adverbs."
        },
        "etymology": {
            "origin": "Old English compound derived from 'wice' / 'wucu' (week) and the Germanic adverbial and adjectival suffix '-līce' (having the character of, recurring at intervals of).",
            "rootWord": "wucu (Old English 'week', from Proto-Germanic '*wikǭ' [a turning, alternation, succession]) + -ly (Old English '-līce' [in the manner of])",
            "rootMeaning": "'*wikǭ' (a cyclical change or regular turning of days) + '-līce' (recurring at each turn) — literally 'occurring or recurring once in every cyclical rotation of seven days'",
            "evolution": "In Old and Middle English, the noun 'wucu' designated the planetary seven-day cycle recognized in Western civil and ecclesiastical traditions. By the early 15th century (c. 1400–1425), 'weekly' was documented in judicial rolls, estate registries, and municipal accounts to denote fees, market fairs, and guild assemblies convened every seven days. With the expansion of 18th-century print culture, 'weekly' designated periodicals published once a week, while solidifying its adverbial role in commercial operational routines.",
            "relatedLanguages": [
                "German: wöchentlich",
                "Dutch: wekelijks",
                "French: hebdomadairement (adverb) / hebdomadaire (adjective)",
                "Spanish: semanalmente (adverb) / semanal (adjective)",
                "Italian: settimanalmente (adverb) / settimanale (adjective)"
            ],
            "firstRecordedUse": "Late Middle English (c. early 15th century, c. 1400–1425, in monastic accounting rolls and town ordinances)"
        },
        "deepMeaning": {
            "coreConcept": "Occurring, appearing, performed, or calculated once every seven days; on a regular, predictable seven-day recurring schedule or frequency.",
            "spatialContext": "Corporate departmental offices, Agile software development sprint rooms, factory floor management hubs, and municipal utility routes.",
            "temporalContext": "Recurrently executed once during every seven-day period, typically anchored to a designated weekday (such as every Monday morning or Friday afternoon).",
            "emotionalTone": "Systematic, dependable, structured, and routine.",
            "formalityLevel": "neutral",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "To a native English speaker, 'weekly' represents the fundamental operational heartbeat of the corporate and domestic calendar. When used as an adverb ('we meet weekly', 'timesheets are processed weekly'), it conveys disciplined cadence, consistent accountability, and operational rhythm. It strikes a balance between immediate oversight (daily) and long-range retrospective analysis (monthly/quarterly).",
            "mentalImage": "A digital calendar grid showing a highlighted blue appointment block recurring at 9:00 AM every Monday across the entire monthly view, symbolizing an unmissable departmental coordination session.",
            "whenToUse": "Use as an adverb to describe actions, inspections, publications, or routines that happen once every week (e.g., 'Facility maintenance staff inspect the HVAC filtration units weekly').",
            "whenNotToUse": "Do not use when describing intervals of two weeks (use 'biweekly' or 'fortnightly'), actions that occur sporadically or multiple irregular times within a seven-day span (use 'periodically' or 'several times a week'), or day-to-day operations (use 'daily').",
            "culturalContext": "The seven-day week forms the bedrock framework of global commerce. In North American and European corporate settings, 'weekly' timesheets, weekly sprint planning meetings in Agile software methodologies, and weekly financial reconciliation form standard operating procedure for workforce productivity and compliance."
        },
        "examples": {
            "daily": [
                "In our suburban district, municipal recycling and compost bins are collected weekly on Wednesday mornings.",
                "I phone my elderly grandparents weekly to share family updates and see if they need grocery deliveries.",
                "The neighborhood farmers' market convenes weekly on Saturday mornings in the town square."
            ],
            "business": [
                "Branch supervisors report weekly to the regional director to review customer service metrics and staffing levels.",
                "All independent contractor invoices and hourly timesheets must be submitted weekly through the payroll portal before Friday at 5:00 PM.",
                "The engineering team meets weekly with the safety coordinator to review construction progress and equipment maintenance logs."
            ],
            "conversation": [
                "\"How often does the executive board expect updates on the factory renovation?\" \"The project lead reports weekly by submitting a progress dashboard every Monday.\"",
                "\"Are temporary warehouse contractors compensated monthly or weekly?\" \"Direct payroll is processed weekly for hourly contractors, whereas salaried staff are paid semi-monthly.\"",
                "\"Does the database backup script run automatically?\" \"Incremental data syncs run overnight, while full system snapshots are executed weekly every Sunday at midnight.\""
            ],
            "collocations": [
                "meet weekly",
                "report weekly",
                "update weekly",
                "publish weekly",
                "convene weekly",
                "occur weekly"
            ]
        },
        "wordFamily": {
            "noun": "week, weekly (periodical publication)",
            "verb": "",
            "adjective": "weekly",
            "adverb": "weekly"
        },
        "visual": {
            "imageKeyword": "weekly planner schedule calendar meeting checklist",
            "imageDescription": "A minimalist corporate executive desk with an open leather-bound weekly agenda planner showing recurring scheduled tasks, paired with a modern laptop displaying a synchronized digital calendar.",
            "mnemonic": "WEEK + -LY: An action completed once for every single WEEK on the calendar."
        },
        "video": {
            "description": "An Agile software engineering team conducting their recurring weekly sprint review, demonstrating completed feature tickets on a shared screen and assigning upcoming development tasks."
        },
        "toeicContext": {
            "commonParts": [5, 6, 7],
            "exampleQuestion": "Department managers are instructed to evaluate assembly line output and submit quality control audits _____ to the compliance officer. (A) weekly (B) weeks (C) weekday (D) weekend",
            "tips": "In TOEIC Part 5, a classic test pattern focuses on frequency modifiers. The verb phrase 'submit quality control audits' requires an adverb of frequency to complete the predicate. 'Weekly' (A) can function as both an adjective and an adverb, fitting perfectly here. The plural noun 'weeks' (B) and the nouns 'weekday' (C) and 'weekend' (D) cannot grammatically modify the verb."
        },
        "synonyms": [
            "every week",
            "once a week",
            "each week",
            "on a weekly basis",
            "hebdomadally",
            "by the week"
        ],
        "antonyms": [
            "daily",
            "monthly",
            "annually",
            "irregularly",
            "sporadically"
        ],
        "relatedWords": [
            "biweekly",
            "daily",
            "monthly",
            "quarterly",
            "annually",
            "cadence",
            "schedule"
        ]
    },
    {
        "id": "comms-266",
        "word": "wireless",
        "partOfSpeech": ["adjective"],
        "category": "communications",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈwaɪər.ləs/",
            "syllableBreakdown": "wire-less",
            "stressPattern": "primary stress on the first syllable (WIRE-less)",
            "commonMistakes": "Learners often pronounce 'wire' as two hyper-articulated syllables (*why-er-less*) or fail to reduce the unstressed suffix '-less' to a schwa /ləs/, pronouncing it with a full short /ɛ/ (*wire-lesss*). Additionally, learners sometimes confuse 'wireless' (broad electromagnetic signal transmission without cables) with 'cordless' (which specifically designates battery-powered household handheld tools or phones that charge in a docking cradle)."
        },
        "etymology": {
            "origin": "Compound of Old English 'wīr' (metal drawn into a flexible strand) and the privative suffix '-lēas' (free from, lacking, devoid of).",
            "rootWord": "wīr (Old English 'wire', from Proto-Germanic '*wīras' [twisted metal thread]) + -leas (Old English '-lēas' [devoid of, free from])",
            "rootMeaning": "'wīr' (metallic conducting filament) + '-lēas' (without, absent of) — literally 'devoid of metallic conducting cables or physical cords'",
            "evolution": "Coinage dates to the late 19th century (c. 1890s) during the pioneering radio wave experiments of Guglielmo Marconi, Nikola Tesla, and Oliver Lodge, who termed their radio-frequency Morse telegraphy systems 'wireless telegraphy'. Throughout the first half of the 20th century in the UK and British Commonwealth, 'the wireless' became the standard colloquial noun for a domestic radio receiver. In the late 20th century, the digital microelectronics revolution repurposed 'wireless' as an adjective for local area networking (Wi-Fi 802.11 standards), cellular telephony (GSM, 3G, 4G, 5G), Bluetooth peripherals, and untethered communication technologies.",
            "relatedLanguages": [
                "French: sans fil",
                "Spanish: inalámbrico",
                "German: drahtlos / kabellos",
                "Italian: senza fili / wireless"
            ],
            "firstRecordedUse": "Late 19th century (c. 1894, in scientific journals describing wireless telegraphic signal transmissions)"
        },
        "deepMeaning": {
            "coreConcept": "Operating, communicating, transmitting data, or providing electrical power using radio waves, microwaves, or infrared signals through the air rather than through physical conductive wires or interconnecting cables.",
            "spatialContext": "Corporate open-plan offices, wireless network access points mounted on ceiling grids, telecommunication cellular base stations, airport terminals, and smart home IoT ecosystems.",
            "temporalContext": "Operating continuously in real time with high data throughput and sub-second transmission latency.",
            "emotionalTone": "Modern, streamlined, agile, efficient, and technologically advanced.",
            "formalityLevel": "neutral",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "To a native English speaker, 'wireless' evokes clean aesthetics, physical mobility, and contemporary tech infrastructure. It conjures images of clutter-free conference tables, untethered laptop work from coffee shops or airport lounges, seamless peripheral connection (keyboards, headsets, printers), and cellular mobile networks. In business negotiations, 'the wireless industry' specifically denotes the cellular carrier telecommunications market.",
            "mentalImage": "A clutter-free boardroom table where corporate executives collaborate seamlessly on laptops, with their presentation displays instantly cast to an overhead screen via a ceiling-mounted enterprise wireless access point.",
            "whenToUse": "Use as an adjective to modify technologies, connections, devices, or protocols operating without physical cables (e.g., 'wireless network', 'wireless router', 'wireless carrier', 'wireless charging pad', 'wireless mouse').",
            "whenNotToUse": "Do not use in modern American English to refer to a standalone radio broadcast receiver (say 'radio', as using 'the wireless' for a radio is British historical terminology), and avoid using it metaphorically for abstract non-technical connections.",
            "culturalContext": "In global commerce and telecommunications law, 'wireless' encompasses a multibillion-dollar regulatory and commercial sector covering radio spectrum auctions, 5G cellular infrastructure buildouts, and municipal Wi-Fi connectivity initiatives recognized worldwide as vital public utilities."
        },
        "examples": {
            "daily": [
                "The neighborhood café provides high-speed wireless internet access to all customers purchasing refreshments.",
                "I switched to wireless noise-canceling earbuds to make listening to audiobooks more comfortable during my daily jog.",
                "Modern smartphones support convenient wireless charging pads that eliminate the need for tangled charging cables on nightstands."
            ],
            "business": [
                "The corporate IT department upgraded the office wireless network to support bandwidth-intensive video conferencing and cloud migrations.",
                "All executive conference rooms are equipped with wireless presentation hardware so visiting clients can share presentations without HDMI cables.",
                "Warehouse logistics personnel use ruggedized handheld wireless barcode scanners that instantly synchronize inventory levels with the main database."
            ],
            "conversation": [
                "\"Why is my laptop unable to connect to the office color printer?\" \"Make sure your device is connected to the secure employee network rather than the public guest wireless network.\"",
                "\"Are we installing hardwired ethernet ports in the temporary sales pavilion?\" \"No, the technical crew installed high-density wireless access points that can comfortably handle over three hundred concurrent connections.\"",
                "\"Has the company finalized its mobile carrier contract?\" \"Yes, the procurement director renegotiated our wireless service agreement to include unlimited international roaming for field executives.\""
            ],
            "collocations": [
                "wireless network",
                "wireless connection",
                "wireless technology",
                "wireless carrier",
                "wireless router",
                "wireless access point"
            ]
        },
        "wordFamily": {
            "noun": "wireless (historical British: radio), wire",
            "verb": "wire",
            "adjective": "wireless, wired",
            "adverb": "wirelessly"
        },
        "visual": {
            "imageKeyword": "wireless router corporate enterprise access point wifi",
            "imageDescription": "A sleek white enterprise-grade wireless access point mounted inconspicuously on a modern office ceiling tile, emitting a subtle green LED connection status indicator.",
            "mnemonic": "WIRE + LESS: Completely free and unburdened by physical conducting WIRES."
        },
        "video": {
            "description": "An enterprise network architect explaining the site survey process, RF interference testing, and deployment of dual-band wireless access points across a multi-story corporate campus."
        },
        "toeicContext": {
            "commonParts": [3, 4, 7],
            "exampleQuestion": "Guests visiting the corporate headquarters can access high-speed _____ internet throughout the lobby and cafeteria by requesting a temporary passcode from the reception desk. (A) wireless (B) wirelessly (C) wire (D) wiring",
            "tips": "In TOEIC Part 5 adjective/adverb distinction questions, identify the grammatical function required before a noun. The noun 'internet' requires an adjective modifier to form the compound noun phrase 'wireless internet'. Choice (A) 'wireless' is the adjective. Choice (B) is an adverb, choice (C) is a noun or verb, and choice (D) is a gerund/noun indicating physical electrical installation."
        },
        "synonyms": [
            "cordless",
            "Wi-Fi-enabled",
            "cable-free",
            "untethered",
            "cellular",
            "radio-frequency"
        ],
        "antonyms": [
            "wired",
            "cabled",
            "hardwired",
            "tethered"
        ],
        "relatedWords": [
            "Wi-Fi",
            "Bluetooth",
            "broadband",
            "cellular network",
            "bandwidth",
            "access point",
            "router"
        ]
    }
]

print(f"Total words: {len(words_data)}")

# Validation checks
for w in words_data:
    assert len(w['examples']['daily']) == 3, f"{w['id']} daily count != 3"
    assert len(w['examples']['business']) == 3, f"{w['id']} business count != 3"
    assert len(w['examples']['conversation']) >= 2, f"{w['id']} conversation count < 2"
    assert 5 <= len(w['examples']['collocations']) <= 6, f"{w['id']} collocations count not 5-6"
    assert 4 <= len(w['synonyms']) <= 6, f"{w['id']} synonyms count not 4-6"
    assert 5 <= len(w['relatedWords']) <= 7, f"{w['id']} relatedWords count not 5-7"
    assert len(w['toeicContext']['commonParts']) >= 1, f"{w['id']} commonParts empty"
    print(f"Word {w['word']} ({w['id']}): validation passed!")

with open("scratch/words_final.json", "w", encoding="utf-8") as f:
    json.dump({"words": words_data}, f, indent=2, ensure_ascii=False)

print("Saved to scratch/words_final.json successfully.")
