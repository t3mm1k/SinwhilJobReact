import React from "react";

function FormField({ id, label, type = 'text', placeholder, rows, name, handleChange, value}){
    return (
        <div>
            <label htmlFor={id} className="block font-semibold uppercase mb-1 opacity-50 focus:opacity-100 text-[0.7rem]">
                {label}
            </label>
            {type === 'textarea' ? (
                <textarea
                    id={id}
                    name={name || id}
                    rows={rows || 4}
                    value={value}
                    className="w-full bg-[var(--first-background-color)] border border-white opacity-50 rounded-lg p-3 focus:opacity-100 active:opacity-100 resize-none"
                    placeholder={placeholder}
                    onChange={handleChange}
                />
            ) : (
                <input
                    type={type}
                    id={id}
                    name={name || id}
                    value={value}
                    className="w-full bg-[var(--first-background-color)] border border-white opacity-50 rounded-lg p-3 focus:opacity-100"
                    placeholder={placeholder}
                    onChange={handleChange}
                />
            )}
        </div>
        )

}

export default FormField;