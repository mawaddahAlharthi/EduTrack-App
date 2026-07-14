// يعيد حساب النتائج بناءً على أوزان مخصصة للتقييم المستمر مقابل الاختبار النهائي
// يفترض إن آخر عمود بقائمة الأعمدة هو الأقرب لـ "نهائي/تجميعي"، والباقي "تقييم مستمر"

export function simulateWithWeights(rawData, scoreColumns, continuousWeight, finalWeight) {
  if (!rawData || scoreColumns.length === 0) return null

  const finalCol = scoreColumns[scoreColumns.length - 1]
  const continuousCols = scoreColumns.slice(0, -1)

  const grades = rawData.map((row) => {
    const continuousValues = continuousCols
      .map((c) => row[c])
      .filter((v) => typeof v === 'number' && !isNaN(v))

    const continuousAvg =
      continuousValues.length > 0
        ? continuousValues.reduce((a, b) => a + b, 0) / continuousValues.length
        : 0

    const finalValue = typeof row[finalCol] === 'number' ? row[finalCol] : 0

    return continuousAvg * (continuousWeight / 100) + finalValue * (finalWeight / 100)
  })

  const totalStudents = grades.length
  const averageGrade = grades.reduce((a, b) => a + b, 0) / totalStudents
  const passCount = grades.filter((g) => g >= 60).length
  const passRate = Math.round((passCount / totalStudents) * 100)

  const sorted = [...grades].sort((a, b) => a - b)
  const riskThreshold = sorted[Math.floor(sorted.length * 0.25)] ?? 60
  const atRiskCount = grades.filter((g) => g <= riskThreshold).length

  return {
    totalStudents,
    averageGrade: Math.round(averageGrade * 10) / 10,
    passRate,
    atRiskCount,
  }
}