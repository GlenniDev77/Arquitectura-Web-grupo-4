package pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces;

import pe.edu.upc.proyectoarquiwebjorge.entities.Rol;
import pe.edu.upc.proyectoarquiwebjorge.entities.TipoVehiculo;

import java.util.List;

public interface ITipoVehiculoService {
    public List<TipoVehiculo> list();
    public void insert(TipoVehiculo vehiculo);
    public TipoVehiculo listIdVehiculo(int id_vehiculo);
    public void deleteVehiculo(int id_vehiculo);
    public void updateVehiculo(TipoVehiculo vehiculo);
    public List<TipoVehiculo> buscarPorVehiculo(String nombre_vehiculo);
}
