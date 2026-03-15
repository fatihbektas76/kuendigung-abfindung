# Projekt: German Litigation Lawyer Website

## Übersicht
Erstelle ein vollständiges Next.js 14 Projekt für die Kanzlei-Website **german-litigation-lawyer.com**. 
Die Seite richtet sich an US/UK-Unternehmen, die Rechtsstreitigkeiten in Deutschland haben und einen 
in Deutschland zugelassenen Anwalt brauchen. Die zweite Domain **sue-in-germany.com** soll per 301-Redirect 
auf die Hauptdomain weiterleiten.

## Technologie-Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- MDX für Blog-Posts (via next-mdx-remote oder @next/mdx)
- Deployment: Vercel

## Projektstruktur

```
/
├── app/
│   ├── layout.tsx              (Root Layout mit Nav, Footer, Cookie Banner)
│   ├── page.tsx                (Landingpage — alle Sektionen)
│   ├── blog/
│   │   ├── page.tsx            (Blog-Übersicht)
│   │   └── [slug]/
│   │       └── page.tsx        (Einzelner Blogpost)
│   ├── legal-notice/
│   │   └── page.tsx            (Impressum)
│   └── privacy-policy/
│       └── page.tsx            (Datenschutz)
├── components/
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── CookieBanner.tsx
│   ├── Hero.tsx
│   ├── Situations.tsx          (Plaintiff vs Defendant)
│   ├── Disputes.tsx            (Practice Areas)
│   ├── Process.tsx             (How It Works)
│   ├── Tools.tsx               (Free Tools)
│   ├── AttorneyProfile.tsx
│   ├── FAQ.tsx
│   ├── BlogPreview.tsx
│   ├── ContactForm.tsx         (mit Brevo-Integration)
│   └── CTA.tsx
├── content/
│   └── blog/
│       ├── how-german-courts-work.mdx
│       ├── enforcing-us-judgment-in-germany.mdx
│       └── firing-employee-germany-guide.mdx
├── lib/
│   ├── blog.ts                 (Blog-Hilfsfunktionen: getPosts, getPostBySlug)
│   └── brevo.ts                (Brevo API Hilfsfunktionen)
├── app/api/
│   └── contact/
│       └── route.ts            (Server-Side API Route für Kontaktformular → Brevo)
├── public/
│   ├── logo.png                (Platzhalter — später ersetzen)
│   └── fatih-bektas.jpg        (Platzhalter — später ersetzen)
├── next.config.js
├── tailwind.config.ts
├── vercel.json
├── next-sitemap.config.js
└── package.json
```

## Wichtige Anforderungen

### 1. Design & Styling
Verwende exakt das Design aus der mitgelieferten index.html:
- Farbschema: Gold (#A68B4B), Cream (#FAF8F3), Ink (#1A1A1A)
- Fonts: Playfair Display (Serif, Headlines) + Source Sans 3 (Sans, Body)
- Gleiche Abstände, Border-Radii, Hover-Effekte, Scroll-Animationen
- Mobile-responsive mit Hamburger-Menu

### 2. SEO
- Alle Schema.org JSON-LD Markups aus der index.html übernehmen (LegalService, Attorney, FAQPage)
- Für Blog-Posts: Article + BreadcrumbList Schema
- Dynamische Meta-Tags pro Seite (title, description, og:title, og:description)
- Canonical URLs auf https://www.german-litigation-lawyer.com
- next-sitemap für automatische Sitemap-Generierung
- robots.txt

### 3. Blog-System
- Posts als .mdx Dateien in /content/blog/
- Frontmatter: title, date, description, category, author, slug, featured
- Blog-Übersichtsseite mit Kategorie-Filter
- Einzelne Postseite mit Inhaltsverzeichnis und CTA am Ende
- RSS-Feed (/feed.xml)

### 4. Kontaktformular (Server-Side!)
WICHTIG: Das Kontaktformular muss über eine Next.js API Route laufen (app/api/contact/route.ts),
NICHT direkt aus dem Frontend. Der Brevo API Key darf NIE im Client-Code stehen.

Felder: Name*, Email*, Company, Phone, Dispute Type (Dropdown), Dispute Value (Dropdown), Message*

Die API Route soll:
1. Kontakt in Brevo erstellen (POST /v3/contacts)
2. Benachrichtigungs-Email an bektas@apos.legal senden (POST /v3/smtp/email)
3. Validierung und Error Handling

Environment Variables (in .env.local):
```
BREVO_API_KEY=your_key_here
NEXT_PUBLIC_GA_ID=your_ga_id_here
BREVO_CLIENT_KEY=your_brevo_tracking_key_here
```

### 5. Cookie Banner (DSGVO-konform)
- Banner erscheint beim ersten Besuch
- Drei Optionen: Accept All, Necessary Only, Customize
- Google Analytics und Brevo Tracking NUR nach Consent laden
- Consent in localStorage speichern (NICHT in Cookies — ironisch, aber korrekt für die Consent-Entscheidung)
- "Cookie Settings" Link im Footer zum erneuten Öffnen

### 6. Vercel Konfiguration

vercel.json:
```json
{
  "redirects": [
    {
      "source": "/(.*)",
      "has": [{ "type": "host", "value": "sue-in-germany.com" }],
      "destination": "https://www.german-litigation-lawyer.com/$1",
      "permanent": true
    },
    {
      "source": "/(.*)",
      "has": [{ "type": "host", "value": "www.sue-in-germany.com" }],
      "destination": "https://www.german-litigation-lawyer.com/$1",
      "permanent": true
    },
    {
      "source": "/(.*)",
      "has": [{ "type": "host", "value": "german-litigation-lawyer.com" }],
      "destination": "https://www.german-litigation-lawyer.com/$1",
      "permanent": true
    }
  ]
}
```

### 7. Beispiel Blog-Posts
Erstelle diese 3 Blog-Posts als echte, ausführliche Artikel (je 1500-2000 Wörter):

**how-german-courts-work.mdx**
- Titel: "How German Courts Work: A Practical Guide for US & UK Businesses"
- Vergleich deutsches vs. US/UK Rechtssystem
- Gerichtsstruktur (AG, LG, OLG, BGH)
- Kein Discovery, kein Jury, Loser-Pays
- Typischer Ablauf eines Verfahrens

**enforcing-us-judgment-in-germany.mdx**
- Titel: "Enforcing a US Judgment in Germany: Your Options When There's No Treaty"
- Warum US-Urteile nicht direkt vollstreckbar sind
- Exequaturverfahren
- Alternative: neu klagen in Deutschland
- UK-Urteile post-Brexit

**firing-employee-germany-guide.mdx**
- Titel: "Fired Your German Employee? Why You Might Get Sued — And How to Win"
- Kündigungsschutzgesetz
- 3-Wochen-Frist für Kündigungsschutzklage
- Abfindungen
- Typische Fehler ausländischer Arbeitgeber

### 8. Impressum & Datenschutz
Verwende den Inhalt aus den mitgelieferten legal-notice.html und privacy-policy.html.
Integriere sie als eigene Seiten mit dem gleichen Layout (Nav + Footer).

---

## Inhalt der Seite

Der gesamte Inhalt, das Design und die Struktur sind in der mitgelieferten index.html Datei.
Wandle jede Sektion in eine eigene React-Komponente um.

Die legal-notice.html und privacy-policy.html enthalten das Impressum und die Datenschutzerklärung.

