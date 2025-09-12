package pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces;

import pe.edu.upc.proyectoarquiwebjorge.entities.Resena;
import java.util.List;
import java.util.Optional;

public interface IResenaService {
    public void insert(Resena resena);
    public List<Resena> list();
    public void delete(int id);
    public Optional<Resena> listId(int id);
}