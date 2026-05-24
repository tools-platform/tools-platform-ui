import { CheckCircle2, Clipboard, Info, KeyRound, RefreshCw, RotateCcw } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale, type Locale } from "../../i18n";
import { securePasswordGeneratorCopy as copy } from "../../locales/calculatorCopy";

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
  if (!options.avoidAmbiguous) return source;
  return [...source].filter((character) => !ambiguousCharacters.has(character)).join("");
}

function getActiveSets(options: PasswordOptions) {
  const sets: string[] = [];
  if (options.uppercase) sets.push(cleanSet(characterSets.uppercase, options));
  if (options.lowercase) sets.push(cleanSet(characterSets.lowercase, options));
  if (options.numbers) sets.push(cleanSet(characterSets.numbers, options));
  if (options.symbols) sets.push(cleanSet(characterSets.symbols, options));
  return sets.filter((set) => set.length > 0);
}

function generatePassword(length: number, options: PasswordOptions) {
  const sets = getActiveSets(options);
  const allCharacters = sets.join("");
  if (sets.length === 0 || allCharacters.length === 0) return "";
  const characters = sets.map((set) => set[randomIndex(set.length)]);
  while (characters.length < length) {
    characters.push(allCharacters[randomIndex(allCharacters.length)]);
  }
  return shuffleCharacters(characters.slice(0, length));
}

function createDefaultOptions(): PasswordOptions {
  return { uppercase: true, lowercase: true, numbers: true, symbols: true, avoidAmbiguous: false, easyToRead: false };
}

function evaluateStrength(password: string, options: PasswordOptions, locale: Locale) {
  const enabledTypes = [options.uppercase, options.lowercase, options.numbers, options.symbols].filter(Boolean).length;
  let score = 0;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (password.length >= 24) score += 1;
  if (enabledTypes >= 3) score += 1;
  if (enabledTypes >= 4) score += 1;
  if (score <= 2) return { label: copy[locale].strengthMedium, className: "is-medium" };
  if (score <= 4) return { label: copy[locale].strengthStrong, className: "is-strong" };
  return { label: copy[locale].strengthVeryStrong, className: "is-very-strong" };
}

