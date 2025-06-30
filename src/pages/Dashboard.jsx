import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  MagnifyingGlassIcon,
  PuzzlePieceIcon,
  MapIcon,
  CloudIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import { useApp } from '../context/AppContext'

const Dashboard = () => {
  const { state } = useApp()

  const steps = [
    {
      id: 'analysis',
      name: 'System Analysis',
      description: 'Analyze your current monolithic system',
      href: '/system-analysis',
      icon: MagnifyingGlassIcon,
      isComplete: state.isAnalysisComplete,
      color: 'primary'
    },
    {
      id: 'decomposition',
      name: 'Service Decomposition',
      description: 'Identify potential microservices',
      href: '/service-decomposition',
      icon: PuzzlePieceIcon,
      isComplete: state.isDecompositionComplete,
      color: 'success'
    },
    {
      id: 'planning',
      name: 'Migration Planning',
      description: 'Plan your migration strategy',
      href: '/migration-planning',
      icon: MapIcon,
      isComplete: state.isPlanningComplete,
      color: 'warning'
    },
    {
      id: 'architecture',
      name: 'Cloud Architecture',
      description: 'Design cloud-based architecture',
      href: '/cloud-architecture',
      icon: CloudIcon,
      isComplete: state.isArchitectureComplete,
      color: 'primary'
    },
    {
      id: 'risk',
      name: 'Risk Assessment',
      description: 'Identify and mitigate risks',
      href: '/risk-assessment',
      icon: ExclamationTriangleIcon,
      isComplete: state.isRiskAssessmentComplete,
      color: 'danger'
    }
  ]

  const completedSteps = steps.filter(step => step.isComplete).length
  const progressPercentage = (completedSteps / steps.length) * 100

  const getSystemSummary = () => {
    if (!state.isAnalysisComplete) {
      return {
        name: 'Not analyzed yet',
        technology: 'Unknown',
        teamSize: 0,
        complexity: 'Unknown'
      }
    }

    const { systemData } = state
    return {
      name: systemData.name || 'Unnamed System',
      technology: systemData.technology || 'Unknown',
      teamSize: systemData.teamSize || 0,
      complexity: systemData.codebaseSize || 'Unknown'
    }
  }

  const systemSummary = getSystemSummary()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.h1 
          className="text-4xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to Your Migration Journey
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Transform your monolithic legacy system into a modern, scalable microservices architecture
        </motion.p>
      </div>

      {/* Progress Overview */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Migration Progress</h2>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">{completedSteps}/{steps.length}</div>
            <div className="text-sm text-gray-500">Steps Completed</div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Overall Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div 
              className="bg-primary-600 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>

        {completedSteps === steps.length && (
          <div className="bg-success-50 border border-success-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircleIcon className="w-5 h-5 text-success-600 mr-2" />
              <span className="text-success-800 font-medium">Congratulations! All steps completed.</span>
            </div>
          </div>
        )}
      </motion.div>

      {/* System Summary */}
      {state.isAnalysisComplete && (
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="section-title">System Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-primary-600">{systemSummary.name}</div>
              <div className="text-sm text-gray-500">System Name</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-primary-600">{systemSummary.technology}</div>
              <div className="text-sm text-gray-500">Technology Stack</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-primary-600">{systemSummary.teamSize}</div>
              <div className="text-sm text-gray-500">Team Size</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-primary-600">{systemSummary.complexity}</div>
              <div className="text-sm text-gray-500">Codebase Size</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Migration Steps */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {steps.map((step, index) => {
          const Icon = step.icon
          const colorClasses = {
            primary: 'border-primary-200 bg-primary-50 text-primary-700',
            success: 'border-success-200 bg-success-50 text-success-700',
            warning: 'border-warning-200 bg-warning-50 text-warning-700',
            danger: 'border-danger-200 bg-danger-50 text-danger-700'
          }

          return (
            <Link
              key={step.id}
              to={step.href}
              className="card hover:shadow-md transition-shadow duration-200 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${colorClasses[step.color]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{step.name}</h3>
                      {step.isComplete && (
                        <CheckCircleIcon className="w-5 h-5 text-success-600" />
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{step.description}</p>
                    <div className="flex items-center text-sm text-primary-600 group-hover:text-primary-700">
                      <span>{step.isComplete ? 'Review' : 'Start'}</span>
                      <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="section-title">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ChartBarIcon className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">Generate Report</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ClockIcon className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">View Timeline</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <DocumentTextIcon className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">Export Plan</span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard 