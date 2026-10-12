import { useEffect, useState } from "react";

const UseEffectPage = () => {

    /**Створіть дві кнопки, одна збільшує кількість поідомлень, друга обнуляє
    якщо кількість повідолмень більше 0 оновити заголовок сторінки: Нових повідомлень: кількість
    Якщо нуль повідомлень вивести в заголовку сторінки: Месенджер
     */

    const [windowWidth, setWidth] = useState(window.innerWidth);

    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");

    useEffect(() => {
        // didComponentUpdating
        // кожен раз спрацьовує коли оновлюється стейт, або перемалювався батьківський компонент, змінився пропс
        console.log("use effect without deps");
    })

    useEffect(() => {
        // didComponentMounting
        // спрацьовує лише при першому рендері. Тут підписуємось на подію браузера, сюди також і відносяться таймери
        console.log("use effect with empty array of deps")
        setValue1(value1+1);
        const handleResize = () => {
            setWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        const interval = setInterval(()=>{console.log("intervalStarted")}, 1000);

        return () => {
            // didComponentUnmounting
            window.removeEventListener('resize', handleResize);
            clearInterval(interval);
        }

    }, [])

    useEffect(() => {
        // стежить за змінами value1
        console.log("use effect, value1 changed")
    }, [value1])
    return (
        <div>
            <p>Window width: {windowWidth}</p>
            <p>{value1}</p>
            <input className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" type="text" value={value1} onInput={(e) => setValue1((e.target as HTMLInputElement).value)} />
            <input className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" type="text" value={value2} onInput={(e) => setValue2((e.target as HTMLInputElement).value)} />
        </div>
    )
}

export default UseEffectPage;