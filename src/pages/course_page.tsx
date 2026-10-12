import type React from "react"
import type { ModuleFormData } from "../schemas/moduleSchema.js";
import { moduleSchema } from "../schemas/moduleSchema.js";
import { useState } from "react";

const CoursePage: React.FC = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        level: '',
        durationHours: '',
        isPublished: false
    });
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        const val = type === 'checkbox'
            ? (e.target as HTMLInputElement).checked
            : value;

        setFormData((prev) => ({
            ...prev,
            [name]: val
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: ''
            }));
        }
    }

    const handleSubmit = (e:React.SubmitEvent) =>{
        e.preventDefault();
        const result = moduleSchema.safeParse(formData);

        if(!result.success){
            const fieldErrors: Record<string,string> = {};
            result.error.issues.forEach((issue)=>{
                const fieldName = issue.path[0] as string;
                if(fieldName){
                    fieldErrors[fieldName] = issue.message;
                }
            })
            setErrors(fieldErrors);
            setCourse(null);
            return;
        }
        setErrors({});
        setCourse(result.data);
        console.log("Result: ", course);

    }

    const [course, setCourse] = useState<ModuleFormData|null>(null);
    return (
        <div>
            <div className="border border-solid flex flex-col p-5 bg-amber-50 rounded-2xl">
                <h2 className="text-4xl font-bold my-10">Create course module</h2>
                <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Title*
                            </label>

                            <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.title ? "border-red-500" : "border-gray-200"} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="grid-first-name" name='title' type="text" placeholder="C++, Python etc." value={formData.title}
                                onChange={handleChange} />
                            {errors.title &&
                                <p className="text-red-500 text-xs italic">{errors.title}</p>
                            }
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Description
                            </label>
                            <textarea
                                name="description" className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.descriptions ? "border-red-500" : "border-gray-200"} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="grid-last-name"
                                value={formData.description}
                                onChange={handleChange} placeholder="Tell about course" />
                            {errors.description &&
                                <p className="text-red-500 text-xs italic">{errors.description}</p>
                            }
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">

                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                Course level*
                            </label>
                            <div className="relative">
                                <select className={`block appearance-none w-full bg-gray-200 border ${errors.level ? "border-red-500" : "border-gray-200"} text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="grid-state" name="level" value={formData.level}
                                onChange={handleChange}>
                                    <option selected value={"beginner"}>Beginner</option>
                                    <option value={"intermediate"}>Intermediate</option>
                                    <option value={"advanced"}>Advanced</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                            {errors.level &&
                                <p className="text-red-500 text-xs italic">{errors.level}</p>}
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                                Duration*
                            </label>
                            <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.durationHours ? "border-red-500" : "border-gray-200"} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="grid-zip" type="text" placeholder="1"
                            name='durationHours' 
                            value={formData.durationHours}
                            onChange={handleChange}/>
                            {errors.durationHours &&
                                <p className="text-red-500 text-xs italic">{errors.durationHours}</p>}
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <div className="md:w-1/3"></div>
                            <label className="md:w-2/3 block text-gray-500 font-bold">
                                <input className="mr-2 leading-tight" type="checkbox" 
                                checked={formData.isPublished}
                                onChange={handleChange}/>
                                <span className="text-sm">
                                    Publish
                                </span>
                            </label>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Create course
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default CoursePage;