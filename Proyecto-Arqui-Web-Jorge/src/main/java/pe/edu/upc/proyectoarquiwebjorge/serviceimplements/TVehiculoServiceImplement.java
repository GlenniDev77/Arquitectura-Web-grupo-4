package pe.edu.upc.proyectoarquiwebjorge.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.proyectoarquiwebjorge.entities.TipoVehiculo;
import pe.edu.upc.proyectoarquiwebjorge.repositories.ITVehiculoRepository;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.ITipoVehiculoService;

import java.util.List;

@Service
public class TVehiculoServiceImplement implements ITipoVehiculoService {

    @Autowired
    private ITVehiculoRepository vS;

    @Override
    public List<TipoVehiculo> list() {
        return vS.findAll();
    }

    @Override
    public void insert(TipoVehiculo vehiculo) {
        vS.save(vehiculo);
    }
}
