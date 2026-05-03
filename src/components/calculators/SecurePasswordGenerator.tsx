import { CheckCircle2, Clipboard, Info, KeyRound, RefreshCw, RotateCcw } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";

type PasswordOptions = {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  avoidAmbiguous: boolean;
  easyToRead: boolean;
};

const characterSets = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?/|~"
};

const easySymbols = "!@#$%*-_?";
const ambiguousCharacters = new Set(["O", "0", "I", "l", "1", "|"]);

function randomIndex(max: number) {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return values[0] % max;
}

function shuffleCharacters(value: string[]) {
  const characters = [...value];

  for (let index = characters.length - 1; index > 0; index -= 1) {
    const random = randomIndex(index + 1);
    [characters[index], characters[random]] = [characters[random], characters[index]];
  }

  return characters.join("");
}

function cleanSet(value: string, options: PasswordOptions) {
  const source = options.easyToRead && value === characterSets.symbols ? easySymbols : value;

  if (!options.avoidAmbiguous) {
    return source;
  }

  return [...source].filter((character) => !ambiguousCharacters.has(character)).join("");
}

function getActiveSets(options: PasswordOptions) {
  const sets: string[] = [];

  if (options.uppercase) {
    sets.push(cleanSet(characterSets.uppercase, options));
  }

  if (options.lowercase) {
    sets.push(cleanSet(characterSets.lowercase, options));
  }

  if (options.numbers) {
    sets.push(cleanSet(characterSets.numbers, options));
  }

  if (options.symbols) {
    sets.push(cleanSet(characterSets.symbols, options));
  }

  return sets.filter((set) => set.length > 0);
}

function generatePassword(length: number, options: PasswordOptions) {
  const sets = getActiveSets(options);
  const allCharacters = sets.join("");

  if (sets.length === 0 || allCharacters.length === 0) {
    return "";
  }

  const characters = sets.map((set) => set[randomIndex(set.length)]);

  while (characters.length < length) {
    characters.push(allCharacters[randomIndex(allCharacters.length)]);
  }

  return shuffleCharacters(characters.slice(0, length));
}

function evaluateStrength(password: string, options: PasswordOptions) {
  const enabledTypes = [options.uppercase, options.lowercase, options.numbers, options.symbols].filter(Boolean).length;
  let score = 0;

  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (password.length >= 24) score += 1;
  if (enabledTypes >= 3) score += 1;
  if (enabledTypes >= 4) score += 1;

  if (score <= 2) {
    return { label: "Media", className: "is-medium" };
  }

  if (score <= 4) {
    return { label: "Fuerte", className: "is-strong" };
  }

  return { label: "Muy fuerte", className: "is-very-strong" };
}

function createDefaultOptions(): PasswordOptions {
  return {
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    avoidAmbiguous: false,
    easyToRead: false
  };
}

