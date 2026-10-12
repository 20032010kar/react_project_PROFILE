import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
    username: z.string().min(3, "Minimum 3 symbols"),
    password: z.string().min(6, "Paswword must have 6 symbols minimum")
});

type FormData = z.infer<typeof schema>;


const ZodForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<FormData> = (data: FormData) => console.log(data);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="username" {...register('username')} />
                {errors.username && <p className="text-red-900">{errors.username.message}</p>}
                <input placeholder="password" {...register('password')} />
                {errors.password && <p className="text-red-900">{errors.password.message}</p>}

                <button type="submit">Login</button>
            </form>
        </div>
    )
}
export default ZodForm;