import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Yirgacheffe Natural',
    origin: 'Эфиопия',
    category: 'Эфиопия',
    roast: 'Светлая',
    price: 1290,
    weight: '250 г',
    description: 'Яркий и цветочный кофе из региона Иргачеффе. Натуральная обработка раскрывает сложные фруктовые ноты и сладость спелых ягод. Идеален для альтернативных способов заваривания.',
    notes: ['Голубика', 'Жасмин', 'Бергамот', 'Мёд'],
    altitude: '1900–2100 м',
    process: 'Натуральная',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop&crop=center'
  },
  {
    id: 2,
    name: 'Huila Supremo',
    origin: 'Колумбия',
    category: 'Колумбия',
    roast: 'Средняя',
    price: 1150,
    weight: '250 г',
    description: 'Классический колумбийский кофе из региона Уила. Сбалансированный вкус с карамельной сладостью и мягкой кислотностью. Отлично подходит как для эспрессо, так и для фильтра.',
    notes: ['Карамель', 'Красное яблоко', 'Грецкий орех', 'Шоколад'],
    altitude: '1600–1800 м',
    process: 'Мытая',
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=400&h=400&fit=crop&crop=center'
  },
  {
    id: 3,
    name: 'Cerrado Mineiro',
    origin: 'Бразилия',
    category: 'Бразилия',
    roast: 'Средняя',
    price: 980,
    weight: '250 г',
    description: 'Плотный и сладкий кофе из региона Серрадо. Низкая кислотность, насыщенный вкус с нотами шоколада и орехов. Превосходный выбор для эспрессо и молочных напитков.',
    notes: ['Тёмный шоколад', 'Фундук', 'Карамель', 'Какао'],
    altitude: '900–1200 м',
    process: 'Натуральная',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=400&h=400&fit=crop&crop=center'
  },
  {
    id: 4,
    name: 'Nyeri AA',
    origin: 'Кения',
    category: 'Кения',
    roast: 'Светлая',
    price: 1450,
    weight: '250 г',
    description: 'Выдающийся кенийский кофе категории AA. Яркая, винная кислотность с комплексным фруктовым профилем. Один из самых востребованных лотов среди ценителей спешелти.',
    notes: ['Чёрная смородина', 'Грейпфрут', 'Томат', 'Тростниковый сахар'],
    altitude: '1700–1900 м',
    process: 'Мытая',
    image: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=400&h=400&fit=crop&crop=center'
  },
  {
    id: 5,
    name: 'Antigua Pastores',
    origin: 'Гватемала',
    category: 'Гватемала',
    roast: 'Средняя',
    price: 1180,
    weight: '250 г',
    description: 'Элегантный кофе из вулканических почв Антигуа. Бархатистое тело с шоколадными нотами и деликатной дымностью. Универсальный выбор для любого способа приготовления.',
    notes: ['Молочный шоколад', 'Слива', 'Дымка', 'Корица'],
    altitude: '1500–1700 м',
    process: 'Мытая',
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=400&h=400&fit=crop&crop=center'
  },
  {
    id: 6,
    name: 'Tarrazú La Minita',
    origin: 'Коста-Рика',
    category: 'Коста-Рика',
    roast: 'Светлая',
    price: 1380,
    weight: '250 г',
    description: 'Премиальный микролот из Тарразу. Чистый, прозрачный вкус с медовой сладостью и цитрусовой кислотностью. Выращен на знаменитой ферме La Minita с безупречной репутацией.',
    notes: ['Апельсин', 'Мёд', 'Ваниль', 'Персик'],
    altitude: '1600–1900 м',
    process: 'Хани',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=400&h=400&fit=crop&crop=center'
  }
];

export const categories = ['Все', 'Эфиопия', 'Колумбия', 'Бразилия', 'Кения', 'Гватемала', 'Коста-Рика'];
export const roastLevels = ['Все', 'Светлая', 'Средняя'];
