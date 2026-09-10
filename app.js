/* ================================================================== *
 *  Nigel, Run Coach · halve marathon Antwerpen (zo 18 okt 2026)
 *  6 weken vanaf de herstart op ma 7 sep. Doel 1:55, gemiddeld 5:27/km.
 *  Loopdagen ma / wo / za, race op zondag. Achilles- en kuit-bewust,
 *  naast 2x krachttraining en de mountainbike als uitwijk bij klachten.
 * ================================================================== */

const CONFIG = {
  unit:       "km",
  zonePaceSuffix: "/km",
  footEmoji:  "🏃",
  mottos: [
    "Op naar Antwerpen, maatje!",
    "Lekker herstart, maatje!",
    "Je bouwt 'm mooi terug, maatje.",
    "Halverwege, sterk volgehouden! ⚡",
    "Bijna wedstrijdklaar, maatje!",
    "Halve-finisher! Wat een race, maatje! 🏅",
  ],
  appName:    "Op naar de halve",
  runner:     "Nigel",
  goal:       "De halve van Antwerpen in 1u55",
  startDate:  new Date(2026, 8, 7),
  storeKey:   "nigel-antwerpen.log.v1",
  coachName:  "Coach Bart",
  coachHandle:"@bartlopen",
  coachPhoto: "coach.jpg",
  athleteWord:"maatje",
  catchphrase:"Op naar Antwerpen, maatje!",
};

const RUNNER = CONFIG.runner;
const GOAL = CONFIG.goal;
const START_DATE = CONFIG.startDate;
const STORE_KEY = CONFIG.storeKey;
const TOTAL_WEEKS = 6;
const UNIT = CONFIG.unit === "min" ? "min" : "km";
const UNIT_LABEL = UNIT;
const ZONE_SUFFIX = CONFIG.zonePaceSuffix ?? "/km";
const COACH_INITIAL = (CONFIG.coachName.replace(/^coach\s+/i, "")[0] || "C").toUpperCase();

const ZONES = [
  { key: "herstel",  name: "Herstelloop",     pace: "6:20–6:55", info: "RPE 2-3 · bewust heel rustig" },
  { key: "duur",     name: "Rustige duur",    pace: "6:05–6:40", info: "RPE 3-4 · praten kan makkelijk" },
  { key: "lang",     name: "Lange duurloop",  pace: "6:05–6:35", info: "RPE 3-4 · tijd op de benen" },
  { key: "doel",     name: "HM-tempo",        pace: "5:27–5:30", info: "RPE 6-7 · jouw racetempo voor 1:55" },
  { key: "tempo",    name: "Vlot / drempel",  pace: "5:15–5:25", info: "RPE 7 · stevig, comfortabel zwaar" },
  { key: "interval", name: "Interval",        pace: "5:15–5:20", info: "RPE 7-8 · kort en scherp, ruim herstel" },
];
const zoneByKey = Object.fromEntries(ZONES.map((z) => [z.key, z]));

