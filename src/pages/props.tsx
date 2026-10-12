import { useState } from "react";

type ChildProps={
    counter:number;
}

const ChildComponent = ({counter}:ChildProps) => <h1 className="text-5xl font-bold">Count: {counter}</h1>


const PropsPage = ()=>{
    const [counter, setCounter] = useState(0);
    return (
        <div>
            <button onClick={() => setCounter(counter+1)}>Increment</button>
            <ChildComponent counter={counter}/>
        </div>
    )
}

export default PropsPage;