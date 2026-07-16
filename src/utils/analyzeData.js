// محرك تحليل ذكي يفهم أي ملف بيانات ويحسب منه KPIs تلقائياً
// يعتمد على كلمات مفتاحية بأسماء الأعمدة + يطبّع كل عمود لمقياس موحد (0-100)

const SCORE_KEYWORDS = ['score', 'grade', 'exam', 'mark', 'quiz', 'assignment', 'midterm', 'final', 'clo', 'test', 'project', 'period']
const ATTENDANCE_KEYWORDS = ['attendance', 'present', 'absence']
const ID_KEYWORDS = ['id', 'email', 'name', 'phone']
const RISK_KEYWORDS = ['risk', 'status', 'class', 'category', 'level']

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z]/g, '') 
}
// أسماء الدرجات الحقيقية عادة قصيرة (كلمة أو كلمتين)
// أسئلة الاستبيان الطويلة (زي "Discussion improves my interest...") لازم تُستبعد
function isShortColumnName(col) {
  const wordCount = col.trim().split(/[\s_]+/).filter(Boolean).length
  return wordCount <= 3
}

function isNumericColumn(data, column) {
  const sample = data.slice(0, 20).map((row) => row[column])
  const numericCount = sample.filter((v) => typeof v === 'number' && !isNaN(v)).length
  return numericCount / sample.length > 0.7
}

// يستبعد الأعمدة اللي ما تشبه درجات فعلية (زي أرقام تعريف أو سنوات أو قيم سالبة)
function looksLikeScoreColumn(data, column) {
  const values = data.map((row) => row[column]).filter((v) => typeof v === 'number' && !isNaN(v))
  if (values.length === 0) return false
  const max = Math.max(...values)
  const min = Math.min(...values)
  if (max > 1000) return false
  if (min < 0) return false
  return true
}

// يرجع أعلى قيمة موجودة فعلياً بعمود معين — نستخدمها كـ"سقف" لتطبيع القيم
function getColumnMax(data, column) {
  const values = data.map((row) => row[column]).filter((v) => typeof v === 'number' && !isNaN(v))
  if (values.length === 0) return null
  const max = Math.max(...values)
  return max > 0 ? max : null
}

export function detectColumns(data) {
  if (!data || data.length === 0) return null

  const columns = Object.keys(data[0])
  const scoreColumns = []
  let attendanceColumn = null
  let riskColumn = null

  columns.forEach((col) => {
    const normalized = normalize(col)

    if (ID_KEYWORDS.some((kw) => normalized.includes(kw))) return

    if (ATTENDANCE_KEYWORDS.some((kw) => normalized.includes(kw)) && isNumericColumn(data, col)) {
      attendanceColumn = col
      return
    }

    if (RISK_KEYWORDS.some((kw) => normalized.includes(kw)) && !isNumericColumn(data, col)) {
      riskColumn = col
      return
    }

    if (
      SCORE_KEYWORDS.some((kw) => normalized.includes(kw)) &&
      isNumericColumn(data, col) &&
      looksLikeScoreColumn(data, col) &&
      isShortColumnName(col)
    ) {
      scoreColumns.push(col)
    }
  })

  return { scoreColumns, attendanceColumn, riskColumn }
}

// يطبّع درجة طالب بعمود معين لمقياس 0-100 بناءً على أعلى قيمة موجودة فعلياً بذلك العمود
function normalizeValue(value, max) {
  if (!max || max === 0) return null
  return (value / max) * 100
}

// يحسب متوسط الطالب المطبّع عبر كل أعمدة الدرجات المكتشفة
function computeNormalizedGrade(row, scoreColumns, columnMaxes) {
  const normalizedValues = []
  scoreColumns.forEach((col) => {
    const raw = row[col]
    if (typeof raw === 'number' && !isNaN(raw)) {
      const n = normalizeValue(raw, columnMaxes[col])
      if (n !== null) normalizedValues.push(n)
    }
  })
  if (normalizedValues.length === 0) return null
  return normalizedValues.reduce((a, b) => a + b, 0) / normalizedValues.length
}

