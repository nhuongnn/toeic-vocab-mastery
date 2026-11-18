import json

words = [
    {
        "id": "travel-104",
        "word": "compartment",
        "partOfSpeech": ["noun"],
        "category": "travel",
        "level": "advanced",
        "toeicFrequency": 7,
        "pronunciation": {
            "ipa": "/kəmˈpɑːrt.mənt/",
            "syllableBreakdown": "com-part-ment",
            "stressPattern": "Second syllable stress (kəm-PART-mənt)",
            "commonMistakes": "Mispronouncing as /kɒmˈpɑːrt.mənt/ with primary stress on the first syllable, or omitting the schwa in the final syllable.",
            "audioUrl": ""
        },
        "etymology": {
            "origin": "Late 16th century: from French compartiment, from Italian compartimento, from compartire 'to divide'.",
            "rootWord": "compartire",
            "rootMeaning": "to divide, partition",
            "evolution": "Derived from Latin com- (together) + partire (to divide). Entered English via French in the late 16th century initially relating to decorative partitioning or gardening, later expanding to architectural rooms, furniture, and transport vehicles.",
            "relatedLanguages": ["French", "Italian", "Spanish", "Latin"],
            "firstRecordedUse": "1590s"
        },
        "deepMeaning": {
            "coreConcept": "A separate section or space within a larger structure, vehicle, container, or piece of furniture, designed for specific storage or separation.",
            "spatialContext": "Railway passenger cars, overhead storage bins in commercial aircraft, shipping containers, glove compartments in automobiles, and office filing cabinets.",
            "temporalContext": "Encountered frequently during travel, logistics operations, and organizational activities when packing, inspecting, or retrieving items.",
            "emotionalTone": "neutral",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "culturalContext": "In Western travel and corporate culture, compartments represent organized space efficiency, particularly in trains (e.g., European sleeper or couchette compartments) and airline overhead lockers.",
            "howNativesThink": "Native speakers visualize a bounded, enclosed subdivision designed to keep items orderly, secure, or segregated from adjacent spaces.",
            "mentalImage": "The plush interior of an overnight European railway carriage featuring a sliding glass door, upholstered seats facing each other, and luggage racks above.",
            "whenNotToUse": "Do not use for an open area, unpartitioned room, or general open storage space without physical boundaries.",
            "whenToUse": "Use when describing partitioned sections in trains, planes, cars, bags, or structured storage containers."
        },
        "examples": {
            "daily": [
                "She placed her passport securely in the inner zipped compartment of her backpack.",
                "The train conductor checked tickets as we settled into our four-seat compartment.",
                "My car manual is tucked away in the glove compartment."
            ],
            "business": [
                "The cargo hold is divided into reinforced compartments for hazardous materials.",
                "Each luggage compartment must be fully secured before the aircraft departs from the gate.",
                "The logistics team inspected the storage compartment of the shipping container for moisture damage."
            ],
            "conversation": [
                "Colleague A: Did you manage to fit all the presentation samples in the overhead bin?\nColleague B: Yes, I placed them in the secure forward compartment of the carry-on.",
                "Traveler A: Is this a reserved compartment for our group?\nTraveler B: No, these seats are unreserved; the private compartments are further down the corridor."
            ],
            "collocations": [
                "overhead compartment",
                "storage compartment",
                "glove compartment",
                "passenger compartment",
                "secure compartment",
                "baggage compartment"
            ]
        },
        "wordFamily": {
            "noun": "compartment",
            "verb": "compartmentalize",
            "adjective": "compartmental",
            "adverb": "compartmentally"
        },
        "visual": {
            "imageKeyword": "train compartment interior luggage rack",
            "imageDescription": "A clean, modern railway train passenger compartment with cushioned seats, windows, and an overhead luggage rack.",
            "mnemonic": "Remember 'com-PART-ment': a part of a larger whole that has been partitioned off."
        },
        "video": {
            "description": "A travel documentary segment demonstrating how high-speed train sleeper compartments are configured and locked for overnight journeys."
        },
        "toeicContext": {
            "commonParts": [1, 3, 7],
            "exampleQuestion": "All passengers are kindly requested to ensure that their carry-on baggage is securely stowed in the overhead _______ before takeoff.",
            "tips": "In TOEIC Part 5 and 6, 'compartment' frequently collocates with 'overhead', 'storage', or 'cargo'. Watch for singular/plural agreement and prepositions like 'in' or 'into'."
        },
        "synonyms": ["section", "partition", "cubicle", "recess", "bunk", "bay"],
        "antonyms": ["open space", "entirety"],
        "relatedWords": ["bulkhead", "cabin", "luggage", "rack", "storage", "container", "partition"]
    },
    {
        "id": "travel-105",
        "word": "compass",
        "partOfSpeech": ["noun"],
        "category": "travel",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈkʌm.pəs/",
            "syllableBreakdown": "com-pass",
            "stressPattern": "First syllable stress (COM-pass)",
            "commonMistakes": "Pronouncing with an 'o' sound as in 'pot' rather than the short 'u' sound (/ʌ/), or misplacing stress on the second syllable.",
            "audioUrl": ""
        },
        "etymology": {
            "origin": "Middle English (in the sense 'circle, circuit'): from Old French compass (noun), compasser (verb), based on Latin com- 'together' + passus 'pace, step'.",
            "rootWord": "passus",
            "rootMeaning": "step, pace (measuring round)",
            "evolution": "Originally meant a circle or boundary, evolving through 'instrument for dividing/measuring circles' (drawing compasses) to the magnetic navigational instrument indicating cardinal directions.",
            "relatedLanguages": ["French", "Italian", "Spanish", "Latin"],
            "firstRecordedUse": "14th century"
        },
        "deepMeaning": {
            "coreConcept": "An instrument containing a magnetized pointer that shows the direction of magnetic north and bearings from it.",
            "spatialContext": "Hiking trails, maritime navigation bridges, aircraft cockpits, surveying sites, and outdoor expedition gear.",
            "temporalContext": "Used during navigation planning, orienteering, wilderness travel, and emergency maritime or aviation operations.",
            "emotionalTone": "neutral",
            "formalityLevel": "neutral",
            "connotation": "positive"
        },
        "nativeMindset": {
            "culturalContext": "Associated with exploration, outdoor adventure, reliability, and finding one's bearing when digital navigation tools fail.",
            "howNativesThink": "Native speakers view a compass as an indispensable, foolproof directional tool that relies on Earth's magnetic field rather than batteries.",
            "mentalImage": "A brass-cased pocket compass resting on a topographic map, its red needle pointing steadily toward magnetic north under bright sunlight.",
            "whenNotToUse": "Do not use when referring to mathematical drawing compasses without context, or electronic GPS receivers.",
            "whenToUse": "Use when discussing physical magnetic navigational instruments, directional orientation, or metaphorical guidance."
        },
        "examples": {
            "daily": [
                "Before setting off into the dense forest, she checked her compass and topographic map.",
                "The sailor relied on the ship's magnetic compass when the electronic navigation system malfunctioned.",
                "We used a compass to verify our heading before starting the mountain trek."
            ],
            "business": [
                "The logistics expedition team carried heavy-duty compasses and satellite communicators for remote surveying.",
                "In maritime logistics training, cadets must demonstrate proficiency in reading standard navigational compasses.",
                "The corporate strategy served as a moral compass for executive decision-making during the crisis."
            ],
            "conversation": [
                "Hiker A: Are you sure we are heading east?\nHiker B: According to my compass, we veered slightly north about twenty minutes ago.",
                "Navigator A: Is the digital backup synchronized with the magnetic compass?\nNavigator B: Yes, the calibration is verified and matches perfectly."
            ],
            "collocations": [
                "magnetic compass",
                "navigational compass",
                "pocket compass",
                "moral compass",
                "check the compass",
                "point north"
            ]
        },
        "wordFamily": {
            "noun": "compass",
            "verb": "compass",
            "adjective": "compassless",
            "adverb": "compasswise"
        },
        "visual": {
            "imageKeyword": "vintage brass compass on map",
            "imageDescription": "A classic brass pocket compass resting open on top of an old folded paper map with marked coordinates.",
            "mnemonic": "A compass helps you 'pass' through unfamiliar territory without getting lost."
        },
        "video": {
            "description": "An instructional tutorial demonstrating how to orient a baseplate compass with a topographic map for wilderness hiking."
        },
        "toeicContext": {
            "commonParts": [1, 7],
            "exampleQuestion": "When navigating through remote wilderness areas without cellular service, field researchers should always carry a reliable magnetic _______.",
            "tips": "In TOEIC listening (Part 1) or reading (Part 7), look out for context clues involving outdoor work, expeditions, or emergency safety equipment where 'compass' is tested alongside 'map' or 'GPS'."
        },
        "synonyms": ["direction finder", "needle", "guide", "orienting instrument"],
        "antonyms": [],
        "relatedWords": ["navigation", "map", "bearing", "latitude", "longitude", "gps", "orientation"]
    },
    {
        "id": "travel-106",
        "word": "concierge",
        "partOfSpeech": ["noun"],
        "category": "travel",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/kɒnˈsiːerʒ/",
            "syllableBreakdown": "con-ci-erge",
            "stressPattern": "Third syllable stress (con-ci-ERGE)",
            "commonMistakes": "Mispronouncing with a hard 'g' sound at the end instead of the French soft 'zh' (/ʒ/), or stressing the first syllable.",
            "audioUrl": ""
        },
        "etymology": {
            "origin": "French, from Old French concierge, probably from Late Latin conservius 'fellow slave' or Latin conservator 'preserver, warden'.",
            "rootWord": "conservator",
            "rootMeaning": "warden, keeper of a house",
            "evolution": "In medieval France, a concierge was a custodian or doorkeeper of a castle or public building. Over centuries, the role evolved into the head porter or guest service professional in luxury hotels and upscale residential buildings.",
            "relatedLanguages": ["French", "Latin"],
            "firstRecordedUse": "17th century in English (denoting a hotel or building porter)"
        },
        "deepMeaning": {
            "coreConcept": "An employee at a hotel, apartment building, or corporate facility who assists guests or residents with arrangements such as restaurant reservations, travel bookings, and event tickets.",
            "spatialContext": "Hotel lobbies, high-end residential reception desks, corporate concierge desks, and luxury cruise ships.",
            "temporalContext": "Interacted with throughout the day and evening by guests seeking local recommendations, transportation, or specialized services.",
            "emotionalTone": "positive",
            "formalityLevel": "formal",
            "connotation": "positive"
        },
        "nativeMindset": {
            "culturalContext": "Represents high-end hospitality, personalized service, local expertise, and seamless problem-solving in upscale travel and residential environments.",
            "howNativesThink": "Native speakers perceive the concierge as the ultimate insider who can secure hard-to-get reservations or solve travel emergencies with effortless grace.",
            "mentalImage": "An impeccably dressed hotel professional behind a sleek marble desk, handing theater tickets and a city map to a smiling guest.",
            "whenNotToUse": "Do not use for a standard check-in receptionist, front desk clerk handling bill payments, or security guard.",
            "whenToUse": "Use when referring to hospitality staff specializing in guest services, personalized bookings, recommendations, and special requests."
        },
        "examples": {
            "daily": [
                "The hotel concierge recommended an excellent Italian bistro just around the corner.",
                "We asked the concierge to book two tickets for the evening city tour.",
                "She tipped the concierge generously after he successfully recovered her lost luggage."
            ],
            "business": [
                "The luxury hotel employs a dedicated corporate concierge to assist business travelers with urgent courier services.",
                "Our conference attendees can utilize the hotel concierge desk for local transportation arrangements and dining reservations.",
                "The head concierge coordinated VIP airport transfers for all keynote speakers."
            ],
            "conversation": [
                "Guest: Good morning, could the concierge help me arrange a private car to the convention center?\nReceptionist: Certainly, I will connect you with our chief concierge right away.",
                "Client: Do you know if the concierge can secure reservations at a fully booked restaurant tonight?\nColleague: Yes, concierges often have direct partnerships with high-end local establishments."
            ],
            "collocations": [
                "hotel concierge",
                "concierge desk",
                "chief concierge",
                "concierge service",
                "ask the concierge",
                "residential concierge"
            ]
        },
        "wordFamily": {
            "noun": "concierge",
            "verb": "",
            "adjective": "concierge-level",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "hotel concierge desk smiling professional",
            "imageDescription": "A professional concierge in a smart suit standing behind a polished marble hotel reception desk, assisting a guest.",
            "mnemonic": "Remember 'concierge': someone who connects ('con-') you with premium services and experiences."
        },
        "video": {
            "description": "A hospitality training video showcasing professional communication skills and problem-solving techniques used by luxury hotel concierges."
        },
        "toeicContext": {
            "commonParts": [3, 4, 7],
            "exampleQuestion": "Guests requiring assistance with theater tickets, restaurant reservations, or local transportation are encouraged to speak with the hotel _______.",
            "tips": "In TOEIC listening (Parts 3 & 4) and reading (Part 7), 'concierge' appears frequently in dialogues and emails concerning hotel stays, customer service requests, and travel arrangements. Do not confuse with 'receptionist' or 'cashier'."
        },
        "synonyms": ["guest relations officer", "attendant", "porter", "host", "helper"],
        "antonyms": [],
        "relatedWords": ["hospitality", "hotel", "reception", "guest", "reservation", "service", "lobby"]
    }
]

print(json.dumps({"words": words}, indent=2))
