import { authService } from "fbase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();

    const onLogoutClick = () => {
        authService.signOut();
        navigate("/");
    }

    return (
        <>
            <button onClick={onLogoutClick}>로그아웃</button>
        </>
    )
}


export default Profile;