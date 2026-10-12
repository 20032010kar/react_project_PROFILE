import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

interface IAuthForm{
    user_email: string,
    age: number;
}


const AuthForm = ()=>{

    const{register, handleSubmit, formState:{errors}} = useForm<IAuthForm>();

    const onSubmit: SubmitHandler<IAuthForm> = (data) =>{
        console.log('Data: ', data);
    }

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="user_email">Email</label>
                    <input id="user_email" type="email" {...register('user_email',{
                        required:'Email is required',
                        pattern:{
                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                            message: 'Not correct email format'
                        }
                    })}/>
                    {errors.user_email&& <p className="text-red-900">{errors.user_email.message}</p>}
                </div>
                <div>
                    <label htmlFor="age">Age</label>
                    <input id="age" type="number" {...register('age',{
                        required:'Please enter your age',
                        min: {value: 18, message: 'Minimal age is 18 years old'}
                    })}/>
                    {errors.age&& <p className="text-red-900">{errors.age.message}</p>}
                </div>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}
export default AuthForm;