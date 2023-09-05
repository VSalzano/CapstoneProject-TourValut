package com.tourvault.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.tourvault.entities.GruppoLocker;
import com.tourvault.exceptions.MyAPIException;
import com.tourvault.repos.GruppoLockerRepo;

@Service
public class GruppoLockerService {
	
	@Autowired GruppoLockerRepo glr;
	
	public void salvaGruppoLocker(GruppoLocker gl) {
		try {
			this.glr.save(gl);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}	
	}
	
	public GruppoLocker findById(Long id) {
		if (glr.existsById(id)) {
			return this.glr.findById(id).get();
		} else {
			throw new MyAPIException(HttpStatus.BAD_REQUEST, "Nessun gruppo locker con id" + id);
		}
	}
	
	public Iterable<GruppoLocker> findAll() {
		return this.glr.findAll();
	}
	
    public boolean deleteGruppoLocker(Long id) {
        if (this.glr.existsById(id)) {
            this.glr.deleteById(id);
            return true;
        } else {
        	throw new MyAPIException(HttpStatus.BAD_REQUEST, "Nessun gruppo locker con id" + id);
        }
    }
    
    public GruppoLocker updateGruppoLocker(Long id, GruppoLocker gl) {
        return this.glr.save(gl);
    }

}
