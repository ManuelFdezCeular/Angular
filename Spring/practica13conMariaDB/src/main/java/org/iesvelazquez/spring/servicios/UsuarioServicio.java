package org.iesvelazquez.spring.servicios;

import org.iesvelazquez.spring.entidades.Usuario;
import org.iesvelazquez.spring.repositorios.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioServicio {

	@Autowired
	UsuarioRepository repositorio;

	// cuando guardemos un usuario en la BD se guarda encriptada
	@Autowired
	BCryptPasswordEncoder passwordEncoder;

	public Usuario registrar(Usuario u) {
		// antes de insertar la contraseña se encripta
		u.setPassword(passwordEncoder.encode(u.getPassword()));
		return repositorio.save(u);
	}

	public Usuario findById(long id) {
		return repositorio.findById(id).orElse(null);
	}

	public Usuario buscarPorEmail(String email) {
		return repositorio.findFirstByEmail(email);
	}

}
