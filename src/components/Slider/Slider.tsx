import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from '@assets/icons';
import { classNames } from '@utils/helpers';

export interface SliderProps<T> {
  /** The data to render — the slider itself never inspects its shape. */
  items: T[];
  /** Renders one item. Receives the raw data item, fully generic. */
  renderItem: (item: T, index: number) => React.ReactNode;
  /** Stable key extractor. Falls back to array index. */
  getKey?: (item: T, index: number) => React.Key;
  /** Space between items. Any valid CSS gap value. */
  gap?: string;
  /** Slider height. Defaults to '100%' so it adopts whatever height the parent container sets (or content height, if the parent has none). */
  height?: string;
  /** How many items a single arrow click advances. */
  scrollAmount?: number;
  /** Custom UI for the previous/next controls. Defaults to chevron icon buttons. */
  prevIcon?: React.ReactNode;
  nextIcon?: React.ReactNode;
  /**
   * The type of arrow icon to display:
   * 'arrowchev' (default) displays ChevronLeft/ChevronRight
   * 'arrow' displays ArrowLeft/ArrowRight
   */
  arrow?: 'arrowchev' | 'arrow';
  /**
   * 'auto' (default) hides an arrow once there's nothing left to scroll that way.
   * 'always' keeps both arrows mounted at all times, disabling (dimming, not hiding) the inactive one.
   */
  arrowVisibility?: 'auto' | 'always';
  className?: string;
  trackClassName?: string;
  arrowClassName?: string;
  ariaLabel?: string;
}

const DEFAULT_GAP = '1rem';
const DEFAULT_SCROLL_AMOUNT = 2;

const SCROLL_EDGE_THRESHOLD_PX = 4;

function SliderComponent<T>({
  items,
  renderItem,
  getKey,
  gap = DEFAULT_GAP,
  height = '100%',
  scrollAmount = DEFAULT_SCROLL_AMOUNT,
  prevIcon,
  nextIcon,
  arrow = 'arrowchev',
  arrowVisibility = 'auto',
  className,
  trackClassName,
  arrowClassName,
  ariaLabel = 'Slider'
}: SliderProps<T>) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > SCROLL_EDGE_THRESHOLD_PX);
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - SCROLL_EDGE_THRESHOLD_PX);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      resizeObserver.disconnect();
    };
  }, [updateScrollState, items.length]);

  const scrollByDirection = useCallback(
    (direction: 'prev' | 'next') => {
      const el = trackRef.current;
      if (!el) return;

      const firstItem = el.firstElementChild as HTMLElement | null;
      const itemWidth = firstItem?.getBoundingClientRect().width ?? el.clientWidth / DEFAULT_SCROLL_AMOUNT;
      const gapPx = parseFloat(getComputedStyle(el).columnGap || '0') || 0;
      const step = (itemWidth + gapPx) * scrollAmount;

      el.scrollBy({ left: direction === 'prev' ? -step : step, behavior: 'smooth' });
    },
    [scrollAmount]
  );

  const arrowBaseClass = classNames(
    'absolute top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-surface text-muted-foreground shadow-md transition hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-surface sm:h-9 sm:w-9',
    arrowClassName
  );

  const showPrevArrow = arrowVisibility === 'always' || canScrollPrev;
  const showNextArrow = arrowVisibility === 'always' || canScrollNext;

  return (
    <div className={classNames('relative w-full', className)} style={{ height }}>
      {showPrevArrow && (
        <button
          type="button"
          onClick={() => scrollByDirection('prev')}
          disabled={!canScrollPrev}
          aria-label="Scroll previous"
          className={classNames(arrowBaseClass, 'left-1')}
        >
          {prevIcon ?? (arrow === 'arrow' ? <ArrowLeft size={18} /> : <ChevronLeft size={18} />)}
        </button>
      )}

      <div
        ref={trackRef}
        role="list"
        aria-label={ariaLabel}
        className={classNames(
          'no-scrollbar flex h-full w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth',
          trackClassName
        )}
        style={{ gap }}
      >
        {items.map((item, index) => (
          <div role="listitem" key={getKey ? getKey(item, index) : index} className="shrink-0 snap-start">
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {showNextArrow && (
        <button
          type="button"
          onClick={() => scrollByDirection('next')}
          disabled={!canScrollNext}
          aria-label="Scroll next"
          className={classNames(arrowBaseClass, 'right-1')}
        >
          {nextIcon ?? (arrow === 'arrow' ? <ArrowRight size={18} /> : <ChevronRight size={18} />)}
        </button>
      )}
    </div>
  );
}

// React.memo erases the generic signature, so it's cast back to the original generic function type.
const Slider = React.memo(SliderComponent) as typeof SliderComponent;

export default Slider;
