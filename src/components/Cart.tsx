import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  cartTotal: number;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  onCheckout: () => void;
}

export default function Cart({
  isOpen,
  onClose,
  cart,
  cartTotal,
  updateQuantity,
  removeFromCart,
  onCheckout,
}: CartProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div className="relative w-full max-w-md bg-amber-50 shadow-2xl flex flex-col h-full animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-amber-200">
          <h2 className="text-xl font-serif font-bold text-amber-900">Корзина</h2>
          <button
            onClick={onClose}
            className="p-2 text-amber-600 hover:text-amber-900 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-5xl mb-4 block">🛒</span>
              <p className="text-amber-700 text-lg">Корзина пуста</p>
              <p className="text-amber-500 text-sm mt-2">Добавьте кофе из каталога</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 bg-white rounded-xl p-4 shadow-sm border border-amber-100"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-amber-900 text-sm truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-amber-600">{item.product.weight}</p>
                    <p className="text-sm font-bold text-amber-800 mt-1">
                      {item.product.price * item.quantity} ₽
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-amber-400 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors text-sm font-bold"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-amber-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-amber-200 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-amber-700">Итого:</span>
              <span className="text-2xl font-bold text-amber-900">{cartTotal} ₽</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-3 bg-amber-800 text-amber-50 rounded-full font-medium hover:bg-amber-700 active:scale-[0.98] transition-all duration-200 shadow-md"
            >
              Оформить заказ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
