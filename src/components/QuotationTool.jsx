import React, { useState, useEffect, useMemo } from "react";
import { Calculator, ClipboardList, Megaphone, CheckCircle2, ShieldAlert, Globe, Hotel, ExternalLink, X } from "lucide-react";
import { SERVICES, calculateServiceQuote } from "../constants/pricingEngine";
import { TRANSLATIONS } from "../constants/translations";

const QuotationTool = () => {
  const [activeTab, setActiveTab] = useState("quote");
  const [currentService, setCurrentService] = useState("web_dev");
  const [showSample, setShowSample] = useState(false);
  const [lang, setLang] = useState("en");

  const t = TRANSLATIONS[lang];
  
  // State management using a configuration object to easily switch between services
  const [config, setConfig] = useState({
    clientName: "",
    type: "",
    multiplierValue: "",
    features: {},
    infrastructure: {},
    monthly: {},
  });

  // Initialize features based on service
  useEffect(() => {
    const service = SERVICES[currentService];
    const initialFeatures = {};
    Object.keys(service.features).forEach(f => initialFeatures[f] = (currentService === 'lodging_bms' && f === 'bms') ? true : false);
    
    const initialInfra = {};
    Object.keys(service.infrastructure).forEach(k => initialInfra[k] = Object.keys(service.infrastructure[k])[0]);
    
    const initialMonthly = {};
    Object.keys(service.monthly).forEach(k => initialMonthly[k] = Object.keys(service.monthly[k])[0]);

    setConfig({
      type: Object.keys(service.basePrices)[0],
      multiplierValue: Object.keys(service.multipliers[Object.keys(service.multipliers)[0]])[0],
      features: initialFeatures,
      infrastructure: initialInfra,
      monthly: initialMonthly,
    });
  }, [currentService]);

  // Use useMemo for calculation to prevent UI tampering and redundant cycles
  const quoteResult = useMemo(() => {
    return calculateServiceQuote(currentService, config);
  }, [currentService, config]);

  const toggleFeature = (f) => {
    setConfig((prev) => ({
      ...prev,
      features: { ...prev.features, [f]: !prev.features[f] }
    }));
  };

  const updateInfra = (key, val) => {
    setConfig(prev => ({
      ...prev,
      infrastructure: { ...prev.infrastructure, [key]: val }
    }));
  };

  const updateMonthly = (key, val) => {
    setConfig(prev => ({
      ...prev,
      monthly: { ...prev.monthly, [key]: val }
    }));
  };

  const fmt = (n) => `${quoteResult?.currency || "$"}${Math.round(n).toLocaleString()}`;

  const sendToWhatsApp = () => {
    const businessNumber = "254700000000"; // Replace with your actual number
    const client = config.clientName || "Potential Client";
    const total = fmt(quoteResult.total);
    const service = serviceData.title;
    
    let message = `*PROPOSAL SUMMARY: ${service}*\n`;
    message += `-----------------------------------\n`;
    message += `*For:* ${client}\n`;
    message += `*Total Estimate:* ${total}\n\n`;
    message += `*Breakdown:*\n`;
    quoteResult.breakdown.forEach(item => {
      message += `- ${item.name}: ${fmt(item.price)}\n`;
    });
    message += `- Setup & Deployment: ${fmt(quoteResult.setup)}\n`;
    message += `- Yearly Maintenance: ${fmt(quoteResult.monthly * 12)}\n\n`;
    message += `_This quote was generated on WebQuote Toolkit._\n`;
    message += `*Next Step:* Please let me know when we can discuss the implementation details.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${businessNumber}?text=${encodedMessage}`, "_blank");
  };

  const serviceData = SERVICES[currentService];

  return (
    <div id="quotation-tool" className="mt-20">
      <div className="flex justify-end mb-4">
        <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-full p-1">
          <button 
            onClick={() => setLang("en")}
            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === "en" ? "bg-orange-700 text-white" : "text-neutral-500"}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLang("sw")}
            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === "sw" ? "bg-orange-700 text-white" : "text-neutral-500"}`}
          >
            SW
          </button>
        </div>
      </div>

      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide">
        {t.toolkit_title.split(' ')[0]} <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">{t.toolkit_title.split(' ').slice(1).join(' ')}</span>
      </h2>
      
      {/* Service Selector */}
      <div className="flex justify-center gap-2 mb-10 flex-wrap">
        <button
          onClick={() => setCurrentService("web_dev")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all ${
            currentService === "web_dev" ? "bg-orange-600 border-orange-500 text-white" : "border-neutral-700 text-neutral-500 hover:border-neutral-400"
          }`}
        >
          <Globe size={14} /> Web Development
        </button>
        <button
          onClick={() => setCurrentService("cybersecurity")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all ${
            currentService === "cybersecurity" ? "bg-red-600 border-red-500 text-white" : "border-neutral-700 text-neutral-500 hover:border-neutral-400"
          }`}
        >
          <ShieldAlert size={14} /> Cybersecurity
        </button>
        <button
          onClick={() => setCurrentService("lodging_bms")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all ${
            currentService === "lodging_bms" ? "bg-blue-600 border-blue-500 text-white" : "border-neutral-700 text-neutral-500 hover:border-neutral-400"
          }`}
        >
          <Hotel size={14} /> Lodging BMS
        </button>
      </div>

      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        <button
          onClick={() => setActiveTab("quote")}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg border transition-all ${
            activeTab === "quote" ? "bg-neutral-800 border-neutral-600 text-white" : "border-neutral-700 text-neutral-400 hover:border-neutral-500"
          }`}
        >
          <Calculator size={18} /> {t.quote}
        </button>
        <button
          onClick={() => setActiveTab("discover")}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg border transition-all ${
            activeTab === "discover" ? "bg-neutral-800 border-neutral-600 text-white" : "border-neutral-700 text-neutral-400 hover:border-neutral-500"
          }`}
        >
          <ClipboardList size={18} /> {t.discovery}
        </button>
        <button
          onClick={() => setActiveTab("marketing")}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg border transition-all ${
            activeTab === "marketing" ? "bg-neutral-800 border-neutral-600 text-white" : "border-neutral-700 text-neutral-400 hover:border-neutral-500"
          }`}
        >
          <Megaphone size={18} /> {t.tips}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {activeTab === "quote" && quoteResult && (
          <>
            <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 shadow-2xl">
              <h3 className="text-xl font-semibold mb-6 flex justify-between items-center">
                <span>{lang === 'sw' ? `${t.project_config} (${serviceData.title})` : `${serviceData.title} ${t.project_config}`}</span>
                <span className="text-[10px] bg-neutral-800 px-2 py-1 rounded text-neutral-500 font-mono">SECURE_CALC_V2</span>
              </h3>

              <div className="mb-6">
                <label className="block text-sm text-neutral-400 mb-2">{t.client_name}</label>
                <input
                  type="text"
                  placeholder={lang === 'sw' ? "mfano. Hoteli ya Acme" : "e.g. Acme Guesthouse"}
                  value={config.clientName}
                  onChange={(e) => setConfig(prev => ({ ...prev, clientName: e.target.value }))}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2 text-white"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-neutral-400 mb-2 flex justify-between items-center">
                    <span>{currentService === 'lodging_bms' ? 'Property Type' : 'Project Type'}</span>
                    <button 
                      onClick={() => setShowSample(true)}
                      className="text-[10px] text-orange-500 hover:underline flex items-center gap-1"
                    >
                      <ExternalLink size={10} /> {t.view_sample}
                    </button>
                  </label>
                  <select
                    value={config.type}
                    onChange={(e) => setConfig(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2 text-white"
                  >
                    {Object.keys(serviceData.basePrices).map(k => (
                      <option key={k} value={k}>{k.charAt(0).toUpperCase() + k.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">
                    Scale ({Object.keys(serviceData.multipliers)[0]})
                  </label>
                  <select
                    value={config.multiplierValue}
                    onChange={(e) => setConfig(prev => ({ ...prev, multiplierValue: e.target.value }))}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2 text-white"
                  >
                    {Object.keys(serviceData.multipliers[Object.keys(serviceData.multipliers)[0]]).map(k => (
                      <option key={k} value={k}>{k} {Object.keys(serviceData.multipliers)[0]}</option>
                    ))}
                  </select>
                </div>
              </div>

              <h4 className="text-sm font-medium text-neutral-300 mb-4 uppercase tracking-wider">{t.features}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {Object.keys(serviceData.features).map((f) => (
                  <label key={f} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={config.features[f] || false}
                        onChange={() => toggleFeature(f)}
                        className="sr-only"
                      />
                      <div className={`w-10 h-5 rounded-full transition-colors ${config.features[f] ? (currentService === 'web_dev' ? 'bg-orange-600' : currentService === 'cybersecurity' ? 'bg-red-600' : 'bg-blue-600') : 'bg-neutral-700'}`}></div>
                      <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${config.features[f] ? 'translate-x-5' : ''}`}></div>
                    </div>
                    <span className="text-neutral-400 group-hover:text-neutral-200 transition-colors text-sm">
                      {f.replace(/_/g, ' ').charAt(0).toUpperCase() + f.replace(/_/g, ' ').slice(1)}
                    </span>
                  </label>
                ))}
              </div>

              <h4 className="text-sm font-medium text-neutral-300 mb-4 uppercase tracking-wider">{t.infra}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(serviceData.infrastructure).map(infraKey => (
                  <div key={infraKey}>
                    <label className="block text-xs text-neutral-500 mb-2 uppercase">{infraKey}</label>
                    <select
                      value={config.infrastructure[infraKey]}
                      onChange={(e) => updateInfra(infraKey, e.target.value)}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2 text-white text-sm"
                    >
                      {Object.keys(serviceData.infrastructure[infraKey]).map(opt => (
                        <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                ))}
                {Object.keys(serviceData.monthly).map(monthlyKey => (
                  <div key={monthlyKey}>
                    <label className="block text-xs text-neutral-500 mb-2 uppercase">{monthlyKey} Plan</label>
                    <select
                      value={config.monthly[monthlyKey]}
                      onChange={(e) => updateMonthly(monthlyKey, e.target.value)}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2 text-white text-sm"
                    >
                      {Object.keys(serviceData.monthly[monthlyKey]).map(opt => (
                        <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 flex flex-col shadow-2xl relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1 ${currentService === 'web_dev' ? 'bg-orange-600' : currentService === 'cybersecurity' ? 'bg-red-600' : 'bg-blue-600'}`}></div>
              <h3 className="text-xl font-semibold mb-6 flex items-center justify-between">
                <span>{t.estimate}</span>
                <span className="text-[10px] text-neutral-600 font-mono">NON_REVERSIBLE_CALC</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className={`${currentService === 'web_dev' ? 'bg-orange-900/20 border-orange-800/50' : currentService === 'cybersecurity' ? 'bg-red-900/20 border-red-800/50' : 'bg-blue-900/20 border-blue-800/50'} p-4 rounded-lg text-center border col-span-1 md:col-span-1`}>
                  <div className={`${currentService === 'web_dev' ? 'text-orange-500' : currentService === 'cybersecurity' ? 'text-red-500' : 'text-blue-500'} text-2xl font-bold`}>{fmt(quoteResult.totalOnceOff)}</div>
                  <div className="text-xs text-neutral-300 mt-1 uppercase font-semibold">{t.initial_investment}</div>
                </div>
                <div className="bg-neutral-800 p-4 rounded-lg text-center border border-neutral-700">
                  <div className="text-white text-2xl font-bold">{fmt(quoteResult.monthly)}</div>
                  <div className="text-xs text-neutral-500 mt-1 uppercase tracking-tighter">{t.monthly_ops}</div>
                </div>
                <div className="bg-neutral-800 p-4 rounded-lg text-center border border-neutral-700">
                  <div className="text-white text-2xl font-bold">{fmt(quoteResult.total)}</div>
                  <div className="text-xs text-neutral-500 mt-1 uppercase tracking-tighter">{t.total_life}</div>
                </div>
              </div>

              <div className="flex-grow">
                <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                  {/* One-time Implementation Breakdown */}
                  <div>
                    <h4 className="text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-widest">{t.breakdown}</h4>
                    {quoteResult.breakdown.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-neutral-400 mb-1">
                        <span className="capitalize">{item.name}</span>
                        <span className="font-mono">{fmt(item.price)}</span>
                      </div>
                    ))}
                    {quoteResult.setupBreakdown.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-neutral-400 mb-1">
                        <span className="capitalize">{item.name}</span>
                        <span className="font-mono">{fmt(item.price)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Monthly Recurring Breakdown */}
                  <div className="border-t border-neutral-800 pt-3">
                    <h4 className="text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-widest">{t.monthly_breakdown}</h4>
                    {quoteResult.monthlyBreakdown.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-neutral-400 mb-1">
                        <span className="capitalize">{item.name}</span>
                        <span className="font-mono">{fmt(item.price)}/mo</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm text-neutral-300 border-t border-neutral-800 pt-2 mt-2 font-bold italic">
                      <span>{t.recurring}</span>
                      <span className="font-mono">{fmt(quoteResult.monthly)}/mo</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROI Calculator Section */}
              <div className="mt-6 p-4 bg-orange-900/10 border border-orange-800/30 rounded-lg">
                <h4 className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">{t.roi_title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed italic">
                  "{quoteResult.roi_statement}"
                </p>
              </div>

              <button 
                onClick={sendToWhatsApp}
                className={`mt-8 ${currentService === 'web_dev' ? 'bg-orange-700 hover:bg-orange-800' : currentService === 'cybersecurity' ? 'bg-red-700 hover:bg-red-800' : 'bg-blue-700 hover:bg-blue-800'} text-white font-medium py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2`}
              >
                <Megaphone size={18} /> {t.send_whatsapp}
              </button>
              
              <p className="text-[9px] text-neutral-600 mt-4 text-center italic">
                Calculations are processed through a hardened pricing engine. Client-side state reflects final output only.
              </p>
            </div>
          </>
        )}

        {activeTab === "discover" && (
          <div className="lg:col-span-2 bg-neutral-900 rounded-xl p-8 border border-neutral-800 shadow-xl">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <ClipboardList className={currentService === 'web_dev' ? 'text-orange-500' : currentService === 'cybersecurity' ? 'text-red-500' : 'text-blue-500'} /> 
              {serviceData.title} Discovery
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section>
                <h4 className="text-neutral-200 font-bold mb-4 flex items-center gap-2 uppercase text-xs tracking-widest">
                  {currentService === 'lodging_bms' ? "Current Situation" : "Strategic Objectives"}
                </h4>
                <ul className="space-y-4">
                  {(currentService === 'lodging_bms' ? [
                    "How do you currently track reservations — phone, WhatsApp, or paper?",
                    "Do you ever lose bookings or have double-booking problems?",
                    "How do guests find you? (Walk-in, Booking.com, social media)",
                    "Has anyone here used a booking or hotel software before?"
                  ] : [
                    currentService === 'web_dev' ? "What is the primary conversion goal?" : "What is the critical asset being protected?",
                    currentService === 'web_dev' ? "Who are the key competitors in your niche?" : "What are your primary regulatory compliance requirements?",
                    "What is the expected project lifecycle?"
                  ]).map((q, i) => (
                    <li key={i} className={`text-neutral-400 bg-neutral-800/50 p-4 rounded-lg border-l-2 ${currentService === 'web_dev' ? 'border-orange-700' : currentService === 'cybersecurity' ? 'border-red-700' : 'border-blue-700'}`}>
                      {q}
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h4 className="text-neutral-200 font-bold mb-4 flex items-center gap-2 uppercase text-xs tracking-widest">
                  {currentService === 'lodging_bms' ? "Features & Priorities" : "Technical Landscape"}
                </h4>
                <ul className="space-y-4">
                  {(currentService === 'lodging_bms' ? [
                    "What is your single biggest pain point in managing bookings today?",
                    "Do you want guests to book and pay online themselves?",
                    "Do you accept M-Pesa? Would you want that integrated?",
                    "What is your rough budget for a professional system?"
                  ] : [
                    currentService === 'web_dev' ? "Existing tech stack or preferences?" : "Current security posture and existing tools?",
                    "Stakeholder availability for technical review?",
                    "Hard deadlines and deployment constraints?"
                  ]).map((q, i) => (
                    <li key={i} className={`text-neutral-400 bg-neutral-800/50 p-4 rounded-lg border-l-2 ${currentService === 'web_dev' ? 'border-orange-700' : currentService === 'cybersecurity' ? 'border-red-700' : 'border-blue-700'}`}>
                      {q}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        )}

        {activeTab === "marketing" && (
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(currentService === 'lodging_bms' ? [
              {
                title: "Lead with the Pain",
                desc: "Don't open with technology. Open with: 'Do you ever lose a booking because it was written on paper?'",
                icon: "🚶"
              },
              {
                title: "The Mobile Demo",
                desc: "A live working demo on your phone is worth 100 slides. Show them how to add a booking in 30 seconds.",
                icon: "📱"
              },
              {
                title: "The Starter Tier",
                desc: "Small guesthouses fear big commitments. Offer a basic local system first to build trust.",
                icon: "💰"
              },
              {
                title: "ROI in Months",
                desc: "One double-booking can cost KES 5,000. Frame your system as an investment that pays for itself.",
                icon: "🏆"
              },
              {
                title: "WhatsApp Pitch",
                desc: "Follow up with a 60-second screen recording of your demo on WhatsApp. It's their primary channel.",
                icon: "💬"
              },
              {
                title: "Free Trial",
                desc: "Offer a 2-week local trial. Once they use it, they won't want to go back to a notebook.",
                icon: "⭐"
              }
            ] : [
              {
                title: currentService === 'web_dev' ? "ROI Driven Sales" : "Risk Driven Sales",
                desc: currentService === 'web_dev' ? "Show them how the website pays for itself in X months through new leads." : "Show them the cost of a data breach vs the cost of your audit.",
                icon: "💰"
              },
              {
                title: "Live Estimation",
                desc: "Walk through the configuration together. It builds trust and demonstrates technical transparency.",
                icon: "📊"
              },
              {
                title: "Retainer Upsell",
                desc: "Never leave a project without a support retainer. It's the lifeblood of your business stability.",
                icon: "🔄"
              }
            ]).map((tip, idx) => (
              <div key={idx} className={`bg-neutral-900 border border-neutral-800 p-6 rounded-xl transition-all hover:shadow-lg ${currentService === 'web_dev' ? 'hover:border-orange-900' : currentService === 'cybersecurity' ? 'hover:border-red-900' : 'hover:border-blue-900'}`}>
                <div className="text-3xl mb-4">{tip.icon}</div>
                <h4 className="text-lg font-semibold mb-2">{tip.title}</h4>
                <p className="text-sm text-neutral-400 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Portfolio Sample Modal */}
      {showSample && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
            <div className="relative h-64 w-full bg-neutral-800">
              <img 
                src={serviceData.basePrices[config.type]?.sample} 
                alt="Sample" 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setShowSample(false)}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-bold mb-2 capitalize">{t.sample_of} {config.type.replace(/_/g, ' ')}</h4>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                {serviceData.basePrices[config.type]?.desc} This represents a typical implementation of our {serviceData.title} {config.type} tier.
              </p>
              <div className="flex justify-end">
                <button 
                  onClick={() => setShowSample(false)}
                  className="px-6 py-2 bg-orange-700 text-white rounded-lg hover:bg-orange-800 transition-colors"
                >
                  {t.got_it}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuotationTool;