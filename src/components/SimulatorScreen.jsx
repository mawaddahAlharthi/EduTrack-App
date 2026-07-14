import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Users, TrendingUp, AlertTriangle } from 'lucide-react'
import { simulateWithWeights } from '../utils/simulateWeights'

function SimulatorScreen({ rawData, scoreColumns }) {
  const [continuousWeight, setContinuousWeight] = useState(50)
  const finalWeight = 100 - continuousWeight

  const result = useMemo(() => {
    if (!rawData || !scoreColumns || scoreColumns.length === 0) return null
    return simulateWithWeights(rawData, scoreColumns, continuousWeight, finalWeight)
  }, [rawData, scoreColumns, continuousWeight, finalWeight])

  if (!result) {
    return (
      <div className="p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">محاكي ماذا-لو</h1>
        <p className="text-slate-400">ارفعي بيانات أول من شاشة الرفع عشان تقدرين تستخدمين المحاكي</p>
      </div>
    )
  }

  const cards = [
    { label: 'إجمالي الطلاب', value: result.totalStudents, icon: Users, color: 'text-blue-400' },
    { label: 'نسبة النجاح المتوقعة', value: `${result.passRate}%`, icon: TrendingUp, color: 'text-green-400' },
    { label: 'طلاب في خطر (متوقع)', value: result.atRiskCount, icon: AlertTriangle, color: 'text-red-400' },
  ]

  return (
    <div className="p-6 md:p-10">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold text-white mb-2"
      >
        محاكي ماذا-لو
      </motion.h1>
      <p className="text-slate-400 mb-8">
        جرّبي تغيير وزن التقييم المستمر مقابل الاختبار النهائي، وشوفي تأثيره على النتائج فوراً
      </p>

      {/* الشريحة */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-8 max-w-2xl">
        <div className="flex justify-between text-sm text-slate-400 mb-3">
          <span>التقييم المستمر: <span className="text-white font-semibold">{continuousWeight}%</span></span>
          <span>الاختبار النهائي: <span className="text-white font-semibold">{finalWeight}%</span></span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={continuousWeight}
          onChange={(e) => setContinuousWeight(Number(e.target.value))}
          className="w-full accent-blue-500 cursor-pointer"
        />
      </div>

      {/* النتائج */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card, i) => {
          const Icon = card.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-5"
            >
              <Icon size={22} className={card.color} />
              <p className="text-slate-400 text-sm mt-3">{card.label}</p>
              <p className="text-white text-2xl font-bold mt-1">{card.value}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default SimulatorScreen