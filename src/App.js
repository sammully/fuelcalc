import React, { useState, useEffect } from 'react';
import './styles.css';

const FUEL_TYPES = {
  '91': { name: 'Regular 91', price: 2.60 },
  '95': { name: 'Premium 95', price: 2.66 },
  '98': { name: 'Premium 98', price: 2.75 },
  'Diesel': { name: 'Diesel', price: 1.85 }
};

function App() {
  const [fuelCost, setFuelCost] = useState('');
  const [fuelType, setFuelType] = useState('91');
  const [distance, setDistance] = useState('');
  const [mileage, setMileage] = useState('');
  const [isRoundtrip, setIsRoundtrip] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [history, setHistory] = useState([]);

  // Initialize data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('fuelcalc-data');
    if (savedData) {
      const data = JSON.parse(savedData);
      setFuelCost(data.fuelCost || '');
      setFuelType(data.fuelType || '91');
      setDistance(data.distance || '');
      setMileage(data.mileage || '');
      setIsRoundtrip(data.isRoundtrip || false);
    }

    const savedHistory = localStorage.getItem('fuelcalc-history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    const savedTheme = localStorage.getItem('fuelcalc-theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  // Save input data to localStorage
  useEffect(() => {
    const data = { fuelCost, fuelType, distance, mileage, isRoundtrip };
    localStorage.setItem('fuelcalc-data', JSON.stringify(data));
  }, [fuelCost, fuelType, distance, mileage, isRoundtrip]);

  // Handle theme change
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    const themeStr = newTheme ? 'dark' : 'light';
    localStorage.setItem('fuelcalc-theme', themeStr);
    document.documentElement.setAttribute('data-theme', themeStr);
  };

  // Update fuel cost when type changes
  const handleFuelTypeChange = (type) => {
    setFuelType(type);
    setFuelCost(FUEL_TYPES[type].price.toString());
  };

  const calculateFuelCost = () => {
    if (!fuelCost || !distance || !mileage) return null;
    
    const costPerLiter = parseFloat(fuelCost);
    let distanceKm = parseFloat(distance);
    const litersPer100km = parseFloat(mileage);
    
    if (isRoundtrip) {
      distanceKm *= 2;
    }
    
    const fuelNeeded = (distanceKm * litersPer100km) / 100;
    const totalCost = fuelNeeded * costPerLiter;
    
    return {
      fuelNeeded: fuelNeeded.toFixed(2),
      totalCost: totalCost.toFixed(2),
      distance: distanceKm.toFixed(1),
      fuelType: FUEL_TYPES[fuelType]?.name || 'Custom'
    };
  };

  const result = calculateFuelCost();

  const saveToHistory = () => {
    if (!result) return;
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      ...result
    };
    const updatedHistory = [newEntry, ...history].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem('fuelcalc-history', JSON.stringify(updatedHistory));
  };

  return (
    <div className="app">
      <div className="calculator">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        
        <h1>Fuel Cost Calculator</h1>
        
        <div className="input-group">
          <label>Fuel Type (NZ Average)</label>
          <div className="fuel-selector">
            <select value={fuelType} onChange={(e) => handleFuelTypeChange(e.target.value)}>
              {Object.entries(FUEL_TYPES).map(([key, value]) => (
                <option key={key} value={key}>{value.name} (${value.price}/L)</option>
              ))}
              <option value="custom">Custom Price</option>
            </select>
            <input
              type="number"
              step="0.001"
              value={fuelCost}
              onChange={(e) => {
                setFuelCost(e.target.value);
                setFuelType('custom');
              }}
              placeholder="Price/L"
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="distance">Distance (km)</label>
          <input
            id="distance"
            type="number"
            step="0.1"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Enter distance in km"
          />
          <div className="checkbox-group">
            <input
              id="roundtrip"
              type="checkbox"
              checked={isRoundtrip}
              onChange={(e) => setIsRoundtrip(e.target.checked)}
            />
            <label htmlFor="roundtrip" className="checkbox-label">Roundtrip (double distance)</label>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="mileage">Mileage (liters per 100km)</label>
          <input
            id="mileage"
            type="number"
            step="0.1"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            placeholder="Enter liters per 100km"
          />
        </div>

        {result && (
          <div className="result">
            <h2>Results</h2>
            <div className="result-item">
              <span>Fuel Needed:</span>
              <span>{result.fuelNeeded} L</span>
            </div>
            <div className="result-item">
              <span>Total Cost:</span>
              <span>${result.totalCost}</span>
            </div>
            <button 
              onClick={saveToHistory}
              style={{
                width: '100%',
                marginTop: '15px',
                padding: '10px',
                background: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Save to History
            </button>
          </div>
        )}

        {history.length > 0 && (
          <div className="history">
            <h3>Recent Calculations</h3>
            <ul className="history-list">
              {history.map((item) => (
                <li key={item.id} className="history-item">
                  <div className="history-details">
                    <span>{item.date} • {item.distance}km</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.fuelType}</span>
                  </div>
                  <span className="history-cost">${item.totalCost}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;