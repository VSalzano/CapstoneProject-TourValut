package com.tourvault.repos;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.tourvault.entities.User;

public interface UserPageableRepo extends PagingAndSortingRepository <User, Long> {
	
    @Query("SELECT u FROM User u ORDER BY u.name ASC")
    public Page<User> findAllOrderByName(Pageable pageable);
    
    @Query("SELECT u FROM User u WHERE u.name LIKE %:nome%")
    public Page<User> findByNameContaining(String nome, Pageable pageable);
    
    @Query("SELECT DISTINCT u FROM User u JOIN FETCH u.depositi d WHERE d.stato = 'IN_CORSO'")
    public Page<User> findUsersWithDepositoInCorso(Pageable pageable);
    
 

}
