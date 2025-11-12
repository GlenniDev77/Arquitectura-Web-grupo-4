package pe.edu.upc.proyectoarquiwebtiago.dtos;

import pe.edu.upc.proyectoarquiwebtiago.entities.TipoVehiculo;
import pe.edu.upc.proyectoarquiwebtiago.entities.Usuario;

public class RutaDTOInsert {
    private int id_ruta;
    private String origen;
    private float origen_longitud;
    private float origen_latitud;
    private String destino;
    private float destino_longitud;
    private float destino_latitud;
    private Usuario usuario;
    private TipoVehiculo tipoVehiculo;

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
