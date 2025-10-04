package pe.edu.upc.proyectoarquiwebjorge.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Ruta")
public class Ruta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_ruta;

    @Column(name = "origen", length = 50, nullable = false)
    private String origen;

    @Column(name = "origen_longitud",length = 50, nullable = false)
    private float origen_longitud;

    @Column(name = "origen_latitud",length = 50, nullable = false)
    private float origen_latitud;

    @Column(name = "destino", length = 50, nullable = false)
    private String destino;

    @Column(name = "destino_longitud",length = 50, nullable = false)
    private float destino_longitud;

    @Column(name="destino_latitud",length = 50, nullable = false)
    private float destino_latitud;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_tipovehiculo")
    private TipoVehiculo tipoVehiculo;

    public Ruta() {
    }

    public Ruta(int id_ruta, String origen, float origen_longitud, float origen_latitud, String destino, float destino_longitud, float destino_latitud, Usuario usuario, TipoVehiculo tipoVehiculo) {
        this.id_ruta = id_ruta;
        this.origen = origen;
        this.origen_longitud = origen_longitud;
        this.origen_latitud = origen_latitud;
        this.destino = destino;
        this.destino_longitud = destino_longitud;
        this.destino_latitud = destino_latitud;
        this.usuario = usuario;
        this.tipoVehiculo = tipoVehiculo;
    }

    public float getDestino_latitud() {
        return destino_latitud;
    }

    public void setDestino_latitud(float destino_latitud) {
        this.destino_latitud = destino_latitud;
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

    public float getOrigen_longitud() {
        return origen_longitud;
    }

    public void setOrigen_longitud(float origen_longitud) {
        this.origen_longitud = origen_longitud;
    }

    public float getOrigen_latitud() {
        return origen_latitud;
    }

    public void setOrigen_latitud(float origen_latitud) {
        this.origen_latitud = origen_latitud;
    }

    public String getDestino() {
        return destino;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public float getDestino_longitud() {
        return destino_longitud;
    }

    public void setDestino_longitud(float destino_longitud) {
        this.destino_longitud = destino_longitud;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public TipoVehiculo getTipoVehiculo() {
        return tipoVehiculo;
    }

    public void setTipoVehiculo(TipoVehiculo tipoVehiculo) {
        this.tipoVehiculo = tipoVehiculo;
    }
}
