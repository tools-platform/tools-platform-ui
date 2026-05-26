import {
  CheckCircle2,
  ChevronDown,
  Clipboard,
  Code2,
  Download,
  Info,
  Mail,
  Maximize2,
  MoreHorizontal,
  Palette,
  RotateCcw,
  X
} from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import { emailTemplateGeneratorCopy as copy } from "../../locales/calculatorCopy";

const emailTypes = ["request", "followUp", "proposal", "reminder", "thanks", "apology", "clean"] as const;
const tones = ["formal", "friendly", "direct"] as const;
const lengths = ["short", "standard", "detailed"] as const;
const layoutStyles = ["professional", "newsletter", "promo", "minimal", "framed", "letter"] as const;
const headerStyles = ["brandBand", "centered", "split", "simple", "dark", "letterhead", "boxed", "announcement", "accentLine", "none"] as const;
const bodyStyles = ["clean", "card", "editorial", "highlight"] as const;
const buttonStyles = ["pill", "rounded", "square", "outline"] as const;
const footerStyles = ["simple", "centered", "contact", "brandBlock", "boxed", "dark", "legal", "none"] as const;
const sections = ["content", "design", "header", "body", "button", "footer"] as const;

type EmailType = (typeof emailTypes)[number];
type EmailTone = (typeof tones)[number];
type EmailLength = (typeof lengths)[number];
type LayoutStyle = (typeof layoutStyles)[number];
type HeaderStyle = (typeof headerStyles)[number];
type BodyStyle = (typeof bodyStyles)[number];
type ButtonStyle = (typeof buttonStyles)[number];
type FooterStyle = (typeof footerStyles)[number];
type SectionId = (typeof sections)[number];

type EmailTemplateResult = {
  emailType: EmailType;
  tone: EmailTone;
  length: EmailLength;
  layoutStyle: LayoutStyle;
  headerStyle: HeaderStyle;
  bodyStyle: BodyStyle;
  buttonStyle: ButtonStyle;
  footerStyle: FooterStyle;
  subject: string;
  textBody: string;
  html: string;
  characters: number;
  words: number;
};

type AccordionSectionProps = {
  id: SectionId;
  title: string;
  summary: string;
  isOpen: boolean;
  onToggle: (id: SectionId) => void;
  children: ReactNode;
};

type BuildEmailHtmlInput = {
  locale: string;
  subject: string;
  textBody: string;
  brandName: string;
  logoUrl: string;
  preheaderText: string;
  primaryColor: string;
  backgroundColor: string;
  buttonText: string;
  buttonUrl: string;
  footerText: string;
  unsubscribeUrl: string;
  unsubscribeLabel: string;
  emailTypeLabel: string;
  layoutStyle: LayoutStyle;
  headerStyle: HeaderStyle;
  bodyStyle: BodyStyle;
  buttonStyle: ButtonStyle;
  footerStyle: FooterStyle;
  emailWidth: string;
};

function cleanText(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function cleanMultilineText(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => cleanText(line))
    .filter(Boolean)
    .join("\n");
}

function normalizeSentence(value: string) {
  const clean = cleanText(value);
  if (!clean) return "";
  const [first = "", ...rest] = Array.from(clean);
  const sentence = `${first.toLocaleUpperCase()}${rest.join("")}`;
  return /[.!?]$/.test(sentence) ? sentence : `${sentence}.`;
}

function getTopic(value: string, fallback: string) {
  const clean = cleanText(value).replace(/[.!?]+$/u, "");
  if (!clean) return fallback;
  return clean.length > 64 ? `${clean.slice(0, 61).trim()}...` : clean;
}

function countWords(value: string) {
  const clean = value.trim();
  if (!clean) return 0;
  return clean.split(/\s+/).length;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttribute(value: string) {
  return escapeHtml(value).replaceAll("'", "&#39;");
}

function normalizeColor(value: string, fallback = "#4f46e5") {
  const clean = value.trim();
  return /^#[0-9a-f]{6}$/i.test(clean) ? clean : fallback;
}

function normalizeWidth(value: string) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return 640;
  return Math.min(760, Math.max(520, parsed));
}

function safeUrl(value: string) {
  const clean = value.trim();
  if (!clean) return "";
  return /^https?:\/\//i.test(clean) ? clean : "";
}

function buildPreviewDocument(html: string) {
  const safetyMeta = `<meta http-equiv="Content-Security-Policy" content="script-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'">`;
  return html.replace(/<\/head>/i, `${safetyMeta}\n</head>`);
}

function bodyPadding(bodyStyle: BodyStyle) {
  if (bodyStyle === "card") return "30px 32px";
  if (bodyStyle === "editorial") return "38px 40px";
  return "34px 36px";
}

function renderParagraphs(textBody: string, bodyStyle: BodyStyle, primaryColor: string) {
  const paragraphs = textBody.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean);

  if (bodyStyle === "highlight") {
    return paragraphs
      .map((paragraph, index) => {
        if (index === 1) {
          return `<div style="margin: 0 0 18px; border-left: 4px solid ${primaryColor}; border-radius: 14px; background: #f8fafc; padding: 16px 18px; color: #334155; font-size: 16px; line-height: 1.7;">${escapeHtml(paragraph).replace(/\n/g, "<br>")}</div>`;
        }

        return `<p style="margin: 0 0 18px; color: #334155; font-size: 16px; line-height: 1.7;">${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`;
      })
      .join("\n");
  }

  return paragraphs
    .map((paragraph, index) => {
      const isLead = bodyStyle === "editorial" && index === 0;
      const extra = isLead ? "font-size: 18px; line-height: 1.75; color: #0f172a;" : "font-size: 16px; line-height: 1.7; color: #334155;";
      const card = bodyStyle === "card" && index === 0 ? "border: 1px solid #e2e8f0; border-radius: 16px; background: #f8fafc; padding: 18px 20px;" : "";
      return `<p style="margin: 0 0 18px; ${extra} ${card}">${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`;
    })
    .join("\n");
}

