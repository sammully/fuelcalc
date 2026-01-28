# Fuel Cost Calculator

A simple React application to calculate fuel costs based on distance, mileage, and fuel price.

## Features

- Calculate fuel needed for a trip
- Compute total fuel cost
- Real-time calculations as you type
- Clean, responsive interface
- No dependencies required for basic usage

## How It Works

The calculator uses three inputs:

1. **Fuel Cost (per liter)**: The price of fuel per liter
2. **Distance (km)**: The total distance you plan to travel
3. **Mileage (liters per 100km)**: Your vehicle's fuel consumption

The formula used:
```
Fuel Needed = (Distance × Mileage) ÷ 100
Total Cost = Fuel Needed × Fuel Cost
```

## Usage

### Option 1: Direct HTML (Recommended for quick testing)
Open `index.html` directly in your web browser. No setup required.

### Option 2: Development Server
1. Clone this repository
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. Open http://localhost:3000

## Example

If your inputs are:
- Fuel Cost: $1.85 per liter
- Distance: 250 km
- Mileage: 7.5 liters per 100km

Results:
- Fuel Needed: 18.75 liters
- Total Cost: $34.69

## Technologies Used

- React 18
- CSS3 with modern layout techniques
- No additional libraries required

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).