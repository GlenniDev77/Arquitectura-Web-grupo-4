package pe.edu.upc.proyectoarquiwebjorge.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.proyectoarquiwebjorge.dtos.RolDTO;
import pe.edu.upc.proyectoarquiwebjorge.entities.Rol;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IRolService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/roles")
public class RolController {

    @Autowired
    private IRolService rS;

    @GetMapping
    public List<RolDTO> list() {
        return this.rS.list().stream().map(y -> {
            ModelMapper mapper = new ModelMapper();
            return (RolDTO)mapper.map(y, RolDTO.class);
        }).collect(Collectors.toList());
    }

     /*
    @PostMapping
    public void insert(@RequestBody RolDTO dto) {
        ModelMapper mapper = new ModelMapper();
        Rol d=mapper.map(dto,Rol.class);
        rS.insert(d);
    }
    */

     @PostMapping
     public ResponseEntity<String> insert(@RequestBody RolDTO dto) {
         ModelMapper mapper = new ModelMapper();
         Rol d = mapper.map(dto, Rol.class);
         rS.insert(d);

         return ResponseEntity.status(HttpStatus.CREATED)
                 .body("Rol [ " + dto.getNombre_rol()+ " ] registrado correctamente ");
     }

    @GetMapping("/{id}")
    public ResponseEntity<?> listarRolPorId(@PathVariable("id") Integer id) {
        Rol dev = rS.listIdRol(id);
        if (dev == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No existe un rol con el ID: " + id);
        }
        ModelMapper m = new ModelMapper();
        RolDTO dto = m.map(dev, RolDTO.class);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarRol(@PathVariable("id") Integer id) {
        Rol d = rS.listIdRol(id);
        if (d == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No existe un rol con el ID: " + id);
        }
        rS.deleteRol(id);
        return ResponseEntity.ok("Rol con ID " + id + " eliminado correctamente.");
    }

    @PutMapping
    public ResponseEntity<String> modificar(@RequestBody RolDTO dto) {
        ModelMapper m = new ModelMapper();
        Rol rol = m.map(dto, Rol.class);

        // Validación de existencia
        Rol existente = rS.listIdRol(rol.getId_rol());
        if (existente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se puede modificar. No existe un rol con el ID: " + rol.getId_rol());
        }

        // Actualización si pasa validaciones
        rS.updateRol(rol);
        return ResponseEntity.ok("Rol con ID " + rol.getId_rol() + " modificado correctamente.");
    }

    @GetMapping("/busquedas")
    public ResponseEntity<?> buscar(@RequestParam String t) {
        List<Rol> roles = rS.buscarPorRol(t);

        if (roles.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontraron roles del tipo: " + t);
        }

        List<RolDTO> listaDTO = roles.stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, RolDTO.class);
        }).collect(Collectors.toList());

        return ResponseEntity.ok(listaDTO);
    }
}
