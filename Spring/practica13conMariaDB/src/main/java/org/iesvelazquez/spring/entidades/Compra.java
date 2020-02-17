package org.iesvelazquez.spring.entidades;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
//para que funcionen el @CreatedDate
@EntityListeners(AuditingEntityListener.class)
public class Compra {

	@Id
	@GeneratedValue
	private long id;

	@CreatedDate
	@Temporal(TemporalType.TIMESTAMP)
	private Date fechaCompra;

	// varias compras pueden ser de un propietario
	@ManyToOne
	private Usuario propietario;

	public Compra() {
	}

	public Compra(Usuario propietario) {
		super();
		this.propietario = propietario;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getFechaCompra() {
		return fechaCompra;
	}

	public void setFechaCompra(Date fechaCompra) {
		this.fechaCompra = fechaCompra;
	}

	public Usuario getPropietario() {
		return propietario;
	}

	public void setPropietario(Usuario propietario) {
		this.propietario = propietario;
	}

}
