/**
 * Chaos events — unpreventable random events that guarantee minimum chaos.
 * Each event has effects (suspicion changes) and a notification.
 */

export const CHAOS_EVENTS = {
  RECEIPT_DISCOVERY: {
    id: 'RECEIPT_DISCOVERY',
    title: 'Receipt Found!',
    description: "Mrs. Reddy found a crumpled receipt from 'Paradise Lounge' in Reddy's coat pocket.",
    scenes: ['UGADI_PARTY', 'THE_CONFRONTATION'],
    effect: { targetWife: 'wife_mrs_reddy', suspicionDelta: 8 },
  },
  PHONE_RING: {
    id: 'PHONE_RING',
    title: 'Unknown Caller!',
    description: "Ram's phone rings. The caller ID shows 'Maggi' in big letters. Everyone stares.",
    scenes: ['UGADI_PARTY', 'THE_CONFRONTATION'],
    effect: { allWives: true, suspicionDelta: 5 },
  },
  PHOTO_SURFACE: {
    id: 'PHOTO_SURFACE',
    title: 'Photo Evidence!',
    description: "A group photo from the 'birthday celebration' has surfaced on Ayyappan's WhatsApp status.",
    scenes: ['UGADI_PARTY'],
    effect: { targetWife: 'wife_mythili', suspicionDelta: 10 },
  },
  DRUNK_DIAL: {
    id: 'DRUNK_DIAL',
    title: 'Drunk Dial!',
    description: "Vedham accidentally pocket-dials Janaki while loudly discussing 'that night at the club.'",
    scenes: ['UGADI_PARTY', 'THE_CONFRONTATION'],
    effect: { targetWife: 'wife_janaki', suspicionDelta: 12 },
  },
  BATHROOM_CONFERENCE: {
    id: 'BATHROOM_CONFERENCE',
    title: 'Bathroom Conspiracy!',
    description: "Three wives were spotted whispering in the bathroom. They emerge looking very determined.",
    scenes: ['UGADI_PARTY', 'THE_CONFRONTATION'],
    effect: { allWives: true, suspicionDelta: 3 },
  },
  NAGESH_ARRIVES: {
    id: 'NAGESH_ARRIVES',
    title: 'Unexpected Guest!',
    description: "Nagesh, the nosy neighbor, has arrived uninvited. He saw 'interesting things' from his balcony.",
    scenes: ['UGADI_PARTY'],
    effect: { allWives: true, suspicionDelta: 4 },
  },
  MAGGI_WALKS_IN: {
    id: 'MAGGI_WALKS_IN',
    title: 'MAGGI HAS ARRIVED!',
    description: "The door swings open. Maggi stands there with a dangerous smile. Every wife in the room turns to look at Ram.",
    scenes: ['THE_CONFRONTATION'],
    effect: { allWives: true, suspicionDelta: 8 },
  },
  SMUGGLER_ARRIVES: {
    id: 'SMUGGLER_ARRIVES',
    title: 'Diamond Contact!',
    description: "A man in sunglasses asks for Ram at the door. He loudly says, 'I'm here about the Maragadham deal.'",
    scenes: ['RIVERBED_FINALE'],
    effect: { allWives: true, suspicionDelta: 10, diamondRisk: true },
  },
};

/**
 * Minimum chaos events per scene (chaos floor).
 */
export const CHAOS_FLOOR = {
  THE_RETURN: 1,
  UGADI_PARTY: 3,
  THE_CONFRONTATION: 2,
  RIVERBED_FINALE: 1,
};

/**
 * Get available chaos events for a scene, excluding already triggered ones.
 */
export function getAvailableChaosEvents(sceneId, triggeredIds = []) {
  return Object.values(CHAOS_EVENTS).filter(
    (e) => e.scenes.includes(sceneId) && !triggeredIds.includes(e.id)
  );
}

/**
 * Pick a random chaos event for a scene.
 */
export function pickChaosEvent(sceneId, triggeredIds = []) {
  const available = getAvailableChaosEvents(sceneId, triggeredIds);
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}
