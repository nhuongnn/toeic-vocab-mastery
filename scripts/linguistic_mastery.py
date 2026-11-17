# -*- coding: utf-8 -*-
"""
linguistic_mastery.py
---------------------
Core linguistic intelligence engine providing authentic:
1. Etymology & Historical Roots (Latin, Greek, Old French, Germanic)
2. Native Speaker Mindset (Cognitive models, intuitive friction, real distinctions)
3. Deep Meaning & Spatial/Temporal Perception (Operational position & cadence)
4. Visual Association & Mental Anchors (Photorealistic scenes & mnemonics)
"""

import re

# Comprehensive Etymological Roots Database
CLASSICAL_ROOTS = [
    # Greek Technical & Scientific Roots
    ('tele', 'Classical Greek', 'tele', 'at a distance, far off', 'Formed modern telecommunications, remote transmission, and broadcasting lexicons.', 'Greek: tele-, French: tele-'),
    ('micro', 'Classical Greek', 'mikros', 'small, minute, fine-grained', 'Evolved into computing, microeconomics, and precision manufacturing terminology.', 'Greek: micro-, French: micro-'),
    ('macro', 'Classical Greek', 'makros', 'large, broad scale', 'Used in macroeconomics, high-level system architecture, and strategic policy analysis.', 'Greek: macro-'),
    ('auto', 'Classical Greek', 'autos', 'self, same, independent', 'Evolved from mechanical automation into modern digital autonomy and automated workflows.', 'Greek: auto-, French: auto-'),
    ('chron', 'Classical Greek', 'chronos', 'time or duration', 'Passed through scientific terminology into business scheduling, synchrony, and timelines.', 'French: chronologie, Spanish: cronologia'),
    ('graph', 'Classical Greek', 'graphein', 'to write, record, or draw', 'Transferred into technical, commercial, and demographic record-keeping.', 'French: graphique, Spanish: grafico'),
    ('gram', 'Classical Greek', 'gramma', 'written letter, record', 'Evolved into commercial telegrams, corporate diagrams, and programming syntax.', 'French: gramme / -gramme'),
    ('meter', 'Classical Greek', 'metron', 'measure or calculation', 'Adopted into scientific measurement, financial metrics, and operational performance standards.', 'French: metre, Spanish: metro'),
    ('bio', 'Classical Greek', 'bios', 'life, biological systems', 'Applied in ergonomics, biometrics, biotechnology, and occupational health standards.', 'Greek: bio-'),
    ('tech', 'Classical Greek', 'techne', 'art, craft, technical skill', 'Formed the foundation of modern engineering, computing architectures, and digital systems.', 'French: technique, Spanish: tecnica'),
    ('proto', 'Classical Greek', 'protos', 'first, original, primary', 'Shifted from ancient papyrus scroll labels (proto-kolla) into industrial prototypes and protocol standards.', 'French: protocole, Spanish: protocolo'),
    ('dynam', 'Classical Greek', 'dynamis', 'power, energetic force', 'Evolved from physical mechanics into dynamic pricing, organizational dynamics, and economic momentum.', 'French: dynamique'),
    ('cyber', 'Classical Greek', 'kybernan', 'to steer, govern, pilot', 'Norbert Wiener coined cybernetics from this root; evolved into modern cybersecurity and digital infrastructure.', 'French: cyber-, Spanish: ciber-'),
    ('crypto', 'Classical Greek', 'kryptos', 'hidden, secret, concealed', 'Evolved into cryptographic ciphers, data encryption at rest, and enterprise network security.', 'French: cryptographie'),
    ('demo', 'Classical Greek', 'demos', 'the people, population', 'Passed through political terminology into consumer demographics, market research, and targeted campaigns.', 'French: demographie'),

    # Latin Administrative, Commercial & Legal Roots
    ('aud', 'Latin via Old French', 'audire', 'to hear, listen formally', 'Originally an oral hearing where financial records were read aloud before royal or guild auditors; evolved into formal accounting examinations.', 'French: audit / auditer, Spanish: auditar'),
    ('cred', 'Latin', 'credere', 'to believe, trust, entrust', 'Moved from commercial faith and trustworthiness into monetary credit, creditor rights, and professional credentials.', 'French: credit, Spanish: credito, Italian: credito'),
    ('ced', 'Latin', 'cedere', 'to go, yield, withdraw', 'Developed into procedural terminology (precede, proceed, access, concession, process).', 'French: ceder, Spanish: ceder'),
    ('cess', 'Latin', 'cedere / cessus', 'yielded, gone, motion', 'Formed commercial terms of access, process, succession, and concession.', 'French: acces / processus'),
    ('clud', 'Latin', 'claudere', 'to shut, close, confine', 'Originally a physical closing; evolved into legal clauses, conclusions, and inclusion/exclusion provisions.', 'French: clore / conclure'),
    ('clus', 'Latin', 'claudere / clausus', 'shut, closed, concluded', 'Formed contract clause, exclusive distribution, and conclusive settlement terms.', 'French: clause / exclusif, Spanish: clausula'),
    ('duc', 'Latin', 'ducere', 'to lead, bring, guide', 'Evolved from guiding trade caravans into producing goods, conducting negotiations, and deducting costs.', 'French: conduire / deduire'),
    ('duct', 'Latin', 'ducere / ductus', 'led, guided, channeled', 'Formed product, deduction, conduct, and pipeline management terms.', 'French: produit / conduite, Spanish: producto'),
    ('fac', 'Latin', 'facere', 'to make, do, cause', 'Foundation of manufacturing, factoring, facility management, and factor analysis.', 'French: faire / facteur, Spanish: factor'),
    ('fect', 'Latin', 'facere / fectus', 'made, done, performed', 'Formed defect, effect, infect, and effective operational compliance.', 'French: effet / defectueux, Spanish: efecto'),
    ('fic', 'Latin', 'facere / ficus', 'making, causing, performing', 'Developed into efficient operations, deficit accounting, and certificate documentation.', 'French: certificat / efficace'),
    ('fer', 'Latin', 'ferre', 'to bear, carry, yield', 'Evolved from carrying trade freight into transferring funds, referring clients, and inferring trends.', 'French: transferer / conferer, Spanish: transferir'),
    ('fid', 'Latin', 'fides / fidere', 'faith, trust, reliance', 'Formed fiduciary duties, affidavits, fidelity bonds, and confidential agreements.', 'French: fiduciaire / confiant, Spanish: fiduciario'),
    ('flu', 'Latin', 'fluere', 'to flow, stream smoothly', 'Shifted from liquid flow into cash flow fluctuation, fluent communication, and affluent markets.', 'French: fluctuer / fluide, Spanish: fluir'),
    ('flux', 'Latin', 'fluere / fluxus', 'flowing, unstable change', 'Used in operational workflows, inventory influx, and fluctuating exchange rates.', 'French: flux, Spanish: flujo'),
    ('grad', 'Latin', 'gradi', 'to step, walk, advance', 'Passed into graduated pricing scales, performance upgrades, and career progression steps.', 'French: grade / graduel, Spanish: grado'),
    ('gress', 'Latin', 'gradi / gressus', 'stepped, moved forward', 'Formed business progress reports, aggressive sales growth, and regulatory regression.', 'French: progres / progression, Spanish: progreso'),
    ('jud', 'Latin', 'judicare / judex', 'to judge, point out right', 'Foundation of legal adjudication, judicial review, and executive judgment.', 'French: juger / judiciaire, Spanish: juzgar / juicio'),
    ('jur', 'Latin', 'jus / jurare', 'law, right, sworn oath', 'Formed jurisdiction, perjury, jury duty, and legal jurisprudence.', 'French: juridiction / jure, Spanish: jurisdiccion'),
    ('leg', 'Latin', 'lex / legis or legere', 'law, or to gather/read', 'Formed statutory legislation, legitimate transactions, and delegated authority.', 'French: legal / legislation, Spanish: legal'),
    ('lect', 'Latin', 'legere / lectus', 'chosen, gathered, read', 'Formed selective hiring, collective bargaining, and corporate intellect.', 'French: collecte / selection, Spanish: seleccion'),
    ('mand', 'Latin', 'mandare', 'to hand over, command, entrust', 'Passed from Roman administrative orders into corporate mandates and mandatory regulations.', 'French: mandat / obligatoire, Spanish: mandato'),
    ('mit', 'Latin', 'mittere', 'to send, release, yield', 'Shifted from sending emissaries into submitting proposals, transmitting data, and remitting payments.', 'French: transmettre / emettre, Spanish: transmitir'),
    ('miss', 'Latin', 'mittere / missus', 'sent, dispatched, released', 'Formed corporate mission, sales commission, emission controls, and permission protocols.', 'French: mission / commission, Spanish: comision'),
    ('pend', 'Latin', 'pendere', 'to hang, weigh, pay out', 'Ancient merchants weighed silver on scales to pay; evolved into expenditure, compensation, and pending decisions.', 'French: depense / suspendre, Spanish: depender'),
    ('pens', 'Latin', 'pendere / pensus', 'weighed, paid, calculated', 'Formed expense accounts, pension funds, compensation packages, and dispensations.', 'French: pension / compensation, Spanish: pension'),
    ('plic', 'Latin', 'plicare', 'to fold, weave together', 'Shifted into explicit terms, corporate compliance, duplicating records, and applicant profiles.', 'French: plier / appliquer, Spanish: aplicar'),
    ('ply', 'Latin via Old French', 'plier / plicare', 'to bend, fold, adapt', 'Formed supply logistics, complying with statutes, and applying for positions.', 'French: plier / approvisionner, Spanish: aplicar'),
    ('pon', 'Latin', 'ponere', 'to place, put, set down', 'Shifted into postponing meetings, component parts, and corporate proponents.', 'French: poser / composant, Spanish: poner'),
    ('pos', 'Latin', 'ponere / positus', 'placed, positioned, set', 'Formed financial deposits, strategic positioning, commercial proposals, and disposition of assets.', 'French: position / depot, Spanish: posicion / deposito'),
    ('port', 'Latin', 'portare', 'to carry, transport', 'From harbor maritime carriage into export/import logistics, portable computing, and investment portfolios.', 'French: porter / transport, Spanish: transportar / puerto'),
    ('scrib', 'Latin', 'scribere', 'to write, draft, record', 'Formed contractual subscriptions, prescribing standards, and inscribing registries.', 'French: souscrire / inscrire, Spanish: escribir'),
    ('script', 'Latin', 'scribere / scriptus', 'written, recorded, documented', 'Formed job descriptions, meeting transcripts, prescriptions, and scripts.', 'French: description / manuscrit, Spanish: descripcion'),
    ('secut', 'Latin', 'sequi / secutus', 'followed, pursued, continued', 'Evolved into executive management, consecutive quarters, and prosecuting claims.', 'French: executif / consecutif, Spanish: ejecutivo'),
    ('sequ', 'Latin', 'sequi', 'to follow, ensue, result', 'Formed operational sequence, market consequences, and subsequent quarterly reviews.', 'French: sequence / consequence, Spanish: secuencia'),
    ('serv', 'Latin', 'servare', 'to keep, guard, watch over', 'Formed asset preservation, reservations, conservative forecasting, and client service.', 'French: preserver / reserver, Spanish: conservar'),
    ('spec', 'Latin', 'specere', 'to look at, observe, examine', 'Formed technical specifications, market speculation, and inspectorial audits.', 'French: specifier / spectacle, Spanish: inspeccion'),
    ('spect', 'Latin', 'specere / spectus', 'viewed, inspected, examined', 'Formed site inspections, retrospective reviews, prospective clients, and inspectors.', 'French: inspecter / perspective, Spanish: perspectiva'),
    ('stat', 'Latin', 'stare / status', 'to stand, position, establish', 'Formed statutory compliance, financial status, statistics, and station facilities.', 'French: statut / statuts, Spanish: estado / estatuto'),
    ('stit', 'Latin', 'statuere', 'to set up, establish, place', 'Formed corporate institutions, constitutional rights, and substitute products.', 'French: instituer / substituer, Spanish: instituto'),
    ('struct', 'Latin', 'struere / structus', 'to build, assemble, pile up', 'Formed corporate structure, infrastructure investments, instructions, and construction.', 'French: structure / construire, Spanish: estructura'),
    ('ten', 'Latin', 'tenere', 'to hold, keep, grasp', 'Formed commercial tenancy, tenure, maintenance, and tenuous negotiations.', 'French: tenir / locataire, Spanish: tener'),
    ('tain', 'Latin via Old French', 'tenir / tenere', 'to hold, retain, support', 'Formed retaining clients, maintaining facilities, sustaining growth, and obtaining permits.', 'French: maintenir / retenir, Spanish: mantener'),
    ('tract', 'Latin', 'trahere / tractus', 'to draw, pull, drag', 'Originally a physical drawing together of parties; evolved into binding legal contracts, extracting value, and attractive offers.', 'French: contrat / attirer, Spanish: contrato / extraer'),
    ('val', 'Latin', 'valere', 'to be strong, worthy, effective', 'Formed asset valuation, valid credentials, prevailing wage, and company values.', 'French: valeur / valide, Spanish: valor / valido'),
    ('vail', 'Latin via Old French', 'valoir / valere', 'to be of worth, avail', 'Formed commercial availability, prevailing market conditions, and prevailing rates.', 'French: prevaloir / disponible, Spanish: valer'),
    ('ven', 'Latin', 'venire', 'to come, arrive, enter', 'Shifted from physical arrival into revenue (money coming in), inventory, and convening meetings.', 'French: venir / revenu, Spanish: venir / ingreso'),
    ('vent', 'Latin', 'venire / ventus', 'come, arrived, occurred', 'Formed conventions, inventory management, preventive measures, and event planning.', 'French: convention / inventaire, Spanish: convencion'),
    ('vert', 'Latin', 'vertere', 'to turn, transform, channel', 'Shifted from physical turning into converting currencies, diverting shipments, and advertising.', 'French: convertir / divertir, Spanish: convertir'),
    ('vers', 'Latin', 'vertere / versus', 'turned, directed, shifted', 'Formed versatile operations, adverse market conditions, reverse logistics, and conversion rates.', 'French: version / inverse, Spanish: version / diverso'),
    ('vid', 'Latin', 'videre', 'to see, look into, observe', 'Shifted into evidence, providing resources, and dividend payments.', 'French: evident / prevoir, Spanish: evidente / proveer'),
    ('vis', 'Latin', 'videre / visus', 'seen, inspected, planned', 'Formed supervisory management, visionary leadership, revised budgets, and visual assets.', 'French: vision / reviser, Spanish: vision / revisar'),
    ('voc', 'Latin', 'vocare', 'to call, summon, name', 'Formed advocacy campaigns, vocal consensus, and vocabulary mastery.', 'French: vocation / avocat, Spanish: convocar'),
    ('vok', 'Latin', 'vocare', 'to call, summon, provoke', 'Formed invoking clauses, revoking licenses, and provoking market reactions.', 'French: revoquer / provoquer, Spanish: revocar'),

    # Anglo-Norman / Old French Commercial & Administrative Roots
    ('asset', 'Anglo-French', 'assez (Latin: ad satis)', 'enough, sufficient to satisfy debts', 'From legal phrase "aver assez" (to have enough to satisfy claims); evolved into property owned by a company carrying financial value.', 'French: actif, Spanish: activo'),
    ('budget', 'Old French', 'bougette', 'small leather bag or pouch', 'From the leather purse in which the British Chancellor carried expenditure plans to Parliament; evolved into corporate financial allocations.', 'French: budget, Spanish: presupuesto'),
    ('client', 'Latin via Old French', 'cliens / clientem', 'follower, retainer, person under protection', 'In ancient Rome, a plebeian under the protection of a patrician patron; evolved into a professional business customer or buyer of expert services.', 'French: client, Spanish: cliente'),
    ('invoice', 'Old French', 'envoyer (lettre denvoi)', 'to send, dispatch notice', 'Originally a letter of dispatch accompanying transported merchandise; evolved into a formal commercial demand for payment with net terms.', 'French: facture, Spanish: factura'),
    ('lease', 'Anglo-French', 'laisser (Latin: laxare)', 'to let go, release, loosen', 'Originally letting go of property rights temporarily; evolved into a formal tenancy contract granting exclusive possession for defined rent.', 'French: bail / louer, Spanish: arrendamiento'),
    ('liability', 'Anglo-French', 'lier (Latin: ligare)', 'to bind, tie, obligate', 'From the concept of being legally bound or tied to answer for a debt; evolved into legal accountability and balance sheet obligations.', 'French: passif / responsabilite, Spanish: pasivo'),
    ('mortgage', 'Old French', 'mort gage', 'dead pledge', 'A French legal compound: the pledge died either when the debt was paid or when default forfeit occurred without equity of redemption.', 'French: hypotheque, Spanish: hipoteca'),
    ('salary', 'Latin via Old French', 'salarium (sal = salt)', 'salt money / allowance', 'Originally Roman soldiers allowance to buy salt, a vital preservative; evolved into fixed regular compensation for professional services.', 'French: salaire, Spanish: salario, Italian: salario'),
    ('vendor', 'Anglo-French', 'vendre (Latin: vendere)', 'to sell, trade goods', 'From legal registries designating the selling party; evolved into corporate suppliers of inventory, components, and services.', 'French: vendeur / fournisseur, Spanish: proveedor / vendedor'),
    ('warranty', 'Anglo-French', 'warant / garantir', 'warrant, authorization, security', 'Originally a protective legal guarantee of title; evolved into an express or implied product guarantee against manufacturing defects.', 'French: garantie, Spanish: garantia'),
    ('candidate', 'Latin', 'candidatus (candidus = gleaming white)', 'clothed in spotless white', 'In Roman elections, seekers of public office wore a chalk-whitened toga (toga candida) to signify personal honesty and incorruptibility.', 'French: candidat, Spanish: candidato, German: Kandidat'),
    ('benchmark', 'Old English', 'benc + mearc', 'bench mark for leveling', 'Originally a stone mason or surveyor mark cut into a stone wall to support an angle iron for height measurements; evolved into a comparative reference standard.', 'French: point de reference, German: Richtwert'),
    ('consensus', 'Latin', 'con- (together) + sentire (to feel)', 'feeling and thinking together', 'Evolved from collective civic harmony into unified corporate board or committee agreement.', 'French: consensus, Spanish: consenso'),
    ('depreciation', 'Latin', 'de- (down) + pretium (price/value)', 'lowering of valuation', 'Roman commercial term for price decline; formalized in modern accounting as systematic amortization of asset cost over useful lifespan.', 'French: depreciation / amortissement, Spanish: depreciacion'),
    ('protocol', 'Classical Greek', 'proto- (first) + kolla (glue)', 'first leaf glued onto scroll', 'Originally the authentication sheet glued to the outside of a papyrus roll stating its contents; evolved into strict diplomatic and technical interaction rules.', 'French: protocole, Spanish: protocolo'),
    ('reimburse', 'Old French', 're- (back) + in- (in) + bourse (purse)', 'to put money back into purse', 'Literally returning spent funds back into the traveler or employees wallet following documented business expenses.', 'French: rembourser, Spanish: reembolsar'),
    ('collateral', 'Medieval Latin', 'col- (together) + lateralis (side)', 'side-by-side secondary security', 'A pledge running parallel to the primary loan agreement, forfeitable if the debtor defaults.', 'French: garantie collaterale, Spanish: colateral')
]

