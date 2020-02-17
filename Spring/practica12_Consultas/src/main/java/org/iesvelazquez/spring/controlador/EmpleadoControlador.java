package org.iesvelazquez.spring.controlador;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.iesvelazquez.spring.entidades.Empleado;
import org.iesvelazquez.spring.servicios.EmpleadoServiceDB;
import org.iesvelazquez.spring.servicios.EmpleadoServicio;
//import org.iesvelazquez.spring.servicios.EmpleadoServicioMemoria;
import org.iesvelazquez.spring.storage.StorageProperties;
import org.iesvelazquez.spring.storage.StorageService;

@EnableConfigurationProperties(StorageProperties.class)
@Controller
public class EmpleadoControlador {
	
	
	
	@Autowired
		public EmpleadoServiceDB servicioDB;

	/*@Autowired
	public EmpleadoServicioMemoria servicio;*/

	@Autowired
	private StorageService storageService;

	@GetMapping({ "/", "/empleado/list" })
	public String listado(Model model, @RequestParam(name="q", required=false) String query) {
		List<Empleado> resultado = (query == null) ? servicioDB.findAll():servicioDB.buscador(query);
		model.addAttribute("listaEmpleados", resultado);
		return "list";
	}

	@GetMapping("/empleado/new")
	public String nuevoEmpleadoForm(Model model) {
		model.addAttribute("empleadoForm", new Empleado());
		return "form";
	}

	@PostMapping("/empleado/new/submit")
	public String nuevoEmpleadoSubmit(@Valid @ModelAttribute("empleadoForm") Empleado nuevoEmpleado,
			@RequestParam("file") MultipartFile file) {
		if (!file.isEmpty()) {
			String avatar = storageService.store(file, nuevoEmpleado.getId());
			nuevoEmpleado.setImagen(MvcUriComponentsBuilder
					.fromMethodName(EmpleadoControlador.class, "serveFile", avatar).build().toUriString());
		}
		servicioDB.add(nuevoEmpleado);
		return "redirect:/empleado/list";
	}

	@GetMapping("/empleado/edit/{id}")
	public String editarEmpleadoForm(@PathVariable long id, Model model) {
		Empleado empleado = servicioDB.findById(id);
		if (empleado != null) {
			model.addAttribute("empleadoForm", empleado);
			return "form";
		} else {
			return "redirect:/empleado/new";
		}
	}

	@GetMapping("/files/{filename:.+}")
	@ResponseBody
	public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
		Resource file = (Resource) storageService.loadAsResource(filename);
		return ResponseEntity.ok().body(file);
	}
}
