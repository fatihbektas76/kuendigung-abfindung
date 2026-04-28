import type { Answer, EvaluationResult, Finding, Verdict } from './types';
import { questions } from './questions';
import { findingsMap } from './findings';

export function evaluate(answers: Answer[]): EvaluationResult {
  const allTriggers: string[] = [];
  let ko = 0;
  let strongNegative = 0;
  let negative = 0;
  let positive = 0;

  for (const answer of answers) {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) continue;

    const option = question.options.find((o) => o.id === answer.optionId);
    if (!option) continue;

    switch (option.weight) {
      case 'KO':
        ko++;
        break;
      case 'STRONG_NEGATIVE':
        strongNegative++;
        break;
      case 'NEGATIVE':
        negative++;
        break;
      case 'POSITIVE':
        positive++;
        break;
    }

    if (option.triggers) {
      allTriggers.push(...option.triggers);
    }
  }

  const findings: Finding[] = [];
  const seen = new Set<string>();
  for (const triggerId of allTriggers) {
    if (seen.has(triggerId)) continue;
    seen.add(triggerId);
    const finding = findingsMap[triggerId];
    if (finding) {
      findings.push(finding);
    }
  }

  // Sort: KO first, then INDIZ
  findings.sort((a, b) => {
    if (a.severity === 'KO' && b.severity !== 'KO') return -1;
    if (a.severity !== 'KO' && b.severity === 'KO') return 1;
    return 0;
  });

  let verdict: Verdict;
  const koFindings = findings.filter((f) => f.severity === 'KO').length;

  if (koFindings >= 1) {
    verdict = 'UNWIRKSAM';
  } else if (
    strongNegative >= 2 ||
    (strongNegative >= 1 && negative >= 2)
  ) {
    verdict = 'UNWIRKSAM';
  } else if (strongNegative >= 1 || negative >= 2) {
    verdict = 'UNSICHER';
  } else {
    verdict = 'WIRKSAM';
  }

  return {
    verdict,
    findings,
    scoreDetails: { ko, strongNegative, negative, positive },
  };
}
