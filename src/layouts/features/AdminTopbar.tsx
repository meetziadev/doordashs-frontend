import React, { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Languages,
  Search,
  ShoppingCart
} from '@assets/icons';
import { useUnifiedSearch } from '@hooks/useUnifiedSearch';
import { useAuth } from '@hooks/useAuth';
import { getSearchResultPath, type SearchResult } from '@utils/searchUtils';
import { extractNavCategories } from '@utils/productUtils';
import {
  HEADER_AUDIENCE_OPTIONS,
  HEADER_LANGUAGES,
  HEADER_NAV_LINKS,
  HEADER_PROMO_BANNERS,
  HEADER_REGIONS
} from '@utils/constants';
import type { HeaderAudienceId } from '@utils/constants';
import { useGetProductsQuery } from '@services/productService';
import NotificationsDropdown from '@/components/common/NotificationsDropdown';

export type AdminTopbarProps = Record<string, never>;

const isNavLinkActive = (to: string, pathname: string, search: string) => {
  const [targetPath, targetSearch = ''] = to.split('?');

  if (pathname !== targetPath) return false;
  if (!targetSearch) {
    if (targetPath !== '/shop') return true;
    return !new URLSearchParams(search).get('category');
  }

  const currentParams = new URLSearchParams(search);
  const targetParams = new URLSearchParams(targetSearch);
  for (const [key, value] of targetParams.entries()) {
    if (currentParams.get(key) !== value) return false;
  }
  return true;
};

