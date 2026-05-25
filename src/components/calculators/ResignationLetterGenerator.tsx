import { CheckCircle2, ChevronDown, Clipboard, Download, FileText, Info, MoreHorizontal, RotateCcw } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { DateField } from "../DateField";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale, type Locale } from "../../i18n";
import { resignationLetterGeneratorCopy as copy } from "../../locales/calculatorCopy";

type LetterTone = "formal" | "brief" | "grateful";

type LetterResult = {
  letter: string;
  tone: LetterTone;
  companyName: string;
  lastDay: string;
};

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function getLocaleCode(locale: Locale) {
  if (locale === "en") return "en-US";
  if (locale === "hi") return "hi-IN";
  return "es-CO";
}

function formatDate(value: string, locale: Locale) {
  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return value;
  }

  return new Intl.DateTimeFormat(getLocaleCode(locale), {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(year, month - 1, day));
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function createFileName(value: string) {
  const cleaned = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

  return cleaned || "resignation-letter";
}

function downloadFile(filename: string, content: BlobPart, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function dataUrlToBytes(dataUrl: string) {
  const base64 = dataUrl.split(",")[1] ?? "";
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function toAsciiBytes(value: string) {
  return new TextEncoder().encode(value);
}

function concatBytes(parts: Uint8Array[]) {
  const totalLength = parts.reduce((total, part) => total + part.length, 0);
  const merged = new Uint8Array(totalLength);
  let offset = 0;

  parts.forEach((part) => {
    merged.set(part, offset);
    offset += part.length;
  });

  return merged;
}

function getCrc32Table() {
  const table = new Uint32Array(256);

  for (let index = 0; index < table.length; index += 1) {
    let value = index;
    for (let bit = 0; bit < 8; bit += 1) {
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }
    table[index] = value >>> 0;
  }

  return table;
}

const crc32Table = getCrc32Table();

function crc32(bytes: Uint8Array) {
  let crc = 0xffffffff;

  bytes.forEach((byte) => {
    crc = crc32Table[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  });

  return (crc ^ 0xffffffff) >>> 0;
}

function writeUint16(target: Uint8Array, offset: number, value: number) {
  target[offset] = value & 0xff;
  target[offset + 1] = (value >>> 8) & 0xff;
}

function writeUint32(target: Uint8Array, offset: number, value: number) {
  target[offset] = value & 0xff;
  target[offset + 1] = (value >>> 8) & 0xff;
  target[offset + 2] = (value >>> 16) & 0xff;
  target[offset + 3] = (value >>> 24) & 0xff;
}

function createZip(entries: Array<{ name: string; content: Uint8Array }>) {
  const localParts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];
  let localOffset = 0;

  entries.forEach((entry) => {
    const fileName = toAsciiBytes(entry.name);
    const checksum = crc32(entry.content);
    const localHeader = new Uint8Array(30 + fileName.length);
    const centralHeader = new Uint8Array(46 + fileName.length);

    writeUint32(localHeader, 0, 0x04034b50);
    writeUint16(localHeader, 4, 20);
    writeUint16(localHeader, 6, 0x0800);
    writeUint16(localHeader, 8, 0);
    writeUint32(localHeader, 10, 0);
    writeUint32(localHeader, 14, checksum);
    writeUint32(localHeader, 18, entry.content.length);
    writeUint32(localHeader, 22, entry.content.length);
    writeUint16(localHeader, 26, fileName.length);
    localHeader.set(fileName, 30);

    writeUint32(centralHeader, 0, 0x02014b50);
    writeUint16(centralHeader, 4, 20);
    writeUint16(centralHeader, 6, 20);
    writeUint16(centralHeader, 8, 0x0800);
    writeUint16(centralHeader, 10, 0);
    writeUint32(centralHeader, 12, 0);
    writeUint32(centralHeader, 16, checksum);
    writeUint32(centralHeader, 20, entry.content.length);
    writeUint32(centralHeader, 24, entry.content.length);
    writeUint16(centralHeader, 28, fileName.length);
    writeUint32(centralHeader, 42, localOffset);
    centralHeader.set(fileName, 46);

    localParts.push(localHeader, entry.content);
    centralParts.push(centralHeader);
    localOffset += localHeader.length + entry.content.length;
  });

  const centralDirectory = concatBytes(centralParts);
  const endRecord = new Uint8Array(22);

  writeUint32(endRecord, 0, 0x06054b50);
  writeUint16(endRecord, 8, entries.length);
  writeUint16(endRecord, 10, entries.length);
  writeUint32(endRecord, 12, centralDirectory.length);
  writeUint32(endRecord, 16, localOffset);

  return concatBytes([...localParts, centralDirectory, endRecord]);
}

function buildDocx(title: string, content: string) {
  const paragraphStyle = '<w:pPr><w:spacing w:after="0" w:line="360" w:lineRule="auto"/></w:pPr>';
  const runStyle = '<w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="Mangal" w:cs="Mangal"/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr>';
  const paragraphs = content.split(/\r?\n/).map((line) => (
    line.trim()
      ? `<w:p>${paragraphStyle}<w:r>${runStyle}<w:t xml:space="preserve">${escapeXml(line)}</w:t></w:r></w:p>`
      : `<w:p>${paragraphStyle}</w:p>`
  )).join("");
  const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    ${paragraphs}
    <w:sectPr>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>`;

  const entries = [
    {
      name: "[Content_Types].xml",
      content: toAsciiBytes(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`)
    },
    {
      name: "_rels/.rels",
      content: toAsciiBytes(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`)
    },
    {
      name: "docProps/app.xml",
      content: toAsciiBytes(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Tools Platforms</Application>
</Properties>`)
    },
    {
      name: "docProps/core.xml",
      content: toAsciiBytes(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>${escapeXml(title)}</dc:title>
  <dc:creator>Tools Platforms</dc:creator>
  <cp:lastModifiedBy>Tools Platforms</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">${new Date().toISOString()}</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">${new Date().toISOString()}</dcterms:modified>
</cp:coreProperties>`)
    },
    {
      name: "word/_rels/document.xml.rels",
      content: toAsciiBytes(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"/>`)
    },
    {
      name: "word/document.xml",
      content: toAsciiBytes(documentXml)
    }
  ];

  return createZip(entries);
}

