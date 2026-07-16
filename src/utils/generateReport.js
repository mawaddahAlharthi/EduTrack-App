import { domToPng } from 'modern-screenshot'

export async function downloadDashboardAsImage(elementId) {
  const element = document.getElementById(elementId)
  if (!element) return

  const dataUrl = await domToPng(element, {
    backgroundColor: null,
    scale: 2,
  })

  const link = document.createElement('a')
  link.download = 'EduTrack-Dashboard.png'
  link.href = dataUrl
  link.click()
}