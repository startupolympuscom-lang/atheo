const BRAND_REPLIES = [
  "Thanks for the update — this looks great so far!",
  "Perfect, keep us posted on timing.",
  "Love it! Could you tag our handle in the caption too?",
  "Appreciate the quick turnaround on this one.",
  "That works for us — go ahead and post whenever you're ready.",
  "Looking good! One small note: could you mention the new packaging?",
  "This is exactly the tone we were hoping for.",
  "Great question — yes, feel free to post it as-is.",
];

export function generateBrandReply(): string {
  return BRAND_REPLIES[Math.floor(Math.random() * BRAND_REPLIES.length)];
}
