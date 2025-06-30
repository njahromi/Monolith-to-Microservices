import React from 'react'
import { Link } from 'react-router-dom'
import { 
  CloudIcon, 
  CogIcon, 
  DocumentTextIcon,
  ArrowPathIcon 
} from '@heroicons/react/24/outline'
import { useApp } from '../context/AppContext'

const Navbar = () => {
  const { state, actions } = useApp()

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      actions.resetApplication()
    }
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary-600 rounded-lg">
                <CloudIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">Monolith to Microservices</h1>
                <p className="text-xs text-gray-500">Migration Planning Tool</p>
              </div>
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {/* Progress Indicator */}
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
              <span>Progress:</span>
              <div className="flex items-center space-x-1">
                {[
                  { key: 'isAnalysisComplete', label: 'Analysis' },
                  { key: 'isDecompositionComplete', label: 'Decomposition' },
                  { key: 'isPlanningComplete', label: 'Planning' },
                  { key: 'isArchitectureComplete', label: 'Architecture' },
                  { key: 'isRiskAssessmentComplete', label: 'Risk' }
                ].map((step, index) => (
                  <div key={step.key} className="flex items-center">
                    <div className={`w-2 h-2 rounded-full ${
                      state[step.key] ? 'bg-success-500' : 'bg-gray-300'
                    }`} />
                    {index < 4 && <div className="w-1 h-0.5 bg-gray-300 mx-1" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleReset}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors"
                title="Reset Application"
              >
                <ArrowPathIcon className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Reset</span>
              </button>
              
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors">
                <DocumentTextIcon className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Export</span>
              </button>
              
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors">
                <CogIcon className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 