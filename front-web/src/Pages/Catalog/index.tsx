import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonLogout from '../../Components/ButtonLogout';
import Navbar from '../../Components/Navbar';
import Pagination from '../../Components/Pagination';
import { FilmsResponse} from '../../Core/Types/Films';
import { makePrivateRequest } from '../../Core/Utils/request';
import CardFilms from './Components/CardFilms';
import FiltersFilms, {FilterForm} from './Components/FiltersFilms';
import FilmCatalogLoad from './Components/Loaders/FilmsLoaders';
import './styles.css';


const Catalog = () => {

    const [filmsResponse, setFilmsResponse] = useState<FilmsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    
    const getFilms = useCallback((filter?: FilterForm) => {
        const params = {
            page: activePage,
            size: 4,
            genreId: filter?.genreId
        }
        setIsLoading(true);
        makePrivateRequest({ url: '/movies', params })
            .then(response => setFilmsResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage]);

    useEffect(() => {
        getFilms();
    }, [getFilms]);

    return (
        <>
            <Navbar>
                <ButtonLogout />
            </Navbar>
            <div className="catalog-container">
                <FiltersFilms onSearch={filter => getFilms(filter)} />
                <div className="catalog-container-card">
                    {isLoading ? <FilmCatalogLoad /> : (
                        filmsResponse?.content.map(film => (
                            <Link to={`/filmes/${film.id}`} key={film.id}>
                                <CardFilms film={film} />
                            </Link>
                        ))
                    )}
                </div>
            </div>
            {filmsResponse && <Pagination
                totalPages={filmsResponse.totalPages}
                activePage={activePage}
                onChange={page => setActivePage(page)}
            />}
        </>
    );
};

export default Catalog;