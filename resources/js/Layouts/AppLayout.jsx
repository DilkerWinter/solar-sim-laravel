import AppHeader from './../Components/App/AppHeader'

export default function AppLayout({ children }) {
  return (
    <div>
        <AppHeader/>
      <nav></nav>
      <main>
        {children}
      </main>
    </div>
  );
}
