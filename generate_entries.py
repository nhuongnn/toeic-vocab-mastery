import json

words_data = [
    {
        "id": "travel-089",
        "word": "captain",
        "partOfSpeech": ["noun"],
        "category": "travel",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈkæptɪn/",
            "syllableBreakdown": "cap-tain",
            "stressPattern": "Primary stress on the first syllable (CAP-tain).",
            "commonMistakes": "Mispronouncing the unstressed second syllable as /-tæn/ or /teɪn/ instead of /-tɪn/."
        },
        "etymology": {
            "origin": "Latin / Old French / Late Latin",
            "rootWord": "capitellum / caput",
            "rootMeaning": "Head or leader",
            "evolution": "Derived from Late Latin 'capitaneus' (chief, principal), from Latin 'caput' (head), entering Middle English via Old French 'capitaine' in the 14th century to designate a military leader or ship master.",
            "relatedLanguages": ["French (capitaine)", "Spanish (capitán)", "Italian (capitano)", "German (Kapitän)"],
            "firstRecordedUse": "14th century"
        },
        "deepMeaning": {
            "coreConcept": "The person in ultimate command of a commercial aircraft, ship, or maritime vessel, responsible for navigation, safety, and crew management.",
            "spatialContext": "Aircraft flight decks (cockpits), airline briefing rooms, ship bridges, and maritime terminals.",
            "temporalContext": "Present throughout pre-flight or pre-voyage safety checks, en route operations, and post-trip debriefings.",
            "emotionalTone": "neutral",
            "formalityLevel": "formal",
            "connotation": "positive"
        },
        "nativeMindset": {
            "culturalContext": "Represents the highest level of authority, accountability, and operational safety in aviation and maritime transport.",
            "howNativesThink": "Viewed as the final decision-maker whose expertise and leadership ensure passenger security during transit.",
            "mentalImage": "An airline captain in full uniform conducting a pre-flight walkaround inspection on the flight deck alongside the first officer.",
            "whenToUse": "When discussing commercial flight operations, maritime navigation, leadership roles in transport, or flight crew hierarchy.",
            "whenNotToUse": "Do not use for sports team leaders unless referring specifically to sports team captains (though distinct from transport)."
        },
        "examples": {
            "daily": [
                "The captain welcomed passengers over the intercom and announced our cruising altitude of 36,000 feet.",
                "Severe turbulence prompted the captain to illuminate the seatbelt sign and request all cabin crew be seated.",
                "Passengers applauded when the captain executed a smooth landing despite heavy crosswinds."
            ],
            "business": [
                "Airlines mandate that the pilot in command, or captain, complete annual simulator proficiency training.",
                "The chief pilot oversees training programs to prepare senior first officers for promotion to captain.",
                "Maritime regulations require the ship captain to submit a detailed voyage log upon arrival at port."
            ],
            "conversation": [
                "Passenger: Excuse me, will we arrive in Tokyo on schedule? / Flight Attendant: The captain informed us that we made up time in the jet stream and will land ten minutes early.",
                "Airline Recruiter: What qualifications are required for upgrade to captain? / Pilot Applicant: A minimum of 4,000 flight hours and successful completion of our command assessment course."
            ]
        },
        "collocations": ["airline captain", "ship captain", "captain in command", "captain's announcement", "meet the captain"],
        "wordFamily": {
            "noun": "captain, captaincy",
            "verb": "captain",
            "adjective": "captainless",
            "adverb": "captainlike"
        },
        "visual": {
            "imageKeyword": "commercial airline captain flight deck cockpit",
            "imageDescription": "An airline captain in uniform reviewing flight plans on an electronic flight bag tablet inside a modern commercial aircraft cockpit.",
            "mnemonic": "A cap-tain wears a cap and leads the ship or plane as the main head (caput)."
        },
        "video": {
            "description": "A documentary segment showcasing commercial airline pilots conducting pre-flight checklists and coordinating with air traffic control."
        },
        "toeicContext": {
            "commonParts": [1, 3, 7],
            "exampleQuestion": "Before departure, the __________ conducted a comprehensive weather briefing with the first officer and flight dispatcher.",
            "tips": "In TOEIC listening and reading parts (especially Parts 1, 3, and 7), 'captain' frequently appears in travel, announcements, and personnel contexts. Look for collocating verbs like 'announce', 'command', and 'pilot'."
        },
        "synonyms": ["commander", "pilot in command", "master", "skipper", "lead pilot"],
        "antonyms": ["passenger", "crew member", "subordinate"],
        "relatedWords": ["flight deck", "co-pilot", "aviation", "crew", "navigation", "vessel", "airline"]
    },
    {
        "id": "travel-090",
        "word": "car rental",
        "partOfSpeech": ["noun"],
        "category": "travel",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈkɑːr ˈrɛntəl/",
            "syllableBreakdown": "car ren-tal",
            "stressPattern": "Primary stress on 'car' and the first syllable of 'rental' (CAR ren-tal).",
            "commonMistakes": "Pronouncing rental with stress on the second syllable or merging the words improperly."
        },
        "etymology": {
            "origin": "Germanic / Old North French / Latin",
            "rootWord": "carruca (cart/vehicle) + reddere (to yield/return)",
            "rootMeaning": "Temporary possession of a vehicle in exchange for payment",
            "evolution": "Formed by combining 'car' (Middle English from Old North French) and 'rental' (derived from 'rent', from Old French 'renter' and Latin 'reddere'). Grew exponentially with post-war tourism and business travel in the mid-20th century.",
            "relatedLanguages": ["French (location de voiture)", "Spanish (alquiler de autos)", "German (Autovermietung)"],
            "firstRecordedUse": "Early 20th century (automobile commercialization era)"
        },
        "deepMeaning": {
            "coreConcept": "A commercial service that provides automobiles for short-term use, typically ranging from a few hours to several weeks, to travelers and business professionals.",
            "spatialContext": "Airport terminal rental counters, downtown parking garages, transportation hubs, and online reservation portals.",
            "temporalContext": "Booked in advance of trips, picked up upon arrival at destinations, and returned at the end of business or leisure itineraries.",
            "emotionalTone": "neutral",
            "formalityLevel": "neutral",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "culturalContext": "An essential component of modern business travel and tourism infrastructure, offering flexibility when arriving at destinations without personal transport.",
            "howNativesThink": "Evaluated through the lens of convenience, mileage caps, insurance coverage, and total cost transparency.",
            "mentalImage": "A business traveler at an airport car rental counter presenting their driver's license and credit card to a customer service agent.",
            "whenToUse": "When discussing business trip logistics, vacation transportation, corporate travel policies, or vehicle reservations.",
            "whenNotToUse": "Do not use when referring to vehicle leasing (which implies long-term multi-year contracts)."
        },
        "examples": {
            "daily": [
                "We reserved a midsize car rental online to explore the countryside during our vacation.",
                "The car rental agency upgraded our vehicle to an SUV at no extra charge because sedans were sold out.",
                "Please remember to refill the gas tank before returning the car rental to the depot."
            ],
            "business": [
                "Corporate travel policy requires employees to book car rentals through approved vendors with collision damage waiver included.",
                "The company accounts department processed the car rental receipts submitted from the regional sales conference.",
                "Due to high seasonal demand, securing an executive car rental in advance is crucial for executive travel."
            ],
            "conversation": [
                "Colleague A: Did you manage to book transport for the client site visit? / Colleague B: Yes, I reserved a car rental under the corporate account for pickup at the arrivals terminal.",
                "Customer: I need to extend my car rental by two additional days. / Agent: Certainly, I can update your reservation, but daily rates may adjust."
            ]
        },
        "collocations": ["car rental agency", "car rental counter", "car rental reservation", "car rental agreement", "book a car rental"],
        "wordFamily": {
            "noun": "car rental, renter, rent",
            "verb": "rent",
            "adjective": "rentable",
            "adverb": "rentally"
        },
        "visual": {
            "imageKeyword": "airport car rental counter customer service",
            "imageDescription": "A modern airport car rental service desk where a customer is receiving car keys and a rental agreement from a smiling representative.",
            "mnemonic": "A car rental lets you RENT a CAR for your trip."
        },
        "video": {
            "description": "A tutorial video highlighting tips for booking car rentals, understanding insurance options, and inspecting vehicles prior to departure."
        },
        "toeicContext": {
            "commonParts": [3, 4, 7],
            "exampleQuestion": "Employees traveling for company business must submit all __________ receipts along with their expense reports within one week of return.",
            "tips": "In TOEIC Listening Parts 3 & 4 and Reading Part 7, dialogues or notices frequently concern car rental reservations, pick-up times, insurance waivers, and corporate reimbursement guidelines."
        },
        "synonyms": ["vehicle rental", "auto rental", "car hire", "vehicle hire"],
        "antonyms": ["car ownership", "private vehicle"],
        "relatedWords": ["reservation", "insurance waiver", "mileage", "deposit", "counter", "shuttle", "itinerary"]
    },
    {
        "id": "travel-091",
        "word": "caravan",
        "partOfSpeech": ["noun"],
        "category": "travel",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈkærəvæn/",
            "syllableBreakdown": "car-a-van",
            "stressPattern": "Primary stress on the first syllable (CAR-a-van).",
            "commonMistakes": "Mispronouncing the middle vowel or shifting stress to the final syllable (/ˌkærəˈvæn/)."
        },
        "etymology": {
            "origin": "Persian via Italian and Middle French",
            "rootWord": "karwān",
            "rootMeaning": "Group of desert travelers",
            "evolution": "Derived from Persian 'karwān' (group of travelers), passing through Italian 'carovana' and French into English in the late 16th century initially denoting a company of travelers journeying together, later extended to wheeled vehicles equipped for living and motorized camper vans.",
            "relatedLanguages": ["French (caravane)", "Spanish (caravana)", "Italian (carovana)", "German (Karawane / Wohnwagen)"],
            "firstRecordedUse": "Late 16th century"
        },
        "deepMeaning": {
            "coreConcept": "A vehicle equipped for living in, typically towed by a car (trailer) or self-propelled (motorhome/camper van), used for holiday travel and camping.",
            "spatialContext": "Holiday caravan parks, coastal campsites, scenic highways, and outdoor recreational areas.",
            "temporalContext": "Utilized during summer vacations, weekend getaways, and long-distance road trips.",
            "emotionalTone": "neutral",
            "formalityLevel": "neutral",
            "connotation": "positive"
        },
        "nativeMindset": {
            "culturalContext": "Deeply associated with leisure travel, outdoor adventure, and holiday traditions, particularly popular across the UK, Australia, and parts of Europe.",
            "howNativesThink": "Viewed as an economical and flexible mode of holiday travel offering home-like comforts while exploring natural landscapes.",
            "mentalImage": "A modern white travel trailer parked at a scenic coastal campsite overlooking the ocean during sunset.",
            "whenToUse": "When discussing camping holidays, recreational vehicle travel, or towed holiday accommodations.",
            "whenNotToUse": "Do not use for commercial delivery trucks or standard passenger cars."
        },
        "examples": {
            "daily": [
                "They parked their caravan at the coastal campsite and set up the awning for the evening.",
                "Traveling by caravan allows families to explore multiple national parks without booking hotels.",
                "The holiday park provides electrical hookups and water stations for each caravan site."
            ],
            "business": [
                "The regional tourism board published a report highlighting a surge in domestic caravan and camping holidays.",
                "Manufacturing data indicates rising consumer demand for lightweight, fuel-efficient caravans.",
                "Insurance premiums for motorhomes and caravans vary based on storage security and annual mileage."
            ],
            "conversation": [
                "Colleague A: Are you taking time off for the summer holidays? / Colleague B: Yes, we rented a caravan and plan to tour the national parks in Scotland.",
                "Customer: Does this caravan site have spaces available for next weekend? / Park Manager: All powered caravan pitches are currently booked, but we have unpowered tent sites open."
            ]
        },
        "collocations": ["caravan park", "caravan site", "holiday caravan", "tow a caravan", "motorized caravan"],
        "wordFamily": {
            "noun": "caravan, caravanning, caravanner",
            "verb": "caravan",
            "adjective": "caravan",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "modern travel trailer caravan campsite nature",
            "imageDescription": "A sleek modern caravan parked on a green grassy campsite surrounded by pine trees under a clear blue sky.",
            "mnemonic": "A CAR carrying a VAN of travelers is a caravan."
        },
        "video": {
            "description": "A travel documentary exploring scenic caravan routes and camping life across picturesque rural landscapes."
        },
        "toeicContext": {
            "commonParts": [3, 7],
            "exampleQuestion": "The local tourism council launched a marketing campaign to attract visitors to regional __________ parks during the autumn shoulder season.",
            "tips": "In TOEIC reading and listening sections concerning tourism, leisure, and regional advertising, terms like 'caravan park' or 'caravan site' frequently appear in context questions."
        },
        "synonyms": ["travel trailer", "camper", "motorhome", "camper van", "recreational vehicle"],
        "antonyms": ["permanent residence", "hotel room"],
        "relatedWords": ["campsite", "motorhome", "trailer", "holiday park", "camping", "road trip", "awning"]
    }
]

with open("result.json", "w") as f:
    json.dump({"words": words_data}, f, indent=2)

print("Successfully generated result.json with 3 words.")
