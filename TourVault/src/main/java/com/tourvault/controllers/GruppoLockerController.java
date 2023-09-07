package com.tourvault.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tourvault.entities.GruppoLocker;
import com.tourvault.exceptions.MyAPIException;
import com.tourvault.services.GruppoLockerService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/gruppi-locker")
public class GruppoLockerController {

    @Autowired
    private GruppoLockerService gruppoLockerService;

    @PostMapping
    public ResponseEntity<String> salvaGruppoLocker(@RequestBody GruppoLocker gruppoLocker) {
        try {
            gruppoLockerService.salvaGruppoLocker(gruppoLocker);
            return ResponseEntity.status(HttpStatus.CREATED).body("Gruppo Locker creato con successo");
        } catch (Exception e) {
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Errore durante il salvataggio del Gruppo Locker");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<GruppoLocker> findById(@PathVariable Long id) {
        GruppoLocker gruppoLocker = gruppoLockerService.findById(id);
        return ResponseEntity.ok(gruppoLocker);
    }

    @GetMapping
    public ResponseEntity<Iterable<GruppoLocker>> findAll() {
        Iterable<GruppoLocker> gruppiLocker = gruppoLockerService.findAll();
        return ResponseEntity.ok(gruppiLocker);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteGruppoLocker(@PathVariable Long id) {
        boolean deleted = gruppoLockerService.deleteGruppoLocker(id);
        if (deleted) {
            return ResponseEntity.ok("Gruppo Locker eliminato con successo");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nessun gruppo locker con id " + id);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateGruppoLocker(@PathVariable Long id, @RequestBody GruppoLocker gruppoLocker) {
        try {
            GruppoLocker updatedGruppoLocker = gruppoLockerService.updateGruppoLocker(id, gruppoLocker);
            return ResponseEntity.ok("Gruppo Locker aggiornato con successo");
        } catch (MyAPIException e) {
            return ResponseEntity.status(e.getStatus()).body(e.getMessage());
        }
    }
}
