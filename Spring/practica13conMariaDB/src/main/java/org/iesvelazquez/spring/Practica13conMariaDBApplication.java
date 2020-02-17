package org.iesvelazquez.spring;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.iesvelazquez.spring.entidades.Usuario;
import org.iesvelazquez.spring.entidades.Producto;
import org.iesvelazquez.spring.servicios.ProductoServicio;
import org.iesvelazquez.spring.servicios.UsuarioServicio;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Practica13conMariaDBApplication {

	public static void main(String[] args) {
		SpringApplication.run(Practica13conMariaDBApplication.class, args);
	}
	
	@Bean
	public CommandLineRunner initData(UsuarioServicio usuarioServicio, ProductoServicio productoServicio) {
		return args -> {

	Usuario usuario = new Usuario("Luis", "Solis García", null, "luis.solis@iesvelazquez.org", "luis");
	usuario = usuarioServicio.registrar(usuario);

	Usuario usuario2 = new Usuario("Antonio", "García Martín", null, "antonio.garcia@iesvelazquez.org", "antonio");
	usuario2 = usuarioServicio.registrar(usuario2);
			
	Usuario usuario3 = new Usuario("Paco", "Paco Baringo", null, "paco.baringo@iesvelazquez.org", "paco");
	usuario3 = usuarioServicio.registrar(usuario3);

			
	List<Producto> listado = Arrays.asList(new Producto("Bicicleta de montaña", 100.0f,
					"https://contents.mediadecathlon.com/p1638909/k$d30f4037a81fab1e807e725278b2718a/sq/Bicicleta+el+ctrica+de+monta+a+e+ST+900+gris.webp?f=1000x1000", usuario),
	new Producto("Golf GTI Serie 2", 2500.0f,
							"https://www.minicar.es/large/Volkswagen-Golf-GTi-G60-Serie-II-%281990%29-Norev-1%3A18-i22889.jpg",
							usuario),
	new Producto("Raqueta de tenis", 10.5f, "https://imgredirect.milanuncios.com/fg/2311/04/tenis/Raqueta-tenis-de-segunda-mano-en-Madrid-231104755_1.jpg?VersionId=T9dPhTf.3ZWiAFjnB7CvGKsvbdfPLHht", usuario),
	new Producto("Xbox One X", 425.0f, "https://images.vibbo.com/635x476/860/86038583196.jpg", usuario2),
	new Producto("Trípode flexible", 10.0f, "https://images.vibbo.com/635x476/860/86074256163.jpg", usuario2),
	new Producto("Sony a7 R", 2500.0f, "https://i.blogs.es/a51f17/sonya7/1366_2000.jpg", usuario3),
	new Producto("Iphone 7 128 GB", 350.0f, "https://store.storeimages.cdn-apple.com/4667/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone7/rosegold/iphone7-rosegold-select-2016?wid=470&hei=556&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1472430205982", usuario2));
					
	listado.forEach(productoServicio::insertar);
	
	};
	
	}

}
