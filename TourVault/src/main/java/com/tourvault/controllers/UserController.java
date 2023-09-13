package com.tourvault.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tourvault.entities.User;
import com.tourvault.exceptions.MyAPIException;
import com.tourvault.services.UserService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        User user = userService.getById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping
    public ResponseEntity<Page<User>> getUtentiPaginati(Pageable pageable) {
        Page<User> utenti = userService.getUtentiPaginati(pageable);
        return ResponseEntity.ok(utenti);
    }

    @GetMapping("username/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        try {
            User user = userService.getByUsername(username);
            return ResponseEntity.ok(user);
        } catch (MyAPIException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utente non trovato");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUtente(@PathVariable Long id) {
        boolean deleted = userService.deleteUtente(id);
        if (deleted) {
            return ResponseEntity.ok("Utente eliminato con successo");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utente non trovato con id " + id);
        }
    }

    @GetMapping("/con-deposito")
    public ResponseEntity<Page<User>> getUtentiConDeposito(Pageable pageable) {
        Page<User> utentiConDeposito = userService.getUtentiConDeposito(pageable);
        return ResponseEntity.ok(utentiConDeposito);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody User user) {
        try {
            User updatedUser = userService.updateUser(id, user);
            return ResponseEntity.ok("Utente aggiornato con successo");
        } catch (MyAPIException e) {
            return ResponseEntity.status(e.getStatus()).body(e.getMessage());
        }
    }
}