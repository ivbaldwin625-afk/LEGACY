const app = document.getElementById("app"),

  nav = document.getElementById("navlinks"),

  menu = document.getElementById("menu");



menu.onclick = () => nav.classList.toggle("open");



const FALLBACK_PLAYER = "assets/player-placeholder.svg";

const FALLBACK_TEAM = "assets/team-placeholder.svg";



const logo = (t) => `https://a.espncdn.com/i/teamlogos/nba/500/${t.abbr}.png`;

const head = (id) =>

  id

    ? `https://a.espncdn.com/i/headshots/nba/players/full/${id}.png`

    : FALLBACK_PLAYER;



const ESPN_PROXY = "https://api.allorigins.win/raw?url=";



async function fetchJSON(url) {

  try {

    const r = await fetch(url);

    if (!r.ok) throw new Error("direct");

    return await r.json();

  } catch (e) {

    const r = await fetch(ESPN_PROXY + encodeURIComponent(url));

    if (!r.ok) throw new Error("proxy");

    return await r.json();

  }

}



const nbaHead = (id) =>

  id

    ? `https://cdn.nba.com/headshots/nba/latest/260x190/${id}.png`

    : FALLBACK_PLAYER;

const espnHead = (id) => head(id);

const playerPhoto = (id, extra = "") => extra || head(id);

const rookiePhoto = (t) => (t.rookieId ? head(t.rookieId) : FALLBACK_PLAYER);



const imgFallback = (el, fallback) => {

  if (el.dataset.fallback === "1") return;

  el.dataset.fallback = "1";

  el.src = fallback;

};



function teamCard(t) {

  return `<a class="team-card" style="--team:${t.color};--accent:${t.accent}" href="#team/${t.id}">

    <img class="team-logo" src="${logo(t)}" alt="${t.name} logo" loading="lazy" onerror="imgFallback(this,FALLBACK_TEAM)">

    <h3>${t.name}</h3>

    <small><i class="dot"></i>${t.division} · ${t.titles} title${t.titles === 1 ? "" : "s"}</small>

  </a>`;

}



function home() {

  return `<section class="hero">

<div><span class="eyebrow">The NBA, beyond the box score</span>

<h1>THE<br><em>LEGACY</em></h1>

<p>A fan-made encyclopedia of all 30 NBA franchises — their colors, icons, champions, rookies and the players who shaped them.</p>

<a class="cta" href="#teams">Explore all 30 teams →</a></div>

<div class="hero-orbit"><div class="hero-ball">🏀</div></div>

</section>



<section class="section">

<div class="section-head"><div><span class="eyebrow">NBA at a glance</span><h2>The league in numbers</h2></div><span class="muted">A quick history & structure</span></div>



<div class="stat-strip home-stats">

<div class="stat"><b>1946</b><span>BAA founded</span></div>

<div class="stat"><b>1949</b><span>NBA formed</span></div>

<div class="stat"><b>30</b><span>Teams</span></div>

<div class="stat"><b>82</b><span>Games per team</span></div>

<div class="stat"><b>1976</b><span>ABA merger</span></div>

</div>



<div class="cards nba-overview">

<article class="info-card"><span class="eyebrow">Where it started</span><h3>BAA → NBA</h3><p class="muted">The league began as the Basketball Association of America (BAA) in 1946. In 1949, the BAA merged with the National Basketball League (NBL), creating the National Basketball Association. The NBA later adopted BAA history and statistics.</p></article>

<article class="info-card"><span class="eyebrow">A major expansion</span><h3>The ABA merger</h3><p class="muted">In 1976, the NBA absorbed four ABA franchises: the San Antonio Spurs, Denver Nuggets, Indiana Pacers and New York Nets (now Brooklyn Nets), helping grow the league to 22 teams.</p></article>

<article class="info-card"><span class="eyebrow">How a season works</span><h3>82 games → Playoffs → Finals</h3><p class="muted">Each team plays 82 regular-season games from October through April. The playoffs follow, leading to the NBA Finals and the championship in June.</p></article>

</div>

</section>



<section class="section history-home">

<div class="section-head"><div><span class="eyebrow">The eras that shaped the league</span><h2>NBA history — the short version</h2></div></div>

<div class="timeline">

<article class="timeline-item"><span>1946–1956</span><div><h3>The foundation</h3><p class="muted">The BAA launches, merges with the NBL, and the early NBA establishes the shot clock and its first dynasty around George Mikan and the Minneapolis Lakers.</p></div></article>

<article class="timeline-item"><span>1956–1979</span><div><h3>Celtics, Russell & the ABA</h3><p class="muted">Bill Russell and Boston dominate the 1960s, Wilt Chamberlain changes the record book, Kareem becomes a superstar, and the NBA eventually absorbs four ABA teams.</p></div></article>

<article class="timeline-item"><span>1979–1998</span><div><h3>Bird, Magic & Jordan</h3><p class="muted">The three-point line arrives in 1979. Larry Bird and Magic Johnson revive the league's popularity, followed by Michael Jordan and the Bulls' two three-peats.</p></div></article>

<article class="timeline-item"><span>1998–2014</span><div><h3>Lakers & Spurs</h3><p class="muted">Kobe Bryant leads the Lakers to five championships while Tim Duncan anchors the Spurs' five-title run. The NBA also expands further into Canada and grows globally.</p></div></article>

<article class="timeline-item"><span>2014–2022</span><div><h3>The Warriors era</h3><p class="muted">Stephen Curry and Golden State transform modern offense with elite three-point shooting and win four championships across the era.</p></div></article>

<article class="timeline-item"><span>2023–present</span><div><h3>A new generation</h3><p class="muted">The league enters a more competitive era, with a new wave of stars and franchises fighting for the next chapter of NBA history.</p></div></article>

</div>

</section>



<section class="section">

<div class="section-head"><div><span class="eyebrow">30 franchises</span><h2>Teams by conference</h2></div></div>

${conference("Eastern Conference", "East")}

${conference("Western Conference", "West")}

</section>`;

}



function conference(title, conf) {

  return `<div class="conference">

    <div class="conf-title"><span></span><h3>${title}</h3></div>

    <div class="team-grid">${TEAMS.filter((t) => t.conf === conf)

      .map(teamCard)

      .join("")}</div>

  </div>`;

}



function teams() {

  return `<section class="page-hero teams-shell">

<span class="eyebrow">The franchises · 30 teams</span>

<h1>THE DIRECTORY</h1>

<p class="muted">Browse every NBA franchise by conference and division. Each card inherits the team identity and opens a dedicated team profile.</p>

<div class="teams-toolbar">

<div class="team-filters" id="conferenceFilters">

<button class="filter-btn active" data-filter="all">All Teams</button>

<button class="filter-btn" data-filter="East">Eastern Conference</button>

<button class="filter-btn" data-filter="West">Western Conference</button>

</div>

<input class="search" id="teamSearch" placeholder="Search a team, city or division...">

</div>

</section>

<section class="section teams-shell" id="teamDirectory"></section>`;

}



function renderDirectory(filter = "all", query = "") {

  const root = document.getElementById("teamDirectory");

  if (!root) return;



  const q = query.trim().toLowerCase();



  const visible = TEAMS.filter(

    (t) =>

      (filter === "all" || t.conf === filter) &&

      (!q ||

        `${t.name} ${t.city} ${t.division} ${t.abbr}`

          .toLowerCase()

          .includes(q)),

  );



  if (!visible.length) {

    root.innerHTML = `<div class="teams-empty"><b>No team found.</b><br>Try another search.</div>`;

    return;

  }



  const groups = [

    "Atlantic",

    "Central",

    "Southeast",

    "Northwest",

    "Pacific",

    "Southwest",

  ];



  root.innerHTML = `<div class="directory">${groups

    .map((div) => {

      const items = visible.filter((t) => t.division === div);

      if (!items.length) return "";



      const conf = items[0].conf;



      return `<section class="division-block" data-conf="${conf}">

      <div class="division-head"><div><span class="eyebrow">${conf} Conference</span><h3>${div}</h3></div><span class="division-count">${items.length} teams</span></div>

      <div class="pro-team-grid">${items.map(proTeamCard).join("")}</div>

    </section>`;

    })

    .join("")}</div>`;

}



