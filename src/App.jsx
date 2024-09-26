import React, { useState } from 'react';

function App() {
  const [evRoadTax, setEvRoadTax] = useState('100');
  const [maintenanceCost, setMaintenanceCost] = useState('90');
  const [maintenanceMiles, setMaintenanceMiles] = useState('5000');
  const [gasPrice, setGasPrice] = useState('2.99');
  const [mpg, setMpg] = useState('25');
  const [electricityCost, setElectricityCost] = useState('0.13');
  const [milesPerKwh, setMilesPerKwh] = useState('4.5');
  const [annualMiles, setAnnualMiles] = useState('12000');
  const [phevGasPercentage, setPhevGasPercentage] = useState('0');

  // Parsing input values for calculations
  const evRoadTaxNum = parseFloat(evRoadTax) || 0;
  const maintenanceCostNum = parseFloat(maintenanceCost) || 0;
  const maintenanceMilesNum = parseFloat(maintenanceMiles) || 1; // Avoid division by zero
  const gasPriceNum = parseFloat(gasPrice) || 0;
  const mpgNum = parseFloat(mpg) || 1; // Avoid division by zero
  const electricityCostNum = parseFloat(electricityCost) || 0;
  const milesPerKwhNum = parseFloat(milesPerKwh) || 1; // Avoid division by zero
  const annualMilesNum = parseFloat(annualMiles) || 1; // Avoid division by zero

  // Parse PHEV gas percentage
  const phevGasPercentageNum = parseFloat(phevGasPercentage) || 0;
  const phevElectricPercentage = 100 - phevGasPercentageNum;

  // Ensure percentages sum to 100%
  const totalPercentage = phevGasPercentageNum + phevElectricPercentage;
  const gasUsageFraction = phevGasPercentageNum / totalPercentage;
  const electricUsageFraction = phevElectricPercentage / totalPercentage;

  // Calculations
  const gasMaintenancePerMile = maintenanceCostNum / maintenanceMilesNum;
  const gasFuelCostPerMile = gasPriceNum / mpgNum;
  const gasTotalCostPerMile = gasFuelCostPerMile + gasMaintenancePerMile;

  const evFuelCostPerMile = electricityCostNum / milesPerKwhNum;

  // Calculate PHEV blended cost per mile
  const phevBlendedCostPerMile =
    (gasTotalCostPerMile * gasUsageFraction) +
    (evFuelCostPerMile * electricUsageFraction);

  const evRoadTaxPerMile = evRoadTaxNum / annualMilesNum;
  const evTotalCostPerMile = phevBlendedCostPerMile + evRoadTaxPerMile;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-center">EV vs Gas Cost per Mile Calculator</h1>
        <p className="prose pb-4">This simple calculator helps determine the expected cost per mile for
          an <abbr title="Electric Vehicle">EV</abbr> or <abbr title="Plug-in Hybrid Electric Vehicle">PHEV</abbr>{" "}
          vehicle compare to a standard <abbr title="Internal Combustion Engine">ICE</abbr>{" "}
          gas-powered vehicle. For simplicity, it assumes that registration costs (excluding EV road tax, below),
          insurance, and tires are equivalent in cost between vehicles. It also does not account for other EV benefits such as reduced brake wear due to regenerative braking.
        </p>

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
            <div className="mb-4">
              <label className="block text-gray-700">PHEV Miles Driven on Gas (%)</label>
              <input
                type="number"
                value={phevGasPercentage}
                onChange={(e) => {
                  let value = e.target.value;
                  if (value === '') {
                    setPhevGasPercentage('0');
                  } else if (parseFloat(value) >= 0 && parseFloat(value) <= 100) {
                    setPhevGasPercentage(value);
                  }
                }}
                className="mt-1 p-2 w-full border rounded"
                min="0"
                max="100"
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
            <h2 className="text-lg font-semibold mb-2">{phevGasPercentageNum==0?"EV":"PHEV"} Cost per Mile</h2>
            <p className="text-gray-700">
              <strong>Energy Cost per Mile:</strong> ${evFuelCostPerMile.toFixed(4)}
            </p>
            {phevGasPercentageNum>0 &&
            <p className="text-gray-700">
              <strong>Blended Cost per Mile:</strong> ${phevBlendedCostPerMile.toFixed(4)}
            </p>}
            <p className="text-gray-700">
              <strong>Road Tax per Mile:</strong> ${evRoadTaxPerMile.toFixed(4)}
            </p>
            <p className="text-gray-700">
              <strong>Total Cost per Mile:</strong> ${evTotalCostPerMile.toFixed(4)}
            </p>
            <p className="text-gray-700 mt-4">
              <strong>Total Annual Costs:</strong> ${(evTotalCostPerMile*annualMiles).toFixed(0)}
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
            <p className="text-gray-700 mt-4">
              <strong>Total Annual Costs:</strong> ${(gasTotalCostPerMile*annualMiles).toFixed(0)}
            </p>
          </div>
        </div>

        {/* Comparison */}
        <div className="mt-6 text-center">
          {evTotalCostPerMile < gasTotalCostPerMile ? (
            <p className="text-green-700 text-xl font-bold">
              {phevGasPercentageNum==0?"EV":"PHEV"} is cheaper by ${(gasTotalCostPerMile - evTotalCostPerMile).toFixed(4)} per mile.
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
      <div className="text-xs p-4 text-zinc-600 flex items-center">
        <a className="flex items-center gap-x-1 mr-1" href="https://github.com/pbnjay/evvgas">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.97578 0C3.57211 0 0.000244141 3.57186 0.000244141 7.97553C0.000244141 11.4985 2.29994 14.4832 5.43144 15.5596C5.82287 15.6086 5.96966 15.3639 5.96966 15.1682C5.96966 14.9725 5.96966 14.4832 5.96966 13.7982C3.76783 14.2875 3.27853 12.7217 3.27853 12.7217C2.93602 11.792 2.3978 11.5474 2.3978 11.5474C1.66385 11.0581 2.44673 11.0581 2.44673 11.0581C3.2296 11.107 3.66997 11.8899 3.66997 11.8899C4.40391 13.1131 5.5293 12.7706 5.96966 12.5749C6.01859 12.0367 6.26324 11.6942 6.45896 11.4985C4.69749 11.3028 2.83816 10.6177 2.83816 7.53517C2.83816 6.65443 3.13174 5.96942 3.66997 5.38226C3.62104 5.23547 3.32746 4.40367 3.76783 3.32722C3.76783 3.32722 4.45284 3.1315 5.96966 4.15902C6.60575 3.9633 7.29076 3.91437 7.97578 3.91437C8.66079 3.91437 9.34581 4.01223 9.98189 4.15902C11.4987 3.1315 12.1837 3.32722 12.1837 3.32722C12.6241 4.40367 12.3305 5.23547 12.2816 5.43119C12.7709 5.96942 13.1134 6.70336 13.1134 7.5841C13.1134 10.6667 11.2541 11.3028 9.4926 11.4985C9.78618 11.7431 10.0308 12.2324 10.0308 12.9664C10.0308 14.0428 10.0308 14.8746 10.0308 15.1682C10.0308 15.3639 10.1776 15.6086 10.5691 15.5596C13.7495 14.4832 16.0002 11.4985 16.0002 7.97553C15.9513 3.57186 12.3794 0 7.97578 0Z" fill="#424242"/>
          </svg> Concept/Prompts
        </a>
        <p>
          by <a className="font-bold" href="https://github.com/pbnjay">@pbnjay</a>.
          Code by <a className="font-bold"
          href="https://help.openai.com/en/articles/9824965-using-openai-o1-models-and-gpt-4o-models-on-chatgpt">o1-preview</a> and <a className="font-bold"
          href="https://github.com/pbnjay">@pbnjay</a>.
        </p>
        </div>
    </div>
  );
}

export default App;
