package pe.edu.upc.proyectoarquiwebtiago.dtos;

public class RolDTOInsert {
    private String nombre_rol;
    private int userId;

    public String getNombre_rol() {
        return nombre_rol;
    }

    public void setNombre_rol(String nombre_rol) {
        this.nombre_rol = nombre_rol;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
