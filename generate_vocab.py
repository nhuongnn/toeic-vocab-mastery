import json

words = [
    {
        "id": "marketing-071",
        "word": "automated marketing",
        "partOfSpeech": ["noun"],
        "category": "marketing",
        "level": "advanced",
        "toeicFrequency": 7,
        "pronunciation": {
            "ipa": "/ˈɔːtəmeɪtɪd ˈmɑːrkɪtɪŋ/",
            "syllableBreakdown": "au-to-mat-ed mar-ket-ing",
            "stressPattern": "Primary stress on the first syllable of 'automated' (/ˈɔː/) and primary stress on the first syllable of 'marketing' (/ˈmɑːr/).",
            "commonMistakes": "Mispronouncing 'automated' as /ɔːtəˈmeɪtɪd/ instead of /ˈɔːtəmeɪtɪd/, or dropping the 't' sound in marketing.",
            "audioUrl": ""
        },
        "etymology": {
            "origin": "Modern compound from Greek 'autōmatos' (self-acting) and Latin 'mercatus' (trade/market).",
            "rootWord": "automate + marketing",
            "rootMeaning": "Self-operating commercial promotion and customer engagement.",
            "evolution": "Emerged in the late 20th century with the rise of CRM software, email sequencing platforms, and programmatic advertising.",
            "relatedLanguages": ["Greek", "Latin", "French"],
            "firstRecordedUse": "Late 1990s during the advent of digital CRM and enterprise software."
        },
        "deepMeaning": {
            "coreConcept": "The use of software platforms and technology to execute, manage, and optimize repetitive marketing tasks, workflows, and multi-channel customer campaigns across email, social media, and web interactions without manual intervention.",
            "spatialContext": "Digital corporate marketing departments, enterprise CRM dashboards, cloud-based marketing automation platforms.",
            "temporalContext": "Continuous 24/7 background operation triggered by user behaviors, lead scores, or scheduled calendar sequences.",
            "emotionalTone": "neutral",
            "formalityLevel": "formal",
            "connotation": "positive"
        },
        "nativeMindset": {
            "culturalContext": "Regarded as a cornerstone of modern scalable business operations, enabling companies to nurture leads efficiently and personalize outreach at massive enterprise scale.",
            "howNativesThink": "Native business professionals view automated marketing as a strategic asset that replaces manual grunt work with data-driven trigger workflows.",
            "mentalImage": "A multi-node digital workflow flowchart on a sleek curved monitor showing customer emails triggering based on website clicks and purchase history.",
            "whenToUse": "When discussing software-driven lead nurturing, drip campaigns, customer segmentation, and scalable digital advertising workflows.",
            "whenNotToUse": "When referring to physical retail merchandising or spontaneous, one-off creative brainstorming sessions."
        },
        "examples": {
            "daily": [
                "Our online store uses automated marketing to send personalized birthday discounts to registered subscribers.",
                "She set up an automated marketing sequence to welcome new subscribers over a two-week period.",
                "Small business owners often adopt automated marketing to save hours on weekly customer follow-ups."
            ],
            "business": [
                "The corporate marketing team integrated automated marketing workflows into their CRM to track lead scoring effectively.",
                "By implementing automated marketing, the enterprise increased its customer retention rate by twenty-five percent last quarter.",
                "The VP of Marketing presented the new automated marketing strategy during the annual board review."
            ],
            "conversation": [
                "Colleague A: 'Are we still sending those onboarding emails manually?' | Colleague B: 'Not anymore; we transitioned the entire onboarding sequence to automated marketing last month.'",
                "Client: 'How do you manage follow-ups with thousands of webinar attendees?' | Consultant: 'We rely on automated marketing triggers that segment attendees based on their engagement level.'"
            ],
            "collocations": [
                "automated marketing campaign",
                "automated marketing platform",
                "automated marketing software",
                "automated marketing workflow",
                "automated marketing strategy",
                "automated marketing tool"
            ]
        },
        "wordFamily": {
            "noun": "automated marketing",
            "verb": "automate marketing",
            "adjective": "automated",
            "adverb": "automatically"
        },
        "visual": {
            "imageKeyword": "marketing automation dashboard software workflow",
            "imageDescription": "A modern computer screen displaying a complex marketing automation workflow diagram with interconnected nodes, customer journey funnels, and analytics graphs in a bright corporate office.",
            "mnemonic": "Think of 'auto' driving your 'marketing' car through a pre-programmed digital roadmap."
        },
        "video": {
            "description": "An educational walkthrough demonstrating how enterprise CRM software triggers multi-channel marketing workflows based on user click behavior."
        },
        "toeicContext": {
            "commonParts": [5, 6, 7],
            "exampleQuestion": "To streamline lead generation and improve customer retention, the department decided to invest in a comprehensive ________ marketing platform.",
            "tips": "In TOEIC Part 5 vocabulary questions, look for noun modifiers and collocating adjectives. Here, 'automated' correctly describes a software-driven marketing platform."
        },
        "synonyms": [
            "marketing automation",
            "programmatic marketing",
            "digital marketing automation",
            "automated campaign management"
        ],
        "antonyms": [
            "manual marketing",
            "traditional outreach"
        ],
        "relatedWords": [
            "CRM software",
            "lead nurturing",
            "email campaign",
            "customer segmentation",
            "conversion funnel",
            "data analytics"
        ]
    },
    {
        "id": "marketing-072",
        "word": "avatar",
        "partOfSpeech": ["noun"],
        "category": "marketing",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/ˈævətɑːr/",
            "syllableBreakdown": "av-a-tar",
            "stressPattern": "Primary stress on the first syllable (/ˈæ/).",
            "commonMistakes": "Mispronouncing the middle syllable as /əˈvætər/ or misplacing stress on the final syllable.",
            "audioUrl": ""
        },
        "etymology": {
            "origin": "Sanskrit 'avatāra' (descent of a deity to earth), entering English via Hindu mythology and later adopted by computer science and digital marketing.",
            "rootWord": "avatāra",
            "rootMeaning": "Descent / embodiment.",
            "evolution": "Shifted from religious iconography representing Hindu gods to science fiction virtual characters, then to user profile icons in computing, and finally to detailed buyer personas in marketing.",
            "relatedLanguages": ["Sanskrit", "Hindi", "English"],
            "firstRecordedUse": "18th century in religious contexts; 1980s in computing and gaming; 2000s in digital marketing."
        },
        "deepMeaning": {
            "coreConcept": "In marketing, a semi-fictional, detailed representation of an ideal customer based on market research and real data, encompassing demographics, psychographics, pain points, and buying behaviors.",
            "spatialContext": "Marketing strategy decks, brand positioning workshops, product development meetings, and UX design studios.",
            "temporalContext": "Constantly referenced during campaign planning, copywriting sessions, and audience segmentation reviews.",
            "emotionalTone": "neutral",
            "formalityLevel": "neutral",
            "connotation": "positive"
        },
        "nativeMindset": {
            "culturalContext": "Extensively used in agile product development and digital marketing to ensure cross-functional teams maintain a human-centric focus on end-users.",
            "howNativesThink": "Professionals personify target audiences into specific avatars to make abstract market data tangible and guide empathetic messaging.",
            "mentalImage": "A corkboard in a creative agency featuring a printed profile photo of a fictional customer surrounded by sticky notes detailing their daily frustrations and purchasing goals.",
            "whenToUse": "When defining target customer profiles, developing user personas, or tailoring ad copy to specific audience segments.",
            "whenNotToUse": "When referring to physical corporate leadership roles or actual human employees."
        },
        "examples": {
            "daily": [
                "Before designing the website, the team created a detailed customer avatar to understand user preferences.",
                "She named her primary target avatar 'Eco-conscious Emma' to guide her sustainable product line.",
                "The instructor asked every student in the marketing workshop to sketch their ideal consumer avatar."
            ],
            "business": [
                "Our marketing campaign failed to resonate because our initial avatar did not reflect actual buyer pain points.",
                "Product managers must align their feature roadmap with the core needs of our primary customer avatar.",
                "During the strategy meeting, the analyst presented updated demographic data to refine our buyer avatar."
            ],
            "conversation": [
                "Colleague A: 'Should we target young professionals or college students with this ad?' | Colleague B: 'Let us check our primary buyer avatar; the data clearly points toward mid-career managers.'",
                "Designer: 'Does this landing page design appeal to our user avatar?' | Marketer: 'Yes, the tone and layout match her exact search habits.'"
            ],
            "collocations": [
                "customer avatar",
                "buyer avatar",
                "user avatar",
                "ideal customer avatar",
                "target avatar",
                "audience avatar"
            ]
        },
        "wordFamily": {
            "noun": "avatar",
            "verb": "personify",
            "adjective": "avatar-based",
            "adverb": "personally"
        },
        "visual": {
            "imageKeyword": "buyer persona avatar marketing workshop",
            "imageDescription": "A collaborative strategy session where marketing professionals point to a whiteboard displaying customer avatar profiles, demographic charts, and sticky notes.",
            "mnemonic": "Think of an 'avatar' as a visible embodiment of your ideal customer walking into the room."
        },
        "video": {
            "description": "A tutorial showing how marketers build data-backed buyer avatars to improve conversion rates in digital advertising campaigns."
        },
        "toeicContext": {
            "commonParts": [3, 7],
            "exampleQuestion": "To ensure the advertising copy resonates with the target demographic, the marketing director insisted on reviewing the updated customer ________ before launch.",
            "tips": "In TOEIC business contexts, 'avatar' refers to a buyer persona or customer profile used in strategic planning."
        },
        "synonyms": [
            "buyer persona",
            "customer profile",
            "target persona",
            "user archetype"
        ],
        "antonyms": [],
        "relatedWords": [
            "target audience",
            "demographics",
            "psychographics",
            "buyer persona",
            "market research",
            "customer journey"
        ]
    },
    {
        "id": "marketing-073",
        "word": "awareness campaign",
        "partOfSpeech": ["noun"],
        "category": "marketing",
        "level": "advanced",
        "toeicFrequency": 7,
        "pronunciation": {
            "ipa": "/əˈwɛrnəs kæmˈpeɪn/",
            "syllableBreakdown": "a-ware-ness cam-paign",
            "stressPattern": "Primary stress on the second syllable of awareness (/ˈwɛər/) and second syllable of campaign (/ˈpeɪn/).",
            "commonMistakes": "Mispronouncing 'awareness' with an incorrect vowel sound or mispronouncing 'campaign' by pronouncing the silent 'g'.",
            "audioUrl": ""
        },
        "etymology": {
            "origin": "Combination of Middle English 'awar' (conscious) + suffix '-ness', paired with French 'campaign' (open field / military operation).",
            "rootWord": "aware + campaign",
            "rootMeaning": "A concerted series of promotional operations designed to make the public conscious of a brand or issue.",
            "evolution": "Evolved from military campaign terminology into public relations and commercial advertising vernacular in the 20th century.",
            "relatedLanguages": ["Old English", "French", "Latin"],
            "firstRecordedUse": "Mid-20th century in public health and corporate advertising."
        },
        "deepMeaning": {
            "coreConcept": "A coordinated marketing initiative utilizing multi-channel advertising, public relations, and social media to educate the public, increase brand recognition, or highlight a specific cause without necessarily driving immediate sales transactions.",
            "spatialContext": "Corporate boardrooms, advertising agency conference rooms, public relations firms, digital media channels.",
            "temporalContext": "Typically executed over a fixed multi-week or multi-month period during product launches, rebranding efforts, or corporate social responsibility drives.",
            "emotionalTone": "neutral",
            "formalityLevel": "formal",
            "connotation": "positive"
        },
        "nativeMindset": {
            "culturalContext": "Recognized as a vital top-of-funnel strategy necessary before attempting direct sales conversion, especially for new market entrants.",
            "howNativesThink": "Professionals view awareness campaigns as brand-building investments that prioritize reach, impressions, and public sentiment over short-term revenue returns.",
            "mentalImage": "A Times Square digital billboard flashing a vibrant new corporate brand logo alongside transit shelter posters and online video ads.",
            "whenToUse": "When discussing top-of-funnel marketing strategies, brand visibility initiatives, public education drives, and product launches.",
            "whenNotToUse": "When referring to direct-response sales promotions or transactional discount events intended for immediate checkout."
        },
        "examples": {
            "daily": [
                "The local community launched an awareness campaign to promote recycling and reduce plastic waste.",
                "She watched a television commercial that was part of a national health awareness campaign.",
                "The non-profit organization relied on social media to run its annual fundraising awareness campaign."
            ],
            "business": [
                "The tech startup allocated forty percent of its annual marketing budget to a global brand awareness campaign.",
                "Senior leadership evaluated the success of the awareness campaign by measuring social media reach and earned media value.",
                "Our public relations department partnered with key influencers to amplify the new product awareness campaign."
            ],
            "conversation": [
                "Colleague A: 'Are we expecting direct sales from this new billboard placement?' | Colleague B: 'No, this is strictly a top-of-funnel awareness campaign to introduce our logo to commuters.'",
                "Director: 'How will we measure the ROI of this initiative?' | Manager: 'We are tracking brand lift and website traffic generated by the awareness campaign.'"
            ],
            "collocations": [
                "brand awareness campaign",
                "global awareness campaign",
                "public awareness campaign",
                "launch an awareness campaign",
                "social awareness campaign",
                "run an awareness campaign"
            ]
        },
        "wordFamily": {
            "noun": "awareness campaign",
            "verb": "campaign for awareness",
            "adjective": "awareness-building",
            "adverb": "awakenings"
        },
        "visual": {
            "imageKeyword": "brand awareness campaign billboard digital advertising",
            "imageDescription": "A bustling city street at dusk featuring large digital billboards and transit displays showcasing a vibrant corporate brand awareness campaign.",
            "mnemonic": "Think of making people 'aware' (awake and conscious) through a coordinated military-style 'campaign'."
        },
        "video": {
            "description": "A case study analysis of how a major consumer brand executed a multi-channel awareness campaign across social media and outdoor media."
        },
        "toeicContext": {
            "commonParts": [3, 7],
            "exampleQuestion": "To introduce their eco-friendly product line to international markets, the executive committee approved a multi-million dollar brand ________ campaign.",
            "tips": "In TOEIC Reading and Listening parts, 'awareness campaign' frequently appears in corporate contexts regarding marketing budgets and product introductions."
        },
        "synonyms": [
            "brand awareness initiative",
            "promotional campaign",
            "publicity drive",
            "brand visibility campaign"
        ],
        "antonyms": [
            "direct-response marketing",
            "direct sales"
        ],
        "relatedWords": [
            "brand recognition",
            "top-of-funnel",
            "public relations",
            "impressions",
            "reach",
            "marketing budget"
        ]
    }
]

print(json.dumps(words, indent=2))
