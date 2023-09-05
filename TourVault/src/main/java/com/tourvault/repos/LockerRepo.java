package com.tourvault.repos;

import org.springframework.data.repository.CrudRepository;

import com.tourvault.entities.Locker;

public interface LockerRepo extends CrudRepository <Locker, Long> {

}
