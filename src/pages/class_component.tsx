import { Component, type ReactNode } from "react";

interface CounterProps{
    initialCount?: number;
    title:string;
}

interface CounterState{
    count:number;
}


class ClassPage extends Component<CounterProps, CounterState>{
    constructor(props:CounterProps){
        super(props);

        this.state ={
            count: props.initialCount?? 0,
        };
    }

    // lifecycle

    componentDidMount(): void {
        document.title = `Clicks: ${this.state.count}`;
    }

    componentDidUpdate(prevProps: Readonly<CounterProps>, prevState: Readonly<CounterState>, snapshot?: any): void {
        if(prevState.count !== this.state.count){
            document.title = `Clicks: ${this.state.count}`;
        }
    }

    componentWillUnmount(): void {
        console.log(`Component will be remove`);
    }

    handleIncrement = ()=>{
        this.setState((prevState)=>({
            count: prevState.count + 1
        }))
    }
     handleDecrement = ()=>{
        this.setState((prevState)=>({
            count: prevState.count - 1
        }))
    }

    render(): ReactNode {
        const {title} = this.props;
        const {count} = this.state;
        return(
            <div>
                <h1>{title}</h1>
                <p>Counter: <strong>{count}</strong></p>
                <div>
                    <button onClick={this.handleIncrement} className="border border-solid">++</button>
                    <button onClick={this.handleDecrement} className="border border-solid">--</button>
                </div>
            </div>
        )
    }
}
export default ClassPage;