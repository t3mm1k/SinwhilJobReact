import React from "react";

function FormField({ id, label, type = 'text', value, onChange, placeholder, rows, name }){
    return (
        <div>
            <label htmlFor={id} className="block text-xs font-semibold uppercase text-gray-400 mb-1">
                {label}
            </label>
            {type === 'textarea' ? (
                <textarea
                    id={id}
                    name={name || id} // Use name prop or fallback to id
                    rows={rows || 4} // Default rows or specify
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            ) : (
                <input
                    type={type}
                    id={id}
                    name={name || id} // Use name prop or fallback to id
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            )}
        </div>
        )

}

export default FormField;