function proTeamCard(t) {

  return `<a class="pro-team-card" style="--team:${t.color};--accent:${t.accent}" href="#team/${t.id}">

<div class="pro-team-top"><img class="pro-logo" src="${logo(t)}" alt="${t.name} logo"><span class="team-code">${t.abbr.toUpperCase()}</span></div>

<div class="pro-team-bottom"><h4>${t.name}</h4><div class="pro-team-meta"><i class="color-line"></i>${t.city} · ${t.titles} title${t.titles === 1 ? "" : "s"}</div></div>

</a>`;

}



const ESPN_IDS = {

  hawks: "atl",

  celtics: "bos",

  nets: "bkn",

  hornets: "cha",

  bulls: "chi",

  cavaliers: "cle",

  pistons: "det",

  pacers: "ind",

  heat: "mia",

  bucks: "mil",

  knicks: "ny",

  magic: "orl",

  sixers: "phi",

  raptors: "tor",

  wizards: "wsh",

  nuggets: "den",

  timberwolves: "min",

  thunder: "okc",

  blazers: "por",

  jazz: "utah",

  warriors: "gs",

  clippers: "lac",

  lakers: "lal",

  suns: "phx",

  kings: "sac",

  mavericks: "dal",

  rockets: "hou",

  grizzlies: "mem",

  pelicans: "no",

  spurs: "sa",

};



function rosterMarkup(t) {

  return `<div class="roster-panel">

<div class="section-head"><div><span class="eyebrow">Full roster</span><h2>Every player · live stats</h2></div><span class="muted">PPG · RPG · APG · MIN · FG%</span></div>

<div id="roster-${t.id}" class="roster-grid"><div class="roster-loading"><span class="loader"></span> Loading the full roster…</div></div>

</div>`;

}



function teamPage(id) {

  const t = TEAMS.find((x) => x.id === id);

  if (!t) return notFound();



  const sameConf = TEAMS.filter(

    (x) => x.conf === t.conf && x.id !== t.id,

  ).slice(0, 4);



  const titleText =

    t.titles > 0

      ? `${t.titles} NBA championship${t.titles === 1 ? "" : "s"} in franchise history.`

      : "The franchise is still chasing its first NBA championship.";



  return `

<section class="team-hero" style="--team:${t.color};--accent:${t.accent}">



  <div class="team-brand">

    <img

      src="${logo(t)}"

      alt="${t.name} logo"

      loading="lazy"

      onerror="imgFallback(this,FALLBACK_TEAM)"

    >



    <div>

      <span class="eyebrow">

        ${t.conf}ERN CONFERENCE · ${t.division.toUpperCase()}

      </span>



      <h1>${t.name}</h1>



      <span class="pill">

        EST. ${t.founded} ·

        ${t.titles} CHAMPIONSHIP${t.titles === 1 ? "" : "S"}

      </span>

    </div>

  </div>



</section>



<section class="section">



  <!-- FRANCHISE OVERVIEW -->

  <div class="section-head">

    <div>

      <span class="eyebrow">Franchise profile</span>

      <h2>${t.name}</h2>

    </div>



    <span class="muted">

      ${t.city} · ${t.conf}ern Conference

    </span>

  </div>



  <div class="stat-strip">



    <div class="stat">

      <b>${t.founded}</b>

      <span>Founded</span>

    </div>



    <div class="stat">

      <b>${t.titles}</b>

      <span>Championships</span>

    </div>



    <div class="stat">

      <b>${t.conf}</b>

      <span>Conference</span>

    </div>



    <div class="stat">

      <b>${t.division}</b>

      <span>Division</span>

    </div>



  </div>



  <!-- FRANCHISE INFO -->

  <div class="cards" style="margin-top:35px">



    <article class="info-card">

      <span class="eyebrow">Franchise</span>

      <h3>${t.name}</h3>

      <p class="muted">

        ${t.name} represents ${t.city} in the NBA.

        The franchise was established in ${t.founded}.

      </p>

    </article>



    <article class="info-card">

      <span class="eyebrow">Championship record</span>

      <h3>

        ${t.titles} Title${t.titles === 1 ? "" : "s"}

      </h3>

      <p class="muted">

        ${titleText}

      </p>

    </article>



    <article class="info-card">

      <span class="eyebrow">Conference</span>

      <h3>${t.conf}ern</h3>

      <p class="muted">

        Division: ${t.division}. The team competes

        throughout the regular NBA season and postseason.

      </p>

    </article>



  </div>



  <!-- FACES OF THE FRANCHISE -->

  <div class="section-head" style="margin-top:70px">



    <div>

      <span class="eyebrow">Franchise spotlight</span>

      <h2>The faces of ${t.city}</h2>

    </div>



    <span class="muted">

      Past · Present · Future

    </span>



  </div>



  <div class="player-grid">



    ${player("01 · Current centerpiece", t.current, t.currentId, t)}



    ${player("02 · Rookie / young talent", t.rookie, t.rookieId, t, true)}



    ${player("03 · Franchise legend", t.greatest, t.greatestId, t)}



  </div>



  <!-- FULL ROSTER -->

  ${rosterMarkup(t)}



  <!-- TEAM HISTORY -->

  <div style="margin-top:70px">



    <div class="section-head">



      <div>

        <span class="eyebrow">Franchise history</span>

        <h2>The story of ${t.name}</h2>

      </div>



    </div>



    <div class="cards">



      <article class="info-card">

        <span class="eyebrow">Origins</span>

        <h3>Established ${t.founded}</h3>



        <p class="muted">

          The franchise has been part of the NBA landscape

          since ${t.founded}, building its identity around

          ${t.city} and its basketball culture.

        </p>

      </article>



      <article class="info-card">

        <span class="eyebrow">Legacy</span>

        <h3>${t.titles} Championship${t.titles === 1 ? "" : "s"}</h3>



        <p class="muted">

          ${titleText}

        </p>

      </article>



      <article class="info-card">

        <span class="eyebrow">Today</span>

        <h3>${t.current}</h3>



        <p class="muted">

          The current era of ${t.name} is represented by

          ${t.current}, with young talent and franchise

          history shaping what comes next.

        </p>

      </article>



    </div>



  </div>



  <!-- QUICK FACTS -->

  <div style="margin-top:70px">



    <div class="section-head">



      <div>

        <span class="eyebrow">Quick facts</span>

        <h2>${t.name} at a glance</h2>

      </div>



    </div>



    <div class="stat-strip">



      <div class="stat">

        <b>${t.city}</b>

        <span>City</span>

      </div>



      <div class="stat">

        <b>${t.division}</b>

        <span>Division</span>

      </div>



      <div class="stat">

        <b>${t.conf}ern</b>

        <span>Conference</span>

      </div>



      <div class="stat">

        <b>${t.founded}</b>

        <span>Franchise since</span>

      </div>



    </div>



  </div>



  <!-- AROUND CONFERENCE -->

  <div style="margin-top:70px">



    <div class="section-head">



      <div>

        <span class="eyebrow">Around the conference</span>

        <h2>More from ${t.conf}ern</h2>

      </div>



    </div>



    <div class="team-grid">

      ${sameConf.map(teamCard).join("")}

    </div>



  </div>



</section>`;

}



function player(label, name, id, t, rookie = false) {

  return `<article class="player"><a href="#player/${id || ""}" class="player-link">

<img src="${rookie ? rookiePhoto(t) : head(id)}" alt="${name}" loading="lazy" onerror="imgFallback(this,FALLBACK_PLAYER)">

<div class="player-info"><small>${label}</small><h3>${name}</h3></div>

</a></article>`;

}



