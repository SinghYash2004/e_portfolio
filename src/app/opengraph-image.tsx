import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'radial-gradient(circle at top left, rgba(99,102,241,0.35), transparent 35%), linear-gradient(135deg, #090b14 0%, #101827 48%, #111827 100%)',
          color: '#f8fafc',
          padding: '56px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            fontSize: '28px',
            color: '#a5b4fc',
          }}
        >
          <div
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '999px',
              background: '#22c55e',
              boxShadow: '0 0 22px rgba(34,197,94,0.7)',
            }}
          />
          Open to opportunities
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ fontSize: '72px', fontWeight: 800, lineHeight: 1.05 }}>
            Yash Pratap Singh
          </div>
          <div style={{ fontSize: '34px', color: '#cbd5e1', maxWidth: '820px' }}>
            Computer Science student building software projects in systems, web development, and academic technology.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '24px',
            color: '#94a3b8',
          }}
        >
          <div style={{ display: 'flex', gap: '24px' }}>
            <span>Projects</span>
            <span>Skills</span>
            <span>Education</span>
          </div>
          <div>Built with Next.js</div>
        </div>
      </div>
    ),
    size
  );
}