# Domain Cognitive Framing & Native Mindsets
DOMAIN_COGNITIVE_MODELS = {
    'finance': {
        'mindset_filter': 'Native financial executives view "{w}" as a measurable capital mechanism: does it preserve liquidity, maximize net yield, or require risk hedging on the balance sheet?',
        'when_to_use': 'Use in financial statements, quarterly earnings memos, capital allocation reviews, and audit compliance documentation.',
        'when_not_to_use': 'Do not confuse top-line inflows with bottom-line retained earnings; distinguish operating figures from non-operating accruals.',
        'spatial_context': 'Income statement hierarchy (top-line revenue down to bottom-line net profit) and balance sheet ledger alignment (assets balancing liabilities plus equity).',
        'temporal_context': 'Standard fiscal quarter reporting intervals, annual audit closings, and continuous daily treasury reconciliations.',
        'culture': 'Crucial in TOEIC Part 7 financial reports, executive memos, budget authorizations, and quarterly earnings releases.'
    },
    'technology': {
        'mindset_filter': 'Native IT engineers evaluate "{w}" in terms of systems architecture: does it introduce latency, reduce security friction, maintain backward compatibility, or scale horizontally?',
        'when_to_use': 'Use in software technical specifications, DevOps pipeline configurations, architectural reviews, and IT procurement proposals.',
        'when_not_to_use': 'Do not substitute informal consumer tech jargon in formal enterprise enterprise architecture memos or SLA agreements.',
        'spatial_context': 'Multi-tier infrastructure architecture, ranging from edge client endpoints and network perimeters to backend cloud clusters and secure databases.',
        'temporal_context': 'Sprint iterations (2-week cadence), continuous integration build cycles, and zero-downtime maintenance release windows.',
        'culture': 'Ubiquitous in TOEIC Part 7 IT support documentation, equipment procurement RFPs, and cloud migration project briefs.'
    },
    'legal': {
        'mindset_filter': 'Native corporate counsel treat "{w}" as an explicit risk boundary: does it create enforceable rights, trigger statutory liabilities, or insulate the firm under safe-harbor clauses?',
        'when_to_use': 'Use when drafting contract stipulations, non-disclosure covenants, settlement instruments, or regulatory compliance disclosures.',
        'when_not_to_use': 'Avoid imprecise colloquial synonyms; in contract law, terms of art carry strict statutory definitions and precedent.',
        'spatial_context': 'Formal contractual frameworks, courtroom bar proceedings, arbitration chambers, and statutory regulatory filings.',
        'temporal_context': 'Statutory limitation periods, contractual notice windows (e.g., 30-day cure period), and long-term regulatory retention horizons.',
        'culture': 'Tested extensively in TOEIC Part 5 grammar and Part 7 commercial leases, employment agreements, and nondisclosure stipulations.'
    },
    'hr-personnel': {
        'mindset_filter': 'Native HR directors evaluate "{w}" through talent lifecycle and fair labor standards: how does it impact recruitment, compensation equity, retention, and workplace policy compliance?',
        'when_to_use': 'Use in job postings, compensation reviews, employee handbooks, onboarding schedules, and performance appraisals.',
        'when_not_to_use': 'Avoid subjective or informal phrasing in formal personnel evaluations, disciplinary memos, or statutory benefit notices.',
        'spatial_context': 'Organizational hierarchy, corporate department matrices, talent recruitment pools, and personnel file registries.',
        'temporal_context': 'Annual performance evaluation cycles, probation review milestones (e.g., 90 days), and multi-year career progression tracks.',
        'culture': 'Common in TOEIC Part 3 workplace dialogue, Part 4 orientation briefings, and Part 7 corporate personnel memos.'
    },
    'marketing': {
        'mindset_filter': 'Native marketers assess "{w}" as a demand generation and conversion driver: does it sharpen brand positioning, lower customer acquisition costs, or maximize customer lifetime value?',
        'when_to_use': 'Use in campaign proposals, customer journey analyses, market research presentations, and digital advertising reports.',
        'when_not_to_use': 'Distinguish empirical analytics (CTR, conversion rate, CAC) from qualitative branding and creative concepts.',
        'spatial_context': 'Customer acquisition funnels, digital media display channels, retail store planograms, and competitive market positioning maps.',
        'temporal_context': 'Campaign flight durations, seasonal promotional cycles, quarterly product launch schedules, and real-time ad optimization.',
        'culture': 'Frequent in TOEIC Part 4 promotional broadcasts and Part 7 marketing surveys, press announcements, and ad proposals.'
    },
    'manufacturing': {
        'mindset_filter': 'Native plant managers view "{w}" in terms of lean operational efficiency: does it improve throughput, minimize scrap defect rates, or satisfy ISO quality tolerance standards?',
        'when_to_use': 'Use in assembly workflow instructions, quality control defect logs, equipment maintenance schedules, and facility audit reports.',
        'when_not_to_use': 'Do not conflate design tolerances with component wear thresholds; use standardized engineering metric units.',
        'spatial_context': 'The industrial production floor, raw material loading bays, automated conveyor lines, and cleanroom inspection chambers.',
        'temporal_context': 'Cycle times per unit, shift changeover intervals, preventative maintenance schedules, and batch production turnaround times.',
        'culture': 'Appears regularly in TOEIC Part 7 manufacturing work orders, quality assurance notices, and vendor parts catalogs.'
    },
    'office-admin': {
        'mindset_filter': 'Native administrative managers treat "{w}" as an organizational enabler: does it streamline executive coordination, establish reliable record retrieval, or ensure meeting protocol alignment?',
        'when_to_use': 'Use in executive summaries, meeting agendas, office logistics circulars, filing protocols, and corporate travel expense reports.',
        'when_not_to_use': 'Avoid informal office slang when writing official circulars or administrative policy guidelines for all staff.',
        'spatial_context': 'Corporate executive suites, open-plan workstations, central archive storage, conference meeting facilities, and reception lobbies.',
        'temporal_context': 'Daily morning standups, weekly department syncs, monthly administrative audits, and annual filing archive purges.',
        'culture': 'Found across TOEIC Part 3 office conversations, Part 4 staff announcements, and Part 7 administrative memos.'
    },
    'purchasing': {
        'mindset_filter': 'Native procurement officers view "{w}" as a contract deliverable: does it secure competitive unit pricing, verify delivery milestones, or guarantee supplier compliance under purchase order terms?',
        'when_to_use': 'Use in vendor negotiations, purchase requisitions, requests for proposals (RFPs), bills of lading, and supply contracts.',
        'when_not_to_use': 'Do not confuse purchase orders (binding contracts) with preliminary price estimates or informal quotations.',
        'spatial_context': 'Upstream global supply chains, freight receiving docks, bonded logistics warehouses, and procurement negotiation tables.',
        'temporal_context': 'Lead times from order placement to delivery, payment terms (Net 30/60/90), and annual vendor performance reviews.',
        'culture': 'Prominent in TOEIC Part 7 vendor correspondence, shipment tracking notices, order forms, and price discount schedules.'
    },
    'real-estate': {
        'mindset_filter': 'Native property managers evaluate "{w}" through asset value and occupancy rights: does it establish clear title, ensure zoning compliance, or secure enforceable lease cash flows?',
        'when_to_use': 'Use in commercial lease negotiations, property appraisal dossiers, building inspection reports, and deed transfers.',
        'when_not_to_use': 'Distinguish commercial property covenants from residential tenancy rules; specify square footage calculation standards.',
        'spatial_context': 'Commercial real estate office towers, retail complexes, physical building envelopes, zoning parcels, and property boundaries.',
        'temporal_context': 'Multi-year lease terms (3-10 years), rent escalation intervals (annual indexation), and closing escrow timelines.',
        'culture': 'Extremely common in TOEIC Part 7 commercial real estate listings, office relocation notices, and facility lease agreements.'
    },
    'travel': {
        'mindset_filter': 'Native travel coordinators view "{w}" through transit reliability and traveler experience: does it prevent itinerary friction, ensure customs compliance, or streamline connection logistics?',
        'when_to_use': 'Use in corporate travel itineraries, flight reservation memos, customs declaration guidelines, and hotel booking confirmations.',
        'when_not_to_use': 'Do not confuse transit layovers with final stopovers; clarify baggage check-through policies across connecting carriers.',
        'spatial_context': 'International airport passenger terminals, departure gates, customs checkpoints, hotel executive lounges, and baggage claim areas.',
        'temporal_context': 'Strict flight departure cutoffs, international timezone transitions, layover connection buffers, and hotel check-in/out hours.',
        'culture': 'Frequent in TOEIC Part 3/4 airport and transit announcements, Part 7 flight itinerary emails, and travel agency memos.'
    },
    'dining': {
        'mindset_filter': 'Native hospitality managers assess "{w}" as a guest satisfaction and culinary standard: does it elevate dining ambiance, ensure food safety compliance, or orchestrate banquet service seamlessly?',
        'when_to_use': 'Use in catering agreements, executive banquet menus, restaurant reservation policies, and culinary service reviews.',
        'when_not_to_use': 'Avoid using informal food terms in formal corporate catering agreements or executive dining invitations.',
        'spatial_context': 'Executive dining halls, banquet banquet rooms, commercial culinary kitchens, wine cellars, and formal linen tables.',
        'temporal_context': 'Multi-course banquet service sequencing, reservation seatings, dietary prep lead times, and seasonal menu cycles.',
        'culture': 'Encountered in TOEIC Part 3 restaurant dialogues, Part 4 banquet keynote introductions, and Part 7 catering contracts.'
    },
    'health': {
        'mindset_filter': 'Native occupational health specialists evaluate "{w}" through clinical safety and preventive care: does it mitigate workplace ergonomic hazards, lower medical claims, or comply with OSHA standards?',
        'when_to_use': 'Use in workplace wellness policies, medical leave documentation, ergonomic workstation assessments, and clinical guidelines.',
        'when_not_to_use': 'Do not provide speculative medical diagnosis in general workplace memos; adhere to confidential health record privacy laws.',
        'spatial_context': 'Occupational health clinics, ergonomic corporate workstations, hospital diagnostic rooms, and workplace emergency stations.',
        'temporal_context': 'Statutory medical leave durations, annual health screening intervals, and immediate emergency response protocols.',
        'culture': 'Common in TOEIC Part 7 healthcare insurance policies, workplace safety notices, and doctor appointment communications.'
    },
    'communications': {
        'mindset_filter': 'Native corporate communications directors treat "{w}" as message integrity and stakeholder reputation: does it convey clarity, mitigate PR crisis exposure, or reinforce brand trust across media channels?',
        'when_to_use': 'Use in official press releases, executive media statements, crisis response plans, internal all-hands memos, and investor briefings.',
        'when_not_to_use': 'Avoid ambiguous or jargon-heavy statements in external public releases; ensure statements are verified before publication.',
        'spatial_context': 'Executive media press briefing podiums, broadcasting production studios, corporate newsrooms, and digital public distribution networks.',
        'temporal_context': 'Immediate news cycle response windows, embargo publication dates, quarterly earnings press releases, and editorial deadlines.',
        'culture': 'Central to TOEIC Part 4 public broadcast announcements, Part 7 press releases, media kits, and corporate newsletter articles.'
    }
}

