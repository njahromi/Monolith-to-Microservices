import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CloudIcon,
  ServerIcon,
  DatabaseIcon,
  ShieldCheckIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'
import { useApp } from '../context/AppContext'

const CloudArchitecture = () => {
  const { state, actions } = useApp()
  const [selectedProvider, setSelectedProvider] = useState(state.cloudProvider || '')
  const [selectedServices, setSelectedServices] = useState(state.recommendedServices || [])
  const [selectedPatterns, setSelectedPatterns] = useState(state.architecturePatterns || [])

  const cloudProviders = [
    {
      id: 'aws',
      name: 'Amazon Web Services (AWS)',
      description: 'Most comprehensive cloud platform with extensive service offerings',
      pros: ['Largest service catalog', 'Global presence', 'Mature ecosystem', 'Strong enterprise support'],
      cons: ['Complex pricing', 'Steep learning curve', 'Vendor lock-in concerns'],
      services: [
        'EC2 (Compute)', 'ECS/EKS (Containers)', 'Lambda (Serverless)',
        'RDS (Databases)', 'DynamoDB (NoSQL)', 'S3 (Storage)',
        'API Gateway', 'CloudFront (CDN)', 'Route 53 (DNS)',
        'CloudWatch (Monitoring)', 'X-Ray (Tracing)', 'IAM (Security)'
      ]
    },
    {
      id: 'azure',
      name: 'Microsoft Azure',
      description: 'Strong enterprise integration and hybrid cloud capabilities',
      pros: ['Excellent Windows/.NET support', 'Hybrid cloud', 'Enterprise integration', 'Good compliance'],
      cons: ['Smaller service catalog', 'Less mature for some services', 'Complex licensing'],
      services: [
        'Virtual Machines', 'AKS (Kubernetes)', 'Functions (Serverless)',
        'SQL Database', 'Cosmos DB', 'Blob Storage',
        'API Management', 'CDN', 'DNS',
        'Application Insights', 'Azure Monitor', 'Active Directory'
      ]
    },
    {
      id: 'gcp',
      name: 'Google Cloud Platform (GCP)',
      description: 'Strong in AI/ML, data analytics, and container technologies',
      pros: ['Excellent AI/ML services', 'Strong data analytics', 'Good pricing', 'Kubernetes native'],
      cons: ['Smaller market share', 'Less enterprise focus', 'Fewer regions'],
      services: [
        'Compute Engine', 'GKE (Kubernetes)', 'Cloud Functions',
        'Cloud SQL', 'Firestore', 'Cloud Storage',
        'Cloud Endpoints', 'Cloud CDN', 'Cloud DNS',
        'Stackdriver', 'Cloud Trace', 'IAM'
      ]
    }
  ]

  const architecturePatterns = [
    {
      id: 'api-gateway',
      name: 'API Gateway Pattern',
      description: 'Single entry point for all client requests to microservices',
      benefits: ['Centralized routing', 'Authentication/Authorization', 'Rate limiting', 'Request/Response transformation'],
      implementation: 'Use API Gateway service from your cloud provider'
    },
    {
      id: 'circuit-breaker',
      name: 'Circuit Breaker Pattern',
      description: 'Prevents cascading failures by monitoring service health',
      benefits: ['Fault tolerance', 'Graceful degradation', 'Quick failure detection', 'Automatic recovery'],
      implementation: 'Implement in service mesh or use libraries like Hystrix, Resilience4j'
    },
    {
      id: 'event-driven',
      name: 'Event-Driven Architecture',
      description: 'Services communicate through events rather than direct calls',
      benefits: ['Loose coupling', 'Scalability', 'Asynchronous processing', 'Better fault tolerance'],
      implementation: 'Use message queues (SQS, Azure Service Bus, Pub/Sub) or event streaming (Kafka)'
    },
    {
      id: 'cqrs',
      name: 'CQRS (Command Query Responsibility Segregation)',
      description: 'Separate read and write operations for better performance',
      benefits: ['Optimized read/write operations', 'Scalability', 'Flexible data models', 'Performance optimization'],
      implementation: 'Separate read and write databases, use event sourcing for consistency'
    },
    {
      id: 'saga',
      name: 'Saga Pattern',
      description: 'Manages distributed transactions across multiple services',
      benefits: ['Distributed transaction management', 'Data consistency', 'Compensation handling', 'Reliability'],
      implementation: 'Use orchestration or choreography patterns with event-driven communication'
    }
  ]

  const handleProviderSelect = (providerId) => {
    setSelectedProvider(providerId)
    const provider = cloudProviders.find(p => p.id === providerId)
    setSelectedServices(provider.services)
  }

  const handlePatternToggle = (patternId) => {
    setSelectedPatterns(prev => 
      prev.includes(patternId) 
        ? prev.filter(id => id !== patternId)
        : [...prev, patternId]
    )
  }

  const handleSaveArchitecture = () => {
    actions.setCloudArchitecture({
      provider: selectedProvider,
      services: selectedServices,
      patterns: selectedPatterns
    })
  }

  const selectedProviderData = cloudProviders.find(p => p.id === selectedProvider)

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cloud Architecture</h1>
        <p className="text-gray-600">
          Design your cloud-based microservices architecture with recommended services and patterns
        </p>
      </div>

      {/* Prerequisites Check */}
      {(!state.isAnalysisComplete || !state.isDecompositionComplete || !state.isPlanningComplete) && (
        <motion.div 
          className="card bg-warning-50 border-warning-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center">
            <InformationCircleIcon className="w-6 h-6 text-warning-600 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-warning-800">
                Previous Steps Required
              </h3>
              <p className="text-warning-700">
                Please complete system analysis, service decomposition, and migration planning first.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Cloud Provider Selection */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="section-title">Choose Cloud Provider</h2>
        <p className="text-gray-600 mb-6">
          Select the cloud platform that best fits your organization's needs and expertise.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {cloudProviders.map((provider) => (
            <div
              key={provider.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedProvider === provider.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleProviderSelect(provider.id)}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {provider.name}
              </h3>
              <p className="text-gray-600 mb-4">{provider.description}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-success-700 mb-1">Pros:</h4>
                  <ul className="text-sm text-gray-600">
                    {provider.pros.map((pro, index) => (
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
                    {provider.cons.map((con, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1 h-1 bg-danger-500 rounded-full mr-2"></span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recommended Services */}
      {selectedProvider && (
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="section-title">Recommended Services</h2>
          <p className="text-gray-600 mb-4">
            Based on your selected provider ({selectedProviderData.name}), here are the recommended services for your microservices architecture:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedServices.map((service, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center">
                  <ServerIcon className="w-4 h-4 text-primary-600 mr-2" />
                  <span className="text-sm font-medium text-gray-900">{service}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Architecture Patterns */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="section-title">Architecture Patterns</h2>
        <p className="text-gray-600 mb-6">
          Select the patterns that will help you build a robust and scalable microservices architecture.
        </p>

        <div className="space-y-4">
          {architecturePatterns.map((pattern) => (
            <div
              key={pattern.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedPatterns.includes(pattern.id)
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handlePatternToggle(pattern.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {pattern.name}
                  </h3>
                  <p className="text-gray-600 mb-3">{pattern.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-success-700 mb-1">Benefits:</h4>
                      <ul className="text-sm text-gray-600">
                        {pattern.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-1 h-1 bg-success-500 rounded-full mr-2"></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-primary-700 mb-1">Implementation:</h4>
                      <p className="text-sm text-gray-600">{pattern.implementation}</p>
                    </div>
                  </div>
                </div>
                
                {selectedPatterns.includes(pattern.id) && (
                  <div className="ml-4">
                    <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Infrastructure Recommendations */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="section-title">Infrastructure Recommendations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <DatabaseIcon className="w-5 h-5 text-primary-600 mr-2" />
              Data Management
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Use managed databases for each service</li>
              <li>• Implement database per service pattern</li>
              <li>• Consider polyglot persistence</li>
              <li>• Plan for data migration strategies</li>
              <li>• Implement backup and disaster recovery</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <ShieldCheckIcon className="w-5 h-5 text-primary-600 mr-2" />
              Security & Compliance
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Implement service-to-service authentication</li>
              <li>• Use secrets management services</li>
              <li>• Enable network security groups</li>
              <li>• Implement audit logging</li>
              <li>• Consider compliance requirements</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <CloudIcon className="w-5 h-5 text-primary-600 mr-2" />
              Monitoring & Observability
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Centralized logging and monitoring</li>
              <li>• Distributed tracing implementation</li>
              <li>• Health check endpoints</li>
              <li>• Performance metrics collection</li>
              <li>• Alerting and notification setup</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <ServerIcon className="w-5 h-5 text-primary-600 mr-2" />
              Deployment & Scaling
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Container orchestration (Kubernetes)</li>
              <li>• Auto-scaling policies</li>
              <li>• Blue-green deployment strategy</li>
              <li>• Canary deployment for critical services</li>
              <li>• Infrastructure as Code (IaC)</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      {selectedProvider && (
        <div className="flex justify-center">
          <button
            onClick={handleSaveArchitecture}
            className="btn-primary flex items-center space-x-2"
          >
            <CloudIcon className="w-4 h-4" />
            <span>Save Architecture Design</span>
          </button>
        </div>
      )}

      {/* Completion Status */}
      {state.isArchitectureComplete && (
        <motion.div 
          className="card bg-success-50 border-success-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center">
            <CloudIcon className="w-6 h-6 text-success-600 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-success-800">
                Cloud Architecture Complete
              </h3>
              <p className="text-success-700">
                Your cloud architecture has been designed. You can now proceed to risk assessment.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default CloudArchitecture 