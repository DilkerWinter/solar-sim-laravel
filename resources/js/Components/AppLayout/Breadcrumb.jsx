import { Link, usePage } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb() {
  const { url } = usePage();

  const cleanUrl = url.split("?")[0];
  const segments = cleanUrl.split("/").filter(Boolean);

  const nameMap = {
    dashboard: "Dashboard",
    customers: "Clientes",
    create: "Cadastro",
    produtos: "Produtos",
    kits: "Kits Solares",
    propostas: "Propostas",
    relatorios: "Relatórios",
    configuracoes: "Configurações",
  };

  const breadcrumbItems = [{ name: "Início", href: "/dashboard" }];

  if (!(segments.length === 1 && segments[0] === "dashboard")) {
    segments.reduce((acc, segment) => {
      const path = acc + "/" + segment;
      breadcrumbItems.push({
        name: nameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
        href: path,
      });
      return path;
    }, "");
  }

  const lastIndex = breadcrumbItems.length - 1;

  return (
    <nav aria-label="breadcrumb" className="text-lg">
      <ol className="flex items-center select-none">
        {breadcrumbItems.map((item, idx) => (
          <li key={idx} className="flex items-center whitespace-nowrap">
            {idx !== lastIndex ? (
              <>
                <Link
                  href={item.href}
                  className=" hover:text-blue-600 transition"
                >
                  {item.name}
                </Link>
                <ChevronRight
                  className="mx-1 "
                  size={14}
                  style={{ verticalAlign: "middle" }}
                />
              </>
            ) : (
              <span >{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
