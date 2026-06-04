// This file encapsulates the pricing logic and data for different services.
// Moving this to a structured object makes it easier to add new services
// without touching the core UI components.

export const SERVICES = {
  web_dev: {
    title: "Web Development",
    currency: "KES ",
    roi_statement: "A professional site increases conversion by up to 20%. This tool pays for itself through new leads.",
    basePrices: {
      landing: { price: 8000, sample: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400", desc: "Clean, high-converting one-page site." },
      corporate: { price: 25000, sample: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=400", desc: "Multi-page site for established brands." },
      ecommerce: { price: 45000, sample: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=400", desc: "Full online store with M-Pesa checkout." },
      webapp: { price: 90000, sample: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400", desc: "Custom software for your business needs." },
    },
    multipliers: {
      pages: { "1": 1, "5": 1.15, "10": 1.35, "20": 1.7 } // gentler scaling
    },
    features: {
      blog: 5000,
      contact: 1500,
      seo: 8000,
      payment_gateway: 7000, // Affordable M-Pesa setup
      user_auth: 15000,
      cms: 8000,
    },
    infrastructure: {
      hosting: { shared: 3500, vps: 10000, cloud: 25000 },
      support: { none: 0, basic: 2500, premium: 8000, enterprise: 20000 }
    },
    monthly: {
      hosting: { shared: 1000, vps: 2500, cloud: 7000 },
      support: { none: 0, basic: 1500, premium: 5000, enterprise: 15000 }
    }
  },
  cybersecurity: {
    title: "Cybersecurity",
    currency: "KES ",
    roi_statement: "The cost of a single data breach in Kenya averages KES 1M+. This audit is your insurance policy.",
    basePrices: {
      audit: { price: 15000, sample: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400", desc: "Security assessment report and roadmap." },
      pentest: { price: 45000, sample: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=400", desc: "Active vulnerability testing and exploits." },
      compliance: { price: 30000, sample: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=400", desc: "Data protection and ISO standard readiness." },
      training: { price: 15000, sample: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400", desc: "Staff awareness sessions and materials." },
    },
    multipliers: {
      assets: { "10": 1, "50": 1.25, "200": 1.6, "500": 2.5 }
    },
    features: {
      vulnerability_scan: 10000,
      phishing_simulation: 15000,
      incident_response_plan: 20000,
      encryption_setup: 15000,
      firewall_config: 10000,
      siem_integration: 45000,
    },
    infrastructure: {
      setup: { cloud: 5000, onprem: 15000, hybrid: 10000 },
      reporting: { standard: 0, executive: 5000, regulatory: 15000 }
    },
    monthly: {
      monitoring: { none: 0, basic: 5000, "24/7": 25000 },
      support: { basic: 4000, retainer: 15000 }
    }
  },
  lodging_bms: {
    title: "Lodging BMS",
    currency: "KES ",
    roi_statement: "Preventing just 1 double-booking or missed reservation pays for this entire system in weeks.",
    basePrices: {
      guesthouse: { price: 0, sample: "https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&q=80&w=400", desc: "Small guesthouse / AirBnb setup." },
      hotel: { price: 0, sample: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400", desc: "Full hotel management system." },
      lodge: { price: 0, sample: "https://images.unsplash.com/photo-1449156001935-d25a91bb5653?auto=format&fit=crop&q=80&w=400", desc: "Safari and eco-lodge specific modules." },
      hostel: { price: 0, sample: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=400", desc: "Multi-bed booking and dorm management." },
      resort: { price: 0, sample: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=400", desc: "Full resort and facility management." }
    },
    multipliers: {
      rooms: { "5": 0.8, "15": 1, "30": 1.3, "50": 1.6, "80": 2.0 } // 0.8 mult for very small 1-5 room places
    },
    features: {
      bms: { guesthouse: 15000, hotel: 30000, lodge: 25000, hostel: 18000, resort: 40000 },
      web: { guesthouse: 10000, hotel: 20000, lodge: 15000, hostel: 12000, resort: 25000 },
      online_booking: { guesthouse: 8000, hotel: 15000, lodge: 12000, hostel: 8000, resort: 20000 },
      payment_integration: 5000
    },
    infrastructure: {
      deployment: { local: 2500, shared: 5000, vps: 12000 }
    },
    monthly: {
      hosting: { local: 0, shared: 1500, vps: 3500 },
      support: { none: 0, basic: 1500, premium: 5000 }
    }
  }
};

/**
 * Encapsulated Calculation Engine
 * Designed to prevent easy tampering by decoupling UI state from pricing values.
 */
export const calculateServiceQuote = (serviceKey, config) => {
  const service = SERVICES[serviceKey];
  if (!service) return null;

  let dev = 0;
  let breakdown = [];

  // 1. Base Price + Multiplier
  const baseData = service.basePrices[config.type] || { price: 0 };
  const base = baseData.price;
  const multKey = Object.keys(service.multipliers)[0];
  const mult = service.multipliers[multKey][config.multiplierValue] || 1;
  const initialCost = base * mult;
  dev += initialCost;
  
  if (initialCost > 0) {
    breakdown.push({ name: `Base ${config.type} ${service.title}`, price: initialCost });
  }

  // 2. Features
  Object.keys(config.features).forEach(f => {
    if (config.features[f] && service.features[f]) {
      let price = 0;
      const fData = service.features[f];
      
      if (typeof fData === 'object' && config.type in fData) {
        price = fData[config.type] * mult;
      } else {
        price = fData * mult;
      }
      
      dev += price;
      breakdown.push({ name: `${f.replace(/_/g, ' ')}`, price });
    }
  });

  // 3. Infrastructure / Setup (Once-off)
  let setup = 0;
  let setupBreakdown = [];
  Object.keys(service.infrastructure).forEach(infraKey => {
    const selection = config.infrastructure[infraKey];
    const price = service.infrastructure[infraKey]?.[selection] || 0;
    setup += price;
    if (price > 0) setupBreakdown.push({ name: `${infraKey}: ${selection}`, price });
  });

  // 4. Monthly Recurring
  let monthly = 0;
  let monthlyBreakdown = [];
  Object.keys(service.monthly).forEach(monthlyKey => {
    const selection = config.monthly[monthlyKey];
    const price = service.monthly[monthlyKey]?.[selection] || 0;
    monthly += price;
    if (price > 0) monthlyBreakdown.push({ name: `${monthlyKey}: ${selection}`, price });
  });

  const total = dev + setup + (monthly * 12);

  return {
    dev,
    setup,
    totalOnceOff: dev + setup,
    monthly,
    total,
    breakdown,        // Project Implementation items
    setupBreakdown,   // Setup & Onboarding items
    monthlyBreakdown, // Monthly recurring items
    currency: service.currency,
    roi_statement: service.roi_statement
  };
};
