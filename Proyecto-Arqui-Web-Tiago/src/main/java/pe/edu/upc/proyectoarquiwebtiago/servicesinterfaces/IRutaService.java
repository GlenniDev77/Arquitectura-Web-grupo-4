package pe.edu.upc.proyectoarquiwebtiago.servicesinterfaces;

import pe.edu.upc.proyectoarquiwebtiago.entities.Ruta;

import java.util.List;

public interface IRutaService {
    public List<Ruta> list();
    public void insert(Ruta ruta);
    public Ruta listIdRuta(int id_ruta);
    public void deleteRuta(int id_ruta);
    public void updateRuta(Ruta ruta);
    public List<Ruta> buscarRutaDestino(String destino);
    public List<Ruta> buscarRutaOrigen(String origen);
    public List<String[]> CantRutasPorTipoDeVehiculo();

}
