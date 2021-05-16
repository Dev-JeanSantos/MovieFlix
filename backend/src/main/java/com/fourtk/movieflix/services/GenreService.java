package com.fourtk.movieflix.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fourtk.movieflix.dto.GenreDTO;
import com.fourtk.movieflix.entities.Genre;
import com.fourtk.movieflix.repositories.GenreRepository;
import com.fourtk.movieflix.services.exceptions.ResourcesNotFoundException;

@Service
public class GenreService {
	
	@Autowired
	private GenreRepository repository;
	
	

	@Transactional(readOnly = true) 
	public List<GenreDTO> findAll(){
		
		List<Genre> list = repository.findAll();
		
		return list.stream().map(x -> new GenreDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public GenreDTO findById(Long id) {
		
		Optional<Genre> obj = repository.findById(id);
		Genre entity = obj.orElseThrow(() -> new ResourcesNotFoundException("Genêro não Encontrado"));
		
		return new GenreDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public Page<GenreDTO> findAllPaged(PageRequest pageRequest){			
		Page<Genre> list = repository.findAllGenreMoviesByTitle(pageRequest);		
		return  list.map(x -> new GenreDTO(x));		
	}
}

