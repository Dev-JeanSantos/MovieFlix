package com.fourtk.movieflix.services;

import java.util.Optional;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fourtk.movieflix.dto.UserDTO;
import com.fourtk.movieflix.entities.User;
import com.fourtk.movieflix.repositories.UserRepository;
import com.fourtk.movieflix.services.exceptions.ResourcesNotFoundException;

@Service
public class UserService implements UserDetailsService {
	
	private static Logger logger = org.slf4j.LoggerFactory.getLogger(UserService.class);
	
	@Autowired
	private UserRepository repository;
	
	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		
		Optional<User> obj = repository.findById(id);
		User entity = obj.orElseThrow(() -> new ResourcesNotFoundException("Usuário não Encontrado"));
		
		return new UserDTO(entity);
	}
	
	
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user = repository.findByEmail(username);
		if (user == null) {
			logger.error("User not Found: " + username);
			throw new UsernameNotFoundException("Email não encontrado!");
		}
			logger.info("user found: " + username);
		return user;
	}
}
