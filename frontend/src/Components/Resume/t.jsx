// src/components/ResumeForm.jsx
import React, { useState } from 'react';
// Optional: If using React Router for navigation
// import { useNavigate } from 'react-router-dom';

// --- Reusable Input Field Component (Optional but recommended) ---


// --- Main Resume Form Component ---
function ResumeForm() {
    // Optional: If using React Router
    // const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: 'Иван', // Pre-filled from image
        lastName: 'Иванов', // Pre-filled from image
        phone: '+7 (987) 654-32-10', // Pre-filled from image
        experience: '',
        salary: '',
        additionalInfo: ''
    });

    const handleBackClick = () => {
        console.log("Back button clicked");
        // Optional: Navigate back
        // navigate(-1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default page reload
        console.log("Form Data Submitted:", formData);
        // Add logic here to send data to an API, etc.
        alert('Резюме сохранено (проверьте консоль)');
    };

    return (
        <div className="bg-gray-900 text-gray-300 min-h-screen p-4 md:p-6 max-w-lg mx-auto"> {/* Added max-width and centering */}

            {/* Header */}
            <div className="relative flex items-center justify-center mb-8 h-10"> {/* Centered title */}
                <button
                    onClick={handleBackClick}
                    className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-gray-300 hover:text-white transition duration-200 font-medium text-sm z-10 p-1" // Added z-index
                >
                    {/* Replace with your actual SVG path or component */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    Назад
                </button>
                <h1 className="text-white font-bold text-base md:text-lg uppercase tracking-wider">
                    РЕЗЮМЕ
                </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <FormField
                    id="firstName"
                    label="ИМЯ"
                    value={formData.firstName}
                    onChange={handleChange}
                />

                <FormField
                    id="lastName"
                    label="ФАМИЛИЯ"
                    value={formData.lastName}
                    onChange={handleChange}
                />

                <FormField
                    id="phone"
                    label="ТЕЛЕФОН ДЛЯ СВЯЗИ"
                    type="tel" // Use tel type for phone numbers
                    value={formData.phone}
                    onChange={handleChange}
                />

                <FormField
                    id="experience"
                    label="ОПЫТ РАБОТЫ"
                    type="textarea"
                    rows={5} // Adjust rows as needed
                    placeholder="Мой опыт состоит из..."
                    value={formData.experience}
                    onChange={handleChange}
                />

                <FormField
                    id="salary"
                    label="ЖЕЛАЕМАЯ ЗАРПЛАТА"
                    placeholder="Интересует доход от..."
                    value={formData.salary}
                    onChange={handleChange}
                />

                <FormField
                    id="additionalInfo"
                    label="ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ"
                    type="textarea"
                    rows={6} // Adjust rows as needed
                    placeholder="Также хочу рассказать..."
                    value={formData.additionalInfo}
                    onChange={handleChange}
                />

                {/* Submit Button */}
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

export default ResumeForm;