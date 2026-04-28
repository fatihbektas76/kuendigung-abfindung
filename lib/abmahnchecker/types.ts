export type Block = 'A' | 'B' | 'C' | 'D' | 'E';
export type Weight = 'KO' | 'STRONG_NEGATIVE' | 'NEGATIVE' | 'NEUTRAL' | 'POSITIVE';
export type Verdict = 'WIRKSAM' | 'UNSICHER' | 'UNWIRKSAM';

export interface Option {
  id: string;
  label: string;
  hint: string;
  hintTone: 'danger' | 'warning' | 'neutral' | 'success';
  weight: Weight;
  triggers?: string[];
}

export interface Question {
  id: string;
  block: Block;
  blockLabel: string;
  text: string;
  help?: string;
  options: Option[];
  showIf?: (answers: Record<string, string>) => boolean;
}

export interface Finding {
  id: string;
  severity: 'KO' | 'INDIZ';
  title: string;
  body: string;
  citation: string;
}

export interface Answer {
  questionId: string;
  optionId: string;
}

export interface EvaluationResult {
  verdict: Verdict;
  findings: Finding[];
  scoreDetails: {
    ko: number;
    strongNegative: number;
    negative: number;
    positive: number;
  };
}
