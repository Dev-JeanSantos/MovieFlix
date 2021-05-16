package com.fourtk.movieflix.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fourtk.movieflix.dto.MovieDTO;
import com.fourtk.movieflix.entities.Genre;
import com.fourtk.movieflix.entities.Movie;
import com.fourtk.movieflix.repositories.GenreRepository;
import com.fourtk.movieflix.repositories.MovieRepository;
import com.fourtk.movieflix.services.exceptions.ResourcesNotFoundException;

@Service
public class MovieService {
	
	@Autowired
	private MovieRepository repository;
	
	@Autowired
	private GenreRepository genreRepository;
	
	@Transactional(readOnly = true)
	public MovieDTO findById(Long id) {
		
		Optional<Movie> obj = repository.findById(id);
		Movie entity = obj.orElseThrow(() -> new ResourcesNotFoundException("Movie não Encontrado"));
		
		return new MovieDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public Page<MovieDTO> find(Long genreId, PageRequest pageRequest){			
		Genre genre = (genreId == 0) ? null : genreRepository.getOne(genreId);
		Page<Movie> list = repository.searchAll(genre, pageRequest);		
		return  list.map(x -> new MovieDTO(x));		
	}
}
