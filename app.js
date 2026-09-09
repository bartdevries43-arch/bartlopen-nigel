/* ================================================================== *
 *  Nigel, Run Coach · instapblok terug naar 17 km
 *  12 weken vanaf ma 14 sep 2026, na drie weken pauze rustig hervat.
 *  3 loopdagen (ma rustig / do kwaliteit / za lang), achilles/kuit-bewust,
 *  naast 2x krachttraining en de mountainbike als uitwijk bij klachten.
 * ================================================================== */

const CONFIG = {
  unit:       "km",
  zonePaceSuffix: "/km",
  footEmoji:  "🏃",
  mottos: [
    "Rustig weer opbouwen, maatje!",
    "Lekker begonnen, maatje!",
    "Je bouwt 'm mooi op, maatje.",
    "Halverwege, sterk volgehouden! ⚡",
    "De 17 komt in zicht, maatje!",
    "17 km gelopen! Wat een opbouw, maatje! 🏁",
  ],
  appName:    "Op naar 17K",
  runner:     "Nigel",
  goal:       "Comfortabel 17 km, rond 6:00/km",
  startDate:  new Date(2026, 8, 14),
  storeKey:   "nigel17.log.v1",
  coachName:  "Coach Bart",
  coachHandle:"@bartlopen",
  coachPhoto: "coach.jpg",
  athleteWord:"maatje",
  catchphrase:"Rustig weer opbouwen, maatje!",
};

const RUNNER = CONFIG.runner;
const GOAL = CONFIG.goal;
const START_DATE = CONFIG.startDate;
const STORE_KEY = CONFIG.storeKey;
const TOTAL_WEEKS = 12;
const UNIT = CONFIG.unit === "min" ? "min" : "km";
const UNIT_LABEL = UNIT;
const ZONE_SUFFIX = CONFIG.zonePaceSuffix ?? "/km";
const COACH_INITIAL = (CONFIG.coachName.replace(/^coach\s+/i, "")[0] || "C").toUpperCase();

/* --- Tempozones, afgestemd op ongeveer 6:00/km ---------------------- */
const ZONES = [
  { key: "herstel",  name: "Herstel",         pace: "langzamer dan 7:00", info: "RPE 2-3 · heel rustig uitlopen" },
  { key: "duur",     name: "Rustige duur",    pace: "6:15–6:45",    info: "RPE 3-4 · praten kan makkelijk" },
  { key: "lang",     name: "Lange duurloop",  pace: "6:20–6:50",    info: "RPE 3-4 · tijd op de benen" },
  { key: "doel",     name: "17 km-tempo",     pace: "5:55–6:15",    info: "RPE 5-6 · rond de 6:00, jouw doel" },
  { key: "tempo",    name: "Drempel / tempo", pace: "5:30–5:50",   info: "RPE 7 · stevig, comfortabel zwaar" },
  { key: "interval", name: "Interval",        pace: "5:10–5:30",   info: "RPE 8 · pas als je kuit het toelaat" },
];
const zoneByKey = Object.fromEntries(ZONES.map((z) => [z.key, z]));

const COACH = {
  herstel: [
    "Vandaag echt rustig, maatje. Hier herstelt je kuit van.",
    "Makkelijk moet makkelijk zijn. Niet stoerder doen dan nodig.",
    "Rustdag-stijl. Je bouwt op, niet af.",
    "Slim getraind is half gewonnen, maatje.",
  ],
  duur: [
    "Rustige kilometers, maatje. Precies wat je na een pauze nodig hebt.",
    "Praattempo. Kun je geen hele zin uitspreken, dan loop je te hard.",
    "Saai maar goud waard. Hier bouw je je basis mee terug.",
    "Ontspannen schouders, rustige adem. Jij doet dit gewoon.",
  ],
  lang: [
    "De belangrijkste training van je week, maatje. Rustig starten.",
    "Verdeel je krachten. De laatste kilometers moeten nog kunnen.",
    "Tijd op de benen is precies wat je richting 17 km nodig hebt.",
    "Zeurt je achillespees? Dan stoppen we, en volgende keer de mountainbike.",
  ],
  tempo: [
    "Drempeltempo, maatje. Stevig maar beheerst, niet alles geven.",
    "Zoek het tempo waarbij nog 2 of 3 woorden lukken.",
    "Tussen de blokken echt rustig joggen. Dat hoort erbij.",
    "Voelt je kuit gek? Dan kappen we het tempodeel. Altijd.",
  ],
  doel: [
    "Doeltempo, maatje. Dit tempo moet je straks 17 km lang volhouden.",
    "Voel goed hoe dit zit, dit is je ritme voor de finale.",
    "Niet sneller dan afgesproken. Beheersing is hier de training.",
    "Elke meter op dit tempo maakt je doel concreter.",
  ],
  interval: [
    "Snel maar ontspannen, maatje. Nooit sprinten met jouw kuit.",
    "Korte scherpe training. Morgen ben je weer los.",
    "Ruim joggen tussen de blokken, dan blijft de kwaliteit hoog.",
    "Bij de minste twijfel in je achillespees: overslaan.",
  ],
};
const coachLine = (zone) => {
  const arr = COACH[zone] || COACH.duur;
  return arr[Math.floor(Math.random() * arr.length)];
};

const DONE = [
  "💪 Sterk gedaan, maatje!",
  "🔥 Weer eentje afgevinkt.",
  "👏 Lekker bezig, maatje.",
  "🌟 Zo bouw je 'm netjes terug.",
  "✅ Weer een stukje sterker.",
  "🧡 Weer een stap richting je 17 km.",
];

const WHY = {
  herstel:  "Heel rustig lopen houdt je los en laat het bloed stromen zonder nieuwe belasting. Juist op deze dagen herstelt je achillespees en komt de winst van je zwaardere trainingen binnen.",
  duur:     "Rustige duurlopen op praattempo bouwen je aerobe motor terug: een sterker hart en pezen die weer wennen aan de belasting. Na een pauze is dit veruit het belangrijkste, en het hoort het grootste deel van je week te zijn.",
  lang:     "De lange duurloop is jouw belangrijkste training richting 17 km. Je bouwt uithoudingsvermogen op en je pezen wennen geleidelijk aan langere belasting. Rustig tempo, gewoon volhouden.",
  doel:     "Op je 17 km-tempo lopen leert je gevoel precies wat rond de 6:00 per km betekent. Zo weet je op de dag zelf hoe je moet starten en verdelen, in plaats van te gokken.",
  tempo:    "Drempeltempo verhoogt de snelheid waarbij je nog net in balans blijft. Als je drempel stijgt, voelt je doeltempo van 6:00 op den duur een stuk makkelijker aan.",
  interval: "Korte snelle stukken verbeteren je loopeconomie. We houden ze kort en laat in het blok, want jouw achillespees en kuit gaan vóór snelheid.",
};

const ma  = (o) => ({ day: "ma", dayLabel: "Maandag",   kind: "Rustige duurloop", ...o });
const don = (o) => ({ day: "do", dayLabel: "Donderdag", kind: "Kwaliteit",        ...o });
const za  = (o) => ({ day: "za", dayLabel: "Zaterdag",  kind: "Lange duurloop",   ...o });

