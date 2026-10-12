import { NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home.js";
import ProductsPage from "./pages/products.js";
import ProductDetailPage from "./pages/product-detail.js";
import NotFound from "./pages/NotFound.js";

const App = () => {
    const getLinkClass = ({ isActive }: { isActive: boolean }): string => {
        return `font-medium transition-colors border-b-2 pb-1 ${isActive
                ? 'text-indigo-600 border-indigo-600'
                : 'text-gray-700 border-transparent hover:text-indigo-600 hover:border-indigo-600'
            }`;
    };
    return (
        <div className="p-20 font-sans">
            {/* header */}
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                    {/* Логотип */}
                    <a href="#" className="text-2xl font-black text-indigo-600 tracking-wider">
                        LogoBrand
                    </a>

                    {/* Навігація з двома посиланнями */}
                    <nav className="flex items-center space-x-8">
                        <NavLink to='/' className={getLinkClass}>
                            Головна
                        </NavLink>
                        <NavLink to='/products' className={getLinkClass}>
                            Товари
                        </NavLink>
                    </nav>

                </div>
            </header>

            {/* Content */}
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />}>
                        <Route path=":id" element={<ProductDetailPage />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            {/* End content */}

            
            <footer><h1>Footer</h1></footer>
        </div>
    )
}
export default App;