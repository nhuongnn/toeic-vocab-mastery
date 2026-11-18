import json

words = [
  {
    "id": "tech-225",
    "word": "multithreading",
    "partOfSpeech": [
      "noun"
    ],
    "category": "technology",
    "level": "advanced",
    "toeicFrequency": 7,
    "pronunciation": {
      "ipa": "/ˌmʌltiˈθrɛdɪŋ/",
      "syllableBreakdown": "mul-ti-thread-ing",
      "stressPattern": "primary stress on the third syllable (mul-ti-THREAD-ing)",
      "commonMistakes": "Learners often misplace the stress on the first syllable (*MUL-ti-threading*) or mispronounce the voiceless dental fricative /θ/ as /s/ or /t/, saying *multitreading*. Another common error is treating the term as a verb or adjective in contexts requiring the gerund noun."
    },
    "etymology": {
      "origin": "Modern technical compound coinage from 'multi-' (from Latin 'multus', much, many) + 'threading' (gerund of 'thread', from Old English 'þrǣd', spun fiber, metaphorically applied in computing to execution threads since the 1960s)",
      "rootWord": "multi- (many, multiple) + thread (independent sequence of programmed instructions)",
      "rootMeaning": "'multiple execution threads' — the concurrent execution of more than one instruction sequence within a single operating process",
      "evolution": "Emerging in computer architecture and operating system theory during the late 1980s and 1990s as symmetric multiprocessing (SMP) and simultaneous multithreading (SMT, popularized by Intel's Hyper-Threading) hardware advanced, the term transitioned from academic operating system textbooks into enterprise IT infrastructure, software engineering, and high-performance cloud computing.",
      "relatedLanguages": [
        "French: multithreading / multitraitement",
        "Spanish: multihilado / multithreading",
        "German: Multithreading",
        "Italian: multithreading"
      ],
      "firstRecordedUse": "Late 20th century (c. 1988 in computer science literature detailing OS kernel design)"
    },
    "deepMeaning": {
      "coreConcept": "A CPU feature or software programming paradigm that permits multiple execution paths (threads) to be scheduled and executed concurrently within a single process, sharing memory resources to maximize processor throughput and responsiveness.",
      "spatialContext": "Enterprise server rooms, cloud data center clusters, software development workstations running IDE debuggers, and CPU microarchitecture design labs.",
      "temporalContext": "Operating continuously at the hardware and operating system level, executing billions of CPU cycle interleavings per second across application threads.",
      "emotionalTone": "Technical, high-performance, efficient, and architectural.",
      "formalityLevel": "formal",
      "connotation": "positive"
    },
    "nativeMindset": {
      "howNativesThink": "Software engineers and IT system architects perceive multithreading not merely as a buzzword, but as a critical performance optimization strategy that prevents UI freezing in desktop applications and maximizes CPU core utilization in backend enterprise servers. They immediately associate it with concurrency challenges such as race conditions, deadlocks, mutex locks, and thread synchronization overhead.",
      "mentalImage": "A high-end multi-core server processor die rendered in glowing neon circuits, dispatching dozens of simultaneous glowing data streams across parallel execution pipelines.",
      "whenToUse": "Use when discussing system performance optimization, CPU architecture capabilities, concurrent software design, or parallel processing frameworks (e.g., 'Our enterprise database engine relies heavily on multithreading to handle thousands of concurrent client queries without blocking').",
      "whenNotToUse": "Do not use when referring to physical network connections between separate machines (use 'networking' or 'distributed systems') or sequential, single-task execution flows.",
      "culturalContext": "In modern software engineering interviews and enterprise IT architecture evaluations, proficiency in multithreading concepts distinguishes senior systems developers from junior programmers, particularly in financial trading systems, real-time analytics, and cloud microservices."
    },
    "examples": {
      "daily": [
        "My new laptop's processor supports advanced multithreading, so rendering 4K video exports while browsing the web feels instantaneous.",
        "The photo editing software uses multithreading to apply complex filters across different image tiles simultaneously.",
        "When running multiple virtual machines, the host operating system manages CPU multithreading to keep each guest environment responsive."
      ],
      "business": [
        "The software engineering team refactored the legacy batch processing pipeline to introduce multithreading, cutting overnight data ingestion times by sixty percent.",
        "To pass the enterprise stress test, our database architecture required robust multithreading support to process parallel financial transactions securely.",
        "The cloud infrastructure provider charges premium rates for virtual server instances configured with hyper-threading and dedicated multithreading cores."
      ],
      "conversation": [
        "\"Why is the desktop client still freezing whenever we import large CAD files?\" \"The legacy codebase is single-threaded; we need to implement multithreading so background file parsing doesn't block the UI thread.\"",
        "\"Did the performance benchmark meet our Q3 SLA targets after the recent server upgrade?\" \"Yes, enabling hardware multithreading on the new Xeon processors doubled our transaction throughput per second.\""
      ],
      "collocations": [
        "hardware multithreading",
        "multithreading support",
        "multithreading environment",
        "multithreading performance",
        "enable multithreading",
        "multithreading architecture"
      ]
    },
    "wordFamily": {
      "noun": "multithreading, thread, concurrency, multiprocessing",
      "verb": "multithread",
      "adjective": "multithreaded",
      "adverb": "multithreadedly"
    },
    "visual": {
      "imageKeyword": "CPU core multi thread execution diagram semiconductor processor",
      "imageDescription": "A technical schematic illustration of a modern CPU processor die showing multiple independent execution pipelines and thread queues operating concurrently on shared L3 cache memory.",
      "mnemonic": "MULTI (many) + THREADING (spinning separate fibers): Imagine a weaver operating multiple sewing threads simultaneously on one loom to weave a much faster fabric!"
    },
    "video": {
      "description": "An educational systems engineering animation illustrating how concurrent instruction pipelines switch between execution threads to keep CPU arithmetic logic units fully saturated."
    },
    "toeicContext": {
      "commonParts": [
        3,
        4,
        7
      ],
      "exampleQuestion": "The IT department announced that the upcoming database server upgrade will incorporate advanced _____ capabilities to accelerate high-volume transaction processing. (A) multithreading (B) multithreaded (C) multithread (D) multithreadedly",
      "tips": "In TOEIC Part 5, noun modifiers and compound nouns frequently appear before a noun like 'capabilities'. Here, the noun 'multithreading' acts as a noun adjunct specifying the type of processing capability."
    },
    "synonyms": [
      "concurrent execution",
      "parallel processing",
      "concurrent threading",
      "simultaneous processing",
      "multi-task processing"
    ],
    "antonyms": [
      "single-threading",
      "sequential processing",
      "single-tasking"
    ],
    "relatedWords": [
      "concurrency",
      "processor core",
      "synchronization",
      "mutex",
      "deadlock",
      "hyper-threading",
      "asynchronous"
    ]
  },
  {
    "id": "tech-226",
    "word": "native",
    "partOfSpeech": [
      "adjective"
    ],
    "category": "technology",
    "level": "essential",
    "toeicFrequency": 9,
    "pronunciation": {
      "ipa": "/ˈneɪ.tɪv/",
      "syllableBreakdown": "na-tive",
      "stressPattern": "primary stress on the first syllable (NA-tive)",
      "commonMistakes": "Learners often mispronounce the initial diphthong /eɪ/ as a monophthong /æ/ or /ɛ/, or misplace stress on the second syllable (*na-TIVE*). In technology contexts, learners sometimes confuse 'native application' with 'web-based application'."
    },
    "etymology": {
      "origin": "Late Middle English from Old French 'natif', from Latin 'nativus' (born, innate, natural), derived from 'natus' (past participle of 'nasci', to be born)",
      "rootWord": "nasci (to be born) + -ivus (adjectival suffix denoting tendency or quality)",
      "rootMeaning": "inborn, natural, belonging to a place by birth — extended in modern software engineering to software written specifically for a particular hardware platform or operating system",
      "evolution": "Originally denoting birth origin or inherent natural properties in 15th-century English, the term expanded during the digital revolution of the late 20th century to describe software compiled specifically for a given operating system (e.g., native iOS apps) or file formats supported directly by hardware without translation layers.",
      "relatedLanguages": [
        "French: natif",
        "Spanish: nativo",
        "German: nativ",
        "Italian: nativo"
      ],
      "firstRecordedUse": "15th century (c. 1425 in Middle English legal and general registers)"
    },
    "deepMeaning": {
      "coreConcept": "Belonging naturally to a specific operating system, hardware architecture, or cloud environment without requiring emulators, translation layers, or plugins.",
      "spatialContext": "Mobile app development studios, enterprise software deployment dashboards, cloud-native container clusters, and operating system configuration menus.",
      "temporalContext": "Constantly evaluated during software procurement, architectural migration planning, and mobile device deployment cycles.",
      "emotionalTone": "Optimized, seamless, authentic, and foundational.",
      "formalityLevel": "neutral",
      "connotation": "positive"
    },
    "nativeMindset": {
      "howNativesThink": "In technology and business circles, 'native' signifies highest performance, perfect integration, and zero friction. When developers speak of a 'native app,' they mean software written in platform-specific languages (Swift for iOS, Kotlin for Android) that leverages device hardware fully, unlike sluggish hybrid or web-wrapped apps. In cloud computing ('cloud-native'), it means architectures built from scratch to utilize microservices and containers rather than legacy lifted-and-shifted virtual machines.",
      "mentalImage": "A sleek smartphone displaying a high-performance mobile application running smoothly at sixty frames per second with hardware-accelerated animations and native operating system UI controls.",
      "whenToUse": "Use when describing software built specifically for a specific platform (e.g., 'native mobile application'), data formats supported directly by an application, or cloud-optimized infrastructure (e.g., 'cloud-native microservices').",
      "whenNotToUse": "Do not use when referring to cross-platform frameworks, cross-compiled binaries, or emulated software environments.",
      "culturalContext": "In global IT procurement and software vendor selection, 'native integration' is a major selling point. Enterprise clients actively reject middleware heavy integration layers in favor of native connectors that promise lower latency and fewer maintenance overheads."
    },
    "examples": {
      "daily": [
        "The new tablet comes with a native document scanning app that uses the built-in camera automatically.",
        "I prefer using the operating system's native calculator because it opens instantly without loading external libraries.",
        "The latest update added native support for high-resolution audio file formats."
      ],
      "business": [
        "The chief technology officer recommended developing separate native applications for iOS and Android to ensure optimal user experience and performance.",
        "Our enterprise migration strategy focuses on modernizing legacy databases into cloud-native microservices hosted on Kubernetes.",
        "The CRM software provides native integration with major email platforms, eliminating the need for third-party synchronization plugins."
      ],
      "conversation": [
        "\"Should we build our new customer portal using cross-platform web wrappers to save budget?\" \"No, user testing showed sluggish scrolling; we must invest in native development for both major mobile platforms.\"",
        "\"Does the analytics reporting tool connect directly to our data warehouse?\" \"Yes, it features native connectors for Snowflake and Amazon Redshift with zero custom coding required.\""
      ],
      "collocations": [
        "native application",
        "native mobile app",
        "cloud-native architecture",
        "native integration",
        "native support",
        "native format"
      ]
    },
    "wordFamily": {
      "noun": "nativity, native",
      "verb": "nativize",
      "adjective": "native",
      "adverb": "natively"
    },
    "visual": {
      "imageKeyword": "mobile app code development native iOS Android studio screen",
      "imageDescription": "A software developer's dual monitors displaying Swift and Kotlin source code inside an IDE, with simulator preview windows showing native mobile user interface components.",
      "mnemonic": "NATIVE: Think of being born right into the environment. A native app is born directly in the operating system's native language!"
    },
    "video": {
      "description": "A technical keynote presentation comparing the performance benchmarks of cross-platform hybrid apps versus fully optimized native mobile applications."
    },
    "toeicContext": {
      "commonParts": [
        5,
        6,
        7
      ],
      "exampleQuestion": "To ensure maximum execution speed and seamless hardware access, the development team decided to build _____ mobile applications for both iOS and Android platforms rather than a single hybrid web wrapper. (A) native (B) natively (C) nativism (D) nativity",
      "tips": "In TOEIC Part 5, adjectives are tested modifying plural nouns ('_____ mobile applications'). 'Native' functions as the adjective meaning platform-specific, whereas 'natively' (B) is an adverb."
    },
    "synonyms": [
      "platform-specific",
      "builtin",
      "inbuilt",
      "intrinsic",
      "indigenous"
    ],
    "antonyms": [
      "cross-platform",
      "hybrid",
      "emulated",
      "third-party"
    ],
    "relatedWords": [
      "cloud-native",
      "application",
      "platform",
      "integration",
      "framework",
      "API",
      "executable"
    ]
  },
  {
    "id": "tech-227",
    "word": "networking",
    "partOfSpeech": [
      "noun"
    ],
    "category": "technology",
    "level": "intermediate",
    "toeicFrequency": 8,
    "pronunciation": {
      "ipa": "/ˈnɛtˌwɜːr.kɪŋ/",
      "syllableBreakdown": "net-work-ing",
      "stressPattern": "primary stress on the first syllable, secondary stress on the third (NET-work-ing)",
      "commonMistakes": "Learners sometimes confuse IT networking with professional career networking, or mispronounce the medial /w/ or ending gerund nasal sound. In technical contexts, learners may omit necessary prepositions like 'networking protocols'."
    },
    "etymology": {
      "origin": "Compound of 'net' (Old English 'nette', open-work fabric) + 'work' (Old English 'weorc', labor, action) + gerundial suffix '-ing'",
      "rootWord": "net (mesh fabric, interconnected system) + work (action/system)",
      "rootMeaning": "'the act or practice of linking interconnected communication channels' — extended from textile netting to telecommunications and professional relationship building",
      "evolution": "While 'networking' originated in the 19th century to describe textile machinery and later inter-organizational social contacts, its technological meaning solidified in the 1970s and 1980s with ARPANET, Ethernet, LAN/WAN topologies, and TCP/IP protocol development, becoming a cornerstone of modern IT infrastructure.",
      "relatedLanguages": [
        "French: réseautage",
        "Spanish: redes / networking",
        "German: Vernetzung",
        "Italian: networking"
      ],
      "firstRecordedUse": "19th century for social/mechanical systems; mid-20th century (c. 1970s) for computer communication systems"
    },
    "deepMeaning": {
      "coreConcept": "The construction, configuration, management, and troubleshooting of interconnected computer systems, routers, switches, and communication protocols that enable data exchange across local and global networks.",
      "spatialContext": "Enterprise server rooms, telecommunications carrier facilities, network operations centers (NOC), and IT configuration management consoles.",
      "temporalContext": "Operating 24/7/365 to maintain secure, uninterrupted data transmission and packet routing across organizational endpoints.",
      "emotionalTone": "Reliable, foundational, connective, and strategic.",
      "formalityLevel": "formal",
      "connotation": "positive"
    },
    "nativeMindset": {
      "howNativesThink": "In corporate and technical environments, 'networking' bridges hardware engineering and business operations. IT professionals view networking through the lens of bandwidth, latency, VLAN segmentation, firewall security, and redundancy. They know that even the most powerful servers are useless without robust, resilient networking infrastructure.",
      "mentalImage": "A dimly lit enterprise server rack glowing with blinking green link status LEDs, with high-density fiber optic patch cables neatly routed through vertical cable managers to core switches.",
      "whenToUse": "Use when discussing IT infrastructure, router configuration, LAN/WAN setup, or network security (e.g., 'Our senior systems administrator has extensive certifications in enterprise networking').",
      "whenNotToUse": "Do not use when referring strictly to interpersonal career networking events (though the word is polysemous, technical IT contexts require clear distinction from professional mixer events).",
      "culturalContext": "In corporate budgeting and digital transformation initiatives, enterprise networking upgrades are treated as mission-critical investments. Network downtime directly translates to severe financial losses and halted business operations."
    },
    "examples": {
      "daily": [
        "The office printer lost its connection because of a temporary glitch in the wireless networking router.",
        "I enrolled in an evening certification course to improve my understanding of cloud networking and subnetting.",
        "Setting up a secure home office networking configuration required configuring WPA3 encryption on the access point."
      ],
      "business": [
        "The corporate network engineering team scheduled routine maintenance on the core switches to upgrade enterprise networking security protocols.",
        "During the data center migration, specialists reconfigured the virtual private cloud networking architecture to guarantee zero downtime.",
        "Candidates applying for the senior IT manager position must demonstrate deep expertise in enterprise networking, routing protocols, and firewall management."
      ],
      "conversation": [
        "\"Why are remote employees experiencing high latency when accessing the internal file server?\" \"The bottleneck is in our branch office networking uplink; we need to upgrade our bandwidth subscription.\"",
        "\"Is the new office building ready for staff relocation next Monday?\" \"All structured cabling and networking hardware installation finished yesterday, and port testing passed successfully.\""
      ],
      "collocations": [
        "network infrastructure",
        "networking protocols",
        "enterprise networking",
        "cloud networking",
        "networking hardware",
        "networking security"
      ]
    },
    "wordFamily": {
      "noun": "networking, networker, network",
      "verb": "network",
      "adjective": "networked",
      "adverb": "networkingly"
    },
    "visual": {
      "imageKeyword": "server rack patch panel fiber optic cables enterprise networking",
      "imageDescription": "A close-up view of an enterprise server rack patch panel with neatly organized blue and yellow ethernet cables connected to high-speed managed network switches.",
      "mnemonic": "NET-WORKING: Imagine a net made of cords working together to catch and pass data packets between computers!"
    },
    "video": {
      "description": "An enterprise IT training video explaining the core principles of local area network (LAN) routing, VLAN configuration, and switch management."
    },
    "toeicContext": {
      "commonParts": [
        5,
        6,
        7
      ],
      "exampleQuestion": "The company hired an external consultant to evaluate the existing _____ infrastructure and recommend improvements for inter-office data security. (A) networking (B) networker (C) networked (D) networkly",
      "tips": "In TOEIC Part 5, noun adjuncts modifying 'infrastructure' ('networking infrastructure') test vocabulary and collocation. 'Networking' is the standard gerund noun used in professional IT terminology."
    },
    "synonyms": [
      "network communication",
      "data communications",
      "system interconnection",
      "network administration",
      "telecommunications"
    ],
    "antonyms": [
      "standalone configuration",
      "offline isolation",
      "air-gapping"
    ],
    "relatedWords": [
      "router",
      "switch",
      "LAN",
      "WAN",
      "protocol",
      "bandwidth",
      "firewall"
    ]
  }
]

output = {
    "words": words
}

with open("/media/nhuongnn/New Volume/Development/Source_code/toeic-vocab-mastery/scratch/verified_tech_225_227.json", "w", encoding="utf-8") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

print("Successfully generated verified_tech_225_227.json")
