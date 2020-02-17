package org.iesvelazquez.spring.repositorios;
import org.iesvelazquez.spring.entidades.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpleadoRepositorio extends JpaRepository<Empleado,Long>{
	
}
