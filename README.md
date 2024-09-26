# How this was made

I had already done these calculations in my own spreadsheet, but thought it would be a nice experiment to see how far ChatGPT's o1-preview can go with a simple well-defined application. Turns out pretty far!

I added some explaination text and the footer that link here, otherwise the full application build process is verbatim below!

## Prompt by [@pbnjay](https://github.com/pbnjay):

>     I would like to make a simple Web app that calculates and compares the cost per mile for an EV vs a gas car. Assume equal costs for DMV Registration, Insurance, and Tires for both vehicles. It should include annual costs like EV road taxes ($X per year, often included in registration), regular mainentance costs like oil changes ($X per N miles), and Gas per gallon vs MPG for the gas car, and $ per kwh and miles per kwh for the EV.
>
>     Can you build a simple one-page React app for this, using Tailwind CSS for the components?

# Response by `o1-preview`:

Certainly! Below is a simple one-page React app that calculates and compares the cost per mile for an electric vehicle (EV) versus a gas car. The app uses Tailwind CSS for styling.

### Features:

- **Input Fields**: Users can input values such as EV road tax, maintenance costs, gas price, MPG, electricity cost, miles per kWh, and annual miles driven.
- **Real-Time Calculation**: The app calculates and displays the cost per mile for both EV and gas cars as the user inputs data.
- **Comparison**: It shows which option is more cost-effective per mile.

---

## Setup Instructions

### 1. Create a New React App

You can use Vite for a lightweight setup:

```bash
npm create vite@latest ev-vs-gas-cost-calculator -- --template react
cd ev-vs-gas-cost-calculator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Tailwind CSS

Follow Tailwind CSS installation for React:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 4. Configure Tailwind CSS

Replace the content of `tailwind.config.js` with:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 5. Add Tailwind Directives to CSS

Create a `src/index.css` file and add:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 6. Update `main.jsx`

Import the `index.css` file in `main.jsx`:

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Import Tailwind CSS

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 7. Build the App Component

Create an `App.jsx` file in the `src` directory with the following content:

```jsx
import React, { useState } from "react";

