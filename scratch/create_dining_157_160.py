import json
import re
import sys

words_data = [
    {
        "id": "dining-157",
        "word": "healthy",
        "partOfSpeech": [
            "adjective"
        ],
        "category": "dining",
        "level": "intermediate",
        "toeicFrequency": 8,
        "pronunciation": {
            "ipa": "/ˈhɛl.θi/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/healthy--_us_1.mp3",
            "syllableBreakdown": "heal·thy",
            "stressPattern": "●○",
            "commonMistakes": "Learners often substitute the voiceless dental fricative /θ/ with /s/, /t/, or /f/, pronouncing it incorrectly as *hel-see* or *hel-tee*. Ensure the tongue tip makes light contact between the upper and lower teeth for /θ/. In business English contexts, learners also frequently confuse the adjective 'healthy' with the noun 'health' (e.g., saying *health food* as an attributive noun phrase vs. *healthy meal* as an adjective phrase)."
        },
        "etymology": {
            "origin": "Middle English 'helthi', derived from 'helth' (health, physical well-being) + the adjectival suffix '-y' (possessing the quality of), originating from Old English 'hǣlþ' (wholeness, physical safety, soundness), ultimately from Proto-Germanic '*hailiþō' (soundness, wholeness), derived from Proto-Germanic '*hailaz' (whole, sound, healthy, undamaged).",
            "rootWord": "Old English hǣlþ / Proto-Germanic *hailaz",
            "rootMeaning": "Whole, hale, sound, uninjured, possessing bodily vigor and vitality",
            "evolution": "In Old English, the root 'hāl' (whole, healthy) yielded both 'hale' and 'hǣlþ' (the state of being sound). During the late 14th century in Middle English, the adjective suffix '-y' was appended to create 'helthi', originally describing individuals possessing sound physical constitutions. By the 16th and 17th centuries, the meaning expanded in culinary and dietetic usage to denote foods, drinks, regimens, and habits that promote or foster vitality (conducive to health). In modern commercial food service, corporate catering, and business hospitality, 'healthy' designates nutritious, well-balanced menu options formulated with fresh, minimally processed ingredients.",
            "relatedLanguages": [
                "German: heilsam (wholesome, healthy) / Heil (well-being, salvation)",
                "Dutch: heilzaam (healthy, wholesome) / heel (whole)",
                "Old Norse: heill (healthy, whole, unharmed)",
                "Swedish: hälsosam (healthy, wholesome) / hälsa (health)"
            ],
            "firstRecordedUse": "Late 14th century (c. 1380 in Middle English medical and philosophical treatises)"
        },
        "deepMeaning": {
            "coreConcept": "Promoting, sustaining, or conducive to physical vigor and nutritional well-being; (of food, meals, or dietary regimens) nutritionally balanced, prepared with wholesome, fresh ingredients, and low in harmful saturated fats, excessive sodium, or refined sugars; also figuratively denoting robust, prosperous, or thriving financial and operational performance.",
            "spatialContext": "Corporate cafeteria salad bars, executive wellness dining halls, organic farm-to-table bistro kitchens, upscale hotel room-service menus with certified dietary options, and supermarket nutritional labeling displays.",
            "temporalContext": "Emphasized during morning continental breakfasts, corporate wellness weeks, mid-day luncheon buffets for conference delegates, and seasonal menu transitions highlighting farm-fresh spring or summer produce.",
            "emotionalTone": "Nutritious, invigorating, wholesome, conscientious, and vitality-enhancing.",
            "formalityLevel": "neutral",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "To native speakers, 'healthy' in dining signals food that nourishes without inducing sluggishness or guilt. In corporate catering, providing 'healthy options' (quinoa bowls, steamed salmon, raw vegetables, fresh fruit platters) demonstrates progressive employer responsibility and mindfulness toward diverse dietary preferences (low-sodium, gluten-free, vegan). Figuratively, native business executives instinctively use 'healthy' for robust growth or strong margins ('a healthy profit margin', 'healthy quarterly revenue'), making it a dual-use staple across TOEIC listening and reading sections.",
            "mentalImage": "A bright corporate cafeteria buffet line featuring an array of vibrant, wholesome options: colorful roasted Mediterranean vegetables, crisp mixed greens, grilled wild salmon fillets with lemon, and chilled glass carafes of fruit-infused water.",
            "whenToUse": "Use when describing nutritious foods, dietary habits, physical wellness, or figuratively denoting strong financial conditions (e.g., 'healthy diet', 'healthy snack alternatives', 'healthy balance sheet', 'healthy corporate earnings').",
            "whenNotToUse": "Do not confuse 'healthy' (possessing or promoting health) with 'healthful' in ultra-pedantic prescriptive grammar (though 'healthy' is universally accepted in modern business and dining English). Avoid using 'healthy' to describe sterile medical equipment (use 'hygienic' or 'sanitary') or merely harmless food (use 'edible' or 'safe').",
            "culturalContext": "Across modern corporate culture in English-speaking countries, executive wellness programs mandate healthy catering options for workshops, multi-day seminars, and board meetings to maintain cognitive performance and employee satisfaction. In TOEIC Parts 3, 4, and 7, dialogues routinely feature employees discussing cafeteria improvements or selecting healthy banquet caterers."
        },
        "examples": {
            "daily": [
                "She packed a healthy lunch consisting of a vibrant kale salad, sliced avocado, and grilled chicken breast.",
                "The neighborhood bistro offers a healthy brunch menu made entirely from certified organic local produce.",
                "Drinking plenty of water and snacking on raw almonds are healthy habits during long workdays."
            ],
            "business": [
                "The corporate wellness committee partnered with cafeteria vendors to introduce healthy, plant-based meal options for office employees.",
                "Due to increased demand for healthy catering during corporate workshops, the hotel developed a dedicated low-sodium conference menu.",
                "The company reported a healthy profit margin in its hospitality division, driven by higher beverage and banquet sales."
            ],
            "conversation": [
                "\"Are there any healthy options available at today's catered luncheon?\" / \"Yes, the buffet features grilled herb chicken, quinoa salad, and steamed seasonal vegetables.\"",
                "\"The new cafeteria menu seems much more focused on healthy choices.\" / \"It really is; they replaced sugary sodas with fruit-infused water and added a comprehensive organic salad bar.\""
            ],
            "collocations": [
                "healthy diet",
                "healthy options",
                "healthy lifestyle",
                "healthy appetite",
                "healthy profit margin",
                "healthy alternatives"
            ]
        },
        "wordFamily": {
            "noun": "health, healthiness",
            "verb": "heal",
            "adjective": "healthy, unhealthful",
            "adverb": "healthily"
        },
        "visual": {
            "imageKeyword": "healthy meal catering colorful salad grilled salmon corporate buffet dining",
            "imageDescription": "A vibrant, beautifully plated healthy meal on a clean white dining plate, featuring grilled wild salmon, steamed asparagus spears, a colorful quinoa salad with pomegranate seeds, and fresh lemon slices on a modern restaurant table.",
            "mnemonic": "HEALTHY: When you eat food that gives you HEAL-TH, you feel energized, HY-per-focused, and ready for work!"
        },
        "video": {
            "description": "An executive wellness and corporate dining showcase featuring a head chef demonstrating how to design healthy, visually appealing buffet menus for corporate symposium attendees."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                5,
                7
            ],
            "exampleQuestion": "To support employee wellness initiatives, the cafeteria staff has decided to incorporate more _____ dining options into the daily luncheon menu. (A) health (B) healthy (C) healthily (D) healthiness",
            "tips": "In TOEIC Part 5, determine the grammatical function needed before the compound noun phrase 'dining options'. The blank requires an adjective to modify 'options': (B) healthy. Choice (A) is a noun, (C) is an adverb, and (D) is an abstract noun. While 'health food' exists as a set compound noun, before 'dining options' the descriptive adjective 'healthy' is required."
        },
        "synonyms": [
            "nutritious",
            "wholesome",
            "nourishing",
            "salubrious",
            "healthful"
        ],
        "antonyms": [
            "unhealthy",
            "unwholesome",
            "nutritionally deficient",
            "deleterious"
        ],
        "relatedWords": [
            "nutrition",
            "dietary",
            "wellness",
            "wholesomeness",
            "organic",
            "vitality",
            "balanced meal"
        ]
    },
    {
        "id": "dining-158",
        "word": "herb",
        "partOfSpeech": [
            "noun"
        ],
        "category": "dining",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/ɜːrb/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/herb--_us_1.mp3",
            "syllableBreakdown": "herb",
            "stressPattern": "●",
            "commonMistakes": "The most striking pronunciation divide in the English-speaking world: in standard American English, the initial 'h' is silent, pronouncing the word as /ɜːrb/ ('erb', rhyming with 'curb'); in standard British, Australian, and Commonwealth English, the initial 'h' is pronounced /hɜːb/ ('her-b'). Learners also confuse 'herb' (leafy, non-woody plant parts used fresh or dried for flavoring, such as basil, thyme, and oregano) with 'spice' (seeds, bark, roots, or fruit such as cinnamon, cloves, and ginger)."
        },
        "etymology": {
            "origin": "Middle English 'herbe', borrowed from Old French 'herbe' (grass, herb, plant), from Latin 'herba' (vegetation, green blade, grass, herb, turf), of uncertain Indo-European origin (possibly related to Proto-Indo-European *gʰre- / *gʰer- meaning to grow, shoot forth, cognate with 'green' and 'grass').",
            "rootWord": "Latin herba / Old French herbe",
            "rootMeaning": "Green plant, leafy shoot, grass, cultivated culinary or medicinal plant",
            "evolution": "In Latin, 'herba' denoted any grass, turf, or leafy vegetation. Borrowed into Old French without pronouncing the initial Latin 'h' ('erbe'), it entered Middle English in the 13th century as 'herbe' or 'erbe', with an unpronounced 'h'. During the 15th-century Renaissance, English humanists restored the classical Latin 'h-' in spelling. British English speakers gradually began pronouncing the aspirated /h/ in the 19th century under spelling-pronunciation tendencies, whereas American English preserved the older historical French/Early Modern English silent-h pronunciation (/ɜːrb/). In culinary terminology, 'herb' came to designate specifically the fragrant, aromatic leaves of temperate herbaceous plants used for seasoning, garnishing, and marinades.",
            "relatedLanguages": [
                "French: herbe (herb, grass)",
                "Spanish: hierba (herb, grass, weed)",
                "Italian: erba (grass, weed, herb)",
                "Portuguese: erva (herb, grass)"
            ],
            "firstRecordedUse": "Late 13th century (c. 1290 in Early Middle English monastic and culinary herbals)"
        },
        "deepMeaning": {
            "coreConcept": "Any of various aromatic, non-woody plants whose fresh or dried leaves, tender stems, and soft shoots are utilized in culinary arts to impart subtle fragrance, delicate savory seasoning, or visual garnish to dishes, sauces, dressings, and marinades (e.g., basil, parsley, rosemary, thyme, cilantro, tarragon, mint), distinguished from spices which derive from bark, roots, seeds, or berries.",
            "spatialContext": "Commercial restaurant prep counters with wooden cutting boards and chef's knives, stainless steel kitchen seasoning stations, hydroponic indoor microgreen gardens, hotel banquet cold pantries, and outdoor kitchen herb planters.",
            "temporalContext": "Harvested fresh in the morning for same-day prep; added delicately at the conclusion of cooking (for tender herbs like basil, chives, and cilantro) to preserve volatile essential oils, or simmered slowly in bouquets garnis (for hearty herbs like thyme, bay, and rosemary).",
            "emotionalTone": "Aromatic, fresh, artisanal, vibrant, and refined.",
            "formalityLevel": "neutral",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "To native speakers, 'herb' immediately connotes natural kitchen freshness, garden fragrances, and artisanal culinary finesse. Unlike pungent, dry powdered spices, fresh herbs symbolize elevated, chef-crafted cooking—such as torn fresh basil over a Neapolitan pizza, freshly chopped parsley folded into compound butter, or sprigs of rosemary infusing roasted lamb. Hospitality staff recognize that herb garnishes elevate plate presentation from ordinary to gourmet.",
            "mentalImage": "A commercial kitchen prep table where a chef in a white tunic finely minces a vibrant bouquet of fresh Italian flat-leaf parsley and rosemary sprigs on an end-grain wooden chopping block, releasing fragrant green herbal aromas beside small ramekins of sea salt and olive oil.",
            "whenToUse": "Use when referring to aromatic culinary plants, dried or fresh herbal seasonings, herbal infusions (herbal tea), or medicinal botanical extracts (e.g., 'fresh herb garnish', 'herb butter', 'roast chicken seasoned with fresh herbs', 'herb garden').",
            "whenNotToUse": "Do not confuse with 'spice' (use 'spice' for cinnamon, peppercorns, cumin, cardamom, or turmeric), nor use for wild undesirable garden vegetation (use 'weed').",
            "culturalContext": "In professional Western gastronomy and corporate dining culture, the distinction between fresh herbs and dried commercial seasonings is a hallmark of culinary quality. High-end restaurants and conference hotels proudly highlight 'locally grown garden herbs' or 'herb-crusted entrées' on banquet menus to appeal to discerning executive clients."
        },
        "examples": {
            "daily": [
                "She clipped a handful of fresh herbs from the kitchen windowsill garden to season the homemade tomato sauce.",
                "The chef sprinkled freshly chopped herbs over the roasted potato wedges just before serving.",
                "A soothing cup of chamomile herb tea helped him unwind after a demanding workday."
            ],
            "business": [
                "The executive banquet chef placed a standing order with a local greenhouse for daily deliveries of fresh organic culinary herbs.",
                "Our culinary team updated the catering brochure to highlight an herb-crusted beef tenderloin as the signature entrée.",
                "Food quality inspectors commended the restaurant chain for substituting artificial flavorings with natural herb blends across its salad stations."
            ],
            "conversation": [
                "\"Which herb would you recommend pairing with the pan-seared sea bass?\" / \"Fresh tarragon or dill complements the delicate flavor of the white fish beautifully.\"",
                "\"Does the banquet dressing contain any dried herbs?\" / \"No, the caterer whips the vinaigrette with freshly harvested basil, chives, and garlic.\""
            ],
            "collocations": [
                "fresh herbs",
                "culinary herbs",
                "aromatic herbs",
                "herb garden",
                "herb-crusted",
                "dried herbs"
            ]
        },
        "wordFamily": {
            "noun": "herb, herbalist, herbivore",
            "verb": "",
            "adjective": "herbal, herbaceous",
            "adverb": "herbally"
        },
        "visual": {
            "imageKeyword": "fresh green herbs rosemary basil parsley cutting board culinary chef knife",
            "imageDescription": "A rustic wooden prep station featuring neat bundles of freshly harvested culinary herbs—dark green rosemary sprigs, fragrant basil leaves, and curly parsley tied with twine—beside a sharp carbon-steel chef knife and a pinch bowl of sea salt.",
            "mnemonic": "HERB: Harvest Every Rosemary & Basil leaf to bring authentic garden fragrance into your kitchen!"
        },
        "video": {
            "description": "A culinary arts masterclass demonstrating how professional restaurant chefs properly wash, dry, chop, and store delicate fresh culinary herbs to retain their peak flavor and vibrant color."
        },
        "toeicContext": {
            "commonParts": [
                1,
                3,
                4,
                7
            ],
            "exampleQuestion": "The head chef insists on using only freshly picked _____ to prepare the restaurant's signature marinara sauce. (A) herb (B) herbs (C) herbal (D) herbally",
            "tips": "In TOEIC Part 5, following the modifier 'freshly picked', the blank functions as the direct object of the prepositional phrase 'using only...'. Since culinary leaves are used in quantities and 'herb' is a countable noun, the plural noun (B) herbs is the correct choice. (A) is singular and lacks a required determiner, (C) is an adjective, and (D) is an adverb."
        },
        "synonyms": [
            "seasoning",
            "botanical",
            "flavoring",
            "aromatic plant",
            "garnish"
        ],
        "antonyms": [],
        "relatedWords": [
            "spice",
            "seasoning",
            "basil",
            "rosemary",
            "thyme",
            "parsley",
            "bouquet garni"
        ]
    },
    {
        "id": "dining-159",
        "word": "honey",
        "partOfSpeech": [
            "noun"
        ],
        "category": "dining",
        "level": "essential",
        "toeicFrequency": 9,
        "pronunciation": {
            "ipa": "/ˈhʌn.i/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/honey--_us_1.mp3",
            "syllableBreakdown": "hon·ey",
            "stressPattern": "●○",
            "commonMistakes": "Learners frequently mispronounce the first vowel by analogy with words spelled with 'o', pronouncing it as /ɒ/ ('hon-ey', like 'on') or /oʊ/ ('hone-y', like 'lone') instead of the correct short lax central vowel /ʌ/ ('huh-nee', like 'money' or 'sunny'). Also, in formal business writing, learners must avoid using 'honey' as an endearing term of address (which is strictly colloquial and unprofessional in corporate settings)."
        },
        "etymology": {
            "origin": "Old English 'huniġ', from Proto-Germanic '*hunangą' (honey), of uncertain further origin, possibly derived from Proto-Indo-European *kn̥h₂on- (golden, yellow) or related to ancient Indo-European words for amber or sweet substances, displacing the common Indo-European root *médʰu (which gave English 'mead').",
            "rootWord": "Old English huniġ / Proto-Germanic *hunangą",
            "rootMeaning": "Golden sweet liquid, nectar transformed by bees",
            "evolution": "In Proto-Germanic, '*hunangą' replaced the older Indo-European root for honey/sweet mead (*médʰu). It persisted into Old English as 'huniġ' and Middle English as 'hony'. Valued across antiquity and the Middle Ages as the primary concentrated sweetening agent, preservative, and medicinal soothing ointment before the widespread commercialization of cane sugar. In modern gastronomy and hospitality, honey is celebrated as an artisanal natural sweetener with diverse floral profiles (e.g., clover, wildflower, orange blossom, acacia) used in glazes, salad dressings, baked goods, and hot beverage service.",
            "relatedLanguages": [
                "German: Honig (honey)",
                "Dutch: honing (honey)",
                "Swedish: honung (honey)",
                "Danish: honning (honey)",
                "Old Norse: hunang (honey)"
            ],
            "firstRecordedUse": "Before 900 AD (in Old English medical charms and Anglo-Saxon leechbooks)"
        },
        "deepMeaning": {
            "coreConcept": "A thick, viscous, golden-amber sweet fluid produced naturally by honeybees from the floral nectar of flowering plants, stored in honeycombs as a food source, and widely harvested for human consumption as an unrefined natural sweetener, culinary glaze, marinade ingredient, and throat-soothing agent.",
            "spatialContext": "Hotel continental breakfast condiment buffets, cafe beverage stations beside tea caddies, commercial pastry bakeries, kitchen roast carving stations featuring honey-glazed meats, and artisanal apiary specialty retail shops.",
            "temporalContext": "Harvested seasonally during late spring and late summer; offered daily during morning breakfast service, afternoon tea receptions, and integrated into slow-roasted holiday banquets (such as honey-glazed ham).",
            "emotionalTone": "Sweet, soothing, golden, wholesome, and artisanal.",
            "formalityLevel": "neutral",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "To native speakers, 'honey' represents wholesome, unrefined natural sweetness, distinct from processed white sugar or artificial syrups. In food service and hospitality, providing pure artisanal honey (in glass jars, honeycomb displays, or individual glass dispensers) conveys rustic luxury and care for guest health. Beyond culinary contexts, native speakers use 'honey' as a warm term of endearment in close personal relationships, or in metaphorical idioms like 'a honey-tongued speaker' (flattering/smooth) or 'honeymoon' (initial period of harmony).",
            "mentalImage": "A clear glass jar filled with luminous golden honey resting on a sunlit wooden breakfast buffet counter, with a grooved wooden honey dipper drizzling a thick, amber ribbon over a bowl of Greek yogurt topped with fresh berries and walnuts.",
            "whenToUse": "Use when referring to the sweet viscous nectar product, culinary glazes and marinades (honey-mustard dressing, honey-glazed salmon), hot beverage sweeteners (tea with lemon and honey), or artisanal beekeeping goods.",
            "whenNotToUse": "Do not use 'honey' as a workplace term of address to colleagues or supervisors (which is inappropriate, patronizing, and breaches professional boundaries in corporate environments). Do not confuse with processed 'corn syrup' or 'molasses'.",
            "culturalContext": "In North American and European hospitality, upscale hotel breakfast buffets frequently display an entire raw honeycomb frame suspended over a draining trough to demonstrate authenticity and farm-to-table luxury. In TOEIC Part 3 and 7, honey appears in catering order requests, hotel amenities, and farm-to-market vendor invoices."
        },
        "examples": {
            "daily": [
                "He stirred a spoonful of raw clover honey and a slice of lemon into his hot green tea to soothe a sore throat.",
                "She drizzled wildflower honey over a bowl of plain Greek yogurt, chia seeds, and fresh strawberries for breakfast.",
                "We purchased a jar of local wildflower honey from the farmers' market stall on Saturday morning."
            ],
            "business": [
                "The hotel's morning catering display includes pure clover honey jars alongside organic jams and fresh butter.",
                "The banquet menu features a honey-glazed pork tenderloin served with roasted autumn root vegetables.",
                "To meet corporate sustainability benchmarks, the hotel chain installed rooftop beehives to produce its own organic honey for guest dining."
            ],
            "conversation": [
                "\"Do we have any sweetener alternatives for the conference afternoon tea break?\" / \"Yes, the beverage table has organic honey dispensers, brown sugar cubes, and agave nectar.\"",
                "\"What makes this salad dressing so distinctive?\" / \"The chef blends stone-ground Dijon mustard with raw orange blossom honey and apple cider vinegar.\""
            ],
            "collocations": [
                "raw honey",
                "clover honey",
                "honey dipper",
                "honey-glazed",
                "pure honey",
                "honey-mustard dressing"
            ]
        },
        "wordFamily": {
            "noun": "honey, honeycomb, honeymoon, honeydew",
            "verb": "",
            "adjective": "honeyed",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "pure golden honey jar wooden dipper honeycomb breakfast buffet dining",
            "imageDescription": "A luminous glass jar brimming with clear golden honey resting on a rustic timber board, with a carved wooden honey dipper capturing a slow, viscous amber spiral above a freshly baked scone and raw honeycomb.",
            "mnemonic": "HONEY: Harmonious Organic Nectar from Energetic Yellow bees!"
        },
        "video": {
            "description": "An artisanal culinary documentary showing sustainable rooftop beekeeping at a luxury hotel, demonstrating how raw honey is harvested, filtered, and served fresh on breakfast banquets."
        },
        "toeicContext": {
            "commonParts": [
                1,
                3,
                4,
                7
            ],
            "exampleQuestion": "The breakfast buffet attendant promptly replenished the dispensers with pure clover _____ before the morning seminar participants arrived. (A) honey (B) honeys (C) honeyed (D) honeying",
            "tips": "In TOEIC Part 5, following the adjective phrase 'pure clover', the direct object of the preposition 'with' requires an uncountable mass noun: (A) honey. Choice (B) is the plural form (rarely used except for specific botanical varieties), (C) is a participial adjective, and (D) is a non-standard present participle."
        },
        "synonyms": [
            "nectar",
            "natural sweetener",
            "liquid amber",
            "syrup",
            "clover honey"
        ],
        "antonyms": [],
        "relatedWords": [
            "honeycomb",
            "apiary",
            "beekeeping",
            "sweetener",
            "nectar",
            "clover",
            "glaze"
        ]
    },
    {
        "id": "dining-160",
        "word": "hors-d-oeuvre",
        "partOfSpeech": [
            "noun"
        ],
        "category": "dining",
        "level": "advanced",
        "toeicFrequency": 7,
        "pronunciation": {
            "ipa": "/ˌɔːr ˈdɜːrv/",
            "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/hors-d-oeuvre--_us_1.mp3",
            "syllableBreakdown": "hors-d-oeu·vre",
            "stressPattern": "○●",
            "commonMistakes": "Because of its French orthography, learners frequently stumble over this word, trying to pronounce the silent 'h' and silent 's' (*horse-dee-oov-ray* or *whores-doo-ver*). In standard English, the initial 'h' and 's' are completely silent: /ɔːr ˈdɜːrv/ ('or-DERV'). Note also that in English usage, 'hors d'oeuvre' can be invariant in the plural or spelled with an 's' ('hors d'oeuvres' /ɔːr ˈdɜːrvz/), though the pronunciation of the singular and plural is often identical or distinguished only by a final /z/."
        },
        "etymology": {
            "origin": "French loan phrase 'hors-d'œuvre', literally meaning 'outside of the work' or 'apart from the main work', constructed from 'hors' (outside, out of; from Old French 'fors', from Latin 'foris' meaning outside, outdoors) + 'de' (of) + 'œuvre' (work, masterpiece; from Latin 'opera' meaning work, labor, composition).",
            "rootWord": "French hors (outside) + d'œuvre (of the work)",
            "rootMeaning": "'Outside of the main work' — an extra or supplementary course served outside the formal structure of the meal",
            "evolution": "In 17th-century French architecture and literature, an 'hors d'œuvre' originally referred to an accessory, outbuilding, or literary digression that was secondary to the principal structural design. By the early 18th century, French royal and aristocratic banquet masterminds adopted the term into grand dining to designate small, delicate dishes served apart from the primary prescribed courses (such as the potages, entrées, and roasts). Borrowed into English high society during the 1740s, it retained its French spelling and meaning, ultimately becoming the standard international hospitality term for savory finger foods, canapés, and bite-sized delicacies served alongside cocktails before a formal banquet or reception.",
            "relatedLanguages": [
                "French: hors-d'œuvre (appetizer, starter, extraneous matter)",
                "Spanish: entremés (appetizer, hors d'oeuvre) / hors d'oeuvre (culinary loanword)",
                "Italian: antipasto (starter, hors d'oeuvre)",
                "German: Vorspeise (starter) / Horsd'œuvre (formal gastronomic loanword)"
            ],
            "firstRecordedUse": "Mid-18th century (c. 1742 in English culinary memoirs and aristocratic banquet records)"
        },
        "deepMeaning": {
            "coreConcept": "A small, bite-sized, savory item of food or delicate appetizer served either by circulating waitstaff on silver trays or arranged on decorative platters before the commencement of a formal meal, gala dinner, or cocktail reception, designed to stimulate the appetite without satiating the guest.",
            "spatialContext": "Corporate networking receptions, hotel ballroom cocktail foyers, diplomatic gala salons, art gallery opening lounges, and upscale wedding banquet halls.",
            "temporalContext": "Circulated continuously during pre-dinner cocktail hours (typically lasting 45 to 90 minutes) prior to the seated multi-course dinner service.",
            "emotionalTone": "Sophisticated, festive, elegant, celebratory, and hospitable.",
            "formalityLevel": "formal",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "To native speakers, 'hors-d'oeuvre' denotes upscale social entertaining and polished corporate hospitality. Unlike casual 'snacks' (chips, pretzels) or a seated 'first course / starter' (such as a bowl of soup at a dining table), hors-d'oeuvres are inherently social and mobile: guests hold a drink in one hand while taking a delicate canapé, smoked salmon blini, or prosciutto-wrapped melon skewer with a cocktail napkin in the other. In event planning and TOEIC reading passages, caterers specify whether hors-d'oeuvres are 'passed' (circulated by servers) or 'stationed' (set on display tables).",
            "mentalImage": "A sharply dressed banquet server in black tie holding a polished silver tray lined with white linen, offering elegant miniature smoked salmon and caviar canapés garnished with fresh dill to corporate executives mingling with champagne flutes in a hotel ballroom foyer.",
            "whenToUse": "Use when describing sophisticated pre-dinner finger foods, canapés, and savory cocktail accompaniments at formal corporate receptions, galas, award banquets, and networking mixers.",
            "whenNotToUse": "Do not use for casual party snacks (like potato chips, popcorn, or bowls of peanuts), nor for a formal seated first course consumed with knife and fork at the dinner table (use 'appetizer' or 'starter').",
            "culturalContext": "Passing hors-d'oeuvres is the gold standard of networking hospitality in English-speaking corporate culture. In TOEIC Parts 3, 4, and 7, dialogues and event schedules frequently reference 'cocktails and hors d'oeuvres' as the opening segment of an annual shareholders' gala, retirement dinner, or product launch reception."
        },
        "examples": {
            "daily": [
                "The hosts circulated a tray of hot hors-d'oeuvres, including miniature crab cakes and spinach-stuffed mushroom caps, to arriving party guests.",
                "She sampled a delicate smoked salmon hors-d'oeuvre garnished with dill and capers while chatting by the patio.",
                "Before the wedding dinner commenced, guests enjoyed wine and light hors-d'oeuvres in the garden courtyard."
            ],
            "business": [
                "The catering contract specifies that waitstaff will pass hot and cold hors-d'oeuvres throughout the two-hour executive networking reception.",
                "Conference organizers allocated an extra budget for gourmet hors-d'oeuvres to welcome international delegates during the opening mixer.",
                "The hotel's catering package includes a complimentary champagne toast accompanied by six varieties of artisanal hors-d'oeuvres."
            ],
            "conversation": [
                "\"Are we having a sit-down lunch or a standing reception for the client presentation?\" / \"It's a standing networking reception with wine and circulating hors-d'oeuvres so people can mingle freely.\"",
                "\"Which hors-d'oeuvres did you select for tomorrow's award gala?\" / \"We chose the beef tenderloin crostini, brie and fig tartlets, and seared tuna skewers.\""
            ],
            "collocations": [
                "passed hors-d'oeuvres",
                "hot and cold hors-d'oeuvres",
                "serve hors-d'oeuvres",
                "assorted hors-d'oeuvres",
                "cocktails and hors-d'oeuvres",
                "gourmet hors-d'oeuvres"
            ]
        },
        "wordFamily": {
            "noun": "hors-d'oeuvre, hors-d'oeuvres",
            "verb": "",
            "adjective": "",
            "adverb": ""
        },
        "visual": {
            "imageKeyword": "hors-d-oeuvre passed tray canape catering cocktail reception banquet server",
            "imageDescription": "A banquet server in formal black-and-white hospitality attire holding a gleaming silver tray of gourmet hors-d'oeuvres—miniature tartlets, prosciutto-wrapped asparagus, and smoked salmon on toasted rye—amidst a blurred background of festive cocktail reception guests.",
            "mnemonic": "HORS-D'OEUVRE: Remember French 'outside of the work' — delicious bites served OUTSIDE the main meal while you mingle!"
        },
        "video": {
            "description": "A luxury hotel banquet operations video illustrating how catering teams prepare, garnish, and circulate gourmet hot and cold hors-d'oeuvres during high-profile corporate gala receptions."
        },
        "toeicContext": {
            "commonParts": [
                3,
                4,
                7
            ],
            "exampleQuestion": "Waitstaff will circulate among the reception guests to serve a selection of hot and cold _____ prior to the keynote address. (A) hors-d'oeuvres (B) appliances (C) credentials (D) itineraries",
            "tips": "In TOEIC Part 5, vocabulary questions test choosing the contextually correct noun in a hospitality setting. In the context of waitstaff circulating among reception guests prior to a banquet address, (A) hors-d'oeuvres is the only word describing edible finger foods/appetizers. Choice (B) refers to household/electrical devices, (C) to qualifications or IDs, and (D) to travel schedules."
        },
        "synonyms": [
            "canapés",
            "appetizers",
            "finger foods",
            "starters",
            "tidbits",
            "amuse-bouches"
        ],
        "antonyms": [
            "main course",
            "entrée",
            "dessert"
        ],
        "relatedWords": [
            "canapé",
            "cocktail reception",
            "finger food",
            "appetizer",
            "starter",
            "catering",
            "tray service"
        ]
    }
]

with open("scratch/dining_157_160.json", "w", encoding="utf-8") as f:
    json.dump({"words": words_data}, f, indent=2, ensure_ascii=False)

print("Saved scratch/dining_157_160.json")
