import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import SystemAnalysis from './pages/SystemAnalysis'
import ServiceDecomposition from './pages/ServiceDecomposition'
import MigrationPlanning from './pages/MigrationPlanning'
import CloudArchitecture from './pages/CloudArchitecture'
import RiskAssessment from './pages/RiskAssessment'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/system-analysis" element={<SystemAnalysis />} />
                  <Route path="/service-decomposition" element={<ServiceDecomposition />} />
                  <Route path="/migration-planning" element={<MigrationPlanning />} />
                  <Route path="/cloud-architecture" element={<CloudArchitecture />} />
                  <Route path="/risk-assessment" element={<RiskAssessment />} />
                </Routes>
              </motion.div>
            </main>
          </div>
        </div>
      </Router>
    </AppProvider>
  )
}

export default App 