package pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces;

import pe.edu.upc.proyectoarquiwebjorge.entities.Rol;

import java.util.List;

public interface IRolService {
    public List<Rol> list();
    public void insert(Rol rol);
}
