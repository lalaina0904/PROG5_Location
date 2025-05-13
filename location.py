# --- app location with python ---

from dataclasses import dataclass
from typing import List
from colorama import Fore, Style, init

init(autoreset=True)

@dataclass
class Car:
    id: int
    name: str
    reserved: bool
    days: int
    price: float

cars: List[Car] = [
    Car(1, "Peugeot 208", False, 0, 40),
    Car(2, "Toyota Corolla", False, 0, 45),
    Car(3, "Renault Clio", False, 0, 35),
    Car(4, "Ford Fiesta", False, 0, 50),
    Car(5, "Volkswagen Golf", False, 0, 55),
]

def display_welcome():
    print(Fore.CYAN + "\nBienvenue dans l'application de location de voitures !")

def display_menu():
    print("\n--- MENU PRINCIPAL ---")
    print("1 - RESERVER UNE VOITURE")
    print("2 - QUITTER")

def display_cars():
    print("\nListe des voitures disponibles :\n")
    for car in cars:
        status = (
            Fore.RED + f"Réservée ({car.days} jrs)"
            if car.reserved else Fore.GREEN + "Disponible"
        )
        print(f"[{car.id}] {car.name:<20} - {status}")

def find_car_by_input(input_str: str):
    return next(
        (c for c in cars if str(c.id) == input_str or c.name.lower() == input_str.lower()),
        None
    )

def reserve_car():
    input_str = input("\n Entrez l'ID ou le nom de la voiture : ").strip()
    car = find_car_by_input(input_str)

    if not car:
        print(Fore.YELLOW + "xxx Voiture introuvable xxx")
        return

    if car.reserved:
        print(Fore.YELLOW + "xxx Cette voiture est déjà réservée xxx")
        return

    try:
        days = int(input(" Nombre de jours de location (1-30) : ").strip())
        if not 1 <= days <= 30:
            print(Fore.YELLOW + "xxx Le nombre de jours doit être entre 1 et 30 xxx")
            return
    except ValueError:
        print(Fore.YELLOW + "xxx Entrée invalide xxx")
        return

    confirm = input(f" ? Confirmer la réservation de {car.name} pour {days} jours à {car.price}€/jour ? (o/n) : ").lower().strip()
    if confirm != 'o':
        print(Fore.YELLOW + " !!! Réservation annulée !!!")
        return

    car.reserved = True
    car.days = days
    total = car.price * days

    print(Fore.GREEN + "\n✅ RESERVATION CONFIRMÉE")
    print("-" * 40)
    print(f"Voiture : {car.name}")
    print(f"Durée   : {days} jours")
    print(f"Total   : {total:.2f} €")
    print("-" * 40)

def main():
    display_welcome()

    while True:
        display_cars()
        display_menu()

        choice = input("\n🡒 Votre choix : ").strip()

        if choice == "1":
            reserve_car()
        elif choice == "2":
            print(Fore.CYAN + "\n Merci et à bientôt ! \n")
            break
        else:
            print(Fore.YELLOW + "!!! Choix invalide. Réessayez !!!")

if __name__ == "__main__":
    main()
