import type React from "react"
import {useRef, useEffect, useState} from "react"

const UseRefPage:React.FC = ()=>{
    /**
     * Перша причина використання:
     * звернення до DOM у коді виклик функцій HTML елементів
     * Друга причина:
     * дозволяє зберігати значення у момент ререндеру, тобто після повторного рендеру
     * реф зберігає значення, не обнуляється
     * 
     */

    const [text, setText] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    /**
     * Кожен раз коли спрацьовую сеттер стейту, компонент повторно рендериться. Це призводить до того що всі змінні
     * створенні у компоненті створюються ще раз, і ставиться початкове значення. Для того щоб зберегти значення між рендерами
     * використовуйте useRef
     */
    let clickCount = 0;
    
    /**
     * Вирішення проблеми з повторним рендером:
     */

    const clickCountRef = useRef<number>(0);
    
    return(
        <div>
            <h1>{inputRef.current?.value}</h1>
            <input ref={inputRef} onChange={(e)=>setText(e.target.value)} />
            <button onClick={()=>{inputRef.current?.focus()}}>Focus input</button>
            <button onClick={
                ()=>{
                    clickCount++; 
                    clickCountRef.current += 1;
                    console.clear();
                    console.log(`Clicks count: ${clickCount}`);
                    console.log(`Clicks count ref: ${clickCountRef.current}`);
            }}>Click</button>
        </div>
    )
}
export default UseRefPage