import { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ErrorMessage from './components/ErrorMessage';
import { fetchCityCoordinates, fetchWeatherData } from './utils/weatherApi';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [cityInfo, setCityInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (cityName) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    setCityInfo(null);

    try {
      // First, get city coordinates
      const coordinates = await fetchCityCoordinates(cityName);
      setCityInfo(coordinates);

      // Then, fetch weather data
      const weather = await fetchWeatherData(coordinates.latitude, coordinates.longitude);
      setWeatherData(weather);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentLocation = async () => {
    if (navigator.geolocation) {
      setLoading(true);
      setError(null);
      setWeatherData(null);
      setCityInfo(null);

      // If page isn't secure, most browsers will block precise geolocation
      if (typeof window !== 'undefined' && !window.isSecureContext) {
        console.warn('Precise geolocation typically requires HTTPS or localhost. Use https or localhost for best results.');
      }

      // Try to understand permission state (when supported)
      try {
        if (navigator.permissions && navigator.permissions.query) {
          const status = await navigator.permissions.query({ name: 'geolocation' });
          if (status.state === 'denied') {
            setError('Location permission is blocked in the browser. Please enable it for this site and try again.');
          }
        }
      } catch {}

      const onPositionSuccess = async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weather = await fetchWeatherData(latitude, longitude);
          setWeatherData(weather);
          setCityInfo({
            name: 'Current Location',
            latitude,
            longitude,
            country: '',
            state: ''
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      const onPositionError = async () => {
        // Ask user whether to use approximate location instead of silently falling back
        try {
          const useApprox = window.confirm('Precise location was blocked or timed out. Use approximate location via your IP instead?');
          if (!useApprox) {
            setError('Location was not granted. Please enable location access in your browser settings and try again.');
            return;
          }
          const res = await fetch('https://ipapi.co/json/');
          if (!res.ok) throw new Error('IP lookup failed');
          const data = await res.json();
          const latitude = data.latitude;
          const longitude = data.longitude;
          if (typeof latitude !== 'number' || typeof longitude !== 'number') {
            throw new Error('IP location not available');
          }
          const weather = await fetchWeatherData(latitude, longitude);
          setWeatherData(weather);
          setCityInfo({
            name: data.city ? `${data.city} (Approx.)` : 'Approx. Location',
            latitude,
            longitude,
            country: data.country_name || '',
            state: data.region || ''
          });
        } catch (e) {
          setError('Unable to retrieve your location. Please allow location access in the browser or try again.');
        } finally {
          setLoading(false);
        }
      };

      navigator.geolocation.getCurrentPosition(onPositionSuccess, onPositionError, {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      });
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const handleRetry = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 opacity-90">
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-400 via-transparent to-yellow-300 opacity-40 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-gradient-x"></div>
      </div>
      
      {/* Floating Geometric Shapes */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full mix-blend-overlay animate-pulse transform animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-yellow-300 rounded-full mix-blend-overlay animate-bounce transform animate-float-delayed"></div>
        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-blue-300 rounded-full mix-blend-overlay animate-pulse transform animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-pink-300 rounded-full mix-blend-overlay animate-bounce transform animate-float-delayed-2"></div>
      </div>
      
      {/* Enhanced Cloud Animation */}
      <div className="fixed inset-0 opacity-15">
        <div className="absolute top-16 -left-10 text-8xl transform animate-float-cloud">☁️</div>
        <div className="absolute top-32 -right-16 text-6xl transform animate-float-cloud-slow">☁️</div>
        <div className="absolute bottom-40 left-1/4 text-7xl transform animate-float-cloud-reverse">☁️</div>
        <div className="absolute top-2/3 right-1/5 text-5xl transform animate-float-cloud-delayed">☁️</div>
      </div>
      
      {/* Enhanced Sparkle Effects */}
      <div className="fixed inset-0 opacity-60">
        <div className="absolute top-1/4 left-1/3 text-2xl animate-sparkle transform animate-float-sparkle">✨</div>
        <div className="absolute top-3/4 right-1/4 text-xl animate-sparkle transform animate-float-sparkle-delayed">⭐</div>
        <div className="absolute top-1/2 left-1/4 text-lg animate-sparkle transform animate-float-sparkle-slow">💫</div>
        <div className="absolute bottom-1/3 right-1/3 text-xl animate-sparkle transform animate-float-sparkle-delayed-2">✨</div>
        <div className="absolute top-1/6 right-1/2 text-lg animate-sparkle transform animate-float-sparkle-reverse">🌟</div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-lg">
        {/* Enhanced Header with Glassmorphism */}
        <div className="text-center mb-8 transform">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
                <div className="text-3xl">☀️</div>
              </div>
              <div className="absolute -top-2 -right-2 text-2xl">☁️</div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
            Weather Now
          </h1>
          <p className="text-lg text-purple-100 max-w-md mx-auto leading-relaxed">
            Get instant weather updates for any city around the world. Perfect for outdoor enthusiasts like Jamie!
          </p>
        </div>

        {/* Main Content */}
        {!weatherData && !loading && !error ? (
          <div className="space-y-6 animate-fade-in-up-delayed">
            {/* Enhanced Search Card with Advanced Glassmorphism */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 animate-gradient-rotate"></div>
              <div className="relative bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 hover:bg-white/25 transition-all duration-500 hover:shadow-3xl">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full animate-shimmer"></div>
                </div>
                
                <div className="relative z-10">
                  <SearchBar onSearch={handleSearch} loading={loading} />
                  
                  <button
                    onClick={handleCurrentLocation}
                    disabled={loading}
                    className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-purple-500/40 to-pink-500/40 backdrop-blur-sm text-white rounded-2xl border border-white/20 hover:from-purple-500/60 hover:to-pink-500/60 focus:outline-none focus:ring-2 focus:ring-purple-300/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center group transform hover:scale-[1.02] hover:-translate-y-1 shadow-lg hover:shadow-xl"
                  >
                    <span className="mr-2 group-hover:animate-bounce">📍</span>
                    <span className="font-medium">Use Current Location</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Ready to Explore Section */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-white/15 backdrop-blur-xl rounded-3xl p-8 text-center shadow-2xl border border-white/20 hover:bg-white/20 transition-all duration-500">
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform translate-x-full animate-shimmer-reverse"></div>
                </div>
                
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                    Ready to explore?
                  </h2>
                  <div className="text-6xl mb-4 animate-bounce-gentle hover:animate-spin-slow transition-all duration-500">☀️</div>
                  <p className="text-purple-100 text-sm opacity-80">
                    Enter a city name above to get started with real-time weather information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 animate-fade-in-up">
            {loading && (
              <div className="text-center p-8">
                <div className="relative inline-block">
                  <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-6"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-300 rounded-full animate-spin-reverse"></div>
                </div>
                <p className="text-white text-lg font-medium mb-2">Fetching weather data...</p>
                <p className="text-purple-200 text-sm opacity-80">This may take a moment</p>
                <div className="flex justify-center space-x-1 mt-4">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            )}

            {error && (
              <div className="animate-shake">
                <ErrorMessage 
                  message={error} 
                  onRetry={handleRetry}
                />
              </div>
            )}

            {weatherData && cityInfo && !loading && !error && (
              <div className="space-y-6">
                <div className="transform animate-scale-in">
                  <WeatherCard 
                    weatherData={weatherData} 
                    cityInfo={cityInfo}
                  />
                </div>
                <div className="text-center">
                  <button
                    onClick={() => {
                      setWeatherData(null);
                      setCityInfo(null);
                      setError(null);
                    }}
                    className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-2xl border border-white/30 hover:bg-white/30 hover:border-white/50 transition-all duration-300 font-medium transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                  >
                    🔍 Search Again
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Enhanced Footer */}
        <footer className="mt-12 text-center text-purple-100 animate-fade-in-up-slow">
          <p className="text-sm opacity-80">
            Powered by{' '}
            <a 
              href="https://open-meteo.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium underline hover:text-white transition-colors duration-300 hover:no-underline border-b border-transparent hover:border-white"
            >
              Open-Meteo API
            </a>
          </p>
        </footer>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(-120deg); }
          66% { transform: translateY(8px) rotate(-240deg); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }

        @keyframes float-delayed-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(180deg); }
        }

        @keyframes float-cloud {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          25% { transform: translateX(20px) translateY(-10px); }
          50% { transform: translateX(40px) translateY(0px); }
          75% { transform: translateX(20px) translateY(10px); }
        }

        @keyframes float-cloud-slow {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          50% { transform: translateX(-30px) translateY(-15px); }
        }

        @keyframes float-cloud-reverse {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          50% { transform: translateX(-25px) translateY(20px); }
        }

        @keyframes float-cloud-delayed {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          33% { transform: translateX(15px) translateY(-20px); }
          66% { transform: translateX(-15px) translateY(10px); }
        }

        @keyframes float-sparkle {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.2); }
        }

        @keyframes float-sparkle-delayed {
          0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
          50% { transform: translateY(-20px) scale(1.3) rotate(180deg); }
        }

        @keyframes float-sparkle-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-25px) scale(0.8); }
        }

        @keyframes float-sparkle-delayed-2 {
          0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
          50% { transform: translateY(-18px) scale(1.1) rotate(-180deg); }
        }

        @keyframes float-sparkle-reverse {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(20px) scale(1.2); }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes shimmer-reverse {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        @keyframes gradient-x {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }

        @keyframes gradient-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up-delayed {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          30% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up-slow {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          60% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-float-delayed-2 { animation: float-delayed-2 7s ease-in-out infinite; }
        .animate-float-cloud { animation: float-cloud 20s ease-in-out infinite; }
        .animate-float-cloud-slow { animation: float-cloud-slow 25s ease-in-out infinite; }
        .animate-float-cloud-reverse { animation: float-cloud-reverse 22s ease-in-out infinite; }
        .animate-float-cloud-delayed { animation: float-cloud-delayed 18s ease-in-out infinite; }
        .animate-float-sparkle { animation: float-sparkle 4s ease-in-out infinite; }
        .animate-float-sparkle-delayed { animation: float-sparkle-delayed 5s ease-in-out infinite; }
        .animate-float-sparkle-slow { animation: float-sparkle-slow 6s ease-in-out infinite; }
        .animate-float-sparkle-delayed-2 { animation: float-sparkle-delayed-2 4.5s ease-in-out infinite; }
        .animate-float-sparkle-reverse { animation: float-sparkle-reverse 5.5s ease-in-out infinite; }
        .animate-sparkle { animation: sparkle 3s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 3s ease-in-out infinite; }
        .animate-shimmer-reverse { animation: shimmer-reverse 3s ease-in-out infinite; }
        .animate-gradient-x { animation: gradient-x 15s ease infinite; }
        .animate-gradient-rotate { animation: gradient-rotate 8s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 2s linear infinite; }
        .animate-text-shimmer { 
          background: linear-gradient(90deg, #fff 0%, #a78bfa 25%, #fff 50%, #a78bfa 75%, #fff 100%);
          background-size: 400% 100%;
          animation: text-shimmer 3s ease-in-out infinite;
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        .animate-fade-in-up-delayed { animation: fade-in-up-delayed 1.2s ease-out; }
        .animate-fade-in-up-slow { animation: fade-in-up-slow 1.8s ease-out; }
        .animate-scale-in { animation: scale-in 0.5s ease-out; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .shadow-3xl { box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25); }
      `}</style>
    </div>
  );
}

export default App;