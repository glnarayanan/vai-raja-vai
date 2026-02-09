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
      {
        id: 'ambush_myth_ug3',
        trigger: "Reddy's wife just showed me a photo of you boys at some... interesting establishment. Care to comment?",
        responses: [
          { id: 'reframe', text: "That's the temple guest house! The lighting makes everything look like a nightclub.", option: 'REFRAME' },
          { id: 'double_down', text: "Show me the photo. I guarantee it's from some other trip entirely.", option: 'DOUBLE_DOWN' },
          { id: 'deflect', text: "Since when is Mrs. Reddy investigating us? She should look into her own husband's browser history.", option: 'DEFLECT' },
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
      {
        id: 'ambush_amm_ug2',
        trigger: "Ayyappan keeps checking his phone and whispering. He does this when he's hiding something from me. What did you boys do?",
        responses: [
          { id: 'reframe', text: "He's planning a surprise anniversary gift for you! I shouldn't have said that.", option: 'REFRAME' },
          { id: 'double_down', text: "He's checking cricket scores. India is playing. Very tense match.", option: 'DOUBLE_DOWN' },
          { id: 'deflect', text: "Ammini, all husbands check their phones! It's a disease. Not a conspiracy.", option: 'DEFLECT' },
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
      {
        id: 'ambush_cham_ug2',
        trigger: "Hegde says yes to everything I ask about Bangalore. 'Did you go to a bar?' Yes. 'Did you visit temples?' Also yes. Make it make sense, Ram.",
        responses: [
          { id: 'reframe', text: "Hegde is a people-pleaser! He probably agreed before even hearing the question.", option: 'REFRAME' },
          { id: 'double_down', text: "Both are true! We went to the temple AND had juice at a café. Bangalore has both.", option: 'DOUBLE_DOWN' },
          { id: 'deflect', text: "That's just Hegde being Hegde. The man would agree if you said the sky is green.", option: 'DEFLECT' },
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
      {
        id: 'ambush_jan_ug2',
        trigger: "Vedham came back 2 kilos heavier and with a tan. From a temple trip? In three days?",
        responses: [
          { id: 'reframe', text: "Temple prasadam is very rich! And we walked a lot under the Bangalore sun.", option: 'REFRAME' },
          { id: 'double_down', text: "Vedham has been eating well. That's a sign of a happy trip. Be glad he enjoyed himself!", option: 'DOUBLE_DOWN' },
          { id: 'deflect', text: "Janaki, you should be happy he came back healthy! Some trips take a lot out of you.", option: 'DEFLECT' },
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
      {
        id: 'ambush_reddy_ug2',
        trigger: "Reddy spent Rs. 15,000 in Bangalore. On a 'temple trip.' The ATM receipts don't lie, Ram.",
        responses: [
          { id: 'reframe', text: "Temple donations! We donated at every temple. Very generous of Reddy, actually.", option: 'REFRAME' },
          { id: 'double_down', text: "Bangalore is expensive! Autos alone cost a fortune. And the hotel wasn't cheap.", option: 'DOUBLE_DOWN' },
          { id: 'deflect', text: "Mrs. Reddy, Reddy's finances are between you and him. I'm not his accountant!", option: 'DEFLECT' },
        ],
      },
    ],
  },

  // Scene 3 (THE_CONFRONTATION) — cross-referencing, traps, direct challenges
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
      {
        id: 'ambush_myth_conf3',
        trigger: "I'm going to count to three. If you don't tell me the truth, I'm calling my mother. One...",
        responses: [
          { id: 'reframe', text: "Mythili, I've been telling the truth! What more do you want me to say?", option: 'REFRAME' },
          { id: 'double_down', text: "Call her! I have nothing to hide! I'll tell her the same things I told you!", option: 'DOUBLE_DOWN' },
          { id: 'deflect', text: "Your mother? At this hour? Let's not escalate this. Let me get you some water.", option: 'DEFLECT' },
        ],
      },
    ],
    wife_ammini: [
      {
        id: 'ambush_amm_conf1',
        trigger: "You told me 'nice lobby but basic rooms.' But you told Mythili it was a simple lodge. Which is it?",
        responses: [
          { id: 'reframe', text: "It's the same place! I was being modest with Mythili, that's all.", option: 'REFRAME' },
          { id: 'double_down', text: "I said the same thing to both. A simple lodge with a decent lobby. That's it.", option: 'DOUBLE_DOWN' },
          { id: 'deflect', text: "Does it really matter what the hotel looked like? The trip was about friendship!", option: 'DEFLECT' },
        ],
      },
      {
        id: 'ambush_amm_conf2',
        trigger: "Ayyappan just told me he spent the trip 'babysitting Ram.' What does that mean?",
        responses: [
          { id: 'reframe', text: "I got food poisoning from street food! Ayyappan was being dramatic about nursing me.", option: 'REFRAME' },
          { id: 'double_down', text: "It means I got lost in the market once. Ayyappan found me. He thinks he's a hero now.", option: 'DOUBLE_DOWN' },
          { id: 'deflect', text: "Ayyappan calls everything 'babysitting.' He once said he was 'babysitting' his own car.", option: 'DEFLECT' },
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
      {
        id: 'ambush_cham_conf2',
        trigger: "Hegde wakes up screaming 'THE BODY! THE BODY!' What body, Ram?",
        responses: [
          { id: 'reframe', text: "He's been watching that murder mystery series! 'The Body' on Netflix? Very scary.", option: 'REFRAME' },
          { id: 'double_down', text: "Hegde has always had weird dreams. Last month he dreamt he was a samosa. Ask Chamundi.", option: 'DOUBLE_DOWN' },
          { id: 'deflect', text: "Chamundi, maybe he should see a doctor? Sleep disturbances are very common at his age.", option: 'DEFLECT' },
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
      {
        id: 'ambush_jan_conf2',
        trigger: "Vedham just fainted. Again. He only faints when he's extremely guilty. WHAT HAPPENED IN BANGALORE?",
        responses: [
          { id: 'reframe', text: "It's his blood sugar! He skipped lunch again. Someone get him a glucose biscuit!", option: 'REFRAME' },
          { id: 'double_down', text: "The party is overwhelming him. Too many people, too much noise. He needs fresh air.", option: 'DOUBLE_DOWN' },
          { id: 'deflect', text: "Janaki, focus on reviving your husband! We can discuss Bangalore later!", option: 'DEFLECT' },
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
      {
        id: 'ambush_reddy_conf2',
        trigger: "Reddy muttered 'Maragadham' in his sleep again. That's not a restaurant. That's a gemstone. EXPLAIN.",
        responses: [
          { id: 'reframe', text: "Maragadham is also a woman's name! It's a character from a movie Reddy watched.", option: 'REFRAME' },
          { id: 'double_down', text: "Reddy talks nonsense in his sleep! Last week he said 'chicken biryani' twenty times.", option: 'DOUBLE_DOWN' },
          { id: 'deflect', text: "Mrs. Reddy, recording your husband's sleep-talking is... an interesting hobby.", option: 'DEFLECT' },
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
