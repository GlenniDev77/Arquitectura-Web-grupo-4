package pe.edu.upc.proyectoarquiwebjorge.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.proyectoarquiwebjorge.dtos.ZonaDTO;
import pe.edu.upc.proyectoarquiwebjorge.entities.Zona;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IZonaService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/zonas")
public class ZonaController {

    @Autowired
    private IZonaService zS;

    @GetMapping
    public List<ZonaDTO> listar(){

        return zS.list().stream().map(y->{
            ModelMapper m = new ModelMapper();
            return m.map(y,ZonaDTO.class);
        }).collect(Collectors.toList());

    }

    @PostMapping
    public void insertar(@RequestBody ZonaDTO dto)
    {
        ModelMapper m = new ModelMapper();
        Zona d=m.map(dto,Zona.class);
        zS.insert(d);
    }
}
