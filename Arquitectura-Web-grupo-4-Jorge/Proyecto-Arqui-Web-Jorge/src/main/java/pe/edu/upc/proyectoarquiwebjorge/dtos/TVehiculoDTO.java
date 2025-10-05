package pe.edu.upc.proyectoarquiwebjorge.dtos;

import jakarta.persistence.Column;

public class TVehiculoDTO {

    private int id_tipovehiculo;
    private String nombre_vehiculo;

    public int getId_tipovehiculo() {
        return id_tipovehiculo;
    }

    public void setId_tipovehiculo(int id_tipovehiculo) {
        this.id_tipovehiculo = id_tipovehiculo;
    }

    public String getNombre_vehiculo() {
        return nombre_vehiculo;
    }

    public void setNombre_vehiculo(String nombre_vehiculo) {
        this.nombre_vehiculo = nombre_vehiculo;
    }
}
