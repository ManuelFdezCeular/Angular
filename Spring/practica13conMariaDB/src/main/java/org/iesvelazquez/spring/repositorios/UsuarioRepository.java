package org.iesvelazquez.spring.repositorios;

import org.iesvelazquez.spring.entidades.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	// busqueda por email que debe ser único
	Usuario findFirstByEmail(String email);

}
