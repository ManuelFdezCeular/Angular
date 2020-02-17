package org.iesvelazquez.spring.controlador;

import org.iesvelazquez.spring.entidades.Empleado;
import org.iesvelazquez.spring.servicios.EmpleadoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class EmpleadoControlador {
	
	@Autowired
	public EmpleadoServicio servicio;
	
	@GetMapping({"/", "/empleado/list"})
	public String listado(Model model) {
		model.addAttribute("listaEmpleados", servicio.findAll());
		return "list";
	}
	
	@GetMapping("/empleado/new")
	public String nuevoEmpleadoForm(Model model) {
		model.addAttribute("empleadoForm", new Empleado());
		return "form";
	}
	
	@PostMapping("/empleado/new/submit")
	public String nuevoEmpleadoSubmit(@ModelAttribute("empleadoForm") Empleado nuevoEmpleado) {
		servicio.add(nuevoEmpleado);
		return "redirect:/empleado/list";
	}
	
}
