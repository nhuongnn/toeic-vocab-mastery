import json

words_data = [
  {
    "id": "comms-255",
    "word": "transcription",
    "partOfSpeech": ["noun"],
    "category": "communications",
    "level": "advanced",
    "toeicFrequency": 7,
    "pronunciation": {
      "ipa": "/trænˈskrɪp.ʃən/",
      "syllableBreakdown": "tran-scrip-tion",
      "stressPattern": "primary stress on the second syllable (tran-SCRIP-tion)",
      "commonMistakes": "Learners often drop the /s/ before /k/ saying *tran-crip-tion*, mispronounce the final suffix as a heavy /ʃɒn/ or with an unreduced vowel, or mistakenly pronounce the root with a diphthong /aɪ/ like *transcribe* (*tran-skraɪp-shun*). Another common error is confusing the process/text noun 'transcription' with 'transcript' (the specific official educational grade report or formal record)."
    },
    "etymology": {
      "origin": "Classical Latin 'transcriptio' (a copying, transfer in writing), noun of action from the past participle stem of 'transcribere' (to copy, transcribe), transmitted into late Middle English through Old French 'transcription'",
      "rootWord": "trans- (across, over, beyond) + scribere (to write) + -tio (suffix denoting an action or state)",
      "rootMeaning": "'trans' (across) + 'scribere' (to write) — literally 'the act or process of writing across from one medium, voice, or format into another written form'",
      "evolution": "In classical Roman law, 'transcriptio' described transferring a debtor's balance or duplicating a legal testament. In the late 14th century, Middle English scribes used it to designate duplicating manuscripts by hand. By the late 19th century, with the emergence of shorthand court stenography and Edison's dictating phonographs, the word specialized into rendering oral speech into typewritten text. In the late 20th and 21st centuries, it further expanded into molecular biology (DNA to RNA transcription) and telecommunications software (automatic speech recognition / speech-to-text conversion).",
      "relatedLanguages": [
        "French: transcription",
        "Spanish: transcripción",
        "German: Transkription",
        "Italian: trascrizione"
      ],
      "firstRecordedUse": "Late 14th century (c. 1387–1400 in Middle English, recorded in John Trevisa's translation of Higden's Polychronicon)"
    },
    "deepMeaning": {
      "coreConcept": "The methodical process of converting spoken language, recorded audio, live proceedings, or shorthand notes into a complete, precise written or electronic text document, or the resulting written text itself.",
      "spatialContext": "Court reporting offices, medical records typing stations, corporate media relations suites, broadcast closed-captioning booths, and secure cloud transcription web platforms.",
      "temporalContext": "Performed continuously during real-time speech-to-text broadcasting or delivered within 12 to 24 hours following legal depositions, board meetings, quarterly earnings calls, or research focus groups.",
      "emotionalTone": "Rigorous, meticulous, objective, and documentary.",
      "formalityLevel": "formal",
      "connotation": "neutral"
    },
    "nativeMindset": {
      "howNativesThink": "Native speakers differentiate sharply between a casual summary or meeting minutes and a 'transcription.' A transcription carries an explicit promise of linguistic fidelity—recording exactly what was spoken without editorial rewriting, truncation, or interpretive spin. In corporate and institutional environments, natives perceive it as an indispensable safeguard for legal accountability, compliance auditing, accessibility for the deaf or hard of hearing, and content indexability.",
      "mentalImage": "A professional transcriptionist wearing sound-isolating headphones at a multi-monitor workstation, using an ergonomic USB foot pedal to loop audio while typing an executive earnings call verbatim into a synchronized text editor with speaker identification tags.",
      "whenToUse": "Use when designating the precise textual reproduction of spoken audio, recorded interviews, depositions, or dictations (e.g., 'The paralegal ordered an expedited transcription of the witness testimony,' 'Our software provides automated real-time transcription for all video conferences').",
      "whenNotToUse": "Do not use when referring to a synthesized summary of key action items (use 'meeting minutes' or 'executive summary'), an official university transcript showing course grades (use 'academic transcript', not 'transcription'), or translating from one foreign language to another (use 'translation' or 'interpretation').",
      "culturalContext": "In North American and Commonwealth corporate governance, public company earnings calls must have verbatim transcriptions published immediately to guarantee fair disclosure under securities regulations (e.g., US SEC Regulation FD). Additionally, disability legislation such as the Americans with Disabilities Act (ADA) and the UK Equality Act makes transcription mandatory for broadcast and educational compliance."
    },
    "examples": {
      "daily": [
        "I turned on the live transcription feature on my video call app so I wouldn't miss any technical points while taking notes.",
        "Because the recording was muffled by background traffic noise, the podcast transcription required several careful re-listens.",
        "The university uploaded a full transcription of the guest lecture for students who prefer studying written notes."
      ],
      "business": [
        "The compliance department reviewed the verbatim transcription of the investor relations call before releasing it on the corporate portal.",
        "Our research consultancy outsourced the transcription of sixty consumer focus group interviews to an accredited language services agency.",
        "To comply with accessibility standards, the firm integrated automated transcription software across all internal training webinars."
      ],
      "conversation": [
        "\"Has the agency delivered the full transcription of yesterday's press conference yet?\" \"Not yet, but the project manager promised we would receive the proofread document by two o'clock this afternoon.\"",
        "\"Should we request a clean-read transcription or a strict verbatim version for the arbitration hearing?\" \"Definitely strict verbatim, because the dispute panel needs to evaluate every pause, hesitation, and spoken interjection.\""
      ],
      "collocations": [
        "audio transcription",
        "verbatim transcription",
        "real-time transcription",
        "automated transcription",
        "accurate transcription",
        "transcription service"
      ]
    },
    "wordFamily": {
      "noun": "transcription, transcript, transcriptionist, transcriber",
      "verb": "transcribe",
      "adjective": "transcriptional, transcribed",
      "adverb": "transcriptionally"
    },
    "visual": {
      "imageKeyword": "audio transcriptionist headphones foot pedal waveform screen",
      "imageDescription": "A professional transcriptionist wearing studio monitor headphones, focused on a dual-screen computer displaying multicolored audio waveforms and synchronized lines of time-coded text, with a USB foot pedal visible beneath the ergonomic desk.",
      "mnemonic": "TRANS-CRIPTION: Think of TRANS (across) + SCRIPT (writing). You are transferring spoken voice ACROSS the audio airwaves directly into a written SCRIPT!"
    },
    "video": {
      "description": "An educational workflow video demonstrating how professional legal transcriptionists use specialized pedal controllers and text-expansion software to transcribe courtroom proceedings at speeds exceeding eighty words per minute."
    },
    "toeicContext": {
      "commonParts": [3, 4, 7],
      "exampleQuestion": "The media relations department requested an expedited _____ of the CEO's keynote address so that excerpts could be distributed to regional journalists before the morning deadline. (A) transcription (B) transcribe (C) transcribed (D) transcriptively",
      "tips": "In TOEIC Part 5, questions frequently test noun morphology following an adjective modifier ('an expedited _____ of'). The blank requires the singular noun 'transcription' acting as the direct object of 'requested'. Beware of choosing the base verb (B) or participle (C)."
    },
    "synonyms": [
      "written record",
      "verbatim transcript",
      "audio rendering",
      "text conversion",
      "dictation record",
      "stenographic record"
    ],
    "antonyms": [
      "audio recording",
      "original broadcast",
      "vocal utterance",
      "unrecorded speech"
    ],
    "relatedWords": [
      "dictation",
      "stenography",
      "captioning",
      "speech recognition",
      "subtitles",
      "timecode",
      "verbatim"
    ]
  },
  {
    "id": "comms-256",
    "word": "transmitter",
    "partOfSpeech": ["noun"],
    "category": "communications",
    "level": "advanced",
    "toeicFrequency": 7,
    "pronunciation": {
      "ipa": "/trænzˈmɪt.ər/",
      "syllableBreakdown": "trans-mit-ter",
      "stressPattern": "primary stress on the second syllable (trans-MIT-ter)",
      "commonMistakes": "Learners often place stress incorrectly on the first syllable (*TRANS-mit-ter*), voicelessly over-enunciate the /s/ instead of the voiced /z/ in the prefix, or substitute the abstract noun 'transmission' when referring to the physical instrument itself."
    },
    "etymology": {
      "origin": "Formed in English from the verb 'transmit' (borrowed from Latin 'transmittere', to send across, send over) combined with the agent suffix '-er'",
      "rootWord": "trans- (across, over, through) + mittere (to send, release, dispatch) + -er (agent noun suffix designating an instrument or person)",
      "rootMeaning": "'trans' (across) + 'mittere' (to send) + '-er' (device that performs an action) — literally 'an instrument or apparatus that sends signals, energy, or information across space'",
      "evolution": "In 17th-century legal and civil discourse, 'transmitter' denoted a person who conveyed a message or deed. During the 1870s, with the rapid development of electric telegraphy and telephony, the word was technically codified to designate the mechanism (such as Alexander Graham Bell's microphone transmitter) that converted acoustic or electrical variations into signals sent down a wire. In the early 20th century, with Heinrich Hertz and Guglielmo Marconi's pioneering work, it became the established term for radio equipment that radiates high-frequency electromagnetic carrier waves through an antenna.",
      "relatedLanguages": [
        "French: émetteur / transmetteur",
        "Spanish: transmisor",
        "German: Sender / Transmitter",
        "Italian: trasmettitore"
      ],
      "firstRecordedUse": "Early 17th century (c. 1611 as a human sender); technical electro-acoustic sense established c. 1876–1880"
    },
    "deepMeaning": {
      "coreConcept": "An electronic apparatus or hardware component designed to generate, modulate, amplify, and broadcast electromagnetic waves, radio frequencies, optical beams, or telemetry signals across space or through cables to an intended receiver.",
      "spatialContext": "Rooftop telecommunications masts, broadcast transmission rooms, server equipment racks, avionics bays, wireless presentation podiums in auditoriums, and industrial pipeline telemetry junctions.",
      "temporalContext": "Operates continuously within broadcast and cellular infrastructure, or activates instantaneously upon pressing a microphone switch, key fob, or sensor polling cycle.",
      "emotionalTone": "Technical, utilitarian, functional, and structural.",
      "formalityLevel": "formal",
      "connotation": "neutral"
    },
    "nativeMindset": {
      "howNativesThink": "Native speakers view a 'transmitter' as the physical origin point in a two-part communication link: the 'transmitter and receiver' pair (often integrated as a 'transceiver'). Instinctively, native speakers associate 'transmitter' with hardware—such as broadcast radio towers, handheld walkie-talkies, wireless clip-on microphones, garage remotes, or telemetry sensors in logistics and manufacturing. It conveys tangible engineering, signal propagation, and wireless connectivity.",
      "mentalImage": "An electronics technician wearing protective gear standing inside a radio tower equipment shelter, using a digital power meter and spectrum analyzer to inspect coaxial connectors wired to a rack-mounted UHF broadcast transmitter.",
      "whenToUse": "Use when identifying the physical electronic device or hardware module that produces and radiates radio signals, infrared pulses, or sensory telemetry data (e.g., 'The audio technician replaced the batteries in the wireless microphone transmitter,' 'The research team installed a satellite transmitter on the ocean buoy').",
      "whenNotToUse": "Do not use when referring to the message or broadcast signal itself (use 'transmission' or 'broadcast'), the channel carrying the signal (use 'frequency' or 'bandwidth'), or the receiving end (use 'receiver'). Also avoid using it for ordinary human mail carriers (use 'courier' or 'messenger').",
      "culturalContext": "In commercial broadcasting and maritime aviation history, high-power radio transmitters revolutionized public safety, weather alerts, and national defense. In contemporary commercial buildings and factories, low-power industrial transmitters form the physical backbone of building automation systems (HVAC thermostats, occupancy sensors) and RFID inventory management."
    },
    "examples": {
      "daily": [
        "The technician determined that the garage door was unresponsive because the miniature battery inside the remote transmitter had died.",
        "During his keynote speech, the speaker's voice cut out briefly until the sound engineer repositioned the wireless bodypack transmitter.",
        "Marine biologists attached a lightweight satellite transmitter to the sea turtle's shell to monitor its migration path."
      ],
      "business": [
        "Facility engineers inspected the commercial FM transmitter on the building roof to ensure compliance with federal emission thresholds.",
        "The logistics depot installed RFID transmitters on all automated guided vehicles to track pallet relocations across the warehouse floor.",
        "After discovering signal degradation in the plant, maintenance replaced the analog temperature transmitter with an addressable digital model."
      ],
      "conversation": [
        "\"Why is the wireless display adapter lagging during the slide presentation?\" \"The HDMI transmitter plugged into your laptop might be experiencing radio interference from the nearby microwave oven.\"",
        "\"Has the field crew diagnosed why telemetry from the water storage reservoir ceased transmitting?\" \"Yes, lightning caused a power surge that damaged the circuit board of the solar-powered pressure transmitter.\""
      ],
      "collocations": [
        "radio transmitter",
        "wireless transmitter",
        "FM transmitter",
        "transmitter and receiver",
        "optical transmitter",
        "signal transmitter"
      ]
    },
    "wordFamily": {
      "noun": "transmitter, transmission, transmittance, transmittal",
      "verb": "transmit",
      "adjective": "transmittable, transmissible, transmitting",
      "adverb": "transmissively"
    },
    "visual": {
      "imageKeyword": "radio transmitter broadcast antenna electronic circuit telecommunications",
      "imageDescription": "An electronic telecommunications rack featuring high-frequency radio transmitter modules with blinking green LED status indicators, digital power meters, and coaxial cabling connected to a rooftop transmission mast.",
      "mnemonic": "TRANSMITTER: TRANS (across) + MIT (send) + -ER (machine). The machine that sends signals ACROSS the airwaves!"
    },
    "video": {
      "description": "An engineering documentary segment illustrating how a modern wireless microphone transmitter digitizes an audio signal, modulates it onto UHF radio waves, and sends it to a rack-mounted receiver in an auditorium sound booth."
    },
    "toeicContext": {
      "commonParts": [1, 3, 7],
      "exampleQuestion": "Technicians will calibrate the backup radio _____ on the control tower tomorrow morning to ensure continuous communication with approaching cargo flights. (A) transmitter (B) transmit (C) transmissible (D) transmittance",
      "tips": "In TOEIC Part 5, questions frequently test noun morphology distinguishing hardware instruments from verbs or abstract terms. Here, the blank requires the agent noun 'transmitter' acting as the head of the noun phrase 'backup radio transmitter'. Notice that 'transmit' is a verb and 'transmittance' refers to the optical property of passing light."
    },
    "synonyms": [
      "broadcaster",
      "signal generator",
      "emitter",
      "transceiver",
      "telemetry unit",
      "RF sending unit"
    ],
    "antonyms": [
      "receiver",
      "signal detector",
      "sensor receptor",
      "decoder"
    ],
    "relatedWords": [
      "frequency",
      "modulation",
      "receiver",
      "telemetry",
      "antenna",
      "transceiver",
      "bandwidth"
    ]
  },
  {
    "id": "comms-257",
    "word": "update",
    "partOfSpeech": ["verb"],
    "category": "communications",
    "level": "essential",
    "toeicFrequency": 9,
    "pronunciation": {
      "ipa": "/ʌpˈdeɪt/",
      "syllableBreakdown": "up-date",
      "stressPattern": "primary stress on the second syllable for the verb (up-DATE)",
      "commonMistakes": "Learners frequently place primary stress on the first syllable (*UP-date*), which is the standard pronunciation for the noun form, rather than stressing the second syllable (*up-DATE*) as required for the verb. Non-native speakers also sometimes confuse 'update' (to bring up to date with new information) with 'upgrade' (to improve physical hardware quality or tier level) or 'upload' (to transfer a computer file to a remote server)."
    },
    "etymology": {
      "origin": "Modern English compound formed from the adverb 'up' (Old English 'upp', upward/to a completed state) and 'date' (from Old French 'date', via Medieval Latin 'data [littera]', given or dated letter, from Latin 'dare', to give)",
      "rootWord": "up (Old English 'upp') + date (Latin 'dare' / Medieval Latin 'data', time/day specified)",
      "rootMeaning": "Formed from the 19th-century idiomatic phrase 'bring up to date' — literally 'to bring a ledger, account, or record forward in time to the present date'",
      "evolution": "In 18th- and 19th-century maritime commerce and banking, clerks maintained journals by 'bringing them up to date.' During the 1940s, especially with the administrative mobilization of World War II and the advent of early electronic data processing, the phrase was contracted and converted into the single transitive verb 'to update.' In modern computing, communications, and corporate management, it is one of the most common workplace verbs, used for revising data files, installing software patches, or informing stakeholders of current developments.",
      "relatedLanguages": [
        "French: mettre à jour / actualiser",
        "Spanish: actualizar / poner al día",
        "German: aktualisieren / auf den neuesten Stand bringen",
        "Italian: aggiornare"
      ],
      "firstRecordedUse": "Mid 20th century (c. 1940–1948 in administrative and computational records, back-formed from 'up to date')"
    },
    "deepMeaning": {
      "coreConcept": "To incorporate the newest information, corrections, or modifications into a document, software program, or database; or to brief and inform someone regarding the latest developments or current status of an ongoing situation.",
      "spatialContext": "Corporate open-plan offices, enterprise resource planning (ERP) interfaces, cloud project management dashboards, software deployment pipelines, and remote video conference scrums.",
      "temporalContext": "Carried out daily during agile standup meetings, periodically when project milestones shift, or automatically during scheduled overnight software deployment windows.",
      "emotionalTone": "Active, constructive, clarifying, and proactive.",
      "formalityLevel": "neutral",
      "connotation": "positive"
    },
    "nativeMindset": {
      "howNativesThink": "Native speakers intuitively navigate two primary dimensions of 'update' as a verb: informational communication ('update the team on the negotiations') and administrative/digital maintenance ('update the inventory spreadsheet'). In workplace culture, proactively updating colleagues or clients is considered a fundamental marker of professionalism and competence. To fail to update someone implies carelessness or an intentional lack of transparency.",
      "mentalImage": "A project coordinator sitting with a laptop in an office conference room during a weekly status meeting, sharing her screen to revise timeline milestone dates on a cloud project board while briefing team members on client feedback.",
      "whenToUse": "Use when describing the act of revising files, incorporating new figures, applying software patches, or informing someone of the latest news (e.g., 'Please update the client roster before noon,' 'I will update you as soon as the contract is signed').",
      "whenNotToUse": "Do not use when referring to physically replacing equipment with a higher-end model (use 'upgrade'), completely redesigning a system from scratch (use 'overhaul' or 'revamp'), or simply saving a file to a remote server (use 'upload'). Avoid using when presenting entirely historical data without current additions.",
      "culturalContext": "In North American and global corporate cultures, transparency and regular status updates are foundational to agile methodologies and stakeholder alignment. Furthermore, in IT compliance and cybersecurity, organizations are legally required under framework standards (like SOC 2 and ISO 27001) to continuously update software patches to protect against known security vulnerabilities."
    },
    "examples": {
      "daily": [
        "Don't forget to update your contact details on the resident portal if your phone number changes.",
        "My smartphone scheduled an overnight restart to update the operating system without interrupting my workday.",
        "I need to update my resume this weekend before submitting applications for the opening in digital marketing."
      ],
      "business": [
        "The project manager convened a brief standup meeting to update senior stakeholders on the factory construction timeline.",
        "Human resources requested that all department supervisors update their personnel emergency contact records prior to the annual audit.",
        "Our cybersecurity protocol requires employees to update their system passwords every ninety days to protect client accounts."
      ],
      "conversation": [
        "\"Could you update me on how the negotiations with the regional supplier went this morning?\" \"Certainly, they agreed to a five percent discount on bulk orders, provided we finalize the agreement by Friday.\"",
        "\"Has anyone remembered to update the shared logistics spreadsheet with the revised delivery dates?\" \"I am working on that right now; I should have all twenty client accounts amended by lunchtime.\""
      ],
      "collocations": [
        "update regularly",
        "update the status",
        "update someone on",
        "update records",
        "update software",
        "promptly update"
      ]
    },
    "wordFamily": {
      "noun": "update, updater",
      "verb": "update",
      "adjective": "updated, updating",
      "adverb": ""
    },
    "visual": {
      "imageKeyword": "project manager updating digital schedule laptop spreadsheet office",
      "imageDescription": "A professional project manager in a bright office typing on a sleek laptop, updating interactive Gantt chart bars and task assignees on a cloud project management interface.",
      "mnemonic": "UP-DATE: Bring UP to the current DATE! Whenever you UP-DATE, you raise yesterday's information UP to today's DATE!"
    },
    "video": {
      "description": "A corporate communication training video showing how team leads conduct brief, focused five-minute scrums to update colleagues on project deliverables, blockers, and upcoming milestones."
    },
    "toeicContext": {
      "commonParts": [3, 4, 5, 7],
      "exampleQuestion": "Department supervisors are required to _____ the regional director weekly regarding any fluctuations in inventory levels. (A) update (B) updating (C) updated (D) updation",
      "tips": "In TOEIC Part 5, the infinitive structure 'are required to + [base verb]' tests verb identification. Here, the transitive verb 'update' correctly functions with the direct object 'the regional director'. The non-standard invented word *(D) updation* is a notorious distractor in international business English, and participial forms in *(B)* and *(C)* violate the infinitive requirement."
    },
    "synonyms": [
      "modernize",
      "revise",
      "refresh",
      "brief",
      "apprise",
      "amend"
    ],
    "antonyms": [
      "outdate",
      "obsolete",
      "neglect",
      "withhold"
    ],
    "relatedWords": [
      "upgrade",
      "revisions",
      "briefing",
      "status report",
      "notification",
      "patch",
      "amendment"
    ]
  },
  {
    "id": "comms-258",
    "word": "verification",
    "partOfSpeech": ["noun"],
    "category": "communications",
    "level": "advanced",
    "toeicFrequency": 7,
    "pronunciation": {
      "ipa": "/ˌver.ə.fəˈkeɪ.ʃən/",
      "syllableBreakdown": "ver-i-fi-ca-tion",
      "stressPattern": "secondary stress on the first syllable, primary stress on the fourth syllable (ver-i-fi-CA-tion)",
      "commonMistakes": "Learners often struggle with the five-syllable cadence, mistakenly placing primary stress on the third syllable (*ver-i-FI-ca-tion*) or slurring the middle reduced vowels /ə.fə/. In business contexts, learners also frequently confuse 'verification' (confirming whether data or identity is factually true and accurate) with 'validation' (evaluating whether a product or system meets the operational needs of end users)."
    },
    "etymology": {
      "origin": "Late Latin 'verificatio' (an establishing as true), noun of action from the verb 'verificare' (to make true, prove to be true), borrowed into Middle English via Anglo-French and Middle French 'vérification'",
      "rootWord": "verus (true, genuine, real) + -ficare (combining form of 'facere', to make, do) + -tio (suffix denoting an action or process)",
      "rootMeaning": "'verus' (true) + 'facere' (to make) + '-tio' (process of) — literally 'the formal procedure of establishing, confirming, or proving that something is true, authentic, or accurate'",
      "evolution": "In 14th- and 15th-century Anglo-Norman jurisprudence, 'verification' was the formal confirmation or averment by oath of a legal plea or record. During the 17th-century Scientific Revolution (Francis Bacon, Robert Boyle), the term broadened into the empirical confirmation of experimental hypotheses against observable evidence. In the 20th and 21st centuries, it became central to accounting (financial auditing of statements), cybersecurity (multi-factor authentication, biometric verification), and quality engineering.",
      "relatedLanguages": [
        "French: vérification",
        "Spanish: verificación",
        "German: Verifizierung / Überprüfung",
        "Italian: verificazione / verifica"
      ],
      "firstRecordedUse": "Early 15th century (c. 1425–1450 in Anglo-French legal proceedings and Middle English administrative rolls)"
    },
    "deepMeaning": {
      "coreConcept": "The formal, systematic act or procedure of examining, testing, or cross-referencing information, identity credentials, documents, or technical data to confirm their truth, accuracy, authenticity, or compliance with established standards.",
      "spatialContext": "Corporate compliance offices, human resources onboarding suites, online banking authentication gateways, airport security control desks, and financial auditing firms.",
      "temporalContext": "Conducted prior to issuing employment contracts, during account creation or password recovery, before approving large commercial loans, or throughout annual financial audit periods.",
      "emotionalTone": "Rigorous, vigilant, objective, authoritative, and reassuring.",
      "formalityLevel": "formal",
      "connotation": "positive"
    },
    "nativeMindset": {
      "howNativesThink": "Native speakers understand 'verification' as a formal, documentary checkpoint that eliminates fraud, ambiguity, and human error. Unlike an informal 'look-over' or 'check', verification implies an authoritative audit trail against primary source evidence—such as government photo IDs, utility bills, biometric fingerprints, or SMS one-time passcodes. When native speakers see terms like 'two-step verification' or 'employment verification', they feel a sense of security and compliance.",
      "mentalImage": "A corporate compliance officer in an office cross-referencing an applicant's scanned passport, academic degrees, and professional certifications on a dual-monitor workstation against an official accreditation database.",
      "whenToUse": "Use when describing the formal confirmation of personal identity, factual accuracy, legal compliance, or document authenticity (e.g., 'The mortgage lender required written verification of employment,' 'All transactions over five thousand dollars require secondary supervisor verification').",
      "whenNotToUse": "Do not use for casual, informal checks (avoid saying 'Let me perform a verification of the weather outside'; say 'Let me check the weather'). Also avoid using it where you mean user desirability testing or operational utility (use 'validation' or 'user acceptance testing').",
      "culturalContext": "In modern corporate governance, risk management frameworks (such as Know Your Customer [KYC] and Anti-Money Laundering [AML] laws) require financial institutions and corporations to establish rigorous verification procedures. In daily digital life, multi-factor verification (MFA) has become the global standard for protecting consumer data and preventing unauthorized access."
    },
    "examples": {
      "daily": [
        "The mobile banking application sent a six-digit verification code to my smartphone to authenticate my login attempt.",
        "Before issuing my replacement driver's license, the licensing bureau required verification of my residential address.",
        "The hotel front desk agent requested passport verification from all international guests upon check-in."
      ],
      "business": [
        "The procurement manager withheld payment until the accounts payable team completed invoice verification against the receiving dock voucher.",
        "Human resources conducted rigorous credential verification for all candidates shortlisted for the chief data officer position.",
        "Our digital platform implemented automated domain verification to ensure that incoming enterprise accounts belonged to legitimate corporate organizations."
      ],
      "conversation": [
        "\"Why is the client's commercial loan application currently stalled in underwriting?\" \"They are still waiting on employment and income verification letters from the applicant's accounting firm.\"",
        "\"Did you receive the two-step verification prompt on your security authenticator app?\" \"Yes, I approved the push notification, and the cloud dashboard granted immediate administrative access.\""
      ],
      "collocations": [
        "two-factor verification",
        "employment verification",
        "identity verification",
        "independent verification",
        "subject to verification",
        "verification process"
      ]
    },
    "wordFamily": {
      "noun": "verification, verifier, verifiability",
      "verb": "verify",
      "adjective": "verifiable, verified, unverifiable",
      "adverb": "verifiably"
    },
    "visual": {
      "imageKeyword": "identity verification security authentication badge digital audit",
      "imageDescription": "A compliance auditor reviewing official identity credentials and security badges next to a glowing holographic digital checkmark icon representing verified security authentication.",
      "mnemonic": "VERI-FICATION: From Latin VERUS (truth) + FACT (make). You make sure it is a REAL FACT of TRUTH!"
    },
    "video": {
      "description": "An enterprise cybersecurity explainer outlining how multi-factor verification protects sensitive corporate cloud environments from credential phishing and unauthorized network access."
    },
    "toeicContext": {
      "commonParts": [5, 6, 7],
      "exampleQuestion": "Final approval of the travel expense reimbursement is subject to _____ of all itemized receipts by the accounting department. (A) verification (B) verify (C) verified (D) verifiably",
      "tips": "In TOEIC Part 5, the prepositional phrase 'subject to + [noun]' regularly tests noun recognition. The blank requires the noun 'verification' to complete the idiomatic business collocation 'subject to verification of...'. The verb forms in (B) and (C) and the adverb in (D) cannot follow the preposition 'to' in this structure."
    },
    "synonyms": [
      "confirmation",
      "authentication",
      "validation",
      "corroboration",
      "substantiation",
      "cross-examination"
    ],
    "antonyms": [
      "falsification",
      "invalidation",
      "disproof",
      "fabrication"
    ],
    "relatedWords": [
      "audit",
      "credentials",
      "compliance",
      "authentication",
      "documentation",
      "two-factor authentication",
      "due diligence"
    ]
  }
]

