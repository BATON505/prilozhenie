import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: () => void;
}

export default function ProductDetail({ product, onBack, onAddToCart }: ProductDetailProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-amber-700 hover:text-amber-900 mb-6 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Назад к каталогу</span>
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="h-72 md:h-full min-h-[300px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                {product.origin}
              </span>
              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                {product.roast} обжарка
              </span>
            </div>

            <h1 className="text-3xl font-serif font-bold text-amber-900 mb-2">
              {product.name}
            </h1>
            <p className="text-lg text-amber-600 mb-4">{product.weight}</p>

            <p className="text-amber-700 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Flavor Notes */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-amber-800 mb-2">Вкусовые ноты</h3>
              <div className="flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <span
                    key={note}
                    className="px-3 py-1.5 bg-amber-50 text-amber-700 text-sm rounded-full border border-amber-200"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Specs */}
            <div className="mb-6 space-y-2">
              <h3 className="text-sm font-semibold text-amber-800 mb-2">Характеристики</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-amber-50 rounded-lg p-3">
                  <span className="text-amber-600 block text-xs">Высота</span>
                  <span className="text-amber-900 font-medium">{product.altitude}</span>
                </div>
                <div className="bg-amber-50 rounded-lg p-3">
                  <span className="text-amber-600 block text-xs">Обработка</span>
                  <span className="text-amber-900 font-medium">{product.process}</span>
                </div>
                <div className="bg-amber-50 rounded-lg p-3">
                  <span className="text-amber-600 block text-xs">Обжарка</span>
                  <span className="text-amber-900 font-medium">{product.roast}</span>
                </div>
                <div className="bg-amber-50 rounded-lg p-3">
                  <span className="text-amber-600 block text-xs">Регион</span>
                  <span className="text-amber-900 font-medium">{product.origin}</span>
                </div>
              </div>
            </div>

            {/* Price & Add to Cart */}
            <div className="flex items-center justify-between pt-4 border-t border-amber-100">
              <span className="text-3xl font-bold text-amber-900">
                {product.price} ₽
              </span>
              <button
                onClick={onAddToCart}
                className="px-6 py-3 bg-amber-800 text-amber-50 rounded-full font-medium hover:bg-amber-700 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Добавить в корзину
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
