package org.iesvelazquez.spring.servicios;

import java.util.List;
import java.util.ArrayList;

import org.iesvelazquez.spring.entidades.Empleado;
import org.springframework.stereotype.Service;

@Service
public class EmpleadoServicio {
	
	private List<Empleado> repositorio = new ArrayList<>();
	
	public Empleado add(Empleado e) {
		repositorio.add(e);
		return e;
	}
	
	public List<Empleado> findAll(){
		return repositorio;
	}
	
}
