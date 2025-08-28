# Weather Now 🌤️

A modern, responsive weather application built for outdoor enthusiasts like Jamie. Get instant weather updates for any city around the world with a clean, user-friendly interface.

## Features

- 🌍 **Global Weather Search**: Search for weather information in any city worldwide
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Clean, intuitive interface with beautiful gradients and animations
- ⚡ **Real-time Data**: Powered by the Open-Meteo API for accurate weather information
- 🌡️ **Comprehensive Weather Info**: Temperature, humidity, wind speed, and more
- 🌙 **Day/Night Indicators**: Visual indicators for time of day
- ❌ **Error Handling**: Graceful error handling with user-friendly messages
- 🔄 **Loading States**: Smooth loading animations and feedback

## Technology Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **API**: Open-Meteo Weather API (no authentication required)
- **State Management**: React's built-in useState hook

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+ (recommended)
- npm or yarn package manager

### Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd weather_app_assignment
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Usage

1. **Search for a City**: Enter any city name in the search bar and click "Search"
2. **View Weather Data**: See current temperature, weather conditions, humidity, and wind speed
3. **Responsive Experience**: The app adapts to your screen size for optimal viewing

## Project Structure

```
src/
├── components/
│   ├── SearchBar.jsx       # City search input component
│   ├── WeatherCard.jsx     # Weather information display
│   └── ErrorMessage.jsx    # Error handling component
├── utils/
│   └── weatherApi.js       # API utilities and weather helpers
├── App.jsx                 # Main application component
├── index.css               # Tailwind CSS styles
└── main.jsx               # Application entry point
```

## API Information

This application uses the [Open-Meteo API](https://open-meteo.com/), which provides:
- Free weather data with no API key required
- Global coverage for cities worldwide
- Real-time weather information
- Geocoding for city name to coordinates conversion

## Features in Detail

### Weather Information
- Current temperature in Celsius
- Weather condition descriptions with emoji icons
- Wind speed in km/h
- Humidity percentage
- Day/night status
- Last updated timestamp

### User Experience
- Fast search with real-time feedback
- Loading animations during API calls
- Clear error messages for network issues or city not found
- Responsive design for all device sizes
- Accessibility-focused design

## Browser Support

This application supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This project was built as a coding assignment. Feel free to fork and modify as needed.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Weather data provided by [Open-Meteo](https://open-meteo.com/)
- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

Built with ❤️ for Jamie and all outdoor enthusiasts!

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
