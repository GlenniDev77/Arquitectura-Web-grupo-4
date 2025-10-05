package pe.edu.upc.proyectoarquiwebjorge.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.proyectoarquiwebjorge.dtos.RolDTO;
import pe.edu.upc.proyectoarquiwebjorge.dtos.UsuarioDTOInsert;
import pe.edu.upc.proyectoarquiwebjorge.dtos.ZonaDTO;
import pe.edu.upc.proyectoarquiwebjorge.entities.Rol;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;
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
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MODERADOR')")
    public List<ZonaDTO> listar(){
        return zS.list().stream().map(y->{
            ModelMapper m = new ModelMapper();
            return m.map(y,ZonaDTO.class);
        }).collect(Collectors.toList());
    }


    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> insert(@RequestBody ZonaDTO dto) {
        ModelMapper mapper = new ModelMapper();
        Zona d = mapper.map(dto, Zona.class);
        zS.insert(d);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Zona [ " + dto.getNombre()+ " ] en el distrito de [" +
                        dto.getDistrito() + "] registrado correctamente ");
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MODERADOR')")
    public ResponseEntity<?> listarId(@PathVariable("id") Integer id) {
        Zona zon = zS.listById(id);
        if (zon == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No existe zona con el ID: " + id);
        }
        ModelMapper m = new ModelMapper();
        ZonaDTO dto = m.map(zon, ZonaDTO.class);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> eliminar(@PathVariable("id") Integer id) {
        Zona d = zS.listById(id);
        if (d == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No existe zona con el ID: " + id);
        }
        zS.delete(id);
        return ResponseEntity.ok("Zona con ID " + id + " eliminado correctamente.");
    }

    @PutMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> modificar(@RequestBody ZonaDTO dto) {
        ModelMapper m = new ModelMapper();
        Zona zon = m.map(dto, Zona.class);

        // Validación de existencia
        Zona existente = zS.listById(zon.getIdZona());
        if (existente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se puede modificar. No existe una zona con el ID: " + zon.getIdZona());
        }

        // Actualización si pasa validaciones
        zS.update(zon);
        return ResponseEntity.ok("Zona con ID " + zon.getIdZona() + " modificado correctamente.");
    }

    @GetMapping("/busquedas")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> buscar(@RequestParam String t) {
        List<Zona> zonas = zS.buscarPorNombreZona(t);

        if (zonas.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontraron zonas con nombre: " + t);
        }

        List<ZonaDTO> listaDTO = zonas.stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, ZonaDTO.class);
        }).collect(Collectors.toList());

        return ResponseEntity.ok(listaDTO);
    }
}
