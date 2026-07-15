// يحاول يستخدم الذكاء الاصطناعي لفهم البيانات
// لو فشل لأي سبب (حد الاستخدام، خطأ شبكة، إلخ) يرجع null بصمت
// بدون ما يظهر أي خطأ للمستخدم — النظام يرجع تلقائياً للقواعد الذكية

export async function tryAIAnalyze(columns, sampleRows) {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ columns, sampleRows: sampleRows.slice(0, 5) }),
    })

    if (!response.ok) return null

    const data = await response.json()
    if (!data.success) return null

    return data.analysis
  } catch (err) {
    // أي خطأ (شبكة، مهلة، إلخ) يرجع null بهدوء
    return null
  }
}