import { MessageSquare, ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "../i18n";
import { sendToolFeedback } from "../services/analyticsApi";

type FeedbackValue = "yes" | "no" | null;
type SaveStatus = "idle" | "saving" | "saved" | "error" | "needs-choice";

type ToolFeedbackProps = {
  toolSlug: string;
};

export function ToolFeedback({ toolSlug }: ToolFeedbackProps) {
  const { locale } = useLocale();
  const [feedbackId, setFeedbackId] = useState<string | undefined>();
  const [value, setValue] = useState<FeedbackValue>(null);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<SaveStatus>("idle");
  const lastSavedRef = useRef("");

  const copy =
    locale === "en"
      ? {
          question: "Was this tool helpful?",
          yes: "Yes",
          no: "No",
          addComment: "Add comment",
          commentLabel: "Optional comment",
          placeholder: "Tell us what worked or what we can improve...",
          saving: "Saving...",
          saved: "Saved. Thanks for helping us improve this tool.",
          needsChoice: "Choose Yes or No so we can save the comment.",
          error: "We couldn't save it. Please try again."
        }
      : {
          question: "¿Te sirvió esta herramienta?",
          yes: "Sí",
          no: "No",
          addComment: "Agregar comentario",
          commentLabel: "Comentario opcional",
          placeholder: "Cuéntanos qué funcionó o qué podemos mejorar...",
          saving: "Guardando...",
          saved: "Guardado. Gracias por ayudarnos a mejorar esta herramienta.",
          needsChoice: "Elige Sí o No para poder guardar el comentario.",
          error: "No pudimos guardarlo. Intenta de nuevo."
        };

  async function saveFeedback(nextValue: Exclude<FeedbackValue, null>, nextComment = "") {
    setStatus("saving");

    try {
      const response = await sendToolFeedback({
        feedbackId,
        toolSlug,
        locale,
        helpful: nextValue === "yes",
        comment: nextComment.trim() || undefined,
        pageUrl: window.location.pathname
      });
      setFeedbackId(response.id);
      lastSavedRef.current = `${nextValue}:${nextComment.trim()}`;
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }

  function handleChoice(nextValue: Exclude<FeedbackValue, null>) {
    setValue(nextValue);
    void saveFeedback(nextValue, comment);
  }

  useEffect(() => {
    if (!showComment || !comment.trim()) {
      return;
    }

    if (!value) {
      setStatus("needs-choice");
      return;
    }

    if (status === "saving") {
      return;
    }

    const signature = `${value}:${comment.trim()}`;

    if (signature === lastSavedRef.current) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void saveFeedback(value, comment);
    }, 1100);

    return () => window.clearTimeout(timeoutId);
  }, [comment, feedbackId, showComment, status, value]);

  const statusText =
    status === "saving"
      ? copy.saving
      : status === "saved"
        ? copy.saved
        : status === "needs-choice"
          ? copy.needsChoice
          : status === "error"
            ? copy.error
            : "";

  return (
    <section className="tool-feedback" aria-label={copy.question}>
      <div className="tool-feedback__main">
        <div>
          <p>{copy.question}</p>
          {statusText ? (
            <span className={status === "error" || status === "needs-choice" ? "tool-feedback__error" : undefined}>
              {status === "saving" ? <i aria-hidden="true" className="tool-feedback__spinner" /> : null}
              {statusText}
            </span>
          ) : null}
        </div>

        <div className="tool-feedback__actions">
          <button
            className={value === "yes" ? "tool-feedback__choice is-selected" : "tool-feedback__choice"}
            disabled={status === "saving"}
            onClick={() => handleChoice("yes")}
            type="button"
          >
            <ThumbsUp size={16} strokeWidth={2.2} />
            {copy.yes}
          </button>
          <button
            className={value === "no" ? "tool-feedback__choice is-selected" : "tool-feedback__choice"}
            disabled={status === "saving"}
            onClick={() => handleChoice("no")}
            type="button"
          >
            <ThumbsDown size={16} strokeWidth={2.2} />
            {copy.no}
          </button>
          <button className="tool-feedback__comment-toggle" onClick={() => setShowComment((current) => !current)} type="button">
            <MessageSquare size={16} strokeWidth={2.2} />
            {copy.addComment}
          </button>
        </div>
      </div>

      {showComment ? (
        <div className="tool-feedback__comment">
          <label htmlFor="tool-feedback-comment">{copy.commentLabel}</label>
          <textarea
            id="tool-feedback-comment"
            maxLength={1000}
            onChange={(event) => setComment(event.target.value)}
            placeholder={copy.placeholder}
            rows={3}
            value={comment}
          />
        </div>
      ) : null}
    </section>
  );
}
