const HomePage = () => {
    return (
        <main className="flex-grow flex items-center justify-center px-6 py-16">
            <div className="max-w-3xl mx-auto text-center">

                {/* Бейдж */}
                <span className="inline-block bg-indigo-100 text-indigo-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                    Скоро відкриття 🚀
                </span>

                {/* Заголовок */}
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">
                    Створюємо щось неймовірне для вас
                </h1>

                {/* Опис */}
                <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
                    Наш сайт знаходиться в розробці. Зовсім скоро тут з'явиться новий каталог товарів та багато цікавого.
                </p>

                {/* Інпут підписки / Форма */}
                <div className="flex justify-center max-w-md mx-auto gap-3">
                    <input
                        type="email"
                        placeholder="Ваш email для сповіщення"
                        className="flex-grow px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-gray-700 shadow-sm"
                    />
                    <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm whitespace-nowrap">
                        Чекаю
                    </button>
                </div>

            </div>
        </main>
    )
}

export default HomePage;