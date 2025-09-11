package pe.edu.upc.proyectoarquiwebjorge.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.proyectoarquiwebjorge.dtos.RolDTO;
import pe.edu.upc.proyectoarquiwebjorge.dtos.UsuarioDTO;
import pe.edu.upc.proyectoarquiwebjorge.entities.Rol;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IUsuarioService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private IUsuarioService uS;

    @GetMapping
    public List<UsuarioDTO> list() {
        return this.uS.list().stream().map(y -> {
            ModelMapper mapper = new ModelMapper();
            return (UsuarioDTO)mapper.map(y, UsuarioDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping
    public void insert(@RequestBody UsuarioDTO dto) {
        ModelMapper mapper = new ModelMapper();
        Usuario u=mapper.map(dto, Usuario.class);
        uS.insert(u);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> listarUsuarioPorId(@PathVariable("id") Integer id) {
        Usuario usa = uS.listIdUsuario(id);
        if (usa == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No existe un usuario con el ID: " + id);
        }
        ModelMapper m = new ModelMapper();
        UsuarioDTO dto = m.map(usa, UsuarioDTO.class);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable("id") Integer id) {
        Usuario u = uS.listIdUsuario(id);
        if (u == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No existe un usuario con el ID: " + id);
        }
        uS.deleteUsuario(id);
        return ResponseEntity.ok("Usuario con ID " + id + " eliminado correctamente.");
    }

    @PutMapping
    public ResponseEntity<String> modificar(@RequestBody UsuarioDTO dto) {
        ModelMapper m = new ModelMapper();
        Usuario usuario = m.map(dto, Usuario.class);

        // Validación de presupuesto
        /* if (dev.getPriceDevice() < 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("No se permite ingresar un precio negativo. Valor recibido: " + dev.getPriceDevice());
        } */

        // Validación de existencia
        Usuario existente = uS.listIdUsuario(usuario.getId_usuario());
        if (existente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se puede modificar. No existe un usuario con el ID: " + usuario.getId_usuario());
        }

        // Actualización si pasa validaciones
        uS.updateUsuario(usuario);
        return ResponseEntity.ok("Usuario con ID " + usuario.getId_usuario() + " modificado correctamente.");
    }

    @GetMapping("/busquedas")
    public ResponseEntity<?> buscar(@RequestParam String t) {
        List<Usuario> usuarios = uS.buscarPorNombreUsuario(t);

        if (usuarios.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontraron usuarios del tipo: " + t);
        }

        List<UsuarioDTO> listaDTO = usuarios.stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, UsuarioDTO.class);
        }).collect(Collectors.toList());

        return ResponseEntity.ok(listaDTO);
    }
}
