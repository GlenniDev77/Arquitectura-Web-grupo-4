package pe.edu.upc.proyectoarquiwebjorge.dtos;

import pe.edu.upc.proyectoarquiwebjorge.entities.TipoVehiculo;
import pe.edu.upc.proyectoarquiwebjorge.entities.Usuario;

public class RutaDTOList {
    private String origen;
    private String destino;
    private String medio;



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

    public String getMedio() {
        return medio;
    }

    public void setMedio(String medio) {
        this.medio = medio;
    }

}