const PLAN = [
  { week: 1, dates: "14–20 sep", phase: "Fase 1 · Rustig hervatten", sessions: [
    ma({ zone: "duur", km: 5, kind: "Rustige duurloop", title: "Rustig weer beginnen", goal: "Na drie weken pauze bouwen we voorzichtig op", blocks: [
      "5 km op 6:15–6:45/km",
      "Praattempo: je moet een hele zin kunnen uitspreken",
      "Sluit af met rustig uitlopen en je kuitoefeningen",
    ] }),
    don({ zone: "duur", km: 5, kind: "Rustige duurloop", title: "Tweede keer deze week", goal: "Het ritme weer te pakken krijgen", blocks: [
      "5 km op 6:15–6:45/km",
      "Praattempo: je moet een hele zin kunnen uitspreken",
      "Sluit af met rustig uitlopen en je kuitoefeningen",
    ] }),
    za({ zone: "lang", km: 8, kind: "Lange duurloop", title: "8 km rustig", goal: "Bewust ver onder je oude 13 km beginnen", blocks: [
      "8 km op 6:20–6:50/km",
      "Rustig starten, gelijkmatig blijven",
      "Voelt je achillespees zeurderig? Stop en wissel volgende keer voor de mountainbike",
    ] }),
  ]},
  { week: 2, dates: "21–27 sep", phase: "Fase 1 · Rustig hervatten", sessions: [
    ma({ zone: "duur", km: 5, kind: "Rustige duurloop", title: "5 km rustig", goal: "Herhaling maakt het makkelijker", blocks: [
      "5 km op 6:15–6:45/km",
      "Praattempo: je moet een hele zin kunnen uitspreken",
      "Sluit af met rustig uitlopen en je kuitoefeningen",
    ] }),
    don({ zone: "duur", km: 6, kind: "Rustige duurloop", title: "Eén kilometer erbij", goal: "Rustig uitbreiden", blocks: [
      "6 km op 6:15–6:45/km",
      "Praattempo: je moet een hele zin kunnen uitspreken",
      "Sluit af met rustig uitlopen en je kuitoefeningen",
    ] }),
    za({ zone: "lang", km: 9, kind: "Lange duurloop", title: "9 km", goal: "Kleine stap, geen sprong", blocks: [
      "9 km op 6:20–6:50/km",
      "Rustig starten, gelijkmatig blijven",
      "Voelt je achillespees zeurderig? Stop en wissel volgende keer voor de mountainbike",
    ] }),
  ]},
  { week: 3, dates: "28 sep–4 okt", phase: "Fase 1 · Rustig hervatten", sessions: [
    ma({ zone: "duur", km: 6, kind: "Rustige duurloop", title: "6 km rustig", goal: "Basis groeit mee", blocks: [
      "6 km op 6:15–6:45/km",
      "Praattempo: je moet een hele zin kunnen uitspreken",
      "Sluit af met rustig uitlopen en je kuitoefeningen",
    ] }),
    don({ zone: "duur", km: 6, kind: "Rustige duurloop", title: "Met 4 versnellingen", goal: "Eerste keer weer wat sneller bewegen", blocks: [
      "6 km op 6:15–6:45/km",
      "Daarna 4x 20 sec soepel versnellen, met 1 min rustig joggen ertussen",
      "Geen sprint, gewoon even je benen open maken",
      "Rustig uitlopen",
    ] }),
    za({ zone: "lang", km: 10, kind: "Mijlpaal", title: "🎉 Dubbele cijfers: 10 km", goal: "Tien kilometer weer op de teller", blocks: [
      "10 km op 6:20–6:50/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee, je bent langer dan een uur onderweg",
      "Voelt je achillespees zeurderig? Stop en wissel volgende keer voor de mountainbike",
    ] }),
  ]},
  { week: 4, dates: "5–11 okt", phase: "Fase 1 · Rustig hervatten", recovery: true, sessions: [
    ma({ zone: "herstel", km: 5, kind: "Herstel", title: "Rustige week", goal: "Elke vierde week lichter, juist voor je achillespees", blocks: [
      "5 km langzamer dan 7:00/km",
      "Bewust makkelijk, hier herstelt je kuit van",
    ] }),
    don({ zone: "duur", km: 5, kind: "Rustige duurloop", title: "Kort en soepel", goal: "Fris blijven", blocks: [
      "5 km op 6:15–6:45/km",
      "Praattempo: je moet een hele zin kunnen uitspreken",
      "Sluit af met rustig uitlopen en je kuitoefeningen",
    ] }),
    za({ zone: "lang", km: 8, kind: "Lange duurloop", title: "Terugvalweek", goal: "Nu terugschakelen, straks sterker", blocks: [
      "8 km op 6:20–6:50/km",
      "Rustig starten, gelijkmatig blijven",
      "Voelt je achillespees zeurderig? Stop en wissel volgende keer voor de mountainbike",
    ] }),
  ]},
  { week: 5, dates: "12–18 okt", phase: "Fase 2 · Terug op je oude niveau", sessions: [
    ma({ zone: "duur", km: 6, kind: "Rustige duurloop", title: "Weer opbouwen", goal: "Fris na de rustige week", blocks: [
      "6 km op 6:15–6:45/km",
      "Praattempo: je moet een hele zin kunnen uitspreken",
      "Sluit af met rustig uitlopen en je kuitoefeningen",
    ] }),
    don({ zone: "tempo", km: 7, kind: "Drempeltempo", title: "3x 5 min drempel", goal: "Je eerste tempotraining van dit blok", blocks: [
      "2 km rustig inlopen",
      "3x 5 min op 5:30–5:50/km, met 3 min rustig joggen ertussen",
      "Stevig maar beheerst: 2 of 3 woorden moeten nog lukken",
      "1,5 km uitlopen",
    ] }),
    za({ zone: "lang", km: 11, kind: "Lange duurloop", title: "11 km", goal: "Geduldig verder", blocks: [
      "11 km op 6:20–6:50/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee, je bent langer dan een uur onderweg",
      "Voelt je achillespees zeurderig? Stop en wissel volgende keer voor de mountainbike",
    ] }),
  ]},
  { week: 6, dates: "19–25 okt", phase: "Fase 2 · Terug op je oude niveau", sessions: [
    ma({ zone: "duur", km: 7, kind: "Rustige duurloop", title: "7 km rustig", goal: "Volume vasthouden", blocks: [
      "7 km op 6:15–6:45/km",
      "Praattempo: je moet een hele zin kunnen uitspreken",
      "Sluit af met rustig uitlopen en je kuitoefeningen",
    ] }),
    don({ zone: "tempo", km: 7, kind: "Drempeltempo", title: "4x 5 min drempel", goal: "Een blok erbij", blocks: [
      "2 km rustig inlopen",
      "4x 5 min op 5:30–5:50/km, met 3 min rustig joggen ertussen",
      "Stevig maar beheerst: 2 of 3 woorden moeten nog lukken",
      "1,5 km uitlopen",
    ] }),
    za({ zone: "lang", km: 12, kind: "Lange duurloop", title: "12 km", goal: "Bijna terug op je oude niveau", blocks: [
      "12 km op 6:20–6:50/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee, je bent langer dan een uur onderweg",
      "Voelt je achillespees zeurderig? Stop en wissel volgende keer voor de mountainbike",
    ] }),
  ]},
  { week: 7, dates: "26 okt–1 nov", phase: "Fase 2 · Terug op je oude niveau", sessions: [
    ma({ zone: "duur", km: 7, kind: "Rustige duurloop", title: "7 km rustig", goal: "Onderhoud", blocks: [
      "7 km op 6:15–6:45/km",
      "Praattempo: je moet een hele zin kunnen uitspreken",
      "Sluit af met rustig uitlopen en je kuitoefeningen",
    ] }),
    don({ zone: "tempo", km: 8, kind: "Drempeltempo", title: "2x 10 min drempel", goal: "Langere blokken, zelfde tempo", blocks: [
      "2 km rustig inlopen",
      "2x 10 min op 5:30–5:50/km, met 4 min rustig joggen ertussen",
      "Stevig maar beheerst: 2 of 3 woorden moeten nog lukken",
      "1,5 km uitlopen",
    ] }),
    za({ zone: "lang", km: 13, kind: "Mijlpaal", title: "🎉 13 km: terug op je oude niveau", goal: "Precies je laatste loop van voor de pauze", blocks: [
      "13 km op 6:20–6:50/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee, je bent langer dan een uur onderweg",
      "Zo ver liep je drie weken voor dit blok begon. Nu weer, en beter opgebouwd.",
      "Voelt je achillespees zeurderig? Stop en wissel volgende keer voor de mountainbike",
    ] }),
  ]},
  { week: 8, dates: "2–8 nov", phase: "Fase 2 · Terug op je oude niveau", recovery: true, sessions: [
    ma({ zone: "herstel", km: 5, kind: "Herstel", title: "Rustige week", goal: "Opladen voor de laatste fase", blocks: [
      "5 km langzamer dan 7:00/km",
      "Bewust makkelijk, hier herstelt je kuit van",
    ] }),
    don({ zone: "duur", km: 6, kind: "Rustige duurloop", title: "Met 5 versnellingen", goal: "Benen wakker houden", blocks: [
      "6 km op 6:15–6:45/km",
      "Daarna 5x 20 sec soepel versnellen, met 1 min rustig joggen ertussen",
      "Geen sprint, gewoon even je benen open maken",
      "Rustig uitlopen",
    ] }),
    za({ zone: "lang", km: 10, kind: "Lange duurloop", title: "Terugvalweek", goal: "Bijtanken", blocks: [
      "10 km op 6:20–6:50/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee, je bent langer dan een uur onderweg",
      "Voelt je achillespees zeurderig? Stop en wissel volgende keer voor de mountainbike",
    ] }),
  ]},
  { week: 9, dates: "9–15 nov", phase: "Fase 3 · Op naar de 17 km", sessions: [
    ma({ zone: "duur", km: 7, kind: "Rustige duurloop", title: "7 km rustig", goal: "Nu op naar de 17", blocks: [
      "7 km op 6:15–6:45/km",
      "Praattempo: je moet een hele zin kunnen uitspreken",
      "Sluit af met rustig uitlopen en je kuitoefeningen",
    ] }),
    don({ zone: "doel", km: 8, kind: "Doeltempo", title: "3x 2 km op 17 km-tempo", goal: "Wennen aan het tempo van je doel", blocks: [
      "2 km rustig inlopen",
      "3x 2 km op 5:55–6:15/km, met 3 min joggen ertussen",
      "Dit is het tempo waarop je straks je 17 km loopt",
      "1,5 km uitlopen",
    ] }),
    za({ zone: "lang", km: 14, kind: "Lange duurloop", title: "14 km", goal: "Voorbij je oude langste", blocks: [
      "14 km op 6:20–6:50/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee, je bent langer dan een uur onderweg",
      "Voelt je achillespees zeurderig? Stop en wissel volgende keer voor de mountainbike",
    ] }),
  ]},
  { week: 10, dates: "16–22 nov", phase: "Fase 3 · Op naar de 17 km", sessions: [
    ma({ zone: "duur", km: 8, kind: "Rustige duurloop", title: "8 km rustig", goal: "Stevige basis", blocks: [
      "8 km op 6:15–6:45/km",
      "Praattempo: je moet een hele zin kunnen uitspreken",
      "Sluit af met rustig uitlopen en je kuitoefeningen",
    ] }),
    don({ zone: "tempo", km: 8, kind: "Drempeltempo", title: "2x 12 min drempel", goal: "Je langste drempelblokken", blocks: [
      "2 km rustig inlopen",
      "2x 12 min op 5:30–5:50/km, met 4 min rustig joggen ertussen",
      "Stevig maar beheerst: 2 of 3 woorden moeten nog lukken",
      "1,5 km uitlopen",
    ] }),
    za({ zone: "lang", km: 15.5, kind: "Lange duurloop", title: "15,5 km", goal: "Nieuwe langste, de 17 komt in zicht", blocks: [
      "15.5 km op 6:20–6:50/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee, je bent langer dan een uur onderweg",
      "Voelt je achillespees zeurderig? Stop en wissel volgende keer voor de mountainbike",
    ] }),
  ]},
  { week: 11, dates: "23–29 nov", phase: "Fase 3 · Op naar de 17 km", recovery: true, sessions: [
    ma({ zone: "duur", km: 6, kind: "Rustige duurloop", title: "6 km rustig", goal: "Benen sparen voor de finale", blocks: [
      "6 km op 6:15–6:45/km",
      "Praattempo: je moet een hele zin kunnen uitspreken",
      "Sluit af met rustig uitlopen en je kuitoefeningen",
    ] }),
    don({ zone: "doel", km: 7, kind: "Doeltempo", title: "3x 2 km op 17 km-tempo", goal: "Scherp maken, niet moe maken", blocks: [
      "2 km rustig inlopen",
      "3x 2 km op 5:55–6:15/km, met 3 min joggen ertussen",
      "Dit is het tempo waarop je straks je 17 km loopt",
      "1,5 km uitlopen",
    ] }),
    za({ zone: "lang", km: 13, kind: "Lange duurloop", title: "13 km, afbouwen", goal: "Vanaf nu spaar je energie", blocks: [
      "13 km op 6:20–6:50/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee, je bent langer dan een uur onderweg",
      "Voelt je achillespees zeurderig? Stop en wissel volgende keer voor de mountainbike",
    ] }),
  ]},
  { week: 12, dates: "30 nov–6 dec", phase: "Fase 3 · Op naar de 17 km", finish: true, raceLabel: "🏁 Jouw 17 km", sessions: [
    ma({ zone: "duur", km: 5, kind: "Rustige duurloop", title: "Losmaken", goal: "Kort en rustig, niets forceren", blocks: [
      "5 km op 6:15–6:45/km",
      "Praattempo: je moet een hele zin kunnen uitspreken",
      "Sluit af met rustig uitlopen en je kuitoefeningen",
    ] }),
    don({ zone: "herstel", km: 5, kind: "Herstel", title: "Kort met 3 versnellingen", goal: "Scherp en uitgerust naar zaterdag", blocks: [
      "5 km langzamer dan 7:00/km",
      "3x 20 sec versnellen, met ruim joggen ertussen",
      "Bewust makkelijk, hier herstelt je kuit van",
    ] }),
    za({ zone: "doel", km: 17, kind: "Finale", title: "🏁 17 km", goal: "Waar je twaalf weken voor gewerkt hebt", blocks: [
      "Eet 2 tot 3 uur vooraf iets vertrouwds, niets nieuws",
      "Eerste 4 km bewust rustig op 6:20–6:50/km, laat je niet meeslepen",
      "Daarna zoveel mogelijk op 5:55–6:15/km, dat is jouw doeltempo",
      "Neem drinken mee, en iets eetbaars vanaf ongeveer 75 minuten",
      "Laatste 3 km: hier haal je 'm binnen, maatje",
      "Rustig uitlopen, rekken, en trots zijn 🧡",
    ] }),
  ]},
];

