/* Sample content + matching criteria — replace freely. Seeds the app offline. */
export const TONES = {
  garnet: { bg: "#6E2438", fg: "#F6E7E1" },
  plum:   { bg: "#3A2233", fg: "#EFD9E0" },
  brass:  { bg: "#A9824B", fg: "#231A12" },
  rose:   { bg: "#EAD9D2", fg: "#6E2438" },
  ink:    { bg: "#241A24", fg: "#E9D9D2" },
};

export const MENTORS = [
  {
    id: "rachel", mono: "RS", tone: "garnet",
    name: "Rachel Stein", role: "Corporate Associate", org: "Litigation & finance practice",
    field: "Law", fieldKey: "law", city: "New York, NY", edu: "NYU School of Law", years: 7,
    helps: ["Law school", "Interview prep", "Shabbos in corporate work", "First job"],
    bestFor: "College women weighing law school against the billable-hour life.",
    avail: ["Two calls a month", "Open to long-term"], availKeys: ["long"],
    wish: "The firm will always ask for more hours. Deciding your limits before you walk in is the whole game.",
  },
  {
    id: "shira", mono: "ST", tone: "plum",
    name: "Dr. Shira Tendler", role: "Pediatrician", org: "Hospital & private practice",
    field: "Medicine", fieldKey: "medicine", city: "Baltimore, MD", edu: "Einstein College of Medicine", years: 11,
    helps: ["Med school", "Career exploration", "Balancing frum life & career"],
    bestFor: "Seminary and college women wondering whether medicine and a growing family can share a life.",
    avail: ["One call a month", "Open to one-time calls"], availKeys: ["once"],
    wish: "Residency is a season, not your life. Choose a specialty for the decade after, not the three years inside it.",
  },
  {
    id: "esti", mono: "EB", tone: "brass",
    name: "Esti Brizel", role: "Software Engineer", org: "Fintech",
    field: "Tech", fieldKey: "tech", city: "Jerusalem", edu: "Machon Tal", years: 6,
    helps: ["Career exploration", "First job", "Resume help", "Interview prep"],
    bestFor: "Women teaching themselves to code who aren't sure it's 'real' yet.",
    avail: ["Group mentorship", "Open to one-time calls"], availKeys: ["once", "group"],
    wish: "Nobody feels qualified at the start. The ones who make it just keep shipping anyway.",
  },
  {
    id: "devorah", mono: "DK", tone: "rose",
    name: "Devorah Klein", role: "Founder", org: "Kosher meal-prep brand",
    field: "Business", fieldKey: "business", city: "Lakewood, NJ", edu: "Built it at the kitchen table", years: 9,
    helps: ["Starting a business", "Confidence", "Networking"],
    bestFor: "Women with a side-parnasa idea and a full house.",
    avail: ["Two calls a month", "Open to long-term"], availKeys: ["long"],
    wish: "Start before it's ready. The plan you write at the kitchen table will be wrong, and that's completely fine.",
  },
  {
    id: "miriam", mono: "MF", tone: "ink",
    name: "Miriam Frankel", role: "CPA, Audit Manager", org: "Public accounting",
    field: "Finance", fieldKey: "finance", city: "Cedarhurst, NY", edu: "Touro College", years: 8,
    helps: ["Resume help", "Grad school", "First job", "Career change"],
    bestFor: "Women who like order and want a stable, portable career.",
    avail: ["One call a month"], availKeys: [],
    wish: "Accounting is a key that opens many doors — you don't have to stay in the first room it lets you into.",
  },
  {
    id: "chavi", mono: "CR", tone: "plum",
    name: "Chavi Rosenberg", role: "Product Designer", org: "SaaS company",
    field: "Design", fieldKey: "design", city: "Teaneck, NJ", edu: "Self-taught, then Shillington", years: 5,
    helps: ["Career exploration", "Portfolio review", "First job", "Confidence"],
    bestFor: "Creative women who were told design isn't a parnasa.",
    avail: ["Open to one-time calls", "Group mentorship"], availKeys: ["once", "group"],
    wish: "Taste is the job. You build it by paying close attention to everything you already love.",
  },
  {
    id: "adina", mono: "AW", tone: "garnet",
    name: "Adina Weiss", role: "Clinical Psychologist", org: "Group practice",
    field: "Therapy", fieldKey: "therapy", city: "Monsey, NY", edu: "Ferkauf, Yeshiva University", years: 13,
    helps: ["Grad school", "Career exploration", "Balancing frum life & career"],
    bestFor: "Women drawn to the helping fields who worry about the years of training.",
    avail: ["One call a month", "Open to long-term"], availKeys: ["long"],
    wish: "The long training is real. So is the meaning. Walk in with both eyes open and you won't regret it.",
  },
  {
    id: "bracha", mono: "BN", tone: "brass",
    name: "Bracha Newman", role: "Brand Director", org: "Consumer goods",
    field: "Marketing", fieldKey: "marketing", city: "Cleveland, OH", edu: "Returned to work after years at home", years: 10,
    helps: ["Networking", "Career change", "Resume help", "Confidence"],
    bestFor: "Women re-entering the workforce after years building a home.",
    avail: ["Two calls a month"], availKeys: [],
    wish: "Your years at home built skills the resume has no box for. The work is learning to name them out loud.",
  },
  {
    id: "yael", mono: "YS", tone: "rose",
    name: "Yael Schwartz", role: "Physician Assistant", org: "Cardiology",
    field: "Medicine", fieldKey: "medicine", city: "Passaic, NJ", edu: "Touro PA Program", years: 4,
    helps: ["Paths into medicine", "First job", "Career exploration"],
    bestFor: "Women who want medicine without the residency decade.",
    avail: ["Open to one-time calls", "Group mentorship"], availKeys: ["once", "group"],
    wish: "There are ten ways into medicine. The MD is only the loudest one — don't let it be the only one you see.",
  },
];

