import json
import re
import sys

words = [
    {
        "id": "dining-133",
        "word": "fillet",
        "partOfSpeech": [
            "noun"
        ],
        "category": "dining",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/fɪˈleɪ/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/fillet--_us_1.mp3",
            "syllableBreakdown": "fil·let",
            "stressPattern": "○●",
            "commonMistakes": "Learners often pronounce both 'l's and the final 't' phonetically as /ˈfɪl.ɪt/, which is standard in British English but considered incorrect in American culinary contexts where the French-influenced pronunciation /fɪˈleɪ/ (silent 't', stressed second syllable) predominates. Additionally, do not confuse the British spelling 'fillet' with the French spelling 'filet' (as in filet mignon), both of which are common in gastronomy."
        },
        "etymology": {
            "origin": "Middle English filet ('a narrow band, thread, ribbon'), borrowed from Old French filet ('little thread', diminutive of fil 'thread'), from Latin fīlum ('thread, cord').",
            "rootWord": "fīlum",
            "rootMeaning": "thread, string, or cord",
            "evolution": "Originally denoting a narrow ribbon or binding string in Anglo-French (c. 1200), the term was adopted into butchery and culinary practice in the late 14th century, where cuts of meat were tied with cord before roasting. Over time, the name transferred from the binding string to the tender boneless loin or strip of fish itself.",
            "relatedLanguages": [
                "French: filet",
                "Spanish: filete",
                "Italian: filetto",
                "Portuguese: filé",
                "German: Filet"
            ],
            "firstRecordedUse": "Late 14th century (c. 1380, in culinary manuscripts detailing the roasting of boned loins)"
        },
        "deepMeaning": {
            "coreConcept": "A tender, prime cut of boneless meat or poultry, or a boneless strip of fish cleanly sliced lengthwise along the backbone, prized in gastronomy for its delicate texture, uniform thickness, and absence of bones.",
            "spatialContext": "Commercial seafood processing tables, stainless-steel prep counters, upscale steakhouse kitchens, hotel banquet carving lines, and refrigerated display cases.",
            "temporalContext": "Morning butchery prep shifts (9:00 AM – 11:30 AM), fast-paced evening dinner rushes, and weekly wholesale fresh-catch seafood deliveries.",
            "emotionalTone": "Refined, delicate, appetizing, and premium.",
            "formalityLevel": "neutral",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "Native speakers instinctively view a fillet as a hassle-free, upscale culinary experience. When ordering fish at a restaurant, choosing a fillet guarantees peace of mind because there are no bones to extract, making it the preferred option in corporate dinners and polite dining settings. With beef, 'fillet' or 'filet mignon' signals supreme tenderness and luxury.",
            "mentalImage": "A line cook wielding a flexible curved boning knife on a white cutting board, cleanly separating a glistening pink slab of Atlantic salmon away from the ribcage, placing the boneless portion on crushed ice beside lemon wedges.",
            "whenToUse": "Use when describing boneless cuts of fish, tenderloins of beef or pork, chicken breast tenders, restaurant entrée menu items, and seafood procurement orders.",
            "whenNotToUse": "Do not use when referring to whole whole-head fish, bone-in steaks (like ribeye or T-bone), stewing chunks, or ground/minced meat.",
            "culturalContext": "In Anglo-American corporate banquets and wedding receptions, the fish fillet (e.g., Chilean seabass, salmon) and beef tenderloin fillet are the ubiquitous 'surf and turf' or dual-protein selections because they offer predictable portion sizes, elegant plating, and safety for dining guests."
        },
        "examples": {
            "daily": [
                "She pan-seared a fresh salmon fillet with olive oil, garlic, and fresh rosemary for a quick weeknight dinner.",
                "Before placing the cod fillet into the baking dish, he carefully felt along the center to ensure there were no remaining bones.",
                "The neighborhood butcher prepared two center-cut beef fillets wrapped in parchment paper for our weekend barbecue."
            ],
            "business": [
                "The catering director confirmed that seventy portions of grilled sea bass fillet have been ordered for the annual awards banquet.",
                "Due to an unexpected disruption in fresh seafood shipments, the executive chef substituted Alaskan halibut fillet on the evening prix fixe menu.",
                "Wholesale contracts with sustainable fisheries enabled the hotel chain to source premium salmon fillets at stabilized quarterly rates."
            ],
            "conversation": [
                "\"Would you recommend the ribeye steak or the pan-roasted trout fillet for dinner?\" / \"The trout fillet is exceptionally fresh tonight, served with a delicate lemon-caper butter sauce.\"",
                "\"Did the seafood distributor deliver the fifty vacuum-packed cod fillets on time?\" / \"Yes, the kitchen staff verified the shipment temperature and transferred them immediately to the walk-in cooler.\""
            ],
            "collocations": [
                "salmon fillet",
                "beef fillet",
                "fish fillet",
                "boneless fillet",
                "sear a fillet",
                "freshly caught fillet"
            ]
        },
        "wordFamily": {
            "noun": "fillet",
            "verb": "fillet",
            "adjective": "filleted"
        },
        "visual": {
            "imageKeyword": "fresh raw salmon fillet salmon fish steak culinary prep kitchen",
            "imageDescription": "A close-up shot of a prime, skin-on Atlantic salmon fillet with vibrant orange-pink flesh and delicate marbling resting on craft parchment paper beside sea salt crystals and fresh dill sprigs.",
            "mnemonic": "FILLET comes from Latin 'filum' (thread): a tender boneless strip cut cleanly like a ribbon with no bones attached!"
        },
        "video": {
            "description": "A masterclass by a certified executive chef showing professional knife techniques for filleting, skinning, and portioning whole salmon and whitefish for fine-dining service."
        },
        "toeicContext": {
            "commonParts": [
                1,
                3,
                7
            ],
            "exampleQuestion": "To accommodate conference attendees who prefer seafood, the hotel catering menu features pan-seared halibut _____ accompanied by steamed wild rice and roasted carrots. (A) filleted (B) fillets (C) filleting (D) fillet's",
            "tips": "The sentence requires a plural head noun to complete the compound direct object phrase 'pan-seared halibut _____'. Choice (B) 'fillets' is correct. Choice (A) is a past participle/verb, (C) is a participle/gerund, and (D) is a singular possessive form."
        },
        "synonyms": [
            "tenderloin",
            "boneless cut",
            "loin",
            "steak",
            "cutlet",
            "medallion"
        ],
        "antonyms": [],
        "relatedWords": [
            "debone",
            "portion",
            "halibut",
            "sear",
            "butchery",
            "tenderloin",
            "protein"
        ]
    },
    {
        "id": "dining-134",
        "word": "flavor",
        "partOfSpeech": [
            "noun"
        ],
        "category": "dining",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/ˈfleɪ.vɚ/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/flavor--_us_1.mp3",
            "syllableBreakdown": "fla·vor",
            "stressPattern": "●○",
            "commonMistakes": "Learners often substitute a flat vowel /æ/ or short /e/ for the diphthong /eɪ/, pronouncing it like 'flavour' without glide, or soften the final rhotic /ɚ/ excessively in American English. Note that while American English uses the spelling 'flavor', British, Canadian, and Australian English standardize 'flavour'."
        },
        "etymology": {
            "origin": "Middle English flavour ('pleasant smell, aroma'), from Old French flaor / flaour ('odor, scent, fragrance'), altered by influence of saveur ('taste') from Vulgar Latin *flātor ('breath, breeze, odor'), derived from classical Latin flāre ('to blow, puff').",
            "rootWord": "flāre",
            "rootMeaning": "to blow, breathe, or emit a puff",
            "evolution": "Introduced into Middle English during the 14th century to denote a sweet fragrance or aroma. By the late 17th century, under the conceptual blending with taste and savour, the meaning expanded from purely olfactory scent to the modern composite sensation of taste and smell perceived when eating.",
            "relatedLanguages": [
                "French: saveur / arôme",
                "Spanish: sabor",
                "Italian: sapore",
                "Portuguese: sabor",
                "German: Geschmack / Aroma"
            ],
            "firstRecordedUse": "Early 14th century (c. 1300, in Middle English romances referring to fragrant scents)"
        },
        "deepMeaning": {
            "coreConcept": "The distinctive composite sensory impression produced by food or drink, perceived primarily through the unified physiological senses of taste on the tongue and aroma via the retro-nasal olfactory system; figuratively, a characteristic style, mood, or local quality.",
            "spatialContext": "Sensory evaluation laboratories, restaurant test kitchens, artisanal roasteries, brewery taprooms, and grocery package development studios.",
            "temporalContext": "Recipe R&D development cycles, blind consumer tasting focus groups, seasonal menu rotations (spring citrus vs. autumn spice), and dinner service dish tastings.",
            "emotionalTone": "Sensory, appreciative, inviting, and discerning.",
            "formalityLevel": "neutral",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "Native speakers sharply distinguish 'flavor' from simple 'taste'. While taste refers strictly to the five basic tongue receptors (salty, sweet, sour, bitter, umami), 'flavor' encompasses the entire multisensory experience—the aroma, mouthfeel, and lingering aftertaste. In everyday and business language, native speakers also use 'flavor' figuratively to describe unique regional flair, distinct ambiance, or specific variations of a concept.",
            "mentalImage": "An executive chef dipping a silver tasting spoon into a simmering copper pot of burgundy wine reduction, closing their eyes to analyze the subtle harmony of thyme, shallots, garlic, and beef stock.",
            "whenToUse": "Use when describing the taste profile of meals, beverages, or seasonings, sensory consumer tests, restaurant reviews, or metaphorically when referring to local character, variety, or style.",
            "whenNotToUse": "Do not use to describe physical mechanical textures alone (such as crispy, tough, or crunchy) without reference to taste or smell; avoid using as a synonym for visual color or appearance.",
            "culturalContext": "In modern Western consumer culture, 'bold flavors' and 'authentic flavor profiles' drive the fast-casual restaurant sector and packaged food innovation. Companies frequently run limited-edition seasonal flavors (like pumpkin spice in autumn) to generate consumer excitement and social media engagement."
        },
        "examples": {
            "daily": [
                "Slow-simmering the stew with onions, carrots, and thyme allowed the rich beef flavor to develop fully.",
                "Our local gelato shop introduces a distinct seasonal fruit flavor every Friday throughout the summer.",
                "A light drizzle of balsamic glaze brought out the natural sweet flavor of the heirloom tomatoes."
            ],
            "business": [
                "The beverage corporation conducted extensive consumer sensory panels before launching its new botanical flavor profile.",
                "Client feedback indicated that the revamped conference lunch buffet offered a wider variety of ethnic flavors.",
                "To stand out in the crowded market, the artisanal snack company developed chips with a bold barbecue flavor."
            ],
            "conversation": [
                "\"How is the seafood risotto you ordered?\" / \"The saffron and white wine give it an incredible depth of flavor without overpowering the scallops.\"",
                "\"Should we introduce a hazelnut flavor to our office coffee service?\" / \"That sounds great; several team members mentioned they prefer flavored roasts in the morning.\""
            ],
            "collocations": [
                "rich flavor",
                "distinctive flavor",
                "enhance the flavor",
                "subtle flavor",
                "burst of flavor",
                "natural flavor"
            ]
        },
        "wordFamily": {
            "noun": "flavor",
            "verb": "flavor",
            "adjective": "flavorful",
            "adverb": "flavorfully"
        },
        "visual": {
            "imageKeyword": "culinary spices herbs tasting spoon flavor sensory seasoning gourmet",
            "imageDescription": "An artistic overhead flat lay of rustic ceramic bowls filled with colorful culinary seasonings, star anise, crushed peppercorns, fresh rosemary, and citrus peel surrounding a steaming copper saucepan.",
            "mnemonic": "FLAVOR bursts like a warm FLARE of aroma and taste across your tongue and palate!"
        },
        "video": {
            "description": "An educational science feature exploring how the human brain integrates olfactory signals and tongue taste buds to perceive complex flavor profiles in food and drink."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                7
            ],
            "exampleQuestion": "Focus group respondents remarked that the newly reformulated organic tea had a noticeably crisper _____ than the previous blend. (A) flavor (B) flavored (C) flavorfully (D) flavorful",
            "tips": "The blank follows the comparative adjective phrase 'a noticeably crisper' and an indefinite article 'a', signaling that a singular countable head noun is needed: (A) flavor. Choice (B) is a past participle, (C) is an adverb, and (D) is an adjective."
        },
        "synonyms": [
            "taste",
            "savor",
            "aroma",
            "relish",
            "zest",
            "tang"
        ],
        "antonyms": [
            "blandness",
            "flavorlessness",
            "insipidity",
            "tastelessness"
        ],
        "relatedWords": [
            "palate",
            "seasoning",
            "savory",
            "umami",
            "condiment",
            "sensory",
            "taste bud"
        ]
    },
    {
        "id": "dining-135",
        "word": "flavorful",
        "partOfSpeech": [
            "adjective"
        ],
        "category": "dining",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈfleɪ.vɚ.fəl/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/flavorful--_us_1.mp3",
            "syllableBreakdown": "fla·vor·ful",
            "stressPattern": "●○○",
            "commonMistakes": "Non-native speakers frequently place primary stress on the second syllable (/fleɪˈvɔːr.fəl/) instead of the first syllable (/ˈfleɪ.vɚ.fəl/). Furthermore, learners often confuse 'flavorful' with 'flavorsome' (more prevalent in British English) or over-rely on generic 'delicious' when 'flavorful' specifically highlights balanced seasoning and aromatic richness."
        },
        "etymology": {
            "origin": "English compound formed by affixing the noun flavor (from Old French flaor, from Latin flāre) to the Germanic suffix -ful (from Old English -full, 'having, full of, characterized by').",
            "rootWord": "flāre + full",
            "rootMeaning": "full of rich taste, aroma, and seasoning",
            "evolution": "Formed in the early 18th century as domestic recipe books and commercial culinary arts expanded in Great Britain and the American colonies, providing writers with an expressive adjective to distinguish well-seasoned, aromatic dishes from simple sweetness or bland food.",
            "relatedLanguages": [
                "French: savoureux / parfumé",
                "Spanish: sabroso / gustoso",
                "Italian: saporito",
                "German: schmackhaft / würzig",
                "Portuguese: saboroso"
            ],
            "firstRecordedUse": "Circa 1740s in English domestic culinary treatises"
        },
        "deepMeaning": {
            "coreConcept": "Possessing a rich, robust, and harmonious combination of taste and aroma; thoroughly seasoned with spices, herbs, or natural extracts so as to stimulate the palate pleasantly without being bland or excessively salty.",
            "spatialContext": "Fine-dining restaurant tables, airline catering development kitchens, culinary review publication offices, food festival demonstration booths, and hotel buffet lines.",
            "temporalContext": "Post-service culinary critiques, quarterly menu evaluations, seasonal chef specials tastings, and guest satisfaction review periods.",
            "emotionalTone": "Enthusiastic, appetizing, complimentary, and culinary.",
            "formalityLevel": "neutral",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "Native speakers use 'flavorful' as a sophisticated, positive descriptor that commends a cook's mastery of seasoning and ingredient harmony. Unlike 'spicy' (which implies heat) or 'sweet', 'flavorful' indicates depth, savory nuance, and appetizing complexity. It carries far more descriptive weight and culinary prestige than basic words like 'yummy' or 'good'.",
            "mentalImage": "A ceramic bowl of steaming Moroccan tagine stew loaded with slow-cooked lamb, apricots, and toasted almonds, from which fragrant steam wafts as a diner eagerly takes a first spoonful and smiles at the vibrant burst of spices.",
            "whenToUse": "Use when reviewing gourmet dishes, describing seasoned meats, simmered stocks, restaurant entrées, catering options, or recipes that showcase herb and spice balance.",
            "whenNotToUse": "Do not use for items that are purely one-dimensional (e.g., a cup of white sugar is sweet, not flavorful), non-food items, or dishes overwhelmed by harsh single-note bitterness or burning chili oil.",
            "culturalContext": "In North American culinary discourse, 'flavorful' has become the benchmark for healthy eating initiatives. Institutional caterers (hospital networks, university dining halls, corporate cafeterias) emphasize 'flavorful low-sodium options' to prove that nutritious eating does not mean bland or uninspired food."
        },
        "examples": {
            "daily": [
                "Marinating the chicken breasts in lemon juice, garlic, and oregano made the grilled meat extraordinarily flavorful.",
                "The chef simmered roasted vegetable scraps for two hours to produce a deeply flavorful vegetable stock.",
                "Even with reduced sodium, the homemade chili remained hearty and flavorful thanks to smoked paprika and cumin."
            ],
            "business": [
                "The airline upgraded its international business-class dining program to offer more flavorful entrées that taste delicious at cruising altitude.",
                "Restaurant critics commended the newly opened French bistro for serving exceptionally flavorful cuisine at reasonable price points.",
                "Our culinary research team formulated a flavorful plant-based burger that mimics the savory juiciness of prime beef."
            ],
            "conversation": [
                "\"How was the catered lunch provided during today's training workshop?\" / \"The roasted vegetable and quinoa salad was surprisingly flavorful, especially with that tangy citrus dressing.\"",
                "\"Have you chosen an entrée option for the retirement celebration?\" / \"Yes, we selected the herb-crusted rack of lamb because the sample tasting was tender and wonderfully flavorful.\""
            ],
            "collocations": [
                "rich and flavorful",
                "wonderfully flavorful",
                "flavorful broth",
                "tender and flavorful",
                "flavorful alternative",
                "exceptionally flavorful"
            ]
        },
        "wordFamily": {
            "noun": "flavor",
            "verb": "flavor",
            "adjective": "flavorful",
            "adverb": "flavorfully"
        },
        "visual": {
            "imageKeyword": "gourmet plated dish braised lamb savory herbs flavorful culinary restaurant",
            "imageDescription": "A masterfully plated entrée of slow-braised short ribs glistening with a dark savory glaze, garnished with fresh thyme and roasted baby root vegetables on an artisanal ceramic dish.",
            "mnemonic": "FLAVOR + FULL = literally FULL of flavor! Richly seasoned food that is bursting with delicious taste."
        },
        "video": {
            "description": "A culinary masterclass demonstrating how professional chefs layer spices, deglaze fond from pans, and incorporate aromatics to craft intensely flavorful stocks and sauces."
        },
        "toeicContext": {
            "commonParts": [
                3,
                5,
                7
            ],
            "exampleQuestion": "By simmering fresh root vegetables and herbs for several hours, the catering staff produced a broth that remained remarkably _____ without the addition of excess salt. (A) flavor (B) flavorful (C) flavorfully (D) flavorfulness",
            "tips": "The linking verb 'remained' is modified by the intensifier 'remarkably' and requires a predicate adjective to describe the subject 'a broth': (B) flavorful. Choice (A) is a noun/verb, (C) is an adverb, and (D) is an abstract noun."
        },
        "synonyms": [
            "tasty",
            "savory",
            "delicious",
            "palatable",
            "flavorsome",
            "appetizing"
        ],
        "antonyms": [
            "flavorless",
            "bland",
            "insipid",
            "tasteless",
            "unpalatable"
        ],
        "relatedWords": [
            "seasoned",
            "aromatic",
            "piquant",
            "zesty",
            "delectable",
            "gourmet",
            "mouthwatering"
        ]
    },
    {
        "id": "dining-136",
        "word": "flavoring",
        "partOfSpeech": [
            "noun"
        ],
        "category": "dining",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈfleɪ.vɚ.ɪŋ/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/flavoring--_us_1.mp3",
            "syllableBreakdown": "fla·vor·ing",
            "stressPattern": "●○○",
            "commonMistakes": "Learners often misplace the stress onto the middle syllable or drop the rhotic /ɚ/ sound, pronouncing it /fleɪˈvɔːr.ɪŋ/. Additionally, learners frequently confuse the noun 'flavoring' (a concentrated substance or extract added to food) with general 'seasoning' (table spices and herbs) or the present participle of the verb 'to flavor'."
        },
        "etymology": {
            "origin": "Formed in English as a verbal noun from the verb flavor (from Old French flaor, from Latin flāre) with the suffix -ing (from Old English -ung / -ing, denoting action, process, or resulting material).",
            "rootWord": "flāre + -ung",
            "rootMeaning": "substance or agent that imparts taste and scent",
            "evolution": "Coined in the 18th century alongside the commercial growth of bakery confectioners, distillers, and apothecary spice merchants, designating liquid concentrates, plant essences, and chemical extracts used specifically to impart distinct flavors to foods and drinks.",
            "relatedLanguages": [
                "French: arôme / aromatisant",
                "Spanish: aromatizante / saborizante",
                "Italian: aromatizzante",
                "German: Aromastoff / Geschmacksstoff",
                "Portuguese: aromatizante"
            ],
            "firstRecordedUse": "1720s in British confectioners' manuals and commercial trade ledgers"
        },
        "deepMeaning": {
            "coreConcept": "A concentrated substance, extract, essence, or seasoning compound introduced into food, beverage, or pharmaceutical products to impart, enhance, or modify a desired taste and olfactory profile.",
            "spatialContext": "Commercial food production plants, bakery prep shelves, flavor chemistry formulation labs, beverage bottling facilities, and confectionery workstations.",
            "temporalContext": "Ingredient measuring stages during pre-shift prep, product formulation trials during food R&D, and quality assurance shelf-life evaluations.",
            "emotionalTone": "Analytical, practical, precise, and ingredient-focused.",
            "formalityLevel": "neutral",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Native speakers immediately categorize 'flavoring' as an ingredient or additive—something measured in teaspoons or drops, stored in small glass bottles, or scrutinized on ingredient labels. In modern wellness culture, native consumers pay close attention to whether a product lists 'natural flavoring' versus 'artificial flavoring', associating the former with purity and the latter with industrial processing.",
            "mentalImage": "A pastry chef in a stainless-steel bakery station using an eye-dropper to measure three exact drops of organic Madagascar vanilla flavoring into a bowl of whipped cream frosting.",
            "whenToUse": "Use when discussing food ingredients, concentrated essences (almond, vanilla, mint), food science formulation, packaged food labels, and beverage manufacturing.",
            "whenNotToUse": "Do not use to describe the finished sensory taste experience of an entire meal (use 'flavor'); do not apply to plain table salt or ground black pepper, which are classified as 'seasonings' or 'spices'.",
            "culturalContext": "In both the United States and the European Union, food labeling regulations strictly govern terms like 'natural flavoring' versus 'artificial flavoring'. Transparency in flavoring ingredients has become a major selling point in the natural foods sector, frequently featured in corporate marketing claims and product reformulations."
        },
        "examples": {
            "daily": [
                "She measured a teaspoon of pure almond flavoring into the cookie batter before folding in the flour.",
                "Always inspect the nutrition label on snack foods if you are trying to avoid synthetic flavoring.",
                "A few drops of natural peppermint flavoring gave the homemade hot chocolate a festive holiday twist."
            ],
            "business": [
                "The confectionery company invested heavily in research to replace synthetic strawberry flavoring with real fruit extracts.",
                "Strict food labeling guidelines require our packaging to clearly distinguish between natural citrus flavoring and artificial additives.",
                "The purchasing department secured a bulk supply agreement with a certified organic vanilla flavoring producer in Madagascar."
            ],
            "conversation": [
                "\"Does this sparkling beverage contain any artificial flavoring or preservatives?\" / \"No, it is flavored exclusively with natural essence extracted from organic grapefruits.\"",
                "\"Which flavoring should we incorporate into the anniversary cake filling?\" / \"The head baker suggests using a blend of hazelnut flavoring and fresh espresso extract.\""
            ],
            "collocations": [
                "natural flavoring",
                "artificial flavoring",
                "vanilla flavoring",
                "added flavoring",
                "synthetic flavoring",
                "concentrated flavoring"
            ]
        },
        "wordFamily": {
            "noun": "flavoring",
            "verb": "flavor",
            "adjective": "flavored",
            "adverb": "flavorfully"
        },
        "visual": {
            "imageKeyword": "natural flavoring bottles liquid extracts vanilla beans bakery food science",
            "imageDescription": "Small amber apothecary dropper bottles labeled with natural extracts arranged on a marble surface alongside split vanilla beans, cinnamon bark, and fresh mint leaves.",
            "mnemonic": "FLAVOR + ING = The thING you drop into batter to add FLAVOR, like pure vanilla flavoring!"
        },
        "video": {
            "description": "An industrial food manufacturing documentary showing how organic botanicals, vanilla beans, and citrus rinds are cold-pressed into concentrated natural flavorings for the beverage sector."
        },
        "toeicContext": {
            "commonParts": [
                3,
                5,
                7
            ],
            "exampleQuestion": "In response to shifting consumer preferences for clean ingredients, the snack manufacturer pledged to remove all synthetic _____ from its product lines by next quarter. (A) flavorsome (B) flavorings (C) flavorfully (D) flavored",
            "tips": "The blank is modified by the adjective 'synthetic' and the quantifier 'all', requiring a plural count noun denoting additives: (B) flavorings. Choice (A) is an adjective, (C) is an adverb, and (D) is a past participle/adjective."
        },
        "synonyms": [
            "additive",
            "extract",
            "essence",
            "seasoning",
            "infusion",
            "aroma compound"
        ],
        "antonyms": [],
        "relatedWords": [
            "extract",
            "preservative",
            "botanical",
            "ingredient",
            "confectionery",
            "formulation",
            "emulsion"
        ]
    }
]

