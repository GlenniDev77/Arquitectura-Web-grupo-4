package pe.edu.upc.proyectoarquiwebjorge.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.proyectoarquiwebjorge.entities.Notificacion;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;
import pe.edu.upc.proyectoarquiwebjorge.repositories.INotificacionRepository;
import pe.edu.upc.proyectoarquiwebjorge.repositories.IUsuarioRepository;
import pe.edu.upc.proyectoarquiwebjorge.servicesinterfaces.INotificacionService;

import java.util.List;

@Service
public class NotificacionServiceImplements implements INotificacionService {
    @Autowired
    private INotificacionRepository nR;


    @Override
    public List<Notificacion> list() {
        return nR.findAll();
    }

    @Override
    public void insert(Notificacion notificacion) {

        nR.save(notificacion);
    }


}
