import json
import jsonschema

# Load schema from scripts/process_words.py
with open('scripts/process_words.py') as f:
    code = f.read()

schema_str = code[code.find('SCHEMA ='):code.find('BASE_PROMPT =')].strip()
ldict = {}
exec(schema_str, globals(), ldict)
schema = ldict['SCHEMA']

words = [
  {
    "id": "comms-235",
    "word": "speech",
    "partOfSpeech": [
      "noun"
    ],
    "category": "communications",
    "level": "essential",
    "toeicFrequency": 9,
    "pronunciation": {
      "ipa": "/spiːtʃ/",
      "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/speech--_us_1.mp3",
      "syllableBreakdown": "speech",
      "stressPattern": "single syllable, primary stress (SPEECH)",
      "commonMistakes": "Learners often shorten the tense long vowel /iː/ to a lax /ɪ/ (sounding closer to 'spitch'), or fail to articulate the affricate /tʃ/ crisply, softening it into a fricative /ʃ/ ('speesh'). Non-native speakers also frequently make the grammatical mistake of treating 'speech' as always uncountable or confusing 'give/deliver a speech' with 'make a talk' or 'do a speech'."
    },
    "etymology": {
      "origin": "Old English 'sprǣc' / 'spǣc' (act of speaking, discourse, language), from Proto-Germanic '*sprēkō' (speech), derived from the Proto-Indo-European root '*spreg-' (to speak, chatter). Cognate with Old Frisian 'spreke', Old Saxon 'sprāka', Middle Dutch 'sprāke' (modern Dutch 'spraak'), and Old High German 'sprāhha' (modern German 'Sprache'). The loss of the 'r' after 'p' occurred in late Old English.",
      "rootWord": "Proto-Germanic '*sprēkō' / Old English 'spǣc' (derived from the verb 'sprecan' / 'specan', to speak)",
      "rootMeaning": "'The faculty or act of uttering articulated sounds; oral address or discourse directed to an audience'",
      "evolution": "In Old English (pre-1100), 'spǣc' referred both to the human physiological faculty of speaking and to a formal spoken utterance or conference. During the Middle English period (as 'speche'), it expanded to encompass the dialect, vocabulary, or idiom of a particular people. By the early modern period, the term specifically designated an organized formal oral presentation delivered before an assembled assembly or public body. In modern corporate and diplomatic English, it denotes formal keynote addresses, acceptance remarks, ceremonial remarks, and shareholder meeting presentations.",
      "relatedLanguages": [
        "German: Sprache (language, speech) / Rede (formal address)",
        "Dutch: spraak (speech faculty) / toespraak (formal address)",
        "French: discours (formal address) / parole (spoken word)",
        "Spanish: discurso (formal address) / habla (speech faculty)",
        "Italian: discorso (formal address) / favella (speech faculty)"
      ],
      "firstRecordedUse": "Before 900 (Old English 'spǣc' in 'Cura Pastoralis' and 'Beowulf')"
    },
    "deepMeaning": {
      "coreConcept": "A formal spoken address delivered to an assembled audience to inform, persuade, honor, or inspire; also the biological faculty or linguistic act of expressing thoughts through articulated vocal sounds.",
      "spatialContext": "Auditoriums, convention center plenary halls, elevated stages behind lecterns equipped with microphones, banquet halls, boardrooms, and ceremonial reception dais.",
      "temporalContext": "Delivered during opening ceremonies, annual general meetings (AGMs), retirement banquets, keynote time-slots, award galas, and press conferences, typically lasting between 5 to 45 minutes.",
      "emotionalTone": "Oratorical, inspiring, authoritative, structured, and persuasive.",
      "formalityLevel": "formal",
      "connotation": "positive"
    },
    "nativeMindset": {
      "howNativesThink": "To native speakers, 'speech' immediately evokes a formal, prepared oral presentation delivered to a gathered audience. Unlike informal 'chats', 'discussions', or everyday 'conversations', a speech implies a designated speaker standing before an attentive listening audience, often at a lectern with notes or a teleprompter. Native speakers instinctively pair it with collocations like 'give a speech', 'deliver a speech', or 'make a speech' (never '*do a speech*'). When used uncountably ('freedom of speech', 'loss of speech'), it refers to the human vocal capability or legal right of verbal expression.",
      "mentalImage": "A chief executive officer in business attire standing at a polished wooden lectern on an auditorium stage, gesturing toward an audience while speaking into a gooseneck microphone with slides displayed on an immense projection screen behind her.",
      "whenToUse": "Use when referring to a structured formal address presented to a gathering (e.g., 'keynote speech', 'acceptance speech', 'opening speech', 'retirement speech'), or the faculty/manner of speaking (e.g., 'speech impediment', 'freedom of speech', 'part of speech').",
      "whenNotToUse": "Do not use for informal, interactive exchanges between people (use 'conversation', 'chat', or 'talk'), interactive question-and-answer exchanges (use 'discussion' or 'Q&A session'), or purely written declarations (use 'statement' or 'press release'). Also avoid saying '*do a speech*'—always use 'give', 'deliver', or 'make'.",
      "culturalContext": "In Anglo-American business culture, the ability to deliver a compelling, articulate speech is considered an indispensable leadership trait. At corporate galas, trade conferences, and retirement dinners, short speeches ('remarks') are customary rituals used to recognize milestones, build consensus, and inspire teams."
    },
    "examples": {
      "daily": [
        "The maid of honor gave an emotional speech that brought tears to the bride's eyes at the wedding reception.",
        "Children with articulation difficulties often benefit significantly from weekly sessions with a speech therapist.",
        "He practiced his five-minute graduation speech in front of the bedroom mirror until he had memorized every transition."
      ],
      "business": [
        "During her keynote speech at the annual energy expo, the chief technology officer unveiled the company's net-zero roadmap.",
        "The board chairperson delivered a concise opening speech welcoming international delegates to the global headquarters.",
        "Following the chief executive's retirement speech, senior directors presented him with an inscribed silver service plaque."
      ],
      "conversation": [
        "A: \"Are you ready for your presentation at tomorrow's regional sales conference?\"\nB: \"I've finalized my slides, but I still need to rehearse my opening speech so I don't exceed the fifteen-minute limit.\"",
        "A: \"Did you hear the keynote speech by Dr. Albright this morning?\"\nB: \"Yes, her analysis of artificial intelligence in supply-chain management was remarkably insightful.\""
      ],
      "collocations": [
        "deliver a speech",
        "keynote speech",
        "opening speech",
        "acceptance speech",
        "impromptu speech",
        "freedom of speech"
      ]
    },
    "wordFamily": {
      "noun": "speech, speaker, speechlessness, speechwriter",
      "verb": "speak",
      "adjective": "speechless, spoken",
      "adverb": "speechlessly"
    },
    "visual": {
      "imageKeyword": "executive keynote speech auditorium stage microphone presentation",
      "imageDescription": "A poised businesswoman speaking from behind a modern glass lectern on an illuminated stage, facing a large corporate auditorium with audience silhouettes visible in the foreground.",
      "mnemonic": "When you deliver a SPEECH, you REACH an audience by SPEAKING with poise and conviction."
    },
    "video": {
      "description": "A masterclass video recording of an executive communications coach analyzing rhetorical techniques, vocal pacing, and body language during a memorable corporate conference keynote speech."
    },
    "toeicContext": {
      "commonParts": [
        1,
        2,
        4,
        7
      ],
      "exampleQuestion": "Mr. Henderson received a standing ovation from the audience after delivering an inspiring _____ on sustainable manufacturing practices.\n(A) speech\n(B) speak\n(C) speaker\n(D) spoken",
      "tips": "In TOEIC Part 5, test writers frequently test the collocation 'deliver a [noun]'. Following the transitive participle 'delivering' and the indefinite article + adjective 'an inspiring', a singular countable noun representing the message or address is required. (A) 'speech' is the correct communicative noun. (C) 'speaker' is a person, which would create a nonsensical statement ('delivering an inspiring person'). (B) is a verb and (D) is a past participle."
    },
    "synonyms": [
      "address",
      "oration",
      "keynote",
      "presentation",
      "discourse",
      "remarks"
    ],
    "antonyms": [
      "silence",
      "muteness",
      "speechlessness",
      "taciturnity"
    ],
    "relatedWords": [
      "lectern",
      "teleprompter",
      "audience",
      "orator",
      "keynote",
      "rhetoric",
      "elocution"
    ]
  },
  {
    "id": "comms-236",
    "word": "sponsor",
    "partOfSpeech": [
      "noun"
    ],
    "category": "communications",
    "level": "intermediate",
    "toeicFrequency": 8,
    "pronunciation": {
      "ipa": "/ˈspɑːn.sɚ/",
      "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/sponsor--_us_1.mp3",
      "syllableBreakdown": "spon-sor",
      "stressPattern": "primary stress on the first syllable (SPON-sor)",
      "commonMistakes": "Learners often place stress on the second syllable (*spon-SOR*), mispronounce the second syllable as a rhyming syllable with 'door' (/*spɑːn.sɔːr*/), or confuse the noun 'sponsor' (the person/organization providing backing) with 'sponsorship' (the abstract commercial arrangement or financial backing itself). In writing, learners sometimes misspell it as '*sponser*'."
    },
    "etymology": {
      "origin": "Directly borrowed from Latin 'sponsor' (a surety, bondsman, guarantor, one who assumes responsibility for another), an agent noun formed from the verb 'spondere' (to pledge solemnly, vow, betroth, promise), from Proto-Indo-European root '*spend-' (to make an offering, perform a rite). Entered English in the 17th century originally in an ecclesiastical sense as a godparent at baptism.",
      "rootWord": "Latin 'spondere' (to pledge, guarantee, promise solemnly) + agent suffix '-or'",
      "rootMeaning": "'One who pledges solemnly or assumes financial, legal, or moral responsibility for another'",
      "evolution": "In mid-17th-century English, 'sponsor' referred specifically to a baptismal godfather or godmother who made solemn vows on behalf of an infant. In the late 18th century, it expanded to parliamentary contexts denoting a legislator who formally introduces a bill. By 1931, with the dawn of commercial radio and television broadcasting, American advertisers who paid for broadcasting airtime in exchange for brand mentions were dubbed 'sponsors'. Today, it encompasses corporate underwriters of sports events, cultural exhibitions, academic research, and charitable marathons, as well as executive champions of internal corporate projects.",
      "relatedLanguages": [
        "Latin: sponsor (surety, guarantor)",
        "French: sponsor / parrain (commercial or personal backer)",
        "Spanish: patrocinador / espónsor (patron, financial sponsor)",
        "Italian: sponsor / patrocinatore (commercial backer)",
        "German: Sponsor / Förderer (patron, corporate backer)"
      ],
      "firstRecordedUse": "1651 (ecclesiastical baptismal surety); 1931 (commercial radio broadcast advertiser)"
    },
    "deepMeaning": {
      "coreConcept": "An individual, corporation, or institution that finances, underwrites, or champions an event, broadcast, candidate, athlete, or project, typically in return for commercial visibility, public goodwill, advertising rights, or strategic advocacy.",
      "spatialContext": "Banner signage and digital backdrop boards at sporting stadiums, logos on conference convention lanyards and exhibition booths, broadcast commercial bumpers, and executive boardrooms.",
      "temporalContext": "Contracted months prior to annual trade expos, sports tournaments, corporate fundraising galas, or broadcast seasonal schedules.",
      "emotionalTone": "Beneficent, strategic, professional, commercial, and collaborative.",
      "formalityLevel": "neutral",
      "connotation": "positive"
    },
    "nativeMindset": {
      "howNativesThink": "To a native speaker, a 'sponsor' is fundamentally a backer who provides vital resources—usually funding—in exchange for public recognition or brand association. In modern corporate settings, native speakers distinguish between an 'event/broadcast sponsor' (a company buying marketing exposure at an expo or sports match), an 'executive sponsor' (a senior executive who champions and secures resources for an internal project), and an 'immigrant/visa sponsor' (an employer or citizen legally vouching for a foreign worker or applicant). It carries connotations of credibility and financial capability.",
      "mentalImage": "The high-gloss step-and-repeat banner at a technology summit entrance, where the prominent logos of primary corporate sponsors—a global telecom provider, an enterprise cloud host, and an investment bank—are prominently displayed behind arriving attendees.",
      "whenToUse": "Use when identifying a company or person that provides financial backing for an event, broadcast program, sports team, or charity (e.g., 'title sponsor', 'official corporate sponsor', 'lead sponsor'), or a senior leader championing an organizational initiative ('project sponsor', 'executive sponsor').",
      "whenNotToUse": "Do not use when referring to the financial support program or contract itself (use 'sponsorship'), a generic non-paying supporter or fan (use 'supporter' or 'patron'), or someone providing technical work rather than funding (use 'partner' or 'contractor').",
      "culturalContext": "Corporate sponsorship is a multi-billion-dollar marketing pillar in English-speaking nations. Events like major international trade symposiums and athletic championships rely on tiered sponsorships ('platinum', 'gold', 'silver'). Companies weigh return on investment (ROI) through brand impressions and media value generated by their status as an official sponsor."
    },
    "examples": {
      "daily": [
        "Local businesses agreed to act as the primary sponsors for the high school charity 5K run.",
        "The children's science fair secured an electronics retailer as its title sponsor, covering all venue fees and trophy costs.",
        "Every runner wore a racing bib displaying the logos of community sponsors across the front."
      ],
      "business": [
        "As the lead sponsor of the international renewable energy expo, our company secured prominent branding on all keynote stage banners.",
        "The project manager met with the executive sponsor to seek formal budget approval before entering phase two of the software rollout.",
        "Broadcast networks announced that a multinational automaker signed on as the primary sponsor for the upcoming championship series."
      ],
      "conversation": [
        "A: \"Have we found a corporate sponsor for next month's regional healthcare summit yet?\"\nB: \"Yes, Apex Pharmaceuticals agreed to be our premier sponsor in exchange for hosting the opening breakfast.\"",
        "A: \"Why was the enterprise software migration put on hold?\"\nB: \"Our executive sponsor transferred to the London division, so we need to secure backing from another vice president before proceeding.\""
      ],
      "collocations": [
        "official sponsor",
        "corporate sponsor",
        "lead sponsor",
        "executive sponsor",
        "title sponsor",
        "financial sponsor"
      ]
    },
    "wordFamily": {
      "noun": "sponsor, sponsorship",
      "verb": "sponsor",
      "adjective": "sponsored",
      "adverb": ""
    },
    "visual": {
      "imageKeyword": "corporate sponsor logos conference banner backdrop exhibition",
      "imageDescription": "A VIP reception press wall featuring alternating logos of prominent corporate sponsors cleanly illuminated by studio spotlights as conference executives shake hands.",
      "mnemonic": "A SPONSOR SPENDS money because they RESPOND to your project with support (from Latin spondere = to pledge/promise)."
    },
    "video": {
      "description": "A documentary excerpt highlighting how corporate sponsors evaluate brand visibility, stadium naming rights, and attendee demographic alignment before signing multi-million-dollar endorsement agreements."
    },
    "toeicContext": {
      "commonParts": [
        3,
        4,
        7
      ],
      "exampleQuestion": "OmniTech Solutions has agreed to serve as the official corporate _____ for the annual International Logistics Expo in Singapore.\n(A) sponsor\n(B) sponsorship\n(C) sponsored\n(D) sponsoring",
      "tips": "In TOEIC Part 5 and 7, test makers regularly exploit the difference between 'sponsor' (the person or company providing backing) and 'sponsorship' (the abstract concept, program, or commercial grant). Following 'serve as the official corporate [noun]', the context demands an entity that can perform an active role, which is the entity 'sponsor' (A). 'Sponsorship' (B) would denote the abstract funding agreement rather than the organization serving in that capacity. (C) is a past participle and (D) is a present participle."
    },
    "synonyms": [
      "underwriter",
      "backer",
      "benefactor",
      "patron",
      "promoter",
      "guarantor"
    ],
    "antonyms": [
      "opponent",
      "critic",
      "detractor",
      "adversary"
    ],
    "relatedWords": [
      "sponsorship",
      "underwrite",
      "endorsement",
      "philanthropy",
      "branding",
      "beneficiary",
      "stakeholder"
    ]
  },
  {
    "id": "comms-237",
    "word": "sponsorship",
    "partOfSpeech": [
      "noun"
    ],
    "category": "communications",
    "level": "advanced",
    "toeicFrequency": 7,
    "pronunciation": {
      "ipa": "/ˈspɑːn.sɚ.ʃɪp/",
      "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/sponsorship--_us_1.mp3",
      "syllableBreakdown": "spon-sor-ship",
      "stressPattern": "primary stress on the first syllable (SPON-sor-ship)",
      "commonMistakes": "Learners often place stress incorrectly on the suffix or middle syllable (*spon-SOR-ship*), fail to reduce the unstressed middle vowel to /ɚ/ (or /ə/), or substitute the unvoiced /ʃ/ in '-ship' with /s/ or /tʃ/. Grammatically, learners frequently use 'sponsorship' when referring to the individual or company backer instead of 'sponsor'."
    },
    "etymology": {
      "origin": "Formed in English by combining the noun 'sponsor' (from Latin 'sponsor', a guarantor, from 'spondere' meaning to pledge) with the Old English abstract noun suffix '-ship' (from Proto-Germanic '*-skapiz', denoting state, condition, quality, or office, cognate with German '-schaft' and Dutch '-schap').",
      "rootWord": "Latin 'sponsor' (pledger, guarantor) + Old English '-scipe' / '-ship' (condition, status, or office)",
      "rootMeaning": "'The state, role, office, or contractual arrangement of being a sponsor; financial or promotional support provided to an enterprise'",
      "evolution": "First attested in the early 19th century (circa 1836) to describe the ecclesiastical or legal status of acting as a godfather or surety. By the mid-20th century, as commercial advertising matured across broadcast radio, television, and sports leagues, 'sponsorship' evolved into a primary commercial term for contractual funding agreements, marketing partnerships, and corporate philanthropic programs. In contemporary business, it represents a strategic marketing discipline encompassing brand equity, naming rights, and ESG corporate giving.",
      "relatedLanguages": [
        "French: parrainage / sponsoring",
        "Spanish: patrocinio",
        "Italian: patrocinio / sponsorizzazione",
        "German: Sponsoring / Patenschaft",
        "Dutch: sponsoring / peterschap"
      ],
      "firstRecordedUse": "Circa 1836 (status of a sponsor); mid-20th century (commercial marketing agreement)"
    },
    "deepMeaning": {
      "coreConcept": "The financial, material, or promotional backing provided by an organization or benefactor to support an event, person, or activity in exchange for advertising visibility, brand association, or strategic goodwill; also the contractual relationship or state of being a sponsor.",
      "spatialContext": "Corporate marketing departments, sponsorship marketing agencies, legal contract negotiations, sports arena naming decks, and VIP exhibition hospitality suites.",
      "temporalContext": "Negotiated through multi-year contracts, annual fiscal marketing budget cycles, or quarterly event planning timelines.",
      "emotionalTone": "Strategic, commercial, collaborative, and professional.",
      "formalityLevel": "formal",
      "connotation": "positive"
    },
    "nativeMindset": {
      "howNativesThink": "Native speakers view 'sponsorship' not simply as charity or a donation, but as a reciprocal business transaction. A company provides capital, equipment, or services, and in return, expects measurable marketing return: brand impressions, executive networking opportunities, premium hospitality booths, or consumer goodwill. When discussing career development or immigration, 'sponsorship' also refers to formal organizational backing (e.g., 'corporate visa sponsorship' or an executive actively advocating for an employee's promotion within senior leadership).",
      "mentalImage": "Two marketing directors reviewing a glossy sponsorship prospectus folder at a conference table, evaluating tier options labeled Platinum, Gold, and Silver, and cross-referencing projected audience demographics with estimated logo impression metrics.",
      "whenToUse": "Use when referring to the commercial agreement, funding arrangement, or status of being supported by a sponsor (e.g., 'seek corporate sponsorship', 'sponsorship package', 'sponsorship agreement', 'renew our sponsorship'). Also use in employment contexts (e.g., 'visa sponsorship').",
      "whenNotToUse": "Do not use when referring to the actual organization, corporation, or person providing the money (use 'sponsor'—e.g., say 'Nike is the sponsor', NOT '*Nike is the sponsorship*'). Do not confuse with an unreciprocated philanthropic grant or tax-deductible gift without marketing benefits (use 'charitable donation' or 'philanthropic grant').",
      "culturalContext": "In North American and global enterprise strategy, sponsorship marketing is a multi-billion-dollar industry distinct from standard advertising. Organizations create comprehensive 'sponsorship decks' that outline quantifiable deliverables such as social media mentions, logo placement dimensions, and complimentary VIP tickets."
    },
    "examples": {
      "daily": [
        "The youth soccer league was able to purchase new uniforms and practice equipment thanks to local business sponsorship.",
        "Her ambitious trek across the polar ice cap was made possible through gear sponsorship from an outdoor apparel brand.",
        "We sent dozens of sponsorship inquiry letters to neighborhood cafes to help fund the community garden festival."
      ],
      "business": [
        "The marketing committee reviewed the updated sponsorship tiers before pitching corporate packages to potential industry partners.",
        "Due to a reduction in advertising expenditure, the telecommunications firm decided not to renew its title sponsorship of the tennis tournament.",
        "Our company provides visa sponsorship for highly skilled software engineers relocating to our North American engineering hub."
      ],
      "conversation": [
        "A: \"Has the conference committee secured enough funding to cover the keynote speaker fees?\"\nB: \"Yes, we just finalized a fifty-thousand-dollar sponsorship deal with a major tech corporation.\"",
        "A: \"Does the job posting mention whether the firm offers visa sponsorship?\"\nB: \"Unfortunately, it specifies that candidates must already have independent permanent work authorization.\""
      ],
      "collocations": [
        "corporate sponsorship",
        "sponsorship agreement",
        "sponsorship package",
        "sponsorship deal",
        "seek sponsorship",
        "visa sponsorship"
      ]
    },
    "wordFamily": {
      "noun": "sponsorship, sponsor",
      "verb": "sponsor",
      "adjective": "sponsored",
      "adverb": ""
    },
    "visual": {
      "imageKeyword": "sponsorship package contract presentation meeting corporate branding",
      "imageDescription": "A marketing executive presenting a color-coded corporate sponsorship deck on a conference room monitor to prospective commercial partners seated around an oak boardroom table.",
      "mnemonic": "SPONSOR + SHIP: Picture a giant SHIP funded entirely by corporate SPONSORS displaying their brand banners as it sails."
    },
    "video": {
      "description": "A corporate seminar on sponsorship acquisition strategies explaining how event organizers build compelling sponsorship decks, quantify media value, and pitch corporate brand managers."
    },
    "toeicContext": {
      "commonParts": [
        5,
        6,
        7
      ],
      "exampleQuestion": "Without the generous financial _____ of several multinational corporations, hosting the global environmental summit would not have been feasible.\n(A) sponsor\n(B) sponsorship\n(C) sponsored\n(D) sponsorable",
      "tips": "In TOEIC Part 5, test takers must distinguish between the agent noun 'sponsor' (the company/person) and the abstract noun 'sponsorship' (the financial backing or support). Following the modifier 'generous financial', the sentence describes the funding or assistance received, not the people or companies themselves. Therefore, 'sponsorship' (B) is the accurate abstract noun. 'Sponsor' (A) would not make grammatical sense with 'financial' in this context."
    },
    "synonyms": [
      "financial backing",
      "patronage",
      "underwriting",
      "subvention",
      "endorsement",
      "funding"
    ],
    "antonyms": [
      "divestment",
      "boycott",
      "defunding",
      "disinvestment"
    ],
    "relatedWords": [
      "prospectus",
      "branding",
      "ROI",
      "naming rights",
      "underwriter",
      "commercial partner",
      "activation"
    ]
  },
  {
    "id": "comms-238",
    "word": "statement",
    "partOfSpeech": [
      "noun"
    ],
    "category": "communications",
    "level": "intermediate",
    "toeicFrequency": 8,
    "pronunciation": {
      "ipa": "/ˈsteɪt.mənt/",
      "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/statement--_us_1.mp3",
      "syllableBreakdown": "state-ment",
      "stressPattern": "primary stress on the first syllable (STATE-ment)",
      "commonMistakes": "Learners often articulate the silent 'e' in 'state' by attempting an extra vowel sound, or fail to reduce the suffix '-ment' to a schwa /mənt/, pronouncing it with a full front vowel /-mɛnt/. In business contexts, learners often confuse a public/media 'statement' (an official PR declaration) with an accounting 'statement' (a financial report, e.g., bank statement or income statement) or an invoice."
    },
    "etymology": {
      "origin": "Formed in Early Modern English by combining the verb 'state' (to declare, set forth formally, from Old French 'estat' and Latin 'status' meaning condition, position, manner of standing, from 'stare' to stand) with the Old French/Latin noun suffix '-ment' (denoting the concrete result, instrument, or act of an action).",
      "rootWord": "Latin 'status' (standing, condition) / 'stare' (to stand) via English 'state' (verb, to declare formally) + suffix '-ment'",
      "rootMeaning": "'That which is stated or set down firmly; a formal written or oral declaration setting forth facts, opinions, or accounts'",
      "evolution": "The base verb 'state' emerged in the late 16th century meaning 'to place or set down in position', soon evolving into 'to set forth in formal words'. 'Statement' was coined in the late 18th century (circa 1775–1785) to mean 'the act of stating' or 'a formal recitation of facts'. By the early 19th century, it was adopted into financial bookkeeping to designate a written summary of debits, credits, and account balances ('bank statement', 'financial statement'). In mid-20th-century mass media and public relations, it became the standard term for an official written announcement released to journalists to clarify a corporate stance or respond to a crisis.",
      "relatedLanguages": [
        "French: déclaration (public/media) / relevé (financial)",
        "Spanish: declaración / comunicado (public/media) / extracto (financial)",
        "Italian: dichiarazione / comunicato (public/media) / estratto conto (financial)",
        "German: Erklärung / Mitteilung (public/media) / Kontoauszug (financial)",
        "Dutch: verklaring / mededeling (public/media) / rekeningoverzicht (financial)"
      ],
      "firstRecordedUse": "1775–1785 (formal spoken or written declaration); 1800s (financial accounting report)"
    },
    "deepMeaning": {
      "coreConcept": "A clear, definite, and authoritative expression of fact, opinion, or policy made in speech or writing (such as an official press release); also an official itemized document summarizing financial transactions and account balances over a designated period.",
      "spatialContext": "Corporate PR pressrooms, media briefing lecterns, legal deposition chambers, financial accounting departments, and online banking customer portals.",
      "temporalContext": "Issued promptly following quarterly earnings releases, crisis events, regulatory audits, or dispatched on monthly billing cycles.",
      "emotionalTone": "Authoritative, objective, measured, precise, and transparent.",
      "formalityLevel": "formal",
      "connotation": "neutral"
    },
    "nativeMindset": {
      "howNativesThink": "To native speakers, 'statement' has two dominant, distinct meanings depending on context: (1) In public communications, a statement is a legally vetted, formal declaration given to media outlets ('issue an official statement') to establish the record without inviting uncontrolled follow-up questions. (2) In commerce and banking, a statement is an itemized record of transactions over time ('monthly bank statement', 'billing statement'). Colloquially, native speakers also say 'make a statement' when something bold is done to convey confidence or style (e.g., 'her bold architectural design made a statement').",
      "mentalImage": "A framed company letterhead document bearing the signature of the chief legal officer and corporate spokesperson, distributed to a pack of press journalists waiting in a media briefing room.",
      "whenToUse": "Use when referring to an official spoken or written declaration released to the public or press (e.g., 'issue a statement', 'joint statement', 'prepared statement'), an itemized financial or billing summary (e.g., 'bank statement', 'financial statement', 'billing statement'), or a formal proposition in logic/law (e.g., 'sworn statement').",
      "whenNotToUse": "Do not confuse with an interactive spoken speech (use 'speech' or 'address'), an informal conversation (use 'remarks' or 'comments'), or an upfront request for payment (use 'invoice' or 'bill', though a billing statement summarizes multiple invoices).",
      "culturalContext": "In corporate crisis management, issuing a 'prepared statement' is a strategic tactic used to control public narrative and minimize legal liability. In the TOEIC exam, 'statement' is one of the most versatile nouns, frequently appearing in banking passages ('monthly bank statement') as well as business news articles and press announcements ('the spokesperson released a statement')."
    },
    "examples": {
      "daily": [
        "I logged into my online banking app to download a PDF of my monthly credit card statement.",
        "The police officer asked the eyewitness to review and sign her written statement regarding the traffic accident.",
        "Painting the front door bright yellow was a creative choice that made a cheerful statement in the neighborhood."
      ],
      "business": [
        "The chief executive issued an official statement addressing media inquiries regarding the proposed corporate merger.",
        "Our accounting team compiles the quarterly financial statements in strict accordance with international reporting standards.",
        "The human resources department released a joint statement emphasizing the organization's commitment to workplace safety."
      ],
      "conversation": [
        "A: \"Has the airline commented on the flight delays caused by the IT system outage?\"\nB: \"Yes, their communications director just issued a formal statement apologizing to affected passengers.\"",
        "A: \"Could you email me the bank statement from September for the expense audit?\"\nB: \"Sure, I'll export the transaction record from our accounting portal right away.\""
      ],
      "collocations": [
        "issue a statement",
        "official statement",
        "financial statement",
        "bank statement",
        "joint statement",
        "prepared statement"
      ]
    },
    "wordFamily": {
      "noun": "statement, misstatement, understatement, overstatement",
      "verb": "state",
      "adjective": "stated, understated, overstated",
      "adverb": ""
    },
    "visual": {
      "imageKeyword": "official statement press release document microphone lectern",
      "imageDescription": "A formal corporate press statement printed on crisp embossed stationery resting on a wooden lectern beside a bank of broadcast microphones.",
      "mnemonic": "When you STATE facts clearly, the result is an official STATE-MENT."
    },
    "video": {
      "description": "A crisis communications training video demonstrating how corporate spokespersons craft, refine, and deliver a concise public statement to broadcast journalists during an operational recall."
    },
    "toeicContext": {
      "commonParts": [
        3,
        4,
        5,
        7
      ],
      "exampleQuestion": "The board of directors is scheduled to release an official _____ regarding the acquisition of Apex Logistics early tomorrow morning.\n(A) state\n(B) statement\n(C) stating\n(D) statable",
      "tips": "In TOEIC Part 5, recognizing standard collocations like 'issue / release an official statement' is vital. Following the transitive verb 'release' and the compound modifier 'an official', the blank requires a singular countable noun denoting a formal announcement. (B) 'statement' is the correct corporate communication noun. (A) is a verb or adjective/noun referring to a condition/territory, (C) is a participle/gerund, and (D) is an adjective."
    },
    "synonyms": [
      "announcement",
      "declaration",
      "communique",
      "press release",
      "proclamation",
      "account"
    ],
    "antonyms": [
      "silence",
      "retraction",
      "concealment",
      "denial"
    ],
    "relatedWords": [
      "press release",
      "spokesperson",
      "bank statement",
      "financial statement",
      "disclosure",
      "accounting",
      "briefing"
    ]
  }
]

# Validate schema
jsonschema.validate(instance={"words": words}, schema=schema)
print("Schema validation PASSED!")

with open("scratch/comms_235_238.json", "w", encoding="utf-8") as f:
    json.dump({"words": words}, f, indent=2, ensure_ascii=False)
print("Saved to scratch/comms_235_238.json")
