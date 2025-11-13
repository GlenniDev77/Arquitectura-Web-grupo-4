package pe.edu.upc.proyectoarquiwebjorge.dtos;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;

public class RolDTOComplete {
    private int id_rol;
    private String nombre_rol;
    private UsuarioDTOList user;

    public int getId_rol() {
        return id_rol;
    }

    public void setId_rol(int id_rol) {
        this.id_rol = id_rol;
    }

    public String getNombre_rol() {
        return nombre_rol;
    }

    public void setNombre_rol(String nombre_rol) {
        this.nombre_rol = nombre_rol;
    }

    public UsuarioDTOList getUser() {
        return user;
    }

    public void setUser(UsuarioDTOList user) {
        this.user = user;
    }
}
