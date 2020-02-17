package org.iesvelazquez.spring;

import java.util.Arrays;

import org.iesvelazquez.spring.entidades.Empleado;
import org.iesvelazquez.spring.repositorios.EmpleadoRepositorio;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Practica11Hibernate {

	public static void main(String[] args) {
		SpringApplication.run(Practica11Hibernate.class, args);
	}

	@Bean
	CommandLineRunner initData(EmpleadoRepositorio repositorio) {
		return (args) -> {
			repositorio.saveAll(
					Arrays.asList(new Empleado("Alberto García", "alberto.garcia@iesvelazquez.org", "954777777"),
							new Empleado("Antonio Pérez", "antonio.perez@iesvelazquez.org", "955898989"),
							new Empleado("Sonia Rico", "sonia.rico@iesvelazquez.org", "956743321")));
		};
	}

}