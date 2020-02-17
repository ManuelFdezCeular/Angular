package org.iesvelazquez.spring.repositorios;
import java.util.List;

import org.iesvelazquez.spring.entidades.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface EmpleadoRepositorio extends JpaRepository<Empleado,Long>{
	
	List<Empleado>
	findByNombreContainsIgnoreCaseOrEmailContainsIgnoreCaseOrTelefonoContainsIgnoreCase(String nombre, String email, String telefono);
	
	/*@Query("select e from Empleado e where lower(e.nombre) like %?1% or lower(e.email) like %?1% or lower(e.telefono) like %?1%")
	List<Empleado>encuentraPorNombreEmailOTelefono(String cadena);
	@Query(value="SELECT * FROM EMPLEADO WHERE LOWER(NOMBRE) LIKE CONCAT('%',?1,'%') OR LOWER(EMAIL) LIKE CONCAT('%',?1,'%') OR LOWER(TELEFONO) LIKE CONCAT('%',?1,'%')", nativeQuery = true)
	List<Empleado> encuentraPorNombreEmailOTelefonoNativa(String cadena);*/
}
