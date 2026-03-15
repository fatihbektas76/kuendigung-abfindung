const BASE_URL = "https://www.german-litigation-lawyer.com";

// ─── Shared entities ────────────────────────────────────────────────────────

export const organizationEntity = {
  "@type": ["LegalService", "Organization"],
  "@id": `${BASE_URL}/#organization`,
  name: "APOS Legal",
  legalName: "APOS Legal Rechtsanwaltsgesellschaft mbH & Co. KG",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo.png`,
  },
  image: `${BASE_URL}/Fatih.png`,
  description:
    "English-speaking German litigation law firm representing US and UK companies in German courts and arbitration proceedings.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Am Paradeplatz 20",
    postalCode: "69126",
    addressLocality: "Heidelberg",
    addressCountry: "DE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 49.3988,
    longitude: 8.6724,
  },
  telephone: "+4915127003173",
  email: "bektas@apos.legal",
  sameAs: [
    "https://www.linkedin.com/company/105863455",
    "https://apos.legal",
    "https://www.anwalt.de/bektas",
  ],
  areaServed: ["US", "GB", "EU"],
  availableLanguage: ["English", "German", "Turkish"],
  priceRange: "$$",
  knowsAbout: [
    "German commercial litigation",
    "Employment law Germany",
    "Shareholder disputes Germany",
    "International arbitration Germany",
    "Judgment enforcement Germany",
    "Interim injunctions Germany",
  ],
};

export const personEntity = {
  "@type": "Person",
  "@id": `${BASE_URL}/#fatih-bektas`,
  name: "Fatih Bektas",
  givenName: "Fatih",
  familyName: "Bektas",
  jobTitle: "Rechtsanwalt & Fachanwalt für Arbeitsrecht",
  description:
    "German-qualified attorney with 20+ years of litigation experience. Certified specialist in employment law (Fachanwalt) since 2011. Former FinTech CEO.",
  url: `${BASE_URL}/team`,
  image: `${BASE_URL}/Fatih.png`,
  email: "bektas@apos.legal",
  telephone: "+4915127003173",
  sameAs: [
    "https://www.linkedin.com/in/fatihbektas",
    "https://www.anwalt.de/bektas",
  ],
  worksFor: { "@id": `${BASE_URL}/#organization` },
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "Fachanwalt für Arbeitsrecht",
      credentialCategory: "Certified Specialist in Employment Law",
      recognizedBy: {
        "@type": "Organization",
        name: "Rechtsanwaltskammer Karlsruhe",
      },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Certified Mediator",
      credentialCategory: "Mediation Certification",
    },
  ],
  memberOf: [
    { "@type": "Organization", name: "Deutscher Anwaltverein" },
    { "@type": "Organization", name: "BVAU" },
  ],
  knowsAbout: [
    "German civil litigation",
    "Commercial disputes Germany",
    "Employment law Germany",
    "Shareholder disputes",
    "International arbitration",
    "German court procedure",
  ],
};

// ─── 1. LegalService + AggregateRating (Homepage) ───────────────────────────

export function getLegalServiceSchema() {
  return {
    "@context": "https://schema.org",
    ...organizationEntity,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "68",
      reviewCount: "68",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "German Litigation Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "LegalService",
            name: "Commercial Dispute Litigation",
            description:
              "Representation in German commercial courts (Landgericht) for breach of contract, trade disputes, unfair competition and product liability claims.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "LegalService",
            name: "Employment Litigation",
            description:
              "Wrongful dismissal claims, severance disputes, non-compete enforcement and works council conflicts. Certified specialist (Fachanwalt) since 2011.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "LegalService",
            name: "Shareholder Disputes",
            description:
              "Minority shareholder protection, squeeze-outs and breach of fiduciary duties in German GmbH and AG companies.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "LegalService",
            name: "International Arbitration",
            description:
              "ICC, DIS and LCIA arbitration proceedings seated in Germany. Enforcement of foreign arbitral awards under the New York Convention.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "LegalService",
            name: "Judgment Enforcement",
            description:
              "Enforcing foreign judgments and arbitral awards in Germany via exequatur proceedings and attachment of German assets.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "LegalService",
            name: "Interim Injunctions",
            description:
              "Emergency court orders (einstweilige Verfügung) obtainable within days for IP infringement, non-compete violations and urgent commercial disputes.",
          },
        },
      ],
    },
    founder: { "@id": `${BASE_URL}/#fatih-bektas` },
    employee: { "@id": `${BASE_URL}/#fatih-bektas` },
  };
}

