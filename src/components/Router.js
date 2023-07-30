import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "routes/Home";
import Auth from "routes/Auth";
import Navigation from "./Navigation";
import Profile from "routes/Profile";


const AppRouter = ( {isLoggedIn, userObj} ) => {


    return (
        <Router> {/* 책: <switch> */}
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? (
                    <Route path="/" element={<Home userObj = {userObj} />} />
                ) : (
                    <Route path="/" element={<Auth />} />
                )}
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    )
}

export default AppRouter;