// هذا الملف يشتغل على سيرفر Cloudflare، مو بمتصفح المستخدم
// تحديث: إعادة بناء لتفعيل المفتاح الجديد
// المفتاح محمي هنا ولا ينكشف أبداً للمستخدم النهائي

const DAILY_LIMIT = 25

export async function onRequestPost(context) {
  const { request, env } = context

  try {
    const body = await request.json()
    const { columns, sampleRows } = body

    if (!columns || !sampleRows) {
      return new Response(JSON.stringify({ error: 'missing_data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const today = new Date().toISOString().slice(0, 10)
    const usageKey = `usage:${today}`

    let currentUsage = 0
    if (env.EDUTRACK_KV) {
      const stored = await env.EDUTRACK_KV.get(usageKey)
      currentUsage = stored ? parseInt(stored, 10) : 0

      if (currentUsage >= DAILY_LIMIT) {
        return new Response(JSON.stringify({ error: 'limit_reached' }), {
          status: 429,
          headers: { 'Content-Type': 'application/json' },
        })
      }
    }

    const prompt = `أنت محلل بيانات أكاديمية خبير. لديك أعمدة من ملف بيانات طلابي:

الأعمدة: ${JSON.stringify(columns)}

عينة من الصفوف:
${JSON.stringify(sampleRows, null, 2)}

مهمتك:
1. حدد أي الأعمدة تمثل درجات أداء أكاديمي حقيقية (استبعد الأعمدة الشخصية مثل الاسم، الإيميل، الرقم الجامعي، وأسئلة الاستبيان الطويلة غير المرتبطة مباشرة بالأداء)
2. لكل عمود درجات مهم، أعطِ اسماً عربياً مفهوماً وواضحاً (مثال: "Participation_Score" يصير "المشاركة الصفية")
3. حدد عمود الحضور إن وجد
4. اكتب 3 توصيات ذكية مبنية على المعنى الفعلي للأعمدة، وليس فقط الاسم التقني

أجب فقط بصيغة JSON بدون أي نص إضافي، بهذا الشكل بالضبط:
{
  "scoreColumns": [{"original": "اسم العمود الأصلي", "label": "الاسم العربي المفهوم"}],
  "attendanceColumn": "اسم عمود الحضور أو null",
  "recommendations": [
    {"title": "عنوان قصير", "reason": "شرح مبني على الفهم الفعلي", "action": "توصية عملية"}
  ]
}`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return new Response(JSON.stringify({ error: 'api_error', status: response.status, details: errorText }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const data = await response.json()
    const textContent = data.content.find((c) => c.type === 'text')?.text ?? ''

    const cleaned = textContent.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(cleaned)

    if (env.EDUTRACK_KV) {
      await env.EDUTRACK_KV.put(usageKey, String(currentUsage + 1), {
        expirationTtl: 60 * 60 * 24 * 2,
      })
    }

    return new Response(JSON.stringify({ success: true, analysis: parsed }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'server_error', message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}