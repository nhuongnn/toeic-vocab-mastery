import json

def generate_entry(id_val, word_val, category, level, freq, pronunciation, etymology, deep_meaning, native_mindset, examples, word_family, visual, video, toeic_context, synonyms, antonyms, related_words):
    return {
        "id": id_val,
        "word": word_val,
        "partOfSpeech": ["noun"],
        "category": category,
        "level": level,
        "toeicFrequency": freq,
        "pronunciation": pronunciation,
        "etymology": etymology,
        "deepMeaning": deep_meaning,
        "nativeMindset": native_mindset,
        "examples": examples,
        "wordFamily": word_family,
        "visual": visual,
        "video": video,
        "toeicContext": toeic_context,
        "synonyms": synonyms,
        "antonyms": antonyms,
        "relatedWords": related_words
    }

entries = [
    {
        "id": "marketing-221",
        "word": "merchandise branding",
        "category": "marketing",
        "level": "advanced",
        "toeicFrequency": 7,
        "pronunciation": {
            "ipa": "/ˈmɜː.tʃən.daɪs ˈbræn.dɪŋ/",
            "syllableBreakdown": "mer-chan-dise bran-ding",
            "stressPattern": "Primary stress on the first syllable of 'merchandise' ('mer-) and the first syllable of 'branding' ('bran-), with secondary stress on '-dise'.",
            "commonMistakes": "Mispronouncing 'merchandise' with a /z/ sound at the end instead of an /s/ sound in noun form, or placing incorrect emphasis on the second syllable."
        },
        "etymology": {
            "origin": "Compound noun phrase combining 'merchandise' (from Old French 'merchandise', from Late Latin 'mercaptans', present participle of 'mercare' to trade) and 'branding' (from Old Norse 'brandr' meaning to burn/mark livestock, evolving into commercial trademarking).",
            "rootWord": "merchandise / brand",
            "rootMeaning": "Goods traded in commerce stamped or marked with an identifying symbol.",
            "evolution": "Transitioned from physical livestock branding and merchant guilds stamping crates in medieval markets to comprehensive corporate identity integration across retail goods and promotional items.",
            "relatedLanguages": ["French (marchandise)", "Spanish (mercancía)", "Italian (mercanzia)", "German (Handelsware)"],
            "firstRecordedUse": "Late 20th century in corporate marketing literature (derived from 14th-century trade terminology)."
        },
        "deepMeaning": {
            "coreConcept": "The strategic application of corporate logos, visual identity systems, and brand messaging onto physical retail products, promotional goods, and apparel to reinforce consumer recognition and emotional attachment.",
            "spatialContext": "Corporate marketing departments, retail merchandising floors, promotional product showrooms, and e-commerce fulfillment packaging centers.",
            "temporalContext": "Ongoing strategic initiatives deployed during product launches, seasonal retail campaigns, corporate events, and rebranding cycles.",
            "emotionalTone": "professional",
            "formalityLevel": "formal",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "Native marketing professionals view merchandise branding not as mere logo slapping, but as a tactile extension of brand equity that transforms everyday items into mobile billboards and sensory touchpoints.",
            "mentalImage": "An upscale corporate gift box containing a matte-black insulated tumbler, a textured moleskin notebook embossed with a minimalist copper corporate logo, and custom-woven apparel neatly arranged on a dark walnut display table.",
            "whenToUse": "When discussing corporate gifting strategies, retail product lines, promotional merchandise, or co-branded partnerships.",
            "whenNotToUse": "Do not use for digital advertising campaigns, software user interfaces, or purely financial transactions.",
            "culturalContext": "In modern corporate culture, high-quality merchandise branding is a crucial component of employer branding, client retention, and trade show engagement."
        },
        "examples": {
            "daily": [
                "The startup invested in sustainable merchandise branding to give eco-friendly tote bags and bamboo pens to conference attendees.",
                "Employees proudly wore the company hoodies that featured subtle, elegant merchandise branding on the left sleeve.",
                "Effective merchandise branding turns ordinary coffee mugs into daily reminders of the software platform."
            ],
            "business": [
                "The marketing director presented a comprehensive merchandise branding strategy for the upcoming global franchise convention.",
                "Quality control audits ensure that all vendor-supplied apparel adheres strictly to our corporate merchandise branding guidelines.",
                "By upgrading the materials used in our promotional items, we significantly enhanced the perceived value of our merchandise branding."
            ],
            "conversation": [
                "Colleague A: 'Are we using the new minimalist logo for the trade show giveaways?'\nColleague B: 'Yes, the executive team approved that merchandise branding yesterday so production can start.'",
                "Client: 'Will these promotional jackets feature our company crest?'\nVendor: 'We can apply high-density embroidery to ensure the merchandise branding looks sharp and professional.'"
            ],
            "collocations": [
                "merchandise branding strategy",
                "corporate merchandise branding",
                "merchandise branding guidelines",
                "custom merchandise branding",
                "effective merchandise branding"
            ]
        },
        "wordFamily": {
            "noun": "merchandise branding / merchandiser",
            "verb": "brand merchandise",
            "adjective": "brand-branded / mercantile",
            "adverb": "brand-wise"
        },
        "visual": {
            "imageKeyword": "corporate promotional merchandise branded items display",
            "imageDescription": "A clean, modern flat-lay photograph of professional branded merchandise on a light wooden desk, including a sleek matte water bottle, a debossed leather notebook, and a customized ballpoint pen.",
            "mnemonic": "Imagine a 'merchant' stamping a glowing 'brand' onto every single item sold in the marketplace."
        },
        "video": {
            "description": "A corporate design team reviewing physical samples of promotional items to evaluate logo placement, color accuracy, and material durability for an upcoming global product launch."
        },
        "toeicContext": {
            "commonParts": [3, 4, 7],
            "exampleQuestion": "The marketing department announced that all promotional giveaways for the annual trade show must adhere strictly to the updated corporate _______ guidelines to maintain visual consistency.\n(A) merchandise branding\n(B) merchandise branded\n(C) merchant brand\n(D) merchandiser",
            "tips": "In TOEIC incomplete sentences, look for the correct noun compound functioning as a direct object or modifier. 'merchandise branding guidelines' forms the exact noun phrase required."
        },
        "synonyms": ["promotional branding", "product branding", "goods customization", "corporate identity application"],
        "antonyms": [],
        "relatedWords": ["promotional items", "corporate identity", "retail merchandise", "brand equity", "swag", "packaging design"]
    },
    {
        "id": "marketing-222",
        "word": "messaging framework",
        "category": "marketing",
        "level": "advanced",
        "toeicFrequency": 7,
        "pronunciation": {
            "ipa": "/ˈmes.ɪ.dʒɪŋ ˈfreɪm.wɜːk/",
            "syllableBreakdown": "mes-sag-ing frame-work",
            "stressPattern": "Primary stress on the first syllable of 'messaging' ('mes-) and the first syllable of 'framework' ('frame-), with secondary stress on '-work'.",
            "commonMistakes": "Slurring 'messaging' into 'message' or omitting the precise structural context when discussing multi-channel communications."
        },
        "etymology": {
            "origin": "Compound of 'messaging' (gerund of 'message', from Old French 'message', from Latin 'missaticum' message/dispatch) and 'framework' (from 'frame' + 'work', denoting a supporting structure or skeleton).",
            "rootWord": "message / framework",
            "rootMeaning": "A supporting skeletal structure for communicating information.",
            "evolution": "Evolved from rhetorical communication structures in classical oratory into structured digital and corporate communication matrices used across marketing, PR, and product teams.",
            "relatedLanguages": ["French (cadre de message)", "German (Nachrichtenrahmen)", "Spanish (marco de mensajes)"],
            "firstRecordedUse": "Late 20th century in corporate communications and strategic marketing literature."
        },
        "deepMeaning": {
            "coreConcept": "A structured, hierarchical guide containing core value propositions, key pillars, elevator pitches, and proof points that ensures consistent communication across all marketing channels and organizational touchpoints.",
            "spatialContext": "Corporate strategy boardrooms, brand architecture documentation portals, cross-functional product launch meetings, and creative agency briefing sessions.",
            "temporalContext": "Developed during strategic rebrandings or major product introductions and referenced continuously during campaign execution.",
            "emotionalTone": "strategic",
            "formalityLevel": "formal",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "Senior marketers treat a messaging framework as the holy grail of consistency—a foundational document that prevents team members from going off-script and keeps every piece of collateral aligned with the brand's core narrative.",
            "mentalImage": "A sophisticated multi-tiered digital architecture diagram displayed on a conference room whiteboard, outlining core pillars branching down into customer pain points, value propositions, and localized elevator pitches.",
            "whenToUse": "When discussing copywriting alignment, PR messaging, product launches, or agency briefings.",
            "whenNotToUse": "Do not use for casual instant messaging between coworkers or technical software architecture.",
            "culturalContext": "Essential in large matrixed enterprises where multiple departments (sales, marketing, customer success) must speak with one unified voice to global markets."
        },
        "examples": {
            "daily": [
                "The copywriter referred to the new messaging framework before drafting the email campaign.",
                "Having a clear messaging framework helps everyone on the team explain the product in the exact same way.",
                "We updated our messaging framework to highlight our new cloud security features."
            ],
            "business": [
                "The product marketing manager shared the finalized messaging framework with the sales enablement team.",
                "Without a rigorous messaging framework, our cross-channel campaigns risked confusing potential enterprise clients.",
                "During the workshop, we refined the core pillars within our messaging framework to better address enterprise security concerns."
            ],
            "conversation": [
                "Colleague A: 'Does the press release align with our Q3 value props?'\nColleague B: 'Yes, I checked every paragraph against our approved messaging framework.'",
                "Director: 'Why is the pitch deck feeling disjointed?'\nConsultant: 'Because the sales team hasn't been using the updated messaging framework.'"
            ],
            "collocations": [
                "comprehensive messaging framework",
                "messaging framework document",
                "update the messaging framework",
                "messaging framework pillars",
                "unified messaging framework"
            ]
        },
        "wordFamily": {
            "noun": "messaging framework / message",
            "verb": "message / framework",
            "adjective": "structured / messaging-aligned",
            "adverb": "strategically"
        },
        "visual": {
            "imageKeyword": "marketing strategy messaging framework diagram whiteboard",
            "imageDescription": "A collaborative marketing strategy session in a modern office, where a team is reviewing a detailed messaging framework chart on a glass whiteboard with sticky notes.",
            "mnemonic": "Think of a 'frame' holding up a strong house of words ('messaging')."
        },
        "video": {
            "description": "A senior brand strategist leading a webinar on how to build a scalable messaging framework that unifies sales and marketing communications."
        },
        "toeicContext": {
            "commonParts": [6, 7],
            "exampleQuestion": "All department heads must review the proposed _______ before approving any external public relations releases or advertising copy.\n(A) messaging framework\n(B) message frame\n(C) messenger framework\n(D) message work",
            "tips": "In TOEIC business reading texts (Part 6 and 7), look for compound nouns like 'messaging framework' that denote strategic corporate documentation."
        },
        "synonyms": ["communication matrix", "messaging architecture", "narrative structure", "brand messaging guide"],
        "antonyms": [],
        "relatedWords": ["value proposition", "brand pillar", "elevator pitch", "copywriting guide", "corporate communications", "strategic narrative"]
    },
    {
        "id": "marketing-223",
        "word": "metric tracking",
        "category": "marketing",
        "level": "advanced",
        "toeicFrequency": 7,
        "pronunciation": {
            "ipa": "/ˈmet.rɪk ˈtræk.ɪŋ/",
            "syllableBreakdown": "met-ric track-ing",
            "stressPattern": "Primary stress on the first syllable of 'metric' ('met-) and the first syllable of 'tracking' ('track-).",
            "commonMistakes": "Pronouncing 'metric' with a long e sound or confusing 'tracking' with 'tracing'."
        },
        "etymology": {
            "origin": "Compound of 'metric' (from Greek 'metron' measure, via French 'métrique') and 'tracking' (gerund of 'track', from Old Norse 'trak' footprint/path).",
            "rootWord": "metric / track",
            "rootMeaning": "Measuring and following the path or progress of quantitative indicators.",
            "evolution": "Transitioned from manual industrial record-keeping and financial ledger monitoring to automated digital analytics dashboards measuring campaign performance.",
            "relatedLanguages": ["French (suivi des métriques)", "German (Metrikverfolgung)", "Spanish (seguimiento de métricas)"],
            "firstRecordedUse": "Late 20th century in digital marketing, project management, and business intelligence analytics."
        },
        "deepMeaning": {
            "coreConcept": "The continuous systematic collection, analysis, and monitoring of quantitative performance indicators (KPIs) to evaluate the success, efficiency, and ROI of marketing campaigns or business operations.",
            "spatialContext": "Digital marketing operations centers, business intelligence dashboards, quarterly review boardrooms, and analytics software suites.",
            "temporalContext": "Real-time, daily, weekly, and monthly tracking cycles tied to campaign lifecycles and fiscal reporting periods.",
            "emotionalTone": "analytical",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Data-driven marketing executives treat metric tracking as the heartbeat of accountability—ensuring every marketing dollar spent is justified by verifiable conversion rates, cost-per-acquisition, and revenue attribution.",
            "mentalImage": "Dual widescreen monitors glowing in a dimly lit analytics room, displaying real-time traffic graphs, conversion rate funnels, and fluctuating ROI percentages.",
            "whenToUse": "When discussing campaign performance analysis, analytics dashboards, KPI monitoring, or ROI reporting.",
            "whenNotToUse": "Do not use for intuitive creative brainstorming sessions or artistic design evaluations.",
            "culturalContext": "Crucial in modern data-driven corporate environments where gut feeling is superseded by empirical performance evidence."
        },
        "examples": {
            "daily": [
                "Rigorous metric tracking revealed that our Tuesday email blasts had the highest open rates.",
                "She set up automated metric tracking for the new social media campaign.",
                "Without proper metric tracking, it is impossible to know which ads are driving sales."
            ],
            "business": [
                "The chief marketing officer emphasized that continuous metric tracking is essential for optimizing advertising spend.",
                "Our analytics team implemented advanced metric tracking tools to monitor user engagement across mobile platforms.",
                "Weekly metric tracking reports are presented every Monday morning to the executive steering committee."
            ],
            "conversation": [
                "Colleague A: 'How are we measuring the success of the retargeting ads?'\nColleague B: 'Real-time metric tracking on our analytics dashboard shows a 15% increase in conversions.'",
                "Manager: 'Are the tracking pixels working correctly?'\nAnalyst: 'Yes, metric tracking is fully operational and recording data accurately.'"
            ],
            "collocations": [
                "continuous metric tracking",
                "metric tracking tool",
                "metric tracking dashboard",
                "advanced metric tracking",
                "effective metric tracking"
            ]
        },
        "wordFamily": {
            "noun": "metric tracking / metrics / tracker",
            "verb": "track metrics",
            "adjective": "measurable / trackable",
            "adverb": "quantifiably"
        },
        "visual": {
            "imageKeyword": "data analytics dashboard charts graphs performance metrics screen",
            "imageDescription": "A close-up of a computer monitor displaying colorful interactive performance graphs, KPI dials, and analytical charts showing positive upward trends.",
            "mnemonic": "Think of a runner wearing a fitness tracker ('tracking') measuring every single step ('metric')."
        },
        "video": {
            "description": "A tutorial demonstration showing a digital marketer setting up custom event tracking and KPI dashboards in an enterprise analytics platform."
        },
        "toeicContext": {
            "commonParts": [3, 6, 7],
            "exampleQuestion": "To evaluate the effectiveness of the digital ad campaign, the analytics team relies on continuous _______ across all social media channels.\n(A) metric tracking\n(B) measure track\n(C) metricly tracked\n(D) metrician",
            "tips": "In TOEIC business vocabulary questions, 'metric tracking' is the standard collocational noun phrase for monitoring KPIs and digital performance."
        },
        "synonyms": ["performance monitoring", "analytics tracking", "KPI measurement", "data logging"],
        "antonyms": [],
        "relatedWords": ["key performance indicator", "analytics dashboard", "conversion rate", "data attribution", "ROI analysis", "business intelligence"]
    }
]

output_data = {"words": entries}
print(json.dumps(output_data, indent=2))
