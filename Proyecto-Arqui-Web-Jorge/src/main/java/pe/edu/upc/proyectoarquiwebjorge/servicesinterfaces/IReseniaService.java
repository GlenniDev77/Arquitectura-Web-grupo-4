package pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces;

import pe.edu.upc.proyectoarquiwebjorge.entities.Resenia;
import pe.edu.upc.proyectoarquiwebjorge.entities.Ruta;

import java.util.List;

public interface IReseniaService {
    public List<Resenia> list();
    public void insert(Resenia resenia);
    public Resenia listIdResenia(int id_resenia);
    public void deleteResenia(int id_resenia);
}
