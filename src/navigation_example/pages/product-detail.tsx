import { useParams } from "react-router-dom";

const ProductDetailPage = () => {

    const {id} = useParams();

    return (
        <div className="animate-fade-in flex flex-col h-full justify-between">
            <div>
                {/* Зображення товару */}
                <div className="w-full h-56 bg-indigo-100 rounded-xl mb-6 flex items-center justify-center text-indigo-400 font-bold">
                    Велике фото товару
                </div>

                {/* Назва та ціна */}
                <div className="flex justify-between items-start mb-3">
                    <h2 className="text-2xl font-bold text-gray-900">Назва обраного товару#{id}</h2>
                    <span className="text-xl font-black text-indigo-600">4 500 ₴</span>
                </div>

                {/* Опис */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Детальний опис товару, який підвантажився динамічно через вкладений маршрут у ваш Outlet. Висока якість, стильний дизайн та надійність.
                </p>
            </div>

            {/* Кнопка дії */}
            <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                Додати до кошика
            </button>
        </div>
    )
}

export default ProductDetailPage;