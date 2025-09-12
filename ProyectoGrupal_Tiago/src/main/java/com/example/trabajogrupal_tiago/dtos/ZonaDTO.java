package com.example.trabajogrupal_tiago.dtos;

public class ZonaDTO {
    private int id_zona;
    private String nombre;
    private String distrito;
    private String EstadoZona;
    private Float latitud;
    private Float longitud;

    public int getId_zona() {
        return id_zona;
    }

    public void setId_zona(int id_zona) {
        this.id_zona = id_zona;
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
        return EstadoZona;
    }

    public void setEstadoZona(String estadoZona) {
        EstadoZona = estadoZona;
    }

    public Float getLatitud() {
        return latitud;
    }

    public void setLatitud(Float latitud) {
        this.latitud = latitud;
    }

    public Float getLongitud() {
        return longitud;
    }

    public void setLongitud(Float longitud) {
        this.longitud = longitud;
    }
}
