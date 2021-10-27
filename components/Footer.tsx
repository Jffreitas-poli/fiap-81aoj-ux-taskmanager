import { NextPage } from "next";

/* eslint-disable @next/next/no-img-element */

// type HeaderProps = {
//     logout(): void
// }

const Footer: NextPage = ({
}) => {

    return (
        <div className="container-footer">
            <button><img  src="/add.svg" alt="Adicionar Tarefa"/> Adicionar Tarefa</button>
            <span>© Copyright {new Date().getFullYear()}. Todos os direitos reservados.</span>
        </div>
    );
}

export { Footer }