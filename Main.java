import model.Car;
import service.CarService;
import ui.ConsoleUI;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class Main {
    public static void main(String[] args) {
        List<Car> cars = Arrays.asList(
                new Car(1, "Peugeot 208", 40),
                new Car(2, "Toyota Corolla", 45),
                new Car(3, "Renault Clio", 35),
                new Car(4, "Ford Fiesta", 50),
                new Car(5, "Volkswagen Golf", 55)
        );

        ConsoleUI ui = new ConsoleUI();
        CarService service = new CarService();

        ui.printWelcome();

        while (true) {
            ui.displayCars(cars);
            ui.displayMenu();

            String choice = ui.prompt("\n🡒 Votre choix : ");
            if (choice.equals("1")) {
                String carInput = ui.prompt("\n Entrez l'ID ou nom de la voiture : ");
                Optional<Car> carOpt = service.findCar(cars, carInput);

                if (carOpt.isEmpty()) {
                    ui.printError("Voiture introuvable");
                    continue;
                }

                Car car = carOpt.get();
                if (car.reserved) {
                    ui.printError("Cette voiture est déjà réservée");
                    continue;
                }

                String daysStr = ui.prompt(" Nombre de jours (1-30) : ");
                int days;
                try {
                    days = Integer.parseInt(daysStr);
                    if (!service.reserveCar(car, days)) {
                        ui.printError("Réservation impossible");
                        continue;
                    }
                } catch (NumberFormatException e) {
                    ui.printError("Entrée invalide");
                    continue;
                }

                String confirm = ui.prompt(" Confirmer la réservation ? (o/n) : ");
                if (!confirm.equalsIgnoreCase("o")) {
                    ui.printError("Réservation annulée");
                    continue;
                }

                double total = service.calculateTotal(car);
                ui.printReservationDetails(car, total);

            } else if (choice.equals("2")) {
                ui.goodbye();
                break;
            } else {
                ui.printError("Choix invalide. Essayez encore.");
            }
        }
    }
}
