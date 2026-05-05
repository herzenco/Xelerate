import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Xelerate - Fractional Product Management for $2,000/Month';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4f46e5 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: 'white',
            marginBottom: 20,
            letterSpacing: '-2px',
          }}
        >
          Xelerate
        </div>
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255,255,255,0.85)',
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Fractional Product Management for $2,000/Month
        </div>
        <div
          style={{
            fontSize: 24,
            color: 'rgba(255,255,255,0.6)',
            marginTop: 20,
            textAlign: 'center',
          }}
        >
          Clear roadmaps · Sprint rituals · Accountability
        </div>
      </div>
    ),
    { ...size }
  );
}
