package pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces;

import pe.edu.upc.proyectoarquiwebjorge.entities.Delito;
import pe.edu.upc.proyectoarquiwebjorge.entities.Resenia;

import java.util.List;

public interface IDelitoService {
    public List<Delito> list();
    public void insert(Delito delito);
    public Delito listIdDelito(int id_delito);
    public void deleteDelito(int id_delito);
    public List<String[]> quantityDelitoPorZonaYDistrito();
    public List<String[]> quantityMasDelitosPorHoraYZona();
    public List<String[]> quantityDelitosPorMes();


}
