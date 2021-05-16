package com.fourtk.movieflix.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fourtk.movieflix.entities.User;
import com.fourtk.movieflix.repositories.UserRepository;
import com.fourtk.movieflix.services.exceptions.ForbiddenException;
import com.fourtk.movieflix.services.exceptions.UnAuthorizedException;

@Service
public class AuthService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Transactional(readOnly = true)
	public User authenticated() {		
		try {
			String username = SecurityContextHolder.getContext().getAuthentication().getName();
			return userRepository.findByEmail(username);
		}catch (Exception e) {
			throw new UnAuthorizedException("Usuario Inválido");
		}
	}
	
	public void validateSelfOrAdmin(Long userId) {
		
		User user = authenticated();
		if(!user.hasHole("ROLE_MEMBER")) {
			throw new ForbiddenException("Acesso Negado");
		}
	}
}
