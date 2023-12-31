package com.tourvault.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.tourvault.enums.StatoGruppo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GruppoLocker {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(unique = true, nullable = false)
	private String nome;

	@Column(name = "url_immagine")
	private String urlImmagine;

	private String posizione;

	@OneToMany(mappedBy = "gruppo")
	@JsonManagedReference
	private List<Locker> locker;

	@Enumerated(EnumType.STRING)
	private StatoGruppo stato;

}
