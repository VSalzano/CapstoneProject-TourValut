package com.tourvault.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tourvault.enums.StatoLocker;
import com.tourvault.enums.TipoLocker;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Locker {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "codice_identificativo", unique = true, nullable = false)
	private String codiceIdentificativo;

	@ManyToOne
	@JsonIgnore
	private GruppoLocker gruppo;

	@Enumerated(EnumType.STRING)
	private StatoLocker stato;

	@Enumerated(EnumType.STRING)
	private TipoLocker tipo;

}
