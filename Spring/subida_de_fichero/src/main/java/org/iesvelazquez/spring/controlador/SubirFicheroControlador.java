package org.iesvelazquez.spring.controlador;

import java.io.IOException;

import org.iesvelazquez.spring.servicio.ServicioSubirFichero;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class SubirFicheroControlador {
	
	@Autowired
	private ServicioSubirFichero uploadFileService;
	
	@GetMapping("/")
	public String index() {
		return "index";
	}
	
	@PostMapping("upload")
	public ResponseEntity<?> uploadFile(MultipartFile file){
		if(file.isEmpty()) {
			return new ResponseEntity<Object>("Seleccionar un archivo", HttpStatus.OK);
		}
		
		try {
			uploadFileService.saveFile(file);
		}catch (IOException e) {
			e.printStackTrace();
		}
		
		return new ResponseEntity<Object>("Archivo subido correctamente", HttpStatus.OK);
	}
}