function buildHeaderHtml(input: BuildEmailHtmlInput) {
  const primaryColor = normalizeColor(input.primaryColor);
  const brand = cleanText(input.brandName);
  const safeLogoUrl = safeUrl(input.logoUrl);
  const subject = escapeHtml(input.subject);
  const hasSubject = cleanText(input.subject).length > 0;
  const brandLabel = brand ? escapeHtml(brand) : "";
  const typeLabel = escapeHtml(input.emailTypeLabel);
  const typeBadge = hasSubject ? typeLabel : "";
  const logo = safeLogoUrl
    ? `<img src="${escapeAttribute(safeLogoUrl)}" alt="${escapeAttribute(brand || input.subject)}" style="display: block; max-width: 148px; max-height: 56px; border: 0;">`
    : "";

  if (input.headerStyle === "none") return "";
  if (!hasSubject && !brandLabel && !logo) return "";

  if (input.headerStyle === "dark") {
    return `<tr><td style="padding: 32px 36px; background: #0f172a; color: #ffffff;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
        <tr>
          <td align="left" style="vertical-align: top;">${logo || (brandLabel ? `<strong style="color: #ffffff; font-size: 16px;">${brandLabel}</strong>` : "")}</td>
          <td align="right" style="vertical-align: top;">${typeBadge ? `<span style="display: inline-block; border: 1px solid rgba(255,255,255,0.26); border-radius: 999px; padding: 7px 11px; color: #dbeafe; font-size: 12px; font-weight: 700;">${typeBadge}</span>` : ""}</td>
        </tr>
      </table>
      ${hasSubject ? `<h1 style="margin: 28px 0 0; font-size: 31px; line-height: 1.16; font-weight: 800;">${subject}</h1>` : ""}
    </td></tr>`;
  }

  if (input.headerStyle === "letterhead") {
    return `<tr><td style="padding: 24px 36px 26px; border-top: 5px solid ${primaryColor}; border-bottom: 1px solid #e2e8f0; background: #ffffff; color: #0f172a;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
        <tr>
          <td align="left" style="vertical-align: middle;">${logo || (brandLabel ? `<strong style="color: #0f172a; font-size: 16px;">${brandLabel}</strong>` : "")}</td>
          <td align="right" style="vertical-align: middle; color: #64748b; font-size: 13px; font-weight: 700;">${typeBadge}</td>
        </tr>
      </table>
      ${hasSubject ? `<h1 style="margin: 24px 0 0; font-size: 28px; line-height: 1.2; font-weight: 800;">${subject}</h1>` : ""}
    </td></tr>`;
  }

  if (input.headerStyle === "boxed") {
    return `<tr><td style="padding: 26px 30px; background: #f8fafc; color: #0f172a;">
      <div style="border: 1px solid #dbeafe; border-radius: 18px; background: #ffffff; padding: 24px 26px;">
        ${logo ? `<div style="margin: 0 0 18px;">${logo}</div>` : ""}
        ${brandLabel ? `<div style="margin: 0 0 8px; color: ${primaryColor}; font-size: 13px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;">${brandLabel}</div>` : ""}
        ${hasSubject ? `<h1 style="margin: 0; font-size: 29px; line-height: 1.18; font-weight: 800;">${subject}</h1>` : ""}
        ${typeBadge ? `<div style="margin-top: 16px; color: #64748b; font-size: 13px; font-weight: 700;">${typeBadge}</div>` : ""}
      </div>
    </td></tr>`;
  }

  if (input.headerStyle === "announcement") {
    return `<tr><td align="center" style="padding: 34px 36px 30px; background: #ffffff; color: #0f172a;">
      ${logo ? `<div style="margin: 0 0 18px;">${logo}</div>` : ""}
      ${typeBadge ? `<span style="display: inline-block; margin: 0 0 14px; border-radius: 999px; background: ${primaryColor}; color: #ffffff; font-size: 12px; font-weight: 800; letter-spacing: 0.08em; padding: 8px 13px; text-transform: uppercase;">${typeBadge}</span>` : ""}
      ${hasSubject ? `<h1 style="margin: 0 auto; max-width: 520px; font-size: 31px; line-height: 1.18; font-weight: 800;">${subject}</h1>` : ""}
      ${brandLabel ? `<div style="margin-top: 14px; color: #64748b; font-size: 14px; font-weight: 700;">${brandLabel}</div>` : ""}
    </td></tr>`;
  }

  if (input.headerStyle === "accentLine") {
    return `<tr><td style="padding: 30px 36px; background: #ffffff; color: #0f172a;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
        <tr>
          <td width="7" style="border-radius: 999px; background: ${primaryColor};"></td>
          <td style="padding-left: 20px;">
            ${logo ? `<div style="margin: 0 0 14px;">${logo}</div>` : ""}
            ${brandLabel ? `<div style="margin: 0 0 8px; color: #64748b; font-size: 13px; font-weight: 700;">${brandLabel}</div>` : ""}
            ${hasSubject ? `<h1 style="margin: 0; font-size: 30px; line-height: 1.18; font-weight: 800;">${subject}</h1>` : ""}
          </td>
        </tr>
      </table>
    </td></tr>`;
  }

  if (input.headerStyle === "centered") {
    return `<tr><td align="center" style="padding: 34px 36px 28px; background: #ffffff; color: #0f172a;">
      ${logo ? `<div style="margin: 0 0 18px;">${logo}</div>` : ""}
      ${brandLabel ? `<div style="margin: 0 0 9px; color: ${primaryColor}; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">${brandLabel}</div>` : ""}
      ${hasSubject ? `<h1 style="margin: 0; font-size: 30px; line-height: 1.18; font-weight: 800;">${subject}</h1>` : ""}
    </td></tr>`;
  }

  if (input.headerStyle === "split") {
    return `<tr><td style="padding: 28px 34px; background: #ffffff; color: #0f172a;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
        <tr>
          <td align="left" style="vertical-align: middle;">${logo || `<strong style="color: ${primaryColor}; font-size: 16px;">${brandLabel || subject}</strong>`}</td>
          <td align="right" style="vertical-align: middle; color: #64748b; font-size: 13px; font-weight: 700;">${typeBadge}</td>
        </tr>
      </table>
      ${hasSubject ? `<h1 style="margin: 24px 0 0; font-size: 30px; line-height: 1.18; font-weight: 800;">${subject}</h1>` : ""}
    </td></tr>`;
  }

  if (input.headerStyle === "simple") {
    return `<tr><td style="padding: 30px 36px 24px; border-top: 6px solid ${primaryColor}; background: #ffffff; color: #0f172a;">
      ${brandLabel ? `<div style="margin: 0 0 8px; color: #64748b; font-size: 13px; font-weight: 700;">${brandLabel}</div>` : ""}
      ${hasSubject ? `<h1 style="margin: 0; font-size: 28px; line-height: 1.2; font-weight: 800;">${subject}</h1>` : ""}
    </td></tr>`;
  }

  return `<tr><td style="padding: 30px 36px; background: ${primaryColor}; color: #ffffff;">
    ${logo ? `<div style="margin: 0 0 22px;">${logo}</div>` : ""}
    ${brandLabel ? `<div style="margin: 0 0 9px; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.9;">${brandLabel}</div>` : ""}
    ${hasSubject ? `<h1 style="margin: 0; font-size: 30px; line-height: 1.18; font-weight: 800;">${subject}</h1>` : ""}
  </td></tr>`;
}

