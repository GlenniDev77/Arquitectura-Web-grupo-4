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
        Usuario usa = uS.listIdRol(id);
        if (usa == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No existe un usuario con el ID: " + id);
        }
        ModelMapper m = new ModelMapper();
        UsuarioDTO dto = m.map(usa, UsuarioDTO.class);
        return ResponseEntity.ok(dto);
    }

}