const INFO = [
  { icon: "🎯", title: "Je doel: comfortabel 17 km", items: [
    "Twaalf weken vanaf maandag 14 september, met de 17 km als finale op zaterdag 5 december.",
    "Je laatste loop was 13 km, drie weken geleden. We starten bewust op 8 km en bouwen rustig terug.",
    "In week 7 sta je weer op 13 km, en vanaf daar gaan we pas verder dan je ooit kwam.",
    "Richttempo voor de 17 km is rond de 6:00 per km. Je rustige kilometers loop je bewust langzamer.",
    "Geen wedstrijd, geen tijdsdruk. Comfortabel uitlopen is het doel.",
  ]},
  { icon: "🔄", title: "Rustig hervatten na een pauze", items: [
    "Na drie weken zonder lopen is je conditie nauwelijks weg, maar je pezen zijn de belasting ontwend.",
    "Daarom beginnen we op 8 km en niet op 13. Dat voelt makkelijk, en dat hoort ook zo.",
    "De eerste twee weken mag alles traag voelen. Dat is geen achteruitgang, dat is opbouw.",
    "Ga niet inhalen wat je gemist hebt. Precies daar gaat het bij een comeback meestal mis.",
    "Elke vierde week is bewust lichter (week 4, 8 en 11). Sla die nooit over.",
  ]},
  { icon: "🦶", title: "Je achillespees en kuit, houd 'm sterk", items: [
    "Excentrische kuitheffingen: 3 series van 12, rustig omhoog en heel langzaam zakken. 2x per week.",
    "Doe ze op je loopdagen ná het lopen, niet ervoor.",
    "Wat stijfheid de ochtend na een lange loop is normaal. Scherpe of stekende pijn niet.",
    "Twee trainingen op rij gevoelig? Sla het tempowerk over en loop alleen rustig.",
    "Loop niet elke keer op asfalt. Zoek af en toe een parkpad of gras, dat scheelt je pees echt.",
  ]},
  { icon: "🚵", title: "Bij klachten: ruil in voor de mountainbike", items: [
    "Zeurt je achillespees of kuit? Ruil de training in voor een stevige MTB-rit.",
    "Reken ongeveer twee keer de looptijd: een loop van 45 min wordt zo'n 90 min fietsen.",
    "Je conditie blijft er prima mee op peil en je pees krijgt rust. Dat is winst, geen verlies.",
    "Doe dit liever één keer te vroeg dan één keer te laat.",
    "Vervang bij voorkeur de kwaliteitstraining op donderdag, niet je lange loop.",
  ]},
  { icon: "🏋️", title: "2x krachttraining bij Basic Fit", items: [
    "Blijf dat gewoon doen, het maakt je blessurebestendiger.",
    "Plan zware benen niet de dag vóór je lange loop op zaterdag. Maandag of woensdag is beter.",
    "Squats, lunges, kuitwerk en romp hebben het meeste effect op je lopen.",
    "Ga voor zwaar en weinig herhalingen (6 tot 8) in plaats van veel herhalingen met licht gewicht.",
    "In de laatste week bouw je ook je kracht af, dan sta je fris aan de start van je 17 km.",
  ]},
  { icon: "🥤", title: "Voeding en drinken", items: [
    "Onder een uur hoef je onderweg niets. Daarboven wordt het belangrijk.",
    "Vanaf 10 km: drinken meenemen en elke 20 minuten een paar slokken.",
    "Vanaf ongeveer 75 minuten ook iets eetbaars: een gel, dadels of sportdrank.",
    "Oefen dat tijdens je lange lopen, dan weet je op 5 december precies wat werkt.",
    "Eet na een lange loop binnen een uur iets met koolhydraten en eiwit. Dat scheelt echt in je herstel.",
  ]},
  { icon: "🌙", title: "Donker en koud lopen", items: [
    "Je blok loopt tot begin december, dus je loopt straks vaak in het donker.",
    "Draag iets fels of reflecterends, en neem een klein hoofdlampje mee op onverlichte stukken.",
    "Kleed je in laagjes en start liever een tikje kouder. Na 10 minuten warm je flink op.",
    "Koude kuiten zijn stijve kuiten: neem in de winter je warming-up serieuzer dan in de zomer.",
    "IJzel of gladde stoep? Niet lopen. Pak de mountainbike of verzet de training.",
  ]},
  { icon: "😴", title: "Rust en geduld", items: [
    "Slaap is je goedkoopste winst. Zeven tot negen uur maakt een groot verschil.",
    "Een dag spierpijn is normaal. Drie dagen moeheid betekent te veel of te snel.",
    "Een week overslaan door drukte of ziekte? Geen ramp, pak de draad gewoon weer op.",
    "Komt een hele week niet uit? Gebruik de knop bij het schema om alles een week op te schuiven.",
    "Twijfel je over een klacht? Stuur Coach Bart een bericht, dan passen we het aan.",
  ]},
];