function wrapCanvasLine(context: CanvasRenderingContext2D, line: string, maxWidth: number) {
  const words = line.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;

    if (context.measureText(next).width <= maxWidth) {
      current = next;
      return;
    }

    if (current) {
      lines.push(current);
      current = word;
      return;
    }

    let fragment = "";
    [...word].forEach((character) => {
      const nextFragment = `${fragment}${character}`;
      if (context.measureText(nextFragment).width <= maxWidth) {
        fragment = nextFragment;
        return;
      }
      if (fragment) lines.push(fragment);
      fragment = character;
    });
    current = fragment;
  });

  if (current) {
    lines.push(current);
  }

  return lines.length > 0 ? lines : [""];
}

function renderLetterPages(content: string) {
  const width = 1240;
  const height = 1754;
  const margin = 140;
  const lineHeight = 40;
  const maxWidth = width - margin * 2;
  const pages: HTMLCanvasElement[] = [];
  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;
  let y = margin;

  function createPage() {
    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const nextContext = canvas.getContext("2d");

    if (!nextContext) {
      throw new Error("Canvas context is not available.");
    }

    context = nextContext;
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.fillStyle = "#111827";
    context.font = '26px "Times New Roman", Times, serif';
    context.textBaseline = "top";
    y = margin;
    pages.push(canvas);
  }

  function ensureSpace() {
    if (y + lineHeight > height - margin) {
      createPage();
    }
  }

  createPage();

  content.split(/\r?\n/).forEach((rawLine) => {
    if (!rawLine.trim()) {
      ensureSpace();
      y += lineHeight;
      return;
    }

    wrapCanvasLine(context, rawLine, maxWidth).forEach((line) => {
      ensureSpace();
      context.fillText(line, margin, y);
      y += lineHeight;
    });
  });

  return pages.map((page) => ({
    width: page.width,
    height: page.height,
    bytes: dataUrlToBytes(page.toDataURL("image/jpeg", 0.92))
  }));
}

