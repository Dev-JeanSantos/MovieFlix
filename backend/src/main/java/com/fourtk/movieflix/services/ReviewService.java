package com.fourtk.movieflix.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fourtk.movieflix.dto.ReviewDTO;
import com.fourtk.movieflix.entities.Movie;
import com.fourtk.movieflix.entities.Review;
import com.fourtk.movieflix.entities.User;
import com.fourtk.movieflix.repositories.MovieRepository;
import com.fourtk.movieflix.repositories.ReviewRepository;
import com.fourtk.movieflix.services.exceptions.ResourcesNotFoundException;

@Service
public class ReviewService {

	@Autowired
	private ReviewRepository repository;
	
	@Autowired
	private MovieRepository movieRepository;
	
	@Autowired
	private AuthService authService;
	

	@Transactional(readOnly = true)
	public ReviewDTO findById(Long id) {

		Optional<Review> obj = repository.findById(id);
		Review entity = obj.orElseThrow(() -> new ResourcesNotFoundException("Review não Encontrado"));

		return new ReviewDTO(entity);
	}

	@Transactional(readOnly = true)
	public Page<ReviewDTO> findAllPaged(PageRequest pageRequest) {
		
		//Movie movie = (movieId == 0) ? null : movieRepository.getOne(movieId);
		Page<Review> list = repository.findAll(pageRequest);
		return list.map(x -> new ReviewDTO(x));
	}

	@Transactional
	public ReviewDTO insert(ReviewDTO dto) {
	
		Movie movie = movieRepository.getOne(dto.getMovieId());
		User user = authService.authenticated();
		
		authService.validateSelfOrAdmin(user.getId());
		
		Review entity = new Review();		
		entity.setText(dto.getText());
		entity.setMovie(movie);
		entity.setUser(user);
		
		entity = repository.save(entity);
		
		return new ReviewDTO(entity);
	}

}
