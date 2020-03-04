browser.runtime.onMessage.addListener(notify);

listOfURLs = [];

function notify(message) {
    console.log("Reveived message");
    if (message.command === "add") {
        listOfURLs.push(message.url);
        console.log(message.url);
    } else if (message.command === "remove") {
        for (var i=0; i < listOfURLs.length; i++) {
            listOfURLs.splice(i, 1);
        }
    } else if (message.command === "clear") {
        listOfURLs.lenght = 0;
    } else if (message.command === "generate") {
        console.log("Generate list");
        const data = {'url_list': 'elomelo'};
        console.log(data);
        fetch('http://localhost:5000/generate', {
            method: 'POST',
            body: data,
        }).then((response) => {
            response.json().then((body) => {
                console.log(body.data)
            });
        });
    }
}