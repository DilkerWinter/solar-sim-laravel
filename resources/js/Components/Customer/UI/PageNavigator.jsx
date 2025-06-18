import {
    ChevronsLeft,
    ChevronLeft,
    ChevronRight,
    ChevronsRight,
} from "lucide-react";

export default function PageNavigator({
    currentPage,
    totalPages,
    onPageChange,
}) {
    if (totalPages === 0) return null;

    const maxButtons = 7;

    const generatePageNumbers = (current, total) => {
        const maxButtons = 7;
        let start = Math.max(1, current - Math.floor(maxButtons / 2));
        let end = start + maxButtons - 1;

        if (end > total) {
            end = total;
            start = Math.max(1, end - maxButtons + 1);
        }

        const range = [];
        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        return range;
    };

    return (
        <div className="flex justify-center mt-6">
            <div className="flex items-center gap-1">
                <button
                    disabled={currentPage === 1}
                    className="h-9 w-9 p-0 rounded-md border border-gray-300 disabled:opacity-50 disabled:text-gray-500"
                    onClick={() => onPageChange(1)}
                >
                    <ChevronsLeft className="h-4 w-4 mx-auto" />
                </button>

                <button
                    disabled={currentPage === 1}
                    className="h-9 w-9 p-0 rounded-md border border-gray-300 disabled:opacity-50 disabled:text-gray-500"
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    <ChevronLeft className="h-4 w-4 mx-auto" />
                </button>

                {generatePageNumbers(currentPage, totalPages).map((page, index) => (
                    <button
                        key={index}
                        disabled={page === currentPage}
                        onClick={() => onPageChange(page)}
                        className={`h-9 min-w-9 px-3 rounded-md border text-sm transition-all duration-300
                            ${page === currentPage
                                ? "bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md border-none font-semibold"
                                : "border-gray-300 text-gray-700 hover:bg-gray-300 "
                            }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    disabled={currentPage === totalPages}
                    className="h-9 w-9 p-0 rounded-md border border-gray-300 disabled:opacity-50 disabled:text-gray-500"
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    <ChevronRight className="h-4 w-4 mx-auto" />
                </button>

                <button
                    disabled={currentPage === totalPages}
                    className="h-9 w-9 p-0 rounded-md border border-gray-300 disabled:opacity-50 disabled:text-gray-500"
                    onClick={() => onPageChange(totalPages)}
                >
                    <ChevronsRight className="h-4 w-4 mx-auto" />
                </button>
            </div>
        </div>
    );
}
