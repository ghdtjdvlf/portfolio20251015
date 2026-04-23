'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';

interface SplitTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;        // stagger delay per char (ms)
  duration?: number;     // animation duration (s)
  ease?: number[];
  splitType?: 'char' | 'word';
  from?: { y?: number | string; opacity?: number; x?: number | string };
  threshold?: number;
  once?: boolean;
  tag?: keyof JSX.IntrinsicElements;
  initialDelay?: number; // delay before animation starts (s)
}

const DEFAULT_EASE = [0.76, 0, 0.24, 1];

export default function SplitText({
  text,
  className = '',
  delay = 40,
  duration = 0.6,
  ease = DEFAULT_EASE,
  splitType = 'char',
  from = { y: '110%', opacity: 1 },
  threshold = 0.1,
  once = true,
  tag: Tag = 'span',
  initialDelay = 0,
  style,
}: SplitTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const items = splitType === 'char'
    ? text.split('')
    : text.split(' ');

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ display: 'block', ...style }}
      aria-label={text}
    >
      {items.map((item, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={from}
            animate={isInView ? { y: 0, x: 0, opacity: 1 } : from}
            transition={{
              duration,
              delay: initialDelay + (i * delay) / 1000,
              ease,
            }}
          >
            {item === ' ' ? '\u00A0' : item}
          </motion.span>
          {splitType === 'word' && i < items.length - 1 && '\u00A0'}
        </span>
      ))}
    </Tag>
  );
}
