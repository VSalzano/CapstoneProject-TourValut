package com.tourvault.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tourvault.entities.Locker;
import com.tourvault.exceptions.MyAPIException;
import com.tourvault.services.LockerService;

@RestController
@RequestMapping("/api/lockers")
public class LockerController {

    @Autowired
    private LockerService lockerService;

    @PostMapping
    public ResponseEntity<String> salvaLocker(@RequestBody Locker locker) {
        lockerService.salvaLocker(locker);
        return ResponseEntity.status(HttpStatus.CREATED).body("Locker creato con successo");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Locker> findById(@PathVariable Long id) {
        Locker locker = lockerService.findById(id);
        return ResponseEntity.ok(locker);
    }

    @GetMapping
    public ResponseEntity<Iterable<Locker>> findAll() {
        Iterable<Locker> lockers = lockerService.findAll();
        return ResponseEntity.ok(lockers);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLocker(@PathVariable Long id) {
        boolean deleted = lockerService.deleteLocker(id);
        if (deleted) {
            return ResponseEntity.ok("Locker eliminato con successo");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nessun locker con id " + id);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateLocker(@PathVariable Long id, @RequestBody Locker locker) {
        try {
            Locker updatedLocker = lockerService.updateLocker(id, locker);
            return ResponseEntity.ok("Locker aggiornato con successo");
        } catch (MyAPIException e) {
            return ResponseEntity.status(e.getStatus()).body(e.getMessage());
        }
    }
}
