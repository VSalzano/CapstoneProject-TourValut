package com.tourvault.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.tourvault.entities.User;
import com.tourvault.exceptions.MyAPIException;
import com.tourvault.repos.UserPageableRepo;
import com.tourvault.repos.UserRepository;

@Service
public class UserService {
	
	@Autowired UserPageableRepo upr;
	@Autowired UserRepository ur;
	
    public User getById(Long id) {
        if (ur.existsById(id)) {
            return this.ur.findById(id).get();
        } else {
            throw new MyAPIException(HttpStatus.BAD_REQUEST, "Utente non trovato!");
        }
    }
    
    public User getByEmail(String email) {
    	if (ur.existsByEmail(email)) {
    		return this.ur.findByEmail(email).get();
    	} else {
    		throw new MyAPIException(HttpStatus.BAD_REQUEST, "Utente non trovato!");
    	}
    }
    
    public User getByUsername(String username) {
    	if (ur.existsByUsername(username)) {
    		return this.ur.findByUsername(username).get();
    	} else {
    		throw new MyAPIException(HttpStatus.BAD_REQUEST, "Utente non trovato!");
    	}
    }
    
    public Page<User> getUtentiPaginati(Pageable pageable) {
        return this.upr.findAll(pageable);
    }
	
    public boolean deleteUtente(Long id) {
        if (this.ur.existsById(id)) {
            this.ur.deleteById(id);
            return true;
        } else {
        	throw new MyAPIException(HttpStatus.BAD_REQUEST, "Utente non trovato!");
        }
        
     }
    
    //trova tutti gli utenti con almeno un deposito in corso
    public Page<User> getUtentiConDeposito(Pageable pageable) {
    	return this.upr.findUsersWithDepositoInCorso(pageable);
    }
    
    public User updateUser(Long id, User u) {
        return this.ur.save(u);
    }
    
}