const COACH = {
  herstel: [
    "Vandaag echt rustig, maatje. Hier herstelt je kuit van.",
    "Makkelijk moet makkelijk zijn. Niet stoerder doen dan nodig.",
    "Rustdag-stijl. Zo sta je zaterdag weer fris aan de start.",
    "Slim getraind is half gewonnen, maatje.",
  ],
  duur: [
    "Rustige kilometers, maatje. Precies wat je na de herstart nodig hebt.",
    "Praattempo. Kun je geen hele zin uitspreken, dan loop je te hard.",
    "Saai maar goud waard. Hier bouw je je basis mee terug.",
    "Ontspannen schouders, rustige adem. Jij doet dit gewoon.",
  ],
  lang: [
    "De belangrijkste training van je week, maatje. Rustig starten.",
    "Verdeel je krachten. De laatste kilometers moeten nog kunnen.",
    "Tijd op de benen is precies wat je richting Antwerpen nodig hebt.",
    "Zeurt je achillespees? Dan stoppen we, en volgende keer de mountainbike.",
  ],
  doel: [
    "Racetempo, maatje. Dit ritme wil je op 18 oktober 21 km lang vasthouden.",
    "Gecontroleerd betekent: aan het eind van het blok kun je nog door.",
    "Voel goed hoe 5:27 aanvoelt. Straks moet je het op gevoel kunnen lopen.",
    "Niet sneller dan afgesproken. Beheersing is hier de training.",
  ],
  tempo: [
    "Vlot maar beheerst, maatje. Niet alles geven.",
    "Tussen de blokken echt rustig joggen. Dat hoort erbij.",
    "Dit maakt je racetempo straks een stuk makkelijker.",
    "Voelt je kuit gek? Dan kappen we het vlotte deel. Altijd.",
  ],
  interval: [
    "Kort en scherp, maatje. Ruim herstel ertussen.",
    "Dit is je laatste snelle prikkel. Daarna alleen nog afbouwen.",
    "Snel maar ontspannen, nooit sprinten met jouw kuit.",
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
  "🧡 Weer een stap richting Antwerpen.",
];

const WHY = {
  herstel:  "Heel rustig lopen houdt je los en laat het bloed stromen zonder nieuwe belasting. Juist op deze dagen herstelt je achillespees en komt de winst van je zwaardere trainingen binnen.",
  duur:     "Rustige duurlopen op praattempo bouwen je aerobe motor terug na de pauze. Het grootste deel van je week hoort rustig te zijn, juist omdat de rest scherp is.",
  lang:     "De lange duurloop is jouw belangrijkste training richting Antwerpen. Je bouwt uithoudingsvermogen op en je hoofd leert dat lange afstanden normaal zijn.",
  doel:     "Op 5:27 lopen leert je gevoel precies wat je racetempo is. Op 18 oktober wil je dat ritme kunnen lopen zonder op je horloge te kijken, en dat oefen je hier.",
  tempo:    "Vlotte blokken verhogen de snelheid waarbij je nog in balans blijft. Als je drempel stijgt, voelt 5:27 op den duur een stuk makkelijker aan.",
  interval: "Korte scherpe kilometers houden je benen snel zonder je te slopen. We doen ze kort en met ruim herstel, want jouw achillespees gaat vóór snelheid.",
};

const ma = (o) => ({ day: "ma", dayLabel: "Maandag",  kind: "Herstelloop",      ...o });
const wo = (o) => ({ day: "wo", dayLabel: "Woensdag", kind: "Kwaliteit",        ...o });
const za = (o) => ({ day: "za", dayLabel: "Zaterdag", kind: "Lange duurloop",   ...o });
const zo = (o) => ({ day: "zo", dayLabel: "Zondag",   kind: "Doelrace",         ...o });

const PLAN = [
  { week: 1, dates: "7–13 sep", phase: "Fase 1 · Herstart en ritme", sessions: [
    ma({ zone: "duur", km: 5, kind: "Herstart", title: "Herstart: 5 km", goal: "Gedaan op 7 september in 30:00 (6:00/km)", blocks: [
      "5 km rustig",
      "Gelopen in 30:00, dat is 6:00 per km",
      "Mooi startpunt: hier bouwen we vanaf",
    ] }),
    wo({ zone: "tempo", km: 5, kind: "Korte intensieve training", title: "3x 4 min vlot", goal: "Eerste prikkel na de herstart", blocks: [
      "1 km rustig inlopen",
      "3x 4 min vlot op 5:15–5:25/km",
      "Tussen de blokken rustig herstellen",
      "Rustig uitlopen tot 5 km",
      "Voelt je achillespees gek? Dan stoppen we het vlotte deel",
    ] }),
    za({ zone: "duur", km: 7, kind: "Duurloop", title: "7 km rustig", goal: "Rustig kilometers maken", blocks: [
      "7 km op 6:10–6:40/km",
      "Praattempo, dit hoort makkelijk te voelen",
      "Uitlopen en je kuitoefeningen",
    ] }),
  ]},
  { week: 2, dates: "14–20 sep", phase: "Fase 2 · Scherper en langer", sessions: [
    ma({ zone: "herstel", km: 5, kind: "Herstelloop", title: "4 tot 5 km herstel", goal: "Losmaken na zaterdag", blocks: [
      "4 tot 5 km zeer rustig op 6:20–6:50/km",
      "Bewust makkelijk, hier herstelt je kuit van",
    ] }),
    wo({ zone: "doel", km: 6, kind: "Tempoloop", title: "2x 8 min op HM-tempo", goal: "Wennen aan je racetempo", blocks: [
      "1 km rustig inlopen",
      "2x 8 min rond 5:27–5:30/km",
      "3 min rustig joggen tussen de blokken",
      "Rustig uitlopen tot 6 km",
      "Dit is het tempo dat je op 18 oktober 21 km lang wilt volhouden",
    ] }),
    za({ zone: "lang", km: 9, kind: "Duurloop", title: "9 km rustig", goal: "Afstand rustig uitbreiden", blocks: [
      "9 km op 6:10–6:35/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee als het warm is",
    ] }),
  ]},
  { week: 3, dates: "21–27 sep", phase: "Fase 2 · Scherper en langer", sessions: [
    ma({ zone: "herstel", km: 5, kind: "Herstelloop", title: "5 km herstel", goal: "Benen los houden", blocks: [
      "5 km rustig op 6:20–6:50/km",
      "Niets forceren, dit is een cadeautje aan je benen",
    ] }),
    wo({ zone: "tempo", km: 7, kind: "Interval", title: "4x 5 min vlot", goal: "Je scherpste training van dit blok", blocks: [
      "1,5 km rustig inlopen",
      "4x 5 min op 5:15–5:25/km",
      "2 tot 3 min rustig herstel tussen de blokken",
      "Rustig uitlopen tot 7 km",
      "Bij twijfel in je achillespees: blok minderen of overslaan",
    ] }),
    za({ zone: "lang", km: 12, kind: "Duurloop", title: "12 km rustig", goal: "Grootste stap in afstand tot nu toe", blocks: [
      "12 km op 6:05–6:30/km",
      "Rustig starten, de laatste kilometers moeten nog kunnen",
      "Neem drinken mee, je bent ruim een uur onderweg",
    ] }),
  ]},
  { week: 4, dates: "28 sep–4 okt", phase: "Fase 2 · Scherper en langer", sessions: [
    ma({ zone: "herstel", km: 5, kind: "Herstelloop", title: "5 km zeer ontspannen", goal: "Bijkomen van je 12 km", blocks: [
      "5 km zeer ontspannen op 6:20–6:50/km",
      "Traag mag, dat is precies de bedoeling",
    ] }),
    wo({ zone: "doel", km: 7, kind: "HM-tempo", title: "3x 8 min op HM-tempo", goal: "Racetempo vertrouwd maken", blocks: [
      "1 km rustig inlopen",
      "3x 8 min rond 5:27/km, gecontroleerd",
      "3 min rustig joggen tussen de blokken",
      "Rustig uitlopen tot 7 km",
      "Gecontroleerd betekent: je kunt aan het eind van elk blok nog door",
    ] }),
    za({ zone: "lang", km: 14, kind: "Lange duurloop", title: "14 km met vlotte staart", goal: "Leren doorlopen als je moe wordt", blocks: [
      "14 km rustig op 6:05–6:35/km",
      "Laatste 2 tot 3 km eventueel richting 5:30–5:40/km",
      "Alleen versnellen als het echt goed voelt",
      "Drinken meenemen, en oefen je gel als je die op de race wilt",
    ] }),
  ]},
  { week: 5, dates: "5–11 okt", phase: "Fase 3 · Taper en racedag", sessions: [
    ma({ zone: "herstel", km: 5, kind: "Herstelloop", title: "5 km heel ontspannen", goal: "Sparen voor zaterdag", blocks: [
      "5 km heel ontspannen op 6:20–6:50/km",
      "Deze week draait om je langste duurloop",
    ] }),
    wo({ zone: "interval", km: 6, kind: "Laatste prikkel", title: "3x 1 km", goal: "Nog één keer scherp, daarna afbouwen", blocks: [
      "1,5 km rustig inlopen",
      "3x 1 km op 5:15–5:20/km",
      "Ruim herstel tussen de kilometers",
      "Rustig uitlopen tot 6 km",
      "Dit is je laatste snelle training voor de race",
    ] }),
    za({ zone: "lang", km: 16, kind: "Mijlpaal", title: "🎉 Langste duurloop: 16 km", goal: "De generale voor Antwerpen", blocks: [
      "16 km rustig op 6:05–6:35/km",
      "Laatste 3 km richting 5:30/km als je fris bent",
      "Kleed je aan zoals op de racedag, dan weet je wat werkt",
      "Oefen je drinken en eten precies zoals je het op 18 oktober wilt doen",
    ] }),
  ]},
  { week: 6, dates: "12–18 okt", phase: "Fase 3 · Taper en racedag", taper: true, race: true, raceLabel: "🏅 Doelrace · halve marathon", sessions: [
    ma({ zone: "herstel", km: 4, kind: "Herstelloop", title: "4 km super rustig", goal: "Taper: vanaf nu spaar je energie", blocks: [
      "4 km super rustig op 6:25–6:55/km",
      "Minder is deze week echt meer",
    ] }),
    wo({ zone: "duur", km: 5, kind: "Losmaaktraining", title: "4 tot 5 km losmaken", goal: "Scherp maar uitgerust naar zondag", blocks: [
      "4 tot 5 km rustig",
      "3x 2 min vlot, verder gewoon rustig",
      "Niet vermoeiend: je moet er frisser uitkomen dan je erin ging",
      "Daarna twee dagen rust, dat is onderdeel van je training",
    ] }),
    zo({ zone: "doel", km: 21.1, kind: "Doelrace", title: "🏁 Halve marathon Antwerpen", goal: "Doel 1:55, gemiddeld 5:27/km", blocks: [
      "Eet 2 tot 3 uur vooraf iets vertrouwds, niets nieuws",
      "Draag de schoenen en kleding waarin je getraind hebt",
      "Eerste 3 km op 5:30 tot 5:35/km. Dat voelt te makkelijk, en dat hoort",
      "Daarna gelijkmatig op 5:27/km, dat is 1:55 over de streep",
      "Km 15 tot 18 zijn het zwaarst. Daarna weet je: nog maar een kwartier",
      "Voelt 1:55 halverwege te scherp? Laat los en maak er een sterke finish van",
      "Geniet ervan, maatje. Je hebt dit verdiend 🧡",
    ] }),
  ]},
];

const INFO = [
  { icon: "🎯", title: "Het doel: Antwerpen in 1u55", items: [
    "Zondag 18 oktober 2026, halve marathon van Antwerpen. Doel 1:55, dat is gemiddeld 5:27 per km.",
    "Je herstartte op 7 september met 5 km in 30:00. Vanaf daar heb je zes weken.",
    "Je langste training is 16 km op zaterdag 10 oktober. Dat is genoeg: de laatste 5 km doet de wedstrijddag.",
    "Eerlijk erbij: zes weken is kort voor deze tijd. Loopt het niet, laat 1:55 dan los en maak er een sterke finish van.",
    "Finishen is de basis, de tijd is de bonus.",
  ]},
  { icon: "⏱️", title: "Racetempo 5:27, zo verdeel je het", items: [
    "1:55 over 21,1 km is 5:27 per km. Eén seconde per km scheelt al 21 seconden op de finish.",
    "Start op 5:30 tot 5:35. Dat voelt te makkelijk, en precies daarom werkt het.",
    "Kom je halverwege door op 57 tot 58 minuten, dan zit je goed.",
    "Te hard starten kost je op de tweede helft veel meer dan het je oplevert.",
    "Je oefent dit tempo op 16 en 30 september en in je lange lopen. Leer het op gevoel herkennen.",
  ]},
  { icon: "🦶", title: "Je achillespees en kuit, houd 'm sterk", items: [
    "Excentrische kuitheffingen: 3 series van 12, rustig omhoog en heel langzaam zakken. 2x per week.",
    "Doe ze op je loopdagen ná het lopen, niet ervoor.",
    "Wat stijfheid de ochtend na een lange loop is normaal. Scherpe of stekende pijn niet.",
    "Twee trainingen op rij gevoelig? Sla het snelle werk over en loop alleen rustig.",
    "Dit blok is kort en pittig, dus let hier scherper op dan anders.",
  ]},
  { icon: "🚵", title: "Bij klachten: ruil in voor de mountainbike", items: [
    "Zeurt je achillespees of kuit? Ruil de training in voor een stevige MTB-rit.",
    "Reken ongeveer twee keer de looptijd: een loop van 45 min wordt zo'n 90 min fietsen.",
    "Vervang bij voorkeur de woensdagtraining, niet je lange loop op zaterdag.",
    "Je conditie blijft er prima mee op peil en je pees krijgt rust. Dat is winst, geen verlies.",
    "Doe dit liever één keer te vroeg dan één keer te laat, zeker in zo'n kort blok.",
  ]},
  { icon: "🏋️", title: "2x krachttraining bij Basic Fit", items: [
    "Blijf dat doen, het maakt je blessurebestendiger.",
    "Plan zware benen niet de dag vóór je lange loop op zaterdag. Dinsdag of donderdag is beter.",
    "Squats, lunges, kuitwerk en romp hebben het meeste effect op je lopen.",
    "In de laatste week (12 t/m 18 oktober) bouw je ook je kracht af.",
  ]},
  { icon: "🥤", title: "Voeding en drinken", items: [
    "Vanaf 12 km wordt drinken belangrijk. Neem wat mee en drink met kleine slokken.",
    "Vanaf ongeveer 75 minuten ook iets eetbaars: een gel, dadels of sportdrank.",
    "Oefen dat op 3 en 10 oktober, dan weet je op de racedag precies wat werkt.",
    "Op 18 oktober niets nieuws proberen. Alleen wat je al kent.",
    "Eet na een lange loop binnen een uur iets met koolhydraten en eiwit.",
  ]},
  { icon: "🏁", title: "Taper en racedag in Antwerpen", items: [
    "De laatste week is expres licht. Minder is nu echt meer, ook al voelt het gek.",
    "Woensdag 14 oktober je laatste losmaaktraining, daarna twee dagen rust.",
    "Eet 2 tot 3 uur vooraf iets vertrouwds. Ruim op tijd bij de start, dan blijft het ontspannen.",
    "Warm rustig in: 10 minuten joggen plus een paar korte versnellingen.",
    "Kilometer 15 tot 18 zijn mentaal het zwaarst. Daarna weet je: nog maar een kwartier.",
    "Geniet van de sfeer. Je bent er drie weken uit geweest en staat er straks gewoon.",
  ]},
  { icon: "😴", title: "Rust en geduld", items: [
    "Slaap is je goedkoopste winst. Zeven tot negen uur maakt een groot verschil.",
    "Een dag spierpijn is normaal. Drie dagen moeheid betekent te veel of te snel.",
    "Dit blok is kort, dus een training missen weegt zwaarder. Missen mag, inhalen niet.",
    "Verhoogde rusthartslag of slecht slapen? Dat zijn signalen, geen zwakte.",
    "Twijfel je over een klacht? Stuur Coach Bart een bericht, dan passen we het aan.",
  ]},
];

const BADGES = [
  { id: "first",   icon: "👟", name: "Herstart",        desc: "1 training afgevinkt",   test: (s) => s.done >= 1 },
  { id: "week",    icon: "✅", name: "Week compleet",   desc: "Een hele week afgerond", test: (s) => s.fullWeeks >= 1 },
  { id: "streak",  icon: "🔥", name: "Twee weken vol",  desc: "Reeks van 6 trainingen", test: (s) => s.streak >= 6 },
  { id: "tien",    icon: "🔟", name: "Dubbele cijfers", desc: "10 km in één training",  test: (s) => s.maxDist >= 10 },
  { id: "hmtempo", icon: "⏱️", name: "Op racetempo",    desc: "Tempo onder 5:30/km",    test: (s) => s.bestPace > 0 && s.bestPace <= 330 },
  { id: "half",    icon: "⚡", name: "Halverwege",      desc: "50% van je schema",      test: (s) => s.done >= s.total / 2 },
  { id: "veertien",icon: "🧭", name: "Veertien",        desc: "14 km in één training",  test: (s) => s.maxDist >= 14 },
  { id: "generale",icon: "🏔️", name: "Generale",        desc: "16 km in één training",  test: (s) => s.maxDist >= 16 },
  { id: "honderd", icon: "💯", name: "Honderd km",      desc: "100 km totaal gelopen",  test: (s) => s.km >= 100 },
  { id: "finish",  icon: "🏅", name: "Halve-finisher",  desc: "Antwerpen uitgelopen",   test: (s) => s.raceDone },
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
  const rw = PLAN.find((w) => w.race || w.finish) || PLAN.find((w) => w.tuneup) ||
    PLAN[PLAN.length - 1];
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
      toast(w.finish ? "🏁 17 km gelopen! Wat een opbouw, maatje!" : w.race ? "🏅 Finisher in Antwerpen! Wat een race, maatje!" : w.tuneup ? "🏁 Wedstrijd voltooid, sterk gepacet!" : DONE[Math.floor(Math.random() * DONE.length)]);
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