function buildButtonHtml(input: BuildEmailHtmlInput) {
  const buttonText = cleanText(input.buttonText);
  if (!buttonText) return "";

  const color = normalizeColor(input.primaryColor);
  const href = safeUrl(input.buttonUrl) || "#";
  const radius = input.buttonStyle === "pill" ? "999px" : input.buttonStyle === "rounded" ? "12px" : "0";
  const style =
    input.buttonStyle === "outline"
      ? `border: 2px solid ${color}; border-radius: ${radius}; background: transparent; color: ${color};`
      : `border: 2px solid ${color}; border-radius: ${radius}; background: ${color}; color: #ffffff;`;

  return `<div style="margin-top: 28px;"><a href="${escapeAttribute(href)}" style="display: inline-block; ${style} font-size: 15px; font-weight: 800; line-height: 1; padding: 15px 22px; text-decoration: none;">${escapeHtml(buttonText)}</a></div>`;
}

function buildFooterHtml(input: BuildEmailHtmlInput) {
  if (input.footerStyle === "none") return "";

  const footerText = cleanMultilineText(input.footerText);
  const brand = cleanText(input.brandName);
  const unsubscribeUrl = safeUrl(input.unsubscribeUrl);
  const footerBase = footerText || brand;
  if (!footerBase && input.footerStyle !== "legal") return "";

  if (input.footerStyle === "centered") {
    return `<tr><td align="center" style="padding: 28px 36px; border-top: 1px solid #e2e8f0; background: #ffffff; color: #64748b; font-size: 13px; line-height: 1.65;">
      ${brand ? `<strong style="display: block; margin-bottom: 8px; color: #0f172a; font-size: 15px;">${escapeHtml(brand)}</strong>` : ""}
      ${footerText ? `<div>${escapeHtml(footerText).replace(/\n/g, "<br>")}</div>` : ""}
      ${unsubscribeUrl ? `<div style="margin-top: 12px;"><a href="${escapeAttribute(unsubscribeUrl)}" style="color: ${normalizeColor(input.primaryColor)}; text-decoration: underline;">${escapeHtml(input.unsubscribeLabel)}</a></div>` : ""}
    </td></tr>`;
  }

  if (input.footerStyle === "contact") {
    return `<tr><td style="padding: 24px 36px; border-top: 1px solid #e2e8f0; background: #f8fafc; color: #475569; font-size: 13px; line-height: 1.65;">
      ${brand ? `<strong style="display: block; margin-bottom: 6px; color: #0f172a;">${escapeHtml(brand)}</strong>` : ""}
      ${footerText ? escapeHtml(footerText).replace(/\n/g, "<br>") : ""}
    </td></tr>`;
  }

  if (input.footerStyle === "brandBlock") {
    return `<tr><td style="padding: 26px 36px; border-top: 1px solid #e2e8f0; background: #ffffff;">
      <div style="border-left: 5px solid ${normalizeColor(input.primaryColor)}; padding: 4px 0 4px 18px; color: #475569; font-size: 13px; line-height: 1.65;">
        ${brand ? `<strong style="display: block; margin-bottom: 6px; color: #0f172a; font-size: 15px;">${escapeHtml(brand)}</strong>` : ""}
        ${footerText ? escapeHtml(footerText).replace(/\n/g, "<br>") : ""}
        ${unsubscribeUrl ? `<div style="margin-top: 10px;"><a href="${escapeAttribute(unsubscribeUrl)}" style="color: ${normalizeColor(input.primaryColor)}; text-decoration: underline;">${escapeHtml(input.unsubscribeLabel)}</a></div>` : ""}
      </div>
    </td></tr>`;
  }

  if (input.footerStyle === "boxed") {
    return `<tr><td style="padding: 26px 30px; border-top: 1px solid #e2e8f0; background: #f8fafc;">
      <div style="border: 1px solid #e2e8f0; border-radius: 16px; background: #ffffff; padding: 18px 20px; color: #475569; font-size: 13px; line-height: 1.65;">
        ${brand ? `<strong style="display: block; margin-bottom: 6px; color: #0f172a; font-size: 15px;">${escapeHtml(brand)}</strong>` : ""}
        ${footerText ? escapeHtml(footerText).replace(/\n/g, "<br>") : ""}
        ${unsubscribeUrl ? `<div style="margin-top: 10px;"><a href="${escapeAttribute(unsubscribeUrl)}" style="color: ${normalizeColor(input.primaryColor)}; text-decoration: underline;">${escapeHtml(input.unsubscribeLabel)}</a></div>` : ""}
      </div>
    </td></tr>`;
  }

  if (input.footerStyle === "dark") {
    return `<tr><td style="padding: 26px 36px; background: #0f172a; color: #cbd5e1; font-size: 13px; line-height: 1.65;">
      ${brand ? `<strong style="display: block; margin-bottom: 6px; color: #ffffff; font-size: 15px;">${escapeHtml(brand)}</strong>` : ""}
      ${footerText ? escapeHtml(footerText).replace(/\n/g, "<br>") : ""}
      ${unsubscribeUrl ? `<div style="margin-top: 10px;"><a href="${escapeAttribute(unsubscribeUrl)}" style="color: #bfdbfe; text-decoration: underline;">${escapeHtml(input.unsubscribeLabel)}</a></div>` : ""}
    </td></tr>`;
  }

  if (input.footerStyle === "legal") {
    return `<tr><td style="padding: 22px 36px; border-top: 1px solid #e2e8f0; background: #f8fafc; color: #64748b; font-size: 12px; line-height: 1.6;">
      ${footerBase ? `${escapeHtml(footerBase).replace(/\n/g, "<br>")}<br>` : ""}
      ${unsubscribeUrl ? `<a href="${escapeAttribute(unsubscribeUrl)}" style="color: ${normalizeColor(input.primaryColor)}; text-decoration: underline;">${escapeHtml(input.unsubscribeLabel)}</a>` : ""}
    </td></tr>`;
  }

  return `<tr><td style="padding: 22px 36px; border-top: 1px solid #e2e8f0; background: #f8fafc; color: #64748b; font-size: 13px; line-height: 1.6;">${escapeHtml(footerBase).replace(/\n/g, "<br>")}</td></tr>`;
}