export const STORIES = [
  { id: "p1", mentor: "rachel", title: "How I became a frum woman in corporate law",
    ex: "Nobody at the firm had ever left early on a Friday. Here's how I had the conversation in my first month — and why it went better than I feared." },
  { id: "p2", mentor: "esti", title: "What I wish I knew before engineering school",
    ex: "The math was never the hard part. The hard part was believing I belonged in the room. A letter to the girl deciding right now." },
  { id: "p3", mentor: "yael", title: "Handling the first Yom Tov in a new job",
    ex: "Three days off in your second week feels impossible to ask for. A simple script, and what to do when the answer is complicated." },
  { id: "p4", mentor: "shira", title: "From seminary to medical school",
    ex: "I took the long road — a gap, a post-bacc, and a lot of second-guessing. What I'd tell my eighteen-year-old self if I could." },
  { id: "p5", mentor: "devorah", title: "Building a business while building a home",
    ex: "There is no balance, only seasons. How I ran a growing brand from a kitchen with four kids underfoot, and what I'd skip next time." },
];

/* The cohort feed — short posts from the women in your cohort.
   Twitter-style threads. Reactions are "Mazel tov" and "Chazak", not likes. */
export const FEED = [
  { id: "f1", who: "Naomi Gold", handle: "@naomig", mono: "NG", tone: "rose", role: "PA Student", city: "Passaic",
    kind: "milestone", tag: "Got in", when: "2h",
    text: "Accepted to the Touro PA program!! Two years of second-guessing whether I belonged. To the girl who thinks it's too late — it isn't.",
    mazel: 47, chazak: 9, replies: [
      { who: "Rachel Stein", handle: "@rstein", mono: "RS", tone: "garnet", when: "1h", text: "MAZEL TOV Naomi!! Cried a little reading this 🥹" },
      { who: "Leah Brody", handle: "@leahb", mono: "LB", tone: "ink", when: "1h", text: "ok this is the sign I needed today. starting my application tonight." },
      { who: "Yael Schwartz", handle: "@yaels", mono: "YS", tone: "rose", when: "44m", text: "Touro PA is amazing. DM me before orientation, I have notes 📓" },
    ] },
  { id: "f2", who: "Esti Brizel", handle: "@estib", mono: "EB", tone: "brass", role: "Software Engineer", city: "Jerusalem",
    kind: "milestone", tag: "First job", when: "5h",
    text: "Signed my first engineering offer 🎉 Eighteen months ago I was teaching myself loops on my phone after the kids were asleep. Keep shipping.",
    mazel: 64, chazak: 14, replies: [
      { who: "Devorah Klein", handle: "@devk", mono: "DK", tone: "plum", when: "4h", text: "From your phone after bedtime to an offer. Bookmarking this for every woman who tells me she 'started too late.'" },
    ] },
  { id: "f3", who: "Leah Brody", handle: "@leahb", mono: "LB", tone: "ink", role: "Seminary · Pre-med", city: "Monsey",
    kind: "post", when: "8h",
    text: "studying for the MCAT and questioning all my life choices. someone tell me the 3am flashcards are worth it 😅",
    mazel: 12, chazak: 28, replies: [
      { who: "Dr. Shira Tendler", handle: "@drshira", mono: "ST", tone: "garnet", when: "7h", text: "They are. The 3am you is building the doctor a frum family will be lucky to have. One card at a time. חזק." },
      { who: "Naomi Gold", handle: "@naomig", mono: "NG", tone: "rose", when: "6h", text: "in it with you 🤝 anki study group this week?" },
    ] },
  { id: "f4", who: "Rachel Stein", handle: "@rstein", mono: "RS", tone: "garnet", role: "Corporate Associate", city: "New York",
    kind: "post", when: "1d",
    text: "Friendly reminder to my cohort: your limits are not a weakness to apologize for. I leave at 3:30 on Fridays and the work still gets done. Decide your lines before someone else draws them.",
    mazel: 38, chazak: 21, replies: [] },
  { id: "f5", who: "Devorah Klein", handle: "@devk", mono: "DK", tone: "plum", role: "Founder", city: "Lakewood",
    kind: "post", when: "1d",
    text: "A mentee asked how I 'found the confidence' to start. I didn't. I started without it and the confidence showed up later, a little behind me, out of breath. Start anyway.",
    mazel: 52, chazak: 18, replies: [] },
  { id: "f6", who: "Yael Schwartz", handle: "@yaels", mono: "YS", tone: "rose", role: "Physician Assistant", city: "Passaic",
    kind: "milestone", tag: "One year", when: "2d",
    text: "One year on the cardiology floor today. The first Yom Tov I asked off felt impossible. The fourth one felt normal. It gets easier — promise.",
    mazel: 41, chazak: 11, replies: [] },
];

