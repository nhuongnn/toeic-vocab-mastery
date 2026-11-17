import json
import re
import sys

words_data = [
    {
        "id": "dining-093",
        "word": "cocktail",
        "partOfSpeech": [
            "noun"
        ],
        "category": "dining",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈkɑːk.teɪl/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/cocktail--_us_1.mp3",
            "syllableBreakdown": "cock-tail",
            "stressPattern": "primary stress on the first syllable (COCK-tail)",
            "commonMistakes": "Learners often mispronounce the diphthong in the second syllable /teɪl/ as a flat monophthong /tel/ or confuse the dark /l/ at the end, dropping it entirely. In some non-native speech communities, speakers mistakenly drop the final 'l' ('cock-tay') or over-emphasize the second syllable ('cock-TAIL')."
        },
        "etymology": {
            "origin": "American English, first documented in the late 18th to early 19th century. Earliest explicit definition published in 1806 in the Hudson, New York paper The Balance, and Columbian Repository, defining it as a stimulating liquor composed of spirits of any kind, sugar, water, and bitters.",
            "rootWord": "cock + tail (compound noun of uncertain popular origin, possibly referring to a non-thoroughbred horse with a docked tail, or tavern dregs tapped from the 'cock' of a cask)",
            "rootMeaning": "Originally used in horse racing jargon to denote a mixed-breed horse (having a cocked-up tail), metaphorical extension came to signify a mixed, non-pure drink.",
            "evolution": "In early 19th-century America, 'cocktail' specifically designated a morning drink of spirit, bitters, water, and sugar. Over the late 19th and 20th centuries, it broadened through international hotel bars (such as the Savoy in London) to encompass any mixed alcoholic beverage combining spirits, fruit juices, aromatic bitters, or liqueurs, as well as social functions ('cocktail party', 'cocktail hour', 'cocktail reception'). By mid-century, culinary usage also included chilled appetizers served in stemmed glasses ('shrimp cocktail', 'fruit cocktail').",
            "relatedLanguages": [
                "French: cocktail",
                "Spanish: cóctel",
                "Italian: cocktail",
                "German: Cocktail"
            ],
            "firstRecordedUse": "First recorded in American English print in 1798 (The Morning Post, London, referencing an American drink) and formally defined in 1806 (The Balance, and Columbian Repository, NY)."
        },
        "deepMeaning": {
            "coreConcept": "An alcoholic mixed drink consisting of one or more distilled spirits combined with other ingredients such as fruit juices, flavored syrups, tonic, or bitters, chilled and served in specialized glassware; also refers metonymically to a social gathering or networking reception where such drinks and hors d'oeuvres are served.",
            "spatialContext": "Hotel lounge bars, conference banquet foyers, corporate gala receptions, rooftop hospitality suites, upscale restaurant lounges, and catering service bars with shakers, bar carts, and glassware racks.",
            "temporalContext": "Late afternoon to early evening social hours (typically 5:00 PM to 7:30 PM), pre-dinner conference mixers, post-keynote networking receptions, and celebratory corporate milestones.",
            "emotionalTone": "Sophisticated, convivial, celebratory, and relaxed yet professional.",
            "formalityLevel": "neutral",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "To native English speakers, 'cocktail' immediately brings to mind two distinct but related concepts: a crafted mixed drink (like a Martini, Manhattan, or Old Fashioned) and a corporate networking event ('cocktail reception' or 'cocktail hour'). In business culture, an invitation to a 'cocktail party' or 'cocktail hour' signals informal networking—standing up, mingling with highball or martini glasses in hand, nibbling on canapés, and building relationships outside the rigid structure of boardroom tables.",
            "mentalImage": "A polished marble hotel bar during a corporate conference mixer, where an experienced bartender vigorously shakes a stainless steel shaker and strains a vibrant amber drink into a chilled coupe glass garnished with a twist of orange peel, while attendees in business attire converse nearby holding stemware.",
            "whenToUse": "Use when referring specifically to a mixed alcoholic or signature non-alcoholic drink ('signature cocktail', 'pre-dinner cocktail') or a networking reception ('cocktail reception', 'cocktail hour', 'cocktail attire').",
            "whenNotToUse": "Do not use 'cocktail' when referring to straight unmixed spirits (use 'neat spirit', 'whiskey on the rocks', or 'liquor'), draft or bottled beer ('beer', 'ale'), or wine ('wine', 'vintage'). Also avoid using 'cocktail' in medical or formal safety contexts unless referring to metaphorical medical combinations ('drug cocktail').",
            "culturalContext": "The 'cocktail reception' is a standard corporate networking vehicle in Anglo-American business etiquette. It provides an egalitarian space where executives, junior staff, and clients can interact smoothly. In the TOEIC exam, cocktails frequently appear in Part 3 conversations (ordering drinks, discussing banquet itineraries), Part 4 announcements (conference schedule overviews with evening networking receptions), and Part 7 event schedules or catering invoices."
        },
        "examples": {
            "daily": [
                "We met at the hotel lounge after work to enjoy a refreshing citrus cocktail before dinner.",
                "The bartender crafted an alcohol-free fruit cocktail for guests who preferred not to drink spirits.",
                "She ordered a classic champagne cocktail to celebrate her promotion with close friends."
            ],
            "business": [
                "The international trade summit will conclude with a formal cocktail reception in the grand ballroom foyer.",
                "The catering contract specifies open-bar service offering wine, beer, and two signature cocktails for two hours.",
                "Delegates used the informal atmosphere of the evening cocktail hour to establish partnerships with regional distributors."
            ],
            "conversation": [
                "Event Coordinator: 'Should we schedule the keynote speech before or during the cocktail reception?'\\nBanquet Director: 'Definitely before; guests prefer to socialize freely once the drinks and hors d'oeuvres are served.'",
                "Server: 'Good evening. Would you care to see our seasonal cocktail menu, or may I bring you a glass of sparkling water?'\\nExecutive: 'I'll take a look at the cocktail list, thank you—what do you recommend featuring bourbon?'",
                "Attendee A: 'Are you planning to attend the welcoming cocktail party tonight?'\\nAttendee B: 'Yes, it's the best opportunity during the conference to meet the overseas delegates without formal appointments.'"
            ],
            "collocations": [
                "cocktail reception",
                "cocktail lounge",
                "cocktail hour",
                "signature cocktail",
                "cocktail napkin",
                "shrimp cocktail"
            ]
        },
        "wordFamily": {
            "noun": "cocktail",
            "verb": "",
            "adjective": "cocktail-style",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "cocktail glass garnish bartender lounge hotel bar networking reception",
            "imageDescription": "A high-end hotel lounge where a bartender serves a chilled, amber-hued craft cocktail in an elegant stemmed glass garnished with an orange twist, set beside small linen cocktail napkins at an evening corporate mixer.",
            "mnemonic": "COCKTAIL: Think of a ROOSTER's (cock) colorful TAIL feathers—a cocktail combines vibrant, colorful ingredients mixed into one dazzling glass!"
        },
        "video": {
            "description": "A hospitality training clip showing a professional hotel banquet staff preparing the bar station for an executive cocktail reception, illustrating proper glassware selection, shaker technique, and drink presentation."
        },
        "toeicContext": {
            "commonParts": [
                1,
                3,
                4,
                7
            ],
            "exampleQuestion": "All conference attendees are cordially invited to the rooftop terrace at 6:00 P.M. for a welcoming _____ hosted by the executive committee.\\n(A) cocktail\\n(B) cocktail reception\\n(C) cocktailed\\n(D) cocktailing",
            "tips": "In TOEIC Part 5 and 7, 'cocktail reception' or 'cocktail party' is a common compound noun phrase describing corporate networking events. When modified by the indefinite article 'a welcoming _____', the phrase requires a countable event noun. While (A) 'cocktail' can mean the drink itself, 'cocktail reception' (B) is the standard business compound designating the evening networking event."
        },
        "synonyms": [
            "mixed drink",
            "aperitif",
            "beverage",
            "libation",
            "highball"
        ],
        "antonyms": [
            "mocktail",
            "soft drink",
            "non-alcoholic beverage"
        ],
        "relatedWords": [
            "bartender",
            "spirits",
            "liqueur",
            "hors d'oeuvres",
            "canapé",
            "barware",
            "lounge"
        ]
    },
    {
        "id": "dining-094",
        "word": "coffee",
        "partOfSpeech": [
            "noun"
        ],
        "category": "dining",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/ˈkɔː.fi/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/coffee--_us_1.mp3",
            "syllableBreakdown": "cof-fee",
            "stressPattern": "primary stress on the first syllable (COF-fee)",
            "commonMistakes": "Learners sometimes mispronounce the first vowel as /oʊ/ ('co-fee') or replace the voiceless labiodental fricative /f/ with a /p/ ('cop-pee' in some Asian linguistic backgrounds). Additionally, in fast speech, the second syllable should remain an unstressed /i/ rather than an elongated /iː/."
        },
        "etymology": {
            "origin": "Borrowed into English in the late 16th century via Dutch 'koffie', from Ottoman Turkish 'kahve', borrowed from Arabic 'qahwah' (originally referring to a type of wine or dark beverage that suppresses appetite).",
            "rootWord": "qahwah (Arabic: brewed bean infusion / wine)",
            "rootMeaning": "Dark brew or stimulating beverage prepared from roasted seeds.",
            "evolution": "Originating in the highlands of Ethiopia and cultivated in Yemen by the 15th century, coffee drinking spread through Ottoman Sufi monasteries and public coffeehouses (kahvehane) across Istanbul, Cairo, and Damascus. Venetian and Dutch merchants introduced the beans to Europe around 1600. During the late 17th and 18th centuries, London coffeehouses became centers of commerce, maritime insurance (notably Lloyd's of London), and political debate. In modern industry, it developed into a global agricultural commodity and office culture staple.",
            "relatedLanguages": [
                "Dutch: koffie",
                "French: café",
                "German: Kaffee",
                "Italian: caffè",
                "Spanish: café",
                "Turkish: kahve"
            ],
            "firstRecordedUse": "Late 16th century (first documented in English in 1598 via Dutch traveler reports)."
        },
        "deepMeaning": {
            "coreConcept": "A popular hot or iced aromatic beverage brewed by percolating, dripping, infusing, or pressurizing hot water through the roasted, ground seeds of the Coffea plant; also refers to the coffee beans themselves, a single serving ('a coffee'), or the social/workplace pause taken to consume it ('coffee break').",
            "spatialContext": "Corporate breakrooms, office pantries, espresso bars, cafeteria beverage stations, conference seminar buffets, and cafe counters equipped with drip brewers, espresso machines, and thermal carafes.",
            "temporalContext": "Early morning arrival hours (7:30 AM to 9:00 AM), mid-morning conference intermissions (10:30 AM), post-lunch productivity slumps (2:00 PM), and continuous availability throughout business hours.",
            "emotionalTone": "Invigorating, comforting, social, productive, and routine.",
            "formalityLevel": "neutral",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "To native speakers, 'coffee' is the quintessential fuel of modern commerce and daily office life. More than just a beverage, it is a social lubricant and mental boundary marker: 'grabbing a coffee' is the universally accepted shorthand for an informal one-on-one catch-up, job networking chat, or brief escape from office desks. Grammatically, native speakers use 'coffee' as both an uncountable mass noun ('I need some fresh coffee') and a countable unit noun in beverage ordering ('We'd like two coffees and a tea, please').",
            "mentalImage": "A busy corporate pantry at 8:30 AM, where steam rises from a freshly brewed stainless-steel thermal carafe as an office worker pours dark coffee into a ceramic mug alongside small dispensers of milk, oat creamer, and sugar packets.",
            "whenToUse": "Use when referring to the brewed drink, roasted beans, ground powder, or casual business invitations ('Let's grab a coffee before the seminar').",
            "whenNotToUse": "Do not confuse with 'cafe' (the physical shop where coffee and snacks are sold) or 'cafeteria' (a self-service dining hall). Avoid using 'coffee' alone if you specifically mean an espresso beverage like a cappuccino or latte when exact order accuracy is needed.",
            "culturalContext": "In English-speaking business environments, the 'coffee break' is an institutional right and vital productivity reset. Offering a visiting client coffee upon arrival is fundamental professional hospitality. In TOEIC test design, coffee is omnipresent across Part 1 (photos of people drinking coffee, coffee pots on conference tables, or baristas at work), Part 2 (questions about breakroom supplies), Part 3 (dialogues about office machine malfunctions or meeting prep), and Part 7 (office memos ordering breakroom supplies or conference catering schedules)."
        },
        "examples": {
            "daily": [
                "She starts every morning with a hot cup of black coffee while reading the news.",
                "Let's meet at the corner cafe tomorrow morning for a quick coffee before heading to work.",
                "He refilled his travel mug with freshly ground drip coffee from the kitchen counter."
            ],
            "business": [
                "Complimentary coffee and light refreshments will be served in the mezzanine foyer prior to the shareholder meeting.",
                "The office manager submitted a purchase order for twelve bags of fair-trade whole-bean coffee for the employee breakroom.",
                "During the mid-morning intermission, attendees gathered around the beverage station to drink coffee and discuss the keynote speech."
            ],
            "conversation": [
                "Colleague A: 'Are you ready for the quarterly budget presentation, or do you need a minute?'\\nColleague B: 'I just need to grab a quick cup of coffee from the pantry to wake up, and then I'm ready.'",
                "Office Assistant: 'The thermal coffee carafe in Conference Room B is empty.'\\nCatering Lead: 'I'll brew a fresh batch immediately so it's ready before the directors arrive.'",
                "Manager: 'Do you have ten minutes later this afternoon to discuss the onboarding schedule?'\\nNew Hire: 'Sure, we could grab a coffee in the lobby cafeteria around two o'clock if that works for you.'"
            ],
            "collocations": [
                "coffee break",
                "freshly brewed coffee",
                "cup of coffee",
                "coffee maker",
                "black coffee",
                "iced coffee"
            ]
        },
        "wordFamily": {
            "noun": "coffee",
            "verb": "",
            "adjective": "coffeelike",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "freshly brewed coffee mug steam beans corporate breakroom carafe",
            "imageDescription": "A clean, modern office breakroom table featuring a ceramic white mug filled with steaming dark coffee, surrounded by a scattering of roasted brown coffee beans and a sleek stainless steel thermal carafe in the soft morning light.",
            "mnemonic": "COFFEE: Keep COncentrating, Feeling Fresh, Energetic, and Enthusiastic!"
        },
        "video": {
            "description": "A corporate hospitality video demonstrating the setup of a professional beverage station for an executive seminar, covering commercial coffee brewers, thermal carafes, dairy carafes, and eco-friendly compostable cups."
        },
        "toeicContext": {
            "commonParts": [
                1,
                2,
                3,
                4,
                7
            ],
            "exampleQuestion": "To reduce corporate waste, staff members are encouraged to bring reusable mugs rather than using disposable paper cups at the _____ station.\\n(A) coffee\\n(B) coffees\\n(C) coffeed\\n(D) coffering",
            "tips": "In TOEIC Part 5, noun adjuncts (nouns functioning as adjectives to modify another noun) appear frequently. In the compound noun 'coffee station' (or 'coffee maker', 'coffee break'), the singular noun 'coffee' (A) modifies 'station'. Option (B) is a plural noun, (C) is a fictitious past participle, and (D) is unrelated (derived from 'coffer', meaning a strongbox)."
        },
        "synonyms": [
            "brew",
            "espresso",
            "caffeine beverage",
            "java",
            "hot beverage"
        ],
        "antonyms": [
            "decaf",
            "herbal tea"
        ],
        "relatedWords": [
            "barista",
            "roast",
            "espresso",
            "cappuccino",
            "carafe",
            "caffeine",
            "breakroom"
        ]
    },
    {
        "id": "dining-095",
        "word": "confectionery",
        "partOfSpeech": [
            "noun"
        ],
        "category": "dining",
        "level": "advanced",
        "toeicFrequency": 7,
        "pronunciation": {
            "ipa": "/kənˈfek.ʃən.er.i/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/confectionery--_us_1.mp3",
            "syllableBreakdown": "con-fec-tion-er-y",
            "stressPattern": "primary stress on the second syllable (kuhn-FEK-shuh-nair-ee)",
            "commonMistakes": "Learners often stress the first syllable ('CON-fectionery') instead of the second (/kənˈfek-/). Also, learners confuse the spelling and meaning between 'confectionery' (noun: the sweets or the shop) and 'confectioner' (noun: the person who makes sweets), or drop syllables in rapid speech."
        },
        "etymology": {
            "origin": "From Late Middle English 'confection' + '-ery'. Ultimately from Latin 'confectionem' (nominative 'confectio', meaning a making, preparing, or compounding), noun of action from past-participle stem of 'conficere' (to prepare, complete, compose, put together), from 'com-' (together) + 'facere' (to make, do).",
            "rootWord": "conficere (Latin: to put together, manufacture, compound, prepare)",
            "rootMeaning": "Things compounded or prepared together; originally applied to medicinal preparations sweetened with sugar, honey, or syrup.",
            "evolution": "In Medieval Latin and Old French, 'confectio' referred to apothecary medicines compounded with honey or sugar to disguise unpleasant tastes. By the 15th and 16th centuries in England, sugar preservation techniques shifted from the apothecary to the culinary trade. Spun sugar, candied fruits, and sweet preserves became known as 'confections'. By the 18th century, 'confectionery' emerged to denote both the craft of sweet-making, the sweet confections themselves, and the retail shop where they were produced and sold.",
            "relatedLanguages": [
                "French: confiserie",
                "Italian: confetteria",
                "Spanish: confitería",
                "German: Konfekt"
            ],
            "firstRecordedUse": "Mid-16th century (c. 1540s for the shop/art; 18th century for the collective mass of sweet treats)."
        },
        "deepMeaning": {
            "coreConcept": "Sweet food products prepared primarily from sugar, chocolate, and flour, including candies, chocolates, pralines, fondants, candied fruits, and sweet pastries; also encompasses the business, industry, art, or retail establishment dedicated to manufacturing and selling these items.",
            "spatialContext": "Artisanal sweet shops, gourmet chocolatiers, pastry boutiques, industrial candy manufacturing plants, hotel banquet dessert buffets, airport duty-free gift stores, and corporate gifting departments.",
            "temporalContext": "Holiday gifting seasons (Christmas, Lunar New Year, Valentine's Day, Easter), dessert courses at formal corporate banquets, afternoon conference tea breaks, and year-end executive client appreciation shipments.",
            "emotionalTone": "Indulgent, refined, festive, artisanal, and delightful.",
            "formalityLevel": "formal",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "To a native speaker, 'confectionery' is a sophisticated, formal collective noun. While a child buys 'candy' or 'sweets', a corporate gift coordinator or gourmet consumer orders 'luxury confectionery' or visits a 'traditional confectionery'. It evokes artisanal craftsmanship—tempered dark chocolate truffles, marzipan fruits, hand-pulled candies, and delicate petit fours. In industry and trade contexts, 'the confectionery sector' is the standard formal term for the commercial candy and sweet food manufacturing market.",
            "mentalImage": "An elegant boutique confectioner's shop with glass display counters illuminated by soft lighting, presenting rows of handcrafted dark chocolate truffles, pastel fruit jellies, glazed marzipan figures, and gold-ribboned gift boxes ready for corporate distribution.",
            "whenToUse": "Use when referring formally to high-quality sweets, candies, and chocolates collectively ('artisan confectionery', 'luxury confectionery gifts'), or the commercial manufacturing/retail sector ('the global confectionery industry', 'a wholesale confectionery supplier').",
            "whenNotToUse": "Do not use 'confectionery' when referring to a single piece of everyday cheap candy (say 'a piece of candy' or 'a sweet'). Do not use it for savory baked goods like bread or dinner rolls (which belong to a 'bakery'). Avoid informal contexts where 'candy' or 'chocolate' is more natural.",
            "culturalContext": "In corporate protocol across the UK, Commonwealth, and international business, boxed gourmet confectionery is a standard, tasteful holiday gift presented to clients, vendors, and staff. In the TOEIC exam, 'confectionery' appears in Part 3 and Part 4 announcements regarding airport duty-free shopping, boutique retailers, or local business profiles, and in Part 7 reading texts such as supplier product catalogs, shipping invoices, and corporate gift purchase orders."
        },
        "examples": {
            "daily": [
                "During our vacation in Brussels, we visited a historic confectionery famous for its handmade pralines.",
                "She purchased a decorative tin of traditional peppermint confectionery as a gift for her host family.",
                "The boutique confectionery on Main Street displays colorful ribbon candy and glazed nuts in its shop window."
            ],
            "business": [
                "The marketing department ordered three hundred branded confectionery gift boxes to distribute to key corporate clients during the holiday season.",
                "Rising global cocoa prices have impacted the quarterly profit margins of multinational confectionery manufacturers.",
                "The hotel's executive pastry chef curated an elaborate confectionery display for the annual charity banquet."
            ],
            "conversation": [
                "Procurement Officer: 'Have we selected a supplier for our annual client holiday gift hampers?'\\nMarketing Manager: 'Yes, we contracted an artisanal Swiss confectionery that provides custom-packaged dark chocolate assortments.'",
                "Retail Director: 'Sales in our airport duty-free confectionery section rose by fifteen percent this quarter.'\\nStore Manager: 'High-end packaged chocolates and regional sweets continue to be the most popular souvenir purchases.'",
                "Event Host: 'Will the banquet dessert menu include individual plated desserts or a dessert table?'\\nCatering Lead: 'We recommend a gourmet confectionery buffet featuring macarons, truffles, and fruit tarts so guests can sample several options.'"
            ],
            "collocations": [
                "confectionery industry",
                "artisanal confectionery",
                "confectionery products",
                "luxury confectionery",
                "confectionery manufacturer",
                "confectionery shop"
            ]
        },
        "wordFamily": {
            "noun": "confectionery, confectioner, confection",
            "verb": "confect",
            "adjective": "confectionary",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "luxury confectionery chocolates truffles display gift box artisanal sweets",
            "imageDescription": "A high-end glass pastry and chocolate display counter showcasing handcrafted artisan truffles, pastel French macarons, and candied delicacies packaged in velvet-ribboned corporate gift boxes.",
            "mnemonic": "CONFECTIONERY: The CHEF makes PERFECT SWEET CONFECTIONS in the confectionery!"
        },
        "video": {
            "description": "An educational culinary documentary touring an artisanal confectionery workshop, revealing the traditional and modern techniques of chocolate tempering, sugar candy pulling, and luxury packaging for export."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                7
            ],
            "exampleQuestion": "Sweet Delights Ltd. has experienced substantial revenue growth following the launch of its organic _____ line in major supermarket chains across Europe.\\n(A) confect\\n(B) confectionery\\n(C) confectioner\\n(D) confectioneries",
            "tips": "In TOEIC Part 5, pay close attention to noun adjuncts versus agent nouns. In the blank before 'line' ('its organic _____ line'), the noun modifier needed is 'confectionery' (B), describing the category of sweet products. (A) is a verb, (C) is a person who makes sweets ('confectioner'), and (D) is plural (noun adjuncts usually take the singular form)."
        },
        "synonyms": [
            "sweets",
            "candies",
            "chocolates",
            "confections",
            "sweetmeats",
            "pastries"
        ],
        "antonyms": [],
        "relatedWords": [
            "chocolatier",
            "confectioner",
            "patisserie",
            "truffle",
            "praline",
            "cocoa",
            "pastry"
        ]
    },
    {
        "id": "dining-096",
        "word": "cook",
        "partOfSpeech": [
            "noun"
        ],
        "category": "dining",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/kʊk/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/cook--_us_1.mp3",
            "syllableBreakdown": "cook",
            "stressPattern": "single syllable stressed (COOK)",
            "commonMistakes": "Learners frequently substitute the long tense vowel /uː/ ('kook', like 'spook') for the correct short lax vowel /ʊ/ ('cook', like 'book' or 'look'). Another critical vocabulary mistake is confusing 'cook' (the person who prepares food) with 'cooker' (a cooking appliance, such as a stove or slow cooker)."
        },
        "etymology": {
            "origin": "Middle English 'cok' or 'cook', from Old English 'cōc' (cook), an early Germanic loanword from Vulgar Latin *cocus*, from Classical Latin 'coquus' (cook), derived from the Latin verb 'coquere' (to cook, ripen, digest, heat).",
            "rootWord": "coquus (Latin: a cook, one who prepares food by heat)",
            "rootMeaning": "One who prepares, boils, bakes, or roasts food with fire and heat.",
            "evolution": "The Latin root 'coquere' entered early Germanic tongues prior to the Anglo-Saxon migration into Britain, yielding Old English 'cōc'. In medieval English manors and monastery kitchens, the 'cōc' was a respected household professional managing roasting spits, boiling pots, and pastry ovens. As modern restaurants and hotels developed professional culinary brigades in the 19th century, 'cook' came to designate the culinary technician working the production line (e.g., line cook, prep cook, short-order cook), beneath the supervisory 'chef'.",
            "relatedLanguages": [
                "German: Koch",
                "Dutch: kok",
                "Italian: cuoco",
                "Spanish: cocinero",
                "French: cuisinier"
            ],
            "firstRecordedUse": "Old English period (c. 9th century, attested in early glossaries and monastic rules as 'cōc')."
        },
        "deepMeaning": {
            "coreConcept": "A person whose occupation or duty is to prepare, season, and cook food for consumption, especially in a restaurant kitchen, cafeteria, banquet facility, or private home; in commercial hospitality, distinguished from an executive chef as the skilled culinary craftsman executing line preparation and cooking procedures.",
            "spatialContext": "Commercial restaurant kitchens, hot cooking lines, banquet prep stations, school and corporate cafeterias, food truck kitchens, and hotel catering galleys equipped with ranges, griddles, ovens, and stainless steel prep tables.",
            "temporalContext": "Kitchen prep shifts starting mid-morning (9:00 AM) or early afternoon (2:00 PM), intense dinner rush services (6:00 PM to 9:30 PM), weekend banquet services, and rotational shift schedules.",
            "emotionalTone": "Hardworking, disciplined, practical, skilled, and focused.",
            "formalityLevel": "neutral",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "To native speakers, 'cook' as a noun has two distinct layers: domestically, anyone who prepares a meal ('She is a wonderful home cook'); professionally, a kitchen worker who actually prepares the food on the line ('prep cook', 'line cook', 'short-order cook'). Native speakers are acutely aware of the hierarchy: a 'chef' (from French chef de cuisine, 'head of kitchen') runs the kitchen, designs the menu, and manages staff, while a 'cook' executes the cooking under direction. Most importantly, native speakers NEVER call a person a 'cooker'—a 'cooker' is a piece of kitchen equipment (like a rice cooker or pressure cooker).",
            "mentalImage": "A skilled line cook wearing a clean white apron and skull cap working at a sizzling stainless-steel commercial flat-top grill, swiftly flipping salmon fillets with a spatula during a busy Friday evening dinner service while order tickets print from the kitchen terminal.",
            "whenToUse": "Use when referring to someone who prepares food professionally or casually ('line cook', 'assistant cook', 'She is a talented cook').",
            "whenNotToUse": "NEVER use 'cooker' to refer to a person (a 'cooker' is a machine or appliance!). Do not use 'cook' if referring to the head administrative leader or creator of an upscale restaurant menu (use 'head chef' or 'executive chef').",
            "culturalContext": "In professional hospitality across the English-speaking world, the line cook is the operational backbone of any restaurant. The phrase 'too many cooks spoil the broth' is a deeply ingrained idiom warning against having too many decision-makers on a project. In TOEIC exams, cooks appear in Part 1 photos (people preparing food over stoves), Part 3 dialogues (hiring kitchen staff, discussing dinner rush delays), Part 4 announcements, and Part 7 job postings recruiting line cooks or prep cooks for hotel restaurants."
        },
        "examples": {
            "daily": [
                "My grandmother was a wonderful cook who made all her pasta and sauces from scratch.",
                "He works as an assistant cook at a popular seafood restaurant downtown during the weekends.",
                "We hired a private cook to prepare meals for the family during the holiday reunion."
            ],
            "business": [
                "The bistro placed an urgent job advertisement for an experienced line cook ahead of the busy summer tourist season.",
                "Each cook in the hotel catering division must complete mandatory food safety and hygiene certification.",
                "The head chef commended the prep cooks for their speed and consistency during the high-volume banquet service."
            ],
            "conversation": [
                "Restaurant Manager: 'We need to hire two additional line cooks before we launch our expanded weekend brunch menu.'\\nExecutive Chef: 'I agree; our current kitchen staff is already stretched thin during peak Sunday hours.'",
                "Interviewer: 'How many years of commercial kitchen experience do you have as a short-order cook?'\\nApplicant: 'I worked for three years at a busy downtown diner managing the breakfast grill station.'",
                "Banquet Coordinator: 'Has the lead cook started roasting the prime rib for tonight's corporate dinner?'\\nSous Chef: 'Yes, everything is on schedule and the side dishes are currently being prepped.'"
            ],
            "collocations": [
                "line cook",
                "prep cook",
                "short-order cook",
                "head cook",
                "experienced cook",
                "hire a cook"
            ]
        },
        "wordFamily": {
            "noun": "cook, cooking, cookery",
            "verb": "cook",
            "adjective": "cooked, uncooked",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "line cook commercial kitchen apron frying pan culinary restaurant staff",
            "imageDescription": "A professional line cook in a white chef coat and apron sautéing fresh vegetables in a stainless steel skillet over a roaring gas stove in a bustling restaurant kitchen.",
            "mnemonic": "COOK: The person who takes raw fOOD and turns it into gOOD meals with a spOOn and a pOt!"
        },
        "video": {
            "description": "A culinary school instructional video detailing the daily responsibilities, workflow stations, and knife skills expected of professional line cooks in modern commercial kitchens."
        },
        "toeicContext": {
            "commonParts": [
                1,
                3,
                5,
                7
            ],
            "exampleQuestion": "The Grandview Hotel is currently seeking a certified line _____ with at least two years of experience in high-volume banquet food preparation.\\n(A) cook\\n(B) cooker\\n(C) cooked\\n(D) cookingly",
            "tips": "This is a classic TOEIC trap tested frequently in Part 5. Learners often incorrectly choose 'cooker' (B) assuming the '-er' suffix denotes a person (like teacher or baker). However, in English, 'cooker' refers exclusively to a cooking appliance (such as a pressure cooker or rice cooker), whereas 'cook' (A) is the noun referring to the person who prepares food. (C) is a past participle and (D) is a non-existent adverb."
        },
        "synonyms": [
            "culinarian",
            "kitchen worker",
            "line cook",
            "chef",
            "prep cook",
            "food preparer"
        ],
        "antonyms": [
            "diner",
            "patron",
            "customer"
        ],
        "relatedWords": [
            "chef",
            "kitchen",
            "recipe",
            "cuisine",
            "culinary",
            "sous chef",
            "culinary arts"
        ]
    }
]

with open("scratch/dining_093_096.json", "w", encoding="utf-8") as f:
    json.dump({"words": words_data}, f, indent=2, ensure_ascii=False)

print("Saved scratch/dining_093_096.json successfully.")
