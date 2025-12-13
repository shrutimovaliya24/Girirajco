'use client';

import { useState, useEffect, useRef } from 'react';
import Icon from './Icon';
import { useTranslation } from '../hooks/useTranslation';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { gpbModels } from '../products/gpb-models';

export default function FuelSavingsCalculator() {
  const { t } = useTranslation();
  const [selectedFuel, setSelectedFuel] = useState('Diesel');
  const [fuelUsage, setFuelUsage] = useState('');
  const [fuelRate, setFuelRate] = useState('');
  const [operatingHours, setOperatingHours] = useState('');
  const [operatingHoursError, setOperatingHoursError] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: buttonRef, isVisible: buttonVisible } = useScrollAnimation({ threshold: 0.2 });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const fuelOptions = [
    { value: 'Diesel', label: 'Diesel' },
    { value: 'LPG', label: 'LPG' },
    { value: 'PNG', label: 'PNG' },
    { value: 'Furnace Oil', label: 'Furnace Oil' },
    { value: 'LDO', label: 'LDO' },
  ];

  const fuelCalorificValues: Record<string, { value: number; unit: string }> = {
    'Diesel': { value: 11000, unit: 'kcal/ltr' },
    'LPG': { value: 12000, unit: 'kcal/kg' },
    'PNG': { value: 10500, unit: 'kcal/scm' },
    'LDO': { value: 10200, unit: 'kcal/ltr' },
    'Furnace Oil': { value: 10500, unit: 'kcal/ltr' },
  };

  const fuelUsagePlaceholders: Record<string, string> = {
    'Diesel': 'Enter usage in ltr per hour',
    'LPG': 'Enter usage in kg per hour',
    'PNG': 'Enter usage in scm per hour',
    'LDO': 'Enter usage in ltr per hour',
    'Furnace Oil': 'Enter usage in ltr per hour',
  };

  const fuelUsageUnits: Record<string, string> = {
    'Diesel': 'ltr/hour',
    'LPG': 'kg/hour',
    'PNG': 'scm/hour',
    'LDO': 'ltr/hour',
    'Furnace Oil': 'ltr/hour',
  };

  // Calculate wood pellets fuel usage
  const calculateWoodPelletsUsage = (): number | null => {
    if (!fuelUsage || !fuelCalorificValues[selectedFuel]) {
      return null;
    }
    const selectedFuelCalorificValue = fuelCalorificValues[selectedFuel].value;
    const woodPelletsCalorificValue = 4100;
    const usage = parseFloat(fuelUsage);
    if (isNaN(usage)) {
      return null;
    }
    return (selectedFuelCalorificValue * usage) / woodPelletsCalorificValue;
  };

  const woodPelletsUsage = calculateWoodPelletsUsage();

  // Calculate fuel cost per hour
  const calculateFuelCostPerHour = (): number | null => {
    if (!fuelRate || !fuelUsage) {
      return null;
    }
    const rate = parseFloat(fuelRate);
    const usage = parseFloat(fuelUsage);
    if (isNaN(rate) || isNaN(usage)) {
      return null;
    }
    return rate * usage;
  };

  const fuelCostPerHour = calculateFuelCostPerHour();

  // Calculate wood pellets fuel cost per hour
  const calculateWoodPelletsCostPerHour = (): number | null => {
    if (woodPelletsUsage === null) {
      return null;
    }
    return woodPelletsUsage * 15;
  };

  const woodPelletsCostPerHour = calculateWoodPelletsCostPerHour();

  // Calculate fuel cost saving per hour
  const calculateFuelCostSavingPerHour = (): number | null => {
    if (fuelCostPerHour === null || woodPelletsCostPerHour === null) {
      return null;
    }
    return fuelCostPerHour - woodPelletsCostPerHour;
  };

  const fuelCostSavingPerHour = calculateFuelCostSavingPerHour();

  // Calculate fuel cost saving per month
  const calculateFuelCostSavingPerMonth = (): number | null => {
    if (fuelCostSavingPerHour === null || !operatingHours) {
      return null;
    }
    const hours = parseFloat(operatingHours);
    if (isNaN(hours)) {
      return null;
    }
    return fuelCostSavingPerHour * hours * 26; // 26 is fixed value for days per month
  };

  const fuelCostSavingPerMonth = calculateFuelCostSavingPerMonth();

  // Calculate fuel cost saving per year
  const calculateFuelCostSavingPerYear = (): number | null => {
    if (fuelCostSavingPerMonth === null) {
      return null;
    }
    return fuelCostSavingPerMonth * 12; // 12 is fixed value for months per year
  };

  const fuelCostSavingPerYear = calculateFuelCostSavingPerYear();

  // Calculate model based on calorific value × fuel usage
  const calculateModel = (): string | null => {
    if (!fuelCalorificValues[selectedFuel] || !fuelUsage) {
      return null;
    }
    const calorificValue = fuelCalorificValues[selectedFuel].value;
    const usage = parseFloat(fuelUsage);
    if (isNaN(usage)) {
      return null;
    }
    const heatOutput = calorificValue * usage; // kcal/hour
    
    // If heat output is 15,00,000 (15 lakhs) or more, show contact message
    // This is above the largest GPB model (GPB-15: 15,00,000)
    if (heatOutput >= 1500000) {
      return t('fuelCalculator.contactForCustomizedModel');
    }
    
    // Find the appropriate GPB model based on heat output
    // Find the smallest model that can handle the heat output
    for (const model of gpbModels) {
      const modelCapacity = parseFloat(model.maxHeatCapacity.replace(/,/g, ''));
      if (heatOutput <= modelCapacity) {
        return model.id;
      }
    }
    // If heat output exceeds all models, return the largest model
    return gpbModels[gpbModels.length - 1].id;
  };

  const selectedModel = calculateModel();

  // Get max heat capacity from selected model
  const getMaxHeatCapacity = (): string | null => {
    if (!selectedModel) {
      return null;
    }
    // If model is "Contact for customized model" or heat output >= 15,00,000, return null (display "-")
    if (selectedModel === t('fuelCalculator.contactForCustomizedModel')) {
      return null;
    }
    // Check if heat output is 15,00,000+ by calculating it
    if (fuelCalorificValues[selectedFuel] && fuelUsage) {
      const calorificValue = fuelCalorificValues[selectedFuel].value;
      const usage = parseFloat(fuelUsage);
      if (!isNaN(usage)) {
        const heatOutput = calorificValue * usage;
        if (heatOutput >= 1500000) {
          return null; // Display "-" for customized models
        }
      }
    }
    const model = gpbModels.find(m => m.id === selectedModel);
    return model ? `${model.maxHeatCapacity} kcal/hour` : null;
  };

  const maxHeatCapacity = getMaxHeatCapacity();

  // GPB Model rates mapping
  const gpbModelRates: Record<string, number> = {
    'GPB-01': 300000,
    'GPB-02': 400000,
    'GPB-03': 450000,
    'GPB-04': 500000,
    'GPB-05': 600000,
    'GPB-06': 650000,
    'GPB-08': 750000,
    'GPB-10': 850000,
    'GPB-12': 1000000,
    'GPB-15': 1200000,
  };

  // Calculate payback period in months
  const calculatePaybackPeriod = (): number => {
    if (!selectedModel || !fuelCostSavingPerMonth) {
      return 1; // Default to 1 if no data
    }
    
    // If model is "Contact for customized model", return 1
    if (selectedModel === t('fuelCalculator.contactForCustomizedModel')) {
      return 1;
    }
    
    const modelRate = gpbModelRates[selectedModel];
    if (!modelRate) {
      return 1; // Default to 1 if model not found
    }
    
    const paybackMonths = modelRate / fuelCostSavingPerMonth;
    
    // Round to nearest integer (no floating values)
    const roundedMonths = Math.round(paybackMonths);
    
    // Apply rules: if < 1, show 1; if < 2, show 2; otherwise show calculated value
    if (roundedMonths < 1) {
      return 1;
    } else if (roundedMonths < 2) {
      return 2;
    } else {
      return roundedMonths;
    }
  };

  const paybackMonths = calculatePaybackPeriod();

  const handleCalculate = () => {
    // Only show results when calculate button is clicked and required fields are filled
    if (fuelUsage && operatingHours && fuelRate) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  // Reset showResults when input data changes
  useEffect(() => {
    setShowResults(false);
  }, [selectedFuel, fuelUsage, fuelRate, operatingHours]);

  return (
    <section ref={sectionRef} id="fuel-savings-calculator" className="relative w-full bg-white py-4 sm:py-5 md:py-8 lg:py-8 xl:py-10">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10 xl:px-12 2xl:px-16">
        {/* Section Title */}
        <div ref={titleRef} className={`text-center mb-4 sm:mb-5 md:mb-8 lg:mb-8 animate-on-scroll ${titleVisible ? 'animate-textAppear animated' : ''}`}>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-2.5 md:mb-3" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}>
            {t('fuelCalculator.title')}
          </h2>
          <div className="flex justify-center mb-2 sm:mb-2.5">
            <div className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-32 h-0.5 sm:h-1 bg-yellow-400"></div>
          </div>
          <p className={`text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed animate-on-scroll ${titleVisible ? 'animate-textAppear animated' : ''}`} style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            {t('fuelCalculator.description')}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 sm:gap-6 md:gap-8">
          {/* Left Section - Input Form */}
          <div ref={formRef} className={`lg:col-span-3 space-y-3 sm:space-y-3.5 md:space-y-4 animate-on-scroll ${formVisible ? 'animate-textAppear animated' : ''}`}>
            {/* Select Your Fuel */}
            <div ref={dropdownRef}>
              <label className="block text-sm sm:text-xs md:text-sm font-medium text-gray-900 mb-2 sm:mb-2" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                {t('fuelCalculator.selectFuel')}
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-3 py-3 sm:px-3 sm:py-2.5 md:px-4 md:py-3 bg-white border-2 border-[#5FAA3F] rounded-lg text-sm sm:text-xs md:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5FAA3F] focus:ring-offset-1 cursor-pointer text-left flex items-center justify-between transition-all duration-200 min-h-[44px]"
                  style={{ 
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                  }}
                >
                  <span>{fuelOptions.find(f => f.value === selectedFuel)?.label || t('fuelCalculator.selectFuelPlaceholder')}</span>
                  <Icon name="chevron-down" className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`} style={{ color: '#5FAA3F' }} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white border-2 border-[#5FAA3F] rounded-lg shadow-lg overflow-hidden">
                    {fuelOptions.map((fuel) => (
                      <button
                        key={fuel.value}
                        type="button"
                        onClick={() => {
                          setSelectedFuel(fuel.value);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-3 sm:px-4 sm:py-3 text-left text-sm sm:text-xs md:text-sm transition-colors duration-200 min-h-[44px] ${
                          selectedFuel === fuel.value
                            ? 'bg-[#5FAA3F] text-white'
                            : 'bg-white text-gray-900 hover:bg-[#5FAA3F] hover:text-white'
                        }`}
                        style={{ 
                          fontFamily: 'var(--font-inter), Inter, sans-serif',
                        }}
                      >
                        {fuel.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Current Fuel Rate */}
            <div>
              <label className="block text-sm sm:text-xs md:text-sm font-medium text-gray-900 mb-2 sm:mb-2" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                {t('fuelCalculator.currentFuelRate')}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm sm:text-xs md:text-sm text-gray-700 z-10" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>₹</span>
                <input
                  type="number"
                  value={fuelRate}
                  onChange={(e) => setFuelRate(e.target.value)}
                  placeholder={t('fuelCalculator.fuelPricePlaceholder')}
                  className="w-full pl-8 pr-3 py-3 sm:pl-8 sm:pr-3 sm:py-2.5 md:pl-8 md:pr-4 md:py-3 bg-white border border-gray-300 rounded-lg text-sm sm:text-xs md:text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5FAA3F] focus:border-[#5FAA3F] min-h-[44px]"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                />
              </div>
            </div>

            {/* Fuel Usage Per Hour */}
            <div>
              <label className="block text-sm sm:text-xs md:text-sm font-medium text-gray-900 mb-2 sm:mb-2" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                {t('fuelCalculator.fuelUsagePerHour')}
              </label>
              <input
                type="number"
                value={fuelUsage}
                onChange={(e) => setFuelUsage(e.target.value)}
                placeholder={fuelUsagePlaceholders[selectedFuel] || t('fuelCalculator.fuelUsagePlaceholder')}
                className="w-full px-3 py-3 sm:px-3 sm:py-2.5 md:px-4 md:py-3 bg-white border border-gray-300 rounded-lg text-sm sm:text-xs md:text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5FAA3F] focus:border-[#5FAA3F] min-h-[44px]"
              />
            </div>

            {/* Operating Hours Per Day */}
            <div>
              <label className="block text-sm sm:text-xs md:text-sm font-medium text-gray-900 mb-2 sm:mb-2" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                {t('fuelCalculator.operatingHoursPerDay')}
              </label>
              <input
                type="number"
                value={operatingHours}
                onChange={(e) => {
                  const value = e.target.value;
                  setOperatingHours(value);
                  
                  if (value === '') {
                    setOperatingHoursError('');
                  } else {
                    const numValue = parseFloat(value);
                    if (!isNaN(numValue)) {
                      if (numValue > 24) {
                        setOperatingHoursError(t('fuelCalculator.operatingHoursError'));
                      } else {
                        setOperatingHoursError('');
                      }
                    } else {
                      setOperatingHoursError('');
                    }
                  }
                }}
                placeholder={t('fuelCalculator.operatingHoursPlaceholder')}
                min="0"
                className={`w-full px-3 py-3 sm:px-3 sm:py-2.5 md:px-4 md:py-3 bg-white border rounded-lg text-sm sm:text-xs md:text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 min-h-[44px] ${
                  operatingHoursError 
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-[#5FAA3F] focus:border-[#5FAA3F]'
                }`}
              />
              {operatingHoursError && (
                <p className="mt-1 text-xs sm:text-xs text-red-600" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                  {operatingHoursError}
                </p>
              )}
            </div>

            {/* Calculate Button - Green Gradient (Primary) */}
            <div ref={buttonRef} className={`animate-on-scroll ${buttonVisible ? 'animate-textAppear animated' : ''}`}>
            <button
              onClick={handleCalculate}
              className="w-full px-4 py-3 sm:px-4 sm:py-2.5 md:px-5 md:py-3 text-white font-semibold rounded-lg transition-all duration-300 text-sm sm:text-sm md:text-sm shadow-md hover:shadow-lg min-h-[44px]"
              style={{ 
                background: 'linear-gradient(90deg, #5FAA3F, #2E7D32)',
                fontFamily: 'var(--font-poppins), Poppins, sans-serif'
              }}
            >
                {t('fuelCalculator.calculateSavings')}
            </button>
            </div>
          </div>

          {/* Right Section - Comparison Table */}
          <div className={`lg:col-span-7 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden animate-on-scroll ${formVisible ? 'animate-textAppear animated' : ''}`}>
            <div className="overflow-x-auto">
              <table className="w-full" style={{ minWidth: '600px', tableLayout: 'fixed' }}>
                <colgroup>
                  <col style={{ width: '45%' }} />
                  <col style={{ width: '27.5%' }} />
                  <col style={{ width: '27.5%' }} />
                </colgroup>
                <thead>
                  <tr style={{ background: 'linear-gradient(90deg, #5FAA3F, #2E7D32)' }} className="text-white">
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold border-r-2 border-white/50">{t('fuelCalculator.fuel')}</th>
                    <th className="px-4 py-3 text-center text-xs sm:text-sm font-semibold border-r-2 border-white/50">{selectedFuel}</th>
                    <th className="px-4 py-3 text-center text-xs sm:text-sm font-semibold">{t('fuelCalculator.woodPellets')}</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: '#F5F5F5' }}>
                  {/* Calorific Value */}
                  <tr className="border-b border-green-200">
                    <td className="px-4 py-3 text-xs sm:text-sm font-medium text-gray-900 border-r-2" style={{ borderColor: '#5FAA3F' }}>{t('fuelCalculator.calorificValue')}</td>
                    <td className="px-4 py-3 text-center text-xs sm:text-sm text-gray-700 border-r-2" style={{ borderColor: '#5FAA3F' }}>
                      {fuelCalorificValues[selectedFuel] ? `${fuelCalorificValues[selectedFuel].value.toLocaleString()} (${fuelCalorificValues[selectedFuel].unit})` : '-'}
                    </td>
                    <td className="px-4 py-3 text-center text-xs sm:text-sm text-gray-700">4100 {t('fuelCalculator.calorificValueUnit')}</td>
                  </tr>

                  {/* Fuel Usage Per Hour */}
                  <tr className="border-b border-green-200">
                    <td className="px-4 py-3 text-xs sm:text-sm font-medium text-gray-900 border-r-2" style={{ borderColor: '#5FAA3F' }}>{t('fuelCalculator.fuelUsagePerHourTable')}</td>
                    <td className="px-4 py-3 text-center text-xs sm:text-sm text-gray-700 border-r-2" style={{ borderColor: '#5FAA3F' }}>
                      {fuelUsage ? `${fuelUsage} (${fuelUsageUnits[selectedFuel] || t('fuelCalculator.fuelUsageUnit')})` : `- (${fuelUsageUnits[selectedFuel] || t('fuelCalculator.fuelUsageUnit')})`}
                    </td>
                    <td className="px-4 py-3 text-center text-xs sm:text-sm text-gray-700">
                      {woodPelletsUsage !== null ? `${woodPelletsUsage.toFixed(2)} ${t('fuelCalculator.fuelUsageUnit')}` : `- ${t('fuelCalculator.fuelUsageUnit')}`}
                    </td>
                  </tr>

                  {/* Fuel Cost Per Hour */}
                  <tr className="border-b border-green-200">
                    <td className="px-4 py-3 text-xs sm:text-sm font-medium text-gray-900 border-r-2" style={{ borderColor: '#5FAA3F' }}>{t('fuelCalculator.fuelCostPerHour')}</td>
                    <td className="px-4 py-3 text-center text-xs sm:text-sm text-gray-700 border-r-2" style={{ borderColor: '#5FAA3F' }}>
                      {fuelCostPerHour !== null ? `₹ ${fuelCostPerHour.toLocaleString()}` : '₹'}
                    </td>
                    <td className="px-4 py-3 text-center text-xs sm:text-sm text-gray-700">
                      {woodPelletsCostPerHour !== null ? `₹ ${woodPelletsCostPerHour.toFixed(2)}` : '₹ -'}
                    </td>
                  </tr>

                  {/* Fuel Cost Saving Per Hour */}
                  <tr className="border-b border-green-200">
                    <td className="px-4 py-3 text-xs sm:text-sm font-medium text-gray-900 border-r-2" style={{ borderColor: '#5FAA3F' }}>{t('fuelCalculator.fuelCostSavingPerHour')}</td>
                    <td className="px-4 py-3 text-center text-xs sm:text-sm text-gray-700" colSpan={2}>
                      {fuelCostSavingPerHour !== null ? `₹ ${fuelCostSavingPerHour.toFixed(2)}` : '₹ -'}
                    </td>
                  </tr>

                  {/* Fuel Cost Saving Per Month */}
                  <tr className="border-b border-green-200">
                    <td className="px-4 py-3 text-xs sm:text-sm font-medium text-gray-900 border-r-2" style={{ borderColor: '#5FAA3F' }}>{t('fuelCalculator.fuelCostSavingPerMonth')}</td>
                    <td className="px-4 py-3 text-center text-xs sm:text-sm text-gray-700" colSpan={2}>
                      {fuelCostSavingPerMonth !== null ? `₹ ${fuelCostSavingPerMonth.toFixed(2)}` : '₹ -'}
                    </td>
                  </tr>

                  {/* Fuel Cost Saving Per Year */}
                  <tr className="border-b border-green-200">
                    <td className="px-4 py-3 text-xs sm:text-sm font-medium text-gray-900 border-r-2" style={{ borderColor: '#5FAA3F' }}>{t('fuelCalculator.fuelCostSavingPerYear')}</td>
                    <td className="px-4 py-3 text-center text-xs sm:text-sm text-gray-700" colSpan={2}>
                      {fuelCostSavingPerYear !== null ? `₹ ${fuelCostSavingPerYear.toFixed(2)}` : '₹ -'}
                    </td>
                  </tr>

                  {/* Model */}
                  <tr className="border-b border-green-200">
                    <td className="px-4 py-3 text-xs sm:text-sm font-medium text-gray-900 border-r-2" style={{ borderColor: '#5FAA3F' }}>{t('fuelCalculator.model')}</td>
                    <td className="px-4 py-3 text-center text-xs sm:text-sm text-gray-700" colSpan={2}>
                      {selectedModel || '-'}
                    </td>
                  </tr>

                  {/* Max Heat Output */}
                  <tr>
                    <td className="px-4 py-3 text-xs sm:text-sm font-medium text-gray-900 border-r-2" style={{ borderColor: '#5FAA3F' }}>{t('fuelCalculator.maxHeatOutput')}</td>
                    <td className="px-4 py-3 text-center text-xs sm:text-sm text-gray-700" colSpan={2}>
                      {maxHeatCapacity || '-'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Success Message */}
            {showResults && (
              <div className="mt-4 sm:mt-6 px-4 sm:px-6 py-3 sm:py-4 rounded-lg" style={{ 
                background: 'linear-gradient(135deg, #5FAA3F 0%, #2E7D32 100%)',
                borderTop: '2px solid #5FAA3F',
                boxShadow: '0 4px 6px -1px rgba(95, 170, 63, 0.2), 0 2px 4px -1px rgba(95, 170, 63, 0.1)'
              }}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-lg sm:text-xl">🌿</span>
                  <p className="text-xs sm:text-sm font-semibold" style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                  }}>
                    <span style={{ color: '#FFD700', fontWeight: 'bold' }}>{t('fuelCalculator.congratulations')}</span> {t('fuelCalculator.recoverCostMessage')} {selectedModel === t('fuelCalculator.contactForCustomizedModel') ? (
                      <span style={{ color: '#FFD700', fontWeight: 'bold' }}>{t('fuelCalculator.fewMonths')}</span>
                    ) : (
                      <>
                        <span style={{ color: '#FFD700', fontWeight: 'bold' }}>{paybackMonths}</span> {t('fuelCalculator.months')}
                      </>
                    )}.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

