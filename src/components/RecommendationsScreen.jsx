import { motion } from 'framer-motion'
import { Lightbulb, ArrowLeft } from 'lucide-react'
import { sampleRecommendations } from '../data/sampleData'

function RecommendationsScreen({ analysis }) {
  const recommendations = analysis?.recommendations ?? sampleRecommendations

  return (
    <div className="p-6 md:p-10">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold text-white mb-2"
      >
        توصيات الذكاء الاصطناعي
      </motion.h1>
      <p className="text-slate-400 mb-8">
        توصيات مبنية على تحليل بياناتك الفعلية، مرتبة حسب الأولوية
      </p>

      <div className="flex flex-col gap-4 max-w-3xl">
        {recommendations.map((rec, i) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-800 border border-slate-700 rounded-2xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="bg-yellow-500/10 p-3 rounded-xl shrink-0">
                <Lightbulb size={22} className="text-yellow-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-2">{rec.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{rec.reason}</p>
                <div className="flex items-start gap-2 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                  <ArrowLeft size={16} className="text-blue-400 mt-0.5 shrink-0" />
                  <p className="text-blue-300 text-sm">{rec.action}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default RecommendationsScreen