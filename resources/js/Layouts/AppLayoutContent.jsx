import { useState, useEffect } from "react"
import SideBar from "@/Components/AppLayout/SideBar"
import AppHeader from "@/Components/AppLayout/AppHeader"
import { useToast } from "@/Contexts/ToastContext"
import { usePage } from "@inertiajs/react"

export default function AppLayoutContent({ children, breadcrumb }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const toggleSidebar = () => setSidebarOpen(prev => !prev)

  const { props } = usePage();
  const { toast, success, error } = useToast(); 

  useEffect(() => {
    if (props.toast) {
      const { type, message } = props.toast;
      if (type === 'success') success(message);
      else if (type === 'error') error(message);
      else toast(message);
    }
  }, [props.toast]);

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
          breadcrumb={breadcrumb}
        />

        <main className="bg-gray-200 min-h-screen">{children}</main>
      </div>
    </div>
  )
}
