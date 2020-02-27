package org.iesvelazquez.rest;

import org.iesvelazquez.rest.model.User;
import org.iesvelazquez.rest.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class Application {

  /**
   * The entry point of application.
   *
   * @param args the input arguments
   */
  public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

 //hay que hacer un constructor solo con los campos necesarios sin el id y las fechas que se general automaticamente 
  @Bean
  public CommandLineRunner demoData(UserRepository repo) {
      return args -> { 
    	  User user1=new User("Indi","Jones","indi@jones.com", "Paco","Pepe");
    	  User user2=new User("Maria","Dolores","maria@dolores.com", "Paco","Pepe");
    	  User user3=new User("Luis","David","Lui@David.com", "Paco","Pepe");
    	  User user4=new User("Alvaro","Rodriguez","Alvaro@Rodriguez.com", "Paco","Pepe");
          repo.save(user1);
          repo.save(user2);
          repo.save(user3);
          repo.save(user4);
      };
  }
}
