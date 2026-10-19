# Safe Route 🛡️ — Safety-First Walking Navigation

> A Google Maps-inspired walking navigation frontend prototype that prioritizes pedestrian safety over pure speed. Built with **React**, **Vite**, **Tailwind CSS**, and **Leaflet / React-Leaflet** (OpenStreetMap & CartoDB Dark Matter tiles).

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ✨ Features Implemented

1. **Preset Locations & Direction Controls**
   - 3 presets:
     - **Powell St. Metro & Plaza** (Transit Hub)
     - **Ferry Building & Embarcadero** (Waterfront Terminal)
     - **Union Square Central Plaza** (Shopping & Arts District)
   - Start and destination selectors with custom pins, swap button, and quick preset pills.

2. **Dual Route Comparison**
   - **Safest Route (Green)**: Main boulevard corridor (Market St), high illumination, continuous CCTV, high foot traffic, and open businesses.
   - **Fastest Route (Red)**: Direct alley shortcut (Stevenson / Jessie back lanes), saves 3-4 mins, but passes through dim, isolated, unmonitored segments.
   - Clicking either route directly on the map or selecting its tab highlights it with glowing visual focus and opens the safety breakdown bottom card.

3. **Safety Score (0–100) & 4-Factor Breakdown**
   - Prominent circular safety gauge with color grading (Emerald Green, Amber, Red).
   - Detailed breakdown per route:
     - **Street Lighting**: Illumination percentage and luminaire description.
     - **Crowd Level**: Pedestrian density and foot traffic flow.
     - **Open Businesses Nearby**: Active storefronts, cafes, and safe havens.
     - **Incident Reports**: Logged safety incidents from past 30 days.

4. **Map Markers for Safe Havens & Emergency POIs**
   - Verified markers along the safest route:
     - **Police Stations**: SFPD Downtown Substation & BART Transit Police Kiosk.
     - **Urgent Care / Hospitals**: St. Francis Urgent Care & Embarcadero Clinic.
     - **24/7 Safe Haven Shops**: Walgreens 24/7 Pharmacy, 7-Eleven 24h, Ferry Plaza Cafe.
   - Interactive popups with address, operating hours, response time estimates, and one-tap call simulation.
   - Category filter pills on the top bar (`All`, `Police`, `Urgent Care`, `24/7 Havens`).

5. **"Share Trip" with Live Tracking & LocalStorage Contacts**
   - Generates a private fake live-tracking link with 1-click clipboard copy.
   - Displays live GPS telemetry (accuracy, battery level, ETA).
   - Manages emergency contacts persistently in browser `localStorage`.
   - Add new contacts (Name, Phone, Relation) and delete contacts.
   - "Send Live Location SMS" button with realistic dispatch confirmation.

6. **Floating Red SOS Button & Emergency Dispatch Screen**
   - Prominent pulsating red SOS button with radar wave animation.
   - Confirmation step with 3-second automatic countdown to prevent false alarms.
   - Simulated emergency screen:
     - Flashing distress beacon header.
     - **Web Audio API emergency siren alarm** (can be muted/unmuted).
     - Live coordinates pinpoint.
     - Nearest police response dispatch simulation (SFPD Patrol Unit #18 dispatched).
     - SMS broadcast confirmation to all trusted contacts.
     - One-tap 911 emergency call button.
     - "I Am Safe" safe cancellation button.

7. **Time-of-Day Toggle (Day / Night)**
   - Header toggle button with Sun / Moon icons.
   - **Day Mode**: Daylight conditions with OpenStreetMap standard tiles.
   - **Night Mode**: CartoDB Dark Matter night tiles.
   - Scores drop dynamically at night:
     - Safest route drops from 95 to 88, retaining high safety and receiving a **"⭐ Strongly Recommended at Night"** badge.
     - Fastest route drops from 68 down to 34 (**"⚠️ High Risk / Avoid"** due to dark alleys, broken streetlights, and recent incidents).

8. **Mobile-First & Clean UI**
   - Designed to mimic a native iOS / Google Maps mobile app experience.
   - Smooth sliding bottom sheet card with swipe / tap expansion.
   - Single `src/data.js` file for all mock data.

---

## 📁 Project Structure

```
safe-rout/
├── src/
│   ├── components/
│   │   ├── ActiveNavigationOverlay.jsx  # Turn-by-turn navigation simulation HUD
│   │   ├── HeaderNav.jsx               # Start/dest inputs, presets, Day/Night toggle, POI filters
│   │   ├── MapView.jsx                 # Leaflet map, polylines, start/dest pins, POI markers
│   │   ├── RouteBottomCard.jsx         # Bottom sliding sheet with Safety Score & 4-metric breakdown
│   │   ├── ShareTripModal.jsx          # Live tracking link & localStorage trusted contacts
│   │   └── SosModal.jsx                # Floating SOS button, siren audio & police alert screen
│   ├── utils/
│   │   └── leafletIcons.js             # SVG divIcon generators for map markers
│   ├── data.js                         # Single mock data store for presets, routes, POIs, contacts
│   ├── App.jsx                         # Main application state orchestration
│   ├── index.css                       # Tailwind directives, animations & Leaflet styling
│   └── main.jsx                        # React root entry
├── index.html                          # App title, viewport settings & font imports
├── tailwind.config.js                  # Tailwind configuration & custom safe/danger colors
└── package.json
```
