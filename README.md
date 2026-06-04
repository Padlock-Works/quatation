# WebQuote - Multi-Service Quotation Toolkit

WebQuote is a professional quotation and pricing engine designed for independent contractors and service providers. It supports multiple business verticals including Web Development, Cybersecurity, and Lodging BMS (Booking Management Systems).

## Features

- **Multi-Service Support:** Switch between Web Dev, Cybersecurity, and Lodging BMS with a single click.
- **Interactive Pricing Engine:** Dynamic calculations based on project scale, features, and infrastructure.
- **Discovery Questions:** Pre-built questionnaires to guide client discovery meetings.
- **Marketing & Sales Tips:** Expert advice tailored to each service vertical.
- **Anti-Tamper Architecture:** Core pricing logic is encapsulated in a decoupled engine to mitigate client-side manipulation.
- **Responsive Design:** Fully optimized for mobile use during live client demos.

## Setup Instructions

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your machine.

### 2. Installation
Clone the repository and install the dependencies:
```bash
git clone <repository-url>
cd quatation
npm install
```

### 3. Development
Start the local development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### 4. Production Build
To create a production-ready bundle:
```bash
npm run build
```
The output will be generated in the `dist/` directory.

### 5. Adding New Services
The toolkit is designed for easy extension. To add a new service (e.g., "Graphic Design"):
1. Open `src/constants/pricingEngine.js`.
2. Add a new service entry to the `SERVICES` object following the established schema.
3. The UI will automatically detect and render the new service option.

## Project Structure

- `src/constants/pricingEngine.js`: The "brain" of the app. Contains all pricing data and calculation logic.
- `src/components/QuotationTool.jsx`: The main interactive component that handles state and UI rendering.
- `src/constants/index.jsx`: General website content (testimonials, features, etc.).

## License
This project is open-source and available under the MIT License.
