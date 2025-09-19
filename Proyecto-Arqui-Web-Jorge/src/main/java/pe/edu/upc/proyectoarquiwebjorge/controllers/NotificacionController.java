package pe.edu.upc.proyectoarquiwebjorge.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.proyectoarquiwebjorge.dtos.*;
import pe.edu.upc.proyectoarquiwebjorge.entities.Notificacion;
import pe.edu.upc.proyectoarquiwebjorge.entities.Rol;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;
import pe.edu.upc.proyectoarquiwebjorge.entities.Zona;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.INotificacionService;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IUsuarioService;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.IZonaService;

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
    public List<NotificacionDTOList> list() {
        return this.nS.list().stream().map(y -> {
            ModelMapper mapper = new ModelMapper();
            return (NotificacionDTOList)mapper.map(y, NotificacionDTOList.class);
        }).collect(Collectors.toList());
    }

    /*

    @PostMapping
    public void insert(@RequestBody NotificacionDTOInsert dto) {
        ModelMapper mapper = new ModelMapper();
        Notificacion n=mapper.map(dto, Notificacion.class);
        nS.insert(n);
    }

     */

    @PostMapping
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


}
