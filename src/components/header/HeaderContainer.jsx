import { connect } from 'react-redux';
import HeaderApiComponent from "./HeaderApiComponent";
import {getUserDataThunkCreator} from "../../redux/auth-reducer";


let mapStateToProps = (state) => {
    return {
        isAuth : state.authReducer.isAuth,
        login : state.authReducer.login
    }
};

const HeaderContainer = connect(mapStateToProps, {
    getUserDataThunkCreator : getUserDataThunkCreator
})(HeaderApiComponent);

export default HeaderContainer