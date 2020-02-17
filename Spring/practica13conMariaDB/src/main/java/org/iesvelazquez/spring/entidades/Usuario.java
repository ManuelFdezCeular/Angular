package org.iesvelazquez.spring.entidades;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
//para que funcionen el @CreatedDate
@EntityListeners(AuditingEntityListener.class)
public class Usuario {

	@Id
	@GeneratedValue
	private long id;

	private String nombre;
	private String apellidos;
	private String avatar;

	@CreatedDate
	@Temporal(TemporalType.TIMESTAMP)
	private Date fechaAlta;

	private String email;
	private String password;

	public Usuario() {
	}

	public Usuario(String nombre, String apellidos, String avatar, String email, String password) {
		super();
		this.nombre = nombre;
		this.apellidos = apellidos;
		this.avatar = avatar;
		this.email = email;
		this.password = password;
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

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public Date getFechaAlta() {
		return fechaAlta;
	}

	public void setFechaAlta(Date fechaAlta) {
		this.fechaAlta = fechaAlta;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
