package pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces;

import pe.edu.upc.proyectoarquiwebjorge.entities.Rol;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;

import java.util.List;

public interface IUsuarioService {
    public List<Usuario> list();
    public void insert(Usuario usuario);
    public Usuario listIdUsuario(int id_usuario);
    public void deleteUsuario(int id_usuario);
    public void updateUsuario(Usuario usuario);
    public List<Usuario> buscarPorNombreUsuario(String nombreUsuario);
    public List<String[]> TotalUsuXzona();
    public List<int[]> TotalUsuarioActivos();
    public List<String[]> UsuariosConMasReportes();

}
