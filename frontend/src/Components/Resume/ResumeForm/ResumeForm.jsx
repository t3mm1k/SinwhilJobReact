
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {connect, useSelector} from "react-redux";
import FormField from "../FormField/FormField";
import {updateUserResume} from "../../../store/slices/userSlice";

function ResumeFormComponent({updateUserResume}) {

    const navigate = useNavigate();

    const user = useSelector((state) => state.user);

    console.log("page", user.resume)

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
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUserResume(formData);
        alert('Резюме сохранено (проверьте консоль)');
    };

    return (
        <div className="w-full flex flex-col gap-3"> {/* Added max-width and centering */}

            {/* Header */}
            <div className="relative justify-between h-auto">
                <button className="relative z-10 font-semibold flex items-center justify-center gap-[5px] text-[0.8rem]" onClick={() => navigate('/profile')}>
                    <img src="./img/icons/arrow-left.svg" alt="Назад" />
                    Назад
                </button>
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center text-[1rem]">Резюме</p>
                <p></p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <FormField
                    id="first_name"
                    label="ИМЯ"
                    value={user.resume.first_name}
                    handleChange={handleChange}
                />

                <FormField
                    id="last_name"
                    label="ФАМИЛИЯ"
                    value={user.resume.last_name}
                    handleChange={handleChange}
                />

                <FormField
                    id="phone"
                    label="ТЕЛЕФОН ДЛЯ СВЯЗИ"
                    type="tel"
                    value={formData.phone}
                    handleChange={handleChange}
                />

                <FormField
                    id="experience"
                    label="ОПЫТ РАБОТЫ"
                    type="textarea"
                    rows={5} // Adjust rows as needed
                    placeholder="Мой опыт состоит из..."
                    value={user.resume.experience}
                    handleChange={handleChange}
                />

                <FormField
                    id="desired_salary"
                    label="ЖЕЛАЕМАЯ ЗАРПЛАТА"
                    placeholder="Интересует доход от..."
                    value={user.resume.desired_salary}
                    handleChange={handleChange}
                />

                <FormField
                    id="additional_info"
                    label="ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ"
                    type="textarea"
                    rows={6}
                    placeholder="Также хочу рассказать..."
                    value={user.resume.additional_info}
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