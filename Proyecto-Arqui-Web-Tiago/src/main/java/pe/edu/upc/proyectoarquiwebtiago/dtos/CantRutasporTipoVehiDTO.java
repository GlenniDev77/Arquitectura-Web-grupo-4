package pe.edu.upc.proyectoarquiwebtiago.dtos;

public class CantRutasporTipoVehiDTO {
    private String tipoVehi;
    private int cantidad_rutas;

    public String getTipoVehi() {
        return tipoVehi;
    }

    public void setTipoVehi(String tipoVehi) {
        this.tipoVehi = tipoVehi;
    }

    public int getCantidad_rutas() {
        return cantidad_rutas;
    }

    public void setCantidad_rutas(int cantidad_rutas) {
        this.cantidad_rutas = cantidad_rutas;
    }
}
