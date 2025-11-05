package pe.edu.upc.proyectoarquiwebjorge.dtos;

public class MasNotisxZonaDTO {
    private String nombre_zona;
    private int totalNotificaciones;

    public String getNombre_zona() {
        return nombre_zona;
    }

    public void setNombre_zona(String nombre_zona) {
        this.nombre_zona = nombre_zona;
    }

    public int getTotalNotificaciones() {
        return totalNotificaciones;
    }

    public void setTotalNotificaciones(int totalNotificaciones) {
        this.totalNotificaciones = totalNotificaciones;
    }
}
