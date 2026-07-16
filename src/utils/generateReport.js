import { domToPng } from 'modern-screenshot'

export async function downloadDashboardAsImage(elementId) {
  const element = document.getElementById(elementId)
  if (!element) return

  const dataUrl = await domToPng(element, {
    backgroundColor: null,
    scale: 2,
  })

  // نكتشف هل الجهاز آيفون/آيباد (بيئات تقيّد التحميل التلقائي)
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

  if (isIOS) {
    // نفتح الصورة بتبويب جديد، والمستخدم يحفظها يدوياً (اضغط مطولاً ← حفظ الصورة)
    const newTab = window.open()
    newTab.document.write(`<img src="${dataUrl}" style="width:100%" />`)
    newTab.document.title = 'EduTrack Dashboard'
  } else {
    // على باقي الأجهزة، تحميل تلقائي مباشر
    const link = document.createElement('a')
    link.download = 'EduTrack-Dashboard.png'
    link.href = dataUrl
    link.click()
  }
}