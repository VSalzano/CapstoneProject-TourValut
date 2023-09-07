package com.tourvault.repos;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.tourvault.entities.Locker;

public interface LockerRepo extends CrudRepository <Locker, Long> {
	
	Optional<Locker> findByCodiceIdentificativo(String codiceIdentificativo);

}
