import React, { useEffect } from 'react';
import { useState } from 'react';
import Select from 'react-select';
import { Genre } from '../../../../Core/Types/Films';
import { makePrivateRequest } from '../../../../Core/Utils/request';
import './styles.css';

export type FilterForm = {
    genreId?: number;
}

type Props = {
    onSearch: (filter: FilterForm) => void;
}

const FiltersFilms = ({ onSearch }: Props) => {

    const [genres, setGenres] = useState<Genre[]>([]);
    const [genre, setGenre] = useState<Genre>();


    useEffect(() => {
      
        makePrivateRequest({ url: '/genres/pagination' })
            .then(response => setGenres(response.data.content))
    }, [])

    const handleChangeGenre = (genre: Genre) => {
        setGenre(genre);
        onSearch({ genreId: genre?.id })
    }

    return (
        <div className="catalog-container">
            <div className="catalog-content-search">
                <Select 
                    options={genres}
                    name="Genre"
                    key={`select-${genre?.id}`}
                    value={genre}
                    inputId="genries"
                    getOptionLabel={(option: Genre) => option.name}
                    getOptionValue={(option: Genre) => String(option.id)}
                    classNamePrefix="catalog-select"
                    placeholder="Gêneros de Filmes"
                    onChange={value => handleChangeGenre(value as Genre)
                    }
                    isClearable
                />
            </div>
        </div>
    );
};

export default FiltersFilms;