import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingCart, User } from '@assets/icons';
import { classNames } from '@utils/helpers';
import { useUnifiedSearch } from '@hooks/useUnifiedSearch';
import { getSearchResultPath, type SearchResult } from '@utils/searchUtils';
import NotificationsDropdown from '@/components/UI/NotificationsDropdown';

export type AdminTopbarProps = { onMenu: () => void };

type FulfillmentMode = 'delivery' | 'pickup';

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

const AdminTopbar: React.FC<AdminTopbarProps> = memo(({ onMenu }) => {
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<FulfillmentMode>('delivery');
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const { results, hasResults, isSearching } = useUnifiedSearch(query);

  const pillClass = useCallback(
    (active: boolean) =>
      classNames(
        'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
        active
          ? 'border-foreground bg-foreground text-inverse-foreground'
          : 'border-border-strong text-muted-foreground hover:border-foreground/40'
      ),
    []
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const showDropdown = showResults && query.trim().length > 0;

  return (
    <div className="fixed top-0 left-0 md:left-sidebar right-0 h-topbar bg-topbar text-topbar-foreground flex items-center gap-4 px-4 md:px-6 z-30">
      <button className="shrink-0 text-muted-foreground md:hidden" onClick={onMenu} aria-label="Open sidebar">
        <Menu size={20} />
      </button>

      <div className="relative w-full" ref={searchRef}>
        <form onSubmit={handleSubmit}>
          <Search
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle-foreground"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setShowResults(true);
            }}
            onFocus={() => query.trim() && setShowResults(true)}
            placeholder="Search products, brands, categories..."
            className="w-full rounded-full bg-surface-muted py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-subtle-foreground focus:outline-none focus:ring-2 focus:ring-primary-200"
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

      <div className="ml-auto flex shrink-0 items-center gap-3">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setMode('delivery')} className={pillClass(mode === 'delivery')}>
            Delivery
          </button>
          <button type="button" onClick={() => setMode('pickup')} className={pillClass(mode === 'pickup')}>
            Pickup
          </button>
        </div>
        <NotificationsDropdown />
        <button
          type="button"
          className="text-foreground hover:text-muted-foreground cursor-pointer"
          aria-label="Cart"
          onClick={() => navigate('/admin/cart')}
        >
          <ShoppingCart size={20} />
        </button>
        <button
          type="button"
          className="text-foreground hover:text-muted-foreground cursor-pointer"
          aria-label="Profile"
          onClick={() => navigate('/admin/profile')}
        >
          <User size={20} />
        </button>
      </div>
    </div>
  );
});

export default AdminTopbar;
