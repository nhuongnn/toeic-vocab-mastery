import json

data = {
  "words": [
    {
      "id": "health-070",
      "word": "brace",
      "partOfSpeech": ["noun"],
      "category": "health",
      "level": "essential",
      "toeicFrequency": 9,
      "pronunciation": {
        "ipa": "/breɪs/",
        "syllableBreakdown": "brace",
        "stressPattern": "monosyllabic",
        "commonMistakes": "Confusing pronunciation with 'braise' or mispronouncing the final /s/ as /z/."
      },
      "etymology": {
        "origin": "Old French / Latin",
        "rootWord": "bracia",
        "rootMeaning": "the two arms",
        "evolution": "Latin brachia (arms) -> Old French brace (arms, embrace, measurement of two outstretched arms) -> Middle English brace (fastener, support) -> Modern English brace (orthopedic support device).",
        "relatedLanguages": ["French", "Latin", "Italian"],
        "firstRecordedUse": "13th century"
      },
      "deepMeaning": {
        "coreConcept": "An orthopedic device, splint, or support structure worn on a body part (such as a knee, wrist, back, or ankle) to provide stabilization, limit unwanted movement, and alleviate strain or injury during physical activity or recovery.",
        "spatialContext": "Orthopedic clinics, workplace ergonomics stations, physical therapy rehabilitation centers, and office environments where ergonomic posture supports are utilized.",
        "temporalContext": "Intermittent or regular daily use during physical exertion, heavy lifting, or recovery periods following workplace musculoskeletal strains.",
        "emotionalTone": "neutral",
        "formalityLevel": "formal",
        "connotation": "neutral"
      },
      "nativeMindset": {
        "howNativesThink": "Viewed as a practical medical or ergonomic tool for physical protection and injury prevention, often associated with physical therapy, post-injury recovery, and heavy industrial safety.",
        "mentalImage": "A black neoprene wrist brace with adjustable velcro straps resting on an ergonomic desk next to a mechanical keyboard.",
        "whenToUse": "When referring to orthopedic supports, medical devices, or structural reinforcements.",
        "whenNotToUse": "Do not use 'brace' to describe general pain medication or non-supportive clothing items.",
        "culturalContext": "Highly relevant in occupational health, safety compliance (OSHA guidelines), and corporate ergonomics programs designed to prevent repetitive strain injuries (RSI) and carpal tunnel syndrome."
      },
      "examples": {
        "daily": [
          "She wore a rigid wrist brace while typing to alleviate carpal tunnel discomfort.",
          "The physical therapist recommended a knee brace for his post-surgery rehabilitation.",
          "He adjusted the velcro straps on his ankle brace before going for a morning run."
        ],
        "business": [
          "The company's occupational health department provides ergonomic wrist braces to office staff upon request.",
          "Employees assigned to warehouse lifting duties must wear certified back braces to prevent lumbar injuries.",
          "The ergonomic assessment suggested that desk workers experiencing repetitive strain utilize appropriate wrist braces."
        ],
        "conversation": [
          "Colleague A: 'Your wrist looks sore. Are you okay?'",
          "Colleague B: 'I've developed mild tendonitis from typing, so my doctor recommended wearing this brace during long sessions.'"
        ],
        "collocations": [
          "wrist brace",
          "back brace",
          "knee brace",
          "orthopedic brace",
          "wear a brace",
          "ergonomic brace"
        ]
      },
      "wordFamily": {
        "adjective": "braced",
        "adverb": "bracingly",
        "noun": "brace",
        "verb": "brace"
      },
      "visual": {
        "imageDescription": "A professional-grade breathable neoprene wrist splint with aluminum reinforcement stays placed neatly on a modern wooden office desk.",
        "imageKeyword": "adjustable ergonomic wrist brace on office desk",
        "mnemonic": "Imagine using your two arms ('bracia') to hug and protect an injured joint, just like a brace supports your body."
      },
      "video": {
        "description": "An instructional workplace safety video demonstrating the proper fitting and adjustment of lumbar back braces for warehouse loading personnel."
      },
      "toeicContext": {
        "commonParts": [1, 3, 7],
        "exampleQuestion": "As part of the new workplace safety initiative, warehouse staff must wear approved lumbar support ________ during heavy lifting tasks.\n(A) braces\n(B) brackets\n(C) bandages\n(D) barriers",
        "tips": "Test-takers should distinguish between 'braces' (support devices for body parts) and 'brackets' (structural wall mounts or fixtures). Contextual clues like 'heavy lifting tasks' point directly to body support."
      },
      "synonyms": ["support", "splint", "sling", "orthosis", "cast"],
      "antonyms": [],
      "relatedWords": ["ergonomics", "rehabilitation", "injury", "physiotherapy", "strain", "support"]
    },
    {
      "id": "health-071",
      "word": "burnout",
      "partOfSpeech": ["noun"],
      "category": "health",
      "level": "intermediate",
      "toeicFrequency": 8,
      "pronunciation": {
        "ipa": "/ˈbɜːrnaʊt/",
        "syllableBreakdown": "burn-out",
        "stressPattern": "Primary stress on the first syllable ('burn').",
        "commonMistakes": "Misplacing stress on the second syllable ('burn-OUT') or treating it as a verb instead of a noun."
      },
      "etymology": {
        "origin": "English compounding",
        "rootWord": "burn out",
        "rootMeaning": "to fail from excessive consumption of fuel or energy",
        "evolution": "Derived from aerospace/electrical engineering terminology (rocket engines or electrical components failing from overheating) and popularized in clinical psychology by Herbert Freudenberger in the 1970s to describe severe occupational exhaustion.",
        "relatedLanguages": ["English"],
        "firstRecordedUse": "Mid-20th century (psychological sense in 1974)"
      },
      "deepMeaning": {
        "coreConcept": "A state of physical, emotional, and mental exhaustion caused by excessive and prolonged workplace stress, characterized by chronic fatigue, cynicism toward one's job, and reduced professional efficacy.",
        "spatialContext": "Modern corporate offices, high-pressure technology startups, healthcare facilities, and remote work environments.",
        "temporalContext": "Developing gradually over months or years of sustained high workload, tight deadlines, and inadequate work-life balance.",
        "emotionalTone": "negative",
        "formalityLevel": "neutral",
        "connotation": "negative"
      },
      "nativeMindset": {
        "howNativesThink": "Widely recognized in modern corporate culture as a serious psychological and occupational hazard resulting from overwork, prompting discussions on wellness policies, mental health days, and work-life balance.",
        "mentalImage": "An exhausted professional staring blankly at a glowing laptop screen in a dark office late at night, surrounded by cold coffee cups.",
        "whenToUse": "When discussing chronic workplace fatigue, mental exhaustion, or employee wellness initiatives.",
        "whenNotToUse": "Do not use 'burnout' to describe a temporary physical tiredness after a single day's workout or brief exertion.",
        "culturalContext": "Central to modern corporate human resources management, employee retention strategies, and discussions around mental health awareness in Western workplaces."
      },
      "examples": {
        "daily": [
          "After working sixty-hour weeks for four consecutive months, she began experiencing severe mental burnout.",
          "Taking regular vacations is essential for preventing chronic burnout in high-demand professions.",
          "He realized that his persistent fatigue and irritability were classic symptoms of professional burnout."
        ],
        "business": [
          "Human Resources introduced a mandatory wellness program aimed at reducing employee burnout across all departments.",
          "The survey indicated that heavy workloads and unrealistic project deadlines were the primary drivers of staff burnout.",
          "Management implemented flexible working hours to help curb rising burnout rates among software engineers."
        ],
        "conversation": [
          "Colleague A: 'Are you taking any time off this quarter?'",
          "Colleague B: 'Yes, I really need a break. I'm on the verge of total burnout after the product launch.'"
        ],
        "collocations": [
          "employee burnout",
          "professional burnout",
          "prevent burnout",
          "suffer from burnout",
          "risk of burnout",
          "workplace burnout"
        ]
      },
      "wordFamily": {
        "adjective": "burned-out",
        "adverb": "burnout-related",
        "noun": "burnout",
        "verb": "burn out"
      },
      "visual": {
        "imageDescription": "An exhausted business professional resting their head in their hands in front of a computer monitor in an empty corporate office.",
        "imageKeyword": "stressed exhausted professional at laptop office",
        "mnemonic": "Like a candle flame burning out its wax completely until nothing is left, a worker experiencing burnout has depleted all emotional and physical fuel."
      },
      "video": {
        "description": "An corporate human resources webinar outlining strategies for managers to identify early warning signs of employee burnout and foster team well-being."
      },
      "toeicContext": {
        "commonParts": [5, 6, 7],
        "exampleQuestion": "To address rising employee ________ caused by recent deadline extensions, the management team introduced quarterly mental health days.\n(A) burnout\n(B) burn\n(C) burning\n(D) burner",
        "tips": "Test-takers should recognize compound nouns related to workplace conditions. 'Burnout' correctly identifies chronic occupational exhaustion."
      },
      "synonyms": ["exhaustion", "fatigue", "depletion", "overwork", "collapse"],
      "antonyms": ["vitality", "vigor", "rejuvenation", "energy"],
      "relatedWords": ["stress", "wellness", "workload", "exhaustion", "fatigue", "balance"]
    },
    {
      "id": "health-072",
      "word": "calisthenics",
      "partOfSpeech": ["noun"],
      "category": "health",
      "level": "advanced",
      "toeicFrequency": 7,
      "pronunciation": {
        "ipa": "/ˌkælɪsˈθɛnɪks/",
        "syllableBreakdown": "cal-is-then-ics",
        "stressPattern": "Primary stress on the third syllable ('then').",
        "commonMistakes": "Misplacing stress on the first or second syllable, or mispronouncing the 'th' sound as /s/ or /t/."
      },
      "etymology": {
        "origin": "Greek",
        "rootWord": "kalos (beautiful) + sthenos (strength)",
        "rootMeaning": "beauty and strength",
        "evolution": "Derived from Ancient Greek kalos (beautiful) and sthenos (strength), coined in French as callisthénie in the early 19th century, then adopted into English to describe gymnastic exercises promoting bodily grace and vigor.",
        "relatedLanguages": ["Greek", "French", "English"],
        "firstRecordedUse": "Early 19th century"
      },
      "deepMeaning": {
        "coreConcept": "Physical exercises performed using body weight as resistance—such as push-ups, pull-ups, squats, and sit-ups—designed to build strength, flexibility, and physical conditioning without heavy weights or specialized gym equipment.",
        "spatialContext": "Corporate wellness fitness centers, outdoor employee recreation areas, home gyms, and physical education facilities.",
        "temporalContext": "Regular daily or weekly exercise routines integrated into personal health regimens or corporate wellness programs.",
        "emotionalTone": "positive",
        "formalityLevel": "formal",
        "connotation": "positive"
      },
      "nativeMindset": {
        "howNativesThink": "Associated with efficient, accessible fitness routines that require minimal equipment, often highlighted in corporate wellness initiatives, military physical training, and general health maintenance.",
        "mentalImage": "An individual performing controlled push-ups on a mat in a bright, modern corporate fitness studio.",
        "whenToUse": "When referring to bodyweight fitness training and conditioning exercises.",
        "whenNotToUse": "Do not use 'calisthenics' to describe weightlifting involving dumbbells, barbells, or heavy machines.",
        "culturalContext": "Frequently promoted in corporate wellness programs as a cost-effective, accessible way for employees to stay active and reduce sedentary workplace fatigue."
      },
      "examples": {
        "daily": [
          "He starts every morning with a twenty-minute routine of calisthenics to boost his energy.",
          "The fitness instructor recommended incorporating basic calisthenics like squats and lunges into daily breaks.",
          "She prefers outdoor calisthenics over traditional gym memberships for staying fit."
        ],
        "business": [
          "The company's new wellness center offers guided morning calisthenics classes for employees before work hours.",
          "Corporate wellness coordinators organized a team-building calisthenics challenge to encourage active lifestyles.",
          "The ergonomic and fitness seminar highlighted how daily calisthenics can counteract the negative health impacts of prolonged sitting."
        ],
        "conversation": [
          "Colleague A: 'How do you stay in such good shape without a gym membership?'",
          "Colleague B: 'I do a daily routine of bodyweight calisthenics right in my living room.'"
        ],
        "collocations": [
          "daily calisthenics",
          "calisthenics routine",
          "bodyweight calisthenics",
          "calisthenics exercises",
          "perform calisthenics"
        ]
      },
      "wordFamily": {
        "adjective": "calisthenic",
        "adverb": "calisthenically",
        "noun": "calisthenics",
        "verb": "exercise"
      },
      "visual": {
        "imageDescription": "An athletic individual performing a strict push-up on a wooden floor in a well-lit, minimalist fitness studio.",
        "imageKeyword": "person doing pushups calisthenics fitness gym",
        "mnemonic": "Think of Greek roots 'kalos' (beauty) plus 'sthenos' (strength): calisthenics builds both graceful movement and strong muscles using your own body weight."
      },
      "video": {
        "description": "A corporate wellness tutorial demonstrating five simple bodyweight calisthenics exercises that desk workers can perform during short breaks."
      },
      "toeicContext": {
        "commonParts": [3, 6, 7],
        "exampleQuestion": "As part of the corporate health initiative, employees are encouraged to participate in morning ________ sessions led by a certified fitness instructor.\n(A) calisthenics\n(B) calories\n(C) calculators\n(D) calendars",
        "tips": "Test-takers should recognize specialized vocabulary related to health and fitness programs. 'Calisthenics' fits the context of physical exercise sessions."
      },
      "synonyms": ["bodyweight exercises", "gymnastics", "conditioning", "workout", "fitness routine"],
      "antonyms": [],
      "relatedWords": ["fitness", "exercise", "strength", "wellness", "conditioning", "bodyweight"]
    }
  ]
}

print(json.dumps(data, indent=2))
