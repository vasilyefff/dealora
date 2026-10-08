import { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'

export const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <div className="flex min-h-screen bg-gray-100">
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Закрыть боковое меню"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-700 bg-slate-800 p-6 text-white shadow-lg transition-transform duration-200 md:static md:z-auto md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          type="button"
          aria-label="Закрыть боковое меню"
          onClick={() => setIsSidebarOpen(false)}
          className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg text-3xl leading-none text-white hover:bg-white/10 md:hidden"
        >
          ×
        </button>
        <header className="mb-6 text-xl font-bold md:mb-8 md:text-xl">
          Dealora
        </header>
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/dashboard"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              isActive
                ? 'rounded-lg bg-white/15 px-3 py-2 text-lg font-semibold text-white md:text-base'
                : 'rounded-lg px-3 py-2 text-lg text-slate-200 hover:bg-white/10 hover:text-white md:text-base'
            }
          >
            Дашборд
          </NavLink>
          <NavLink
            to="/clients"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              isActive
                ? 'rounded-lg bg-white/15 px-3 py-2 text-lg font-semibold text-white md:text-base'
                : 'rounded-lg px-3 py-2 text-lg text-slate-200 hover:bg-white/10 hover:text-white md:text-base'
            }
          >
            Клиенты
          </NavLink>
          <NavLink
            to="/deals"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              isActive
                ? 'rounded-lg bg-white/15 px-3 py-2 text-lg font-semibold text-white md:text-base'
                : 'rounded-lg px-3 py-2 text-lg text-slate-200 hover:bg-white/10 hover:text-white md:text-base'
            }
          >
            Сделки
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <div className="sticky top-0 z-30 mb-4 bg-gray-100 py-2 md:hidden">
          <button
            type="button"
            aria-label="Открыть боковое меню"
            onClick={() => setIsSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-3xl leading-none text-slate-700 hover:bg-slate-200"
          >
            ☰
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  )
}
