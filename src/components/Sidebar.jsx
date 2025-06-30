import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  HomeIcon,
  MagnifyingGlassIcon,
  PuzzlePieceIcon,
  MapIcon,
  CloudIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { useApp } from '../context/AppContext'

const Sidebar = () => {
  const location = useLocation()
  const { state } = useApp()

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: HomeIcon,
      description: 'Overview and progress tracking'
    },
    {
      name: 'System Analysis',
      href: '/system-analysis',
      icon: MagnifyingGlassIcon,
      description: 'Analyze current monolithic system',
      isComplete: state.isAnalysisComplete
    },
    {
      name: 'Service Decomposition',
      href: '/service-decomposition',
      icon: PuzzlePieceIcon,
      description: 'Identify potential microservices',
      isComplete: state.isDecompositionComplete
    },
    {
      name: 'Migration Planning',
      href: '/migration-planning',
      icon: MapIcon,
      description: 'Plan migration strategy and timeline',
      isComplete: state.isPlanningComplete
    },
    {
      name: 'Cloud Architecture',
      href: '/cloud-architecture',
      icon: CloudIcon,
      description: 'Design cloud-based architecture',
      isComplete: state.isArchitectureComplete
    },
    {
      name: 'Risk Assessment',
      href: '/risk-assessment',
      icon: ExclamationTriangleIcon,
      description: 'Identify and mitigate risks',
      isComplete: state.isRiskAssessmentComplete
    }
  ]

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 mr-3 ${
                    isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'
                  }`} />
                  {item.isComplete && (
                    <CheckCircleIcon className="absolute -top-1 -right-1 w-3 h-3 text-success-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span>{item.name}</span>
                  </div>
                  <p className={`text-xs mt-1 ${
                    isActive ? 'text-primary-600' : 'text-gray-500'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>
      
      {/* Quick Stats */}
      <div className="p-4 border-t border-gray-200">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Progress Summary
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Analysis</span>
            <span className={state.isAnalysisComplete ? 'text-success-600' : 'text-gray-400'}>
              {state.isAnalysisComplete ? '✓' : '○'}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Decomposition</span>
            <span className={state.isDecompositionComplete ? 'text-success-600' : 'text-gray-400'}>
              {state.isDecompositionComplete ? '✓' : '○'}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Planning</span>
            <span className={state.isPlanningComplete ? 'text-success-600' : 'text-gray-400'}>
              {state.isPlanningComplete ? '✓' : '○'}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Architecture</span>
            <span className={state.isArchitectureComplete ? 'text-success-600' : 'text-gray-400'}>
              {state.isArchitectureComplete ? '✓' : '○'}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Risk Assessment</span>
            <span className={state.isRiskAssessmentComplete ? 'text-success-600' : 'text-gray-400'}>
              {state.isRiskAssessmentComplete ? '✓' : '○'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar 