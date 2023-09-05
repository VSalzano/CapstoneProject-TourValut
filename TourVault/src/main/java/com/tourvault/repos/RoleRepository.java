package com.tourvault.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tourvault.enums.ERole;
import com.tourvault.entities.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    
	Optional<Role> findByRoleName(ERole roleName);

}