function App() {
  const [evRoadTax, setEvRoadTax] = useState(100);
  const [maintenanceCost, setMaintenanceCost] = useState(50);
  const [maintenanceMiles, setMaintenanceMiles] = useState(5000);
  const [gasPrice, setGasPrice] = useState(3.5);
  const [mpg, setMpg] = useState(25);
  const [electricityCost, setElectricityCost] = useState(0.13);
  const [milesPerKwh, setMilesPerKwh] = useState(3);
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
        <h1 className="text-2xl font-bold mb-4 text-center">
          EV vs Gas Cost per Mile Calculator
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* EV Inputs */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Electric Vehicle</h2>
            <div className="mb-4">
              <label className="block text-gray-700">
                EV Road Tax ($ per year)
              </label>
              <input
                type="number"
                value={evRoadTax}
                onChange={(e) => setEvRoadTax(parseFloat(e.target.value))}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Electricity Cost ($ per kWh)
              </label>
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
              <label className="block text-gray-700">
                Maintenance Cost ($ per service)
              </label>
              <input
                type="number"
                value={maintenanceCost}
                onChange={(e) => setMaintenanceCost(parseFloat(e.target.value))}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Maintenance Interval (miles)
              </label>
              <input
                type="number"
                value={maintenanceMiles}
                onChange={(e) =>
                  setMaintenanceMiles(parseFloat(e.target.value))
                }
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Gas Price ($ per gallon)
              </label>
              <input
                type="number"
                value={gasPrice}
                onChange={(e) => setGasPrice(parseFloat(e.target.value))}
                className="mt-1 p-2 w-full border rounded"
                step="0.01"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Miles per Gallon (MPG)
              </label>
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
              <strong>Energy Cost per Mile:</strong> $
              {evFuelCostPerMile.toFixed(4)}
            </p>
            <p className="text-gray-700">
              <strong>Road Tax per Mile:</strong> ${evRoadTaxPerMile.toFixed(4)}
            </p>
            <p className="text-gray-700">
              <strong>Total Cost per Mile:</strong> $
              {evTotalCostPerMile.toFixed(4)}
            </p>
          </div>

          {/* Gas Car Results */}
          <div className="bg-blue-50 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">
              Gas Car Cost per Mile
            </h2>
            <p className="text-gray-700">
              <strong>Fuel Cost per Mile:</strong> $
              {gasFuelCostPerMile.toFixed(4)}
            </p>
            <p className="text-gray-700">
              <strong>Maintenance per Mile:</strong> $
              {gasMaintenancePerMile.toFixed(4)}
            </p>
            <p className="text-gray-700">
              <strong>Total Cost per Mile:</strong> $
              {gasTotalCostPerMile.toFixed(4)}
            </p>
          </div>
        </div>

        {/* Comparison */}
        <div className="mt-6 text-center">
          {evTotalCostPerMile < gasTotalCostPerMile ? (
            <p className="text-green-700 text-xl font-bold">
              EV is cheaper by $
              {(gasTotalCostPerMile - evTotalCostPerMile).toFixed(4)} per mile.
            </p>
          ) : evTotalCostPerMile > gasTotalCostPerMile ? (
            <p className="text-blue-700 text-xl font-bold">
              Gas Car is cheaper by $
              {(evTotalCostPerMile - gasTotalCostPerMile).toFixed(4)} per mile.
            </p>
          ) : (
            <p className="text-gray-700 text-xl font-bold">
              Both cost the same per mile.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
```

### 8. Start the App

Run the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the URL provided in the terminal).

---

## How the App Works

- **State Management**: We use the `useState` hook to manage input values.
- **Calculations**: Cost per mile for both EV and gas cars are calculated based on user inputs.
  - **EV Cost per Mile**:
    - **Energy Cost per Mile** = Electricity Cost ($ per kWh) / Miles per kWh
    - **Road Tax per Mile** = EV Road Tax ($ per year) / Annual Miles Driven
    - **Total EV Cost per Mile** = Energy Cost per Mile + Road Tax per Mile
  - **Gas Car Cost per Mile**:
    - **Fuel Cost per Mile** = Gas Price ($ per gallon) / MPG
    - **Maintenance Cost per Mile** = Maintenance Cost ($ per service) / Maintenance Interval (miles)
    - **Total Gas Cost per Mile** = Fuel Cost per Mile + Maintenance Cost per Mile
- **Comparison**: The app displays which option is cheaper per mile and by how much.

## Notes

- **Assumptions**:
  - Equal costs for DMV registration, insurance, and tires are not included since they are assumed equal.
  - Only variable costs are considered in the calculations.
- **Responsive Design**: The app layout adjusts for mobile and desktop views using Tailwind's responsive utilities.

## Customization

- **Tailwind Config**: You can customize the theme and plugins in `tailwind.config.js` as needed.
- **Styling**: Modify classes in JSX elements to change the styling per your preference.
- **Additional Features**: Feel free to add more input fields or calculations, such as depreciation, if desired.

---

Let me know if you need further assistance or additional features added to the app!

---

## Prompt by [@pbnjay](https://github.com/pbnjay):

>     When inputing decimal values (e.g. 4.3 miles per kwh, or 0.09 $/kwh) the value disappears when the decimal is added.

# Response by `o1-preview`:

I apologize for the inconvenience you're experiencing. The issue occurs because the `onChange` handlers are using `parseFloat` directly on the input values. When you type a decimal point (e.g., "0."), `parseFloat` cannot parse it into a valid number and returns `NaN`. This causes the state to be set to `NaN`, and since the input's `value` is bound to this state, the input field gets cleared or the value disappears.

To fix this issue, we need to adjust how we handle input values and state updates. Here's what we'll do:

1. **Store Input Values as Strings**: We'll modify the state variables to store the input values as strings instead of numbers.

2. **Update onChange Handlers**: We'll update the state with the input values as strings, allowing users to type decimal points without the input clearing.

3. **Parse Values for Calculations**: Before performing calculations, we'll parse the string input values to numbers and handle cases where the parsed value is `NaN`.

Below is the updated `App.jsx` code with these changes implemented.

---

### Updated `App.jsx`

```jsx
import React, { useState } from "react";

function App() {
  const [evRoadTax, setEvRoadTax] = useState("100");
  const [maintenanceCost, setMaintenanceCost] = useState("50");
  const [maintenanceMiles, setMaintenanceMiles] = useState("5000");
  const [gasPrice, setGasPrice] = useState("3.5");
  const [mpg, setMpg] = useState("25");
  const [electricityCost, setElectricityCost] = useState("0.13");
  const [milesPerKwh, setMilesPerKwh] = useState("3");
  const [annualMiles, setAnnualMiles] = useState("12000");

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
        <h1 className="text-2xl font-bold mb-4 text-center">
          EV vs Gas Cost per Mile Calculator
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* EV Inputs */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Electric Vehicle</h2>
            <div className="mb-4">
              <label className="block text-gray-700">
                EV Road Tax ($ per year)
              </label>
              <input
                type="number"
                value={evRoadTax}
                onChange={(e) => setEvRoadTax(e.target.value)}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Electricity Cost ($ per kWh)
              </label>
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
              <label className="block text-gray-700">
                Maintenance Cost ($ per service)
              </label>
              <input
                type="number"
                value={maintenanceCost}
                onChange={(e) => setMaintenanceCost(e.target.value)}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Maintenance Interval (miles)
              </label>
              <input
                type="number"
                value={maintenanceMiles}
                onChange={(e) => setMaintenanceMiles(e.target.value)}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Gas Price ($ per gallon)
              </label>
              <input
                type="number"
                value={gasPrice}
                onChange={(e) => setGasPrice(e.target.value)}
                className="mt-1 p-2 w-full border rounded"
                step="0.01"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Miles per Gallon (MPG)
              </label>
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
              <strong>Energy Cost per Mile:</strong> $
              {evFuelCostPerMile.toFixed(4)}
            </p>
            <p className="text-gray-700">
              <strong>Road Tax per Mile:</strong> ${evRoadTaxPerMile.toFixed(4)}
            </p>
            <p className="text-gray-700">
              <strong>Total Cost per Mile:</strong> $
              {evTotalCostPerMile.toFixed(4)}
            </p>
          </div>

          {/* Gas Car Results */}
          <div className="bg-blue-50 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">
              Gas Car Cost per Mile
            </h2>
            <p className="text-gray-700">
              <strong>Fuel Cost per Mile:</strong> $
              {gasFuelCostPerMile.toFixed(4)}
            </p>
            <p className="text-gray-700">
              <strong>Maintenance per Mile:</strong> $
              {gasMaintenancePerMile.toFixed(4)}
            </p>
            <p className="text-gray-700">
              <strong>Total Cost per Mile:</strong> $
              {gasTotalCostPerMile.toFixed(4)}
            </p>
          </div>
        </div>

        {/* Comparison */}
        <div className="mt-6 text-center">
          {evTotalCostPerMile < gasTotalCostPerMile ? (
            <p className="text-green-700 text-xl font-bold">
              EV is cheaper by $
              {(gasTotalCostPerMile - evTotalCostPerMile).toFixed(4)} per mile.
            </p>
          ) : evTotalCostPerMile > gasTotalCostPerMile ? (
            <p className="text-blue-700 text-xl font-bold">
              Gas Car is cheaper by $
              {(evTotalCostPerMile - gasTotalCostPerMile).toFixed(4)} per mile.
            </p>
          ) : (
            <p className="text-gray-700 text-xl font-bold">
              Both cost the same per mile.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
```

---

### Explanation of Changes

- **State Variables as Strings**: All state variables now store input values as strings. This allows users to type decimal points and incomplete numbers without the input clearing.

  ```javascript
  const [evRoadTax, setEvRoadTax] = useState("100");
  // ... similar changes for other state variables
  ```

- **onChange Handlers**: The `onChange` handlers now update the state with the input value directly, without parsing it immediately.

  ```javascript
  onChange={(e) => setEvRoadTax(e.target.value)}
  ```

- **Parsing for Calculations**: Before performing any calculations, we parse the string input values to numbers using `parseFloat`. We use the logical OR (`||`) operator to handle cases where `parseFloat` returns `NaN` (when the input is invalid or empty). In such cases, we default to `0` or `1` (to avoid division by zero).

  ```javascript
  const evRoadTaxNum = parseFloat(evRoadTax) || 0;
  const maintenanceMilesNum = parseFloat(maintenanceMiles) || 1; // Avoid division by zero
  // ... similar parsing for other variables
  ```

- **Calculations**: We perform calculations using the parsed numeric values.

  ```javascript
  const gasMaintenancePerMile = maintenanceCostNum / maintenanceMilesNum;
  // ... other calculations
  ```

### Benefits of This Approach

- **User Experience**: Users can now type decimal points and incomplete numbers without the input field clearing or the value disappearing.

- **Validation**: By parsing the input values during calculations, we can handle invalid inputs gracefully, ensuring that the app doesn't crash and provides meaningful results.

- **Flexibility**: Storing input values as strings allows for more complex validation or formatting in the future if needed.

### Additional Tips

- **Input Validation**: You can enhance the app by adding input validation messages or highlighting invalid inputs to guide the user.

- **Edge Cases**: Ensure that division by zero is handled to prevent any runtime errors.

- **Decimal Precision**: Adjust the `toFixed` method in the results to display the desired number of decimal places.

---

Let me know if this resolves the issue or if you need further assistance!
