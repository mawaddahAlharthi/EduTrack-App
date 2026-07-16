import { motion } from 'framer-motion'
import { Sun, Moon, Languages } from 'lucide-react'

function WelcomeScreen({ onGetStarted, theme, onToggleTheme, lang, onToggleLang, t }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center px-6 text-center relative transition-colors">

      <div className="absolute top-6 left-6 flex items-center gap-3">
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

      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-8"
      >
        <img src="/logo.png" alt="EduTrack Logo" className="w-80 h-80 object-contain" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
      >
        {t.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-slate-600 dark:text-slate-400 max-w-md mb-10 leading-relaxed"
      >
        {t.description}
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onGetStarted}
        className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-8 py-3 rounded-full transition-colors"
      >
        {t.getStarted}
      </motion.button>

    </div>
  )
}

export default WelcomeScreen