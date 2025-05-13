package service;

import model.Car;
import java.util.List;
import java.util.Optional;

public class CarService {

    public Optional<Car> findCar(List<Car> cars, String input) {
        return cars.stream()
                .filter(c -> String.valueOf(c.id).equalsIgnoreCase(input)
                        || c.name.equalsIgnoreCase(input))
                .findFirst();
    }

    public boolean reserveCar(Car car, int days) {
        if (car.reserved || days < 1 || days > 30) return false;
        car.reserved = true;
        car.days = days;
        return true;
    }

    public double calculateTotal(Car car) {
        return car.days * car.price;
    }
}
