import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function DialogueBox({
  speaker,
  text,
  speakerColor = '#0F766E',
  isAmbush = false,
  isPressured = false,
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const intervalRef = useRef(null);
  const textRef = useRef(text);

  const typingSpeed = isPressured ? 20 : 28;

  useEffect(() => {
    if (text === textRef.current && displayedText === text) return;
    textRef.current = text;

    setDisplayedText('');
    setIsTyping(true);

    let index = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsTyping(false);
      }
    }, typingSpeed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text, typingSpeed]);

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl border bg-surface p-6 ${
        isAmbush ? 'border-saffron' : 'border-ink-faint/30'
      }`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Speaker name */}
      {speaker && (
        <div className="mb-2 flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: speakerColor }}
          />
          <span
            className="text-sm font-bold uppercase tracking-wide"
            style={{ color: speakerColor }}
          >
            {speaker}
          </span>
        </div>
      )}

      {/* Dialogue text */}
      <p className="min-h-[3rem] text-base leading-relaxed text-ink">
        {displayedText}
        {isTyping && (
          <motion.span
            className="ml-0.5 inline-block h-4 w-0.5 align-middle bg-ink/40"
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
          />
        )}
      </p>
    </motion.div>
  );
}
