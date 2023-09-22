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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tourvault.entities.Deposito;
import com.tourvault.exceptions.MyAPIException;
import com.tourvault.services.DepositoService;

@RestController
@RequestMapping("/api/depositi")
public class DepositoController {

    @Autowired
    private DepositoService depositoService;

    @GetMapping("/{id}")
    public ResponseEntity<Deposito> findById(@PathVariable Long id) {
        Deposito deposito = depositoService.findById(id);
        return ResponseEntity.ok(deposito);
    }

    @GetMapping
    public ResponseEntity<Iterable<Deposito>> findAll() {
        Iterable<Deposito> depositi = depositoService.findAll();
        return ResponseEntity.ok(depositi);
    }

    @PostMapping
    public ResponseEntity<String> salvaDeposito(@RequestBody Deposito deposito) {
        depositoService.salvaDeposito(deposito);
        return ResponseEntity.status(HttpStatus.CREATED).body("Deposito creato con successo");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateDeposito(@PathVariable Long id, @RequestBody Deposito deposito) {
        try {
            Deposito updatedDeposito = depositoService.updateDeposito(id, deposito);
            return ResponseEntity.ok("Deposito aggiornato con successo");
        } catch (MyAPIException e) {
            return ResponseEntity.status(e.getStatus()).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDeposito(@PathVariable Long id) {
        boolean deleted = depositoService.deleteDeposito(id);
        if (deleted) {
            return ResponseEntity.ok("Deposito eliminato con successo");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nessun deposito con id " + id);
        }
    }

    @PostMapping("/termina")
    public ResponseEntity<String> terminaDeposito(@RequestParam String codicePrenotazione) {
        try {
            depositoService.terminaDeposito(codicePrenotazione);
            return ResponseEntity.ok("Deposito terminato con successo.");
        } catch (MyAPIException e) {
            return ResponseEntity.status(e.getStatus()).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Si è verificato un errore interno.");
        }
    }
}