/* The women in your cohort (shown as the 'get to know your cohort' strip). */
export const COHORT = [
  { name: "Tova Klein", mono: "TK", tone: "rose" }, { name: "Naomi Gold", mono: "NG", tone: "rose" },
  { name: "Leah Brody", mono: "LB", tone: "ink" }, { name: "Esti Brizel", mono: "EB", tone: "brass" },
  { name: "Yael Schwartz", mono: "YS", tone: "rose" }, { name: "Rachel Stein", mono: "RS", tone: "garnet" },
  { name: "Devorah Klein", mono: "DK", tone: "plum" }, { name: "Shira Tendler", mono: "ST", tone: "garnet" },
  { name: "Sara Feldman", mono: "SF", tone: "brass" }, { name: "Miriam Adler", mono: "MA", tone: "ink" },
];

/* Mentor-controlled visibility. members/private hide the name in previews. */
export const MENTOR_VIS = { rachel: "public", shira: "members", esti: "public", devorah: "public",
  miriam: "public", chavi: "public", adina: "members", bracha: "public", yael: "public" };
export const VIS_COPY = {
  public:  { t: "Public preview", d: "Field, bio, and tags appear on the public site. Name shown." },
  members: { t: "Members only", d: "Approved members see your profile. Name shared after a match." },
  private: { t: "Private", d: "Not listed anywhere. The team matches you behind the scenes." },
};

export const PATH = [
  { t: "You join by application", d: "A curated network, not an open directory." },
  { t: "You say who you are", d: "Your field, your stage, your community, your goals." },
  { t: "You read mentor previews", d: "Field, path, and what she can help with — names stay private." },
  { t: "You choose up to three", d: "The women you'd most like to learn from, and why." },
  { t: "The team makes the match", d: "Weighed by fit, stage, observance, and her capacity." },
  { t: "Now it's you and her", d: "Her full profile opens. No one else is shopping for her." },
  { t: "You schedule the first call", d: "Her real availability — no WhatsApp tag." },
  { t: "You grow in the community", d: "A feed of women a few steps ahead of you." },
  { t: "One day, you mentor someone", d: "The reason any of this exists." },
];

export const FIELD_FILTERS = [
  { k: "all", label: "All fields" },
  { k: "law", label: "Law" },
  { k: "medicine", label: "Medicine" },
  { k: "tech", label: "Tech" },
  { k: "business", label: "Business" },
  { k: "finance", label: "Finance" },
  { k: "design", label: "Design" },
  { k: "therapy", label: "Therapy" },
  { k: "marketing", label: "Marketing" },
];

export const SLOTS = [
  { id: "s1", day: "Sunday", date: "July 6", time: "8:30 PM ET" },
  { id: "s2", day: "Tuesday", date: "July 8", time: "1:00 PM ET" },
  { id: "s3", day: "Wednesday", date: "July 9", time: "9:00 PM ET" },
  { id: "s4", day: "Sunday", date: "July 13", time: "8:00 PM ET" },
];

export const APPLICATIONS = [
  { id: "a1", name: "Tova Klein", role: "Mentee", detail: "College · exploring law", status: "new" },
  { id: "a2", name: "Adina Weiss", role: "Mentor", detail: "Clinical Psychologist · 13 yrs", status: "ok" },
  { id: "a3", name: "Leah Brody", role: "Mentee", detail: "Seminary · pre-med", status: "new" },
  { id: "a4", name: "Bracha Newman", role: "Mentor", detail: "Brand Director · re-entry", status: "hold" },
  { id: "a5", name: "Naomi Gold", role: "Both", detail: "PA student · also mentors HS girls", status: "new" },
];

export const HELP_OPTIONS = [
  "Explore a field", "Resume feedback", "Interview prep", "Choosing a major",
  "Internships", "Grad / professional school", "Frum life at work", "Confidence",
  "Starting a business", "Career change",
];

/* Matching criteria — both mentors and mentees provide these at signup. */
export const FIELDS = ["Law", "Medicine", "Tech", "Business", "Finance", "Education", "Psychology", "Nonprofit", "Creative", "Entrepreneurship"];
export const STAGES = ["High school", "Seminary", "College", "Early career", "Career switch", "Returning to work"];
export const EXPERIENCE = ["1–3 years", "4–7 years", "8–14 years", "15+ years"];
export const OBSERVANCE = ["Yeshivish", "Chassidish", "Modern Orthodox", "Sephardi", "Baalas teshuva", "Prefer not to say"];
export const AVAIL_PREF = ["One-time call", "Ongoing mentorship", "Group sessions", "Flexible"];

/* ----------------------------- ICONS ----------------------------- */
