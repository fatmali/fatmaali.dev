import { ImageResponse } from 'next/og'
 
// For Next.js static export
export const dynamic = 'force-static'
 
// Image metadata
export const alt = 'Fatma Ali - Software Engineer'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 64,
          background: 'linear-gradient(to bottom right, #000000, #101010)',
          color: '#fff',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Abstract background elements */}
        <div style={{
          position: 'absolute',
          top: 50,
          left: 50,
          width: 200,
          height: 200,
          background: '#2563eb',
          borderRadius: '50%',
          opacity: 0.4,
          filter: 'blur(40px)'
        }} />

        <div style={{
          position: 'absolute',
          bottom: 150,
          right: 100,
          width: 300,
          height: 300,
          background: '#7c3aed',
          borderRadius: '50%',
          opacity: 0.3,
          filter: 'blur(60px)'
        }} />

        {/* Main content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          background: 'rgba(0,0,0,0.65)',
          borderRadius: '24px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          zIndex: 10
        }}>
          <div style={{ fontSize: 72, fontWeight: 'bold', marginBottom: 10 }}>Fatma Ali</div>
          <div style={{ fontSize: 36, fontWeight: 'normal', color: '#d1d5db' }}>Frontend Engineer</div>
          <div style={{
            display: 'flex',
            marginTop: 20,
            gap: '12px',
          }}>
            {['React', 'TypeScript', 'Next.js'].map((tech) => (
              <div key={tech} style={{
                padding: '4px 12px',
                background: 'rgba(37, 99, 235, 0.2)',
                color: '#93c5fd',
                borderRadius: '16px',
                fontSize: 24
              }}>{tech}</div>
            ))}
          </div>
        </div>

        <div style={{
          position: 'absolute',
          bottom: 30,
          fontSize: 28,
          color: '#d1d5db'
        }}>
          fatmaali.dev
        </div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}