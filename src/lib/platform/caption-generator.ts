/**
 * Deterministic, template-based caption "suggestions" — a stand-in for a
 * real AI captioning backend. Combines a hook, the given topic, a closer,
 * and a hashtag cluster derived from the creator's niches + topic words.
 */
const HOOKS = [
  (topic: string) => `okay but why did nobody tell me about ${topic.toLowerCase()} sooner`,
  (topic: string) => `the honest truth about ${topic.toLowerCase()} 👇`,
  (topic: string) => `POV: you finally tried ${topic.toLowerCase()}`,
  (topic: string) => `not me obsessing over ${topic.toLowerCase()} again`,
  (topic: string) => `${topic} — unfiltered thoughts`,
  (topic: string) => `tell me why ${topic.toLowerCase()} lived in my head rent free this week`,
];

const CLOSERS = [
  "Saving this one for later, trust me.",
  "Let me know if you want the full breakdown.",
  "This is your sign to just try it.",
  "No sponsor made me say that, I just mean it.",
  "Drop a 🤍 if you're adding this to your list.",
  "Follow for more of these — I post weekly.",
];

const NICHE_HASHTAGS: Record<string, string[]> = {
  Beauty: ["#skincare", "#beautytok", "#cleanbeauty", "#getreadywithme"],
  Lifestyle: ["#dayinmylife", "#slowliving", "#lifestylecontent", "#aestheticlife"],
  Fashion: ["#ootd", "#styleinspo", "#fashiontok", "#outfitideas"],
  UGC: ["#ugccreator", "#contentcreator", "#brandpartner", "#ugccommunity"],
};

function wordsFrom(topic: string): string[] {
  return topic
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 3)
    .slice(0, 2)
    .map((w) => `#${w}`);
}

function pickN<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  const picked: T[] = [];
  for (let i = 0; i < n && copy.length > 0; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    picked.push(copy.splice(idx, 1)[0]);
  }
  return picked;
}

export function generateCaptionSuggestions(topic: string, niches: string[] = []): string[] {
  const safeTopic = topic.trim() || "this";
  const hooks = pickN(HOOKS, 3);
  const closers = pickN(CLOSERS, 3);

  const hashtagPool = niches.flatMap((n) => NICHE_HASHTAGS[n] ?? []).concat(wordsFrom(safeTopic));
  const hashtags = Array.from(new Set(hashtagPool.length ? hashtagPool : ["#contentcreator"]));

  return hooks.map((hook, i) => {
    const tags = pickN(hashtags, Math.min(3, hashtags.length)).join(" ");
    return `${hook(safeTopic)}\n\n${closers[i]}\n\n${tags}`;
  });
}
