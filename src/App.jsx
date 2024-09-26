import React, { useState } from 'react';

function App() {
  const [evRoadTax, setEvRoadTax] = useState('100');
  const [maintenanceCost, setMaintenanceCost] = useState('50');
  const [maintenanceMiles, setMaintenanceMiles] = useState('5000');
  const [gasPrice, setGasPrice] = useState('3.5');
  const [mpg, setMpg] = useState('25');
  const [electricityCost, setElectricityCost] = useState('0.13');
  const [milesPerKwh, setMilesPerKwh] = useState('3');
  const [annualMiles, setAnnualMiles] = useState('12000');

  // Parsing input values for calculations
  const evRoadTaxNum = parseFloat(evRoadTax) || 0;
  const maintenanceCostNum = parseFloat(maintenanceCost) || 0;
  const maintenanceMilesNum = parseFloat(maintenanceMiles) || 1; // Avoid division by zero
  const gasPriceNum = parseFloat(gasPrice) || 0;
  const mpgNum = parseFloat(mpg) || 1; // Avoid division by zero
  const electricityCostNum = parseFloat(electricityCost) || 0;
  const milesPerKwhNum = parseFloat(milesPerKwh) || 1; // Avoid division by zero
  const annualMilesNum = parseFloat(annualMiles) || 1; // Avoid division by zero

  // Calculations
  const gasMaintenancePerMile = maintenanceCostNum / maintenanceMilesNum;
  const gasFuelCostPerMile = gasPriceNum / mpgNum;
  const gasTotalCostPerMile = gasFuelCostPerMile + gasMaintenancePerMile;

  const evFuelCostPerMile = electricityCostNum / milesPerKwhNum;
  const evRoadTaxPerMile = evRoadTaxNum / annualMilesNum;
  const evTotalCostPerMile = evFuelCostPerMile + evRoadTaxPerMile;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-center">EV vs Gas Cost per Mile Calculator</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* EV Inputs */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Electric Vehicle</h2>
            <div className="mb-4">
              <label className="block text-gray-700">EV Road Tax ($ per year)</label>
              <input
                type="number"
                value={evRoadTax}
                onChange={(e) => setEvRoadTax(e.target.value)}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Electricity Cost ($ per kWh)</label>
              <input
                type="number"
                value={electricityCost}
                onChange={(e) => setElectricityCost(e.target.value)}
                className="mt-1 p-2 w-full border rounded"
                step="0.01"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Miles per kWh</label>
              <input
                type="number"
                value={milesPerKwh}
                onChange={(e) => setMilesPerKwh(e.target.value)}
                className="mt-1 p-2 w-full border rounded"
                step="0.1"
              />
            </div>
          </div>

          {/* Gas Car Inputs */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Gas Car</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Maintenance Cost ($ per service)</label>
              <input
                type="number"
                value={maintenanceCost}
                onChange={(e) => setMaintenanceCost(e.target.value)}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Maintenance Interval (miles)</label>
              <input
                type="number"
                value={maintenanceMiles}
                onChange={(e) => setMaintenanceMiles(e.target.value)}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Gas Price ($ per gallon)</label>
              <input
                type="number"
                value={gasPrice}
                onChange={(e) => setGasPrice(e.target.value)}
                className="mt-1 p-2 w-full border rounded"
                step="0.01"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Miles per Gallon (MPG)</label>
              <input
                type="number"
                value={mpg}
                onChange={(e) => setMpg(e.target.value)}
                className="mt-1 p-2 w-full border rounded"
                step="0.1"
              />
            </div>
          </div>
        </div>

        {/* Annual Miles */}
        <div className="mb-6">
          <label className="block text-gray-700">Annual Miles Driven</label>
          <input
            type="number"
            value={annualMiles}
            onChange={(e) => setAnnualMiles(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* EV Results */}
          <div className="bg-green-50 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">EV Cost per Mile</h2>
            <p className="text-gray-700">
              <strong>Energy Cost per Mile:</strong> ${evFuelCostPerMile.toFixed(4)}
            </p>
            <p className="text-gray-700">
              <strong>Road Tax per Mile:</strong> ${evRoadTaxPerMile.toFixed(4)}
            </p>
            <p className="text-gray-700">
              <strong>Total Cost per Mile:</strong> ${evTotalCostPerMile.toFixed(4)}
            </p>
          </div>

          {/* Gas Car Results */}
          <div className="bg-blue-50 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Gas Car Cost per Mile</h2>
            <p className="text-gray-700">
              <strong>Fuel Cost per Mile:</strong> ${gasFuelCostPerMile.toFixed(4)}
            </p>
            <p className="text-gray-700">
              <strong>Maintenance per Mile:</strong> ${gasMaintenancePerMile.toFixed(4)}
            </p>
            <p className="text-gray-700">
              <strong>Total Cost per Mile:</strong> ${gasTotalCostPerMile.toFixed(4)}
            </p>
          </div>
        </div>

        {/* Comparison */}
        <div className="mt-6 text-center">
          {evTotalCostPerMile < gasTotalCostPerMile ? (
            <p className="text-green-700 text-xl font-bold">
              EV is cheaper by ${(gasTotalCostPerMile - evTotalCostPerMile).toFixed(4)} per mile.
            </p>
          ) : evTotalCostPerMile > gasTotalCostPerMile ? (
            <p className="text-blue-700 text-xl font-bold">
              Gas Car is cheaper by ${(evTotalCostPerMile - gasTotalCostPerMile).toFixed(4)} per mile.
            </p>
          ) : (
            <p className="text-gray-700 text-xl font-bold">Both cost the same per mile.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
