package pe.edu.upc.proyectoarquiwebtiago.dtos;

public class QuantityDelitoZonaDistritoDTO {
    private String distrito;
    private String zona;
    private String tipo_delito;
    private int quantity;

    public String getDistrito() {
        return distrito;
    }

    public void setDistrito(String distrito) {
        this.distrito = distrito;
    }

    public String getZona() {
        return zona;
    }

    public void setZona(String zona) {
        this.zona = zona;
    }

    public String getTipo_delito() {
        return tipo_delito;
    }

    public void setTipo_delito(String tipo_delito) {
        this.tipo_delito = tipo_delito;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
