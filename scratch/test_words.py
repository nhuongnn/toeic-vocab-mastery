import json

words_data = [
    {
        "id": "dining-197",
        "word": "onion",
        "partOfSpeech": ["noun"],
        "category": "dining",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/ˈʌn.jən/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/onion--_us_1.mp3",
            "syllableBreakdown": "on·ion",
            "stressPattern": "●○",
            "commonMistakes": "Learners often mispronounce the initial vowel based on spelling, pronouncing it like 'on' (/ɒn/ or /oʊn/) instead of the short central vowel /ʌ/ ('un-yun'). Another common mistake is pronouncing the 'i' as a distinct third syllable (saying 'on-ee-on' /ˌɒn.iːˈɒn/) rather than gliding smoothly into the palatal semivowel /j/."
        },
        "etymology": {
            "origin": "Middle English oynon / unyun, borrowed from Anglo-Norman and Old French oignon / oingnon, from Latin ūniō ('oneness, unity, single large pearl, single-bulb onion'), derived from ūnus ('one').",
            "rootWord": "ūniō / ūnus",
            "rootMeaning": "oneness, unity, or single round pearl",
            "evolution": "In Roman antiquity, 'ūniō' designated oneness or a unique large pearl. Roman agriculturalists applied the term to a round, single-bulb allium that grows without dividing into cloves (unlike garlic). The word evolved into Gallo-Romance 'oignon', entered Middle English following the Norman Conquest in the 13th to 14th centuries, and supplanted Old English 'cipe' (cognate with German Zwiebel and Spanish cebolla).",
            "relatedLanguages": [
                "French: oignon",
                "Spanish: unión (unity) / cebolla (vegetable)",
                "Italian: cipolla (vegetable) / unione (unity)",
                "German: Zwiebel",
                "Portuguese: cebola"
            ],
            "firstRecordedUse": "Early 14th century (c. 1325, in Middle English culinary texts including 'The Forme of Cury')"
        },
        "deepMeaning": {
            "coreConcept": "A pungent, layered edible bulb of the allium family (Allium cepa), featuring concentric fleshy scales, cultivated worldwide and utilized raw, sautéed, roasted, or caramelized as a foundational aromatic base across global cuisines and hospitality operations.",
            "spatialContext": "Commercial prep kitchens, salad bar prep stations, walk-in vegetable storage cellars, burger assembly lines, catering banquet kitchens, and wholesale produce terminals.",
            "temporalContext": "Early morning prep shifts (dicing aromatics for mirepoix before service), fast-paced lunch/dinner services (processing special dietary requests such as 'no raw onions'), and seasonal autumn harvest procurements.",
            "emotionalTone": "Pungent, foundational, savory, and aromatic.",
            "formalityLevel": "neutral",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "To native speakers, the onion is the indispensable cornerstone of savory culinary art; the sizzle and fragrance of onions hitting hot butter or oil is the universal olfactory cue of home cooking or restaurant service beginning. Beyond cooking, 'peeling back the layers of an onion' is an instinctive metaphor for uncovering complex layers of an issue. In dining service, onions represent one of the most common patron modification requests—often excluded due to breath concerns, digestive sensitivities, or raw pungency.",
            "mentalImage": "A restaurant line cook rapidly slicing a halved yellow onion on a thick poly-top cutting board, paper-thin golden outer skins set to the side while translucent crescent ribbons pile high next to a hot steel saucepan.",
            "whenToUse": "Use when discussing culinary ingredients, soup/sauce flavor bases (mirepoix, sautéed onions), menu dish descriptions (french onion soup, caramelized onions), catering dietary modifications ('hold the onions'), and agricultural produce supply chains.",
            "whenNotToUse": "Do not confuse with distinct allium family members that require precise culinary specification, such as 'garlic', 'shallots', 'leeks', 'scallions' (green onions), or 'chives'.",
            "culturalContext": "In Western culinary traditions, onions form half of the French mirepoix (onions, carrots, celery) and Cajun 'holy trinity' (onions, bell peppers, celery). On North American and British restaurant tickets, modifications like 'NO ONION' or 'SUB CARAMELIZED ONIONS' are staple POS entries that servers and kitchen expeditors monitor diligently."
        },
        "examples": {
            "daily": [
                "He caramelized the sliced yellow onions over low heat for forty minutes until they turned deep amber and sweet.",
                "Could I please get the grilled chicken sandwich without raw onions on the side?",
                "The chef sprinkled thinly sliced green onions over the steaming bowl of chicken noodle soup."
            ],
            "business": [
                "The restaurant group negotiated bulk purchasing contracts with regional produce distributors to hedge against fluctuating wholesale onion prices.",
                "The catering banquet manager ensured all buffet place cards listed sliced onions separately so guests with dietary restrictions could customize their plates.",
                "Due to high kitchen prep volume, the franchise commissary adopted pre-diced, vacuum-packaged onions to maintain portion consistency across twenty locations."
            ],
            "conversation": [
                "\"Does the signature beef burger come with caramelized or raw onions?\" / \"It normally features crispy fried onion strings, but our kitchen can substitute caramelized onions upon request.\"",
                "\"Table seven specifically noted an allium allergy for their entrées.\" / \"Got it—I will alert the expediter immediately to ensure no onion or garlic touches their order.\""
            ],
            "collocations": [
                "caramelized onion",
                "diced onion",
                "red onion",
                "french onion soup",
                "crispy fried onions",
                "sweet Vidalia onion"
            ]
        },
        "wordFamily": {
            "noun": "onion",
            "adjective": "oniony"
        },
        "visual": {
            "imageKeyword": "whole yellow onions halved red onion cutting board culinary prep",
            "imageDescription": "A whole golden-skinned yellow onion beside a halved red onion displaying vibrant purple-and-white concentric rings, resting on an end-grain butcher block next to a stainless steel chef knife.",
            "mnemonic": "ONION comes from Latin 'unio' (oneness): peel away all the layers and it is still ONE unified bulb that makes your eyes water!"
        },
        "video": {
            "description": "A culinary school tutorial demonstrating professional knife skills for trimming, scoring, and fine-dicing yellow and red onions with minimal tear-inducing fumes."
        },
        "toeicContext": {
            "commonParts": [1, 2, 3, 7],
            "exampleQuestion": "To cater to banquet guests with specific dietary preferences, the chef agreed to prepare the braised short ribs without the traditional glaze containing red _____ and shallots. (A) onion (B) onions (C) oniony (D) onioned",
            "tips": "In Part 5, ingredient lists in dining contexts require plural countable nouns when referring to components collectively. In 'red _____ and shallots', parallel structure with plural 'shallots' confirms that plural noun (B) 'onions' is required. Choice (A) is singular, (C) is an adjective, and (D) is an ungrammatical verb-like form."
        },
        "synonyms": [
            "allium bulb",
            "yellow onion",
            "bulb onion",
            "sweet onion",
            "shallot (botanical cousin)"
        ],
        "antonyms": [],
        "relatedWords": [
            "mirepoix",
            "caramelize",
            "shallot",
            "chives",
            "scallion",
            "allium",
            "saute"
        ]
    },
    {
        "id": "dining-198",
        "word": "order",
        "partOfSpeech": ["noun"],
        "category": "dining",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/ˈɔːr.dər/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/order--_us_1.mp3",
            "syllableBreakdown": "or·der",
            "stressPattern": "●○",
            "commonMistakes": "Non-native speakers often over-pronounce the second syllable with a flat /ɛ/ or /e/ sound instead of the weak rhotic schwa /ər/ (US) or /ə/ (UK). In hospitality contexts, some learners confuse 'order' with 'command' or 'instruction', using it awkwardly with kitchen staff instead of natural phrases like 'place an order' or 'take your order'."
        },
        "etymology": {
            "origin": "Middle English ordre, borrowed from Anglo-Norman and Old French ordre / ordene, from Latin ōrdinem (accusative of ōrdō, 'row, line of threads in a loom, rank, series, methodical arrangement').",
            "rootWord": "ōrdō",
            "rootMeaning": "row, series, rank, or thread alignment in weaving",
            "evolution": "Originally derived from weaving terminology in Ancient Rome ('aligning threads on a loom') and military formations ('ranks of soldiers'), 'ōrdō' transitioned through Old French 'ordre' to signify systematic arrangement or ecclesiastical hierarchies. By the 16th century in English, it denoted authoritative instructions, and by the 18th and 19th centuries, it expanded into commerce and dining to mean a customer's specific request for goods, beverages, or meals at an inn or restaurant.",
            "relatedLanguages": [
                "French: ordre",
                "Spanish: orden",
                "Italian: ordine",
                "German: Ordnung",
                "Portuguese: ordem"
            ],
            "firstRecordedUse": "Early 13th century (in the sense of religious/social hierarchy); late 18th century (for restaurant food requests and commercial transactions)"
        },
        "deepMeaning": {
            "coreConcept": "A customer's explicit request for specific food items, beverages, or courses to be prepared and served by a dining establishment; or the physical or digital ticket documenting those requested items for the kitchen and billing.",
            "spatialContext": "Restaurant dining rooms, point-of-sale (POS) waiter terminals, kitchen expediting counters (the pass), drive-through windows, catering order desks, and mobile app pickup stations.",
            "temporalContext": "Immediate table service intervals (taking appetizer orders within five minutes of guest arrival), peak dining turnover hours (lunch 12:00 PM – 1:30 PM, dinner 6:30 PM – 9:00 PM), and daily kitchen cut-off times.",
            "emotionalTone": "Courteous, attentive, structured, and efficient.",
            "formalityLevel": "neutral",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "In dining, native speakers regard the 'order' as both an interactive ritual ('Are you ready to order?') and an implicit service agreement. Diners expect exact compliance with their order, especially regarding side substitutions, steak doneness, and food allergies. For waitstaff and kitchen line cooks, an 'order' represents an active unit of production that must be timed, plated, and expedited alongside adjacent tables.",
            "mentalImage": "A restaurant server standing attentively beside a table with a digital handheld ordering pad, entering dish selections and wine pairings as seated business clients consult their menus.",
            "whenToUse": "Use when discussing dining requests ('take an order', 'place an order'), kitchen tickets ('an order of garlic bread'), catering contracts, takeaway requests, or food distributor procurement.",
            "whenNotToUse": "Do not confuse with the final restaurant bill/check ('Could we have the bill, please?' not 'Could we have the order?'). Also, do not use 'order' when referring to general culinary recipes or unsolicited food advice.",
            "culturalContext": "The exchange 'May I take your order?' is one of the most culturally ingrained phrases in English-speaking hospitality. Promptness and accuracy in taking and delivering orders form the primary evaluation criteria for dining tips in North America and restaurant review scores worldwide."
        },
        "examples": {
            "daily": [
                "The server returned to our booth after ten minutes to see if we were ready to place our dinner order.",
                "I asked for an extra order of truffle fries and a glass of sparkling water for the table.",
                "There was an error in my takeout order, so the manager offered a complimentary dessert while the kitchen corrected it."
            ],
            "business": [
                "The corporate event coordinator finalized the catering order for the two-hundred-person annual shareholder luncheon.",
                "During the Friday evening rush, the kitchen expediter handled more than eighty dinner orders per hour without missing a ticket.",
                "The procurement director placed a wholesale order for prime beef cuts to ensure adequate inventory ahead of the holiday banquet season."
            ],
            "conversation": [
                "\"Are you ready to order, or would you like another couple of minutes to look over the chef specials?\" / \"We are ready now, thank you; we will start with the calamari and order the grilled salmon for our main course.\"",
                "\"Has order forty-two been picked up by the delivery courier yet?\" / \"Yes, it was bagged, checked against the receipt, and dispatched five minutes ago.\""
            ],
            "collocations": [
                "place an order",
                "take an order",
                "catering order",
                "drink order",
                "special order",
                "side order"
            ]
        },
        "wordFamily": {
            "noun": "order",
            "verb": "order",
            "adjective": "orderly",
            "adverb": "orderly"
        },
        "visual": {
            "imageKeyword": "restaurant server notepad taking order patrons dining table",
            "imageDescription": "A friendly server wearing a black bistro apron writing in an order pad while leaning in politely toward a couple seated at a well-set restaurant dining table with glasses of water.",
            "mnemonic": "ORDER comes from Latin 'ordo' (row/line): when you place your order, your meal joins the orderly line of tickets waiting to be cooked!"
        },
        "video": {
            "description": "A hospitality training module illustrating proper techniques for taking food and beverage orders, repeating modifications accurately, and entering orders into a touch-screen POS system."
        },
        "toeicContext": {
            "commonParts": [1, 2, 3, 4, 7],
            "exampleQuestion": "The head waiter promptly apologized to the guests at table four and promised that their dinner _____ would be expedited immediately. (A) order (B) ordered (C) ordering (D) orderly",
            "tips": "In TOEIC Part 5, identify the required part of speech by analyzing surrounding words. The possessive pronoun 'their' and noun modifier 'dinner' require a head noun to serve as the subject of the clause 'would be expedited'. Choice (A) 'order' is the singular noun. (B) is a past tense verb, (C) is a gerund/participle, and (D) is an adjective."
        },
        "synonyms": [
            "request",
            "requisition",
            "selection",
            "ticket",
            "food ticket",
            "purchase order"
        ],
        "antonyms": [
            "cancellation"
        ],
        "relatedWords": [
            "appetizer",
            "entree",
            "pos terminal",
            "receipt",
            "server",
            "waitstaff",
            "expediter"
        ]
    },
    {
        "id": "dining-199",
        "word": "organic",
        "partOfSpeech": ["adjective"],
        "category": "dining",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ɔːrˈɡæn.ɪk/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/organic--_us_1.mp3",
            "syllableBreakdown": "or·gan·ic",
            "stressPattern": "○●○",
            "commonMistakes": "Learners frequently place stress on the first syllable (saying /ˈɔːr.ɡə.nɪk/) rather than the stressed second syllable /ɔːrˈɡæn.ɪk/. Another mistake is pronouncing the 'g' as an affricate /dʒ/ (similar to 'orange') instead of the hard velar stop /ɡ/."
        },
        "etymology": {
            "origin": "Via Latin organicus ('serving as an instrument, mechanical'), from Ancient Greek organikós (ὀργανικός, 'of or pertaining to an organ or tool'), from órganon (ὄργανον, 'implement, instrument, bodily organ, work'), from PIE *werg- ('to do, act, work').",
            "rootWord": "órganon (ὄργανον)",
            "rootMeaning": "instrument, tool, bodily organ, or work",
            "evolution": "Originally in Greek and Latin, 'organikos' pertained to musical instruments or mechanical tools. In 18th-century biology and chemistry, it denoted substances derived from living organisms. In 1940, agriculturalist Lord Northbourne coined 'organic farming' in his work 'Look to the Land' to describe an ecologically balanced farm operating as a unified living organism without artificial inputs. By the late 20th century, it became a legally protected certification standard across gastronomy and retail.",
            "relatedLanguages": [
                "French: biologique / organique",
                "Spanish: orgánico",
                "Italian: organico / biologico",
                "German: biologisch / organisch",
                "Portuguese: orgânico"
            ],
            "firstRecordedUse": "Mid-17th century (in chemistry/physiology); 1940 (in the agricultural and food production sense)"
        },
        "deepMeaning": {
            "coreConcept": "Describing food ingredients, agricultural produce, or beverages cultivated, reared, and processed without synthetic chemical pesticides, artificial fertilizers, antibiotics, growth hormones, or genetic modification, adhering to certified regulatory ecological standards.",
            "spatialContext": "Farm-to-table bistro kitchens, organic salad counters, certified sustainable wine cellars, health-focused cafes, artisanal bakeries, and high-end hotel dining rooms.",
            "temporalContext": "Daily early-morning deliveries from local farm cooperatives, seasonal menu transitions reflecting harvest availability, and recurring annual organic certification audits.",
            "emotionalTone": "Wholesome, conscientious, sustainable, fresh, and premium.",
            "formalityLevel": "neutral",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "To native speakers, seeing 'organic' on a dining menu immediately signals wholesome quality, environmental responsibility, and a willingness to pay a premium price. Diners equate organic items with transparency, clean eating, and support for sustainable agriculture. In restaurant marketing, '100% organic' serves as a badge of culinary authenticity and integrity.",
            "mentalImage": "A rustic wooden farm stand in front of an open kitchen displaying vibrant baskets of unblemished heirloom tomatoes, bunches of dark Tuscan kale, and fresh rosemary sprigs marked with handwritten 'Certified Organic' chalk signs.",
            "whenToUse": "Use when describing certified agricultural ingredients (organic produce, organic milk, organic wine), farm-to-table culinary concepts, sustainable dining policies, and eco-friendly hospitality sourcing.",
            "whenNotToUse": "Do not confuse with the unregulated term 'natural' (which carries no legal certification standards), nor with 'gluten-free' or 'vegan' (which denote allergen/dietary categories, not farming methods). In dining, avoid using it to simply mean 'homemade'.",
            "culturalContext": "In North American, European, and Australasian dining culture, the demand for certified organic menu choices has transformed restaurant procurement. Luxury hotel chains, upscale corporate dining facilities, and fast-casual brands prominently showcase organic certifications to align with client wellness programs and sustainability initiatives."
        },
        "examples": {
            "daily": [
                "The breakfast diner proudly makes all its pancakes with organic flour, cage-free eggs, and pure maple syrup.",
                "She ordered a mixed green salad made exclusively with crisp organic spinach and heirloom cherry tomatoes.",
                "Many shoppers are willing to pay slightly more at the supermarket for organic apples that are free of synthetic pesticides."
            ],
            "business": [
                "The boutique hotel chain increased its catering revenue by offering clients fully customized banquet menus featuring certified organic wines and grass-fed meats.",
                "To meet corporate sustainability benchmarks, the corporate cafeteria partnered with local growers to source seventy percent of its seasonal vegetables from certified organic farms.",
                "Rising consumer preference for clean-label dining led the restaurant franchise to transition its salad dressings to organic cold-pressed olive oil."
            ],
            "conversation": [
                "\"Does your brunch menu feature organic eggs, or are they conventionally farmed?\" / \"All of our eggs and dairy products are certified organic, delivered fresh daily from a family farm in Lancaster County.\"",
                "\"Why did the price of the artisan pasta entrées increase by two dollars?\" / \"The chef upgraded our pantry to use one hundred percent organic durum wheat semolina imported from Italy.\""
            ],
            "collocations": [
                "organic produce",
                "certified organic",
                "organic ingredients",
                "organic farming",
                "organic wine",
                "organic vegetables"
            ]
        },
        "wordFamily": {
            "noun": "organism",
            "adjective": "organic",
            "adverb": "organically",
            "verb": "organize"
        },
        "visual": {
            "imageKeyword": "fresh certified organic vegetables basket farm to table restaurant rustic table",
            "imageDescription": "A woven wooden harvest basket brimming with freshly picked organic vegetables—crisp orange carrots with vibrant green tops, purple beets, and curly kale—resting on a butcher block in a bright restaurant kitchen.",
            "mnemonic": "ORGANIC comes from 'organ' (living body): food grown naturally, working together like living organs without artificial chemicals!"
        },
        "video": {
            "description": "A documentary feature following an executive chef visiting certified organic farms at dawn to select heirloom vegetables and discussing how chemical-free produce enhances flavor profiles on his seasonal tasting menu."
        },
        "toeicContext": {
            "commonParts": [3, 4, 7],
            "exampleQuestion": "Harvest Table Bistro has attracted substantial corporate catering business since converting its entire lunch menu to include only certified _____ ingredients from regional growers. (A) organically (B) organic (C) organism (D) organizing",
            "tips": "In TOEIC Part 5, analyze word position and function. The blank follows the adverb 'certified' and directly precedes the noun 'ingredients'. An adjective is required to complete the noun phrase 'certified _____ ingredients'. Choice (B) 'organic' is the correct adjective. (A) is an adverb, (C) is a noun, and (D) is a present participle/gerund."
        },
        "synonyms": [
            "chemical-free",
            "pesticide-free",
            "sustainably grown",
            "biological",
            "farm-fresh",
            "non-synthetic"
        ],
        "antonyms": [
            "conventional",
            "synthetic",
            "inorganic",
            "chemically treated"
        ],
        "relatedWords": [
            "sustainable",
            "farm-to-table",
            "pesticide",
            "non-gmo",
            "certification",
            "agriculture",
            "free-range"
        ]
    },
    {
        "id": "dining-200",
        "word": "oven",
        "partOfSpeech": ["noun"],
        "category": "dining",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/ˈʌv.ən/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/oven--_us_1.mp3",
            "syllableBreakdown": "ov·en",
            "stressPattern": "●○",
            "commonMistakes": "Learners frequently mispronounce the first vowel by analogy with 'over' (/oʊ/) or 'hot' (/ɒ/), producing /ˈoʊ.vən/ or /ˈɒv.ən/ instead of the short central vowel /ʌ/ ('uh-ven'). Another mistake is over-enunciating the second syllable as /ɛn/ rather than the weak unstressed schwa /ən/."
        },
        "etymology": {
            "origin": "Old English ofn ('oven, furnace'), from Proto-Germanic *uhnaz / *ufnaz ('oven, furnace'), from Proto-Indo-European *aukw- ('cooking pot, earthen vessel').",
            "rootWord": "ofn / *ufnaz",
            "rootMeaning": "furnace, kiln, or earthen cooking vessel",
            "evolution": "Dating back to prehistoric Germanic cooking structures, Proto-Germanic '*ufnaz' yielded Old English 'ofn', referring to enclosed clay or masonry chambers used for baking bread. The word persisted through Middle English 'oven' / 'ouen' into Early Modern English. With industrialization, it evolved from communal brick hearths to cast-iron ranges and modern high-capacity commercial convection and combi-steam ovens in professional hospitality.",
            "relatedLanguages": [
                "German: Ofen",
                "Dutch: oven",
                "Swedish: ugn",
                "Danish: ovn",
                "Gothic: auhns",
                "Latin cognate: aulla / olla (earthen cooking pot)"
            ],
            "firstRecordedUse": "Before the 9th century (c. 825, in Old English glosses and the Vespasian Psalter)"
        },
        "deepMeaning": {
            "coreConcept": "A thermally insulated, enclosed cooking chamber heated by gas, electricity, steam, or burning wood, engineered for baking, roasting, broiling, and braising food in residential kitchens and commercial food service establishments.",
            "spatialContext": "Commercial kitchen hot cook lines, hotel pastry and bakery departments, artisanal pizzeria hearths, institutional catering facilities, and culinary prep stations.",
            "temporalContext": "Early dawn bakery shifts (preheating deck ovens at 4:30 AM), pre-service roasting shifts (slow-roasting meats at 2:00 PM), and high-velocity dinner service firing intervals.",
            "emotionalTone": "Warm, comforting, artisanal, industrious, and essential.",
            "formalityLevel": "neutral",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "To native speakers, 'oven' evokes comforting aromas of freshly baked bread, bubbling casseroles, and holiday roasts ('fresh out of the oven'). In commercial hospitality, the oven is the heavy-duty workhorse of the kitchen. Chefs evaluate ovens on temperature stability, heat distribution, humidity control (as in combi-ovens), and capacity to handle simultaneous banquet trays without burning.",
            "mentalImage": "A professional pastry baker in a flour-dusted white chef coat sliding a wide wooden peel loaded with golden baguettes into a gleaming, four-deck commercial stone oven with glowing interior lights.",
            "whenToUse": "Use when referring to enclosed baking and roasting appliances, culinary preparation methods involving enclosed dry or convection heat ('oven-roasted'), commercial kitchen equipment (deck oven, convection oven, combi-oven, pizza oven), or temperature management in cooking.",
            "whenNotToUse": "Do not confuse with a 'stove' or 'cooktop' (the open top surface with burners for frying and boiling in pans), a 'grill' or 'broiler' (open direct heat), or a 'microwave' (electromagnetic wave heating).",
            "culturalContext": "In contemporary dining, visual centerpiece ovens—particularly wood-fired stone or tiled ovens in open-kitchen trattorias and pizzerias—are prominent design and marketing features that signal artisanal authenticity. In commercial catering and hotels, computerized convection and combination steam ovens represent major capital investments vital for high-volume banquet consistency."
        },
        "examples": {
            "daily": [
                "She set the kitchen timer for thirty minutes after placing the chocolate chip cookies into the preheated oven.",
                "The savory aroma of slow-roasted chicken and garlic potatoes filled the dining room every Sunday afternoon.",
                "Remember to wear heavy heat-resistant silicone mitts before pulling the hot ceramic casserole dish from the oven."
            ],
            "business": [
                "The executive chef submitted a capital expenditure request to replace the banquet facility's aging convection ovens with energy-efficient combi-steam units.",
                "During peak banquet preparation, kitchen staff utilized all four deck ovens to roast sixty prime rib cuts simultaneously to precise internal temperatures.",
                "Preventive maintenance technicians inspected the commercial ovens before the busy tourist season to verify accurate thermostat calibrations and door gasket seals."
            ],
            "conversation": [
                "\"Are the artisanal sourdough loaves ready to be transferred to the cooling racks?\" / \"The timer just sounded, and the crusts have reached a perfect deep golden color, so they are coming out of the deck oven right now.\"",
                "\"Why did the catering team delay serving the roasted pork loins?\" / \"The main convection oven experienced a brief power fluctuation, requiring the chef to finish the roast in the auxiliary unit.\""
            ],
            "collocations": [
                "preheat the oven",
                "convection oven",
                "wood-fired oven",
                "deck oven",
                "oven mitts",
                "oven-roasted"
            ]
        },
        "wordFamily": {
            "noun": "oven",
            "adjective": "ovenproof"
        },
        "visual": {
            "imageKeyword": "commercial bakery deck oven baker wooden peel fresh bread kitchen",
            "imageDescription": "A professional baker using a long-handled wooden peel to slide crusty golden loaves of artisan bread into a heavy-duty commercial deck oven with interior halogen lights illuminating stone baking racks.",
            "mnemonic": "OVEN rhymes with 'shoven': you shove dough into the hot oven to bake warm crusty bread!"
        },
        "video": {
            "description": "A commercial kitchen equipment showcase reviewing the advanced programmable settings, multi-rack steam injection, and precise convection airflow of industrial combi-ovens used in luxury hotel kitchens."
        },
        "toeicContext": {
            "commonParts": [1, 3, 7],
            "exampleQuestion": "The head chef submitted an urgent repair order after discovering that the kitchen's primary convection _____ was failing to maintain a consistent roasting temperature. (A) oven (B) ovens (C) ovenproof (D) ovenware",
            "tips": "Examine the grammatical structure of the noun phrase. The singular possessive 'the kitchen\\'s' paired with the singular modifier 'primary convection' and singular past continuous verb 'was failing' indicates that a singular countable head noun is needed. Choice (A) 'oven' is correct. Choice (B) is plural (which disagrees with 'was failing'), (C) is an adjective, and (D) is an uncountable collective noun for baking dishes."
        },
        "synonyms": [
            "baking chamber",
            "roaster",
            "convection unit",
            "range oven",
            "kiln (specialized/industrial)",
            "cooker"
        ],
        "antonyms": [
            "refrigerator",
            "freezer",
            "chiller"
        ],
        "relatedWords": [
            "preheat",
            "roasting",
            "baking",
            "convection",
            "temperature",
            "baker's peel",
            "thermostat"
        ]
    }
]