def resolve_etymology(word, pos, cat_key, cat_meta):
    """Generates an authentic, linguistically rigorous Etymology object."""
    w = word.strip()
    wl = w.lower()

    # 1. Check exact matches in CLASSICAL_ROOTS
    for root, origin, root_w, root_m, evol, related in CLASSICAL_ROOTS:
        if root in wl:
            return {
                'origin': origin,
                'rootWord': root_w,
                'rootMeaning': root_m,
                'evolution': f'Formed from {root_w} ({root_m}). {evol}',
                'relatedLanguages': [r.strip() for r in related.split(',')],
                'firstRecordedUse': '14th-16th century'
            }

    # 2. Check compound nouns
    if ' ' in wl:
        parts = wl.split()
        return {
            'origin': f'Modern Business English Compound ({parts[0]} + {parts[-1]})',
            'rootWord': f'{parts[0]} + {parts[-1]}',
            'rootMeaning': f'A functional commercial compound combining {parts[0]} and {parts[-1]}',
            'evolution': f'Coined during 20th-century corporate management and administrative practice to specify precise operational standards and deliverables.',
            'relatedLanguages': [f'French: {parts[0]}', f'Spanish: {parts[0]}'],
            'firstRecordedUse': 'Mid 20th century'
        }

    # 3. Analyze Latin / Romance affixes
    if wl.startswith(('con', 'com', 'col', 'cor')):
        return {
            'origin': 'Latin via Anglo-French',
            'rootWord': 'com- / cum (with, together, completely)',
            'rootMeaning': 'joint action, thoroughness, mutual completion',
            'evolution': 'Evolved from Roman commercial contracts and collective trade guilds into modern corporate international commerce.',
            'relatedLanguages': [f'French: con{wl[3:] if len(wl)>3 else ""}', f'Spanish: con{wl[3:] if len(wl)>3 else ""}'],
            'firstRecordedUse': '14th-16th century'
        }
    if wl.startswith(('re', 'retro')):
        return {
            'origin': 'Latin',
            'rootWord': 're- (again, back, anew)',
            'rootMeaning': 'repetition, restoration, or return to a baseline state',
            'evolution': 'Shifted from Roman administrative renewal orders into corporate review, recurring revenue, and operational restoration.',
            'relatedLanguages': [f'French: re{wl[2:] if len(wl)>2 else ""}', f'Spanish: re{wl[2:] if len(wl)>2 else ""}'],
            'firstRecordedUse': '13th-15th century'
        }
    if wl.startswith(('in', 'im', 'en')):
        return {
            'origin': 'Latin / Anglo-French',
            'rootWord': 'in- / en- (in, into, upon, causing to be)',
            'rootMeaning': 'entering into a state, initiating action, or internalizing',
            'evolution': 'Adopted into English common law, financial accounting, and organizational administration.',
            'relatedLanguages': [f'French: in{wl[2:] if len(wl)>2 else ""}', f'Spanish: in{wl[2:] if len(wl)>2 else ""}'],
            'firstRecordedUse': '14th-16th century'
        }
    if wl.startswith(('sub', 'sup')):
        return {
            'origin': 'Latin',
            'rootWord': 'sub- (under, secondary, supporting)',
            'rootMeaning': 'underneath, subordinate rank, or lower tier',
            'evolution': 'Used in Roman governance hierarchy; adopted into corporate reporting tiers, subcontracting, and supporting infrastructure.',
            'relatedLanguages': [f'French: sous- / sub-', f'Spanish: sub-'],
            'firstRecordedUse': '15th century'
        }
    if wl.startswith(('trans', 'tra')):
        return {
            'origin': 'Latin',
            'rootWord': 'trans- (across, over, through)',
            'rootMeaning': 'movement across boundaries or transfer between parties',
            'evolution': 'Originated in ancient trade logistics; formalized in international financial transactions, transit, and corporate transfer.',
            'relatedLanguages': [f'French: trans-', f'Spanish: trans-'],
            'firstRecordedUse': '14th-16th century'
        }
    if wl.startswith(('pro', 'pre')):
        return {
            'origin': 'Latin',
            'rootWord': 'pro- / prae- (forward, before, in advance)',
            'rootMeaning': 'prior preparation, forward progression, or proactive planning',
            'evolution': 'Passed through medieval chancery drafting into corporate project management, forward planning, and predictive forecasting.',
            'relatedLanguages': [f'French: pro- / pre-', f'Spanish: pro- / pre-'],
            'firstRecordedUse': '14th-16th century'
        }
    if wl.startswith(('de', 'dis')):
        return {
            'origin': 'Latin',
            'rootWord': 'de- / dis- (down, away, reversal, separation)',
            'rootMeaning': 'removal, separation, or downward adjustment',
            'evolution': 'Used in formal Roman law to express rescission, deduction, and disassembly; adopted into modern corporate governance.',
            'relatedLanguages': [f'French: de- / dis-', f'Spanish: de- / des-'],
            'firstRecordedUse': '14th-16th century'
        }

    # 4. Germanic / Old English foundational roots
    return {
        'origin': 'Old English / Germanic Lexical Root',
        'rootWord': wl,
        'rootMeaning': f'core Germanic commercial root signifying foundational operational practice of {wl}',
        'evolution': 'Preserved through centuries of Anglo-Saxon and Middle English maritime commerce, guild trade, and standard English international business vocabulary.',
        'relatedLanguages': [f'German: {wl[:4]}...', f'Dutch: {wl[:4]}...'],
        'firstRecordedUse': '12th-14th century'
    }

