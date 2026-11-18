import json

words = [
  {
    "id": "mfg-273",
    "word": "turnaround time",
    "partOfSpeech": ["noun"],
    "category": "manufacturing",
    "level": "advanced",
    "toeicFrequency": 7,
    "pronunciation": {
      "ipa": "/ˈtɜːrnəraʊnd taɪm/",
      "syllableBreakdown": "turn-a-round time",
      "stressPattern": "Primary stress on \"turn\" (ˈtɜːrn) and \"time\" (taɪm); secondary stress on \"round\" (raʊnd).",
      "commonMistakes": "Learners often mispronounce the diphthong /aʊnd/ as /oʊnd/ or misplace the compound stress, treating every syllable with equal weight.",
      "audioUrl": ""
    },
    "etymology": {
      "origin": "Compound of the verbal phrase \"turn around\" (derived from Middle English \"turnen\" and Old French \"tourner\", from Latin \"tornare\" - to turn on a lathe, combined with Old English \"ymbe\"/\"around\") and Old English \"tīma\" (time).",
      "rootWord": "turn + around + time",
      "rootMeaning": "The act of turning something completely back or reversing its direction, coupled with the duration required.",
      "evolution": "Originally used in logistics and shipping to describe the time required to unload and reload a vessel or vehicle (mid-20th century). Expanded rapidly into manufacturing (cycle time), IT (response time), and general corporate administration to denote total elapsed time from task initiation to completion.",
      "relatedLanguages": ["Old French", "Latin", "Old English", "Germanic"],
      "firstRecordedUse": "Circa 1935–1940 in aviation and maritime freight logistics literature."
    },
    "deepMeaning": {
      "coreConcept": "The total elapsed time required to complete a specific process, workflow, manufacturing cycle, repair operation, or administrative request from the initial submission or trigger point to final delivery and sign-off.",
      "spatialContext": "Manufacturing plant floors, logistics fulfillment hubs, repair workshops, IT service desks, and corporate administrative offices.",
      "temporalContext": "Continuous operational monitoring; measured in hours, days, or weeks depending on the complexity of the industrial workflow or service request.",
      "emotionalTone": "Objective, efficiency-driven, urgent, performance-critical.",
      "formalityLevel": "formal",
      "connotation": "neutral"
    },
    "nativeMindset": {
      "howNativesThink": "Native business and manufacturing professionals view turnaround time as a vital Key Performance Indicator (KPI) directly tied to operational velocity, customer satisfaction, and supply chain competitiveness. A shorter turnaround time signals lean efficiency and high productivity, whereas a prolonged turnaround time indicates bottlenecks, equipment downtime, or systemic inefficiencies.",
      "mentalImage": "A digital countdown clock and real-time dashboard on a factory floor wall displaying the production cycle time for an assembly line batch, alongside a clipboard tracking incoming raw material processing rates.",
      "whenToUse": "Use when discussing industrial production cycles, delivery schedules, repair lead times, laboratory test results, or administrative processing periods.",
      "whenNotToUse": "Do not use for static durations where no process is executed or completed (e.g., do not say \"the turnaround time of the building is five stories\").",
      "culturalContext": "In modern Western corporate culture, minimizing turnaround time is paramount due to just-in-time (JIT) manufacturing principles and high consumer expectations for rapid service delivery."
    },
    "examples": {
      "daily": [
        "The local repair shop guaranteed a 48-hour turnaround time for servicing laptops.",
        "We need to reduce the turnaround time for processing customer refund requests.",
        "The printing company promised a quick turnaround time for our promotional flyers."
      ],
      "business": [
        "By upgrading our CNC machining centers, we reduced part fabrication turnaround time by 30%.",
        "Strict adherence to supplier turnaround times ensures our assembly plant never faces inventory stockouts.",
        "The logistics manager reviewed the port terminal turnaround times for incoming container ships."
      ],
      "conversation": [
        "Colleague A: \"What is our current turnaround time for custom hydraulic cylinder orders?\"\nColleague B: \"We are averaging about ten business days from engineering approval to final quality inspection.\"",
        "Manager: \"Can the testing lab expedite this batch?\"\nTechnician: \"Their standard turnaround time is five days, but I can request priority rush processing for an additional fee.\""
      ],
      "collocations": [
        "reduce turnaround time",
        "fast turnaround time",
        "average turnaround time",
        "guaranteed turnaround time",
        "turnaround time of",
        "improve turnaround time"
      ]
    },
    "wordFamily": {
      "noun": "turnaround",
      "verb": "turn around",
      "adjective": "turnaround",
      "adverb": ""
    },
    "visual": {
      "imageKeyword": "factory production dashboard stopwatch industrial logistics",
      "imageDescription": "A modern manufacturing control room featuring large digital monitors displaying real-time cycle times, throughput metrics, and efficiency graphs above an active automated assembly line.",
      "mnemonic": "Think of a vehicle *turning around* in a loading dock and driving back out—the *time* it takes from entry to exit is your **turnaround time**."
    },
    "video": {
      "description": "An industrial engineering tutorial explaining how lean manufacturing principles and value stream mapping help organizations systematically identify bottlenecks and compress operational turnaround times."
    },
    "toeicContext": {
      "commonParts": [3, 4, 6, 7],
      "exampleQuestion": "To maintain our competitive edge in contract manufacturing, the operations team must significantly reduce the ------- time for all machined components.\n(A) turnover\n(B) turnaround\n(C) turnover\n(D) overturn",
      "tips": "In TOEIC Part 5 and 6, watch out for collocations related to business efficiency. 'Turnaround time' is a fixed professional collocation referring to the duration of a process. Do not confuse it with 'turnover' (staff replacement or sales revenue)."
    },
    "synonyms": ["cycle time", "processing time", "lead time", "response time", "completion time", "elapsed time"],
    "antonyms": ["delay", "stagnation", "backlog"],
    "relatedWords": ["throughput", "efficiency", "lead time", "bottleneck", "workflow", "cycle time", "delivery schedule"]
  },
  {
    "id": "mfg-274",
    "word": "ultrasonic testing",
    "partOfSpeech": ["noun"],
    "category": "manufacturing",
    "level": "advanced",
    "toeicFrequency": 7,
    "pronunciation": {
      "ipa": "/ˌʌltrəˈsɒnɪk ˈtestɪŋ/",
      "syllableBreakdown": "ul-tra-son-ic test-ing",
      "stressPattern": "Primary stress on the second syllable of ultrasonic (ˈsɒn) and first syllable of testing (ˈtes); secondary stress on the first syllable of ultrasonic (ˌʌl).",
      "commonMistakes": "Pronouncing 'ultrasonic' with stress on the first syllable or dropping the /s/ sound in testing.",
      "audioUrl": ""
    },
    "etymology": {
      "origin": "Combination of Latin \"ultra\" (beyond, exceeding) + English \"sonic\" (pertaining to sound, from Latin \"sonus\" - sound), combined with English \"testing\" (from Old French \"tastier\" - to taste/try).",
      "rootWord": "ultra + sonic + test",
      "rootMeaning": "Testing utilizing high-frequency sound waves beyond the limit of human hearing.",
      "evolution": "Developed during the mid-20th century as a non-destructive testing (NDT) method for detecting internal flaws in metals, welds, and composite structures without damaging the test specimen.",
      "relatedLanguages": ["Latin", "French", "Greek roots"],
      "firstRecordedUse": "Circa 1940–1945 in aerospace and heavy industrial metallurgy literature."
    },
    "deepMeaning": {
      "coreConcept": "A non-destructive testing (NDT) technique that transmits high-frequency acoustic waves (above 20 kHz) into a material to detect internal structural flaws, measure thickness, evaluate bond integrity, or characterize material properties.",
      "spatialContext": "Quality assurance laboratories, aerospace manufacturing facilities, shipyard fabrication bays, pipeline inspection sites, and heavy machinery testing floors.",
      "temporalContext": "Performed during incoming raw material inspection, post-welding quality checks, or periodic structural maintenance shutdowns.",
      "emotionalTone": "Technical, precise, rigorous, safety-critical.",
      "formalityLevel": "formal",
      "connotation": "positive"
    },
    "nativeMindset": {
      "howNativesThink": "Engineers and quality control inspectors view ultrasonic testing as an indispensable, state-of-the-art safeguard ensuring structural integrity and preventing catastrophic mechanical failures. It is prized because it inspects critical components internally without cutting or destroying them.",
      "mentalImage": "An NDT technician wearing safety glasses applying couplant gel to a heavy steel pressure vessel weld and gliding a handheld piezoelectric transducer probe while observing real-time echo waveforms on an oscilloscope screen.",
      "whenToUse": "Use when discussing quality control, non-destructive evaluation (NDE), weld inspections, aerospace component verification, and structural safety audits.",
      "whenNotToUse": "Do not use for general auditory tests or medical ultrasound imaging (though related in principle, medical contexts use 'ultrasound' or 'sonography').",
      "culturalContext": "Essential in heavily regulated industries like aerospace, nuclear power, oil and gas, and automotive manufacturing, where structural failure carries catastrophic liabilities."
    },
    "examples": {
      "daily": [
        "The technician performed ultrasonic testing on the aluminum beams before they were cleared for construction.",
        "We learned how ultrasonic testing detects hidden micro-cracks inside forged steel shafts.",
        "All pressure vessels must undergo rigorous ultrasonic testing prior to final certification."
      ],
      "business": [
        "Our aerospace division mandates ultrasonic testing for every turbine blade manufactured in the foundry.",
        "The quality assurance director certified the inspection team in advanced ultrasonic testing standards.",
        "An independent auditor reviewed our ultrasonic testing logs to ensure compliance with ASME safety codes."
      ],
      "conversation": [
        "Quality Inspector: \"Did the weld on the primary support strut pass the inspection?\"\nTechnician: \"Yes, ultrasonic testing confirmed there are no subsurface porosities or incomplete fusions.\"",
        "Project Manager: \"Why is the delivery delayed?\"\nEngineer: \"We discovered a hairline inclusion during routine ultrasonic testing and had to scrap the forged block.\""
      ],
      "collocations": [
        "conduct ultrasonic testing",
        "ultrasonic testing inspection",
        "ultrasonic testing equipment",
        "perform ultrasonic testing",
        "ultrasonic testing procedure",
        "non-destructive ultrasonic testing"
      ]
    },
    "wordFamily": {
      "noun": "ultrasonic testing / ultrasonics",
      "verb": "test ultrasonically",
      "adjective": "ultrasonic",
      "adverb": "ultrasonically"
    },
    "visual": {
      "imageKeyword": "ultrasonic testing NDT weld inspection metal probe oscilloscope",
      "imageDescription": "A close-up of an industrial technician holding a specialized ultrasonic transducer probe against a polished steel plate, with a digital flaw detector screen displaying clear reflection echo peaks in the background.",
      "mnemonic": "Think of **ultra** (beyond normal) + **sonic** (sound) used to **test** hidden flaws inside metal using high-frequency sound waves."
    },
    "video": {
      "description": "An engineering demonstration video showcasing how pulse-echo ultrasonic testing works on steel welds, explaining wave propagation, transducer frequencies, and A-scan signal interpretation."
    },
    "toeicContext": {
      "commonParts": [3, 4, 6, 7],
      "exampleQuestion": "Before shipping the heavy turbine shafts to the client, the quality control department must complete rigorous ------- testing to detect any internal micro-cracks.\n(A) ultrasonic\n(B) acoustic\n(C) audio\n(D) resonant",
      "tips": "In TOEIC business reading and listening contexts involving manufacturing quality assurance, technical inspection methods frequently appear. Associate 'ultrasonic testing' with non-destructive examination of metals and welds."
    },
    "synonyms": ["ultrasonic inspection", "non-destructive testing (NDT)", "ultrasonic evaluation", "acoustic testing", "flaw detection"],
    "antonyms": [],
    "relatedWords": ["non-destructive testing", "quality control", "transducer", "defect detection", "weld inspection", "structural integrity", "metallurgy"]
  },
  {
    "id": "mfg-275",
    "word": "universal joint",
    "partOfSpeech": ["noun"],
    "category": "manufacturing",
    "level": "advanced",
    "toeicFrequency": 7,
    "pronunciation": {
      "ipa": "/ˌjuːnɪˈvɜːrsəl dʒɔɪnt/",
      "syllableBreakdown": "u-ni-ver-sal joint",
      "stressPattern": "Primary stress on the second syllable of universal (ˈvɜːr) and on joint (dʒɔɪnt); secondary stress on the first syllable (ˌjuː).",
      "commonMistakes": "Mispronouncing 'universal' with stress on the first syllable or failing to pronounce the liaison correctly between the two words.",
      "audioUrl": ""
    },
    "etymology": {
      "origin": "Derived from Latin \"universalis\" (belonging to all, universal, from \"unus\" - one and \"vertere\" - to turn), combined with Middle English \"joint\" (from Old French *joint*, past participle of *joindre*, from Latin *jungere* - to join).",
      "rootWord": "universal + joint",
      "rootMeaning": "A flexible coupling or connection that permits rotation and torque transmission between two shafts whose axes are not in a straight line.",
      "evolution": "First conceptualized in various forms by antiquity (Cardan joints named after Gerolamo Cardano, and Hooke's joints named after Robert Hooke in the 17th century). Became a critical mechanical component in automotive drivetrains, industrial machinery, and steering columns during the industrial revolution.",
      "relatedLanguages": ["Latin", "Old French", "Italian"],
      "firstRecordedUse": "Circa 1670–1680 in mechanical engineering and horology literature."
    },
    "deepMeaning": {
      "coreConcept": "A mechanical coupling device used to connect rotating rigid shafts whose axes intersect at an angle, allowing power and rotational torque to be transmitted smoothly while accommodating angular misalignment.",
      "spatialContext": "Automotive drivetrain assembly lines, industrial power transmission systems, machine tool gearboxes, agricultural equipment maintenance bays, and robotics manufacturing.",
      "temporalContext": "Continuous operational rotation under heavy mechanical load; inspected during routine vehicle or machinery preventative maintenance cycles.",
      "emotionalTone": "Mechanical, durable, functional, robust.",
      "formalityLevel": "formal",
      "connotation": "neutral"
    },
    "nativeMindset": {
      "howNativesThink": "Mechanical engineers and automotive technicians view the universal joint as a fundamental, high-stress mechanical linkage that solves the problem of transmitting rotational power between misaligned or moving components (such as a vehicle's transmission to its rear axle).",
      "mentalImage": "A heavy-duty steel cross-shaped spider bearing fitted with needle roller bearings inside yokes, connecting two angled drive shafts beneath an industrial truck chassis.",
      "whenToUse": "Use when discussing automotive engineering, mechanical power transmission, drive shafts, industrial machinery maintenance, and linkage design.",
      "whenNotToUse": "Do not use for electrical wire connections, plumbing pipe joints, or anatomical body joints (use 'articulation' or 'joint' in biology).",
      "culturalContext": "Widely recognized in mechanical manufacturing and automotive sectors as a classic engineering solution for angular power transmission."
    },
    "examples": {
      "daily": [
        "The mechanic noticed a clicking noise and diagnosed a worn universal joint in the drive shaft.",
        "Regular greasing of the universal joint prevents premature wear and mechanical failure.",
        "The farm tractor broke down because the universal joint on the power take-off shaft snapped."
      ],
      "business": [
        "Our automotive components plant supplies heavy-duty universal joints to major truck manufacturers.",
        "The engineering team redesigned the universal joint housing to withstand higher torsional loads.",
        "Quality auditors inspected the machining tolerances of the universal joint yokes on the assembly line."
      ],
      "conversation": [
        "Technician A: \"Why is the transmission vibrating intensely during acceleration?\"\nTechnician B: \"The needle bearings in the front universal joint have seized up; we need to replace the entire assembly.\"",
        "Purchasing Manager: \"Did our supplier deliver the heat-treated universal joints on schedule?\"\nInventory Clerk: \"Yes, all 500 units arrived this morning and passed incoming inspection.\""
      ],
      "collocations": [
        "universal joint assembly",
        "replace universal joint",
        "drive shaft universal joint",
        "heavy-duty universal joint",
        "universal joint failure",
        "lubricate universal joint"
      ]
    },
    "wordFamily": {
      "noun": "universal joint / u-joint",
      "verb": "join",
      "adjective": "universal",
      "adverb": "universally"
    },
    "visual": {
      "imageKeyword": "universal joint drive shaft mechanical coupling steel cross",
      "imageDescription": "A precision-machined steel universal joint (u-joint) featuring a central cross spider and yokes resting on a clean workshop workbench, highlighting its metallic luster and intricate bearing cups.",
      "mnemonic": "Think of a joint that is **universally** used to connect angled rotating shafts in cars and machinery—a **universal joint** (often abbreviated as U-joint)."
    },
    "video": {
      "description": "An animated mechanical engineering video illustrating how a Hooke's type universal joint transmits rotational motion between intersecting shafts and explaining velocity fluctuation at operating angles."
    },
    "toeicContext": {
      "commonParts": [3, 4, 6, 7],
      "exampleQuestion": "During the routine vehicle maintenance check, the technician recommended replacing the worn ------- joint to eliminate the persistent vibration in the drive shaft.\n(A) universal\n(B) general\n(C) global\n(D) common",
      "tips": "In TOEIC technical reading and listening passages, look out for fixed mechanical terminology. 'Universal joint' (or U-joint) is the standard professional term for this power transmission coupling."
    },
    "synonyms": ["u-joint", "Cardan joint", "Hooke's joint", "flexible coupling", "universal coupling"],
    "antonyms": [],
    "relatedWords": ["drive shaft", "transmission", "torque", "bearing", "axle", "power transmission", "yoke"]
  }
]
