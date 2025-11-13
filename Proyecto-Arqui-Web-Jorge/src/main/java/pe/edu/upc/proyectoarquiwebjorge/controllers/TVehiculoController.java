package pe.edu.upc.proyectoarquiwebjorge.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.proyectoarquiwebjorge.dtos.TVehiculoDTO;
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
    //@PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MODERADOR')")
    public List<TVehiculoDTO> list() {
        return this.vS.list().stream().map(y -> {
            ModelMapper mapper = new ModelMapper();
            return (TVehiculoDTO)mapper.map(y, TVehiculoDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping
    //@PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> insert(@RequestBody TVehiculoDTO dto) {
        ModelMapper mapper = new ModelMapper();
        TipoVehiculo d = mapper.map(dto, TipoVehiculo.class);
        vS.insert(d);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Vehiculo de tipo [ " + dto.getNombre_vehiculo()+ " ] registrado correctamente ");
    }

    @GetMapping("/{id}")
    //@PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MODERADOR')")
    public ResponseEntity<?> listarVehiculoPorId(@PathVariable("id") Integer id) {
        TipoVehiculo dev = vS.listIdVehiculo(id);
        if (dev == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No existe un vehiculo con el ID: " + id);
        }
        ModelMapper m = new ModelMapper();
        TVehiculoDTO dto = m.map(dev, TVehiculoDTO.class);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    //@PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> eliminarVehiculo(@PathVariable("id") Integer id) {
        TipoVehiculo d = vS.listIdVehiculo(id);
        if (d == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No existe un vehiculo con el ID: " + id);
        }
        vS.deleteVehiculo(id);
        return ResponseEntity.ok("Vehiculo con ID " + id + " eliminado correctamente.");
    }

    @PutMapping
    //@PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> modificar(@RequestBody TVehiculoDTO dto) {
        ModelMapper m = new ModelMapper();
        TipoVehiculo vehiculo = m.map(dto, TipoVehiculo.class);

        // Validación de existencia
        TipoVehiculo existente = vS.listIdVehiculo(vehiculo.getId_tipovehiculo());
        if (existente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se puede modificar. No existe un vehiculo con el ID: " + vehiculo.getId_tipovehiculo());
        }

        // Actualización si pasa validaciones
        vS.updateVehiculo(vehiculo);
        return ResponseEntity.ok("Vehiculo con ID " + vehiculo.getId_tipovehiculo() + " modificado correctamente.");
    }

    @GetMapping("/busquedas")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MODERADOR')")
    public ResponseEntity<?> buscar(@RequestParam String t) {
        List<TipoVehiculo> vehiculos = vS.buscarPorVehiculo(t);

        if (vehiculos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontraron vehiculos del tipo: " + t);
        }

        List<TVehiculoDTO> listaDTO = vehiculos.stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, TVehiculoDTO.class);
        }).collect(Collectors.toList());

        return ResponseEntity.ok(listaDTO);
    }
}
