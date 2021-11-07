import { useState } from "react";
import axios from 'axios';
import { executeRequest } from "../services/api";
import { NextPage } from "next";
import { AccessTokenProps } from "../types/AccessTokenProps";
import { Modal } from "react-bootstrap";

/* eslint-disable @next/next/no-img-element */
export const Login: NextPage<AccessTokenProps> = ({
    setToken
}) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState('');
    const [isLoading, setLoading] = useState(false);

    // states do modal/form
    const [showModal, setShowModal] = useState(false);
    const [isModalLoading, setModalLoading] = useState(false);
    const [modalMsgErro, setModalMsgErro] = useState('');
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    const doLogin = async () => {
        try {
            setLoading(true);
            setError('');
            setRegisterSuccess('');
            if (!login && !password) {
                setError('Favor informar email e senha');
                setLoading(false);
                return;
            }

            const body = {
                login,
                password
            }

            const result = await executeRequest('login', 'POST', body);
            if (result && result.data) {
                localStorage.setItem('accessToken', result.data.token);
                localStorage.setItem('userName', result.data.name);
                localStorage.setItem('userMail', result.data.mail);
                setToken(result.data.token);
            } else {
                setError('Não foi possivel processar login, tente novamente');
            }
        } catch (e: any) {
            console.log(e);
            if (e?.response?.data?.error) {
                setError(e?.response?.data?.error);
            } else {
                setError('Não foi possivel processar login, tente novamente');
            }
        }

        setLoading(false);
    }

    const closeModal = () => {
        setNewName('');
        setNewEmail('');
        setNewPassword('');
        setNewPasswordConfirm('');
        setModalLoading(false);
        setModalMsgErro('');
        setShowModal(false);
    }

    const doSaveUser = async() => {
        try {
            setModalLoading(true);
            setModalMsgErro('');
            if (!newName || !newEmail || !newPassword || !newPasswordConfirm) {
                setModalMsgErro('Favor informar os dados para cadastro do usuário');
                setModalLoading(false);
                return;
            }

            if (newPassword !== newPasswordConfirm) {
                setModalMsgErro('A senha deve ser igual à confirmação de senha');
                setModalLoading(false);
                return;
            }

            const body = {
                name: newName,
                email: newEmail,
                password: newPassword
            }

            const result = await executeRequest('user', 'POST', body);
            if (result && result.data) {
                setRegisterSuccess('Usuario cadastrado com sucesso');
                closeModal();
            }
        } catch (e: any) {
            console.log(e);
            if (e?.response?.data?.error) {
                setModalMsgErro(e?.response?.data?.error);
            } else {
                setModalMsgErro('Não foi possivel cadastrar usuário, tente novamente');
            }
        }

        setModalLoading(false);
    }

    return (
        <>
            <div className="container-login">
                <img src="/logo.svg" alt="Logo Fiap" className="logo" />
                <form>
                    <p className="error">{error}</p>
                    <p className="register-success">{registerSuccess}</p>
                    <div className="input">
                        <img src="/mail.svg" alt="Informe seu email" />
                        <input type="text" placeholder="Informe seu email"
                            value={login} onChange={evento => setLogin(evento.target.value)} />
                    </div>
                    <div className="input">
                        <img src="/lock.svg" alt="Informe sua senha" />
                        <input type="password" placeholder="Informe sua senha"
                            value={password} onChange={evento => setPassword(evento.target.value)} />
                    </div>
                    <button type="button" onClick={doLogin} disabled={isLoading}
                        className={isLoading ? 'loading' : ''}>
                        {isLoading ? '...Carregando' : 'Login'}
                    </button>
                    <div className="signup"><a href="#" onClick={() => {setShowModal(true);setError('');setRegisterSuccess('')}}>Ainda não é um usuário? Cadastre-se!</a></div>
                </form>
            </div>
            <Modal show={showModal}
                onHide={() => closeModal()}
                className="container-modal-user">
            <Modal.Body>
                <p>Cadastrar novo usuário</p>
                {modalMsgErro && <p className="error">{modalMsgErro}</p>}
                <input type="text"
                    placeholder="Nome do usuário"
                    value={newName}
                    onChange={e => setNewName(e.target.value)} />
                <input type="text"
                    placeholder="Email"
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)} />
                <input type="password"
                    placeholder="Senha"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)} />
                <input type="password"
                    placeholder="Confirme a Senha"
                    value={newPasswordConfirm}
                    onChange={e => setNewPasswordConfirm(e.target.value)} />
            </Modal.Body>
            <Modal.Footer>
                <div className="button col-12">
                    <button type="button" onClick={doSaveUser} disabled={isModalLoading}
                    className={isModalLoading ? 'loading' : ''}>
                    {isModalLoading ? "...Enviando dados" : "Salvar"}</button>
                    <span onClick={closeModal}>Cancelar</span>
                </div>
            </Modal.Footer>
        </Modal>
    </>
    )
}