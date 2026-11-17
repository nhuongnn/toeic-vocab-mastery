import json
import re

words_data = [
    {
        "id": "dining-149",
        "word": "grater",
        "partOfSpeech": ["noun"],
        "category": "dining",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/grater--_us_1.mp3",
            "commonMistakes": "Learners often pronounce the first vowel as a short /e/ ('greh-ter') or /æ/ ('gra-ter') instead of the proper diphthong /eɪ/. In North American English, the intervocalic 't' is pronounced as a quick alveolar tap/flap [ɾ], sounding like 'gray-der', whereas British speakers use an aspirated /t/ followed by a schwa /ə/ without rhoticity.",
            "ipa": "/ˈɡreɪ.tər/",
            "stressPattern": "●○",
            "syllableBreakdown": "gra·ter"
        },
        "etymology": {
            "evolution": "Derived from Old French grater ('to scrape, scratch'), which originated from Frankish *kratton ('to scratch'). It entered Middle English around the late 14th century to denote the abrasive culinary tool. The modern four-sided box grater was patented in the 1920s, while the fine rasp style (Microplane) was adapted from woodworking tools in the 1990s.",
            "firstRecordedUse": "late 14th century (c. 1390)",
            "origin": "Middle English grater, from Anglo-Norman and Old French grater ('to scratch, scrape'), of Germanic origin from Frankish *krattōn ('to scratch, scrape').",
            "relatedLanguages": [
                "French: gratter (to scratch/scrape), râpe (kitchen grater)",
                "Italian: grattugia (cheese grater), grattare (to scrape)",
                "Spanish: rallador (grater), gratar (archaic: to scratch)",
                "German: Reibe (grater), kratzen (to scratch)",
                "Dutch: rasp (grater), krabben (to scratch)"
            ],
            "rootMeaning": "to scrape, scratch, or rub harshly against a rough surface",
            "rootWord": "grater / *krattōn"
        },
        "deepMeaning": {
            "connotation": "neutral",
            "coreConcept": "A handheld or standalone kitchen utensil constructed from pierced metal or hard plastic featuring sharp, raised perforated teeth used to reduce solid foodstuffs (such as hard cheeses, citrus zest, root vegetables, chocolate, or spices) into fine shreds, shavings, or powder.",
            "emotionalTone": "Practical, functional, culinary, and precise.",
            "formalityLevel": "neutral",
            "spatialContext": "Commercial restaurant prep stations, salad pantry tables, bakery mise-en-place counters, and tableside gueridon carts.",
            "temporalContext": "Daily culinary prep shifts before meal service, tableside finishing immediately upon serving, and sanitation intervals."
        },
        "nativeMindset": {
            "culturalContext": "A staple tool across domestic and professional Western kitchens. In Italian and fine dining restaurants, grating fresh Parmigiano-Reggiano tableside is a cherished hospitality ritual signaling freshness and authentic culinary craft.",
            "howNativesThink": "Native speakers associate 'grater' primarily with cheese and citrus zest. They immediately visualize friction and mechanical reduction into delicate, melting shreds. In restaurants, servers often offer 'freshly grated cheese' as an upscale finishing touch.",
            "mentalImage": "A four-sided stainless steel box grater resting on an oiled walnut prep board, with delicate, feather-light curls of aged Parmesan cascading onto parchment paper beside fresh lemon zest.",
            "whenNotToUse": "Do not use 'grater' when referring to motorized food processors, mandoline slicers (which produce uniform flat slices), or vegetable peelers (which strip away outer skins in ribbons).",
            "whenToUse": "Use when designating the manual perforated tool designed specifically for shredding, grating, or zesting solid ingredients."
        },
        "examples": {
            "business": [
                "The head chef ordered twelve heavy-duty stainless steel box graters for the line cooks at the newly opened bistro.",
                "Kitchen safety guidelines mandate that all handheld cheese graters be washed with protective chainmail gloves to prevent finger injuries.",
                "The commercial catering package included rotary graters to speed up cheese preparation for five hundred banquet guests."
            ],
            "collocations": [
                "cheese grater",
                "box grater",
                "stainless steel grater",
                "fine grater",
                "coarse grater",
                "rotary grater"
            ],
            "conversation": [
                "\"Could you pass me the fine grater for the lemon zest?\" / \"Sure, it's drying on the magnetic rack right above the prep counter.\"",
                "\"Should we grate the pecorino cheese before plating or offer it tableside?\" / \"Let's have the servers use the handheld grater tableside for tonight's VIP banquet.\""
            ],
            "daily": [
                "She used the coarse side of the grater to shred two cups of cheddar cheese for the homemade pizza.",
                "Be sure to clean the grater immediately after shredding ginger so the tiny fibers do not dry inside the teeth.",
                "A handheld microplane grater makes it easy to dust fresh nutmeg over morning lattes."
            ]
        },
        "wordFamily": {
            "adjective": "grated",
            "adverb": "",
            "noun": "grater",
            "verb": "grate"
        },
        "visual": {
            "imageDescription": "A gleaming four-sided stainless steel box grater standing upright on a rustic cutting board, surrounded by mounds of finely grated Parmesan cheese, a block of cheddar, and citrus zest shavings.",
            "imageKeyword": "stainless steel box grater shredded parmesan cheese cutting board prep kitchen",
            "mnemonic": "GRATER: Think of the sharp metal GRATE that shreds cheese to make your dishes taste GREAT!"
        },
        "video": {
            "description": "A culinary arts instructional video demonstrating the four sides of a traditional box grater and proper hand placement techniques for safe vegetable shredding."
        },
        "toeicContext": {
            "commonParts": [1, 3, 4, 7],
            "exampleQuestion": "The kitchen supervisor instructed the new prep cooks to sanitize the cheese _____ thoroughly after every dinner service. (A) grater (B) grate (C) grated (D) gratingly",
            "tips": "Following the compound noun modifier 'the cheese', the sentence requires a countable concrete noun indicating the kitchen tool: (A) grater. Choice (B) is the base verb or framework noun, (C) is the past participle/adjective, and (D) is an adverb."
        },
        "synonyms": [
            "shredder",
            "rasp",
            "zester",
            "box grater",
            "food rasp",
            "rotary grater"
        ],
        "antonyms": [],
        "relatedWords": [
            "mandoline",
            "peeler",
            "zest",
            "shredding",
            "colander",
            "cutting board",
            "whisk"
        ]
    },
    {
        "id": "dining-150",
        "word": "gravy",
        "partOfSpeech": ["noun"],
        "category": "dining",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/gravy--_us_1.mp3",
            "commonMistakes": "Learners often articulate the first syllable with a short vowel /æ/ ('gra-vy') or open /ɑː/ ('grah-vy') rather than the diphthong /eɪ/. Ensure the /v/ is a voiced labiodental fricative where the top teeth press lightly against the bottom lip, rather than a bilabial /w/ or /b/.",
            "ipa": "/ˈɡreɪ.vi/",
            "stressPattern": "●○",
            "syllableBreakdown": "gra·vy"
        },
        "etymology": {
            "evolution": "Originated in Middle English culinary manuscripts (such as The Forme of Cury, c. 1390) as grave / gravey, derived from Old French gravé / grané ('seasoned stew broth'). The term probably arose as a scribal misreading of grané (from Latin grānum, 'grain, seed', referring to pepper seeds and spices). Over centuries, it evolved specifically into a thickened sauce made from pan drippings.",
            "firstRecordedUse": "late 14th century (c. 1390)",
            "origin": "Middle English grave / gravey, from Old French gravé (probably scribal error for grané, 'spiced broth', from grain / Latin grānum, 'grain').",
            "relatedLanguages": [
                "French: jus (roast juices), sauce au jus",
                "Italian: sugo d'arrosto (roast meat dripping sauce)",
                "Spanish: salsa de carne (meat sauce/gravy)",
                "German: Bratensauce (pan roast sauce)",
                "Dutch: jus (roast gravy, pan sauce)"
            ],
            "rootMeaning": "spiced broth or sauce prepared with seasoned meat juices",
            "rootWord": "grané / grānum"
        },
        "deepMeaning": {
            "connotation": "positive",
            "coreConcept": "A rich, savory sauce prepared from the natural juices and rendered fat released during the roasting or searing of meat, poultry, or mushrooms, typically simmered with stock and thickened with starch, flour, or a roux.",
            "emotionalTone": "Warm, comforting, savory, and celebratory.",
            "formalityLevel": "neutral",
            "spatialContext": "Banquet buffet carving stations, restaurant hot-holding wells, hotel dining halls, and holiday dinner tables.",
            "temporalContext": "Prepared at the end of roasting cycles immediately prior to plating; held above 140°F (60°C) during meal services; prominently featured during Thanksgiving and Sunday dinners."
        },
        "nativeMindset": {
            "culturalContext": "A quintessential comfort food staple in American, British, and Commonwealth cuisine. Gravy is synonymous with holiday banquets (Thanksgiving turkey and Christmas roasts) and Southern American breakfast biscuits with sausage gravy.",
            "howNativesThink": "Native speakers associate 'gravy' with warmth, comfort, and festive feasts where dry roast meat and mashed potatoes are united by a flavorful sauce. Idiomatically, 'it's all gravy' or 'gravy train' refers to effortless ease, windfall benefits, or an unexpectedly delightful bonus.",
            "mentalImage": "A steaming white porcelain gravy boat with a contoured pouring spout, pouring a velvety golden-brown herb pan sauce over roasted turkey breast and a mound of buttery mashed potatoes.",
            "whenNotToUse": "Do not use 'gravy' for sweet dessert coulis, emulsified salad dressings (vinaigrettes), or tomato sauces in standard culinary English (though some East Coast Italian-Americans colloquially refer to marinara as 'Sunday gravy').",
            "whenToUse": "Use when referring to savory thickened sauces made from roast meat drippings, stock, and seasoning served over meats, potatoes, stuffing, or biscuits."
        },
        "examples": {
            "business": [
                "The banquet manager confirmed that carving stations will feature heated chafing pans of rosemary beef gravy throughout the corporate gala.",
                "Our catering team developed a rich wild-mushroom gravy to accommodate vegetarian guests attending the executive luncheon.",
                "The hotel restaurant standardizes its roast poultry presentation by serving pan gravy in pre-warmed ceramic gravy boats."
            ],
            "collocations": [
                "gravy boat",
                "brown gravy",
                "turkey gravy",
                "pan gravy",
                "sausage gravy",
                "ladle gravy"
            ],
            "conversation": [
                "\"Is the chicken gravy made with wheat flour, or is it gluten-free?\" / \"The chef used cornstarch to thicken it today, so it is completely safe for gluten-sensitive diners.\"",
                "\"Could you bring extra gravy to the carving station on the second floor?\" / \"I'll carry up two warm carafes from the kitchen immediately.\""
            ],
            "daily": [
                "He ladled two generous scoops of steaming turkey gravy over his potatoes and green bean casserole.",
                "Whisking a little cold water into the cornstarch before adding it to the pan will prevent lumps in your gravy.",
                "On Sunday mornings, the diner serves warm buttermilk biscuits smothered in savory country sausage gravy."
            ]
        },
        "wordFamily": {
            "adjective": "gravied",
            "adverb": "",
            "noun": "gravy",
            "verb": ""
        },
        "visual": {
            "imageDescription": "A classic porcelain gravy boat pouring glossy, savory brown pan gravy over sliced roast turkey breast and creamy mashed potatoes garnished with fresh thyme on a wooden dining table.",
            "imageKeyword": "porcelain gravy boat pouring brown sauce roast turkey mashed potatoes banquet",
            "mnemonic": "GRAVY: The juices you SAVED from the roast create the rich GRAVY that everyone CRAVES!"
        },
        "video": {
            "description": "A professional cooking tutorial showing a culinary school instructor teaching students how to deglaze a roasting pan with stock and whisk a smooth, lump-free pan gravy."
        },
        "toeicContext": {
            "commonParts": [1, 3, 4, 7],
            "exampleQuestion": "The catered buffet includes roasted prime rib accompanied by garlic roasted potatoes and a side of red-wine _____. (A) gravy (B) gravies (C) gravied (D) gravitating",
            "tips": "Following the compound noun modifier 'red-wine' and indefinite prepositional structure, the blank requires the singular non-count food noun: (A) gravy. (B) is plural, (C) is a participle/adjective, and (D) is an unrelated verb participle."
        },
        "synonyms": [
            "pan sauce",
            "jus",
            "meat sauce",
            "pan drippings",
            "reduction sauce",
            "velouté"
        ],
        "antonyms": [],
        "relatedWords": [
            "gravy boat",
            "pan drippings",
            "deglaze",
            "roux",
            "broth",
            "carving station",
            "mashed potatoes"
        ]
    },
    {
        "id": "dining-151",
        "word": "grill",
        "partOfSpeech": ["noun"],
        "category": "dining",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/grill--_us_1.mp3",
            "commonMistakes": "Learners often replace the short lax vowel /ɪ/ with a tense /iː/ ('greel'). Be sure to pronounce the dark 'l' ([ɫ]) at the end by keeping the tongue body lowered while the tip touches the alveolar ridge, avoiding dropping the final consonant or adding an extra vowel.",
            "ipa": "/ɡrɪl/",
            "stressPattern": "●",
            "syllableBreakdown": "grill"
        },
        "etymology": {
            "evolution": "Originated from Middle French gril / grille ('metal lattice, gridiron'), derived from Latin crātīcula ('small gridiron, wicker hurdle'), diminutive of crātis. It entered English in the mid-17th century denoting the iron cooking grate. In the 19th century, it broadened to refer to restaurants serving grilled meats ('grill room'), and later to commercial gas and electric appliances.",
            "firstRecordedUse": "mid-17th century (c. 1655)",
            "origin": "Middle French gril / grille ('grate, gridiron'), from Latin crātīcula ('small wickerwork frame, gridiron'), diminutive of crātis ('hurdle, lattice').",
            "relatedLanguages": [
                "French: gril (cooking grate), grille (grating, lattice)",
                "Spanish: parrilla (grill, gridiron), reja (grate)",
                "Italian: griglia (grill, gridiron), graticola (barbecue grate)",
                "German: Grill (borrowed), Rost (metal cooking grate)",
                "Portuguese: grelha (grill rack, gridiron)"
            ],
            "rootMeaning": "metal gridiron, wickerwork frame, or grating",
            "rootWord": "crātīcula / crātis"
        },
        "deepMeaning": {
            "connotation": "positive",
            "coreConcept": "A cooking apparatus consisting of parallel metal bars, cast-iron grates, or a flat-top metal surface heated from below by gas burners, charcoal, or electric elements; by extension, a casual restaurant or dining room specializing in grilled food.",
            "emotionalTone": "Energetic, hearty, appetizing, and sociable.",
            "formalityLevel": "neutral",
            "spatialContext": "Commercial restaurant cook lines, outdoor hotel patio terraces, corporate catering pavilions, and casual dining rooms.",
            "temporalContext": "Operated continuously during peak lunch and dinner rushes; preheated 15 to 20 minutes prior to shift startup; thoroughly brushed and degreased during evening closing."
        },
        "nativeMindset": {
            "culturalContext": "Central to North American, Australian, British, and global barbecue culture. In hospitality, 'the grill' represents one of the busiest, high-intensity stations on the kitchen line. In casual dining, 'bar and grill' is a ubiquitous venue format for social dining.",
            "howNativesThink": "Native speakers associate 'grill' with intense heat, charred sear marks, smoky aroma, and outdoor weekend gatherings. In a figurative sense, 'to grill' means to interrogate or subject someone to rigorous questioning.",
            "mentalImage": "Thick prime steaks and skewered vegetables sizzling over red-hot cast-iron grates of a commercial stainless steel gas grill, with rising embers and distinct sear marks forming.",
            "whenNotToUse": "Do not confuse with a 'smoker' (which cooks foods slowly at low temperatures with indirect smoke) or a conventional 'oven' (which surrounds food with dry circulating air rather than radiant heat from a grate).",
            "whenToUse": "Use when referring to the cooking apparatus with grates, the grill cooking station, or a restaurant specializing in broiled and grilled meats."
        },
        "examples": {
            "business": [
                "The corporate resort upgraded its patio dining facility by installing a heavy-duty commercial outdoor gas grill.",
                "Health inspectors verified that the exhaust hood above the kitchen grill complies with municipal ventilation codes.",
                "The restaurant manager scheduled two seasoned line cooks to operate the busy steakhouse grill during Friday night dinner service."
            ],
            "collocations": [
                "charcoal grill",
                "gas grill",
                "outdoor grill",
                "clean the grill",
                "preheat the grill",
                "bar and grill"
            ],
            "conversation": [
                "\"Has the kitchen staff finished preheating the outdoor grill for the banquet reception?\" / \"Yes, the burners are at high heat and the grates are oiled and ready for the steaks.\"",
                "\"Where are we hosting the quarterly client dinner tomorrow evening?\" / \"We reserved a private dining alcove at the Harbor Bar and Grill downtown.\""
            ],
            "daily": [
                "Make sure to scrape the charcoal grill with a wire brush before placing the marinated salmon on the grates.",
                "We set up a small portable grill in the park to cook hamburgers for my brother's birthday picnic.",
                "Close the lid of the grill to keep the temperature steady and cook the chicken breasts evenly."
            ]
        },
        "wordFamily": {
            "adjective": "grilled",
            "adverb": "",
            "noun": "grill",
            "verb": "grill"
        },
        "visual": {
            "imageDescription": "A stainless steel outdoor commercial grill with glowing flames beneath heavy cast-iron grates, searing seasoned steaks and colorful bell peppers marked with crosshatch grill marks.",
            "imageKeyword": "commercial stainless steel gas grill searing steaks flame flare outdoor dining",
            "mnemonic": "GRILL: The metal GRID cooks food with a THRILL over red-hot coals!"
        },
        "video": {
            "description": "A restaurant line-cooking training video showing a head chef demonstrating heat zone management and grate cleaning techniques on a commercial gas charbroiler."
        },
        "toeicContext": {
            "commonParts": [1, 3, 4, 7],
            "exampleQuestion": "The kitchen supervisor instructed the maintenance crew to inspect the commercial gas _____ before the start of the summer tourist season. (A) grill (B) grilled (C) grilling (D) griller",
            "tips": "Following the adjective modifier 'commercial gas', the blank requires a singular concrete noun designating the cooking equipment: (A) grill. Choice (B) is a past participle/adjective, (C) is a gerund/participle, and (D) is an uncommon agent noun."
        },
        "synonyms": [
            "charbroiler",
            "gridiron",
            "grate",
            "griddle",
            "barbecue grill",
            "broiler"
        ],
        "antonyms": [],
        "relatedWords": [
            "charbroiler",
            "barbecue",
            "sear marks",
            "tongs",
            "charcoal",
            "smoker",
            "skewer"
        ]
    },
    {
        "id": "dining-152",
        "word": "grilling",
        "partOfSpeech": ["noun"],
        "category": "dining",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/grilling--_us_1.mp3",
            "commonMistakes": "Learners often substitute the short /ɪ/ in the first syllable with /iː/ ('greel-ing'). In the final unstressed syllable, articulate the velar nasal /ŋ/ cleanly rather than dropping it to an alveolar /n/ ('grillin') or adding an audible hard plosive /ɡ/.",
            "ipa": "/ˈɡrɪl.ɪŋ/",
            "stressPattern": "●○",
            "syllableBreakdown": "grill·ing"
        },
        "etymology": {
            "evolution": "Formed in Modern English by attaching the verbal action suffix -ing to the verb grill (from Middle French griller, 'to cook on a grate'). It appeared in English cookery in the early 18th century as a technical culinary term for dry-heat broiling. In the late 19th and early 20th centuries, it adopted the figurative meaning of subjecting a suspect or executive to intense questioning.",
            "firstRecordedUse": "early 18th century (c. 1720)",
            "origin": "Modern English derivation of grill (from Middle French gril / Latin crātīcula) + -ing (Old English nominalizing suffix).",
            "relatedLanguages": [
                "French: grillade (grilled food / the act of grilling)",
                "Spanish: parrillada (barbecue cookout / grilling)",
                "Italian: grigliatura (process of grilling)",
                "German: Grillen (act of grilling / barbecue cookout)",
                "Portuguese: grelhados (grilling process / grilled meats)"
            ],
            "rootMeaning": "the process or action of cooking food over direct dry radiant heat on a grate",
            "rootWord": "grill + -ing"
        },
        "deepMeaning": {
            "connotation": "neutral",
            "coreConcept": "A fast, dry-heat culinary method where food is placed on an open grate and exposed directly to high radiant heat from below or above to sear the exterior and develop caramelized flavors; metaphorically, an intense, persistent session of questioning or cross-examination.",
            "emotionalTone": "Dynamic, intense, focused, and culinary.",
            "formalityLevel": "neutral",
            "spatialContext": "Restaurant kitchen hot lines, outdoor banquet patios, culinary demonstration classrooms, and corporate boardrooms (figurative).",
            "temporalContext": "A rapid cooking method taking anywhere from two to fifteen minutes per serving; prevalent during summer catering seasons and lunch/dinner rush hours."
        },
        "nativeMindset": {
            "culturalContext": "Widely regarded in modern gastronomy as a healthy, flavor-forward cooking technique that minimizes excess fat while adding smoky depth. In corporate and political discourse, 'a grilling' is a widely recognized metaphor for harsh, unrelenting scrutiny by a panel or committee.",
            "howNativesThink": "Native speakers associate 'grilling' with speed, smoky caramelization, high heat, and distinct sear marks that denote culinary skill and fresh preparation. In a professional or business context, natives often use 'grilling' figuratively to describe enduring tough, relentless questioning from a board of directors, auditors, or interview panel (e.g., 'The CEO faced a harsh grilling from lawmakers').",
            "mentalImage": "A restaurant line cook in a crisp chef coat and apron using stainless steel tongs to deftly turn marinated salmon fillets on high-heat grates while plumes of savory smoke rise into the exhaust hood.",
            "whenNotToUse": "Do not use 'grilling' for moist-heat cooking methods such as boiling, poaching, braising, or steaming, nor for gentle enclosed oven baking where dry hot air circulates without direct open radiant heat.",
            "whenToUse": "Use when referring to the culinary method of cooking over high direct radiant heat, or figuratively when describing intense cross-examination or critical questioning in business/politics."
        },
        "examples": {
            "business": [
                "The hotel banquet kitchen adopted precision induction grilling to cut kitchen energy consumption by twenty percent.",
                "During yesterday's quarterly earnings call, the chief financial officer endured an intense grilling from financial analysts regarding declining profit margins.",
                "Culinary apprentices must master high-heat grilling techniques before they are assigned to the main restaurant dinner line."
            ],
            "collocations": [
                "outdoor grilling",
                "charcoal grilling",
                "grilling techniques",
                "grilling season",
                "intense grilling",
                "face a grilling"
            ],
            "conversation": [
                "\"Which cooking method will the catering staff use for the garden reception?\" / \"They plan on live outdoor grilling, preparing skewers and seafood right before the guests.\"",
                "\"How did your departmental budget review go with the executive committee?\" / \"It was tough; the directors gave our team a thorough grilling about operational expenses.\""
            ],
            "daily": [
                "Grilling vegetables with a light brush of olive oil prevents them from sticking to the grates.",
                "Our neighborhood holds an annual outdoor grilling festival every July with amateur barbecue competitions.",
                "He learned that proper grilling requires keeping one side of the charcoal bed cooler for gentle indirect heat."
            ]
        },
        "wordFamily": {
            "adjective": "grilled",
            "adverb": "",
            "noun": "grilling",
            "verb": "grill"
        },
        "visual": {
            "imageDescription": "A professional chef in uniform using long metal tongs to turn seasoned salmon fillets on a commercial charbroiler grill, with open flames licking the grates and smoke curling upward.",
            "imageKeyword": "chef grilling fresh salmon fillets open flames commercial kitchen tongs",
            "mnemonic": "GRILLING: Think of the sizzling sound 'GRRR...' of high heat and the distinct grill marks created during GRILLING!"
        },
        "video": {
            "description": "An instructional culinary video demonstrating professional two-zone grilling techniques for cooking thick steaks with a caramelized crust and tender center."
        },
        "toeicContext": {
            "commonParts": [3, 4, 5, 7],
            "exampleQuestion": "Proper _____ of poultry requires using a calibrated food thermometer to confirm that the internal temperature reaches safe standards. (A) grilling (B) grills (C) grilled (D) griller",
            "tips": "Following the adjective 'Proper' and preceding the prepositional phrase 'of poultry', the sentence requires a verbal noun (gerund) expressing the culinary cooking method: (A) grilling. (B) is a plural noun or verb, (C) is a past participle/adjective, and (D) is an agent noun."
        },
        "synonyms": [
            "charbroiling",
            "barbecuing",
            "broiling",
            "searing",
            "cross-examination",
            "interrogation"
        ],
        "antonyms": [
            "poaching",
            "steaming",
            "boiling",
            "braising"
        ],
        "relatedWords": [
            "sear marks",
            "caramelization",
            "charbroiler",
            "direct heat",
            "basting",
            "skewers",
            "roasting"
        ]
    }
]

with open("scratch/words_dining_149_152.json", "w", encoding="utf-8") as f:
    json.dump({"words": words_data}, f, indent=2, ensure_ascii=False)

print("Saved to scratch/words_dining_149_152.json")
