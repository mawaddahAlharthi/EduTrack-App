import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

function WelcomeScreen({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-6 text-center">
      
      {/* الشعار المتحرك */}
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="bg-blue-600/20 p-6 rounded-full mb-8"
      >
        <GraduationCap size={56} className="text-blue-400" />
      </motion.div>

      {/* العنوان */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-white mb-4"
      >
        EduTrack
      </motion.h1>

      {/* الوصف */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-slate-400 max-w-md mb-10 leading-relaxed"
      >
        منصة ذكية تحلل بيانات الطلاب الأكاديمية وتساعد لجان الجودة على اكتشاف
        الفجوات وبناء توصيات قائمة على الأدلة
      </motion.p>

      {/* زر البدء */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onGetStarted}
        className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-8 py-3 rounded-full transition-colors"
      >
        ابدأ الآن
      </motion.button>

    </div>
  )
}

export default WelcomeScreen