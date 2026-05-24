import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcRoot = path.join(projectRoot, "src");
const allowedHardcodedText = new Set(["Tools Platforms", "COP", "UUID ·", "A, B, C", "a, b, c"]);
const badEncodingPattern = /[\u00c3\u00c2\ufffd]|\?neas|p\?rrafos|l\?neas/;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const filePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...await walk(filePath));
    } else if (/\.(ts|tsx|mjs|html|xml)$/.test(entry.name)) {
      files.push(filePath);
    }
  }

  return files;
}

function getLocation(sourceFile, node) {
  const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
  return `${path.relative(projectRoot, sourceFile.fileName)}:${line + 1}:${character + 1}`;
}

function collectHardcodedJsx(sourceFile) {
  const findings = [];

  function visit(node) {
    if (ts.isJsxText(node)) {
      const text = node.getText(sourceFile).replace(/\s+/g, " ").trim();

      if (text && /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ¿¡]/.test(text) && !allowedHardcodedText.has(text)) {
        findings.push(`${getLocation(sourceFile, node)} ${JSON.stringify(text)}`);
      }
    }

    if (ts.isJsxAttribute(node) && node.initializer && ts.isStringLiteral(node.initializer)) {
      const name = node.name.getText(sourceFile);
      const text = node.initializer.text;

      if (
        ["aria-label", "title", "placeholder", "alt"].includes(name) &&
        /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ¿¡]/.test(text) &&
        !allowedHardcodedText.has(text)
      ) {
        findings.push(`${getLocation(sourceFile, node)} ${name}=${JSON.stringify(text)}`);
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return findings;
}

const files = await walk(srcRoot);
const encodingFindings = [];
const jsxFindings = [];

for (const file of files) {
  const source = await readFile(file, "utf8");
  const relativePath = path.relative(projectRoot, file);

  source.split(/\r?\n/).forEach((line, index) => {
    if (badEncodingPattern.test(line)) {
      encodingFindings.push(`${relativePath}:${index + 1} ${line.trim()}`);
    }
  });

  if (file.endsWith(".tsx")) {
    const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    jsxFindings.push(...collectHardcodedJsx(sourceFile));
  }
}

if (encodingFindings.length > 0 || jsxFindings.length > 0) {
  if (encodingFindings.length > 0) {
    console.error("Encoding issues:");
    console.error(encodingFindings.join("\n"));
  }

  if (jsxFindings.length > 0) {
    console.error("Hardcoded visible JSX text:");
    console.error(jsxFindings.join("\n"));
  }

  process.exit(1);
}

console.log("i18n check passed.");