const LEGENDS = [

  [

    "Michael Jordan",

    "Chicago Bulls",

    "893",

    "G",

    "30.1",

    "6.2",

    "5.3",

    "6× Champion",

  ],

  [

    "LeBron James",

    "Cleveland Cavaliers",

    "2544",

    "F",

    "27.0",

    "7.5",

    "7.4",

    "4× Champion",

  ],

  [

    "Kobe Bryant",

    "Los Angeles Lakers",

    "9772",

    "G",

    "25.0",

    "5.2",

    "4.7",

    "5× Champion",

  ],

  [

    "Bill Russell",

    "Boston Celtics",

    "78497",

    "C",

    "15.1",

    "22.5",

    "4.3",

    "11× Champion",

  ],

  [

    "Tim Duncan",

    "San Antonio Spurs",

    "1495",

    "F",

    "19.0",

    "10.8",

    "3.0",

    "5× Champion",

  ],

  [

    "Shaquille O'Neal",

    "Orlando Magic",

    "1211",

    "C",

    "23.7",

    "10.9",

    "2.5",

    "4× Champion",

  ],

  [

    "Stephen Curry",

    "Golden State Warriors",

    "201939",

    "G",

    "24.8",

    "4.7",

    "6.4",

    "4× Champion",

  ],

  [

    "Dwyane Wade",

    "Miami Heat",

    "2548",

    "G",

    "22.0",

    "4.7",

    "5.4",

    "3× Champion",

  ],

  [

    "Kevin Garnett",

    "Minnesota Timberwolves",

    "708",

    "F",

    "17.8",

    "10.0",

    "3.7",

    "1× Champion",

  ],

  [

    "Hakeem Olajuwon",

    "Houston Rockets",

    "165",

    "C",

    "21.8",

    "11.1",

    "2.5",

    "2× Champion",

  ],

  [

    "John Stockton",

    "Utah Jazz",

    "304",

    "G",

    "13.1",

    "2.7",

    "10.5",

    "Hall of Fame",

  ],

  [

    "Oscar Robertson",

    "Sacramento Kings",

    "600015",

    "G",

    "25.7",

    "7.5",

    "9.5",

    "1× Champion",

  ],

];



function hof() {

  return `<section class="page-hero">

<span class="eyebrow">Naismith Memorial Basketball Hall of Fame</span>

<h1>HALL OF FAME</h1>

<p class="muted">Click a legend to open their full profile.</p>

</section>



<section class="section">

<div class="player-grid">${LEGENDS.map(

    (x, i) => `

<a class="player hof-player" href="#player/legend-${i}" style="text-decoration:none;color:#fff">

<img src="${head(x[2])}" alt="${x[0]}" loading="lazy" decoding="async" onerror="imgFallback(this,FALLBACK_PLAYER)">

<div class="player-info">

<small>${x[1]} · ${x[3]}</small>

<h3>${x[0]}</h3>

<div class="mini-stats">

<span>${x[4]} <i>PPG</i></span>

<span>${x[5]} <i>RPG</i></span>

<span>${x[6]} <i>APG</i></span>

</div>

</div>

</a>`,

  ).join("")}</div>

</section>`;

}



function playerPage(ref) {

  if (String(ref).startsWith("legend-")) {

    const x = LEGENDS[Number(String(ref).slice(7))];

    if (!x) return notFound();

    return legendProfile(x);

  }



  const id = String(ref || "");

  const known = PLAYER_DB.find((p) => String(p.id) === id);

  const pt = known ? TEAMS.find((t) => t.name === known.team) : null;



  return `<section class="player-hero" style="--team:${pt?.color || "#ffffff"};--accent:${pt?.accent || "#ffffff"}">

<div class="player-profile">

<img id="profilePhoto" src="${head(id)}" alt="Player" loading="eager" decoding="async" onerror="imgFallback(this,FALLBACK_PLAYER)">

<div>

<span class="eyebrow">NBA PLAYER PROFILE</span>

<h1 id="profileName">Loading…</h1>

<p id="profileMeta">Fetching player history and stats…</p>

<span class="pill" id="profilePill">LIVE PROFILE</span>

</div>

</div>

</section>

<section class="section" id="dynamicProfile">

<div class="roster-loading"><span class="loader"></span> Loading career data…</div>

</section>`;

}



/* =========================

   LEGEND PROFILE DATA

========================= */



const LEGEND_DETAILS = {

  "Michael Jordan": {

    best: {

      season: "1987-88",

      ppg: "35.0",

      rpg: "5.5",

      apg: "5.9",

      spg: "3.2",

      bpg: "1.6",

      fg: "53.5%",

    },

    draft: "1984 · 1st Round · 3rd Pick",

    awards:

      "MVP · Defensive Player of the Year · Scoring Champion · Steals Champion · All-NBA First Team · All-Defensive First Team",

  },

  "LeBron James": {

    best: {

      season: "2012-13",

      ppg: "26.8",

      rpg: "8.0",

      apg: "7.3",

      spg: "1.7",

      bpg: "0.9",

      fg: "56.5%",

    },

    draft: "2003 · 1st Round · 1st Pick",

    awards:

      "MVP · NBA Champion · Finals MVP · All-NBA First Team · All-Defensive First Team",

  },

  "Kobe Bryant": {

    best: {

      season: "2005-06",

      ppg: "35.4",

      rpg: "5.3",

      apg: "4.5",

      spg: "1.8",

      bpg: "0.4",

      fg: "45.0%",

    },

    draft: "1996 · 1st Round · 13th Pick",

    awards:

      "NBA Champion · Finals MVP · MVP · Scoring Champion · All-NBA First Team",

  },

  "Bill Russell": {

    best: {

      season: "1961-62",

      ppg: "18.9",

      rpg: "23.6",

      apg: "4.5",

      spg: "—",

      bpg: "—",

      fg: "45.7%",

    },

    draft: "1956 · 1st Round · 2nd Pick",

    awards: "11× NBA Champion · 5× MVP · All-NBA First Team",

  },

  "Tim Duncan": {

    best: {

      season: "2001-02",

      ppg: "25.5",

      rpg: "12.7",

      apg: "3.7",

      spg: "0.7",

      bpg: "2.5",

      fg: "50.8%",

    },

    draft: "1997 · 1st Round · 1st Pick",

    awards: "5× NBA Champion · 3× Finals MVP · 2× MVP · All-NBA First Team",

  },

  "Shaquille O'Neal": {

    best: {

      season: "1999-00",

      ppg: "29.7",

      rpg: "13.6",

      apg: "3.8",

      spg: "0.5",

      bpg: "3.0",

      fg: "57.4%",

    },

    draft: "1992 · 1st Round · 1st Pick",

    awards: "4× NBA Champion · 3× Finals MVP · MVP · Scoring Champion",

  },

  "Stephen Curry": {

    best: {

      season: "2015-16",

      ppg: "30.1",

      rpg: "5.4",

      apg: "6.7",

      spg: "2.1",

      bpg: "0.2",

      fg: "50.4%",

    },

    draft: "2009 · 1st Round · 7th Pick",

    awards: "4× NBA Champion · 2× MVP · Finals MVP · Scoring Champion",

  },

  "Dwyane Wade": {

    best: {

      season: "2008-09",

      ppg: "30.2",

      rpg: "5.0",

      apg: "7.5",

      spg: "2.2",

      bpg: "1.3",

      fg: "49.1%",

    },

    draft: "2003 · 1st Round · 5th Pick",

    awards: "3× NBA Champion · Finals MVP · Scoring Champion",

  },

  "Kevin Garnett": {

    best: {

      season: "2003-04",

      ppg: "24.2",

      rpg: "13.9",

      apg: "5.0",

      spg: "1.5",

      bpg: "2.2",

      fg: "49.9%",

    },

    draft: "1995 · 1st Round · 5th Pick",

    awards: "NBA Champion · MVP · Defensive Player of the Year",

  },

  "Hakeem Olajuwon": {

    best: {

      season: "1992-93",

      ppg: "26.1",

      rpg: "13.0",

      apg: "3.5",

      spg: "1.8",

      bpg: "4.2",

      fg: "51.0%",

    },

    draft: "1984 · 1st Round · 1st Pick",

    awards:

      "2× NBA Champion · 2× Finals MVP · MVP · Defensive Player of the Year",

  },

  "John Stockton": {

    best: {

      season: "1989-90",

      ppg: "17.2",

      rpg: "2.6",

      apg: "14.5",

      spg: "2.7",

      bpg: "0.2",

      fg: "51.4%",

    },

    draft: "1984 · 1st Round · 16th Pick",

    awards: "2× Steals Champion · 9× Assists Champion · All-NBA First Team",

  },

  "Oscar Robertson": {

    best: {

      season: "1961-62",

      ppg: "30.8",

      rpg: "12.5",

      apg: "11.4",

      spg: "—",

      bpg: "—",

      fg: "47.8%",

    },

    draft: "1960 · 1st Round · 1st Pick",

    awards: "NBA Champion · MVP · 6× Assists Champion",

  },

};



