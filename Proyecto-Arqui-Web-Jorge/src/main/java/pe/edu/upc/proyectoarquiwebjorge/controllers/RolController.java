package pe.edu.upc.proyectoarquiwebjorge.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.edu.upc.proyectoarquiwebjorge.dtos.RolDTO;
import pe.edu.upc.proyectoarquiwebjorge.entities.Rol;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IRolService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/roles")

public class RolController {
/*
    @Autowired
    private IRolService rS;

    @GetMapping
    public List<RolDTO> list() {
        return (List)this.rS.list().stream().map(y -> {
            ModelMapper mapper = new ModelMapper();
            return (RolDTO)mapper.map(y, RolDTO.class);
        }).collect(Collectors.toList());
    }

 */
}
