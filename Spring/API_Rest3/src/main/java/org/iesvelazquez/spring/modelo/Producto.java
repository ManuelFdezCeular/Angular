package org.iesvelazquez.spring.modelo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
@Entity
public class Producto {
	
	@Id @GeneratedValue
	private Long id;
	
	private String nombre;
	
	private float precio;

	//muchos productos pueden pertenecer a una categoria
	@ManyToOne
	@JoinColumn(name="categoria_id")
	private Categoria categoria;
	
}
