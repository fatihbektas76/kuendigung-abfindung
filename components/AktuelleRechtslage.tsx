const monatsTipps = [
  { // Januar
    titel: 'Jahresbeginn: Neue Kündigungsfristen beachten',
    text: 'Zum Jahreswechsel ändern sich oft Betriebszugehörigkeiten und damit Kündigungsfristen. Prüfen Sie, ob sich Ihre Rechte durch ein weiteres Beschäftigungsjahr verbessert haben.',
  },
  { // Februar
    titel: 'Probezeit-Kündigungen häufen sich',
    text: 'Viele zum Jahresanfang gestartete Arbeitsverhältnisse werden jetzt in der Probezeit gekündigt. Auch bei Probezeit-Kündigungen können formale Fehler vorliegen.',
  },
  { // März
    titel: 'Quartalsende: Kündigungswelle erwartet',
    text: 'Zum Ende des ersten Quartals häufen sich betriebsbedingte Kündigungen. Unternehmen reagieren auf Jahresbilanzen. Prüfen Sie die Sozialauswahl besonders genau.',
  },
  { // April
    titel: 'Neue BAG-Rechtsprechung im Blick',
    text: 'Das Bundesarbeitsgericht veröffentlicht regelmäßig neue Urteile zum Kündigungsschutz. Aktuelle Entscheidungen können Ihre Verhandlungsposition stärken.',
  },
  { // Mai
    titel: 'Sonderkündigungsschutz prüfen',
    text: 'Schwerbehinderte, Schwangere, Betriebsratsmitglieder und Elternzeit-Nehmer genießen besonderen Kündigungsschutz. Viele Arbeitgeber missachten diese Vorschriften.',
  },
  { // Juni
    titel: 'Halbjahres-Bilanz: Aufhebungsverträge nehmen zu',
    text: 'Zur Jahresmitte bieten viele Arbeitgeber Aufhebungsverträge an. Unterschreiben Sie nie ohne anwaltliche Prüfung – die Abfindung ist fast immer verhandelbar.',
  },
  { // Juli
    titel: 'Sommerkündigungen: Rechte auch im Urlaub wahren',
    text: 'Eine Kündigung während des Urlaubs ist zulässig. Die 3-Wochen-Klagefrist läuft ab Zugang – auch wenn Sie im Urlaub sind. Reagieren Sie sofort.',
  },
  { // August
    titel: 'Ausbildungsende: Übernahme oder Kündigung?',
    text: 'Zum Ende der Ausbildung stehen wichtige Entscheidungen an. Ohne rechtzeitige Übernahme endet das Arbeitsverhältnis automatisch. Kennen Sie Ihre Rechte.',
  },
  { // September
    titel: 'Herbstkündigungen: Restrukturierungen beginnen',
    text: 'Im September starten viele Unternehmen Restrukturierungsprogramme für das kommende Jahr. Betriebsbedingte Kündigungen erfordern eine korrekte Sozialauswahl.',
  },
  { // Oktober
    titel: 'Jahresendplanung: Abfindungen vor Dezember verhandeln',
    text: 'Aufhebungsverträge zum Jahresende können steuerliche Vorteile bieten. Die Fünftelregelung kann Ihre Steuerbelastung auf die Abfindung erheblich senken.',
  },
  { // November
    titel: 'Weihnachtsgeld & Kündigung: Was steht Ihnen zu?',
    text: 'Bei Kündigung vor Jahresende stellt sich die Frage nach dem Weihnachtsgeld. Rückzahlungsklauseln sind oft unwirksam. Prüfen Sie Ihren Arbeitsvertrag.',
  },
  { // Dezember
    titel: 'Jahresende: Letzte Chance für Kündigungsschutzklage',
    text: 'Wenn Sie eine Kündigung erhalten haben, läuft die 3-Wochen-Frist auch über die Feiertage. Handeln Sie vor dem Jahreswechsel, um Ihre Rechte zu sichern.',
  },
];

export default function AktuelleRechtslage() {
  const now = new Date();
  const monat = now.getMonth();
  const tipp = monatsTipps[monat];

  const monate = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
  ];

  return (
    <section className="py-12 px-8 bg-white">
      <div className="max-w-content mx-auto">
        <div className="max-w-[740px] border border-gold/30 rounded overflow-hidden">
          <div className="bg-cream px-6 py-3 border-b border-gold/30 flex items-center justify-between">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark">
              Aktuelle Rechtslage
            </div>
            <div className="text-[0.72rem] text-ink-muted">
              {monate[monat]} {now.getFullYear()}
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-serif text-[1.1rem] font-bold text-ink mb-2">
              {tipp.titel}
            </h3>
            <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">
              {tipp.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
