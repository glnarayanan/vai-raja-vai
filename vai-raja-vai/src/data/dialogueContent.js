/**
 * Dialogue Content
 *
 * Complete dialogue trees for all 4 game scenes.
 *
 * Each dialogue node contains:
 *   id            - Unique identifier (format: scene_nnn)
 *   speaker       - NPC id who is speaking
 *   speakerName   - Display name
 *   text          - What the NPC says
 *   context       - (optional) Stage direction or internal monologue
 *   responses     - Array of player response options
 *
 * Each response contains:
 *   id            - Unique response id
 *   text          - What Ram says
 *   type          - SAFE | RISKY | DEFLECT | BOLD
 *   factCreated   - Fact object created by this choice (or null)
 *   suspicionChange - Object with per-wife suspicion deltas
 *   nextDialogueId - Id of the next dialogue node
 *   friendBlurtRisk - (optional) Whether this triggers a blurt check
 *   note          - (optional) Designer note for context
 */

// ═══════════════════════════════════════════════════════════════
// SCENE 1: THE RETURN
// Setting: Ram's home, evening. Ram has just returned from
// Bangalore. Mythili is waiting, arms crossed.
// Suspicion range: 0-20%
// NPCs: Mythili (primary), Ayyappan (briefly appears)
// ═══════════════════════════════════════════════════════════════

