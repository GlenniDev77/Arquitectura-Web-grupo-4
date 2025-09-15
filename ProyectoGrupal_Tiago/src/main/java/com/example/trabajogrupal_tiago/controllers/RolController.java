package com.example.trabajogrupal_tiago.controllers;

import com.example.trabajogrupal_tiago.dtos.RolDTO;
import com.example.trabajogrupal_tiago.entities.Rol;
import com.example.trabajogrupal_tiago.servicesinterfaces.IRolService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/Rols")
public class RolController {
    @Autowired
    private IRolService rolS;

    @GetMapping
    public List<RolDTO> listar(){
        return rolS.list().stream().map(y->{
            ModelMapper m = new ModelMapper();
            return m.map(y,RolDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping
    public void insertar(@RequestBody RolDTO dto)
    {
        ModelMapper m = new ModelMapper();
        Rol r=m.map(dto, Rol.class);
        rolS.insert(r);
    }

    @GetMapping("/{id}") //(para obtener un recurso)
    public ResponseEntity<?> listarId(@PathVariable("id") Integer id) {
        Rol dev = rolS.listId(id);
        if (dev == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No existe un registro con el ID: " + id);
        }
        ModelMapper m = new ModelMapper();
        RolDTO dto = m.map(dev, RolDTO.class);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable("id") Integer id) {
        Rol d = rolS.listId(id);
        if (d == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No existe un registro con el ID: " + id);
        }
        rolS.delete(id);
        return ResponseEntity.ok("Registro con ID " + id + " eliminado correctamente.");
    }
}
