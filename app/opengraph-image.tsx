import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'gekuendigt-abfindung.de – Fachanwalt für Arbeitsrecht';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '100%',
          height: '100%',
          backgroundColor: '#FAF7F0',
          padding: '80px',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: '16px',
            fontWeight: 700,
            color: '#7A5C1E',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            marginBottom: '20px',
          }}
        >
          Fachanwalt für Arbeitsrecht
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: '56px',
            fontWeight: 700,
            color: '#1C1408',
            lineHeight: 1.2,
            maxWidth: '900px',
          }}
        >
          Gekündigt? Abfindung sichern.
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: '24px',
            color: '#555',
            marginTop: '24px',
            maxWidth: '800px',
            lineHeight: 1.5,
          }}
        >
          Kostenlose Ersteinschätzung. 20+ Jahre Erfahrung. 2.000+ Verfahren.
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginTop: '48px',
          }}
        >
          <div
            style={{
              display: 'flex',
              backgroundColor: '#7A5C1E',
              color: 'white',
              padding: '16px 40px',
              borderRadius: '4px',
              fontSize: '20px',
              fontWeight: 600,
            }}
          >
            gekuendigt-abfindung.de
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '6px',
            backgroundColor: '#A68B4B',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
