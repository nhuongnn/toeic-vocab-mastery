import json
import re
import sys

words_data = [
    {
        "id": "dining-254",
        "word": "spice",
        "partOfSpeech": [
            "noun"
        ],
        "category": "dining",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/spaɪs/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/spice--_us_1.mp3",
            "syllableBreakdown": "spice",
            "stressPattern": "●",
            "commonMistakes": "Learners often substitute the unvoiced alveolar sibilant /s/ with a voiced /z/ at the end, mispronouncing 'spice' as /spaɪz/ (spies). Another common error is shortening the diphthong /aɪ/ to a pure /a/ or /ʌ/, resulting in a sound closer to 'spus'. In hospitality terminology, non-native speakers frequently confuse 'spice' (aromatic seasonings derived from seeds, bark, roots, or fruit) with 'herb' (leafy green plant parts) or use 'spices' when referring strictly to table salt, which is a mineral seasoning rather than a spice."
        },
        "etymology": {
            "origin": "Middle English 'spice', borrowed from Old French 'espice' (Modern French 'épice'), from Late Latin 'species' (spices, goods, wares; specifically aromatic plant merchandise), from Classical Latin 'species' (appearance, form, kind, sort, commodity).",
            "rootWord": "Latin species (appearance, kind, sort, merchandise, grocer's wares)",
            "rootMeaning": "A particular sort of merchandise; commodities, specifically dried aromatic substances of plant origin used in cooking and trade",
            "evolution": "In Classical Latin, 'species' meant appearance or specific kind. During Late Latin and medieval Mediterranean commerce, merchant guilds used 'species' to designate high-value imported commodities—specifically dried aromatics from the Orient. Old French adapted this as 'espice', which entered Middle English around 1200 as 'spice'. Spices drove global maritime trade routes during the Age of Discovery and remain foundational to commercial gastronomy.",
            "relatedLanguages": [
                "French: épice (spice, aromatic seasoning)",
                "Spanish: especia (spice, aromatic culinary ingredient)",
                "Italian: spezia (spice, aromatic substance)",
                "Portuguese: especiaria (spice, seasonings, dry aromatics)",
                "German: Spezerei (spicery, historic grocer's goods; modern: Gewürz)"
            ],
            "firstRecordedUse": "Early 13th century (c. 1200 in Early Middle English texts)"
        },
        "deepMeaning": {
            "coreConcept": "A strongly flavored or aromatic dried substance of plant origin—such as seeds, bark, roots, flower buds, or berries (e.g., cinnamon, pepper, cumin, cloves, nutmeg)—employed in commercial culinary arts, catering, and beverage production to season, preserve, and enhance food and drinks.",
            "spatialContext": "Commercial restaurant kitchens, dry spice racks, hotel banquet preparation stations, climate-controlled dry storage pantries, seasoning bins, and food manufacturing facilities.",
            "temporalContext": "Daily culinary mise en place before service, flavor balancing during cooking shifts, and weekly or monthly dry-goods inventory procurement cycles.",
            "emotionalTone": "Aromatic, vibrant, culinary, invigorating, and warm.",
            "formalityLevel": "neutral",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "Native speakers perceive 'spice' both as discrete botanical ingredients (cinnamon, cumin, cloves) and collectively as the foundation of savory depth. They instinctively draw a sharp distinction between spices (harvested from non-leafy plant parts like bark, seeds, and roots) and herbs (the leafy greens such as basil, oregano, and parsley). In kitchen operations, native chefs view spices as deliberate flavor enhancers that require roasting or blooming in hot oil to unlock essential volatile oils. Metaphorically, natives use 'spice' to denote zest, novelty, or added excitement in activities.",
            "mentalImage": "A restaurant line chef standing before a stainless steel prep table in an open-concept kitchen, measuring freshly toasted cumin seeds, ground coriander, and smoked paprika from sealed glass jars into a copper seasoning bowl.",
            "whenToUse": "Use when identifying dried aromatic plant seasonings used in recipes ('a blend of whole spices', 'add aromatic spice to the broth', 'spice grinder'). Use in culinary purchasing orders, recipe documentation, and menu descriptions highlighting flavor profiles.",
            "whenNotToUse": "Do not use 'spice' to refer to fresh leafy greens (use 'herbs'). Do not use 'spice' to refer strictly to table salt, which is an inorganic mineral seasoning. Avoid confusing the count noun 'spice' with the adjective 'spicy', which denotes pungency or capsaicin heat.",
            "culturalContext": "In modern English-speaking dining culture, diverse culinary influences have made exotic spice blends (garam masala, za'atar, jerk seasoning) household staples. Seasonal marketing heavily features warm spices (such as the widespread autumn commercial phenomenon of 'pumpkin spice'). In TOEIC exams, spices appear in restaurant inventory invoices, kitchen supply orders, dietary advisory notices for banquet guests, and culinary shipping manifests across Parts 1, 3, and 7."
        },
        "examples": {
            "daily": [
                "She organized her kitchen cabinet by placing every aromatic spice into labeled glass containers on a tiered wooden rack.",
                "Adding a pinch of cinnamon and ground nutmeg provided the perfect holiday spice to the simmering apple cider.",
                "The specialty neighborhood grocery store carries an exceptional selection of imported spice blends from around the world."
            ],
            "business": [
                "The restaurant hospitality group signed an exclusive procurement agreement with an organic spice distributor to stabilize wholesale costs.",
                "To comply with food safety standards, the central bakery kitchen maintains strict humidity controls inside the dry spice storage area.",
                "The executive chef developed a proprietary blend of spice to distinguish the hotel's signature grilled steaks from rival steakhouses."
            ],
            "conversation": [
                "\"Do we have enough ground cumin and smoked paprika in the prep station for the evening rush?\" / \"I just refilled both spice containers from the dry pantry, so we are well stocked.\"",
                "\"Does this braised beef recipe require any whole spice that we need to order in advance?\" / \"Yes, our catering order needs whole star anise and cardamom pods from our dry-goods distributor.\""
            ],
            "collocations": [
                "aromatic spice",
                "spice rack",
                "spice blend",
                "exotic spices",
                "ground spice",
                "spice grinder"
            ]
        },
        "wordFamily": {
            "noun": "spice, spiciness, spicing",
            "verb": "spice",
            "adjective": "spicy, spiced, spiceless",
            "adverb": "spicily"
        },
        "visual": {
            "imageKeyword": "aromatic spices cinnamon star anise peppercorns wooden bowls market",
            "imageDescription": "A photorealistic close-up of vibrant whole and ground culinary spices—including cinnamon sticks, star anise, turmeric powder, and black peppercorns—artistically arranged in small rustic wooden bowls on a dark slate kitchen counter.",
            "mnemonic": "SPICE adds Special Plant Ingredients to Create Exceptional flavor!"
        },
        "video": {
            "description": "A professional culinary masterclass demonstrating proper techniques for blooming whole spices in hot oil to extract rich aromatics for restaurant sauces."
        },
        "toeicContext": {
            "commonParts": [
                1,
                3,
                7
            ],
            "exampleQuestion": "The executive chef instructed the procurement department to purchase organic _____ in airtight containers to preserve their aromatic oils. (A) spice (B) spices (C) spicy (D) spiciness",
            "tips": "In TOEIC Part 5 questions testing number and form, look ahead for agreement clues: the plural possessive determiner 'their' in 'preserve their aromatic oils' indicates that the countable antecedent must be plural, making (B) spices the correct answer. Option (A) is a singular count noun that would require an article; (C) is an adjective; and (D) is an uncountable noun denoting pungency."
        },
        "synonyms": [
            "seasoning",
            "flavoring",
            "aromatic",
            "condiment",
            "herb blend"
        ],
        "antonyms": [],
        "relatedWords": [
            "cinnamon",
            "peppercorn",
            "paprika",
            "seasoning",
            "marinade",
            "aromatics",
            "culinary"
        ]
    },
    {
        "id": "dining-255",
        "word": "spicy",
        "partOfSpeech": [
            "noun"
        ],
        "category": "dining",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/ˈspaɪ.si/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/spicy--_us_1.mp3",
            "syllableBreakdown": "spi·cy",
            "stressPattern": "●○",
            "commonMistakes": "Learners sometimes mispronounce the second syllable with an open lax /e/ or /ɪ/ instead of a clear, tense terminal /i/ sound (saying /ˈspaɪ.se/ or /ˈspaɪ.sɪ/). Another common mistake is pronouncing the 'c' as a plosive /k/ ('spy-kee') rather than the soft voiceless fricative /s/. Grammatically, learners must recognize that while 'spicy' primarily functions as an adjective in everyday discourse ('spicy soup'), it is also deployed substantively in menu indexing and hospitality categorization to designate the piquant flavor category ('mild versus spicy')."
        },
        "etymology": {
            "origin": "Formed in Middle English from the noun 'spice' (from Old French 'espice', from Late Latin 'species') combined with the Germanic adjectival suffix '-y' (from Old English '-iġ', signifying characterized by, full of, or possessing the qualities of).",
            "rootWord": "Old French espice / Latin species + English suffix -y",
            "rootMeaning": "Abounding in, seasoned with, or possessing the aromatic heat and pungency of spices",
            "evolution": "Emerging in late 16th-century English (c. 1560s), 'spicy' initially described foods, wines, and perfumes rich with fragrant aromatics. Over subsequent centuries, with the global dispersion of New World chili peppers (capsicum), 'spicy' evolved to emphasize sharp tongue-tingling pungency and capsaicin heat in international cuisine, alongside its substantive use on menus to classify spicy flavor selections.",
            "relatedLanguages": [
                "French: épicé (spiced, spicy, piquant)",
                "Spanish: especiado (spiced) / picante (spicy, hot, pungent)",
                "Italian: speziato (spiced) / piccante (spicy, sharp, hot)",
                "German: würzig (spicy, savory) / scharf (spicy-hot, pungent)",
                "Dutch: kruidig (spicy, seasoned) / pittig (spicy, zesty, hot)"
            ],
            "firstRecordedUse": "Late 16th century (c. 1560s–1570s)"
        },
        "deepMeaning": {
            "coreConcept": "In culinary arts, restaurant dining, and catering classification, designating food, beverages, or seasoning preparations characterized by the pungent heat of chili peppers (capsaicin) or the fragrant intensity of aromatic spices; used as a dining classification heading or flavor attribute distinguishing piquant, tongue-stimulating dishes from mild culinary preparations.",
            "spatialContext": "Restaurant dining rooms, printed and digital menu boards, buffet allergen and flavor labeling displays, commercial sauce preparation lines, and specialty dining bistros.",
            "temporalContext": "Guest ordering and table consultations, entrée tasting evaluations, banquet menu selection reviews, and culinary recipe formulation.",
            "emotionalTone": "Bold, zesty, stimulating, lively, and piquant.",
            "formalityLevel": "neutral",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "To native English speakers, 'spicy' immediately connotes tongue-tingling heat derived from chili peppers, jalapeños, peppercorns, or wasabi, though in bakery and beverage contexts it can also evoke warm autumnal spices like ginger and cloves. Front-of-house staff routinely check spice tolerance with patrons ('How spicy do you like your curry? Mild, medium, or spicy?'), recognizing that guests' heat thresholds vary dramatically. In catering logistics, culinary teams always balance spicy dishes with mild alternatives to accommodate diverse banquet attendees.",
            "mentalImage": "A restaurant server gesturing toward a bold red chili icon on a laminated dinner menu, explaining the heat level of a spicy Thai seafood noodle dish to dinner patrons.",
            "whenToUse": "Use when describing dishes containing noticeable heat, pungency, or concentrated spice seasonings ('spicy chicken wings', 'spicy tuna roll', 'spicy dipping sauce'). Use as a flavor category indicator on dining menus, catering forms, and food packaging.",
            "whenNotToUse": "Do not confuse with 'salty' (containing excess sodium) or 'sour' (acidic and tart like citrus or vinegar). When food is rich with herbs like rosemary or basil but possesses no burning heat, native speakers say 'flavorful', 'savory', or 'well-seasoned' rather than 'spicy'.",
            "culturalContext": "Anglo-American hospitality relies heavily on standardized heat scales (often indicated by one, two, or three chili pepper symbols on menus) to prevent guest dissatisfaction or digestive discomfort. Corporate event planners typically mandate that buffets offer both mild and spicy selections. In TOEIC scenarios, 'spicy' appears in Part 3 restaurant dialogues where patrons inquire about menu ingredients, Part 4 banquet announcements, and Part 7 customer reviews evaluating meal seasoning."
        },
        "examples": {
            "daily": [
                "He requested extra diced jalapenos on his breakfast burrito because he enjoys very spicy Mexican food.",
                "If you have a low tolerance for culinary heat, you should choose the mild garlic sauce rather than the spicy salsa.",
                "The enticing aroma of spicy noodles drifted through the dining room as soon as the kitchen doors opened."
            ],
            "business": [
                "To satisfy diverse conference attendees, the banquet buffet offered clearly designated mild, medium, and spicy chicken curries.",
                "Consumer feedback indicated that launching a spicy grilled sandwich significantly boosted the fast-casual chain's midday sales volume.",
                "The corporate catering contract required the kitchen to provide visible flavor placards identifying all spicy sauces."
            ],
            "conversation": [
                "\"Would you recommend the massaman curry or the green curry for a client who dislikes spicy entrées?\" / \"The massaman is sweet and mild, whereas the green curry is notably spicy.\"",
                "\"Could the kitchen prepare a slightly less spicy version of the blackened salmon for our guest?\" / \"Certainly, the chef can adjust the seasoning to ensure a much milder flavor profile.\""
            ],
            "collocations": [
                "spicy food",
                "spicy sauce",
                "mildly spicy",
                "spicy kick",
                "spicy aroma",
                "authentically spicy"
            ]
        },
        "wordFamily": {
            "noun": "spiciness, spice",
            "verb": "spice",
            "adjective": "spicy, spiced",
            "adverb": "spicily"
        },
        "visual": {
            "imageKeyword": "spicy red chili peppers curry dish steam restaurant dining",
            "imageDescription": "A steaming ceramic bowl of rich red Thai coconut curry garnished with fresh bird's eye chilies and sliced red peppers, displayed beside bamboo tableware in an upscale restaurant.",
            "mnemonic": "SPICY foods Spark Pungent Intensity that Captivates Your taste buds!"
        },
        "video": {
            "description": "An instructional hospitality training video demonstrating how restaurant servers explain menu heat ratings and recommend cooling beverage pairings for spicy dishes."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                7
            ],
            "exampleQuestion": "To accommodate international attendees with different taste preferences, the banquet buffet features both a mild vegetable stew and a _____ seafood pasta. (A) spicy (B) spicily (C) spice (D) spiciness",
            "tips": "In TOEIC Part 5 sentences with parallel structure ('both a mild vegetable stew and a _____ seafood pasta'), the blank precedes the compound noun 'seafood pasta' and parallels the adjective 'mild'. Therefore, the adjective (A) spicy is required. Choice (B) is an adverb, (C) is a base noun, and (D) is an abstract noun of quality."
        },
        "synonyms": [
            "piquant",
            "pungent",
            "hot",
            "peppery",
            "zesty",
            "seasoned"
        ],
        "antonyms": [
            "mild",
            "bland",
            "insipid",
            "unseasoned",
            "tame"
        ],
        "relatedWords": [
            "capsaicin",
            "piquancy",
            "chili",
            "heat level",
            "curry",
            "flavoring",
            "palate"
        ]
    },
    {
        "id": "dining-256",
        "word": "spoon",
        "partOfSpeech": [
            "noun"
        ],
        "category": "dining",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/spuːn/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/spoon--_us_1.mp3",
            "syllableBreakdown": "spoon",
            "stressPattern": "●",
            "commonMistakes": "Learners frequently shorten the long close back rounded vowel /uː/ to a lax near-close /ʊ/, pronouncing 'spoon' like 'spun' or 'spook' with a short vowel. Another common issue is inserting an epenthetic vowel before the initial consonant cluster /sp/ (common among native Spanish speakers who pronounce it as /esˈpuːn/). In flatware terminology, non-native speakers also sometimes confuse a 'soup spoon' (round, deep bowl) with a 'tablespoon' (oval, larger) or 'teaspoon' (smaller, for tea and coffee)."
        },
        "etymology": {
            "origin": "Old English 'spōn' (a chip of wood, sliver, shaving; later an eating utensil whittled from wood), from Proto-Germanic '*spēnuz' (chip of wood, flake, sliver), from Proto-Indo-European '*(s)ph₂-en-' / '*(s)peh₁-' (a flat piece of wood).",
            "rootWord": "Old English spōn / Proto-Germanic *spēnuz (chip of wood, sliver)",
            "rootMeaning": "A carved chip or thin piece of wood shaped into a concave utensil for scooping and eating liquids",
            "evolution": "In Anglo-Saxon times, personal eating utensils were whittled from chips of wood ('spōn'). By Middle English ('spone' / 'spoon', c. 1300), the term referred specifically to a handled utensil with a concave bowl. As metallurgy developed in Europe, spoons evolved from pewter and brass to sterling silver and stainless steel, becoming central components of formalized Western flatware sets (soup spoons, teaspoons, dessert spoons).",
            "relatedLanguages": [
                "Old Norse: spánn / spónn (chip of wood, spoon)",
                "Dutch: spaan (wood shaving, chip) / lepel (eating spoon)",
                "German: Span (wood shaving, splinter) / Löffel (spoon)",
                "Swedish: spån (wood chip) / sked (spoon)",
                "Danish: spån (shaving, wood sliver) / ske (spoon)"
            ],
            "firstRecordedUse": "Before 12th century (Old English c. 900 as 'spōn')"
        },
        "deepMeaning": {
            "coreConcept": "A dining utensil and item of flatware consisting of a shallow, concave circular or oval bowl mounted on a handle, designed specifically for scooping, tasting, stirring, and consuming liquids, semi-solid dishes (soups, stews, purées, puddings), and hot beverages.",
            "spatialContext": "Banquet table settings (positioned to the right of the dinner knives or above the plate), restaurant service stations, dishwashing sorting racks, and commercial beverage counters.",
            "temporalContext": "Pre-event table setting shifts, dessert course service resetting, morning coffee service, and post-service flatware polishing.",
            "emotionalTone": "Practical, functional, refined, hospitable, and orderly.",
            "formalityLevel": "neutral",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Native speakers instantly distinguish spoons by their designated culinary function and place-setting position. In formal Western dining etiquette, flatware is utilized 'from the outside in': a round soup spoon rests on the far right outside the dinner knives, while smaller teaspoons accompany tea saucers, and dessert spoons may be placed horizontally above the charger plate. Native chefs treat heavy-duty kitchen spoons (slotted or solid) as essential extensions of their hands for basting, tasting, and plating.",
            "mentalImage": "A banquet waiter in a tailored black vest carefully placing polished silver soup spoons to the right of the dinner knives on a pressed white tablecloth, aligning each utensil precisely one inch from the table edge.",
            "whenToUse": "Use when referring to the concave flatware piece or eating tool ('soup spoon', 'teaspoon', 'dessert spoon', 'serving spoon'). Use in recipe preparation to denote measuring units ('tablespoon', 'teaspoon') or the physical action of scooping ('spoon the sauce over the entrée').",
            "whenNotToUse": "Do not confuse with 'fork' (pronged utensil for spearing solid food) or 'knife' (bladed utensil for cutting). When referring to the complete set of table utensils collectively, use 'flatware', 'cutlery', or 'silverware' rather than referring solely to 'spoon'.",
            "culturalContext": "Formal place setting etiquette in English-speaking corporate banquets requires exact positioning of spoons according to course order. Etiquette protocols dictate that soup should be spooned away from the diner rather than toward oneself, and spoons should never be left standing upright in finished coffee cups or soup bowls. In TOEIC exams, spoons appear frequently in Part 1 dining photographs ('A server is arranging flatware on a table'), Part 3 restaurant service dialogues, and Part 7 catering supply purchase orders."
        },
        "examples": {
            "daily": [
                "She selected a round stainless steel soup spoon from the drawer to enjoy her bowl of hot minestrone.",
                "He measured precisely two level teaspoons of brown sugar with a small silver spoon before stirring his morning tea.",
                "The dessert server delivered a slice of warm berry cobbler accompanied by a clean dessert spoon."
            ],
            "business": [
                "The hotel banquet department purchased six hundred sets of heavy-gauge stainless steel soup spoons to replace damaged flatware before the annual gala.",
                "During the pre-dinner inspection, the banquet captain verified that each soup spoon was positioned precisely one inch from the edge of the tablecloth.",
                "A kitchen supply audit revealed an immediate shortage of large slotted serving spoons needed for the executive luncheon buffet stations."
            ],
            "conversation": [
                "\"Excuse me, our place setting appears to be missing a soup spoon for the chowder course.\" / \"I apologize for the oversight; I will bring you a polished silver spoon right away.\"",
                "\"Should we lay the dessert spoon horizontally above the charger plate or bring it with the dessert?\" / \"Corporate banquet protocol requires setting the dessert spoon above the charger during initial table prep.\""
            ],
            "collocations": [
                "soup spoon",
                "dessert spoon",
                "wooden spoon",
                "serving spoon",
                "tablespoon",
                "silver spoon"
            ]
        },
        "wordFamily": {
            "noun": "spoon, spoonful",
            "verb": "spoon",
            "adjective": "spoonable, spooned",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "polished silverware soup spoon formal dining table setting banquet",
            "imageDescription": "An elegant formal dining table arrangement showcasing a polished silver soup spoon neatly positioned beside a folded white linen napkin and fine porcelain soup bowl.",
            "mnemonic": "A SPOON is Shaped Perfectly to Open Our Nourishment—scooping soups and sweets with ease!"
        },
        "video": {
            "description": "A formal banquet service training video illustrating proper table setting protocols, flatware alignment, and soup spoon dining etiquette."
        },
        "toeicContext": {
            "commonParts": [
                1,
                3,
                7
            ],
            "exampleQuestion": "Before the doors opened for the dinner gala, banquet staff made sure that a polished dessert _____ was positioned horizontally above each plate. (A) spoon (B) spoons (C) spooned (D) spooning",
            "tips": "In TOEIC Part 5, following the singular indefinite article 'a' and modifying noun 'dessert', the singular countable noun (A) spoon correctly serves as the head noun of the subject clause. Choice (B) is plural, while (C) and (D) are verb participle forms."
        },
        "synonyms": [
            "flatware piece",
            "cutlery utensil",
            "soup spoon",
            "teaspoon",
            "eating utensil"
        ],
        "antonyms": [],
        "relatedWords": [
            "flatware",
            "cutlery",
            "fork",
            "knife",
            "soup bowl",
            "place setting",
            "silverware"
        ]
    }
]

with open("scratch/dining_254_256.json", "w", encoding="utf-8") as f:
    json.dump({"words": words_data}, f, indent=2, ensure_ascii=False)

print("Saved scratch/dining_254_256.json successfully!")
