package pe.edu.upc.proyectoarquiwebjorge.dtos;

import java.time.LocalDateTime;

public class AntiguedadUltimoDelitoDTO {
    private String zona;
    private LocalDateTime ultimoDelito;
    private int diasDesdeUltimo;

    public String getZona() {
        return zona;
    }

    public void setZona(String zona) {
        this.zona = zona;
    }

    public LocalDateTime getUltimoDelito() {
        return ultimoDelito;
    }

    public void setUltimoDelito(LocalDateTime ultimoDelito) {
        this.ultimoDelito = ultimoDelito;
    }

    public int getDiasDesdeUltimo() {
        return diasDesdeUltimo;
    }

    public void setDiasDesdeUltimo(int diasDesdeUltimo) {
        this.diasDesdeUltimo = diasDesdeUltimo;
    }
}