function legendProfile(x) {

  const pt = TEAMS.find((t) => x[1].includes(t.name) || x[1].includes(t.city));

  const d = LEGEND_DETAILS[x[0]];



  return `<section class="player-hero" style="--team:${pt?.color || "#ffffff"};--accent:${pt?.accent || "#ffffff"}">

<div class="player-profile">

<img src="${head(x[2])}" alt="${x[0]}" loading="eager" decoding="async" onerror="imgFallback(this,FALLBACK_PLAYER)">

<div>

<span class="eyebrow">HALL OF FAME LEGEND</span>

<h1>${x[0]}</h1>

<p>${x[1]} · ${x[3]}</p>

<span class="pill">${x[7]}</span>

</div>

</div>

</section>



<section class="section">



<div class="stat-strip player-stat-strip">

<div class="stat"><b>${x[4]}</b><span>CAREER PPG</span></div>

<div class="stat"><b>${x[5]}</b><span>CAREER RPG</span></div>

<div class="stat"><b>${x[6]}</b><span>CAREER APG</span></div>

</div>



<div class="history-box" style="margin-top:45px">

<span class="eyebrow">Peak season</span>

<h2>⭐ Best Season · ${d.best.season}</h2>



<div class="stat-strip player-stat-strip">

<div class="stat"><b>${d.best.ppg}</b><span>PPG</span></div>

<div class="stat"><b>${d.best.rpg}</b><span>RPG</span></div>

<div class="stat"><b>${d.best.apg}</b><span>APG</span></div>

<div class="stat"><b>${d.best.spg}</b><span>SPG</span></div>

<div class="stat"><b>${d.best.bpg}</b><span>BPG</span></div>

<div class="stat"><b>${d.best.fg}</b><span>FG%</span></div>

</div>

</div>



<div class="cards profile-cards" style="margin-top:45px">



<article class="info-card">

<span class="eyebrow">Draft</span>

<h3>Draft information</h3>

<p class="muted">${d.draft}</p>

</article>



<article class="info-card">

<span class="eyebrow">Awards</span>

<h3>Major honors</h3>

<p class="muted">${d.awards}</p>

</article>



<article class="info-card">

<span class="eyebrow">Career</span>

<h3>Career profile</h3>

<p class="muted">

${x[0]} built a Hall of Fame career as a ${x[3]} with ${x[1]}.

Career averages: ${x[4]} PPG · ${x[5]} RPG · ${x[6]} APG.

</p>

</article>



</div>



<div class="history-box" style="margin-top:45px">

<span class="eyebrow">Career snapshot</span>

<h3>${x[0]}</h3>



<div class="history-row">

<b>01</b>

<span>Franchise</span>

<strong>${x[1]}</strong>

</div>



<div class="history-row">

<b>02</b>

<span>Position</span>

<strong>${x[3]}</strong>

</div>



<div class="history-row">

<b>03</b>

<span>Best season</span>

<strong>${d.best.season}</strong>

</div>



<div class="history-row">

<b>04</b>

<span>Draft</span>

<strong>${d.draft}</strong>

</div>



</div>



</section>`;

}



/* =========================

   PLAYERS

========================= */



function players() {

  return `<section class="page-hero players-shell">

<span class="eyebrow">NBA player database</span>

<h1>PLAYERS</h1>

<p class="muted">Search the database, then open Filters for advanced sorting and player categories.</p>



<div class="players-searchbar">

<input class="search" id="playerSearch" placeholder="Search player…" autocomplete="off">

<button class="filter-toggle" id="filterToggle" type="button">☷ Filters</button>

<span id="playerCount">Loading players…</span>

</div>



<div class="player-filter-panel" id="playerFilterPanel">

<select id="playerTeam"><option value="all">All teams</option>${TEAMS.map((t) => `<option value="${t.name}">${t.name}</option>`).join("")}</select>

<select id="playerPos"><option value="all">All positions</option><option value="G">Guard</option><option value="F">Forward</option><option value="C">Center</option></select>

<select id="playerType"><option value="all">All types</option><option value="Hall of Fame">Hall of Fame</option><option value="Current">Current</option><option value="Legend">Legend</option></select>

<select id="playerSort"><option value="az">A → Z</option><option value="za">Z → A</option><option value="team">Team</option><option value="position">Position</option><option value="year">Year</option></select>

<select id="playerYear"><option value="all">All years</option><option value="2020s">2020s</option><option value="2010s">2010s</option><option value="2000s">2000s</option><option value="1990s">1990s</option><option value="1980s">1980s</option><option value="1970s">1970s</option><option value="1960s">1960s</option><option value="1950s">1950s</option></select>

</div>

</section>



<section class="section">

<div class="player-directory" id="playerDirectory">

<div class="roster-loading"><span class="loader"></span> Loading player database…</div>

</div>

</section>`;

}



let PLAYER_DB = [];



function playerYearBucket(p) {

  const y = Number(p.year) || 0;

  if (!y) return "unknown";

  return `${Math.floor(y / 10) * 10}s`;

}



function renderPlayers() {

  const root = document.getElementById("playerDirectory");

  if (!root) return;



  const q = (document.getElementById("playerSearch")?.value || "")

    .trim()

    .toLowerCase();

  const team = document.getElementById("playerTeam")?.value || "all";

  const pos = document.getElementById("playerPos")?.value || "all";

  const type = document.getElementById("playerType")?.value || "all";

  const sort = document.getElementById("playerSort")?.value || "az";

  const year = document.getElementById("playerYear")?.value || "all";



  let list = PLAYER_DB.filter(

    (p) =>

      (!q || `${p.name} ${p.team} ${p.pos}`.toLowerCase().includes(q)) &&

      (team === "all" || p.team === team) &&

      (pos === "all" || p.pos === pos) &&

      (type === "all" || p.tag === type) &&

      (year === "all" || playerYearBucket(p) === year),

  );



  list.sort((a, b) =>

    sort === "za"

      ? b.name.localeCompare(a.name)

      : sort === "team"

        ? a.team.localeCompare(b.team) || a.name.localeCompare(b.name)

        : sort === "position"

          ? a.pos.localeCompare(b.pos) || a.name.localeCompare(b.name)

          : sort === "year"

            ? (b.year || 0) - (a.year || 0)

            : a.name.localeCompare(b.name),

  );



  document.getElementById("playerCount").textContent = `${list.length} players`;



  root.innerHTML = list.length

    ? list

        .map(

          (p) => `

<a class="directory-player" href="${p.href}">

<img src="${p.photo}" alt="${p.name}" loading="lazy" decoding="async" onerror="imgFallback(this,FALLBACK_PLAYER)">

<div>

<small>${p.tag} · ${p.pos}${p.year ? ` · ${p.year}` : ""}</small>

<h3>${p.name}</h3>

<span>${p.team}</span>

<div class="directory-stats">

<b>${p.ppg || "—"}</b><i>PPG</i>

<b>${p.rpg || "—"}</b><i>RPG</i>

<b>${p.apg || "—"}</b><i>APG</i>

</div>

</div>

<b>→</b>

</a>`,

        )

        .join("")

    : `<div class="teams-empty"><b>No player found.</b><br>Try another filter.</div>`;

}



/* =========================

   PLAYER DATABASE

========================= */



