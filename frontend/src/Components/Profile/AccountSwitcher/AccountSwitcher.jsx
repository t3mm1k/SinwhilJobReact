
import {toggleIsShowCompanySelector} from "../../../store/slices/companySlice";
import {connect} from "react-redux";

function AccountSwitcher({toggleIsShowCompanySelector}) {
    return (
        <button className="flex px-3 py-2 justify-between g-[10px] bg-[var(--second-background-color)] rounded-[10px]  items-center" onClick={() => toggleIsShowCompanySelector()}>
            <p>Переключиться на компанию</p>
            <img src="./img/icons/regroup.svg"/>
        </button>
    )
}



const mapDispatchToProps = (dispatch) => ({
    toggleIsShowCompanySelector: (companyId) => dispatch(toggleIsShowCompanySelector()),
});

export default connect(null, mapDispatchToProps)(AccountSwitcher);