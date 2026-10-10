// Lightweight CSS composition shown while the 3D scene loads, or when WebGL is unavailable.
export default function SceneFallback() {
  return (
    <div className="scene-fallback" aria-hidden="true">
      <span className="scene-fallback__ring scene-fallback__ring--a" />
      <span className="scene-fallback__ring scene-fallback__ring--b" />
      <span className="scene-fallback__orb" />
      <span className="scene-fallback__tag" style={{ top: '18%', left: '12%' }}>Java</span>
      <span className="scene-fallback__tag" style={{ top: '26%', right: '10%' }}>SQL</span>
      <span className="scene-fallback__tag" style={{ bottom: '22%', left: '8%' }}>&lt;/&gt;</span>
      <span className="scene-fallback__tag" style={{ bottom: '14%', right: '16%' }}>CSS</span>
    </div>
  )
}