async function loadPlayers() {

  const seen = new Set();



  PLAYER_DB = LEGENDS.map((x, i) => ({

    id: x[2],

    name: x[0],

    team: x[1],

    pos: x[3],

    photo: head(x[2]),

    href: `#player/legend-${i}`,

    tag: "Hall of Fame",

    year:

      x[0] === "Michael Jordan"

        ? 1984

        : x[0] === "LeBron James"

          ? 2003

          : x[0] === "Kobe Bryant"

            ? 1996

            : x[0] === "Bill Russell"

              ? 1956

              : x[0] === "Tim Duncan"

                ? 1997

                : x[0] === "Shaquille O'Neal"

                  ? 1992

                  : x[0] === "Stephen Curry"

                    ? 2009

                    : x[0] === "Dwyane Wade"

                      ? 2003

                      : x[0] === "Kevin Garnett"

                        ? 1995

                        : x[0] === "Hakeem Olajuwon"

                          ? 1984

                          : x[0] === "John Stockton"

                            ? 1984

                            : 1960,

    ppg: x[4],

    rpg: x[5],

    apg: x[6],

  }));



  PLAYER_DB.forEach((p) => seen.add(p.id));



  const jobs = TEAMS.map(async (t) => {

    const eid = ESPN_IDS[t.id];

    if (!eid) return [];



    try {

      const d = await fetchJSON(

        `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${eid}/roster`,

      );



      return (d.athletes || []).map((a) => {

        const id = a.id || a.uid?.split("~").pop() || "";

        const img =

          a.headshot?.href ||

          a.images?.[0]?.href ||

          (id ? head(id) : FALLBACK_PLAYER);

        const pos = (a.position?.abbreviation || "").toUpperCase();

        const year =

          Number(a.experience?.startYear) || Number(a.startYear) || 0;



        return {

          id,

          name: a.displayName || "Unknown Player",

          team: t.name,

          pos,

          photo: img,

          href: `#player/${id}`,

          tag: "Current",

          year,

          ppg: statValue(a, ["ppg", "points per game"]),

          rpg: statValue(a, ["rpg", "rebounds per game"]),

          apg: statValue(a, ["apg", "assists per game"]),
          spg: statValue(a, ["spg", "steals per game"]),
          bpg: statValue(a, ["bpg", "blocks per game"]),
          fg: statValue(a, ["fg%", "field goal percentage"]),

          height: a.displayHeight || a.height || "—",

          weight: a.displayWeight || a.weight || "—",

        };

      });

    } catch {

      return [];

    }

  });



  const groups = await Promise.all(jobs);



  groups.flat().forEach((p) => {

    if (p.id && !seen.has(p.id)) {

      seen.add(p.id);

      PLAYER_DB.push(p);

    }

  });



  renderPlayers();

}



/* =========================

   PLAYER PROFILE

========================= */



function valueFromObject(obj, keys) {

  if (!obj || typeof obj !== "object") return null;



  for (const key of keys) {

    if (obj[key] !== undefined && obj[key] !== null) {

      const v = obj[key];



      if (typeof v === "object") {

        return v.displayValue ?? v.value ?? v.display ?? null;

      }



      return v;

    }

  }



  return null;

}



function normalizeNumber(v) {

  if (v === null || v === undefined || v === "") return null;

  const n = Number(String(v).replace("%", ""));

  return Number.isFinite(n) ? n : null;

}



function extractSeasonRows(data) {

  const rows = [];



  const possible = [

    data?.statistics,

    data?.seasonStats,

    data?.seasons,

    data?.statisticsLog,

    data?.athlete?.statistics,

    data?.athlete?.seasonStats,

    data?.athlete?.seasons,

  ];



  const walk = (arr) => {

    if (!Array.isArray(arr)) return;



    arr.forEach((item) => {

      if (!item || typeof item !== "object") return;



      const season =

        item.season?.displayName ||

        item.season?.year ||

        item.seasonYear ||

        item.year ||

        item.displayName ||

        "";



      const stats = item.stats || item.statistics || item.values || item;



      const ppg = valueFromObject(stats, ["ppg", "pointsPerGame", "points"]);

      const rpg = valueFromObject(stats, [

        "rpg",

        "reboundsPerGame",

        "rebounds",

      ]);

      const apg = valueFromObject(stats, ["apg", "assistsPerGame", "assists"]);



      if (season && (ppg !== null || rpg !== null || apg !== null)) {

        rows.push({

          season: String(season),

          team: item.team?.displayName || item.team?.name || item.team || "—",

          gp: valueFromObject(stats, ["gamesPlayed", "gp", "games"]),

          min: valueFromObject(stats, ["minutesPerGame", "mpg", "minutes"]),

          ppg,

          rpg,

          apg,

          spg: valueFromObject(stats, ["stealsPerGame", "spg", "steals"]),

          bpg: valueFromObject(stats, ["blocksPerGame", "bpg", "blocks"]),

          fg: valueFromObject(stats, [

            "fieldGoalPct",

            "fieldGoalPercentage",

            "fgPct",

            "fg%",

          ]),

          three: valueFromObject(stats, [

            "threePointPct",

            "threePointPercentage",

            "threePointFieldGoalPct",

            "3p%",

          ]),

          ft: valueFromObject(stats, [

            "freeThrowPct",

            "freeThrowPercentage",

            "ftPct",

            "ft%",

          ]),

        });

      }

    });

  };



  possible.forEach(walk);



  const unique = new Map();

  rows.forEach((r) => {

    const key = `${r.season}-${r.team}`;

    if (!unique.has(key)) unique.set(key, r);

  });



  return [...unique.values()];

}



function statLabel(v) {

  return v === null || v === undefined || v === "" ? "—" : v;

}



function bestSeason(rows) {

  if (!rows.length) return null;



  return [...rows].sort((a, b) => {

    const pa = normalizeNumber(a.ppg) || 0;

    const pb = normalizeNumber(b.ppg) || 0;

    return pb - pa;

  })[0];

}

