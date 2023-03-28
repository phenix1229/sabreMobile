const selectedItems = document.querySelectorAll('.group');
const groups = {
    parries : ['./sounds/prima.mp3','./sounds/seconda.mp3','./sounds/terza.mp3','./sounds/quarta.mp3','./sounds/quinta.mp3','./sounds/sesta.mp3','./sounds/septima.mp3'],
    footwork : ["./sounds/advance.mp3","./sounds/stepBack.mp3","./sounds/stepLeft.mp3","./sounds/stepRight.mp3","./sounds/advanceLeft.mp3","./sounds/advanceRight.mp3","./sounds/stepBackLeft.mp3","./sounds/stepBackRight.mp3","./sounds/passeAvant.mp3","./sounds/passeArrier.mp3"]
}
const selectIndex = (arr) => {
    let selection = Math.floor(Math.random() * arr.length);
    return selection;
}
let itemList = [];
let toBePlayed = [];
let index = 0;
const buildList = () => {
    for(const item of selectedItems){
        if(item.checked){
            itemList = groups[item.value];
            return itemList;
        }
    }
}
const randomize = (arr) => {
    while(toBePlayed.length < arr.length){
        let index = selectIndex(arr);
        if(toBePlayed.includes(arr[index])){
            index = selectIndex(arr);
        } else {
            toBePlayed.push(arr[index]);
        };
    };
}
const playSound = (file) => {
    audio = new Audio(file);
    audio.play()
}
const queue = () => {
    console.log(toBePlayed);
    audio = new Audio(toBePlayed[index]);
    audio.play();
    audio.onended = setTimeout(
        function(){
            if(index < toBePlayed.length){
                index++;
                queue();
            }
        }, 2000
    )
}
const playList = (arr) => {
    toBePlayed = [];
    randomize(arr);
    queue();
}
document.getElementById('#shuffle').addEventListener("click", function(event) {event.preventDefault();buildList();index = 0;playList(itemList)});
document.getElementById('#shuffle').addEventListener("touchstart", function(event) {event.preventDefault();buildList();index = 0;playList(itemList)});
document.getElementById('#replay').addEventListener("click", function(event) {event.preventDefault();index = 0;queue()});
document.getElementById('#replay').addEventListener("touchstart", function(event) {event.preventDefault();index = 0;queue()});