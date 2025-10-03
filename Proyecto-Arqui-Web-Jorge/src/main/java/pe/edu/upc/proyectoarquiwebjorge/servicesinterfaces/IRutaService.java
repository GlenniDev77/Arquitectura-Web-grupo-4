package pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces;

import pe.edu.upc.proyectoarquiwebjorge.entities.Ruta;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;

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
