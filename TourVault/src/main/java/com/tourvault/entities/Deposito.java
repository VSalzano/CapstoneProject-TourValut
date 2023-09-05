package com.tourvault.entities;

import java.util.Date;

import com.tourvault.enums.StatoDeposito;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name="depositi")
public class Deposito {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "utente_id")
	private User user;
	
	@ManyToOne
    @JoinColumn(name = "locker_id")
    private Locker locker;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataOraInizio;
	
	private String descrizione;
	 
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataOraFine;
	
	@Enumerated(EnumType.STRING)
	private StatoDeposito stato;
	
	private Double prezzoAffitto;

}
