package pe.edu.upc.proyectoarquiwebjorge.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Ruta")
public class Ruta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_ruta;

    @Column(name = "origen", length = 120, nullable = false)
    private String origen;

    @Column(name = "destino", length = 120, nullable = false)
    private String destino;

    @Column(name = "origen_latitud")
    private Double origen_latitud;

    @Column(name = "origen_longitud")
    private Double origen_longitud;

    @Column(name = "destino_latitud")
    private Double destino_latitud;

    @Column(name = "destino_longitud")
    private Double destino_longitud;

    @Column(name = "tipo_vehiculo", length = 50)
    private String tipo_vehiculo;

    public Ruta() {
    }

    public int getId_ruta() {
        return id_ruta;
    }

    public void setId_ruta(int id_ruta) {
        this.id_ruta = id_ruta;
    }

    public String getOrigen() {
        return origen;
    }

    public void setOrigen(String origen) {
        this.origen = origen;
    }

    public String getDestino() {
        return destino;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public Double getOrigen_latitud() {
        return origen_latitud;
    }

    public void setOrigen_latitud(Double origen_latitud) {
        this.origen_latitud = origen_latitud;
    }

    public Double getOrigen_longitud() {
        return origen_longitud;
    }

    public void setOrigen_longitud(Double origen_longitud) {
        this.origen_longitud = origen_longitud;
    }

    public Double getDestino_latitud() {
        return destino_latitud;
    }

    public void setDestino_latitud(Double destino_latitud) {
        this.destino_latitud = destino_latitud;
    }

    public Double getDestino_longitud() {
        return destino_longitud;
    }

    public void setDestino_longitud(Double destino_longitud) {
        this.destino_longitud = destino_longitud;
    }

    public String getTipo_vehiculo() {
        return tipo_vehiculo;
    }

    public void setTipo_vehiculo(String tipo_vehiculo) {
        this.tipo_vehiculo = tipo_vehiculo;
    }
}