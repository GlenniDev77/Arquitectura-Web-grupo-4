package pe.edu.upc.proyectoarquiwebjorge.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.proyectoarquiwebjorge.dtos.NotificacionDTOInsert;
import pe.edu.upc.proyectoarquiwebjorge.dtos.NotificacionDTOList;
import pe.edu.upc.proyectoarquiwebjorge.dtos.UsuarioDTOInsert;
import pe.edu.upc.proyectoarquiwebjorge.dtos.UsuarioDTOList;
import pe.edu.upc.proyectoarquiwebjorge.entities.Notificacion;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.INotificacionService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/notificaciones")
public class NotificacionController {

    @Autowired
    private INotificacionService nS;

    @GetMapping
    public List<NotificacionDTOList> list() {
        return this.nS.list().stream().map(y -> {
            ModelMapper mapper = new ModelMapper();
            return (NotificacionDTOList)mapper.map(y, NotificacionDTOList.class);
        }).collect(Collectors.toList());
    }

    @PostMapping
    public void insert(@RequestBody NotificacionDTOInsert dto) {
        ModelMapper mapper = new ModelMapper();
        Notificacion n=mapper.map(dto, Notificacion.class);
        nS.insert(n);
    }

}
