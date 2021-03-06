package org.iesvelazquez.spring.controlador;

import java.util.List;
import java.util.stream.Collectors;

import org.iesvelazquez.spring.dto.CreateProductoDTO;
import org.iesvelazquez.spring.dto.ProductoDTO;
import org.iesvelazquez.spring.dto.converter.ProductoDTOConverter;
import org.iesvelazquez.spring.modelo.Categoria;
import org.iesvelazquez.spring.modelo.CategoriaRepositorio;
import org.iesvelazquez.spring.modelo.Producto;
import org.iesvelazquez.spring.modelo.ProductoRepositorio;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins="*")
@RestController
@RequiredArgsConstructor
public class ProductoControlador {
	
	//con lombok no necesito inyectar el repositorio
	private final ProductoRepositorio productoRepositorio;
	private final CategoriaRepositorio categoriaRepositorio;
	private final ProductoDTOConverter productoDTOConverter;

	
	/**
	 * Obtenemos todos los ProductosDTO
	 * 
	 * @return 404 si no hay productos, 200 y lista de productos si hay uno o más
	 */
	@CrossOrigin(origins="*")
	@GetMapping("/producto")
	public ResponseEntity<?> obtenerTodos() {
		List<Producto> result = productoRepositorio.findAll();

		if (result.isEmpty()) {
			return ResponseEntity.notFound().build();
		} else {
			//return ResponseEntity.ok(result);
			//ahora lo que devolvemos es los productosDTO
			List<ProductoDTO> dtoList = result.stream().map(productoDTOConverter::convertToDto)
					.collect(Collectors.toList());
			return ResponseEntity.ok(dtoList);
		}
	}

	
	/**
	 * Obtenemos un producto en base a su ID
	 * 
	 * @param id
	 * @return 404 si no encuentra el producto, 200 y el producto si lo encuentra
	 */
	@GetMapping("/producto/{id}")
	public ResponseEntity<?> obtenerUno(@PathVariable Long id) {
		Producto result = productoRepositorio.findById(id).orElse(null);
		if (result == null)
			return ResponseEntity.notFound().build();
		else
			return ResponseEntity.ok(result);
	}
	
	/**
	 * Insertamos un nuevo producto utilizando CreateProductoDTO
	 * 
	 * @param nuevo
	 * @return 201 y el producto insertado
	 */
	@PostMapping("/producto")
	// public ResponseEntity<?> nuevoProducto(@RequestBody Producto nuevo) {
	public ResponseEntity<?> nuevoProducto(@RequestBody CreateProductoDTO nuevo) {
		// En este caso, para contrastar, lo hacemos manualmente
		
		// Este código sería más propio de un servicio. Lo implementamos aquí
		// por no hacer más complejo el ejercicio.
		Producto nuevoProducto = new Producto();
		nuevoProducto.setNombre(nuevo.getNombre());
		nuevoProducto.setPrecio(nuevo.getPrecio());
		Categoria categoria = categoriaRepositorio.findById(nuevo.getCategoriaId()).orElse(null);
		nuevoProducto.setCategoria(categoria);
		return ResponseEntity.status(HttpStatus.CREATED).body(productoRepositorio.save(nuevoProducto));
	}


	/**
	 * 
	 * @param editar
	 * @param id
	 * @return 200 Ok si la edición tiene éxito, 404 si no se encuentra el producto
	 */
	@PutMapping("/producto/{id}")
	public ResponseEntity<?> editarProducto(@RequestBody Producto editar, @PathVariable Long id) {

		return productoRepositorio.findById(id).map(p -> {
			p.setNombre(editar.getNombre());
			p.setPrecio(editar.getPrecio());
			return ResponseEntity.ok(productoRepositorio.save(p));
		}).orElseGet(() -> {
			return ResponseEntity.notFound().build();
		});
	}

	/**
	 * Borra un producto del catálogo en base a su id
	 * 
	 * @param id
	 * @return Código 204 sin contenido
	 */
	@DeleteMapping("/producto/{id}")
	public ResponseEntity<?> borrarProducto(@PathVariable Long id) {
		productoRepositorio.deleteById(id);
		return ResponseEntity.noContent().build();
	}
}

