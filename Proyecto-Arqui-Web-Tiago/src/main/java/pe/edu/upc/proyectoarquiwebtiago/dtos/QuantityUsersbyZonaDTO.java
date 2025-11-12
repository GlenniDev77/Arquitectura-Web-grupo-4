package pe.edu.upc.proyectoarquiwebtiago.dtos;

public class QuantityUsersbyZonaDTO {
    private int cantidad_Usuarios;
    private String Zona;

    public String getZona() {
        return Zona;
    }

    public void setZona(String zona) {
        Zona = zona;
    }

    public int getCantidad_Usuarios() {
        return cantidad_Usuarios;
    }

    public void setCantidad_Usuarios(int cantidad_Usuarios) {
        this.cantidad_Usuarios = cantidad_Usuarios;
    }
}
