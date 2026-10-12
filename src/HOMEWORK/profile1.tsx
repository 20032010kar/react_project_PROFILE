import { z } from "zod";

export const profileSchema = z.object({
    fullName: z.string()
        .min(3, "Name would contains 3 symbols")
        .max(10, "Name can contais 10 symbols"),

    email: z.string().email("Enter your email"),
    
    birthDate: z.string().refine((value) => {
        if (!value) return false;

        const birth = new Date(value);
        const today = new Date();

        const eighteenYearsAgo = new Date(
            today.getFullYear() - 18, 
            today.getMonth(), 
            today.getDate()
        );

        return birth <= eighteenYearsAgo;
    }, "User need to be >18years old"),

    accountType: z.enum(["Personal","Business"]),
    companyName: z.string().optional(),
    role: z.enum(["Developer","Designer","Manager","Other"]),
    customRole:z.string().optional(),
    checkbox: z.boolean(),
    choiceFrequency: z.enum(["Daily","Weekly"]).optional(),
}).superRefine((data,ctx)=>{
    if(data.accountType==="Business" && (!data.companyName || data.companyName.trim()==="")){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:"Name company need ",
            path:["companyName"]
        })
    }
    if (data.role === "Other" && (!data.customRole || data.customRole.trim() === "")) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Вкажіть свою роль",
            path: ["customRole"],
        });
    }
    if (data.checkbox && !data.choiceFrequency) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Оберіть частоту розсилки",
            path: ["newsletterFrequency"],
        });
    }
});
export type ProfileFormData = z.infer<typeof profileSchema>; 
