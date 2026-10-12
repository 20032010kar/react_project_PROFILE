import type React from "react";

/**
 *
 * Dumb/Presentational             Smart/Container
 * Відобразити данні               Контролює стан
 * та надати користувацькі         виконує мережеві запити
 * дії вище                        тримає бізнес логіку
 * 
 * Отримує дані через пропс        Отримує дані з API
 * 
 * Можна перевикористовувати       Перевикористання майже неможливе
 */


// Dumb component
interface ProductCardProps{
    title:string;
    price: number;
    imageUrl:string;
    isFavorite: boolean;
    onAddToCart: ()=> void;
    onToggleFavorite: ()=>void;
}

const ProductCardUI= ({}:ProductCardProps)=>{
    return(
        <div>
            
        </div>
    )
}

// Smart component

const ProductCardContainer = ({/**product: Product */})=>{
    const addToCard = async()=>{
        // api add product to cart
    }
    const toggleFavorite = async()=>{
        
    }
}

const SmartDubmCompPage:React.FC=()=>{
    return(
        <div></div>
    )
}

export default SmartDubmCompPage;