import json
import jsonschema

words = [
  {
    "id": "comms-279",
    "word": "darkroom",
    "partOfSpeech": [
      "noun"
    ],
    "category": "communications",
    "level": "intermediate",
    "toeicFrequency": 8,
    "pronunciation": {
      "ipa": "/ˈdɑːrk.ruːm/",
      "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/darkroom--_us_1.mp3",
      "syllableBreakdown": "dark-room",
      "stressPattern": "primary stress on the first syllable (DARK-room)",
      "commonMistakes": "Learners frequently stress the second syllable (*dark-ROOM*) because both components are recognizable standalone nouns; however, compound nouns in English take primary stress on the first element (DARK-room). Additionally, some learners fail to pronounce the /k/ cleanly before the /r/, either inserting an unintended schwa (*dark-uh-room*) or dropping the unreleased voiceless velar stop."
    },
    "etymology": {
      "origin": "English compound formed from 'dark' (from Old English 'deorc' meaning obscure, gloomy, devoid of light) + 'room' (from Old English 'rūm' meaning open space, chamber).",
      "rootWord": "Proto-Germanic *derkaz (dark) + Proto-Germanic *rūmą (space, chamber)",
      "rootMeaning": "'A sealed chamber devoid of ambient light for chemical photographic processing'",
      "evolution": "Originally used in the early 17th century in optics to describe the 'camera obscura' (literally 'dark chamber' in Latin). With the invention of practical chemical photography by Daguerre, Niépce, and Fox Talbot in the 1830s–1840s, 'darkroom' became the standard technical designation for a light-tight laboratory where sensitized photographic plates and emulsions could be prepared, exposed beneath an optical enlarger, and bathed in developing, stopping, and fixing chemicals without fogging.",
      "relatedLanguages": [
        "German: Dunkelkammer",
        "French: chambre noire",
        "Spanish: cuarto oscuro",
        "Italian: camera oscura"
      ],
      "firstRecordedUse": "Early 17th century (optics/camera obscura); mid-19th century (chemical photographic laboratory)"
    },
    "deepMeaning": {
      "coreConcept": "A light-sealed, specialized laboratory equipped with safe-lighting, running water, chemical processing trays (developer, stop bath, fixer), and optical enlargers, used by photographers and darkroom technicians to develop light-sensitive photographic film and produce gelatin silver paper prints without accidental light exposure.",
      "spatialContext": "Light-tight photographic laboratories in print newspaper headquarters, archival preservation departments, forensic investigation bureaus, art schools, and professional commercial photography studios, typically featuring revolving light-trap doors, red or amber safelight fixtures, deep stainless steel sink basins, and chemical extraction ventilation.",
      "temporalContext": "Utilized during photo processing sessions ranging from 30-minute film roll developments to multi-hour print enlargement and archival washing cycles, especially before press deadlines in historical journalism or during archival digitization projects.",
      "emotionalTone": "Focused, artisanal, technical, and precise.",
      "formalityLevel": "neutral",
      "connotation": "neutral"
    },
    "nativeMindset": {
      "howNativesThink": "To a native speaker, 'darkroom' immediately evokes the faint amber or red glow of safelights, the distinctive pungent smell of acetic acid stop bath and chemical fixer, trays of liquid, and photographic prints slowly emerging in developer liquid. While largely superseded in daily journalism by digital sensors and photo editing software, native speakers maintain deep respect for the darkroom as the birthplace of photojournalism and hands-on craftsmanship. When used metaphorically in software (e.g., 'digital darkroom'), it connotes precise exposure, dodging, burning, and color calibration.",
      "mentalImage": "A photojournalist standing under an amber safelight in a light-tight studio, using plastic tongs to agitate a black-and-white gelatin silver print in an enamel tray of chemical developer while timer clocks click softly on the wall.",
      "whenToUse": "Use when referring to the actual physical light-sealed room used for developing film negatives and making photographic paper prints, or in historical media accounts, photography curriculum descriptions, and museum archival preservation facilities.",
      "whenNotToUse": "Do not use 'darkroom' to describe an ordinary unlit room or an electrical outage closet (that is simply a 'dark room' as two separate words with equal stress: 'a dárk roóm'). Do not confuse with 'camera obscura' (an optical projection device) or a generic 'photo studio' (which is brightly illuminated for shooting models or products).",
      "culturalContext": "In Western media history, the newspaper darkroom was the frantic nerve center of investigative reporting, where photojournalists rushed straight from crime scenes, political rallies, or press conferences to develop negatives before daily printing deadlines. Today, physical darkrooms are cherished in high-end fine art photography and historic archives, while the terminology survives in digital photography apps."
    },
    "examples": {
      "daily": [
        "The high school art department still maintains a fully functioning darkroom where students learn to mix chemistry and develop their own 35mm film.",
        "Before opening the canister to load the negative into the developing tank, make sure the darkroom is completely light-tight.",
        "She spent Saturday afternoon in her home darkroom making black-and-white gelatin silver prints of portraits she took in London."
      ],
      "business": [
        "The archival publishing house refurbished its basement darkroom to inspect and stabilize fragile gelatin glass-plate negatives from the early twentieth century.",
        "The commercial photography agency decommissioned its traditional wet darkroom and repurposed the floor space for high-resolution digital scanning workstations.",
        "Industrial safety inspectors verified that the university's photography darkroom complied with OSHA regulations regarding chemical ventilation and eyewash stations."
      ],
      "conversation": [
        "A: 'Do you have the contact sheets ready for the magazine spread?'\nB: 'Not yet; Marcus is still in the darkroom washing the final batch of fiber-based prints.'",
        "A: 'Why did the facilities manager replace the door to the darkroom?'\nB: 'They installed a revolving light-trap entryway so staff can enter and exit without exposing developing film to ambient light.'"
      ],
      "collocations": [
        "photo darkroom",
        "darkroom equipment",
        "darkroom technician",
        "enter the darkroom",
        "traditional wet darkroom",
        "darkroom safelight"
      ]
    },
    "wordFamily": {
      "noun": "darkroom",
      "verb": "",
      "adjective": "",
      "adverb": ""
    },
    "visual": {
      "imageKeyword": "photographic darkroom red safelight developing trays enlarger prints",
      "imageDescription": "A dimly lit photographic laboratory illuminated by a deep red safelight, featuring an enlarger on a dry workbench and trays of developer, stop bath, and fixer in a stainless steel sink with hanging film strips.",
      "mnemonic": "DARK-ROOM: You must keep the ROOM completely DARK, or ambient light will ruin the sensitive film before the chemical bath develops the image!"
    },
    "video": {
      "description": "An educational documentary demonstrating how a master printer works inside a traditional darkroom, from exposing paper beneath an optical enlarger to agitating developer trays and inspecting the final print under white inspection light."
    },
    "toeicContext": {
      "commonParts": [
        1,
        3,
        7
      ],
      "exampleQuestion": "Due to the sensitivity of unprocessed photographic film to ambient light, all staff members must obtain authorization before entering the studio's _____ .\n(A) darkroom\n(B) darkly\n(C) darken\n(D) darkness",
      "tips": "In TOEIC Part 5, questions frequently test your ability to select the correct part of speech following a possessive noun ('studio's') and preceding a period. Here, a concrete noun specifying a photographic facility is required. Choice (A) 'darkroom' is the noun naming the specialized room. Choice (B) 'darkly' is an adverb, Choice (C) 'darken' is a verb, and Choice (D) 'darkness' is an abstract noun denoting the absence of light, which does not fit the context of physical entry ('entering the studio's _____')."
    },
    "synonyms": [
      "photographic darkroom",
      "photo lab",
      "developing room",
      "chambre noire",
      "chemical processing lab"
    ],
    "antonyms": [],
    "relatedWords": [
      "enlarger",
      "safelight",
      "photographic film",
      "contact sheet",
      "developer",
      "fixer",
      "photojournalism"
    ]
  },
  {
    "id": "comms-280",
    "word": "desktop publishing",
    "partOfSpeech": [
      "noun"
    ],
    "category": "communications",
    "level": "advanced",
    "toeicFrequency": 7,
    "pronunciation": {
      "ipa": "/ˌdɛsk.tɑːp ˈpʌb.lɪ.ʃɪŋ/",
      "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/desktop_publishing--_us_1.mp3",
      "syllableBreakdown": "desk-top pub-lish-ing",
      "stressPattern": "secondary stress on 'desk', primary stress on 'pub' (desk-top PUB-lish-ing)",
      "commonMistakes": "Learners often drop the consonant cluster /-skt-/ in 'desktop', pronouncing it as *des-top*. Additionally, learners may misplace primary stress onto 'desktop' (*DESK-top publishing*) or elide the final unstressed nasal velar /-ɪŋ/ into an alveolar /-ɪn/."
    },
    "etymology": {
      "origin": "Modern English compound term coined in 1984 by Paul Brainerd, founder of Aldus Corporation (creators of PageMaker software), combining 'desktop' (referring to personal computer microcomputers that sit atop an office desk) + 'publishing' (from Middle English 'publisshen', from Anglo-French 'publier', from Latin 'publicare' meaning to make public).",
      "rootWord": "English 'desk' (from Medieval Latin 'desca' table) + 'top' (from Old English 'topp' summit) + 'publish' (from Latin 'publicus' public) + '-ing'",
      "rootMeaning": "'The production of publication-ready printed material directly from a personal computer workstation'",
      "evolution": "In the mid-1980s, the introduction of the Apple Macintosh computer, the Apple LaserWriter printer (with Adobe PostScript page-description language), and Aldus PageMaker software revolutionized graphic arts. It eliminated multi-step chemical typesetting and paste-up boards, enabling small corporate communication teams, marketing departments, and individual designers to produce commercial-grade typography and print layouts in-house. Today, desktop publishing encompasses digital interactive PDFs, e-books, and prepress prep across graphic communications.",
      "relatedLanguages": [
        "French: publication assistée par ordinateur (PAO)",
        "Spanish: autoedición / publicación de escritorio",
        "German: Desktop-Publishing (DTP)",
        "Italian: desktop publishing"
      ],
      "firstRecordedUse": "1984 (computer software and commercial printing industry)"
    },
    "deepMeaning": {
      "coreConcept": "The production of printed and electronic documents—combining formatted typography, grid layouts, vector illustrations, and photographs—using page-layout software on personal computer workstations to prepare press-ready files for commercial offset printing or digital distribution.",
      "spatialContext": "Corporate marketing departments, graphic design studios, prepress bureaus, commercial printing houses, editorial offices, and freelance workstations equipped with large dual-monitor displays, color-calibrated panels, and high-resolution proof printers.",
      "temporalContext": "Spans the entire prepress production schedule, from initial grid layout creation and copy fitting to editorial proof revisions, preflight verification, and exporting final PDF/X files before print manufacturing deadlines.",
      "emotionalTone": "Professional, precise, aesthetic, and production-oriented.",
      "formalityLevel": "formal",
      "connotation": "neutral"
    },
    "nativeMindset": {
      "howNativesThink": "To a native speaker, 'desktop publishing' (or 'DTP') evokes professional layout software (like Adobe InDesign or QuarkXPress) used to assemble complex multi-page publications—annual reports, catalogs, newsletters, magazines, and technical white papers. It implies sophisticated control over typography (kerning, tracking, leading), paragraph stylesheets, master pages, bleed margins, and CMYK color separations, distinguishing it clearly from basic word processing software like Microsoft Word or Google Docs.",
      "mentalImage": "A graphic designer working on dual monitors in a marketing agency, using Adobe InDesign to arrange two-column text frames, apply baseline grids, place high-resolution product photographs, and check bleed margins for a corporate quarterly catalog.",
      "whenToUse": "Use when describing the professional practice, software skills, or departmental role of assembling print or digital documents using dedicated page-layout software (e.g., 'desktop publishing specialist', 'proficiency in desktop publishing', 'outsource the desktop publishing to an agency').",
      "whenNotToUse": "Do not use 'desktop publishing' to mean simple typing in a standard word processor (e.g., writing a quick memo in Microsoft Word is 'word processing', not 'desktop publishing'). Do not confuse with 'web design' (coding web pages with HTML/CSS) or 'social media marketing'.",
      "culturalContext": "In corporate communications and TOEIC business materials, desktop publishing skills are a standard qualification in administrative and marketing job descriptions. Companies rely on DTP professionals to guarantee that marketing brochures, shareholder proxies, and instruction manuals conform to corporate brand guidelines and technical printing specifications."
    },
    "examples": {
      "daily": [
        "She enrolled in an evening community college course to learn desktop publishing skills using industry-standard layout software.",
        "Thanks to affordable desktop publishing tools, our neighborhood association can design and print its own monthly newsletter.",
        "The freelancer used desktop publishing software to arrange the recipes, photographs, and index for her self-published cookbook."
      ],
      "business": [
        "The corporate communications department hired a desktop publishing specialist to oversee the formatting of the company's annual financial report.",
        "Before sending the catalog to the commercial printer, the desktop publishing team ran a preflight check to detect missing fonts and low-resolution images.",
        "Investing in modernized desktop publishing software enabled the marketing division to produce all promotional brochures in-house, significantly cutting production costs."
      ],
      "conversation": [
        "A: 'Can we handle the formatting of the fifty-page sustainability report internally?'\nB: 'Yes, our desktop publishing team already configured the master templates and stylesheets in InDesign.'",
        "A: 'Why did the printer reject our export file?'\nB: 'The desktop publishing coordinator forgot to include the three-millimeter bleed margin and convert RGB graphics to CMYK.'"
      ],
      "collocations": [
        "desktop publishing software",
        "desktop publishing specialist",
        "proficient in desktop publishing",
        "desktop publishing skills",
        "desktop publishing workflow",
        "in-house desktop publishing"
      ]
    },
    "wordFamily": {
      "noun": "desktop publisher, desktop publishing",
      "verb": "publish",
      "adjective": "publishing",
      "adverb": ""
    },
    "visual": {
      "imageKeyword": "desktop publishing graphic designer computer InDesign layout print brochure",
      "imageDescription": "A graphic design workstation displaying complex multi-page brochure layout software with typographic ruler guides, color palettes, and photo frames alongside printed proof copies on an organized office desk.",
      "mnemonic": "DESK-TOP PUBLISHING: You don't need a massive commercial printing house to lay out a magazine—you can PUBLISH it right from your office DESKTOP computer!"
    },
    "video": {
      "description": "A corporate training video demonstrating a standard desktop publishing workflow, showing how layout specialists import raw copy from editors, apply brand color palettes, adjust baseline grids, and package files for commercial offset printing."
    },
    "toeicContext": {
      "commonParts": [
        3,
        5,
        7
      ],
      "exampleQuestion": "Applicants for the marketing coordinator position must demonstrate proven proficiency in _____ and graphic design software.\n(A) desktop publishing\n(B) desktop published\n(C) publish desktop\n(D) publisher desktop",
      "tips": "In TOEIC Part 5, recognizing compound noun phrases governed by prepositions is essential. The preposition 'in' governs a parallel noun phrase joined by 'and' ('in _____ and graphic design software'). The standard technical compound noun is 'desktop publishing'. Choice (B) 'desktop published' is a past participle/passive structure that cannot serve as a noun object; Choice (C) 'publish desktop' incorrectly places an uninflected verb before a noun; and Choice (D) 'publisher desktop' reverses the nouns into an unidiomatic sequence."
    },
    "synonyms": [
      "electronic publishing",
      "DTP",
      "page layout design",
      "computer-aided publishing",
      "print production"
    ],
    "antonyms": [],
    "relatedWords": [
      "page layout",
      "typesetting",
      "prepress",
      "typography",
      "Adobe InDesign",
      "bleed",
      "master page"
    ]
  },
  {
    "id": "comms-281",
    "word": "editorial cartoon",
    "partOfSpeech": [
      "noun"
    ],
    "category": "communications",
    "level": "advanced",
    "toeicFrequency": 7,
    "pronunciation": {
      "ipa": "/ˌɛd.əˈtɔːr.i.əl kɑːrˈtuːn/",
      "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/editorial_cartoon--_us_1.mp3",
      "syllableBreakdown": "ed-i-to-ri-al car-toon",
      "stressPattern": "secondary stress on 'ed', primary stress on 'to' and 'toon' (ed-i-TOR-i-al car-TOON)",
      "commonMistakes": "Learners often stress the first syllable of 'cartoon' (*CAR-toon* instead of car-TOON) or mispronounce the vowel in 'editorial', turning /-tɔːr-/ into /-tɑːr-/. Furthermore, non-native speakers may conflate an 'editorial cartoon' with animated entertainment cartoons (like TV cartoons), neglecting that in journalism it refers strictly to a static single-panel satirical illustration."
    },
    "etymology": {
      "origin": "English compound combining 'editorial' (from Latin 'editor' meaning one who puts forth or produces, from 'edere' to bring forth) + 'cartoon' (from Italian 'cartone' meaning a large sheet of paper or heavy card, from Latin 'charta' paper).",
      "rootWord": "Latin 'edere' (to publish, bring forth) via Late Latin 'editor' + Italian 'cartone' (preparatory sketch on heavy cardboard for frescoes) + '-one'",
      "rootMeaning": "'A published visual sketch expressing an opinion on public affairs'",
      "evolution": "Historically, 'cartoon' referred to full-size preparatory sketches drawn on heavy card paper by Renaissance artists (such as Raphael) before painting frescoes. In 1843, the British satirical magazine Punch published satirical drawings parodying the grand frescoes planned for the new Houses of Parliament, ironically labeling them 'cartoons'. The term 'editorial cartoon' became standardized in Anglo-American journalism during the late 19th and early 20th centuries to describe the satirical illustration published alongside editorial columns.",
      "relatedLanguages": [
        "French: dessin de presse / caricature politique",
        "Spanish: viñeta editorial / caricatura política",
        "German: politische Karikatur / Editorial-Cartoon",
        "Italian: vignetta satirica / caricatura politica"
      ],
      "firstRecordedUse": "Late 19th century (Anglo-American print journalism)"
    },
    "deepMeaning": {
      "coreConcept": "A single-panel illustration or comic strip published on the opinion or editorial pages of a newspaper, magazine, or digital news outlet that uses satire, caricature, and metaphor to express a sharp political, corporate, or social critique of current events.",
      "spatialContext": "Editorial offices, newspaper op-ed pages, magazine opinion sections, syndication agency wire feeds, and digital news commentary platforms; drafted on drawing tablets or artist sketchboards.",
      "temporalContext": "Created rapidly on daily news cycles following breaking political elections, regulatory scandals, legislative debates, or major corporate announcements to meet print press closing hours.",
      "emotionalTone": "Satirical, provocative, witty, irreverent, and insightful.",
      "formalityLevel": "formal",
      "connotation": "neutral"
    },
    "nativeMindset": {
      "howNativesThink": "To a native speaker, an 'editorial cartoon' is not children's entertainment or an animated movie; it is a respected, razor-sharp form of visual journalism. Native readers expect an editorial cartoon to challenge political authorities, skewer corporate hypocrisy, or expose absurdities in current events using visual symbols (like Uncle Sam, Wall Street bulls, or scales of justice), caricatured public figures, and succinct speech captions. Winning a Pulitzer Prize for Editorial Cartooning is considered one of journalism's highest honors.",
      "mentalImage": "An illustrative single-panel sketch on the opinion page of a major newspaper depicting a corporate CEO balancing precarious spreadsheets on a tightrope over turbulent market waters, accompanied by a biting satirical caption.",
      "whenToUse": "Use when referring specifically to a satirical political or social illustration created for news publications and opinion pages (e.g., 'Pulitzer-winning editorial cartoon', 'publish an editorial cartoon', 'the newspaper's syndicated editorial cartoon').",
      "whenNotToUse": "Do not use for animated television shows or children's movies (those are 'animated cartoons' or 'animations'). Do not use for humorous Sunday comics or superhero strips (which are 'comic strips' or 'graphic novels'). Do not use for commercial product advertisements.",
      "culturalContext": "In English-speaking democracies, editorial cartoons enjoy robust free speech protections and play a central role in civic discourse. From Benjamin Franklin's 'Join, or Die' (1754) to modern commentary on artificial intelligence and climate change, editorial cartoons distill complex political debate into immediate emotional and visual impact."
    },
    "examples": {
      "daily": [
        "My grandfather always turns straight to the op-ed page every morning to see the latest editorial cartoon about the election.",
        "The local newspaper ran a humorous editorial cartoon satirizing the city council's endless delays in repairing potholes.",
        "The high school newspaper staff invited a veteran political illustrator to explain how he drafts an editorial cartoon under a daily deadline."
      ],
      "business": [
        "The financial daily published a biting editorial cartoon depicting the technology merger as an oversized juggernaut consuming small startups.",
        "Following the corporate tax debate, several prominent editorial cartoons critiquing executive compensation were circulated widely across social media.",
        "The public relations firm analyzed several syndicated editorial cartoons to gauge media sentiment toward the proposed telecommunications antitrust legislation."
      ],
      "conversation": [
        "A: 'Did you see today's editorial cartoon in the morning edition?'\nB: 'Yes, the caricature of the central bank chairman juggling interest rates was brilliant and spot-on.'",
        "A: 'Why did the editor reject that submission for the Sunday opinion section?'\nB: 'The message of the editorial cartoon was too ambiguous; it didn't clearly communicate a distinct viewpoint on the healthcare bill.'"
      ],
      "collocations": [
        "syndicated editorial cartoon",
        "Pulitzer Prize for editorial cartooning",
        "award-winning editorial cartoon",
        "publish an editorial cartoon",
        "editorial cartoon on the op-ed page",
        "satirical editorial cartoon"
      ]
    },
    "wordFamily": {
      "noun": "editorial cartoon, editorial cartoonist, editorial cartooning",
      "verb": "",
      "adjective": "editorial",
      "adverb": "editorially"
    },
    "visual": {
      "imageKeyword": "editorial cartoon newspaper op-ed page political satire illustration drawing",
      "imageDescription": "A newspaper open to the opinion and editorial section, featuring a bold, ink-drawn single-panel editorial cartoon satirizing economic legislation next to printed editorial columns.",
      "mnemonic": "EDITORIAL CARTOON: A CARTOON that belongs right on the EDITORIAL page, delivering serious political commentary with an artist's satirical pen!"
    },
    "video": {
      "description": "A behind-the-scenes newsroom documentary profiling a Pulitzer Prize-winning editorial cartoonist as she sketches caricatures on a digital tablet, brainstorms metaphors with opinion editors, and discusses the role of visual satire in public discourse."
    },
    "toeicContext": {
      "commonParts": [
        5,
        6,
        7
      ],
      "exampleQuestion": "The metropolitan journal is accepting applications from talented illustrators wishing to contribute a weekly _____ to the weekend opinion section.\n(A) editorial cartoon\n(B) editorially cartoon\n(C) cartoonish editorial\n(D) cartoon editorialist",
      "tips": "In TOEIC Part 5, test-takers must select the exact compound noun phrase that fulfills the grammatical and semantic requirements of the direct object. Preceded by the indefinite article 'a' and the adjective 'weekly', the blank requires a singular countable noun phrase: (A) 'editorial cartoon'. Choice (B) 'editorially cartoon' improperly pairs an adverb with a noun; Choice (C) 'cartoonish editorial' turns 'editorial' into the head noun with an informal adjective meaning silly or childish, which does not fit an illustrator's contribution; and Choice (D) 'cartoon editorialist' describes the human writer rather than the artwork submitted."
    },
    "synonyms": [
      "political cartoon",
      "satirical cartoon",
      "op-ed cartoon",
      "press cartoon",
      "editorial caricature",
      "gag cartoon"
    ],
    "antonyms": [],
    "relatedWords": [
      "op-ed page",
      "satire",
      "caricature",
      "syndication",
      "Pulitzer Prize",
      "opinion column",
      "illustrator"
    ]
  }
]

payload = {"words": words}

with open("scratch/comms_279_281.json", "w", encoding="utf-8") as f:
    json.dump(payload, f, indent=2, ensure_ascii=False)

print("Saved scratch/comms_279_281.json")
