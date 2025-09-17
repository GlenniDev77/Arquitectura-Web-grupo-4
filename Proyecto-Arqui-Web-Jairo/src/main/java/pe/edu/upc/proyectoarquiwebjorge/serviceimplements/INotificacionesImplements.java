package pe.edu.upc.proyectoarquiwebjorge.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.proyectoarquiwebjorge.entities.Notificaciones;
import pe.edu.upc.proyectoarquiwebjorge.repositories.INotificacionesRepository;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.INotificacionesService;

import java.util.List;

@Service
public class INotificacionesImplements implements INotificacionesService {
    @Autowired
    private INotificacionesRepository nS;
    @Override
    public List<Notificaciones> list() {
        return nS.findAll();
    }

    @Override
    public void insert(Notificaciones notificaciones) {nS.save(notificaciones);}
}
