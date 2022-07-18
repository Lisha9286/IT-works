
    fetch('data.json')
        .then(function(res){
            return res.json()
        })
        .catch(error => console.log(error));
