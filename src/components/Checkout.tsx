import { useState } from 'react';
import { CartItem, CustomerInfo } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  cartTotal: number;
  onBack: () => void;
  onSubmit: (customerInfo: CustomerInfo) => void;
}

export default function Checkout({ cart, cartTotal, onBack, onSubmit }: CheckoutProps) {
  const [form, setForm] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

  const validate = (): boolean => {
    const newErrors: Partial<CustomerInfo> = {};
    if (!form.name.trim()) newErrors.name = 'Введите имя';
    if (!form.email.trim() || !form.email.includes('@')) newErrors.email = 'Введите корректный email';
    if (!form.phone.trim()) newErrors.phone = 'Введите телефон';
    if (!form.address.trim()) newErrors.address = 'Введите адрес';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
  };

  const handleChange = (field: keyof CustomerInfo, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

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

      <h1 className="text-3xl font-serif font-bold text-amber-900 mb-8">Оформление заказа</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 md:p-8">
            <h2 className="text-xl font-serif font-bold text-amber-900 mb-6">Контактные данные</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1">
                  Имя и фамилия *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-amber-200'
                  } focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-amber-900`}
                  placeholder="Иван Иванов"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-amber-200'
                  } focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-amber-900`}
                  placeholder="ivan@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1">
                  Телефон *
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.phone ? 'border-red-300 bg-red-50' : 'border-amber-200'
                  } focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-amber-900`}
                  placeholder="+7 (999) 123-45-67"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1">
                  Адрес доставки *
                </label>
                <textarea
                  value={form.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.address ? 'border-red-300 bg-red-50' : 'border-amber-200'
                  } focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-amber-900 resize-none`}
                  placeholder="г. Москва, ул. Примерная, д. 1, кв. 1"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-8 py-4 bg-amber-800 text-amber-50 rounded-full font-medium text-lg hover:bg-amber-700 active:scale-[0.98] transition-all duration-200 shadow-md"
            >
              Подтвердить заказ — {cartTotal} ₽
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 sticky top-24">
            <h2 className="text-lg font-serif font-bold text-amber-900 mb-4">Ваш заказ</h2>
            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center text-sm">
                  <div className="flex-1 min-w-0">
                    <p className="text-amber-900 font-medium truncate">{item.product.name}</p>
                    <p className="text-amber-500 text-xs">
                      {item.quantity} × {item.product.price} ₽
                    </p>
                  </div>
                  <span className="text-amber-800 font-medium ml-2">
                    {item.product.price * item.quantity} ₽
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-amber-100 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-amber-700 font-medium">Итого</span>
                <span className="text-xl font-bold text-amber-900">{cartTotal} ₽</span>
              </div>
              <p className="text-xs text-amber-500 mt-2">Доставка рассчитывается отдельно</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
