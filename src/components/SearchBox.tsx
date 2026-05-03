import { Search } from "lucide-react";

type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <div className="search-panel" id="catalog">
      <Search className="search-panel__icon" size={22} strokeWidth={2.25} />
      <input
        aria-label="Buscar herramienta"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar herramienta..."
        value={value}
      />
    </div>
  );
}
