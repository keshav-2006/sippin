'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/** Honour the OS "reduce motion" setting for every transform animation. */
export default function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

