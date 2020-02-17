package org.iesvelazquez.spring.servicios;

import java.util.List;

import org.iesvelazquez.spring.entidades.Empleado;

public interface EmpleadoServicio{
	public Empleado add(Empleado e);
	public List<Empleado> findAll();
	public Empleado findById(long id);
	public Empleado edit(Empleado e);
}
