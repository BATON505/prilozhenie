import { useState, useMemo, useCallback } from 'react';
import { Product, CartItem, CustomerInfo } from './types';
import { products, categories, roastLevels } from './data/products';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';

type View = 'catalog' | 'detail' | 'cart' | 'checkout' | 'success';

function App() {
  const [view, setView] = useState<View>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedRoast, setSelectedRoast] = useState('Все');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.notes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
      const matchesRoast = selectedRoast === 'Все' || product.roast === selectedRoast;
      return matchesSearch && matchesCategory && matchesRoast;
    });
  }, [searchQuery, selectedCategory, selectedRoast]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('detail');
  };

  const handleCheckout = (customerInfo: CustomerInfo) => {
    console.log('Order placed:', { items: cart, total: cartTotal, customer: customerInfo });
    setCart([]);
    setOrderComplete(true);
    setView('success');
  };

  const handleBackToCatalog = () => {
    setView('catalog');
    setSelectedProduct(null);
    setOrderComplete(false);
  };

  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        onLogoClick={handleBackToCatalog}
      />

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        cartTotal={cartTotal}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        onCheckout={() => {
          setCartOpen(false);
          setView('checkout');
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'catalog' && (
          <>
            {/* Hero Section */}
            <section className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-900 mb-4">
                Спешелти Кофе
              </h1>
              <p className="text-lg text-amber-700 max-w-2xl mx-auto">
                Отборные зёрна с лучших плантаций мира. Каждая чашка — путешествие к истокам вкуса.
              </p>
            </section>

            {/* Filters */}
            <section className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">Регион</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          selectedCategory === cat
                            ? 'bg-amber-800 text-amber-50 shadow-md'
                            : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">Обжарка</label>
                  <div className="flex flex-wrap gap-2">
                    {roastLevels.map((roast) => (
                      <button
                        key={roast}
                        onClick={() => setSelectedRoast(roast)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          selectedRoast === roast
                            ? 'bg-amber-800 text-amber-50 shadow-md'
                            : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-100'
                        }`}
                      >
                        {roast}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Products Grid */}
            <section>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-xl text-amber-700">Кофе не найден</p>
                  <p className="text-amber-600 mt-2">Попробуйте изменить параметры поиска</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={() => handleProductClick(product)}
                      onAddToCart={() => addToCart(product)}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {view === 'detail' && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onBack={handleBackToCatalog}
            onAddToCart={() => {
              addToCart(selectedProduct);
              setCartOpen(true);
            }}
          />
        )}

        {view === 'checkout' && (
          <Checkout
            cart={cart}
            cartTotal={cartTotal}
            onBack={() => setView('catalog')}
            onSubmit={handleCheckout}
          />
        )}

        {view === 'success' && orderComplete && (
          <OrderSuccess onBack={handleBackToCatalog} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-serif font-bold mb-4">☕ Спешелти Кофе</h3>
              <p className="text-amber-200 text-sm">
                Мы тщательно отбираем каждое зерно, чтобы подарить вам незабываемый кофейный опыт.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-amber-200">
                <li>О компании</li>
                <li>Доставка и оплата</li>
                <li>Возврат</li>
                <li>Контакты</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-amber-200">
                <li>📍 Москва, ул. Кофейная, 42</li>
                <li>📞 +7 (999) 123-45-67</li>
                <li>✉️ hello@specialtycoffee.ru</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-amber-700 mt-8 pt-8 text-center text-sm text-amber-300">
            © 2026 Спешелти Кофе. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
