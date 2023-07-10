let message_box = document.getElementById("msg");
message_box.innerHTML = "Message here.";

fetch("https://api.lynxgamestore.com/hello/person")
.then(response => { return response.text(); })
.then(text => {
    message_box.innerHTML = text;
    console.log("Message was written.");
});

console.log("Final line.");