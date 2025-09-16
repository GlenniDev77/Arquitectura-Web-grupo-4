package pe.edu.upc.proyectoarquiwebjorge.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.proyectoarquiwebjorge.dtos.DelitoDTO;
import pe.edu.upc.proyectoarquiwebjorge.dtos.ReseniaDTOList;
import pe.edu.upc.proyectoarquiwebjorge.dtos.RolDTO;
import pe.edu.upc.proyectoarquiwebjorge.entities.Delito;
import pe.edu.upc.proyectoarquiwebjorge.entities.Resenia;
import pe.edu.upc.proyectoarquiwebjorge.entities.Rol;
import pe.edu.upc.proyectoarquiwebjorge.entities.Zona;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IDelitoService;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IZonaService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/delitos")
public class DelitoController {
    @Autowired
    private IDelitoService dS;

    @Autowired
    private IZonaService zS;

    @GetMapping
    public List<DelitoDTO> list() {
        return this.dS.list().stream().map(y -> {
            ModelMapper mapper = new ModelMapper();
            return (DelitoDTO)mapper.map(y, DelitoDTO.class);
        }).collect(Collectors.toList());
    }
    

    @PostMapping
    public ResponseEntity<String> insert(@RequestBody DelitoDTO dto) {
        ModelMapper mapper = new ModelMapper();
        Delito d = mapper.map(dto, Delito.class);
        dS.insert(d);

        Zona z = zS.listById(dto.getZona().getIdZona());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Delito de tipo [ " + dto.getTipo_delito() + " ] situado en [ "
                        + z.getNombre() +  " ] registrado correctamente ");
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> listarDelitoPorId(@PathVariable("id") Integer id) {
        Delito res = dS.listIdDelito(id);
        if (res == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No existe un delito con el ID: " + id);
        }
        ModelMapper m = new ModelMapper();
        DelitoDTO dto = m.map(res, DelitoDTO.class);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarDelito(@PathVariable("id") Integer id) {
        Delito u = dS.listIdDelito(id);
        if (u == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No existe un delito con el ID: " + id);
        }
        dS.deleteDelito(id);
        return ResponseEntity.ok("Delito con ID " + id + " eliminado correctamente.");
    }

}
