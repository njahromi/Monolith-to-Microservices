import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MagnifyingGlassIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { useApp } from '../context/AppContext'

const SystemAnalysis = () => {
  const { state, actions } = useApp()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState(state.systemData)

  const steps = [
    {
      id: 'basic-info',
      title: 'Basic Information',
      description: 'System name, description, and technology stack'
    },
    {
      id: 'team-structure',
      title: 'Team Structure',
      description: 'Team size, skills, and organization'
    },
    {
      id: 'performance-metrics',
      title: 'Performance Metrics',
      description: 'Deployment frequency, failure rates, and lead times'
    },
    {
      id: 'technical-debt',
      title: 'Technical Debt & Issues',
      description: 'Code quality, scalability, and maintenance issues'
    },
    {
      id: 'business-domains',
      title: 'Business Domains',
      description: 'Core business functions and domain boundaries'
    }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayChange = (field, value) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item)
    setFormData(prev => ({
      ...prev,
      [field]: items
    }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Save all data and complete analysis
      actions.updateSystemData(formData)
      actions.completeAnalysis()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          System Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="input-field"
          placeholder="e.g., Customer Management System"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          System Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="input-field"
          rows={4}
          placeholder="Describe the main purpose and functionality of your system..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Primary Technology Stack *
        </label>
        <select
          value={formData.technology}
          onChange={(e) => handleInputChange('technology', e.target.value)}
          className="input-field"
        >
          <option value="">Select technology stack</option>
          <option value="Java/Spring">Java/Spring</option>
          <option value="C#/.NET">C#/.NET</option>
          <option value="Node.js">Node.js</option>
          <option value="Python/Django">Python/Django</option>
          <option value="Ruby on Rails">Ruby on Rails</option>
          <option value="PHP/Laravel">PHP/Laravel</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Codebase Size
        </label>
        <select
          value={formData.codebaseSize}
          onChange={(e) => handleInputChange('codebaseSize', e.target.value)}
          className="input-field"
        >
          <option value="">Select codebase size</option>
          <option value="Small (< 50K LOC)">Small (&lt; 50K LOC)</option>
          <option value="Medium (50K - 500K LOC)">Medium (50K - 500K LOC)</option>
          <option value="Large (500K - 2M LOC)">Large (500K - 2M LOC)</option>
          <option value="Very Large (> 2M LOC)">Very Large (&gt; 2M LOC)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Database Type
        </label>
        <select
          value={formData.databaseType}
          onChange={(e) => handleInputChange('databaseType', e.target.value)}
          className="input-field"
        >
          <option value="">Select database type</option>
          <option value="Relational (MySQL, PostgreSQL, Oracle)">Relational (MySQL, PostgreSQL, Oracle)</option>
          <option value="NoSQL (MongoDB, Cassandra)">NoSQL (MongoDB, Cassandra)</option>
          <option value="Mixed">Mixed</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  )

  const renderTeamStructure = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Development Team Size *
        </label>
        <input
          type="number"
          value={formData.teamSize}
          onChange={(e) => handleInputChange('teamSize', parseInt(e.target.value) || 0)}
          className="input-field"
          placeholder="Number of developers"
          min="1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          External Dependencies
        </label>
        <input
          type="text"
          value={formData.externalDependencies.join(', ')}
          onChange={(e) => handleArrayChange('externalDependencies', e.target.value)}
          className="input-field"
          placeholder="e.g., Payment gateway, Email service, Third-party APIs"
        />
        <p className="text-sm text-gray-500 mt-1">
          List external systems and services your application depends on
        </p>
      </div>
    </div>
  )

  const renderPerformanceMetrics = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Deployment Frequency
        </label>
        <select
          value={formData.deploymentFrequency}
          onChange={(e) => handleInputChange('deploymentFrequency', e.target.value)}
          className="input-field"
        >
          <option value="">Select deployment frequency</option>
          <option value="Multiple times per day">Multiple times per day</option>
          <option value="Once per day">Once per day</option>
          <option value="Once per week">Once per week</option>
          <option value="Once per month">Once per month</option>
          <option value="Less than once per month">Less than once per month</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Change Failure Rate (%)
        </label>
        <input
          type="number"
          value={formData.changeFailureRate}
          onChange={(e) => handleInputChange('changeFailureRate', e.target.value)}
          className="input-field"
          placeholder="e.g., 15"
          min="0"
          max="100"
        />
        <p className="text-sm text-gray-500 mt-1">
          Percentage of deployments that result in a failure
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mean Time to Recovery (hours)
        </label>
        <input
          type="number"
          value={formData.meanTimeToRecovery}
          onChange={(e) => handleInputChange('meanTimeToRecovery', e.target.value)}
          className="input-field"
          placeholder="e.g., 4"
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Lead Time (days)
        </label>
        <input
          type="number"
          value={formData.leadTime}
          onChange={(e) => handleInputChange('leadTime', e.target.value)}
          className="input-field"
          placeholder="e.g., 7"
          min="0"
        />
        <p className="text-sm text-gray-500 mt-1">
          Time from code commit to production deployment
        </p>
      </div>
    </div>
  )

  const renderTechnicalDebt = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Technical Debt Level
        </label>
        <select
          value={formData.technicalDebt}
          onChange={(e) => handleInputChange('technicalDebt', e.target.value)}
          className="input-field"
        >
          <option value="">Select technical debt level</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Performance Issues
        </label>
        <input
          type="text"
          value={formData.performanceIssues.join(', ')}
          onChange={(e) => handleArrayChange('performanceIssues', e.target.value)}
          className="input-field"
          placeholder="e.g., Slow database queries, Memory leaks, CPU bottlenecks"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Scalability Issues
        </label>
        <input
          type="text"
          value={formData.scalabilityIssues.join(', ')}
          onChange={(e) => handleArrayChange('scalabilityIssues', e.target.value)}
          className="input-field"
          placeholder="e.g., Database connection limits, File storage constraints, Network bottlenecks"
        />
      </div>
    </div>
  )

  const renderBusinessDomains = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Core Business Domains
        </label>
        <input
          type="text"
          value={formData.businessDomains.join(', ')}
          onChange={(e) => handleArrayChange('businessDomains', e.target.value)}
          className="input-field"
          placeholder="e.g., User Management, Order Processing, Inventory Management, Billing"
        />
        <p className="text-sm text-gray-500 mt-1">
          List the main business functions or domains your system handles
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <InformationCircleIcon className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-800">Business Domain Analysis</h4>
            <p className="text-sm text-blue-700 mt-1">
              Identifying business domains is crucial for microservices decomposition. 
              Each domain should represent a cohesive business capability that can be 
              developed and deployed independently.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderBasicInfo()
      case 1:
        return renderTeamStructure()
      case 2:
        return renderPerformanceMetrics()
      case 3:
        return renderTechnicalDebt()
      case 4:
        return renderBusinessDomains()
      default:
        return null
    }
  }

  const isStepValid = () => {
    const step = steps[currentStep]
    switch (step.id) {
      case 'basic-info':
        return formData.name && formData.technology
      case 'team-structure':
        return formData.teamSize > 0
      default:
        return true
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">System Analysis</h1>
        <p className="text-gray-600">
          Analyze your current monolithic system to understand its structure, performance, and business domains
        </p>
      </div>

      {/* Progress Steps */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                index <= currentStep 
                  ? 'bg-primary-600 border-primary-600 text-white' 
                  : 'border-gray-300 text-gray-500'
              }`}>
                {index < currentStep ? (
                  <CheckCircleIcon className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">{step.title}</h3>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  index < currentStep ? 'bg-primary-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <motion.div 
        className="card"
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {steps[currentStep].title}
          </h2>
          <p className="text-gray-600">{steps[currentStep].description}</p>
        </div>

        {renderStepContent()}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === steps.length - 1 ? 'Complete Analysis' : 'Next'}
          </button>
        </div>
      </motion.div>

      {/* Completion Status */}
      {state.isAnalysisComplete && (
        <motion.div 
          className="card bg-success-50 border-success-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center">
            <CheckCircleIcon className="w-6 h-6 text-success-600 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-success-800">
                System Analysis Complete
              </h3>
              <p className="text-success-700">
                Your system has been analyzed. You can now proceed to service decomposition.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default SystemAnalysis 