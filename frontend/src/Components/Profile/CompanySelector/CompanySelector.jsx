// CompanySelector.jsx
import React from 'react';
import { connect } from 'react-redux';
import { setSelectedCompanyId, deleteCompany, toggleEditMode } from '../../../store/slices/companySlice'; // Import actions

const truncateText = (text, maxLength = 25) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

function CompanySelectorComponent({ // Renamed to Component
                                      companies,
                                      user,
                                      selectedCompanyId,
                                      setSelectedCompanyId,
                                      deleteCompany,
                                      toggleEditMode,
                                      isEditMode,
                                      isShowCompanySelector,
                                  }) {
    console.log(user)

    const selectorStyle = {
        maxHeight: isShowCompanySelector ? '500px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.3s ease-in-out', // Optional for smoother transition
    };

    return (
        <div
            className="bg-[var(--second-background-color)] rounded-t-2xl overflow-hidden shadow-lg fixed bottom-0 w-screen mx-[-15px] z-30"
            style={selectorStyle}
        >



            <ul className="divide-y divide-gray-700">
                <li key={user.id} className="px-4 py-3">
                    <button
                        onClick={() => (isEditMode ? null : setSelectedCompanyId(null))}
                        className="flex items-center justify-between w-full"
                        style={{ textAlign: 'left' }} // Force left alignment
                    >
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                                <div className="flex items-center justify-center w-full h-full bg-white">
                                    <img src={user.avatar}></img>
                                </div>
                            </div>
                            <span className="text-sm font-medium text-gray-200">
                                    {truncateText(`${user.name}`)}
                                </span>
                        </div>


                        <div>
                            {null === selectedCompanyId ? (
                                <img src="./img/icons/selected_checkbox.svg" alt="Выбранная компания"/>
                            ) : (
                                <img src="./img/icons/checkbox.svg" alt="Невыбранная компания"/>
                            )}
                        </div>
                    </button>
                </li>
                {companies.map((company) => (
                    <li key={company.id} className="px-4 py-3">
                        <button
                            onClick={() => (isEditMode ? deleteCompany(company.id) : setSelectedCompanyId(company.id))}
                            className="flex items-center justify-between w-full"
                            style={{ textAlign: 'left' }} // Force left alignment
                        >
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                                    <div className="flex items-center justify-center w-full h-full bg-white">
                                        <img src="./img/icons/company.svg"></img>
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-gray-200">
                                    {truncateText(company.name)}
                                </span>
                            </div>

                            {isEditMode ? (
                                <img src="./img/icons/delete.svg" alt="Удалить компанию"/>
                            ) : (
                                <div>
                                    {company.id === selectedCompanyId ? (
                                        <img src="./img/icons/selected_checkbox.svg" alt="Выбранная компания"/>
                                    ) : (
                                        <img src="./img/icons/checkbox.svg" alt="Невыбранная компания"/>
                                    )}
                                </div>
                            )}
                        </button>
                    </li>
                ))}
            </ul>

            {/* Bottom Buttons */}
            <div className="px-4 py-3 text-[0.6rem] font-bold">
                <button
                    onClick={() => console.log("addCompany")}
                    className="block w-full bg-white text-black py-3 rounded-xl mb-3"
                >
                    ДОБАВИТЬ КОМПАНИЮ
                </button>
                <button
                    onClick={toggleEditMode}
                    className="block w-full bg-[var(--second-background-color)] border border-white text-white py-3 rounded-xl"
                >
                    {isEditMode ? "ВЕРНУТЬСЯ К ВЫБОРУ" : "НАСТРОЙКИ"}
                </button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    companies: state.company.userCompanies,
    user: state.user,
    selectedCompanyId: state.company.selectedCompanyId,
    isShowCompanySelector: state.company.isShowCompanySelector,
    isEditMode: state.company.isEditMode
});

const mapDispatchToProps = (dispatch) => ({
    setSelectedCompanyId: (companyId) => dispatch(setSelectedCompanyId(companyId)),
    deleteCompany: (companyId) => dispatch(deleteCompany(companyId)),
    toggleEditMode: () => dispatch(toggleEditMode())
});

const CompanySelector = connect(mapStateToProps, mapDispatchToProps)(CompanySelectorComponent);

export default CompanySelector;