export function SecurePasswordGenerator() {
  const [length, setLength] = useState(16);
  const [quantity, setQuantity] = useState(3);
  const [options, setOptions] = useState<PasswordOptions>(createDefaultOptions);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [appliedLength, setAppliedLength] = useState(16);
  const [appliedQuantity, setAppliedQuantity] = useState(3);
  const [appliedOptions, setAppliedOptions] = useState<PasswordOptions>(createDefaultOptions);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  const mainPassword = passwords[0] ?? "";
  const strength = useMemo(() => evaluateStrength(mainPassword, appliedOptions), [mainPassword, appliedOptions]);

  function updateOption(key: keyof PasswordOptions, value: boolean) {
    setOptions((currentOptions) => ({
      ...currentOptions,
      [key]: value
    }));
    setCopiedIndex(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setCopiedIndex(null);

    const activeSets = getActiveSets(options);

    if (activeSets.length === 0) {
      setError("Activa al menos un tipo de carácter para generar la contraseña.");
      setPasswords([]);
      return;
    }

    if (length < activeSets.length) {
      setError("La longitud debe permitir incluir al menos un carácter de cada tipo activo.");
      setPasswords([]);
      return;
    }

    const nextPasswords = Array.from({ length: quantity }, () => generatePassword(length, options));

    setPasswords(nextPasswords);
    setAppliedLength(length);
    setAppliedQuantity(quantity);
    setAppliedOptions(options);
    scrollToResultOnMobile();
  }

  function handleReset() {
    setLength(16);
    setQuantity(3);
    setOptions(createDefaultOptions());
    setPasswords([]);
    setAppliedLength(16);
    setAppliedQuantity(3);
    setAppliedOptions(createDefaultOptions());
    setError("");
    setCopiedIndex(null);
  }

  async function handleCopy(password: string, index: number) {
    try {
      await navigator.clipboard.writeText(password);
      setCopiedIndex(index);
    } catch {
      setCopiedIndex(null);
    }
  }

  return (
    <div className="calculator-layout">
      <form className="calculator-card" onSubmit={handleSubmit}>
        <div className="calculator-card__header">
          <div>
            <p className="section__kicker">Generador</p>
            <h2>Contraseñas seguras</h2>
          </div>
          <span>
            <KeyRound size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>Longitud: {length} caracteres</span>
          <input
            className="range-input"
            max={64}
            min={8}
            onChange={(event) => setLength(Number(event.target.value))}
            type="range"
            value={length}
          />
          <small>Entre 8 y 64 caracteres. Para la mayoría de cuentas, 16 o más es una buena base.</small>
        </label>

        <div className="field field--spaced">
          <span>Cantidad de contraseñas</span>
          <div className="quick-options">
            {[1, 3, 5, 10].map((amount) => (
              <button
                className={quantity === amount ? "is-active" : ""}
                key={amount}
                onClick={() => setQuantity(amount)}
                type="button"
              >
                {amount}
              </button>
            ))}
          </div>
        </div>

        <div className="password-option-grid">
          <label className="toggle-field toggle-field--compact">
            <input checked={options.uppercase} onChange={(event) => updateOption("uppercase", event.target.checked)} type="checkbox" />
            <span>
              <strong>Mayúsculas</strong>
              <small>A, B, C</small>
            </span>
          </label>

          <label className="toggle-field toggle-field--compact">
            <input checked={options.lowercase} onChange={(event) => updateOption("lowercase", event.target.checked)} type="checkbox" />
            <span>
              <strong>Minúsculas</strong>
              <small>a, b, c</small>
            </span>
          </label>

          <label className="toggle-field toggle-field--compact">
            <input checked={options.numbers} onChange={(event) => updateOption("numbers", event.target.checked)} type="checkbox" />
            <span>
              <strong>Números</strong>
              <small>1, 2, 3</small>
            </span>
          </label>

          <label className="toggle-field toggle-field--compact">
            <input checked={options.symbols} onChange={(event) => updateOption("symbols", event.target.checked)} type="checkbox" />
            <span>
              <strong>Símbolos</strong>
              <small>!, @, #</small>
            </span>
          </label>
        </div>

        <label className="toggle-field toggle-field--compact">
          <input
            checked={options.avoidAmbiguous}
            onChange={(event) => updateOption("avoidAmbiguous", event.target.checked)}
            type="checkbox"
          />
          <span>
            <strong>Evitar caracteres confusos</strong>
            <small>Quita O, 0, I, l, 1 y símbolos similares.</small>
          </span>
        </label>

        <label className="toggle-field toggle-field--compact">
          <input
            checked={options.easyToRead}
            onChange={(event) => updateOption("easyToRead", event.target.checked)}
            type="checkbox"
          />
          <span>
            <strong>Más fácil de leer</strong>
            <small>Usa una lista más simple de símbolos.</small>
          </span>
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>Las contraseñas se generan localmente en tu navegador. No se envían a ningún servidor.</span>
        </div>

        <button className="primary-action" type="submit">
          <RefreshCw size={18} />
          Generar contraseña
        </button>

        <button className="secondary-action" onClick={handleReset} type="button">
          <RotateCcw size={18} />
          Restablecer
        </button>
      </form>

      {passwords.length > 0 ? (
        <aside className="result-panel" ref={resultRef}>
          <div className="result-panel__hero result-panel__hero--compact">
            <p>Contraseña principal</p>
            <strong className="password-display">{mainPassword}</strong>
            <span>{appliedLength} caracteres · {strength.label}</span>
          </div>

          <div className="case-result-list">
            <div className={`password-strength ${strength.className}`}>
              <span />
              <strong>{strength.label}</strong>
            </div>

            {passwords.map((password, index) => (
              <div className="case-result-item" key={`${password}-${index}`}>
                <div>
                  <span>{index === 0 ? "Principal" : `Alternativa ${index + 1}`}</span>
                  <small>{appliedLength} caracteres</small>
                  <strong>{password}</strong>
                </div>
                <button onClick={() => handleCopy(password, index)} type="button">
                  <Clipboard size={16} strokeWidth={2.1} />
                  {copiedIndex === index ? "Copiada" : "Copiar"}
                </button>
              </div>
            ))}
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>Longitud</span>
              <strong>{appliedLength}</strong>
            </div>
            <div className="result-item">
              <span>Cantidad</span>
              <strong>{appliedQuantity}</strong>
            </div>
            <div className="result-item">
              <span>Tipos activos</span>
              <strong>{[appliedOptions.uppercase, appliedOptions.lowercase, appliedOptions.numbers, appliedOptions.symbols].filter(Boolean).length}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>Privacidad</span>
              <strong>Local</strong>
            </div>
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>Guarda la contraseña en un administrador seguro y evita reutilizarla en varias cuentas.</p>
          </div>

          <p className="disclaimer">
            Resultado generado automáticamente con aleatoriedad criptográfica del navegador. La seguridad final también
            depende de dónde guardes la contraseña y de no compartirla.
          </p>
        </aside>
      ) : (
        <aside className="result-panel result-panel--empty" ref={resultRef}>
          <div className="result-empty">
            <KeyRound size={34} strokeWidth={2.1} />
            <h2>Contraseña segura</h2>
            <p>Configura la longitud y genera una o varias contraseñas al instante.</p>
          </div>
        </aside>
      )}
    </div>
  );
}
