export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "brand-logo brand-logo--compact" : "brand-logo"} aria-hidden="true">
      <svg viewBox="0 0 32 32" role="img">
        <rect className="brand-logo__tile brand-logo__tile--primary" x="4" y="4" width="11" height="11" rx="3" />
        <rect className="brand-logo__tile brand-logo__tile--soft" x="17" y="4" width="11" height="11" rx="3" />
        <rect className="brand-logo__tile brand-logo__tile--soft" x="4" y="17" width="11" height="11" rx="3" />
        <path className="brand-logo__tool" d="M20 25.4 25.4 20M22.2 18.2l3.6 3.6" />
      </svg>
    </span>
  );
}
