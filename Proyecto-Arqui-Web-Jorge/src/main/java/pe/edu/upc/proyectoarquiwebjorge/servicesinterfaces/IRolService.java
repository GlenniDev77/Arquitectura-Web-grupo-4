package pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces;

import pe.edu.upc.proyectoarquiwebjorge.entities.Rol;

import java.util.List;

public interface IRolService {
    public List<Rol> list();
    public void insert(Rol rol);
    public Rol listIdRol(int id_rol);
    public void deleteRol(int id_rol);
    public void updateRol(Rol rol);
    public List<Rol> buscarPorRol(String nombre_rol);
}
