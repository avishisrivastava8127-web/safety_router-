import L from 'leaflet';

/**
 * Creates crisp, reliable HTML/SVG custom icons using L.divIcon
 * to prevent Vite asset bundling issues with Leaflet's default PNGs.
 */

export const createStartIcon = (label = 'A') => {
  return L.divIcon({
    className: 'custom-leaflet-icon-start',
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
        <div style="
          width: 38px;
          height: 38px;
          background: #16a34a;
          color: white;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(22, 163, 74, 0.5), 0 2px 4px rgba(0,0,0,0.2);
          border: 2.5px solid #ffffff;
        ">
          <span style="transform: rotate(45deg); font-weight: 800; font-size: 15px; font-family: sans-serif;">${label}</span>
        </div>
        <div style="
          position: absolute;
          bottom: -6px;
          width: 14px;
          height: 6px;
          background: rgba(0,0,0,0.3);
          border-radius: 50%;
          filter: blur(1px);
        "></div>
      </div>
    `,
    iconSize: [38, 44],
    iconAnchor: [19, 44],
    popupAnchor: [0, -42]
  });
};

export const createDestIcon = (label = 'B') => {
  return L.divIcon({
    className: 'custom-leaflet-icon-dest',
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
        <div style="
          width: 38px;
          height: 38px;
          background: #dc2626;
          color: white;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.5), 0 2px 4px rgba(0,0,0,0.2);
          border: 2.5px solid #ffffff;
        ">
          <span style="transform: rotate(45deg); font-weight: 800; font-size: 15px; font-family: sans-serif;">${label}</span>
        </div>
        <div style="
          position: absolute;
          bottom: -6px;
          width: 14px;
          height: 6px;
          background: rgba(0,0,0,0.3);
          border-radius: 50%;
          filter: blur(1px);
        "></div>
      </div>
    `,
    iconSize: [38, 44],
    iconAnchor: [19, 44],
    popupAnchor: [0, -42]
  });
};

export const createPoiIcon = (type) => {
  let bgColor = '#2563eb'; // blue for police
  let iconSvg = '';
  let ringColor = 'rgba(37, 99, 235, 0.35)';

  if (type === 'police') {
    bgColor = '#2563eb';
    ringColor = 'rgba(37, 99, 235, 0.4)';
    // Shield / Badge SVG
    iconSvg = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    `;
  } else if (type === 'hospital') {
    bgColor = '#dc2626';
    ringColor = 'rgba(220, 38, 38, 0.4)';
    // Medical Cross SVG
    iconSvg = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 6v12M6 12h12"></path>
      </svg>
    `;
  } else if (type === 'shop24') {
    bgColor = '#d97706'; // Amber / gold
    ringColor = 'rgba(217, 119, 6, 0.4)';
    // Store / Shopping bag SVG
    iconSvg = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path>
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
        <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path>
        <path d="M2 7h20"></path>
      </svg>
    `;
  }

  return L.divIcon({
    className: `custom-poi-icon-${type}`,
    html: `
      <div style="position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer;">
        <div style="
          position: absolute;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: ${ringColor};
          animation: pulse-ring 2.5s infinite;
        "></div>
        <div style="
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: ${bgColor};
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #ffffff;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          z-index: 2;
        ">
          ${iconSvg}
        </div>
      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -20]
  });
};
