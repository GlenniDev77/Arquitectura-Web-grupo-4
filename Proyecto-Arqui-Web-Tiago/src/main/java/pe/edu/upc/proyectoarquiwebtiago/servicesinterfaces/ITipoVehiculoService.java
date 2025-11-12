package pe.edu.upc.proyectoarquiwebtiago.servicesinterfaces;

import pe.edu.upc.proyectoarquiwebtiago.entities.TipoVehiculo;

import java.util.List;

public interface ITipoVehiculoService {
    public List<TipoVehiculo> list();
    public void insert(TipoVehiculo vehiculo);
    public TipoVehiculo listIdVehiculo(int id_vehiculo);
    public void deleteVehiculo(int id_vehiculo);
    public void updateVehiculo(TipoVehiculo vehiculo);
    public List<TipoVehiculo> buscarPorVehiculo(String nombre_vehiculo);
}