function loadPlayerProfile(id) {

  const root = document.getElementById("dynamicProfile");

  if (!root || !id) return;



  fetchJSON(

    `https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/athletes/${id}`,

  )

    .then((data) => {

      const a = data.athlete || data;



      const name =

        a.displayName ||

        a.fullName ||

        a.shortName ||

        "NBA Player";



      const team =

        a.team?.displayName ||

        a.team?.name ||

        "NBA";



      const pos =

        a.position?.displayName ||

        a.position?.abbreviation ||

        "—";



      const bio =

        a.shortBio ||

        a.longBio ||

        a.bio ||

        "Career information is supplied from the live NBA/ESPN player feed.";



      const img =

        a.headshot?.href ||

        head(id);



      const years =

        a.experience?.years ??

        a.yearsPro ??

        "—";



      const height =

        a.displayHeight ||

        a.height ||

        "—";



      const weight =

        a.displayWeight ||

        a.weight ||

        "—";



      const birth =

        a.dateOfBirth

          ? new Date(a.dateOfBirth).toLocaleDateString()

          : "—";



      const stats =

        a.statistics ||

        data.statistics ||

        [];



      const values = (keys) => {

        for (const key of keys) {

          const found = stats.find((s) => {

            const n = String(

              s.name ||

              s.abbreviation ||

              s.label ||

              "",

            ).toLowerCase();



            return (

              n === key ||

              n.includes(key)

            );

          });



          if (found) {

            return (

              found.displayValue ??

              found.value ??

              "—"

            );

          }

        }



        return "—";

      };



      const ppg = values(["ppg", "points"]);

      const rpg = values(["rpg", "rebounds"]);

      const apg = values(["apg", "assists"]);

      const spg = values(["spg", "steals"]);

      const bpg = values(["bpg", "blocks"]);

      const fg = values(["fg%", "field goal"]);



      const seasons =

        extractSeasonRows(data) || [];



      const best =

        bestSeason(seasons);



      const draft =

        a.draft ||

        a.draftInfo ||

        data.draft ||

        data.draftInfo ||

        {};



      const draftText =

        draft.displayValue ||

        draft.text ||

        (

          draft.year

            ? `${draft.year} · ${draft.round || "—"} · ${draft.selection || draft.pick || "—"}`

            : "—"

        );



      const awards =

        a.awards ||

        a.accolades ||

        data.awards ||

        data.accolades ||

        [];



      const awardText =

        Array.isArray(awards)

          ? awards

              .map(

                (x) =>

                  x.description ||

                  x.name ||

                  x.displayName,

              )

              .filter(Boolean)

              .join(" · ")

          : String(awards || "");



      const teamHistory = [

        ...new Set(

          seasons

            .map((x) => x.team)

            .filter(

              (x) =>

                x &&

                x !== "—",

            ),

        ),

      ];



      const careerHighs =

        a.careerHighs ||

        a.careerhighs ||

        data.careerHighs ||

        data.careerhighs ||

        null;



      const careerHighText =

        careerHighs &&

        typeof careerHighs === "object"

          ? Object.entries(careerHighs)

              .map(

                ([key, value]) =>

                  `<div class="history-row">

                    <b>${String(key).toUpperCase()}</b>

                    <span>Career High</span>

                    <strong>${typeof value === "object" ? JSON.stringify(value) : value}</strong>

                  </div>`,

              )

              .join("")

          : "";



      document.getElementById(

        "profileName",

      ).textContent = name;



      document.getElementById(

        "profileMeta",

      ).textContent =

        `${team} · ${pos}`;



      document.getElementById(

        "profilePhoto",

      ).src = img;



      root.innerHTML = `



<!-- CAREER STATS -->



<div class="section-head">

  <div>

    <span class="eyebrow">

      Career statistics

    </span>



    <h2>

      ${name}

    </h2>

  </div>



  <span class="muted">

    ${team}

  </span>

</div>



<div class="stat-strip player-stat-strip">



  <div class="stat">

    <b>${statLabel(ppg)}</b>

    <span>PPG</span>

  </div>



  <div class="stat">

    <b>${statLabel(rpg)}</b>

    <span>RPG</span>

  </div>



  <div class="stat">

    <b>${statLabel(apg)}</b>

    <span>APG</span>

  </div>



  <div class="stat">

    <b>${statLabel(spg)}</b>

    <span>SPG</span>

  </div>



  <div class="stat">

    <b>${statLabel(bpg)}</b>

    <span>BPG</span>

  </div>



  <div class="stat">

    <b>${statLabel(fg)}</b>

    <span>FG%</span>

  </div>



</div>





<!-- BEST SEASON -->



${

  best

    ? `

<div class="history-box" style="margin-top:45px">



  <span class="eyebrow">

    Peak season

  </span>



  <h2>

    ⭐ Best Statistical Season · ${best.season}

  </h2>



  <div class="stat-strip player-stat-strip">



    <div class="stat">

      <b>${statLabel(best.ppg)}</b>

      <span>PPG</span>

    </div>



    <div class="stat">

      <b>${statLabel(best.rpg)}</b>

      <span>RPG</span>

    </div>



    <div class="stat">

      <b>${statLabel(best.apg)}</b>

      <span>APG</span>

    </div>



    <div class="stat">

      <b>${statLabel(best.spg)}</b>

      <span>SPG</span>

    </div>



    <div class="stat">

      <b>${statLabel(best.bpg)}</b>

      <span>BPG</span>

    </div>



    <div class="stat">

      <b>${statLabel(best.fg)}</b>

      <span>FG%</span>

    </div>



  </div>



</div>

`

    : ""

}





<!-- PLAYER INFORMATION -->



<div

  class="cards profile-cards"

  style="margin-top:45px"

>



  <article class="info-card">



    <span class="eyebrow">

      Biography

    </span>



    <h3>

      ${name}

    </h3>



    <p class="muted">

      ${bio}

    </p>



  </article>





  <article class="info-card">



    <span class="eyebrow">

      Player data

    </span>



    <h3>

      Career details

    </h3>



    <p class="muted">

      Position: ${pos}<br>

      Height: ${height}<br>

      Weight: ${weight}<br>

      Experience: ${years} years<br>

      Birth date: ${birth}

    </p>



  </article>





  <article class="info-card">



    <span class="eyebrow">

      Draft

    </span>



    <h3>

      Draft information

    </h3>



    <p class="muted">

      ${draftText}

    </p>



  </article>



</div>





<!-- TEAM HISTORY -->



<div

  class="history-box"

  style="margin-top:45px"

>



  <span class="eyebrow">

    Career teams

  </span>



  <h3>

    Teams & Years

  </h3>



  ${

    teamHistory.length

      ? teamHistory

          .map(

            (t, i) => `

<div class="history-row">



  <b>

    ${String(i + 1).padStart(2, "0")}

  </b>



  <span>

    Team

  </span>



  <strong>

    ${t}

  </strong>



</div>

`,

          )

          .join("")

      : `

<p class="muted">

  Team history is not available

  in the live feed.

</p>

`

  }



</div>





<!-- SEASON HISTORY -->



${

  seasons.length

    ? `

<div

  class="history-box"

  style="margin-top:45px"

>



  <span class="eyebrow">

    Season by season

  </span>



  <h3>

    Regular-season history

  </h3>



  <div

    style="

      overflow-x:auto;

      margin-top:20px;

    "

  >



    <table

      style="

        width:100%;

        border-collapse:collapse;

        min-width:850px;

      "

    >



      <thead>



        <tr>



          <th style="text-align:left;padding:12px">

            Season

          </th>



          <th style="text-align:left;padding:12px">

            Team

          </th>



          <th style="padding:12px">

            GP

          </th>



          <th style="padding:12px">

            MIN

          </th>



          <th style="padding:12px">

            PPG

          </th>



          <th style="padding:12px">

            RPG

          </th>



          <th style="padding:12px">

            APG

          </th>



          <th style="padding:12px">

            SPG

          </th>



          <th style="padding:12px">

            BPG

          </th>



          <th style="padding:12px">

            FG%

          </th>



        </tr>



      </thead>





      <tbody>



        ${seasons

          .map(

            (s) => `

<tr>



  <td style="padding:12px">

    ${s.season}

  </td>



  <td style="padding:12px">

    ${s.team}

  </td>



  <td style="padding:12px;text-align:center">

    ${statLabel(s.gp)}

  </td>



  <td style="padding:12px;text-align:center">

    ${statLabel(s.min)}

  </td>



  <td style="padding:12px;text-align:center">

    ${statLabel(s.ppg)}

  </td>



  <td style="padding:12px;text-align:center">

    ${statLabel(s.rpg)}

  </td>



  <td style="padding:12px;text-align:center">

    ${statLabel(s.apg)}

  </td>



  <td style="padding:12px;text-align:center">

    ${statLabel(s.spg)}

  </td>



  <td style="padding:12px;text-align:center">

    ${statLabel(s.bpg)}

  </td>



  <td style="padding:12px;text-align:center">

    ${statLabel(s.fg)}

  </td>



</tr>

`,

          )

          .join("")}



      </tbody>



    </table>



  </div>



</div>

`

    : ""

}





<!-- CAREER HIGHS -->



<div

  class="history-box"

  style="margin-top:45px"

>



  <span class="eyebrow">

    Career highs

  </span>



  <h3>

    Career Highs

  </h3>



  ${

    careerHighText

      ? careerHighText

      : `

<p class="muted">

  Career-high data is not exposed

  by the current live feed.

</p>

`

  }



</div>





<!-- AWARDS -->



<div

  class="history-box"

  style="margin-top:45px"

>



  <span class="eyebrow">

    Honors

  </span>



  <h3>

    Awards & Accolades

  </h3>



  <p class="muted">

    ${

      awardText ||

      "Awards data is not exposed by the current live feed."

    }

  </p>



</div>





<!-- DATABASE -->



<div

  class="cards profile-cards"

  style="margin-top:45px"

>



  <article class="info-card">



    <span class="eyebrow">

      Player ID

    </span>



    <h3>

      Database record

    </h3>



    <p class="muted">

      ESPN ID: ${id}<br>

      Current team: ${team}<br>

      Position: ${pos}

    </p>



  </article>



</div>



`;

    })

    .catch(() => {

      root.innerHTML = `

<div class="cards profile-cards">



  <article class="info-card">



    <span class="eyebrow">

      Profile unavailable

    </span>



    <h3>

      Live player history couldn't load

    </h3>



    <p class="muted">

      The player page needs internet access

      to fetch the latest biography and

      statistics.

    </p>



  </article>



</div>

`;

    });

}

/* =========================

   CHAMPIONS

========================= */



