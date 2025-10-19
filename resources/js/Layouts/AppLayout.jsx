import { ToastProvider } from "@/Contexts/ToastContext"
import AppLayoutContent from "./AppLayoutContent"

export default function AppLayout({ children, breadcrumb }) {
  return (
    <ToastProvider>
      <AppLayoutContent children={children} breadcrumb={breadcrumb} />
    </ToastProvider>
  )
}