function buildPdf(content: string) {
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const images = renderLetterPages(content);
  const pageObjectIds = images.map((_, index) => 3 + index * 3);
  const parts: Uint8Array[] = [];
  const offsets: number[] = [];
  let length = 0;

  function append(part: string | Uint8Array) {
    const bytes = typeof part === "string" ? toAsciiBytes(part) : part;
    parts.push(bytes);
    length += bytes.length;
  }

  function addObject(objectId: number, contentParts: Array<string | Uint8Array>) {
    offsets[objectId] = length;
    append(`${objectId} 0 obj\n`);
    contentParts.forEach(append);
    append("\nendobj\n");
  }

  append("%PDF-1.4\n");
  addObject(1, ["<< /Type /Catalog /Pages 2 0 R >>"]);
  addObject(2, [`<< /Type /Pages /Kids [${pageObjectIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${images.length} >>`]);

  images.forEach((image, index) => {
    const pageObjectId = 3 + index * 3;
    const imageObjectId = pageObjectId + 1;
    const contentObjectId = pageObjectId + 2;
    const imageName = `Im${index + 1}`;
    const stream = `q\n${pageWidth} 0 0 ${pageHeight} 0 0 cm\n/${imageName} Do\nQ`;

    addObject(pageObjectId, [
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /XObject << /${imageName} ${imageObjectId} 0 R >> >> /Contents ${contentObjectId} 0 R >>`
    ]);
    addObject(imageObjectId, [
      `<< /Type /XObject /Subtype /Image /Width ${image.width} /Height ${image.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${image.bytes.length} >>\nstream\n`,
      image.bytes,
      "\nendstream"
    ]);
    addObject(contentObjectId, [`<< /Length ${toAsciiBytes(stream).length} >>\nstream\n${stream}\nendstream`]);
  });

  const startXref = length;
  const objectCount = images.length * 3 + 3;
  append(`xref\n0 ${objectCount}\n0000000000 65535 f \n`);

  for (let objectId = 1; objectId < objectCount; objectId += 1) {
    append(`${String(offsets[objectId] ?? 0).padStart(10, "0")} 00000 n \n`);
  }

  append(`trailer\n<< /Size ${objectCount} /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF`);

  return concatBytes(parts);
}

export function ResignationLetterGenerator() {
  const { locale } = useLocale();
  const text = copy[locale];
  const numberFormatter = useMemo(() => new Intl.NumberFormat(getLocaleCode(locale)), [locale]);
  const [fullName, setFullName] = useState("");
  const [identityDocument, setIdentityDocument] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [recipient, setRecipient] = useState("");
  const [city, setCity] = useState("");
  const [letterDate, setLetterDate] = useState(toDateKey(new Date()));
  const [lastDay, setLastDay] = useState(toDateKey(addDays(new Date(), 15)));
  const [tone, setTone] = useState<LetterTone>("formal");
  const [reason, setReason] = useState("");
  const [result, setResult] = useState<LetterResult | null>(null);
  const [editableLetter, setEditableLetter] = useState("");
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  useEffect(() => {
    if (!copyStatus) return;
    const timer = window.setTimeout(() => setCopyStatus(""), 2400);
    return () => window.clearTimeout(timer);
  }, [copyStatus]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setCopyStatus("");

    if (!fullName.trim() || !identityDocument.trim() || !jobTitle.trim() || !companyName.trim() || !letterDate || !lastDay) {
      setResult(null);
      setEditableLetter("");
      setError(text.emptyError);
      return;
    }

    const letter = text.templates[tone]({
      fullName: fullName.trim(),
      identityDocument: identityDocument.trim(),
      jobTitle: jobTitle.trim(),
      companyName: companyName.trim(),
      recipient: recipient.trim(),
      city: city.trim(),
      letterDate: formatDate(letterDate, locale),
      lastDay: formatDate(lastDay, locale),
      reason: reason.trim()
    });

    setResult({
      letter,
      tone,
      companyName: companyName.trim(),
      lastDay
    });
    setEditableLetter(letter);
    scrollToResultOnMobile();
  }

  function handleReset() {
    setFullName("");
    setIdentityDocument("");
    setJobTitle("");
    setCompanyName("");
    setRecipient("");
    setCity("");
    setLetterDate(toDateKey(new Date()));
    setLastDay(toDateKey(addDays(new Date(), 15)));
    setTone("formal");
    setReason("");
    setResult(null);
    setEditableLetter("");
    setError("");
    setCopyStatus("");
  }

  async function handleCopy() {
    if (!editableLetter) return;

    try {
      await navigator.clipboard.writeText(editableLetter);
      setCopyStatus(text.copied);
    } catch {
      setCopyStatus(text.copyFailed);
    }
  }

  function handleDownloadDoc() {
    if (!editableLetter) return;

    const filename = `${createFileName(`${text.fileName}-${fullName || companyName}`)}.docx`;
    downloadFile(filename, buildDocx(text.documentTitle, editableLetter), "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    setCopyStatus(text.docReady);
  }

  function handleDownloadPdf() {
    if (!editableLetter) return;

    const filename = `${createFileName(`${text.fileName}-${fullName || companyName}`)}.pdf`;
    downloadFile(filename, buildPdf(editableLetter), "application/pdf");
    setCopyStatus(text.pdfReady);
  }

  const toneLabel = result ? text.tones[result.tone] : text.tones[tone];

  return (
    <div className="calculator-layout">
      <form className="calculator-card" onSubmit={handleSubmit}>
        <div className="calculator-card__header">
          <div>
            <p className="section__kicker">{text.kicker}</p>
            <h2>{text.title}</h2>
          </div>
          <span>
            <FileText size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>{text.fullName} <span className="required-mark">*</span></span>
          <input onChange={(event) => setFullName(event.target.value)} placeholder={text.fullNamePlaceholder} type="text" value={fullName} />
        </label>

        <label className="field field--spaced">
          <span>{text.identityDocument} <span className="required-mark">*</span></span>
          <input onChange={(event) => setIdentityDocument(event.target.value)} placeholder={text.identityDocumentPlaceholder} type="text" value={identityDocument} />
        </label>

        <div className="form-grid">
          <label className="field">
            <span>{text.jobTitle} <span className="required-mark">*</span></span>
            <input onChange={(event) => setJobTitle(event.target.value)} placeholder={text.jobTitlePlaceholder} type="text" value={jobTitle} />
          </label>
          <label className="field">
            <span>{text.companyName} <span className="required-mark">*</span></span>
            <input onChange={(event) => setCompanyName(event.target.value)} placeholder={text.companyNamePlaceholder} type="text" value={companyName} />
          </label>
        </div>

        <div className="form-grid">
          <label className="field">
            <span>{text.letterDate} <span className="required-mark">*</span></span>
            <DateField ariaLabel={text.letterDateAria} onChange={setLetterDate} value={letterDate} />
          </label>
          <label className="field">
            <span>{text.lastDay} <span className="required-mark">*</span></span>
            <DateField ariaLabel={text.lastDayAria} onChange={setLastDay} value={lastDay} />
          </label>
        </div>

        <div className="form-grid">
          <label className="field">
            <span>{text.city}</span>
            <input onChange={(event) => setCity(event.target.value)} placeholder={text.cityPlaceholder} type="text" value={city} />
          </label>
          <label className="field">
            <span>{text.recipient}</span>
            <input onChange={(event) => setRecipient(event.target.value)} placeholder={text.recipientPlaceholder} type="text" value={recipient} />
          </label>
        </div>

        <label className="field field--spaced">
          <span>{text.tone}</span>
          <span className="select-control">
            <select className="plain-select" onChange={(event) => setTone(event.target.value as LetterTone)} value={tone}>
              <option value="formal">{text.tones.formal}</option>
              <option value="brief">{text.tones.brief}</option>
              <option value="grateful">{text.tones.grateful}</option>
            </select>
            <ChevronDown size={18} strokeWidth={2.1} />
          </span>
        </label>

        <label className="field field--spaced">
          <span>{text.reason}</span>
          <textarea className="text-tool-textarea" onChange={(event) => setReason(event.target.value)} placeholder={text.reasonPlaceholder} rows={4} value={reason} />
        </label>

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.hint}</span>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-action" type="submit">
          <FileText size={18} />
          {text.submit}
        </button>

        <button className="secondary-action" onClick={handleReset} type="button">
          <RotateCcw size={18} />
          {text.reset}
        </button>
      </form>

      {result ? (
        <aside className="result-panel" ref={resultRef}>
          {copyStatus ? (
            <div className={`duplicate-copy-toast${copyStatus === text.copyFailed ? " duplicate-copy-toast--error" : ""}`} role="status">
              <CheckCircle2 size={16} strokeWidth={2.1} />
              <span>{copyStatus}</span>
            </div>
          ) : null}

          <div className="result-panel__hero result-panel__hero--compact">
            <p>{text.resultTitle}</p>
            <strong>{toneLabel}</strong>
            <span>{text.editableDraft}</span>
          </div>

          <div className="text-result">
            <div className="text-result__header">
              <span>{text.result}</span>
              <div className="text-result__actions">
                <button onClick={handleDownloadPdf} type="button">
                  <Download size={16} strokeWidth={2.1} />
                  {text.downloadPdf}
                </button>
                <details className="result-action-menu">
                  <summary aria-label={text.moreOptions} title={text.moreOptions}>
                    <MoreHorizontal size={18} strokeWidth={2.1} />
                  </summary>
                  <div className="result-action-menu__content">
                    <button onClick={handleCopy} type="button">
                      <Clipboard size={16} strokeWidth={2.1} />
                      {text.copy}
                    </button>
                    <button onClick={handleDownloadDoc} type="button">
                      <Download size={16} strokeWidth={2.1} />
                      {text.downloadDoc}
                    </button>
                  </div>
                </details>
              </div>
            </div>
            <textarea onChange={(event) => setEditableLetter(event.target.value)} rows={14} value={editableLetter} />
          </div>

          <div className="result-breakdown">
            <div className="result-item result-item--strong">
              <span>{text.tone}</span>
              <strong>{toneLabel}</strong>
            </div>
            <div className="result-item">
              <span>{text.companyName}</span>
              <strong>{result.companyName}</strong>
            </div>
            <div className="result-item">
              <span>{text.lastDayShort}</span>
              <strong>{formatDate(result.lastDay, locale)}</strong>
            </div>
            <div className="result-item">
              <span>{text.characters}</span>
              <strong>{numberFormatter.format([...editableLetter].length)}</strong>
            </div>
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>{text.rulesNote}</p>
          </div>

          <p className="disclaimer">{text.disclaimer}</p>
        </aside>
      ) : (
        <aside className="result-panel result-panel--empty" ref={resultRef}>
          <div className="result-empty">
            <FileText size={34} strokeWidth={2.1} />
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyDescription}</p>
          </div>
        </aside>
      )}
    </div>
  );
}