const CHAMPS = [

  {

    year: 2026,

    champ: "New York Knicks",

    opp: "San Antonio Spurs",

    result: "4–1",

    mvp: "Jalen Brunson",

    stats: "24.7 PPG · 3.9 RPG · 7.2 APG",

  },

  {

    year: 2025,

    champ: "Oklahoma City Thunder",

    opp: "Indiana Pacers",

    result: "4–3",

    mvp: "Shai Gilgeous-Alexander",

    stats: "32.7 PPG · 5.0 RPG · 6.4 APG",

  },

  {

    year: 2024,

    champ: "Boston Celtics",

    opp: "Dallas Mavericks",

    result: "4–1",

    mvp: "Jaylen Brown",

    stats: "20.8 PPG · 5.4 RPG · 5.0 APG",

  },

  {

    year: 2023,

    champ: "Denver Nuggets",

    opp: "Miami Heat",

    result: "4–1",

    mvp: "Nikola Jokić",

    stats: "30.2 PPG · 14.0 RPG · 7.2 APG",

  },

  {

    year: 2022,

    champ: "Golden State Warriors",

    opp: "Boston Celtics",

    result: "4–2",

    mvp: "Stephen Curry",

    stats: "31.2 PPG · 6.0 RPG · 5.0 APG",

  },

  {

    year: 2021,

    champ: "Milwaukee Bucks",

    opp: "Phoenix Suns",

    result: "4–2",

    mvp: "Giannis Antetokounmpo",

    stats: "35.2 PPG · 13.2 RPG · 5.0 APG",

  },

  {

    year: 2020,

    champ: "Los Angeles Lakers",

    opp: "Miami Heat",

    result: "4–2",

    mvp: "LeBron James",

    stats: "29.8 PPG · 11.8 RPG · 8.5 APG",

  },

  {

    year: 2019,

    champ: "Toronto Raptors",

    opp: "Golden State Warriors",

    result: "4–2",

    mvp: "Kawhi Leonard",

    stats: "28.5 PPG · 9.8 RPG · 4.2 APG",

  },

  {

    year: 2018,

    champ: "Golden State Warriors",

    opp: "Cleveland Cavaliers",

    result: "4–0",

    mvp: "Kevin Durant",

    stats: "28.8 PPG · 10.8 RPG · 7.5 APG",

  },

  {

    year: 2017,

    champ: "Golden State Warriors",

    opp: "Cleveland Cavaliers",

    result: "4–1",

    mvp: "Kevin Durant",

    stats: "35.2 PPG · 8.2 RPG · 5.4 APG",

  },

  {

    year: 2016,

    champ: "Cleveland Cavaliers",

    opp: "Golden State Warriors",

    result: "4–3",

    mvp: "LeBron James",

    stats: "29.7 PPG · 11.3 RPG · 8.9 APG",

  },

  {

    year: 2015,

    champ: "Golden State Warriors",

    opp: "Cleveland Cavaliers",

    result: "4–2",

    mvp: "Andre Iguodala",

    stats: "16.3 PPG · 5.8 RPG · 4.0 APG",

  },

];



function champCard(c) {

  const team = TEAMS.find((t) => t.name === c.champ);



  return `<article class="champ-card" data-year="${c.year}" data-search="${c.year} ${c.champ} ${c.opp} ${c.mvp}">

<div class="champ-year">${c.year}</div>

<div class="champ-main">

<div class="champ-team">

${team ? `<img src="${logo(team)}" alt="${c.champ}" loading="lazy" onerror="imgFallback(this,FALLBACK_TEAM)">` : ""}

<div><small>CHAMPION</small><h3>${c.champ}</h3></div>

</div>

<div class="finals"><span>NBA FINALS</span><b>${c.champ} <em>vs</em> ${c.opp}</b><strong>${c.result}</strong></div>

<div class="fmvp"><small>FINALS MVP</small><b>${c.mvp}</b><span>${c.stats}</span></div>

</div>

</article>`;

}



function champions() {

  return `<section class="page-hero">

<span class="eyebrow">NBA Finals history</span>

<h1>CHAMPIONS</h1>

<p class="muted">Champion, Finals opponent, series result and Finals MVP for each season.</p>

</section>

<section class="section">

<input class="search" id="champSearch" placeholder="Search year, team or MVP...">

<div class="champ-list" id="champList">${CHAMPS.map(champCard).join("")}</div>

</section>`;

}



function about() {

  return `<section class="page-hero">

<span class="eyebrow">From BAA to NBA</span>

<h1>THE STORY</h1>

<p class="muted">How professional basketball became the league we know today.</p>

</section>



<section class="section history">

<div class="timeline">

<div class="event"><b>1946 — BAA is born</b><span>The Basketball Association of America launches with 11 teams and plays its first game on November 1, 1946.</span></div>

<div class="event"><b>1947 — First champion</b><span>The Philadelphia Warriors win the first BAA championship.</span></div>

<div class="event"><b>1949 — The merger</b><span>The BAA and National Basketball League merge, creating the National Basketball Association.</span></div>

<div class="event"><b>College → NBA</b><span>For decades, college basketball was the dominant development route for American players. Modern prospects can also arrive through international basketball, G League pathways and other development systems.</span></div>

<div class="event"><b>NBA Draft</b><span>The annual draft gives teams a structured way to acquire eligible young talent. Lottery odds determine the order of the first picks among non-playoff teams, followed by the remaining selection order.</span></div>

<div class="event"><b>Draft classes</b><span>Every class gets its own identity: stars, role players, international prospects and late-round discoveries. The site can be extended with full pick-by-pick class pages.</span></div>

</div>



<div class="sources">

<b>Official references:</b>

<a href="https://www.nba.com/news/about" target="_blank">NBA — About</a> ·

<a href="https://www.nba.com/news/history-this-date-in-nba-aug" target="_blank">NBA History</a> ·

<a href="https://www.nba.com/draft/2026/draft-board" target="_blank">2026 Draft Board</a>

</div>

</section>`;

}





/* =========================
   STATS
========================= */
function stats() {
  return `<section class="page-hero stats-shell">
    <span class="eyebrow">NBA statistical database</span><h1>STATS</h1>
    <p class="muted">Explore NBA player statistics, league leaders and the numbers behind the game.</p>
    <div class="teams-toolbar">
      <input class="search" id="statsSearch" placeholder="Search player..." autocomplete="off">
      <select id="statsCategory"><option value="ppg">Points Per Game</option><option value="rpg">Rebounds Per Game</option><option value="apg">Assists Per Game</option><option value="spg">Steals Per Game</option><option value="bpg">Blocks Per Game</option><option value="fg">Field Goal %</option></select>
      <select id="statsTeam"><option value="all">All Teams</option>${TEAMS.map(t=>`<option value="${t.name}">${t.name}</option>`).join("")}</select>
    </div>
  </section>
  <section class="section">
    <div class="section-head"><div><span class="eyebrow">League leaders</span><h2 id="statsTitle">Points Per Game</h2></div><span class="muted" id="statsCount">Loading players...</span></div>
    <div class="cards" id="statsLeaders"><div class="roster-loading"><span class="loader"></span> Loading league statistics...</div></div>
    <div class="history-box" style="margin-top:55px"><div class="section-head"><div><span class="eyebrow">Player statistics</span><h2>All Players</h2></div></div>
      <div style="overflow-x:auto;margin-top:20px"><table class="stats-table" style="width:100%;border-collapse:collapse;min-width:850px"><thead><tr>
      <th style="text-align:left;padding:14px">Player</th><th style="text-align:left;padding:14px">Team</th><th style="padding:14px">PPG</th><th style="padding:14px">RPG</th><th style="padding:14px">APG</th><th style="padding:14px">SPG</th><th style="padding:14px">BPG</th><th style="padding:14px">FG%</th>
      </tr></thead><tbody id="statsTableBody"><tr><td colspan="8" style="padding:25px;text-align:center">Loading...</td></tr></tbody></table></div>
    </div>
  </section>`;
}

