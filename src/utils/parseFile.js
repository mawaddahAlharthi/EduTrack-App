import Papa from 'papaparse'
import * as XLSX from 'xlsx'

// تقرأ أي ملف CSV أو Excel وترجع البيانات كجدول (Array of Objects)
export function parseFile(file) {
  return new Promise((resolve, reject) => {
    const fileName = file.name.toLowerCase()

    if (fileName.endsWith('.csv')) {
      // ملفات CSV
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => {
          resolve(results.data)
        },
        error: (err) => reject(err),
      })
    } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      // ملفات Excel
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const workbook = XLSX.read(e.target.result, { type: 'binary' })
          const firstSheetName = workbook.SheetNames[0]
          const sheet = workbook.Sheets[firstSheetName]
          const jsonData = XLSX.utils.sheet_to_json(sheet)
          resolve(jsonData)
        } catch (err) {
          reject(err)
        }
      }
      reader.onerror = (err) => reject(err)
      reader.readAsBinaryString(file)
    } else {
      reject(new Error('صيغة الملف غير مدعومة'))
    }
  })
}

// ترجع أسماء الأعمدة + أول 5 صفوف فقط (عينة) — نستخدمها بعدين لتحليل AI
export function getFileSample(data) {
  if (!data || data.length === 0) return null

  const columns = Object.keys(data[0])
  const sampleRows = data.slice(0, 5)

  return { columns, sampleRows, totalRows: data.length }
}