package pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces;

import pe.edu.upc.proyectoarquiwebjorge.entities.Ruta;
import java.util.List;
import java.util.Optional;

public interface IRutaService {
    public void insert(Ruta ruta);
    public List<Ruta> list();
    public void delete(int id);
    public Optional<Ruta> listId(int id);
}