export const scene1_TheReturn = [
  {
    id: "return_001",
    speaker: "wife_mythili",
    speakerName: "Mythili",
    text: "You're back. Three days in Bangalore with 'the boys.' Must have been quite the spiritual journey.",
    context: "Mythili stands at the doorway, scanning Ram's face for tells. Her tone is polite but loaded.",
    responses: [
      {
        id: "return_001_a",
        text: "Very peaceful trip. We visited the Dharmasthala temple. Ayyappan even donated Rs. 500 to the hundi.",
        type: "SAFE",
        factCreated: {
          subject: "Bangalore Trip",
          statement: "Visited Dharmasthala temple",
          consistency_tags: ["location", "activity"],
          witnesses: ["wife_mythili"],
          timestamp: "day_1",
          location: "home"
        },
        suspicionChange: { wife_mythili: 2 },
        nextDialogueId: "return_002"
      },
      {
        id: "return_001_b",
        text: "Actually, it was more interesting than we planned. Bangalore has really changed, Mythili.",
        type: "RISKY",
        factCreated: {
          subject: "Bangalore Trip",
          statement: "Trip was eventful and interesting",
          consistency_tags: ["activity"],
          witnesses: ["wife_mythili"],
          timestamp: "day_1",
          location: "home"
        },
        suspicionChange: { wife_mythili: 8 },
        nextDialogueId: "return_002",
        note: "Vague answers raise Mythili's antenna. She'll probe harder."
      },
      {
        id: "return_001_c",
        text: "I'm exhausted, Mythili. Can I at least take off my shoes before the interrogation starts?",
        type: "DEFLECT",
        factCreated: null,
        suspicionChange: { wife_mythili: 5 },
        nextDialogueId: "return_002",
        note: "Delays the conversation but signals defensiveness."
      }
    ]
  },

  {
    id: "return_002",
    speaker: "wife_mythili",
    speakerName: "Mythili",
    text: "Where exactly did you stay? Ayyappan's wife Alice told me he mentioned some lodge on MG Road, but you told me it was a dharamshala near the temple.",
    context: "She already has intel. This is a test, not a question.",
    responses: [
      {
        id: "return_002_a",
        text: "The dharamshala was fully booked, so we moved to a simple lodge nearby. Very basic. Clean sheets, that's about it.",
        type: "SAFE",
        factCreated: {
          subject: "Bangalore Trip",
          statement: "Stayed at a simple lodge near temple after dharamshala was full",
          consistency_tags: ["location", "accommodation"],
          witnesses: ["wife_mythili"],
          timestamp: "day_1",
          location: "home"
        },
        suspicionChange: { wife_mythili: 3 },
        nextDialogueId: "return_003"
      },
      {
        id: "return_002_b",
        text: "MG Road lodge, yes. It was the closest place to the temple. Very convenient for morning prayers.",
        type: "RISKY",
        factCreated: {
          subject: "Bangalore Trip",
          statement: "Stayed at MG Road lodge, close to temple",
          consistency_tags: ["location", "accommodation"],
          witnesses: ["wife_mythili"],
          timestamp: "day_1",
          location: "home"
        },
        suspicionChange: { wife_mythili: 5 },
        nextDialogueId: "return_003",
        note: "Aligns with what Alice heard from Ayyappan but raises question about why MG Road is near a temple."
      },
      {
        id: "return_002_c",
        text: "Since when do you and Alice compare notes on our trips? What is this, CBI investigation?",
        type: "DEFLECT",
        factCreated: null,
        suspicionChange: { wife_mythili: 7 },
        nextDialogueId: "return_003",
        note: "Mythili does not appreciate deflection on this topic."
      }
    ]
  },

  {
    id: "return_003",
    speaker: "wife_mythili",
    speakerName: "Mythili",
    text: "And what did you actually do for three days? Because Vedham's wife called and said Vedham came home with a new shirt he definitely didn't own before.",
    context: "Cross-referencing evidence already. Mythili is building her case.",
    responses: [
      {
        id: "return_003_a",
        text: "Temple visits, some sightseeing, and we went shopping in Commercial Street. Vedham probably picked up a shirt there. You know how he is with sales.",
        type: "SAFE",
        factCreated: {
          subject: "Bangalore Trip",
          statement: "Visited temples, did sightseeing, went shopping at Commercial Street",
          consistency_tags: ["activity", "location"],
          witnesses: ["wife_mythili"],
          timestamp: "day_1",
          location: "home"
        },
        suspicionChange: { wife_mythili: 2 },
        nextDialogueId: "return_004"
      },
      {
        id: "return_003_b",
        text: "We explored the city. Had some good food, saw old friends. Ram's birthday celebration, remember? The boys wanted to treat me.",
        type: "RISKY",
        factCreated: {
          subject: "Bangalore Trip",
          statement: "Birthday celebration in Bangalore, met old friends, good food",
          consistency_tags: ["activity", "people", "reason"],
          witnesses: ["wife_mythili"],
          timestamp: "day_1",
          location: "home"
        },
        suspicionChange: { wife_mythili: 6 },
        nextDialogueId: "return_004",
        note: "'Old friends' is a dangerous thread she can pull on later."
      },
      {
        id: "return_003_c",
        text: "Mythili, you're asking about Vedham's shirt? Ask Vedham's wife about Vedham's shirt. I'm not his personal shopper.",
        type: "DEFLECT",
        factCreated: null,
        suspicionChange: { wife_mythili: 4 },
        nextDialogueId: "return_004"
      }
    ]
  },

  {
    id: "return_004",
    speaker: "wife_mythili",
    speakerName: "Mythili",
    text: "One more thing. You left your phone charging and it buzzed. Some number from Bangalore. Anyone I should know about?",
    context: "The phone -- with Maggi's contact and diamond clues. This is the highest-stakes moment of Scene 1. Evidence item: Cell Phone becomes relevant.",
    responses: [
      {
        id: "return_004_a",
        text: "Probably the lodge reception. I asked them to forward any mail that came for us. Nothing interesting.",
        type: "SAFE",
        factCreated: {
          subject: "Bangalore Trip",
          statement: "Bangalore phone number is the lodge reception",
          consistency_tags: ["people", "phone"],
          witnesses: ["wife_mythili"],
          timestamp: "day_1",
          location: "home"
        },
        suspicionChange: { wife_mythili: 3 },
        nextDialogueId: "return_005"
      },
      {
        id: "return_004_b",
        text: "That's the auto driver who took us around. Very helpful guy. I saved his number in case we go back.",
        type: "SAFE",
        factCreated: {
          subject: "Bangalore Trip",
          statement: "Bangalore phone number belongs to the auto driver",
          consistency_tags: ["people", "phone"],
          witnesses: ["wife_mythili"],
          timestamp: "day_1",
          location: "home"
        },
        suspicionChange: { wife_mythili: 4 },
        nextDialogueId: "return_005"
      },
      {
        id: "return_004_c",
        text: "You're going through my phone now, Mythili? Is there no trust left in this marriage?",
        type: "DEFLECT",
        factCreated: null,
        suspicionChange: { wife_mythili: 10 },
        nextDialogueId: "return_005",
        note: "The emotional pivot. High risk -- Mythili will remember this defensiveness."
      },
      {
        id: "return_004_d",
        text: "It's a temple priest. He's sending us the prasadam by post. Very devout man.",
        type: "RISKY",
        factCreated: {
          subject: "Bangalore Trip",
          statement: "Bangalore phone number is a temple priest sending prasadam",
          consistency_tags: ["people", "phone", "activity"],
          witnesses: ["wife_mythili"],
          timestamp: "day_1",
          location: "home"
        },
        suspicionChange: { wife_mythili: 6 },
        nextDialogueId: "return_005",
        note: "Overly specific lie. If Mythili checks later and no prasadam arrives, suspicion spikes."
      }
    ]
  },

  {
    id: "return_005",
    speaker: "wife_mythili",
    speakerName: "Mythili",
    text: "Fine. Reddy's wife called about the Ugadi party this weekend. All of us are coming. I hope you and your 'boys' can keep your stories straight.",
    context: "Scene 1 closing. Mythili gives a pointed warning. This sets up Scene 2. The player acquires the Cell Phone evidence item here.",
    responses: [
      {
        id: "return_005_a",
        text: "What stories? It was a simple trip, Mythili. But yes, we'll be at the party. Looking forward to it.",
        type: "SAFE",
        factCreated: null,
        suspicionChange: { wife_mythili: -2 },
        nextDialogueId: null,
        note: "Scene ends. Transition to Scene 2."
      },
      {
        id: "return_005_b",
        text: "I missed you, Mythili. The whole trip, all I could think about was coming home to you.",
        type: "BOLD",
        factCreated: null,
        suspicionChange: { wife_mythili: -5 },
        nextDialogueId: null,
        note: "Emotional play. Small suspicion reduction. Mythili softens but doesn't forget."
      },
      {
        id: "return_005_c",
        text: "Keep our stories straight? We only HAVE one story because only one thing happened -- a temple visit. What's to keep straight?",
        type: "DEFLECT",
        factCreated: null,
        suspicionChange: { wife_mythili: 3 },
        nextDialogueId: null,
        note: "Protesting too much. Scene ends with slight suspicion gain."
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // SCENE 2: UGADI PARTY
  // Setting: Reddy's house. Festive decorations. Multiple rooms.
  // Suspicion range: 20-60%
  // NPCs: All 5 wives, all 4 friends. Alcohol modifier active.
  // This is the longest scene with the most branching.
  // ═══════════════════════════════════════════════════════════════

  {
    id: "party_001",
    speaker: "wife_mythili",
    speakerName: "Mythili",
    text: "So, Ram, I was just talking to Alice. She says Ayyappan mentioned you all had a 'memorable birthday dinner.' Tell me about this dinner.",
    context: "Ugadi party, living room. Mythili corners Ram near the snack table. Alice is within earshot. Friends are scattered across the house -- check sync status.",
    responses: [
      {
        id: "party_001_a",
        text: "Simple South Indian dinner. Thali place near the lodge. Nothing fancy -- just good company.",
        type: "SAFE",
        factCreated: {
          subject: "Birthday Dinner",
          statement: "Simple South Indian thali dinner near the lodge",
          consistency_tags: ["activity", "food", "location"],
          witnesses: ["wife_mythili", "wife_alice"],
          timestamp: "bangalore_evening_1",
          location: "party_living_room"
        },
        suspicionChange: { wife_mythili: 2, wife_alice: 1 },
        nextDialogueId: "party_002",
        friendBlurtRisk: true,
        note: "Safe but bland. If Ayyappan is un-synced, he might over-explain the dinner into oblivion."
      },
      {
        id: "party_001_b",
        text: "The boys took me to a nice restaurant for my birthday. Ayyappan even gave a speech. Very touching. He cried a little.",
        type: "RISKY",
        factCreated: {
          subject: "Birthday Dinner",
          statement: "Nice restaurant birthday dinner, Ayyappan gave emotional speech",
          consistency_tags: ["activity", "food", "location", "people"],
          witnesses: ["wife_mythili", "wife_alice"],
          timestamp: "bangalore_evening_1",
          location: "party_living_room"
        },
        suspicionChange: { wife_mythili: 5, wife_alice: 3 },
        nextDialogueId: "party_002",
        friendBlurtRisk: true,
        note: "Ayyappan will have opinions about the speech claim."
      },
      {
        id: "party_001_c",
        text: "Mythili, the Ugadi holige is getting cold. Let's eat first, interrogate later?",
        type: "DEFLECT",
        factCreated: null,
        suspicionChange: { wife_mythili: 4, wife_alice: 0 },
        nextDialogueId: "party_002"
      }
    ]
  },

  {
    id: "party_002",
    speaker: "wife_alice",
    speakerName: "Alice",
    text: "Ram, I wanted to ask -- Ayyappan came back with some interesting bruises on his arm. He said it was from 'temple steps.' What kind of temple has steps that leave bruises?",
    context: "Alice approaches casually but her eyes are sharp. She's been comparing notes with Mythili.",
    responses: [
      {
        id: "party_002_a",
        text: "Oh that! The Nandi Hills temple has those steep stone steps. Ayyappan slipped on the third step. We all laughed. He didn't find it funny.",
        type: "SAFE",
        factCreated: {
          subject: "Bangalore Trip",
          statement: "Visited Nandi Hills temple, Ayyappan slipped on stone steps",
          consistency_tags: ["location", "activity", "people"],
          witnesses: ["wife_alice", "wife_mythili"],
          timestamp: "bangalore_day_2",
          location: "party_living_room"
        },
        suspicionChange: { wife_alice: 2, wife_mythili: 1 },
        nextDialogueId: "party_003"
      },
      {
        id: "party_002_b",
        text: "Ask Ayyappan! I'm not his mother keeping track of every scratch. He's a grown man who trips sometimes.",
        type: "DEFLECT",
        factCreated: null,
        suspicionChange: { wife_alice: 5, wife_mythili: 2 },
        nextDialogueId: "party_003"
      },
      {
        id: "party_002_c",
        text: "We went trekking near the temple. Rough terrain. We're not exactly athletes, Alice.",
        type: "RISKY",
        factCreated: {
          subject: "Bangalore Trip",
          statement: "Went trekking near the temple on rough terrain",
          consistency_tags: ["activity", "location"],
          witnesses: ["wife_alice", "wife_mythili"],
          timestamp: "bangalore_day_2",
          location: "party_living_room"
        },
        suspicionChange: { wife_alice: 3, wife_mythili: 3 },
        nextDialogueId: "party_003",
        note: "Trekking can be verified. If other friends don't mention it, collision risk."
      }
    ]
  },

  {
    id: "party_003",
    speaker: "wife_saroja",
    speakerName: "Saroja",
    text: "Ram! Happy Ugadi! I heard you boys had fun in Bangalore. Hegde told me you went to some 'cultural show.' What kind of show?",
    context: "Saroja (Hegde's wife) approaches cheerfully. She's not suspicious yet -- just curious. But 'cultural show' is Hegde's euphemism for anything.",
    responses: [
      {
        id: "party_003_a",
        text: "Classical dance performance at a community hall. Very traditional. Hegde loved it -- you know how he appreciates the arts.",
        type: "SAFE",
        factCreated: {
          subject: "Bangalore Trip",
          statement: "Attended a classical dance performance at a community hall",
          consistency_tags: ["activity", "location"],
          witnesses: ["wife_saroja"],
          timestamp: "bangalore_evening_2",
          location: "party_dining_room"
        },
        suspicionChange: { wife_saroja: 1 },
        nextDialogueId: "party_004"
      },
      {
        id: "party_003_b",
        text: "Live music show! Local band playing old Tamil film songs. Hegde tried to sing along. It was... memorable.",
        type: "RISKY",
        factCreated: {
          subject: "Bangalore Trip",
          statement: "Attended live Tamil music show, Hegde sang along",
          consistency_tags: ["activity", "location"],
          witnesses: ["wife_saroja"],
          timestamp: "bangalore_evening_2",
          location: "party_dining_room"
        },
        suspicionChange: { wife_saroja: 3 },
        nextDialogueId: "party_004",
        friendBlurtRisk: true,
        note: "If Hegde is asked, he'll agree to this AND whatever else is suggested. Collision incoming."
      },
      {
        id: "party_003_c",
        text: "You know Hegde -- everything is a 'cultural show' to him. We just had dinner and walked around the city.",
        type: "DEFLECT",
        factCreated: {
          subject: "Bangalore Trip",
          statement: "Hegde exaggerates, they just had dinner and walked around",
          consistency_tags: ["activity"],
          witnesses: ["wife_saroja"],
          timestamp: "bangalore_evening_2",
          location: "party_dining_room"
        },
        suspicionChange: { wife_saroja: 2 },
        nextDialogueId: "party_004"
      }
    ]
  },

  {
    id: "party_004",
    speaker: "wife_mythili",
    speakerName: "Mythili",
    text: "Ram, come here. I just overheard Reddy telling his wife you were all 'back by 9 PM every night.' But you told me you arrived home at midnight. That's a 3-hour gap. What were you doing?",
    context: "Mythili has been cross-referencing. Reddy's loose mouth has created a temporal collision. Recovery Mode may trigger here depending on existing facts.",
    responses: [
      {
        id: "party_004_a",
        text: "Back at the lodge by 9 PM, yes. But I stayed up reading and didn't start driving home until late. Long drive, Mythili.",
        type: "SAFE",
        factCreated: {
          subject: "Bangalore Trip",
          statement: "Back at lodge by 9 PM, drove home late at night",
          consistency_tags: ["time", "location", "transport"],
          witnesses: ["wife_mythili"],
          timestamp: "bangalore_night",
          location: "party_living_room"
        },
        suspicionChange: { wife_mythili: 4 },
        nextDialogueId: "party_005"
      },
      {
        id: "party_004_b",
        text: "Reddy said 9 PM? He was asleep by 8! The rest of us went for a walk along MG Road. Very peaceful night stroll.",
        type: "RISKY",
        factCreated: {
          subject: "Bangalore Trip",
          statement: "Reddy slept early, others took a night walk on MG Road",
          consistency_tags: ["time", "activity", "people", "location"],
          witnesses: ["wife_mythili"],
          timestamp: "bangalore_night",
          location: "party_living_room"
        },
        suspicionChange: { wife_mythili: 7 },
        nextDialogueId: "party_005",
        friendBlurtRisk: true,
        note: "Throwing Reddy under the bus. If Reddy hears about this, LOOSE_CANNON response guaranteed."
      },
      {
        id: "party_004_c",
        text: "Why are you timing our trip? What difference does it make whether it was 9 PM or midnight? We came home safely.",
        type: "DEFLECT",
        factCreated: null,
        suspicionChange: { wife_mythili: 8 },
        nextDialogueId: "party_005",
        note: "Mythili hates this kind of evasion. Significant suspicion gain."
      },
      {
        id: "party_004_d",
        text: "Okay fine. We stopped at a dhaba on the highway for dinner on the way back. Lost track of time. The biryani was excellent.",
        type: "BOLD",
        factCreated: {
          subject: "Bangalore Trip",
          statement: "Stopped at highway dhaba for biryani on return journey",
          consistency_tags: ["time", "activity", "food", "location"],
          witnesses: ["wife_mythili"],
          timestamp: "bangalore_night",
          location: "party_living_room"
        },
        suspicionChange: { wife_mythili: 3 },
        nextDialogueId: "party_005",
        note: "Specific and relatable. Mythili can verify with friends but biryani is a universal alibi."
      }
    ]
  },

  {
    id: "party_005",
    speaker: "wife_padma",
    speakerName: "Padma",
    text: "Ram-ji, Vedham was acting very strange all evening. He keeps looking at his phone and jumping when anyone talks to him. Is he okay? Did something happen in Bangalore?",
    context: "Padma (Vedham's wife) is genuinely concerned, not suspicious. But her question is dangerous -- Vedham IS nervous because something DID happen.",
    responses: [
      {
        id: "party_005_a",
        text: "He's been worried about a work deadline. Big project next week. You know how Vedham takes stress.",
        type: "SAFE",
        factCreated: {
          subject: "Friends",
          statement: "Vedham is stressed about a work deadline",
          consistency_tags: ["people"],
          witnesses: ["wife_padma"],
          timestamp: "party",
          location: "party_dining_room"
        },
        suspicionChange: { wife_padma: 1 },
        nextDialogueId: "party_006"
      },
      {
        id: "party_005_b",
        text: "He ate some dodgy street food in Bangalore. Stomach issues. He's embarrassed to talk about it.",
        type: "RISKY",
        factCreated: {
          subject: "Friends",
          statement: "Vedham has stomach issues from Bangalore street food",
          consistency_tags: ["people", "activity", "food"],
          witnesses: ["wife_padma"],
          timestamp: "party",
          location: "party_dining_room"
        },
        suspicionChange: { wife_padma: 2 },
        nextDialogueId: "party_006",
        note: "Verifiable lie -- Padma will ask Vedham, who will panic."
      },
      {
        id: "party_005_c",
        text: "Vedham? Strange? That's just regular Vedham! He's always jumpy. You should know that better than anyone, Padma!",
        type: "DEFLECT",
        factCreated: null,
        suspicionChange: { wife_padma: 3 },
        nextDialogueId: "party_006"
      }
    ]
  },

  {
    id: "party_006",
    speaker: "wife_mythili",
    speakerName: "Mythili",
    text: "I just found this in your jacket pocket while hanging it up. A receipt from... 'Golden Cascade Bar and Lounge'? I thought you were at temples, Ram.",
    context: "Critical moment. Physical evidence. Mythili found the bar receipt. This is where the Cell Phone evidence item can be used as a counter -- or Recovery Mode triggers.",
    responses: [
      {
        id: "party_006_a",
        text: "That's the restaurant name! 'Golden Cascade' is a vegetarian restaurant, Mythili. The 'Bar and Lounge' part is just the upper floor dining area. Very common in Bangalore.",
        type: "RISKY",
        factCreated: {
          subject: "Bangalore Trip",
          statement: "Golden Cascade is a vegetarian restaurant with confusing name",
          consistency_tags: ["location", "food", "activity"],
          witnesses: ["wife_mythili"],
          timestamp: "bangalore_evening_1",
          location: "party_living_room"
        },
        suspicionChange: { wife_mythili: 6 },
        nextDialogueId: "party_007",
        note: "Technicality-style response. Risky but if she buys it, very effective."
      },
      {
        id: "party_006_b",
        text: "We stopped for one juice. ONE juice, Mythili. It was 40 degrees outside. Even saints drink juice.",
        type: "SAFE",
        factCreated: {
          subject: "Bangalore Trip",
          statement: "Stopped at Golden Cascade for juice because of heat",
          consistency_tags: ["location", "activity", "food"],
          witnesses: ["wife_mythili"],
          timestamp: "bangalore_evening_1",
          location: "party_living_room"
        },
        suspicionChange: { wife_mythili: 8 },
        nextDialogueId: "party_007",
        note: "Admits to the bar but minimizes. Mythili gains suspicion but the lie is small."
      },
      {
        id: "party_006_c",
        text: "That's not mine. Must be Reddy's. He was wearing a similar jacket. You know how these things get mixed up.",
        type: "DEFLECT",
        factCreated: {
          subject: "Bangalore Trip",
          statement: "Bar receipt belongs to Reddy, jackets got mixed up",
          consistency_tags: ["people", "location"],
          witnesses: ["wife_mythili"],
          timestamp: "bangalore_evening_1",
          location: "party_living_room"
        },
        suspicionChange: { wife_mythili: 5 },
        nextDialogueId: "party_007",
        friendBlurtRisk: true,
        note: "Deflects to Reddy. If Reddy's wife Kavitha hears this, she'll investigate."
      },
      {
        id: "party_006_d",
        text: "Alright, we went to a bar. For one evening. After three days of temples. Five men are allowed one evening of relaxation, aren't we?",
        type: "BOLD",
        factCreated: {
          subject: "Bangalore Trip",
          statement: "Admitted to visiting a bar for one evening after temple visits",
          consistency_tags: ["location", "activity"],
          witnesses: ["wife_mythili"],
          timestamp: "bangalore_evening_1",
          location: "party_living_room"
        },
        suspicionChange: { wife_mythili: 10 },
        nextDialogueId: "party_007",
        note: "Partial truth. High suspicion but locks in a fact that's hard to contradict. Double Down territory."
      }
    ]
  },

  {
    id: "party_007",
    speaker: "wife_kavitha",
    speakerName: "Kavitha",
    text: "Ram, I have to ask. Reddy was muttering something in his sleep last night. Something about 'Maggi' and 'diamonds.' Is that a new restaurant you went to? 'Maggi and Diamonds'?",
    context: "Kavitha (Reddy's wife) is innocent but dangerously close to the truth. The irony is thick. This is a minefield.",
    responses: [
      {
        id: "party_007_a",
        text: "Ha! Classic Reddy. He was watching some crime thriller on his phone during the trip. 'Maggi and Diamonds' -- it's the name of the movie. Very bad movie, actually.",
        type: "SAFE",
        factCreated: {
          subject: "Friends",
          statement: "Reddy was watching a crime thriller called Maggi and Diamonds on his phone",
          consistency_tags: ["people", "activity"],
          witnesses: ["wife_kavitha"],
          timestamp: "party",
          location: "party_kitchen"
        },
        suspicionChange: { wife_kavitha: 1 },
        nextDialogueId: "party_008"
      },
      {
        id: "party_007_b",
        text: "Must be dreaming about food. You know Reddy -- always thinking about Maggi noodles. And 'diamonds' is probably some new masala brand. He's obsessed with cooking these days.",
        type: "RISKY",
        factCreated: {
          subject: "Friends",
          statement: "Reddy dreams about Maggi noodles and Diamond masala brand",
          consistency_tags: ["people", "food"],
          witnesses: ["wife_kavitha"],
          timestamp: "party",
          location: "party_kitchen"
        },
        suspicionChange: { wife_kavitha: 3 },
        nextDialogueId: "party_008",
        note: "If anyone else mentions 'Maggi' as a person later, this collapses."
      },
      {
        id: "party_007_c",
        text: "Kavitha, you're analyzing your husband's dreams now? Let the man sleep in peace!",
        type: "DEFLECT",
        factCreated: null,
        suspicionChange: { wife_kavitha: 2 },
        nextDialogueId: "party_008"
      }
    ]
  },

  {
    id: "party_008",
    speaker: "wife_mythili",
    speakerName: "Mythili",
    text: "Ram, one more thing. I called the Dharmasthala temple office to thank them for hosting you. They said they have no record of any group booking in the last month. Care to explain?",
    context: "The trap snaps shut. Mythili verified the temple story. This is the climax of Scene 2. Recovery Mode is almost certainly active here. The player NEEDS to use a recovery option or an evidence item.",
    responses: [
      {
        id: "party_008_a",
        text: "We didn't book! We just walked in for darshan. Individual entry, Mythili. No booking needed for regular visitors.",
        type: "SAFE",
        factCreated: {
          subject: "Bangalore Trip",
          statement: "Visited temple for walk-in darshan, no group booking needed",
          consistency_tags: ["activity", "location"],
          witnesses: ["wife_mythili"],
          timestamp: "bangalore_day_1",
          location: "party_living_room"
        },
        suspicionChange: { wife_mythili: 5 },
        nextDialogueId: null,
        note: "Scene 2 end. Narrow escape. Transition to Scene 3 depends on suspicion level."
      },
      {
        id: "party_008_b",
        text: "I said Dharmasthala? I meant the Banashankari temple. So many temples, Mythili. They all blur together when you're being spiritual.",
        type: "RISKY",
        factCreated: {
          subject: "Bangalore Trip",
          statement: "Actually visited Banashankari temple, not Dharmasthala",
          consistency_tags: ["location", "activity"],
          witnesses: ["wife_mythili"],
          timestamp: "bangalore_day_1",
          location: "party_living_room"
        },
        suspicionChange: { wife_mythili: 12 },
        nextDialogueId: null,
        note: "Changing the temple name is a massive red flag. But it resolves the verification problem."
      },
      {
        id: "party_008_c",
        text: "Mythili, you CALLED the temple? Do you realize how that sounds? This isn't a court case. I'm your husband, not a suspect.",
        type: "DEFLECT",
        factCreated: null,
        suspicionChange: { wife_mythili: 8 },
        nextDialogueId: null,
        note: "Emotional confrontation. Doesn't resolve the contradiction but shifts the argument."
      },
      {
        id: "party_008_d",
        text: "Show me your phone. Show me the call log. I want to see when you called them. Because I think you're testing me, Mythili, and I don't appreciate it.",
        type: "BOLD",
        factCreated: null,
        suspicionChange: { wife_mythili: 7 },
        nextDialogueId: null,
        note: "Counter-attack. Risky but may force Mythili to back down. Uses the Cell Phone evidence item logic if player has it."
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // SCENE 3: THE CONFRONTATION
  // Setting: Ugadi party continues but Maggi/Maragathavalli
  // shows up uninvited. Tension escalates rapidly.
  // Suspicion range: 60-85%
  // NPCs: Maggi, Mythili, Alice, friends in background
  // ═══════════════════════════════════════════════════════════════

  {
    id: "confront_001",
    speaker: "npc_maggi",
    speakerName: "Maggi",
    text: "Ram! Darling! There you are! I've been looking everywhere for you. You forgot to give me back my... things.",
    context: "Maggi appears at the party entrance. She's alive (the 'body' faked her death). She wants the diamonds back. Mythili sees her. Every friend in the room freezes. This is the highest-tension moment in the game.",
    responses: [
      {
        id: "confront_001_a",
        text: "I'm sorry, do I know you? I think you have me confused with someone else, madam.",
        type: "SAFE",
        factCreated: {
          subject: "Maggi",
          statement: "Ram does not know Maggi, case of mistaken identity",
          consistency_tags: ["people", "maggi"],
          witnesses: ["wife_mythili", "wife_alice", "npc_maggi"],
          timestamp: "party_confrontation",
          location: "party_entrance"
        },
        suspicionChange: { wife_mythili: 5, wife_alice: 3 },
        nextDialogueId: "confront_002"
      },
      {
        id: "confront_001_b",
        text: "Mythili, this is... Maragathavalli. She's Ayyappan's distant cousin from Bangalore. She must be talking about the temple donation receipts I was holding for her.",
        type: "RISKY",
        factCreated: {
          subject: "Maggi",
          statement: "Maggi is Ayyappan's distant cousin Maragathavalli, Ram was holding her temple receipts",
          consistency_tags: ["people", "maggi", "activity"],
          witnesses: ["wife_mythili", "wife_alice", "npc_maggi"],
          timestamp: "party_confrontation",
          location: "party_entrance"
        },
        suspicionChange: { wife_mythili: 8, wife_alice: 10 },
        nextDialogueId: "confront_002",
        friendBlurtRisk: true,
        note: "Drags Ayyappan into it. Alice will immediately question Ayyappan about his 'cousin.' Collision risk: extreme."
      },
      {
        id: "confront_001_c",
        text: "Ah, the travel agent! Everyone, this is our travel agent from the Bangalore trip. Very dedicated -- follows up in person! What service!",
        type: "BOLD",
        factCreated: {
          subject: "Maggi",
          statement: "Maggi is their travel agent from the Bangalore trip",
          consistency_tags: ["people", "maggi", "reason"],
          witnesses: ["wife_mythili", "wife_alice", "npc_maggi"],
          timestamp: "party_confrontation",
          location: "party_entrance"
        },
        suspicionChange: { wife_mythili: 6, wife_alice: 4 },
        nextDialogueId: "confront_002",
        note: "Creative cover. Maggi may or may not play along. 50/50 chance she cooperates."
      },
      {
        id: "confront_001_d",
        text: "(Whispered to Maggi) Not here. Meet me outside in 5 minutes. I'll get you what you want.",
        type: "DEFLECT",
        factCreated: null,
        suspicionChange: { wife_mythili: 12 },
        nextDialogueId: "confront_002",
        note: "Mythili sees Ram whispering to a strange woman at a party. Maximum suspicion. But it buys time."
      }
    ]
  },

  {
    id: "confront_002",
    speaker: "wife_mythili",
    speakerName: "Mythili",
    text: "Ram. Who IS she? And why does she know your name? And why did Vedham just faint?",
    context: "Vedham has actually fainted seeing Maggi alive (he thought she was dead). This is both a crisis and, depending on player framing, an opportunity.",
    responses: [
      {
        id: "confront_002_a",
        text: "I already told you -- travel agent. And Vedham fainted because he skipped lunch. You know his blood sugar issues.",
        type: "SAFE",
        factCreated: {
          subject: "Friends",
          statement: "Vedham fainted due to low blood sugar from skipping lunch",
          consistency_tags: ["people"],
          witnesses: ["wife_mythili"],
          timestamp: "party_confrontation",
          location: "party_living_room"
        },
        suspicionChange: { wife_mythili: 5 },
        nextDialogueId: "confront_003"
      },
      {
        id: "confront_002_b",
        text: "She's nobody! Vedham is fine! Everything is fine! Can we please just enjoy the Ugadi party?!",
        type: "DEFLECT",
        factCreated: null,
        suspicionChange: { wife_mythili: 10 },
        nextDialogueId: "confront_003",
        note: "Visible panic. Mythili sees through this instantly."
      },
      {
        id: "confront_002_c",
        text: "Mythili, I need you to trust me right now. There's a simple explanation for everything. But I need five minutes. Can you give me five minutes?",
        type: "BOLD",
        factCreated: null,
        suspicionChange: { wife_mythili: 7 },
        nextDialogueId: "confront_003",
        note: "Honest-adjacent. Buys time but signals that something IS going on."
      }
    ]
  },

  {
    id: "confront_003",
    speaker: "npc_maggi",
    speakerName: "Maggi",
    text: "Ram, enough games. I know you found what was in my phone. I want it back. All of it. Or your wife learns about our little Bangalore 'adventure.'",
    context: "Maggi is directly threatening blackmail. She's talking about the diamonds. The wives may or may not hear this depending on player proximity management.",
    responses: [
      {
        id: "confront_003_a",
        text: "(Loudly, for wives to hear) Of course! The travel documents from your phone! I have them in my car. Let me get them for you right now.",
        type: "SAFE",
        factCreated: {
          subject: "Maggi",
          statement: "Ram has Maggi's travel documents in his car, retrieving them",
          consistency_tags: ["maggi", "activity"],
          witnesses: ["wife_mythili", "npc_maggi"],
          timestamp: "party_confrontation",
          location: "party_living_room"
        },
        suspicionChange: { wife_mythili: 4 },
        nextDialogueId: "confront_004",
        note: "Maintains the travel agent cover. Gets Ram away from wives temporarily."
      },
      {
        id: "confront_003_b",
        text: "(Whispered) Those diamonds aren't yours either, Maggi. They belong to some very dangerous people. We BOTH have a problem.",
        type: "RISKY",
        factCreated: null,
        suspicionChange: { wife_mythili: 3 },
        nextDialogueId: "confront_004",
        note: "Truthful. Forms an alliance with Maggi against the smugglers. Reduces immediate threat but creates partnership dynamics."
      },
      {
        id: "confront_003_c",
        text: "I don't have anything of yours. I don't know what you're talking about. And if you don't leave this party, I'm calling the police.",
        type: "BOLD",
        factCreated: {
          subject: "Maggi",
          statement: "Ram denies having anything of Maggi's, threatens to call police",
          consistency_tags: ["maggi"],
          witnesses: ["wife_mythili", "npc_maggi"],
          timestamp: "party_confrontation",
          location: "party_living_room"
        },
        suspicionChange: { wife_mythili: 8 },
        nextDialogueId: "confront_004",
        note: "Aggressive counter. Maggi might escalate. But it also looks like Ram is protecting his family."
      },
      {
        id: "confront_003_d",
        text: "Mythili, Alice -- this woman is trying to scam us. She's a con artist. Ayyappan, call the building security!",
        type: "DEFLECT",
        factCreated: {
          subject: "Maggi",
          statement: "Maggi is a con artist trying to scam them",
          consistency_tags: ["maggi", "people"],
          witnesses: ["wife_mythili", "wife_alice", "npc_maggi"],
          timestamp: "party_confrontation",
          location: "party_living_room"
        },
        suspicionChange: { wife_mythili: 6, wife_alice: 4 },
        nextDialogueId: "confront_004",
        friendBlurtRisk: true,
        note: "Rallies the room against Maggi. But if friends panic and blurt, it all falls apart."
      }
    ]
  },

  {
    id: "confront_004",
    speaker: "wife_mythili",
    speakerName: "Mythili",
    text: "Ram, I'm only going to ask you this once. Look me in the eyes. Is there something you're not telling me about Bangalore?",
    context: "The defining moment of Scene 3. Mythili is giving Ram a chance to come partially clean. This choice shapes the entire endgame.",
    responses: [
      {
        id: "confront_004_a",
        text: "Mythili, I promise you -- nothing happened in Bangalore that would hurt you or this family. I need you to believe that.",
        type: "SAFE",
        factCreated: {
          subject: "Bangalore Trip",
          statement: "Nothing happened in Bangalore that would hurt Mythili or the family",
          consistency_tags: ["activity"],
          witnesses: ["wife_mythili"],
          timestamp: "party_confrontation",
          location: "party_living_room"
        },
        suspicionChange: { wife_mythili: -3 },
        nextDialogueId: "confront_005",
        note: "Technically true -- Ram didn't do anything malicious. Mythili senses sincerity. Small suspicion reduction."
      },
      {
        id: "confront_004_b",
        text: "Yes. Something happened. But it's not what you think. And I'm handling it. Please trust me for 24 more hours.",
        type: "BOLD",
        factCreated: {
          subject: "Bangalore Trip",
          statement: "Something happened but Ram is handling it, asks for 24 hours",
          consistency_tags: ["activity"],
          witnesses: ["wife_mythili"],
          timestamp: "party_confrontation",
          location: "party_living_room"
        },
        suspicionChange: { wife_mythili: 5 },
        nextDialogueId: "confront_005",
        note: "Partial truth. High risk but high reward. Sets a timer on the endgame."
      },
      {
        id: "confront_004_c",
        text: "No. Nothing. It was a temple trip and that woman is a travel agent. End of story.",
        type: "DEFLECT",
        factCreated: {
          subject: "Bangalore Trip",
          statement: "Nothing unusual happened, just a temple trip",
          consistency_tags: ["activity", "location"],
          witnesses: ["wife_mythili"],
          timestamp: "party_confrontation",
          location: "party_living_room"
        },
        suspicionChange: { wife_mythili: 10 },
        nextDialogueId: "confront_005",
        note: "Flat denial after everything Mythili has seen. She doesn't believe it. Major suspicion spike."
      }
    ]
  },

  {
    id: "confront_005",
    speaker: "wife_alice",
    speakerName: "Alice",
    text: "I just asked Ayyappan about this 'cousin Maragathavalli.' He said he has NO cousin by that name. Then he started hyperventilating. What is going on, Ram?",
    context: "Alice has independently verified and found a contradiction. Scene 3 is closing. The web of lies is at breaking point. Transition to Scene 4 depends on the state.",
    responses: [
      {
        id: "confront_005_a",
        text: "I said distant cousin! Very distant! Second cousin twice removed on his mother's side! Ayyappan doesn't keep track of his whole family tree!",
        type: "RISKY",
        factCreated: {
          subject: "Maggi",
          statement: "Maragathavalli is Ayyappan's very distant cousin he doesn't remember",
          consistency_tags: ["people", "maggi"],
          witnesses: ["wife_alice", "wife_mythili"],
          timestamp: "party_confrontation",
          location: "party_living_room"
        },
        suspicionChange: { wife_alice: 8, wife_mythili: 5 },
        nextDialogueId: null,
        note: "Scene 3 end. Transition to Scene 4. The lie is barely holding."
      },
      {
        id: "confront_005_b",
        text: "Alice, Ayyappan is panicking because he owes this woman money for the travel booking. It's embarrassing, that's all. He didn't want you to know he overspent.",
        type: "SAFE",
        factCreated: {
          subject: "Maggi",
          statement: "Ayyappan owes Maggi money for a travel booking and is embarrassed",
          consistency_tags: ["people", "maggi", "money"],
          witnesses: ["wife_alice", "wife_mythili"],
          timestamp: "party_confrontation",
          location: "party_living_room"
        },
        suspicionChange: { wife_alice: 4, wife_mythili: 3 },
        nextDialogueId: null,
        note: "Redirects suspicion to money issues, not moral issues. Alice is more likely to buy this."
      },
      {
        id: "confront_005_c",
        text: "Everyone STOP. We need to talk about this calmly. Not here. Not at a party. Tomorrow. I'll explain everything tomorrow.",
        type: "DEFLECT",
        factCreated: null,
        suspicionChange: { wife_alice: 6, wife_mythili: 6 },
        nextDialogueId: null,
        note: "Scene 3 end. Buys time for Scene 4 but all wives are on high alert."
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // SCENE 4: THE RIVERBED FINALE
  // Setting: The same dry riverbed where they disposed of the
  // 'body.' Night. Moonlight. The smuggler has arrived.
  // Suspicion range: 85-100% or event-triggered
  // NPCs: Smuggler, Undercover Inspector, wives may arrive
  // Special mechanic: Evidence Toss available
  // ═══════════════════════════════════════════════════════════════

  {
    id: "finale_001",
    speaker: "npc_smuggler",
    speakerName: "The Smuggler",
    text: "You must be Ram. Maggi told me you have my property. The Maragadham diamonds. I've been very patient. My patience has ended.",
    context: "Dry riverbed. Night. The smuggler is flanked by two henchmen. Ram has the diamonds in his pocket. Friends are hiding behind rocks. Wives may be approaching (proximity check matters for Evidence Toss).",
    responses: [
      {
        id: "finale_001_a",
        text: "I have the diamonds. Take them. We want nothing to do with any of this. Just let us go and nobody talks.",
        type: "SAFE",
        factCreated: {
          subject: "Diamonds",
          statement: "Ram surrenders diamonds peacefully to smuggler",
          consistency_tags: ["diamonds", "resolution"],
          witnesses: ["npc_smuggler"],
          timestamp: "finale",
          location: "riverbed"
        },
        suspicionChange: {},
        nextDialogueId: "finale_002",
        note: "Path to CLEAN_SWEEP ending if suspicion is low enough. Diamond status changes to 'Returned.'"
      },
      {
        id: "finale_001_b",
        text: "What diamonds? I don't know what Maggi told you, but she's a liar. She faked her own death, for god's sake.",
        type: "BOLD",
        factCreated: {
          subject: "Diamonds",
          statement: "Ram denies having the diamonds, accuses Maggi of lying",
          consistency_tags: ["diamonds", "maggi"],
          witnesses: ["npc_smuggler"],
          timestamp: "finale",
          location: "riverbed"
        },
        suspicionChange: {},
        nextDialogueId: "finale_002_alt",
        note: "Dangerous. Smuggler won't believe this. But it buys time for the Evidence Toss."
      },
      {
        id: "finale_001_c",
        text: "Before we discuss anything -- I should mention that there's an undercover police inspector at the party. He followed us here. You might want to reconsider your approach.",
        type: "RISKY",
        factCreated: {
          subject: "Diamonds",
          statement: "Ram claims undercover police followed them to the riverbed",
          consistency_tags: ["diamonds", "people"],
          witnesses: ["npc_smuggler"],
          timestamp: "finale",
          location: "riverbed"
        },
        suspicionChange: {},
        nextDialogueId: "finale_002_bluff",
        note: "The bluff of bluffs. If the inspector IS actually there (random event), this is genius. If not, the smuggler calls the bluff."
      }
    ]
  },

  {
    id: "finale_002",
    speaker: "npc_smuggler",
    speakerName: "The Smuggler",
    text: "Smart man. Hand them over. Slowly. And tell your friends behind those rocks to stay where they are.",
    context: "The peaceful handoff path. Player can complete the exchange or attempt the Evidence Toss at this moment if wives are not nearby.",
    responses: [
      {
        id: "finale_002_a",
        text: "(Hands over the diamonds) Here. Every last one. We never saw them. You never saw us. Deal?",
        type: "SAFE",
        factCreated: {
          subject: "Diamonds",
          statement: "Diamonds returned to smuggler, mutual agreement to forget",
          consistency_tags: ["diamonds", "resolution"],
          witnesses: ["npc_smuggler"],
          timestamp: "finale",
          location: "riverbed"
        },
        suspicionChange: {},
        nextDialogueId: "finale_003",
        note: "Clean resolution of diamond subplot. Path to best endings."
      },
      {
        id: "finale_002_b",
        text: "(Pretends to reach for diamonds but throws them into the riverbed darkness) Oops. Butterfingers. Good luck finding them in this riverbed.",
        type: "BOLD",
        factCreated: {
          subject: "Diamonds",
          statement: "Ram threw diamonds into the dark riverbed",
          consistency_tags: ["diamonds", "resolution"],
          witnesses: ["npc_smuggler"],
          timestamp: "finale",
          location: "riverbed"
        },
        suspicionChange: {},
        nextDialogueId: "finale_003_toss",
        note: "EVIDENCE TOSS activated. If wives are NOT nearby (proximity check passes), diamonds are gone forever. If wives ARE nearby, they witness the whole thing."
      },
      {
        id: "finale_002_c",
        text: "I'll give you half. The other half is my insurance. You try anything, and those diamonds end up with the police, along with your name.",
        type: "RISKY",
        factCreated: {
          subject: "Diamonds",
          statement: "Ram negotiates to keep half the diamonds as insurance",
          consistency_tags: ["diamonds", "resolution"],
          witnesses: ["npc_smuggler"],
          timestamp: "finale",
          location: "riverbed"
        },
        suspicionChange: {},
        nextDialogueId: "finale_003_negotiate",
        note: "Power play. Could lead to violence or respect from the smuggler. High variance outcome."
      }
    ]
  },

  {
    id: "finale_002_alt",
    speaker: "npc_smuggler",
    speakerName: "The Smuggler",
    text: "Don't waste my time. Maggi may be a liar, but she showed me the call logs. Your number. Her phone. The same phone those diamonds were hidden in. Last chance.",
    context: "The smuggler has evidence. Denial is failing.",
    responses: [
      {
        id: "finale_002_alt_a",
        text: "Fine. You win. Let me get them from my car.",
        type: "SAFE",
        factCreated: {
          subject: "Diamonds",
          statement: "Ram admits to having diamonds, will retrieve from car",
          consistency_tags: ["diamonds", "resolution"],
          witnesses: ["npc_smuggler"],
          timestamp: "finale",
          location: "riverbed"
        },
        suspicionChange: {},
        nextDialogueId: "finale_003"
      },
      {
        id: "finale_002_alt_b",
        text: "(To friends, loudly) VEDHAM! CALL THE POLICE! NOW!",
        type: "BOLD",
        factCreated: {
          subject: "Diamonds",
          statement: "Ram calls for police intervention at the riverbed",
          consistency_tags: ["diamonds", "people", "resolution"],
          witnesses: ["npc_smuggler"],
          timestamp: "finale",
          location: "riverbed"
        },
        suspicionChange: {},
        nextDialogueId: "finale_003_police",
        note: "Escalation. If the undercover inspector is present, this triggers the best possible finale. If not, the smuggler's henchmen react."
      }
    ]
  },

  {
    id: "finale_002_bluff",
    speaker: "npc_smuggler",
    speakerName: "The Smuggler",
    text: "Police? (Laughs) I don't see any police. I see five scared men in a dry riverbed at midnight. Who's bluffing now?",
    context: "The bluff is called. Unless the inspector truly is here (game state dependent).",
    responses: [
      {
        id: "finale_002_bluff_a",
        text: "You're right. No police. Just five desperate men. Here are your diamonds. Please, just take them and go.",
        type: "SAFE",
        factCreated: {
          subject: "Diamonds",
          statement: "Bluff failed, Ram surrenders diamonds",
          consistency_tags: ["diamonds", "resolution"],
          witnesses: ["npc_smuggler"],
          timestamp: "finale",
          location: "riverbed"
        },
        suspicionChange: {},
        nextDialogueId: "finale_003"
      },
      {
        id: "finale_002_bluff_b",
        text: "(Stalling) No police YET. But my wife Mythili? She knows I'm here. And she is scarier than any police inspector.",
        type: "DEFLECT",
        factCreated: null,
        suspicionChange: {},
        nextDialogueId: "finale_003_stall",
        note: "Comedic beat. The smuggler is briefly confused by this logic. Buys 30 seconds."
      }
    ]
  },

  {
    id: "finale_003",
    speaker: "npc_smuggler",
    speakerName: "The Smuggler",
    text: "(Takes the diamonds, examines them) These are all of them. We're done. You and your friends -- forget Maggi, forget the diamonds, forget Bangalore. If I hear otherwise...",
    context: "The exchange is complete. The smuggler is leaving. But there's one final complication...",
    responses: [
      {
        id: "finale_003_a",
        text: "Already forgotten. Bangalore was a temple trip. That's all it ever was.",
        type: "SAFE",
        factCreated: {
          subject: "Resolution",
          statement: "Diamonds returned, Bangalore trip was just a temple visit",
          consistency_tags: ["resolution", "diamonds"],
          witnesses: [],
          timestamp: "finale",
          location: "riverbed"
        },
        suspicionChange: {},
        nextDialogueId: "finale_004",
        note: "The definitive safe ending path. Final scene plays based on accumulated suspicion score."
      },
      {
        id: "finale_003_b",
        text: "One condition. You make sure Maggi never contacts any of us again. Ever.",
        type: "BOLD",
        factCreated: {
          subject: "Resolution",
          statement: "Ram negotiates for the smuggler to keep Maggi away permanently",
          consistency_tags: ["resolution", "maggi"],
          witnesses: ["npc_smuggler"],
          timestamp: "finale",
          location: "riverbed"
        },
        suspicionChange: {},
        nextDialogueId: "finale_004"
      }
    ]
  },

  {
    id: "finale_003_toss",
    speaker: "npc_smuggler",
    speakerName: "The Smuggler",
    text: "YOU IDIOT! Those diamonds are worth crores! FIND THEM! All of you -- on your knees, NOW! Search every inch of this riverbed!",
    context: "Evidence Toss aftermath. The smuggler is furious. Whether this leads to chaos or escape depends on wife proximity and if police arrive.",
    responses: [
      {
        id: "finale_003_toss_a",
        text: "Good luck. It's a kilometer-long riverbed and it's pitch dark. Those diamonds are gone. And so are we.",
        type: "BOLD",
        factCreated: {
          subject: "Diamonds",
          statement: "Diamonds lost in the riverbed forever, Ram and friends escape",
          consistency_tags: ["diamonds", "resolution"],
          witnesses: ["npc_smuggler"],
          timestamp: "finale",
          location: "riverbed"
        },
        suspicionChange: {},
        nextDialogueId: "finale_004",
        note: "If proximity check passed (wives far away), this leads to the escape. Evidence destroyed."
      },
      {
        id: "finale_003_toss_b",
        text: "(Starts running) EVERYONE RUN! VEDHAM, STOP FAINTING AND RUN!",
        type: "DEFLECT",
        factCreated: {
          subject: "Diamonds",
          statement: "All friends flee the riverbed after evidence toss",
          consistency_tags: ["diamonds", "resolution"],
          witnesses: ["npc_smuggler"],
          timestamp: "finale",
          location: "riverbed"
        },
        suspicionChange: {},
        nextDialogueId: "finale_004",
        note: "Comedy escape sequence. Vedham is dragged by Hegde. Ayyappan is narrating while running."
      }
    ]
  },

  {
    id: "finale_003_negotiate",
    speaker: "npc_smuggler",
    speakerName: "The Smuggler",
    text: "(Long pause) You have nerve, I'll give you that. But this isn't a negotiation. It's a retrieval. ALL of them. Now.",
    context: "The negotiation attempt has failed. The smuggler is not interested in deals.",
    responses: [
      {
        id: "finale_003_negotiate_a",
        text: "(Sighs) Worth a try. Here. Take them all. I'm an engineer, not a smuggler.",
        type: "SAFE",
        factCreated: {
          subject: "Diamonds",
          statement: "Negotiation failed, all diamonds surrendered",
          consistency_tags: ["diamonds", "resolution"],
          witnesses: ["npc_smuggler"],
          timestamp: "finale",
          location: "riverbed"
        },
        suspicionChange: {},
        nextDialogueId: "finale_003"
      }
    ]
  },

  {
    id: "finale_003_police",
    speaker: "npc_inspector",
    speakerName: "Inspector Dhanush",
    text: "POLICE! NOBODY MOVE! (To Ram) You have very interesting friends, Mr. Ram. And very interesting things in your pockets.",
    context: "The police arrive -- either because the undercover inspector WAS there, or because Vedham actually called them. The smuggler tries to flee.",
    responses: [
      {
        id: "finale_003_police_a",
        text: "Inspector, these diamonds aren't mine. This man is a smuggler. We found them by accident. We're cooperating fully.",
        type: "SAFE",
        factCreated: {
          subject: "Diamonds",
          statement: "Ram cooperates with police, identifies smuggler, surrenders diamonds",
          consistency_tags: ["diamonds", "resolution", "people"],
          witnesses: ["npc_inspector", "npc_smuggler"],
          timestamp: "finale",
          location: "riverbed"
        },
        suspicionChange: {},
        nextDialogueId: "finale_004",
        note: "Clean police resolution. Diamonds confiscated as evidence. Ram is a witness, not a suspect."
      },
      {
        id: "finale_003_police_b",
        text: "Inspector, I can explain everything. From the beginning. Starting with the temple visit. Which was a real temple visit.",
        type: "DEFLECT",
        factCreated: {
          subject: "Diamonds",
          statement: "Ram attempts to explain everything to police from the beginning",
          consistency_tags: ["diamonds", "resolution"],
          witnesses: ["npc_inspector"],
          timestamp: "finale",
          location: "riverbed"
        },
        suspicionChange: {},
        nextDialogueId: "finale_004",
        note: "Ram starts lying to the POLICE. The irony is complete. The cycle begins again."
      }
    ]
  },

  {
    id: "finale_003_stall",
    speaker: "npc_smuggler",
    speakerName: "The Smuggler",
    text: "(Confused) Your... wife? What does your wife have to do with--",
    context: "The comedic stall. The smuggler is genuinely bewildered by Ram invoking his wife as a threat.",
    responses: [
      {
        id: "finale_003_stall_a",
        text: "You don't know Mythili. She will find out. She ALWAYS finds out. And trust me, you'd rather deal with the police than with her.",
        type: "BOLD",
        factCreated: null,
        suspicionChange: {},
        nextDialogueId: "finale_003",
        note: "The funniest line in the game. The smuggler actually considers this. Then Ram hands over the diamonds anyway."
      },
      {
        id: "finale_003_stall_b",
        text: "(While smuggler is confused, tosses the diamonds) CATCH! (Throws them into the riverbed)",
        type: "BOLD",
        factCreated: {
          subject: "Diamonds",
          statement: "Ram used the Mythili distraction to toss diamonds into riverbed",
          consistency_tags: ["diamonds", "resolution"],
          witnesses: ["npc_smuggler"],
          timestamp: "finale",
          location: "riverbed"
        },
        suspicionChange: {},
        nextDialogueId: "finale_003_toss",
        note: "The ultimate Deflect-into-Toss combo. Evidence Toss triggered via comedy."
      }
    ]
  },

  {
    id: "finale_004",
    speaker: "narrator",
    speakerName: "Narrator",
    text: "The dust settles on the riverbed. The diamonds are gone -- one way or another. What remains is the truth, buried under a hundred lies. And five friends who will never, ever speak of Bangalore again.",
    context: "Final narrative beat. The ending screen that follows depends on the game state: global suspicion level, diamond status, collision count, recovery strategy stats.",
    responses: [
      {
        id: "finale_004_a",
        text: "(Internal monologue) Temple trip. It was always a temple trip. And if I say it enough times, maybe even I'll believe it.",
        type: "SAFE",
        factCreated: null,
        suspicionChange: {},
        nextDialogueId: null,
        note: "Game over. Ending screen loads based on determineEnding() logic."
      },
      {
        id: "finale_004_b",
        text: "(Internal monologue) Next time, we're going to Ooty. No diamonds. No Maggi. Just five idiots and a hill station. What could go wrong?",
        type: "BOLD",
        factCreated: null,
        suspicionChange: {},
        nextDialogueId: null,
        note: "Sequel hook. Game over. Ending screen loads."
      }
    ]
  }
];


// ═══════════════════════════════════════════════════════════════
// SCENE INDEX
// Maps scene IDs to their dialogue arrays for easy lookup
// ═══════════════════════════════════════════════════════════════

export const SCENE_IDS = {
  THE_RETURN: "THE_RETURN",
  UGADI_PARTY: "UGADI_PARTY",
  THE_CONFRONTATION: "THE_CONFRONTATION",
  RIVERBED_FINALE: "RIVERBED_FINALE"
};

/**
 * Returns all dialogue nodes for a given scene.
 */
export const getSceneDialogue = (sceneId) => {
  const sceneMap = {
    [SCENE_IDS.THE_RETURN]: scene1_TheReturn.filter(d => d.id.startsWith("return_")),
    [SCENE_IDS.UGADI_PARTY]: scene1_TheReturn.filter(d => d.id.startsWith("party_")),
    [SCENE_IDS.THE_CONFRONTATION]: scene1_TheReturn.filter(d => d.id.startsWith("confront_")),
    [SCENE_IDS.RIVERBED_FINALE]: scene1_TheReturn.filter(d => d.id.startsWith("finale_"))
  };
  return sceneMap[sceneId] || [];
};

/**
 * Returns the first dialogue node for a scene (the entry point).
 */
export const getSceneEntryDialogue = (sceneId) => {
  const entryMap = {
    [SCENE_IDS.THE_RETURN]: "return_001",
    [SCENE_IDS.UGADI_PARTY]: "party_001",
    [SCENE_IDS.THE_CONFRONTATION]: "confront_001",
    [SCENE_IDS.RIVERBED_FINALE]: "finale_001"
  };
  return findDialogueById(entryMap[sceneId]);
};

/**
 * Finds a dialogue node by its unique ID across all scenes.
 */
export const findDialogueById = (dialogueId) => {
  return scene1_TheReturn.find(d => d.id === dialogueId) || null;
};

/**
 * Returns all dialogue IDs reachable from a given node (for debugging / graph viz).
 */
export const getReachableIds = (dialogueId, visited = new Set()) => {
  if (visited.has(dialogueId)) return visited;
  visited.add(dialogueId);

  const node = findDialogueById(dialogueId);
  if (!node) return visited;

  for (const response of node.responses) {
    if (response.nextDialogueId) {
      getReachableIds(response.nextDialogueId, visited);
    }
  }
  return visited;
};

export default scene1_TheReturn;
