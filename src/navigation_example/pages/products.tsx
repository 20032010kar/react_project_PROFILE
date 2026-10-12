import { Link, Outlet, useNavigate } from "react-router-dom";

const ProductsPage = () => {

    const navigate = useNavigate();

    const handleGoToMainPage = ()=>{
        navigate('/');
    }
    const products = [
        { id: 1, name: 'Сучасне крісло Lounge', price: '4 500 ₴', category: 'Меблі' },
        { id: 2, name: 'Мінімалістична лампа', price: '1 200 ₴', category: 'Освітлення' },
        { id: 3, name: 'Дерев’яний столик', price: '3 100 ₴', category: 'Меблі' },
    ];
    return (

        <div>
            <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-10">
                 <button onClick={handleGoToMainPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Go to MainPage
                    </button>
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-gray-900">Каталог товарів</h1>
                    <p className="text-gray-600 mt-1">Оберіть товар зі списку, щоб переглянути деталі.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* ПЕРША ЧАСТИНА: Список карток (7 колонок) */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                to={`/products/${product.id}`}
                                className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-indigo-600 hover:shadow-md transition-all flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="w-full h-40 bg-indigo-50 rounded-xl mb-4 flex items-center justify-center text-indigo-300 font-bold">
                                        Фото
                                    </div>
                                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                                        {product.category}
                                    </span>
                                    <h3 className="text-lg font-bold text-gray-900 mt-2 group-hover:text-indigo-600 transition-colors">
                                        {product.name}
                                    </h3>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-lg font-black text-gray-900">{product.price}</span>
                                    <span className="text-sm font-medium text-indigo-600">Детальніше &rarr;</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* ДРУГА ЧАСТИНА: Тут спрацьовує Outlet (5 колонок) */}
                    <div className="lg:col-span-5 sticky top-28">
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm min-h-[400px] flex flex-col justify-center">
                            <Outlet />
                        </div>
                    </div>

                </div>
            </main>

        </div>
    )
}

export default ProductsPage;