package pe.edu.upc.proyectoarquiwebtiago.dtos;

public class MasNotisXUsuarioDTO {
    private String nombre_usuario;
    private int totalNotificaciones;

    public String getNombre_usuario() {
        return nombre_usuario;
    }

    public void setNombre_usuario(String nombre_usuario) {
        this.nombre_usuario = nombre_usuario;
    }

    public int getTotalNotificaciones() {
        return totalNotificaciones;
    }

    public void setTotalNotificaciones(int totalNotificaciones) {
        this.totalNotificaciones = totalNotificaciones;
    }
}