// ─── 2. Person Schema (Homepage / Team page) ────────────────────────────────

export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    ...personEntity,
  };
}

// ─── 3. FAQPage Schema (Homepage) ───────────────────────────────────────────

export function getFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I sue a company in Germany from the US or UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To sue in Germany, you need a German-admitted attorney (Rechtsanwalt) — foreign lawyers cannot represent you in German courts. The process starts with a demand letter, followed by filing a statement of claim (Klageschrift) at the competent court. For claims above €10,000, attorney representation is mandatory. German litigation has no discovery, no jury trials, and follows the loser-pays principle. APOS Legal handles everything in English — you never need to deal with German courts directly.",
        },
      },
      {
        "@type": "Question",
        name: "I've been sued in Germany — what do I do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If you've been served with a German lawsuit, you typically have 2–4 weeks to respond. Missing this deadline can result in a default judgment (Versäumnisurteil) against you. You need a German-admitted attorney immediately. We can file your defense, request deadline extensions, and represent you through the entire proceeding — all communication in English.",
        },
      },
      {
        "@type": "Question",
        name: "How long does a lawsuit take in German courts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "First-instance proceedings at a Regional Court (Landgericht) typically take 6–12 months. Complex cases with expert witnesses may take 12–18 months. Appeals add another 6–12 months. Interim injunctions can be obtained within days. German litigation is generally faster than US or UK proceedings.",
        },
      },
      {
        "@type": "Question",
        name: "What does litigation cost in Germany?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "German litigation costs are calculated from statutory fee schedules based on the amount in dispute — not hourly billing. Germany follows the loser-pays rule. For a €100,000 dispute, total first-instance costs typically range from €8,000–€15,000. This makes German litigation far more predictable and usually cheaper than US litigation.",
        },
      },
      {
        "@type": "Question",
        name: "Can I enforce a US or UK judgment in Germany?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "US judgments are generally not directly enforceable in Germany — there is no bilateral enforcement treaty. You need a separate enforcement proceeding (Exequaturverfahren) where a German court reviews the judgment. UK judgments post-Brexit require enforcement under the Hague Convention where applicable.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use arbitration instead of German courts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, if your contract contains an arbitration clause. Germany is a signatory to the New York Convention. APOS Legal represents international clients in ICC, DIS, and LCIA arbitration proceedings seated in Germany, as well as in enforcement of foreign arbitral awards before German courts.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between Amtsgericht and Landgericht in Germany?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Amtsgericht (Local Court) handles disputes up to €10,000. The Landgericht (Regional Court) handles claims above €10,000 and all commercial matters — attorney representation is mandatory here. Commercial disputes go to specialized chambers (Kammern für Handelssachen). Appeals go to the Oberlandesgericht and ultimately the Bundesgerichtshof.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to travel to Germany for my court case?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In most cases, no. Your German attorney represents you in court, and personal appearance is rarely required. Video conferencing is increasingly accepted. APOS Legal handles all filings, court appearances, and procedural matters on your behalf — you stay informed through regular English-language updates.",
        },
      },
    ],
  };
}

// ─── 4. BlogPosting Schema (dynamic, per article) ───────────────────────────

interface BlogPostingSchemaProps {
  title: string;
  description: string;
  slug: string;
  datePublished: string;       // ISO 8601 e.g. "2026-03-03"
  dateModified?: string;
  image?: string;
  category?: string;
}

export function getBlogPostingSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  image,
  category,
}: BlogPostingSchemaProps) {
  const url = `${BASE_URL}/blog/${slug}`;
  const imageUrl = image
    ? `${BASE_URL}${image.startsWith("/") ? "" : "/"}${image}`
    : `${BASE_URL}/blog/${slug}.webp`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    image: {
      "@type": "ImageObject",
      url: imageUrl,
    },
    author: { "@id": `${BASE_URL}/#fatih-bektas` },
    publisher: { "@id": `${BASE_URL}/#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    articleSection: category ?? "Legal Guide",
    inLanguage: "en",
    keywords: [
      "German litigation",
      "German courts",
      category ?? "legal guide",
      "international business Germany",
    ].join(", "),
  };
}

// ─── 5. BreadcrumbList Schema (blog articles) ───────────────────────────────

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
