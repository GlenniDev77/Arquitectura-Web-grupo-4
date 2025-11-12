package pe.edu.upc.proyectoarquiwebtiago.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.proyectoarquiwebtiago.entities.Delito;
import pe.edu.upc.proyectoarquiwebtiago.repositories.IDelitoRepository;
import pe.edu.upc.proyectoarquiwebtiago.servicesinterfaces.IDelitoService;

import java.util.List;

@Service
public class DelitoServiceImplement implements IDelitoService {
    @Autowired
    private IDelitoRepository rR;

    @Override
    public List<Delito> list() {
        return rR.findAll();
    }

    @Override
    public void insert(Delito delito) {
        rR.save(delito);
    }

    @Override
    public Delito listIdDelito(int id_delito) {
        return rR.findById(id_delito).orElse(null);
    }

    @Override
    public void deleteDelito(int id_delito) {
        rR.deleteById(id_delito);
    }

    @Override
    public List<String[]> quantityDelitoPorZonaYDistrito() {
        return rR.quantityDelitoPorZonaYDistrito();
    }

    @Override
    public List<String[]> quantityMasDelitosPorHoraYZona() {
        return rR.quantityMasDelitosPorHoraYZona();
    }

    @Override
    public List<String[]> quantityDelitosPorMes() {
        return rR.quantityDelitosPorMes();
    }

    @Override
    public List<Object[]> antiguedadUltimoDelitoPorZona() {
        return rR.antiguedadUltimoDelitoPorZona();
    }
}
