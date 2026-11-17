import json
import re

words_data = [
    {
        "id": "dining-121",
        "word": "dishwasher",
        "partOfSpeech": [
            "noun"
        ],
        "category": "dining",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/dishwasher--_us_1.mp3",
            "commonMistakes": "Learners often substitute the postalveolar fricative /ʃ/ in 'dish' and 'wash' with an alveolar /s/, pronouncing it like 'dis-waster'. Additionally, speakers from non-rhotic backgrounds may omit the final /r/, while some non-native speakers misplace primary stress onto the second syllable ('dish-WASH-er' instead of the standard compound stress 'DISH-wash-er').",
            "ipa": "/ˈdɪʃˌwɑː.ʃər/",
            "stressPattern": "●○○",
            "syllableBreakdown": "dish-wash-er"
        },
        "etymology": {
            "evolution": "Originally coined in Middle English (c. 1400) to describe a scullery servant or kitchen hand tasked with scouring pots and cleaning trenchers. In 1886, American inventor Josephine Cochrane patented the first commercially viable mechanical dishwasher, motivated by servants inadvertently chipping her heirloom china. Following rapid post-WWII suburban home construction and commercial catering expansions during the 1950s and 1970s, the term shifted predominantly from denoting a scullery laborer to designating the automated electromechanical appliance ubiquitous in modern residential and commercial dining environments.",
            "firstRecordedUse": "c. 1400 (for human kitchen hand); 1886 (for patented mechanical appliance)",
            "origin": "Compound of Middle English dish (from Old English disc, plate/vessel) + washer (agent noun from Old English wæscan, to wash).",
            "relatedLanguages": [
                "German: waschen (to wash), Geschirrspüler (dishwasher)",
                "Dutch: wassen (to wash), vaatwasser (dishwasher)",
                "Old Norse: vaska (to wash)",
                "Latin: discus (flat plate, disk)"
            ],
            "rootMeaning": "an agent or mechanism that cleans eating vessels and food wares with water",
            "rootWord": "Old English disc (plate) + wæscan (to clean with water) + -ere (agent noun suffix)"
        },
        "deepMeaning": {
            "connotation": "neutral",
            "coreConcept": "An automated electromechanical appliance that uses pressurized spray arms, high-temperature water, specialized detergents, and heated drying cycles to clean and sanitize dishware and cookware; secondarily, a food-service employee responsible for washing dishware and kitchen utensils in a commercial dining establishment.",
            "emotionalTone": "Utilitarian, industrious, sanitary, and operationally vital.",
            "formalityLevel": "neutral",
            "spatialContext": "Commercial restaurant sculleries ('dish pits'), hotel banquet kitchens, corporate breakrooms, cafeteria utility stations, and residential kitchens.",
            "temporalContext": "Continuous operation during breakfast, lunch, and dinner rushes; nightly end-of-shift sanitation runs; weekly descaling maintenance."
        },
        "nativeMindset": {
            "culturalContext": "In Anglo-American corporate offices, signs taped above the kitchen sink or dishwasher reminding employees to load their dirty coffee mugs ('Your mother does not work here; please load the dishwasher') are an iconic workplace culture fixture. In hospitality operations, commercial pass-through dishwashers form the operational bottleneck of table turns, and many accomplished executive chefs pride themselves on having started their culinary careers as dishwashers.",
            "howNativesThink": "Native speakers instinctively treat 'dishwasher' as an indispensable appliance of modern convenience and hygiene. In domestic and shared office contexts, it is the center of daily chore diplomacy ('Who forgot to unload the dishwasher?'). In commercial restaurant kitchens, line staff view both the high-temperature machine and the scullery worker as the crucial foundation keeping clean plating ware in constant circulation.",
            "mentalImage": "A commercial stainless-steel hood-type dishwasher in a restaurant kitchen opening to release a cloud of sanitizing steam as a kitchen steward slides out a blue plastic peg rack filled with sparkling, hot ceramic plates.",
            "whenNotToUse": "Do not confuse with a 'dish rack' (a stationary drying frame without mechanical functions) or 'sink'. When referring to human staff in formal food-service job advertisements, 'kitchen steward' or 'dish machine operator' is occasionally preferred over 'dishwasher' to confer professional dignity.",
            "whenToUse": "Use when referring to kitchen cleaning appliances, office pantry equipment and breakroom policies, kitchen appliance procurement, residential property amenities in lease agreements, or entry-level restaurant staffing."
        },
        "examples": {
            "business": [
                "The corporate cafeteria upgraded to an industrial conveyor dishwasher to handle the volume of over six hundred lunch trays per hour.",
                "Facilities management sent an email reminding all employees that the fourth-floor breakroom dishwasher will be serviced this Wednesday.",
                "Due to increased banquet reservations during the holiday season, the food and beverage manager hired two additional weekend dishwashers."
            ],
            "collocations": [
                "load the dishwasher",
                "empty the dishwasher",
                "commercial dishwasher",
                "dishwasher-safe",
                "run the dishwasher",
                "built-in dishwasher"
            ],
            "conversation": [
                "\"Is the breakroom dishwasher running right now, or can I still put my lunch container in?\" / \"It's on the sanitizing cycle, but feel free to leave your container on the counter until it finishes.\"",
                "\"Why did service slow down during the middle of the dinner rush?\" / \"The commercial dishwasher in the kitchen broke down, so we temporarily ran out of clean salad plates.\""
            ],
            "daily": [
                "Please rinse your coffee mug and place it directly into the dishwasher instead of leaving it in the sink.",
                "We waited until the dishwasher finished its heated drying cycle before putting the wine glasses back into the cabinet.",
                "The kitchen contractor recommended installing a quiet, energy-efficient dishwasher with a stainless-steel interior."
            ]
        },
        "wordFamily": {
            "adjective": "dishwasher-safe",
            "adverb": "",
            "noun": "dishwasher, dishwashing, dish",
            "verb": "dishwash"
        },
        "visual": {
            "imageDescription": "A stainless steel commercial pass-through dishwasher in a bright restaurant kitchen, with steam rising from a newly sanitized rack of white ceramic plates and glassware.",
            "imageKeyword": "commercial dishwasher kitchen stainless steel steam rack clean dishes",
            "mnemonic": "DISH + WASH + ER = The mechanical miracle that Washes Dishes so cooks don't have to!"
        },
        "video": {
            "description": "A commercial kitchen training video showing how restaurant staff sort dish racks, scrape food waste, load plates at optimal angles, and operate a conveyor dishwasher to achieve commercial sanitation standards."
        },
        "toeicContext": {
            "commonParts": [
                1,
                3,
                4,
                7
            ],
            "exampleQuestion": "To ensure kitchen hygiene and guest safety, restaurant staff must verify that the commercial _____ has reached the required sanitizing temperature before operating it. (A) dishwasher (B) dishwashers (C) dishwashing (D) dishwashed",
            "tips": "In TOEIC Part 5, appliance vocabulary often appears in facility maintenance notices, office memos, and restaurant operations scenarios. Following the singular demonstrative/adjectival construction 'the commercial _____ has reached' (with the singular verb 'has reached'), the sentence demands a singular countable noun referring to the machine itself: (A) dishwasher. Choice (B) is plural and violates agreement with 'has'; (C) is a gerund/action noun; and (D) is a past participle."
        },
        "synonyms": [
            "dishwashing machine",
            "dish machine",
            "scullery worker",
            "kitchen steward",
            "pot washer",
            "warewasher"
        ],
        "antonyms": [],
        "relatedWords": [
            "sanitation",
            "rinse cycle",
            "detergent",
            "scullery",
            "cutlery",
            "dish rack",
            "tableware"
        ]
    },
    {
        "id": "dining-122",
        "word": "distillery",
        "partOfSpeech": [
            "noun"
        ],
        "category": "dining",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/distillery--_us_1.mp3",
            "commonMistakes": "Learners frequently misplace the primary stress onto the third syllable ('dis-til-LER-y') or the first syllable ('DIS-til-ler-y'). In standard English, the primary stress falls firmly on the second syllable: /dɪˈstɪl.ər.i/. Additionally, take care not to confuse the second syllable lax vowel /ɪ/ with a tense /iː/.",
            "ipa": "/dɪˈstɪl.ər.i/",
            "stressPattern": "○●○○",
            "syllableBreakdown": "dis-til-ler-y"
        },
        "etymology": {
            "evolution": "Alchemical techniques of distillation spread from medieval Islamic scholars to European monasteries and apothecaries during the 12th and 13th centuries, primarily to produce medicinal aqua vitae ('water of life'). The specific English noun 'distillery', meaning a dedicated commercial or industrial facility for the large-scale production of distilled spirits (such as whiskey, gin, rum, or vodka), became established in the early 18th century as the commercial spirits trade expanded rapidly across Britain, Ireland, and North America.",
            "firstRecordedUse": "1711 (early 18th century)",
            "origin": "From Late Latin distillatoria (pertaining to distillation), derived from Latin distillare / destillare (to trickle down in drops, from de- 'down' + stillare 'to drop', from stilla 'a drop'). The suffix -ery denotes a place of manufacture or trade.",
            "relatedLanguages": [
                "French: distillerie",
                "Spanish: destilería",
                "Italian: distilleria",
                "German: Destillerie",
                "Latin: distillatio"
            ],
            "rootMeaning": "a facility where liquids are vaporized and condensed drop by drop",
            "rootWord": "Latin destillare (to drip down drop by drop), from stilla (a drop) + -ery (place of production)"
        },
        "deepMeaning": {
            "connotation": "neutral",
            "coreConcept": "An industrial or artisanal manufacturing facility equipped with stills, fermentation vats, and maturation barrels where alcoholic liquors and spirits (such as whiskey, rum, vodka, gin, or brandy) are produced through the process of vaporizing, condensing, and purifying fermented grain, fruit, or molasses mashes.",
            "emotionalTone": "Artisanal, industrial, heritage-rich, sensory, and culturally sophisticated.",
            "formalityLevel": "neutral",
            "spatialContext": "Commercial industrial estates, historic rural river valleys (for freshwater access), copper pot still houses, barrel aging warehouses (rickhouses), tasting rooms, and tourist visitor centers.",
            "temporalContext": "Multi-year to decades-long aging and barrel-maturation cycles; daily distillation runs; seasonal grain harvesting and malt intake; scheduled guided factory tours."
        },
        "nativeMindset": {
            "culturalContext": "Distilleries play prominent roles in national heritage branding in countries like Scotland, Ireland, the United States, Japan, and Canada. In modern corporate travel and business entertainment, arranging an exclusive executive tour or tasting at a historic distillery is a prestigious client hospitality event.",
            "howNativesThink": "Native speakers associate 'distillery' with both heavy industrial manufacturing and romanticized regional craftsmanship—such as Scottish Highland single malts, Kentucky bourbon, or Irish whiskey. Unlike a 'brewery' (which makes beer through brewing and fermentation without distillation), a distillery conjures images of gleaming copper pot stills, charred white oak casks stacked in dim warehouses, and strict excise tax regulations. In recent decades, the explosion of craft and boutique distilleries has made them popular tourist destinations and corporate gift suppliers.",
            "mentalImage": "A spacious brick-and-timber distillery hall dominated by two colossal, gleaming copper swan-neck pot stills connected by overhead pipes, with a master distiller inspecting temperature gauges while charred oak barrels rest in the background.",
            "whenNotToUse": "Do not confuse with a 'brewery' (which produces beer or ale) or a 'winery' (which produces wine from fermented grapes). Also do not use when referring merely to a bar, pub, or retail liquor store.",
            "whenToUse": "Use when discussing facilities producing high-proof spirits and liquors (whiskey, gin, rum, tequila, vodka), corporate tours, regional tourism itineraries, export contracts for spirits, beverage manufacturing investments, or hospitality sourcing."
        },
        "examples": {
            "business": [
                "The international beverage conglomerate announced an eighty-million-dollar capital investment to expand its flagship rum distillery in the Caribbean.",
                "Due to tightening environmental standards, the distillery installed an advanced wastewater filtration system to treat organic runoff from the distillation process.",
                "Our regional sales team organized an executive hospitality reception at a boutique bourbon distillery to celebrate closing the annual supply contract."
            ],
            "collocations": [
                "craft distillery",
                "whiskey distillery",
                "distillery tour",
                "historic distillery",
                "boutique distillery",
                "licensed distillery"
            ],
            "conversation": [
                "\"Are we still taking the European marketing delegation to the heritage distillery on Friday?\" / \"Yes, the tour coordinator confirmed our private VIP tasting and barrel-house walk-through for two o'clock.\"",
                "\"How did the sudden tariff change affect the spirits brand?\" / \"The distillery had to postpone its planned export expansion to overseas markets until trade negotiations stabilize.\""
            ],
            "daily": [
                "During our vacation in the Scottish Highlands, we booked a guided tour of a historic whisky distillery.",
                "The local craft distillery produces small-batch gin infused with regional botanicals and citrus peel.",
                "Visitors to the distillery were invited to taste three single-barrel bourbons in the newly renovated tasting room."
            ]
        },
        "wordFamily": {
            "adjective": "distilled",
            "adverb": "",
            "noun": "distillery, distillation, distillate, distiller",
            "verb": "distill"
        },
        "visual": {
            "imageDescription": "A grand artisan distillery interior showing massive polished copper pot stills rising toward timber-beamed ceilings, alongside rows of charred oak aging barrels.",
            "imageKeyword": "whiskey distillery copper pot still oak barrels tasting room",
            "mnemonic": "DISTILLERY: DISTILL (evaporate and drop) + -ERY (a factory place) = The place where spirits drip drop by drop!"
        },
        "video": {
            "description": "A documentary-style facility tour of a heritage whiskey distillery explaining the complete production cycle: grain milling, fermentation in washbacks, double-distillation in copper pot stills, and barrel maturation in rickhouses."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                7
            ],
            "exampleQuestion": "Representatives from the international tourism board will visit the historic Scotch _____ tomorrow afternoon to inspect its newly opened visitor and education center. (A) distillery (B) distill (C) distilled (D) distilling",
            "tips": "In TOEIC travel and tourism itineraries (Parts 4 & 7), manufacturing facility tours are common themes (e.g., distillery, brewery, factory, plant). Following the proper adjective 'Scotch' and preceding the temporal adverb 'tomorrow', the blank functions as the direct object noun of 'visit'. Only (A) distillery represents the physical facility. (B) is a verb, (C) is a participle/adjective, and (D) is a gerund/present participle."
        },
        "synonyms": [
            "stillhouse",
            "spirits plant",
            "liquor manufactory",
            "spirits production facility",
            "rectifying plant"
        ],
        "antonyms": [],
        "relatedWords": [
            "pot still",
            "spirits",
            "fermentation",
            "cask",
            "maturation",
            "brewery",
            "winery"
        ]
    },
    {
        "id": "dining-123",
        "word": "dressing",
        "partOfSpeech": [
            "noun"
        ],
        "category": "dining",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/dressing--_us_1.mp3",
            "commonMistakes": "Learners often articulate the initial consonant cluster /dr/ as a separated /d/ and /r/ or an unvoiced affricate /tʃr/. In standard English, /dr/ is pronounced as a post-alveolar voiced affricate cluster with slight lip rounding. Additionally, speakers from some language backgrounds drop the final velar nasal /ŋ/, pronouncing it casually as 'dressin' with an alveolar /n/.",
            "ipa": "/ˈdrɛs.ɪŋ/",
            "stressPattern": "●○",
            "syllableBreakdown": "dress-ing"
        },
        "etymology": {
            "evolution": "In Middle English and Renaissance French culinary traditions, 'to dress' meant to prepare an animal carcass, clean fish, or arrange and garnish a banquet platter for royal presentation. By the early 16th century (c. 1500), the verbal noun 'dressing' emerged to denote seasoned sauces, cold emulsions of oil and vinegar, or herb-infused condiments poured over vegetables or raw salad greens. Over the 18th and 19th centuries, it also expanded in American English to describe seasoned bread stuffing for roast poultry, while maintaining its primary global dining meaning as salad dressing.",
            "firstRecordedUse": "c. 1500 (in the culinary sense of seasoning/sauce for food); late 14th century (for general preparing/arranging)",
            "origin": "From Middle English dressen / dresse (to prepare food, arrange, make straight), borrowed from Old French drecier (to arrange, set up, dress), derived from Vulgar Latin *directiare (to make straight), from Latin directus (straight, direct).",
            "relatedLanguages": [
                "French: dresser (to arrange/plate food), dressage (culinary plating/arrangement)",
                "Spanish: aderezar (to season/dress), aderezo (salad dressing)",
                "Italian: dirizzare (to direct/arrange)",
                "Latin: directio (direction/alignment)"
            ],
            "rootMeaning": "the act or substance of preparing, arranging, or seasoning food for presentation",
            "rootWord": "Old French drecier (to prepare, arrange), from Latin directus (straight, arranged)"
        },
        "deepMeaning": {
            "connotation": "neutral",
            "coreConcept": "A seasoned liquid sauce or emulsion—typically formulated with an oil-and-acid base (such as vinaigrette) or a dairy/mayonnaise foundation (such as ranch, Caesar, or blue cheese)—poured over salads, vegetables, or cold dishes to impart moisture, acidity, and balanced flavor; by extension in regional culinary terminology, a seasoned bread-crumb mixture baked as an accompaniment to roasted poultry.",
            "emotionalTone": "Culinary, savory, appetizing, sensory, and crisp.",
            "formalityLevel": "neutral",
            "spatialContext": "Restaurant pantry and garde-manger stations, salad bars, corporate cafeteria condiment dispensers, banquet plating lines, and dining room tables.",
            "temporalContext": "Applied immediately prior to table service (to preserve crisp leaf texture), served in separate ramekins or cruets upon guest request, prepared in daily culinary batches."
        },
        "nativeMindset": {
            "culturalContext": "Customizing salad dressing is deeply ingrained in American and international dining culture. In corporate catering and banquet planning, providing a choice of at least one oil-based vinaigrette and one creamy dressing is standard protocol to accommodate diverse dietary needs (vegan, dairy-intolerant, gluten-free).",
            "howNativesThink": "In dining, native speakers instinctively think of 'salad dressing' (vinaigrettes, ranch, Italian, balsamic, Thousand Island) and the classic restaurant order customization: 'on the side'. When ordering lunch or dining at a corporate banquet, specifying 'dressing on the side' is second nature to ensure greens do not become wilted or soggy. Natives also recognize the medical meaning (wound bandage) and apparel meaning (dressing well), but in dining and hospitality contexts, it refers strictly to the savory culinary sauce.",
            "mentalImage": "A white ceramic ramekin containing creamy golden-herb Italian dressing placed beside a crisp bowl of romaine lettuce, heirloom cherry tomatoes, and shaved parmesan on a restaurant table.",
            "whenNotToUse": "Do not confuse with heavy hot meat gravies or sweet dessert syrups. Avoid using 'dressing' alone if ambiguity exists with apparel ('dress code') or medical supplies ('sterile dressing'), though context in dining is unmistakable.",
            "whenToUse": "Use when discussing culinary menus, salad orders, banquet catering options, food allergies/dietary preferences (dairy-free or gluten-free dressings), supermarket condiment packaging, or restaurant service requests."
        },
        "examples": {
            "business": [
                "When finalizing the luncheon catering contract, the event organizer requested two low-calorie dressing options for the buffet salad station.",
                "The airline upgraded its premium-class dining service by offering artisan olive oil and aged vinegar dressings in individual glass bottles.",
                "Quality assurance inspectors discovered an undeclared soy allergen in a commercial batch of house salad dressing, prompting a voluntary recall."
            ],
            "collocations": [
                "salad dressing",
                "dressing on the side",
                "balsamic dressing",
                "creamy dressing",
                "vinaigrette dressing",
                "house dressing"
            ],
            "conversation": [
                "\"What kind of dressing comes with the garden salad?\" / \"We offer house balsamic vinaigrette, creamy Caesar, and blue cheese dressing.\"",
                "\"Could I get the dressing on the side for table twelve's Cobb salad?\" / \"Certainly, I'll let the pantry chef know right away so the greens stay crisp.\""
            ],
            "daily": [
                "I ordered a grilled chicken salad with the balsamic dressing served on the side.",
                "She whipped up a quick homemade vinaigrette dressing using extra virgin olive oil, Dijon mustard, and lemon juice.",
                "Be sure to shake the bottle vigorously before pouring the Italian dressing over the salad."
            ]
        },
        "wordFamily": {
            "adjective": "dressed",
            "adverb": "",
            "noun": "dressing, dress",
            "verb": "dress"
        },
        "visual": {
            "imageDescription": "A glass cruet pouring a golden herb vinaigrette dressing over a vibrant salad of fresh mixed greens, cherry tomatoes, and shaved parmesan.",
            "imageKeyword": "salad dressing pouring vinaigrette fresh bowl greens restaurant",
            "mnemonic": "DRESSING: You DRESS a person to look complete; you DRESS a salad with sauce so it tastes complete!"
        },
        "video": {
            "description": "A culinary school tutorial demonstrating the science of cold emulsions, showing an instructor whisking oil and acid with an emulsifier to create a stable, velvety French vinaigrette dressing."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                7
            ],
            "exampleQuestion": "To cater to attendees with dietary restrictions, the conference luncheon will offer both a light balsamic vinaigrette and a dairy-free herb _____ at the salad bar. (A) dress (B) dressing (C) dresses (D) dressy",
            "tips": "In TOEIC Part 3 meal-ordering conversations and Part 7 catering menus, food customization terms like 'dressing' frequently appear. Following the compound noun phrase modifier 'dairy-free herb', the sentence requires the head noun designating the salad condiment: (B) dressing. Option (A) is a verb or clothing garment, (C) is a plural verb or plural garment noun, and (D) is an informal adjective meaning stylishly elegant."
        },
        "synonyms": [
            "vinaigrette",
            "sauce",
            "condiment",
            "seasoning",
            "emulsion",
            "garnish"
        ],
        "antonyms": [],
        "relatedWords": [
            "vinaigrette",
            "salad bar",
            "condiment",
            "olive oil",
            "garde-manger",
            "ramekin",
            "balsamic vinegar"
        ]
    },
    {
        "id": "dining-124",
        "word": "drink",
        "partOfSpeech": [
            "noun"
        ],
        "category": "dining",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/drink--_us_1.mp3",
            "commonMistakes": "Learners frequently mispronounce the consonant cluster /dr/, either inserting an unwanted epenthetic vowel (/dəˈrɪŋk/) or devoicing it to /tr/. Additionally, before the velar plosive /k/, the nasal consonant must assimilate to the velar nasal [ŋ] rather than an alveolar [n] (i.e. /drɪŋk/, never /drɪnk/).",
            "ipa": "/drɪŋk/",
            "stressPattern": "●",
            "syllableBreakdown": "drink"
        },
        "etymology": {
            "evolution": "Extensively recorded in Old English (prior to 900) as both the strong verb drincan and noun drync / drinc. In Middle English it stabilized as 'drink'. While originally denoting any potable liquid (water, milk, mead, ale), by the 16th century the standalone noun 'drink' began to carry the specialized secondary connotation of alcoholic liquor (as in 'taken to drink' or 'have a drink'). In contemporary business and hospitality English, it designates both non-alcoholic refreshments and social alcoholic beverages served at corporate receptions and banquets.",
            "firstRecordedUse": "Before 900 (Old English drinc / drync)",
            "origin": "From Old English drinc or drync (a beverage, potion, the act of drinking), derived from Proto-Germanic *drungiz / *drankiz, related to the strong verb *drinkaną (to drink).",
            "relatedLanguages": [
                "German: Getränk (drink/beverage), trinken (to drink)",
                "Dutch: drank (drink/beverage), drinken (to drink)",
                "Old Norse: drekka (to drink), drykkr (drink)",
                "Gothic: drigkan (to drink)"
            ],
            "rootMeaning": "a liquid prepared or suitable for swallowing to satisfy thirst or provide refreshment",
            "rootWord": "Proto-Germanic *drenkaną (to drink, draw liquid into the mouth)"
        },
        "deepMeaning": {
            "connotation": "positive",
            "coreConcept": "Any liquid consumed for hydration, refreshment, nourishment, or social enjoyment, encompassing non-alcoholic beverages (such as water, fruit juices, coffee, and soft drinks) as well as alcoholic beverages (such as beer, wine, and cocktails); by extension, the social occasion of gathering to consume such beverages.",
            "emotionalTone": "Convivial, refreshing, social, relaxing, and hospitable.",
            "formalityLevel": "neutral",
            "spatialContext": "Banquet reception bars, restaurant beverage stations, corporate cocktail hours, office water coolers, conference refreshment lounges, and hotel lounges.",
            "temporalContext": "Continuous refreshment throughout the workday; pre-dinner cocktail hours (5:00 PM to 7:00 PM); post-conference networking receptions; scheduled mid-morning coffee breaks."
        },
        "nativeMindset": {
            "culturalContext": "The 'after-work drink' or conference 'welcome drinks' is an essential cultural institution in corporate Anglo-American, British, and Australian business life. Declining or attending thoughtfully while maintaining professional decorum is an essential workplace interpersonal skill.",
            "howNativesThink": "Native speakers instinctively recognize two distinct registers: an umbrella term for any potable liquid ('grab a drink of water', 'soft drink'), and a coded social ritual for professional bonding or relaxation ('let's get a drink after work'). An invitation for 'drinks' after a business conference is a universally accepted, low-pressure venue for informal networking, relationship-building, and unwinding. In catering invoices, 'food and drink' is the standard complementary pair alongside 'food and beverage'.",
            "mentalImage": "Colleagues in business-casual attire holding glassware—sparkling mineral water with lime and chilled white wine—standing in small conversational circles during an evening conference welcome reception.",
            "whenNotToUse": "In highly formal contractual agreements, legal catering contracts, and corporate financial reporting, 'beverage' is often preferred over 'drink' for greater precision and formal tone (e.g. 'food and beverage minimums'). Do not use 'drink' as an uncountable substance when specifying distinct types (use 'drinks' or 'beverages').",
            "whenToUse": "Use when referring to beverages at catering events, ordering beverages in casual or fine restaurants, inviting colleagues for informal social networking ('grab a drink'), or describing refreshment services."
        },
        "examples": {
            "business": [
                "The firm hosted a welcome drinks reception in the executive atrium to allow new corporate trainees to meet department managers.",
                "Conference registration fees include morning coffee, a catered hot lunch, and one complimentary drink at the evening networking mixer.",
                "The catering contract specifies that all food and drink must be sourced directly through the convention center's approved vendors."
            ],
            "collocations": [
                "welcome drink",
                "soft drink",
                "grab a drink",
                "complimentary drink",
                "after-work drinks",
                "food and drink"
            ],
            "conversation": [
                "\"Can I get you something to drink before we begin reviewing the quarterly sales figures?\" / \"A cup of black coffee or sparkling water would be wonderful, thank you.\"",
                "\"A few of us are heading across the street for a quick drink after the seminar ends—would you like to join us?\" / \"I would love to; let me just submit this expense report first.\""
            ],
            "daily": [
                "I always carry a reusable water bottle to ensure I have a cold drink during my morning commute.",
                "After finishing a strenuous workout at the gym, he stopped by the juice bar for a refreshing drink.",
                "Would you like something to drink while you wait in the living room for dinner to finish cooking?"
            ]
        },
        "wordFamily": {
            "adjective": "drinkable",
            "adverb": "",
            "noun": "drink, drinker, drinking",
            "verb": "drink"
        },
        "visual": {
            "imageDescription": "A server carrying a round silver tray with assorted elegant glasses of iced sparkling water, citrus mocktails, and white wine at an upscale corporate reception.",
            "imageKeyword": "complimentary welcome drinks reception glassware corporate event",
            "mnemonic": "DRINK: Delicious Refreshment Ingested to Nourish Knowledge and health!"
        },
        "video": {
            "description": "A corporate hospitality guide illustrating professional etiquette at networking mixers, highlighting how to balance carrying a drink and greeting clients with a right-hand handshake."
        },
        "toeicContext": {
            "commonParts": [
                1,
                2,
                3,
                4,
                7
            ],
            "exampleQuestion": "All seminar participants are invited to the terrace lounge for a complimentary _____ and appetizers immediately following the keynote speech. (A) drank (B) drink (C) drinker (D) drinkable",
            "tips": "In TOEIC Part 3, 4, and 7, company mixers and banquet announcements routinely feature phrases like 'complimentary drink' or 'welcome drinks'. Following the indefinite article 'a' and modifying adjective 'complimentary', the blank requires a singular countable noun for a beverage: (B) drink. (A) is the past tense verb, (C) is a noun designating a person who drinks, and (D) is an adjective."
        },
        "synonyms": [
            "beverage",
            "refreshment",
            "potation",
            "libation",
            "concoction",
            "draft"
        ],
        "antonyms": [
            "food",
            "solid food"
        ],
        "relatedWords": [
            "beverage",
            "refreshment",
            "cocktail",
            "hydration",
            "toast",
            "reception",
            "bartender"
        ]
    }
]

# Write to json file
with open("scratch/dining_121_124.json", "w", encoding="utf-8") as f:
    json.dump({"words": words_data}, f, indent=2, ensure_ascii=False)

print("Saved scratch/dining_121_124.json successfully.")
