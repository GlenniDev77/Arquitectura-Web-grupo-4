package pe.edu.upc.proyectoarquiwebjorge.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.proyectoarquiwebjorge.dtos.RolDTO;
import pe.edu.upc.proyectoarquiwebjorge.dtos.TVehiculoDTO;
import pe.edu.upc.proyectoarquiwebjorge.entities.Rol;
import pe.edu.upc.proyectoarquiwebjorge.entities.TipoVehiculo;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.ITipoVehiculoService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/tipovehiculo")
public class TVehiculoController {

    @Autowired
    private ITipoVehiculoService vS;

    @GetMapping
    public List<TVehiculoDTO> list() {
        return this.vS.list().stream().map(y -> {
            ModelMapper mapper = new ModelMapper();
            return (TVehiculoDTO)mapper.map(y, TVehiculoDTO.class);
        }).collect(Collectors.toList());
    }
    @PostMapping
    public void insert(@RequestBody TVehiculoDTO dto) {
        ModelMapper mapper = new ModelMapper();
        TipoVehiculo d=mapper.map(dto,TipoVehiculo.class);
        vS.insert(d);
    }
}
