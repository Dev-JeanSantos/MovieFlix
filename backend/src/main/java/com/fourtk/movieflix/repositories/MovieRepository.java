package com.fourtk.movieflix.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.fourtk.movieflix.entities.Genre;
import com.fourtk.movieflix.entities.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long>{
	
	@Query("SELECT obj FROM Movie obj WHERE "
			+ "(:genre IS NULL OR :genre = obj.genre)")
	Page<Movie> search(Genre genre, Pageable pageable);	

	
	@Query("SELECT obj FROM Movie obj WHERE "
			+ ":genre IS NULL OR obj.genre = :genre ORDER BY obj.title ASC")
	Page<Movie> searchAll(Genre genre, Pageable pageable);

}
