package pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces;
import pe.edu.upc.proyectoarquiwebjorge.entities.Zona;
import java.util.List;

public interface IZonaService {
    public List<Zona> list();
    public void insert(Zona zona);
}
