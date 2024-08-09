// src/pages/RegisterPage.tsx
import {mdiEmailOutline, mdiLockOutline} from "@mdi/js";
import Icon from "@mdi/react";
import {useNavigate} from "react-router-dom";
import "tailwindcss/tailwind.css";

const LandingPage = () => {
    const navigate = useNavigate();

    const navRagister = async() => {
        navigate("/register");
    };

    const navLogin = async() => {
        navigate("/login");
    };

    return (
        <div className="min-w-screen min-h-screen bg-slate-100 flex items-center flex">
            <div className="flex w-1/2 items-center justify-center">
                <h1 className="bg-[#62B5AD] rounded-lg text-white py-3 px-3 font-bold text-8xl">SWI</h1>
                <h1 className="rounded-lg text-[#FFb066] py-3 px-3 font-bold text-8xl">PER</h1>
            </div>
            <div className="flex w-1/2 h-screen bg-slate-200 items-center justify-start">
                <div className="flex-row px-20">
                    <h1 className="px-3 py-8 font-bold text-7xl">
                        Start swiping now
                    </h1>
                    <h1 className="px-3 py-6 font-bold text-2xl">
                        Effortless Friendships, One Swipe at a Time.    
                    </h1>
                    <div className="px-3 py-1">
                        <h1 className="py-2 text-start">
                            Make an account and for free
                        </h1>
                        <button className="bg-[#FFb066] min-w-60 max-w-80 text-white hover:bg-[#ffdb7d] px-5 py-1 rounded-2xl text-2xl font-bold text-center" onClick={navRagister}>Create an account</button>
                    </div>
                    <div className="px-3 py-3">
                        <h1 className="py-2 text-start">
                            If you already have an account
                        </h1>
                        <button className="bg-[#62B5AD] min-w-60 max-w-80 text-white hover:bg-[#c5e8de] px-5 py-2 rounded-2xl text-2xl font-bold text-center" onClick={navLogin}> Sign in</button>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default LandingPage;