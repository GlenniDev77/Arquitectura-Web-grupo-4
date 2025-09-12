package pe.edu.upc.proyectoarquiwebjorge.dtos;

import jakarta.persistence.Column;

public class ZonaDTO {
    private int id_zona;
    private String nombre_zona;
    private String distrito;
    private String estado_zona;
    private float latitud;
    private float longitud;

    public int getId_zona() {
        return id_zona;
    }

    public void setId_zona(int id_zona) {
        this.id_zona = id_zona;
    }

    public String getNombre_zona() {
        return nombre_zona;
    }

    public void setNombre_zona(String nombre_zona) {
        this.nombre_zona = nombre_zona;
    }

    public String getDistrito() {
        return distrito;
    }

    public void setDistrito(String distrito) {
        this.distrito = distrito;
    }

    public String getEstado_zona() {
        return estado_zona;
    }

    public void setEstado_zona(String estado_zona) {
        this.estado_zona = estado_zona;
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
