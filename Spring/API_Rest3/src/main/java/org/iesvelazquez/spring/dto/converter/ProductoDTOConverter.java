package org.iesvelazquez.spring.dto.converter;

import org.iesvelazquez.spring.dto.ProductoDTO;
import org.iesvelazquez.spring.modelo.Producto;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ProductoDTOConverter {
	
	private final ModelMapper modelMapper;
	
	//con ModelMapper convierto un producto en un productoDTO utilizando el metodo map
	public ProductoDTO convertToDto(Producto producto) {
		return modelMapper.map(producto, ProductoDTO.class);
		
	}

}

