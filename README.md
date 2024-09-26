# How this was made

I had already done these calculations in my own spreadsheet, but thought it would be a nice experiment to see how far ChatGPT's o1-preview can go with a simple well-defined application. Turns out pretty far!

I've added some explaination text to the app, and the footer that links here, otherwise the full application build process that happened over ChatGPT is available below!

## Prompt by [@pbnjay](https://github.com/pbnjay):

>     I would like to make a simple Web app that calculates and compares the cost per mile for an EV vs a gas car. Assume equal costs for DMV Registration, Insurance, and Tires for both vehicles. It should include annual costs like EV road taxes ($X per year, often included in registration), regular mainentance costs like oil changes ($X per N miles), and Gas per gallon vs MPG for the gas car, and $ per kwh and miles per kwh for the EV.
>
>     Can you build a simple one-page React app for this, using Tailwind CSS for the components?

## Response by `o1-preview`:

Certainly! Below is a simple one-page React app that calculates and compares the cost per mile for an electric vehicle (EV) versus a gas car. The app uses Tailwind CSS for styling.

### Features:

- **Input Fields**: Users can input values such as EV road tax, maintenance costs, gas price, MPG, electricity cost, miles per kWh, and annual miles driven.
- **Real-Time Calculation**: The app calculates and displays the cost per mile for both EV and gas cars as the user inputs data.
- **Comparison**: It shows which option is more cost-effective per mile.

---

### Setup Instructions

[Omitted for brevity, full response is here.](response1.md)

### How the App Works

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

### Notes

- **Assumptions**:
  - Equal costs for DMV registration, insurance, and tires are not included since they are assumed equal.
  - Only variable costs are considered in the calculations.
- **Responsive Design**: The app layout adjusts for mobile and desktop views using Tailwind's responsive utilities.

### Customization

- **Tailwind Config**: You can customize the theme and plugins in `tailwind.config.js` as needed.
- **Styling**: Modify classes in JSX elements to change the styling per your preference.
- **Additional Features**: Feel free to add more input fields or calculations, such as depreciation, if desired.

---

Let me know if you need further assistance or additional features added to the app!

---

## Prompt by [@pbnjay](https://github.com/pbnjay):

>     When inputing decimal values (e.g. 4.3 miles per kwh, or 0.09 $/kwh) the value disappears when the decimal is added.

## Response by `o1-preview`:

I apologize for the inconvenience you're experiencing. The issue occurs because the `onChange` handlers are using `parseFloat` directly on the input values. When you type a decimal point (e.g., "0."), `parseFloat` cannot parse it into a valid number and returns `NaN`. This causes the state to be set to `NaN`, and since the input's `value` is bound to this state, the input field gets cleared or the value disappears.

To fix this issue, we need to adjust how we handle input values and state updates. Here's what we'll do:

1. **Store Input Values as Strings**: We'll modify the state variables to store the input values as strings instead of numbers.

2. **Update onChange Handlers**: We'll update the state with the input values as strings, allowing users to type decimal points without the input clearing.

3. **Parse Values for Calculations**: Before performing calculations, we'll parse the string input values to numbers and handle cases where the parsed value is `NaN`.

Below is the updated `App.jsx` code with these changes implemented.

---

### Updated `App.jsx` and Explanation of Changes

[Omitted for brevity, full response is here.](response2.md)

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

## Prompt by [@pbnjay](https://github.com/pbnjay):

>     Can you add a field to estimate "blended" PHEV costs? E.g. use the cost per mile of the gas car for X% of the EV calculation? Just provide the changes, not the whole App this time

## Response by `o1-preview`:

Certainly! To estimate "blended" PHEV (Plug-in Hybrid Electric Vehicle) costs, we'll introduce a new input field where users can specify the percentage of miles driven using gasoline versus electricity. We'll then calculate the blended cost per mile based on this percentage.

Below are the changes you need to make to your existing `App.jsx` file:

---

### Changes

> It struggled with the prompt ambiguity here, opting to make multiple new sections instead of a few minor changes. I made the simplifications to o1-preview's generated code myself and incorporated them in the new version of the app.

[Omitted for brevity, full response is here.](response3.md)

### **Summary of Changes**

1. **State Variable**: Added `phevGasPercentage` to store the user's input for the percentage of miles driven on gas.
2. **Input Field**: Created a new input field under a "PHEV Blended Usage" section for users to input the gas percentage.
3. **Calculations**: Calculated the blended PHEV cost per mile using the weighted average of gas and electric costs per mile.
4. **Display Results**: Added a new section to display the PHEV blended cost per mile and usage percentages.
5. **Comparison**: Optionally updated the comparison section to include the PHEV in the cost comparison.

---

### **Complete Code Snippets for Reference**

[Omitted for brevity, full response is here.](response3.md)

### **Additional Notes**

- **User Input Validation**: It's important to ensure that the gas percentage input remains between 0 and 100%. The `min` and `max` attributes in the input field help, but consider adding more robust validation if necessary.
- **Edge Cases**: Be cautious with division by zero. Ensure that denominators in calculations are not zero to avoid runtime errors.
- **Styling**: Adjust the styling (classes and colors) as needed to match the rest of your app.

---

Let me know if you need further assistance or additional modifications!
