package pe.edu.upc.proyectoarquiwebjorge.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.proyectoarquiwebjorge.dtos.*;
import pe.edu.upc.proyectoarquiwebjorge.entities.Notificacion;
import pe.edu.upc.proyectoarquiwebjorge.entities.Rol;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;
import pe.edu.upc.proyectoarquiwebjorge.entities.Zona;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.INotificacionService;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IUsuarioService;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IZonaService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/notificaciones")
public class NotificacionController {

    @Autowired
    private INotificacionService nS;

    @Autowired
    private IUsuarioService uS;

    @Autowired
    private IZonaService zS;

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN') or hasAnyAuthority('AUTORIDAD') or hasAuthority('MODERADOR')")
    public List<NotificacionDTOList> list() {
        return this.nS.list().stream().map(y -> {
            ModelMapper mapper = new ModelMapper();
            return (NotificacionDTOList)mapper.map(y, NotificacionDTOList.class);
        }).collect(Collectors.toList());
    }


    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> insert(@RequestBody NotificacionDTOInsert dto) {
        ModelMapper mapper = new ModelMapper();
        Notificacion d = mapper.map(dto, Notificacion.class);
        nS.insert(d);

        Usuario us = uS.listIdUsuario(dto.getUsuario().getId_usuario());
        Zona zo = zS.listById(dto.getZona().getIdZona());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Notificacion para usuario: [ " + us.getNombre() +
                        " ] en la zona [" + zo.getNombre() + "] registrado correctamente ");
    }

    @GetMapping("/usuarios-mas-notis")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<MasNotisXUsuarioDTO> obtenerUsuariosMasNotificaciones() {
        List<Object[]> resultados = nS.usuarioMasNotis();

        return resultados.stream().map(obj -> {
            MasNotisXUsuarioDTO dto = new MasNotisXUsuarioDTO();
            dto.setNombre_usuario((String) obj[0]);
            dto.setTotalNotificaciones(((Number) obj[1]).intValue());
            return dto;
        }).collect(Collectors.toList());
    }

}
