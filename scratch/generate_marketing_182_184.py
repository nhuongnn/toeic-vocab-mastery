import json

words_data = [
    {
        "id": "marketing-182",
        "word": "hyperlocal advertising",
        "partOfSpeech": ["noun"],
        "category": "marketing",
        "level": "advanced",
        "toeicFrequency": 7,
        "pronunciation": {
            "ipa": "/ˌhaɪpərˈloʊkəl ˈædvərˌtaɪzɪŋ/",
            "syllableBreakdown": "hy-per-lo-cal ad-ver-ti-sing",
            "stressPattern": "primary stress on the third syllable of 'hyperlocal' (lo) and secondary stress on 'hy', with primary stress on 'ver' in advertising (hy-per-LO-cal AD-ver-ti-sing)",
            "commonMistakes": "Non-native speakers frequently mispronounce the prefix 'hyper-' with a short /ɪ/ sound (*hi-per-local*) instead of the correct diphthong /aɪ/ (*hy-per-*). They also often blend the words together or misplace syllable stress, incorrectly emphasizing 'hy' (*HY-per-local*)."
        },
        "etymology": {
            "origin": "Modern compound term formed by combining 'hyper-' (derived from Ancient Greek 'hýpér' [over, beyond, above]) + 'local' (from Late Latin 'localis', from Latin 'locus' [place, spot]), paired with 'advertising' (from Latin 'advertere' [to turn toward]).",
            "rootWord": "Greek 'hýpér' (beyond/excessive) + Latin 'locus' (place) + Latin 'advertere' (to turn toward)",
            "rootMeaning": "Literally 'directing promotional attention excessively or precisely toward a specific, ultra-narrow geographic place or locality'",
            "evolution": "The term emerged in digital marketing and journalism literature in the mid-2000s (circa 2005-2007) with the proliferation of GPS-enabled smartphones, geofencing technologies, and location-based mobile applications. While traditional advertising targeted broad regional or national markets (e.g., metropolitan statistical areas), 'hyperlocal advertising' evolved to denote micro-targeting consumers within a radius of a few blocks or miles from a physical storefront using real-time location data.",
            "relatedLanguages": [
                "French: publicité hyperlocale",
                "Spanish: publicidad hiperlocal",
                "German: hyperlokale Werbung",
                "Italian: pubblicità iperlocale"
            ],
            "firstRecordedUse": "Mid-2000s (c. 2005-2006, during the early commercial adoption of mobile location-based advertising services and neighborhood-specific digital directories)"
        },
        "deepMeaning": {
            "coreConcept": "A targeted digital marketing strategy that delivers promotional messages, mobile ads, or sponsored content to consumers within a very restricted, highly specific geographic area—often down to a specific neighborhood, zip code, street, or storefront radius—utilizing GPS tracking and mobile geofencing.",
            "spatialContext": "Urban retail districts, shopping malls, neighborhood business corridors, digital marketing agency operations centers, and mobile programmatic bidding platforms.",
            "temporalContext": "Executed continuously or in real-time response to consumer proximity triggers (e.g., sending a promotional discount push notification when a user walks within 500 meters of a brick-and-mortar cafe).",
            "emotionalTone": "Urgent, relevant, persuasive, and community-focused.",
            "formalityLevel": "formal",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "Native digital marketing professionals view 'hyperlocal advertising' as the ultimate evolution of geographical targeting, distinguishing it sharply from broad regional billboard or television campaigns. When business leaders discuss this strategy, they immediately picture smartphone push notifications, geofenced radius boundaries around retail stores, neighborhood-specific search engine optimization (SEO), and immediate foot traffic conversion.",
            "mentalImage": "A smartphone screen displaying a targeted local coffee shop advertisement with a map showing the store is precisely 0.2 miles away, accompanied by a limited-time morning discount code.",
            "whenToUse": "Use when discussing precision geographic marketing campaigns designed to drive immediate foot traffic to physical retail outlets, local restaurants, or regional service providers (e.g., 'Our retail division allocated 40 percent of the digital budget to hyperlocal advertising to boost weekend foot traffic').",
            "whenNotToUse": "Do not use when describing nationwide brand awareness campaigns, global product launches, or mass media broadcasting across television and radio networks.",
            "culturalContext": "In modern consumer culture, hyperlocal advertising capitalizes on the expectation of immediate local convenience and hyper-personalized digital experiences, bridging the gap between online browsing and physical neighborhood commerce."
        },
        "examples": {
            "daily": [
                "Whenever I walk past the downtown bakery, my phone alerts me to their daily pastry specials through hyperlocal advertising.",
                "The neighborhood hardware store used hyperlocal advertising on social media to attract homeowners living within a three-mile radius.",
                "Local community newspapers have successfully transitioned their print inserts into digital hyperlocal advertising packages for small businesses."
            ],
            "business": [
                "The retail franchise allocated sixty percent of its digital budget toward hyperlocal advertising to maximize foot traffic in newly opened branches.",
                "By implementing geofenced hyperlocal advertising campaigns, the coffee chain achieved a twenty-five percent increase in mobile coupon redemptions.",
                "Our marketing team collaborated with a geospatial analytics vendor to refine our hyperlocal advertising radius around each urban outlet."
            ],
            "conversation": [
                "Colleague A: 'How are we planning to drive weekend visitors to our newly opened flagship store downtown?'\nColleague B: 'We are launching a geofenced hyperlocal advertising campaign targeting mobile users within a two-mile radius.'",
                "Manager: 'Are our digital ad expenditures yielding tangible in-store purchases?'\nAnalyst: 'Yes, our hyperlocal advertising metrics show a direct correlation between mobile impression delivery and weekend cash register transactions.'"
            ],
            "collocations": [
                "hyperlocal advertising campaign",
                "hyperlocal advertising strategy",
                "hyperlocal advertising budget",
                "geofenced hyperlocal advertising",
                "hyperlocal advertising platform",
                "hyperlocal mobile advertising"
            ]
        },
        "wordFamily": {
            "noun": "hyperlocalism / hyperlocal advertising",
            "verb": "advertise hyperlocal campaigns",
            "adjective": "hyperlocal",
            "adverb": "hyperlocally"
        },
        "visual": {
            "imageKeyword": "smartphone map geofencing advertising retail",
            "imageDescription": "A close-up photograph of a smartphone held in a person's hand on a city sidewalk, displaying a map interface with a glowing geofenced radius circle and a promotional discount pop-up for a nearby boutique coffee shop.",
            "mnemonic": "Remember 'hyper' (ultra-energetic focus) + 'local' (right in your neighborhood) = advertising that zeroes in on your exact street corner."
        },
        "video": {
            "description": "A digital marketing webinar case study demonstrating how a regional restaurant chain set up geofenced mobile push notifications and map ads to capture nearby lunch commuters."
        },
        "toeicContext": {
            "commonParts": [3, 6, 7],
            "exampleQuestion": "To attract neighborhood residents to the newly inaugurated downtown branch, the marketing director recommended shifting a portion of the promotional budget toward ____ campaigns.",
            "options": [
                "(A) macroeconomic",
                "(B) hyperlocal",
                "(C) interplanetary",
                "(D) transcontinental"
            ],
            "tips": "In TOEIC Part 5 vocabulary questions involving compound modifiers, analyze the contextual clues. Here, the text mentions 'attracting neighborhood residents to the newly inaugurated downtown branch', which points directly to a narrow, neighborhood-level geographic scope ('hyperlocal'). Distractors like 'macroeconomic' or 'transcontinental' represent completely incorrect scales of operation."
        },
        "synonyms": [
            "neighborhood targeting",
            "geofenced advertising",
            "localized marketing",
            "proximity advertising",
            "micro-geographic advertising"
        ],
        "antonyms": [
            "national advertising",
            "mass marketing",
            "global advertising",
            "broadcast advertising"
        ],
        "relatedWords": [
            "geofencing",
            "location-based services",
            "programmatic advertising",
            "mobile marketing",
            "local SEO",
            "target audience",
            "foot traffic"
        ]
    },
    {
        "id": "marketing-183",
        "word": "impression share",
        "partOfSpeech": ["noun"],
        "category": "marketing",
        "level": "advanced",
        "toeicFrequency": 7,
        "pronunciation": {
            "ipa": "/ɪmˈprɛʃən ʃɛər/",
            "syllableBreakdown": "im-pres-sion share",
            "stressPattern": "primary stress on the second syllable of impression (im-PRES-sion) and primary stress on share (im-PRES-sion SHARE)",
            "commonMistakes": "Non-native speakers sometimes mispronounce 'impression' by omitting the cluster /pr/ or confusing the nasal /m/ with /n/. They may also confuse impression share (percentage of eligible ad views captured) with click-through rate (percentage of viewers who actually click)."
        },
        "etymology": {
            "origin": "Compound term consisting of 'impression' (from Latin 'impressio' [an impression, imprint, stamp], from 'imprimere' [to press into]) + 'share' (from Old English 'scearu' [a shear, cutting, portion, division]).",
            "rootWord": "Latin 'imprimere' (to press upon) + Old English 'scearu' (portion/divide)",
            "rootMeaning": "Literally 'the divided portion of total view imprints or visual exposures obtained by an advertisement relative to all eligible opportunities'",
            "evolution": "The term originated in the early 2000s with the rise of paid search engine advertising (such as Google AdWords) and digital display networks. As platforms introduced algorithmic auctions where advertisers competed for limited screen space, metric dashboards required a standardized key performance indicator (KPI) to measure market visibility dominance. 'Impression share' was established to quantify how often an ad appeared compared to the total number of times it was eligible to appear.",
            "relatedLanguages": [
                "French: part d'impressions",
                "Spanish: cuota de impresiones",
                "German: Impressionen-Anteil",
                "Italian: quota di impressioni"
            ],
            "firstRecordedUse": "Early 2000s (c. 2003-2005, in digital advertising platform analytics documentation and PPC campaign management literature)"
        },
        "deepMeaning": {
            "coreConcept": "A key performance indicator in digital advertising that measures the percentage of total eligible impressions your ads actually received compared to the estimated total number of impressions your ads were qualified to receive based on keyword targeting, budget, and ad rank.",
            "spatialContext": "Digital marketing analytics dashboards, PPC campaign performance review meetings, media planning agency workspaces, and corporate executive boardrooms.",
            "temporalContext": "Calculated and monitored weekly, monthly, or quarterly to evaluate competitive visibility and budget adequacy.",
            "emotionalTone": "Analytical, objective, strategic, and performance-oriented.",
            "formalityLevel": "formal",
            "connotation": "neutral"
        },
        "nativeMindset": {
            "howNativesThink": "Digital marketers and media buyers view 'impression share' as the definitive yardstick of market presence and bidding competitiveness. When an expert reviews a low impression share, they immediately think of two bottlenecks: either the daily budget is exhausted too quickly ('budget lost IS') or the bidding bids/quality scores are too low to win auctions against competitors ('rank lost IS').",
            "mentalImage": "A pie chart on a marketing analyst's computer screen showing a digital advertising campaign capturing 45 percent of the total available search impressions in a competitive auction, with 55 percent lost to rival bidders.",
            "whenToUse": "Use when analyzing search engine marketing performance, diagnosing budget constraints, evaluating market share in digital auctions, or optimizing pay-per-click bidding strategies (e.g., 'We need to increase our daily budget to raise our search impression share above eighty percent').",
            "whenNotToUse": "Do not use when discussing offline media ratings, television viewership shares (which use 'ratings' or 'audience share'), or general sales market share.",
            "culturalContext": "In the modern digital economy, winning visibility in crowded online auctions determines market leadership; thus, monitoring impression share is critical for maintaining competitive advantage against rival firms."
        },
        "examples": {
            "daily": [
                "When I checked our marketing dashboard this morning, I noticed our search impression share had dropped due to a competitor's increased bidding.",
                "The digital marketing intern prepared a comprehensive weekly report highlighting our campaign's impression share across three major search engines.",
                "To understand why our website traffic declined, the media planner analyzed our lost impression share resulting from budget constraints."
            ],
            "business": [
                "Our search engine marketing campaign achieved an impression share of seventy-eight percent during the peak holiday shopping season.",
                "By optimizing our keyword quality scores and raising maximum bids, the digital agency successfully increased our brand's impression share by fifteen points.",
                "The CMO reviewed the quarterly performance report, noting that budget-lost impression share was limiting our potential lead generation."
            ],
            "conversation": [
                "Analyst: 'Our impression share on primary commercial keywords has slipped below fifty percent this month.'\nDirector: 'Is that due to budget caps or insufficient ad relevance?'\nAnalyst: 'Mostly budget caps; our daily spend limit is reached by early afternoon.'",
                "Manager: 'How can we outrank our primary competitor for product category searches?'\nSpecialist: 'We need to improve our quality score and increase our bid cap to capture a higher impression share.'"
            ],
            "collocations": [
                "search impression share",
                "lost impression share (budget)",
                "lost impression share (rank)",
                "target impression share",
                "increase impression share",
                "monitor impression share"
            ]
        },
        "wordFamily": {
            "noun": "impression share / impression",
            "verb": "share impressions",
            "adjective": "impressionable",
            "adverb": "impressively"
        },
        "visual": {
            "imageKeyword": "digital marketing analytics dashboard pie chart metrics",
            "imageDescription": "A laptop screen displaying an advanced PPC advertising analytics dashboard with colorful graphs and percentage metrics showing search impression share and lost impression share breakdowns.",
            "mnemonic": "Think of 'impression' (how many times your ad is seen) divided into a 'share' of the total pie available in the market auction."
        },
        "video": {
            "description": "An instructional tutorial video from a digital advertising academy explaining how to interpret search impression share, lost impression share (rank vs. budget), and how to optimize bids."
        },
        "toeicContext": {
            "commonParts": [6, 7],
            "exampleQuestion": "Because the company's daily advertising budget was exhausted by noon every day, its search ____ dropped significantly during the peak retail season.",
            "options": [
                "(A) impression share",
                "(B) employee turnover",
                "(C) inventory turnover",
                "(D) operating margin"
            ],
            "tips": "In TOEIC business reading and vocabulary questions, match technical terms with their proper domain. Here, the context explicitly discusses 'advertising budget' and 'search', which connects directly to 'impression share'. Financial terms like 'operating margin' or 'inventory turnover' do not belong to digital advertising metrics."
        },
        "synonyms": [
            "visibility share",
            "advertising visibility rate",
            "search presence percentage",
            "auction share"
        ],
        "antonyms": [],
        "relatedWords": [
            "pay-per-click",
            "click-through rate",
            "quality score",
            "ad rank",
            "search engine marketing",
            "bidding strategy",
            "cost-per-click"
        ]
    },
    {
        "id": "marketing-184",
        "word": "inbound marketing",
        "partOfSpeech": ["noun"],
        "category": "marketing",
        "level": "advanced",
        "toeicFrequency": 7,
        "pronunciation": {
            "ipa": "/ˈɪnˌbaʊnd ˈmɑːrkɪtɪŋ/",
            "syllableBreakdown": "in-bound mar-ket-ing",
            "stressPattern": "primary stress on the first syllable of inbound (IN-bound) and primary stress on the first syllable of marketing (MAR-ket-ing)",
            "commonMistakes": "Non-native speakers often mispronounce the diphthong /aʊ/ in inbound as /uː/ (*in-boond*). They also frequently confuse 'inbound marketing' (attracting customers via valuable content, SEO, and organic search) with 'outbound marketing' (traditional interruptive methods like cold calling, TV commercials, and direct mail)."
        },
        "etymology": {
            "origin": "Compound of 'inbound' (from 'in' [prefix denoting interior or inward direction] + 'bound', from Old Norse 'búinn' [ready, prepared, heading toward]) + 'marketing' (from Latin 'mercare' [to traffic or trade]).",
            "rootWord": "Old English/Norse 'in' + 'bound' (heading inward) + Latin 'mercare' (to trade)",
            "rootMeaning": "Literally 'commercial activity or trade directed inward, drawing customers toward your business rather than chasing them outward'",
            "evolution": "The term was popularized in 2005 by Brian Halligan and Dharmesh Shah, co-founders of HubSpot, to describe a paradigm shift in commercial promotion. As consumers grew increasingly adept at blocking traditional interruptive advertising (such as banner ads, pop-ups, and cold calls), 'inbound marketing' emerged as a methodology focused on earning customer attention through high-quality content, search engine optimization, blogging, and social media engagement.",
            "relatedLanguages": [
                "French: marketing entrant",
                "Spanish: marketing de atracción / inbound marketing",
                "German: Inbound-Marketing",
                "Italian: inbound marketing"
            ],
            "firstRecordedUse": "2005 (coined and popularized by HubSpot founders Brian Halligan and Dharmesh Shah)"
        },
        "deepMeaning": {
            "coreConcept": "A business methodology and marketing strategy focused on attracting customers through relevant and helpful content, organic search engine optimization, blogging, and social media engagement, rather than interrupting them with traditional outbound advertising.",
            "spatialContext": "Content marketing agency offices, corporate digital strategy departments, SEO analytics workstations, and corporate blogging platforms.",
            "temporalContext": "An ongoing, long-term strategic approach requiring consistent content creation, lead nurturing workflows, and audience engagement over months and years.",
            "emotionalTone": "Educational, welcoming, strategic, and customer-centric.",
            "formalityLevel": "formal",
            "connotation": "positive"
        },
        "nativeMindset": {
            "howNativesThink": "Native marketing professionals view 'inbound marketing' as a philosophical and tactical shift away from intrusive cold outreach ('push' marketing) toward magnet-like value creation ('pull' marketing). When hearing the term, they immediately visualize educational blog posts, whitepapers, search engine optimization (SEO), email lead nurturing sequences, and organic funnel conversion.",
            "mentalImage": "A modern content creation team collaborating around a whiteboard to outline a comprehensive educational e-book and webinar series designed to draw prospective clients organically to their corporate website.",
            "whenToUse": "Use when discussing modern digital lead generation strategies that rely on content creation, organic search visibility, and customer trust-building (e.g., 'Our startup decided to shift its entire promotional strategy from expensive trade shows to inbound marketing').",
            "whenNotToUse": "Do not use when describing interruptive advertising tactics such as cold calling, direct mail flyers, television commercials, or paid banner ads (which are classified as 'outbound marketing').",
            "culturalContext": "In contemporary business culture, inbound marketing reflects the empowerment of modern consumers who prefer to research products and educate themselves online independently before ever speaking to a sales representative."
        },
        "examples": {
            "daily": [
                "Instead of cold-calling prospective clients all afternoon, our sales team relies on inbound marketing to generate qualified online leads.",
                "I discovered this accounting software company by reading their incredibly helpful tax preparation blog posts through inbound marketing.",
                "Our local community workshop taught small business owners how to use inbound marketing to build a loyal customer base online."
            ],
            "business": [
                "The technology firm restructured its entire commercial division, replacing traditional outbound sales tactics with a comprehensive inbound marketing strategy.",
                "By publishing authoritative whitepapers and optimizing our website for search engines, our inbound marketing efforts doubled our monthly lead volume.",
                "The chief marketing officer presented a case study on how inbound marketing significantly lowered customer acquisition costs compared to paid advertising."
            ],
            "conversation": [
                "Manager: 'Are our cold-calling campaigns still yielding profitable returns?'\nDirector: 'Not really; conversion rates have plummeted. We should invest more heavily in inbound marketing.'",
                "Colleague A: 'How did we acquire so many high-value enterprise clients this quarter?'\nColleague B: 'Through our inbound marketing funnel; they downloaded our industry research report and requested a consultation.'"
            ],
            "collocations": [
                "inbound marketing strategy",
                "inbound marketing campaign",
                "inbound marketing methodology",
                "inbound marketing agency",
                "inbound marketing funnel",
                "inbound marketing efforts"
            ]
        },
        "wordFamily": {
            "noun": "inbound marketing / inbound marketer",
            "verb": "market inbound",
            "adjective": "inbound",
            "adverb": "inboundly"
        },
        "visual": {
            "imageKeyword": "content marketing inbound strategy whiteboard laptop",
            "imageDescription": "A collaborative office scene where digital marketing strategists are brainstorming customer journey maps and content funnels on a glass whiteboard next to laptops displaying SEO analytics.",
            "mnemonic": "Think of 'inbound' (traveling inward toward the center, like a magnet pulling visitors to your site) vs 'outbound' (pushing messages outward into the void)."
        },
        "video": {
            "description": "An educational keynote presentation explaining the core pillars of inbound marketing (Attract, Engage, Delight) and how content creation drives sustainable business growth."
        },
        "toeicContext": {
            "commonParts": [3, 6, 7],
            "exampleQuestion": "To reduce customer acquisition costs and build long-term brand trust, the firm decided to focus on ____ by publishing educational articles and industry whitepapers.",
            "options": [
                "(A) inbound marketing",
                "(B) outbound telemarketing",
                "(C) cold calling",
                "(D) intrusive advertising"
            ],
            "tips": "In TOEIC reading and vocabulary items, pay close attention to contextual definitions. The clue 'publishing educational articles and industry whitepapers to build trust and attract customers' directly defines 'inbound marketing'. Distractors like 'cold calling' and 'telemarketing' represent interruptive outbound methods."
        },
        "synonyms": [
            "content marketing",
            "permission marketing",
            "pull marketing",
            "organic marketing",
            "attraction marketing"
        ],
        "antonyms": [
            "outbound marketing",
            "interruptive marketing",
            "push marketing",
            "cold outreach"
        ],
        "relatedWords": [
            "content creation",
            "search engine optimization",
            "lead nurturing",
            "sales funnel",
            "blogging",
            "lead generation",
            "customer persona"
        ]
    }
]

output = {"words": words_data}
with open("scratch/marketing_words_182_184.json", "w", encoding="utf-8") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)
