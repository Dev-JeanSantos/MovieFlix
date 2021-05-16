package com.fourtk.movieflix.dto;

import java.io.Serializable;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.fourtk.movieflix.entities.User;

public class UserDTO implements Serializable{	

	private static final long serialVersionUID = 1L;
	
	private Long id;	
	@NotBlank(message = "Campo Obrigatório")
	private String name;
	@Email(message = "Entre com email válido")
	private String email;
	
	public UserDTO() {
		// TODO Auto-generated constructor stub
	}
	
	public UserDTO(Long id, @NotBlank(message = "Campo Obrigatório") String name,
			@Email(message = "Entre com email válido") String email) {
		this.id = id;
		this.name = name;
		this.email = email;
	}



	public UserDTO(User entity) {
		id = entity.getId();
		name = entity.getName();
		email = entity.getEmail();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
}
