const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const cars = [
    { id: 1, name: 'Peugeot 208', reserved: false, days: 0, price: 40 },
    { id: 2, name: 'Toyota Corolla', reserved: false, days: 0, price: 45 },
    { id: 3, name: 'Renault Clio', reserved: false, days: 0, price: 35 },
    { id: 4, name: 'Ford Fiesta', reserved: false, days: 0, price: 50 },
    { id: 5, name: 'Volkswagen Golf', reserved: false, days: 0, price: 55 },
];

function displayCars() {
    console.log('\nListe des voitures : ');

    cars.forEach((car) => {
        const status = car.reserved
            ? `Réservée (${car.days} jrs)`
            : 'Disponible';
        console.log(`[${car.id}] ${car.name} - ${status}`);
    });
}

function ask(question) {
    return new Promise((resolve) => rl.question(question, resolve));
}

async function reserveCar() {
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
        console.log('\n xxx Réservation annulée xxx');
        return;
    }

    car.reserved = true;
    car.days = days;
    const total = car.price * days;

    console.log(
        `\n------------------------\n\n✅ RESERVATION CONFIRMEE !\nVoiture : ${
            car.name
        }\nDurée : ${days} jours\nTotal : ${total.toFixed(2)} € \n \n------------------------`
    );
}

async function main() {
    console.log("\nBienvenue dans l'application de location de voitures !");

    while (true) {
        console.log('\n---  MENU PRINCIPALE ---')

        displayCars();

        console.log('\nOptions :');
        console.log('1 - RESERVER UNE VOITURE');
        console.log('2 - QUITER');

        const choice = await ask('Choix : ');

        if (choice === '1') {
            await reserveCar();
        } else if (choice === '2') {
            console.log('\nÀ bientôt !');
            break;
        } else {
            console.log('xxx Choix invalide !!! Veuillez réessayer.');
        }
    }

    rl.close();
}

main();
