/**
 * Interne Verlinkungen basierend auf BERT-Interlinker-Analyse.
 * 809 fehlende Links, identifiziert am 23.05.2026.
 * Key = relativer Pfad der Quellseite (ohne trailing slash)
 * Value = Array der Ziel-Links mit href und Anchor-Text
 */
export const internalLinks: Record<string, Array<{ href: string; label: string }>> = {
  "/abfindung": [
    { href: "/kuendigung/kuendigung-krankschreibung", label: "Kündigung während Krankschreibung — was tun?" },
    { href: "/kuendigung/kuendigung-betriebsuebergang", label: "Kündigung nach Betriebsübergang — Ihre Rechte" },
    { href: "/kuendigung-nach-einer-abmahnung", label: "Kündigung nach einer Abmahnung — wirksam oder nicht?" },
    { href: "/kuendigung/kuendigung-teilzeit", label: "Kündigung in Teilzeit — was tun?" },
    { href: "/kuendigung/kuendigung-ausbildung", label: "Kündigung in der Ausbildung — was gilt?" }
  ],
  "/abfindung-nach-1-jahr-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-26-jahren-betriebszugehoerigkeit", label: "Abfindung nach 26 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-18-jahren-betriebszugehoerigkeit", label: "Abfindung nach 18 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-28-jahren-betriebszugehoerigkeit", label: "Abfindung nach 28 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-36-jahren-betriebszugehoerigkeit", label: "Abfindung nach 36 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-10-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-12-jahren-betriebszugehoerigkeit", label: "Abfindung nach 12 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-13-jahren-betriebszugehoerigkeit", label: "Abfindung nach 13 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-11-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-13-jahren-betriebszugehoerigkeit", label: "Abfindung nach 13 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-14-jahren-betriebszugehoerigkeit", label: "Abfindung nach 14 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-12-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-14-jahren-betriebszugehoerigkeit", label: "Abfindung nach 14 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-15-jahren-betriebszugehoerigkeit", label: "Abfindung nach 15 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-13-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-15-jahren-betriebszugehoerigkeit", label: "Abfindung nach 15 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-17-jahren-betriebszugehoerigkeit", label: "Abfindung nach 17 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-14-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-16-jahren-betriebszugehoerigkeit", label: "Abfindung nach 16 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-15-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-17-jahren-betriebszugehoerigkeit", label: "Abfindung nach 17 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-16-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-23-jahren-betriebszugehoerigkeit", label: "Abfindung nach 23 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-29-jahren-betriebszugehoerigkeit", label: "Abfindung nach 29 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-17-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-19-jahren-betriebszugehoerigkeit", label: "Abfindung nach 19 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-18-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-22-jahren-betriebszugehoerigkeit", label: "Abfindung nach 22 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-26-jahren-betriebszugehoerigkeit", label: "Abfindung nach 26 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-24-jahren-betriebszugehoerigkeit", label: "Abfindung nach 24 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-36-jahren-betriebszugehoerigkeit", label: "Abfindung nach 36 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-19-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-22-jahren-betriebszugehoerigkeit", label: "Abfindung nach 22 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-26-jahren-betriebszugehoerigkeit", label: "Abfindung nach 26 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-25-jahren-betriebszugehoerigkeit", label: "Abfindung nach 25 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-2-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-28-jahren-betriebszugehoerigkeit", label: "Abfindung nach 28 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-22-jahren-betriebszugehoerigkeit", label: "Abfindung nach 22 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-20-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-25-jahren-betriebszugehoerigkeit", label: "Abfindung nach 25 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-22-jahren-betriebszugehoerigkeit", label: "Abfindung nach 22 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-40-jahren-betriebszugehoerigkeit", label: "Abfindung nach 40 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-24-jahren-betriebszugehoerigkeit", label: "Abfindung nach 24 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-21-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-27-jahren-betriebszugehoerigkeit", label: "Abfindung nach 27 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-26-jahren-betriebszugehoerigkeit", label: "Abfindung nach 26 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-24-jahren-betriebszugehoerigkeit", label: "Abfindung nach 24 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-25-jahren-betriebszugehoerigkeit", label: "Abfindung nach 25 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-22-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-28-jahren-betriebszugehoerigkeit", label: "Abfindung nach 28 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-26-jahren-betriebszugehoerigkeit", label: "Abfindung nach 26 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-27-jahren-betriebszugehoerigkeit", label: "Abfindung nach 27 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-24-jahren-betriebszugehoerigkeit", label: "Abfindung nach 24 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-23-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-33-jahren-betriebszugehoerigkeit", label: "Abfindung nach 33 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-34-jahren-betriebszugehoerigkeit", label: "Abfindung nach 34 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-27-jahren-betriebszugehoerigkeit", label: "Abfindung nach 27 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-29-jahren-betriebszugehoerigkeit", label: "Abfindung nach 29 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-38-jahren-betriebszugehoerigkeit", label: "Abfindung nach 38 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-30-jahren-betriebszugehoerigkeit", label: "Abfindung nach 30 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-24-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-36-jahren-betriebszugehoerigkeit", label: "Abfindung nach 36 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-26-jahren-betriebszugehoerigkeit", label: "Abfindung nach 26 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-35-jahren-betriebszugehoerigkeit", label: "Abfindung nach 35 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-25-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-36-jahren-betriebszugehoerigkeit", label: "Abfindung nach 36 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-35-jahren-betriebszugehoerigkeit", label: "Abfindung nach 35 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-26-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-36-jahren-betriebszugehoerigkeit", label: "Abfindung nach 36 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-28-jahren-betriebszugehoerigkeit", label: "Abfindung nach 28 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-37-jahren-betriebszugehoerigkeit", label: "Abfindung nach 37 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-35-jahren-betriebszugehoerigkeit", label: "Abfindung nach 35 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-27-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-33-jahren-betriebszugehoerigkeit", label: "Abfindung nach 33 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-36-jahren-betriebszugehoerigkeit", label: "Abfindung nach 36 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-32-jahren-betriebszugehoerigkeit", label: "Abfindung nach 32 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-38-jahren-betriebszugehoerigkeit", label: "Abfindung nach 38 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-28-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-38-jahren-betriebszugehoerigkeit", label: "Abfindung nach 38 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-36-jahren-betriebszugehoerigkeit", label: "Abfindung nach 36 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-37-jahren-betriebszugehoerigkeit", label: "Abfindung nach 37 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-32-jahren-betriebszugehoerigkeit", label: "Abfindung nach 32 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-39-jahren-betriebszugehoerigkeit", label: "Abfindung nach 39 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-31-jahren-betriebszugehoerigkeit", label: "Abfindung nach 31 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-29-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-33-jahren-betriebszugehoerigkeit", label: "Abfindung nach 33 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-39-jahren-betriebszugehoerigkeit", label: "Abfindung nach 39 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-31-jahren-betriebszugehoerigkeit", label: "Abfindung nach 31 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-34-jahren-betriebszugehoerigkeit", label: "Abfindung nach 34 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-32-jahren-betriebszugehoerigkeit", label: "Abfindung nach 32 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-40-jahren-betriebszugehoerigkeit", label: "Abfindung nach 40 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-3-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-23-jahren-betriebszugehoerigkeit", label: "Abfindung nach 23 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-33-jahren-betriebszugehoerigkeit", label: "Abfindung nach 33 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-16-jahren-betriebszugehoerigkeit", label: "Abfindung nach 16 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-30-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-33-jahren-betriebszugehoerigkeit", label: "Abfindung nach 33 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-39-jahren-betriebszugehoerigkeit", label: "Abfindung nach 39 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-40-jahren-betriebszugehoerigkeit", label: "Abfindung nach 40 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-31-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-34-jahren-betriebszugehoerigkeit", label: "Abfindung nach 34 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-33-jahren-betriebszugehoerigkeit", label: "Abfindung nach 33 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-33-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-39-jahren-betriebszugehoerigkeit", label: "Abfindung nach 39 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-34-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-36-jahren-betriebszugehoerigkeit", label: "Abfindung nach 36 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-37-jahren-betriebszugehoerigkeit", label: "Abfindung nach 37 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-35-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-40-jahren-betriebszugehoerigkeit", label: "Abfindung nach 40 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-37-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-39-jahren-betriebszugehoerigkeit", label: "Abfindung nach 39 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-4-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-35-jahren-betriebszugehoerigkeit", label: "Abfindung nach 35 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-36-jahren-betriebszugehoerigkeit", label: "Abfindung nach 36 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-24-jahren-betriebszugehoerigkeit", label: "Abfindung nach 24 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-5-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-7-jahren-betriebszugehoerigkeit", label: "Abfindung nach 7 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-6-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-8-jahren-betriebszugehoerigkeit", label: "Abfindung nach 8 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-11-jahren-betriebszugehoerigkeit", label: "Abfindung nach 11 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-12-jahren-betriebszugehoerigkeit", label: "Abfindung nach 12 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-7-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-12-jahren-betriebszugehoerigkeit", label: "Abfindung nach 12 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-11-jahren-betriebszugehoerigkeit", label: "Abfindung nach 11 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-13-jahren-betriebszugehoerigkeit", label: "Abfindung nach 13 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-9-jahren-betriebszugehoerigkeit", label: "Abfindung nach 9 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-8-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-11-jahren-betriebszugehoerigkeit", label: "Abfindung nach 11 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-12-jahren-betriebszugehoerigkeit", label: "Abfindung nach 12 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-13-jahren-betriebszugehoerigkeit", label: "Abfindung nach 13 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abfindung-nach-9-jahren-betriebszugehoerigkeit": [
    { href: "/abfindung-nach-11-jahren-betriebszugehoerigkeit", label: "Abfindung nach 11 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" },
    { href: "/abfindung-nach-12-jahren-betriebszugehoerigkeit", label: "Abfindung nach 12 Jahren Betriebszugehörigkeit — wie viel steht mir zu?" }
  ],
  "/abmahnung": [
    { href: "/ratgeber/muster/gegendarstellung-abmahnung", label: "Gegendarstellung zur Abmahnung" }
  ],
  "/arbeitsrecht-anwalt/aachen": [
    { href: "/arbeitsrecht-anwalt/erfurt", label: "Arbeitsrecht-Anwalt in Erfurt" },
    { href: "/arbeitsrecht-anwalt/neulussheim", label: "Arbeitsrecht-Anwalt in Neulußheim" },
    { href: "/arbeitsrecht-anwalt/mainz", label: "Arbeitsrecht-Anwalt in Mainz" }
  ],
  "/arbeitsrecht-anwalt/altlussheim": [
    { href: "/arbeitsrecht-anwalt/viernheim", label: "Arbeitsrecht-Anwalt in Viernheim" },
    { href: "/arbeitsrecht-anwalt/neulussheim", label: "Arbeitsrecht-Anwalt in Neulußheim" },
    { href: "/arbeitsrecht-anwalt/dannstadt-schauernheim", label: "Arbeitsrecht-Anwalt in Dannstadt-Schauernheim" },
    { href: "/arbeitsrecht-anwalt/dielheim", label: "Arbeitsrecht-Anwalt in Dielheim" },
    { href: "/arbeitsrecht-anwalt/ilvesheim", label: "Arbeitsrecht-Anwalt in Ilvesheim" },
    { href: "/arbeitsrecht-anwalt/heppenheim", label: "Arbeitsrecht-Anwalt in Heppenheim (Bergstraße)" },
    { href: "/arbeitsrecht-anwalt/maxdorf", label: "Arbeitsrecht-Anwalt in Maxdorf" },
    { href: "/arbeitsrecht-anwalt/boehl-iggelheim", label: "Arbeitsrecht-Anwalt in Böhl-Iggelheim" },
    { href: "/arbeitsrecht-anwalt/neustadt-weinstrasse", label: "Arbeitsrecht-Anwalt in Neustadt an der Weinstraße" },
    { href: "/arbeitsrecht-anwalt/muehlhausen-rhein-neckar", label: "Arbeitsrecht-Anwalt in Mühlhausen (Rhein-Neckar)" }
  ],
  "/arbeitsrecht-anwalt/angelbachtal": [
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" }
  ],
  "/arbeitsrecht-anwalt/augsburg": [
    { href: "/arbeitsrecht-anwalt/erfurt", label: "Arbeitsrecht-Anwalt in Erfurt" },
    { href: "/arbeitsrecht-anwalt/altlussheim", label: "Arbeitsrecht-Anwalt in Altlußheim" },
    { href: "/arbeitsrecht-anwalt/weinheim", label: "Arbeitsrecht-Anwalt in Weinheim" },
    { href: "/arbeitsrecht-anwalt/freiburg", label: "Arbeitsrecht-Anwalt in Freiburg im Breisgau" },
    { href: "/arbeitsrecht-anwalt/kiel", label: "Arbeitsrecht-Anwalt in Kiel" },
    { href: "/arbeitsrecht-anwalt/darmstadt", label: "Arbeitsrecht-Anwalt in Darmstadt" }
  ],
  "/arbeitsrecht-anwalt/bad-duerkheim": [
    { href: "/arbeitsrecht-anwalt/viernheim", label: "Arbeitsrecht-Anwalt in Viernheim" }
  ],
  "/arbeitsrecht-anwalt/bammental": [
    { href: "/arbeitsrecht-anwalt/waghaeuseldorf", label: "Arbeitsrecht-Anwalt in Waghäusel" },
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" },
    { href: "/arbeitsrecht-anwalt/dudenhofen", label: "Arbeitsrecht-Anwalt in Dudenhofen" }
  ],
  "/arbeitsrecht-anwalt/berlin": [
    { href: "/arbeitsrecht-anwalt/berlin-mitte", label: "Arbeitsrecht-Anwalt in Berlin-Mitte" },
    { href: "/arbeitsrecht-anwalt/berlin-neukoelln", label: "Arbeitsrecht-Anwalt in Berlin-Neukölln" },
    { href: "/arbeitsrecht-anwalt/berlin-spandau", label: "Arbeitsrecht-Anwalt in Berlin-Spandau" },
    { href: "/arbeitsrecht-anwalt/berlin-reinickendorf", label: "Arbeitsrecht-Anwalt in Berlin-Reinickendorf" },
    { href: "/arbeitsrecht-anwalt/berlin-lichtenberg", label: "Arbeitsrecht-Anwalt in Berlin-Lichtenberg" },
    { href: "/arbeitsrecht-anwalt/dresden", label: "Arbeitsrecht-Anwalt in Dresden" }
  ],
  "/arbeitsrecht-anwalt/berlin-charlottenburg-wilmersdorf": [
    { href: "/arbeitsrecht-anwalt/berlin-reinickendorf", label: "Arbeitsrecht-Anwalt in Berlin-Reinickendorf" },
    { href: "/arbeitsrecht-anwalt/berlin-marzahn-hellersdorf", label: "Arbeitsrecht-Anwalt in Berlin Marzahn-Hellersdorf" },
    { href: "/arbeitsrecht-anwalt/berlin-lichtenberg", label: "Arbeitsrecht-Anwalt in Berlin-Lichtenberg" },
    { href: "/arbeitsrecht-anwalt/berlin-tempelhof-schoeneberg", label: "Arbeitsrecht-Anwalt in Berlin Tempelhof-Schöneberg" },
    { href: "/arbeitsrecht-anwalt/berlin-steglitz-zehlendorf", label: "Arbeitsrecht-Anwalt in Berlin Steglitz-Zehlendorf" }
  ],
  "/arbeitsrecht-anwalt/berlin-friedrichshain-kreuzberg": [
    { href: "/arbeitsrecht-anwalt/berlin-reinickendorf", label: "Arbeitsrecht-Anwalt in Berlin-Reinickendorf" },
    { href: "/arbeitsrecht-anwalt/berlin-tempelhof-schoeneberg", label: "Arbeitsrecht-Anwalt in Berlin Tempelhof-Schöneberg" },
    { href: "/arbeitsrecht-anwalt/berlin-treptow-koepenick", label: "Arbeitsrecht-Anwalt in Berlin Treptow-Köpenick" },
    { href: "/arbeitsrecht-anwalt/berlin-marzahn-hellersdorf", label: "Arbeitsrecht-Anwalt in Berlin Marzahn-Hellersdorf" },
    { href: "/arbeitsrecht-anwalt/berlin-charlottenburg-wilmersdorf", label: "Arbeitsrecht-Anwalt in Berlin Charlottenburg-Wilmersdorf" }
  ],
  "/arbeitsrecht-anwalt/berlin-lichtenberg": [
    { href: "/arbeitsrecht-anwalt/berlin-reinickendorf", label: "Arbeitsrecht-Anwalt in Berlin-Reinickendorf" }
  ],
  "/arbeitsrecht-anwalt/berlin-marzahn-hellersdorf": [
    { href: "/arbeitsrecht-anwalt/berlin-reinickendorf", label: "Arbeitsrecht-Anwalt in Berlin-Reinickendorf" }
  ],
  "/arbeitsrecht-anwalt/berlin-mitte": [
    { href: "/arbeitsrecht-anwalt/berlin-neukoelln", label: "Arbeitsrecht-Anwalt in Berlin-Neukölln" },
    { href: "/arbeitsrecht-anwalt/berlin-spandau", label: "Arbeitsrecht-Anwalt in Berlin-Spandau" },
    { href: "/arbeitsrecht-anwalt/berlin-reinickendorf", label: "Arbeitsrecht-Anwalt in Berlin-Reinickendorf" },
    { href: "/arbeitsrecht-anwalt/berlin-treptow-koepenick", label: "Arbeitsrecht-Anwalt in Berlin Treptow-Köpenick" },
    { href: "/arbeitsrecht-anwalt/berlin-pankow", label: "Arbeitsrecht-Anwalt in Berlin-Pankow" },
    { href: "/arbeitsrecht-anwalt/berlin-lichtenberg", label: "Arbeitsrecht-Anwalt in Berlin-Lichtenberg" },
    { href: "/arbeitsrecht-anwalt/berlin-marzahn-hellersdorf", label: "Arbeitsrecht-Anwalt in Berlin Marzahn-Hellersdorf" },
    { href: "/arbeitsrecht-anwalt/berlin-charlottenburg-wilmersdorf", label: "Arbeitsrecht-Anwalt in Berlin Charlottenburg-Wilmersdorf" }
  ],
  "/arbeitsrecht-anwalt/berlin-neukoelln": [
    { href: "/arbeitsrecht-anwalt/berlin-reinickendorf", label: "Arbeitsrecht-Anwalt in Berlin-Reinickendorf" },
    { href: "/arbeitsrecht-anwalt/berlin-treptow-koepenick", label: "Arbeitsrecht-Anwalt in Berlin Treptow-Köpenick" },
    { href: "/arbeitsrecht-anwalt/berlin-lichtenberg", label: "Arbeitsrecht-Anwalt in Berlin-Lichtenberg" },
    { href: "/arbeitsrecht-anwalt/berlin-marzahn-hellersdorf", label: "Arbeitsrecht-Anwalt in Berlin Marzahn-Hellersdorf" }
  ],
  "/arbeitsrecht-anwalt/berlin-pankow": [
    { href: "/arbeitsrecht-anwalt/berlin-spandau", label: "Arbeitsrecht-Anwalt in Berlin-Spandau" },
    { href: "/arbeitsrecht-anwalt/berlin-neukoelln", label: "Arbeitsrecht-Anwalt in Berlin-Neukölln" },
    { href: "/arbeitsrecht-anwalt/berlin-treptow-koepenick", label: "Arbeitsrecht-Anwalt in Berlin Treptow-Köpenick" },
    { href: "/arbeitsrecht-anwalt/berlin-reinickendorf", label: "Arbeitsrecht-Anwalt in Berlin-Reinickendorf" }
  ],
  "/arbeitsrecht-anwalt/berlin-spandau": [
    { href: "/arbeitsrecht-anwalt/berlin-neukoelln", label: "Arbeitsrecht-Anwalt in Berlin-Neukölln" },
    { href: "/arbeitsrecht-anwalt/berlin-reinickendorf", label: "Arbeitsrecht-Anwalt in Berlin-Reinickendorf" },
    { href: "/arbeitsrecht-anwalt/berlin-treptow-koepenick", label: "Arbeitsrecht-Anwalt in Berlin Treptow-Köpenick" },
    { href: "/arbeitsrecht-anwalt/berlin-marzahn-hellersdorf", label: "Arbeitsrecht-Anwalt in Berlin Marzahn-Hellersdorf" }
  ],
  "/arbeitsrecht-anwalt/berlin-steglitz-zehlendorf": [
    { href: "/arbeitsrecht-anwalt/berlin-reinickendorf", label: "Arbeitsrecht-Anwalt in Berlin-Reinickendorf" },
    { href: "/arbeitsrecht-anwalt/berlin-marzahn-hellersdorf", label: "Arbeitsrecht-Anwalt in Berlin Marzahn-Hellersdorf" },
    { href: "/arbeitsrecht-anwalt/berlin-tempelhof-schoeneberg", label: "Arbeitsrecht-Anwalt in Berlin Tempelhof-Schöneberg" },
    { href: "/arbeitsrecht-anwalt/berlin-treptow-koepenick", label: "Arbeitsrecht-Anwalt in Berlin Treptow-Köpenick" }
  ],
  "/arbeitsrecht-anwalt/berlin-tempelhof-schoeneberg": [
    { href: "/arbeitsrecht-anwalt/berlin-reinickendorf", label: "Arbeitsrecht-Anwalt in Berlin-Reinickendorf" },
    { href: "/arbeitsrecht-anwalt/berlin-treptow-koepenick", label: "Arbeitsrecht-Anwalt in Berlin Treptow-Köpenick" }
  ],
  "/arbeitsrecht-anwalt/berlin-treptow-koepenick": [
    { href: "/arbeitsrecht-anwalt/berlin-reinickendorf", label: "Arbeitsrecht-Anwalt in Berlin-Reinickendorf" }
  ],
  "/arbeitsrecht-anwalt/bielefeld": [
    { href: "/arbeitsrecht-anwalt/gelsenkirchen", label: "Arbeitsrecht-Anwalt in Gelsenkirchen" },
    { href: "/arbeitsrecht-anwalt/bensheim", label: "Arbeitsrecht-Anwalt in Bensheim" },
    { href: "/arbeitsrecht-anwalt/weinheim", label: "Arbeitsrecht-Anwalt in Weinheim" },
    { href: "/arbeitsrecht-anwalt/meckesheim", label: "Arbeitsrecht-Anwalt in Meckesheim" }
  ],
  "/arbeitsrecht-anwalt/bochum": [
    { href: "/arbeitsrecht-anwalt/leimen", label: "Arbeitsrecht-Anwalt in Leimen" },
    { href: "/arbeitsrecht-anwalt/waghaeuseldorf", label: "Arbeitsrecht-Anwalt in Waghäusel" },
    { href: "/arbeitsrecht-anwalt/lorsch", label: "Arbeitsrecht-Anwalt in Lorsch" },
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" },
    { href: "/arbeitsrecht-anwalt/ketsch", label: "Arbeitsrecht-Anwalt in Ketsch" }
  ],
  "/arbeitsrecht-anwalt/boehl-iggelheim": [
    { href: "/arbeitsrecht-anwalt/viernheim", label: "Arbeitsrecht-Anwalt in Viernheim" },
    { href: "/arbeitsrecht-anwalt/dannstadt-schauernheim", label: "Arbeitsrecht-Anwalt in Dannstadt-Schauernheim" }
  ],
  "/arbeitsrecht-anwalt/bonn": [
    { href: "/arbeitsrecht-anwalt/erfurt", label: "Arbeitsrecht-Anwalt in Erfurt" }
  ],
  "/arbeitsrecht-anwalt/braunschweig": [
    { href: "/arbeitsrecht-anwalt/schwetzingen", label: "Arbeitsrecht-Anwalt in Schwetzingen" },
    { href: "/arbeitsrecht-anwalt/ladenburg", label: "Arbeitsrecht-Anwalt in Ladenburg" },
    { href: "/arbeitsrecht-anwalt/weinheim", label: "Arbeitsrecht-Anwalt in Weinheim" },
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" },
    { href: "/arbeitsrecht-anwalt/philippsburg", label: "Arbeitsrecht-Anwalt in Philippsburg" }
  ],
  "/arbeitsrecht-anwalt/bremen": [
    { href: "/arbeitsrecht-anwalt/kiel", label: "Arbeitsrecht-Anwalt in Kiel" },
    { href: "/arbeitsrecht-anwalt/augsburg", label: "Arbeitsrecht-Anwalt in Augsburg" },
    { href: "/arbeitsrecht-anwalt/oftersheim", label: "Arbeitsrecht-Anwalt in Oftersheim" },
    { href: "/arbeitsrecht-anwalt/mainz", label: "Arbeitsrecht-Anwalt in Mainz" }
  ],
  "/arbeitsrecht-anwalt/bruehl-rhein-neckar": [
    { href: "/arbeitsrecht-anwalt/malsch-rhein-neckar", label: "Arbeitsrecht-Anwalt in Malsch (Rhein-Neckar)" },
    { href: "/arbeitsrecht-anwalt/muehlhausen-rhein-neckar", label: "Arbeitsrecht-Anwalt in Mühlhausen (Rhein-Neckar)" },
    { href: "/arbeitsrecht-anwalt/lorsch", label: "Arbeitsrecht-Anwalt in Lorsch" },
    { href: "/arbeitsrecht-anwalt/neckargemuend", label: "Arbeitsrecht-Anwalt in Neckargemünd" },
    { href: "/arbeitsrecht-anwalt/edingen-neckarhausen", label: "Arbeitsrecht-Anwalt in Edingen-Neckarhausen" }
  ],
  "/arbeitsrecht-anwalt/dannstadt-schauernheim": [
    { href: "/arbeitsrecht-anwalt/viernheim", label: "Arbeitsrecht-Anwalt in Viernheim" },
    { href: "/arbeitsrecht-anwalt/heppenheim", label: "Arbeitsrecht-Anwalt in Heppenheim (Bergstraße)" },
    { href: "/arbeitsrecht-anwalt/bensheim", label: "Arbeitsrecht-Anwalt in Bensheim" }
  ],
  "/arbeitsrecht-anwalt/darmstadt": [
    { href: "/arbeitsrecht-anwalt/neulussheim", label: "Arbeitsrecht-Anwalt in Neulußheim" },
    { href: "/arbeitsrecht-anwalt/dannstadt-schauernheim", label: "Arbeitsrecht-Anwalt in Dannstadt-Schauernheim" }
  ],
  "/arbeitsrecht-anwalt/dielheim": [
    { href: "/arbeitsrecht-anwalt/viernheim", label: "Arbeitsrecht-Anwalt in Viernheim" },
    { href: "/arbeitsrecht-anwalt/bad-duerkheim", label: "Arbeitsrecht-Anwalt in Bad Dürkheim" },
    { href: "/arbeitsrecht-anwalt/frankenthal", label: "Arbeitsrecht-Anwalt in Frankenthal (Pfalz)" }
  ],
  "/arbeitsrecht-anwalt/dortmund": [
    { href: "/arbeitsrecht-anwalt/augsburg", label: "Arbeitsrecht-Anwalt in Augsburg" },
    { href: "/arbeitsrecht-anwalt/weinheim", label: "Arbeitsrecht-Anwalt in Weinheim" }
  ],
  "/arbeitsrecht-anwalt/dossenheim": [
    { href: "/arbeitsrecht-anwalt/viernheim", label: "Arbeitsrecht-Anwalt in Viernheim" },
    { href: "/arbeitsrecht-anwalt/dielheim", label: "Arbeitsrecht-Anwalt in Dielheim" },
    { href: "/arbeitsrecht-anwalt/altlussheim", label: "Arbeitsrecht-Anwalt in Altlußheim" },
    { href: "/arbeitsrecht-anwalt/weinheim", label: "Arbeitsrecht-Anwalt in Weinheim" },
    { href: "/arbeitsrecht-anwalt/bensheim", label: "Arbeitsrecht-Anwalt in Bensheim" },
    { href: "/arbeitsrecht-anwalt/sinsheim", label: "Arbeitsrecht-Anwalt in Sinsheim" },
    { href: "/arbeitsrecht-anwalt/bad-duerkheim", label: "Arbeitsrecht-Anwalt in Bad Dürkheim" },
    { href: "/arbeitsrecht-anwalt/roemerberg", label: "Arbeitsrecht-Anwalt in Römerberg" },
    { href: "/arbeitsrecht-anwalt/neustadt-weinstrasse", label: "Arbeitsrecht-Anwalt in Neustadt an der Weinstraße" }
  ],
  "/arbeitsrecht-anwalt/dresden": [
    { href: "/arbeitsrecht-anwalt/berlin-lichtenberg", label: "Arbeitsrecht-Anwalt in Berlin-Lichtenberg" },
    { href: "/arbeitsrecht-anwalt/hannover", label: "Arbeitsrecht-Anwalt in Hannover" },
    { href: "/arbeitsrecht-anwalt/berlin-mitte", label: "Arbeitsrecht-Anwalt in Berlin-Mitte" }
  ],
  "/arbeitsrecht-anwalt/duesseldorf": [
    { href: "/arbeitsrecht-anwalt/erfurt", label: "Arbeitsrecht-Anwalt in Erfurt" },
    { href: "/arbeitsrecht-anwalt/aachen", label: "Arbeitsrecht-Anwalt in Aachen" },
    { href: "/arbeitsrecht-anwalt/berlin-mitte", label: "Arbeitsrecht-Anwalt in Berlin-Mitte" },
    { href: "/arbeitsrecht-anwalt/augsburg", label: "Arbeitsrecht-Anwalt in Augsburg" },
    { href: "/arbeitsrecht-anwalt/hannover", label: "Arbeitsrecht-Anwalt in Hannover" },
    { href: "/arbeitsrecht-anwalt/dresden", label: "Arbeitsrecht-Anwalt in Dresden" },
    { href: "/arbeitsrecht-anwalt/leipzig", label: "Arbeitsrecht-Anwalt in Leipzig" },
    { href: "/arbeitsrecht-anwalt/dortmund", label: "Arbeitsrecht-Anwalt in Dortmund" },
    { href: "/arbeitsrecht-anwalt/freiburg", label: "Arbeitsrecht-Anwalt in Freiburg im Breisgau" },
    { href: "/arbeitsrecht-anwalt/kiel", label: "Arbeitsrecht-Anwalt in Kiel" },
    { href: "/arbeitsrecht-anwalt/mannheim", label: "Arbeitsrecht-Anwalt in Mannheim" },
    { href: "/arbeitsrecht-anwalt/bremen", label: "Arbeitsrecht-Anwalt in Bremen" },
    { href: "/arbeitsrecht-anwalt/bonn", label: "Arbeitsrecht-Anwalt in Bonn" }
  ],
  "/arbeitsrecht-anwalt/duisburg": [
    { href: "/arbeitsrecht-anwalt/bad-duerkheim", label: "Arbeitsrecht-Anwalt in Bad Dürkheim" },
    { href: "/arbeitsrecht-anwalt/wiesbaden", label: "Arbeitsrecht-Anwalt in Wiesbaden" },
    { href: "/arbeitsrecht-anwalt/schwetzingen", label: "Arbeitsrecht-Anwalt in Schwetzingen" },
    { href: "/arbeitsrecht-anwalt/dossenheim", label: "Arbeitsrecht-Anwalt in Dossenheim" },
    { href: "/arbeitsrecht-anwalt/viernheim", label: "Arbeitsrecht-Anwalt in Viernheim" }
  ],
  "/arbeitsrecht-anwalt/edingen-neckarhausen": [
    { href: "/arbeitsrecht-anwalt/altlussheim", label: "Arbeitsrecht-Anwalt in Altlußheim" },
    { href: "/arbeitsrecht-anwalt/neckargemuend", label: "Arbeitsrecht-Anwalt in Neckargemünd" },
    { href: "/arbeitsrecht-anwalt/weinheim", label: "Arbeitsrecht-Anwalt in Weinheim" },
    { href: "/arbeitsrecht-anwalt/muehlhausen-rhein-neckar", label: "Arbeitsrecht-Anwalt in Mühlhausen (Rhein-Neckar)" }
  ],
  "/arbeitsrecht-anwalt/eppelheim": [
    { href: "/arbeitsrecht-anwalt/ilvesheim", label: "Arbeitsrecht-Anwalt in Ilvesheim" },
    { href: "/arbeitsrecht-anwalt/altlussheim", label: "Arbeitsrecht-Anwalt in Altlußheim" },
    { href: "/arbeitsrecht-anwalt/viernheim", label: "Arbeitsrecht-Anwalt in Viernheim" },
    { href: "/arbeitsrecht-anwalt/angelbachtal", label: "Arbeitsrecht-Anwalt in Angelbachtal" }
  ],
  "/arbeitsrecht-anwalt/erfurt": [
    { href: "/arbeitsrecht-anwalt/altlussheim", label: "Arbeitsrecht-Anwalt in Altlußheim" },
    { href: "/arbeitsrecht-anwalt/neulussheim", label: "Arbeitsrecht-Anwalt in Neulußheim" },
    { href: "/arbeitsrecht-anwalt/weinheim", label: "Arbeitsrecht-Anwalt in Weinheim" },
    { href: "/arbeitsrecht-anwalt/darmstadt", label: "Arbeitsrecht-Anwalt in Darmstadt" }
  ],
  "/arbeitsrecht-anwalt/essen": [
    { href: "/arbeitsrecht-anwalt/ketsch", label: "Arbeitsrecht-Anwalt in Ketsch" },
    { href: "/arbeitsrecht-anwalt/waghaeuseldorf", label: "Arbeitsrecht-Anwalt in Waghäusel" },
    { href: "/arbeitsrecht-anwalt/leimen", label: "Arbeitsrecht-Anwalt in Leimen" },
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" },
    { href: "/arbeitsrecht-anwalt/lorsch", label: "Arbeitsrecht-Anwalt in Lorsch" }
  ],
  "/arbeitsrecht-anwalt/frankenthal": [
    { href: "/arbeitsrecht-anwalt/viernheim", label: "Arbeitsrecht-Anwalt in Viernheim" }
  ],
  "/arbeitsrecht-anwalt/frankfurt": [
    { href: "/arbeitsrecht-anwalt/duesseldorf", label: "Arbeitsrecht-Anwalt in Düsseldorf" },
    { href: "/arbeitsrecht-anwalt/augsburg", label: "Arbeitsrecht-Anwalt in Augsburg" },
    { href: "/arbeitsrecht-anwalt/berlin-mitte", label: "Arbeitsrecht-Anwalt in Berlin-Mitte" },
    { href: "/arbeitsrecht-anwalt/berlin-reinickendorf", label: "Arbeitsrecht-Anwalt in Berlin-Reinickendorf" }
  ],
  "/arbeitsrecht-anwalt/freiburg": [
    { href: "/arbeitsrecht-anwalt/erfurt", label: "Arbeitsrecht-Anwalt in Erfurt" },
    { href: "/arbeitsrecht-anwalt/neulussheim", label: "Arbeitsrecht-Anwalt in Neulußheim" }
  ],
  "/arbeitsrecht-anwalt/gelsenkirchen": [
    { href: "/arbeitsrecht-anwalt/schwetzingen", label: "Arbeitsrecht-Anwalt in Schwetzingen" },
    { href: "/arbeitsrecht-anwalt/lorsch", label: "Arbeitsrecht-Anwalt in Lorsch" },
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" },
    { href: "/arbeitsrecht-anwalt/altlussheim", label: "Arbeitsrecht-Anwalt in Altlußheim" },
    { href: "/arbeitsrecht-anwalt/reilingen", label: "Arbeitsrecht-Anwalt in Reilingen" },
    { href: "/arbeitsrecht-anwalt/moenchengladbach", label: "Arbeitsrecht-Anwalt in Mönchengladbach" },
    { href: "/arbeitsrecht-anwalt/malsch-rhein-neckar", label: "Arbeitsrecht-Anwalt in Malsch (Rhein-Neckar)" },
    { href: "/arbeitsrecht-anwalt/roemerberg", label: "Arbeitsrecht-Anwalt in Römerberg" },
    { href: "/arbeitsrecht-anwalt/lampertheim", label: "Arbeitsrecht-Anwalt in Lampertheim" },
    { href: "/arbeitsrecht-anwalt/krefeld", label: "Arbeitsrecht-Anwalt in Krefeld" },
    { href: "/arbeitsrecht-anwalt/halle", label: "Arbeitsrecht-Anwalt in Halle (Saale)" },
    { href: "/arbeitsrecht-anwalt/angelbachtal", label: "Arbeitsrecht-Anwalt in Angelbachtal" }
  ],
  "/arbeitsrecht-anwalt/halle": [
    { href: "/arbeitsrecht-anwalt/lorsch", label: "Arbeitsrecht-Anwalt in Lorsch" },
    { href: "/arbeitsrecht-anwalt/schwetzingen", label: "Arbeitsrecht-Anwalt in Schwetzingen" },
    { href: "/arbeitsrecht-anwalt/leimen", label: "Arbeitsrecht-Anwalt in Leimen" },
    { href: "/arbeitsrecht-anwalt/weinheim", label: "Arbeitsrecht-Anwalt in Weinheim" }
  ],
  "/arbeitsrecht-anwalt/hamburg": [
    { href: "/arbeitsrecht-anwalt/duesseldorf", label: "Arbeitsrecht-Anwalt in Düsseldorf" },
    { href: "/arbeitsrecht-anwalt/dortmund", label: "Arbeitsrecht-Anwalt in Dortmund" },
    { href: "/arbeitsrecht-anwalt/berlin-mitte", label: "Arbeitsrecht-Anwalt in Berlin-Mitte" },
    { href: "/arbeitsrecht-anwalt/frankfurt", label: "Arbeitsrecht-Anwalt in Frankfurt am Main" },
    { href: "/arbeitsrecht-anwalt/hannover", label: "Arbeitsrecht-Anwalt in Hannover" },
    { href: "/arbeitsrecht-anwalt/nuernberg", label: "Arbeitsrecht-Anwalt in Nürnberg" },
    { href: "/arbeitsrecht-anwalt/bonn", label: "Arbeitsrecht-Anwalt in Bonn" }
  ],
  "/arbeitsrecht-anwalt/hannover": [
    { href: "/arbeitsrecht-anwalt/kiel", label: "Arbeitsrecht-Anwalt in Kiel" },
    { href: "/arbeitsrecht-anwalt/braunschweig", label: "Arbeitsrecht-Anwalt in Braunschweig" },
    { href: "/arbeitsrecht-anwalt/karlsruhe", label: "Arbeitsrecht-Anwalt in Karlsruhe" },
    { href: "/arbeitsrecht-anwalt/bonn", label: "Arbeitsrecht-Anwalt in Bonn" }
  ],
  "/arbeitsrecht-anwalt/hassloch": [
    { href: "/arbeitsrecht-anwalt/lorsch", label: "Arbeitsrecht-Anwalt in Lorsch" },
    { href: "/arbeitsrecht-anwalt/dudenhofen", label: "Arbeitsrecht-Anwalt in Dudenhofen" },
    { href: "/arbeitsrecht-anwalt/mutterstadt", label: "Arbeitsrecht-Anwalt in Mutterstadt" },
    { href: "/arbeitsrecht-anwalt/limburgerhof", label: "Arbeitsrecht-Anwalt in Limburgerhof" }
  ],
  "/arbeitsrecht-anwalt/heddesheim": [
    { href: "/arbeitsrecht-anwalt/heppenheim", label: "Arbeitsrecht-Anwalt in Heppenheim (Bergstraße)" },
    { href: "/arbeitsrecht-anwalt/meckesheim", label: "Arbeitsrecht-Anwalt in Meckesheim" },
    { href: "/arbeitsrecht-anwalt/viernheim", label: "Arbeitsrecht-Anwalt in Viernheim" }
  ],
  "/arbeitsrecht-anwalt/hirschberg-bergstrasse": [
    { href: "/arbeitsrecht-anwalt/dannstadt-schauernheim", label: "Arbeitsrecht-Anwalt in Dannstadt-Schauernheim" },
    { href: "/arbeitsrecht-anwalt/altlussheim", label: "Arbeitsrecht-Anwalt in Altlußheim" },
    { href: "/arbeitsrecht-anwalt/heppenheim", label: "Arbeitsrecht-Anwalt in Heppenheim (Bergstraße)" },
    { href: "/arbeitsrecht-anwalt/meckesheim", label: "Arbeitsrecht-Anwalt in Meckesheim" }
  ],
  "/arbeitsrecht-anwalt/hockenheim": [
    { href: "/arbeitsrecht-anwalt/meckesheim", label: "Arbeitsrecht-Anwalt in Meckesheim" },
    { href: "/arbeitsrecht-anwalt/dielheim", label: "Arbeitsrecht-Anwalt in Dielheim" },
    { href: "/arbeitsrecht-anwalt/dossenheim", label: "Arbeitsrecht-Anwalt in Dossenheim" },
    { href: "/arbeitsrecht-anwalt/viernheim", label: "Arbeitsrecht-Anwalt in Viernheim" },
    { href: "/arbeitsrecht-anwalt/heddesheim", label: "Arbeitsrecht-Anwalt in Heddesheim" },
    { href: "/arbeitsrecht-anwalt/eppelheim", label: "Arbeitsrecht-Anwalt in Eppelheim" },
    { href: "/arbeitsrecht-anwalt/lampertheim", label: "Arbeitsrecht-Anwalt in Lampertheim" }
  ],
  "/arbeitsrecht-anwalt/ilvesheim": [
    { href: "/arbeitsrecht-anwalt/viernheim", label: "Arbeitsrecht-Anwalt in Viernheim" }
  ],
  "/arbeitsrecht-anwalt/karlsruhe": [
    { href: "/arbeitsrecht-anwalt/kiel", label: "Arbeitsrecht-Anwalt in Kiel" },
    { href: "/arbeitsrecht-anwalt/ladenburg", label: "Arbeitsrecht-Anwalt in Ladenburg" }
  ],
  "/arbeitsrecht-anwalt/ketsch": [
    { href: "/arbeitsrecht-anwalt/waghaeuseldorf", label: "Arbeitsrecht-Anwalt in Waghäusel" },
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" },
    { href: "/arbeitsrecht-anwalt/leimen", label: "Arbeitsrecht-Anwalt in Leimen" },
    { href: "/arbeitsrecht-anwalt/lorsch", label: "Arbeitsrecht-Anwalt in Lorsch" },
    { href: "/arbeitsrecht-anwalt/dudenhofen", label: "Arbeitsrecht-Anwalt in Dudenhofen" },
    { href: "/arbeitsrecht-anwalt/nussloch", label: "Arbeitsrecht-Anwalt in Nussloch" },
    { href: "/arbeitsrecht-anwalt/bammental", label: "Arbeitsrecht-Anwalt in Bammental" },
    { href: "/arbeitsrecht-anwalt/wiesloch", label: "Arbeitsrecht-Anwalt in Wiesloch" },
    { href: "/arbeitsrecht-anwalt/st-leon-rot", label: "Arbeitsrecht-Anwalt in St. Leon-Rot" },
    { href: "/arbeitsrecht-anwalt/speyer", label: "Arbeitsrecht-Anwalt in Speyer" }
  ],
  "/arbeitsrecht-anwalt/koeln": [
    { href: "/arbeitsrecht-anwalt/duesseldorf", label: "Arbeitsrecht-Anwalt in Düsseldorf" },
    { href: "/arbeitsrecht-anwalt/aachen", label: "Arbeitsrecht-Anwalt in Aachen" },
    { href: "/arbeitsrecht-anwalt/erfurt", label: "Arbeitsrecht-Anwalt in Erfurt" },
    { href: "/arbeitsrecht-anwalt/weinheim", label: "Arbeitsrecht-Anwalt in Weinheim" },
    { href: "/arbeitsrecht-anwalt/mainz", label: "Arbeitsrecht-Anwalt in Mainz" }
  ],
  "/arbeitsrecht-anwalt/krefeld": [
    { href: "/arbeitsrecht-anwalt/schriesheim", label: "Arbeitsrecht-Anwalt in Schriesheim" },
    { href: "/arbeitsrecht-anwalt/oftersheim", label: "Arbeitsrecht-Anwalt in Oftersheim" },
    { href: "/arbeitsrecht-anwalt/altlussheim", label: "Arbeitsrecht-Anwalt in Altlußheim" },
    { href: "/arbeitsrecht-anwalt/viernheim", label: "Arbeitsrecht-Anwalt in Viernheim" }
  ],
  "/arbeitsrecht-anwalt/ladenburg": [
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" },
    { href: "/arbeitsrecht-anwalt/meckesheim", label: "Arbeitsrecht-Anwalt in Meckesheim" },
    { href: "/arbeitsrecht-anwalt/dossenheim", label: "Arbeitsrecht-Anwalt in Dossenheim" },
    { href: "/arbeitsrecht-anwalt/dudenhofen", label: "Arbeitsrecht-Anwalt in Dudenhofen" },
    { href: "/arbeitsrecht-anwalt/philippsburg", label: "Arbeitsrecht-Anwalt in Philippsburg" }
  ],
  "/arbeitsrecht-anwalt/leimen": [
    { href: "/arbeitsrecht-anwalt/waghaeuseldorf", label: "Arbeitsrecht-Anwalt in Waghäusel" },
    { href: "/arbeitsrecht-anwalt/lorsch", label: "Arbeitsrecht-Anwalt in Lorsch" },
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" },
    { href: "/arbeitsrecht-anwalt/dudenhofen", label: "Arbeitsrecht-Anwalt in Dudenhofen" },
    { href: "/arbeitsrecht-anwalt/mutterstadt", label: "Arbeitsrecht-Anwalt in Mutterstadt" },
    { href: "/arbeitsrecht-anwalt/nussloch", label: "Arbeitsrecht-Anwalt in Nussloch" },
    { href: "/arbeitsrecht-anwalt/bammental", label: "Arbeitsrecht-Anwalt in Bammental" },
    { href: "/arbeitsrecht-anwalt/limburgerhof", label: "Arbeitsrecht-Anwalt in Limburgerhof" },
    { href: "/arbeitsrecht-anwalt/schifferstadt", label: "Arbeitsrecht-Anwalt in Schifferstadt" },
    { href: "/arbeitsrecht-anwalt/speyer", label: "Arbeitsrecht-Anwalt in Speyer" }
  ],
  "/arbeitsrecht-anwalt/leipzig": [
    { href: "/arbeitsrecht-anwalt/aachen", label: "Arbeitsrecht-Anwalt in Aachen" },
    { href: "/arbeitsrecht-anwalt/neulussheim", label: "Arbeitsrecht-Anwalt in Neulußheim" },
    { href: "/arbeitsrecht-anwalt/altlussheim", label: "Arbeitsrecht-Anwalt in Altlußheim" },
    { href: "/arbeitsrecht-anwalt/weinheim", label: "Arbeitsrecht-Anwalt in Weinheim" }
  ],
  "/arbeitsrecht-anwalt/limburgerhof": [
    { href: "/arbeitsrecht-anwalt/dudenhofen", label: "Arbeitsrecht-Anwalt in Dudenhofen" },
    { href: "/arbeitsrecht-anwalt/lorsch", label: "Arbeitsrecht-Anwalt in Lorsch" }
  ],
  "/arbeitsrecht-anwalt/luebeck": [
    { href: "/arbeitsrecht-anwalt/lorsch", label: "Arbeitsrecht-Anwalt in Lorsch" },
    { href: "/arbeitsrecht-anwalt/weinheim", label: "Arbeitsrecht-Anwalt in Weinheim" }
  ],
  "/arbeitsrecht-anwalt/magdeburg": [
    { href: "/arbeitsrecht-anwalt/weinheim", label: "Arbeitsrecht-Anwalt in Weinheim" },
    { href: "/arbeitsrecht-anwalt/philippsburg", label: "Arbeitsrecht-Anwalt in Philippsburg" },
    { href: "/arbeitsrecht-anwalt/schwetzingen", label: "Arbeitsrecht-Anwalt in Schwetzingen" },
    { href: "/arbeitsrecht-anwalt/ladenburg", label: "Arbeitsrecht-Anwalt in Ladenburg" },
    { href: "/arbeitsrecht-anwalt/lorsch", label: "Arbeitsrecht-Anwalt in Lorsch" }
  ],
  "/arbeitsrecht-anwalt/mainz": [
    { href: "/arbeitsrecht-anwalt/dannstadt-schauernheim", label: "Arbeitsrecht-Anwalt in Dannstadt-Schauernheim" },
    { href: "/arbeitsrecht-anwalt/neulussheim", label: "Arbeitsrecht-Anwalt in Neulußheim" },
    { href: "/arbeitsrecht-anwalt/viernheim", label: "Arbeitsrecht-Anwalt in Viernheim" },
    { href: "/arbeitsrecht-anwalt/dielheim", label: "Arbeitsrecht-Anwalt in Dielheim" },
    { href: "/arbeitsrecht-anwalt/darmstadt", label: "Arbeitsrecht-Anwalt in Darmstadt" },
    { href: "/arbeitsrecht-anwalt/frankenthal", label: "Arbeitsrecht-Anwalt in Frankenthal (Pfalz)" }
  ],
  "/arbeitsrecht-anwalt/malsch-rhein-neckar": [
    { href: "/arbeitsrecht-anwalt/lorsch", label: "Arbeitsrecht-Anwalt in Lorsch" },
    { href: "/arbeitsrecht-anwalt/muehlhausen-rhein-neckar", label: "Arbeitsrecht-Anwalt in Mühlhausen (Rhein-Neckar)" }
  ],
  "/arbeitsrecht-anwalt/mannheim": [
    { href: "/arbeitsrecht-anwalt/erfurt", label: "Arbeitsrecht-Anwalt in Erfurt" },
    { href: "/arbeitsrecht-anwalt/aachen", label: "Arbeitsrecht-Anwalt in Aachen" },
    { href: "/arbeitsrecht-anwalt/augsburg", label: "Arbeitsrecht-Anwalt in Augsburg" },
    { href: "/arbeitsrecht-anwalt/weinheim", label: "Arbeitsrecht-Anwalt in Weinheim" }
  ],
  "/arbeitsrecht-anwalt/meckesheim": [
    { href: "/arbeitsrecht-anwalt/altlussheim", label: "Arbeitsrecht-Anwalt in Altlußheim" },
    { href: "/arbeitsrecht-anwalt/viernheim", label: "Arbeitsrecht-Anwalt in Viernheim" },
    { href: "/arbeitsrecht-anwalt/dielheim", label: "Arbeitsrecht-Anwalt in Dielheim" },
    { href: "/arbeitsrecht-anwalt/boehl-iggelheim", label: "Arbeitsrecht-Anwalt in Böhl-Iggelheim" },
    { href: "/arbeitsrecht-anwalt/heppenheim", label: "Arbeitsrecht-Anwalt in Heppenheim (Bergstraße)" },
    { href: "/arbeitsrecht-anwalt/ilvesheim", label: "Arbeitsrecht-Anwalt in Ilvesheim" },
    { href: "/arbeitsrecht-anwalt/maxdorf", label: "Arbeitsrecht-Anwalt in Maxdorf" },
    { href: "/arbeitsrecht-anwalt/philippsburg", label: "Arbeitsrecht-Anwalt in Philippsburg" },
    { href: "/arbeitsrecht-anwalt/lampertheim", label: "Arbeitsrecht-Anwalt in Lampertheim" },
    { href: "/arbeitsrecht-anwalt/frankenthal", label: "Arbeitsrecht-Anwalt in Frankenthal (Pfalz)" }
  ],
  "/arbeitsrecht-anwalt/moenchengladbach": [
    { href: "/arbeitsrecht-anwalt/weinheim", label: "Arbeitsrecht-Anwalt in Weinheim" },
    { href: "/arbeitsrecht-anwalt/schwetzingen", label: "Arbeitsrecht-Anwalt in Schwetzingen" },
    { href: "/arbeitsrecht-anwalt/dossenheim", label: "Arbeitsrecht-Anwalt in Dossenheim" },
    { href: "/arbeitsrecht-anwalt/angelbachtal", label: "Arbeitsrecht-Anwalt in Angelbachtal" }
  ],
  "/arbeitsrecht-anwalt/muenchen": [
    { href: "/arbeitsrecht-anwalt/berlin-mitte", label: "Arbeitsrecht-Anwalt in Berlin-Mitte" },
    { href: "/arbeitsrecht-anwalt/berlin-neukoelln", label: "Arbeitsrecht-Anwalt in Berlin-Neukölln" },
    { href: "/arbeitsrecht-anwalt/frankfurt", label: "Arbeitsrecht-Anwalt in Frankfurt am Main" },
    { href: "/arbeitsrecht-anwalt/berlin-reinickendorf", label: "Arbeitsrecht-Anwalt in Berlin-Reinickendorf" }
  ],
  "/arbeitsrecht-anwalt/muenster": [
    { href: "/arbeitsrecht-anwalt/schwetzingen", label: "Arbeitsrecht-Anwalt in Schwetzingen" },
    { href: "/arbeitsrecht-anwalt/reilingen", label: "Arbeitsrecht-Anwalt in Reilingen" },
    { href: "/arbeitsrecht-anwalt/leimen", label: "Arbeitsrecht-Anwalt in Leimen" },
    { href: "/arbeitsrecht-anwalt/waghaeuseldorf", label: "Arbeitsrecht-Anwalt in Waghäusel" },
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" }
  ],
  "/arbeitsrecht-anwalt/mutterstadt": [
    { href: "/arbeitsrecht-anwalt/lorsch", label: "Arbeitsrecht-Anwalt in Lorsch" }
  ],
  "/arbeitsrecht-anwalt/neckargemuend": [
    { href: "/arbeitsrecht-anwalt/malsch-rhein-neckar", label: "Arbeitsrecht-Anwalt in Malsch (Rhein-Neckar)" },
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" },
    { href: "/arbeitsrecht-anwalt/waghaeuseldorf", label: "Arbeitsrecht-Anwalt in Waghäusel" },
    { href: "/arbeitsrecht-anwalt/dudenhofen", label: "Arbeitsrecht-Anwalt in Dudenhofen" }
  ],
  "/arbeitsrecht-anwalt/neulussheim": [
    { href: "/arbeitsrecht-anwalt/dannstadt-schauernheim", label: "Arbeitsrecht-Anwalt in Dannstadt-Schauernheim" },
    { href: "/arbeitsrecht-anwalt/viernheim", label: "Arbeitsrecht-Anwalt in Viernheim" },
    { href: "/arbeitsrecht-anwalt/bensheim", label: "Arbeitsrecht-Anwalt in Bensheim" },
    { href: "/arbeitsrecht-anwalt/maxdorf", label: "Arbeitsrecht-Anwalt in Maxdorf" },
    { href: "/arbeitsrecht-anwalt/neustadt-weinstrasse", label: "Arbeitsrecht-Anwalt in Neustadt an der Weinstraße" }
  ],
  "/arbeitsrecht-anwalt/neustadt-weinstrasse": [
    { href: "/arbeitsrecht-anwalt/dannstadt-schauernheim", label: "Arbeitsrecht-Anwalt in Dannstadt-Schauernheim" },
    { href: "/arbeitsrecht-anwalt/viernheim", label: "Arbeitsrecht-Anwalt in Viernheim" }
  ],
  "/arbeitsrecht-anwalt/nuernberg": [
    { href: "/arbeitsrecht-anwalt/erfurt", label: "Arbeitsrecht-Anwalt in Erfurt" },
    { href: "/arbeitsrecht-anwalt/mannheim", label: "Arbeitsrecht-Anwalt in Mannheim" },
    { href: "/arbeitsrecht-anwalt/berlin-mitte", label: "Arbeitsrecht-Anwalt in Berlin-Mitte" },
    { href: "/arbeitsrecht-anwalt/weinheim", label: "Arbeitsrecht-Anwalt in Weinheim" },
    { href: "/arbeitsrecht-anwalt/bonn", label: "Arbeitsrecht-Anwalt in Bonn" }
  ],
  "/arbeitsrecht-anwalt/nussloch": [
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" },
    { href: "/arbeitsrecht-anwalt/waghaeuseldorf", label: "Arbeitsrecht-Anwalt in Waghäusel" },
    { href: "/arbeitsrecht-anwalt/lorsch", label: "Arbeitsrecht-Anwalt in Lorsch" }
  ],
  "/arbeitsrecht-anwalt/oberhausen": [
    { href: "/arbeitsrecht-anwalt/altlussheim", label: "Arbeitsrecht-Anwalt in Altlußheim" },
    { href: "/arbeitsrecht-anwalt/oftersheim", label: "Arbeitsrecht-Anwalt in Oftersheim" },
    { href: "/arbeitsrecht-anwalt/eppelheim", label: "Arbeitsrecht-Anwalt in Eppelheim" },
    { href: "/arbeitsrecht-anwalt/meckesheim", label: "Arbeitsrecht-Anwalt in Meckesheim" },
    { href: "/arbeitsrecht-anwalt/hockenheim", label: "Arbeitsrecht-Anwalt in Hockenheim" },
    { href: "/arbeitsrecht-anwalt/angelbachtal", label: "Arbeitsrecht-Anwalt in Angelbachtal" },
    { href: "/arbeitsrecht-anwalt/sandhausen", label: "Arbeitsrecht-Anwalt in Sandhausen" }
  ],
  "/arbeitsrecht-anwalt/oftersheim": [
    { href: "/arbeitsrecht-anwalt/viernheim", label: "Arbeitsrecht-Anwalt in Viernheim" },
    { href: "/arbeitsrecht-anwalt/altlussheim", label: "Arbeitsrecht-Anwalt in Altlußheim" },
    { href: "/arbeitsrecht-anwalt/meckesheim", label: "Arbeitsrecht-Anwalt in Meckesheim" },
    { href: "/arbeitsrecht-anwalt/dielheim", label: "Arbeitsrecht-Anwalt in Dielheim" },
    { href: "/arbeitsrecht-anwalt/neulussheim", label: "Arbeitsrecht-Anwalt in Neulußheim" },
    { href: "/arbeitsrecht-anwalt/heddesheim", label: "Arbeitsrecht-Anwalt in Heddesheim" },
    { href: "/arbeitsrecht-anwalt/dossenheim", label: "Arbeitsrecht-Anwalt in Dossenheim" },
    { href: "/arbeitsrecht-anwalt/weinheim", label: "Arbeitsrecht-Anwalt in Weinheim" },
    { href: "/arbeitsrecht-anwalt/dannstadt-schauernheim", label: "Arbeitsrecht-Anwalt in Dannstadt-Schauernheim" },
    { href: "/arbeitsrecht-anwalt/hockenheim", label: "Arbeitsrecht-Anwalt in Hockenheim" },
    { href: "/arbeitsrecht-anwalt/schriesheim", label: "Arbeitsrecht-Anwalt in Schriesheim" },
    { href: "/arbeitsrecht-anwalt/heppenheim", label: "Arbeitsrecht-Anwalt in Heppenheim (Bergstraße)" },
    { href: "/arbeitsrecht-anwalt/ilvesheim", label: "Arbeitsrecht-Anwalt in Ilvesheim" },
    { href: "/arbeitsrecht-anwalt/eppelheim", label: "Arbeitsrecht-Anwalt in Eppelheim" },
    { href: "/arbeitsrecht-anwalt/bensheim", label: "Arbeitsrecht-Anwalt in Bensheim" },
    { href: "/arbeitsrecht-anwalt/sinsheim", label: "Arbeitsrecht-Anwalt in Sinsheim" },
    { href: "/arbeitsrecht-anwalt/edingen-neckarhausen", label: "Arbeitsrecht-Anwalt in Edingen-Neckarhausen" },
    { href: "/arbeitsrecht-anwalt/lampertheim", label: "Arbeitsrecht-Anwalt in Lampertheim" },
    { href: "/arbeitsrecht-anwalt/frankenthal", label: "Arbeitsrecht-Anwalt in Frankenthal (Pfalz)" },
    { href: "/arbeitsrecht-anwalt/sandhausen", label: "Arbeitsrecht-Anwalt in Sandhausen" }
  ],
  "/arbeitsrecht-anwalt/philippsburg": [
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" }
  ],
  "/arbeitsrecht-anwalt/plankstadt": [
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" },
    { href: "/arbeitsrecht-anwalt/waghaeuseldorf", label: "Arbeitsrecht-Anwalt in Waghäusel" },
    { href: "/arbeitsrecht-anwalt/mutterstadt", label: "Arbeitsrecht-Anwalt in Mutterstadt" },
    { href: "/arbeitsrecht-anwalt/meckesheim", label: "Arbeitsrecht-Anwalt in Meckesheim" },
    { href: "/arbeitsrecht-anwalt/schifferstadt", label: "Arbeitsrecht-Anwalt in Schifferstadt" }
  ],
  "/arbeitsrecht-anwalt/reilingen": [
    { href: "/arbeitsrecht-anwalt/leimen", label: "Arbeitsrecht-Anwalt in Leimen" },
    { href: "/arbeitsrecht-anwalt/waghaeuseldorf", label: "Arbeitsrecht-Anwalt in Waghäusel" },
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" },
    { href: "/arbeitsrecht-anwalt/lorsch", label: "Arbeitsrecht-Anwalt in Lorsch" },
    { href: "/arbeitsrecht-anwalt/schifferstadt", label: "Arbeitsrecht-Anwalt in Schifferstadt" }
  ],
  "/arbeitsrecht-anwalt/roemerberg": [
    { href: "/arbeitsrecht-anwalt/viernheim", label: "Arbeitsrecht-Anwalt in Viernheim" }
  ],
  "/arbeitsrecht-anwalt/rostock": [
    { href: "/arbeitsrecht-anwalt/lorsch", label: "Arbeitsrecht-Anwalt in Lorsch" },
    { href: "/arbeitsrecht-anwalt/waghaeuseldorf", label: "Arbeitsrecht-Anwalt in Waghäusel" },
    { href: "/arbeitsrecht-anwalt/leimen", label: "Arbeitsrecht-Anwalt in Leimen" },
    { href: "/arbeitsrecht-anwalt/ketsch", label: "Arbeitsrecht-Anwalt in Ketsch" },
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" },
    { href: "/arbeitsrecht-anwalt/speyer", label: "Arbeitsrecht-Anwalt in Speyer" }
  ],
  "/arbeitsrecht-anwalt/sandhausen": [
    { href: "/arbeitsrecht-anwalt/weinheim", label: "Arbeitsrecht-Anwalt in Weinheim" },
    { href: "/arbeitsrecht-anwalt/meckesheim", label: "Arbeitsrecht-Anwalt in Meckesheim" },
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" }
  ],
  "/arbeitsrecht-anwalt/schifferstadt": [
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" }
  ],
  "/arbeitsrecht-anwalt/schriesheim": [
    { href: "/arbeitsrecht-anwalt/dannstadt-schauernheim", label: "Arbeitsrecht-Anwalt in Dannstadt-Schauernheim" },
    { href: "/arbeitsrecht-anwalt/viernheim", label: "Arbeitsrecht-Anwalt in Viernheim" },
    { href: "/arbeitsrecht-anwalt/meckesheim", label: "Arbeitsrecht-Anwalt in Meckesheim" },
    { href: "/arbeitsrecht-anwalt/altlussheim", label: "Arbeitsrecht-Anwalt in Altlußheim" }
  ],
  "/arbeitsrecht-anwalt/schwetzingen": [
    { href: "/arbeitsrecht-anwalt/leimen", label: "Arbeitsrecht-Anwalt in Leimen" },
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" },
    { href: "/arbeitsrecht-anwalt/lorsch", label: "Arbeitsrecht-Anwalt in Lorsch" },
    { href: "/arbeitsrecht-anwalt/waghaeuseldorf", label: "Arbeitsrecht-Anwalt in Waghäusel" },
    { href: "/arbeitsrecht-anwalt/reilingen", label: "Arbeitsrecht-Anwalt in Reilingen" },
    { href: "/arbeitsrecht-anwalt/dudenhofen", label: "Arbeitsrecht-Anwalt in Dudenhofen" },
    { href: "/arbeitsrecht-anwalt/mutterstadt", label: "Arbeitsrecht-Anwalt in Mutterstadt" },
    { href: "/arbeitsrecht-anwalt/ladenburg", label: "Arbeitsrecht-Anwalt in Ladenburg" },
    { href: "/arbeitsrecht-anwalt/philippsburg", label: "Arbeitsrecht-Anwalt in Philippsburg" },
    { href: "/arbeitsrecht-anwalt/malsch-rhein-neckar", label: "Arbeitsrecht-Anwalt in Malsch (Rhein-Neckar)" },
    { href: "/arbeitsrecht-anwalt/edingen-neckarhausen", label: "Arbeitsrecht-Anwalt in Edingen-Neckarhausen" },
    { href: "/arbeitsrecht-anwalt/roemerberg", label: "Arbeitsrecht-Anwalt in Römerberg" },
    { href: "/arbeitsrecht-anwalt/plankstadt", label: "Arbeitsrecht-Anwalt in Plankstadt" }
  ],
  "/arbeitsrecht-anwalt/sinsheim": [
    { href: "/arbeitsrecht-anwalt/viernheim", label: "Arbeitsrecht-Anwalt in Viernheim" },
    { href: "/arbeitsrecht-anwalt/dielheim", label: "Arbeitsrecht-Anwalt in Dielheim" },
    { href: "/arbeitsrecht-anwalt/altlussheim", label: "Arbeitsrecht-Anwalt in Altlußheim" }
  ],
  "/arbeitsrecht-anwalt/speyer": [
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" }
  ],
  "/arbeitsrecht-anwalt/st-leon-rot": [
    { href: "/arbeitsrecht-anwalt/leimen", label: "Arbeitsrecht-Anwalt in Leimen" },
    { href: "/arbeitsrecht-anwalt/waghaeuseldorf", label: "Arbeitsrecht-Anwalt in Waghäusel" },
    { href: "/arbeitsrecht-anwalt/mutterstadt", label: "Arbeitsrecht-Anwalt in Mutterstadt" },
    { href: "/arbeitsrecht-anwalt/dudenhofen", label: "Arbeitsrecht-Anwalt in Dudenhofen" }
  ],
  "/arbeitsrecht-anwalt/stuttgart": [
    { href: "/arbeitsrecht-anwalt/erfurt", label: "Arbeitsrecht-Anwalt in Erfurt" },
    { href: "/arbeitsrecht-anwalt/duesseldorf", label: "Arbeitsrecht-Anwalt in Düsseldorf" },
    { href: "/arbeitsrecht-anwalt/dortmund", label: "Arbeitsrecht-Anwalt in Dortmund" },
    { href: "/arbeitsrecht-anwalt/weinheim", label: "Arbeitsrecht-Anwalt in Weinheim" },
    { href: "/arbeitsrecht-anwalt/aachen", label: "Arbeitsrecht-Anwalt in Aachen" },
    { href: "/arbeitsrecht-anwalt/freiburg", label: "Arbeitsrecht-Anwalt in Freiburg im Breisgau" },
    { href: "/arbeitsrecht-anwalt/karlsruhe", label: "Arbeitsrecht-Anwalt in Karlsruhe" }
  ],
  "/arbeitsrecht-anwalt/viernheim": [
    { href: "/arbeitsrecht-anwalt/bensheim", label: "Arbeitsrecht-Anwalt in Bensheim" },
    { href: "/arbeitsrecht-anwalt/lampertheim", label: "Arbeitsrecht-Anwalt in Lampertheim" }
  ],
  "/arbeitsrecht-anwalt/waghaeuseldorf": [
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" },
    { href: "/arbeitsrecht-anwalt/lorsch", label: "Arbeitsrecht-Anwalt in Lorsch" },
    { href: "/arbeitsrecht-anwalt/dudenhofen", label: "Arbeitsrecht-Anwalt in Dudenhofen" },
    { href: "/arbeitsrecht-anwalt/mutterstadt", label: "Arbeitsrecht-Anwalt in Mutterstadt" },
    { href: "/arbeitsrecht-anwalt/limburgerhof", label: "Arbeitsrecht-Anwalt in Limburgerhof" },
    { href: "/arbeitsrecht-anwalt/schifferstadt", label: "Arbeitsrecht-Anwalt in Schifferstadt" },
    { href: "/arbeitsrecht-anwalt/speyer", label: "Arbeitsrecht-Anwalt in Speyer" }
  ],
  "/arbeitsrecht-anwalt/walldorf": [
    { href: "/arbeitsrecht-anwalt/maxdorf", label: "Arbeitsrecht-Anwalt in Maxdorf" },
    { href: "/arbeitsrecht-anwalt/weinheim", label: "Arbeitsrecht-Anwalt in Weinheim" },
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" },
    { href: "/arbeitsrecht-anwalt/altlussheim", label: "Arbeitsrecht-Anwalt in Altlußheim" },
    { href: "/arbeitsrecht-anwalt/meckesheim", label: "Arbeitsrecht-Anwalt in Meckesheim" }
  ],
  "/arbeitsrecht-anwalt/weinheim": [
    { href: "/arbeitsrecht-anwalt/altlussheim", label: "Arbeitsrecht-Anwalt in Altlußheim" },
    { href: "/arbeitsrecht-anwalt/viernheim", label: "Arbeitsrecht-Anwalt in Viernheim" },
    { href: "/arbeitsrecht-anwalt/meckesheim", label: "Arbeitsrecht-Anwalt in Meckesheim" },
    { href: "/arbeitsrecht-anwalt/lorsch", label: "Arbeitsrecht-Anwalt in Lorsch" },
    { href: "/arbeitsrecht-anwalt/neulussheim", label: "Arbeitsrecht-Anwalt in Neulußheim" },
    { href: "/arbeitsrecht-anwalt/maxdorf", label: "Arbeitsrecht-Anwalt in Maxdorf" },
    { href: "/arbeitsrecht-anwalt/boehl-iggelheim", label: "Arbeitsrecht-Anwalt in Böhl-Iggelheim" },
    { href: "/arbeitsrecht-anwalt/hirschberg-bergstrasse", label: "Arbeitsrecht-Anwalt in Hirschberg an der Bergstraße" },
    { href: "/arbeitsrecht-anwalt/malsch-rhein-neckar", label: "Arbeitsrecht-Anwalt in Malsch (Rhein-Neckar)" },
    { href: "/arbeitsrecht-anwalt/bad-duerkheim", label: "Arbeitsrecht-Anwalt in Bad Dürkheim" },
    { href: "/arbeitsrecht-anwalt/roemerberg", label: "Arbeitsrecht-Anwalt in Römerberg" },
    { href: "/arbeitsrecht-anwalt/muehlhausen-rhein-neckar", label: "Arbeitsrecht-Anwalt in Mühlhausen (Rhein-Neckar)" }
  ],
  "/arbeitsrecht-anwalt/wiesbaden": [
    { href: "/arbeitsrecht-anwalt/wiesloch", label: "Arbeitsrecht-Anwalt in Wiesloch" },
    { href: "/arbeitsrecht-anwalt/lorsch", label: "Arbeitsrecht-Anwalt in Lorsch" },
    { href: "/arbeitsrecht-anwalt/schwetzingen", label: "Arbeitsrecht-Anwalt in Schwetzingen" },
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" },
    { href: "/arbeitsrecht-anwalt/weinheim", label: "Arbeitsrecht-Anwalt in Weinheim" },
    { href: "/arbeitsrecht-anwalt/moenchengladbach", label: "Arbeitsrecht-Anwalt in Mönchengladbach" }
  ],
  "/arbeitsrecht-anwalt/wiesloch": [
    { href: "/arbeitsrecht-anwalt/lorsch", label: "Arbeitsrecht-Anwalt in Lorsch" },
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" },
    { href: "/arbeitsrecht-anwalt/waghaeuseldorf", label: "Arbeitsrecht-Anwalt in Waghäusel" }
  ],
  "/arbeitsrecht-anwalt/wuppertal": [
    { href: "/arbeitsrecht-anwalt/braunschweig", label: "Arbeitsrecht-Anwalt in Braunschweig" },
    { href: "/arbeitsrecht-anwalt/schwetzingen", label: "Arbeitsrecht-Anwalt in Schwetzingen" },
    { href: "/arbeitsrecht-anwalt/waghaeuseldorf", label: "Arbeitsrecht-Anwalt in Waghäusel" },
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" },
    { href: "/arbeitsrecht-anwalt/mutterstadt", label: "Arbeitsrecht-Anwalt in Mutterstadt" }
  ],
  "/aufhebungsvertrag": [
    { href: "/urteile/bag-6-azr-333-21-aufhebungsvertrag-faires-verhandeln", label: "Aufhebungsvertrag — Gebot fairen Verhandelns" },
    { href: "/aufhebungsvertrag-pruefen", label: "Aufhebungsvertrag prüfen — Ist Ihr Vertrag fair?" }
  ],
  "/aufhebungsvertrag-pruefen": [
    { href: "/urteile/bag-6-azr-333-21-aufhebungsvertrag-faires-verhandeln", label: "Aufhebungsvertrag — Gebot fairen Verhandelns" },
    { href: "/aufhebungsvertrag/aufhebungsvertrag-vor-nachteile", label: "Aufhebungsvertrag Vor- und Nachteile" },
    { href: "/ratgeber/muster/checkliste-aufhebungsvertrag", label: "Checkliste: Aufhebungsvertrag prüfen" }
  ],
  "/aufhebungsvertrag/aufhebungsvertrag-abfindung": [
    { href: "/urteile/bag-6-azr-333-21-aufhebungsvertrag-faires-verhandeln", label: "Aufhebungsvertrag — Gebot fairen Verhandelns" }
  ],
  "/aufhebungsvertrag/aufhebungsvertrag-ablehnen": [
    { href: "/urteile/bag-6-azr-333-21-aufhebungsvertrag-faires-verhandeln", label: "Aufhebungsvertrag — Gebot fairen Verhandelns" }
  ],
  "/aufhebungsvertrag/aufhebungsvertrag-muster": [
    { href: "/ratgeber/muster/checkliste-aufhebungsvertrag", label: "Checkliste: Aufhebungsvertrag prüfen" }
  ],
  "/aufhebungsvertrag/aufhebungsvertrag-vor-nachteile": [
    { href: "/urteile/bag-6-azr-333-21-aufhebungsvertrag-faires-verhandeln", label: "Aufhebungsvertrag — Gebot fairen Verhandelns" }
  ],
  "/aufhebungsvertrag/aufhebungsvertrag-widerruf": [
    { href: "/urteile/bag-6-azr-333-21-aufhebungsvertrag-faires-verhandeln", label: "Aufhebungsvertrag — Gebot fairen Verhandelns" }
  ],
  "/fristlose-kuendigung-nach-1-jahr-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-28-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 28 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-26-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 26 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-12-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 12 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-36-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 36 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-37-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 37 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-6-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 6 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-3-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 3 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-10-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-12-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 12 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-13-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 13 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-11-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-13-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 13 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-14-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 14 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-12-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-14-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 14 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-15-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 15 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-13-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-15-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 15 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-17-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 17 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-14-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-22-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 22 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-16-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 16 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-15-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-17-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 17 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-16-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-23-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 23 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-29-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 29 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-17-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-19-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 19 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-18-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-22-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 22 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-26-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 26 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-36-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 36 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-25-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 25 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-19-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-22-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 22 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-21-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 21 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-26-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 26 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-2-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-28-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 28 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-22-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 22 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-38-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 38 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-12-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 12 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-20-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-25-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 25 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-22-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 22 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-40-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 40 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-21-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-27-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 27 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-26-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 26 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-25-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 25 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-24-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 24 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-22-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-28-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 28 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-26-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 26 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-27-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 27 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-38-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 38 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-23-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-33-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 33 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-34-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 34 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-30-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 30 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-27-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 27 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-29-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 29 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-24-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-36-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 36 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-26-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 26 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-35-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 35 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-25-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-36-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 36 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-35-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 35 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-26-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-36-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 36 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-28-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 28 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-37-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 37 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-35-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 35 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-27-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-37-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 37 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-36-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 36 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-38-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 38 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-28-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-38-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 38 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-37-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 37 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-36-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 36 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-32-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 32 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-39-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 39 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-31-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 31 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-40-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 40 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-29-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-39-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 39 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-33-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 33 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-34-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 34 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-31-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 31 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-32-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 32 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-40-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 40 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-3-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-33-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 33 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-23-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 23 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-30-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 30 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-30-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-33-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 33 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-39-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 39 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-31-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-34-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 34 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-33-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 33 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-32-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-34-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 34 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-39-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 39 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-38-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 38 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-33-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-39-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 39 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-34-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-36-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 36 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-37-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-39-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 39 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-38-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-40-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 40 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-4-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-35-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 35 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-36-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 36 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-24-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 24 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-5-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-7-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 7 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-36-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 36 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-6-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-8-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 8 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-11-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 11 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-7-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-12-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 12 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-11-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 11 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-13-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 13 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-9-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 9 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-8-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-11-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 11 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-12-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 12 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-13-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 13 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/fristlose-kuendigung-nach-9-jahren-betriebszugehoerigkeit": [
    { href: "/fristlose-kuendigung-nach-11-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 11 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-12-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 12 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/gekuendigt-nach-1-jahr-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-36-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 36 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-28-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 28 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-26-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 26 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-29-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 29 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-10-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-12-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 12 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-11-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-13-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 13 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-14-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 14 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-12-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-14-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 14 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-15-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 15 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-13-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-15-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 15 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-17-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 17 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-14-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-16-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 16 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-15-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-17-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 17 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-16-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-23-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 23 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-29-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 29 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-17-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-19-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 19 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-18-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-22-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 22 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-36-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 36 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-26-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 26 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-19-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-21-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 21 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-22-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 22 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-26-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 26 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-2-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-38-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 38 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-28-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 28 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-20-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-25-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 25 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-40-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 40 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-22-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 22 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-24-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 24 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-21-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-27-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 27 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-26-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 26 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-25-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 25 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-24-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 24 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-22-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-28-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 28 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-26-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 26 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-27-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 27 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-24-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 24 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-23-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-33-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 33 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-34-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 34 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-29-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 29 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-27-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 27 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-30-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 30 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-24-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-26-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 26 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-36-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 36 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-35-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 35 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-25-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-36-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 36 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-35-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 35 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-26-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-36-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 36 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-28-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 28 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-37-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 37 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-35-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 35 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-27-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-33-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 33 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-28-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-38-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 38 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-37-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 37 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-32-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 32 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-39-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 39 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-31-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 31 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-29-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-39-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 39 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-33-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 33 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-34-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 34 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-31-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 31 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-32-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 32 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-37-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 37 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-38-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 38 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-40-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 40 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-3-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-23-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 23 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-33-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 33 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-30-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-33-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 33 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-39-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 39 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-31-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-34-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 34 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-33-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 33 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-32-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-34-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 34 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-38-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 38 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-33-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-36-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 36 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-39-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 39 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-34-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-36-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 36 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-35-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-40-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 40 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-37-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-39-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 39 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-38-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-40-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 40 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-4-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-35-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 35 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-36-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 36 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-24-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 24 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-5-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-7-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 7 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-36-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 36 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/kuendigung/kuendigung-fuenf-jahre-vor-rente", label: "Kündigung 5 Jahre vor der Rente — Ihre Rechte" }
  ],
  "/gekuendigt-nach-6-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-8-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 8 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-11-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 11 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-7-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-11-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 11 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-12-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 12 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-13-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 13 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-9-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 9 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-8-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-11-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 11 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-12-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 12 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-13-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 13 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/gekuendigt-nach-9-jahren-betriebszugehoerigkeit": [
    { href: "/gekuendigt-nach-11-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 11 Jahren Betriebszugehörigkeit — was jetzt?" },
    { href: "/gekuendigt-nach-12-jahren-betriebszugehoerigkeit", label: "Gekündigt nach 12 Jahren Betriebszugehörigkeit — was jetzt?" }
  ],
  "/glossar": [
    { href: "/arbeitsrecht-anwalt/leimen", label: "Arbeitsrecht-Anwalt in Leimen" },
    { href: "/arbeitsrecht-anwalt/waghaeuseldorf", label: "Arbeitsrecht-Anwalt in Waghäusel" },
    { href: "/arbeitsrecht-anwalt/ketsch", label: "Arbeitsrecht-Anwalt in Ketsch" },
    { href: "/arbeitsrecht-anwalt/schwetzingen", label: "Arbeitsrecht-Anwalt in Schwetzingen" },
    { href: "/arbeitsrecht-anwalt/lorsch", label: "Arbeitsrecht-Anwalt in Lorsch" },
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" },
    { href: "/arbeitsrecht-anwalt/mutterstadt", label: "Arbeitsrecht-Anwalt in Mutterstadt" }
  ],
  "/kuendigung": [
    { href: "/kuendigung-nach-einer-abmahnung", label: "Kündigung nach einer Abmahnung — wirksam oder nicht?" },
    { href: "/kuendigung-nach-zwei-abmahnungen", label: "Kündigung nach zwei Abmahnungen — wirksam oder nicht?" },
    { href: "/kuendigung-nach-vier-abmahnungen", label: "Kündigung nach vier Abmahnungen — wirksam oder nicht?" },
    { href: "/kuendigung-nach-fuenf-abmahnungen", label: "Kündigung nach fünf Abmahnungen — wirksam oder nicht?" },
    { href: "/kuendigung-nach-drei-abmahnungen", label: "Kündigung nach drei Abmahnungen — wirksam oder nicht?" }
  ],
  "/kuendigung-nach-drei-abmahnungen": [
    { href: "/kuendigung/kuendigung-krankschreibung", label: "Kündigung während Krankschreibung — was tun?" },
    { href: "/kuendigung/kuendigung-betriebsuebergang", label: "Kündigung nach Betriebsübergang — Ihre Rechte" },
    { href: "/fristlose-kuendigung-nach-3-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 3 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/kuendigung-nach-einer-abmahnung": [
    { href: "/kuendigung/kuendigung-krankschreibung", label: "Kündigung während Krankschreibung — was tun?" },
    { href: "/kuendigung/kuendigung-betriebsuebergang", label: "Kündigung nach Betriebsübergang — Ihre Rechte" },
    { href: "/kuendigung/kuendigung-betriebsrat", label: "Kündigung als Betriebsratsmitglied" },
    { href: "/kuendigung/kuendigung-ausbildung", label: "Kündigung in der Ausbildung — was gilt?" },
    { href: "/kuendigung/kuendigung-teilzeit", label: "Kündigung in Teilzeit — was tun?" },
    { href: "/kuendigung/kuendigung-nach-elternzeit", label: "Kündigung nach der Elternzeit — was tun?" }
  ],
  "/kuendigung-nach-fuenf-abmahnungen": [
    { href: "/kuendigung/kuendigung-krankschreibung", label: "Kündigung während Krankschreibung — was tun?" },
    { href: "/kuendigung/kuendigung-betriebsuebergang", label: "Kündigung nach Betriebsübergang — Ihre Rechte" },
    { href: "/fristlose-kuendigung-nach-6-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 6 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/kuendigung-nach-vier-abmahnungen": [
    { href: "/kuendigung/kuendigung-krankschreibung", label: "Kündigung während Krankschreibung — was tun?" },
    { href: "/kuendigung/kuendigung-betriebsuebergang", label: "Kündigung nach Betriebsübergang — Ihre Rechte" },
    { href: "/fristlose-kuendigung-nach-4-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 4 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/kuendigung-nach-zwei-abmahnungen": [
    { href: "/kuendigung/kuendigung-krankschreibung", label: "Kündigung während Krankschreibung — was tun?" },
    { href: "/kuendigung/kuendigung-betriebsuebergang", label: "Kündigung nach Betriebsübergang — Ihre Rechte" },
    { href: "/fristlose-kuendigung-nach-2-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 2 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/kuendigung/kuendigung-betriebsrat": [
    { href: "/kuendigung/kuendigung-fuehrungskraft", label: "Kündigung als Führungskraft — besondere Regeln" }
  ],
  "/kuendigung/kuendigung-betriebsuebergang": [
    { href: "/fristlose-kuendigung-nach-37-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 37 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-11-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 11 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-28-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 28 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-26-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 26 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-29-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 29 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-36-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 36 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-7-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 7 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/kuendigung/kuendigung-krankschreibung": [
    { href: "/fristlose-kuendigung-nach-26-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 26 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-36-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 36 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-37-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 37 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-28-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 28 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/kuendigung/kuendigung-teilzeit", label: "Kündigung in Teilzeit — was tun?" }
  ],
  "/kuendigung/kuendigung-kurz-vor-rente": [
    { href: "/kuendigung/kuendigung-fuenf-jahre-vor-rente", label: "Kündigung 5 Jahre vor der Rente — Ihre Rechte" },
    { href: "/kuendigung/kuendigung-zwei-jahre-vor-rente", label: "Kündigung 2 Jahre vor der Rente — was tun?" }
  ],
  "/kuendigung/kuendigung-probezeit": [
    { href: "/fristlose-kuendigung-nach-6-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 6 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/kuendigung/kuendigung-betriebsuebergang", label: "Kündigung nach Betriebsübergang — Ihre Rechte" }
  ],
  "/kuendigung/kuendigung-schwerbehinderung": [
    { href: "/fristlose-kuendigung-nach-11-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 11 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-9-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 9 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-29-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 29 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/kuendigung/kuendigung-teilzeit": [
    { href: "/fristlose-kuendigung-nach-2-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 2 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-6-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 6 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-26-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 26 Jahren Betriebszugehörigkeit — wirksam oder nicht?" },
    { href: "/fristlose-kuendigung-nach-12-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 12 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/kuendigung/kuendigung-zwei-jahre-vor-rente": [
    { href: "/kuendigung/kuendigung-fuenf-jahre-vor-rente", label: "Kündigung 5 Jahre vor der Rente — Ihre Rechte" },
    { href: "/fristlose-kuendigung-nach-2-jahren-betriebszugehoerigkeit", label: "Fristlose Kündigung nach 2 Jahren Betriebszugehörigkeit — wirksam oder nicht?" }
  ],
  "/ratgeber": [
    { href: "/arbeitsrecht-anwalt/leimen", label: "Arbeitsrecht-Anwalt in Leimen" },
    { href: "/arbeitsrecht-anwalt/waghaeuseldorf", label: "Arbeitsrecht-Anwalt in Waghäusel" },
    { href: "/arbeitsrecht-anwalt/schwetzingen", label: "Arbeitsrecht-Anwalt in Schwetzingen" },
    { href: "/arbeitsrecht-anwalt/ketsch", label: "Arbeitsrecht-Anwalt in Ketsch" },
    { href: "/arbeitsrecht-anwalt/lorsch", label: "Arbeitsrecht-Anwalt in Lorsch" },
    { href: "/arbeitsrecht-anwalt/hassloch", label: "Arbeitsrecht-Anwalt in Haßloch" },
    { href: "/arbeitsrecht-anwalt/mutterstadt", label: "Arbeitsrecht-Anwalt in Mutterstadt" },
    { href: "/arbeitsrecht-anwalt/reilingen", label: "Arbeitsrecht-Anwalt in Reilingen" },
    { href: "/arbeitsrecht-anwalt/dudenhofen", label: "Arbeitsrecht-Anwalt in Dudenhofen" }
  ],
  "/ratgeber/urteile": [
    { href: "/kuendigung-nach-einer-abmahnung", label: "Kündigung nach einer Abmahnung — wirksam oder nicht?" },
    { href: "/kuendigung/kuendigung-krankschreibung", label: "Kündigung während Krankschreibung — was tun?" }
  ]
};
