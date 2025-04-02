
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {connect, useSelector} from "react-redux";
import FormField from "../FormField/FormField";
import {updateUserResume} from "../../../store/slices/userSlice";

function formatPhone(value) {
    // 1. Убираем все нецифровое, кроме знака + в начале (если он есть)
    let cleaned = ('' + value).replace(/[^\d+]/g, '');
    if (cleaned.startsWith('+')) {
        cleaned = '+' + cleaned.substring(1).replace(/[^\d]/g, ''); // Убираем не цифры после +
    } else {
        cleaned = cleaned.replace(/[^\d]/g, ''); // Убираем все не цифры
    }

    // 2. Приводим к формату +7 (если начинается с 8 или просто с 9)
    if (cleaned.startsWith('8')) {
        cleaned = '+7' + cleaned.substring(1);
    } else if (cleaned.length === 10 && cleaned.startsWith('9')) { // Российский мобильный без кода страны
        cleaned = '+7' + cleaned;
    } else if (!cleaned.startsWith('+') && cleaned.length > 0) {
        cleaned = '+' + cleaned; // Добавляем +, если его нет
    }


    // 3. Нарезаем и форматируем (пример для +7 XXX XXX-XX-XX)
    const match = cleaned.match(/^(\+?\d{1,1})?(\d{0,3})?(\d{0,3})?(\d{0,2})?(\d{0,2})?/);

    if (!match) {
        return value; // Возвращаем оригинал, если что-то пошло не так
    }

    let formatted = '';
    if (match[1]) formatted += match[1];
    if (match[2]) formatted += (formatted.length > 1 ? ' ' : '') + match[2]; // Пробел после кода страны/города
    if (match[3]) formatted += (match[2].length === 3 ? ' ' : '') + match[3]; // Пробел после первых 3 цифр
    if (match[4]) formatted += (match[3].length === 3 ? '-' : '') + match[4]; // Дефис
    if (match[5]) formatted += (match[4].length === 2 ? '-' : '') + match[5]; // Дефис

    // Ограничиваем длину, чтобы соответствовать формату +7 XXX XXX-XX-XX (16 символов)
    return formatted.substring(0, 16);
}

function ResumeFormComponent({updateUserResume}) {

    const navigate = useNavigate();

    const user = useSelector((state) => state.user);


    const [formData, setFormData] = useState({
        first_name: user.resume.first_name || "",
        last_name: user.resume.last_name || "",
        phone: user.resume.phone || "",
        experience: user.resume.experience || "",
        desired_salary: user.resume.desired_salary || "",
        additional_info: user.resume.additional_info || ""
    });
    useEffect(() => {
        setFormData({
            first_name: user.resume.first_name || "",
            last_name: user.resume.last_name || "",
            phone: user.resume.phone || "",
            experience: user.resume.experience || "",
            desired_salary: user.resume.desired_salary || "",
            additional_info: user.resume.additional_info || ""
        });
    }, [user.resume]);

    const handleChange = (e) => {
        const { id, value } = e.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [id]: id === "phone" ? formatPhone(value) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUserResume(formData);
        alert('Резюме сохранено (проверьте консоль)');
    };

    return (
        <div className="w-full flex flex-col gap-3">
            <header className="relative flex items-center">
                <button
                    className="flex items-center gap-2 text-[0.8rem] font-normal"
                    onClick={() => navigate(-1)}
                >
                    <img src="/img/icons/arrow-left.svg" alt="Back" className="w-4 h-4" />
                    Назад
                </button>
                <h1 className="text-[1rem] font-semibold ml-auto mr-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Резюме</h1>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
                <FormField
                    id="first_name"
                    label="ИМЯ"
                    value={formData.first_name}
                    handleChange={handleChange}
                />

                <FormField
                    id="last_name"
                    label="ФАМИЛИЯ"
                    value={formData.last_name}
                    handleChange={handleChange}
                />

                <FormField
                    id="phone"
                    label="ТЕЛЕФОН ДЛЯ СВЯЗИ"
                    type="tel"
                    placeholder="+7-XXX-XXX-XX-XX"
                    value={formData.phone}
                    handleChange={handleChange}
                />

                <FormField
                    id="experience"
                    label="ОПЫТ РАБОТЫ"
                    type="textarea"
                    rows={5}
                    placeholder="Мой опыт состоит из..."
                    value={formData.experience}
                    handleChange={handleChange}
                />

                <FormField
                    id="desired_salary"
                    label="ЖЕЛАЕМАЯ ЗАРПЛАТА"
                    placeholder="Интересует доход от..."
                    value={formData.desired_salary}
                    handleChange={handleChange}
                />

                <FormField
                    id="additional_info"
                    label="ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ"
                    type="textarea"
                    rows={6}
                    placeholder="Также хочу рассказать..."
                    value={formData.additional_info}
                    handleChange={handleChange}
                />

                <div className="pt-4"> {/* Add some padding top */}
                    <button
                        type="submit"
                        className="w-full bg-white text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white transition duration-200 text-sm uppercase tracking-wider"
                    >
                        Сохранить
                    </button>
                </div>
            </form>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    updateUserResume: (value) => dispatch(updateUserResume(value))
});

const ResumeForm = connect(null, mapDispatchToProps)(ResumeFormComponent);

export default ResumeForm;