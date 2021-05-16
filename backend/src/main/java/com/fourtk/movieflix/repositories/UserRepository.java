package com.fourtk.movieflix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fourtk.movieflix.entities.User;

public interface UserRepository extends JpaRepository<User, Long>{
	
	User findByEmail(String email);
	
}
