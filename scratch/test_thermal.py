import json
import re
import sys

entry = {
  "id": "dining-275",
  "word": "thermal",
  "partOfSpeech": [
    "adjective"
  ],
  "category": "dining",
  "level": "intermediate",
  "toeicFrequency": 8,
  "pronunciation": {
    "ipa": "/ˈθɜːr.məl/",
    "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/thermal--_us_1.mp3",
    "syllableBreakdown": "ther·mal",
    "stressPattern": "●○",
    "commonMistakes": "Learners frequently substitute the voiceless dental fricative /θ/ with /t/ ('ter-mal'), /s/ ('ser-mal'), or /f/ ('fer-mal'). Speakers from non-rhotic or tonal language backgrounds often flatten the r-colored nurse vowel /ɜːr/ into /e/ or /ɑː/. Additionally, learners sometimes over-enunciate the unstressed second syllable with a full vowel /æl/ instead of a reduced schwa and syllabic dark 'l' (/əl/)."
  },
  "etymology": {
    "origin": "Derived from Ancient Greek thermē ('heat, fever') and thermos ('hot, warm'), descending from Proto-Indo-European *gʷʰer- ('warm, hot'). It entered Neo-Latin as thermalis in the 18th century and French as thermal before being adopted into English, initially to describe medicinal hot springs before expanding in the 19th and 20th centuries to thermodynamics and insulated food and beverage apparatus.",
    "rootWord": "Ancient Greek thermos (hot, warm) / Proto-Indo-European *gʷʰer- (warm, hot)",
    "rootMeaning": "Pertaining to heat, warmth, or heat retention",
    "evolution": "In ancient Greek, thermos indicated physical warmth. In 1756, English medical literature adopted 'thermal' via French to describe geothermal mineral springs ('thermal baths'). During the 19th century, physicists applied the word to thermodynamics and radiant energy. Following the commercial development of double-walled vacuum insulation by James Dewar and commercial thermos manufacturers in the early 20th century, 'thermal' entered the dining, catering, and beverage vernacular to designate insulated carafes, food transit containers, and precision temperature-controlled cooking tools.",
    "relatedLanguages": [
      "French: thermique (relating to heat / thermal insulation) / bouteille isotherme (thermal insulated bottle)",
      "Spanish: térmico / térmica (thermal / heat-insulating; e.g., jarra térmica, bolsa térmica)",
      "Italian: termico / termica (thermal / heat-preserving; e.g., caraffa termica, borsa termica)",
      "German: thermisch (thermal) / Thermoskanne (vacuum / thermal jug) / Thermobehälter (insulated food container)"
    ],
    "firstRecordedUse": "Mid-18th century (c. 1756 for hot springs; mid-19th century in thermodynamics; early 20th century in food and beverage insulation)"
  },
  "deepMeaning": {
    "coreConcept": "Relating to heat, temperature regulation, or thermal insulation; specifically in food service and dining operations, designating equipment, containers, or materials engineered with double-wall vacuum or polyurethane foam insulation to maintain cooked foods and beverages at hot holding temperatures (above 140°F / 60°C) or chilled temperatures (below 40°F / 4°C) without external power.",
    "spatialContext": "Commercial restaurant kitchens, banquet staging pantries, conference room beverage credenzas, off-site catering transport vans, buffet lines, and coffee service stations.",
    "temporalContext": "Utilized continuously during pre-service prep shifts, throughout multi-hour banquet meal services, during transport from prep commissaries to event venues, and during morning continental breakfast setups.",
    "emotionalTone": "Technical, practical, reliable, safety-oriented, and hospitable.",
    "formalityLevel": "neutral",
    "connotation": "positive"
  },
  "nativeMindset": {
    "howNativesThink": "To native speakers in dining, catering, and hospitality operations, 'thermal' immediately evokes temperature retention and insulation rather than active heating elements. A native speaker thinking of a 'thermal carafe' visualizes a brushed stainless steel, double-wall vacuum pitcher with an airtight pour-spout that keeps brewed coffee piping hot for hours on a conference table without scorching the beans. In event catering, 'thermal carriers' or 'thermal bags' immediately signify temperature compliance and safe food transit—preventing hot entrees from falling into the bacterial danger zone. In beverage service, it implies both heat retention for hot drinks and cold retention for iced beverages without sweating condensation on tabletop linens.",
    "mentalImage": "A catering attendant setting out sleek brushed stainless steel thermal carafes labeled 'Regular' and 'Decaf' alongside porcelain cups on a conference room credenza, while in the background kitchen, line cooks load steaming hotel pans into heavy-duty insulated thermal food carriers for delivery.",
    "whenToUse": "Use when describing equipment, containers, or materials engineered specifically to insulate, preserve, or regulate temperature in food and beverage operations (e.g., 'thermal carafe', 'thermal food carrier', 'thermal insulated delivery bag', 'thermal circulator', 'thermal shock-resistant glassware', 'thermal receipt paper').",
    "whenNotToUse": "Do not use 'thermal' when simply describing high ambient room temperature or spicy culinary seasonings (use 'hot', 'warm', or 'spicy'). Do not confuse with 'thermostatic' (which refers specifically to an automated sensor switch that regulates a thermostat) or 'caloric' (which refers to nutritional energy in food).",
    "culturalContext": "In North American and British corporate dining and event hospitality, thermal carafes are a universal fixture in boardroom meetings, conventions, and hotel breakfast buffets because they eliminate electric cords and prevent the burnt, bitter flavor caused by continuous electric burner plates. Furthermore, public health and food safety standards (such as HACCP and local municipal health codes) strictly govern the commercial food temperature 'danger zone' (40°F–140°F / 4°C–60°C). Consequently, commercial caterers rely universally on certified thermal transport cabinets and infrared thermal thermometers to pass inspections and satisfy corporate clients. In TOEIC test design, 'thermal' appears in catering proposals, banquet service schedules, and restaurant equipment procurement invoices."
  },
  "examples": {
    "daily": [
      "The server placed a stainless steel thermal carafe of hot coffee on our breakfast table so we could refill our cups at our own leisure.",
      "Before heading out on the long drive, she poured hot herbal tea into a double-walled thermal travel mug to keep it warm all morning.",
      "The food delivery courier carried our pizza and pasta in a padded thermal insulated bag to ensure everything arrived piping hot."
    ],
    "business": [
      "The banquet supervisor ordered thirty heavy-duty thermal food carriers to transport hot catered meals from the central commissary to the downtown convention center.",
      "According to the restaurant's HACCP food safety protocol, line cooks must verify holding temperatures using digital thermal probe thermometers before transferring dishes to the buffet line.",
      "The corporate catering contract specifies that all meeting rooms must be equipped with brushed stainless steel thermal dispensers for both regular and decaffeinated coffee."
    ],
    "conversation": [
      "\"Will the coffee stay hot enough during the two-hour executive committee meeting?\" / \"Yes, our vacuum-insulated thermal carafes are rated to keep beverages above seventy degrees Celsius for up to six hours.\"",
      "\"Did the catering van arrive with the hot luncheon entrees for the symposium?\" / \"Yes, the delivery team just rolled in four wheeled thermal holding cabinets, and the steam pans are still steaming hot.\"",
      "\"Why did the procurement team replace the glass teapots in the hotel lounge?\" / \"They switched to double-walled thermal teapots because guests complained that the hot tea cooled down too quickly during afternoon high tea.\""
    ],
    "collocations": [
      "thermal carafe",
      "thermal food carrier",
      "thermal insulated bag",
      "thermal beverage dispenser",
      "thermal shock resistance",
      "thermal probe thermometer"
    ]
  },
  "wordFamily": {
    "noun": "thermal, therm, thermodynamics",
    "verb": "thermalize",
    "adjective": "thermal",
    "adverb": "thermally"
  },
  "visual": {
    "imageKeyword": "stainless steel thermal carafe coffee dispenser banquet buffet catering",
    "imageDescription": "A row of brushed stainless steel thermal coffee carafes neatly arranged on a white linen buffet table beside ceramic mugs, with subtle steam visible as hot coffee is poured.",
    "mnemonic": "THERMAL comes from Greek 'thermos' (heat): A THERMAL carafe locks in TEMPERATURE so hot drinks stay warm!"
  },
  "video": {
    "description": "A commercial catering logistics video demonstrating how to load stainless steel hotel pans into insulated thermal food carriers to maintain safe holding temperatures during transport."
  },
  "toeicContext": {
    "commonParts": [
      1,
      3,
      4,
      7
    ],
    "exampleQuestion": "To keep beverages at an optimal serving temperature throughout the seminar, the catering coordinator placed a _____ carafe of brewed coffee on each conference table. (A) thermal (B) thermally (C) thermals (D) thermalize",
    "tips": "In TOEIC Part 5 and Part 6, 'thermal' frequently appears as an adjective modifying food-service nouns such as 'carafe', 'container', 'bag', or 'insulation'. Choice (A) 'thermal' is the correct adjective form modifying 'carafe'. Choice (B) 'thermally' is an adverb which cannot modify a noun; Choice (C) 'thermals' is a plural noun; and Choice (D) 'thermalize' is a verb."
  },
  "synonyms": [
    "insulated",
    "heat-retaining",
    "temperature-controlled",
    "heat-insulating",
    "vacuum-insulated"
  ],
  "antonyms": [
    "non-insulated",
    "conductive",
    "heat-conducting"
  ],
  "relatedWords": [
    "carafe",
    "insulation",
    "chafing dish",
    "holding temperature",
    "cambro",
    "sous-vide",
    "food safety"
  ]
}

data = {"words": [entry]}

with open("scratch/thermal_test.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)

print("Saved scratch/thermal_test.json")
