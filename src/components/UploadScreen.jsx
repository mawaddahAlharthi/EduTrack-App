import { useState } from 'react'
import { motion } from 'framer-motion'
import { UploadCloud, FileSpreadsheet, Sparkles } from 'lucide-react'

function UploadScreen({ onFileReady, onUseSampleData, isProcessing }) {
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState(null)

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) handleFile(file)
  }

  const handleFile = (file) => {
    setFileName(file.name)
    onFileReady(file)
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-6">
      
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold text-white mb-3 text-center"
      >
        ارفعي ملف البيانات
      </motion.h2>

      <p className="text-slate-400 mb-10 text-center max-w-md">
        أي ملف CSV أو Excel فيه بيانات طلابية — التطبيق بيفهم شكله تلقائياً
      </p>

      {/* منطقة السحب والإفلات */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`w-full max-w-lg border-2 border-dashed rounded-2xl p-12 text-center transition-colors cursor-pointer ${
          isDragging ? 'border-blue-400 bg-blue-500/10' : 'border-slate-700 bg-slate-800/50'
        }`}
      >
        <input
          type="file"
          id="fileInput"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileSelect}
          className="hidden"
        />
        <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center">
          {fileName ? (
            <>
              <FileSpreadsheet size={40} className="text-green-400 mb-4" />
              <p className="text-white font-medium">{fileName}</p>
              <p className="text-slate-500 text-sm mt-1">تم اختيار الملف ✓</p>
            </>
          ) : (
            <>
              <UploadCloud size={40} className="text-blue-400 mb-4" />
              <p className="text-white font-medium mb-1">اسحبي الملف هنا</p>
              <p className="text-slate-500 text-sm">أو اضغطي للاختيار من جهازك</p>
            </>
          )}
        </label>
      </motion.div>

     <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onUseSampleData}
        className="mt-8 flex items-center gap-2 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 px-6 py-3 rounded-full transition-colors"
      >
        <Sparkles size={18} className="text-yellow-400" />
        جرّبي بيانات تجريبية بدون رفع ملف
      </motion.button>

      {isProcessing && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-blue-400 text-sm"
        >
          جاري تحليل البيانات...
        </motion.p>
      )}

    </div>
  )
}

export default UploadScreen