import { ChevronRight } from "lucide-react";
import { Link } from "@inertiajs/react";

/**
 * Custom breadcrumb component
 * @param {{ items: { name: string; href?: string }[] }} props
 */
export default function CustomBreadcrumb({ items }) {
  const lastIndex = items.length - 1;

  return (
    <nav aria-label="breadcrumb" className="text-lg">
      <ol className="flex items-center select-none">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center whitespace-nowrap">
            {item.href && idx !== lastIndex ? (
              <>
                <Link
                  href={item.href}
                  className="hover:text-blue-600 transition text-gray-500"
                >
                  {item.name}
                </Link>
                <ChevronRight
                  className="mx-1 text-gray-500"
                  size={14}
                  style={{ verticalAlign: "middle" }}
                />
              </>
            ) : (
              <span
                className={idx === lastIndex ? "text-black" : "text-gray-200"}
              >
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
