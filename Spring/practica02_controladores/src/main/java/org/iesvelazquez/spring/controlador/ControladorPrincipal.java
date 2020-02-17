package org.iesvelazquez.spring.controlador;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ControladorPrincipal {
	@GetMapping("/")
	public String Bienvenido(@RequestParam(name="name", required=false, defaultValue="Mundo")String name, Model model) {
		model.addAttribute("name", name);
		return "index";
	}
//para pasar datos se hace con la clase Model 	
	@GetMapping("/que")
	public String QueHacemos(Model model) {
		model.addAttribute("mensaje", "Estamos en la pagina de que hacemos enviado como dato desde el controlador");
		return "que";
	}
	@GetMapping("/contacto/{numero}/{nombreContacto}")
	public String Contacto(@PathVariable String numero, @PathVariable String nombreContacto, Model model) {
		model.addAttribute("numero1", numero);
		model.addAttribute("nombreContacto1", nombreContacto);
		return "contacto";
	}
}