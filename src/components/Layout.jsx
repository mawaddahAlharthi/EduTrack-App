import { LayoutDashboard, ClipboardList, ArrowLeft } from 'lucide-react'

const tabs = [
  { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
  { id: 'recommendations', label: 'التوصيات', icon: ClipboardList },
]

function Layout({ activeTab, onTabChange, children, onBack }) {
  return (
    <div className="min-h-screen bg-slate-900 flex">
      
      {/* الشريط الجانبي - يظهر بشاشات الكمبيوتر فقط */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-800 border-l border-slate-700 p-6">
        <div className="flex items-center gap-2 mb-6">
          <img src="/logo.png" alt="EduTrack" className="w-20 h-20 object-contain" />
          <h2 className="text-white font-bold text-xl">EduTrack</h2>
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 text-sm"
        >
          <ArrowLeft size={16} />
          رفع ملف جديد
        </button>
        <nav className="flex flex-col gap-2">

          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </aside>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>

      {/* الشريط السفلي - يظهر بشاشات الجوال فقط */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 flex justify-around py-3 z-50">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 px-4 transition-colors ${
                isActive ? 'text-blue-400' : 'text-slate-500'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs">{tab.label}</span>
            </button>
          )
        })}
      </nav>

    </div>
  )
}

export default Layout