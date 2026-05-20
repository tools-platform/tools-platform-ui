import { CheckCircle2, Clipboard, Code2, X } from "lucide-react";
import { useEffect } from "react";

type ExpandedTextTransformProps = {
  autoUpdate: boolean;
  autoUpdateLabel: string;
  closeLabel: string;
  copyFailedLabel: string;
  copyLabel: string;
  copyStatus: string;
  editorTitle: string;
  inputLabel: string;
  inputValue: string;
  onAutoUpdateChange: (value: boolean) => void;
  onClose: () => void;
  onCopy: () => void;
  onInputChange: (value: string) => void;
  onUpdate: () => void;
  outputLabel: string;
  outputValue: string;
  title: string;
  updateLabel: string;
};

export function ExpandedTextTransform({
  autoUpdate,
  autoUpdateLabel,
  closeLabel,
  copyFailedLabel,
  copyLabel,
  copyStatus,
  editorTitle,
  inputLabel,
  inputValue,
  onAutoUpdateChange,
  onClose,
  onCopy,
  onInputChange,
  onUpdate,
  outputLabel,
  outputValue,
  title,
  updateLabel
}: ExpandedTextTransformProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="html-preview-wide" role="dialog" aria-modal="true" aria-label={title}>
      <div className="html-preview-wide__bar">
        <div>
          <span>{editorTitle}</span>
          <strong>{title}</strong>
        </div>
        <div className="html-preview-wide__actions">
          <button
            aria-checked={autoUpdate}
            className={`html-preview-live-toggle${autoUpdate ? " is-active" : ""}`}
            onClick={() => onAutoUpdateChange(!autoUpdate)}
            role="switch"
            type="button"
          >
            <span aria-hidden="true" />
            {autoUpdateLabel}
          </button>
          <button className="secondary-action" onClick={onUpdate} type="button">
            <Code2 size={18} />
            {updateLabel}
          </button>
          <button className="secondary-action" onClick={onCopy} type="button">
            <Clipboard size={18} />
            {copyLabel}
          </button>
          <button className="html-preview-wide__close" onClick={onClose} type="button" aria-label={closeLabel}>
            <X size={20} />
          </button>
        </div>
      </div>

      {copyStatus ? (
        <div className={`duplicate-copy-toast${copyStatus === copyFailedLabel ? " duplicate-copy-toast--error" : ""}`} role="status">
          <CheckCircle2 size={16} strokeWidth={2.1} />
          <span>{copyStatus}</span>
        </div>
      ) : null}

      <div className="html-preview-wide__grid">
        <section className="html-preview-wide__pane">
          <div className="html-preview-wide__pane-header">
            <span>{inputLabel}</span>
          </div>
          <textarea
            className="html-preview-wide__editor"
            onChange={(event) => onInputChange(event.target.value)}
            spellCheck={false}
            value={inputValue}
          />
        </section>

        <section className="html-preview-wide__pane">
          <div className="html-preview-wide__pane-header">
            <span>{outputLabel}</span>
          </div>
          <textarea className="html-preview-wide__editor" readOnly spellCheck={false} value={outputValue} />
        </section>
      </div>
    </div>
  );
}
