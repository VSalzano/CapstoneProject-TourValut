package com.tourvault.services;

import java.text.DecimalFormat;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.tourvault.entities.Deposito;
import com.tourvault.entities.Locker;
import com.tourvault.enums.StatoDeposito;
import com.tourvault.enums.StatoLocker;
import com.tourvault.enums.TipoLocker;
import com.tourvault.exceptions.MyAPIException;
import com.tourvault.repos.DepositoRepo;
import com.tourvault.repos.LockerRepo;

@Service
public class DepositoService {

    @Autowired
    DepositoRepo dr;
    @Autowired
    LockerRepo lr;

    // Get by id
    public Deposito findById(Long id) {
        if (dr.existsById(id)) {
            return this.dr.findById(id).get();
        } else {
            throw new MyAPIException(HttpStatus.BAD_REQUEST, "Nessun deposito con id" + id);
        }
    }

    // Get by codice prenotazione
    public Deposito findByCodicePrenotazione(String cp) {
        if (dr.existsByCodicePrenotazione(cp)) {
            return this.dr.findByCodicePrenotazione(cp).get();
        } else {
            throw new MyAPIException(HttpStatus.BAD_REQUEST, "Nessun deposito con codice" + cp);
        }
    }

    // Get all
    public Iterable<Deposito> findAll() {
        return this.dr.findAll();
    }

    // Post - calcola la TARIFFA ORARIA e aggiorna il locker associato ad OCCUPATO
    public void salvaDeposito(Deposito d) throws Exception {
        try {
            Long lockerId = d.getLocker().getId();
            Optional<Locker> lockerAssociato = lr.findById(lockerId);

            if (lockerAssociato.isPresent()) {
                Locker locker = lockerAssociato.get();
                TipoLocker tipoLocker = locker.getTipo();
                if (locker.getStato().equals(StatoLocker.LIBERO)) {
                    double tariffaOraria = calcolaTariffaOraria(tipoLocker);
                    d.setTariffaOraria(tariffaOraria);
                    locker.setStato(StatoLocker.OCCUPATO);
                    lr.save(locker);
                } else {
                    throw new Exception("Il locker selezionato è occupato");
                }

            } else {
                throw new Exception("nessun locker associato");
            }
            dr.save(d);
        } catch (Exception e) {
            throw e;
        }
    }

    // Metodo per calcolare la tariffa oraria automaticamente, richiamato nella post
    private double calcolaTariffaOraria(TipoLocker tipoLocker) {
        if (tipoLocker.equals(TipoLocker.PICCOLO)) {
            return 0.50;
        } else if (tipoLocker.equals(TipoLocker.MEDIO)) {
            return 0.75;
        } else {
            return 1.00;
        }
    }

    // Put
    public Deposito updateDeposito(Long id, Deposito l) {
        return this.dr.save(l);
    }

    // Delete
    public boolean deleteDeposito(Long id) {
        if (this.dr.existsById(id)) {
            this.dr.deleteById(id);
            return true;
        } else {
            throw new MyAPIException(HttpStatus.BAD_REQUEST, "Nessun deposito con id" + id);
        }
    }

    // Metodo per ritirare bagagli e terminare la prenotazione
    public void terminaDeposito(String codicePrenotazione) {
        try {
            Optional<Deposito> optionalDeposito = dr.findByCodicePrenotazione(codicePrenotazione);
            if (optionalDeposito.isPresent()) {
                Deposito deposito = optionalDeposito.get();
                Locker locker = deposito.getLocker();
                if (deposito.getStato() == StatoDeposito.IN_CORSO) {
                    deposito.setDataOraFine(new Date());
                    double tariffaOraria = deposito.getTariffaOraria();
                    Date dataOraInizio = deposito.getDataOraInizio();
                    Date dataOraFine = deposito.getDataOraFine();
                    long millisecondiTrascorsi = dataOraFine.getTime() - dataOraInizio.getTime();

                    // Calcola il costo delle frazioni di ora in centesimi di euro
                    long minutiTrascorsi = millisecondiTrascorsi / (60 * 1000);
                    double costoFrazioniOra = (double) minutiTrascorsi * tariffaOraria / 60.0;

                    // Calcola il prezzo totale dell'affitto in euro
                    double prezzoAffitto = tariffaOraria + costoFrazioniOra / 100.0;

                    deposito.setPrezzoAffitto(prezzoAffitto);
                    deposito.setStato(StatoDeposito.TERMINATO);
                    locker.setStato(StatoLocker.LIBERO);
                    dr.save(deposito);
                    lr.save(locker);
                } else {
                    throw new MyAPIException(HttpStatus.BAD_REQUEST, "Il deposito non è in corso");
                }
            } else {
                throw new MyAPIException(HttpStatus.BAD_REQUEST, "Deposito non trovato");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
