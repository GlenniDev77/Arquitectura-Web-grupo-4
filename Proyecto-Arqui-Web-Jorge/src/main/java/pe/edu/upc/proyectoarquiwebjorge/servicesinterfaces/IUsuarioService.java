package pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces;

import pe.edu.upc.proyectoarquiwebjorge.entities.Rol;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;

import java.util.List;

public interface IUsuarioService {
    public List<Usuario> list();
    public void insert(Usuario usuario);
    public Usuario listIdRol(int id_usuario);
}
