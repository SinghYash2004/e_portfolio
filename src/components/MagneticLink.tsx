'use client';

import {
  AnchorHTMLAttributes,
  HTMLAttributeAnchorTarget,
  CSSProperties,
  ReactNode,
  useState,
} from 'react';

type MagneticLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
  download?: boolean;
  style?: CSSProperties;
};

type PointerState = {
  x: number;
  y: number;
};

const INITIAL_POINTER: PointerState = { x: 0, y: 0 };

export default function MagneticLink({
  children,
  className = '',
  href,
  target,
  rel,
  download,
  style,
}: MagneticLinkProps) {
  const [pointer, setPointer] = useState<PointerState>(INITIAL_POINTER);
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );

  const handleMove: AnchorHTMLAttributes<HTMLAnchorElement>['onMouseMove'] = (event) => {
    if (!enabled) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 14;
    setPointer({ x, y });
  };

  const handleLeave: AnchorHTMLAttributes<HTMLAnchorElement>['onMouseLeave'] = () => {
    setPointer(INITIAL_POINTER);
  };

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      download={download}
      className={`magnetic-link ${className}`.trim()}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        ...style,
        transform: enabled
          ? `translate3d(${pointer.x}px, ${pointer.y}px, 0)`
          : style?.transform,
      }}
    >
      <span className="magnetic-link__inner">{children}</span>
    </a>
  );
}
