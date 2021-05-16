package com.fourtk.movieflix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fourtk.movieflix.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{
	
	
}
