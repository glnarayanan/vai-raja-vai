/**
 * Chaotic Blurt Pool
 *
 * Contains all the chaotic dialogue that friends blurt when un-synced
 * (haven't been updated via "Vai Raja Vai") or when drunk (reliability < 40).
 *
 * Organized by subject category and friend failure style:
 *   OVER_EXPLAINER  - Ayyappan Nair (adds obsessive details)
 *   NERVOUS         - Vedham (panics, sweats, self-incriminates through denial)
 *   AGREEABLE       - Hegde (says yes to everything, creates instant contradictions)
 *   LOOSE_CANNON    - Reddy (mentions diamonds, dead bodies, Maggi by name)
 *
 * Usage:
 *   import { chaoticPool } from './chaoticPool';
 *   const blurt = chaoticPool[subject][failureStyle][randomIndex];
 */

export const chaoticPool = {
  // ─────────────────────────────────────────────
  // LOCATION - Where did you go in Bangalore?
  // ─────────────────────────────────────────────
  location: {
    OVER_EXPLAINER: [
      "The temple at exactly 3:47 PM. It was slightly overcast, about 23 degrees. Ram was wearing his blue shirt -- the one with the small coffee stain near the collar.",
      "The lodge on MG Road, room 304, second floor, right next to the ice machine. The wallpaper had tiny roses on it.",
      "We were at that specific intersection of 5th Main and 12th Cross. I remember because the street sign was slightly crooked.",
      "The restaurant -- the one with exactly 14 tables. I counted. Twice. The waiter's name was Raju. Or was it Raju's brother?",
      "It was the temple near the bus stand. Not the big temple, the small one behind the petrol bunk. The one where the priest has a mole on his left cheek. No wait, right cheek.",
      "We checked in at 4:12 PM. I know because the clock at the reception was 3 minutes fast, and my watch said 4:09, and I trust my watch more than any hotel clock."
    ],
    NERVOUS: [
      "I... uh... somewhere? I mean, does it matter? Why are you asking? Is this a trap?",
      "We were at the... the place. You know. THE place. Everyone knows the place. Right? RIGHT?",
      "Location? Ha ha. That's a funny question. Very specific. Very pointed. I'm fine. Everything is fine.",
      "I don't remember anything! Not because anything happened! Just because I have a bad memory! Very normal!",
      "Why does it matter where exactly? We were in Bangalore. Bangalore is a city. Cities have places. We were at one of them. Can we move on?",
      "I need some water. My throat is very dry. It has nothing to do with your question. Unrelated dryness."
    ],
    AGREEABLE: [
      "Yes, the temple! Absolutely! ...And also the pub. Both! At the same time! Is that possible? Yes!",
      "You're right, we were there! And also where you said! And everywhere else too!",
      "Temple? Yes! Pub? Also yes! Beach? Why not! I agree with everything!",
      "Wherever Ram said we were, that's exactly where we were. Also wherever you think we were. Both are true!",
      "MG Road? Yes! Brigade Road? Also yes! We were on all roads simultaneously! Very efficient trip!",
      "Yes yes yes. That place. And the other place. We are very thorough tourists."
    ],
    LOOSE_CANNON: [
      "Budget lodge? Then why did the room have a gold-plated bathtub and a 'Vavvaal' hanging from the ceiling?",
      "Quiet place? The bass was so loud my chest was vibrating! And the priest was wearing a bikini!",
      "Oh that place where we DEFINITELY didn't see that girl who was lying on the floor not moving? Yeah, lovely spot.",
      "I think the more interesting question is why there were diamonds in the phone. Oh wait, forget I said that.",
      "The lodge was fine. Very normal. If you ignore the bloodstains. I mean, the ketchup stains. From the room service.",
      "We went to that one place. The one with the... you know... where the thing happened with the girl. The normal thing. That everyone does."
    ]
  },

  // ─────────────────────────────────────────────
  // ACTIVITY - What did you do there?
  // ─────────────────────────────────────────────
  activity: {
    OVER_EXPLAINER: [
      "We were praying. Very spiritual. For exactly 47 minutes. I timed it on my watch -- the Casio one, not the Titan.",
      "Simple dinner. Just rice and sambar. Well, and the champagne. But mostly rice and sambar.",
      "We were sleeping by 9 PM. After the party. I mean, there was no party. We were just sleeping. Very tired from praying.",
      "Temple visit followed by meditation. The meditation was at a bar, but it's a very spiritual bar.",
      "We played cards. Just friendly cards. The stakes were only Rs. 50. Per hand. For 6 hours. With a professional dealer we hired.",
      "Light walking and sightseeing. Approximately 8,247 steps. My pedometer is very accurate. We saw 3 temples, 2 parks, and one incident I won't describe."
    ],
    NERVOUS: [
      "Nothing! We did absolutely nothing! Just... existed. In a space. Is that suspicious? It shouldn't be!",
      "Normal things! Very normal! Nothing illegal or immoral or... why am I sweating?",
      "We just... you know... the usual... I'm going to stop talking now if that's okay.",
      "What did we do? Good question. Excellent question. I need to use the bathroom.",
      "We did NOT hire anyone. That's the main thing. No hiring of any kind. Of any person. Especially women. I mean -- regular tourism!",
      "I plead the fifth! I mean, I don't remember! Those are very different things! I mean the second one!"
    ],
    AGREEABLE: [
      "Yes, temple! Also yes, party! We did both! We did everything you can imagine! All of it!",
      "You're absolutely right, we did that! And also what she said! And what he said! Everyone is correct!",
      "Prayed? Yes! Danced? Also yes! Both at the same time? Apparently, yes!",
      "Whatever you heard is right. Even the contradictory parts. I support all versions.",
      "Sightseeing! And also sleeping! And also the thing Reddy mentioned! All true! Equally!",
      "We did exactly what you think we did. And also what she thinks. I'm a very agreeable person."
    ],
    LOOSE_CANNON: [
      "We definitely didn't hire a call girl named Maggi. That would be crazy! Ha ha! ...Why is everyone looking at me?",
      "We ate simple curd rice. The champagne we poured on it was chef's kiss though.",
      "Sleeping by 10 PM? Then who was that guy who looked like me dancing on the table at 2 AM? My twin brother, Ganesh?",
      "You know what we did? We found a BODY. I mean a 'body of water.' A lake. Very scenic. No dead people.",
      "Nothing happened! Except the part with the diamonds. And the girl. And the panic. But OTHER than that -- nothing!",
      "Sightseeing! We saw many sights! Some of them were even alive! I mean -- all of them were alive. Obviously. Why wouldn't they be?"
    ]
  },

  // ─────────────────────────────────────────────
  // TIME - When did things happen?
  // ─────────────────────────────────────────────
  time: {
    OVER_EXPLAINER: [
      "We arrived at 3:47 PM. No wait, 3:48. My watch gains 30 seconds every hour, so accounting for that...",
      "Left at dawn. Which in Bangalore in March is 6:12 AM. I checked the almanac.",
      "The whole thing took exactly 2 hours, 17 minutes and 34 seconds. I was counting my heartbeats.",
      "We were there from 4 PM to 6 PM. Then 6 PM to 4 AM. But that second part didn't happen.",
      "I can tell you the exact minute we left. 11:47 PM. I know because the clock on the wall was reflecting in the... never mind what it was reflecting in.",
      "Let me reconstruct the timeline. 3:00 PM arrival, 3:15 PM check-in, 3:17 PM... actually, let me start over. Do you have a whiteboard?"
    ],
    NERVOUS: [
      "Time? What is time? I've lost all sense of it since Banga-- I mean, since we came back!",
      "Early! Late! Both! I don't know! My phone died and I can't remember anything without my phone!",
      "We were there for... a period of time. Between zero and infinity hours. I'm not narrowing it down.",
      "I blacked out! I mean, I fell asleep! Normal sleep! Not suspicious unconsciousness!",
      "My watch broke! Very convenient timing for it to break, I know. But it did. So I have no time-based information. None.",
      "Can we talk about something else? Like the weather? The weather is very nice today. Look at those clouds."
    ],
    AGREEABLE: [
      "3 PM? Yes! 5 PM? Also yes! Midnight? Sure, why not! I was there at all times simultaneously!",
      "Yes, that's exactly the time! Also the other time she mentioned! Both! All times are valid!",
      "When you say 'what time,' every time is the right answer! I'm very flexible with time!",
      "Morning, afternoon, evening -- we were there for all of them! Time is a circle!",
      "6 PM? Absolutely! Oh, Ram said 4 PM? Then 4 PM! Both are correct! Time is relative, Einstein said so!",
      "Yes to all time-based questions. I'm done fighting the clock."
    ],
    LOOSE_CANNON: [
      "It was late. Very late. 'Disposing of evidence' late. I mean... 'disposing of dinner leftovers' late.",
      "Time flies when you're having fun! Also when you're panicking about hidden diamonds!",
      "We lost track of time after the third -- I mean, we were home by 9 PM. In bed. Alone. With no diamonds.",
      "Does it matter what time? The real question is what happened at that time. Which is NOTHING. Absolutely nothing.",
      "It was around the time that girl stopped moving. I mean, around sunset. Beautiful sunset. Nothing else happened at sunset.",
      "We left at 'oh god what have we done' o'clock. I mean, 7 PM. Very normal departure time."
    ]
  },

  // ─────────────────────────────────────────────
  // PEOPLE - Who was there?
  // ─────────────────────────────────────────────
  people: {
    OVER_EXPLAINER: [
      "Just us five. Nobody else. Well, there was a girl but she was just... there. Her name started with M. Magg-- I mean, Mary.",
      "It was just Ram, me, Vedham, Hegde, and Reddy. And a driver. And a hotel manager. And a woman who may or may not have been breathing.",
      "Five friends on a spiritual journey. The woman in the hotel room was a spiritual guide. A very unconscious spiritual guide.",
      "We didn't see anyone! Except the 47 people I can describe in detail including their shoe sizes.",
      "There was a taxi driver named Murugan. License plate KA-01-AB-1234. He had a small scar on his left hand. He drove us to... a place. With no other people.",
      "Just us five and approximately zero additional humans. The girl-shaped shadow in the corner was a coat rack."
    ],
    NERVOUS: [
      "No one! We saw no one! Especially not anyone named Maggi! Who even is Maggi?! I DON'T KNOW HER!",
      "People? What people? Just us! Alone! In a room! With nothing suspicious happening!",
      "We were the only ones there! The woman? What woman? WHAT WOMAN?!",
      "Five men, zero women, zero dead bodies, zero diamonds. The math checks out! STOP ASKING!",
      "I've never met anyone named Maggi or Maragathavalli or any variation of that name in my ENTIRE LIFE!",
      "Why would there be other people? We went to pray! At a temple! Alone! WITHOUT ANY WOMEN PRESENT!"
    ],
    AGREEABLE: [
      "Yes, we met her! And also didn't meet her! Both are true depending on who's asking!",
      "Everyone you mentioned was there! And also wasn't! I agree with your version completely!",
      "Maggi? Yes! No Maggi? Also yes! I support whatever reality you prefer!",
      "You're right, we were alone! Also you're right, there was someone else! Both!",
      "Five people? Yes! Six people? Also yes! Seven? I'll agree to any number!",
      "Whoever you think was there, that's exactly who was there. My memory adapts to your expectations."
    ],
    LOOSE_CANNON: [
      "We didn't see any girls there. Except for that one 'Maggi' girl... but she was mostly just lying on the floor not moving.",
      "Five guys, one girl, some diamonds, a 'dead' body -- normal Bangalore trip stuff!",
      "Maggi? Oh, the girl who DIED? I mean, who 'went to sleep'? On the floor? In a very natural way?",
      "Nobody important! Just a girl named Maragathavalli who had diamonds worth crores! But otherwise, nobody!",
      "There was a girl. She's fine now. She was less fine earlier. Like, much less fine. Like, not-breathing levels of less fine. But NOW she's fine!",
      "No women! Well, one woman. A professional woman. Professional at... lying on floors. It's a career choice, don't judge."
    ]
  },

  // ─────────────────────────────────────────────
  // TRANSPORT - How did you travel?
  // ─────────────────────────────────────────────
  transport: {
    OVER_EXPLAINER: [
      "We took the 6:15 AM Shatabdi. Coach C, seats 23 through 27. The pantry car had excellent filter coffee -- exactly 78 degrees Celsius.",
      "Reddy drove. His car -- the white Indica, license plate TN-09-BQ-4471. Odometer read 47,832 km when we started. 48,214 when we returned.",
      "The auto from the station to the hotel cost Rs. 187. I have the receipt. It was a green auto with a Rajinikanth sticker on the windshield.",
      "We flew. IndiGo flight 6E-234. Departed at 7:05 AM, landed at 8:10 AM. Slight turbulence at 35,000 feet. The air hostess had a mole near her lip."
    ],
    NERVOUS: [
      "We... traveled? By some method? Look, I can't be expected to remember EVERY detail about EVERY vehicle!",
      "Train! No, car! No, bus! I mean -- does it matter HOW we got there? The important thing is we came BACK. Alive. All of us. Just us five.",
      "Why are you asking about transport? Are you checking our alibi? We don't NEED an alibi because NOTHING HAPPENED!",
      "I think I walked? My legs hurt. But that could be from the running. I mean, the jogging. Morning exercise. Very healthy."
    ],
    AGREEABLE: [
      "Train? Yes! Car? Also yes! We took both! Maybe even a helicopter! I agree with all modes of transport!",
      "However you heard we got there, that's exactly how we got there. Also any other way. Both. All ways.",
      "You're absolutely right, we drove! And flew! And walked! All at the same time, somehow!",
      "Yes to train, yes to bus, yes to teleportation. I'm not picky about facts."
    ],
    LOOSE_CANNON: [
      "A taxi with a helicopter propeller? Because I remember seeing the clouds from the sunroof!",
      "The car didn't break down, it just... stopped existing for a few hours. Like my memories!",
      "We took Reddy's car. He drove so fast because we were trying to get away from -- I mean, trying to reach the temple before it closed.",
      "Normal transport! The kind of transport you use when you're NOT fleeing a crime scene! Which we weren't! We were sightseeing!"
    ]
  },

  // ─────────────────────────────────────────────
  // MONEY - What did you spend on?
  // ─────────────────────────────────────────────
  money: {
    OVER_EXPLAINER: [
      "Total trip cost: Rs. 4,782. Broken down -- Rs. 1,200 for the lodge, Rs. 800 for food, Rs. 1,500 for the... spiritual donation, and Rs. 1,282 for miscellaneous. I have the spreadsheet.",
      "Very reasonable trip. Only Rs. 200 per person per day. Not counting the Rs. 15,000 for the... premium temple experience.",
      "I kept every receipt. All 47 of them. Want to see? I have them organized by date, time, and vendor. The ones from after midnight are a bit crumpled.",
      "Budget trip! Rs. 5,000 total. The diamonds were free. I mean, there were no diamonds. The hypothetical diamonds would have been free."
    ],
    NERVOUS: [
      "Money? We barely spent anything! Nothing suspicious! No large cash withdrawals at 2 AM! That didn't happen!",
      "I don't track money! Who tracks money? Very suspicious people track money! I am NOT suspicious!",
      "The bill? What bill? Bills are just paper. Paper is meaningless. Can we talk about literally anything else?",
      "Zero rupees on anything illegal! I want to be very clear about that! ZERO!"
    ],
    AGREEABLE: [
      "Yes, it was cheap! Also yes, it was expensive! Both! We got our money's worth either way!",
      "Whatever amount you heard, that's the right amount! Even if different people heard different amounts!",
      "Rs. 500? Yes! Rs. 50,000? Also yes! I agree with all financial figures!",
      "The budget was flexible. Infinitely flexible. Like my commitment to the truth."
    ],
    LOOSE_CANNON: [
      "Budget trip! Unless you count the diamonds. Do you count diamonds as a travel expense? Asking for a friend.",
      "We didn't pay for anything illegal. The girl was NOT a paid professional. I mean, what girl?",
      "Cheap trip! Free, actually, if you factor in the value of the diamonds we found. I mean, DIDN'T find.",
      "The hotel was Rs. 2,000 per night. The emergency cleanup fee was extra. For the... room service spill."
    ]
  },

  // ─────────────────────────────────────────────
  // REASON - Why did you go to Bangalore?
  // ─────────────────────────────────────────────
  reason: {
    OVER_EXPLAINER: [
      "Ram's birthday! His 35th. Born on March 14th, a Pisces, which explains his emotional state recently. The trip was planned on February 28th at exactly 9:15 PM during a phone call that lasted 23 minutes.",
      "Spiritual retreat. We go every year. This year we chose Bangalore because the temple at 3rd Cross has a special puja on the second Tuesday of the month, and we calculated that--",
      "Business meeting. Very important client. Mr... uh... Clientman. From Clientman Industries. They make... clients.",
      "We had a coupon for the lodge. 30% off. Expires March 31st. The terms and conditions were 4 pages long. I read every word."
    ],
    NERVOUS: [
      "Why? WHY? Do people need REASONS to go places? I go where I want! I'm a free man! A VERY free man!",
      "Ram needed... a break. From... life. Normal life stress! NOT because of anything specific! Just GENERAL stress!",
      "Temple visit! Simple temple visit! No ulterior motives! Who said there were ulterior motives?!",
      "Vacation! Holiday! R&R! Rest and relaxation! Not Rest and Removing Evidence! Ha ha! That was a joke! A BAD joke!"
    ],
    AGREEABLE: [
      "Yes, for Ram's birthday! And also for business! And also for temple! All three reasons! Simultaneously!",
      "You're right, it was a spiritual trip! Also you're right, it was for fun! Every reason you suggest is the correct one!",
      "We went for the reason you think we went! Whatever that reason is! I agree completely!",
      "Birthday AND business AND vacation AND temple AND -- yes, all of the above. We're very efficient."
    ],
    LOOSE_CANNON: [
      "To cheer Ram up after Mythili left! We hired a -- I mean, we visited a temple. To pray for their reunion.",
      "Birthday party for Ram! The best kind! The kind with... entertainment. Professional entertainment. NOT that kind of professional. Or maybe--",
      "We went to forget Ram's sorrows! Mission accomplished! We created entirely NEW sorrows!",
      "Honestly? Because someone thought it would be funny to hire a -- actually, I'm going to stop talking now."
    ]
  }
};

export default chaoticPool;
