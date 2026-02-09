// ---------------------------------------------------------------------------
// Vai Raja Vai v3.0 — Panic Leak Dialogues
// Contextual leak strings per failureStyle × panic tier
// ---------------------------------------------------------------------------

const panicLeaks = {
  OVER_EXPLAINER: {
    low: [
      "Actually, funny story about Bangalore — well, not funny exactly, more like... complicated. Very complicated.",
      "See, the thing about that night is — and I want to be precise here — there were extenuating circumstances.",
      "Let me explain from the beginning. Wait, no, from BEFORE the beginning. There's important context.",
      "It wasn't technically illegal. Well, technically it was, but morally? That's a different conversation.",
    ],
    high: [
      "The body wasn't — I mean, she wasn't — look, let me start over. There was a woman. She was... not alive. Temporarily!",
      "Ram said to never mention the riverbed. So I won't mention the riverbed. Forget I said riverbed.",
      "It's simple, really: we went to Bangalore, we hired a — we visited a TEMPLE. Yes. A temple.",
      "The blanket was for — actually, you know what, let's change the subject. The weather is nice today.",
    ],
    critical: [
      "WE DIDN'T KILL HER! She was already dead! Or was she? I'm not sure anymore. But we didn't do it!",
      "The diamonds are safe! Ram hid them in — oh god, I wasn't supposed to say that. What diamonds? No diamonds.",
      "I have to tell someone. We drove to a riverbed outside Bangalore and we — I need to sit down. I feel sick.",
      "Ask Ram about the phone. Or don't. Actually, don't. Forget the phone. What phone? WHOSE phone?!",
    ],
  },
  NERVOUS: {
    low: [
      "I'm fine. Why do you ask? Is something wrong? Did someone say something? About Bangalore? No? Okay. I'm fine.",
      "Excuse me, I need some water. And air. And possibly a new identity. I mean, water. Just water.",
      "H-how's your evening? Good? Great. Mine is... also fine. Very fine. Extremely fine. ...I need to go.",
      "Does it feel hot in here? It feels hot. Is that normal? Am I sweating? I feel like I'm sweating.",
    ],
    high: [
      "P-please don't look at me like that. I haven't done anything. WE haven't done anything. Nobody has done anything.",
      "I can't eat. The food looks like — it looks red. Everything looks red tonight. Is that normal?",
      "If — hypothetically — someone needed a lawyer, where would they... I mean, for a friend. A hypothetical friend.",
      "I keep seeing her face. Whose face? Nobody's face. I didn't say face. You're hearing things.",
    ],
    critical: [
      "I c-can't do this anymore. I can't keep pretending everything is normal. NOTHING IS NORMAL.",
      "We should turn ourselves in. Ram will understand. He wanted to call the police in the first place.",
      "I'm going to be sick. Literally. Not metaphorically. Where is the bathroom? I need the bathroom NOW.",
      "SHE'S DEAD AND WE LEFT HER IN A — I'm sorry. I'm sorry. I didn't say anything. Please forget that.",
    ],
  },
  AGREEABLE: {
    low: [
      "Yes, lovely party! Yes, the trip was great! Yes, we visited temples! Yes, we also went to the beach! ...wait, did you say beach?",
      "Absolutely! Ram is a wonderful person! He would never — yes, exactly! Whatever you just said, yes!",
      "Oh, you heard about the trip? Yes! It was exactly like you described. Every detail. Spot on.",
      "Sure! Correct! That's what happened! Which part? All of it! Every single thing you said!",
    ],
    high: [
      "Yes, we went to Bangalore. Yes, there was a woman. Yes — wait. What did I just agree to?",
      "You're absolutely right about — hold on, what was the question? Because I might have agreed to the wrong thing.",
      "Yes yes yes! I agree completely! Ram did — um, what exactly are you saying Ram did? Because yes to that too!",
      "Temples, yes! Shopping, yes! Body in a river — TEMPLES! I said temples! Only temples!",
    ],
    critical: [
      "YES WE DID IT! Wait — did what? What are you accusing us of? Because whatever it is, yes! I mean NO!",
      "You want to know what happened in Bangalore? Fine! Yes! We — actually, you tell me first what you think happened.",
      "I'm tired of lying. Yes to everything. All of it. Whatever the worst thing you can imagine is — that's probably close.",
      "Yes, there were diamonds. Yes, there was a body. Yes, it was a riverbed. I'M TIRED OF SAYING YES TO LIES!",
    ],
  },
  LOOSE_CANNON: {
    low: [
      "Why are you looking at me like that? You got a problem? Because I don't have any problems. ZERO problems.",
      "Some people should mind their own business. Just saying. Not about anything specific. Just... generally.",
      "If one more person asks me about Bangalore, I swear I'll — I mean, what about Bangalore? Nothing about Bangalore.",
      "Everything is FINE. Do I look like a man with something to hide? Because I'm NOT. So back off.",
    ],
    high: [
      "WHO TOLD YOU?! Nobody was supposed to — look, whatever you heard, it's LIES. All of it. Total fabrication.",
      "You want to know the truth? The TRUTH?! You can't HANDLE the — actually, forget it. Forget I said anything.",
      "Touch my phone and I'll break your hand. There's nothing on my phone. NOTHING. Stop looking at it.",
      "I didn't do ANYTHING wrong! Ram's the one who — actually, Ram didn't do anything either. Nobody did anything!",
    ],
    critical: [
      "WHO TOLD YOU ABOUT THE BODY?! I mean — WHAT BODY?! THERE IS NO BODY! WHY WOULD YOU EVEN ASK THAT?!",
      "FINE! You want to hear it?! We went to Bangalore, things went SIDEWAYS, and now there are DIAMONDS and a DEAD WOMAN and —",
      "I'M DONE PRETENDING! You people think you're so smart? WE HID A BODY IN A RIVERBED AND FOUND DIAMONDS! There! HAPPY?!",
      "IF THAT SMUGGLER SHOWS UP HERE, I'LL KILL HIM! And then we'll have TWO bodies to — wait, forget I said that.",
    ],
  },
};

export { panicLeaks };
export default panicLeaks;
