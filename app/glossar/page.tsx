import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG, buildMetadata } from '@/lib/seo-config';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `Glossar Arbeitsrecht — Begriffe einfach erklärt (${new Date().getFullYear()})`,
  description:
    'Arbeitsrecht-Glossar: Abfindung, Kündigungsschutzklage, Aufhebungsvertrag, Sozialauswahl und 30+ weitere Begriffe — verständlich erklärt vom Fachanwalt.',
  path: '/glossar',
});

const glossar = [
  {
    id: 'abfindung',
    begriff: 'Abfindung',
    definition:
      'Eine einmalige Geldzahlung des Arbeitgebers an den Arbeitnehmer bei Beendigung des Arbeitsverhältnisses. Ein gesetzlicher Anspruch besteht nur ausnahmsweise (z.\u00a0B. nach §\u00a01a KSchG). In der Praxis wird die Abfindung meist per Vergleich oder Aufhebungsvertrag verhandelt. Faustformel: 0,5 Bruttomonatsgehälter pro Beschäftigungsjahr.',
    gesetz: '§\u00a01a KSchG, §\u00a09, 10 KSchG',
    link: '/abfindung/',
    linkText: 'Alles zur Abfindung',
  },
  {
    id: 'abmahnung',
    begriff: 'Abmahnung',
    definition:
      'Eine formale Rüge des Arbeitgebers wegen eines Fehlverhaltens des Arbeitnehmers, verbunden mit der Androhung arbeitsrechtlicher Konsequenzen im Wiederholungsfall. Bei verhaltensbedingter Kündigung ist in der Regel mindestens eine vorherige Abmahnung erforderlich.',
    gesetz: '§\u00a0314 Abs.\u00a02 BGB (analog)',
    link: '/abmahnung/',
    linkText: 'Alles zur Abmahnung',
  },
  {
    id: 'aenderungskuendigung',
    begriff: 'Änderungskündigung',
    definition:
      'Eine Kündigung des bestehenden Arbeitsverhältnisses, verbunden mit dem Angebot eines neuen Vertrags zu geänderten Bedingungen (z.\u00a0B. weniger Gehalt, anderer Arbeitsort). Der Arbeitnehmer kann das Angebot annehmen, ablehnen oder unter Vorbehalt annehmen und die Änderung gerichtlich prüfen lassen.',
    gesetz: '§\u00a02 KSchG',
    link: '/kuendigung/',
    linkText: 'Mehr zum Kündigungsschutz',
  },
  {
    id: 'arbeitsgericht',
    begriff: 'Arbeitsgericht',
    definition:
      'Das für arbeitsrechtliche Streitigkeiten zuständige Gericht erster Instanz. Besonderheit: Im erstinstanzlichen Verfahren trägt jede Partei ihre eigenen Anwaltskosten, unabhängig vom Ausgang (§\u00a012a ArbGG). Die Berufung geht an das Landesarbeitsgericht, die Revision an das Bundesarbeitsgericht.',
    gesetz: '§§\u00a01\u20133 ArbGG, §\u00a012a ArbGG',
    link: '/arbeitsrecht-anwalt/',
    linkText: 'Arbeitsgericht in Ihrer Stadt',
  },
  {
    id: 'aufhebungsvertrag',
    begriff: 'Aufhebungsvertrag',
    definition:
      'Eine einvernehmliche Vereinbarung zwischen Arbeitgeber und Arbeitnehmer zur Beendigung des Arbeitsverhältnisses. Anders als bei einer Kündigung ist die Zustimmung beider Seiten erforderlich. Vorsicht: Ein Aufhebungsvertrag kann eine Sperrzeit beim Arbeitslosengeld auslösen und sollte nie ohne anwaltliche Prüfung unterschrieben werden.',
    gesetz: '§\u00a0311 BGB',
    link: '/aufhebungsvertrag/',
    linkText: 'Alles zum Aufhebungsvertrag',
  },
  {
    id: 'bem-verfahren',
    begriff: 'BEM-Verfahren (Betriebliches Eingliederungsmanagement)',
    definition:
      'Ein gesetzlich vorgeschriebenes Verfahren, das der Arbeitgeber durchführen muss, wenn ein Arbeitnehmer innerhalb von zwölf Monaten länger als sechs Wochen ununterbrochen oder wiederholt arbeitsunfähig war. Ziel ist es, die Arbeitsunfähigkeit zu überwinden und den Arbeitsplatz zu erhalten. Ein fehlendes BEM kann eine krankheitsbedingte Kündigung unwirksam machen.',
    gesetz: '§\u00a0167 Abs.\u00a02 SGB IX',
    link: '/kuendigung/kuendigung-wegen-krankheit/',
    linkText: 'Kündigung wegen Krankheit',
  },
  {
    id: 'berufung',
    begriff: 'Berufung',
    definition:
      'Das Rechtsmittel gegen ein Urteil des Arbeitsgerichts erster Instanz. Die Berufung wird beim zuständigen Landesarbeitsgericht (LAG) eingelegt. Die Berufungsfrist beträgt einen Monat nach Zustellung des vollständigen Urteils. Die Berufungsbegründungsfrist beträgt zwei Monate. In der Berufungsinstanz trägt die unterlegene Partei die Kosten.',
    gesetz: '§§\u00a064\u201370 ArbGG',
    link: '/arbeitsrecht-anwalt/',
    linkText: 'Arbeitsgericht & Instanzenzug',
  },
  {
    id: 'betriebsbedingte-kuendigung',
    begriff: 'Betriebsbedingte Kündigung',
    definition:
      'Eine Kündigung aus wirtschaftlichen oder organisatorischen Gründen, wenn der Arbeitsplatz dauerhaft wegfällt und keine Weiterbeschäftigung möglich ist. Der Arbeitgeber muss dringende betriebliche Erfordernisse nachweisen und eine korrekte Sozialauswahl durchführen.',
    gesetz: '§\u00a01 Abs.\u00a02 KSchG',
    link: '/kuendigung/',
    linkText: 'Kündigungsarten im Überblick',
  },
  {
    id: 'betriebsratanhoerung',
    begriff: 'Betriebsratsanhörung',
    definition:
      'Der Betriebsrat muss vor jeder Kündigung angehört werden. Unterbleibt die Anhörung oder ist sie fehlerhaft, ist die Kündigung unwirksam — unabhängig davon, ob ein Kündigungsgrund vorliegt. Der Betriebsrat hat eine Woche (bei fristloser Kündigung: drei Tage) Zeit zur Stellungnahme.',
    gesetz: '§\u00a0102 BetrVG',
    link: '/kuendigung/',
    linkText: 'Kündigung prüfen lassen',
  },
  {
    id: 'betriebsuebergang',
    begriff: 'Betriebsübergang',
    definition:
      'Der Übergang eines Betriebs oder Betriebsteils auf einen neuen Inhaber. Das Arbeitsverhältnis geht automatisch auf den neuen Arbeitgeber über. Eine Kündigung wegen des Betriebsübergangs ist unwirksam. Der Arbeitnehmer muss schriftlich informiert werden und hat ein Widerspruchsrecht.',
    gesetz: '§\u00a0613a BGB',
    link: '/kuendigung/kuendigung-betriebsuebergang/',
    linkText: 'Kündigung bei Betriebsübergang',
  },
  {
    id: 'fristlose-kuendigung',
    begriff: 'Fristlose Kündigung (außerordentliche Kündigung)',
    definition:
      'Eine Kündigung ohne Einhaltung der Kündigungsfrist, die das Arbeitsverhältnis sofort beendet. Voraussetzung ist ein wichtiger Grund, der es dem Kündigenden unzumutbar macht, die reguläre Frist abzuwarten. Die Kündigung muss innerhalb von zwei Wochen nach Kenntnis des Grundes erfolgen. Die Anforderungen sind sehr hoch — die meisten fristlosen Kündigungen sind unwirksam.',
    gesetz: '§\u00a0626 BGB',
    link: '/fristlose-kuendigung/',
    linkText: 'Alles zur fristlosen Kündigung',
  },
  {
    id: 'fristlose-kuendigung-auslaufrist',
    begriff: 'Fristlose Kündigung mit Auslaufrist',
    definition:
      'Eine außerordentliche Kündigung, bei der der Arbeitgeber dem Arbeitnehmer dennoch eine Auslauffrist gewährt. Sie kommt vor allem bei ordentlich unkündbaren Arbeitnehmern zum Einsatz (z.\u00a0B. aufgrund von Tarifvertrag oder langjähriger Betriebszugehörigkeit). Die Auslaufrist entspricht oft der fiktiven ordentlichen Kündigungsfrist. Auch hier muss ein wichtiger Grund nach §\u00a0626 BGB vorliegen.',
    gesetz: '§\u00a0626 BGB, BAG-Rechtsprechung',
    link: '/fristlose-kuendigung/',
    linkText: 'Alles zur fristlosen Kündigung',
  },
  {
    id: 'guetetermin',
    begriff: 'Gütetermin',
    definition:
      'Der erste Verhandlungstermin vor dem Arbeitsgericht nach Einreichung einer Kündigungsschutzklage. Er findet in der Regel 2\u20134 Wochen nach Klageeinreichung statt. Ziel ist eine gütliche Einigung (Vergleich). Kommt keine Einigung zustande, folgt der Kammertermin.',
    gesetz: '§\u00a054 ArbGG',
    link: '/kuendigung/',
    linkText: 'Ablauf der Kündigungsschutzklage',
  },
  {
    id: 'integrationsamt',
    begriff: 'Integrationsamt',
    definition:
      'Die Behörde, die vor der Kündigung eines schwerbehinderten Arbeitnehmers zustimmen muss (Zustimmungsverfahren). Ohne vorherige Zustimmung des Integrationsamts ist die Kündigung eines schwerbehinderten oder gleichgestellten Arbeitnehmers unwirksam. Das Integrationsamt prüft, ob die Kündigung mit der Behinderung zusammenhängt, und kann Präventionsmaßnahmen vorschlagen.',
    gesetz: '§§\u00a0168\u2013175 SGB IX',
    link: '/kuendigung/kuendigung-schwerbehinderung/',
    linkText: 'Kündigung bei Schwerbehinderung',
  },
  {
    id: 'kammertermin',
    begriff: 'Kammertermin',
    definition:
      'Der zweite Verhandlungstermin vor dem Arbeitsgericht, wenn im Gütetermin keine Einigung erzielt wurde. Im Kammertermin verhandelt die vollbesetzte Kammer (ein Berufsrichter und zwei ehrenamtliche Richter — je einer von der Arbeitgeber- und Arbeitnehmerseite). Hier werden Beweise erhoben und ein Urteil gefällt, sofern nicht doch noch ein Vergleich geschlossen wird.',
    gesetz: '§§\u00a055\u201367 ArbGG',
    link: '/kuendigung/',
    linkText: 'Ablauf der Kündigungsschutzklage',
  },
  {
    id: 'kuendigungsfrist',
    begriff: 'Kündigungsfrist',
    definition:
      'Der Zeitraum zwischen dem Zugang der Kündigung und der tatsächlichen Beendigung des Arbeitsverhältnisses. Die gesetzliche Grundkündigungsfrist beträgt vier Wochen zum 15. oder zum Monatsende. Mit steigender Betriebszugehörigkeit verlängert sich die Frist für den Arbeitgeber auf bis zu sieben Monate.',
    gesetz: '§\u00a0622 BGB',
    link: '/kuendigungsfrist-rechner/',
    linkText: 'Kündigungsfrist berechnen',
  },
  {
    id: 'kuendigungsschutzgesetz',
    begriff: 'Kündigungsschutzgesetz (KSchG)',
    definition:
      'Das zentrale Gesetz zum Schutz von Arbeitnehmern vor ungerechtfertigter Kündigung. Es gilt, wenn der Arbeitnehmer länger als sechs Monate beschäftigt ist und der Betrieb mehr als zehn Arbeitnehmer hat (Schwellenwert). Das KSchG verlangt einen sozial gerechtfertigten Kündigungsgrund.',
    gesetz: '§§\u00a01, 23 KSchG',
    link: '/schwellenwert-rechner/',
    linkText: 'Schwellenwert prüfen',
  },
  {
    id: 'kuendigungsschutzklage',
    begriff: 'Kündigungsschutzklage',
    definition:
      'Die Klage eines Arbeitnehmers vor dem Arbeitsgericht mit dem Ziel, die Unwirksamkeit einer Kündigung feststellen zu lassen. Die Klagefrist beträgt nur drei Wochen ab Zugang der Kündigung — wird sie versäumt, gilt die Kündigung als wirksam, auch wenn sie rechtswidrig war.',
    gesetz: '§\u00a04 KSchG',
    link: '/kuendigung-pruefen/',
    linkText: 'Kündigung jetzt prüfen',
  },
  {
    id: 'ordentliche-kuendigung',
    begriff: 'Ordentliche Kündigung',
    definition:
      'Die reguläre Kündigung unter Einhaltung der gesetzlichen oder vertraglichen Kündigungsfrist. Sie kann vom Arbeitgeber oder Arbeitnehmer ausgesprochen werden. Bei Anwendbarkeit des KSchG muss der Arbeitgeber einen Kündigungsgrund nachweisen (betriebs-, personen- oder verhaltensbedingt).',
    gesetz: '§\u00a0620 Abs.\u00a02 BGB, §\u00a01 KSchG',
    link: '/kuendigung/',
    linkText: 'Kündigungsarten im Überblick',
  },
  {
    id: 'personenbedingte-kuendigung',
    begriff: 'Personenbedingte Kündigung',
    definition:
      'Eine Kündigung wegen Eigenschaften oder Fähigkeiten des Arbeitnehmers, die eine ordnungsgemäße Arbeitsleistung dauerhaft unmöglich machen. Häufigster Fall: Kündigung wegen langandauernder oder häufiger Kurzerkrankungen. Eine vorherige Abmahnung ist in der Regel nicht erforderlich.',
    gesetz: '§\u00a01 Abs.\u00a02 KSchG',
    link: '/kuendigung/kuendigung-wegen-krankheit/',
    linkText: 'Kündigung wegen Krankheit',
  },
  {
    id: 'probezeit',
    begriff: 'Probezeit',
    definition:
      'Eine vertraglich vereinbarte Anfangsphase des Arbeitsverhältnisses (maximal sechs Monate). Während der Probezeit kann das Arbeitsverhältnis mit einer Frist von zwei Wochen gekündigt werden. Das Kündigungsschutzgesetz greift erst nach sechs Monaten Betriebszugehörigkeit.',
    gesetz: '§\u00a0622 Abs.\u00a03 BGB',
    link: '/kuendigung/kuendigung-probezeit/',
    linkText: 'Kündigung in der Probezeit',
  },
  {
    id: 'schwellenwert',
    begriff: 'Schwellenwert (§\u00a023 KSchG)',
    definition:
      'Die Mindestanzahl an Arbeitnehmern, ab der das Kündigungsschutzgesetz im Betrieb gilt. Seit 2004 liegt der Schwellenwert bei mehr als zehn Arbeitnehmern (ohne Auszubildende). Teilzeitkräfte werden anteilig gezählt: bis 20 Stunden/Woche mit 0,5, bis 30 Stunden/Woche mit 0,75.',
    gesetz: '§\u00a023 Abs.\u00a01 KSchG',
    link: '/schwellenwert-rechner/',
    linkText: 'Schwellenwert berechnen',
  },
  {
    id: 'sonderkuendigungsschutz',
    begriff: 'Sonderkündigungsschutz',
    definition:
      'Ein besonderer gesetzlicher Kündigungsschutz für bestimmte Personengruppen: Schwangere, Elternzeitler, Schwerbehinderte, Betriebsratsmitglieder, Auszubildende und Datenschutzbeauftragte. Eine Kündigung ist nur mit behördlicher Zustimmung oder unter sehr engen Voraussetzungen möglich.',
    gesetz: '§\u00a017 MuSchG, §\u00a018 BEEG, §\u00a0168 SGB IX, §\u00a015 KSchG',
    link: '/kuendigung/kuendigung-schwangerschaft/',
    linkText: 'Sonderkündigungsschutz im Detail',
  },
  {
    id: 'sozialauswahl',
    begriff: 'Sozialauswahl',
    definition:
      'Bei betriebsbedingter Kündigung muss der Arbeitgeber unter vergleichbaren Arbeitnehmern denjenigen kündigen, den es sozial am wenigsten hart trifft. Kriterien: Betriebszugehörigkeit, Lebensalter, Unterhaltspflichten und Schwerbehinderung. Fehler in der Sozialauswahl machen die Kündigung unwirksam.',
    gesetz: '§\u00a01 Abs.\u00a03 KSchG',
    link: '/kuendigung/',
    linkText: 'Kündigungsschutz prüfen',
  },
  {
    id: 'sperrzeit',
    begriff: 'Sperrzeit (Arbeitslosengeld)',
    definition:
      'Eine Sperrfrist von bis zu zwölf Wochen, in der die Agentur für Arbeit kein Arbeitslosengeld zahlt. Sie wird verhängt, wenn der Arbeitnehmer das Arbeitsverhältnis selbst gelöst hat (z.\u00a0B. durch Aufhebungsvertrag) oder durch vertragswidriges Verhalten die Kündigung verursacht hat.',
    gesetz: '§\u00a0159 SGB III',
    link: '/aufhebungsvertrag/aufhebungsvertrag-sperrzeit/',
    linkText: 'Sperrzeit vermeiden',
  },
  {
    id: 'turboklausel',
    begriff: 'Turboklausel',
    definition:
      'Eine Klausel im Aufhebungsvertrag oder gerichtlichen Vergleich, die dem Arbeitnehmer erlaubt, das Arbeitsverhältnis vor dem vereinbarten Beendigungstermin vorzeitig zu beenden — z.\u00a0B. bei einem neuen Jobangebot. Im Gegenzug erhält der Arbeitnehmer das eingesparte Gehalt (ganz oder teilweise) als zusätzliche Abfindung. Die Turboklausel kann steuerlich vorteilhaft sein.',
    gesetz: 'Vertragsfreiheit, §\u00a0311 BGB',
    link: '/aufhebungsvertrag/aufhebungsvertrag-abfindung/',
    linkText: 'Abfindung beim Aufhebungsvertrag',
  },
  {
    id: 'unwiderrufliche-freistellung',
    begriff: 'Unwiderrufliche Freistellung',
    definition:
      'Die endgültige Befreiung des Arbeitnehmers von der Arbeitspflicht bis zum Ende des Arbeitsverhältnisses, die der Arbeitgeber nicht mehr rückgängig machen kann. Der Arbeitnehmer darf anderweitig arbeiten, ohne sich das Gehalt anrechnen lassen zu müssen. Resturlaub wird auf die Freistellungszeit angerechnet. Eine unwiderrufliche Freistellung findet sich häufig in Aufhebungsverträgen und gerichtlichen Vergleichen.',
    gesetz: '§\u00a0615 BGB, BAG-Rechtsprechung',
    link: '/aufhebungsvertrag/',
    linkText: 'Alles zum Aufhebungsvertrag',
  },
  {
    id: 'verdachtskuendigung',
    begriff: 'Verdachtskündigung',
    definition:
      'Eine Kündigung, die nicht auf einer bewiesenen Pflichtverletzung beruht, sondern auf dem dringenden Verdacht einer schwerwiegenden Straftat oder Verfehlung (z.\u00a0B. Diebstahl, Betrug, Unterschlagung). Voraussetzung: Der Verdacht muss auf konkreten Tatsachen beruhen, der Arbeitnehmer muss vor der Kündigung angehört worden sein, und der Arbeitgeber muss alles Zumutbare zur Aufklärung getan haben.',
    gesetz: '§\u00a0626 BGB, BAG-Rechtsprechung',
    link: '/fristlose-kuendigung/',
    linkText: 'Fristlose Kündigung prüfen',
  },
  {
    id: 'verhaltensbedingte-kuendigung',
    begriff: 'Verhaltensbedingte Kündigung',
    definition:
      'Eine Kündigung wegen einer Pflichtverletzung des Arbeitnehmers (z.\u00a0B. Arbeitsverweigerung, Diebstahl, unentschuldigtes Fehlen). In der Regel ist eine vorherige Abmahnung erforderlich. Bei schwerwiegenden Verstößen kann ausnahmsweise eine fristlose Kündigung ohne Abmahnung erfolgen.',
    gesetz: '§\u00a01 Abs.\u00a02 KSchG',
    link: '/abmahnung/',
    linkText: 'Abmahnung und Kündigung',
  },
  {
    id: 'weiterbeschaeftigung',
    begriff: 'Weiterbeschäftigungsanspruch',
    definition:
      'Der Anspruch des Arbeitnehmers, während eines laufenden Kündigungsschutzverfahrens weiterbeschäftigt zu werden. Er entsteht, wenn das Arbeitsgericht erstinstanzlich die Unwirksamkeit der Kündigung feststellt. Bis dahin besteht in der Regel kein Weiterbeschäftigungsanspruch.',
    gesetz: '§\u00a0102 Abs.\u00a05 BetrVG, BAG-Rechtsprechung',
    link: '/kuendigung/',
    linkText: 'Ihre Rechte nach Kündigung',
  },
  {
    id: 'widerrufliche-freistellung',
    begriff: 'Widerrufliche Freistellung',
    definition:
      'Die vorläufige Befreiung des Arbeitnehmers von der Arbeitspflicht, die der Arbeitgeber jederzeit widerrufen kann. Der Arbeitnehmer muss auf Abruf zurückkehren. Anderweitiger Verdienst wird in der Regel auf das Gehalt angerechnet (§\u00a0615 S.\u00a02 BGB). Resturlaub kann nicht automatisch angerechnet werden, da der Arbeitnehmer nicht frei über seine Zeit verfügen kann.',
    gesetz: '§\u00a0615 BGB',
    link: '/kuendigung/',
    linkText: 'Ihre Rechte nach Kündigung',
  },
  {
    id: 'zeugnis',
    begriff: 'Arbeitszeugnis',
    definition:
      'Jeder Arbeitnehmer hat bei Beendigung des Arbeitsverhältnisses Anspruch auf ein schriftliches Arbeitszeugnis. Es muss wohlwollend formuliert sein und der Wahrheit entsprechen. Man unterscheidet einfache Zeugnisse (nur Art und Dauer der Tätigkeit) und qualifizierte Zeugnisse (mit Leistungs- und Verhaltensbeurteilung).',
    gesetz: '§\u00a0109 GewO, §\u00a0630 BGB',
    link: '/aufhebungsvertrag/aufhebungsvertrag-zeugnis/',
    linkText: 'Zeugnis beim Aufhebungsvertrag',
  },
  {
    id: 'zwischenzeugnis',
    begriff: 'Zwischenzeugnis',
    definition:
      'Ein Arbeitszeugnis, das während des laufenden Arbeitsverhältnisses ausgestellt wird. Ein Anspruch besteht bei triftigem Grund — z.\u00a0B. bei Vorgesetztenwechsel, Versetzung, Elternzeit oder bevorstehender Kündigung. Das Zwischenzeugnis hat Bindungswirkung: Das spätere Endzeugnis darf ohne sachlichen Grund nicht wesentlich davon abweichen.',
    gesetz: '§\u00a0109 GewO (analog), BAG-Rechtsprechung',
    link: '/aufhebungsvertrag/aufhebungsvertrag-zeugnis/',
    linkText: 'Zeugnis beim Aufhebungsvertrag',
  },
];

