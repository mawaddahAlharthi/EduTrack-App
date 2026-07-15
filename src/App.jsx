import { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import GuideScreen from './components/GuideScreen'
import UploadScreen from './components/UploadScreen'
import Dashboard from './components/Dashboard'
import Layout from './components/Layout'
import SimulatorScreen from './components/SimulatorScreen'
import RecommendationsScreen from './components/RecommendationsScreen'
import { parseFile, getFileSample } from './utils/parseFile'
import { analyzeData } from './utils/analyzeData'
import { tryAIAnalyze } from './utils/aiAnalyze'
import { sampleStudents } from './data/sampleData'

function App() {
  const [step, setStep] = useState('welcome')
  const [analysis, setAnalysis] = useState(null)
  const [rawData, setRawData] = useState(null)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileReady = async (file) => {
    setIsProcessing(true)
    const data = await parseFile(file)

    // نحاول الذكاء الاصطناعي أول، بصمت وبدون ما نوقف المستخدم لو فشل
    const sample = getFileSample(data)
    const aiResult = sample ? await tryAIAnalyze(sample.columns, sample.sampleRows) : null

    // القواعد الذكية تشتغل دائماً كأساس، وتتحسن لو توفر تحليل AI
    const result = analyzeData(data, aiResult)

    setIsProcessing(false)

    if (!result) {
      alert('عذراً، ما قدرنا نلقى أعمدة درجات كافية بهذا الملف. جربي ملف آخر أو استخدمي البيانات التجريبية.')
      return
    }

    setAnalysis(result)
    setRawData(data)
    setStep('dashboard')
  }

  const handleUseSampleData = () => {
    setAnalysis(null)
    setRawData(sampleStudents)
    setStep('dashboard')
  }

  if (step === 'welcome') {
    return <WelcomeScreen onGetStarted={() => setStep('guide')} />
  }

  if (step === 'guide') {
    return <GuideScreen onContinue={() => setStep('upload')} />
  }

  if (step === 'upload') {
    return (
      <UploadScreen
        onFileReady={handleFileReady}
        onUseSampleData={handleUseSampleData}
        isProcessing={isProcessing}
      />
    )
  }

  const scoreColumns = analysis?.scoreColumns ?? ['continuousAssessment', 'finalExam']

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'dashboard' && <Dashboard analysis={analysis} />}
      {activeTab === 'simulator' && (
        <SimulatorScreen rawData={rawData} scoreColumns={scoreColumns} />
      )}
      {activeTab === 'recommendations' && <RecommendationsScreen analysis={analysis} />}
    </Layout>
  )
}

export default App