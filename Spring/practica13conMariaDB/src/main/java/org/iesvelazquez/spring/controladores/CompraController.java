package org.iesvelazquez.spring.controladores;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.iesvelazquez.spring.entidades.Usuario;
import org.iesvelazquez.spring.entidades.Compra;
import org.iesvelazquez.spring.entidades.Producto;
import org.iesvelazquez.spring.servicios.CompraServicio;
import org.iesvelazquez.spring.servicios.ProductoServicio;
import org.iesvelazquez.spring.servicios.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
//como esta en la zona privada lo ponemos en
@RequestMapping("/app")
public class CompraController {

	// necesitamos los tres servicios para poder hacer la compra, la sesion para
	// poder guardar el usuario logeado
	@Autowired
	CompraServicio compraServicio;

	@Autowired
	ProductoServicio productoServicio;

	@Autowired
	UsuarioServicio usuarioServicio;

	@Autowired
	HttpSession session;

	private Usuario usuario;

	// con ModelAttibute ponemos en el carrito el resultado de este metodo es un
	// listado de los id de los productos
	@ModelAttribute("carrito")
	public List<Producto> productosCarrito() {
		List<Long> contenido = (List<Long>) session.getAttribute("carrito");
		return (contenido == null) ? null : productoServicio.variosPorId(contenido);
	}

	// El precio de todos los productos del carrito
	@ModelAttribute("total_carrito")
	public Double totalCarrito() {
		List<Producto> productosCarrito = productosCarrito();
		if (productosCarrito != null)
			return productosCarrito.stream().mapToDouble(p -> p.getPrecio()).sum();
		return 0.0;
	}

	// En mis compras tengo los productos que he comprado en funcion del email.
	@ModelAttribute("mis_compras")
	public List<Compra> misCompras() {
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		usuario = usuarioServicio.buscarPorEmail(email);
		return compraServicio.porPropietario(usuario);
	}

	// ver el carrito, dirijo a la plantilla
	@GetMapping("/carrito")
	public String verCarrito(Model model) {
		return "app/compra/carrito";
	}

	// añadir un producto al carrito
	@GetMapping("/carrito/add/{id}")
	public String addCarrito(Model model, @PathVariable Long id) {
		List<Long> contenido = (List<Long>) session.getAttribute("carrito");
		if (contenido == null)
			contenido = new ArrayList<>();
		if (!contenido.contains(id))
			contenido.add(id);
		session.setAttribute("carrito", contenido);
		return "redirect:/app/carrito";
	}

	// eliminar un producto del carrito
	@GetMapping("/carrito/eliminar/{id}")
	public String borrarDeCarrito(Model model, @PathVariable Long id) {
		List<Long> contenido = (List<Long>) session.getAttribute("carrito");
		if (contenido == null)
			return "redirect:/public";
		contenido.remove(id);
		if (contenido.isEmpty())
			session.removeAttribute("carrito");
		else
			session.setAttribute("carrito", contenido);
		return "redirect:/app/carrito";

	}

	// finalización de la compra creando una compra con sus producto y el usuario
	@GetMapping("/carrito/finalizar")
	public String checkout() {
		List<Long> contenido = (List<Long>) session.getAttribute("carrito");
		if (contenido == null)
			return "redirect:/public";

		List<Producto> productos = productosCarrito();

		Compra c = compraServicio.insertar(new Compra(), usuario);

		productos.forEach(p -> compraServicio.addProductoCompra(p, c));
		session.removeAttribute("carrito");

		return "redirect:/app/compra/factura/" + c.getId();

	}

	// factura en base al id donde busca la compra y obtiene los id de los productos
	@GetMapping("/compra/factura/{id}")
	public String factura(Model model, @PathVariable Long id) {
		Compra c = compraServicio.buscarPorId(id);
		List<Producto> productos = productoServicio.productosDeUnaCompra(c);
		model.addAttribute("productos", productos);
		model.addAttribute("compra", c);
		model.addAttribute("total_compra", productos.stream().mapToDouble(p -> p.getPrecio()).sum());
		return "/app/compra/factura";
	}

	// mis compras nos lleva a la plantilla listado con los valores
	@GetMapping("/miscompras")
	public String verMisCompras(Model model) {
		return "/app/compra/listado";
	}

}
