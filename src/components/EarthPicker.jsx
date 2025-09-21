import React, { useRef, useState, useCallback } from "react";

/**
 * Equirectangular math:
 *   lon ∈ [-180, 180] maps to x ∈ [0, W]  via x = (lon + 180)/360 * W
 *   lat ∈ [-90,  90] maps to y ∈ [0, H]  via y = (90 - lat)/180 * H
 */
function xyToLatLon(x, y, W, H) {
  const lon = (x / W) * 360 - 180;
  const lat = 90 - (y / H) * 180;
  return { lat, lon };
}

function latLonToXY(lat, lon, W, H) {
  const x = ((lon + 180) / 360) * W;
  const y = ((90 - lat) / 180) * H;
  return { x, y };
}

export default function LatLonPicker2D({
  width = 900,
  height = 450,
  onChange, // (coords) => void
}) {
  const svgRef = useRef(null);
  const [coords, setCoords] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFromEvent = useCallback(
    (evt) => {
      const svg = svgRef.current;
      if (!svg) return;
      const pt = svg.createSVGPoint();
      if ("touches" in evt && evt.touches[0]) {
        pt.x = evt.touches[0].clientX;
        pt.y = evt.touches[0].clientY;
      } else {
        pt.x = evt.clientX;
        pt.y = evt.clientY;
      }
      const ctm = svg.getScreenCTM().inverse();
      const { x, y } = pt.matrixTransform(ctm);

      // clamp inside drawable area
      const cx = Math.max(0, Math.min(width, x));
      const cy = Math.max(0, Math.min(height, y));

      const ll = xyToLatLon(cx, cy, width, height);
      setCoords(ll);
      onChange?.(ll);
    },
    [width, height, onChange]
  );

  const onMouseDown = (e) => { setDragging(true); handleFromEvent(e); };
  const onMouseMove = (e) => { if (dragging) handleFromEvent(e); };
  const onMouseUp = () => setDragging(false);
  const onLeave = () => setDragging(false);

  const onTouchStart = (e) => { setDragging(true); handleFromEvent(e); };
  const onTouchMove  = (e) => { if (dragging) handleFromEvent(e); };
  const onTouchEnd   = () => setDragging(false);

  // marker position (convert once we have coords)
  const marker = coords ? latLonToXY(coords.lat, coords.lon, width, height) : null;

  // build simple graticule
  const meridians = [];
  for (let lon = -180; lon <= 180; lon += 30) {
    const x = ((lon + 180) / 360) * width;
    meridians.push(<line key={`m${lon}`} x1={x} y1={0} x2={x} y2={height} stroke="rgba(255,255,255,0.15)" />);
  }
  const parallels = [];
  for (let lat = -90; lat <= 90; lat += 15) {
    const y = ((90 - lat) / 180) * height;
    parallels.push(<line key={`p${lat}`} x1={0} y1={y} x2={width} y2={y} stroke="rgba(255,255,255,0.12)" />);
  }

  return (
    <div style={{ width: "100%", display: "grid", gap: 8 }}>
      <div
        style={{
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          color: "#e6f1ff",
          fontSize: 13,
          justifySelf: "start",
          background: "rgba(0,0,0,0.35)",
          padding: "6px 8px",
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(4px)",
        }}
      >
        {coords
          ? <>lat: {coords.lat.toFixed(4)}°, lon: {coords.lon.toFixed(4)}°</>
          : "Click or drag on the map"}
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={Math.round((height / width) * 100) + "%"}
        style={{ aspectRatio: `${width}/${height}`, display: "block", borderRadius: 16, cursor: "crosshair" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* background */}
        <defs>
          <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#081126" />
            <stop offset="100%" stopColor="#0b0f2a" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width={width} height={height} fill="url(#bg)" />

        {/* sphere-ish vignette (purely visual) */}
        <ellipse
          cx={width / 2}
          cy={height / 2}
          rx={(width / 2) * 0.98}
          ry={(height / 2) * 0.98}
          fill="rgba(90,160,255,0.08)"
        />

        {/* graticule */}
        <g>{meridians}</g>
        <g>{parallels}</g>

        {/* labels every 60° lon and 30° lat */}
        <g fontFamily="system-ui, sans-serif" fontSize="10" fill="rgba(255,255,255,0.6)">
          {[-120, -60, 0, 60, 120].map((lon) => {
            const x = ((lon + 180) / 360) * width;
            return <text key={`lt${lon}`} x={x + 3} y={12}>{lon}°</text>;
          })}
          {[-60, -30, 0, 30, 60].map((lat) => {
            const y = ((90 - lat) / 180) * height;
            return <text key={`pt${lat}`} x={4} y={y - 4}>{lat}°</text>;
          })}
        </g>

        {/* marker */}
        {marker && (
          <g>
            <circle cx={marker.x} cy={marker.y} r="4" fill="#ffd166" />
            <circle cx={marker.x} cy={marker.y} r="10" fill="none" stroke="#ffd166" strokeOpacity="0.6" />
          </g>
        )}
      </svg>
    </div>
  );
}
