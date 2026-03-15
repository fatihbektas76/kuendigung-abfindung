// German federal holidays (nation-wide) for deadline calculation per § 222 ZPO

function easterSunday(year: number): Date {
  // Anonymous Gregorian algorithm
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month, day);
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function getGermanHolidays(year: number): Date[] {
  const easter = easterSunday(year);
  return [
    new Date(year, 0, 1), // Neujahr
    addDays(easter, -2), // Karfreitag
    addDays(easter, 1), // Ostermontag
    new Date(year, 4, 1), // Tag der Arbeit
    addDays(easter, 39), // Christi Himmelfahrt
    addDays(easter, 50), // Pfingstmontag
    new Date(year, 9, 3), // Tag der Deutschen Einheit
    new Date(year, 11, 25), // 1. Weihnachtstag
    new Date(year, 11, 26), // 2. Weihnachtstag
  ];
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isGermanHoliday(date: Date): string | null {
  const holidays = getGermanHolidays(date.getFullYear());
  const names = [
    "New Year's Day",
    'Good Friday',
    'Easter Monday',
    'Labour Day',
    'Ascension Day',
    'Whit Monday',
    'German Unity Day',
    'Christmas Day',
    "St. Stephen's Day",
  ];
  for (let i = 0; i < holidays.length; i++) {
    if (isSameDay(date, holidays[i])) return names[i];
  }
  return null;
}

export interface DeadlineResult {
  originalDeadline: Date;
  effectiveDeadline: Date;
  extended: boolean;
  extensionReason: string | null;
  daysRemaining: number;
}

/**
 * Calculate a deadline per § 222 ZPO i.V.m. §§ 187-193 BGB.
 * Frist begins day after service (§ 187 Abs. 1 BGB).
 * If deadline falls on weekend/holiday, extends to next business day (§ 222 Abs. 2 ZPO).
 */
export function calculateDeadline(
  serviceDate: Date,
  weeks?: number,
  months?: number
): DeadlineResult {
  // § 187 Abs. 1 BGB: Frist beginnt am Tag nach Zustellung
  const start = new Date(serviceDate);
  start.setDate(start.getDate() + 1);

  let deadline: Date;
  if (weeks) {
    deadline = new Date(start);
    deadline.setDate(deadline.getDate() + weeks * 7 - 1);
  } else if (months) {
    deadline = new Date(start);
    deadline.setMonth(deadline.getMonth() + months);
    deadline.setDate(deadline.getDate() - 1);
  } else {
    deadline = new Date(start);
  }

  const originalDeadline = new Date(deadline);
  let extensionReason: string | null = null;

  // § 222 Abs. 2 ZPO: extend past weekends/holidays
  while (true) {
    const holiday = isGermanHoliday(deadline);
    if (deadline.getDay() === 0) {
      extensionReason = 'Sunday';
      deadline.setDate(deadline.getDate() + 1);
    } else if (deadline.getDay() === 6) {
      extensionReason = 'Saturday';
      deadline.setDate(deadline.getDate() + 2);
    } else if (holiday) {
      extensionReason = holiday;
      deadline.setDate(deadline.getDate() + 1);
    } else {
      break;
    }
  }

  const extended = !isSameDay(originalDeadline, deadline);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const daysRemaining = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  return { originalDeadline, effectiveDeadline: deadline, extended, extensionReason, daysRemaining };
}

// Statute of limitations types
export interface LimitationResult {
  expiryDate: Date;
  daysRemaining: number;
  yearEndRule: boolean;
  description: string;
}

export function calculateLimitation(
  type: string,
  relevantDate: Date
): LimitationResult {
  const d = new Date(relevantDate);
  let expiryDate: Date;
  let yearEndRule = false;
  let description = '';

  switch (type) {
    case 'general-contract': {
      // § 195 BGB: 3 years, starting end of year of knowledge
      yearEndRule = true;
      expiryDate = new Date(d.getFullYear() + 3, 11, 31);
      description = 'Regular limitation period (§ 195 BGB): 3 years from the end of the year in which the claim arose and the claimant became (or should have become) aware of it.';
      break;
    }
    case 'warranty-sale': {
      // § 438 BGB: 2 years from delivery
      expiryDate = new Date(d);
      expiryDate.setFullYear(expiryDate.getFullYear() + 2);
      description = 'Warranty for sale of goods (§ 438 BGB): 2 years from delivery of the goods.';
      break;
    }
    case 'warranty-work': {
      // § 634a BGB: 2 years from acceptance
      expiryDate = new Date(d);
      expiryDate.setFullYear(expiryDate.getFullYear() + 2);
      description = 'Warranty for works/services (§ 634a BGB): 2 years from acceptance of the work.';
      break;
    }
    case 'construction': {
      // § 634a BGB: 5 years from acceptance
      expiryDate = new Date(d);
      expiryDate.setFullYear(expiryDate.getFullYear() + 5);
      description = 'Construction defects (§ 634a BGB): 5 years from acceptance of the building work.';
      break;
    }
    case 'real-estate': {
      // § 196 BGB: 10 years from accrual
      expiryDate = new Date(d);
      expiryDate.setFullYear(expiryDate.getFullYear() + 10);
      description = 'Real estate claims (§ 196 BGB): 10 years from the date the claim arose.';
      break;
    }
    case 'unfair-dismissal': {
      // § 4 KSchG: 3 weeks from receipt of termination notice
      expiryDate = new Date(d);
      expiryDate.setDate(expiryDate.getDate() + 21);
      description = 'Unfair dismissal claim (§ 4 KSchG): 3 weeks from receipt of the termination notice. This is a strict cut-off — missing it almost always means losing your claim.';
      break;
    }
    case 'unfair-competition': {
      // § 11 UWG: 6 months from knowledge
      expiryDate = new Date(d);
      expiryDate.setMonth(expiryDate.getMonth() + 6);
      description = 'Unfair competition claims (§ 11 UWG): 6 months from knowledge of the act and the identity of the infringer.';
      break;
    }
    case 'director-liability': {
      // § 43 GmbHG: 5 years from accrual
      expiryDate = new Date(d);
      expiryDate.setFullYear(expiryDate.getFullYear() + 5);
      description = 'Claims against managing directors (§ 43 GmbHG): 5 years from the date the claim arose.';
      break;
    }
    case 'tort': {
      // § 199 BGB: 3 years from knowledge, max 10 years
      yearEndRule = true;
      expiryDate = new Date(d.getFullYear() + 3, 11, 31);
      const maxDate = new Date(d);
      maxDate.setFullYear(maxDate.getFullYear() + 10);
      if (expiryDate > maxDate) expiryDate = maxDate;
      description = 'Tort/delict claims (§ 199 BGB): 3 years from the end of the year of knowledge, but maximum 10 years from the date the claim arose regardless of knowledge.';
      break;
    }
    default: {
      expiryDate = new Date(d);
      expiryDate.setFullYear(expiryDate.getFullYear() + 3);
      description = 'Default limitation period: 3 years.';
    }
  }

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const daysRemaining = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  return { expiryDate, daysRemaining, yearEndRule, description };
}
