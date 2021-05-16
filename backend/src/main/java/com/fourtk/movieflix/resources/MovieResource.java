package com.fourtk.movieflix.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fourtk.movieflix.dto.MovieDTO;
import com.fourtk.movieflix.services.MovieService;

@RestController
@RequestMapping(value = "/movies")
public class MovieResource {
	
	@Autowired
	private MovieService service;
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<MovieDTO> findById(@PathVariable Long id) {		
		MovieDTO dto = service.findById(id);		
		return ResponseEntity.ok().body(dto);
	}
	
	@GetMapping
	public ResponseEntity<Page<MovieDTO>> findAll(
			
			@RequestParam(value = "genreId", defaultValue = "0") Long genreId,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "size", defaultValue = "11") Integer size,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
			@RequestParam(value = "orderBy", defaultValue = "title") String orderBy				
			){		
		PageRequest pageRequest = PageRequest.of(page, size,Direction.valueOf(direction), orderBy);
		
		Page<MovieDTO> list = service.find(genreId, pageRequest);
		
		return ResponseEntity.ok().body(list);
	}
	
}
