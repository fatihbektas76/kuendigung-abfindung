export interface UrteilBewertung {
  sterne: number;
  text: string;
  fuerArbeitnehmer: string;
  fuerArbeitgeber: string;
  praxishinweis: string;
}

export interface Urteil {
  slug: string;
  az: string;
  gericht: string;
  gerichtUrl: string;
  datum: string;
  jahr: number;
  senat: string;
  kategorie: string;
  titel: string;
  kurzfassung: string;
  sachverhalt: string;
  entscheidung: string;
  begruendung: string;
  bedeutung: string;
  leitsatz: string;
  bewertung: UrteilBewertung;
  tags: string[];
  verwandteUrteile: string[];
}

export const urteile: Urteil[] = [
  {
    slug: 'bag-2-azr-140-12-leiharbeitnehmer-schwellenwert',
    az: '2 AZR 140/12',
    gericht: 'Bundesarbeitsgericht',
    gerichtUrl: 'https://www.bundesarbeitsgericht.de/entscheidung/2-azr-140-12/',
    datum: '24. Januar 2013',
    jahr: 2013,
    senat: '2. Senat',
    kategorie: 'Kündigungsschutz',
    titel: 'Leiharbeitnehmer zählen beim Schwellenwert §23 KSchG mit',
    kurzfassung:
      'Leiharbeitnehmer, die dauerhaft im Entleiherbetrieb eingesetzt werden, sind bei der Berechnung des 10-Mitarbeiter-Schwellenwerts nach §23 KSchG mitzuzählen — auch wenn sie nicht in einem Arbeitsverhältnis zum Betriebsinhaber stehen.',
    sachverhalt:
      'Der Kläger war in einem Betrieb mit weniger als zehn eigenen Arbeitnehmern beschäftigt. Zusätzlich setzte der Arbeitgeber dauerhaft mehrere Leiharbeitnehmer ein, die reguläre Arbeitsplätze besetzten und in die betriebliche Organisation eingegliedert waren. Dem Kläger wurde betriebsbedingt gekündigt. Er erhob Kündigungsschutzklage und machte geltend, dass die Leiharbeitnehmer beim Schwellenwert des §23 Abs. 1 KSchG mitzuzählen seien, sodass das Kündigungsschutzgesetz Anwendung finde.\n\nDer Arbeitgeber vertrat die Auffassung, dass nur eigene Arbeitnehmer bei der Berechnung des Schwellenwerts zu berücksichtigen seien. Leiharbeitnehmer stünden in einem Arbeitsverhältnis zum Verleiher, nicht zum Entleiher, und seien daher nicht mitzuzählen.',
    entscheidung:
      'Das BAG gab dem Kläger Recht. Leiharbeitnehmer sind bei der Berechnung des Schwellenwerts nach §23 Abs. 1 KSchG im Entleiherbetrieb zu berücksichtigen, wenn ihr Einsatz auf einem „in der Regel" bestehenden Personalbedarf beruht. Entscheidend ist, ob die Leiharbeitnehmer dauerhaft zur Deckung des regulären Arbeitskräftebedarfs eingesetzt werden — und nicht nur vorübergehend zur Abdeckung von Auftragsspitzen.',
    begruendung:
      'Der Schwellenwert des §23 KSchG dient dem Schutz von Arbeitnehmern in größeren Betrieben. Der Gesetzgeber geht davon aus, dass ab einer bestimmten Betriebsgröße ein sozialer Kündigungsschutz geboten ist. Dieses Schutzziel würde unterlaufen, wenn der Arbeitgeber den Schwellenwert durch den Einsatz von Leiharbeitnehmern umgehen könnte.\n\nDas BAG stellte klar, dass es für die Berechnung des Schwellenwerts auf die Anzahl der „in der Regel" im Betrieb beschäftigten Arbeitnehmer ankommt. Dabei sind auch Leiharbeitnehmer zu berücksichtigen, die normalerweise während des größten Teils des Jahres beschäftigt werden und Arbeitsplätze besetzen, die einen regelmäßigen Beschäftigungsbedarf widerspiegeln.\n\nDie bloße formale Zuordnung des Arbeitsverhältnisses zum Verleiher ändert nichts daran, dass die Leiharbeitnehmer tatsächlich im Entleiherbetrieb tätig sind und dort zum Personalbestand beitragen.',
    bedeutung:
      'Wenn Ihr Arbeitgeber regelmäßig Leiharbeitnehmer einsetzt, können diese den Schwellenwert überschreiten — das KSchG gilt dann auch für Sie. Prüfen Sie, ob in Ihrem Betrieb Leiharbeiter dauerhaft eingesetzt werden.',
    leitsatz:
      'Leiharbeitnehmer sind bei der Berechnung der Betriebsgröße nach §23 Abs. 1 KSchG im Entleiherbetrieb zu berücksichtigen, wenn ihr Einsatz auf einem regelmäßig vorhandenen Personalbedarf beruht.',
    bewertung: {
      sterne: 5,
      text: 'Wegweisendes Urteil für Arbeitnehmer in Betrieben mit Leiharbeit. Arbeitgeber können den KSchG-Schutz nicht mehr durch gezielten Leiharbeitseinsatz umgehen.',
      fuerArbeitnehmer:
        'Stärkt den Schutz erheblich. Wer in einem Betrieb mit dauerhaft eingesetzten Leiharbeitnehmern arbeitet, hat möglicherweise KSchG-Schutz, auch wenn die Stammbelegschaft unter 10 liegt.',
      fuerArbeitgeber:
        'Erhöhter Prüfaufwand — vor jeder Kündigung müssen dauerhaft eingesetzte Leiharbeitnehmer mitgezählt werden. Die bloße Auslagerung auf Leiharbeit schützt nicht vor der Anwendung des KSchG.',
      praxishinweis:
        'Entscheidend ist, ob die Leiharbeitnehmer dauerhaften Personalbedarf abdecken oder nur Auftragsspitzen. Dokumentieren Sie, wie viele Leiharbeitnehmer regelmäßig in Ihrem Betrieb eingesetzt werden. Bei Unklarheit lohnt sich anwaltliche Prüfung.',
    },
    tags: ['KSchG', 'Schwellenwert', 'Leiharbeit', 'Kleinbetrieb', '§23 KSchG'],
    verwandteUrteile: [
      'bag-2-azr-541-09-emmely-abmahnung-kuendigung',
      'bag-6-azr-333-21-aufhebungsvertrag-faires-verhandeln',
      'bag-2-azr-773-13-social-media-kuendigung',
    ],
  },
  {
    slug: 'bag-2-azr-541-09-emmely-abmahnung-kuendigung',
    az: '2 AZR 541/09',
    gericht: 'Bundesarbeitsgericht',
    gerichtUrl: 'https://www.bundesarbeitsgericht.de/entscheidung/2-azr-541-09/',
    datum: '10. Juni 2010',
    jahr: 2010,
    senat: '2. Senat',
    kategorie: 'Abmahnung',
    titel: 'Emmely — Verhältnismäßigkeit bei verhaltensbedingter Kündigung',
    kurzfassung:
      'Im berühmten „Emmely"-Fall entschied das BAG, dass eine verhaltensbedingte Kündigung grundsätzlich eine vorherige Abmahnung voraussetzt und stets eine umfassende Interessenabwägung erfordert — auch bei Vermögensdelikten im Bagatellbereich.',
    sachverhalt:
      'Die Klägerin, als „Emmely" bekannt geworden, war seit 1977 — also über 30 Jahre — als Kassiererin bei einem Berliner Einzelhandelsunternehmen beschäftigt. Im Februar 2008 löste sie zwei Pfandbons im Gesamtwert von 1,30 Euro ein, die von Kunden liegengelassen worden waren. Der Arbeitgeber sprach daraufhin eine fristlose, hilfsweise ordentliche Kündigung wegen des Verdachts einer Straftat aus.\n\nDie Klägerin bestritt die Vorwürfe zunächst, räumte den Sachverhalt im Laufe des Verfahrens aber ein. Das Arbeitsgericht Berlin wies die Klage ab, ebenso das Landesarbeitsgericht Berlin-Brandenburg. Beide Instanzen sahen die Kündigung als wirksam an — bei Vermögensdelikten sei eine Abmahnung entbehrlich.',
    entscheidung:
      'Das BAG hob die Entscheidungen der Vorinstanzen auf und gab der Klägerin Recht. Die fristlose Kündigung war unwirksam. Auch die ordentliche Kündigung hielt einer Verhältnismäßigkeitsprüfung nicht stand. Das Arbeitsverhältnis war fortzusetzen.',
    begruendung:
      'Das BAG betonte, dass auch bei Vermögensdelikten — unabhängig von der Schadenshöhe — eine umfassende Interessenabwägung stattzufinden hat. Der Grundsatz der Verhältnismäßigkeit verlangt, dass der Arbeitgeber vor einer Kündigung mildere Mittel prüft, insbesondere eine Abmahnung.\n\nBei der Interessenabwägung war zugunsten der Klägerin zu berücksichtigen: die über 30-jährige beanstandungsfreie Betriebszugehörigkeit, ihr fortgeschrittenes Alter und die damit verbundenen Schwierigkeiten auf dem Arbeitsmarkt. Demgegenüber stand ein Schaden von lediglich 1,30 Euro. Das Vertrauen des Arbeitgebers war zwar erschüttert, konnte aber durch eine Abmahnung wiederhergestellt werden.\n\nDas BAG stellte klar, dass es keinen Rechtssatz gibt, wonach bei Straftaten gegen das Vermögen des Arbeitgebers stets ohne Abmahnung gekündigt werden darf. Vielmehr muss in jedem Einzelfall eine Gesamtabwägung aller Umstände erfolgen.',
    bedeutung:
      'Dieses Leiturteil stärkt den Grundsatz der Verhältnismäßigkeit. Wurde Ihnen wegen eines geringfügigen Verstoßes ohne Abmahnung gekündigt? Dann ist die Kündigung mit hoher Wahrscheinlichkeit unwirksam — insbesondere bei langer Betriebszugehörigkeit.',
    leitsatz:
      'Auch bei einem Vermögensdelikt zum Nachteil des Arbeitgebers ist eine fristlose Kündigung nicht ohne Weiteres gerechtfertigt. Es bedarf stets einer umfassenden Interessenabwägung unter Berücksichtigung der Dauer des Arbeitsverhältnisses, der Schwere der Pflichtverletzung und einer möglichen Wiederherstellung des Vertrauens durch mildere Mittel.',
    bewertung: {
      sterne: 5,
      text: 'Eines der bekanntesten BAG-Urteile überhaupt. Hat die Rechtsprechung zur verhaltensbedingten Kündigung grundlegend geprägt und den Verhältnismäßigkeitsgrundsatz gestärkt.',
      fuerArbeitnehmer:
        'Sehr starker Schutz. Selbst bei erwiesenem Fehlverhalten im Bagatellbereich kann eine Kündigung unverhältnismäßig sein. Langjährige Betriebszugehörigkeit wiegt schwer bei der Interessenabwägung.',
      fuerArbeitgeber:
        'Automatische Kündigung bei jedem Vermögensdelikt ist nicht mehr möglich. Vor der Kündigung muss eine sorgfältige Interessenabwägung dokumentiert werden.',
      praxishinweis:
        'Wenn Sie wegen eines geringfügigen Verstoßes gekündigt wurden, prüfen Sie: Gab es eine Abmahnung? Wie lang war Ihre Betriebszugehörigkeit? War das Arbeitsverhältnis bisher beanstandungsfrei? Je mehr dieser Faktoren für Sie sprechen, desto eher ist die Kündigung unwirksam.',
    },
    tags: ['Abmahnung', 'Verhältnismäßigkeit', 'Fristlose Kündigung', 'Bagatelldelikt', 'Interessenabwägung'],
    verwandteUrteile: [
      'bag-2-azr-140-12-leiharbeitnehmer-schwellenwert',
      'bag-6-azr-333-21-aufhebungsvertrag-faires-verhandeln',
      'bag-2-azr-773-13-social-media-kuendigung',
    ],
  },
  {
    slug: 'bag-6-azr-333-21-aufhebungsvertrag-faires-verhandeln',
    az: '6 AZR 333/21',
    gericht: 'Bundesarbeitsgericht',
    gerichtUrl: 'https://www.bundesarbeitsgericht.de/presse/aufhebungsvertrag-gebot-fairen-verhandelns/',
    datum: '24. Februar 2022',
    jahr: 2022,
    senat: '6. Senat',
    kategorie: 'Aufhebungsvertrag',
    titel: 'Aufhebungsvertrag — Gebot fairen Verhandelns',
    kurzfassung:
      'Das BAG stellte klar, dass das Gebot fairen Verhandelns bei Aufhebungsverträgen nur in Ausnahmefällen als verletzt gilt. Die sofortige Annahme eines Aufhebungsvertrags ohne Bedenkzeit ist nicht per se unfair — es müssen besondere Umstände hinzukommen.',
    sachverhalt:
      'Die Klägerin war als Reinigungskraft beschäftigt. Nach einem Konflikt am Arbeitsplatz wurde sie zu einem Personalgespräch gebeten. In diesem Gespräch legte der Arbeitgeber einen vorbereiteten Aufhebungsvertrag vor und forderte die Klägerin auf, diesen sofort zu unterschreiben. Die Klägerin unterzeichnete den Vertrag noch im selben Gespräch, ohne Bedenkzeit oder die Möglichkeit, rechtlichen Rat einzuholen.\n\nAnschließend focht die Klägerin den Aufhebungsvertrag an. Sie machte geltend, sie sei in einer psychischen Drucksituation gewesen und habe keine faire Möglichkeit gehabt, die Konsequenzen ihrer Unterschrift zu überdenken. Sie berief sich auf das vom BAG entwickelte Gebot fairen Verhandelns.',
    entscheidung:
      'Das BAG wies die Klage ab. Die sofortige Annahme eines Aufhebungsvertrags ohne Bedenkzeit begründet für sich genommen keine Verletzung des Gebots fairen Verhandelns. Es müssen besondere Umstände hinzutreten, die eine psychische Drucksituation schaffen oder den Arbeitnehmer in seiner Entscheidungsfreiheit erheblich beeinträchtigen.',
    begruendung:
      'Das BAG führte aus, dass das Gebot fairen Verhandelns als Nebenpflicht aus §241 Abs. 2 BGB abgeleitet wird. Es schützt die Entscheidungsfreiheit des Arbeitnehmers, jedoch nicht vor jeder Überraschung oder jedem Zeitdruck.\n\nAllein der Umstand, dass der Arbeitnehmer den Aufhebungsvertrag sofort unterzeichnet hat, ohne ihn mit nach Hause nehmen zu können, reicht nicht aus. Der Arbeitgeber ist nicht verpflichtet, eine Bedenkzeit einzuräumen. Erst wenn besondere Umstände hinzutreten — etwa eine Überrumpelung durch eine krankheitsbedingte Schwächesituation, massiver Druck, Drohungen oder die Ausnutzung einer Notsituation — kann das Gebot fairen Verhandelns verletzt sein.\n\nDie bloße Verhandlungsasymmetrie zwischen Arbeitgeber und Arbeitnehmer genügt nicht, da diese jeder Verhandlung über einen Aufhebungsvertrag immanent ist.',
    bedeutung:
      'Dieses Urteil zeigt: Allein die fehlende Bedenkzeit macht einen Aufhebungsvertrag nicht anfechtbar. Dennoch gilt: Wurden Sie unter massivem Druck gesetzt oder getäuscht, kann der Vertrag unwirksam sein. Nehmen Sie den Vertrag im Zweifel immer mit nach Hause.',
    leitsatz:
      'Das Gebot fairen Verhandelns wird bei Abschluss eines Aufhebungsvertrags nicht allein dadurch verletzt, dass der Arbeitgeber den Vertrag in einem Personalgespräch vorlegt und der Arbeitnehmer ihn sofort unterzeichnet. Erforderlich sind besondere Umstände, die eine unfaire Verhandlungssituation begründen.',
    bewertung: {
      sterne: 3,
      text: 'Differenziertes Urteil mit Licht und Schatten. Klärt die Grenzen des Gebots fairen Verhandelns — einerseits schränkt es den Schutz ein, andererseits bestätigt es das Gebot als solches.',
      fuerArbeitnehmer:
        'Die bloße fehlende Bedenkzeit schützt nicht. Aber: Bei echtem Druck, Drohungen, Ausnutzung einer Krankheitssituation oder Überrumpelung bleibt der Vertrag anfechtbar. Dokumentieren Sie die Umstände des Gesprächs genau.',
      fuerArbeitgeber:
        'Aufhebungsverträge sind auch bei sofortiger Unterzeichnung grundsätzlich wirksam. Dennoch sollten Arbeitgeber faire Gesprächsbedingungen schaffen, um Anfechtungsrisiken zu minimieren.',
      praxishinweis:
        'Goldene Regel: Unterschreiben Sie einen Aufhebungsvertrag nie sofort. Bitten Sie immer um Bedenkzeit und lassen Sie den Vertrag von einem Fachanwalt prüfen. Auch wenn das Urteil die fehlende Bedenkzeit allein nicht als Anfechtungsgrund anerkennt — die anwaltliche Prüfung kann andere Schwachstellen aufdecken.',
    },
    tags: ['Aufhebungsvertrag', 'Faires Verhandeln', '§241 BGB', 'Bedenkzeit', 'Anfechtung'],
    verwandteUrteile: [
      'bag-2-azr-140-12-leiharbeitnehmer-schwellenwert',
      'bag-2-azr-541-09-emmely-abmahnung-kuendigung',
      'bag-2-azr-773-13-social-media-kuendigung',
    ],
  },
  {
    slug: 'bag-2-azr-773-13-social-media-kuendigung',
    az: '2 AZR 773/13',
    gericht: 'Bundesarbeitsgericht',
    gerichtUrl: 'https://www.bundesarbeitsgericht.de/',
    datum: '31. Juli 2014',
    jahr: 2014,
    senat: '2. Senat',
    kategorie: 'Fristlose Kündigung',
    titel: 'Kündigung wegen Social-Media-Posts — Grenze der Meinungsfreiheit',
    kurzfassung:
      'Wissentlich falsche und geschäftsschädigende Behauptungen über den Arbeitgeber in sozialen Medien können eine fristlose Kündigung rechtfertigen. Solche Äußerungen sind nicht von der Meinungsfreiheit gedeckt.',
    sachverhalt:
      'Der Kläger war langjährig bei einem Unternehmen beschäftigt. In sozialen Medien veröffentlichte er mehrere Beiträge, in denen er seinem Arbeitgeber schwerwiegende Vorwürfe machte. Er behauptete unter anderem, das Unternehmen gehe systematisch rechtswidrig vor und betrüge Kunden. Die Vorwürfe enthielten konkrete Tatsachenbehauptungen, die nachweislich unwahr waren.\n\nDer Arbeitgeber sprach daraufhin eine fristlose Kündigung aus. Der Kläger berief sich auf sein Grundrecht der Meinungsfreiheit nach Art. 5 Abs. 1 GG und machte geltend, seine Äußerungen seien von der freien Meinungsäußerung gedeckt.',
    entscheidung:
      'Das BAG bestätigte die Wirksamkeit der fristlosen Kündigung. Wissentlich falsche Tatsachenbehauptungen, die den Arbeitgeber geschäftsschädigend darstellen, stellen einen wichtigen Grund im Sinne des §626 BGB dar, der eine fristlose Kündigung auch ohne vorherige Abmahnung rechtfertigt.',
    begruendung:
      'Das BAG stellte klar, dass die Meinungsfreiheit nach Art. 5 Abs. 1 GG auch im Arbeitsverhältnis gilt, jedoch Grenzen hat. Bewusst unwahre Tatsachenbehauptungen fallen nicht unter den Schutz der Meinungsfreiheit, da sie nicht zur Meinungsbildung beitragen.\n\nDie Rücksichtnahmepflicht des Arbeitnehmers aus §241 Abs. 2 BGB verbietet es, den Arbeitgeber durch wissentlich falsche Behauptungen öffentlich in ein schlechtes Licht zu rücken. Dies gilt insbesondere dann, wenn die Äußerungen geschäftsschädigend sind und über soziale Medien eine breite Öffentlichkeit erreichen.\n\nBei der Abgrenzung zwischen zulässiger Meinungsäußerung und unzulässiger Schmähkritik kommt es auf den Einzelfall an. Zulässig bleibt sachliche Kritik, auch scharfe Kritik am Arbeitgeber. Unzulässig sind dagegen bewusst unwahre Tatsachenbehauptungen und Formalbeleidigungen, die nicht mehr dem Meinungskampf dienen.',
    bedeutung:
      'Kritik am Arbeitgeber in sozialen Netzwerken ist nicht per se verboten — aber wissentlich falsche Tatsachenbehauptungen können den Job kosten. Prüfen Sie bei einer fristlosen Kündigung immer, ob tatsächlich eine unwahre Behauptung vorliegt oder ob es sich um zulässige Meinungsäußerung handelt.',
    leitsatz:
      'Wissentlich falsche geschäftsschädigende Tatsachenbehauptungen über den Arbeitgeber in sozialen Medien sind nicht von der Meinungsfreiheit nach Art. 5 Abs. 1 GG gedeckt und können eine außerordentliche Kündigung nach §626 BGB rechtfertigen.',
    bewertung: {
      sterne: 4,
      text: 'Praxisrelevantes Urteil, das die Grenzen der Meinungsfreiheit im Arbeitsverhältnis klar absteckt. Differenziert zwischen zulässiger Kritik und unzulässigen Falschbehauptungen.',
      fuerArbeitnehmer:
        'Sachliche Kritik am Arbeitgeber bleibt zulässig — auch in sozialen Medien. Aber: Bewusst unwahre Behauptungen können zur sofortigen Kündigung führen. Vor kritischen Posts immer prüfen: Handelt es sich um Fakten oder Meinung?',
      fuerArbeitgeber:
        'Klare Handhabe gegen wissentlich falsche Behauptungen. Die Beweislast für die Unwahrheit und die Wissentlichkeit liegt aber beim Arbeitgeber — sorgfältige Dokumentation ist unerlässlich.',
      praxishinweis:
        'Bei einer Kündigung wegen Social-Media-Posts: Prüfen Sie genau, ob es sich um Tatsachenbehauptungen oder Meinungsäußerungen handelt. Meinungen sind weitgehend geschützt, auch scharfe Kritik. Nur bewusst unwahre Faktenbehauptungen und grobe Beleidigungen rechtfertigen eine fristlose Kündigung.',
    },
    tags: ['Fristlose Kündigung', 'Social Media', 'Meinungsfreiheit', 'Art. 5 GG', '§626 BGB'],
    verwandteUrteile: [
      'bag-2-azr-140-12-leiharbeitnehmer-schwellenwert',
      'bag-2-azr-541-09-emmely-abmahnung-kuendigung',
      'bag-6-azr-333-21-aufhebungsvertrag-faires-verhandeln',
    ],
  },
];

export function getUrteil(slug: string): Urteil | undefined {
  return urteile.find((u) => u.slug === slug);
}
