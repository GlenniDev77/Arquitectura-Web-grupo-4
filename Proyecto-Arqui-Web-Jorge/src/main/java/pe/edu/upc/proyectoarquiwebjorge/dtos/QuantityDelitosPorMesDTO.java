package pe.edu.upc.proyectoarquiwebjorge.dtos;

public class QuantityDelitosPorMesDTO {
    private int anio;
    private String mes;
    private int numero_delitos;

    public int getAnio() {
        return anio;
    }

    public void setAnio(int anio) {
        this.anio = anio;
    }

    public String getMes() {
        return mes;
    }

    public void setMes(String mes) {
        this.mes = mes;
    }

    public int getNumero_delitos() {
        return numero_delitos;
    }

    public void setNumero_delitos(int numero_delitos) {
        this.numero_delitos = numero_delitos;
    }
}
