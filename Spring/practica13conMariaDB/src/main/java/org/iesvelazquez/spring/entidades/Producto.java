package org.iesvelazquez.spring.entidades;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Producto {

	@Id
	@GeneratedValue
	private long id;

	private String nombre;

	private float precio;

	private String imagen;

	// Los productos son de un usuario
	@ManyToOne
	private Usuario propietario;

	// Los productos podra estar comprado mediante una compra
	@ManyToOne
	private Compra compra;

	public Producto() {
	}

// con todos los campos menos el id y compra
	public Producto(String nombre, float precio, String imagen, Usuario propietario) {
		super();
		this.nombre = nombre;
		this.precio = precio;
		this.imagen = imagen;
		this.propietario = propietario;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public float getPrecio() {
		return precio;
	}

	public void setPrecio(float precio) {
		this.precio = precio;
	}

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public Usuario getPropietario() {
		return propietario;
	}

	public void setPropietario(Usuario propietario) {
		this.propietario = propietario;
	}

	public Compra getCompra() {
		return compra;
	}

	public void setCompra(Compra compra) {
		this.compra = compra;
	}

}
