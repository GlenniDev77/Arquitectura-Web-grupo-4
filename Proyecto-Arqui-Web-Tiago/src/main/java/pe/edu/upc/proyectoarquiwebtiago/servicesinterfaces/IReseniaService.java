package pe.edu.upc.proyectoarquiwebtiago.servicesinterfaces;

import pe.edu.upc.proyectoarquiwebtiago.entities.Resenia;

import java.util.List;

public interface IReseniaService {
    public List<Resenia> list();
    public void insert(Resenia resenia);
    public Resenia listIdResenia(int id_resenia);
    public void deleteResenia(int id_resenia);
}
