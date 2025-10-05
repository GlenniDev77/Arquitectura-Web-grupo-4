package pe.edu.upc.proyectoarquiwebjorge.dtos;

public class UsuariosConMasReportesDTO {
    private int id_usuario;
    private String nombre;
    private int reportes_Realizados;

    public int getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(int id_usuario) {
        this.id_usuario = id_usuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getReportes_Realizados() {
        return reportes_Realizados;
    }

    public void setReportes_Realizados(int reportes_Realizados) {
        this.reportes_Realizados = reportes_Realizados;
    }
}
