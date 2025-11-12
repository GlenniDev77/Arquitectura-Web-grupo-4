package pe.edu.upc.proyectoarquiwebtiago.dtos;

public class QuantityDelitosHoraZonaDTO {
    private String zona;
    private String hora;
    private int quantity;

    public String getZona() {
        return zona;
    }

    public void setZona(String zona) {
        this.zona = zona;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
