"use client"

import { useState } from "react"
import { usePage } from "@inertiajs/react"
import SideBar from "@/Components/AppLayout/SideBar"
import AppHeader from "@/Components/AppLayout/AppHeader"

export default function AppLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const toggleSidebar = () => setSidebarOpen(prev => !prev)

  const { url } = usePage()
  const path = "/" + url.split("?")[0].split("/")[1]; 
  const titles = {
    "/dashboard": "Dashboard",
    "/customers": "Clientes",
    "/produtos": "Produtos",
    "/kits": "Kits Solares",
    "/propostas": "Propostas",
    "/relatorios": "Relatórios",
    "/configuracoes": "Configurações",
  }
  const pageTitle = titles[path] ?? "Página"

  return (
    <div className="flex min-h-screen">
      <aside
        className={`fixed inset-y-0 left-0 w-60 shadow-lg bg-white z-40
                    transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <SideBar />
      </aside>

      <div
        className={`flex flex-col flex-1 min-h-screen transition-all duration-300 ease-in-out
                    ${isSidebarOpen ? "ml-60" : "ml-0 w-full"}`}
      >
        <AppHeader
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
          pageTitle={pageTitle}
        />

        <main className="p-4">{children}</main>
      </div>
    </div>
  )
}