const BADGES = [
  { id: "first",   icon: "👟", name: "Weer begonnen",   desc: "1 training afgevinkt",    test: (s) => s.done >= 1 },
  { id: "week",    icon: "✅", name: "Week compleet",   desc: "Een hele week afgerond",  test: (s) => s.fullWeeks >= 1 },
  { id: "tien",    icon: "🔟", name: "Dubbele cijfers", desc: "10 km in één training",   test: (s) => s.maxDist >= 10 },
  { id: "streak",  icon: "🔥", name: "Drie weken vol",  desc: "Reeks van 9 trainingen",  test: (s) => s.streak >= 9 },
  { id: "terug",   icon: "💪", name: "Terug op niveau", desc: "13 km in één training",   test: (s) => s.maxDist >= 13 },
  { id: "half",    icon: "⚡", name: "Halverwege",      desc: "50% van je schema",       test: (s) => s.done >= s.total / 2 },
  { id: "honderd", icon: "💯", name: "Honderd km",      desc: "100 km totaal gelopen",   test: (s) => s.km >= 100 },
  { id: "vijftien",icon: "🏔️", name: "Vijftien",        desc: "15 km in één training",   test: (s) => s.maxDist >= 15 },
  { id: "loyal",   icon: "📅", name: "Vaste klant",     desc: "25 trainingen gedaan",    test: (s) => s.done >= 25 },
  { id: "tweehond",icon: "🚀", name: "Tweehonderd km",  desc: "200 km totaal gelopen",   test: (s) => s.km >= 200 },
  { id: "finish",  icon: "🏁", name: "De 17 km",        desc: "Je finale voltooid",      test: (s) => s.raceDone },
];

/* ================================================================== *
 *  State
 * ================================================================== */
function loadLog() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
  catch { return {}; }
}
function saveLog() { localStorage.setItem(STORE_KEY, JSON.stringify(log)); }
let log = loadLog();

const sid = (week, day) => `w${week}-${day}`;
const flatSessions = PLAN.flatMap((w) => w.sessions.map((s) => ({ ...s, week: w.week })));
const totalSessions = flatSessions.length;
const LAST_SESSION = flatSessions[flatSessions.length - 1];
const DAY_OFFSET = { ma: 0, di: 1, wo: 2, do: 3, vr: 4, za: 5, zo: 6, d1: 0, d2: 2, d3: 4, d4: 6 };

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

function dateAtDay(dayIndex) {
  const date = new Date(schedStartMs());
  date.setDate(date.getDate() + dayIndex);
  date.setHours(12, 0, 0, 0);
  return date;
}

function sessionDate(week, day) {
  return dateAtDay((week - 1) * 7 + (DAY_OFFSET[day] ?? 0));
}

function isoDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function planningEntries() {
  return Array.isArray(log.__planning) ? log.__planning : [];
}

function planningForWeek(week) {
  const start = isoDate(dateAtDay((week - 1) * 7));
  const end = isoDate(dateAtDay((week - 1) * 7 + 6));
  return planningEntries().filter((entry) => entry.start <= end && (entry.end || entry.start) >= start);
}

function parseTime(str) {
  if (!str) return null;
  const parts = String(str).split(":").map((p) => parseInt(p, 10));
  if (parts.some((n) => Number.isNaN(n))) return null;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return parts[0] * 60;
}

function durationParts(str) {
  const total = parseTime(str) || 0;
  return { minutes: Math.floor(total / 60), seconds: total % 60 };
}

function durationValue(minutes, seconds) {
  const m = Math.max(0, parseInt(minutes, 10) || 0);
  const s = Math.min(59, Math.max(0, parseInt(seconds, 10) || 0));
  return `${m}:${String(s).padStart(2, "0")}`;
}
function paceSeconds(distance, timeStr) {
  const d = parseFloat(String(distance).replace(",", "."));
  const sec = parseTime(timeStr);
  if (!d || !sec) return null;
  return sec / d;
}
function fmtPace(perKm) {
  if (!perKm) return null;
  const m = Math.floor(perKm / 60);
  const s = Math.round(perKm % 60);
  return `${m}:${String(s).padStart(2, "0")} /km`;
}

/* Afgeleide statistieken uit de log */
function computeStats() {
  let done = 0, km = 0, maxDist = 0, maxTime = 0, bestPace = 0, raceDone = false;
  flatSessions.forEach((s) => {
    const e = log[sid(s.week, s.day)];
    if (!e || !e.done) return;
    done++;
    const d = parseFloat(String(e.distance || "").replace(",", ".")) || 0;
    km += d;
    if (d > maxDist) maxDist = d;
    const t = parseTime(e.time) || 0;
    if (t > maxTime) maxTime = t;
    const p = paceSeconds(e.distance, e.time);
    if (p && (bestPace === 0 || p < bestPace)) bestPace = p;
    if (s.week === LAST_SESSION.week && s.day === LAST_SESSION.day) raceDone = true;
  });
  let streak = 0, run = 0;
  flatSessions.forEach((s) => {
    const e = log[sid(s.week, s.day)];
    if (e && e.done) { run++; streak = Math.max(streak, run); } else run = 0;
  });
  let fullWeeks = 0;
  PLAN.forEach((w) => {
    if (w.sessions.every((s) => log[sid(w.week, s.day)]?.done)) fullWeeks++;
  });
  return { done, total: totalSessions, km, maxDist, maxTime, bestPace, raceDone, streak, fullWeeks };
}

function currentWeek() {
  const diff = Math.floor((Date.now() - schedStartMs()) / (7 * 864e5));
  return Math.min(TOTAL_WEEKS, Math.max(1, diff + 1));
}

/* ================================================================== *
 *  Rendering
 * ================================================================== */
const $ = (id) => document.getElementById(id);

