package ui;

import model.Car;

import java.util.List;
import java.util.Scanner;

public class ConsoleUI {
    private final Scanner scanner = new Scanner(System.in);

    public void printWelcome() {
        System.out.println("\nBienvenue dans l'application de location de voitures !");
    }

    public void displayCars(List<Car> cars) {
        System.out.println("\n📋 Liste des voitures :");
        for (Car car : cars) {
            String status = car.reserved ? "\u001B[31m" : "\u001B[32m"; // rouge ou vert
            System.out.printf("[%d] %-20s - %s%s\u001B[0m\n", car.id, car.name, status, car.getStatus());
        }
    }

    public void displayMenu() {
        System.out.println("\nOptions :");
        System.out.println("1 - RESERVER UNE VOITURE");
        System.out.println("2 - QUITTER");
    }

    public String prompt(String message) {
        System.out.print(message);
        return scanner.nextLine().trim();
    }

    public void printReservationDetails(Car car, double total) {
        System.out.println("\n✅ RÉSERVATION CONFIRMÉE !");
        System.out.println("------------------------");
        System.out.println("Voiture : " + car.name);
        System.out.println("Durée   : " + car.days + " jours");
        System.out.printf("Total   : %.2f €\n", total);
        System.out.println("------------------------");
    }

    public void printError(String message) {
        System.out.println("\n\u001B[33m xxx " + message + " xxx \u001B[0m");
    }

    public void goodbye() {
        System.out.println("\n A bientôt ! \n");
    }
}
