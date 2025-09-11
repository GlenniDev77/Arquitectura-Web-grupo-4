package pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces;

import pe.edu.upc.proyectoarquiwebjorge.entities.Rol;
import pe.edu.upc.proyectoarquiwebjorge.entities.TipoVehiculo;

import java.util.List;

public interface ITipoVehiculoService {
    public List<TipoVehiculo> list();
    public void insert(TipoVehiculo vehiculo);
}
