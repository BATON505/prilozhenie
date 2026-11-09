import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onAddToCart: () => void;
}

export default function ProductCard({ product, onClick, onAddToCart }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-100">
      {/* Image */}
      <div
        className="relative h-56 overflow-hidden cursor-pointer"
        onClick={onClick}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-amber-900/80 text-amber-50 text-xs font-medium rounded-full backdrop-blur-sm">
            {product.roast} обжарка
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 bg-white/90 text-amber-800 text-xs font-medium rounded-full backdrop-blur-sm">
            {product.origin}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="text-lg font-serif font-bold text-amber-900 mb-1 cursor-pointer hover:text-amber-700 transition-colors"
          onClick={onClick}
        >
          {product.name}
        </h3>
        <p className="text-sm text-amber-600 mb-3">{product.weight}</p>

        {/* Flavor Notes */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.notes.slice(0, 3).map((note) => (
            <span
              key={note}
              className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded-full border border-amber-200"
            >
              {note}
            </span>
          ))}
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-amber-900">
            {product.price} ₽
          </span>
          <button
            onClick={onAddToCart}
            className="px-4 py-2 bg-amber-800 text-amber-50 rounded-full text-sm font-medium hover:bg-amber-700 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}