function animateCount(el, to, suffix = "") {
  const dur = 700, t0 = performance.now();
  const dec = to % 1 !== 0;
  function step(t) {
    const k = Math.min(1, (t - t0) / dur);
    const v = to * (1 - Math.pow(1 - k, 3));
    el.textContent = (dec ? v.toFixed(1) : Math.round(v)) + suffix;
    if (k < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function renderHero(stats) {
  $("runnerName").textContent = RUNNER;
  $("goalText").textContent = GOAL;
  const pct = Math.round((stats.done / stats.total) * 100);
  $("ringPct").textContent = `${pct}%`;
  const r = 52, c = 2 * Math.PI * r;
  const fg = $("ringFg");
  fg.style.strokeDasharray = c;
  fg.style.strokeDashoffset = c;
  requestAnimationFrame(() => { fg.style.strokeDashoffset = c * (1 - pct / 100); });
  const mottos = CONFIG.mottos || ["Zet 'm op, strijder!", "Lekker bezig, strijder!", "Je bouwt 'm rustig op, strijder.", "Halverwege, knap volgehouden! ⚡", "Bijna race-klaar, strijder!", "Finisher! Wat een prestatie, strijder. 🏅"];
  $("heroMotto").textContent =
    stats.raceDone ? mottos[5] : pct >= 80 ? mottos[4] : pct >= 50 ? mottos[3] : pct >= 20 ? mottos[2] : pct > 0 ? mottos[1] : mottos[0];
  renderCountdown();
}

function raceInfo() {
  const rw = PLAN.find((w) => w.race || w.tuneup || w.finish) || PLAN[PLAN.length - 1];
  const rs = rw.sessions[rw.sessions.length - 1];
  const off = DAY_OFFSET[rs.day] ?? 6;
  const date = new Date(schedStartMs() + ((rw.week - 1) * 7 + off) * 864e5);
  const days = Math.round((date.setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 864e5);
  return { days, name: rs.title.replace(/^[^\p{L}\d]+/u, "").trim() };
}
function renderCountdown() {
  const motto = $("heroMotto");
  if (!motto) return;
  let el = $("raceCountdown");
  if (!el) {
    el = document.createElement("p");
    el.id = "raceCountdown";
    el.className = "hero-countdown";
    motto.after(el);
  }
  const { days, name } = raceInfo();
  const wks = Math.round(days / 7), mon = Math.round(days / 30);
  el.textContent =
    days > 180 ? `🗓️ jouw grote doel: over ~${mon} maanden, ${name}` :
    days > 14 ? `🗓️ nog ${wks} weken tot je ${name}` :
    days > 1 ? `🗓️ nog ${days} dagen tot je ${name}` :
    days === 1 ? `🗓️ morgen is het zover: ${name}!` :
    days === 0 ? `🔥 vandaag is het zover: ${name}!` :
    `🎉 ${name} volbracht, chapeau!`;
}

function renderStats(stats) {
  animateCount($("statDone"), stats.done);
  animateCount($("statKm"), Math.round(stats.km * 10) / 10, " km");
  animateCount($("statStreak"), stats.streak);
  const cw = currentWeek();
  const wk = PLAN.find((w) => w.week === cw);
  const wkDone = wk.sessions.filter((s) => log[sid(cw, s.day)]?.done).length;
  $("statWeek").textContent = `${wkDone}/${wk.sessions.length}`;
}

function renderNextUp() {
  const cw = currentWeek();
  const next =
    flatSessions.find((s) => s.week >= cw && !log[sid(s.week, s.day)]?.done) ||
    flatSessions.find((s) => !log[sid(s.week, s.day)]?.done);
  const box = $("nextUp");
  if (!next) {
    box.innerHTML = `<div class="nextup-card done"><span class="nextup-eyebrow">🏅 Schema compleet</span><strong>Alles afgevinkt, chapeau, ${RUNNER}!</strong></div>`;
    return;
  }
  const z = zoneByKey[next.zone];
  box.innerHTML = `
    <button class="nextup-card zone-${next.zone}" data-week="${next.week}" data-day="${next.day}">
      <span class="nextup-eyebrow">Volgende training · week ${next.week} · ${next.dayLabel}</span>
      <strong>${next.title}</strong>
      <span class="nextup-meta">${next[UNIT]} ${UNIT_LABEL} · ${z.name}</span>
      <span class="nextup-go">Openen ›</span>
    </button>`;
  box.querySelector(".nextup-card").addEventListener("click", () => openDetail(next.week, next.day));
}

const PLANNING_META = {
  race: {
    icon: "🏁", label: "Tussentijdse race",
    advice: "Laat deze race je lange training vervangen. Houd de training ervoor rustig en plan daarna minimaal één hersteldag.",
  },
  vacation: {
    icon: "🌴", label: "Vakantie",
    advice: "Gemiste trainingen hoef je niet in te halen. Pak bij thuiskomst de eerstvolgende rustige training op.",
  },
  rest: {
    icon: "🩹", label: "Rust / blessure",
    advice: "Herstel gaat voor het schema. Hervat pas pijnvrij en bouw de eerste week extra rustig op.",
  },
};

function formatPlanDate(value) {
  if (!value) return "";
  const date = new Date(`${value}T12:00:00`);
  return date.toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" });
}

function renderPlanning() {
  const list = $("planningList");
  if (!list) return;
  const entries = [...planningEntries()].sort((a, b) => a.start.localeCompare(b.start));
  if (!entries.length) {
    list.innerHTML = `<div class="planning-empty"><span>🗓️</span><p>Nog niets gepland. Voeg een vakantie of oefenwedstrijd toe zodra je die weet.</p></div>`;
    return;
  }
  list.innerHTML = entries.map((entry) => {
    const meta = PLANNING_META[entry.type] || PLANNING_META.rest;
    const period = entry.end && entry.end !== entry.start
      ? `${formatPlanDate(entry.start)} – ${formatPlanDate(entry.end)}`
      : formatPlanDate(entry.start);
    return `<article class="planning-item plan-${entry.type}">
      <span class="planning-icon">${meta.icon}</span>
      <div class="planning-copy">
        <span class="planning-type">${meta.label} · ${period}</span>
        <strong>${escapeHtml(entry.title)}</strong>
        ${entry.note ? `<p>${escapeHtml(entry.note)}</p>` : ""}
        <p class="planning-advice"><b>Coachadvies:</b> ${meta.advice}</p>
      </div>
      <button class="planning-remove" type="button" data-plan-id="${escapeHtml(entry.id)}" aria-label="${escapeHtml(entry.title)} verwijderen">×</button>
    </article>`;
  }).join("");
  list.querySelectorAll(".planning-remove").forEach((button) => {
    button.addEventListener("click", () => {
      log.__planning = planningEntries().filter((entry) => entry.id !== button.dataset.planId);
      saveLog();
      renderAll();
      toast("Uit je planning verwijderd");
    });
  });
}

function renderZones() {
  $("zonesList").innerHTML = ZONES.map((z) => `
    <div class="zone-row zone-${z.key}">
      <span class="zone-dot"></span>
      <div class="zone-main"><strong>${z.name}</strong><span>${z.info}</span></div>
      <span class="zone-pace">${z.pace}${ZONE_SUFFIX ? `<small>${ZONE_SUFFIX}</small>` : ""}</span>
    </div>`).join("");
}

function renderChart() {
  const cwBar = currentWeek();
  const max = Math.max(...PLAN.map((w) => w.sessions.reduce((n, s) => n + s[UNIT], 0)));
  $("volumeChart").innerHTML = PLAN.map((w) => {
    const planned = w.sessions.reduce((n, s) => n + s[UNIT], 0);
    const doneMin = w.sessions.reduce((n, s) => n + (log[sid(w.week, s.day)]?.done ? s[UNIT] : 0), 0);
    const h = Math.round((planned / max) * 100);
    const fill = planned ? Math.round((doneMin / planned) * 100) : 0;
    const cls = ((w.race || w.tuneup || w.finish) ? "is-race" : w.recovery ? "is-rest" : "") + (w.week === cwBar ? " is-now" : "");
    return `
      <div class="bar ${cls}" title="Week ${w.week}: ${planned} ${UNIT_LABEL} gepland">
        <div class="bar-track" style="height:${h}%">
          <div class="bar-fill" style="height:${fill}%"></div>
        </div>
        <span class="bar-x">${w.week}</span>
      </div>`;
  }).join("");
}

function tagOf(w) {
  if (w.finish) return `<span class="week-tag tag-race">Finale</span>`;
  if (w.race) return `<span class="week-tag tag-race">Raceweek</span>`;
  if (w.tuneup) return `<span class="week-tag tag-tuneup">${w.tuneupTag || "Wedstrijd"}</span>`;
  if (w.recovery) return `<span class="week-tag tag-rest">Herstel</span>`;
  if (w.taper) return `<span class="week-tag tag-taper">Taper</span>`;
  return "";
}

function renderWeeks() {
  const cw = currentWeek();
  const todayIso = isoDate(new Date());
  let html = "", lastPhase = "";
  PLAN.forEach((w, i) => {
    if (w.phase !== lastPhase) { html += `<h4 class="sub-phase reveal">${w.phase}</h4>`; lastPhase = w.phase; }
    const sess = w.sessions.map((s) => {
      const e = log[sid(w.week, s.day)] || {};
      const z = zoneByKey[s.zone];
      const pace = fmtPace(paceSeconds(e.distance, e.time));
      const bits = [];
      if (e.distance) bits.push(`${e.distance} km`);
      if (pace) bits.push(pace);
      if (e.hr) bits.push(`${e.hr} bpm`);
      const logged = bits.length ? `<span class="session-logged">📊 ${bits.join(" · ")}</span>` : "";
      const lastDay = w.sessions[w.sessions.length - 1].day;
      const isRaceSession = (w.race || w.tuneup || w.finish) && s.day === lastDay;
      const isToday = isoDate(sessionDate(w.week, s.day)) === todayIso;
      const raceKicker = isRaceSession
        ? `<span class="session-race-kicker">${w.raceLabel || (w.race ? "🏅 Doelrace" : w.tuneup ? "🏁 Wedstrijd" : "🏁 Finale")}</span>`
        : "";
      return `
        <button class="session zone-${s.zone} ${isRaceSession ? "is-race-session" : ""} ${e.done ? "is-done" : ""} ${isToday ? "is-today" : ""}" data-week="${w.week}" data-day="${s.day}">
          <span class="session-day">${isRaceSession ? "<small>🏁</small>" : ""}${s.dayLabel.slice(0, 2)}</span>
          <span class="session-body">
            ${raceKicker}
            <span class="session-title">${s.title}${isToday ? ' <span class="today-badge">Vandaag</span>' : ""}</span>
            <span class="session-meta">${s[UNIT]} ${UNIT_LABEL} · ${s.kind}</span>
            ${logged}
          </span>
          <span class="session-check">${e.done ? "✓" : ""}</span>
        </button>`;
    }).join("");
    const weekPlans = planningForWeek(w.week);
    const planStrip = weekPlans.length ? `<div class="week-planning">${weekPlans.map((entry) => {
      const meta = PLANNING_META[entry.type] || PLANNING_META.rest;
      return `<span>${meta.icon} ${escapeHtml(entry.title)}</span>`;
    }).join("")}</div>` : "";
    html += `
      <article class="week-card reveal ${w.tuneup ? "is-tuneup-week" : ""} ${w.race ? "is-goal-race-week" : ""} ${w.week === cw ? "is-current" : ""} ${w.week < cw ? (w.sessions.every((x) => log[sid(w.week, x.day)]?.done) ? "is-complete" : "is-missed") : ""}" style="--i:${i % 4}">
        <header class="week-head">
          <div><span class="week-no">Week ${w.week}</span><span class="week-dates">${weekDateLabel(w)}</span></div>
          ${w.week === cw ? `<span class="week-tag tag-now">Nu</span>` : w.week < cw ? (w.sessions.every((x) => log[sid(w.week, x.day)]?.done) ? `<span class="week-tag tag-done">✓ af</span>` : `<span class="week-tag tag-missed">gemist</span>`) : tagOf(w)}
        </header>
        ${planStrip}
        <div class="session-list">${sess}</div>
      </article>`;
  });
  $("weeksList").innerHTML = html;
  $("weeksList").querySelectorAll(".session").forEach((b) =>
    b.addEventListener("click", () => openDetail(+b.dataset.week, b.dataset.day)));
  observeReveals();
}

function renderBadges(stats) {
  $("badgeGrid").innerHTML = BADGES.map((b) => {
    const got = b.test(stats);
    return `
      <div class="badge ${got ? "got" : "locked"}" title="${b.desc}">
        <span class="badge-icon">${got ? b.icon : "🔒"}</span>
        <strong>${b.name}</strong>
        <span class="badge-desc">${b.desc}</span>
      </div>`;
  }).join("");
}

function renderInfo() {
  $("infoList").innerHTML = INFO.map((c, i) => `
    <article class="info-card reveal" style="--i:${i}">
      <span class="info-icon">${c.icon}</span>
      <h4>${c.title}</h4>
      <ul>${c.items.map((t) => `<li>${t}</li>`).join("")}</ul>
    </article>`).join("");
}

function addJumpButton() {
  const head = document.querySelector(".weeks .phase-head");
  if (!head || document.getElementById("jumpNow")) return;
  const btn = document.createElement("button");
  btn.id = "jumpNow";
  btn.type = "button";
  btn.className = "jump-now";
  btn.textContent = "Naar deze week ↓";
  btn.addEventListener("click", () =>
    document.querySelector(".week-card.is-current")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  head.insertAdjacentElement("afterend", btn);
}

/* ----- Extra's: begroeting, records, consistentie ------------------- */
function greetingWord() {
  const h = new Date().getHours();
  return h < 6 ? "Goedenacht" : h < 12 ? "Goedemorgen" : h < 18 ? "Goedemiddag" : "Goedenavond";
}
function renderGreeting() {
  const copy = document.querySelector(".hero-copy");
  if (!copy) return;
  let el = document.getElementById("heroGreeting");
  if (!el) {
    el = document.createElement("p");
    el.id = "heroGreeting";
    el.className = "hero-greeting";
    copy.insertBefore(el, copy.firstChild);
  }
  el.textContent = `${greetingWord()}, ${RUNNER.split(" ")[0]} 👋`;
}
function renderRecords(stats) {
  const anchor = document.querySelector(".weeks");
  if (!anchor) return;
  let sec = document.getElementById("recordsPanel");
  if (!sec) {
    sec = document.createElement("section");
    sec.id = "recordsPanel";
    sec.className = "panel reveal";
    anchor.parentNode.insertBefore(sec, anchor);
  }
  const pace = fmtPace(stats.bestPace);
  const longest = UNIT === "min"
    ? (stats.maxTime ? `${Math.round(stats.maxTime / 60)} min` : "–")
    : (stats.maxDist ? `${stats.maxDist} km` : "–");
  const rows = [
    ["⚡ Snelste tempo", pace || "–"],
    [UNIT === "min" ? "⏱️ Langste loop" : "🏔️ Verste loop", longest],
    ["📊 Totaal gelopen", `${Math.round(stats.km * 10) / 10} km`],
    ["🔥 Langste reeks", String(stats.streak)],
  ];
  sec.innerHTML = `<h3 class="panel-head">Jouw records</h3>
    <div class="records">${rows.map(([l, v]) =>
      `<div class="record"><span class="record-val">${v}</span><span class="record-label">${l}</span></div>`).join("")}</div>`;
}
function renderConsistency() {
  const grid = document.querySelector(".stats-grid");
  if (!grid) return;
  let sec = document.getElementById("consistencyStrip");
  if (!sec) {
    sec = document.createElement("section");
    sec.id = "consistencyStrip";
    sec.className = "panel consistency-panel reveal";
    grid.parentNode.insertBefore(sec, grid.nextSibling);
  }
  const todayIso = isoDate(new Date());
  const cw = currentWeek();
  let done = 0, total = 0;
  const cols = PLAN.map((w) => {
    const cells = w.sessions.map((s) => {
      const e = log[sid(w.week, s.day)] || {};
      const dIso = isoDate(sessionDate(w.week, s.day));
      total++;
      if (e.done) done++;
      const cls = e.done ? "is-done" : dIso < todayIso ? "is-missed" : "is-todo";
      return `<span class="ccell ${cls}${dIso === todayIso ? " is-today" : ""}" title="Week ${w.week} \u00b7 ${s.dayLabel}"></span>`;
    }).join("");
    return `<div class="cweek${w.week === cw ? " is-current" : ""}"><div class="ccells">${cells}</div><span class="cweek-no">${w.week}</span></div>`;
  }).join("");
  const pct = total ? Math.round((done / total) * 100) : 0;
  sec.innerHTML = `
    <h3 class="panel-head">Consistentie <span class="panel-sub">elk blokje is een training</span></h3>
    <div class="cweeks">${cols}</div>
    <div class="cons-foot">
      <div class="cons-legend"><span><i class="ck ck-done"></i>afgerond</span><span><i class="ck ck-missed"></i>gemist</span><span><i class="ck ck-todo"></i>komt nog</span></div>
      <span class="cons-score"><strong>${done}/${total}</strong> gedaan \u00b7 ${pct}%</span>
    </div>`;
}

/* ----- Schema opschuiven (drukke week) ------------------------------ */
const NL_MND = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
function weekOffset() { return (log && log.__weekOffset) || 0; }
function schedStartMs() { return START_DATE.getTime() + weekOffset() * 7 * 864e5; }
function weekDateLabel(w) {
  if (!weekOffset()) return w.dates;
  const mon = dateAtDay((w.week - 1) * 7), sun = dateAtDay((w.week - 1) * 7 + 6);
  return `${mon.getDate()} ${NL_MND[mon.getMonth()]}–${sun.getDate()} ${NL_MND[sun.getMonth()]}`;
}
function renderShiftControl() {
  const head = document.querySelector(".weeks .phase-head");
  if (!head) return;
  let el = document.getElementById("shiftControl");
  if (!el) {
    el = document.createElement("div");
    el.id = "shiftControl";
    el.className = "shift-control reveal";
    head.insertAdjacentElement("afterend", el);
  }
  const off = weekOffset();
  const wk = (n) => `${n} week${n > 1 ? "en" : ""}`;
  el.innerHTML = off > 0
    ? `<div class="shift-copy"><strong>Schema ${wk(off)} opgeschoven</strong><span>Je hele schema loopt nu ${wk(off)} langer. Niks staat op gemist.</span></div><div class="shift-btns"><button id="shiftMore" type="button">Nog een week</button><button id="shiftReset" type="button" class="ghost">Ongedaan maken</button></div>`
    : `<div class="shift-copy"><strong>Drukke week gehad?</strong><span>Schuif je hele schema een week op, dan raak je niks kwijt.</span></div><div class="shift-btns"><button id="shiftMore" type="button">Schuif 1 week op ↦</button></div>`;
  el.querySelector("#shiftMore").addEventListener("click", () => {
    if (!confirm("Je hele schema een week opschuiven?\n\nAlle trainingen schuiven mee. Je kunt dit altijd terugzetten.")) return;
    log.__weekOffset = weekOffset() + 1; saveLog(); renderAll();
    toast("Schema een week opgeschoven 📅");
  });
  const rs = el.querySelector("#shiftReset");
  if (rs) rs.addEventListener("click", () => {
    log.__weekOffset = 0; saveLog(); renderAll();
    toast("Opschuiven ongedaan gemaakt");
  });

  /* Duidelijke melding bovenaan: een per ongeluk verschoven schema moet je
     meteen zien, niet pas als je ver naar beneden scrollt. */
  const hero = document.querySelector(".hero");
  let notice = document.getElementById("shiftNotice");
  if (off > 0 && hero) {
    if (!notice) {
      notice = document.createElement("div");
      notice.id = "shiftNotice";
      notice.className = "shift-notice";
      hero.insertAdjacentElement("afterend", notice);
    }
    notice.innerHTML = `<div class="shift-copy"><strong>\u{1F4C5} Je schema staat ${wk(off)} opgeschoven</strong><span>Daardoor sta je ${wk(off)} eerder in je schema dan de kalender. Klopt dat niet? Zet het gewoon terug.</span></div><div class="shift-btns"><button id="noticeReset" type="button">Zet terug</button></div>`;
    notice.querySelector("#noticeReset").addEventListener("click", () => {
      log.__weekOffset = 0; saveLog(); renderAll();
      toast("Schema teruggezet \u{1F4C5}");
    });
  } else if (notice) {
    notice.remove();
  }
}

function renderAll() {
  const stats = computeStats();
  renderHero(stats);
  renderStats(stats);
  renderGreeting();
  renderConsistency();
  renderNextUp();
  renderPlanning();
  renderChart();
  renderZones();
  renderWeeks();
  addJumpButton();
  renderShiftControl();
  renderBadges(stats);
  renderRecords(stats);
  renderInfo();
  observeReveals();
}

/* ----- Detailweergave ------------------------------------------------ */
function openDetail(week, day) {
  const w = PLAN.find((x) => x.week === week);
  const s = w.sessions.find((x) => x.day === day);
  const id = sid(week, day);
  const e = log[id] || {};
  const z = zoneByKey[s.zone];
  const enteredTime = durationParts(e.time);

  $("detailTitle").textContent = `Week ${week} · ${s.dayLabel}`;
  $("detailBody").innerHTML = `
    <div class="detail-hero zone-${s.zone}">
      <span class="detail-kind">${s.kind} · ${s[UNIT]} ${UNIT_LABEL}</span>
      <h2>${s.title}</h2>
      <p class="detail-goal">${s.goal}</p>
      <span class="detail-zone">${z.name} · ${z.info}</span>
    </div>

    <div class="coach-bubble">
      <div class="coach-ava">
        <img src="${CONFIG.coachPhoto}" alt="${CONFIG.coachName}" onerror="this.style.display='none'">
        <span>${COACH_INITIAL}</span>
      </div>
      <div class="coach-text">
        <strong>${CONFIG.coachName} <span class="coach-handle">${CONFIG.coachHandle}</span></strong>
        <p>${coachLine(s.zone)}</p>
      </div>
    </div>

    <section class="detail-block why">
      <h4>${w.race || w.tuneup ? "Waarom deze wedstrijd" : "Waarom deze training"}</h4>
      <p>${s.why || WHY[s.zone] || ""}</p>
    </section>

    <section class="detail-block">
      <h4>Opbouw</h4>
      <ol class="block-list">${s.blocks.map((b) => `<li>${b}</li>`).join("")}</ol>
    </section>

    <section class="detail-block">
      <h4>${w.race || w.tuneup ? "Invullen na de wedstrijd" : "Invullen na de training"}</h4>
      <div class="form-grid">
        <label>Afstand (km)
          <input id="fDistance" type="text" inputmode="decimal" placeholder="bv. 6,2" value="${escapeHtml(e.distance ?? "")}">
        </label>
        <label>Tijd
          <span class="duration-input">
            <input id="fTimeMinutes" type="number" inputmode="numeric" min="0" max="999" placeholder="36" value="${enteredTime.minutes || ""}" aria-label="Minuten">
            <span>min</span>
            <input id="fTimeSeconds" type="number" inputmode="numeric" min="0" max="59" placeholder="30" value="${enteredTime.seconds || ""}" aria-label="Seconden">
            <span>sec</span>
          </span>
        </label>
        <label class="full">Gemiddeld tempo
          <output id="fPace" class="pace-out">${fmtPace(paceSeconds(e.distance, e.time)) || "–"}</output>
        </label>
        <label>Hartslag (bpm)
          <input id="fHr" type="number" inputmode="numeric" placeholder="bv. 152" value="${escapeHtml(e.hr ?? "")}">
        </label>
        <label>Gevoel / zwaarte
          <select id="fFeel">
            ${["", "1 · heel licht", "2 · licht", "3 · prima", "4 · pittig", "5 · zwaar"]
              .map((o) => `<option value="${o}" ${String(e.feel ?? "") === o ? "selected" : ""}>${o || "Kies…"}</option>`).join("")}
          </select>
        </label>
        <label class="full">Notitie
          <textarea id="fNote" rows="2" placeholder="Hoe ging het?">${escapeHtml(e.note ?? "")}</textarea>
        </label>
      </div>
    </section>

    <div class="detail-actions">
      <button id="toggleDone" class="btn-primary ${e.done ? "is-done" : ""}">${e.done ? "✓ Gedaan" : "Markeer als gedaan"}</button>
      <button id="saveSession" class="btn-ghost">Opslaan</button>
    </div>`;

  const readTime = () => {
    if (!$("fTimeMinutes").value && !$("fTimeSeconds").value) return "";
    return durationValue($("fTimeMinutes").value, $("fTimeSeconds").value);
  };
  const recalc = () => ($("fPace").textContent = fmtPace(paceSeconds($("fDistance").value, readTime())) || "–");
  $("fDistance").addEventListener("input", recalc);
  $("fTimeMinutes").addEventListener("input", recalc);
  $("fTimeSeconds").addEventListener("input", () => {
    if (+$("fTimeSeconds").value > 59) $("fTimeSeconds").value = "59";
    recalc();
  });

  const collect = () => ({
    ...log[id],
    distance: $("fDistance").value.trim(),
    time: readTime(),
    hr: $("fHr").value.trim(),
    feel: $("fFeel").value,
    note: $("fNote").value.trim(),
  });

  $("saveSession").addEventListener("click", () => {
    log[id] = collect(); saveLog();
    toast("Opgeslagen 💾");
    closeDetail();
  });
  $("toggleDone").addEventListener("click", () => {
    const cur = collect();
    cur.done = !cur.done;
    log[id] = cur; saveLog();
    if (cur.done) {
      celebrate();
      toast(w.finish ? "🏁 17 km gelopen! Wat een opbouw, maatje!" : w.race ? "🏅 Finisher! Wat een prestatie, strijder!" : w.tuneup ? "🏁 Wedstrijd voltooid, sterk gepacet!" : DONE[Math.floor(Math.random() * DONE.length)]);
    }
    closeDetail();
  });

  showView("detail");
}

function closeDetail() { renderAll(); showView("list"); }

function showView(name) {
  const list = $("listView"), detail = $("detailView"), back = $("backButton");
  if (name === "detail") {
    list.classList.add("hidden");
    detail.classList.remove("hidden");
    requestAnimationFrame(() => detail.classList.add("is-in"));
    back.classList.remove("hidden");
    window.scrollTo(0, 0);
  } else {
    detail.classList.remove("is-in");
    back.classList.add("hidden");
    setTimeout(() => {
      detail.classList.add("hidden");
      list.classList.remove("hidden");
      window.scrollTo(0, 0);
    }, 280);
  }
}

/* ----- Invliegende beelden -------------------------------------------- */
let io, initialRevealDone = false;
function observeReveals() {
  // Na de eerste keer: nieuw getekende blokken meteen tonen (geen her-animatie bij navigeren)
  if (initialRevealDone) {
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => el.classList.add("in"));
    return;
  }
  io = io || new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
}

/* ----- Toast ----------------------------------------------------------- */
let toastT;
function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ----- Confetti --------------------------------------------------------- */
function celebrate() {
  const cv = $("confetti");
  const ctx = cv.getContext("2d");
  cv.width = innerWidth; cv.height = innerHeight;
  const cs = getComputedStyle(document.documentElement);
  const colors = ["--volt", "--flame", "--pastel-blue", "--violet"]
    .map((v) => cs.getPropertyValue(v).trim()).filter(Boolean).concat("#ffffff");
  const parts = Array.from({ length: 140 }, () => ({
    x: innerWidth / 2, y: innerHeight / 3,
    vx: (Math.random() - 0.5) * 14, vy: Math.random() * -16 - 4,
    s: Math.random() * 7 + 4, c: colors[(Math.random() * colors.length) | 0],
    r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.4,
  }));
  let frame = 0;
  (function loop() {
    frame++;
    ctx.clearRect(0, 0, cv.width, cv.height);
    parts.forEach((p) => {
      p.vy += 0.45; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6);
      ctx.restore();
    });
    if (frame < 120) requestAnimationFrame(loop);
    else ctx.clearRect(0, 0, cv.width, cv.height);
  })();
}

/* ================================================================== *
 *  Init
 * ================================================================== */
/* Branding uit CONFIG zetten (zodat templaten makkelijk is) */
document.title = `${CONFIG.appName}, ${CONFIG.coachHandle}`;
if ($("appName")) $("appName").textContent = CONFIG.appName;
if ($("brandHandle")) $("brandHandle").textContent = CONFIG.coachHandle;
if ($("footCredit")) {
  $("footCredit").innerHTML =
    `<span class="catch">${CONFIG.catchphrase}</span>` +
    `Coaching door ${CONFIG.coachName} · TikTok <strong>${CONFIG.coachHandle}</strong> ${CONFIG.footEmoji || "🏃\u200d♀️"}`;
}

function setPlanningForm(open) {
  const form = $("planningForm");
  const toggle = $("togglePlanningForm");
  form.classList.toggle("hidden", !open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.textContent = open ? "× Sluiten" : "＋ Toevoegen";
  if (open && !$("planStart").value) $("planStart").value = isoDate(new Date());
}

$("togglePlanningForm").addEventListener("click", () => {
  setPlanningForm($("planningForm").classList.contains("hidden"));
});
$("cancelPlanning").addEventListener("click", () => setPlanningForm(false));
$("planningForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const start = $("planStart").value;
  const end = $("planEnd").value || start;
  if (end < start) {
    toast("De einddatum ligt vóór de startdatum");
    return;
  }
  const entry = {
    id: `plan-${Date.now()}`,
    type: $("planType").value,
    title: $("planTitle").value.trim(),
    start,
    end,
    note: $("planNote").value.trim(),
  };
  log.__planning = [...planningEntries(), entry];
  saveLog();
  $("planningForm").reset();
  setPlanningForm(false);
  renderAll();
  toast("Toegevoegd aan je schema 🗓️");
});

$("backButton").addEventListener("click", closeDetail);
$("resetButton").addEventListener("click", () => {
  if (confirm("Alle ingevulde voortgang wissen?")) { log = {}; saveLog(); renderAll(); toast("Voortgang gewist"); }
});

/* ----- Back-up: exporteren / importeren ------------------------------- */
function downloadJSON(filename, obj) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" }));
  a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function downloadText(filename, text, type) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function icsEscape(value) {
  return String(value || "")
    .replaceAll("\\", "\\\\")
    .replaceAll(/\r?\n/g, "\\n")
    .replaceAll(",", "\\,")
    .replaceAll(";", "\\;");
}

function icsDay(value) {
  const date = typeof value === "string" ? new Date(`${value}T12:00:00`) : value;
  return isoDate(date).replaceAll("-", "");
}

function addDays(value, amount) {
  const date = typeof value === "string" ? new Date(`${value}T12:00:00`) : new Date(value);
  date.setDate(date.getDate() + amount);
  return date;
}

function calendarFile() {
  const stamp = new Date().toISOString().replaceAll(/[-:]/g, "").replace(/\.\d{3}/, "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "PRODID:-//bartlopen//Run Coach//NL",
    `X-WR-CALNAME:${icsEscape(CONFIG.appName)} · ${icsEscape(RUNNER)}`,
  ];
  flatSessions.forEach((session) => {
    const date = sessionDate(session.week, session.day);
    const z = zoneByKey[session.zone];
    lines.push(
      "BEGIN:VEVENT",
      `UID:${sid(session.week, session.day)}-${icsDay(date)}@bartlopen.nl`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${icsDay(date)}`,
      `DTEND;VALUE=DATE:${icsDay(addDays(date, 1))}`,
      `SUMMARY:${icsEscape(`${CONFIG.footEmoji || "🏃\u200d♀️"} ${session.title}`)}`,
      `DESCRIPTION:${icsEscape(`${session[UNIT]} ${UNIT_LABEL} · ${z.name}\n${session.goal}\n\n${session.blocks.join("\n")}`)}`,
      "TRANSP:TRANSPARENT",
      "END:VEVENT",
    );
  });
  planningEntries().forEach((entry) => {
    const meta = PLANNING_META[entry.type] || PLANNING_META.rest;
    lines.push(
      "BEGIN:VEVENT",
      `UID:${icsEscape(entry.id)}@bartlopen.nl`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${icsDay(entry.start)}`,
      `DTEND;VALUE=DATE:${icsDay(addDays(entry.end || entry.start, 1))}`,
      `SUMMARY:${icsEscape(`${meta.icon} ${entry.title}`)}`,
      `DESCRIPTION:${icsEscape(`${entry.note ? `${entry.note}\n\n` : ""}Coachadvies: ${meta.advice}`)}`,
      "TRANSP:TRANSPARENT",
      "END:VEVENT",
    );
  });
  lines.push("END:VCALENDAR");
  return `${lines.join("\r\n")}\r\n`;
}
$("exportBtn").addEventListener("click", () => {
  downloadJSON(`${CONFIG.appName.replace(/\s+/g, "-")}-voortgang.json`, {
    app: "bartlopen-runcoach", storeKey: STORE_KEY, runner: RUNNER,
    exportedAt: new Date().toISOString(), log,
  });
  toast("Back-up opgeslagen ⬇︎");
});
$("importBtn").addEventListener("click", () => $("importFile").click());
$("importFile").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      const incoming = data && data.log ? data.log : data;
      if (!incoming || typeof incoming !== "object") throw new Error("ongeldig");
      log = { ...log, ...incoming };
      saveLog(); renderAll();
      toast("Back-up geladen ⬆︎, welkom terug!");
    } catch {
      toast("Kon dit bestand niet lezen");
    }
    e.target.value = "";
  };
  reader.readAsText(file);
});

