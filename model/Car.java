package model;

public class Car {
    public int id;
    public String name;
    public boolean reserved;
    public int days;
    public double price;

    public Car(int id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.reserved = false;
        this.days = 0;
    }

    public String getStatus() {
        return reserved ? "Réservée (" + days + " jrs)" : "Disponible";
    }
}
