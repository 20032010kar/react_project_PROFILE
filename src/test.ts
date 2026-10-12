import z from "zod";
import { moduleSchema } from "./schemas/moduleSchema.js";
import type { ModuleFormData ,RegisterForm, ProfileFirn } from "./schemas/moduleSchema.js";
import { registerSchema, profileSchema } from "./schemas/moduleSchema.js";
import { UserService } from "./api/user-service.js";
import type { User } from "./api/user-service.js";

// const course:ModuleFormData = {
//     title: 'C+',
//     description: 'C++ better than Python',
//     level: 'advanced',
//     durationHours: 12,
//     isPublished: true
// }

// const result = moduleSchema.safeParse(course);
// if(!result.success) console.log(result.error)
// console.log(result);

const controller = new AbortController();

UserService.getUsers(controller.signal).then(console.log).catch(console.error)
UserService.getUserById(1,controller.signal).then(console.log).catch(console.error)

const register:RegisterForm = {
    username:"user",
    email: "user@nodejs.com",
    password: '123456578',
    confirmPassword: '123456578'
}

registerSchema.parse(register);

const profile:ProfileFirn = {
    role: "admin",
    secretKey:"311231231231231231313123123"
}

profileSchema.parse(profile);
