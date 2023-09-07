package com.tourvault.repos;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.tourvault.entities.Deposito;

public interface DepositoRepo extends CrudRepository <Deposito, Long> {
	
	Optional<Deposito> findByCodicePrenotazione(String cp);
	
	Boolean existsByCodicePrenotazione(String cp);

}
