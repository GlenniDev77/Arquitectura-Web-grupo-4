package pe.edu.upc.proyectoarquiwebjorge.dtos;

import pe.edu.upc.proyectoarquiwebjorge.entities.TipoVehiculo;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;

public class RutaDTOList {
    private String origen;
    private String destino;
    private TipoVehiculo tipoVehiculo;



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

    public TipoVehiculo getTipoVehiculo() {
        return tipoVehiculo;
    }

    public void setTipoVehiculo(TipoVehiculo tipoVehiculo) {
        this.tipoVehiculo = tipoVehiculo;
    }
}
