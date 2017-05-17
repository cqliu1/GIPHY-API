$(document).ready(function() {

	// variables
	var topics = ["aardvark","albatross","alligator","alpaca","antelope",	// Collection of words used in the game
				"arctic fox","armadillo","axolotl","baboon","badger",
				"bandicoot","barnacle","barracuda","basilisk","beaver",
				"beetle","bobcat","bonobo","buffalo","bumble bee",
				"butterfly","camel","canary","capybara","caterpillar",
				"centipede","chameleon","cheetah","chicken","chimpanzee",
				"chinchilla","chipmunk","cougar","coyote","crane",
				"crocodile","cuttlefish","dingo","dolphin","dolphin",
				"donkey","dragonfly","dugong","eagle","earthworm",
				"elephant","falcon","falcon","ferret","flamingo","gazelle",
				"gecko","gecko","gibbon","gila monster","giraffe","goose",
				"gopher","gorilla","guinea pig","hamster","hedgehog",
				"hippopotamus","horse","hyena","iguana","impala","jackal",
				"jaguar","jellyfish","kangaroo","koala","komodo dragon",
				"krill","lemming","lemur","leopard","llama","lobster",
				"manatee","mandrill","manta ray","marmoset",
				"meerkat","millipede","mongoose","monkey","moray eel",
				"mouse","nightingale","ocelot","octopus","opossum",
				"orangutan","ostrich","otter","oyster","panda","panther",
				"panther","peacock","penguin","pirahna","platypus",
				"polar bear","porcupine","puffer fish","rabbit",
				"raccoon","reindeer","rhinoceros","rooster","salamander",
				"scorpion","sea cucumber","sea lion","sea sponge",
				"seahorse","shark","sheep","sloth","snail","snake",
				"sparrow","squid","squirrel","starfish","stingray",
				"sturgeon","tamarin","tapir","tiger","tortoise","toucan",
				"turtle","vampire bat","walrus","warthog","weasel","whale",
				"wildebeast","wolverine","wombat","woodchuck","zebra"];

	// function
	var addButton = function(topic) {
		var button = $("<button>").addClass("topic").attr("data-topic",topic).text(topic);

		button.on("click", function() {
			var term = $(this).attr("data-topic");
			var apiKey = "dc6zaTOxFJmzC";
			var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + term +"&limit=10&api_key=" + apiKey;

			$.ajax({
				url: queryUrl,
				method: "GET"
			}).done(function(response){
				console.log(response);

				$("#gifs").empty();

				var data = response.data;

				for( var i = 0; i < data.length; i++) {
					var gifDiv = $("<div>").addClass("gif-wrapper");
					var rating = $("<p>").text("Rating: " + data[i].rating);
					var gif = $("<img>").addClass("gif");
					gif.attr("src",data[i].images.fixed_height_still.url);
					gif.attr("data-state","still")
					gif.attr("data-still",data[i].images.fixed_height_still.url);
					gif.attr("data-animate",data[i].images.fixed_height.url);
					
					gif.on("click", function() {
						var state = $(this).attr("data-state");

						if(state === "still") {
							$(this).attr("data-state","animate");
							$(this).attr("src",$(this).attr("data-animate"));
						} else if(state === "animate") {
							$(this).attr("data-state","still");
							$(this).attr("src",$(this).attr("data-still"));
						}
					});

					rating.appendTo(gifDiv);
					gif.appendTo(gifDiv);

					$("#gifs").append(gifDiv);
				}
				
			});
		});

		$("#topics").append(button);
	}

	var addAllTopics = function() {
		for(var i = 0; i < topics.length; i++) {
			addButton(topics[i]);
		}
	}

	// event listeners
	$("#add").on("click", function(event) {
		// prevent page from refreshing
		event.preventDefault();

		var topic = $("#topic-input").val().trim()

		if(topic.length > 0) {
			topics.push(topic);
			addButton(topic);
		}
	});

	

	// add all topic buttons when page loads
	addAllTopics();
});