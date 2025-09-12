package com.example.trabajogrupal_tiago.controllers;

import com.example.trabajogrupal_tiago.dtos.ZonaDTO;
import com.example.trabajogrupal_tiago.entities.Zona;
import com.example.trabajogrupal_tiago.servicesinterfaces.IZonaService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/Zonas")
public class ZonaController {
    @Autowired
    private IZonaService ds;

    @GetMapping
    public List<ZonaDTO>listar(){
        return ds.list().stream().map(y->{
            ModelMapper m = new ModelMapper();
            return m.map(y,ZonaDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping
    public void insertar(@RequestBody ZonaDTO dto)
    {
        ModelMapper m = new ModelMapper();
        Zona d=m.map(dto,Zona.class);
        ds.insert(d);
    }

    @GetMapping("/{id}") //(para obtener un recurso)
    public ResponseEntity<?> listarId(@PathVariable("id") Integer id) {
        Zona dev = ds.listId(id);
        if (dev == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No existe un registro con el ID: " + id);
        }
        ModelMapper m = new ModelMapper();
        ZonaDTO dto = m.map(dev, ZonaDTO.class);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable("id") Integer id) {
        Zona d = ds.listId(id);
        if (d == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No existe un registro con el ID: " + id);
        }
        ds.delete(id);
        return ResponseEntity.ok("Registro con ID " + id + " eliminado correctamente.");
    }

    /*@PutMapping
    public ResponseEntity<String> modificar(@RequestBody ZonaDTO dto) {
        ModelMapper m = new ModelMapper();
        Zona dev = m.map(dto, Zona.class);

        // Validación de existencia
        Zona existente = ds.listId(dev.getId_zona());
        if (existente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se puede modificar. No existe un registro con el ID: " + dev.getId_zona());
        }

        // Actualización si pasa validaciones
        ds.update(dev);
        return ResponseEntity.ok("Registro con ID " + dev.getId_zona() + " modificado correctamente.");
    }*/
}
