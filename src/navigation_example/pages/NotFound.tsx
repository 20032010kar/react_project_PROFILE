import { Link } from "react-router-dom";

const NotFound = ()=>{
    return(
       <main className="flex-grow flex items-center justify-center px-6 py-16">
        <div className="max-w-md w-full text-center">
          
          {/* Цифра 404 */}
          <div className="text-8xl font-black text-indigo-600 tracking-wider mb-4">
            404
          </div>

          {/* Заголовок */}
          <h1 className="text-3xl font-black text-gray-900 mb-3">
            Сторінку не знайдено
          </h1>

          {/* Опис */}
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            Схоже, сторінка, яку ви шукаєте, була видалена, змінила свою адресу або просто ніколи не існувала.
          </p>

          {/* Кнопка повернення на головну */}
          <div>
            <Link 
              to="/" 
              className="inline-block bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Повернутися на головну
            </Link>
          </div>

        </div>
      </main>
    )
}

export default NotFound;