# Validation
import sys

# Check schema requirements
required_top_keys = [
    "id", "word", "partOfSpeech", "category", "level", "toeicFrequency",
    "pronunciation", "etymology", "deepMeaning", "nativeMindset",
    "examples", "wordFamily", "visual", "video", "toeicContext",
    "synonyms", "antonyms", "relatedWords"
]

required_pron = ["ipa", "syllableBreakdown", "stressPattern", "commonMistakes"]
required_etym = ["origin", "rootWord", "rootMeaning", "evolution", "relatedLanguages", "firstRecordedUse"]
required_deep = ["coreConcept", "spatialContext", "temporalContext", "emotionalTone", "formalityLevel", "connotation"]
required_native = ["howNativesThink", "mentalImage", "whenToUse", "whenNotToUse", "culturalContext"]
required_ex = ["daily", "business", "conversation", "collocations"]
required_vis = ["imageKeyword", "imageDescription", "mnemonic"]
required_vid = ["description"]
required_toeic = ["commonParts", "exampleQuestion", "tips"]

for w in words_data:
    for k in required_top_keys:
        assert k in w, f"Missing key {k} in {w['id']}"
    for k in required_pron:
        assert k in w["pronunciation"], f"Missing {k} in pron {w['id']}"
    for k in required_etym:
        assert k in w["etymology"], f"Missing {k} in etym {w['id']}"
    for k in required_deep:
        assert k in w["deepMeaning"], f"Missing {k} in deep {w['id']}"
    for k in required_native:
        assert k in w["nativeMindset"], f"Missing {k} in native {w['id']}"
    for k in required_ex:
        assert k in w["examples"], f"Missing {k} in ex {w['id']}"
    for k in required_vis:
        assert k in w["visual"], f"Missing {k} in vis {w['id']}"
    for k in required_vid:
        assert k in w["video"], f"Missing {k} in vid {w['id']}"
    for k in required_toeic:
        assert k in w["toeicContext"], f"Missing {k} in toeic {w['id']}"

    assert len(w["examples"]["daily"]) >= 3
    assert len(w["examples"]["business"]) >= 3
    assert len(w["examples"]["conversation"]) >= 2
    assert len(w["examples"]["collocations"]) >= 5
    assert len(w["synonyms"]) >= 4
    assert len(w["relatedWords"]) >= 5
    assert w["deepMeaning"]["formalityLevel"] in ["formal", "neutral", "informal"]
    assert w["deepMeaning"]["connotation"] in ["positive", "neutral", "negative"]
    assert w["level"] in ["essential", "intermediate", "advanced"]

print("All assertions passed perfectly!")
