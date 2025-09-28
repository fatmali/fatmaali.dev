"use client";

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';

export interface TocItem { id: string; text: string; level: number; }

interface Props { items: TocItem[]; }

export default function TableOfContents({ items }: Props) {
  const [active, setActive] = useState<string>('');
  const [useFixed, setUseFixed] = useState(false); // JS fallback for browsers where sticky inside complex flex fails
  const [left, setLeft] = useState<number | null>(null);
  const [articleHeight, setArticleHeight] = useState<number | null>(null);
  const [atBottom, setAtBottom] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const articleRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!items.length) return;
    const headings = items
      .map(i => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];

    // Set initial active (first heading) if none yet
    if (!active && headings.length) setActive(headings[0].id);

    // IntersectionObserver to determine which heading is in view.
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length) {
          // Pick the top-most visible heading
            const topMost = visible.reduce((prev, curr) =>
              curr.boundingClientRect.top < prev.boundingClientRect.top ? curr : prev
            );
            setActive(topMost.target.id);
        } else {
          // Fallback: find last heading above current scroll position
          const scrollY = window.scrollY + 120; // offset for nav height
          let current = headings[0].id;
          for (const h of headings) {
            if (h.offsetTop <= scrollY) current = h.id; else break;
          }
          setActive(current);
        }
      },
      { rootMargin: '0px 0px -70% 0px', threshold: [0, 0.25, 1] }
    );
    headings.forEach(h => observer.observe(h));
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  // JS fallback: detect when to switch to fixed if sticky not holding.
  useEffect(() => {
    if (!wrapperRef.current) return;
    // Locate article container to bound TOC
    const articleEl = document.querySelector('[data-article-container]') as HTMLElement | null;
    if (articleEl) {
      articleRef.current = articleEl;
      const setH = () => setArticleHeight(articleEl.offsetHeight);
      setH();
      // Observe size changes (e.g. images loading)
      const ro = 'ResizeObserver' in window ? new ResizeObserver(setH) : null;
      ro?.observe(articleEl);
      window.addEventListener('resize', setH);
      // Clean up
      const cleanupSize = () => {
        window.removeEventListener('resize', setH);
        ro?.disconnect();
      };
      // Scroll / position handler
      const placeholder = wrapperRef.current;
      const initialTop = placeholder.getBoundingClientRect().top + window.scrollY;
      const handle = () => {
        const shouldFix = window.scrollY + 112 > initialTop; // 112px ~= top-28 (7rem)
        if (shouldFix) {
          const rect = placeholder.getBoundingClientRect();
            setLeft(rect.left);
        }
        setUseFixed(shouldFix);

        // Bottom boundary logic
        if (articleRef.current && navRef.current) {
          const articleBottom = articleRef.current.offsetTop + articleRef.current.offsetHeight;
          const tocHeight = navRef.current.offsetHeight;
          const currentTop = window.scrollY + 112; // where top of TOC would sit while fixed
          // If TOC bottom would extend past article bottom, lock it.
          if (currentTop + tocHeight >= articleBottom - 8) {
            setAtBottom(true);
          } else {
            setAtBottom(false);
          }
        }
      };
      window.addEventListener('scroll', handle, { passive: true });
      handle();
      return () => {
        window.removeEventListener('scroll', handle);
        cleanupSize();
      };
    }
  }, []);

  if (!items.length) return null;

  return (
    <div
      ref={wrapperRef}
      className={cn(
        'hidden xl:block w-64 shrink-0 self-start relative',
        articleHeight ? '' : ''
      )}
      style={articleHeight ? { height: articleHeight } : undefined}
    >
      <nav
        ref={navRef}
        className={cn(
          'w-64',
          atBottom
            ? 'absolute bottom-0'
            : useFixed
              ? 'fixed top-28'
              : 'sticky top-28'
        )}
        style={
          atBottom
            ? {}
            : useFixed && left !== null
              ? { left, maxHeight: 'calc(100vh - 7rem)' }
              : { maxHeight: 'calc(100vh - 7rem)' }
        }
        aria-label="Table of contents"
      >
        <p className="text-[11px] font-semibold uppercase tracking-wide mb-2 text-muted-foreground/80">On this page</p>
        <div className="max-h-[calc(100vh-9rem)] overflow-y-auto pr-3">
          <ul className="space-y-0.5 text-[12px] leading-relaxed text-muted-foreground/70">
            {items.map(item => (
              <li key={item.id} style={{ marginLeft: (item.level - 2) * 12 }}>
                <a
                  href={`#${item.id}`}
                  className={cn(
                    'block rounded px-2 py-0.5 hover:bg-muted/40 transition-colors border-l-2',
                    active === item.id
                      ? 'text-primary bg-muted/60 font-medium border-primary'
                      : 'text-muted-foreground/60 border-transparent hover:text-muted-foreground'
                  )}
                  aria-current={active === item.id ? 'true' : undefined}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}