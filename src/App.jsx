import React, { useState } from 'react';

function App() {
  const [evRoadTax, setEvRoadTax] = useState(140);
  const [maintenanceCost, setMaintenanceCost] = useState(90);
  const [maintenanceMiles, setMaintenanceMiles] = useState(5000);
  const [gasPrice, setGasPrice] = useState(3);
  const [mpg, setMpg] = useState(25);
  const [electricityCost, setElectricityCost] = useState(0.13);
  const [milesPerKwh, setMilesPerKwh] = useState(4.3);
  const [annualMiles, setAnnualMiles] = useState(12000);

  // Calculations
  const gasMaintenancePerMile = maintenanceCost / maintenanceMiles;
  const gasFuelCostPerMile = gasPrice / mpg;
  const gasTotalCostPerMile = gasFuelCostPerMile + gasMaintenancePerMile;

  const evFuelCostPerMile = electricityCost / milesPerKwh;
  const evRoadTaxPerMile = evRoadTax / annualMiles;
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
                onChange={(e) => setEvRoadTax(parseFloat(e.target.value))}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Electricity Cost ($ per kWh)</label>
              <input
                type="number"
                value={electricityCost}
                onChange={(e) => setElectricityCost(parseFloat(e.target.value))}
                className="mt-1 p-2 w-full border rounded"
                step="0.01"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Miles per kWh</label>
              <input
                type="number"
                value={milesPerKwh}
                onChange={(e) => setMilesPerKwh(parseFloat(e.target.value))}
                className="mt-1 p-2 w-full border rounded"
                step="0.1"
              />
            </div>
          </div>

          {/* Gas Car Inputs */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Gas Car</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Maintenance Cost ($ per oil change)</label>
              <input
                type="number"
                value={maintenanceCost}
                onChange={(e) => setMaintenanceCost(parseFloat(e.target.value))}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Maintenance Interval (miles)</label>
              <input
                type="number"
                value={maintenanceMiles}
                onChange={(e) => setMaintenanceMiles(parseFloat(e.target.value))}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Gas Price ($ per gallon)</label>
              <input
                type="number"
                value={gasPrice}
                onChange={(e) => setGasPrice(parseFloat(e.target.value))}
                className="mt-1 p-2 w-full border rounded"
                step="0.01"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Miles per Gallon (MPG)</label>
              <input
                type="number"
                value={mpg}
                onChange={(e) => setMpg(parseFloat(e.target.value))}
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
            onChange={(e) => setAnnualMiles(parseFloat(e.target.value))}
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

