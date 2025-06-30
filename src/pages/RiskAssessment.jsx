import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  InformationCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { useApp } from '../context/AppContext'

const RiskAssessment = () => {
  const { state, actions } = useApp()
  const [risks, setRisks] = useState(state.identifiedRisks || [])
  const [mitigations, setMitigations] = useState(state.mitigationStrategies || [])
  const [riskScore, setRiskScore] = useState(state.riskScore || 0)

  const predefinedRisks = [
    {
      id: 'data-loss',
      category: 'Data',
      title: 'Data Loss During Migration',
      description: 'Risk of losing critical data during the migration process',
      probability: 'Medium',
      impact: 'High',
      severity: 'High',
      mitigation: 'Implement comprehensive backup strategies, use data validation tools, perform dry runs'
    },
    {
      id: 'service-downtime',
      category: 'Availability',
      title: 'Service Downtime',
      description: 'Extended periods of service unavailability during migration',
      probability: 'Medium',
      impact: 'High',
      severity: 'High',
      mitigation: 'Use blue-green deployment, implement circuit breakers, plan maintenance windows'
    },
    {
      id: 'team-skills',
      category: 'People',
      title: 'Team Skill Gaps',
      description: 'Lack of expertise in microservices and cloud technologies',
      probability: 'High',
      impact: 'Medium',
      severity: 'Medium',
      mitigation: 'Provide training programs, hire experienced developers, use pair programming'
    },
    {
      id: 'integration-complexity',
      category: 'Technical',
      title: 'Integration Complexity',
      description: 'Complex service-to-service communication and data consistency',
      probability: 'High',
      impact: 'Medium',
      severity: 'Medium',
      mitigation: 'Use API gateways, implement event-driven architecture, design clear service contracts'
    },
    {
      id: 'performance-degradation',
      category: 'Performance',
      title: 'Performance Degradation',
      description: 'Reduced system performance due to network latency and service overhead',
      probability: 'Medium',
      impact: 'Medium',
      severity: 'Medium',
      mitigation: 'Implement caching strategies, optimize network calls, use CDN for static content'
    },
    {
      id: 'security-vulnerabilities',
      category: 'Security',
      title: 'Security Vulnerabilities',
      description: 'Increased attack surface and potential security gaps',
      probability: 'Medium',
      impact: 'High',
      severity: 'High',
      mitigation: 'Implement service-to-service authentication, use secrets management, regular security audits'
    },
    {
      id: 'cost-overruns',
      category: 'Financial',
      title: 'Cost Overruns',
      description: 'Exceeding budget due to unexpected complexity or timeline delays',
      probability: 'High',
      impact: 'Medium',
      severity: 'Medium',
      mitigation: 'Regular cost monitoring, phased approach, cloud cost optimization tools'
    },
    {
      id: 'vendor-lockin',
      category: 'Vendor',
      title: 'Vendor Lock-in',
      description: 'Dependency on specific cloud provider services',
      probability: 'High',
      impact: 'Medium',
      severity: 'Medium',
      mitigation: 'Use cloud-agnostic technologies, implement abstraction layers, multi-cloud strategy'
    },
    {
      id: 'change-resistance',
      category: 'Organizational',
      title: 'Change Resistance',
      description: 'Resistance from team members to adopt new technologies and processes',
      probability: 'Medium',
      impact: 'Medium',
      severity: 'Medium',
      mitigation: 'Change management programs, clear communication, involve team in decision-making'
    },
    {
      id: 'testing-coverage',
      category: 'Quality',
      title: 'Inadequate Testing Coverage',
      description: 'Insufficient testing leading to production issues',
      probability: 'Medium',
      impact: 'High',
      severity: 'High',
      mitigation: 'Implement comprehensive testing strategy, automated testing, integration testing'
    }
  ]

  useEffect(() => {
    if (risks.length === 0) {
      // Auto-populate risks based on system analysis
      const relevantRisks = predefinedRisks.filter(risk => {
        // Add logic to determine relevant risks based on system data
        return true // For now, include all risks
      })
      setRisks(relevantRisks)
    }
  }, [risks.length])

  useEffect(() => {
    // Calculate risk score based on identified risks
    const totalSeverity = risks.reduce((sum, risk) => {
      const severityMap = { 'Low': 1, 'Medium': 2, 'High': 3 }
      return sum + severityMap[risk.severity]
    }, 0)
    
    const averageSeverity = risks.length > 0 ? totalSeverity / risks.length : 0
    const score = Math.round((averageSeverity / 3) * 100)
    setRiskScore(score)
  }, [risks])

  const handleRiskToggle = (riskId) => {
    setRisks(prev => 
      prev.map(risk => 
        risk.id === riskId 
          ? { ...risk, isSelected: !risk.isSelected }
          : risk
      )
    )
  }

  const handleMitigationAdd = (riskId, mitigation) => {
    setMitigations(prev => [...prev, { riskId, strategy: mitigation }])
  }

  const handleSaveAssessment = () => {
    const selectedRisks = risks.filter(risk => risk.isSelected)
    actions.setRiskAssessment({
      risks: selectedRisks,
      strategies: mitigations,
      score: riskScore
    })
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'bg-danger-100 text-danger-800 border-danger-200'
      case 'Medium': return 'bg-warning-100 text-warning-800 border-warning-200'
      case 'Low': return 'bg-success-100 text-success-800 border-success-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getRiskScoreColor = (score) => {
    if (score >= 70) return 'text-danger-600'
    if (score >= 40) return 'text-warning-600'
    return 'text-success-600'
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Risk Assessment</h1>
        <p className="text-gray-600">
          Identify and assess potential risks in your microservices migration journey
        </p>
      </div>

      {/* Prerequisites Check */}
      {(!state.isAnalysisComplete || !state.isDecompositionComplete || !state.isPlanningComplete || !state.isArchitectureComplete) && (
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
                Please complete all previous steps before conducting risk assessment.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Risk Score Overview */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Overall Risk Assessment</h2>
          <div className="text-right">
            <div className={`text-3xl font-bold ${getRiskScoreColor(riskScore)}`}>
              {riskScore}/100
            </div>
            <div className="text-sm text-gray-500">Risk Score</div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Risk Level</span>
            <span>{riskScore >= 70 ? 'High' : riskScore >= 40 ? 'Medium' : 'Low'}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div 
              className={`h-3 rounded-full ${
                riskScore >= 70 ? 'bg-danger-600' : riskScore >= 40 ? 'bg-warning-600' : 'bg-success-600'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${riskScore}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-primary-600">{risks.length}</div>
            <div className="text-sm text-gray-500">Identified Risks</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-warning-600">
              {risks.filter(r => r.severity === 'High').length}
            </div>
            <div className="text-sm text-gray-500">High Severity</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-success-600">{mitigations.length}</div>
            <div className="text-sm text-gray-500">Mitigation Strategies</div>
          </div>
        </div>
      </motion.div>

      {/* Risk Categories */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="section-title">Risk Categories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {['Data', 'Availability', 'People', 'Technical', 'Performance', 'Security', 'Financial', 'Vendor', 'Organizational', 'Quality'].map(category => {
            const categoryRisks = risks.filter(risk => risk.category === category)
            const highSeverityCount = categoryRisks.filter(risk => risk.severity === 'High').length
            
            return (
              <div key={category} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">{category}</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{categoryRisks.length} risks</span>
                  {highSeverityCount > 0 && (
                    <span className="text-danger-600 font-medium">{highSeverityCount} high</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Detailed Risk Analysis */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="section-title">Detailed Risk Analysis</h2>
        
        <div className="space-y-4">
          {risks.map((risk, index) => (
            <motion.div 
              key={risk.id}
              className={`border-2 rounded-lg p-4 transition-all ${
                risk.isSelected 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{risk.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(risk.severity)}`}>
                      {risk.severity}
                    </span>
                    <span className="text-sm text-gray-500">{risk.category}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{risk.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Probability:</span> {risk.probability}
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Impact:</span> {risk.impact}
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Severity:</span> {risk.severity}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-success-700 mb-2">Mitigation Strategy:</h4>
                    <p className="text-sm text-gray-600">{risk.mitigation}</p>
                  </div>
                </div>
                
                <div className="ml-4">
                  <input
                    type="checkbox"
                    checked={risk.isSelected || false}
                    onChange={() => handleRiskToggle(risk.id)}
                    className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Mitigation Strategies */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="section-title">Mitigation Strategies</h2>
        
        <div className="space-y-4">
          {mitigations.map((mitigation, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Mitigation for {risks.find(r => r.id === mitigation.riskId)?.title}
                  </h4>
                  <p className="text-gray-600">{mitigation.strategy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="section-title">Risk Management Recommendations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <ShieldCheckIcon className="w-5 h-5 text-primary-600 mr-2" />
              Immediate Actions
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Establish risk monitoring dashboard</li>
              <li>• Create incident response plan</li>
              <li>• Set up regular risk review meetings</li>
              <li>• Implement early warning systems</li>
              <li>• Document all mitigation strategies</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <ChartBarIcon className="w-5 h-5 text-primary-600 mr-2" />
              Ongoing Monitoring
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Track risk metrics weekly</li>
              <li>• Update risk assessments monthly</li>
              <li>• Review mitigation effectiveness</li>
              <li>• Adjust strategies as needed</li>
              <li>• Communicate status to stakeholders</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSaveAssessment}
          className="btn-primary flex items-center space-x-2"
        >
          <ExclamationTriangleIcon className="w-4 h-4" />
          <span>Save Risk Assessment</span>
        </button>
      </div>

      {/* Completion Status */}
      {state.isRiskAssessmentComplete && (
        <motion.div 
          className="card bg-success-50 border-success-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center">
            <CheckCircleIcon className="w-6 h-6 text-success-600 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-success-800">
                Risk Assessment Complete
              </h3>
              <p className="text-success-700">
                Your risk assessment is complete. You now have a comprehensive migration plan ready!
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default RiskAssessment 