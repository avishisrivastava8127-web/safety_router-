/**
 * Safe Route - Mock Data Store
 * All presets, route coordinates, safety metrics, POIs, and initial contacts.
 */

// 1. Preset Locations (3 simple presets)
export const PRESET_LOCATIONS = [
  {
    id: 'powell',
    name: 'Powell St. Metro & Plaza',
    address: 'Market St & 4th St, Downtown SF',
    category: 'Transit Hub',
    coords: [37.7844, -122.4079],
    iconType: 'subway',
    description: 'BART & Muni underground station with continuous passenger flow.'
  },
  {
    id: 'ferry',
    name: 'Ferry Building & Embarcadero',
    address: '1 Ferry Building, The Embarcadero',
    category: 'Waterfront Terminal',
    coords: [37.7955, -122.3937],
    iconType: 'anchor',
    description: 'Prominent historic landmark, ferry docks, and wide pedestrian plaza.'
  },
  {
    id: 'unionsquare',
    name: 'Union Square Central Plaza',
    address: '333 Post St, Financial & Shopping Dist',
    category: 'Shopping & Arts Hub',
    coords: [37.7879, -122.4075],
    iconType: 'shopping-bag',
    description: 'Heart of the retail district with open public square and security presence.'
  }
];

// Preset route pairs helper
export const PRESET_PAIRS = [
  {
    id: 'powell-ferry',
    label: 'Powell St ➔ Ferry Building',
    startId: 'powell',
    destId: 'ferry'
  },
  {
    id: 'unionsquare-ferry',
    label: 'Union Square ➔ Ferry Building',
    startId: 'unionsquare',
    destId: 'ferry'
  },
  {
    id: 'powell-unionsquare',
    label: 'Powell St ➔ Union Square',
    startId: 'powell',
    destId: 'unionsquare'
  }
];

// Safety POIs along the safest walking corridors
export const SAFETY_POIS = [
  {
    id: 'poi-police-1',
    name: 'SFPD Downtown Safety Substation',
    type: 'police',
    categoryLabel: 'Police Station',
    coords: [37.7892, -122.4018],
    address: '765 Market St (at 4th St)',
    openStatus: 'Open 24/7 • Staffed Patrol Desk',
    responseEstimate: '1-2 min response radius',
    phone: '415-553-0123',
    badge: 'Verified Safe Haven',
    features: ['Direct 911 Dispatch', 'Public Emergency Call Box', 'Armed Security Desk']
  },
  {
    id: 'poi-police-2',
    name: 'BART Transit Police Kiosk & Patrol',
    type: 'police',
    categoryLabel: 'Transit Police Kiosk',
    coords: [37.7849, -122.4068],
    address: 'Powell Station Mezzanine (Street Level)',
    openStatus: 'Active 24/7 Security Presence',
    responseEstimate: 'Immediate on-site',
    phone: '415-464-1451',
    badge: 'Transit Safety Point',
    features: ['Surveillance Hub', 'Uniformed Patrol Officers', 'AED Defibrillator']
  },
  {
    id: 'poi-hospital-1',
    name: 'St. Francis Urgent Care & Walk-In',
    type: 'hospital',
    categoryLabel: 'Urgent Care / Hospital',
    coords: [37.7912, -122.3995],
    address: '580 Market St Suite 100',
    openStatus: '24/7 Emergency Triage Open',
    responseEstimate: 'Medical triage on standby',
    phone: '415-353-6000',
    badge: '24/7 Medical Care',
    features: ['Emergency Room', 'Trauma First Aid', 'Security Guard on Entrance']
  },
  {
    id: 'poi-hospital-2',
    name: 'Embarcadero First Aid & Clinic',
    type: 'hospital',
    categoryLabel: 'Medical Safe Center',
    coords: [37.7946, -122.3955],
    address: '2 Embarcadero Center',
    openStatus: 'Open 24 Hours',
    responseEstimate: 'Paramedic station nearby',
    phone: '415-956-6500',
    badge: 'Safe Medical Station',
    features: ['24h Walk-in', 'Certified First Responders', 'Public Restroom']
  },
  {
    id: 'poi-shop-1',
    name: 'Walgreens 24/7 Pharmacy & Market',
    type: 'shop24',
    categoryLabel: '24/7 Safe Haven Shop',
    coords: [37.7868, -122.4045],
    address: '825 Market St (between 4th & 5th)',
    openStatus: 'Open 24 Hours • High Illumination',
    responseEstimate: 'Well-lit sanctuary',
    phone: '415-543-9512',
    badge: 'Safe Haven Partner',
    features: ['Continuous Staffing', 'Exterior & Interior CCTV', 'Security Guard on Duty']
  },
  {
    id: 'poi-shop-2',
    name: '7-Eleven 24h Express & Well-Lit Stop',
    type: 'shop24',
    categoryLabel: '24/7 Convenience Store',
    coords: [37.7925, -122.3978],
    address: '425 Market St',
    openStatus: 'Open 24/7 • Staffed Counter',
    responseEstimate: 'Safe stop along route',
    phone: '415-397-1711',
    badge: 'Safe Haven Partner',
    features: ['Bright Frontage', 'Emergency Calling Access', 'Staff on Duty']
  },
  {
    id: 'poi-shop-3',
    name: 'Ferry Plaza 24h Deli & Espresso Bar',
    type: 'shop24',
    categoryLabel: '24h Cafe & Safe Haven',
    coords: [37.7950, -122.3942],
    address: 'Embarcadero Promenade',
    openStatus: 'Open 24/7 with Outdoor Terrace',
    responseEstimate: 'Active foot traffic hub',
    phone: '415-983-8030',
    badge: 'Safe Haven Partner',
    features: ['Busy Dining Area', 'Bright Street Frontage', 'Hospitality Security']
  }
];

