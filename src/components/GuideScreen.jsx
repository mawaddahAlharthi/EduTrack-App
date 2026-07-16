import { motion } from 'framer-motion'
import { Upload, Target, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    title: 'ارفع بياناتك',
    desc: 'أي ملف CSV أو Excel فيه بيانات أكاديمية — درجات، حضور، أو أي مؤشرات أداء',
  },
  {
    icon: Target,
    title: 'تحليل ذكي تلقائي',
    desc: 'النظام يفهم شكل بياناتك بنفسه ويستنتج أفضل التحليلات الممكنة منها',
  },
  {
    icon: Sparkles,
    title: 'داشبورد وتوصيات',
    desc: 'رسوم بيانية تفاعلية وتوصيات مبنية على الذكاء الاصطناعي جاهزة للاستخدام',
  },
]

function GuideScreen({ onContinue, onBack }) {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-6 py-12 relative">

      <button
        onClick={onBack}
        className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors flex items-center gap-1"
      >
        <ArrowLeft size={18} />
        رجوع
      </button>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold text-white mb-12 text-center"
      >
        كيف يشتغل EduTrack؟
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
              className="bg-slate-800 rounded-2xl p-6 text-center border border-slate-700"
            >
              <div className="bg-blue-600/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon size={26} className="text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
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
        المتابعة لرفع البيانات
        <ArrowRight size={18} />
      </motion.button>

    </div>
  )
}

export default GuideScreen