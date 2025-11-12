package pe.edu.upc.proyectoarquiwebtiago.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.proyectoarquiwebtiago.entities.Rol;
import pe.edu.upc.proyectoarquiwebtiago.repositories.IRolRepository;
import pe.edu.upc.proyectoarquiwebtiago.servicesinterfaces.IRolService;

import java.util.List;

@Service
public class    RolServiceImplement implements IRolService {

    @Autowired
    private IRolRepository rS;

    @Override
    public List<Rol> list(){
        return rS.findAll();
    }

    @Override
    public void insert(Rol rol){
        rS.save(rol);
    }

    @Override
    public Rol listIdRol(int id_rol) {
        return rS.findById(id_rol).orElse(null);
    }

    @Override
    public void deleteRol(int id_rol) {
        rS.deleteById(id_rol);
    }

    @Override
    public void updateRol(Rol rol) {
        rS.save(rol);
    }

    @Override
    public List<Rol> buscarPorRol(String nombre_rol) {
        return rS.buscarPorNombreRol(nombre_rol);
    }

}
