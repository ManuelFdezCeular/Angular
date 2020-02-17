package org.iesvelazquez.spring.controladores;

import java.util.List;

import org.iesvelazquez.spring.entidades.Producto;
import org.iesvelazquez.spring.entidades.Usuario;
import org.iesvelazquez.spring.servicios.ProductoServicio;
import org.iesvelazquez.spring.servicios.UsuarioServicio;
import org.iesvelazquez.spring.upload.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

@Controller
//como esta en la zona privada lo ponemos en
@RequestMapping("/app")
public class ProductosController {

	// los servicios de producto y usuario y un usuario que sera el porpietario de
	// determinados productos
	@Autowired
	ProductoServicio productoServicio;

	@Autowired
	UsuarioServicio usuarioServicio;

	@Autowired
	StorageService storageService;

	private Usuario usuario;

	// productos de un determinado usuario
	@ModelAttribute("misproductos")
	public List<Producto> misProductos() {
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		usuario = usuarioServicio.buscarPorEmail(email);
		return productoServicio.productosDeUnPropietario(usuario);
	}

	// tambien puedo hacer consultas de los productos que tengo
	@GetMapping("/misproductos")
	public String list(Model model, @RequestParam(name = "q", required = false) String query) {
		if (query != null)
			model.addAttribute("misproductos", productoServicio.buscarMisProductos(query, usuario));

		return "app/producto/lista";
	}

	// eliminar un producto mediante el id
	@GetMapping("/misproductos/{id}/eliminar")
	public String eliminar(@PathVariable Long id) {
		Producto p = productoServicio.findById(id);
		if (p.getCompra() == null)
			productoServicio.borrar(p);
		return "redirect:/app/misproductos";
	}

	// crear un nuevo producto nos lleva al formulario donde recojo los datos
	@GetMapping("/producto/nuevo")
	public String nuevoProductoForm(Model model) {
		model.addAttribute("producto", new Producto());
		return "app/producto/form";
	}

	// recojo los datos del formulario y le asocio un usuario y lo grabo

	/*
	 * @PostMapping("/producto/nuevo/submit") public String
	 * nuevoProductoSubmit(@ModelAttribute Producto producto) {
	 * producto.setPropietario(usuario); productoServicio.insertar(producto); return
	 * "redirect:/app/misproductos"; }
	 */

	@PostMapping("/producto/nuevo/submit")
	public String nuevoProductoSubmit(@ModelAttribute Producto producto, @RequestParam("file") MultipartFile file) {
		if (!file.isEmpty()) {
			String imagen = storageService.store(file);
			producto.setImagen(MvcUriComponentsBuilder.fromMethodName(FilesController.class, "serveFile", imagen)
					.build().toUriString());
		}
		producto.setPropietario(usuario);
		productoServicio.insertar(producto);
		return "redirect:/app/misproductos";
	}

}
