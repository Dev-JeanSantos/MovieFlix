package com.fourtk.movieflix.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.fourtk.movieflix.entities.Genre;

public interface GenreRepository extends JpaRepository<Genre, Long>{
	
	
	@Query(" SELECT obj FROM Genre obj")
	Page<Genre> search (Pageable pageable);
	
	@Query("SELECT DISTINCT obj FROM Genre obj INNER JOIN obj.movies movs")
	Page<Genre> findAllGenreMoviesByTitle(Pageable pageable);
}
