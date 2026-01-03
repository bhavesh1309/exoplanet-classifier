import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-white mb-4">
              Exoplanet Classifier
            </h1>
            <p className="text-2xl text-indigo-200">
              Made by Bhavesh Kapil
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
            <div className="space-y-6 text-left">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-3 flex items-center">
                  <span className="mr-2">🌍</span> What are Exoplanets?
                </h2>
                <p className="text-indigo-100 leading-relaxed">
                  Exoplanets are planets that orbit stars outside our solar system. Since the first confirmed detection in 1992, thousands of exoplanets have been discovered using various detection methods, with the transit method being one of the most successful. When a planet passes in front of its host star, it causes a slight dimming of the star&apos;s light, which we can detect and analyze.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-3 flex items-center">
                  <span className="mr-2">🤖</span> What This Model Does
                </h2>
                <p className="text-indigo-100 leading-relaxed">
                  This machine learning model analyzes three key parameters from transit observations to classify celestial objects into three categories: Confirmed Planets (verified exoplanets), Candidate Planets (potential exoplanets requiring further study), and False Positives (astronomical phenomena that mimic planet signals but are not actual planets, such as binary star systems or instrumental noise).
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-3 flex items-center">
                  <span className="mr-2">🧠</span> Random Forest Classifier
                </h2>
                <p className="text-indigo-100 leading-relaxed">
                  The model uses a Random Forest algorithm, an ensemble learning method that combines multiple decision trees to make accurate predictions. Random Forests are particularly effective for classification tasks because they reduce overfitting and handle complex, non-linear relationships in data. The model was trained on three critical features: orbital period, transit duration, and planetary radius.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/predict')}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-12 py-4 rounded-full text-xl font-semibold hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all shadow-2xl"
          >
            Use Model →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 
