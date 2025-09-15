package com.example.trabajogrupal_tiago.controllers;

import com.example.trabajogrupal_tiago.dtos.UsuarioDTOGeneral;
import com.example.trabajogrupal_tiago.dtos.UsuarioDTOList;
import com.example.trabajogrupal_tiago.entities.Usuario;
import com.example.trabajogrupal_tiago.servicesinterfaces.IUsuarioService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/Usuario")
public class UsuarioController {
    @Autowired
    private IUsuarioService ususervice;

    @GetMapping
    public List<UsuarioDTOList> listar(){
        return ususervice.list().stream().map(y->{
            ModelMapper m = new ModelMapper();
            return m.map(y,UsuarioDTOList.class);
        }).collect(Collectors.toList());
    }

    @GetMapping("/admin")
    public List<UsuarioDTOGeneral> listarAdmin(){
        return ususervice.list().stream().map(y->{
            ModelMapper m = new ModelMapper();
            return m.map(y,UsuarioDTOGeneral.class);
        }).collect(Collectors.toList());
    }

    @PostMapping //otra opcion del insertar con mensajes pero dejando de usar void
    public ResponseEntity<String> insertar(@RequestBody UsuarioDTOGeneral dto) {
        try {
            ModelMapper m = new ModelMapper();
            Usuario d = m.map(dto, Usuario.class);
            ususervice.insert(d);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("Usuario registrado correctamente");
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("No se pudo registrar el usuario: " + e.getMessage());
        }
    }

    @GetMapping("/{id}") //para obtener un recurso
    public ResponseEntity<?> listarId(@PathVariable("id") Integer id) {
        Usuario dev = ususervice.listId(id);
        if (dev == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No existe un registro con el ID: " + id);
        }
        ModelMapper m = new ModelMapper();
        UsuarioDTOList dto = m.map(dev, UsuarioDTOList.class);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable("id") Integer id) {
        Usuario d = ususervice.listId(id);
        if (d == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No existe un registro con el ID: " + id);
        }
        ususervice.delete(id);
        return ResponseEntity.ok("Registro con ID " + id + " eliminado correctamente.");
    }
}
