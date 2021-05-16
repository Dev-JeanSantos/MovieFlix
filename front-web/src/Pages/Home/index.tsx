import React from 'react';
import { ReactComponent as MainImage } from '../../assets/images/Desenho.svg';
import Navbar from '../../Components/Navbar';
import './styles.css';
import Auth from '../Auth';

function Home() {
    return (
        <>
            <Navbar />
            <div className=" home-container">
                <div className="home-content">
                    <div>
                        <h1 className="home-title">
                            Avalie Filmes
                        </h1>
                        <h3 className="home-subTitle">
                            Diga o que você achou do seu filme favorito
                        </h3>
                        <div className="home-image">
                            <MainImage />
                        </div>
                    </div>
                </div>
            <Auth /> 
            </div>
        </>
    )
}

export default Home;