# Validation
print(f"Total words: {len(words_data)}")
for w in words_data:
    print(f"\nValidating {w['word']} ({w['id']}):")
    assert w['id'] in ["comms-255", "comms-256", "comms-257", "comms-258"]
    assert len(w['partOfSpeech']) > 0
    assert w['category'] == "communications"
    assert w['level'] in ["essential", "intermediate", "advanced"]
    assert isinstance(w['toeicFrequency'], int)
    
    # Pronunciation
    p = w['pronunciation']
    assert p['ipa'] and p['syllableBreakdown'] and p['stressPattern'] and p['commonMistakes']
    
    # Etymology
    e = w['etymology']
    assert e['origin'] and e['rootWord'] and e['rootMeaning'] and e['evolution'] and e['firstRecordedUse']
    assert len(e['relatedLanguages']) >= 4
    
    # Deep meaning
    dm = w['deepMeaning']
    assert dm['coreConcept'] and dm['spatialContext'] and dm['temporalContext'] and dm['emotionalTone']
    assert dm['formalityLevel'] in ["formal", "neutral", "informal"]
    assert dm['connotation'] in ["positive", "neutral", "negative"]
    
    # Native mindset
    nm = w['nativeMindset']
    assert nm['howNativesThink'] and nm['mentalImage'] and nm['whenToUse'] and nm['whenNotToUse'] and nm['culturalContext']
    
    # Examples
    ex = w['examples']
    assert len(ex['daily']) == 3, f"daily count: {len(ex['daily'])}"
    assert len(ex['business']) == 3, f"business count: {len(ex['business'])}"
    assert len(ex['conversation']) in [2, 3], f"conversation count: {len(ex['conversation'])}"
    for conv in ex['conversation']:
        assert isinstance(conv, str), f"conversation item must be string: {conv}"
    assert len(ex['collocations']) in [5, 6], f"collocations count: {len(ex['collocations'])}"
    
    # Word family
    wf = w['wordFamily']
    assert 'noun' in wf and 'verb' in wf and 'adjective' in wf and 'adverb' in wf
    
    # Visual
    v = w['visual']
    assert v['imageKeyword'] and v['imageDescription'] and v['mnemonic']
    
    # Video
    vid = w['video']
    assert vid['description']
    
    # TOEIC context
    tc = w['toeicContext']
    assert len(tc['commonParts']) > 0
    assert tc['exampleQuestion'] and tc['tips']
    
    # Synonyms / Antonyms / Related words
    assert 4 <= len(w['synonyms']) <= 6, f"synonyms count: {len(w['synonyms'])}"
    assert isinstance(w['antonyms'], list)
    assert 5 <= len(w['relatedWords']) <= 7, f"relatedWords count: {len(w['relatedWords'])}"
    
    print(f"-> PASSED ALL CHECKS FOR {w['word']}")

with open("scratch/verified_words.json", "w") as f:
    json.dump(words_data, f, indent=2)

print("\nAll words saved and verified successfully.")
