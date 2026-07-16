import { motion } from 'framer-motion'
import { Upload, Target, Sparkles, ArrowRight, ArrowLeft, Sun, Moon, Languages } from 'lucide-react'

function GuideScreen({ onContinue, onBack, theme, onToggleTheme, lang, onToggleLang, t }) {
  const steps = [
    { icon: Upload, title: t.step1Title, desc: t.step1Desc },
    { icon: Target, title: t.step2Title, desc: t.step2Desc },
    { icon: Sparkles, title: t.step3Title, desc: t.step3Desc },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center px-6 py-12 relative transition-colors">

      <button
        onClick={onBack}
        className="absolute top-6 right-6 rtl:right-6 rtl:left-auto ltr:left-6 ltr:right-auto text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft size={20} className={lang === 'en' ? 'rotate-180' : ''} />
      </button>

      <div className="absolute top-6 left-6 rtl:left-6 rtl:right-auto ltr:right-6 ltr:left-auto flex items-center gap-3">
        <button
          onClick={onToggleTheme}
          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          onClick={onToggleLang}
          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1"
        >
          <Languages size={20} />
          <span className="text-xs font-medium">{lang === 'ar' ? 'EN' : 'ع'}</span>
        </button>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center"
      >
        {t.title}
      </motion.h2>

      <div className="grid gap-6 md:grid-cols-3 max-w-4xl w-full mb-12">
        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-center border border-slate-200 dark:border-slate-700"
            >
              <div className="bg-blue-600/10 dark:bg-blue-600/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon size={26} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-slate-900 dark:text-white font-semibold mb-2">{step.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          )
        })}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onContinue}
        className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-8 py-3 rounded-full transition-colors flex items-center gap-2"
      >
        {t.continue}
        <ArrowRight size={18} className={lang === 'en' ? 'rotate-180' : ''} />
      </motion.button>

    </div>
  )
}

export default GuideScreen