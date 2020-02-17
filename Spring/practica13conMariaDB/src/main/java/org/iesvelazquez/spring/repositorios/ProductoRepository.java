package org.iesvelazquez.spring.repositorios;

import java.util.List;

import org.iesvelazquez.spring.entidades.Compra;
import org.iesvelazquez.spring.entidades.Producto;
import org.iesvelazquez.spring.entidades.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

	// buscar todos los producos de un propietario
	List<Producto> findByPropietario(Usuario propietario);

	// busca todos los productos comprados
	List<Producto> findByCompra(Compra compra);

	// busca todos los productos que no estan comprados
	List<Producto> findByCompraIsNull();

	// busca productos por nombre que no esten comprados
	List<Producto> findByNombreContainsIgnoreCaseAndCompraIsNull(String nombre);

	// busca productos por nombre coprados por un usuario
	List<Producto> findByNombreContainsIgnoreCaseAndPropietario(String nombre, Usuario propietario);

}
