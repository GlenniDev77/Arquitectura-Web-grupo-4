package pe.edu.upc.proyectoarquiwebjorge.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.proyectoarquiwebjorge.dtos.RolDTOComplete;
import pe.edu.upc.proyectoarquiwebjorge.dtos.RolDTOList;
import pe.edu.upc.proyectoarquiwebjorge.dtos.RolDTOInsert;
import pe.edu.upc.proyectoarquiwebjorge.entities.Rol;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IRolService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/roles")
public class RolController {

    @Autowired
    private IRolService rS;

    @GetMapping
    //@PreAuthorize("hasAuthority('ADMIN')")
    public List<RolDTOComplete> list() {
        return this.rS.list().stream().map(y -> {
            ModelMapper mapper = new ModelMapper();
            return (RolDTOComplete)mapper.map(y, RolDTOComplete.class);
        }).collect(Collectors.toList());
    }

    @PostMapping
    //@PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> insert(@RequestBody RolDTOComplete dto) {
        Rol rol = new Rol();
        rol.setNombre_rol(dto.getNombre_rol());

        Usuario usuario = new Usuario();
        usuario.setId_usuario(dto.getUser().getId_usuario());

        rol.setUser(usuario);

        rS.insert(rol);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Rol [ " + dto.getNombre_rol() + " ] registrado correctamente ");
    }

    @GetMapping("/{id}")
    //@PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> listarRolPorId(@PathVariable("id") Integer id) {
        Rol dev = rS.listIdRol(id);
        if (dev == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No existe un rol con el ID: " + id);
        }
        ModelMapper m = new ModelMapper();
        RolDTOList dto = m.map(dev, RolDTOList.class);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    //@PreAuthorize("hasAuthority('ADMIN')")
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
    //@PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> modificar(@RequestBody RolDTOList dto) {
        // buscar el rol existente
        Rol existente = rS.listIdRol(dto.getId_rol());
        if (existente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se puede modificar. No existe un rol con el ID: " + dto.getId_rol());
        }

        // actualizar solo el nombre
        existente.setNombre_rol(dto.getNombre_rol());

        // guardar cambios
        rS.updateRol(existente);

        return ResponseEntity.ok("Rol con ID " + dto.getId_rol() + " modificado correctamente.");
    }


    @GetMapping("/busquedas")
    //@PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> buscar(@RequestParam String t) {
        List<Rol> roles = rS.buscarPorRol(t);

        if (roles.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontraron roles del tipo: " + t);
        }

        List<RolDTOList> listaDTO = roles.stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, RolDTOList.class);
        }).collect(Collectors.toList());

        return ResponseEntity.ok(listaDTO);
    }
}
