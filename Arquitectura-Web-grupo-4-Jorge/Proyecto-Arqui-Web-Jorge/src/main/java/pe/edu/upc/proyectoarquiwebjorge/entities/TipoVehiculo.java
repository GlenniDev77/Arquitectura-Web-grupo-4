package pe.edu.upc.proyectoarquiwebjorge.entities;


import jakarta.persistence.*;

@Entity
@Table(name = "TipoVehiculo")
public class    TipoVehiculo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_tipovehiculo;

    @Column(name = "nombre_vehiculo",length = 50,nullable = false)
    private String nombre_vehiculo;

    public TipoVehiculo() {

    }

    public TipoVehiculo(int id_tipovehiculo, String nombre_vehiculo) {
        this.id_tipovehiculo = id_tipovehiculo;
        this.nombre_vehiculo = nombre_vehiculo;
    }

    public int getId_tipovehiculo() {
        return id_tipovehiculo;
    }

    public void setId_tipovehiculo(int id_tipovehiculo) {
        this.id_tipovehiculo = id_tipovehiculo;
    }

    public String getNombre_vehiculo() {
        return nombre_vehiculo;
    }

    public void setNombre_vehiculo(String nombre_vehiculo) {
        this.nombre_vehiculo = nombre_vehiculo;
    }
}
