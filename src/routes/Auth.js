import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { authService } from "fbase";
import { useState} from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const toggleAccount = () => {
        setNewAccount((prev) => !prev);
    }

    const onSocialClick = async(event) => {
        const { target : {name} } = event;
        let provider;
        if (name === "google") {
            provider = new GoogleAuthProvider();
        } else if (name === "github") {
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
        console.log(data);
    }
    const onChange = (event) => {
        // console.log(event.target.name);
        const { target: {name, value} } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password"){
            setPassword(value);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            const auth = getAuth();
            if (newAccount) {
                //새로운 계정 생성
                const auth = getAuth();
                data = await createUserWithEmailAndPassword(auth, email, password);
            } else {
                // 로그인
                data = await signInWithEmailAndPassword(auth, email, password);
            }
            console.log(data);
        } catch (error) {
            setError(error.message)
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" onChange = {onChange} value={email} type="email" placeholder="이메일을 입력해 주세요" required/><br />
                <input name="password" onChange = {onChange} value={password} type="password" placeholder="비밀번호를 입력해 주세요" required/><br />
                <input type="submit" value={newAccount ? "회원가입" : "로그인"} />
                <br />{error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "로그인" : "회원가입"}
            </span>
            <div>
                <h4> ----소셜 계정으로 간편 로그인-----</h4>
                <button onClick={onSocialClick} name="google">구글 로그인</button> {' '}
                <button onClick={onSocialClick} name="github">깃허브 로그인</button> {' '}
                <br/><br/>
            </div>
        </div>
    )
};

export default Auth;