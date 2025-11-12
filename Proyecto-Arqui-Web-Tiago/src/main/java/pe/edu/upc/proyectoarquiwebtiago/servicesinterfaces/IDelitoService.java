package pe.edu.upc.proyectoarquiwebtiago.servicesinterfaces;

import pe.edu.upc.proyectoarquiwebtiago.entities.Delito;

import java.util.List;

public interface IDelitoService {
    public List<Delito> list();
    public void insert(Delito delito);
    public Delito listIdDelito(int id_delito);
    public void deleteDelito(int id_delito);
    public List<String[]> quantityDelitoPorZonaYDistrito();
    public List<String[]> quantityMasDelitosPorHoraYZona();
    public List<String[]> quantityDelitosPorMes();
    List<Object[]> antiguedadUltimoDelitoPorZona();


}
