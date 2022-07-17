function sendPost(user) {
    fetch("https://httpbin.org/post", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application / json; charset=utf-8",
        },
    })
        .then((response) => response.json())
        .then((user) => {
            console.log(user);
        })
        .catch((error) => console.log(error));
}
