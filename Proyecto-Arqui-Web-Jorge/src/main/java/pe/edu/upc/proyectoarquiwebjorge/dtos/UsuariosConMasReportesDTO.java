package pe.edu.upc.proyectoarquiwebjorge.dtos;

public class UsuariosConMasReportesDTO {
    private int idUsuario;
    private String nombre;
    private int reportes_Realizados;

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
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