export function SecurePasswordGenerator() {
  const { locale } = useLocale();
  const text = copy[locale];
  const [length, setLength] = useState(16);
  const [quantity, setQuantity] = useState(3);
  const [options, setOptions] = useState<PasswordOptions>(createDefaultOptions);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [appliedLength, setAppliedLength] = useState(16);
  const [appliedQuantity, setAppliedQuantity] = useState(3);
  const [appliedOptions, setAppliedOptions] = useState<PasswordOptions>(createDefaultOptions);
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  const mainPassword = passwords[0] ?? "";
  const strength = useMemo(() => evaluateStrength(mainPassword, appliedOptions, locale), [mainPassword, appliedOptions, locale]);

  useEffect(() => {
    if (!copyStatus) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setCopyStatus(""), 2200);
    return () => window.clearTimeout(timeout);
  }, [copyStatus]);

  function updateOption(key: keyof PasswordOptions, value: boolean) {
    setOptions((currentOptions) => ({ ...currentOptions, [key]: value }));
    setCopyStatus("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setCopyStatus("");

    const activeSets = getActiveSets(options);
    if (activeSets.length === 0) {
      setError(text.noTypeError);
      setPasswords([]);
      return;
    }
    if (length < activeSets.length) {
      setError(text.lengthError);
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
    setCopyStatus("");
  }

  async function handleCopy(password: string) {
    try {
      await navigator.clipboard.writeText(password);
      setCopyStatus(text.copied);
    } catch {
      setCopyStatus(text.copyFailed);
    }
  }

  return (
    <div className="calculator-layout">
      <form className="calculator-card" onSubmit={handleSubmit}>
        <div className="calculator-card__header">
          <div>
            <p className="section__kicker">{text.kicker}</p>
            <h2>{text.title}</h2>
          </div>
          <span>
            <KeyRound size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>{text.length}: {length} {text.characters}</span>
          <input className="range-input" max={64} min={8} onChange={(event) => setLength(Number(event.target.value))} type="range" value={length} />
          <small>{text.lengthHelp}</small>
        </label>

        <div className="field field--spaced">
          <span>{text.quantity}</span>
          <div className="quick-options">
            {[1, 3, 5, 10].map((amount) => (
              <button className={quantity === amount ? "is-active" : ""} key={amount} onClick={() => setQuantity(amount)} type="button">
                {amount}
              </button>
            ))}
          </div>
        </div>

        <div className="password-option-grid">
          <label className="toggle-field toggle-field--compact">
            <input checked={options.uppercase} onChange={(event) => updateOption("uppercase", event.target.checked)} type="checkbox" />
            <span><strong>{text.uppercase}</strong><small>A, B, C</small></span>
          </label>
          <label className="toggle-field toggle-field--compact">
            <input checked={options.lowercase} onChange={(event) => updateOption("lowercase", event.target.checked)} type="checkbox" />
            <span><strong>{text.lowercase}</strong><small>a, b, c</small></span>
          </label>
          <label className="toggle-field toggle-field--compact">
            <input checked={options.numbers} onChange={(event) => updateOption("numbers", event.target.checked)} type="checkbox" />
            <span><strong>{text.numbers}</strong><small>1, 2, 3</small></span>
          </label>
          <label className="toggle-field toggle-field--compact">
            <input checked={options.symbols} onChange={(event) => updateOption("symbols", event.target.checked)} type="checkbox" />
            <span><strong>{text.symbols}</strong><small>!, @, #</small></span>
          </label>
        </div>

        <label className="toggle-field toggle-field--compact">
          <input checked={options.avoidAmbiguous} onChange={(event) => updateOption("avoidAmbiguous", event.target.checked)} type="checkbox" />
          <span><strong>{text.avoidAmbiguous}</strong><small>{text.avoidAmbiguousHelp}</small></span>
        </label>

        <label className="toggle-field toggle-field--compact">
          <input checked={options.easyToRead} onChange={(event) => updateOption("easyToRead", event.target.checked)} type="checkbox" />
          <span><strong>{text.easyToRead}</strong><small>{text.easyToReadHelp}</small></span>
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.hint}</span>
        </div>

        <button className="primary-action" type="submit">
          <RefreshCw size={18} />
          {text.submit}
        </button>

        <button className="secondary-action" onClick={handleReset} type="button">
          <RotateCcw size={18} />
          {text.reset}
        </button>
      </form>

      {passwords.length > 0 ? (
        <aside className="result-panel" ref={resultRef}>
          <div className="result-panel__hero result-panel__hero--compact">
            <p>{text.mainPassword}</p>
            <strong className="password-display">{mainPassword}</strong>
            <span>{appliedLength} {text.characters} · {strength.label}</span>
          </div>

          <div className="case-result-list">
            {copyStatus ? (
              <div className={`duplicate-copy-toast${copyStatus === text.copyFailed ? " duplicate-copy-toast--error" : ""}`} role="status">
                <CheckCircle2 size={18} strokeWidth={2.1} />
                <span>{copyStatus}</span>
              </div>
            ) : null}

            <div className={`password-strength ${strength.className}`}>
              <span />
              <strong>{strength.label}</strong>
            </div>

            {passwords.map((password, index) => (
              <div className="case-result-item" key={`${password}-${index}`}>
                <div>
                  <span>{index === 0 ? text.main : `${text.alternative} ${index + 1}`}</span>
                  <small>{appliedLength} {text.characters}</small>
                  <strong>{password}</strong>
                </div>
                <button onClick={() => handleCopy(password)} type="button">
                  <Clipboard size={16} strokeWidth={2.1} />
                  {text.copy}
                </button>
              </div>
            ))}
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>{text.length}</span>
              <strong>{appliedLength}</strong>
            </div>
            <div className="result-item">
              <span>{text.quantity}</span>
              <strong>{appliedQuantity}</strong>
            </div>
            <div className="result-item">
              <span>{text.typesActive}</span>
              <strong>{[appliedOptions.uppercase, appliedOptions.lowercase, appliedOptions.numbers, appliedOptions.symbols].filter(Boolean).length}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>{text.privacy}</span>
              <strong>{text.local}</strong>
            </div>
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>{text.saveNote}</p>
          </div>

          <p className="disclaimer">{text.disclaimer}</p>
        </aside>
      ) : (
        <aside className="result-panel result-panel--empty" ref={resultRef}>
          <div className="result-empty">
            <KeyRound size={34} strokeWidth={2.1} />
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyDescription}</p>
          </div>
        </aside>
      )}
    </div>
  );
}