# Validation
forbidden_patterns = [
    r"manage the\.\.\.",
    r"documentation for\.\.\.",
    r"is ready for the board meeting",
    r"\bfactor\b",
    r"strategic workflows and operational accountability",
    r"core Germanic commercial root signifying foundational operational practice",
]

errors = []
for w in words:
    wid = w.get("id")
    word = w.get("word")
    w_json = json.dumps(w)
    for pat in forbidden_patterns:
        if re.search(pat, w_json, re.IGNORECASE):
            errors.append(f"{wid}: Matches forbidden pattern {pat}")
            
    # Check fields
    if len(w["examples"]["daily"]) != 3:
        errors.append(f"{wid}: daily count != 3")
    if len(w["examples"]["business"]) != 3:
        errors.append(f"{wid}: business count != 3")
    if not (2 <= len(w["examples"]["conversation"]) <= 3):
        errors.append(f"{wid}: conv count not in [2, 3]")
    if not (5 <= len(w["examples"]["collocations"]) <= 6):
        errors.append(f"{wid}: collocations count not in [5, 6]")
    if not (4 <= len(w["synonyms"]) <= 6):
        errors.append(f"{wid}: synonyms count not in [4, 6]")
    if not (5 <= len(w["relatedWords"]) <= 7):
        errors.append(f"{wid}: relatedWords count not in [5, 7]")
    if len(w["etymology"]["relatedLanguages"]) < 3:
        errors.append(f"{wid}: relatedLanguages < 3")

    for s in w["synonyms"]:
        if "factor" in s.lower() or "management" in s.lower():
            errors.append(f"{wid}: synonym contains forbidden word: {s}")

if errors:
    print("Errors found:")
    for e in errors:
        print("  -", e)
    sys.exit(1)
else:
    print("All 4 entries passed linguistic and structural checks!")

# Save to scratch/dining_133_136.json
with open("scratch/dining_133_136.json", "w", encoding="utf-8") as f:
    json.dump({"words": words}, f, indent=2, ensure_ascii=False)
print("Saved scratch/dining_133_136.json successfully.")
