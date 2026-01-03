import React, { useState } from 'react';

// API Base URL
const API_BASE_URL = "https://exokapil-backend.onrender.com";


// ==================== CLASSIFY PAGE ==================== 
const ClassifyPage = () => {
  const [formData, setFormData] = useState({
    orbital_period: '',
    transit_duration: '',
    planetary_radius: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(null);
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.orbital_period || !formData.transit_duration || !formData.planetary_radius) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orbital_period: parseFloat(formData.orbital_period),
          transit_duration: parseFloat(formData.transit_duration),
          planetary_radius: parseFloat(formData.planetary_radius)
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to classify');
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError(err.message || 'Failed to classify. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const getPredictionColor = (pred) => {
    const predUpper = pred.toUpperCase();
    if (predUpper.includes('CONFIRMED')) return 'bg-green-500';
    if (predUpper.includes('CANDIDATE') || predUpper.includes('APC') || predUpper.includes('CP') || predUpper.includes('KP')) return 'bg-yellow-500';
    if (predUpper.includes('FALSE') || predUpper.includes('FA') || predUpper.includes('REFUTED')) return 'bg-red-500';
    return 'bg-blue-500';
  };

  const getPredictionEmoji = (pred) => {
    const predUpper = pred.toUpperCase();
    if (predUpper.includes('CONFIRMED')) return '✅';
    if (predUpper.includes('CANDIDATE') || predUpper.includes('APC') || predUpper.includes('CP') || predUpper.includes('KP')) return '🔍';
    if (predUpper.includes('FALSE') || predUpper.includes('FA') || predUpper.includes('REFUTED')) return '❌';
    return '🔵';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Classify Exoplanet Data
        </h1>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="space-y-8">
            {/* Input Fields in 3 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Orbital Period */}
              <div className="space-y-2">
                <label className="block text-white font-semibold text-lg">
                  🌑 Orbital Period
                </label>
                <input
                  type="number"
                  name="orbital_period"
                  value={formData.orbital_period}
                  onChange={handleInputChange}
                  step="any"
                  placeholder="e.g., 3.52"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <p className="text-indigo-200 text-sm">Days</p>
              </div>

              {/* Transit Duration */}
              <div className="space-y-2">
                <label className="block text-white font-semibold text-lg">
                  ⏱️ Transit Duration
                </label>
                <input
                  type="number"
                  name="transit_duration"
                  value={formData.transit_duration}
                  onChange={handleInputChange}
                  step="any"
                  placeholder="e.g., 2.45"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <p className="text-indigo-200 text-sm">Hours</p>
              </div>

              {/* Planetary Radius */}
              <div className="space-y-2">
                <label className="block text-white font-semibold text-lg">
                  📏 Planetary Radius
                </label>
                <input
                  type="number"
                  name="planetary_radius"
                  value={formData.planetary_radius}
                  onChange={handleInputChange}
                  step="any"
                  placeholder="e.g., 1.2"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <p className="text-indigo-200 text-sm">Earth Radii</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Classifying...' : 'Classify Data Points'}
              </button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
              <p className="text-red-200 text-center">{error}</p>
            </div>
          )}

          {/* Prediction Display */}
          {prediction && (
            <div className="mt-8 space-y-4">
              <div className={`${getPredictionColor(prediction.prediction)} p-6 rounded-xl shadow-xl`}>
                <div className="text-center">
                  <div className="text-5xl mb-2">{getPredictionEmoji(prediction.prediction)}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Prediction Result</h3>
                  <p className="text-3xl font-bold text-white">{prediction.prediction}</p>
                </div>
              </div>

              {/* Confidence Scores */}
              {prediction.confidence && (
                <div className="space-y-4">
                  {/* Main Categories (Grouped) */}
                  {prediction.confidence.grouped && (
                    <div className="bg-white/10 p-6 rounded-xl">
                      <h4 className="text-xl font-semibold text-white mb-4">Main Category Probabilities</h4>
                      <div className="space-y-3">
                        {Object.entries(prediction.confidence.grouped)
                          .sort((a, b) => b[1] - a[1])
                          .map(([label, score]) => (
                            <div key={label} className="bg-white/5 p-3 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-white font-semibold">{label}</span>
                                <span className="text-white font-bold text-lg">{(score * 100).toFixed(1)}%</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-3">
                                <div
                                  className={`h-3 rounded-full transition-all ${
                                    label.includes('Confirmed')
                                      ? 'bg-green-500'
                                      : label.includes('Candidate')
                                      ? 'bg-yellow-500'
                                      : 'bg-red-500'
                                  }`}
                                  style={{ width: `${score * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Detailed Breakdown */}
                  {prediction.confidence.detailed && (
                    <div className="bg-white/10 p-6 rounded-xl">
                      <h4 className="text-xl font-semibold text-white mb-4">
                        Detailed Breakdown (All {Object.keys(prediction.confidence.detailed).length} Subclasses)
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {Object.entries(prediction.confidence.detailed)
                          .sort((a, b) => b[1] - a[1])
                          .map(([label, score]) => (
                            <div key={label} className="bg-white/5 p-2 rounded text-center">
                              <div className="text-indigo-200 text-xs font-medium mb-1">{label}</div>
                              <div className="text-white font-bold text-sm">{(score * 100).toFixed(1)}%</div>
                            </div>
                          ))}
                      </div>
                      <p className="text-indigo-300 text-xs mt-3 text-center italic">
                        These subclasses are grouped into the 3 main categories above
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassifyPage;