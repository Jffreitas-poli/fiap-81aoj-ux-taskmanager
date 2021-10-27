import { NextPage } from "next";
import { Filter } from "../components/Filter";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { AccessTokenProps } from "../types/AccessTokenProps";

/* eslint-disable @next/next/no-img-element */
const Home: NextPage<AccessTokenProps> = ({
    setToken
}) => {

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userMail');
        setToken('');
    }

    return (
        <>
            <Header logout={logout} />
            <Filter />
            <Footer />
        </>
    );
}

export { Home }