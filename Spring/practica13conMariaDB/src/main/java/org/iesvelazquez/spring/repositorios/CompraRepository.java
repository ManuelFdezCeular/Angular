package org.iesvelazquez.spring.repositorios;

import java.util.List;

import org.iesvelazquez.spring.entidades.Compra;
import org.iesvelazquez.spring.entidades.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompraRepository extends JpaRepository<Compra, Long> {

	// todas las compras de un usuario
	List<Compra> findByPropietario(Usuario propietario);

}
