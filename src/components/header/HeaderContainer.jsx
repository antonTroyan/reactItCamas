import { connect } from 'react-redux';
import HeaderApiComponent from "./HeaderApiComponent";
import {getUserDataThunkCreator, logoutThunkCreator} from "../../redux/auth-reducer";


let mapStateToProps = (state) => {
    return {
        isAuth : state.authReducer.isAuth,
        login : state.authReducer.login
    }
};

const HeaderContainer = connect(mapStateToProps, {
    getUserDataThunkCreator : getUserDataThunkCreator,
    logout                  : logoutThunkCreator
})(HeaderApiComponent);

export default HeaderContainer