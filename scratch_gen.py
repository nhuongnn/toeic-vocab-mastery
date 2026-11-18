import json
import sys

words = [
    {
        "id": "tech-267",
        "word": "resource",
        "partOfSpeech": ["noun"],
        "category": "technology",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈriːsɔːrs/",
            "syllableBreakdown": "re-source",
            "stressPattern": "Primary stress on the first syllable (RE-source)",
            "commonMistakes": "Misplacing stress on the second syllable (/rɪˈsɔːrs/) or mispronouncing the vowel sound in the first syllable.",
            "audioUrl": "/audio/resource.mp3"
        },
        "etymology": {
            "origin": "Middle French 'ressource', from Old French 'ressourdre' (to rise again), from Latin 'resurgere'",
            "rootWord": "re- (again) + surgere (to rise)",
            "rootMeaning": "To rise again or spring back; a source of aid or recovery",
            "evolution": "Shifted from meaning a means of recovery or relief in the 17th century to general supplies, assets, and computational capacities in modern business and technology.",
            "relatedLanguages": ["French (ressource)", "Spanish (recurso)", "Italian (risorsa)"],
            "firstRecordedUse": "17th century in English administrative and literary texts."
        },
        "deepMeaning": {
            "coreConcept": "A computational, infrastructural, or personnel asset (such as CPU cycles, memory allocation, bandwidth, or storage capacity) available within a computer system or network to execute tasks and processes.",
            "spatialContext": "Enterprise server rooms, cloud infrastructure dashboards (AWS/Azure), virtualization hypervisors, and software development workstations.",
            "temporalContext": "Allocated dynamically during runtime, monitored continuously via performance metrics, and provisioned during infrastructure scaling operations.",
            "emotionalTone": "neutral",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "IT engineers and systems architects view resources as finite quantities that must be carefully budgeted, monitored, and scaled to prevent system bottlenecks and performance degradation.",
            "mentalImage": "A cloud monitoring dashboard displaying real-time CPU utilization graphs, memory allocation meters, and network bandwidth spikes across a cluster of virtual machines.",
            "whenToUse": "When discussing hardware capacity, cloud infrastructure allocation, software optimization, or system limitations.",
            "whenNotToUse": "Do not use when referring exclusively to human personnel without technical context (prefer 'human resources' or 'team members').",
            "culturalContext": "Ubiquitous term in modern IT governance, cloud computing cost optimization (FinOps), and enterprise capacity planning."
        },
        "examples": {
            "daily": [
                "Running multiple virtual machines on your laptop will quickly consume system resources.",
                "The application was designed to use minimal memory resources on mobile devices.",
                "Checking available disk resources before starting the file transfer is recommended."
            ],
            "business": [
                "The IT department optimized server configurations to reduce cloud computing resource costs by twenty percent.",
                "Network administrators monitor database resource utilization to prevent unexpected query timeouts during peak hours.",
                "Automated scaling policies ensure that additional computing resources are provisioned when traffic surges."
            ],
            "conversation": [
                "Colleague A: 'Why is the deployment script running so slowly today?'",
                "Colleague B: 'The CI/CD runner is starved for memory resources because of concurrent builds.'"
            ],
            "collocations": [
                "system resources",
                "compute resources",
                "allocate resources",
                "resource utilization",
                "hardware resources",
                "resource exhaustion"
            ]
        },
        "wordFamily": {
            "noun": "resource",
            "verb": "resource",
            "adjective": "resourceful",
            "adverb": "resourcefully"
        },
        "visual": {
            "imageKeyword": "cloud infrastructure monitoring dashboard cpu memory utilization graphs",
            "imageDescription": "An enterprise IT dashboard displaying colorful real-time charts of CPU load, RAM usage, and network traffic across distributed server clusters.",
            "mnemonic": "Think of 're-' (again) and 'source' (origin)—a dependable origin you can draw upon repeatedly."
        },
        "video": {
            "description": "An architectural walkthrough demonstrating how cloud resource allocation and auto-scaling groups manage variable workloads."
        },
        "toeicContext": {
            "commonParts": [5, 6, 7],
            "exampleQuestion": "To handle the anticipated surge in online transactions during the holiday season, the engineering team decided to provision additional cloud computing -------.",
            "tips": "In TOEIC business and technology contexts, 'resources' frequently collocates with verbs like 'allocate', 'manage', 'conserve', or adjectives like 'available' and 'limited'."
        },
        "synonyms": [
            "asset",
            "capacity",
            "supply",
            "facility",
            "utility"
        ],
        "antonyms": [],
        "relatedWords": [
            "allocation",
            "infrastructure",
            "bandwidth",
            "utilization",
            "virtualization",
            "scalability"
        ]
    },
    {
        "id": "tech-268",
        "word": "response",
        "partOfSpeech": ["noun"],
        "category": "technology",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/rɪˈspɑːns/",
            "syllableBreakdown": "re-sponse",
            "stressPattern": "Primary stress on the second syllable (re-SPONSE)",
            "commonMistakes": "Misplacing stress on the first syllable (RE-sponse) or mispronouncing the vowel sound in the second syllable.",
            "audioUrl": "/audio/response.mp3"
        },
        "etymology": {
            "origin": "Middle English 'respons', from Latin 'responsum' (an answer), past participle of 'respondere'",
            "rootWord": "re- (back) + spondere (to pledge or promise)",
            "rootMeaning": "To pledge back in return; an answer or reaction",
            "evolution": "Evolved from a religious or legal reply into general answers, and in computing, the data returned by a server or API following a client request.",
            "relatedLanguages": ["French (réponse)", "Spanish (respuesta)", "Italian (risposta)"],
            "firstRecordedUse": "14th century in Middle English legal and theological texts."
        },
        "deepMeaning": {
            "coreConcept": "A data payload, status code, or acknowledgement returned by a server, API endpoint, or software routine in reaction to a client request.",
            "spatialContext": "API testing tools (Postman), web browser developer console network tabs, backend server logs, and microservices communication channels.",
            "temporalContext": "Generated within milliseconds of receiving a request packet, measured via latency metrics during API calls.",
            "emotionalTone": "neutral",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Software developers instantly associate 'response' with HTTP status codes (200 OK, 404 Not Found, 500 Internal Error), JSON payloads, and API latency testing.",
            "mentalImage": "An API client interface showing a successful HTTP 200 OK response header and a formatted JSON body containing requested user records.",
            "whenToUse": "When discussing API design, network communication, server-client interactions, or application error handling.",
            "whenNotToUse": "Do not use when referring to human conversation replies without technical or systemic context (where 'reply' or 'answer' is preferred).",
            "culturalContext": "Core concept in modern web architecture, RESTful API design, and asynchronous event-driven programming."
        },
        "examples": {
            "daily": [
                "The web server returned a 404 error response when the image file could not be found.",
                "Checking the API response payload helped identify the missing JSON parameter.",
                "Network latency caused a noticeable delay in the server's response time."
            ],
            "business": [
                "The payment gateway API provided an encrypted JSON response confirming the successful credit card transaction.",
                "Developers analyzed server log files to diagnose why the database query response was abnormally slow.",
                "Automated integration tests verify that every API endpoint returns the expected status code and data response."
            ],
            "conversation": [
                "Colleague A: 'Why is the frontend failing to render user data?'",
                "Colleague B: 'The backend API response is missing the required nested object in the JSON schema.'"
            ],
            "collocations": [
                "API response",
                "server response",
                "response time",
                "HTTP response",
                "JSON response",
                "response payload"
            ]
        },
        "wordFamily": {
            "noun": "response",
            "verb": "respond",
            "adjective": "responsive",
            "adverb": "responsively"
        },
        "visual": {
            "imageKeyword": "api testing tool postman json response body http status code",
            "imageDescription": "A software developer's screen showing an API testing client displaying an HTTP 200 OK status and structured JSON response data.",
            "mnemonic": "Think of a 'sponsor' answering back—re-sponse is what comes back when you make a request."
        },
        "video": {
            "description": "A tutorial explaining how to inspect HTTP request and response headers using browser developer tools."
        },
        "toeicContext": {
            "commonParts": [5, 6, 7],
            "exampleQuestion": "Clients integrating our payment gateway must ensure their applications can handle an asynchronous JSON ------- within five seconds of submission.",
            "tips": "In TOEIC business English and technical contexts, 'response' frequently pairs with adjectives like 'prompt', 'favorable', or 'automated', and prepositional phrases like 'in response to'."
        },
        "synonyms": [
            "reply",
            "answer",
            "acknowledgement",
            "reaction",
            "feedback"
        ],
        "antonyms": [
            "request",
            "query"
        ],
        "relatedWords": [
            "request",
            "payload",
            "latency",
            "endpoint",
            "status code",
            "callback"
        ]
    },
    {
        "id": "tech-269",
        "word": "restore",
        "partOfSpeech": ["noun"],
        "category": "technology",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/rɪˈstɔːr/",
            "syllableBreakdown": "re-store",
            "stressPattern": "Primary stress on the second syllable (re-STORE)",
            "commonMistakes": "Misplacing stress on the first syllable (RE-store) or confusing the noun usage with the verb form in compound expressions.",
            "audioUrl": "/audio/restore.mp3"
        },
        "etymology": {
            "origin": "Middle English 'restoren', from Old French 'restorer', from Latin 'restaurare' (to rebuild, renew)",
            "rootWord": "re- (again) + -staurare (to set up or build)",
            "rootMeaning": "To set up again, rebuild, or reinstate to a former condition",
            "evolution": "Transitioned from physical restoration of buildings and artifacts to data recovery and system state reinstatement in computing.",
            "relatedLanguages": ["French (restaurer)", "Spanish (restaurar)", "Italian (restaurare)"],
            "firstRecordedUse": "14th century in Middle English records."
        },
        "deepMeaning": {
            "coreConcept": "The process or action of recovering a database, file system, or application state from a backup archive following data corruption, hardware failure, or accidental deletion.",
            "spatialContext": "Disaster recovery data centers, database administration consoles, backup management software, and cloud storage recovery portals.",
            "temporalContext": "Executed during scheduled disaster recovery drills, system migration procedures, or emergency incident remediation.",
            "emotionalTone": "neutral",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Database administrators and DevOps engineers view a 'restore' operation as their ultimate safety net—a critical procedure that validates the integrity of backup archives and ensures business continuity.",
            "mentalImage": "An enterprise backup management console displaying a progress bar indicating the successful database restore from an encrypted snapshot.",
            "whenToUse": "When discussing data recovery procedures, backup verification, system disaster recovery, or reverting system states.",
            "whenNotToUse": "Do not use when referring to physical furniture or building repairs in casual contexts (where 'restoration' is standard).",
            "culturalContext": "Cornerstone of IT disaster recovery planning, data governance, and cybersecurity incident response frameworks."
        },
        "examples": {
            "daily": [
                "Performing a nightly system restore ensures that accidentally deleted files can be recovered.",
                "The database restore completed successfully without any data loss.",
                "Testing the system restore procedure is mandatory before any major software upgrade."
            ],
            "business": [
                "Following the hardware failure, the database administrator initiated an emergency server restore from the cloud backup archive.",
                "Compliance regulations require organizations to conduct quarterly disaster recovery restore drills to verify backup reliability.",
                "The backup and restore utility successfully recovered all corrupted transaction logs within thirty minutes."
            ],
            "conversation": [
                "Colleague A: 'Are our nightly database backups verified regularly?'",
                "Colleague B: 'Yes, we perform a test restore every month in our staging environment to ensure data integrity.'"
            ],
            "collocations": [
                "backup and restore",
                "system restore",
                "database restore",
                "perform a restore",
                "restore point",
                "emergency restore"
            ]
        },
        "wordFamily": {
            "noun": "restore",
            "verb": "restore",
            "adjective": "restorative",
            "adverb": "restoratively"
        },
        "visual": {
            "imageKeyword": "database backup recovery console progress bar enterprise server",
            "imageDescription": "A technical interface showing a database backup and restore management panel with active recovery logs and completion status indicators.",
            "mnemonic": "Think of 're-' (again) + 'store' (warehouse)—putting stored data back where it belongs."
        },
        "video": {
            "description": "An IT administration tutorial demonstrating how to perform a point-in-time database restore from cloud backup snapshots."
        },
        "toeicContext": {
            "commonParts": [5, 6, 7],
            "exampleQuestion": "In the event of a catastrophic server failure, IT staff must be prepared to execute a complete data ------- within the established recovery time objective.",
            "tips": "In TOEIC business and IT contexts, 'restore' frequently appears alongside 'backup' in compound phrasing ('backup and restore') or modified by adjectives like 'full', 'partial', or 'automated'."
        },
        "synonyms": [
            "recovery",
            "reinstatement",
            "retrieval",
            "reconstruction",
            "renewal"
        ],
        "antonyms": [
            "backup",
            "deletion",
            "wipe"
        ],
        "relatedWords": [
            "backup",
            "recovery",
            "snapshot",
            "archive",
            "disaster recovery",
            "data integrity"
        ]
    }
]

print("Successfully structured words:", len(words))
with open("result.json", "w") as f:
    json.dump({"words": words}, f, indent=2)
