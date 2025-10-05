package pe.edu.upc.proyectoarquiwebjorge.dtos;

import jakarta.persistence.Column;

public class ZonaDTO {
    private int idZona;
    private String nombre;
    private String distrito;
    private String estadoZona;
    private float latitud;
    private float longitud;

    public int getIdZona() {
        return idZona;
    }

    public void setIdZona(int idZona) {
        this.idZona = idZona;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDistrito() {
        return distrito;
    }

    public void setDistrito(String distrito) {
        this.distrito = distrito;
    }

    public String getEstadoZona() {
        return estadoZona;
    }

    public void setEstadoZona(String estadoZona) {
        this.estadoZona = estadoZona;
    }

    public float getLatitud() {
        return latitud;
    }

    public void setLatitud(float latitud) {
        this.latitud = latitud;
    }

    public float getLongitud() {
        return longitud;
    }

    public void setLongitud(float longitud) {
        this.longitud = longitud;
    }
}
