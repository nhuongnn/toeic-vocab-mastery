
import json
import jsonschema

with open('scripts/process_words.py') as f:
    code = f.read()

schema_str = code[code.find('SCHEMA ='):code.find('BASE_PROMPT =')].strip()
ldict = {}
exec(schema_str, globals(), ldict)
schema = ldict['SCHEMA']

words = [
  {
    "id": "dining-065",
    "word": "bowl",
    "partOfSpeech": ["noun"],
    "category": "dining",
    "level": "essential",
    "toeicFrequency": 9,
    "pronunciation": {
      "ipa": "/boʊl/",
      "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/bowl--_us_1.mp3",
      "syllableBreakdown": "bowl",
      "stressPattern": "● (monosyllabic)",
      "commonMistakes": "Learners frequently mispronounce the diphthong /oʊ/ as /aʊ/ (rhyming with 'owl' or 'bow' as in bowing) or /ɔː/ (rhyming with 'ball'). In standard English, it rhymes with 'goal', 'pole', and 'roll'. Ensure the lips round cleanly toward the end of the vowel."
    },
    "etymology": {
      "origin": "Old English / Proto-Germanic",
      "rootWord": "bolla (round vessel, pot, basin, cup)",
      "rootMeaning": "A rounded, swollen, or hemispherical container (from Proto-Indo-European *bhel-, 'to blow, swell').",
      "evolution": "In Old English, 'bolla' referred to a hemispherical drinking cup or basin. In Middle English, the spelling shifted to 'bolle' and eventually 'bowl' to designate open, concave hollow tableware designed for holding liquids, broths, grains, and porridges. In modern commercial hospitality and dining service, it denotes essential dinnerware used for soups, salads, and pastas, as well as serving ware and culinary prep vessels.",
      "relatedLanguages": [
        "German: Bolle (bulb, spherical vessel)",
        "Dutch: bol (sphere, globe)",
        "Old Norse: bolli (small bowl, cup)",
        "Swedish: bulle (round roll, bun)"
      ],
      "firstRecordedUse": "Before the 12th century (Old English, c. 1000)"
    },
    "deepMeaning": {
      "coreConcept": "A deep, round, concave tableware or culinary vessel with an open top, designed specifically for holding, preparing, or serving liquids, soups, salads, grains, or desserts.",
      "spatialContext": "Restaurant dining tables, commercial dishwashing stations, banquet soup stations, salad bars, and kitchen prep lines.",
      "temporalContext": "Arranged during table setting prior to meal service; cleared after the soup or salad course; used continually in kitchen food preparation.",
      "emotionalTone": "Comforting, functional, communal, and grounded.",
      "formalityLevel": "neutral",
      "connotation": "neutral"
    },
    "nativeMindset": {
      "howNativesThink": "Native speakers instinctively distinguish a 'bowl' from a 'plate' (which is shallow and flat for solid foods requiring a knife) and a 'cup' (which has a handle and smaller diameter for drinking). It evokes warmth and wholesomeness (e.g., 'a warm bowl of soup'). In contemporary dining, 'bowl' also connotes trendy, balanced single-dish meals such as grain bowls, poke bowls, and salad bowls.",
      "mentalImage": "A gleaming white porcelain soup bowl resting squarely atop a matching underplate with a polished silver soup spoon beside it, placed on a starched white linen tablecloth in a banquet dining room.",
      "whenToUse": "Use when designating concave dinnerware, prep containers (mixing bowls), serving receptacles (punch bowls, salad bowls), or the quantity contained within them ('a bowl of clam chowder', 'a bowl of chili').",
      "whenNotToUse": "Do not use 'bowl' to refer to flat plates or platters where liquids would run off. Avoid confusing with 'dish' (a broader category that can mean any tableware or a cooked preparation) or 'basin' (which is larger, utilitarian, or used for washing).",
      "culturalContext": "In Western formal dining etiquette, soup bowls are always presented on a liner plate (underplate), and diners are taught to spoon soup away from themselves. In TOEIC test listening (Part 1) and reading passages, bowls frequently appear in descriptions of restaurant dining tables, banquet settings, and cafeteria buffet arrangements."
    },
    "examples": {
      "daily": [
        "She poured hot almond milk over steel-cut oatmeal in a wide ceramic bowl.",
        "The server brought out a steaming bowl of tomato basil soup accompanied by sourdough bread.",
        "Please place the tossed green salad into a large wooden bowl for the family dinner."
      ],
      "business": [
        "The banquet operations team ordered five hundred porcelain soup bowls to replace damaged inventory before the annual gala.",
        "During health inspections, restaurant kitchen staff must verify that all stainless steel mixing bowls are sanitized properly.",
        "The conference catering package includes custom chinaware rentals, providing matched dinner plates, dessert bowls, and flatware."
      ],
      "conversation": [
        "Could we request an extra bowl and two spoons so we can share the clam chowder?",
        "Certainly, I will bring a clean soup bowl to your table right away.",
        "Did the shipment of shallow ceramic pasta bowls arrive from the restaurant supplier?",
        "Yes, the receiving dock checked in twelve cartons this morning."
      ],
      "collocations": [
        "soup bowl",
        "salad bowl",
        "mixing bowl",
        "cereal bowl",
        "porcelain bowl",
        "a bowl of"
      ]
    },
    "wordFamily": {
      "noun": "bowl, bowlful",
      "verb": "bowl",
      "adjective": "bowled",
      "adverb": ""
    },
    "visual": {
      "imageKeyword": "white porcelain soup bowl restaurant table setting",
      "imageDescription": "A classic white ceramic soup bowl filled with steaming French onion soup, set on an underplate atop an elegant restaurant dining table with silverware and a folded napkin.",
      "mnemonic": "BOWL holds Broth Over Wide Lips: round, deep, and perfect for hot liquid food!"
    },
    "video": {
      "description": "A hospitality training video illustrating fine dining table settings, showing the correct placement of soup bowls on underplates and alignment with flatware."
    },
    "toeicContext": {
      "commonParts": [1, 2, 3, 7],
      "exampleQuestion": "Before guests arrived for the luncheon, the waitstaff placed a polished silver spoon next to each porcelain soup _____ on the tables. (A) bowl (B) bowls (C) bowler (D) bowling",
      "tips": "Following the singular indefinite noun phrase 'each porcelain soup _____', the blank requires the singular head noun: (A) bowl. Distinguish from plural (B), the occupational noun (C), and the gerund/sporting noun (D)."
    },
    "synonyms": [
      "basin",
      "dish",
      "vessel",
      "tureen",
      "crock"
    ],
    "antonyms": [],
    "relatedWords": [
      "plate",
      "saucer",
      "platter",
      "tableware",
      "chinaware",
      "soup spoon",
      "cutlery"
    ]
  }
]

jsonschema.validate(instance={"words": words}, schema=schema)
print("Valid!")
