package pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces;

import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;
import pe.edu.upc.proyectoarquiwebjorge.entities.Zona;

import java.util.List;

public interface IZonaService {
    public List<Zona> list();
    public void insert(Zona zona);
    public Zona listById(int id);
    public void delete(int id);
    public void update(Zona zona);
    public List<Zona> buscarPorNombreZona(String nombreZona);

}
