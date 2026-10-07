// Ship a Roblox Game in 30 Days with Claude Code — the single source of truth.
// Loaded by the browser (dashboard.html) and by Node (tools/build-course.mjs).
// Edit here, then re-run:  node tools/build-course.mjs

export const COURSE = {
  title: 'Ship a Roblox Game in 30 Days with Claude Code',
  subtitle: 'One lesson a day. A crew of Claude Code agents. A published game by Day 30.',
  caseStudy: 'Zapnauts',
  // TODO(derek): second case study — Angel Rift Town — once it ships.
  freeDays: [1],
  weeks: [
    { n: 1, title: 'Foundations', blurb: 'Tools, version control, Luau, and a scope you can actually finish.' },
    { n: 2, title: 'Core loop + agent crew', blurb: 'The agents that do the work, and a loop that plays start to finish.' },
    { n: 3, title: 'Content + world', blurb: 'Lore, levels, NPCs, quests, and a HUD that reads on a phone.' },
    { n: 4, title: 'Test + launch', blurb: 'Break it on purpose, balance it, make it fast, publish it.' },
  ],
};

export const LESSONS = [
  // ── Week 1 · Foundations ────────────────────────────────────────────────
  {
    day: 1, week: 1,
    title: 'Set up Roblox Studio and Claude Code',
    summary: 'Install both tools, point Claude Code at a real Studio project, and make a script you did not type change something you can see.',
    buildTask: 'Claude Code writes a script that turns a part a different colour when a player touches it. You run it in Studio and watch it work.',
    video: '',
  },
  {
    day: 2, week: 1,
    title: 'Rojo and Git: version control for Roblox',
    summary: 'Roblox keeps your game in a binary file, which Git cannot read. Rojo moves your code onto the filesystem where agents and Git can both reach it.',
    buildTask: 'A Rojo project that syncs to Studio, a Git repo with your first commit, and one round-trip edit made in your editor showing up live in Studio.',
    video: '',
  },
  {
    day: 3, week: 1,
    title: 'Luau in one sitting',
    summary: 'You already know how to code, so this is the delta: tables, typed Luau, services, events, and the handful of idioms that make Roblox code look like Roblox code.',
    buildTask: 'A typed module script with three functions and a test call, reviewed by Claude Code against the style you just learned.',
    video: '',
  },
  {
    day: 4, week: 1,
    title: 'The object model: where code actually lives',
    summary: 'Workspace, ReplicatedStorage, ServerScriptService, StarterPlayer. Put a script in the wrong one and it silently never runs, or worse, runs on the wrong machine.',
    buildTask: 'Map your game idea onto the hierarchy: what is server, what is client, what is shared. One diagram, committed.',
    video: '',
  },
  {
    day: 5, week: 1,
    title: 'Scope one core loop',
    summary: 'The single biggest reason indie games never ship is scope. Today you pick one verb and cut everything that does not serve it.',
    buildTask: 'Write your loop as one sentence a stranger could repeat back, then list everything you are deliberately not building.',
    video: '',
  },
  {
    day: 6, week: 1,
    title: 'Write the GDD your agents will read',
    summary: 'A game design doc written for an AI crew is different from one written for a publisher: concrete, testable, and short enough to fit in context.',
    buildTask: 'GDD.md covering the loop, controls, win and lose conditions, and a scope fence that says what is out.',
    video: '',
  },
  {
    day: 7, week: 1,
    title: 'Three-agent GDD critique, and your first ship check',
    summary: 'Three agents read your GDD with three different jobs: is it fun, is it in scope, is it technically sane. Disagreement between them is the useful part.',
    buildTask: 'Run all three critiques, revise the GDD, and publish an empty place to Roblox so the publish pipeline is proven on Day 7, not Day 30.',
    video: '',
  },

  // ── Week 2 · Core loop + agent crew ─────────────────────────────────────
  {
    day: 8, week: 2,
    title: 'CLAUDE.md: the memory your crew shares',
    summary: 'Every agent starts cold. CLAUDE.md is how your conventions, file map, and hard-won do-nots survive between sessions.',
    buildTask: 'A CLAUDE.md with your project layout, Luau conventions, and a running "do not do this again" list.',
    video: '',
  },
  {
    day: 9, week: 2,
    title: 'Build the agent crew',
    summary: 'One generalist agent gets you mush. Three specialists — builder, reviewer, tester — argue with each other and catch what a single pass misses.',
    buildTask: 'Three subagent definitions committed to the repo, each with its own brief and its own refusal conditions.',
    video: '',
  },
  {
    day: 10, week: 2,
    title: 'Movement that feels good',
    summary: 'Feel is the first thing a player judges and the hardest thing to specify. You will learn to describe it precisely enough that an agent can tune it.',
    buildTask: 'A tuned character controller plus a written feel checklist you can re-test after every change.',
    video: '',
  },
  {
    day: 11, week: 2,
    title: 'The core loop, end to end',
    summary: 'Today the game becomes a game: start, play, succeed or fail, go again. Ugly is fine. Incomplete is not.',
    buildTask: 'Your loop playable from first click to repeat, with placeholder art and no polish whatsoever.',
    video: '',
  },
  {
    day: 12, week: 2,
    title: 'RemoteEvents without getting exploited',
    summary: 'Roblox exploiters are not hypothetical. Anything the client sends is a suggestion, and the server decides what is true.',
    buildTask: 'One player action made fully server-authoritative, with validation, rate limiting, and an agent review that tries to bypass it.',
    video: '',
  },
  {
    day: 13, week: 2,
    title: 'DataStores: saving player progress',
    summary: 'Losing player data is the fastest way to lose players. Session locking, retries, and what to do when Roblox is having a bad day.',
    buildTask: 'Progress that survives a rejoin, with a session lock and a tested failure path.',
    video: '',
  },
  {
    day: 14, week: 2,
    title: 'Ship check: week two',
    summary: 'A short, honest playtest against the GDD. The point is not to feel good, it is to find the three things that are wrong.',
    buildTask: 'Publish to a private place, play for ten minutes, write down three fixes, make them, tag the commit.',
    video: '',
  },

  // ── Week 3 · Content + world ────────────────────────────────────────────
  {
    day: 15, week: 3,
    title: 'The lore file',
    summary: 'A lore file is not flavour text, it is a constraint document. It is what keeps five agents from inventing five different worlds.',
    buildTask: 'lore.md with your world rules, factions, naming conventions, and the tone of voice every piece of copy must match.',
    video: '',
  },
  {
    day: 16, week: 3,
    title: 'Constrained level generation',
    summary: 'Unconstrained generation produces slop. You will write a spec tight enough that generated levels are playable and loose enough that they surprise you.',
    buildTask: 'One level built from a constraint spec, plus the spec itself so the next ten levels cost minutes.',
    video: '',
  },
  {
    day: 17, week: 3,
    title: 'NPCs as state machines',
    summary: 'An NPC is a small, legible state machine. Keep it legible and you can debug it; let an agent improvise and you cannot.',
    buildTask: 'One NPC with idle, alert, chase, and reset states, each visibly distinct to the player.',
    video: '',
  },
  {
    day: 18, week: 3,
    title: 'Quests that come out of the lore',
    summary: 'Generated quests feel hollow when they float free of the world. Anchoring them to the lore file is what makes them land.',
    buildTask: 'Three quests that each reference something in lore.md, with real completion checks and rewards.',
    video: '',
  },
  {
    day: 19, week: 3,
    title: 'The style-guide agent',
    summary: 'By week three you have copy, names, colours, and UI made by different agents on different days. One agent now enforces consistency across all of it.',
    buildTask: 'A style guide plus an agent that reads the project and reports every violation of it.',
    video: '',
  },
  {
    day: 20, week: 3,
    title: 'UI and HUD that read on a phone',
    summary: 'Most Roblox players are on phones. A HUD that looks fine on your monitor can be unreadable and untappable on the device that matters.',
    buildTask: 'A HUD with health, score, and current objective, tested at phone size with thumb-sized tap targets.',
    video: '',
  },
  {
    day: 21, week: 3,
    title: 'Ship check: week three',
    summary: 'Put it in front of someone who has never seen it and say nothing. What confuses them is your real backlog.',
    buildTask: 'One playtest with a real person, a written log of every moment they hesitated, and fixes for the top three.',
    video: '',
  },

  // ── Week 4 · Test + launch ──────────────────────────────────────────────
  {
    day: 22, week: 4,
    title: 'The adversarial QA agent',
    summary: 'A QA agent whose only job is to break your game will find things you never thought to try, because it is not emotionally invested in it working.',
    buildTask: 'A QA agent with a written attack brief, run against your build, producing a triaged bug list.',
    video: '',
  },
  {
    day: 23, week: 4,
    title: 'Balance by simulation, not by vibes',
    summary: 'You can guess at damage numbers and economy curves, or you can run ten thousand simulated runs and read the distribution.',
    buildTask: 'A simulation script for your core numbers, and one balance change you made because the output told you to.',
    video: '',
  },
  {
    day: 24, week: 4,
    title: 'Mobile performance',
    summary: 'Frame budget on a mid-range phone is the real constraint. Profiling first, cutting second, guessing never.',
    buildTask: 'A profile before and after, with draw calls and part count cut until you hold your frame budget on a phone.',
    video: '',
  },
  {
    day: 25, week: 4,
    title: 'Game passes and developer products',
    summary: 'How Roblox monetisation actually works, what players accept, and what gets you a reputation you cannot undo.',
    buildTask: 'One game pass created, wired, and tested end to end in Studio, including the already-owned path.',
    video: '',
  },
  {
    day: 26, week: 4,
    title: 'Roblox policy and compliance',
    summary: 'Roblox moderates text, assets, and monetisation, and a large share of your players are minors. Getting this wrong takes the game down.',
    buildTask: 'A policy pass over every string, asset, and purchase flow in the game, with an agent checking against the current rules.',
    video: '',
  },
  {
    day: 27, week: 4,
    title: 'The store page',
    summary: 'Icon, thumbnails, title, description. This is the only thing most players will ever see before deciding, and it is usually an afterthought.',
    buildTask: 'Icon and thumbnails uploaded, description written and tested on the Roblox mobile app layout.',
    video: '',
  },
  {
    day: 28, week: 4,
    title: 'Publish',
    summary: 'Flip the game public, play it on your own phone like a stranger would, and fix what launch day exposes.',
    buildTask: 'The game live and public, played start to finish on a phone, with launch-day bugs fixed the same day.',
    video: '',
  },
  {
    day: 29, week: 4,
    title: 'Launch marketing that is not spam',
    summary: 'A devlog clip showing something genuinely interesting beats ten posts asking people to play your game.',
    buildTask: 'One short clip of the most interesting thing in your game, and one honest post about building it.',
    video: '',
  },
  {
    day: 30, week: 4,
    title: 'Demo day and what comes next',
    summary: 'You show the thing. Then you write the retro while it is fresh: what the agent crew did well, where it wasted your time, what you would change.',
    buildTask: 'Demo your published game, write the retro, and pick the one change that makes version two better.',
    video: '',
  },
];

export const lessonFor = (day) => LESSONS.find((l) => l.day === Number(day));
export const isFree = (day) => COURSE.freeDays.includes(Number(day));
