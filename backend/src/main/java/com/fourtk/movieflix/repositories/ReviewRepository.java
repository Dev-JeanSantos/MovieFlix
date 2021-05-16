package com.fourtk.movieflix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fourtk.movieflix.entities.Review;

public interface ReviewRepository extends JpaRepository<Review, Long>{
	
//	@Query ("SELECT rev FROM Review rev WHERE "
//			+ "rev")
//	Page<Review> findAllReviewByMovie(Movie movie, Pageable pageable);
	
}
