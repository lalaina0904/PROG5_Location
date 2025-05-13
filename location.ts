const readline = require('readline');

interface Car {
    id: number;
    name: string;
    reserved: boolean;
    days: number;
    price: number;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const cars: Car[] = [
    { id: 1, name: 'Peugeot 208', reserved: false, days: 0, price: 40 },
    { id: 2, name: 'Toyota Corolla', reserved: false, days: 0, price: 45 },
    { id: 3, name: 'Renault Clio', reserved: false, days: 0, price: 35 },
    { id: 4, name: 'Ford Fiesta', reserved: false, days: 0, price: 50 },
    { id: 5, name: 'Volkswagen Golf', reserved: false, days: 0, price: 55 },
];

function ask(question: string): Promise<string> {
    return new Promise((resolve) => rl.question(question, resolve));
}

function displayCars(): void {
    console.log('\nListe des voitures :');
    cars.forEach((car) => {
        const status = car.reserved
            ? `Réservée (${car.days} jrs)`
            : 'Disponible';
        console.log(`[${car.id}] ${car.name} - ${status}`);
    });
}

async function reserveCar(): Promise<void> {
    const input = await ask("\nEntrez l'ID ou le nom de la voiture : ");
    const car = cars.find(
        (c) =>
            c.id.toString() === input ||
            c.name.toLowerCase() === input.toLowerCase()
    );

    if (!car) {
        console.log('\nxxx Voiture introuvable xxx');
        return;
    }

    if (car.reserved) {
        console.log('\nxxx Cette voiture est déjà réservée xxx');
        return;
    }

    const daysStr = await ask('Nombre de jours de location (1-30) : ');
    const days = parseInt(daysStr);

    if (isNaN(days) || days < 1 || days > 30) {
        console.log('\nxxx Nombre de jours invalide xxx');
        return;
    }

    const confirm = await ask(
        `Confirmer la réservation de ${car.name} pour ${days} jours à ${car.price}€/jour ? (o/n) : `
    );

    if (confirm.toLowerCase() !== 'o') {
        console.log('\nxxx Réservation annulée xxx');
        return;
    }

    car.reserved = true;
    car.days = days;
    const total = car.price * days;

    console.log(`\n------------------------\n\n✅ RESERVATION CONFIRMEE !
Voiture : ${car.name}
Durée : ${days} jours
Total : ${total.toFixed(2)} €
\n------------------------`);
}

async function main(): Promise<void> {
    console.log("\nBienvenue dans l'application de location de voitures !");

    while (true) {
        console.log('\n--- MENU PRINCIPALE ---');
        displayCars();

        console.log('\nOptions :');
        console.log('1 - RESERVER UNE VOITURE');
        console.log('2 - QUITTER');

        const choice = await ask('Choix : ');

        if (choice === '1') {
            await reserveCar();
        } else if (choice === '2') {
            console.log('\nÀ bientôt !\n');
            break;
        } else {
            console.log('xxx Choix invalide !!! Veuillez réessayer.');
        }
    }

    rl.close();
}

main();
