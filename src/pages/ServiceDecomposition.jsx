import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  PuzzlePieceIcon,
  PlusIcon,
  TrashIcon,
  InformationCircleIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'
import { useApp } from '../context/AppContext'

const ServiceDecomposition = () => {
  const { state, actions } = useApp()
  const [services, setServices] = useState(state.identifiedServices || [])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    businessDomain: '',
    responsibilities: '',
    dataEntities: '',
    dependencies: '',
    team: '',
    priority: 'medium'
  })

  useEffect(() => {
    if (state.businessDomains && state.businessDomains.length > 0 && services.length === 0) {
      // Auto-generate initial services based on business domains
      const autoServices = state.businessDomains.map(domain => ({
        name: `${domain} Service`,
        description: `Handles all ${domain.toLowerCase()} related operations`,
        businessDomain: domain,
        responsibilities: `Manage ${domain.toLowerCase()} data and operations`,
        dataEntities: `${domain} entities`,
        dependencies: '',
        team: '',
        priority: 'medium'
      }))
      setServices(autoServices)
    }
  }, [state.businessDomains, services.length])

  const handleAddService = () => {
    if (newService.name && newService.businessDomain) {
      setServices([...services, { ...newService, id: Date.now() }])
      setNewService({
        name: '',
        description: '',
        businessDomain: '',
        responsibilities: '',
        dataEntities: '',
        dependencies: '',
        team: '',
        priority: 'medium'
      })
      setShowAddForm(false)
    }
  }

  const handleRemoveService = (index) => {
    setServices(services.filter((_, i) => i !== index))
  }

  const handleSaveServices = () => {
    actions.setIdentifiedServices(services)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-danger-100 text-danger-800 border-danger-200'
      case 'medium': return 'bg-warning-100 text-warning-800 border-warning-200'
      case 'low': return 'bg-success-100 text-success-800 border-success-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const calculateCouplingScore = (service) => {
    const dependencies = service.dependencies ? service.dependencies.split(',').length : 0
    if (dependencies === 0) return { score: 'Low', color: 'text-success-600' }
    if (dependencies <= 2) return { score: 'Medium', color: 'text-warning-600' }
    return { score: 'High', color: 'text-danger-600' }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Service Decomposition</h1>
        <p className="text-gray-600">
          Identify and define potential microservices based on business domains and system analysis
        </p>
      </div>

      {/* Analysis Status */}
      {!state.isAnalysisComplete && (
        <motion.div 
          className="card bg-warning-50 border-warning-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center">
            <InformationCircleIcon className="w-6 h-6 text-warning-600 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-warning-800">
                System Analysis Required
              </h3>
              <p className="text-warning-700">
                Please complete the system analysis first to get better service recommendations.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Service Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">{services.length}</div>
          <div className="text-sm text-gray-500">Identified Services</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-success-600">
            {services.filter(s => s.priority === 'high').length}
          </div>
          <div className="text-sm text-gray-500">High Priority</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-warning-600">
            {services.filter(s => calculateCouplingScore(s).score === 'High').length}
          </div>
          <div className="text-sm text-gray-500">High Coupling</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-info-600">
            {new Set(services.map(s => s.businessDomain)).size}
          </div>
          <div className="text-sm text-gray-500">Business Domains</div>
        </div>
      </div>

      {/* Add Service Button */}
      <div className="flex justify-between items-center">
        <h2 className="section-title">Identified Services</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Add Service Form */}
      {showAddForm && (
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="subsection-title">Add New Service</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Name *
              </label>
              <input
                type="text"
                value={newService.name}
                onChange={(e) => setNewService({...newService, name: e.target.value})}
                className="input-field"
                placeholder="e.g., User Management Service"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Domain *
              </label>
              <select
                value={newService.businessDomain}
                onChange={(e) => setNewService({...newService, businessDomain: e.target.value})}
                className="input-field"
              >
                <option value="">Select domain</option>
                {state.businessDomains?.map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={newService.description}
                onChange={(e) => setNewService({...newService, description: e.target.value})}
                className="input-field"
                rows={3}
                placeholder="Describe the service's purpose and functionality..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Responsibilities
              </label>
              <input
                type="text"
                value={newService.responsibilities}
                onChange={(e) => setNewService({...newService, responsibilities: e.target.value})}
                className="input-field"
                placeholder="e.g., User authentication, profile management, permissions"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Entities
              </label>
              <input
                type="text"
                value={newService.dataEntities}
                onChange={(e) => setNewService({...newService, dataEntities: e.target.value})}
                className="input-field"
                placeholder="e.g., User, Profile, Role"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dependencies
              </label>
              <input
                type="text"
                value={newService.dependencies}
                onChange={(e) => setNewService({...newService, dependencies: e.target.value})}
                className="input-field"
                placeholder="e.g., Notification Service, Auth Service"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assigned Team
              </label>
              <input
                type="text"
                value={newService.team}
                onChange={(e) => setNewService({...newService, team: e.target.value})}
                className="input-field"
                placeholder="e.g., Team Alpha"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={newService.priority}
                onChange={(e) => setNewService({...newService, priority: e.target.value})}
                className="input-field"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowAddForm(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleAddService}
              className="btn-primary"
            >
              Add Service
            </button>
          </div>
        </motion.div>
      )}

      {/* Services List */}
      <div className="space-y-4">
        {services.map((service, index) => {
          const couplingScore = calculateCouplingScore(service)
          
          return (
            <motion.div 
              key={service.id || index}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(service.priority)}`}>
                      {service.priority}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800`}>
                      Coupling: {couplingScore.score}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Domain:</span> {service.businessDomain}
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Team:</span> {service.team || 'Unassigned'}
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium text-gray-700">Description:</span> {service.description}
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium text-gray-700">Responsibilities:</span> {service.responsibilities}
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Data Entities:</span> {service.dataEntities}
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Dependencies:</span> {service.dependencies || 'None'}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleRemoveService(index)}
                  className="ml-4 p-2 text-gray-400 hover:text-danger-600 transition-colors"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Save Button */}
      {services.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={handleSaveServices}
            className="btn-primary flex items-center space-x-2"
          >
            <ChartBarIcon className="w-4 h-4" />
            <span>Save Services & Continue</span>
          </button>
        </div>
      )}

      {/* Completion Status */}
      {state.isDecompositionComplete && (
        <motion.div 
          className="card bg-success-50 border-success-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center">
            <PuzzlePieceIcon className="w-6 h-6 text-success-600 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-success-800">
                Service Decomposition Complete
              </h3>
              <p className="text-success-700">
                {services.length} services have been identified. You can now proceed to migration planning.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default ServiceDecomposition 