const SearchSection: React.FC<{
  title: string;
  items: SearchResult[];
  onSelect: (item: SearchResult) => void;
}> = ({ title, items, onSelect }) => {
  if (!items.length) return null;

  return (
    <div className="border-t border-gray-100 first:border-t-0">
      <p className="px-4 pt-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">
        {title}
      </p>
      <ul>
        {items.map((item) => (
          <li key={`${item.type}-${item.id}`}>
            <button
              type="button"
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 cursor-pointer"
              onClick={() => onSelect(item)}
            >
              {item.image ? (
                <img src={item.image} alt={item.label} className="h-9 w-9 rounded-lg object-cover" />
              ) : (
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-500 uppercase">
                  {item.label.slice(0, 2)}
                </span>
              )}
              <span className="min-w-0">
                <span className="block text-sm font-medium text-gray-900 truncate">{item.label}</span>
                <span className="block text-xs text-gray-500">{item.subtitle}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const UtilityDropdown: React.FC<{
  label: React.ReactNode;
  children: React.ReactNode;
}> = ({ label, children }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-1.5 text-white/90 hover:text-white cursor-pointer"
      >
        {label}
        <ChevronDown size={12} />
      </button>
      {open ? (
        <div className="absolute left-0 top-[calc(100%+8px)] min-w-[180px] rounded-lg border border-gray-200 bg-white py-1 text-gray-900 shadow-lg z-50">
          {children}
        </div>
      ) : null}
    </div>
  );
};

const AdminTopbar: React.FC<AdminTopbarProps> = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const searchRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [moreOpen, setMoreOpen] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState<HeaderAudienceId>('women');

  const { results, hasResults, isSearching } = useUnifiedSearch(query);
  const { data: catalogData } = useGetProductsQuery({ page: 1, limit: 100, sort: 'newest' });

  const navCategories = useMemo(
    () => extractNavCategories(catalogData?.items ?? []),
    [catalogData?.items]
  );
  const placeholderHints = navCategories.map((category) => category.name).filter(Boolean);
  const selectedAudienceLabel =
    HEADER_AUDIENCE_OPTIONS.find((option) => option.id === selectedAudience)?.label ?? 'Women';

  useEffect(() => {
    const category = new URLSearchParams(location.search).get('category');
    if (category === 'men' || category === 'women' || category === 'children') {
      setSelectedAudience(category);
    }
  }, [location.search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPromoIndex((index) => (index + 1) % HEADER_PROMO_BANNERS.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, []);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateHeight = () => {
      document.documentElement.style.setProperty('--admin-header-height', `${header.offsetHeight}px`);
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (placeholderHints.length < 2) return;
    const timer = window.setInterval(() => {
      setPlaceholderIndex((index) => (index + 1) % placeholderHints.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [placeholderHints.length]);

  const handleSelect = (item: SearchResult) => {
    setShowResults(false);
    setQuery('');
    navigate(getSearchResultPath(item));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;
    setShowResults(true);
  };

  const goToAudience = (audienceId: HeaderAudienceId) => {
    setSelectedAudience(audienceId);
    setMoreOpen(false);
    navigate(`/shop?category=${audienceId}`);
  };

  const showDropdown = showResults && query.trim().length > 0;
  const searchPlaceholder = placeholderHints.length
    ? `Search for ${placeholderHints[placeholderIndex % placeholderHints.length]}`
    : 'Search for';

  const navLinkClass = (active: boolean) =>
    `text-[15px] whitespace-nowrap pb-1 cursor-pointer ${
      active ? 'font-semibold text-black border-b-2 border-black' : 'text-gray-800 hover:text-black'
    }`;

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="h-9 bg-black text-white text-[12px] flex items-center justify-between gap-3 px-4 md:px-6">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="shrink-0 font-serif text-sm tracking-[0.2em] uppercase cursor-pointer"
        >
          Fashion
        </button>

        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            aria-label="Previous announcement"
            onClick={() =>
              setPromoIndex(
                (index) => (index - 1 + HEADER_PROMO_BANNERS.length) % HEADER_PROMO_BANNERS.length
              )
            }
            className="hidden sm:flex text-white/80 hover:text-white cursor-pointer"
          >
            <ChevronLeft size={14} />
          </button>
          <p className="truncate font-medium tracking-wide text-center">
            {HEADER_PROMO_BANNERS[promoIndex]}
          </p>
          <button
            type="button"
            aria-label="Next announcement"
            onClick={() => setPromoIndex((index) => (index + 1) % HEADER_PROMO_BANNERS.length)}
            className="hidden sm:flex text-white/80 hover:text-white cursor-pointer"
          >
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="flex items-center gap-3 min-w-0">
          <span className="flex items-center gap-1.5 text-white/90">
            <span>{HEADER_LANGUAGES[0].label}</span>
            <Languages size={13} />
          </span>
          <span className="hidden sm:block h-3 w-px bg-white/30" />
          <span className="flex items-center gap-1.5 text-white/90">
            <span className="hidden sm:inline">{HEADER_REGIONS[0].label}</span>
            <span>{HEADER_REGIONS[0].flag}</span>
          </span>
        </div>
      </div>

        <div className="border-b border-gray-100 px-4 md:px-6 min-w-0">
        <div className="flex items-center gap-3 md:gap-5 xl:h-16">
          <nav className="hidden xl:flex items-center gap-5 shrink-0 min-w-0">
            <div className="relative" ref={moreRef}>
              <button
                type="button"
                onClick={() => setMoreOpen((open) => !open)}
                className="flex items-center gap-1.5 rounded-full border border-gray-300 px-3 py-1 text-[13px] text-gray-900 cursor-pointer"
              >
                <ChevronDown size={12} />
                {selectedAudienceLabel}
              </button>
              {moreOpen ? (
                <div className="absolute left-0 top-[calc(100%+8px)] min-w-[200px] rounded-xl border border-gray-200 bg-white py-2 shadow-lg z-50">
                  {HEADER_AUDIENCE_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => goToAudience(option.id)}
                      className={`block w-full px-4 py-2 text-left text-sm cursor-pointer ${
                        selectedAudience === option.id
                          ? 'font-semibold text-black bg-gray-50'
                          : 'text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            {HEADER_NAV_LINKS.map((link) => {
              const active = isNavLinkActive(link.to, location.pathname, location.search);

              if (link.to.includes('?')) {
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => navigate(link.to)}
                    className={navLinkClass(active)}
                  >
                    {link.label}
                  </button>
                );
              }

              return (
                <NavLink
                  key={link.id}
                  to={link.to}
                  end={'end' in link ? link.end : false}
                  className={() => navLinkClass(active)}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

        <div className="relative w-[360px] shrink-0" ref={searchRef}>
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setShowResults(true);
                }}
                onFocus={() => query.trim() && setShowResults(true)}
                placeholder={searchPlaceholder}
                className="h-9 w-full appearance-none rounded-full border border-[#E5E5E5] bg-[#F7F7F7] pl-4 pr-10 text-[13px] text-[#111111] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#D4D4D4] [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
              />
              <Search
                size={16}
                strokeWidth={1.75}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A8A8A]"
              />
            </form>

            {showDropdown && (
              <div className="absolute left-0 right-0 top-[calc(100%+8px)] max-h-[420px] overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-lg z-50">
                {isSearching ? (
                  <p className="px-4 py-3 text-sm text-gray-500">Searching...</p>
                ) : hasResults ? (
                  <>
                    <SearchSection title="Brands" items={results.brands} onSelect={handleSelect} />
                    <SearchSection title="Categories" items={results.categories} onSelect={handleSelect} />
                    <SearchSection title="Products" items={results.products} onSelect={handleSelect} />
                  </>
                ) : (
                  <p className="px-4 py-3 text-sm text-gray-500">
                    No results for &quot;{query.trim()}&quot;
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 md:gap-4 shrink-0 ml-auto">
            <button
              type="button"
              onClick={() => navigate(isLoggedIn ? '/admin/profile' : '/login')}
              className="text-[13px] text-gray-900 hover:opacity-70 cursor-pointer"
            >
              {isLoggedIn ? 'Account' : 'Log in'}
            </button>
            {!isLoggedIn ? (
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-[13px] text-gray-900 hover:opacity-70 cursor-pointer"
              >
                Sign up
              </button>
            ) : null}
            <button
              type="button"
              className="text-gray-900 hover:opacity-70 cursor-pointer"
              aria-label="Cart"
              onClick={() => navigate('/admin/cart')}
            >
              <ShoppingCart size={18} strokeWidth={1.6} />
            </button>
            <NotificationsDropdown />
          </div>
        </div>

        {/* Mobile: show ALL navbar items under the search row */}
        <div className="xl:hidden flex items-center gap-6 py-2 overflow-x-auto whitespace-nowrap">
          {HEADER_NAV_LINKS.map((link) => {
            const active = isNavLinkActive(link.to, location.pathname, location.search);
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => navigate(link.to)}
                className={navLinkClass(active)}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
});

export default AdminTopbar;
