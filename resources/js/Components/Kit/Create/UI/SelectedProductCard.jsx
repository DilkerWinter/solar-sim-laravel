export default function SelectedProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h2 className="text-lg font-semibold text-gray-900 flex-1 leading-tight">
          {product.name}
        </h2>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200 whitespace-nowrap">
          {product.brand}
        </span>
      </div>

      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
        {product.description}
      </p>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold text-gray-900">
            R$ {product.price}
          </p>
          {product.inverter && product.inverter.max_power_watts && (
            <p className="text-lg font-semibold text-yellow-700">
              {product.inverter.max_power_watts} W
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="quantity" className="text-sm text-gray-600 whitespace-nowrap">
            Qtd:
          </label>
          <input
            id="quantity"
            type="number"
            defaultValue={1}
            min={1}
            className="w-16 h-9 border border-gray-300 rounded-md px-2 text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
