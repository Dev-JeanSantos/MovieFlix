package com.fourtk.movieflix.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.fourtk.movieflix.entities.Genre;
import com.fourtk.movieflix.entities.Movie;

public class GenreDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	
	private Set<MovieDTO> movies = new HashSet<>();
	
	public GenreDTO() {
		// TODO Auto-generated constructor stub
	}

	public GenreDTO(Long id, String name) {
		this.id = id;
		this.name = name;
	}
	
	public GenreDTO(Genre entity) {
		id = entity.getId();
		name = entity.getName();
	}
	
	public GenreDTO(Genre entity, Set<Movie> movies) {
		this(entity);		
		movies.forEach(x -> this.movies.add(new MovieDTO(x)));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Set<MovieDTO> getMovies() {
		return movies;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}	
	
}
