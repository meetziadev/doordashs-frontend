import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Check, ChevronDown } from '@assets/icons';
import { classNames } from '@utils/helpers';
import { resolveSidebarItemType, type SidebarItem, type SidebarVariant } from './types';

const BASE_INDENT_REM = 1.25;
const INDENT_STEP_REM = 0.75;

const THEME = {
  light: {
    text: 'text-foreground',
    subtext: 'text-muted-foreground',
    border: 'border-border',
    chevron: 'text-subtle-foreground',
    checkboxBorder: 'border-border-strong',
    checkboxChecked: 'border-foreground bg-foreground',
    linkHover: '',
    linkActive: ''
  },
  dark: {
    text: 'text-inverse-foreground',
    subtext: 'text-inverse-foreground/80',
    border: 'border-inverse-foreground/10',
    chevron: 'text-inverse-foreground/50',
    checkboxBorder: 'border-inverse-foreground/30',
    checkboxChecked: 'border-inverse-foreground bg-inverse-foreground/20',
    linkHover: 'hover:bg-inverse-foreground/10',
    linkActive: 'bg-inverse-foreground/15'
  }
} as const;

export type SidebarNodeProps = {
  item: SidebarItem;
  level: number;
  variant?: SidebarVariant;
  openIds: Set<string>;
  checkedIds: Set<string>;
  onToggleGroup: (id: string) => void;
  onToggleCheckbox: (id: string) => void;
  onLinkSelect?: (item: SidebarItem) => void;
};

const SidebarNode: React.FC<SidebarNodeProps> = memo(
  ({ item, level, variant = 'light', openIds, checkedIds, onToggleGroup, onToggleCheckbox, onLinkSelect }) => {
    const type = resolveSidebarItemType(item);
    const theme = THEME[variant];
    const indent = `${BASE_INDENT_REM + level * INDENT_STEP_REM}rem`;
    const isDark = variant === 'dark';

    if (type === 'checkbox') {
      const checked = checkedIds.has(item.id);
      return (
        <label
          style={{ paddingLeft: indent }}
          className="flex cursor-pointer select-none items-center gap-3 py-2 pr-5"
        >
          <span className="relative inline-flex h-[18px] w-[18px] shrink-0">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onToggleCheckbox(item.id)}
              className={classNames(
                'h-[18px] w-[18px] appearance-none rounded-[3px] border transition-colors',
                checked ? theme.checkboxChecked : theme.checkboxBorder
              )}
            />
            {checked && (
              <Check size={13} strokeWidth={3} className="pointer-events-none absolute inset-0 m-auto text-inverse-foreground" />
            )}
          </span>
          <span className={classNames('text-[15px]', theme.subtext)}>{item.label}</span>
        </label>
      );
    }

    if (type === 'group') {
      const open = openIds.has(item.id);
      const children = item.children ?? [];
      const labelContent = (
        <span className="flex items-center gap-2">
          {item.icon}
          {item.label}
        </span>
      );
      const labelClass = classNames('flex-1 py-3.5 text-left text-[15px] font-semibold', theme.text);

      return (
        <div className={classNames(!isDark && 'border-b', theme.border)}>
          <div style={{ paddingLeft: indent }} className="flex w-full items-center justify-between pr-2">
            {item.href ? (
              <NavLink to={item.href} onClick={() => onLinkSelect?.(item)} className={labelClass}>
                {labelContent}
              </NavLink>
            ) : (
              <span className={labelClass}>{labelContent}</span>
            )}
            <button
              type="button"
              onClick={() => onToggleGroup(item.id)}
              aria-expanded={open}
              aria-label={`${open ? 'Collapse' : 'Expand'} ${item.label}`}
              className="shrink-0 p-3"
            >
              <ChevronDown
                size={16}
                className={classNames('transition-transform duration-200', theme.chevron, open && 'rotate-180')}
              />
            </button>
          </div>
          <div
            className={classNames(
              'grid transition-[grid-template-rows] duration-300 ease-in-out',
              open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            )}
          >
            <div className="overflow-hidden">
              <div className="flex flex-col py-1">
                {children.map((child) => (
                  <SidebarNode
                    key={child.id}
                    item={child}
                    level={level + 1}
                    variant={variant}
                    openIds={openIds}
                    checkedIds={checkedIds}
                    onToggleGroup={onToggleGroup}
                    onToggleCheckbox={onToggleCheckbox}
                    onLinkSelect={onLinkSelect}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    const content = (
      <>
        {item.icon}
        <span>{item.label}</span>
      </>
    );

    if (isDark) {
      const darkLinkClass = (active: boolean) =>
        classNames(
          'flex items-center gap-2 rounded px-3 py-2 text-sm transition-colors',
          active ? classNames(theme.linkActive, 'text-inverse-foreground') : classNames('text-inverse-foreground/90', theme.linkHover)
        );

      if (item.href) {
        return (
          <NavLink
            to={item.href}
            onClick={() => onLinkSelect?.(item)}
            className={({ isActive }) => darkLinkClass(isActive)}
          >
            {content}
          </NavLink>
        );
      }

      return (
        <button type="button" onClick={() => onLinkSelect?.(item)} className={darkLinkClass(false)}>
          {content}
        </button>
      );
    }

    const lightLinkClass = classNames(
      'flex w-full items-center gap-2 border-b py-3.5 pr-5 text-left text-[15px]',
      theme.border,
      theme.text,
      item.emphasis === 'normal' ? 'font-normal' : 'font-semibold'
    );

    if (item.href) {
      return (
        <NavLink
          to={item.href}
          onClick={() => onLinkSelect?.(item)}
          style={{ paddingLeft: indent }}
          className={lightLinkClass}
        >
          {content}
        </NavLink>
      );
    }

    return (
      <button type="button" onClick={() => onLinkSelect?.(item)} style={{ paddingLeft: indent }} className={lightLinkClass}>
        {content}
      </button>
    );
  }
);

SidebarNode.displayName = 'SidebarNode';

export default SidebarNode;
