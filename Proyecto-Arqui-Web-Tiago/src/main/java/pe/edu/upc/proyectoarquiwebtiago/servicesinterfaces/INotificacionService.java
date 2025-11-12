package pe.edu.upc.proyectoarquiwebtiago.servicesinterfaces;

import pe.edu.upc.proyectoarquiwebtiago.entities.Notificacion;

import java.util.List;

public interface INotificacionService {
    public List<Notificacion> list();
    public void insert(Notificacion notificacion);
    public List<Object[]> usuarioMasNotis();
    public List<String[]> zonaMasNotis();



}
