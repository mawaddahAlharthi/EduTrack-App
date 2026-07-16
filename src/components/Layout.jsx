import { LayoutDashboard, ClipboardList, ArrowLeft, Sun, Moon, Languages } from 'lucide-react'

function Layout({ activeTab, onTabChange, children, onBack, theme, onToggleTheme, lang, onToggleLang, t }) {
  const tabs = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'recommendations', label: t.recommendations, icon: ClipboardList },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex transition-colors">

      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center gap-2 mb-6">
          <img src="/logo.png" alt="EduTrack" className="w-20 h-20 object-contain" />
          <h2 className="text-slate-900 dark:text-white font-bold text-xl">EduTrack</h2>
        </div>
        <button
          onClick={onBack}
          title="Back"
          className="flex items-center justify-center w-10 h-10 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={18} className={lang === 'en' ? 'rotate-180' : ''} />
        </button>
        <nav className="flex flex-col gap-2 flex-1">
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
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            )
          })}
        </nav>

        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={onToggleTheme}
            className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm"
          >
            <Languages size={16} />
            <span className="text-xs font-medium">{lang === 'ar' ? 'EN' : 'ع'}</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>

      <button
        onClick={onToggleTheme}
        className="md:hidden fixed top-4 left-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-full p-3 shadow-lg z-50"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <button
        onClick={onToggleLang}
        className="md:hidden fixed top-4 left-16 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-full px-3 py-3 shadow-lg z-50 flex items-center gap-1"
      >
        <Languages size={18} />
        <span className="text-xs font-medium">{lang === 'ar' ? 'EN' : 'ع'}</span>
      </button>

      <button
        onClick={onBack}
        className="md:hidden fixed top-4 right-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-full p-3 shadow-lg z-50"
      >
        <ArrowLeft size={20} className={lang === 'en' ? 'rotate-180' : ''} />
      </button>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-around py-3 z-50">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 px-4 transition-colors ${
                isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'
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