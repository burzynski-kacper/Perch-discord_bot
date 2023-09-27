require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

//Permisje bota
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds, 
        IntentsBitField.Flags.GuildMembers, 
        IntentsBitField.Flags.GuildMessages, 
        IntentsBitField.Flags.MessageContent
    ]
})

//importowanie modułu fs do operacji na plikach
const fs = require('fs');
const userDataFilePath = 'records.json';

//funkcja do wczytania danych z pliku
function loadUserData(){
    try{
        const rawData = fs.readFileSync(userDataFilePath);
        return JSON.parse(rawData);
    } catch (error){
        return{};
    }
}

//funkcja do zapisu danych do pliku JSON
function saveUserData(userData){
    fs.writeFileSync(userDataFilePath, JSON.stringify(userData, null, 4));
}

//funckja do wczytania i wyboru wiersza z pliku txt
function getRandomLineFromFile(file){
    const lines = fs.readFileSync(file, 'utf-8').split('\n');
    const randomIdx = Math.floor(Math.random() * lines.length);
    return lines[randomIdx];
}

//funkcja do wczytania pliku tekstowego
function loadTxt(file){
    const lines = fs.readFileSync(file, 'utf-8').split('\n');
    return lines.join('\n');
}

//Jeśli jest online to komunikat w konsoli
client.on('ready', (c) => {
    console.log(`${c.user.username} is online.`);
});

const fishes = [
    'Boleń',
    'Jaź', 
    'Jelec', 
    'Jesiotr',
    'Karaś', 
    'Karp',
    'Kleń',
    'Leszcz',
    'Lin',
    'Okoń',
    'Płoć',
    'Rozpiór',
    'Sandacz',
    'Sum',
    'Szczupak',
    'Ukleja',
    'Węgorz',
    'Wzdręga',
    'Żaglica'
];

//Jeśli jakaś wiadomość zostanie wysłana
client.on('messageCreate', (message) => {

    const authorId = message.author.id;
    const content = message.content;
    const channel = message.channel;

    const userData = loadUserData();    // <-- wczytanie danych z pliku

    // -=-=-=-=-=-=] FUNKCJE [=-=-=-=-=-=-
    //------------fotki rybek
    function fishPic(typeOfFish){
        channel.send({
            files: [`Images/${typeOfFish}.png`]
        });
    }

    //-----------lista komend !Lista
    function listOfFishes(){
        const fishList = fishes.map(fish => `- ${fish}`).join('\n');
        channel.send(`Lista ryb:\n${fishList}`);
    }

    //-----------rokordy - zyciowki
    function updatePersonalBest(){
        const args = content.split(' ');
        if (args.length === 4 && args[0] === '!Rekord') {
            const fishName = args[1];
            const sizeOfFish = args[2];
            const place = args[3];

            if (!userData[authorId]) {
                userData[authorId] = {};
            }
            const newData = sizeOfFish+' '+place;
            userData[authorId][fishName] = newData;
            saveUserData(userData);

            channel.send(`Rekord ${fishName} - ${newData} został dodany dla użytkownika ${message.author.username}.`);

        }
    }

    //------------wyswietl zyciowki
    function personalBests(){
        const targetUsername = content.slice(9);
        const targetUser = message.guild.members.cache.find(member => member.user.username === targetUsername);

        if (targetUser && userData[targetUser.id]) {
            const recordsList = Object.entries(userData[targetUser.id])
                .map(([fish, sizeANDplace]) => `\n- ${fish} - ${sizeANDplace}`);

            channel.send(`Rekordy użytkownika ${targetUsername}: ${recordsList}`);
        } else {
            channel.send(`Nie znaleziono rekordów użytkownika ${targetUsername}.`);
        }
    }

    if (message.author.bot || !content.startsWith('!')){
        return;
    }

    // Zdjęcia ryb
    for (const fish of fishes) {
        const command = `!${fish}`;
        
        if (content === command) {
           fishPic(fish);
        }
    }
    
    // Lista ryb
    if (content === '!Lista') {
        listOfFishes();
    }
    
    // Aktualizacja rekordów ryb
    if (content.startsWith('!Rekord ')) {
        updatePersonalBest();
    }

    // Wyświetlanie rekordów
    if (content.startsWith('!Rekordy')) {
        personalBests();
    }

    // Komenda !Help
    if (content === '!Help') {
        channel.send(loadTxt('list.txt'));
    }
    // Ciekawostki
    if (content === '!Ciekawostka') {
        channel.send(getRandomLineFromFile('curiosities'));
    }
})
//Logowanie 
client.login(process.env.TOKEN);


//Przeciwko crashom
client.on("debug", () => {})
client.on("warn", () => {})
client.on("error", () => {})