function buildEmailHtml(input: BuildEmailHtmlInput) {
  const primaryColor = normalizeColor(input.primaryColor);
  const backgroundColor = normalizeColor(input.backgroundColor, "#f1f5f9");
  const width = normalizeWidth(input.emailWidth);
  const preheader = cleanText(input.preheaderText) || input.subject;
  const headerHtml = buildHeaderHtml(input);
  const buttonHtml = buildButtonHtml(input);
  const footerHtml = buildFooterHtml(input);
  const bodyBackground = input.layoutStyle === "minimal" || input.layoutStyle === "letter" ? "#ffffff" : input.layoutStyle === "promo" ? "#fff7ed" : "#ffffff";
  const cardRadius = input.layoutStyle === "minimal" || input.layoutStyle === "letter" ? "0" : input.layoutStyle === "newsletter" ? "10px" : "20px";
  const shadow = input.layoutStyle === "minimal" || input.layoutStyle === "letter" ? "none" : input.layoutStyle === "framed" ? "0 14px 36px rgba(15, 23, 42, 0.08)" : "0 20px 50px rgba(15, 23, 42, 0.12)";
  const topPadding = input.layoutStyle === "newsletter" ? "28px 16px" : input.layoutStyle === "letter" ? "24px 16px" : "34px 16px";
  const tableBorder = input.layoutStyle === "framed" || input.layoutStyle === "letter" ? "1px solid #e2e8f0" : "0";

  return `<!doctype html>
<html lang="${escapeAttribute(input.locale)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(input.subject)}</title>
</head>
<body style="margin: 0; padding: 0; background: ${backgroundColor}; font-family: Arial, Helvetica, sans-serif; color: #0f172a;">
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; background: ${backgroundColor};">
    <tr>
      <td align="center" style="padding: ${topPadding};">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: ${width}px; border-collapse: collapse; overflow: hidden; border: ${tableBorder}; border-radius: ${cardRadius}; background: ${bodyBackground}; box-shadow: ${shadow};">
          ${headerHtml}
          <tr>
            <td style="padding: ${bodyPadding(input.bodyStyle)}; background: ${bodyBackground};">
              ${renderParagraphs(input.textBody, input.bodyStyle, primaryColor)}
              ${buttonHtml}
            </td>
          </tr>
          ${footerHtml}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function AccordionSection({ id, title, summary, isOpen, onToggle, children }: AccordionSectionProps) {
  return (
    <div className={isOpen ? "work-entry is-open" : "work-entry"}>
      <div className="work-entry__header">
        <button aria-expanded={isOpen} className="work-entry__toggle" onClick={() => onToggle(id)} type="button">
          <span>
            <strong>{title}</strong>
            <small>{summary}</small>
          </span>
          <ChevronDown size={18} strokeWidth={2.1} />
        </button>
      </div>
      <div className="work-entry__body" hidden={!isOpen}>
        {children}
      </div>
    </div>
  );
}

export function EmailTemplateGenerator() {
  const { locale } = useLocale();
  const text = copy[locale];
  const localeCode = locale === "es" ? "es-CO" : locale === "hi" ? "hi-IN" : "en-US";
  const numberFormatter = useMemo(() => new Intl.NumberFormat(localeCode), [localeCode]);
  const [emailType, setEmailType] = useState<EmailType>("request");
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [mainMessage, setMainMessage] = useState("");
  const [expectedAction, setExpectedAction] = useState("");
  const [tone, setTone] = useState<EmailTone>("friendly");
  const [length, setLength] = useState<EmailLength>("standard");
  const [layoutStyle, setLayoutStyle] = useState<LayoutStyle>("professional");
  const [headerStyle, setHeaderStyle] = useState<HeaderStyle>("brandBand");
  const [bodyStyle, setBodyStyle] = useState<BodyStyle>("clean");
  const [buttonStyle, setButtonStyle] = useState<ButtonStyle>("pill");
  const [footerStyle, setFooterStyle] = useState<FooterStyle>("simple");
  const [emailWidth, setEmailWidth] = useState("640");
  const [brandName, setBrandName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [preheaderText, setPreheaderText] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#4f46e5");
  const [backgroundColor, setBackgroundColor] = useState("#f1f5f9");
  const [buttonText, setButtonText] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");
  const [footerText, setFooterText] = useState("");
  const [unsubscribeUrl, setUnsubscribeUrl] = useState("");
  const [expandedAutoUpdate, setExpandedAutoUpdate] = useState(false);
  const [expandedManualResult, setExpandedManualResult] = useState<EmailTemplateResult | null>(null);
  const [committedResult, setCommittedResult] = useState<EmailTemplateResult | null>(null);
  const [expandedSections, setExpandedSections] = useState<SectionId[]>([]);
  const [copyStatus, setCopyStatus] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const initialResultRef = useRef<EmailTemplateResult | null>(null);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();
  const isCleanEmail = emailType === "clean";

  const liveResult = useMemo(() => {
    const selectedType = text.emailTypes[emailType];
    const mainContent = mainMessage.trim();
    const mainSentence = normalizeSentence(mainContent || text.sampleObjective);
    const actionSentence = normalizeSentence(expectedAction || text.sampleAction);
    const topic = getTopic(mainMessage, isCleanEmail ? text.cleanDefaultTopic : text.defaultTopic);
    const subject = isCleanEmail ? "" : cleanText(customSubject) || selectedType.subject(topic);
    const paragraphs = isCleanEmail
      ? []
      : [
          text.greetings[tone](cleanText(recipientName)),
          selectedType.opening(mainSentence),
          ...(length !== "short" ? [selectedType.context] : []),
          text.actionParagraph(actionSentence),
          ...(length === "detailed" ? [selectedType.detailed] : []),
          text.closingParagraphs[tone]
        ].filter(Boolean);
    const signature = isCleanEmail ? "" : [text.signOffs[tone], cleanMultilineText(senderName)].filter(Boolean).join("\n");
    const textBody = isCleanEmail ? mainContent : [...paragraphs, signature].filter(Boolean).join("\n\n");
    const html = buildEmailHtml({
      locale,
      subject,
      textBody,
      brandName,
      logoUrl,
      preheaderText,
      primaryColor,
      backgroundColor,
      buttonText,
      buttonUrl,
      footerText,
      unsubscribeUrl,
      unsubscribeLabel: text.unsubscribeLabel,
      emailTypeLabel: selectedType.label,
      layoutStyle,
      headerStyle,
      bodyStyle,
      buttonStyle,
      footerStyle,
      emailWidth
    });

    return {
      emailType,
      tone,
      length,
      layoutStyle,
      headerStyle,
      bodyStyle,
      buttonStyle,
      footerStyle,
      subject,
      textBody,
      html,
      characters: html.length,
      words: countWords(textBody)
    };
  }, [
    backgroundColor,
    bodyStyle,
    brandName,
    buttonStyle,
    buttonText,
    buttonUrl,
    customSubject,
    emailType,
    emailWidth,
    expectedAction,
    footerStyle,
    footerText,
    headerStyle,
    isCleanEmail,
    layoutStyle,
    length,
    locale,
    logoUrl,
    mainMessage,
    preheaderText,
    primaryColor,
    recipientName,
    senderName,
    text,
    tone,
    unsubscribeUrl
  ]);

  if (!initialResultRef.current) {
    initialResultRef.current = liveResult;
  }

  const result = committedResult ?? initialResultRef.current;
  const expandedResult = expandedAutoUpdate ? liveResult : expandedManualResult ?? result;
  const previewDocument = useMemo(() => buildPreviewDocument(result.html), [result.html]);
  const expandedPreviewDocument = useMemo(() => buildPreviewDocument(expandedResult.html), [expandedResult.html]);

  useEffect(() => {
    if (!copyStatus) return;

    const timer = window.setTimeout(() => setCopyStatus(""), 2400);
    return () => window.clearTimeout(timer);
  }, [copyStatus]);

  useEffect(() => {
    if (!isExpanded || !expandedAutoUpdate) return;
    setCommittedResult(liveResult);
    setExpandedManualResult(liveResult);
  }, [expandedAutoUpdate, isExpanded, liveResult]);

  function toggleSection(id: SectionId) {
    setExpandedSections((current) => (current.includes(id) ? current.filter((section) => section !== id) : [...current, id]));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCommittedResult(liveResult);
    setExpandedManualResult(liveResult);
    scrollToResultOnMobile();
  }

  function openExpandedPreview() {
    setExpandedManualResult(result);
    setIsExpanded(true);
  }

  function handleExpandedAutoUpdateChange() {
    if (expandedAutoUpdate) {
      setExpandedManualResult(result);
      setExpandedAutoUpdate(false);
      return;
    }

    setCommittedResult(liveResult);
    setExpandedManualResult(liveResult);
    setExpandedAutoUpdate(true);
  }

  function handleExpandedUpdate() {
    setCommittedResult(liveResult);
    setExpandedManualResult(liveResult);
  }

  function handleReset() {
    setEmailType("request");
    setRecipientName("");
    setSenderName("");
    setCustomSubject("");
    setMainMessage("");
    setExpectedAction("");
    setTone("friendly");
    setLength("standard");
    setLayoutStyle("professional");
    setHeaderStyle("brandBand");
    setBodyStyle("clean");
    setButtonStyle("pill");
    setFooterStyle("simple");
    setEmailWidth("640");
    setBrandName("");
    setLogoUrl("");
    setPreheaderText("");
    setPrimaryColor("#4f46e5");
    setBackgroundColor("#f1f5f9");
    setButtonText("");
    setButtonUrl("");
    setFooterText("");
    setUnsubscribeUrl("");
    setExpandedAutoUpdate(false);
    setExpandedManualResult(null);
    setCommittedResult(null);
    initialResultRef.current = null;
    setExpandedSections([]);
    setCopyStatus("");
    setIsExpanded(false);
  }

  async function copyToClipboard(value: string, successMessage: string = text.copied) {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus(successMessage);
    } catch {
      setCopyStatus(text.copyFailed);
    }
  }

  function downloadHtml(html = result.html) {
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "email-template.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setCopyStatus(text.htmlDownloaded);
  }

  const contentSummary = mainMessage.trim() ? getTopic(mainMessage, text.pendingContent) : isCleanEmail ? text.cleanPendingContent : text.pendingContent;
  const designSummary = `${text.layoutStyles[layoutStyle]} · ${text.tones[tone]}`;
  const headerSummary = text.headerStyles[headerStyle];
  const bodySummary = `${text.bodyStyles[bodyStyle]} · ${text.lengths[length]}`;
  const buttonSummary = buttonText.trim() ? buttonText.trim() : text.noButton;
  const footerSummary = text.footerStyles[footerStyle];

  function renderTemplateControls() {
    return (
      <div className="email-template-controls">
        <label className="field">
          <span>{text.emailType}</span>
          <span className="select-control">
            <select className="plain-select" onChange={(event) => setEmailType(event.target.value as EmailType)} value={emailType}>
              {emailTypes.map((type) => (
                <option key={type} value={type}>
                  {text.emailTypes[type].label}
                </option>
              ))}
            </select>
            <ChevronDown size={18} strokeWidth={2.1} />
          </span>
        </label>

        <div className="work-entry-list">
          <AccordionSection id="content" isOpen={expandedSections.includes("content")} onToggle={toggleSection} summary={contentSummary} title={text.contentSection}>
            {!isCleanEmail ? (
              <label className="field">
                <span>{text.customSubject}</span>
                <input onChange={(event) => setCustomSubject(event.target.value)} placeholder={text.customSubjectPlaceholder} value={customSubject} />
              </label>
            ) : null}

            {!isCleanEmail ? (
              <>
                <label className="field">
                  <span>{text.recipientName}</span>
                  <input onChange={(event) => setRecipientName(event.target.value)} placeholder={text.recipientNamePlaceholder} value={recipientName} />
                </label>

                <label className="field field--spaced">
                  <span>{text.senderName}</span>
                  <textarea onChange={(event) => setSenderName(event.target.value)} placeholder={text.senderNamePlaceholder} rows={3} value={senderName} />
                </label>
              </>
            ) : null}

            <label className="field field--spaced">
              <span>{isCleanEmail ? text.cleanMainMessage : text.mainMessage}</span>
              <textarea
                onChange={(event) => setMainMessage(event.target.value)}
                placeholder={isCleanEmail ? text.cleanMainMessagePlaceholder : text.mainMessagePlaceholder}
                rows={isCleanEmail ? 9 : 6}
                value={mainMessage}
              />
            </label>

            {!isCleanEmail ? (
              <label className="field field--spaced">
                <span>{text.expectedAction}</span>
                <textarea onChange={(event) => setExpectedAction(event.target.value)} placeholder={text.expectedActionPlaceholder} rows={3} value={expectedAction} />
              </label>
            ) : null}
          </AccordionSection>

          <AccordionSection id="design" isOpen={expandedSections.includes("design")} onToggle={toggleSection} summary={designSummary} title={text.designSection}>
            <div className="form-grid form-grid--compact">
              <label className="field">
                <span>{text.layoutStyle}</span>
                <span className="select-control">
                  <select className="plain-select" onChange={(event) => setLayoutStyle(event.target.value as LayoutStyle)} value={layoutStyle}>
                    {layoutStyles.map((style) => (
                      <option key={style} value={style}>
                        {text.layoutStyles[style]}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} strokeWidth={2.1} />
                </span>
              </label>

              <label className="field">
                <span>{text.emailWidth}</span>
                <input max="760" min="520" onChange={(event) => setEmailWidth(event.target.value)} step="20" type="number" value={emailWidth} />
              </label>
            </div>

            <div className="form-grid form-grid--compact">
              <label className="field">
                <span>{text.tone}</span>
                <span className="select-control">
                  <select className="plain-select" onChange={(event) => setTone(event.target.value as EmailTone)} value={tone}>
                    {tones.map((toneOption) => (
                      <option key={toneOption} value={toneOption}>
                        {text.tones[toneOption]}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} strokeWidth={2.1} />
                </span>
              </label>

              <label className="field">
                <span>{text.length}</span>
                <span className="select-control">
                  <select className="plain-select" onChange={(event) => setLength(event.target.value as EmailLength)} value={length}>
                    {lengths.map((lengthOption) => (
                      <option key={lengthOption} value={lengthOption}>
                        {text.lengths[lengthOption]}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} strokeWidth={2.1} />
                </span>
              </label>
            </div>

            <div className="form-grid form-grid--compact">
              <label className="field">
                <span>{text.primaryColor}</span>
                <span className="email-color-input">
                  <input className="email-color-value" onChange={(event) => setPrimaryColor(event.target.value)} placeholder={text.colorPlaceholder} type="text" value={primaryColor} />
                  <input aria-label={text.primaryColor} onChange={(event) => setPrimaryColor(event.target.value)} type="color" value={normalizeColor(primaryColor)} />
                </span>
              </label>

              <label className="field">
                <span>{text.backgroundColor}</span>
                <span className="email-color-input">
                  <input className="email-color-value" onChange={(event) => setBackgroundColor(event.target.value)} placeholder={text.backgroundColorPlaceholder} type="text" value={backgroundColor} />
                  <input aria-label={text.backgroundColor} onChange={(event) => setBackgroundColor(event.target.value)} type="color" value={normalizeColor(backgroundColor, "#f1f5f9")} />
                </span>
              </label>
            </div>
          </AccordionSection>

          <AccordionSection id="header" isOpen={expandedSections.includes("header")} onToggle={toggleSection} summary={headerSummary} title={text.headerSection}>
            <label className="field">
              <span>{text.headerStyle}</span>
              <span className="select-control">
                <select className="plain-select" onChange={(event) => setHeaderStyle(event.target.value as HeaderStyle)} value={headerStyle}>
                  {headerStyles.map((style) => (
                    <option key={style} value={style}>
                      {text.headerStyles[style]}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} strokeWidth={2.1} />
              </span>
            </label>

            <div className="form-grid form-grid--compact">
              <label className="field">
                <span>{text.brandName}</span>
                <input onChange={(event) => setBrandName(event.target.value)} placeholder={text.brandNamePlaceholder} value={brandName} />
              </label>

              <label className="field">
                <span>{text.logoUrl}</span>
                <input onChange={(event) => setLogoUrl(event.target.value)} placeholder={text.logoUrlPlaceholder} value={logoUrl} />
              </label>
            </div>

            <label className="field field--spaced">
              <span>{text.preheaderText}</span>
              <input onChange={(event) => setPreheaderText(event.target.value)} placeholder={text.preheaderPlaceholder} value={preheaderText} />
            </label>
          </AccordionSection>

          <AccordionSection id="body" isOpen={expandedSections.includes("body")} onToggle={toggleSection} summary={bodySummary} title={text.bodySection}>
            <label className="field">
              <span>{text.bodyStyle}</span>
              <span className="select-control">
                <select className="plain-select" onChange={(event) => setBodyStyle(event.target.value as BodyStyle)} value={bodyStyle}>
                  {bodyStyles.map((style) => (
                    <option key={style} value={style}>
                      {text.bodyStyles[style]}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} strokeWidth={2.1} />
              </span>
            </label>
          </AccordionSection>

          <AccordionSection id="button" isOpen={expandedSections.includes("button")} onToggle={toggleSection} summary={buttonSummary} title={text.buttonSection}>
            <div className="form-grid form-grid--compact">
              <label className="field">
                <span>{text.buttonStyle}</span>
                <span className="select-control">
                  <select className="plain-select" onChange={(event) => setButtonStyle(event.target.value as ButtonStyle)} value={buttonStyle}>
                    {buttonStyles.map((style) => (
                      <option key={style} value={style}>
                        {text.buttonStyles[style]}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} strokeWidth={2.1} />
                </span>
              </label>

              <label className="field">
                <span>{text.buttonText}</span>
                <input onChange={(event) => setButtonText(event.target.value)} placeholder={text.buttonTextPlaceholder} value={buttonText} />
              </label>
            </div>

            <label className="field field--spaced">
              <span>{text.buttonUrl}</span>
              <input onChange={(event) => setButtonUrl(event.target.value)} placeholder={text.buttonUrlPlaceholder} value={buttonUrl} />
            </label>
          </AccordionSection>

          <AccordionSection id="footer" isOpen={expandedSections.includes("footer")} onToggle={toggleSection} summary={footerSummary} title={text.footerSection}>
            <label className="field">
              <span>{text.footerStyle}</span>
              <span className="select-control">
                <select className="plain-select" onChange={(event) => setFooterStyle(event.target.value as FooterStyle)} value={footerStyle}>
                  {footerStyles.map((style) => (
                    <option key={style} value={style}>
                      {text.footerStyles[style]}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} strokeWidth={2.1} />
              </span>
            </label>

            <label className="field field--spaced">
              <span>{text.footerText}</span>
              <textarea onChange={(event) => setFooterText(event.target.value)} placeholder={text.footerTextPlaceholder} rows={3} value={footerText} />
            </label>

            <label className="field field--spaced">
              <span>{text.unsubscribeUrl}</span>
              <input onChange={(event) => setUnsubscribeUrl(event.target.value)} placeholder={text.unsubscribeUrlPlaceholder} value={unsubscribeUrl} />
            </label>
          </AccordionSection>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="calculator-layout">
        <form className="calculator-card" onSubmit={handleSubmit}>
          <div className="calculator-card__header">
            <div>
              <p className="section__kicker">{text.kicker}</p>
              <h2>{text.title}</h2>
            </div>
            <span>
              <Mail size={20} strokeWidth={2.1} />
            </span>
          </div>

          {renderTemplateControls()}

          <div className="calculator-hint">
            <Info size={16} strokeWidth={2.1} />
            <span>{text.htmlHint}</span>
          </div>

          <button className="primary-action" type="submit">
            <Palette size={18} />
            {text.updatePreview}
          </button>

          <button className="secondary-action" onClick={handleReset} type="button">
            <RotateCcw size={18} />
            {text.reset}
          </button>
        </form>

        <aside className="result-panel" ref={resultRef}>
          {copyStatus ? (
            <div className={`duplicate-copy-toast${copyStatus === text.copyFailed ? " duplicate-copy-toast--error" : ""}`} role="status">
              <CheckCircle2 size={16} strokeWidth={2.1} />
              <span>{copyStatus}</span>
            </div>
          ) : null}

          <div className="result-panel__hero result-panel__hero--compact">
            <p>{text.htmlReady}</p>
            <strong>{result.subject || text.previewTitle}</strong>
            <span>
              {text.layoutStyles[result.layoutStyle]} · {text.headerStyles[result.headerStyle]}
            </span>
          </div>

          <div className="text-result">
            <div className="text-result__header">
              <span>{text.previewTitle}</span>
              <div className="text-result__actions">
                <button onClick={openExpandedPreview} type="button">
                  <Maximize2 size={16} strokeWidth={2.1} />
                  {text.expand}
                </button>
                <button onClick={() => copyToClipboard(result.html)} type="button">
                  <Clipboard size={16} strokeWidth={2.1} />
                  {text.copyHtml}
                </button>
                <details className="result-action-menu">
                  <summary aria-label={text.moreOptions} title={text.moreOptions}>
                    <MoreHorizontal size={18} strokeWidth={2.1} />
                  </summary>
                  <div className="result-action-menu__content">
                    <button onClick={() => downloadHtml()} type="button">
                      <Download size={16} strokeWidth={2.1} />
                      {text.downloadHtml}
                    </button>
                    {result.subject ? (
                      <button onClick={() => copyToClipboard(result.subject, text.subjectCopied)} type="button">
                        <Clipboard size={16} strokeWidth={2.1} />
                        {text.copySubject}
                      </button>
                    ) : null}
                  </div>
                </details>
              </div>
            </div>

            <div className="html-preview-frame-wrap">
              <iframe className="html-preview-frame" referrerPolicy="no-referrer" sandbox="" srcDoc={previewDocument} title={text.previewTitle} />
            </div>
          </div>

          <div className="result-breakdown">
            <div className="result-item result-item--strong">
              <span>{text.layoutStyle}</span>
              <strong>{text.layoutStyles[result.layoutStyle]}</strong>
            </div>
            <div className="result-item">
              <span>{text.headerStyle}</span>
              <strong>{text.headerStyles[result.headerStyle]}</strong>
            </div>
            <div className="result-item">
              <span>{text.footerStyle}</span>
              <strong>{text.footerStyles[result.footerStyle]}</strong>
            </div>
            <div className="result-item">
              <span>{text.characters}</span>
              <strong>{numberFormatter.format(result.characters)}</strong>
            </div>
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>{text.htmlRulesNote}</p>
          </div>

          <p className="disclaimer">{text.disclaimer}</p>
        </aside>
      </div>

      {isExpanded ? (
        <ExpandedEmailPreview
          autoUpdate={expandedAutoUpdate}
          closeLabel={text.close}
          controls={renderTemplateControls()}
          controlsTitle={text.customizeTitle}
          copyFailedLabel={text.copyFailed}
          copyHtmlLabel={text.copyHtml}
          copyStatus={copyStatus}
          downloadHtmlLabel={text.downloadHtml}
          onClose={() => setIsExpanded(false)}
          onCopyHtml={() => copyToClipboard(expandedResult.html)}
          onDownloadHtml={() => downloadHtml(expandedResult.html)}
          onToggleAutoUpdate={handleExpandedAutoUpdateChange}
          onUpdatePreview={handleExpandedUpdate}
          previewDocument={expandedPreviewDocument}
          previewTitle={text.previewTitle}
          title={expandedResult.subject}
          updatePreviewLabel={text.updatePreview}
          autoUpdateLabel={text.autoUpdatePreview}
        />
      ) : null}
    </>
  );
}

function ExpandedEmailPreview({
  autoUpdate,
  closeLabel,
  controls,
  controlsTitle,
  copyFailedLabel,
  copyHtmlLabel,
  copyStatus,
  downloadHtmlLabel,
  onClose,
  onCopyHtml,
  onDownloadHtml,
  onToggleAutoUpdate,
  onUpdatePreview,
  previewDocument,
  previewTitle,
  title,
  updatePreviewLabel,
  autoUpdateLabel
}: {
  autoUpdate: boolean;
  closeLabel: string;
  controls: ReactNode;
  controlsTitle: string;
  copyFailedLabel: string;
  copyHtmlLabel: string;
  copyStatus: string;
  downloadHtmlLabel: string;
  onClose: () => void;
  onCopyHtml: () => void;
  onDownloadHtml: () => void;
  onToggleAutoUpdate: () => void;
  onUpdatePreview: () => void;
  previewDocument: string;
  previewTitle: string;
  title: string;
  updatePreviewLabel: string;
  autoUpdateLabel: string;
}) {
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
    <div className="html-preview-wide" role="dialog" aria-modal="true" aria-label={previewTitle}>
      <div className="html-preview-wide__bar">
        <div>
          <span>{previewTitle}</span>
          {title ? <strong>{title}</strong> : null}
        </div>
        <div className="html-preview-wide__actions">
          <button className={`html-preview-live-toggle${autoUpdate ? " is-active" : ""}`} onClick={onToggleAutoUpdate} type="button">
            <span aria-hidden="true" />
            {autoUpdateLabel}
          </button>
          <button className="secondary-action" disabled={autoUpdate} onClick={onUpdatePreview} type="button">
            <Palette size={18} />
            {updatePreviewLabel}
          </button>
          <button className="secondary-action" onClick={onDownloadHtml} type="button">
            <Download size={18} />
            {downloadHtmlLabel}
          </button>
          <button className="secondary-action" onClick={onCopyHtml} type="button">
            <Clipboard size={18} />
            {copyHtmlLabel}
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
            <span>{controlsTitle}</span>
          </div>
          <div className="email-template-expanded-controls">{controls}</div>
        </section>

        <section className="html-preview-wide__pane">
          <div className="html-preview-wide__pane-header">
            <span>{previewTitle}</span>
          </div>
          <div className="html-preview-wide__frame-wrap">
            <iframe className="html-preview-frame" referrerPolicy="no-referrer" sandbox="" srcDoc={previewDocument} title={previewTitle} />
          </div>
        </section>
      </div>
    </div>
  );
}
