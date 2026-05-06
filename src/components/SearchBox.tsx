import { Search } from "lucide-react";
import { useLocale } from "../i18n";

type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBox({ value, onChange }: SearchBoxProps) {
  const { locale } = useLocale();
  const copy =
    locale === "en"
      ? {
          ariaLabel: "Search tool",
          placeholder: "Search tool..."
        }
      : {
          ariaLabel: "Buscar herramienta",
          placeholder: "Buscar herramienta..."
        };

  return (
    <div className="search-panel" id="catalog">
      <Search className="search-panel__icon" size={22} strokeWidth={2.25} />
      <input
        aria-label={copy.ariaLabel}
        onChange={(event) => onChange(event.target.value)}
        placeholder={copy.placeholder}
        value={value}
      />
    </div>
  );
}