$("calendarBtn").addEventListener("click", () => {
  downloadText(`${CONFIG.appName.replace(/\s+/g, "-")}-schema.ics`, calendarFile(), "text/calendar;charset=utf-8");
  toast("Agenda-bestand staat klaar 🗓️");
});

$("pdfBtn").addEventListener("click", () => {
  document.body.classList.add("print-schema");
  const cleanup = () => document.body.classList.remove("print-schema");
  window.addEventListener("afterprint", cleanup, { once: true });
  window.print();
  setTimeout(cleanup, 1500);
});

/* Alles tekenen */
renderAll();
/* Na de intro-animatie geen her-fade meer; failsafe die alles zeker toont */
setTimeout(() => { initialRevealDone = true; }, 900);
setTimeout(() => document.querySelectorAll(".reveal:not(.in)").forEach((el) => el.classList.add("in")), 1600);

/* Intro-splash netjes weg laten faden (tikken slaat 'm over) */
(function () {
  const splash = $("splash");
  if (!splash) return;
  const hide = () => splash.classList.add("gone");
  setTimeout(hide, 1100);
  splash.addEventListener("click", hide);
  setTimeout(() => splash.remove(), 1700);
})();

/* Service worker voor offline gebruik (alleen op http/https, niet via file://) */
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  /* Auto-verversen: nieuwe versie neemt over -> pagina herlaadt zichzelf een keer */
  const hadController = !!navigator.serviceWorker.controller;
  let autoReloaded = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hadController || autoReloaded) return;
    autoReloaded = true;
    window.location.reload();
  });
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

/* Vraag de browser om je voortgang echt te bewaren. Zonder dit mag een
   browser opgeslagen gegevens opruimen als er ruimte nodig is, en dan ben
   je je afgevinkte trainingen kwijt. */
if (navigator.storage && navigator.storage.persist) {
  navigator.storage.persisted()
    .then((al) => (al ? true : navigator.storage.persist()))
    .catch(() => {});
}
