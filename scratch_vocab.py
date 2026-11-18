import json

words_data = [
    {
        "id": "realestate-227",
        "word": "sublet",
        "partOfSpeech": ["noun"],
        "category": "real-estate",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/ˈsʌb.lɛt/",
            "syllableBreakdown": "sub-let",
            "stressPattern": "Primary stress on the first syllable ('sub-).",
            "commonMistakes": "Mispronouncing the 'u' as in 'boot' instead of 'cup' (/ˈsuːblɛt/), or misplacing the stress on the second syllable.",
            "audioUrl": ""
        },
        "etymology": {
            "origin": "English compounding of the prefix 'sub-' (under, beneath) + the verb/noun 'let' (to lease, rent, from Old English 'lætan').",
            "rootWord": "let",
            "rootMeaning": "to allow, lease, or rent out property.",
            "evolution": "Used in British and American real estate jurisprudence since the 18th century to describe the secondary leasing of property by a tenant to a third party.",
            "relatedLanguages": ["Old English (lætan)", "Latin (sub-)"],
            "firstRecordedUse": "1775-1785"
        },
        "deepMeaning": {
            "coreConcept": "An arrangement in which a tenant leases rental property to another person for a portion of or the entirety of their lease term, while remaining ultimately liable to the primary landlord.",
            "spatialContext": "Residential apartments, commercial office suites, and retail storefronts in urban leasing markets.",
            "temporalContext": "Occurs temporarily when tenants relocate for work, take extended leaves, or seek to offset lease liabilities during vacancies.",
            "emotionalTone": "neutral",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Viewed as a convenient financial strategy to recover rent, but also as a legal arrangement requiring explicit landlord permission to avoid breach of lease.",
            "mentalImage": "A tenant handing over apartment keys and a signed secondary agreement to a new occupant while their own moving boxes sit in the hallway.",
            "whenToUse": "When discussing renting out an apartment you currently lease from a landlord to a subtenant.",
            "whenNotToUse": "Do not use 'sublet' when referring to a primary lease agreement directly between a property owner and a new occupant.",
            "culturalContext": "Common among university students during summer breaks and corporate professionals on temporary assignments in high-cost metropolitan areas like New York or London."
        },
        "examples": {
            "daily": [
                "She decided to list her furnished apartment as a sublet for the summer while she volunteered abroad.",
                "Finding a legal sublet in downtown Boston can be quite competitive during peak moving season.",
                "He checked his lease agreement carefully before advertising his room as a sublet online."
            ],
            "business": [
                "The corporate office manager evaluated potential candidates interested in taking over the remaining term of the warehouse sublet.",
                "Management must approve any commercial sublet in writing prior to tenant occupancy.",
                "The retail boutique operated under a sublet agreement with the primary anchor tenant of the shopping center."
            ],
            "conversation": [
                "Colleague A: 'Are you breaking your lease when you move to Chicago?' | Colleague B: 'No, I'm arranging a sublet for the last six months so I don't pay double rent.'",
                "Client A: 'Does our commercial contract permit a sublet if we downsize?' | Client B: 'Let's review the assignment and subletting clause with our legal counsel first.'"
            ],
            "collocations": [
                "illegal sublet",
                "sublet agreement",
                "short-term sublet",
                "approved sublet",
                "find a sublet"
            ]
        },
        "wordFamily": {
            "noun": "sublet / sublease / subtenant",
            "verb": "sublet",
            "adjective": "subtenant / sublettable",
            "adverb": "subletting"
        },
        "visual": {
            "imageKeyword": "apartment lease agreement keys",
            "imageDescription": "A close-up of a residential lease document resting on a wooden coffee table next to a set of brass apartment keys and a pen.",
            "mnemonic": "SUB ('under') + LET ('rent') = renting 'under' the main lease agreement."
        },
        "video": {
            "description": "A real estate attorney explaining the legal rights and liabilities involved in residential and commercial subletting agreements."
        },
        "toeicContext": {
            "commonParts": [5, 6, 7],
            "exampleQuestion": "Because the tenant was transferred overseas for six months, she decided to seek a temporary ______ for her downtown apartment.",
            "tips": "In TOEIC Part 5 vocabulary questions, look out for contextual cues like 'lease', 'tenant', or 'landlord' which frequently point to 'sublet' or 'lease'."
        },
        "synonyms": ["sublease", "secondary lease", "underlease"],
        "antonyms": ["primary lease", "freehold"],
        "relatedWords": ["tenant", "landlord", "lease", "rent", "occupant", "agreement"]
    },
    {
        "id": "realestate-228",
        "word": "survey",
        "partOfSpeech": ["noun"],
        "category": "real-estate",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/ˈsɜːr.veɪ/",
            "syllableBreakdown": "sur-vey",
            "stressPattern": "Primary stress on the first syllable ('sur-vey) as a noun.",
            "commonMistakes": "Pronouncing it with the stress on the second syllable (/sɜːrˈveɪ/), which is the verb form pronunciation.",
            "audioUrl": ""
        },
        "etymology": {
            "origin": "From Anglo-Norman 'surveier', Old French 'survoir' (to oversee), from Latin 'supervidere' (super- 'over' + videre 'to see').",
            "rootWord": "videre",
            "rootMeaning": "to see or inspect.",
            "evolution": "Shifted from general oversight and inspection in medieval administration to specific measurements of land boundaries and structural evaluations in real estate and engineering.",
            "relatedLanguages": ["French (surveiller)", "Latin (supervidere)"],
            "firstRecordedUse": "Early 15th century"
        },
        "deepMeaning": {
            "coreConcept": "A detailed inspection, measurement, or mapping of a property's boundaries, topography, and structural integrity conducted by a certified professional.",
            "spatialContext": "Land parcels, residential plots, commercial building sites, and civil engineering zones.",
            "temporalContext": "Conducted prior to property acquisition, construction, mortgage approval, or boundary dispute resolution.",
            "emotionalTone": "neutral",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Seen as an indispensable legal and technical document that guarantees property lines and uncovers hidden structural or territorial defects before financial commitment.",
            "mentalImage": "A land surveyor looking through a yellow theodolite mounted on a tripod in an overgrown grassy lot while holding a leveling rod.",
            "whenToUse": "When referring to a professional land measurement or property inspection document.",
            "whenNotToUse": "Do not use 'survey' when referring to a customer feedback questionnaire if discussing real estate property boundaries.",
            "culturalContext": "Mandatory requirement in real estate transactions across North America and Europe to secure title insurance and mortgage financing."
        },
        "examples": {
            "daily": [
                "The homebuyer requested a comprehensive land survey before finalizing the purchase of the suburban property.",
                "According to the latest boundary survey, the old wooden fence actually encroached upon the neighbor's driveway.",
                "They reviewed the architectural survey to understand the exact elevation of the backyard."
            ],
            "business": [
                "The commercial real estate developer commissioned an environmental site survey prior to acquiring the industrial park.",
                "Bank underwriters required an updated property survey to verify land dimensions before releasing mortgage funds.",
                "The civil engineering firm completed the topographical survey ahead of the upcoming municipal construction project."
            ],
            "conversation": [
                "Client A: 'Do we need a new land survey for this real estate transaction?' | Client B: 'Yes, the mortgage lender insists on an up-to-date survey certified by a licensed surveyor.'",
                "Colleague A: 'Where can I find the property boundaries?' | Colleague B: 'They are clearly marked in the official survey report filed with county records.'"
            ],
            "collocations": [
                "land survey",
                "property survey",
                "boundary survey",
                "topographical survey",
                "commission a survey"
            ]
        },
        "wordFamily": {
            "noun": "survey / surveyor / surveyance",
            "verb": "survey",
            "adjective": "surveyed",
            "adverb": "surveyor-like"
        },
        "visual": {
            "imageKeyword": "land surveyor theodolite tripod",
            "imageDescription": "A professional land surveyor operating a modern total station instrument on a tripod outdoors on a commercial construction site.",
            "mnemonic": "SUR ('over') + VEY ('see') = looking over and inspecting land from above."
        },
        "video": {
            "description": "A documentary clip demonstrating how professional land surveyors utilize laser equipment and GPS to map property boundaries accurately."
        },
        "toeicContext": {
            "commonParts": [5, 6, 7],
            "exampleQuestion": "Prior to closing the real estate transaction, the mortgage lender requested an official property ______ to confirm boundary lines.",
            "tips": "In TOEIC Part 5, noun endings like '-ey' or adjectives modifying property documents frequently test collocations like 'property survey' or 'market survey'."
        },
        "synonyms": ["inspection", "assessment", "appraisal", "mapping", "blueprint"],
        "antonyms": [],
        "relatedWords": ["surveyor", "boundary", "property", "deed", "title", "inspection"]
    },
    {
        "id": "realestate-229",
        "word": "surveyor",
        "partOfSpeech": ["noun"],
        "category": "real-estate",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/sərˈveɪ.ər/",
            "syllableBreakdown": "sur-vey-or",
            "stressPattern": "Primary stress on the second syllable ('vey).",
            "commonMistakes": "Placing primary stress on the first syllable (/ˈsɜːrveɪər/) or mispronouncing the suffix '-or' as /-ɔːr/ with excessive emphasis.",
            "audioUrl": ""
        },
        "etymology": {
            "origin": "Derived from Anglo-French 'surveieour', from 'surveier' (to survey) + agent noun suffix '-or' (Latin '-ator').",
            "rootWord": "survey",
            "rootMeaning": "to inspect or measure land.",
            "evolution": "Established in English legal and engineering terminology during the late Middle Ages to designate certified officials responsible for measuring land holdings and inspecting crown or private properties.",
            "relatedLanguages": ["Anglo-Norman (surveieour)", "Latin (supervidere)"],
            "firstRecordedUse": "Late 15th century"
        },
        "deepMeaning": {
            "coreConcept": "A certified professional qualified to measure land tracts, establish property boundaries, and inspect building structural conditions.",
            "spatialContext": "Active outdoor construction sites, municipal registries, architectural offices, and residential/commercial properties.",
            "temporalContext": "Employed during pre-purchase property inspections, major civil engineering projects, and urban planning developments.",
            "emotionalTone": "neutral",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Viewed as an expert authority whose technical measurements and official seals carry legal weight in real estate title and construction disputes.",
            "mentalImage": "A person wearing a high-visibility yellow vest and hard hat adjusting an optical surveying instrument on a tripod in a newly subdivided housing development.",
            "whenToUse": "When referring to the licensed professional who performs land or building surveys.",
            "whenNotToUse": "Do not use 'surveyor' when referring to participants who answer market research questionnaires.",
            "culturalContext": "Licensed professions strictly regulated by state or national boards of registration in the US, UK, and Australia."
        },
        "examples": {
            "daily": [
                "The surveyor staked out the property lines so the contractor knew exactly where to build the garden fence.",
                "We hired an independent building surveyor to inspect the foundation before purchasing the older suburban home.",
                "The town surveyor examined the historical map to resolve a long-standing boundary dispute."
            ],
            "business": [
                "The commercial real estate firm retained a senior land surveyor to evaluate the topographical layout of the industrial park.",
                "Insurance adjusters consulted a marine surveyor to assess the structural damage sustained by the commercial dock.",
                "The project manager coordinated closely with the chief surveyor to ensure foundation alignment met municipal codes."
            ],
            "conversation": [
                "Client A: 'When will the surveyor be finished measuring our lot?' | Client B: 'She should complete the boundary markers by this afternoon and send us the certified plat.'",
                "Colleague A: 'Did the surveyor find any major issues with the property?' | Colleague B: 'No, everything is within legal boundaries, though the drainage easement needs attention.'"
            ],
            "collocations": [
                "land surveyor",
                "building surveyor",
                "licensed surveyor",
                "quantity surveyor",
                "hire a surveyor"
            ]
        },
        "wordFamily": {
            "noun": "surveyor / survey / surveying",
            "verb": "survey",
            "adjective": "surveying",
            "adverb": "surveyor-like"
        },
        "visual": {
            "imageKeyword": "land surveyor hard hat tripod",
            "imageDescription": "A licensed land surveyor in a safety vest looking through a professional electronic total station on a city sidewalk.",
            "mnemonic": "SURVEY ('inspect/measure') + OR ('person who does') = a person who measures land and buildings."
        },
        "video": {
            "description": "An educational video showcasing a day in the life of a professional land surveyor using GPS rovers and total stations in the field."
        },
        "toeicContext": {
            "commonParts": [5, 6, 7],
            "exampleQuestion": "The commercial developer hired a certified land ______ to establish precise property boundaries before beginning construction.",
            "tips": "In TOEIC Part 5, look out for person suffixes like '-or' when the sentence requires a professional who performs a specific technical task."
        },
        "synonyms": ["inspector", "appraiser", "cartographer", "assessor"],
        "antonyms": [],
        "relatedWords": ["survey", "property", "boundary", "inspector", "architect", "engineer"]
    }
]

output_data = {"words": words_data}
with open("/media/nhuongnn/New Volume/Development/Source_code/toeic-vocab-mastery/scratch_vocab.json", "w") as f:
    json.dump(output_data, f, indent=2)

print("Successfully generated vocabulary JSON!")
