import { motion } from 'framer-motion';
import DialogueBox from './DialogueBox';
import ResponseOptions from './ResponseOptions';

export default function AmbushEvent({ ambush, onResolve }) {
  if (!ambush) return null;

  const { dialogue, wife } = ambush;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="mx-4 w-full max-w-lg space-y-4 rounded-2xl border border-kollywood-saffron/30 bg-kollywood-deep p-6 shadow-2xl"
      >
        <DialogueBox
          speaker={wife?.name || 'Wife'}
          text={dialogue.trigger}
          speakerColor={wife?.color || '#D946EF'}
          isAmbush
        />

        <ResponseOptions
          options={dialogue.responses.map((r) => ({
            id: r.id,
            text: r.text,
          }))}
          onSelect={(optionId) => {
            const response = dialogue.responses.find((r) => r.id === optionId);
            if (response) onResolve(response.option);
          }}
        />
      </motion.div>
    </motion.div>
  );
}
