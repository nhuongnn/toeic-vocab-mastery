import json

words_data = [
    {
        "id": "dining-109",
        "word": "dairy",
        "partOfSpeech": [
            "noun"
        ],
        "category": "dining",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/ˈder.i/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/dairy--_us_1.mp3",
            "syllableBreakdown": "dair·y",
            "stressPattern": "●○",
            "commonMistakes": "Frequently confused with 'diary' (/ˈdaɪ.ə.ri/) in both spelling and pronunciation. In speech, learners often add an extra syllable or use an /aɪ/ diphthong ('die-ree'). In standard American English, it is pronounced as two syllables (/ˈder.i/), rhyming with 'Mary' and 'fairy'."
        },
        "etymology": {
            "origin": "Middle English deyrie, from deye ('female servant, milkmaid'), from Old English dǣġe ('maker of bread, maidservant'), from Proto-Germanic *daigjǭ ('kneader', from *daigaz 'dough', root of modern 'dough'). The suffix -rie was added under Anglo-Norman French influence to denote a place of activity or business.",
            "rootWord": "dǣġe / Proto-Germanic *daigjǭ",
            "rootMeaning": "maidservant, kneader of dough",
            "evolution": "In Old English, dǣġe denoted an agricultural woman who baked bread and milked cows. By c. 1300 in Middle English, deyrie designated the farm building where milk was stored and churned into butter and cheese. By the 19th and 20th centuries, it expanded to commercial milk processing enterprises, retail refrigeration sections, and the broader food category of milk-derived goods.",
            "relatedLanguages": [
                "Old Norse: deigja (maid, dairymaid)",
                "German: Teig (dough)",
                "Swedish: deja (dairymaid, archaic)",
                "Gothic: deigan (to mold, knead clay)"
            ],
            "firstRecordedUse": "c. 1300 (Middle English)"
        },
        "deepMeaning": {
            "coreConcept": "Food products derived exclusively or primarily from mammalian milk (such as cow's milk, butter, cheese, cream, and yogurt), or an agricultural establishment and commercial facility where milk is produced, processed, and distributed; in modern hospitality, it functions as a critical food allergen classification.",
            "spatialContext": "Refrigerated supermarket aisles, commercial kitchen walk-in coolers, corporate cafeteria beverage condiment bars, catering prep lines, and dairy processing plants.",
            "temporalContext": "Daily during morning breakfast buffet setups, barista replenishment shifts, lunch preparation, and catering dietary verifications.",
            "emotionalTone": "Wholesome, foundational, dietary-conscious, and safety-focused.",
            "formalityLevel": "neutral",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Native speakers associate 'dairy' with two immediate everyday contexts: foundational dietary staples (milk, butter, cheese, yogurt) and dietary restrictions (lactose intolerance, dairy-free alternatives like oat or almond milk, veganism). In dining and hospitality, inquiring about 'dairy' is universal on corporate RSVP forms alongside gluten and nuts. It is also routinely used as a noun adjunct in 'dairy aisle', 'dairy cow', and 'dairy farm'.",
            "mentalImage": "A commercial catering prep station where a banquet chef carefully verifies an allergen checklist, setting aside stainless-steel platters marked 'dairy-free' separate from dishes featuring butter glazes, cream sauces, and artisan cheeses.",
            "whenToUse": "Use when discussing milk-derived food items, dietary restrictions ('dairy allergy', 'dairy-free'), agricultural milk production, or the refrigerated grocery aisle.",
            "whenNotToUse": "Never confuse with 'diary' (a personal journal or datebook). Do not classify chicken eggs as dairy: although grocery stores often place eggs in the refrigerated 'dairy case' for logistics, eggs are poultry products and completely dairy-free.",
            "culturalContext": "In North America, the UK, and Europe, milk is legally designated as a major food allergen requiring prominent disclosure on packaged foods and restaurant menus. The rise of plant-based diets has made offering dairy-free milks (oat, soy, almond) a standard hospitality expectation across corporate cafeterias and executive lounges."
        },
        "examples": {
            "daily": [
                "She switched to oat milk in her morning coffee because consuming dairy causes stomach discomfort.",
                "Could you pick up a tub of plain yogurt and a block of sharp cheddar from the dairy aisle?",
                "The farm stand sells artisanal dairy goods made fresh from pasture-raised Jersey cows."
            ],
            "business": [
                "The hotel banquet team placed clear allergen cards beside every buffet dish containing dairy.",
                "Due to rising logistics and feed costs, the regional dairy cooperative announced a five-percent price adjustment.",
                "Event attendees are requested to indicate whether they require dairy-free meal options on the registration form."
            ],
            "conversation": [
                "\"Is the soup of the day prepared with cream or broth?\" / \"It's a creamy tomato bisque containing dairy, but we can offer a roasted butternut squash soup that is completely dairy-free.\"",
                "\"Did you order extra milk for the breakroom espresso machine?\" / \"Yes, I ordered two cartons of whole dairy milk and three cartons of oat milk to accommodate everyone.\""
            ],
            "collocations": [
                "dairy products",
                "dairy-free alternative",
                "dairy allergy",
                "dairy aisle",
                "dairy cattle",
                "dairy industry"
            ]
        },
        "wordFamily": {
            "noun": "dairy, dairying, dairymaid, dairyman",
            "verb": "dairy",
            "adjective": "dairy",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "dairy products milk cheese butter yogurt glass bottle farm table",
            "imageDescription": "A rustic farm kitchen table featuring a traditional glass bottle of whole milk, a wooden cutting board with sliced artisan cheddar, a ceramic crock of churned butter, and a bowl of fresh yogurt.",
            "mnemonic": "Remember the spelling: D-AIR-Y cows graze outside in the open AIR, whereas a D-I-AR-Y is an 'I' (personal) book for your private thoughts!"
        },
        "video": {
            "description": "A hospitality catering training video demonstrating kitchen allergen management, showing chefs properly isolating dairy products and labeling dairy-free meal boxes for corporate banquet attendees."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                7
            ],
            "exampleQuestion": "To ensure guest safety at the annual charity gala, the banquet coordinator instructed the kitchen staff to clearly label all entrées containing _____. (A) dairy (B) dairying (C) dairies (D) dairy's",
            "tips": "In TOEIC hospitality and dining passages, 'dairy' functions as a mass noun referring to milk-derived foods. In this sentence, the prepositional participle 'containing' requires the mass noun object 'dairy' (A). Choice (B) is a gerund referring to farm operations, (C) is a plural countable noun typically referring to processing facilities or farms, and (D) is a singular possessive form."
        },
        "synonyms": [
            "milk products",
            "dairy produce",
            "creamery goods",
            "lactic products"
        ],
        "antonyms": [
            "dairy-free",
            "non-dairy",
            "plant-based"
        ],
        "relatedWords": [
            "lactose",
            "pasteurization",
            "creamery",
            "casein",
            "cheddar",
            "buttermilk",
            "allergen"
        ]
    },
    {
        "id": "dining-110",
        "word": "decaf",
        "partOfSpeech": [
            "noun"
        ],
        "category": "dining",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/ˈdiː.kæf/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/decaf--_us_1.mp3",
            "syllableBreakdown": "de·caf",
            "stressPattern": "●●",
            "commonMistakes": "Learners often pronounce the first syllable with a short vowel /e/ ('deh-kaf') or shift stress to the second syllable (/diːˈkæf/). The primary stress is on the first syllable with a long tense /iː/: DEE-kaf."
        },
        "etymology": {
            "origin": "Shortened form of 'decaffeinated' (coffee/tea), formed from Latin prefix dē- ('away from, off, down') + German Kaffein (coined in 1819 by German chemist Friedlieb Ferdinand Runge from Kaffee 'coffee' + chemical suffix -in) + participial suffix -ated.",
            "rootWord": "decaffeinated / Arabic qahwah via Turkish kahve & German Kaffee",
            "rootMeaning": "freed from caffeine",
            "evolution": "Commercial decaffeination was pioneered and patented in 1905 by German coffee merchant Ludwig Roselius (founder of Kaffee HAG / Sanka). As decaffeinated coffee became an everyday dining staple across North America in the 1970s, restaurant patrons and baristas clipped the lengthy four-syllable adjective 'decaffeinated' into the concise colloquial noun and adjective 'decaf'.",
            "relatedLanguages": [
                "French: décaféiné (clipped to déca)",
                "Spanish: descafeinado",
                "Italian: decaffeinato (clipped to deca)",
                "German: koffeinfrei / entkoffeiniert"
            ],
            "firstRecordedUse": "1974 (American English colloquialism)"
        },
        "deepMeaning": {
            "coreConcept": "Coffee, espresso, or tea from which virtually all caffeine content (typically 97% or more) has been extracted before roasting and brewing, allowing drinkers to enjoy the flavor and ritual of coffee without the physiological stimulant effects.",
            "spatialContext": "Office breakroom beverage stations, café condiment bars, diner service counters, corporate meeting refreshment credenzas, and hotel banquet service buffets.",
            "temporalContext": "Afternoon coffee breaks (after 2:00 PM), post-dinner banquet courses, and late-night executive work sessions.",
            "emotionalTone": "Relaxing, considerate, soothing, and health-friendly.",
            "formalityLevel": "neutral",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Native speakers use 'decaf' effortlessly as an uncountable mass noun ('Do we have decaf?'), a countable beverage order ('I'll have a decaf with skim milk'), and a noun adjunct ('decaf coffee', 'decaf roast'). In American dining culture, orange rims or handles on carafes universally signify decaf to prevent serving caffeine by mistake. Informally, telling someone to 'drink decaf' is an idiom meaning 'relax' or 'stop being anxious'.",
            "mentalImage": "An executive boardroom refreshment table featuring twin stainless-steel insulated carafes: one with a black rim labeled 'Morning Blend' and the other with a distinctive orange collar labeled 'Colombian Decaf', beside porcelain cups and sugar packets.",
            "whenToUse": "Use when ordering coffee at a restaurant or café, stocking office pantries, or designating beverage offerings for corporate meetings and afternoon receptions.",
            "whenNotToUse": "Avoid using 'decaf' in formal chemical or scientific patent documents where 'decaffeinated coffee beans' is required. Also note that 'decaf' still contains trace amounts of caffeine (typically 2 to 5 milligrams per cup).",
            "culturalContext": "In North American and European corporate hospitality, offering decaf alongside caffeinated coffee is a non-negotiable courtesy for afternoon meetings and dinner banquets. The bright orange handle or collar on coffee pots has been the universally recognized industry standard since Sanka's orange branding in the mid-20th century."
        },
        "examples": {
            "daily": [
                "I usually switch to decaf after lunch so the caffeine doesn't keep me awake at night.",
                "The server brought a fresh pot of hot decaf along with our dessert after the meal.",
                "Could I please get an iced vanilla latte made with oat milk and decaf espresso?"
            ],
            "business": [
                "For the late-afternoon client briefing, the administrative coordinator ordered two carafes of decaf and one of regular roast.",
                "The corporate pantry is replenished weekly with dark roast beans, green tea, and premium decaf pods.",
                "Please make sure the catering staff clearly marks the decaf urn so attendees avoid caffeine during the evening workshop."
            ],
            "conversation": [
                "\"Would you care for another cup of coffee before the keynote speech begins?\" / \"Only if you have decaf; I've already had three cups of regular today and need to pace myself.\"",
                "\"Which pump dispenser on the refreshment credenza contains the decaf?\" / \"The dispenser with the bright orange collar on the right is decaf; the black one is the French roast.\""
            ],
            "collocations": [
                "decaf coffee",
                "switch to decaf",
                "freshly brewed decaf",
                "pot of decaf",
                "order a decaf",
                "decaf espresso"
            ]
        },
        "wordFamily": {
            "noun": "decaf, decaffeination",
            "verb": "decaffeinate",
            "adjective": "decaf, decaffeinated",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "decaf coffee carafe orange handle office refreshment breakroom",
            "imageDescription": "A commercial glass coffee carafe with an orange plastic handle and collar signifying freshly brewed decaf, sitting beside white ceramic mugs and sugar packets on an office breakroom counter.",
            "mnemonic": "DECAF = DE-caffeinated (caffeine has been deleted!). Enjoy full coffee flavor with zero evening jitters!"
        },
        "video": {
            "description": "A corporate food service video demonstrating proper beverage station setup, showing staff using color-coded orange carafes for decaf to ensure seamless service during evening conference sessions."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                7
            ],
            "exampleQuestion": "Because several committee members are sensitive to stimulants, the event coordinator requested two carafes of _____ for the afternoon strategy session. (A) decaffeinates (B) decaffeinating (C) decaf (D) decaffeinate",
            "tips": "In TOEIC Part 3 and Part 7 workplace conversations and emails, 'decaf' functions either as an uncountable noun or noun modifier (e.g., 'two carafes of decaf'). Option (C) decaf correctly fits as the noun object of the preposition 'of'. Options (A), (B), and (D) are verb forms and cannot function as the object in this context."
        },
        "synonyms": [
            "decaffeinated coffee",
            "caffeine-free brew",
            "unleaded coffee",
            "decaf blend"
        ],
        "antonyms": [
            "regular coffee",
            "caffeinated coffee"
        ],
        "relatedWords": [
            "caffeine",
            "espresso",
            "carafe",
            "airpot",
            "roast",
            "beverage",
            "herbal tea"
        ]
    },
    {
        "id": "dining-111",
        "word": "delectable",
        "partOfSpeech": [
            "adjective"
        ],
        "category": "dining",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/dɪˈlek.tə.bəl/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/delectable--_us_1.mp3",
            "syllableBreakdown": "de·lec·ta·ble",
            "stressPattern": "○●○○",
            "commonMistakes": "Learners often put primary stress incorrectly on the first syllable (/ˈdel.ɪk.tə.bəl/) or articulate the third vowel as a tense /eɪ/ rather than an unstressed schwa /tə.bəl/. Ensure the stress is strictly on the second syllable: dih-LEK-tuh-buhl."
        },
        "etymology": {
            "origin": "Middle English delectable, borrowed from Old French delectable (12th century), from Latin dēlectābilis ('delightful'), derived from dēlectāre ('to delight, charm, please greatly'), frequentative of dēlicere ('to allure, entice away'), composed of dē- ('away') and lacere ('to entice, trap, ensnare').",
            "rootWord": "dēlectābilis / dēlectāre",
            "rootMeaning": "delightful, highly pleasing, alluring",
            "evolution": "Adopted into Middle English c. 1380 to describe spiritual, emotional, or sensory pleasure. Over the 18th and 19th centuries, its general usage narrowed, becoming predominantly specialized in gastronomical and culinary language to characterize exquisitely flavorful food and drink.",
            "relatedLanguages": [
                "French: délectable",
                "Spanish: deleitable",
                "Italian: dilettevole",
                "Portuguese: deleitável",
                "Latin: delectabilis"
            ],
            "firstRecordedUse": "c. 1380 (Middle English)"
        },
        "deepMeaning": {
            "coreConcept": "Possessing an exquisite, delightful, and highly enticing taste or aroma; exceptionally appetizing and prepared with culinary excellence.",
            "spatialContext": "Upscale restaurant dining rooms, executive gala banquets, luxury hotel catering brochures, food critic review columns, and artisanal pastry display cases.",
            "temporalContext": "Celebratory corporate dinners, annual shareholder banquets, client entertainment evenings, and seasonal menu promotional campaigns.",
            "emotionalTone": "Sensory-rich, appreciative, sophisticated, indulgent, and refined.",
            "formalityLevel": "formal",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "Native speakers treat 'delectable' as a sophisticated, epicurean upgrade over 'delicious' or 'tasty'. It suggests not just good flavor, but culinary artistry, luxurious ingredients, and mouthwatering presentation. Food critics, banquet directors, and menu copywriters use it strategically to evoke high-end craftsmanship. In business entertainment, describing a banquet as 'delectable' conveys cultured appreciation.",
            "mentalImage": "An artfully arranged dessert station at a luxury corporate gala, displaying tiered crystal platters of raspberry macarons, chocolate ganache tartlets, and glazed fruit pastries dusted with powdered sugar.",
            "whenToUse": "Use when describing gourmet cuisine, artisanal desserts, hors d'oeuvres, fine wines, or catered banquets in formal dining reviews, hospitality marketing materials, or corporate thank-you notes.",
            "whenNotToUse": "Do not use 'delectable' for mundane, everyday snacks (e.g., describing a vending-machine potato chip as 'delectable' sounds sarcastic or pretentious). Rarely applied to non-food concepts in modern corporate English.",
            "culturalContext": "In Anglo-American corporate hospitality, hosting clients at fine dining restaurants is an essential business development tradition. Descriptive culinary vocabulary like 'delectable' frequently appears in TOEIC Part 7 reading passages (restaurant reviews, catering advertisements, and promotional emails) to convey high service standards."
        },
        "examples": {
            "daily": [
                "The neighborhood French bakery is celebrated for its delectable almond croissants and berry tarts.",
                "After the conference, we enjoyed a delectable three-course dinner featuring pan-seared sea bass.",
                "She brought a box of delectable handmade truffles to share with her colleagues in the office."
            ],
            "business": [
                "Our client expressed sincere appreciation for the delectable catering provided during the product launch gala.",
                "The hotel's promotional brochure highlights a delectable array of hot canapés for corporate evening mixers.",
                "Attendees at the annual banquet commended the executive chef for crafting a truly delectable seasonal menu."
            ],
            "conversation": [
                "\"Did you have an opportunity to sample the appetizers at the reception?\" / \"Yes, the smoked salmon blinis were absolutely delectable; the caterer did a phenomenal job.\"",
                "\"Which dessert should we select for the retirement banquet?\" / \"The lemon tart is delectable and offers a light, refreshing conclusion to a heavy meal.\""
            ],
            "collocations": [
                "delectable cuisine",
                "delectable dessert",
                "delectable spread",
                "truly delectable",
                "delectable treats",
                "delectable assortment"
            ]
        },
        "wordFamily": {
            "noun": "delectability, delectableness, delectation",
            "verb": "delectate",
            "adjective": "delectable",
            "adverb": "delectably"
        },
        "visual": {
            "imageKeyword": "gourmet dessert delectable chocolate pastry fine dining plated",
            "imageDescription": "An artfully plated chocolate lava cake with a molten center, garnished with fresh raspberries, spun sugar, and a mint sprig on a dark slate plate in a luxury restaurant setting.",
            "mnemonic": "DELECTABLE sounds like DELIGHT + TABLE: extraordinary culinary creations that bring supreme DELIGHT to your dining TABLE!"
        },
        "video": {
            "description": "A gourmet culinary feature video showcasing an award-winning executive chef assembling delectable dessert platters for an international corporate summit gala."
        },
        "toeicContext": {
            "commonParts": [
                5,
                6,
                7
            ],
            "exampleQuestion": "Guests at the corporate anniversary celebration were treated to a _____ assortment of Mediterranean dishes prepared by an award-winning chef. (A) delectably (B) delectable (C) delectability (D) delectate",
            "tips": "In TOEIC Part 5, sentence structure analysis is key: between the indefinite article ('a') and the head noun ('assortment'), you must insert an adjective to modify the noun. Therefore, (B) delectable is the correct choice. (A) is an adverb, (C) is a noun, and (D) is an obsolete verb."
        },
        "synonyms": [
            "delicious",
            "scrumptious",
            "exquisite",
            "mouthwatering",
            "luscious",
            "appetizing"
        ],
        "antonyms": [
            "unpalatable",
            "distasteful",
            "inedible",
            "unsavory",
            "flavorless"
        ],
        "relatedWords": [
            "gourmet",
            "culinary",
            "epicurean",
            "gastronomy",
            "palate",
            "hors d'oeuvre",
            "delicacy"
        ]
    },
    {
        "id": "dining-112",
        "word": "delicatessen",
        "partOfSpeech": [
            "noun"
        ],
        "category": "dining",
        "level": "advanced",
        "toeicFrequency": 7,
        "pronunciation": {
            "ipa": "/ˌdel.ɪ.kəˈtes.ən/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/delicatessen--_us_1.mp3",
            "syllableBreakdown": "del·i·ca·tes·sen",
            "stressPattern": "○○○●○",
            "commonMistakes": "Learners often misplace the primary stress on the second syllable (/dɪˈlɪkətəsən/) or mispronounce the suffix. The primary stress falls firmly on the fourth syllable: del-i-ca-TESS-en. The final syllable ends with an unstressed schwa-nasal /-ən/."
        },
        "etymology": {
            "origin": "Borrowed into American English in the late 19th century from German Delikatessen ('delicacies, fine foods'), plural of Delikatesse, borrowed from French délicatesse ('delicacy, refinement'), from Italian delicatezza, from Latin dēlicātus ('delicate, pleasing, luxurious').",
            "rootWord": "Delikatessen / Latin dēlicātus",
            "rootMeaning": "delicacies, fine foods / pleasing, delightful",
            "evolution": "In German, Delikatessen originally designated luxury prepared food items (cured meats, smoked fish, imported cheeses, pickles). In the late 19th century, Central European and German-Jewish immigrants in New York established specialty food shops selling these delicacies, shifting the plural noun from the food items to the store itself. It was subsequently clipped colloquially to 'deli'.",
            "relatedLanguages": [
                "German: Delikatessen",
                "French: délicatesse",
                "Dutch: delicatessen",
                "Swedish: delikatess",
                "Italian: delicatezza"
            ],
            "firstRecordedUse": "1889 (American English, borrowed from German)"
        },
        "deepMeaning": {
            "coreConcept": "A specialty food shop, or a dedicated supermarket counter, that prepares, displays, and sells high-quality ready-to-eat foods, including cured meats, cold cuts, artisanal cheeses, gourmet salads, and custom made-to-order sandwiches; by extension, the specialty prepared delicacies sold there.",
            "spatialContext": "Urban street-front specialty sandwich shops, supermarket service counters with curved glass sneeze guards, corporate business district lunch spots, and gourmet food halls.",
            "temporalContext": "Peak lunch hours (11:30 AM to 1:30 PM), morning corporate catering order pickups, and pre-holiday charcuterie shopping.",
            "emotionalTone": "Bustling, authentic, artisanal, appetizing, and hospitable.",
            "formalityLevel": "neutral",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "In casual conversation, native speakers almost universally abbreviate this word to 'deli' ('Let's grab lunch at the deli'). However, the full word 'delicatessen' is retained on storefront signage, catering agreements, and gourmet food marketing to evoke old-world culinary craftsmanship, authenticity, and premium European heritage. Natives associate it with pastrami on rye, sliced corned beef, artisan provolone, dill pickles, and potato salad.",
            "mentalImage": "A bustling downtown delicatessen counter during the noon lunch rush, where an attendant in a white apron operates a meat slicer behind a curved glass display case filled with roasted turkey breasts, wheels of Swiss cheese, and bowls of potato salad.",
            "whenToUse": "Use when referring to specialized prepared food shops, supermarket service counters selling sliced meats and cheeses, or corporate catering suppliers providing sandwich platters. Use the full formal term 'delicatessen' in written contracts, signage, and formal hospitality descriptions.",
            "whenNotToUse": "Do not use 'delicatessen' for sit-down full-service dinner restaurants or fast-food burger establishments. In casual spoken English, prefer 'deli' unless you are specifically emphasizing formal or historic branding.",
            "culturalContext": "The delicatessen is a cultural cornerstone of North American urban centers (notably New York, Montreal, and Chicago), deeply tied to 19th-century immigrant heritage. In corporate business culture, ordering platter platters from a reputable local delicatessen is the traditional choice for executive working lunches, training sessions, and client meetings."
        },
        "examples": {
            "daily": [
                "He picked up a warm pastrami sandwich on rye and a dill pickle from the corner delicatessen.",
                "The supermarket delicatessen offers freshly sliced smoked ham, aged cheddar, and house-made coleslaw.",
                "We bought imported olives, artisanal cheese, and cured salami from the local Italian delicatessen for our picnic."
            ],
            "business": [
                "The administrative team contracted a renowned downtown delicatessen to cater the quarterly department workshop.",
                "The mixed sandwich and wrap platters supplied by the local delicatessen arrived promptly at eleven thirty.",
                "To accommodate working lunches, the company maintains a corporate billing account with the nearby gourmet delicatessen."
            ],
            "conversation": [
                "\"Where should we source the box lunches for tomorrow's regional sales meeting?\" / \"I recommend the German delicatessen on Market Street; their cold-cut sandwiches and pretzel rolls are outstanding.\"",
                "\"Could you stop by the delicatessen counter during your lunch break?\" / \"Sure, do you need sliced roast turkey or roast beef for the afternoon reception?\""
            ],
            "collocations": [
                "gourmet delicatessen",
                "delicatessen counter",
                "delicatessen platter",
                "local delicatessen",
                "supermarket delicatessen",
                "Italian delicatessen"
            ]
        },
        "wordFamily": {
            "noun": "delicatessen, deli, delicacy",
            "verb": "",
            "adjective": "delicatessen (noun adjunct), delicate",
            "adverb": "delicately"
        },
        "visual": {
            "imageKeyword": "delicatessen counter sliced meats cheese gourmet display case",
            "imageDescription": "A gleaming gourmet delicatessen counter filled with whole salamis, sliced roast beef, artisan cheeses, and bowls of marinated olives behind a spotless curved glass display case.",
            "mnemonic": "DELICATESSEN: DELI + DELICACIES! A specialty shop where delicious DELICACIES are sliced fresh for your lunch!"
        },
        "video": {
            "description": "A culinary business documentary exploring how traditional delicatessens prepare artisan cold cuts and fulfill high-volume corporate catering orders during peak midday hours."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                7
            ],
            "exampleQuestion": "To feed the visiting auditors during their working lunch, the office coordinator ordered several sandwich platters from a reputable local _____. (A) delicately (B) delicacy (C) delicateness (D) delicatessen",
            "tips": "In TOEIC Part 5, vocabulary discrimination tests words sharing the same etymological root. While 'delicacy' (B) means a rare expensive food treat and 'delicateness' (C) means fragile quality, 'delicatessen' (D) is the countable noun representing the store or catering business where food platters are prepared and purchased. (A) is an adverb."
        },
        "synonyms": [
            "deli",
            "charcuterie",
            "gourmet food shop",
            "sandwich shop",
            "provisions store",
            "salumeria"
        ],
        "antonyms": [],
        "relatedWords": [
            "charcuterie",
            "pastrami",
            "cold cuts",
            "artisan cheese",
            "panini",
            "provolone",
            "condiments"
        ]
    }
]

with open('words_output.json', 'w', encoding='utf-8') as f:
    json.dump(words_data, f, indent=2, ensure_ascii=False)
print("Successfully wrote words_output.json")
