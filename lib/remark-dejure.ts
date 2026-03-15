import { visit, SKIP } from 'unist-util-visit';
import type { Root, Text, Link, PhrasingContent } from 'mdast';

const SUPPORTED_LAWS = new Set([
  'BGB', 'ZPO', 'HGB', 'KSchG', 'GmbHG', 'AktG', 'ArbGG', 'BetrVG',
  'GVG', 'UWG', 'InsO', 'StGB', 'GKG', 'RVG', 'TzBfG', 'MuSchG',
  'AGG', 'SGB', 'BDSG', 'DSGVO', 'GewO', 'AÜG', 'TVG', 'FamFG',
]);

const LAWS_PATTERN = Array.from(SUPPORTED_LAWS).join('|');

// Single-section reference: § 280 BGB, § 280 Abs. 1 BGB, § 280(1) BGB
// Multi-section with §§: §§ 280, 281 BGB, §§ 935–945 ZPO, §§ 327a-f AktG
// Section/sec. variants: Section 377 HGB, sec. 377 HGB
const SINGLE_REF =
  '(?:§§?|[Ss]ection|[Ss]ec\\.)\\s+' +
  '[0-9]+[a-z]?' +
  '(?:(?:[–,\\-]\\s*[0-9]+[a-z]?(?:\\-[a-z])?))?'  +
  '(?:\\([0-9]+\\))?' +
  '(?:\\s+Abs\\.\\s+[0-9]+)?';

// Compound pattern: § 195, § 199 BGB (multiple § refs sharing one law name)
const COMPOUND_TAIL =
  '(?:,\\s*§\\s+[0-9]+[a-z]?' +
  '(?:\\([0-9]+\\))?' +
  '(?:\\s+Abs\\.\\s+[0-9]+)?)*';

const LAW_REGEX = new RegExp(
  SINGLE_REF + COMPOUND_TAIL + '\\s+(' + LAWS_PATTERN + ')', 'g'
);

function buildUrl(sectionNum: string, law: string): string {
  return `https://dejure.org/gesetze/${law}/${sectionNum}.html`;
}

function extractSection(text: string): string {
  const numMatch = text.match(/(?:§§?|[Ss]ection|[Ss]ec\.)\s+([0-9]+[a-z]?)/);
  return numMatch ? numMatch[1] : '';
}

function extractLaw(text: string): string {
  const words = text.trim().split(/\s+/);
  return words[words.length - 1];
}

function makeLink(text: string, section: string, law: string): Link {
  return {
    type: 'link',
    url: buildUrl(section, law),
    data: {
      hProperties: {
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    },
    children: [{ type: 'text', value: text }],
  };
}

// Split a compound match like "§ 195, § 199 BGB" into multiple link nodes
function buildMatchNodes(match: string): PhrasingContent[] {
  const law = extractLaw(match);
  if (!SUPPORTED_LAWS.has(law)) {
    return [{ type: 'text', value: match }];
  }

  // Find all individual § references within the match
  const refPattern = /(§§?|[Ss]ection|[Ss]ec\.)\s+([0-9]+[a-z]?)(?:(?:[–,\-]\s*[0-9]+[a-z]?(?:\-[a-z])?))?(?:\([0-9]+\))?(?:\s+Abs\.\s+[0-9]+)?/g;
  const refs: { start: number; end: number; section: string }[] = [];
  let rm;
  while ((rm = refPattern.exec(match)) !== null) {
    refs.push({ start: rm.index, end: rm.index + rm[0].length, section: rm[2] });
  }

  if (refs.length <= 1) {
    // Simple case: one reference, link the whole match
    const section = extractSection(match);
    if (section) {
      return [makeLink(match, section, law)];
    }
    return [{ type: 'text', value: match }];
  }

  // Compound case: create separate links for each § ref
  const nodes: PhrasingContent[] = [];
  let innerEnd = 0;

  for (let i = 0; i < refs.length; i++) {
    const ref = refs[i];

    // Plain text before this ref (e.g. ", ")
    if (ref.start > innerEnd) {
      nodes.push({ type: 'text', value: match.slice(innerEnd, ref.start) });
    }

    if (i === refs.length - 1) {
      // Last ref: include the trailing law name
      nodes.push(makeLink(match.slice(ref.start), ref.section, law));
      innerEnd = match.length;
    } else {
      nodes.push(makeLink(match.slice(ref.start, ref.end), ref.section, law));
      innerEnd = ref.end;
    }
  }

  return nodes;
}

export default function remarkDejure() {
  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index, parent) => {
      if (!parent || index === undefined) return;

      // Skip text nodes inside links (prevent double-linking)
      if (parent.type === 'link') return SKIP;

      const text = node.value;
      LAW_REGEX.lastIndex = 0;

      const matches: { start: number; end: number; match: string }[] = [];
      let m;
      while ((m = LAW_REGEX.exec(text)) !== null) {
        matches.push({ start: m.index, end: m.index + m[0].length, match: m[0] });
      }

      if (matches.length === 0) return;

      // Build replacement nodes
      const nodes: PhrasingContent[] = [];
      let lastEnd = 0;

      for (const { start, end, match } of matches) {
        // Text before this match
        if (start > lastEnd) {
          nodes.push({ type: 'text', value: text.slice(lastEnd, start) });
        }

        nodes.push(...buildMatchNodes(match));
        lastEnd = end;
      }

      // Remaining text after last match
      if (lastEnd < text.length) {
        nodes.push({ type: 'text', value: text.slice(lastEnd) });
      }

      // Replace the original text node with the new nodes
      parent.children.splice(index, 1, ...nodes);

      // Return the index + number of new nodes to skip them
      return [SKIP, index + nodes.length] as const;
    });
  };
}
