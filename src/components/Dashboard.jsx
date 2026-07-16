import { motion } from 'framer-motion'
import { Users, TrendingUp, Award, AlertTriangle } from 'lucide-react'
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts'
import {
  sampleSummary,
  sampleRiskDistribution,
  sampleCLOMastery,
  sampleRecommendations,
} from '../data/sampleData'

function Dashboard({ analysis }) {
  const summary = analysis?.summary ?? sampleSummary
  const riskDistribution = analysis?.riskDistribution ?? sampleRiskDistribution
  const componentAverages = analysis?.componentAverages ?? sampleCLOMastery
  const recommendations = analysis?.recommendations ?? sampleRecommendations

  const kpis = [
    { label: 'إجمالي الطلاب', value: summary.totalStudents, icon: Users, color: 'text-blue-500 dark:text-blue-400' },
    { label: 'نسبة النجاح', value: `${summary.passRate}%`, icon: TrendingUp, color: 'text-green-500 dark:text-green-400' },
    { label: 'متوسط الدرجات', value: summary.averageGrade, icon: Award, color: 'text-yellow-500 dark:text-yellow-400' },
    { label: 'طلاب في خطر', value: summary.atRiskCount, icon: AlertTriangle, color: 'text-red-500 dark:text-red-400' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 px-6 py-10 transition-colors">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8"
      >
        لوحة التحكم
      </motion.h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5"
            >
              <Icon size={22} className={kpi.color} />
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">{kpi.label}</p>
              <p className="text-slate-900 dark:text-white text-2xl font-bold mt-1">{kpi.value}</p>
            </motion.div>
          )
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6"
        >
          <h3 className="text-slate-900 dark:text-white font-semibold mb-4">توزيع مستوى الخطر</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={riskDistribution}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
              >
                {riskDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: 8, color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2 flex-wrap">
            {riskDistribution.map((entry, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6"
        >
          <h3 className="text-slate-900 dark:text-white font-semibold mb-4">متوسط الأداء حسب المكوّن</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={componentAverages}>
              <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" />
              <XAxis dataKey="clo" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: 8, color: '#fff' }}
              />
              <Bar dataKey="mastered" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-slate-900 dark:text-white font-semibold mb-4">توصيات الذكاء الاصطناعي</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5"
            >
              <h4 className="text-slate-900 dark:text-white font-medium mb-2">{rec.title}</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">{rec.reason}</p>
              <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
                <p className="text-blue-600 dark:text-blue-400 text-sm">{rec.action}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  )
}

export default Dashboard