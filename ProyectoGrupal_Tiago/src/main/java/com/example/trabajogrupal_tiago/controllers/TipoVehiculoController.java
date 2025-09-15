package com.example.trabajogrupal_tiago.controllers;
import com.example.trabajogrupal_tiago.dtos.TIpoVehiculoDTO;
import com.example.trabajogrupal_tiago.entities.TipoVehiculo;
import com.example.trabajogrupal_tiago.servicesinterfaces.ITipoVehiculoService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/Tipovehiculo")
public class TipoVehiculoController {
    @Autowired
    private ITipoVehiculoService tvser;

    @GetMapping
    public List<TIpoVehiculoDTO> listar(){
        return tvser.list().stream().map(y->{
            ModelMapper m = new ModelMapper();
            return m.map(y,TIpoVehiculoDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping
    public void insertar(@RequestBody TIpoVehiculoDTO dto)
    {
        ModelMapper m = new ModelMapper();
        TipoVehiculo r=m.map(dto, TipoVehiculo.class);
        tvser.insert(r);
    }

    @GetMapping("/{id}") //(para obtener un recurso)
    public ResponseEntity<?> listarId(@PathVariable("id") Integer id) {
        TipoVehiculo dev = tvser.listId(id);
        if (dev == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No existe un registro con el ID: " + id);
        }
        ModelMapper m = new ModelMapper();
        TIpoVehiculoDTO dto = m.map(dev, TIpoVehiculoDTO.class);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable("id") Integer id) {
        TipoVehiculo d = tvser.listId(id);
        if (d == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No existe un registro con el ID: " + id);
        }
        tvser.delete(id);
        return ResponseEntity.ok("Registro con ID " + id + " eliminado correctamente.");
    }
}
