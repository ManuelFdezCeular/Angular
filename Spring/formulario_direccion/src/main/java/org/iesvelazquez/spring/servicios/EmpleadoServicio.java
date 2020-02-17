package org.iesvelazquez.spring.servicios;

import java.util.ArrayList;
import java.util.List;
import org.iesvelazquez.spring.entidades.Empleado;
import org.springframework.stereotype.Service;

@Service
public class EmpleadoServicio {

	private List<Empleado>repositorio=new ArrayList<>();
	
	public Empleado add(Empleado e) {
		repositorio.add(e);
		return e;
	}
	
	public List<Empleado>findAll(){
		return repositorio;
	}
	
	public Empleado findById(long id) {
		Empleado result = null;
		boolean encontrado = false;
		int i = 0;
		while (!encontrado && i < repositorio.size()) {
			if (repositorio.get(i).getId() == id) {
				encontrado = true;
				result = repositorio.get(i);
			}
			else {
				i++;
			}
		}
		return result;
	}
	
	public Empleado edit(Empleado e) {
		boolean encontrado = false;
		int i = 0;
		while (!encontrado && i < repositorio.size()) {
			if (repositorio.get(i).getId() == e.getId()) {
				encontrado = true;
				repositorio.remove(i);
				repositorio.add(i, e);
			}
			else {
				i++;
			}
		}
		
		if (!encontrado) {
			repositorio.add(e);
		}
		return e;
	}
}