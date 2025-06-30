import React, { createContext, useContext, useReducer, useEffect } from 'react'

const AppContext = createContext()

const initialState = {
  // System Analysis Data
  systemData: {
    name: '',
    description: '',
    technology: '',
    teamSize: 0,
    deploymentFrequency: '',
    changeFailureRate: '',
    meanTimeToRecovery: '',
    leadTime: '',
    codebaseSize: '',
    databaseType: '',
    externalDependencies: [],
    businessDomains: [],
    technicalDebt: '',
    performanceIssues: [],
    scalabilityIssues: [],
  },
  
  // Service Decomposition Results
  identifiedServices: [],
  serviceBoundaries: [],
  dataFlowAnalysis: [],
  
  // Migration Planning
  migrationStrategy: '',
  migrationPhases: [],
  timeline: {
    startDate: '',
    endDate: '',
    phases: []
  },
  
  // Cloud Architecture
  cloudProvider: '',
  recommendedServices: [],
  architecturePatterns: [],
  
  // Risk Assessment
  identifiedRisks: [],
  mitigationStrategies: [],
  riskScore: 0,
  
  // UI State
  currentStep: 0,
  isAnalysisComplete: false,
  isDecompositionComplete: false,
  isPlanningComplete: false,
  isArchitectureComplete: false,
  isRiskAssessmentComplete: false,
}

const appReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_SYSTEM_DATA':
      return {
        ...state,
        systemData: { ...state.systemData, ...action.payload }
      }
    
    case 'SET_IDENTIFIED_SERVICES':
      return {
        ...state,
        identifiedServices: action.payload,
        isDecompositionComplete: true
      }
    
    case 'SET_MIGRATION_STRATEGY':
      return {
        ...state,
        migrationStrategy: action.payload,
        isPlanningComplete: true
      }
    
    case 'SET_CLOUD_ARCHITECTURE':
      return {
        ...state,
        cloudProvider: action.payload.provider,
        recommendedServices: action.payload.services,
        architecturePatterns: action.payload.patterns,
        isArchitectureComplete: true
      }
    
    case 'SET_RISK_ASSESSMENT':
      return {
        ...state,
        identifiedRisks: action.payload.risks,
        mitigationStrategies: action.payload.strategies,
        riskScore: action.payload.score,
        isRiskAssessmentComplete: true
      }
    
    case 'SET_CURRENT_STEP':
      return {
        ...state,
        currentStep: action.payload
      }
    
    case 'COMPLETE_ANALYSIS':
      return {
        ...state,
        isAnalysisComplete: true
      }
    
    case 'RESET_APPLICATION':
      return initialState
    
    case 'LOAD_SAVED_DATA':
      return {
        ...state,
        ...action.payload
      }
    
    default:
      return state
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('microservices-migration-data')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        dispatch({ type: 'LOAD_SAVED_DATA', payload: parsedData })
      } catch (error) {
        console.error('Error loading saved data:', error)
      }
    }
  }, [])

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('microservices-migration-data', JSON.stringify(state))
  }, [state])

  const value = {
    state,
    dispatch,
    actions: {
      updateSystemData: (data) => dispatch({ type: 'UPDATE_SYSTEM_DATA', payload: data }),
      setIdentifiedServices: (services) => dispatch({ type: 'SET_IDENTIFIED_SERVICES', payload: services }),
      setMigrationStrategy: (strategy) => dispatch({ type: 'SET_MIGRATION_STRATEGY', payload: strategy }),
      setCloudArchitecture: (architecture) => dispatch({ type: 'SET_CLOUD_ARCHITECTURE', payload: architecture }),
      setRiskAssessment: (assessment) => dispatch({ type: 'SET_RISK_ASSESSMENT', payload: assessment }),
      setCurrentStep: (step) => dispatch({ type: 'SET_CURRENT_STEP', payload: step }),
      completeAnalysis: () => dispatch({ type: 'COMPLETE_ANALYSIS' }),
      resetApplication: () => dispatch({ type: 'RESET_APPLICATION' }),
    }
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
} 