export function analyzeData(data, aiOverride = null, lang = 'ar') {
    const detected = detectColumns(data)
  if (!detected || detected.scoreColumns.length === 0) return null

  // لو الذكاء الاصطناعي حدد أعمدة ولابيلات، نستخدمها بدل الاكتشاف التلقائي
  let scoreColumns = detected.scoreColumns
  let attendanceColumn = detected.attendanceColumn
  let labelsMap = {}

  if (aiOverride && aiOverride.scoreColumns && aiOverride.scoreColumns.length > 0) {
    const validColumns = aiOverride.scoreColumns
      .map((c) => c.original)
      .filter((col) => data[0] && Object.prototype.hasOwnProperty.call(data[0], col))

    if (validColumns.length > 0) {
      scoreColumns = validColumns
      aiOverride.scoreColumns.forEach((c) => {
        labelsMap[c.original] = c.label
      })
    }

    if (aiOverride.attendanceColumn && data[0] && Object.prototype.hasOwnProperty.call(data[0], aiOverride.attendanceColumn)) {
      attendanceColumn = aiOverride.attendanceColumn
    }
  }

  // نحسب "السقف" الفعلي لكل عمود درجات، وكذلك لعمود الحضور إن وجد
  const columnMaxes = {}
  scoreColumns.forEach((col) => {
    columnMaxes[col] = getColumnMax(data, col)
  })
  const attendanceMax = attendanceColumn ? getColumnMax(data, attendanceColumn) : null

  const grades = data.map((row) => computeNormalizedGrade(row, scoreColumns, columnMaxes)).filter((g) => g !== null)
  if (grades.length === 0) return null

  const totalStudents = data.length
  const averageGrade = grades.reduce((a, b) => a + b, 0) / grades.length
  const passThreshold = 60
  const passCount = grades.filter((g) => g >= passThreshold).length
  const passRate = Math.round((passCount / grades.length) * 100)

  const sortedGrades = [...grades].sort((a, b) => a - b)
  const riskCutoffIndex = Math.floor(sortedGrades.length * 0.25)
  const riskThreshold = sortedGrades[riskCutoffIndex] ?? passThreshold

  let atRiskCount = 0
  let lowRisk = 0

  data.forEach((row) => {
    const grade = computeNormalizedGrade(row, scoreColumns, columnMaxes)
    if (grade === null) return

    const lowGrade = grade <= riskThreshold

    let lowAttendance = false
    if (attendanceColumn && attendanceMax) {
      const rawAttendance = row[attendanceColumn]
      if (typeof rawAttendance === 'number' && !isNaN(rawAttendance)) {
        const normalizedAttendance = normalizeValue(rawAttendance, attendanceMax)
        lowAttendance = normalizedAttendance !== null && normalizedAttendance < 75
      }
    }

    const isAtRisk = attendanceColumn ? (lowGrade && lowAttendance) : lowGrade

    if (isAtRisk) {
      atRiskCount++
    } else {
      lowRisk++
    }
  })

  const mediumRisk = Math.max(0, totalStudents - atRiskCount - lowRisk)

  const riskDistribution = [
    { name: 'منخفض الخطر', value: lowRisk, color: '#22c55e' },
    { name: 'متوسط الخطر', value: mediumRisk, color: '#f59e0b' },
    { name: 'عالي الخطر', value: atRiskCount, color: '#ef4444' },
  ]

  // متوسط الأداء لكل عمود، مطبّع كنسبة من سقفه الفعلي — عشان الأعمدة تكون قابلة للمقارنة بصرياً
 const componentAverages = scoreColumns.map((col) => {
    const max = columnMaxes[col]
    const values = data.map((row) => row[col]).filter((v) => typeof v === 'number' && !isNaN(v))
    const rawAvg = values.reduce((a, b) => a + b, 0) / values.length
    const normalizedAvg = max ? (rawAvg / max) * 100 : 0
    return { clo: labelsMap[col] || col, mastered: Math.round(normalizedAvg), total: 100 }
  })

  const weakest = [...componentAverages].sort((a, b) => a.mastered - b.mastered)[0]
  const strongest = [...componentAverages].sort((a, b) => b.mastered - a.mastered)[0]

  const recommendations = {
    ar: [
      {
        id: 1,
        title: `ضعف واضح في ${weakest.clo}`,
        reason: `متوسط أداء الطلاب في هذا المكوّن هو ${weakest.mastered}% من الدرجة الكاملة، الأضعف بين كل المكونات`,
        action: 'يُنصح بمراجعة طريقة تدريس هذا الجزء أو تخصيص جلسات تقوية إضافية',
      },
      {
        id: 2,
        title: `${atRiskCount} طالب مصنفين في فئة عالية الخطر`,
        reason: attendanceColumn
          ? 'اعتماداً على تدني الدرجات مع انخفاض نسبة الحضور معاً'
          : 'اعتماداً على انخفاض الدرجات مقارنة بباقي الطلاب',
        action: 'يُنصح بتفعيل بروتوكول الإنذار الأكاديمي والتواصل المباشر مع هؤلاء الطلاب',
      },
      {
        id: 3,
        title: `تميز ملحوظ في ${strongest.clo}`,
        reason: `متوسط أداء الطلاب في هذا المكوّن هو ${strongest.mastered}% من الدرجة الكاملة، الأعلى بين كل المكونات`,
        action: 'يمكن الاستفادة من هذا النجاح كنموذج يُطبّق على المكونات الأضعف',
      },
    ],
    en: [
      {
        id: 1,
        title: `Clear weakness in ${weakest.clo}`,
        reason: `Average student performance in this component is ${weakest.mastered}%, the lowest among all components`,
        action: 'Consider reviewing the teaching approach for this part or scheduling additional reinforcement sessions',
      },
      {
        id: 2,
        title: `${atRiskCount} students classified as high risk`,
        reason: attendanceColumn
          ? 'Based on both low grades and low attendance combined'
          : 'Based on lower grades compared to the rest of the students',
        action: 'Consider activating the academic warning protocol and direct communication with these students',
      },
      {
        id: 3,
        title: `Notable strength in ${strongest.clo}`,
        reason: `Average student performance in this component is ${strongest.mastered}%, the highest among all components`,
        action: 'This success can be used as a model applied to the weaker components',
      },
    ],
  }

 // لو الذكاء الاصطناعي أعطانا توصيات مبنية على الفهم الفعلي، نستخدمها بدل التوصيات الآلية
  const finalRecommendations =
    aiOverride && aiOverride.recommendations && aiOverride.recommendations.length > 0
      ? aiOverride.recommendations.map((r, i) => ({ id: i + 1, ...r }))
      : recommendations

  return {
    summary: { totalStudents, passRate, averageGrade: Math.round(averageGrade * 10) / 10, atRiskCount },
    riskDistribution,
    componentAverages,
    recommendations: finalRecommendations,
    isAIRecommendation: !!(aiOverride && aiOverride.recommendations && aiOverride.recommendations.length > 0),
    scoreColumns,
    usedAI: !!(aiOverride && aiOverride.scoreColumns),
  }
}