async function loadStats() {
  const leadersRoot=document.getElementById("statsLeaders"),tableRoot=document.getElementById("statsTableBody"),countRoot=document.getElementById("statsCount"),titleRoot=document.getElementById("statsTitle"),search=document.getElementById("statsSearch"),category=document.getElementById("statsCategory"),team=document.getElementById("statsTeam");
  if(!leadersRoot||!tableRoot||!category||!team)return;

  const num=v=>{const n=parseFloat(String(v??"").replace("%","").replace(",",""));return Number.isFinite(n)?n:0;};
  const labels={ppg:"Points Per Game",rpg:"Rebounds Per Game",apg:"Assists Per Game",spg:"Steals Per Game",bpg:"Blocks Per Game",fg:"Field Goal %"};

  // Render an immediate local snapshot so Stats never gets stuck on Loading.
  let players=[...PLAYER_DB];
  if(!players.length){
    players=LEGENDS.map((x,i)=>({
      id:x[2], name:x[0], team:x[1], pos:x[3], photo:head(x[2]), href:`#player/legend-${i}`,
      tag:"Hall of Fame", ppg:x[4], rpg:x[5], apg:x[6], spg:"—", bpg:"—", fg:"—"
    }));
  }

  const renderStats=()=>{
    const q=(search?.value||"").trim().toLowerCase(),cat=category.value||"ppg",tm=team.value||"all";
    const list=players.filter(p=>(!q||`${p.name} ${p.team} ${p.pos}`.toLowerCase().includes(q))&&(tm==="all"||p.team===tm)).sort((a,b)=>num(b[cat])-num(a[cat]));
    titleRoot.textContent=labels[cat];countRoot.textContent=`${list.length} players`;
    const leaders=list.filter(p=>num(p[cat])>0).slice(0,5);
    leadersRoot.innerHTML=leaders.length?leaders.map((p,i)=>`<a class="info-card" href="${p.href}" style="text-decoration:none;color:inherit"><div style="display:flex;align-items:center;gap:18px"><span class="eyebrow">#${i+1}</span><img src="${p.photo||FALLBACK_PLAYER}" alt="${p.name}" style="width:65px;height:65px;object-fit:cover;border-radius:50%" onerror="imgFallback(this,FALLBACK_PLAYER)"><div><small>${p.team||"NBA"} · ${p.pos||"—"}</small><h3>${p.name}</h3></div><strong style="margin-left:auto;font-size:1.5rem">${num(p[cat]).toFixed(1)}</strong></div></a>`).join(""):`<div class="teams-empty"><b>No statistical data found.</b><br>Try another category or team.</div>`;
    tableRoot.innerHTML=list.length?list.map(p=>`<tr><td style="padding:14px"><a href="${p.href}" style="color:inherit;text-decoration:none;font-weight:700">${p.name}</a></td><td style="padding:14px">${p.team||"—"}</td><td style="padding:14px;text-align:center">${p.ppg||"—"}</td><td style="padding:14px;text-align:center">${p.rpg||"—"}</td><td style="padding:14px;text-align:center">${p.apg||"—"}</td><td style="padding:14px;text-align:center">${p.spg||"—"}</td><td style="padding:14px;text-align:center">${p.bpg||"—"}</td><td style="padding:14px;text-align:center">${p.fg||"—"}</td></tr>`).join(""):`<tr><td colspan="8" style="padding:30px;text-align:center">No players found.</td></tr>`;
  };

  if(search)search.oninput=renderStats;category.onchange=renderStats;team.onchange=renderStats;
  renderStats();

  // Upgrade the snapshot with live ESPN roster data without blocking the page.
  if(!PLAYER_DB.length){
    loadPlayers().then(()=>{if(PLAYER_DB.length){players=[...PLAYER_DB];renderStats();}}).catch(()=>{});
  }
}

function statValue(a, keys) {

  const arr = a?.statistics || a?.stats || [];



  for (const key of keys) {

    const x = arr.find(

      (v) =>

        String(v.name || v.label || v.abbreviation || "").toLowerCase() ===

          key ||

        String(v.name || v.label || "")

          .toLowerCase()

          .includes(key),

    );



    if (x) return x.displayValue ?? x.value ?? x.display ?? "—";

  }



  return "—";

}



function loadRoster(teamId) {

  const root = document.getElementById(`roster-${teamId}`);

  if (!root) return;



  const eid = ESPN_IDS[teamId];



  if (!eid) {

    root.innerHTML =

      '<div class="roster-loading">Roster source unavailable for this team.</div>';

    return;

  }



  fetchJSON(

    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${eid}/roster`,

  )

    .then((data) => {

      const players = data.athletes || [];



      if (!players.length) throw new Error("empty");



      root.innerHTML = players

        .map((a, i) => {

          const id = a.id || a.uid?.split("~").pop() || "";

          const img =

            a.headshot?.href ||

            a.images?.[0]?.href ||

            (id ? head(id) : FALLBACK_PLAYER);

          const pos =

            a.position?.abbreviation || a.position?.displayName || "—";



          const ppg = statValue(a, ["ppg", "points per game"]);

          const rpg = statValue(a, ["rpg", "rebounds per game"]);

          const apg = statValue(a, ["apg", "assists per game"]);

          const min = statValue(a, ["min", "minutes"]);

          const fg = statValue(a, ["fg%", "field goal percentage"]);



          return `<a class="roster-card" href="#player/${id}">

<img src="${img}" alt="${a.displayName || "Player"}" loading="lazy" decoding="async" onerror="imgFallback(this,FALLBACK_PLAYER)">

<div class="roster-body">

<div class="roster-name">

<div><small>${pos} · #${a.jersey || "—"}</small><h3>${a.displayName || "Unknown Player"}</h3></div>

<span class="status-dot"></span>

</div>

<div class="roster-stats">

<div><b>${ppg}</b><span>PPG</span></div>

<div><b>${rpg}</b><span>RPG</span></div>

<div><b>${apg}</b><span>APG</span></div>

<div><b>${min}</b><span>MIN</span></div>

<div><b>${fg}</b><span>FG%</span></div>

</div>

</div>

</a>`;

        })

        .join("");

    })

    .catch(() => {

      root.innerHTML = `<div class="roster-loading"><b>Live roster couldn't load.</b><br><span>Open the site with internet access and the roster will load automatically from ESPN's public feed.</span></div>`;

    });

}



function notFound() {

  return `<section class="page-hero"><h1>404</h1><p class="muted">That page doesn't exist.</p></section>`;

}



function render() {

  let h = location.hash.slice(1) || "home";



  let page = h.startsWith("team/")

    ? teamPage(h.split("/")[1])

    : h.startsWith("player/")

      ? playerPage(h.split("/")[1])

      : { home, teams, hof, players, champions, about, stats }[h] || notFound;



  app.innerHTML = typeof page === "function" ? page() : page;



  document

    .querySelectorAll("[data-page]")

    .forEach((a) => a.classList.toggle("active", a.dataset.page === h));



  nav.classList.remove("open");



  if (h === "champions") {

    const s = document.getElementById("champSearch");



    if (s)

      s.oninput = () => {

        const q = s.value.toLowerCase();



        document

          .querySelectorAll(".champ-card")

          .forEach(

            (c) =>

              (c.style.display = c.innerText.toLowerCase().includes(q)

                ? ""

                : "none"),

          );

      };

  }



  if (h.startsWith("team/")) {

    loadRoster(h.split("/")[1]);

  }



  if (h.startsWith("player/") && !h.startsWith("player/legend-")) {

    loadPlayerProfile(h.split("/")[1]);

  }




  if (h === "stats") {
    loadStats();
  }

  if (h === "players") {

    [

      "playerSearch",

      "playerTeam",

      "playerPos",

      "playerType",

      "playerSort",

      "playerYear",

    ].forEach((id) => {

      const el = document.getElementById(id);

      if (el) el.oninput = el.onchange = renderPlayers;

    });



    const ft = document.getElementById("filterToggle");

    const fp = document.getElementById("playerFilterPanel");



    if (ft && fp) {

      ft.onclick = () => {

        fp.classList.toggle("open");

        ft.classList.toggle("active");

      };

    }



    loadPlayers();

  }



  if (h === "teams") {

    let active = "all";

    const s = document.getElementById("teamSearch");



    renderDirectory(active, "");



    s.oninput = () => renderDirectory(active, s.value);



    document.querySelectorAll(".filter-btn").forEach(

      (b) =>

        (b.onclick = () => {

          active = b.dataset.filter;



          document

            .querySelectorAll(".filter-btn")

            .forEach((x) => x.classList.toggle("active", x === b));



          renderDirectory(active, s.value);

        }),

    );

  }

}



window.addEventListener("hashchange", render);



const observer = new MutationObserver(() => {

  document

    .querySelectorAll(".team-card,.player,.info-card,.champ,.event")

    .forEach((el, i) => {

      el.style.opacity = "0";

      el.style.transform += " translateY(10px)";



      setTimeout(

        () => {

          el.style.transition = "opacity .45s ease,transform .45s ease";

          el.style.opacity = "1";

          el.style.transform = el.style.transform.replace(

            " translateY(10px)",

            "",

          );

        },

        Math.min(i * 18, 260),

      );

    });

});



observer.observe(app, { childList: true, subtree: true });



render();