// Route definitions for preset pairs
// Each route has distinct waypoints, metrics for Day, and metrics for Night
export const ROUTES_BY_PAIR = {
  'powell-ferry': {
    safest: {
      id: 'safest',
      name: 'Safest Route',
      tagline: 'Recommended: Broad illuminated transit boulevard with continuous CCTV & 24/7 storefronts',
      color: '#16a34a', // Safe Green
      duration: '18 min',
      distance: '1.4 km',
      elevation: 'Flat (+4 m)',
      calories: '72 kcal',
      path: [
        [37.7844, -122.4079], // Powell St Station
        [37.7856, -122.4062], // Market & 4th
        [37.7872, -122.4041], // Market & 3rd
        [37.7891, -122.4015], // Market & 2nd
        [37.7911, -122.3988], // Market & 1st
        [37.7932, -122.3962], // Market & Fremont/Beale
        [37.7946, -122.3948], // Market & Steuart
        [37.7955, -122.3937]  // Ferry Building
      ],
      dayMetrics: {
        safetyScore: 95,
        ratingTier: 'Excellent Safety',
        lighting: {
          score: 96,
          label: 'Daylight & Smart LED Poles',
          detail: '100% of street covered with modern high-lumen streetlights'
        },
        crowdLevel: {
          score: 92,
          label: 'High Foot Traffic',
          detail: 'Consistently populated with commuters, shoppers & street ambassadors'
        },
        openShops: {
          score: 95,
          count: 28,
          label: '28 Active Storefronts',
          detail: 'Continuous retail, bank lobbies, cafes & transit entrances'
        },
        incidentReports: {
          score: 98,
          count: 0,
          label: '0 Incidents (Past 30 Days)',
          detail: 'Designated high-visibility safety corridor with zero reported incidents'
        },
        badge: 'Top Safe Route',
        summary: 'Follows Market Street main artery. Broad sidewalks, bike lanes, 4 transit stations with security, and 7 safe haven points.',
        safetyFeatures: [
          'Municipal Street Ambassadors every 2 blocks',
          'City surveillance network coverage',
          '3 Police & Security desks on path',
          'Well-lit pedestrian crosswalks'
        ]
      },
      nightMetrics: {
        safetyScore: 88,
        ratingTier: 'Strongly Recommended',
        lighting: {
          score: 92,
          label: 'Continuous Bright Illumination',
          detail: 'Twin-luminaire white LED poles remain at 100% brightness all night'
        },
        crowdLevel: {
          score: 78,
          label: 'Moderate Commuter Flow',
          detail: 'Steady evening transit riders and hotel district pedestrian flow'
        },
        openShops: {
          score: 84,
          count: 14,
          label: '14 Open 24/7 Businesses',
          detail: 'Open pharmacies, hotel lobbies, 24h bodegas, and transit plazas'
        },
        incidentReports: {
          score: 94,
          count: 1,
          label: '1 Minor Report (Past 30 Days)',
          detail: '1 petty lost item report; frequent SFPD night vehicular patrols'
        },
        badge: 'Night Guardian Verified',
        summary: 'At night, this route is over 50 points safer than the alley shortcut. High streetlamp coverage and open 24/7 stores provide constant visibility.',
        safetyFeatures: [
          '3 Verified 24/7 Safe Haven storefronts',
          'Overhead pedestrian lighting on all segments',
          'Direct line of sight with no blind alleyways',
          'SFPD Downtown Substation within 90 seconds walk'
        ]
      }
    },
    fastest: {
      id: 'fastest',
      name: 'Fastest Route',
      tagline: 'Direct shortcut via Stevenson & Jessie back-alleys (Low visibility after dusk)',
      color: '#ef4444', // Danger / Warning Red
      duration: '14 min',
      distance: '1.1 km',
      elevation: 'Flat (+3 m)',
      calories: '55 kcal',
      path: [
        [37.7844, -122.4079], // Start
        [37.7849, -122.4068], // Cut into Stevenson St
        [37.7865, -122.4045], // Stevenson alleyway
        [37.7878, -122.4026], // Cross 2nd St into Jessie alley
        [37.7900, -122.3995], // Jessie alley segment
        [37.7925, -122.3963], // Cut through Mission rear service lane
        [37.7946, -122.3945], // Emerge at Steuart
        [37.7955, -122.3937]  // Ferry Building
      ],
      dayMetrics: {
        safetyScore: 68,
        ratingTier: 'Moderate Caution',
        lighting: {
          score: 65,
          label: 'Shadowed by High Rises',
          detail: 'Deep shadows cast between tall buildings; 4 dark garage entrance alcoves'
        },
        crowdLevel: {
          score: 58,
          label: 'Low / Sporadic Pedestrians',
          detail: 'Mostly service delivery drivers, courier trucks, and few walkers'
        },
        openShops: {
          score: 60,
          count: 6,
          label: '6 Open Businesses',
          detail: 'Loading docks, dumpsters, and parking garage gates dominate frontage'
        },
        incidentReports: {
          score: 72,
          count: 3,
          label: '3 Incidents (Past 30 Days)',
          detail: 'Reports of vehicle break-ins and aggressive loitering'
        },
        badge: 'Shortcut • Low Visibility',
        summary: 'Cuts 4 minutes by using narrow alleys south of Market. Lower pedestrian density and obscured sightlines.',
        safetyFeatures: [
          'Saves 4 minutes walking time',
          'Fewer street crossings',
          '⚠️ Blind corners and garage exits',
          '⚠️ Zero emergency call kiosks'
        ]
      },
      nightMetrics: {
        safetyScore: 34,
        ratingTier: 'High Risk (Avoid)',
        lighting: {
          score: 25,
          label: 'Severely Dim / 4 Broken Bulbs',
          detail: 'Sparse low-pressure sodium lamps; several pitch-black alcoves'
        },
        crowdLevel: {
          score: 18,
          label: 'Deserted / Isolated Alleys',
          detail: 'Virtually no civilian pedestrian presence after 8:30 PM'
        },
        openShops: {
          score: 20,
          count: 1,
          label: '1 Open Night Warehouse',
          detail: 'All retail shuttered with metal security grates; zero refuge points'
        },
        incidentReports: {
          score: 40,
          count: 9,
          label: '9 Incidents (Past 30 Days)',
          detail: 'Multiple late-night robberies, harassment reports, and unmonitored blindspots'
        },
        badge: '⚠️ Not Recommended at Night',
        summary: 'HIGH RISK: Unlit alleyways with zero pedestrian traffic and multiple recent incidents. The 4-minute time save exposes you to significant risk.',
        safetyFeatures: [
          '⚠️ 8 unmonitored blind alley segments',
          '⚠️ No active CCTV coverage',
          '⚠️ 9 emergency calls in past 30 days',
          '⚠️ Nearest police response >6 mins away'
        ]
      }
    }
  },

  'unionsquare-ferry': {
    safest: {
      id: 'safest',
      name: 'Safest Route',
      tagline: 'Recommended: Post St & Montgomery commercial retail corridor down to Embarcadero',
      color: '#16a34a',
      duration: '19 min',
      distance: '1.5 km',
      elevation: 'Gentle downhill (-12 m)',
      calories: '75 kcal',
      path: [
        [37.7879, -122.4075], // Union Square
        [37.7889, -122.4055], // Post St & Grant Ave
        [37.7898, -122.4035], // Post St & Kearny
        [37.7908, -122.4012], // Montgomery St & Market
        [37.7925, -122.3980], // Market & 1st St
        [37.7942, -122.3955], // Market & Main
        [37.7955, -122.3937]  // Ferry Building
      ],
      dayMetrics: {
        safetyScore: 96,
        ratingTier: 'Excellent Safety',
        lighting: {
          score: 98,
          label: 'Full Commercial Illumination',
          detail: 'Designer retail storefronts, luxury hotels and high-lumen street poles'
        },
        crowdLevel: {
          score: 94,
          label: 'Heavy Pedestrian Density',
          detail: 'High shopper presence, tourists, transit commuters, and security'
        },
        openShops: {
          score: 96,
          count: 32,
          label: '32 Open Businesses',
          detail: 'High-density storefronts with doormen, cafes, banks and boutiques'
        },
        incidentReports: {
          score: 98,
          count: 0,
          label: '0 Incidents (Past 30 Days)',
          detail: 'Private district security patrols coupled with police foot presence'
        },
        badge: 'Premier Safe Corridor',
        summary: 'Follows historic luxury retail boulevard down into the Financial District and Embarcadero.',
        safetyFeatures: [
          'Active district security patrols',
          'Continuous wide pedestrian sidewalks',
          'Hotel lobbies with 24/7 front desk security',
          'Full GPS and emergency coverage'
        ]
      },
      nightMetrics: {
        safetyScore: 90,
        ratingTier: 'Strongly Recommended',
        lighting: {
          score: 94,
          label: 'Bright Window Displays & Lights',
          detail: 'Continuous architectural illumination and streetlamps'
        },
        crowdLevel: {
          score: 80,
          label: 'Active Evening Diners',
          detail: 'Hotel patrons and restaurant guests keep streets populated'
        },
        openShops: {
          score: 86,
          count: 18,
          label: '18 Open Night Spots',
          detail: 'Grand hotel lobbies open 24/7 with staffed concierges'
        },
        incidentReports: {
          score: 95,
          count: 1,
          label: '1 Minor Report (Past 30 Days)',
          detail: 'Well-patrolled luxury shopping perimeter'
        },
        badge: 'Night Guardian Verified',
        summary: 'Strongly recommended: Grand hotel doormen, bright display windows, and wide clear boulevards.',
        safetyFeatures: [
          '4 Staffed hotel lobbies act as immediate safe zones',
          'High density of emergency streetlights',
          'SFPD patrol hub within 2 blocks',
          'High visibility crosswalks'
        ]
      }
    },
    fastest: {
      id: 'fastest',
      name: 'Fastest Route',
      tagline: 'Direct cut through Maiden Lane & Sutter back lanes (Deserted after shops close)',
      color: '#ef4444',
      duration: '15 min',
      distance: '1.2 km',
      elevation: 'Downhill (-10 m)',
      calories: '58 kcal',
      path: [
        [37.7879, -122.4075], // Union Square
        [37.7885, -122.4060], // Maiden Lane gate
        [37.7895, -122.4038], // Commercial service corridor
        [37.7915, -122.4005], // Bush & Battery service alleys
        [37.7938, -122.3970], // Back streets near Mission
        [37.7955, -122.3937]  // Ferry Building
      ],
      dayMetrics: {
        safetyScore: 71,
        ratingTier: 'Fair (Daylight Only)',
        lighting: {
          score: 70,
          label: 'Adequate Daylight',
          detail: 'Pedestrianized during day but narrow with overhead overhangs'
        },
        crowdLevel: {
          score: 62,
          label: 'Moderate in Daytime',
          detail: 'Decent foot traffic until retail gates close around 6 PM'
        },
        openShops: {
          score: 68,
          count: 10,
          label: '10 Open Businesses',
          detail: 'Narrow boutiques that close early in the evening'
        },
        incidentReports: {
          score: 75,
          count: 2,
          label: '2 Incidents (Past 30 Days)',
          detail: 'Occasional loitering in service alcoves'
        },
        badge: 'Daytime Shortcut Only',
        summary: 'Saves 4 minutes during sunny business hours. Once gates close, it turns into narrow shuttered corridors.',
        safetyFeatures: [
          'Pleasant brick cobblestones during day',
          'Saves 4 minutes',
          '⚠️ Closes to vehicle/patrol access',
          '⚠️ Poor escape routes if trapped'
        ]
      },
      nightMetrics: {
        safetyScore: 38,
        ratingTier: 'High Risk (Avoid)',
        lighting: {
          score: 30,
          label: 'Dim Architectural Fixtures',
          detail: 'Boutique lights shut off at 8 PM; only dim wall sconces remain'
        },
        crowdLevel: {
          score: 20,
          label: 'Completely Deserted',
          detail: 'Narrow gated alleyway completely empty after 7:30 PM'
        },
        openShops: {
          score: 15,
          count: 0,
          label: '0 Open Businesses',
          detail: 'Heavy iron gates lock all storefronts; nowhere to seek refuge'
        },
        incidentReports: {
          score: 44,
          count: 7,
          label: '7 Incidents (Past 30 Days)',
          detail: '7 emergency calls for mugging and vandalism in dark alcoves'
        },
        badge: '⚠️ Severe Night Risk',
        summary: 'AVOID AT NIGHT: Iron gates enclose the narrow lane creating a canyon effect with no escape routes or open establishments.',
        safetyFeatures: [
          '⚠️ Locked gates reduce exit options',
          '⚠️ Zero open stores or refuge points',
          '⚠️ Dead angles not covered by police cameras',
          '⚠️ Score drops by 33 points at night'
        ]
      }
    }
  },

  'powell-unionsquare': {
    safest: {
      id: 'safest',
      name: 'Safest Route',
      tagline: 'Recommended: Powell Street cable car corridor (Always monitored, high visibility)',
      color: '#16a34a',
      duration: '7 min',
      distance: '0.5 km',
      elevation: 'Slight uphill (+8 m)',
      calories: '28 kcal',
      path: [
        [37.7844, -122.4079], // Powell Station
        [37.7858, -122.4078], // Powell & Ellis
        [37.7869, -122.4077], // Powell & O'Farrell
        [37.7879, -122.4075]  // Union Square
      ],
      dayMetrics: {
        safetyScore: 97,
        ratingTier: 'Maximum Safety',
        lighting: {
          score: 98,
          label: 'High Power Floodlights',
          detail: 'Cable car line illuminated by multi-tier public luminaires'
        },
        crowdLevel: {
          score: 96,
          label: 'Very Dense Crowd',
          detail: 'Cable car queue, shoppers, hotel guests, and city ambassadors'
        },
        openShops: {
          score: 98,
          count: 22,
          label: '22 Open Stores & Cafes',
          detail: 'Continuous retail, department stores, and flagship brands'
        },
        incidentReports: {
          score: 99,
          count: 0,
          label: '0 Incidents (Past 30 Days)',
          detail: 'Designated high-security tourist zone'
        },
        badge: 'High-Density Safe Way',
        summary: 'Direct cable car route along Powell Street. Bright, lively, with round-the-clock hotel doormen and security officers.',
        safetyFeatures: [
          'Cable car line with active transit staff',
          'City camera network covering every meter',
          'Hotel doormen stationed outside',
          'Immediate police presence'
        ]
      },
      nightMetrics: {
        safetyScore: 92,
        ratingTier: 'Strongly Recommended',
        lighting: {
          score: 95,
          label: 'Brightly Lit Cable Car Track',
          detail: 'Commercial lighting on both sidewalks throughout the night'
        },
        crowdLevel: {
          score: 85,
          label: 'Lively Evening Crowds',
          detail: 'Active hotel lobbies and theatergoers returning from shows'
        },
        openShops: {
          score: 88,
          count: 12,
          label: '12 Open Night Spots',
          detail: '24h hotel cafes, valet stands, and open pharmacies'
        },
        incidentReports: {
          score: 96,
          count: 0,
          label: '0 Incidents (Past 30 Days)',
          detail: 'Continuous security vehicle surveillance'
        },
        badge: 'Night Guardian Verified',
        summary: 'Remains safely populated well into midnight. Multiple luxury hotel entrances offer immediate safe harbor if needed.',
        safetyFeatures: [
          'Multiple 24/7 hotel security stations',
          'Zero dark spots or unmonitored blind corners',
          'Wide sidewalks with clear sightlines',
          'Average emergency response <60 seconds'
        ]
      }
    },
    fastest: {
      id: 'fastest',
      name: 'Fastest Route',
      tagline: 'Cyril Magnin rear service road & garage alley (Dim, deserted, loading docks)',
      color: '#ef4444',
      duration: '5 min',
      distance: '0.4 km',
      elevation: 'Slight uphill (+7 m)',
      calories: '22 kcal',
      path: [
        [37.7844, -122.4079], // Powell Station
        [37.7850, -122.4089], // Cut behind 5th St garage
        [37.7868, -122.4088], // Cyril Magnin back service lane
        [37.7878, -122.4082], // Alley exit
        [37.7879, -122.4075]  // Union Square
      ],
      dayMetrics: {
        safetyScore: 65,
        ratingTier: 'Moderate Caution',
        lighting: {
          score: 60,
          label: 'Overhung by Concrete Garages',
          detail: 'Multi-story parking structure overhangs block sunlight'
        },
        crowdLevel: {
          score: 52,
          label: 'Sparse / Service Only',
          detail: 'Delivery vans and trash disposal workers only'
        },
        openShops: {
          score: 45,
          count: 2,
          label: '2 Open Garage Offices',
          detail: 'Automated garage gates and exhaust fans; no street shops'
        },
        incidentReports: {
          score: 68,
          count: 4,
          label: '4 Incidents (Past 30 Days)',
          detail: 'Multiple car break-ins and package theft reports'
        },
        badge: 'Backstreet Shortcut',
        summary: 'Cuts 2 minutes behind the parking structures. Dark concrete structures and no public foot traffic.',
        safetyFeatures: [
          'Saves 2 minutes walk',
          '⚠️ Concrete blind spots',
          '⚠️ Industrial garage exhaust',
          '⚠️ No street monitoring'
        ]
      },
      nightMetrics: {
        safetyScore: 32,
        ratingTier: 'High Risk (Avoid)',
        lighting: {
          score: 22,
          label: 'Very Dim Yellow Fixtures',
          detail: 'Flickering sodium bulbs; parking ramps cast deep pitch-black shadows'
        },
        crowdLevel: {
          score: 14,
          label: 'Completely Isolated',
          detail: 'No pedestrian movement; echoey cavernous concrete corridor'
        },
        openShops: {
          score: 10,
          count: 0,
          label: '0 Open Businesses',
          detail: 'All garage security booths locked; emergency call boxes out of service'
        },
        incidentReports: {
          score: 35,
          count: 8,
          label: '8 Incidents (Past 30 Days)',
          detail: 'Hotspot for night harassment and auto-burglary'
        },
        badge: '⚠️ Severe Night Risk',
        summary: 'DO NOT WALK ALONE AT NIGHT: Concrete canyon with dead zones, zero foot traffic, and zero open establishments for refuge.',
        safetyFeatures: [
          '⚠️ Multiple blind alcoves behind garage pillars',
          '⚠️ Severe audio/visual isolation',
          '⚠️ History of late-night muggings',
          '⚠️ Safest route is only 2 minutes longer!'
        ]
      }
    }
  }
};