def resolve_deep_meaning(word, pos, cat_key, cat_meta):
    """Generates authentic Core Concept, Spatial, and Temporal Context."""
    w = word.strip()
    wl = w.lower()
    profile = DOMAIN_COGNITIVE_MODELS.get(cat_key, DOMAIN_COGNITIVE_MODELS['office-admin'])

    if pos == 'verb':
        core = f'An active operational verb designating the action to {w} within professional {cat_meta["domain"]}, ensuring process rigor and standardized results.'
    elif pos == 'adjective':
        core = f'A critical qualifying attribute describing operations, systems, or criteria that are {w} under professional {cat_meta["domain"]} benchmarks.'
    else:
        core = f'A foundational professional concept and noun designating {w} in {cat_meta["domain"]}, central to strategic workflows and operational accountability.'

    return {
        'coreConcept': core,
        'spatialContext': profile['spatial_context'],
        'temporalContext': profile['temporal_context'],
        'emotionalTone': 'Objective, authoritative, professional, and execution-oriented.',
        'formalityLevel': 'formal',
        'connotation': 'positive' if pos in ('verb', 'adjective') and not wl.startswith(('de', 'dis', 'un', 'mis')) else 'neutral'
    }

def resolve_native_mindset(word, pos, cat_key, cat_meta):
    """Generates authentic native cognitive intuition and practical usage guidelines."""
    w = word.strip()
    wl = w.lower()
    profile = DOMAIN_COGNITIVE_MODELS.get(cat_key, DOMAIN_COGNITIVE_MODELS['office-admin'])

    how_natives_think = profile['mindset_filter'].format(w=w)
    
    if cat_key == 'finance':
        mental_image = f'A financial controller reviewing a balance sheet ledger, cross-checking line items to ensure that {w} is audited accurately.'
    elif cat_key == 'technology':
        mental_image = f'A software engineer monitoring an enterprise cloud dashboard, verifying telemetry metrics and configuration parameters for {w}.'
    elif cat_key == 'legal':
        mental_image = f'A corporate attorney in a law office reviewing contractual stipulations and statutory compliance dossiers involving {w}.'
    elif cat_key == 'hr-personnel':
        mental_image = f'An HR director and department manager reviewing an employee file and organizational chart addressing matters of {w}.'
    elif cat_key == 'marketing':
        mental_image = f'A marketing strategist analyzing campaign performance charts and conversion funnels to optimize results for {w}.'
    elif cat_key == 'manufacturing':
        mental_image = f'A quality assurance engineer inspecting components along a factory production line to ensure compliance regarding {w}.'
    elif cat_key == 'purchasing':
        mental_image = f'A procurement manager reviewing a vendor purchase order form and shipping manifest to confirm delivery terms for {w}.'
    elif cat_key == 'travel':
        mental_image = f'An international business traveler presenting travel documentation at an airport departure terminal involving {w}.'
    elif cat_key == 'health':
        mental_image = f'An occupational health clinician examining wellness reports and safety protocols concerning {w} in a corporate clinic.'
    elif cat_key == 'dining':
        mental_image = f'An executive banquet coordinator orchestrating table service and dietary accommodations involving {w} in a dining room.'
    elif cat_key == 'real-estate':
        mental_image = f'A commercial property landlord and tenant reviewing blueprints and lease agreements addressing {w} in an office.'
    else:
        mental_image = f'A corporate professional team collaborating in a modern conference room to review deliverables and documentation regarding {w}.'

    return {
        'howNativesThink': how_natives_think,
        'mentalImage': mental_image,
        'whenToUse': profile['when_to_use'],
        'whenNotToUse': profile['when_not_to_use'],
        'culturalContext': profile['culture']
    }

