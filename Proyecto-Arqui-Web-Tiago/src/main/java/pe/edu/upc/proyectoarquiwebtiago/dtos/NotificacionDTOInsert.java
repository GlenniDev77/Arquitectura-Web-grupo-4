package pe.edu.upc.proyectoarquiwebtiago.dtos;

import pe.edu.upc.proyectoarquiwebtiago.entities.Usuario;
import pe.edu.upc.proyectoarquiwebtiago.entities.Zona;

public class NotificacionDTOInsert {
    private String mensaje;
    private Usuario usuario;
    private Zona zona;

    public Zona getZona() {
        return zona;
    }

    public void setZona(Zona zona) {
        this.zona = zona;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
}
