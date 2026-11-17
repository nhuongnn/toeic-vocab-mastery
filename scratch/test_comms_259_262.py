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
    "id": "comms-259",
    "word": "video",
    "partOfSpeech": [
      "noun"
    ],
    "category": "communications",
    "level": "essential",
    "toeicFrequency": 9,
    "pronunciation": {
      "ipa": "/ˈvɪd.i.oʊ/",
      "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/video--_us_1.mp3",
      "syllableBreakdown": "vid-e-o",
      "stressPattern": "primary stress on the first syllable (VID-e-o)",
      "commonMistakes": "Learners frequently mispronounce the short front lax vowel /ɪ/ as a tense /iː/ (*vee-deo*), or blur the middle unstressed /i/ and final /oʊ/ into an indistinct monophthong. Additionally, non-native speakers whose native languages lack a distinct labiodental fricative sometimes substitute /v/ with a voiced bilabial stop /b/ or bilabial approximant /w/ (*bideo* or *wideo*)."
    },
    "etymology": {
      "origin": "Formed in the 1930s directly from the Latin first-person singular present indicative verb 'video' (meaning 'I see'), by direct morphological analogy with the earlier broadcast term 'audio' (Latin for 'I hear'), tracing to Proto-Indo-European *weyd- ('to see, to know').",
      "rootWord": "Latin 'vidēre' (to see, perceive, behold; 1st person singular 'video' = 'I see'), cognate with Ancient Greek 'idein' (to see) and Sanskrit 'veda' (knowledge).",
      "rootMeaning": "'I see' (created to serve as the visual counterpart to 'audio' = 'I hear')",
      "evolution": "Originally coined in the mid-1930s by radio and television engineers as an adjective describing the transmission or reception of televised imagery (in contrast to audio). By the 1950s, with the invention of magnetic videotape recording, it became an independent noun referring to recorded moving picture signals. The 1970s and 1980s videocassette boom (VHS and Betamax) transformed 'video' into a universal consumer entertainment term. In the 21st century, with high-definition digital encoding, high-speed broadband, and mobile streaming platforms, 'video' broadened to encompass all digital motion-picture content, corporate webcasts, instructional clips, and promotional media.",
      "relatedLanguages": [
        "French: vidéo",
        "Spanish: video / vídeo",
        "Italian: video",
        "German: Video",
        "Portuguese: vídeo"
      ],
      "firstRecordedUse": "circa 1937 (as a technical engineering adjective; early 1950s as a noun for recorded moving pictures)"
    },
    "deepMeaning": {
      "coreConcept": "An electronic medium and digital visual recording format comprising a synchronized sequence of moving photographic frames, typically paired with audio, used for recording, broadcasting, streaming, demonstrating, or archiving visual information.",
      "spatialContext": "Corporate multimedia production suites, digital editing bays, corporate learning management portals, digital marketing dashboards, and conference hall presentation screens.",
      "temporalContext": "Produced during structured production timelines (scripting, filming, post-production editing); distributed on-demand via streaming networks or broadcast live during corporate town halls.",
      "emotionalTone": "Informative, visually dynamic, engaging, and modern.",
      "formalityLevel": "neutral",
      "connotation": "neutral"
    },
    "nativeMindset": {
      "howNativesThink": "To a native speaker, 'video' immediately triggers the cognitive concept of moving picture content displayed on a screen (computer monitor, mobile device, television, or presentation projector), distinct from still photography ('photo') or pure sound ('audio'). In corporate settings, hearing 'video' evokes professional communications collateral: an instructional onboarding module, an executive quarterly address, an animated product walkthrough, or a customer testimonial clip.",
      "mentalImage": "A video production editor working in a media suite with two wide monitors, adjusting color grading timelines and scrubbing through high-definition footage of an executive delivering an annual keynote before a branded corporate backdrop.",
      "whenToUse": "Use when referring to electronic recordings or streams of moving visual images, including promotional films, instructional clips, recorded webinars, or digital footage (e.g., 'promotional video', 'training video', 'stream a video', 'embed a video').",
      "whenNotToUse": "Do not use 'video' when referring to a full-length theatrical cinematic production (use 'film' or 'movie'), a still photographic capture ('photo', 'snapshot'), or an interactive live video call without recorded footage ('videoconference' or 'video call').",
      "culturalContext": "In modern corporate culture, video has largely superseded text-heavy manuals for internal training, compliance certifications, and human resources onboarding. Multinational companies invest substantially in corporate video production to shape investor relations, demonstrate corporate social responsibility, and maintain global brand cohesion across distributed teams."
    },
    "examples": {
      "daily": [
        "She uploaded a short tutorial video demonstrating how to troubleshoot the printer connection.",
        "During his morning commute, Marcus watched an instructional video on his tablet about conversational presentation techniques.",
        "The customer support team emailed a brief demonstration video showing how to assemble the office chair."
      ],
      "business": [
        "The human resources department produced an interactive training video outlining workplace safety procedures for new employees.",
        "Ahead of the global product launch, the marketing team released an engaging promotional video highlighting the software's automated workflow tools.",
        "The chief executive officer recorded a quarterly update video that was broadcast globally across the corporate intranet."
      ],
      "conversation": [
        "\"Has the corporate communications team finished editing the client testimonial video?\" \"Yes, the final cut was approved this afternoon and has been embedded into the marketing presentation deck.\"",
        "\"I missed the quarterly town hall yesterday afternoon.\" \"Don't worry, the internal communications team archived the full video on the staff portal for on-demand playback.\"",
        "\"Should we include a product walkthrough video in the investor pitch deck?\" \"Definitely; a ninety-second demonstration will convey the user interface much faster than static slides.\""
      ],
      "collocations": [
        "promotional video",
        "training video",
        "instructional video",
        "video production",
        "stream a video",
        "video footage"
      ]
    },
    "wordFamily": {
      "noun": "video, videographer, videography",
      "verb": "video, videotape",
      "adjective": "video, visual",
      "adverb": "visually"
    },
    "visual": {
      "imageKeyword": "corporate video production camera crew filming executive interview studio lighting",
      "imageDescription": "A professional media crew filming a corporate executive seated in a sleek modern boardroom, with a 4K cinema camera on a tripod, boom microphone overhead, and LED softbox lighting illuminating the scene.",
      "mnemonic": "VID-eo: From the Latin 'VIDEO' ('I see'). While audio is what you hear, VIDEO is the moving picture that you SEE!"
    },
    "video": {
      "description": "A behind-the-scenes corporate production feature illustrating the step-by-step workflow of scripting, filming, and editing an internal employee orientation video for an international financial services firm."
    },
    "toeicContext": {
      "commonParts": [
        1,
        3,
        4,
        7
      ],
      "exampleQuestion": "Employees who missed the mandatory cybersecurity orientation are required to watch the recorded training _____ on the company intranet by Friday afternoon.\n(A) video\n(B) visible\n(C) visual\n(D) envision",
      "tips": "In TOEIC Part 5, distinguishing between nouns and related adjectives or verbs is a classic question pattern. Following the compound modifier 'recorded training', a singular count noun representing the instructional material is needed. Choice (A) 'video' fits grammatically and semantically as the direct object of 'watch'. Choice (B) 'visible' and (C) 'visual' are adjectives, while (D) 'envision' is a transitive verb meaning to imagine."
    },
    "synonyms": [
      "recording",
      "footage",
      "broadcast",
      "motion picture",
      "clip",
      "videotape"
    ],
    "antonyms": [
      "still photograph",
      "audio recording",
      "static image",
      "print media"
    ],
    "relatedWords": [
      "videoconference",
      "streaming",
      "webinar",
      "videography",
      "subtitles",
      "playback",
      "post-production"
    ]
  },
  {
    "id": "comms-260",
    "word": "videoconference",
    "partOfSpeech": [
      "noun"
    ],
    "category": "communications",
    "level": "advanced",
    "toeicFrequency": 7,
    "pronunciation": {
      "ipa": "/ˈvɪd.i.oʊˌkɑːn.fɚ.əns/",
      "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/videoconference--_us_1.mp3",
      "syllableBreakdown": "vid-e-o-con-fer-ence",
      "stressPattern": "primary stress on the first syllable of 'video' and secondary stress on the first syllable of 'conference' (VID-e-o-CON-fer-ence)",
      "commonMistakes": "Learners often attempt to pronounce all five syllables in 'conference' distinctly (*con-fer-ence* with a trilled /r/ or full vowel in the penultimate syllable) rather than using the standard syncopated three-syllable pronunciation /ˈkɑːn.fɚ.əns/. In addition, some speakers misplace the primary stress onto the third or fourth syllable (*video-con-FER-ence*)."
    },
    "etymology": {
      "origin": "Compound noun combining 'video' (from Latin 'video', meaning 'I see') and 'conference' (from Medieval Latin 'conferentia', from Latin 'conferre', meaning 'to bring together, consult, compare').",
      "rootWord": "Latin 'vidēre' (to see) + Latin 'conferre' (to bring together, discuss; 'com-' = together + 'ferre' = to bear, carry) + abstract noun suffix '-ence'.",
      "rootMeaning": "'A meeting or consultation where participants brought together across different locations see and speak with one another simultaneously via electronic visual feeds'",
      "evolution": "The concept of simultaneous visual and audio communication over distance emerged experimentally with AT&T's 'Picturephone' exhibited at the 1964 New York World's Fair. The term 'videoconference' gained commercial traction in the late 1970s and 1980s as telecommunications carriers (such as British Telecom and AT&T) installed dedicated room-based teleconferencing suites connected by high-capacity ISDN lines. In the 1990s and 2000s, specialized hardware vendors like Polycom and Tandberg mainstreamed corporate boardroom videoconferencing. Following the advent of cloud computing and high-bandwidth fiber in the 2010s and 2020s, videoconferencing transitioned from expensive executive telepresence suites into ubiquitous desktop and mobile applications (Zoom, Microsoft Teams, Cisco Webex), revolutionizing global hybrid enterprise operations.",
      "relatedLanguages": [
        "French: vidéoconférence / visioconférence",
        "Spanish: videoconferencia",
        "Italian: videoconferenza",
        "German: Videokonferenz",
        "Portuguese: videoconferência"
      ],
      "firstRecordedUse": "1975 (in telecommunications and technical teleconferencing journals)"
    },
    "deepMeaning": {
      "coreConcept": "A live, synchronous telecommunication meeting conducted via digital networks that enables two or more geographically dispersed participants to transmit and receive bidirectional real-time video, audio, and shared digital screen content.",
      "spatialContext": "Corporate telepresence suites, dedicated boardroom conference rooms with dual monitors and omnidirectional soundbars, home offices, and remote executive workstations.",
      "temporalContext": "Scheduled across disparate international time zones; lasts typically 30 to 60 minutes; held regularly for daily scrums, weekly cross-departmental syncs, client consultations, and quarterly executive reviews.",
      "emotionalTone": "Collaborative, structured, professional, and efficient.",
      "formalityLevel": "formal",
      "connotation": "neutral"
    },
    "nativeMindset": {
      "howNativesThink": "To a native speaker, 'videoconference' is slightly more formal and institutional than everyday casual terms like 'video call' or 'Zoom call'. It implies a structured, scheduled business assembly—often involving corporate presentation slides, screen sharing, multi-party boardroom cameras, and international cross-office stakeholders. When an executive or administrative coordinator announces a 'videoconference', participants expect an agenda, formal meeting invitations with dial-in credentials, and business-appropriate attire.",
      "mentalImage": "A sunlit corporate conference room where three executives sit around an oak table facing two wall-mounted flat-panel displays, which show colleagues from the Tokyo and London branch offices interacting in a split-screen live presentation with synchronized data charts.",
      "whenToUse": "Use when describing structured, multi-party business meetings conducted remotely via live video telecommunications equipment or enterprise software (e.g., 'host a videoconference', 'join the international videoconference', 'videoconference room', 'hold a videoconference with overseas clients').",
      "whenNotToUse": "Do not use for casual, one-on-one personal video chats with friends or family (use 'video call', 'FaceTime', or 'chat'). Do not use for one-way instructional broadcasts where attendees cannot speak or share video (use 'webinar' or 'webcast').",
      "culturalContext": "In global business culture, videoconferencing has transformed executive travel expenditure and distributed team dynamics. Companies maintain strict videoconference etiquette (muting microphones when not speaking, framing professional backgrounds, and testing audiovisual peripherals beforehand). In the TOEIC exam, scheduling conflicts between international time zones for a videoconference are a frequent theme in Part 3 conversations and Part 7 email chains."
    },
    "examples": {
      "daily": [
        "She configured her external webcam and headset ten minutes before the regional videoconference started.",
        "Because our regional sales teams work across three time zones, we hold our weekly sync by videoconference.",
        "The client preferred to conduct the initial design consultation through a videoconference rather than traveling into the city."
      ],
      "business": [
        "The executive board convened an emergency videoconference with overseas branch managers to evaluate the supply chain interruption.",
        "To reduce annual corporate travel expenditures, international contract negotiations will be conducted via high-definition videoconference.",
        "IT technicians updated the audiovisual firmware in the executive boardroom to ensure seamless connectivity during the quarterly videoconference.",
      ],
      "conversation": [
        "\"Did you receive the meeting invitation for tomorrow morning's videoconference with the European division?\" \"Yes, but since London is five hours ahead, the organizers rescheduled the call for 8:00 AM Eastern Time.\"",
        "\"Is Room 4B reserved for the presentation this afternoon?\" \"Yes, the marketing director booked it specifically because it is equipped with specialized videoconference hardware for remote client pitches.\"",
        "\"Why was the videoconference delayed by ten minutes?\" \"The regional office experienced an unexpected network outage, so their team had to rejoin using a secondary cellular hotspot.\""
      ],
      "collocations": [
        "hold a videoconference",
        "schedule a videoconference",
        "attend a videoconference",
        "international videoconference",
        "videoconference room",
        "join via videoconference"
      ]
    },
    "wordFamily": {
      "noun": "videoconference, videoconferencing",
      "verb": "videoconference",
      "adjective": "videoconferenced",
      "adverb": ""
    },
    "visual": {
      "imageKeyword": "boardroom videoconference large wall screen international business meeting remote participants",
      "imageDescription": "Professionals seated at a sleek wooden conference table looking at dual large wall-mounted screens displaying remote colleagues from around the world speaking during a hybrid corporate meeting.",
      "mnemonic": "VIDEO (sight) + CONFERENCE (meeting): Bringing people from across the globe into the same virtual conference room so they can SEE and SPEAK together."
    },
    "video": {
      "description": "An enterprise technology case study demonstrating how a global engineering conglomerate integrated automated high-definition videoconferencing systems across thirty international offices to streamline real-time design collaboration."
    },
    "toeicContext": {
      "commonParts": [
        3,
        4,
        7
      ],
      "exampleQuestion": "Due to unexpected flight cancellations caused by severe weather, the quarterly board meeting will be conducted via _____ instead of in person.\n(A) videoconference\n(B) videoconferenced\n(C) videoconferencing\n(D) videoconferences",
      "tips": "In TOEIC Part 5, prepositions indicating means or methods such as 'via' or 'by' are followed by a noun identifying the medium. In this sentence, 'conducted via _____' requires the singular count noun 'videoconference' to describe the alternative meeting format. Choice (B) 'videoconferenced' is a past participle/verb form, Choice (C) is a participle/gerund form that is less idiomatic here than the concrete noun, and Choice (D) 'videoconferences' is plural, which contradicts the single event described as 'the quarterly board meeting'."
    },
    "synonyms": [
      "virtual meeting",
      "video call",
      "teleconference",
      "remote conference",
      "web meeting",
      "telepresence session"
    ],
    "antonyms": [
      "in-person meeting",
      "face-to-face meeting",
      "physical gathering",
      "audio-only call"
    ],
    "relatedWords": [
      "teleconference",
      "screen sharing",
      "webinar",
      "telepresence",
      "dial-in credentials",
      "bandwidth",
      "hybrid workplace"
    ]
  },
  {
    "id": "comms-261",
    "word": "viewership",
    "partOfSpeech": [
      "noun"
    ],
    "category": "communications",
    "level": "intermediate",
    "toeicFrequency": 8,
    "pronunciation": {
      "ipa": "/ˈvjuː.ɚ.ʃɪp/",
      "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/viewership--_us_1.mp3",
      "syllableBreakdown": "view-er-ship",
      "stressPattern": "primary stress on the first syllable (VIEW-er-ship)",
      "commonMistakes": "Learners frequently omit the glide /j/ after the labiodental fricative /v/, saying /vuː-/ instead of /vjuː-/. Additionally, non-native speakers may confuse the voiceless postalveolar fricative /ʃ/ in the suffix '-ship' with an alveolar /s/ (*viewersip*) or overly stress the suffix, distorting the natural rhythm (*view-er-SHIP* instead of /ˈvjuː.ɚ.ʃɪp/)."
    },
    "etymology": {
      "origin": "Formed in mid-20th-century American English by combining the noun 'viewer' (from Middle English 'vewer', from Anglo-French 'vewe', feminine past participle of Old French 'veoir' meaning 'to see', from Latin 'vidēre') with the noun suffix '-ship' (from Old English '-scipe', denoting state, condition, or collective body).",
      "rootWord": "Latin 'vidēre' (to see) -> Old French 'veoir' -> Middle English 'view' + agent suffix '-er' + Old English suffix '-scipe' (quality, collective state).",
      "rootMeaning": "'The aggregate collective body or quantitative audience of individuals watching a visual broadcast or program'",
      "evolution": "The word 'viewer' was recorded as early as the 14th century to denote an inspector or official examiner. In the 1930s, television engineers and radio broadcasters adopted 'viewer' to describe someone watching television broadcasts (paralleling 'listener' for radio). In the late 1940s and early 1950s, as commercial television broadcasting rapidly expanded in the United States and Britain, the aggregate collective noun 'viewership' was coined by broadcast network executives and advertising agencies to measure audience volume for commercial rating systems (like Nielsen ratings). With the advent of digital streaming, YouTube, and OTT (over-the-top) platforms in the 21st century, 'viewership' expanded beyond traditional television households to encompass total digital stream impressions, unique viewers, watch hours, and concurrent live-stream audiences.",
      "relatedLanguages": [
        "French: audimat / téléspectateurs (collectif)",
        "Spanish: audiencia / teleaudiencia",
        "Italian: audience / telespettatori",
        "German: Zuschauerschaft / Einschaltquote",
        "Portuguese: audiência / telespectadores"
      ],
      "firstRecordedUse": "circa 1950 (in American television broadcasting and commercial advertising trade press)"
    },
    "deepMeaning": {
      "coreConcept": "The aggregate collective audience or total statistical number of individuals who watch a specific television broadcast, digital video program, commercial advertisement, or live stream.",
      "spatialContext": "Television broadcast control rooms, media analytics firms (e.g. Nielsen), advertising agency media buying suites, and corporate streaming analytics dashboards.",
      "temporalContext": "Measured in real time during live telecasts (concurrent viewership) and compiled across 24-hour, 7-day, or 30-day post-broadcast rating cycles (including time-shifted DVR and on-demand streaming).",
      "emotionalTone": "Analytical, commercial, statistical, and competitive.",
      "formalityLevel": "formal",
      "connotation": "neutral"
    },
    "nativeMindset": {
      "howNativesThink": "To a native speaker, 'viewership' is a quantitative, business-oriented broadcast term. It is not just people sitting on a sofa; it represents audience metrics, ratings, market share, and commercial value. Broadcasters care about viewership because higher viewership directly dictates advertising rates. In corporate and marketing communications, when someone mentions 'record viewership' or 'declining viewership', native speakers instantly recognize it as a performance metric that determines whether a program stays on the air or an advertising campaign gets renewed.",
      "mentalImage": "A media research analyst at an advertising agency reviewing a bar chart on an ultrawide monitor displaying demographic viewership spikes during an evening commercial break, comparing cable broadcast numbers against on-demand streaming metrics.",
      "whenToUse": "Use when discussing the collective size, demographics, or statistical trends of people watching visual media such as television programs, digital live streams, corporate webcasts, or sporting events (e.g., 'peak viewership', 'boost viewership', 'viewership figures', 'attract high viewership').",
      "whenNotToUse": "Do not use for audio-only programs like radio broadcasts or podcasts (use 'listenership' or 'audience'). Do not use for print media like magazines or newspapers (use 'readership' or 'circulation'). Do not use to describe a single spectator (use 'viewer').",
      "culturalContext": "Viewership figures are the lifeblood of commercial broadcasting and media sponsorships in the US, UK, and worldwide. Major cultural events like the Super Bowl, World Cup, and presidential debates generate intense public and economic scrutiny surrounding their overnight viewership numbers. In TOEIC Part 7, media press releases, marketing analyses, and advertising rate cards frequently cite viewership statistics to justify ad placements."
    },
    "examples": {
      "daily": [
        "The documentary attracted strong viewership on public television, prompting the network to schedule an encore presentation.",
        "Local news channels compete aggressively during the evening broadcast hours to capture maximum household viewership.",
        "The live stream of the solar eclipse drew global viewership from millions of science enthusiasts."
      ],
      "business": [
        "Advertising rates for the prime-time broadcast were revised upward following an unprecedented surge in television viewership.",
        "The media conglomerate attributed its quarterly advertising revenue growth to expanding digital viewership across its streaming apps.",
        "Market research analysts reported that younger demographic viewership for traditional cable television has steadily declined over the past five years."
      ],
      "conversation": [
        "\"How did our sponsored segment perform during Sunday's championship game?\" \"The network recorded peak viewership of fifteen million households, giving our brand exceptional exposure.\"",
        "\"Why is the television station moving the investigative journalism series to an earlier time slot?\" \"They hope the prime evening placement will attract higher viewership among working professionals.\"",
        "\"Did the corporate annual meeting webcast reach all regional offices?\" \"Yes, internal metrics showed strong viewership across our European and Asian branches.\""
      ],
      "collocations": [
        "peak viewership",
        "record viewership",
        "viewership figures",
        "boost viewership",
        "attract viewership",
        "television viewership"
      ]
    },
    "wordFamily": {
      "noun": "viewership, viewer, view",
      "verb": "view",
      "adjective": "viewable, viewing",
      "adverb": ""
    },
    "visual": {
      "imageKeyword": "television ratings analytics screen audience charts media research graphs broadcast metrics",
      "imageDescription": "A modern media intelligence control room with curved digital monitors displaying colorful graphs, demographic breakdowns, and line charts tracking peak television viewership across international markets.",
      "mnemonic": "VIEWER + SHIP: All VIEWERS aboard the broadcast 'SHIP' counted together as one collective audience!"
    },
    "video": {
      "description": "A broadcast industry documentary excerpt explaining how ratings agencies track real-time digital and broadcast viewership data to determine multi-million dollar television commercial pricing."
    },
    "toeicContext": {
      "commonParts": [
        4,
        6,
        7
      ],
      "exampleQuestion": "Due to a steady decline in television _____ over the past three quarters, the network has decided to cancel the late-night talk show.\n(A) viewer\n(B) viewership\n(C) viewed\n(D) viewable",
      "tips": "In TOEIC Part 5, distinguishing between an individual agent noun ('viewer') and a collective quantitative noun ('viewership') is a crucial tested skill. In the phrase 'decline in television _____', what declines is not an individual person but the aggregate collective audience or rating metric: (B) 'viewership'. Choice (A) 'viewer' is a singular countable noun that would require an article ('a viewer'); Choice (C) is a verb participle; Choice (D) is an adjective."
    },
    "synonyms": [
      "audience",
      "audience size",
      "ratings",
      "viewing public",
      "spectator base",
      "market share"
    ],
    "antonyms": [
      "non-viewers",
      "audience loss",
      "zero audience"
    ],
    "relatedWords": [
      "ratings",
      "demographics",
      "broadcast",
      "listenership",
      "readership",
      "prime time",
      "market share"
    ]
  },
  {
    "id": "comms-262",
    "word": "voiceover",
    "partOfSpeech": [
      "noun"
    ],
    "category": "communications",
    "level": "intermediate",
    "toeicFrequency": 8,
    "pronunciation": {
      "ipa": "/ˈvɔɪsˌoʊ.vɚ/",
      "audioUrl": "https://ssl.gstatic.com/dictionary/static/sounds/20200429/voiceover--_us_1.mp3",
      "syllableBreakdown": "voice-o-ver",
      "stressPattern": "primary stress on the first syllable, secondary stress on the second syllable (VOICE-o-ver)",
      "commonMistakes": "Learners frequently treat 'voiceover' as three flat syllables with equal stress or misplace stress on the final syllable (*voice-o-VER*). Additionally, non-native speakers often struggle with the diphthong /ɔɪ/ in 'voice', either neutralizing it to /ɔː/ or /oʊ/, or failing to articulate the smooth transition between the voiceless /s/ and the following vowel /oʊ/, causing an awkward glottal stop or unnatural pause."
    },
    "etymology": {
      "origin": "Compound noun coined in American radio and film production, combining 'voice' (from Old French 'voiz', from Latin 'vocem', accusative of 'vox' meaning voice, sound, utterance) and 'over' (from Old English 'ofer', Germanic, meaning above, over).",
      "rootWord": "Latin 'vox' / 'vocis' (voice, utterance) -> Old French 'voiz' + Old English 'ofer' (over, upon, superimposed).",
      "rootMeaning": "'A spoken voice recording superimposed over moving pictures, broadcasts, or dramatic scenes where the narrator is not seen'",
      "evolution": "The term emerged in Hollywood filmmaking and radio dramatics during the early sound film era (late 1920s and 1930s) to denote narration by an off-screen speaker whose voice was laid 'over' the visual film track. In early cinema, it was used primarily in newsreels and documentary shorts. During the mid-20th century, advertising agencies embraced the technique for television commercials, where an authoritative or reassuring voice promoted products over lifestyle footage. With the rise of modern animated feature films, video games, corporate e-learning modules, GPS navigation systems, and interactive automated phone attendants, 'voiceover' expanded into a dedicated multi-billion-dollar recording and voice-talent industry.",
      "relatedLanguages": [
        "French: voix off / voix hors champ",
        "Spanish: voz en off / locución",
        "Italian: voce fuori campo / voice over",
        "German: Voice-over / Off-Sprecher",
        "Portuguese: voz em off / locução"
      ],
      "firstRecordedUse": "1938 (in motion picture production and broadcasting trade publications)"
    },
    "deepMeaning": {
      "coreConcept": "A recorded narration, spoken commentary, or character monologue in a film, television commercial, corporate video, documentary, or presentation, delivered by an off-screen voice actor or narrator who is not visible on camera.",
      "spatialContext": "Acoustically treated sound recording booths, post-production audio mixing studios equipped with studio condenser microphones, pop filters, and digital audio workstations (DAWs), and commercial advertising suites.",
      "temporalContext": "Recorded during the post-production phase after the visual storyboard or rough cut is locked, or scripted during pre-production to guide visual timing and animatics.",
      "emotionalTone": "Articulate, persuasive, expressive, and authoritative.",
      "formalityLevel": "neutral",
      "connotation": "neutral"
    },
    "nativeMindset": {
      "howNativesThink": "To a native speaker, a 'voiceover' (often written as 'voiceover' or 'voice-over') immediately conjures the invisible narrator guiding the listener through a documentary, a charismatic voice introducing a new luxury car on a TV commercial, or an instructional voice walking through a software demo. In business and corporate communications, native speakers associate voiceovers with professional polish—hiring a professional voiceover artist is what separates a low-budget, amateur promotional clip from a high-stakes, broadcast-ready corporate video.",
      "mentalImage": "A professional voice actor standing inside a soundproofed recording booth wearing monitor headphones, speaking into a condenser microphone with an acoustic pop shield, reading from an illuminated digital script while watching visual video cues on an overhead monitor.",
      "whenToUse": "Use when referring to spoken commentary or narration added to video, television, radio, animated media, or e-learning modules by an off-screen speaker (e.g., 'record a voiceover', 'professional voiceover artist', 'documentary voiceover', 'add a voiceover to the presentation').",
      "whenNotToUse": "Do not use when the speaker is visible on screen facing the camera (use 'on-camera host', 'presenter', or 'anchor'). Do not use for simultaneous live spoken interpretation between foreign languages (use 'interpretation' or 'translation'). Do not use for written text appearing on screen (use 'subtitles' or 'captions').",
      "culturalContext": "Voiceover work is an established creative industry in Anglo-American media, governed by specialized union agreements (such as SAG-AFTRA in the United States). In the corporate world, multinational organizations commission multilingual voiceovers to localize training programs, product safety videos, and marketing campaigns for international markets without needing to reshoot expensive on-location video footage."
    },
    "examples": {
      "daily": [
        "The nature documentary featured a soothing voiceover describing the annual migration of monarch butterflies.",
        "He recorded a clear voiceover on his smartphone to narrate the photo slideshow for his parents' anniversary.",
        "The fitness mobile app uses an encouraging voiceover to prompt users through each workout interval."
      ],
      "business": [
        "The advertising agency hired a professional voice actor to provide the voiceover for the upcoming television commercial.",
        "Corporate communications requested an updated voiceover for the employee compliance training module to reflect recent regulatory changes.",
        "To expand into Latin American markets, the company commissioned a Spanish voiceover for its flagship promotional video."
      ],
      "conversation": [
        "\"Has the sound engineer added the voiceover to the final cut of the product demonstration?\" \"Yes, the narration was synced with the on-screen animations this morning and sent to the client for final sign-off.\"",
        "\"Why does the prototype marketing video sound so unpolished?\" \"The project team used a scratch voiceover recorded on a laptop; we are scheduling a professional studio session tomorrow.\"",
        "\"Should we hire separate voice actors for the regional versions of the commercial?\" \"Yes, having a localized voiceover will make the campaign resonate much better with domestic audiences.\""
      ],
      "collocations": [
        "record a voiceover",
        "voiceover artist",
        "voiceover talent",
        "commercial voiceover",
        "narration and voiceover",
        "provide a voiceover"
      ]
    },
    "wordFamily": {
      "noun": "voiceover, voice",
      "verb": "voice",
      "adjective": "voiced, voiceless",
      "adverb": ""
    },
    "visual": {
      "imageKeyword": "voiceover artist recording studio microphone headphones script narration audio booth",
      "imageDescription": "A professional voiceover artist speaking into a studio condenser microphone equipped with a pop filter inside a sound-dampened recording booth with acoustic foam walls.",
      "mnemonic": "VOICE + OVER: A spoken VOICE laid OVER the visual video track without the speaker being seen on camera."
    },
    "video": {
      "description": "A behind-the-scenes look at an audio post-production facility showing how a voiceover artist collaborates with a commercial director in real time to record and sync narration for a global corporate brand campaign."
    },
    "toeicContext": {
      "commonParts": [
        3,
        4,
        7
      ],
      "exampleQuestion": "The production director announced that the commercial would not be released until the final _____ had been recorded and synchronized with the video footage.\n(A) voiceover\n(B) voiced\n(C) vocalize\n(D) vocally",
      "tips": "TOEIC Part 5 frequently tests part-of-speech selection following determiners and adjectives. In the clause 'until the final _____ had been recorded', the definite article 'the' and adjective 'final' require a singular count noun as the subject of the passive verb phrase 'had been recorded'. Choice (A) 'voiceover' is the noun required. Choice (B) 'voiced' is an adjective or past verb form; Choice (C) 'vocalize' is a verb; and Choice (D) 'vocally' is an adverb."
    },
    "synonyms": [
      "narration",
      "spoken commentary",
      "voice track",
      "off-camera narration",
      "audio track",
      "voice acting"
    ],
    "antonyms": [
      "on-camera dialogue",
      "silent footage",
      "subtitles",
      "text captions"
    ],
    "relatedWords": [
      "sound booth",
      "narration",
      "voice actor",
      "dubbing",
      "soundtrack",
      "audio post-production",
      "lip sync"
    ]
  }
]

payload = {"words": words}
jsonschema.validate(instance=payload, schema=schema)
print("SUCCESS: JSON schema validation passed perfectly!")