// Unique Anfangsbuchstaben für Jump-Navigation
const buchstaben = Array.from(new Set(glossar.map((g) => g.begriff[0].toUpperCase())));

export default function GlossarPage() {
  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/glossar/`}
        pageTitle="Glossar Arbeitsrecht — Wichtige Begriffe einfach erklärt"
        pageDescription="Arbeitsrecht-Glossar: Abfindung, Kündigungsschutzklage, Aufhebungsvertrag, Sozialauswahl und 30+ weitere Begriffe — verständlich erklärt vom Fachanwalt."
        pageType="WebPage"
        includeOrganization={false}
        includeRating={false}
        speakableSelectors={['.glossar-liste']}
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Ratgeber', url: `${SEO_CONFIG.baseUrl}/ratgeber/` },
          { name: 'Glossar', url: `${SEO_CONFIG.baseUrl}/glossar/` },
        ]}
      />

      {/* Schema.org - DefinedTermSet */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'DefinedTermSet',
            name: 'Glossar Arbeitsrecht',
            description:
              'Die wichtigsten Begriffe im Arbeitsrecht — verständlich erklärt vom Fachanwalt.',
            url: `${SEO_CONFIG.baseUrl}/glossar/`,
            inLanguage: 'de',
            hasDefinedTerm: glossar.map((g) => ({
              '@type': 'DefinedTerm',
              name: g.begriff,
              description: g.definition,
              url: `${SEO_CONFIG.baseUrl}/glossar/#${g.id}`,
              inDefinedTermSet: `${SEO_CONFIG.baseUrl}/glossar/`,
            })),
          }),
        }}
      />

      {/* Schema.org - FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Was ist eine Abfindung und wann habe ich Anspruch?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Eine Abfindung ist eine einmalige Geldzahlung des Arbeitgebers bei Beendigung des Arbeitsverhältnisses. Ein gesetzlicher Anspruch besteht nur ausnahmsweise (z.\u00a0B. nach §\u00a01a KSchG). In der Praxis wird sie meist per Vergleich oder Aufhebungsvertrag verhandelt. Faustformel: 0,5 Bruttomonatsgehälter pro Beschäftigungsjahr.',
                },
              },
              {
                '@type': 'Question',
                name: 'Was ist der Unterschied zwischen Gütetermin und Kammertermin?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Der Gütetermin ist der erste Verhandlungstermin vor dem Arbeitsgericht (2–4 Wochen nach Klageeinreichung) mit dem Ziel einer gütlichen Einigung. Der Kammertermin folgt, wenn keine Einigung erzielt wurde — hier verhandelt die vollbesetzte Kammer mit drei Richtern, erhebt Beweise und fällt ein Urteil.',
                },
              },
              {
                '@type': 'Question',
                name: 'Was bedeutet Sonderkündigungsschutz?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sonderkündigungsschutz ist ein besonderer gesetzlicher Kündigungsschutz für bestimmte Personengruppen: Schwangere, Elternzeitler, Schwerbehinderte, Betriebsratsmitglieder, Auszubildende und Datenschutzbeauftragte. Eine Kündigung ist nur mit behördlicher Zustimmung oder unter sehr engen Voraussetzungen möglich.',
                },
              },
              {
                '@type': 'Question',
                name: 'Was ist eine Verdachtskündigung?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Eine Verdachtskündigung beruht nicht auf einer bewiesenen Pflichtverletzung, sondern auf dem dringenden Verdacht einer schwerwiegenden Straftat. Voraussetzung: Der Verdacht muss auf konkreten Tatsachen beruhen, der Arbeitnehmer muss vorher angehört worden sein, und der Arbeitgeber muss alles Zumutbare zur Aufklärung getan haben.',
                },
              },
            ],
          }),
        }}
      />

      {/* Header */}
      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-gold no-underline hover:underline">
              Start
            </Link>
            <span className="mx-2">/</span>
            <Link href="/ratgeber" className="text-gold no-underline hover:underline">
              Ratgeber
            </Link>
            <span className="mx-2">/</span>
            <span>Glossar</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Nachschlagewerk
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Glossar Arbeitsrecht
          </h1>
          <p className="text-[1.05rem] text-ink-light max-w-[640px] leading-relaxed mt-4">
            Die wichtigsten Begriffe rund um Kündigung, Abfindung und
            Aufhebungsvertrag &mdash; verständlich erklärt vom Fachanwalt für
            Arbeitsrecht.
          </p>

          {/* A-Z Navigation */}
          <nav className="flex flex-wrap gap-2 mt-6" aria-label="Alphabetische Navigation">
            {buchstaben.map((b) => (
              <a
                key={b}
                href={`#${b.toLowerCase()}`}
                className="w-9 h-9 flex items-center justify-center rounded bg-white border border-border text-[0.82rem] font-semibold text-gold-dark no-underline hover:bg-gold-bg hover:border-gold transition-colors"
              >
                {b}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Glossar-Liste */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto glossar-liste">
          {buchstaben.map((buchstabe) => {
            const begriffe = glossar.filter(
              (g) => g.begriff[0].toUpperCase() === buchstabe,
            );
            return (
              <div key={buchstabe} id={buchstabe.toLowerCase()} className="mb-10 scroll-mt-24">
                <div className="text-[1.4rem] font-serif font-bold text-gold-dark border-b border-border pb-2 mb-5">
                  {buchstabe}
                </div>
                <div className="space-y-6">
                  {begriffe.map((g) => (
                    <div
                      key={g.id}
                      id={g.id}
                      className="scroll-mt-24 border border-border rounded-sm p-5 hover:border-gold/40 transition-colors"
                    >
                      <h2 className="font-serif text-[1.15rem] font-bold text-ink mb-2">
                        {g.begriff}
                      </h2>
                      <p className="text-[0.92rem] text-ink-light leading-relaxed mb-3">
                        {g.definition}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.82rem]">
                        <span className="text-ink-muted">
                          Rechtsgrundlage: <strong>{g.gesetz}</strong>
                        </span>
                        <Link
                          href={g.link}
                          className="text-gold-dark font-semibold no-underline hover:underline"
                        >
                          {g.linkText} &rarr;
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Share */}
      <section className="px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <ShareButtons url="/glossar/" title="Glossar Arbeitsrecht — Wichtige Begriffe einfach erklärt" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Persönliche Beratung
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Begriffe allein reichen nicht?
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Lassen Sie Ihren Fall von einem Fachanwalt prüfen &mdash; kostenlose
            Ersteinschätzung innerhalb von 24&nbsp;Stunden.
          </p>
          <a
            href="/#kontakt"
            className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
          >
            Kostenlose Ersteinschätzung &rarr;
          </a>
        </div>
      </section>
    </main>
  );
}
