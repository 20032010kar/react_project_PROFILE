import type React from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const profileSchema = z.object({
    fullName: z.string().min(2, "Ім'я повинно містити set щонайменше 2 символи"),
    email: z.string().email("Некоректний формат email"),
    birthDate: z.string().min(1, "Обов'язкове поле").refine((dateString) => {
      birthDate: z.coerce.date().refine((birthDate) => {
      const today = new Date();
  
    let age = today.getFullYear() - birthDate.getFullYear();
  
    const birthdayThisYear = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  
    if (today < birthdayThisYear) {
        age--;
    }return age >= 18;
}, "Вам повинно бути не менше 18 років")
    }, "Вам повинно бути не менше 18 років"),
    accountType: z.enum(["Personal", "Business"]),
    companyName: z.string().optional(),
    role: z.enum(["Developer", "Designer", "Manager", "Other"]),
    customRole: z.string().optional(),
    newsletter: z.boolean(),
    choiceFrequency: z.enum(["Daily", "Weekly"]).optional(),
  })
  .refine((data) => {
    if (data.accountType === "Business" && (!data.companyName || data.companyName.trim() === "")) {
      return false;
    }
    return true;
  }, {
    message: "Назва компанії обов'язкова для бізнес-акаунту",
    path: ["companyName"],
  })
  .refine((data) => {
    if (data.role === "Other" && (!data.customRole || data.customRole.trim() === "")) {
      return false;
    }
    return true;
  }, {
    message: "Вкажіть вашу роль",
    path: ["customRole"],
  })
  .refine((data) => {
    if (data.newsletter && !data.choiceFrequency) {
      return false;
    }
    return true;
  }, {
    message: "Оберіть частоту розсилки",
    path: ["choiceFrequency"],
  });

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfileEditForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      birthDate: "",
      accountType: "Personal",
      companyName: "",
      role: "Developer",
      customRole: "",
      newsletter: false,
      choiceFrequency: undefined,
    },
  });

  const accountType = watch("accountType");
  const role = watch("role");
  const newsletter = watch("newsletter");
  const watchedValues = watch();

  const onSubmit: SubmitHandler<ProfileFormData> = (data) => {
    console.log("Data: ", data);
    alert("Успішно збережено!");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      
      <div className="border border-sky-200 flex flex-col p-6 bg-sky-50/70 rounded-3xl shadow-sm">
        <h2 className="text-3xl font-extrabold text-sky-900 mb-6">Редагування профілю</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
          
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-sky-800 uppercase">Повне ім'я*</label>
            <input
              type="text"
              placeholder="Введіть ім'я..."
              className="border border-sky-200 bg-white px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-sky-400"
              {...register("fullName")}
            />
            {errors.fullName && <p className="text-red-500 text-xs italic">{errors.fullName.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-sky-800 uppercase">Email*</label>
            <input
              type="email"
              placeholder="example@domain.com"
              className="border border-sky-200 bg-white px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-sky-400"
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-sky-800 uppercase">Дата народження (18+)*</label>
            <input
              type="date"
              className="border border-sky-200 bg-white px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-sky-400"
              {...register("birthDate")}
            />
            {errors.birthDate && <p className="text-red-500 text-xs italic">{errors.birthDate.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-sky-800 uppercase">Тип акаунту*</label>
            <select
              className="border border-sky-200 bg-white px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-sky-400"
              {...register("accountType")}
            >
              <option value="Personal">Персональний</option>
              <option value="Business">Бізнес</option>
            </select>
          </div>

          {accountType === "Business" && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-sky-800 uppercase">Назва компанії*</label>
              <input
                type="text"
                placeholder="Введіть назву компанії..."
                className="border border-sky-200 bg-white px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-sky-400"
                {...register("companyName")}
              />
              {errors.companyName && <p className="text-red-500 text-xs italic">{errors.companyName.message}</p>}
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-sky-800 uppercase">Роль*</label>
            <select
              className="border border-sky-200 bg-white px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-sky-400"
              {...register("role")}
            >
              <option value="Developer">Розробник</option>
              <option value="Designer">Дизайнер</option>
              <option value="Manager">Менеджер</option>
              <option value="Other">Інше</option>
            </select>
          </div>

          {role === "Other" && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-sky-800 uppercase">Вкажіть свою роль*</label>
              <input
                type="text"
                placeholder="Ваша роль..."
                className="border border-sky-200 bg-white px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-sky-400"
                {...register("customRole")}
              />
              {errors.customRole && <p className="text-red-500 text-xs italic">{errors.customRole.message}</p>}
            </div>
          )}

          <div className="flex items-center gap-3 mt-2">
            <input
              type="checkbox"
              id="newsletter"
              className="w-4 h-4 text-sky-600 rounded border-sky-300 focus:ring-sky-400"
              {...register("newsletter")}
            />
            <label htmlFor="newsletter" className="text-sm font-medium text-sky-900 cursor-pointer">
              Підписатися на розсилку
            </label>
          </div>

          {newsletter && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-sky-800 uppercase">Частота розсилки*</label>
              <select
                className="border border-sky-200 bg-white px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-sky-400"
                {...register("choiceFrequency")}
              >
                <option value="">-- Оберіть частоту --</option>
                <option value="Daily">Щодня</option>
                <option value="Weekly">Щотижня</option>
              </select>
              {errors.choiceFrequency && <p className="text-red-500 text-xs italic">{errors.choiceFrequency.message}</p>}
            </div>
          )}

          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              disabled={!isValid}
              className={`flex-1 font-semibold py-3 px-4 rounded-xl transition-all shadow-sm ${
                isValid
                  ? "bg-sky-600 hover:bg-sky-700 text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Зберегти
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all border border-gray-300 cursor-pointer"
            >
              Скинути
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded-3xl shadow-sm flex flex-col h-fit sticky top-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Live Preview</h3>
        <div className="bg-gray-50 p-4 rounded-2xl font-mono text-sm text-gray-700 overflow-x-auto">
          <pre>{JSON.stringify(watchedValues, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditForm;