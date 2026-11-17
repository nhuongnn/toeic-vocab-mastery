import json
import re

words_data = [
    {
        "id": "dining-189",
        "word": "mushroom",
        "partOfSpeech": ["noun"],
        "category": "dining",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈmʌʃ.ruːm/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/mushroom--_us_1.mp3",
            "syllableBreakdown": "mush·room",
            "stressPattern": "●○",
            "commonMistakes": "Learners often mispronounce the first vowel /ʌ/ as /ʊ/ (rhyming with 'push') or /uː/, pronouncing it incorrectly as *moosh-room*. Another common mistake is substituting the voiceless postalveolar fricative /ʃ/ with an alveolar /s/ (*muss-room*). While the second syllable can vary between /uː/ and /ʊ/ in standard native speech, primary stress must remain firmly on the first syllable."
        },
        "etymology": {
            "origin": "Middle English 'muscheron' or 'mousseron', borrowed from Anglo-French 'mousseron', from Old French 'moisseron', likely derived from Late Latin 'mussirio', or influenced by French 'mousse' (moss, of Frankish / Proto-Germanic origin *mōs, referring to the damp, mossy woodland habitat where fungi thrive).",
            "rootWord": "Old French mousseron / Late Latin mussirio (influenced by French mousse)",
            "rootMeaning": "Moss-dweller; edible fungus growing amidst damp moss and woodland leaf litter",
            "evolution": "In Old French, 'mousseron' specifically designated the edible St. George's mushroom. Borrowed into Middle English in the 15th century, the ending was assimilated to '-room' through folk etymology. By the 16th century, the term generalized to denote any fleshy umbrella-shaped fungal fruiting body. The rapid, overnight growth of wild fungi subsequently inspired the figurative verb 'to mushroom' (to proliferate or expand rapidly) by the late 16th century. In modern gastronomy, mushrooms are celebrated for their rich umami flavor and meaty texture in plant-forward and fine-dining cuisine.",
            "relatedLanguages": [
                "French: mousseron (St. George's mushroom) / champignon (mushroom generally)",
                "Spanish: champiñón (cultivated mushroom) / seta (wild mushroom)",
                "Italian: fungo (mushroom) / prugnolo (mousseron)",
                "German: Champignon (button mushroom) / Pilz (fungus, mushroom)"
            ],
            "firstRecordedUse": "Late 15th century (c. 1440 as 'muscheron' in Middle English culinary and botanical vocabularies)"
        },
        "deepMeaning": {
            "coreConcept": "The fleshy, spore-bearing fruiting body of a fungus, typically produced above ground on soil or decaying organic matter and having an umbrella-shaped cap upon a stalk; widely cultivated or wild-foraged for culinary preparation due to its rich umami flavor, dense texture, and high versatility in broths, sauces, sautés, and vegetarian entrées.",
            "spatialContext": "Commercial restaurant prep counters with paring knives and damp wiping cloths, temperature-controlled walk-in produce coolers, sauté stations with high-heat copper or cast-iron pans, and gourmet produce display crates at farmers' markets.",
            "temporalContext": "Harvested year-round in commercial indoor darkrooms with climate control, alongside seasonal spring and autumn foraging periods for wild varieties like morels and chanterelles; prepared à la minute over intense heat to avoid water release.",
            "emotionalTone": "Earthy, savory, gourmet, hearty, and umami-rich.",
            "formalityLevel": "neutral",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "Native speakers immediately associate 'mushroom' with savory richness (umami) and gourmet earthiness. When dining out, native speakers view mushrooms as the primary natural, un-processed alternative to meat—such as a grilled portobello cap serving as a burger patty. In executive catering, highlighting wild mushrooms conveys artisanal quality and sophistication. Furthermore, native speakers intuitively use the word as a verb meaning to proliferate rapidly (e.g., 'expenses mushroomed overnight').",
            "mentalImage": "A hot, heavy cast-iron skillet filled with sizzling, caramelized cremini and shiitake mushroom slices, tossed in brown butter, minced garlic, and fresh thyme sprigs, giving off a deep, earthy aroma.",
            "whenToUse": "Use when referencing edible fungi (button, cremini, portobello, shiitake, chanterelle) in menu descriptions, dietary inquiries, recipe preparations, or restaurant ordering; or figuratively as a verb describing sudden, exponential expansion.",
            "whenNotToUse": "Do not substitute 'fungus' in dining settings; telling guests that a dish contains 'fungus' sounds clinical or moldy rather than appetizing. Do not use 'toadstool' for culinary mushrooms, as 'toadstool' strongly connotes poisonous or inedible wild fungi.",
            "culturalContext": "Mushrooms are a staple of Western banquet catering, frequently starring as the centerpiece for vegetarian, vegan, and flexitarian corporate dining. In TOEIC Parts 3, 4, and 7, mushrooms appear regularly in restaurant dialogues regarding special dietary orders, conference banquet menus, and local supplier partnerships."
        },
        "examples": {
            "daily": [
                "He added a generous handful of sliced button mushrooms to the simmering tomato pasta sauce.",
                "The weekend farmers' market features locally foraged wild mushrooms, including fresh chanterelles and morels.",
                "She ordered the grilled portobello mushroom burger with roasted red peppers at the neighborhood bistro."
            ],
            "business": [
                "The catering director updated the corporate gala dinner menu to offer a wild mushroom risotto for vegetarian delegates.",
                "Due to supply disruptions from our regional organic farm, the executive chef substituted cremini mushrooms in the banquet entrées.",
                "The conference venue received positive feedback from attendees regarding its roasted chicken with creamy wild mushroom sauce."
            ],
            "conversation": [
                "\"Does the seasonal vegetable soup contain any wild mushrooms? One of our clients has a severe fungal allergy.\" / \"Yes, it does contain shiitake and chanterelles, but our kitchen can prepare a separate roasted tomato soup for that guest.\"",
                "\"Have we finalized the vegetarian option for the executive banquet next Thursday?\" / \"Yes, the chef recommended the stuffed portobello mushroom with quinoa and sautéed spinach, which was approved yesterday.\""
            ],
            "collocations": [
                "wild mushroom",
                "sliced mushroom",
                "sautéed mushrooms",
                "mushroom sauce",
                "mushroom soup",
                "portobello mushroom"
            ]
        },
        "wordFamily": {
            "noun": "mushroom",
            "verb": "mushroom",
            "adjective": "mushroomy",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "sautéed wild mushrooms skillet culinary gourmet garlic thyme",
            "imageDescription": "A gourmet selection of sliced cremini, shiitake, and chanterelle mushrooms sautéed to a golden brown in a cast-iron skillet, garnished with fresh thyme and cracked black pepper on a rustic wooden restaurant table.",
            "mnemonic": "MUSHROOM: When it rains, wild fungi find ROOM to MUSH-up overnight, creating tender caps with deep savory umami flavor!"
        },
        "video": {
            "description": "An instructional culinary video by an executive chef demonstrating proper searing techniques for wild mushrooms in a dry pan to prevent sogginess and maximize deep umami flavor."
        },
        "toeicContext": {
            "commonParts": [3, 4, 7],
            "exampleQuestion": "To accommodate conference delegates with specific dietary requirements, the banquet chef has added a roasted vegetable and _____ tart to the luncheon menu. (A) mushroom (B) mushrooms (C) mushrooming (D) mushroomed",
            "tips": "In TOEIC Part 5, when a noun acts as an attributive noun adjunct modifying another noun ('tart') alongside a coordinate noun ('vegetable'), the singular form is required: (A) mushroom. Choice (B) is the plural form, which is ungrammatical as a pre-modifying adjunct in this context; choices (C) and (D) are participial verb forms."
        },
        "synonyms": [
            "fungus",
            "champignon",
            "cremini",
            "toadstool",
            "morel",
            "porcini"
        ],
        "antonyms": [],
        "relatedWords": [
            "fungi",
            "truffle",
            "shiitake",
            "portobello",
            "umami",
            "chanterelle",
            "produce"
        ]
    },
    {
        "id": "dining-190",
        "word": "mustard",
        "partOfSpeech": ["noun"],
        "category": "dining",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈmʌs.tərd/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/mustard--_us_1.mp3",
            "syllableBreakdown": "mus·tard",
            "stressPattern": "●○",
            "commonMistakes": "Learners frequently pronounce the second syllable with an open, fully articulated vowel /tɑːrd/ or /tærd/ (*mus-TARD*), whereas standard English reduces the unstressed second syllable to a weak schwa /tərd/. Also, ensure the first vowel /ʌ/ is pronounced cleanly rather than rounded into /ʊ/ (*moos-tard*)."
        },
        "etymology": {
            "origin": "Middle English 'mustarde', borrowed from Anglo-French 'moustarde', from Old French 'moustarde' (Modern French 'moutarde'), derived from 'moust' (must, unfermented grape juice, from Latin 'mustum') combined with the pejorative or characteristic suffix '-arde'.",
            "rootWord": "Latin mustum (must, fresh grape juice) / Old French moustarde",
            "rootMeaning": "Burning must; a pungent paste made by blending crushed mustard seeds with unfermented wine must",
            "evolution": "Ancient Roman gastronomes ground mustard seeds (*sinapis*) and mixed them with fresh, unfermented wine grape juice (*mustum ardens* or 'burning must') to release pungent allyl isothiocyanate oils. This method evolved into the Old French 'moustarde' in the 13th century, establishing Dijon as the historical capital of mustard production by substituting acidic verjuice for grape must. Transferred into Middle English by 1290, mustard became a dominant European condiment for preserving meats and cutting grease. Today, it ranges from sweet American yellow mustard to robust stone-ground Dijon and spicy English varieties.",
            "relatedLanguages": [
                "French: moutarde (mustard)",
                "Spanish: mostaza (mustard)",
                "Italian: mostarda (spicy mustard condiment or fruit preserves in mustard syrup)",
                "German: Senf (mustard, from Latin sinapis; Mostrich in regional dialects)"
            ],
            "firstRecordedUse": "Late 13th century (c. 1290 in Middle English monastic culinary ledgers and domestic expense rolls)"
        },
        "deepMeaning": {
            "coreConcept": "A pungent, sharp, and aromatic condiment or paste prepared from the ground seeds of the mustard plant (*Brassica* / *Sinapis* family) blended with liquids such as vinegar, water, wine, or verjuice, combined with salt and spices; widely utilized to impart acidity, spice, and natural emulsification to dressings, marinades, deli sandwiches, and roasted meats.",
            "spatialContext": "Delicatessen sandwich preparation lines, executive dining room condiment caddies, banquet salad dressing stations, restaurant sauce-making lines, and refrigerated food-service condiment pumps.",
            "temporalContext": "Prepared in advance during morning prep to emulsify vinaigrettes and marinades; served tableside in ramekins or squeeze bottles during lunch and dinner services; brushed onto roasted meats during final glazing stages.",
            "emotionalTone": "Pungent, tangy, zesty, sharp, savory, and invigorating.",
            "formalityLevel": "neutral",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "Native speakers view 'mustard' along a distinct spectrum of culinary formality: bright yellow mustard is casual, synonymous with ballparks, barbecue lunches, and diners; stone-ground Dijon or coarse French mustard connotes gourmet sophistication, bistro dining, and upscale charcuterie. In professional idiomatic English, native business executives frequently employ the classic phrase 'to cut the mustard' (to meet required quality standards or perform satisfactorily).",
            "mentalImage": "A small white ceramic ramekin of golden stone-ground Dijon mustard with visible dark seeds, beside a small polished wooden spreader on a slate board holding artisan pastrami and crusty rye bread.",
            "whenToUse": "Use when identifying table condiments, sandwich dressings, vinaigrette emulsion ingredients, glaze marinades, or charcuterie accompaniments; or in the common performance idiom 'cut the mustard'.",
            "whenNotToUse": "Do not confuse 'mustard' (the prepared condiment or plant) with 'mustard greens' (the leafy vegetable) without qualifying the noun. Do not confuse standard English mustard with Italian 'mostarda', which denotes candied fruit steeped in mustard-flavored syrup.",
            "culturalContext": "Mustard holds a prominent place across Western corporate and casual dining, from casual deli luncheons to multi-course plated banquets where Dijon sauces accompany beef tenderloin or salmon. In TOEIC test dialogues (Part 3/4) and catering order inquiries (Part 7), it surfaces frequently in dietary requests, sandwich customizations, and buffet condiment options."
        },
        "examples": {
            "daily": [
                "She spread a spoonful of spicy brown mustard over her turkey and Swiss cheese sandwich.",
                "Could you pass the mustard and pepper from the condiment tray in the middle of the table?",
                "He whisked whole-grain Dijon mustard into red wine vinegar and olive oil to make a quick vinaigrette."
            ],
            "business": [
                "The corporate luncheon buffet features an artisan deli counter offering honey mustard, coarse Dijon, and traditional yellow mustard.",
                "Our executive catering package provides roasted pork tenderloin paired with an apple cider and stone-ground mustard glaze.",
                "The hotel restaurant supervisor confirmed that all tableside condiment caddies are restocked with fresh mustard and ketchup jars before service."
            ],
            "conversation": [
                "\"Does this catered boxed lunch include any salad dressings or condiments?\" / \"Yes, individual packets of mayonnaise, Dijon mustard, and Italian dressing are packed inside each box.\"",
                "\"Would you prefer mayonnaise or whole-grain mustard on your smoked ham panini?\" / \"Just a little whole-grain mustard, please, along with extra pickles.\""
            ],
            "collocations": [
                "Dijon mustard",
                "whole-grain mustard",
                "honey mustard",
                "spicy brown mustard",
                "yellow mustard",
                "mustard seed"
            ]
        },
        "wordFamily": {
            "noun": "mustard",
            "adjective": "mustardy",
            "verb": "",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "Dijon mustard ramekin wooden spoon gourmet condiment dining",
            "imageDescription": "A small white porcelain ramekin filled with coarse, golden Dijon grain mustard, garnished with a tiny wooden serving paddle, resting beside a gourmet smoked turkey sandwich on artisan rye bread.",
            "mnemonic": "MUSTARD: When eating a deli sandwich, you MUST-ADD that sharp, zesty spread to cut through the rich meat!"
        },
        "video": {
            "description": "A culinary instructional demonstration showing a French chef whisking Dijon mustard with vinegar and extra virgin olive oil, explaining how the natural mucilage in mustard creates a stable, silky vinaigrette."
        },
        "toeicContext": {
            "commonParts": [3, 4, 7],
            "exampleQuestion": "The gourmet sandwich bar in the corporate cafeteria provides guests with an array of condiments, including garlic aioli and stone-ground _____. (A) mustard (B) mustards (C) mustardy (D) muster",
            "tips": "In TOEIC Part 5, identify the mass non-count noun required to complete the compound object after 'stone-ground': (A) mustard. Choice (B) is plural and unnatural here; (C) is an adjective; and (D) 'muster' is a completely different word meaning to assemble troops or summon energy."
        },
        "synonyms": [
            "condiment",
            "Dijon",
            "relish",
            "seasoning",
            "dressing",
            "sauce"
        ],
        "antonyms": [],
        "relatedWords": [
            "condiment",
            "mayonnaise",
            "ketchup",
            "vinegar",
            "vinaigrette",
            "horseradish",
            "delicatessen"
        ]
    },
    {
        "id": "dining-191",
        "word": "napkin",
        "partOfSpeech": ["noun"],
        "category": "dining",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/ˈnæp.kɪn/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/napkin--_us_1.mp3",
            "syllableBreakdown": "nap·kin",
            "stressPattern": "●○",
            "commonMistakes": "Learners sometimes over-enunciate the unstressed second syllable as /kiːn/ (*nap-KEEN*) rather than a short /kɪn/ or reduced /kən/. In listening comprehension, be aware of regional variation: British and Commonwealth speakers frequently use 'serviette' for everyday paper napkins, though 'napkin' remains the formal standard."
        },
        "etymology": {
            "origin": "Middle English 'napekin', formed from Old French 'nappe' (tablecloth, cloth, sheet, from Latin 'mappa' meaning cloth, napkin, signal cloth) + the Middle English diminutive suffix '-kin' (meaning little, small).",
            "rootWord": "Latin mappa (cloth, napkin) / Old French nappe + -kin",
            "rootMeaning": "Little tablecloth; small linen cloth designed to wipe hands and mouth during meals",
            "evolution": "In ancient Rome, guests brought their own 'mappae' to wipe their fingers and pack leftovers. In medieval France, the word became 'nappe' for tablecloth. Late 14th-century Anglo-Norman diners attached the English diminutive suffix '-kin' to produce 'napekin', literally meaning a small cloth or miniature tablecloth. During the Renaissance, intricate napkin folding became an aristocratic art form signifying ceremonial hospitality. In the late 19th and early 20th centuries, the development of cellulose wood-pulp processing birthed disposable paper napkins, democratizing table hygiene across modern cafeterias and restaurants.",
            "relatedLanguages": [
                "French: nappe (tablecloth) / serviette (napkin, towel)",
                "Spanish: servilleta (napkin) / mantel (tablecloth)",
                "Italian: tovagliolo (napkin) / tovaglia (tablecloth)",
                "German: Serviette (napkin) / Tischtuch (tablecloth)"
            ],
            "firstRecordedUse": "Late 14th century (c. 1380 in Middle English court expenditure rolls and monastic dining registers)"
        },
        "deepMeaning": {
            "coreConcept": "A square or rectangular piece of cloth (such as starched linen or cotton) or absorbent disposable paper placed on dining tables to wipe the lips and fingers, blot minor spills, and protect personal attire when draped across the lap during a meal.",
            "spatialContext": "Formal dining place settings (positioned to the left of forks, inside water goblets, or atop charger plates), cafeteria condiment counters with spring-loaded dispensers, banquet staging tables, and cocktail bar caddies.",
            "temporalContext": "Placed on the lap immediately upon taking one's seat at the table; used unobtrusively before taking a drink of water or wine to prevent glassware smudging; placed loosely to the left of the dinner plate upon concluding the meal.",
            "emotionalTone": "Polished, hygienic, civilized, courteous, and etiquette-conscious.",
            "formalityLevel": "neutral",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "Native speakers immediately associate 'napkins' with dining etiquette and hygiene. In corporate dining, placing a cloth napkin on one's lap without hesitation is a primary unconscious indicator of executive presence. Native speakers also distinguish between formal cloth napkins (associated with fine dining and weddings) and paper napkins (fast casual and cafeteria dining). Figuratively, native business professionals embrace the concept of a 'napkin sketch'—an informal brainstorm, architectural layout, or business deal spontaneously outlined on the back of a cocktail napkin.",
            "mentalImage": "An immaculate corporate banquet table setting featuring an ironed, crisp white linen napkin folded neatly into a standing pyramid atop a gleaming silver charger plate, flanked by polished silverware and fine wine glasses.",
            "whenToUse": "Use when discussing table place settings, restaurant supplies, banquet preparation, dining etiquette, or food-service paper goods; or colloquially in 'on the back of a napkin' for spontaneous conceptual sketches.",
            "whenNotToUse": "In the UK and Ireland, do not use 'napkin' in childcare contexts without caution, as it historically denotes a baby's diaper ('nappy'). Avoid using 'napkin' for a kitchen dishtowel (use 'tea towel' or 'dish towel') or for moist hand towelettes (use 'wet wipe' or 'moist towelette').",
            "culturalContext": "Western business dining protocol establishes strict guidelines for napkin handling: unfolded beneath table level, placed on the chair when temporarily stepping away, and laid loosely to the left of the plate when finished. In TOEIC Parts 1, 3, and 7, napkins appear constantly—in Part 1 table-setting photographs, Part 3 restaurant dialogues, and Part 7 banquet supply invoices."
        },
        "examples": {
            "daily": [
                "He placed the cloth napkin on his lap as soon as he was seated at the restaurant.",
                "Could you please grab a few extra paper napkins from the counter to wipe up this spill?",
                "She folded each decorative red napkin into a neat pocket for the dinner party's cutlery."
            ],
            "business": [
                "The hotel banquet department ordered five hundred monogrammed linen napkins for the international trade symposium.",
                "During executive dining etiquette seminars, consultants emphasize that a napkin should never be tucked into a shirt collar.",
                "The initial design for the enterprise cloud architecture was famously sketched on the back of a cocktail napkin during an executive retreat."
            ],
            "conversation": [
                "\"Excuse me, could we get a few additional cloth napkins for table four?\" / \"Certainly, I will bring them over alongside fresh water glasses immediately.\"",
                "\"How should we fold the napkins for the annual awards banquet?\" / \"Let's arrange them in a classic pyramid fold and place them directly on the charger plates.\""
            ],
            "collocations": [
                "cloth napkin",
                "paper napkin",
                "linen napkin",
                "napkin ring",
                "fold a napkin",
                "cocktail napkin"
            ]
        },
        "wordFamily": {
            "noun": "napkin",
            "verb": "",
            "adjective": "",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "formal dining table linen napkin folded place setting banquet",
            "imageDescription": "A crisp, pressed white linen napkin elegantly folded into a bishop's hat shape resting on a gold-rimmed porcelain charger plate at a formal corporate banquet table.",
            "mnemonic": "NAPKIN: Unfold it onto your lap before you eat, so food spills don't take a NAP on your suit pants!"
        },
        "video": {
            "description": "An executive dining tutorial demonstrating correct business table manners, proper napkin placement on the lap upon seating, and subtle methods for signaling departure to restaurant waitstaff."
        },
        "toeicContext": {
            "commonParts": [1, 2, 3, 7],
            "exampleQuestion": "Before the awards banquet began, banquet servers ensured that each place setting was complete with polished cutlery, crystal glassware, and neatly folded cloth _____. (A) nap (B) napkins (C) napery (D) napkin's",
            "tips": "In TOEIC Part 1, folded napkins on restaurant tables are a prominent visual element in photographic descriptions ('Napkins have been set at each seat'). In Part 5, identify the plural countable noun needed in the coordinate series ('cutlery, crystal glassware, and neatly folded cloth _____'): (B) napkins. Choice (A) is an unrelated verb/noun, (C) is an archaic collective noun, and (D) is an erroneous possessive."
        },
        "synonyms": [
            "serviette",
            "table linen",
            "cloth",
            "towel",
            "wipe"
        ],
        "antonyms": [],
        "relatedWords": [
            "tablecloth",
            "placemat",
            "cutlery",
            "silverware",
            "place setting",
            "serviette",
            "tableware"
        ]
    },
    {
        "id": "dining-192",
        "word": "noodle",
        "partOfSpeech": ["noun"],
        "category": "dining",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/ˈnuː.dəl/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/noodle--_us_1.mp3",
            "syllableBreakdown": "noo·dle",
            "stressPattern": "●○",
            "commonMistakes": "Learners sometimes articulate the unstressed second syllable with a clear, full vowel /dɛl/ or /deɪl/, whereas native speakers use a weak syllabic /l/ [dəl] or [dl̩]. Also, ensure the first vowel /uː/ is pronounced with a long, rounded back vowel, not shortened to /ʊ/ like *foot*."
        },
        "etymology": {
            "origin": "Borrowed from German 'Nudel' (noodle, dumpling, pasta strip), of uncertain ultimate origin; likely an alteration of Middle High German 'knödel' (dumpling, small dough ball), from Old High German 'knodo' (knot, knot of dough), tracing back to Proto-Germanic '*knudan-' (knot, lump, rounded mass).",
            "rootWord": "German Nudel / Middle High German knödel",
            "rootMeaning": "Strip or roll of kneaded unleavened dough; small knot or ribbon of dough cooked in broth",
            "evolution": "Ribbon-like dough boiled in liquids dates back thousands of years across both ancient East Asia (millet noodles in China c. 2000 BCE) and the Mediterranean basin (ancient Greek 'itria', Latin 'lagana'). The Germanic term 'Nudel' appeared in the late 16th century to designate ribbon dough and dumplings. English borrowed 'noodle' in the late 18th century (c. 1779) in European travelogues and recipe collections. In the 20th century, global trade and the international popularity of Asian culinary staples (such as ramen, udon, soba, pho, and pad thai) established 'noodle' as an indispensable universal category in English dining vocabulary.",
            "relatedLanguages": [
                "German: Nudel (noodle, pasta)",
                "Dutch: noedel (noodle)",
                "French: nouille (noodle)",
                "Italian: gnocco (dumpling) / tagliatella (ribbon pasta, culinary equivalent)"
            ],
            "firstRecordedUse": "Late 18th century (c. 1779 in culinary accounts describing German ribbon pasta and soups)"
        },
        "deepMeaning": {
            "coreConcept": "A staple food prepared from unleavened dough made of flour (such as wheat, rice, buckwheat, or mung bean starch) and liquid (water, broth, or eggs), rolled flat and cut, extruded, or stretched into long, thin strips or strands, and cooked rapidly in boiling liquid; served hot or chilled in savory broths, stir-fries, or coated in sauces.",
            "spatialContext": "Commercial kitchen boiling vats and pasta cookers, high-output wok stir-fry lines, corporate cafeteria noodle bars featuring customizable broths and toppings, and refrigerated cold-pantry salad stations.",
            "temporalContext": "Boiled à la minute in just 2 to 5 minutes during lunch rushes to maintain an al dente, chewy texture; served piping hot in steaming winter broths or chilled with sesame and scallions during warm summer months.",
            "emotionalTone": "Comforting, nourishing, hearty, satisfying, and universally appealing.",
            "formalityLevel": "neutral",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "Native speakers associate 'noodles' with comforting warmth, quick-service lunch convenience, and vibrant Asian culinary traditions. In North American culture, 'chicken noodle soup' is the quintessential home remedy for illness and cold weather. In modern workplace dining, noodle stations (ramen, udon, pho, rice noodles) represent the premier customizable lunch option accommodating gluten-free, vegan, and protein-packed preferences. In colloquial English, 'noodle' also functions humorously as a noun for one's head/brain ('use your noodle') or as a verb meaning to brainstorm casually ('let's noodle on this problem').",
            "mentalImage": "A steaming deep ceramic bowl filled with golden hand-pulled noodles immersed in a rich, shimmering umami broth, topped with sliced green scallions, tender pork slices, a seasoned soft-boiled egg, and drizzled chili oil.",
            "whenToUse": "Use when referring to Asian noodle dishes (ramen, soba, udon, pho, rice noodles), egg noodles in soups and casseroles, cafeteria noodle bars, or quick corporate lunch orders; or colloquially in brainstorming contexts ('noodling on ideas').",
            "whenNotToUse": "In traditional Italian gastronomy, avoid referring to every form of Italian pasta (such as penne, fusilli, or ravioli) as 'noodles', which is viewed by culinary purists as an overly casual Americanism; reserve 'noodles' for ribbon strands or Asian-style preparations.",
            "culturalContext": "Noodle dishes have become a dominant fixture in metropolitan corporate dining, food courts, and convention center catering across English-speaking countries. In TOEIC listening (Part 3/4) and reading (Part 7), scenarios regularly depict coworkers deciding where to go for lunch, exploring new cafeteria food stations, or ordering takeout noodle bowls."
        },
        "examples": {
            "daily": [
                "She ordered a steaming bowl of chicken noodle soup to help soothe her sore throat.",
                "The new downtown eatery specializes in authentic hand-pulled wheat noodles with spicy chili broth.",
                "He tossed chilled soba noodles with sesame oil, cucumber ribbons, and soy dressing for a light lunch."
            ],
            "business": [
                "To enhance cafeteria menu variety, the campus facilities committee approved the addition of a customizable noodle station.",
                "The corporate convention catered a quick-service Asian noodle bar for delegates between afternoon workshop sessions.",
                "A recent hospitality survey revealed that ready-to-heat noodle bowls are among the top-selling items in office micromarkets."
            ],
            "conversation": [
                "\"Would you like to join us for lunch at the new ramen noodle shop across the plaza?\" / \"That sounds wonderful; I've been craving a hot bowl of miso broth all morning.\"",
                "\"Does the cafeteria's noodle bar provide any gluten-free noodles for lunch today?\" / \"Yes, they offer both brown rice noodles and sweet potato vermicelli alongside standard wheat noodles.\""
            ],
            "collocations": [
                "egg noodle",
                "rice noodle",
                "chicken noodle soup",
                "ramen noodles",
                "noodle bar",
                "instant noodles"
            ]
        },
        "wordFamily": {
            "noun": "noodle",
            "verb": "noodle",
            "adjective": "",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "steaming ramen noodle bowl broth chopsticks restaurant dining",
            "imageDescription": "A steaming bowl of hand-pulled noodles in rich broth lifted with wooden chopsticks, garnished with fresh greens, sesame seeds, and chili oil in a modern restaurant.",
            "mnemonic": "NOODLE: Long, swirling strands of dough that you NEED-ALL (noodle) to slurp up hot when you want pure comfort food!"
        },
        "video": {
            "description": "A culinary documentary segment profiling an artisan noodle chef rhythmically stretching and slapping fresh wheat dough to create dozens of delicate noodle strands in seconds for lunch customers."
        },
        "toeicContext": {
            "commonParts": [3, 4, 7],
            "exampleQuestion": "Due to overwhelming popular demand from office tenants, the building's cafeteria will expand its dining hall to include a made-to-order _____ station next month. (A) noodle (B) noodles (C) noodling (D) noodled",
            "tips": "In TOEIC Part 5, when a noun serves as a pre-modifying noun adjunct for another noun ('station'), the singular form is required ('noodle station', parallel to 'sandwich station' or 'pasta station'). Choice (A) is correct. Choice (B) is the plural form, which is ungrammatical as a noun adjunct in this construction; choices (C) and (D) are verb participles."
        },
        "synonyms": [
            "pasta",
            "spaghetti",
            "vermicelli",
            "ramen",
            "udon",
            "soba"
        ],
        "antonyms": [],
        "relatedWords": [
            "pasta",
            "broth",
            "ramen",
            "stir-fry",
            "chow mein",
            "rice noodles",
            "dumpling"
        ]
    }
]

with open("scratch/dining_189_192.json", "w", encoding="utf-8") as f:
    json.dump({"words": words_data}, f, indent=2, ensure_ascii=False)

print("Saved scratch/dining_189_192.json successfully.")
