const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const axios = require("axios");
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.post("/", function (req,res){

    let country = req.body.country;

    axios
        .get(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`)
        .then(response => {

            res.render("index", {
                pageTitle: "Home",
                pageNotFound: "Ooops. Page not found. Try something else...",
                pageTest: "Page test",
                path: "",
                data: response.data[0]
            });
        })
        .catch(error => {
            console.log(error);
        });
    

})

app.get("/", function (req, res) {
	res.render("index", {
		pageTitle: "Home page",
		pageNotFound: "Oops. Page Not Found. Try something else",
		pageTest: "Page Test",
		path: "",
		data: {
			name: null,
			topLevelDomain: null,
			capital: null,
			region: null,
			subregion: null,
			population: null,
			timezones: null,
			demonym: null,
			currencies: null,
			flag: null
		}
	});
});


app.listen(process.env.PORT || 3000, () => {
	console.log("Server has started");
});