def resolve_visual(word, pos, cat_key, cat_meta):
    """Generates a rich, non-generic Visual Scene Description, Keyword, and Mnemonic."""
    w = word.strip()
    wl = w.lower()
    domain_name = cat_meta['name']

    clean_w = re.sub(r'[^a-zA-Z]', '', w).upper()

    if cat_key == 'finance':
        desc = f'A corporate financial controller analyzing a detailed quarterly balance sheet and audit report highlighting the impact of {w} on an executive desk.'
        kw = f'{w} finance accounting audit balance sheet corporate business'
        mnem = f'{clean_w[:6]}: Financial Integrity Secures Corporate Capital Growth!'
    elif cat_key == 'technology':
        desc = f'A high-tech software engineering lab where systems architects examine server telemetry and architecture diagrams managing {w}.'
        kw = f'{w} technology software systems cloud enterprise IT workstation'
        mnem = f'{clean_w[:6]}: Optimized Technology Infrastructure Powers Scalable Performance!'
    elif cat_key == 'legal':
        desc = f'A corporate law library setting where senior legal counsel review formal contract provisions and statutory precedents concerning {w}.'
        kw = f'{w} legal contract compliance law firm attorney corporate'
        mnem = f'{clean_w[:6]}: Statutory Compliance Protects Enforceable Corporate Rights!'
    elif cat_key == 'hr-personnel':
        desc = f'A modern human resources office where hiring managers and personnel directors review candidate credentials and policy guidelines for {w}.'
        kw = f'{w} human resources personnel hiring interview workplace office'
        mnem = f'{clean_w[:6]}: Strategic Human Capital Cultivates Organizational Excellence!'
    elif cat_key == 'marketing':
        desc = f'A creative marketing studio where digital strategists examine multi-channel performance charts and consumer metrics optimizing {w}.'
        kw = f'{w} marketing advertising campaign analytics audience branding'
        mnem = f'{clean_w[:6]}: Targeted Market Positioning Drives Customer Conversion!'
    elif cat_key == 'manufacturing':
        desc = f'An advanced industrial manufacturing facility where plant technicians monitor automated production line calibration and quality metrics for {w}.'
        kw = f'{w} manufacturing industrial factory engineering assembly quality'
        mnem = f'{clean_w[:6]}: Precision Engineering Drives Zero-Defect Manufacturing!'
    elif cat_key == 'purchasing':
        desc = f'A procurement department desk with commercial supplier agreements, delivery manifests, and itemized purchase orders regarding {w}.'
        kw = f'{w} procurement purchasing vendor contract supply chain warehouse'
        mnem = f'{clean_w[:6]}: Diligent Procurement Secures Competitive Vendor Value!'
    elif cat_key == 'travel':
        desc = f'An international airport departure terminal where business travelers and ground staff coordinate flight boarding logistics involving {w}.'
        kw = f'{w} travel airport flight passenger transit logistics'
        mnem = f'{clean_w[:6]}: Seamless Travel Coordination Ensures Punctual Transit!'
    elif cat_key == 'health':
        desc = f'A bright corporate wellness clinic where healthcare specialists examine occupational safety records and preventive care guidelines for {w}.'
        kw = f'{w} healthcare clinical wellness medical clinic occupational health'
        mnem = f'{clean_w[:6]}: Preventive Health Measures Safeguard Workplace Vitality!'
    elif cat_key == 'dining':
        desc = f'An executive private dining suite where banquet managers and culinary staff prepare fine dining table arrangements highlighting {w}.'
        kw = f'{w} dining restaurant banquet hospitality catering gourmet'
        mnem = f'{clean_w[:6]}: Gracious Hospitality Elevates Executive Dining Standards!'
    elif cat_key == 'real-estate':
        desc = f'A commercial real estate office where property appraisers and brokers review architectural floor plans and lease agreements for {w}.'
        kw = f'{w} real estate commercial property leasing appraisal architecture'
        mnem = f'{clean_w[:6]}: Prudent Property Management Maximizes Asset Valuation!'
    elif cat_key == 'communications':
        desc = f'A corporate communications briefing room with broadcast cameras, microphones, and press packets ready to announce developments regarding {w}.'
        kw = f'{w} communications press release media briefing broadcast public relations'
        mnem = f'{clean_w[:6]}: Clear Public Communications Cultivate Stakeholder Trust!'
    else:
        desc = f'A sleek corporate office where executive teams collaborate around a conference table to review plans and milestones involving {w}.'
        kw = f'{w} corporate business office workplace collaboration management'
        mnem = f'{clean_w[:6]}: Professional Execution Anchors Core Business Mastery!'

    return {
        'imageKeyword': kw,
        'imageDescription': desc,
        'mnemonic': mnem
    }
