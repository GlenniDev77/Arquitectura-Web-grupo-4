package pe.edu.upc.proyectoarquiwebjorge.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.proyectoarquiwebjorge.dtos.*;
import pe.edu.upc.proyectoarquiwebjorge.entities.Rol;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IUsuarioService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private IUsuarioService uS;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/users")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<UsuarioDTOList> list() {
        return this.uS.list().stream().map(y -> {
            ModelMapper mapper = new ModelMapper();
            return mapper.map(y, UsuarioDTOList.class);
        }).collect(Collectors.toList());
    }

    /*
    @PostMapping
    public void insert(@RequestBody UsuarioDTOInsert dto) {
        ModelMapper mapper = new ModelMapper();
        Usuario u=mapper.map(dto, Usuario.class);
        uS.insert(u);
    }

     */

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> insert(@RequestBody UsuarioDTOInsert dto) {
        ModelMapper mapper = new ModelMapper();
        Usuario d = mapper.map(dto, Usuario.class);
        if (d == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error al crear usuario");
        }
        d.setContraseña(passwordEncoder.encode(dto.getContraseña()));

        uS.insert(d);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Usuario [ " + dto.getNombre()+ " ] registrado correctamente ");
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> listarUsuarioPorId(@PathVariable("id") Integer id) {
        Usuario usa = uS.listIdUsuario(id);
        if (usa == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No existe un usuario con el ID: " + id);
        }
        ModelMapper m = new ModelMapper();
        UsuarioDTOList dto = m.map(usa, UsuarioDTOList.class);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
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
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> modificar(@RequestBody UsuarioDTOInsert dto) {
        ModelMapper m = new ModelMapper();
        Usuario usuario = m.map(dto, Usuario.class);

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
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('AUTORIDAD')")
    public ResponseEntity<?> buscar(@RequestParam String t) {
        List<Usuario> usuarios = uS.buscarPorNombreUsuario(t);

        if (usuarios.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontraron usuarios con nombre: " + t);
        }

        List<UsuarioDTOList> listaDTO = usuarios.stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, UsuarioDTOList.class);
        }).collect(Collectors.toList());

        return ResponseEntity.ok(listaDTO);
    }

    @GetMapping("/tlUsuXzona")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> TotalUsubyzona() {
        List<QuantityUsersbyZonaDTO> listaDTO = new ArrayList<>();
        List<String[]> fila = uS.TotalUsuXzona();


        if (fila.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontraron registros de usuarios con reporte en alguna zona");
        }

        for (String[] s : fila) {
            QuantityUsersbyZonaDTO dto = new QuantityUsersbyZonaDTO();
            dto.setCantidad_Usuarios(Integer.parseInt(s[1]));
            dto.setZona(s[0]);
            listaDTO.add(dto);
        }

        return ResponseEntity.ok(listaDTO);
    }

    @GetMapping("/URvsActivos")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> TotalUsuRvsAct() {
        List<int[]> Total = uS.TotalUsuarioActivos();

        if (Total.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontraron usuarios ");
        }

        List<U_registradosvsActivosDTO> listaDTO = new ArrayList<>();

        for (int[] u : Total) {
            U_registradosvsActivosDTO Udto = new U_registradosvsActivosDTO();
            Udto.setRegistrados(u[0]);
            Udto.setTotal_activos(u[1]);
            listaDTO.add(Udto);
        }

        return ResponseEntity.ok(listaDTO);
    }

    @GetMapping("/UsuariosConMasReportes")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> UsuariosConMasReporte() {
        List<UsuariosConMasReportesDTO> listaDTO = new ArrayList<>();
        List<String[]> fila = uS.UsuariosConMasReportes();


        if (fila.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontraron registros de usuarios con reportes");
        }

        for (String[] s : fila) {
            UsuariosConMasReportesDTO dto = new UsuariosConMasReportesDTO();
            dto.setIdUsuario(Integer.parseInt(s[0]));
            dto.setNombre(s[1]);
            dto.setReportes_Realizados(Integer.parseInt(s[1]));
            listaDTO.add(dto);
        }

        return ResponseEntity.ok(listaDTO);
    }
}
