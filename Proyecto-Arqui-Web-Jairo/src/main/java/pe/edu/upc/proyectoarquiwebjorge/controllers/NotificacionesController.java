package pe.edu.upc.proyectoarquiwebjorge.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.proyectoarquiwebjorge.dtos.NotificacionesDTOInsert;
import pe.edu.upc.proyectoarquiwebjorge.dtos.NotificacionesDTOList;
import pe.edu.upc.proyectoarquiwebjorge.entities.Notificaciones;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.INotificacionesService;

import java.util.List;
import java.util.stream.Collectors;
@RestController
@RequestMapping("/notificaciones")
public class NotificacionesController {
    @Autowired
    private INotificacionesService nS;
    @PostMapping
    public void insertar(@RequestBody NotificacionesDTOInsert dto)
    {
        ModelMapper m = new ModelMapper();
        Notificaciones d=m.map(dto, Notificaciones.class);
        nS.insert(d); // MENSAJE DE PRUEBA

    }
    @GetMapping("/mensaje")
    public List<NotificacionesDTOList> listar()
    {
        return nS.list().stream().map(y->{
            ModelMapper m = new ModelMapper();
            return m.map(y,NotificacionesDTOList.class);
        }).collect(Collectors.toList());
    }
}
