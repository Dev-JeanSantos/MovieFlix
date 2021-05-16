import React, { useEffect, useState } from 'react';
import './styles.css';
import DetailsCard from './Components/DetailsCard';
import CommentCard from './Components/CommentCard';
import AvaliationsCard from './Components/AvaliationsCard';
import Navbar from '../../../../Components/Navbar';
import ButtonLogout from '../../../../Components/ButtonLogout';
import { Link, useParams } from 'react-router-dom';
import { makePrivateRequest } from '../../../../Core/Utils/request';
import { Film } from '../../../../Core/Types/Films';
import FilmsDetailsLoaders from '../Loaders/FilmsDetailsLoaders';
import { isAllowedByRole } from '../../../../Core/Utils/auth';
import FilmCommentLoaders from '../Loaders/FilmsCommentLoaders';


type ParamsType = {
    filmeId: string;
}

const DetailsFilms = () => {
    const { filmeId } = useParams<ParamsType>();
    const [movieResponse, setMovieResponse] = useState<Film>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        makePrivateRequest({ url: `/movies/${filmeId}` })
            .then(response => {
                setMovieResponse(response.data);
            })
            .finally(() => setIsLoading(false));
    }, [filmeId])

    return (
        <>
            <Navbar>
                <ButtonLogout />
            </Navbar>
            <Link to="/filmes" className="back-container">
                    <h3 className="back-text">Voltar</h3>
            </Link>
            {isLoading ? <FilmsDetailsLoaders/> : (
                <DetailsCard />
            )}

            {  isLoading ? <FilmCommentLoaders/> :(
                
                isAllowedByRole(['ROLE_MEMBER']) &&
                <CommentCard id={filmeId}/>
            )}

            <div className="avaliations-container">
                {movieResponse?.reviews.map(review => (
                    <AvaliationsCard key={review.id} textReview={review.text} autorReview={review.userName} />
                ))}
            </div>
        </>
    );
};

export default DetailsFilms;