package org.iesvelazquez.spring;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.iesvelazquez.spring.entidades.Empleado;
import org.iesvelazquez.spring.repositorios.EmpleadoRepositorio;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import io.netty.util.internal.ThreadLocalRandom;

@SpringBootApplication
public class Practica12Consultas {

	public static void main(String[] args) {
		SpringApplication.run(Practica12Consultas.class, args);
	}

	@Bean
	CommandLineRunner initData(EmpleadoRepositorio repositorio) {
		return (args) -> {
			List<String> nombres=Arrays.asList("Lucas", "Hugo", "Martín", "Daniel", "Pablo", 
					"Alejandro", "Mateo", "Adrián", "Álvaro", "Manuel", "Leo", "David",
					"Mario", "Diego", "Javier", "Luis", "Marcos", "Juan", "José",
					"Gonzalo", "Lucía", "Sofía", "María", "Martina", "Paula", "Julia",
					"Daniela", "Valeria", "Alba", "Emma", "Carla", "Sara", "Noa", "Carmen",
					"Claudia", "Valentina", "Alma", "Ana", "Luisa", "Marta");
			List<String> apellidos=Arrays.asList("García", "González", "López", "Rodríguez",
					"Martínez", "Sánchez", "Pérez", "Gómez", "Martín", "Saez", "Velasco",
					"Moya", "Soler", "Parra", "Bravo", "Rojas", "Romero", "Sosa", "Torres",
					"Álvarez", "Flores", "Molina", "Ortiz", "Silva", "Torres");
			
			Collections.shuffle(nombres);
			
			repositorio.saveAll(IntStream.rangeClosed(1,nombres.size()).mapToObj((i)->{
				String nombre = nombres.get(i-1);
				String apellido1 = apellidos.get(ThreadLocalRandom.current().nextInt(apellidos.size()));
				String apellido2 = apellidos.get(ThreadLocalRandom.current().nextInt(apellidos.size()));
				return new Empleado(String.format("%s %s %s", nombre, apellido1, apellido2),
						String.format("%s.%s@iesvelazquez.org", nombre.toLowerCase(), apellido1.toLowerCase()), "954777777");
			}).collect(Collectors.toList()));
		};
	}
}