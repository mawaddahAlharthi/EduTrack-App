import { useState, useEffect } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import GuideScreen from './components/GuideScreen'
import UploadScreen from './components/UploadScreen'
import Dashboard from './components/Dashboard'
import Layout from './components/Layout'
import RecommendationsScreen from './components/RecommendationsScreen'
import { parseFile, getFileSample } from './utils/parseFile'
import { analyzeData } from './utils/analyzeData'
import { tryAIAnalyze } from './utils/aiAnalyze'
import { sampleStudents } from './data/sampleData'
import { translations } from './utils/translations'

function App() {
  const [step, setStep] = useState('welcome')
  const [analysis, setAnalysis] = useState(null)
  const [rawData, setRawData] = useState(null)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isProcessing, setIsProcessing] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [lang, setLang] = useState('ar')

  const t = translations[lang]

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  const toggleLang = () => setLang((l) => (l === 'ar' ? 'en' : 'ar'))

  const handleFileReady = async (file) => {
    setIsProcessing(true)
    const data = await parseFile(file)

    const sample = getFileSample(data)
    const aiResult = sample ? await tryAIAnalyze(sample.columns, sample.sampleRows) : null

    const result = analyzeData(data, aiResult)

    setIsProcessing(false)

    if (!result) {
      alert(t.upload.errorNoColumns)
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
    return (
      <WelcomeScreen
        onGetStarted={() => setStep('guide')}
        theme={theme}
        onToggleTheme={toggleTheme}
        lang={lang}
        onToggleLang={toggleLang}
        t={t.welcome}
      />
    )
  }

  if (step === 'guide') {
    return (
      <GuideScreen
        onContinue={() => setStep('upload')}
        onBack={() => setStep('welcome')}
        theme={theme}
        onToggleTheme={toggleTheme}
        lang={lang}
        onToggleLang={toggleLang}
        t={t.guide}
      />
    )
  }

  if (step === 'upload') {
    return (
      <UploadScreen
        onFileReady={handleFileReady}
        onUseSampleData={handleUseSampleData}
        isProcessing={isProcessing}
        onBack={() => setStep('guide')}
        theme={theme}
        onToggleTheme={toggleTheme}
        lang={lang}
        onToggleLang={toggleLang}
        t={t.upload}
      />
    )
  }

  return (
    <Layout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBack={() => setStep('upload')}
      theme={theme}
      onToggleTheme={toggleTheme}
      lang={lang}
      onToggleLang={toggleLang}
      t={t.layout}
    >
      {activeTab === 'dashboard' && <Dashboard analysis={analysis} t={t.dashboard} lang={lang} />}
      {activeTab === 'recommendations' && <RecommendationsScreen analysis={analysis} t={t.recommendationsScreen} lang={lang} />}
    </Layout>
  )
}

export default App