// Initial default trusted contacts for localStorage
export const INITIAL_CONTACTS = [
  {
    id: 'ct-1',
    name: 'Sarah Jenkins (Mom)',
    phone: '+1 (555) 234-5678',
    relation: 'Family',
    notifySms: true,
    isPrimary: true
  },
  {
    id: 'ct-2',
    name: 'Alex Rivera (Partner)',
    phone: '+1 (555) 876-5432',
    relation: 'Partner',
    notifySms: true,
    isPrimary: false
  },
  {
    id: 'ct-3',
    name: 'Marcus Vance (Roommate)',
    phone: '+1 (555) 345-6789',
    relation: 'Roommate',
    notifySms: true,
    isPrimary: false
  }
];

// Helper to get routes for any start and destination preset pair
export function getRoutesForEndpoints(startId, destId) {
  if (startId === destId) {
    // Return same point fallback or default pair
    return ROUTES_BY_PAIR['powell-ferry'];
  }

  const directKey = `${startId}-${destId}`;
  if (ROUTES_BY_PAIR[directKey]) {
    return ROUTES_BY_PAIR[directKey];
  }

  const reverseKey = `${destId}-${startId}`;
  if (ROUTES_BY_PAIR[reverseKey]) {
    // Reverse the waypoints
    const original = ROUTES_BY_PAIR[reverseKey];
    return {
      safest: {
        ...original.safest,
        path: [...original.safest.path].reverse()
      },
      fastest: {
        ...original.fastest,
        path: [...original.fastest.path].reverse()
      }
    };
  }

  // Fallback to default
  return ROUTES_BY_PAIR['powell-ferry'];
}
