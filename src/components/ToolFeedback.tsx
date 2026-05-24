import { MessageSquare, ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "../i18n";
import { sendToolFeedback } from "../services/analyticsApi";
import { toolFeedbackCopy } from "../locales/uiCopy";

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
  const failedSignatureRef = useRef("");

  const copy =
    toolFeedbackCopy[locale];

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
      failedSignatureRef.current = "";
      setStatus("saved");
    } catch {
      failedSignatureRef.current = `${nextValue}:${nextComment.trim()}`;
      setStatus("idle");
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

    if (signature === lastSavedRef.current || signature === failedSignatureRef.current) {
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
