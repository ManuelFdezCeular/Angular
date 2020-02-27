
package org.iesvelazquez.rest.controller;

import org.iesvelazquez.rest.model.User;
import org.iesvelazquez.rest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	/**
	 * Get all users list.
	 *
	 * @return the list
	 */
	@GetMapping("/users")
	public List<User> obtenerTodos() {
		// completa el código necesario
		return userRepository.findAll();
	}

	/**
	 * Gets users by id.
	 *
	 * @param userId the user id
	 * @return the users by id
	 */

	@GetMapping("/users/{id}")
	public User obtenerUno(@PathVariable(value = "id") Long userId) {
		// completa el código necesario
		return userRepository.findById(userId).orElse(null);
	}

	/**
	 * Create user user.
	 *
	 * @param user the user
	 * @return the user
	 */
	@PostMapping("/users")
	public User nuevoUsuario(@Valid @RequestBody User user) {
		// completa el código necesario
		return userRepository.save(user);
	}

	/**
	 * Update user response entity.
	 * 
	 * @param userId      the user id
	 * @param userDetails the user details
	 */
	@PutMapping("/users/{id}")
	public User editarUsuario(@PathVariable(value = "id") Long userId, @Valid @RequestBody User userDetails) {
		// completa el código necesario
		if (userRepository.existsById(userId)) {
			userDetails.setId(userId);
			userDetails.setFirstName(userDetails.getFirstName());
			userDetails.setLastName(userDetails.getLastName());
			userDetails.setEmail(userDetails.getEmail());
			return userRepository.save(userDetails);
		} else {
			return null;
		}
	}

	/**
	 * Delete user.
	 *
	 * @param userId the user id
	 */
	@DeleteMapping("/users/{id}")
	public User borrarUsuario(@PathVariable(value = "id") Long userId) {
		// completa el código necesario
		if (userRepository.existsById(userId)) {
			User result = userRepository.findById(userId).get();
			userRepository.deleteById(userId);
			return result;
		} else
			return null;
	}
}
