import { z } from "zod";

export const moduleSchema = z.object({
    title: z.string().min(3, 'Title must have 3 letters at least')
        .max(50, 'Maximum 50 letters for title'),

    description: z.string().min(10, "Minimum 10 letters").max(200, 'Maximum 200 symbols for description')
        .optional().or(z.literal("")), // nullish() = optional().nullable()

    level: z.enum(['beginner', 'intermediate', 'advanced'], {
        message: 'Please selectr one option: beginner, intermediate, advanced',
    }),

    durationHours: z.coerce.number().min(1, 'Minimal duration must be 1 hour')
        .max(100, 'Maximum duration must be 100 hours'),

    isPublished: z.boolean()
})

// створюємо массив схем
const modulesSchema = z.array(moduleSchema);

// розширення схеми
const newType = moduleSchema.extend({
    price: z.number().min(10, "Minimal price is $10")
})

// видалення властивості зі схеми
const courseWithoutDescription = moduleSchema.omit({description: true});

// робимо поля з доступом тільки на читання
const courseReadOnly = moduleSchema.readonly();
// робимо усі поля необов'язковими
const courseOptional = moduleSchema.partial();

// схеми перетвоюємо на типи
type ReadonlyCourse = z.infer<typeof courseReadOnly>;
type OptionalCourse = z.infer<typeof courseOptional>

type ModulesData = z.infer<typeof modulesSchema>;

// export type ModuleFormData = z.infer<typeof moduleSchema>["form"];
export type ModuleFormData = z.infer<typeof moduleSchema>;

export const filterSchema = z.object({
    search: z.string().trim(),
    page: z.coerce.number().min(1).default(1),
    startDate: z.string().transform((str)=> new Date(str))
})

export type FilterValues = z.infer<typeof filterSchema>;


export const registerSchema = z.object({
    username: z.string().min(2, "Login must have 2 symbols minimum"),
    email: z.email(),
    password: z.string().min(8, "Password length 8 minimum"),
    confirmPassword: z.string().min(8,"Confirm password length 8 minimum")
})
.refine((data)=>{
    return data.password === data.confirmPassword
},{
    message:"Password are same",
    path:["confirmPassword"]
})

export const profileSchema = z.object({
    role: z.enum(["admin", 'user']),
    secretKey: z.string().optional()
}).superRefine((data, ctx)=>{
    if(data.role === 'admin' && !data.secretKey){
        ctx.addIssue({
            code: "custom",
            message: 'Admin must have a secret key',
            path: ['secretKey']
        })
    }
    if(data.secretKey && data.secretKey.length < 10){
        ctx.addIssue({
            code: "custom",
            message: 'Key is short',
            path: ['secretKey']
        })
    }
})

export type RegisterForm = z.infer<typeof registerSchema>
export type ProfileFirn = z.infer<typeof profileSchema>