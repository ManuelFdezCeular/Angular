package org.iesvelazquez.spring.servicios;

import java.util.List;

import org.iesvelazquez.spring.entidades.Empleado;
import org.iesvelazquez.spring.repositorios.EmpleadoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

@Primary
@Service("empleadoServicioDB")
public class EmpleadoServiceDB implements EmpleadoServicio{
	@Autowired
	private EmpleadoRepositorio repositorio;
	@Override
	public Empleado add(Empleado e) {
		return repositorio.save(e);
	}
	
	@Override
	public List<Empleado> findAll(){
		return (List<Empleado>) repositorio.findAll();
	}
	
	@Override
	public Empleado findById(long id) {
		return repositorio.findById(id).orElse(null);
	}
	
	@Override
	public Empleado edit(Empleado e) {
		return repositorio.save(e);
	}
	
	public List<Empleado> buscador(String cadena){
		return repositorio.findByNombreContainsIgnoreCaseOrEmailContainsIgnoreCaseOrTelefonoContainsIgnoreCase(cadena, cadena, cadena);
		//return repositorio.encuentraPorNombreEmailOTelefono(cadena.toLowerCase());
		//return repositorio.encuentraPorNombreEmailOTelefonoNativa(cadena.toLowerCase());
	}
}	
