/**
 * Wife ambush dialogue templates.
 * Each ambush has a trigger line (wife's question) and 3 unlabeled response options.
 * Placeholders like {claim} and {conflicting_claim} are filled from the fact ledger.
 */

export const ambushTemplates = {
  // Scene 2 (UGADI_PARTY) — vague, probing questions
  UGADI_PARTY: {
    wife_mythili: [
      {
        id: 'ambush_myth_ug1',
        trigger: "Ram, I was just talking to Ammini. Something doesn't add up about what you said earlier...",
        responses: [
          { id: 'reframe', text: "Oh, you know how it is — memories get fuzzy after a long trip.", option: 'REFRAME' },
          { id: 'double_down', text: "Everything I said was absolutely true. What exactly are you questioning?", option: 'DOUBLE_DOWN' },
          { id: 'deflect', text: "Mythili, have you tried the payasam? It's incredible!", option: 'DEFLECT' },
        ],
      },
      {
        id: 'ambush_myth_ug2',
        trigger: "Your friend Ayyappan told me a very interesting story just now. Want to guess what it was?",
        responses: [
          { id: 'reframe', text: "Ayyappan tells ten stories a day. Most of them are about his mother's cooking.", option: 'REFRAME' },
          { id: 'double_down', text: "I'm sure whatever he said matches what I told you. We were together the whole time.", option: 'DOUBLE_DOWN' },
          { id: 'deflect', text: "Interesting? Was it the one about the bus driver in Mysore? Classic Ayyappan.", option: 'DEFLECT' },
        ],
      },
    ],
    wife_ammini: [
      {
        id: 'ambush_amm_ug1',
        trigger: "Ram, Ayyappan never mentioned any temples. He said you all were mostly in the hotel room.",
        responses: [
          { id: 'reframe', text: "The hotel had a small prayer room. That's what Ayyappan means by 'hotel room.'", option: 'REFRAME' },
          { id: 'double_down', text: "Ayyappan wasn't feeling well one day. He stayed back while we went to the temple.", option: 'DOUBLE_DOWN' },
          { id: 'deflect', text: "Ammini, I think Ayyappan is already two drinks in. Don't take him seriously!", option: 'DEFLECT' },
        ],
      },
    ],
    wife_chamundi: [
      {
        id: 'ambush_cham_ug1',
        trigger: "Hegde called me from Bangalore and said you all went to some 'Paradise.' That's not a temple, is it?",
        responses: [
          { id: 'reframe', text: "Paradise is a famous vegetarian restaurant chain! Very spiritual ambiance, actually.", option: 'REFRAME' },
          { id: 'double_down', text: "We absolutely went to the temple first. Paradise was just lunch afterwards.", option: 'DOUBLE_DOWN' },
          { id: 'deflect', text: "Chamundi, your biryani is better than anything we had in Bangalore. Tell me your secret!", option: 'DEFLECT' },
        ],
      },
    ],
    wife_janaki: [
      {
        id: 'ambush_jan_ug1',
        trigger: "Vedham told me you all went to bed at 10. But I called at midnight and nobody answered...",
        responses: [
          { id: 'reframe', text: "We were exhausted from the temple visits. Phones were on silent — very deep sleep.", option: 'REFRAME' },
          { id: 'double_down', text: "We were definitely asleep. I can't control whether Vedham charges his phone.", option: 'DOUBLE_DOWN' },
          { id: 'deflect', text: "Janaki, you should have called in the morning! We were all up by 5 for puja.", option: 'DEFLECT' },
        ],
      },
    ],
    wife_mrs_reddy: [
      {
        id: 'ambush_reddy_ug1',
        trigger: "I found two movie tickets in Reddy's jacket. Dated the night you were all 'at the temple.'",
        responses: [
          { id: 'reframe', text: "Those must be from a previous trip. We didn't go to any movies!", option: 'REFRAME' },
          { id: 'double_down', text: "Movie tickets? Must be Reddy's. He slipped away one evening, said he had a headache.", option: 'DOUBLE_DOWN' },
          { id: 'deflect', text: "Mrs. Reddy, these samosas are divine! You must give Mythili the recipe.", option: 'DEFLECT' },
        ],
      },
    ],
  },

  // Scene 3 (THE_CONFRONTATION) — cross-referencing, traps
  THE_CONFRONTATION: {
    wife_mythili: [
      {
        id: 'ambush_myth_conf1',
        trigger: "I asked all four wives separately. Four completely different stories, Ram. FOUR.",
        responses: [
          { id: 'reframe', text: "Five friends, five perspectives. That's perfectly normal — ask any psychologist!", option: 'REFRAME' },
          { id: 'double_down', text: "The core facts are the same. People just remember details differently.", option: 'DOUBLE_DOWN' },
          { id: 'deflect', text: "You know what, Mythili? Let's sit down tomorrow and I'll tell you everything. Calmly.", option: 'DEFLECT' },
        ],
      },
      {
        id: 'ambush_myth_conf2',
        trigger: "Ram. I already know about the diamonds. I'm giving you one chance to come clean.",
        responses: [
          { id: 'reframe', text: "Diamonds? You've been watching too many Tamil movies, Mythili. This isn't Baasha.", option: 'REFRAME' },
          { id: 'double_down', text: "I have absolutely no idea what you're talking about. Who told you this?", option: 'DOUBLE_DOWN' },
          { id: 'deflect', text: "Mythili, I love you. Whatever you've heard, trust me. I'll explain everything.", option: 'DEFLECT' },
        ],
      },
    ],
    wife_ammini: [
      {
        id: 'ambush_amm_conf1',
        trigger: "Ammini says you told her 'nice lobby but basic rooms.' But you told Mythili it was a simple lodge. Which is it?",
        responses: [
          { id: 'reframe', text: "It's the same place! I was being modest with Mythili, that's all.", option: 'REFRAME' },
          { id: 'double_down', text: "I said the same thing to both. A simple lodge with a decent lobby. That's it.", option: 'DOUBLE_DOWN' },
          { id: 'deflect', text: "Does it really matter what the hotel looked like? The trip was about friendship!", option: 'DEFLECT' },
        ],
      },
    ],
    wife_chamundi: [
      {
        id: 'ambush_cham_conf1',
        trigger: "Chamundi says Hegde hasn't been sleeping well since Bangalore. What happened there, Ram?",
        responses: [
          { id: 'reframe', text: "The food was quite spicy. Hegde has a sensitive stomach — must be affecting his sleep.", option: 'REFRAME' },
          { id: 'double_down', text: "Nothing happened! Hegde is just stressed about work. Ask him yourself.", option: 'DOUBLE_DOWN' },
          { id: 'deflect', text: "Poor Hegde. You should make him some warm milk with turmeric. Works every time!", option: 'DEFLECT' },
        ],
      },
    ],
    wife_janaki: [
      {
        id: 'ambush_jan_conf1',
        trigger: "Vedham whispered something to Janaki about 'Maggi.' She wants to know who Maggi is, Ram.",
        responses: [
          { id: 'reframe', text: "Maggi is a street food stall near the temple! Best dosas in Bangalore.", option: 'REFRAME' },
          { id: 'double_down', text: "Maggi is nobody. Vedham probably said 'magic.' As in, magic show at the temple festival.", option: 'DOUBLE_DOWN' },
          { id: 'deflect', text: "You know Vedham — always mumbling! He was probably saying 'Maggi noodles.'", option: 'DEFLECT' },
        ],
      },
    ],
    wife_mrs_reddy: [
      {
        id: 'ambush_reddy_conf1',
        trigger: "Mrs. Reddy found a receipt from 'Paradise Lounge' timestamped 2 AM. Temples close at 9 PM, Ram.",
        responses: [
          { id: 'reframe', text: "There's a 24-hour vegetarian Paradise restaurant too! Different establishment entirely.", option: 'REFRAME' },
          { id: 'double_down', text: "That receipt isn't ours. Must be from some previous trip of Reddy's.", option: 'DOUBLE_DOWN' },
          { id: 'deflect', text: "2 AM? That's clearly a printing error. You know how those billing machines are.", option: 'DEFLECT' },
        ],
      },
    ],
  },
};

/**
 * Get a random ambush dialogue for a given scene and wife.
 * Returns null if none available.
 */
export function getAmbushDialogue(sceneId, wifeId) {
  const sceneAmbushes = ambushTemplates[sceneId];
  if (!sceneAmbushes) return null;
  const wifeAmbushes = sceneAmbushes[wifeId];
  if (!wifeAmbushes || wifeAmbushes.length === 0) return null;
  return wifeAmbushes[Math.floor(Math.random() * wifeAmbushes.length)];
}
