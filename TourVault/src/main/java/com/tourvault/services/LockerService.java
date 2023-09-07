package com.tourvault.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.tourvault.entities.Locker;
import com.tourvault.exceptions.MyAPIException;
import com.tourvault.repos.LockerRepo;

@Service
public class LockerService {
	
	@Autowired LockerRepo lr;
	
	//Post
	public void salvaLocker(Locker l) {
		try {
			this.lr.save(l);
		} catch (Exception e) {
			throw new  MyAPIException(HttpStatus.INTERNAL_SERVER_ERROR, "Impossibile salvare il locker");
		}	
	}
	
	//Put
	public Locker updateLocker(Long id, Locker l) {
		return this.lr.save(l);
	}
	
	//Delete
    public boolean deleteLocker(Long id) {
        if (this.lr.existsById(id)) {
            this.lr.deleteById(id);
            return true;
        } else {
        	throw new MyAPIException(HttpStatus.BAD_REQUEST, "Nessun locker con id" + id);
        }
    }
	
	//Get by id	
	public Locker findById(Long id) {
		if (lr.existsById(id)) {
			return this.lr.findById(id).get();
		} else {
			throw new MyAPIException(HttpStatus.BAD_REQUEST, "Nessun locker con id" + id);
		}
	}
	
	//Get all
	public Iterable<Locker> findAll() {
		return this.lr.findAll();
	}

}
