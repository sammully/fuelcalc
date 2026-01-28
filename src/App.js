import React, { useState } from 'react';
import './styles.css';

function App() {
  const [fuelCost, setFuelCost] = useState('');
  const [distance, setDistance] = useState('');
  const [mileage, setMileage] = useState('');

  const calculateFuelCost = () => {
    if (!fuelCost || !distance || !mileage) return null;
    
    const costPerLiter = parseFloat(fuelCost);
    const distanceKm = parseFloat(distance);
    const litersPer100km = parseFloat(mileage);
    
    const fuelNeeded = (distanceKm * litersPer100km) / 100;
    const totalCost = fuelNeeded * costPerLiter;
    
    return {
      fuelNeeded: fuelNeeded.toFixed(2),
      totalCost: totalCost.toFixed(2)
    };
  };

  const result = calculateFuelCost();

  return (
    <div className="app">
      <div className="calculator">
        <h1>Fuel Cost Calculator</h1>
        
        <div className="input-group">
          <label htmlFor="fuelCost">Fuel Cost (per liter)</label>
          <input
            id="fuelCost"
            type="number"
            step="0.01"
            value={fuelCost}
            onChange={(e) => setFuelCost(e.target.value)}
            placeholder="Enter cost per liter"
          />
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
            <h2>Calculation Results</h2>
            <div className="result-item">
              <span>Fuel Needed:</span>
              <span>{result.fuelNeeded} liters</span>
            </div>
            <div className="result-item">
              <span>Total Cost:</span>
              <span>${result.totalCost}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;