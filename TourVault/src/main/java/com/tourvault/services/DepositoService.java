package com.tourvault.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.tourvault.entities.Deposito;
import com.tourvault.exceptions.MyAPIException;
import com.tourvault.repos.DepositoRepo;

@Service
public class DepositoService {
	
	@Autowired DepositoRepo dr;
	
	//Get by id
	public Deposito findById(Long id) {
		if (dr.existsById(id)) {
			return this.dr.findById(id).get();
		} else {
			throw new MyAPIException(HttpStatus.BAD_REQUEST, "Nessun deposito con id" + id);
		}
	}
	
	//Get by codice prenotazione
	public Deposito findByCodicePrenotazione(String cp) {
		if (dr.existsByCodicePrenotazione(cp)) {
			return this.dr.findByCodicePrenotazione(cp).get();
		} else {
			throw new MyAPIException(HttpStatus.BAD_REQUEST, "Nessun deposito con codice" + cp);
		}
	}
	
	//Get all
	public Iterable<Deposito> findAll() {
		return this.dr.findAll();
	}
	
	//Post
	public void salvaDeposito(Deposito l) {
		try {
			this.dr.save(l);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}	
	}
	
	//Put	
	public Deposito updateDeposito(Long id, Deposito l) {
		return this.dr.save(l);
	}
	
	//Delete	
    public boolean deleteDeposito(Long id) {
        if (this.dr.existsById(id)) {
            this.dr.deleteById(id);
            return true;
        } else {
        	throw new MyAPIException(HttpStatus.BAD_REQUEST, "Nessun deposito con id" + id);
        }
    }

}
