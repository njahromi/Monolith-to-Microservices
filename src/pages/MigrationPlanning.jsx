import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MapIcon,
  CalendarIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'
import { useApp } from '../context/AppContext'

const MigrationPlanning = () => {
  const { state, actions } = useApp()
  const [strategy, setStrategy] = useState(state.migrationStrategy || '')
  const [timeline, setTimeline] = useState(state.timeline || {
    startDate: '',
    endDate: '',
    phases: []
  })

  const migrationStrategies = [
    {
      id: 'strangler-fig',
      name: 'Strangler Fig Pattern',
      description: 'Gradually replace functionality by creating new services and routing traffic to them',
      pros: ['Low risk', 'Gradual transition', 'Easy rollback'],
      cons: ['Longer timeline', 'Complex routing', 'Dual maintenance'],
      bestFor: 'Large, complex systems with high availability requirements'
    },
    {
      id: 'big-bang',
      name: 'Big Bang Migration',
      description: 'Complete rewrite and replacement of the entire system at once',
      pros: ['Fastest completion', 'Clean slate', 'No legacy code'],
      cons: ['High risk', 'Complex coordination', 'Difficult rollback'],
      bestFor: 'Small systems or when legacy system is severely problematic'
    },
    {
      id: 'branch-by-abstraction',
      name: 'Branch by Abstraction',
      description: 'Create abstraction layer and gradually migrate components underneath',
      pros: ['Safe approach', 'Good for complex integrations', 'Maintains functionality'],
      cons: ['Complex implementation', 'Performance overhead', 'Longer timeline'],
      bestFor: 'Systems with complex integrations and dependencies'
    },
    {
      id: 'parallel-run',
      name: 'Parallel Run',
      description: 'Run new and old systems simultaneously and compare results',
      pros: ['Very safe', 'Easy validation', 'Gradual confidence building'],
      cons: ['High cost', 'Complex data synchronization', 'Resource intensive'],
      bestFor: 'Critical systems where safety is paramount'
    }
  ]

  const defaultPhases = [
    {
      name: 'Phase 1: Foundation',
      duration: '2-4 weeks',
      description: 'Set up infrastructure, CI/CD, monitoring, and basic services',
      tasks: ['Infrastructure setup', 'CI/CD pipeline', 'Monitoring and logging', 'Basic service templates']
    },
    {
      name: 'Phase 2: Core Services',
      duration: '4-8 weeks',
      description: 'Migrate core business functionality to microservices',
      tasks: ['User management service', 'Authentication service', 'Core business logic services']
    },
    {
      name: 'Phase 3: Data Migration',
      duration: '2-4 weeks',
      description: 'Migrate and synchronize data between old and new systems',
      tasks: ['Database migration', 'Data synchronization', 'Data validation', 'Backup strategies']
    },
    {
      name: 'Phase 4: Integration',
      duration: '3-6 weeks',
      description: 'Integrate services and implement API gateway',
      tasks: ['API gateway setup', 'Service communication', 'Load balancing', 'Circuit breakers']
    },
    {
      name: 'Phase 5: Testing & Validation',
      duration: '2-4 weeks',
      description: 'Comprehensive testing and performance validation',
      tasks: ['Integration testing', 'Performance testing', 'Security testing', 'User acceptance testing']
    },
    {
      name: 'Phase 6: Deployment & Cutover',
      duration: '1-2 weeks',
      description: 'Deploy to production and cut over from legacy system',
      tasks: ['Production deployment', 'Traffic routing', 'Legacy system decommissioning', 'Monitoring']
    }
  ]

  const handleStrategySelect = (strategyId) => {
    setStrategy(strategyId)
    actions.setMigrationStrategy(strategyId)
  }

  const handleTimelineChange = (field, value) => {
    setTimeline(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSavePlanning = () => {
    actions.setMigrationStrategy(strategy)
    // Save timeline data
    const updatedState = {
      ...state,
      migrationStrategy: strategy,
      timeline: timeline
    }
    actions.dispatch({ type: 'LOAD_SAVED_DATA', payload: updatedState })
  }

  const selectedStrategy = migrationStrategies.find(s => s.id === strategy)

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Migration Planning</h1>
        <p className="text-gray-600">
          Plan your migration strategy and timeline for transitioning to microservices
        </p>
      </div>

      {/* Prerequisites Check */}
      {(!state.isAnalysisComplete || !state.isDecompositionComplete) && (
        <motion.div 
          className="card bg-warning-50 border-warning-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center">
            <InformationCircleIcon className="w-6 h-6 text-warning-600 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-warning-800">
                Prerequisites Required
              </h3>
              <p className="text-warning-700">
                Please complete system analysis and service decomposition before planning migration.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Migration Strategy Selection */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="section-title">Choose Migration Strategy</h2>
        <p className="text-gray-600 mb-6">
          Select the migration approach that best fits your organization's risk tolerance and timeline.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {migrationStrategies.map((strategyOption) => (
            <div
              key={strategyOption.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                strategy === strategyOption.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleStrategySelect(strategyOption.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {strategyOption.name}
                </h3>
                {strategy === strategyOption.id && (
                  <CheckCircleIcon className="w-5 h-5 text-primary-600" />
                )}
              </div>
              
              <p className="text-gray-600 mb-4">{strategyOption.description}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-success-700 mb-1">Pros:</h4>
                  <ul className="text-sm text-gray-600">
                    {strategyOption.pros.map((pro, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1 h-1 bg-success-500 rounded-full mr-2"></span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-danger-700 mb-1">Cons:</h4>
                  <ul className="text-sm text-gray-600">
                    {strategyOption.cons.map((con, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1 h-1 bg-danger-500 rounded-full mr-2"></span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Best for:</h4>
                  <p className="text-sm text-gray-600">{strategyOption.bestFor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Selected Strategy Details */}
      {selectedStrategy && (
        <motion.div 
          className="card bg-primary-50 border-primary-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-lg font-semibold text-primary-800 mb-3">
            Selected Strategy: {selectedStrategy.name}
          </h3>
          <p className="text-primary-700">{selectedStrategy.description}</p>
        </motion.div>
      )}

      {/* Timeline Planning */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="section-title">Migration Timeline</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={timeline.startDate}
              onChange={(e) => handleTimelineChange('startDate', e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target End Date
            </label>
            <input
              type="date"
              value={timeline.endDate}
              onChange={(e) => handleTimelineChange('endDate', e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        <h3 className="subsection-title">Migration Phases</h3>
        <div className="space-y-4">
          {defaultPhases.map((phase, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-medium text-gray-900">{phase.name}</h4>
                <span className="text-sm text-gray-500">{phase.duration}</span>
              </div>
              <p className="text-gray-600 mb-3">{phase.description}</p>
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Key Tasks:</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  {phase.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-center">
                      <span className="w-1 h-1 bg-primary-500 rounded-full mr-2"></span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Risk Considerations */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="section-title">Risk Considerations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Technical Risks</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Data consistency during migration</li>
              <li>• Service discovery and communication</li>
              <li>• Performance degradation</li>
              <li>• Security vulnerabilities</li>
              <li>• Integration complexity</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Organizational Risks</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Team skill gaps</li>
              <li>• Change management resistance</li>
              <li>• Timeline overruns</li>
              <li>• Budget constraints</li>
              <li>• Knowledge transfer</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      {strategy && (
        <div className="flex justify-center">
          <button
            onClick={handleSavePlanning}
            className="btn-primary flex items-center space-x-2"
          >
            <MapIcon className="w-4 h-4" />
            <span>Save Migration Plan</span>
          </button>
        </div>
      )}

      {/* Completion Status */}
      {state.isPlanningComplete && (
        <motion.div 
          className="card bg-success-50 border-success-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center">
            <MapIcon className="w-6 h-6 text-success-600 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-success-800">
                Migration Planning Complete
              </h3>
              <p className="text-success-700">
                Your migration strategy and timeline have been planned. You can now proceed to cloud architecture design.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default MigrationPlanning 