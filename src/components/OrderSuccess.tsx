interface OrderSuccessProps {
  onBack: () => void;
}

export default function OrderSuccess({ onBack }: OrderSuccessProps) {
  return (
    <div className="max-w-lg mx-auto text-center py-16">
      <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 md:p-12">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="text-3xl font-serif font-bold text-amber-900 mb-4">
          Заказ оформлен!
        </h1>
        <p className="text-amber-700 text-lg mb-2">
          Спасибо за ваш заказ!
        </p>
        <p className="text-amber-600 mb-8">
          Мы свяжемся с вами для подтверждения доставки. Ваш кофе уже в пути к идеальной обжарке.
        </p>

        <div className="bg-amber-50 rounded-xl p-4 mb-8 border border-amber-100">
          <p className="text-sm text-amber-700">
            📧 Подтверждение заказа отправлено на ваш email
          </p>
        </div>

        <button
          onClick={onBack}
          className="px-8 py-3 bg-amber-800 text-amber-50 rounded-full font-medium hover:bg-amber-700 active:scale-95 transition-all duration-200 shadow-md"
        >
          Вернуться в каталог
        </button>
      </div>
    </div>
  );
}
