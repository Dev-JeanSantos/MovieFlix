package com.fourtk.movieflix.resources.exceptions;

import java.time.Instant;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.fourtk.movieflix.services.exceptions.DataBaseException;
import com.fourtk.movieflix.services.exceptions.ForbiddenException;
import com.fourtk.movieflix.services.exceptions.ResourcesNotFoundException;
import com.fourtk.movieflix.services.exceptions.UnAuthorizedException;

@ControllerAdvice
public class ResourceExceptionHandler {

	@ExceptionHandler(ResourcesNotFoundException.class)
	public ResponseEntity<StandardError> entityNotFound(ResourcesNotFoundException e, HttpServletRequest request) {

		HttpStatus status = HttpStatus.NOT_FOUND;

		StandardError err = new StandardError();

		err.setTimestamp(Instant.now());
		err.setStatus(status.value());
		err.setError("Recurso não Encontrado!");
		err.setMessage(e.getMessage());
		err.setPath(request.getRequestURI());

		return ResponseEntity.status(status).body(err);

	}

	@ExceptionHandler(DataBaseException.class)
	public ResponseEntity<StandardError> database(DataBaseException e, HttpServletRequest request) {

		HttpStatus status = HttpStatus.BAD_REQUEST;

		StandardError err = new StandardError();

		err.setTimestamp(Instant.now());
		err.setStatus(status.value());
		err.setError("Database exception");
		err.setMessage(e.getMessage());
		err.setPath(request.getRequestURI());

		return ResponseEntity.status(status).body(err);

	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ValidationError> validation(MethodArgumentNotValidException e, HttpServletRequest request) {

		HttpStatus status = HttpStatus.UNPROCESSABLE_ENTITY;

		ValidationError err = new ValidationError();

		err.setTimestamp(Instant.now());
		err.setStatus(status.value());
		err.setError("Validation exception");
		err.setMessage(e.getMessage());
		err.setPath(request.getRequestURI());

		for (FieldError f : e.getBindingResult().getFieldErrors()) {
			err.addError(f.getField(), f.getDefaultMessage());
		}
		return ResponseEntity.status(status).body(err);
	}

	@ExceptionHandler(ForbiddenException.class)
	public ResponseEntity<OAuthCustomError> forbidden(ForbiddenException e, HttpServletRequest request) {

		OAuthCustomError err = new OAuthCustomError("Forbidden", e.getMessage());

		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(err);
	}

	@ExceptionHandler(UnAuthorizedException.class)
	public ResponseEntity<OAuthCustomError> unAuthorized(UnAuthorizedException e, HttpServletRequest request) {

		OAuthCustomError err = new OAuthCustomError("UnAuthorized", e.getMessage());

		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(err);
	}

}
