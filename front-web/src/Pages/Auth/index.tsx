import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ReactComponent as Arrow } from '../../assets/images/Seta.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import { makeLogin } from '../../Core/Utils/request';
import { saveSessionData } from '../../Core/Utils/auth';
import { toast } from 'react-toastify';


type FormData = {
    username: string;
    password: string;
}

function Auth() {
    const { register, handleSubmit, errors } = useForm<FormData>();
    const history = useHistory();
    
    
    const onSubmit = (data: FormData) => {
        makeLogin(data)
            .then(response => {
                saveSessionData(response.data)
                history.push('/filmes')
                toast.info(`Olá ${data.username}, seja bem vindo(a)!`)
            })
            .catch(() => {
                toast.error('Erro ao fazer Login!')
            })
    }

    const [showEye, setShowEye] = useState(false);
    const togglePasswordVisiblity = () => {
        setShowEye(showEye ? false : true);
    };

    return (
        <form className="form-content" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h1 className="form-title">Login</h1>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        className="form-input-email"
                        name="username"
                        ref={register({
                            required: "Campo Obrigatório",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email inválido"
                            }
                        })}
                    />
                    {
                        errors.username && (
                            <div className="invalid-feedback d-block input-invalid">
                                {errors.username.message}
                            </div>
                        )
                    }
                </div>
                <div>
                    <div>
                        <input
                            type={showEye ? "text" : "password"}
                            placeholder="Senha"
                            className="form-input-password"
                            name="password"
                            ref={register({ required: "Campo Obrigatório"})}
                        />
                        <Link to="#" className="btn-eye" onClick={togglePasswordVisiblity}>
                            {showEye ? <FontAwesomeIcon icon={faEyeSlash} className="input-eyes" /> : <FontAwesomeIcon icon={faEye} className="input-eyes" />}
                        </Link>
                        {
                            errors.password && (
                                <div className="invalid-feedback d-block input-invalid">
                                     {errors.password.message}
                                </div>
                            )
                        }
                    </div>


                </div>
                <div className="d-flex content-btn">
                    <button className="btn-form">
                        <h3 className={"btn-text"}>LOGAR</h3>
                    </button>
                    <div className="div-arrow">
                        <Arrow />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Auth;