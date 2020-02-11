//call petfinder api

//var breed;
//var sex;
//var zipcode;
//var breed = "Siamese"; Balinese
//var sex = "F";
//var zipcode = "27704";


$("#submitBtn").on("click", function(){
  var breed = $("#breed").val();
  var sex = $("#sex").val();
  var zip = $("#zip").val();

$.ajax({
  url: "http://api.petfinder.com/pet.find?key=2f95f51b181ddd27883e91878e922466&animal=cat&breed=" + breed +"&sex=" + sex + "&location=" + zip + "&format=json",
  dataType: "jsonp",
  Method: "GET"   
})

.done(function(data){

      var result1 = data.petfinder.pets.pet[19].media.photos.photo[2].$t;

      console.log(data);
      console.log(result1);
       
     var photo1 =  $("<img>").attr("src" , result1);
     photo1.css()



     $("#showPhotos").append(photo1);
})

})




//Dog and Cat breed info and pic
var dogBreed;
var catBreed;
var breedId;
var wantedBreed;

$("#catSearchBtn").on("click", function (event) {
  event.preventDefault();

  catBreed = $("#catSearch").val();
  $("#catSearch").val("");
  catSearch();
});

$("#dogSearchBtn").on("click", function (event) {
  event.preventDefault();
  dogBreed = $("#dogSearch").val();
  $("#dogSearch").val("");
  $("#dogContent").empty();
  $("#dogImg").attr("src", "");
  dogSearch();
});



function catSearch() {

  var queryURL = "https://api.thecatapi.com/v1/breeds/search?q=" + catBreed + "&api_key=89916d17-0951-4678-b49b-662c62818c70";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    j = 0;
    $("#catContent").empty();
    $("#catImg").attr("src", "");
    if (!response[0]) {
      $("#alertCat").removeClass("hide");
    }

    else if (response.length > 1) {
      $("#alertCat").addClass("hide");
      var choice = $("<p>").text("Choose which cat breed you wanted:");
      $("#catContent").append(choice);
      for (var i = 0; i < response.length; i++) {
        var catChoices = $("<button>").text(response[i].name).addClass("catChoiceBtn");
        $("#catContent").append(catChoices);
      }

      $(document).on("click", ".catChoiceBtn", function (event) {
        event.stopImmediatePropagation();
        console.log("cat btn click");
        event.preventDefault();
        $("#catContent").empty();
        $("#catImg").attr("src", "");
        wantedBreed = $(this).text();
        for (var i = 0; i < response.length; i++) {
          //console.log(response[i].name, wantedBreed);
          if (wantedBreed == response[i].name) {
            breedId = response[i].id;
            //console.log("cat search call");
            console.log("You wanted: " + response[i].name);
            $(".catChoiceBtn").remove();
            $(choice).remove();
            j = i;
            $("#catContent").prepend("<p>Life Span: " + response[j].life_span + " years</p>");
            $("#catContent").prepend("<p>Weight: " + response[j].weight.imperial + " lbs</p>");
            $("#catContent").prepend("<p>Temperament: " + response[j].temperament + "</p>");
            $("#catContent").prepend("<h4>" + response[j].name + "</h4>");
          }
        }
        catImgSearch(breedId);

      });
    }
    else if (response.length = 1) {
      console.log("You wanted: " + response[0].name);
      breedId = response[0].id;
      console.log(breedId + "breedID");
      catImgSearch(breedId);
      $("#catContent").prepend("<p>Life Span: " + response[j].life_span + " years</p>");
      $("#catContent").prepend("<p>Weight: " + response[j].weight.imperial + " lbs</p>");
      $("#catContent").prepend("<p>Temperament: " + response[j].temperament + "</p>");
      $("#catContent").prepend("<h4>" + response[j].name + "</h4>");
      catImgSearch(breedId);
    }

  });
}


function dogSearch() {
  var queryURL = "https://api.thedogapi.com/v1/breeds/search?q=" + dogBreed + "&api_key=89916d17-0951-4678-b49b-662c62818c70";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);


    if (!response[0]) {
      $("#alertDog").removeClass("hide");
    }
    else {
      $("#alertDog").addClass("hide");
      if (response.length > 1) {
        var choice = $("<p>").text("Choose which dog breed you wanted:");
        $("#dogContent").append(choice);
        for (var i = 0; i < response.length; i++) {
          var dogChoices = $("<button>").text(response[i].name).addClass("dogChoiceBtn");
          $("#dogContent").append(dogChoices);
        }
        $(document).on("click", ".dogChoiceBtn", function (event) {
          event.stopImmediatePropagation();
          $("#dogContent").empty();
          $("#dogImg").attr("src", "");
          wantedBreed = $(this).text();
          for (var i = 0; i < response.length; i++) {
            console.log(response[i].name, wantedBreed);
            if (wantedBreed == response[i].name) {
              breedId = response[i].id;
              console.log("You wanted: " + response[i].name);
              $(".dogChoiceBtn").remove();
              $(choice).remove();
              $("#dogContent").prepend("<p>Life Span: " + response[i].life_span + " years</p>");
              $("#dogContent").prepend("<p>Weight: " + response[i].weight.imperial + " lbs</p>")
              $("#dogContent").prepend("<p>Temperament: " + response[i].temperament + "</p>");
              $("#dogContent").prepend("<h4>" + response[i].name + "</h4>");
              dogImgSearch(breedId);
            }
          }

        });

      }
      else {

        breedId = response[0].id;
        $("#dogContent").prepend("<p>Life Span: " + response[0].life_span + " years</p>");
        $("#dogContent").prepend("<p>Weight: " + response[0].weight.imperial + " lbs</p>")
        $("#dogContent").prepend("<p>Temperament: " + response[0].temperament + "</p>");
        $("#dogContent").prepend("<h4>" + response[0].name + "</h4>");
        dogImgSearch(breedId);
      }
    }

  });

}

function catImgSearch(breedId) {

  console.log(breedId + " cat image search");
  queryURL = "https://api.thecatapi.com/v1/images/search?breed_id=" + breedId + "&api_key=89916d17-0951-4678-b49b-662c62818c70";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    console.log()
    if (response[0]) {
      $("#catImg").attr("src", response[0].url);
      $("#catImg").css("width", "300px");
    }
    else {
      $("#catContent").append("<p>[No Picture Available]</p>");
    }

  });
}


function dogImgSearch(breedId) {

  queryURL = "https://api.thedogapi.com/v1/images/search?breed_id=" + breedId + "&api_key=89916d17-0951-4678-b49b-662c62818c70";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    if (response[0]) {
      $("#dogImg").attr("src", response[0].url);
      $("#dogImg").css("width", "300px");
    }
    else {
      $("#dogContent").append("<p>[No Picture Available]</p>")
    }

  });
}


//hides user error alert when they click the 'x'
function alertHide() {
  $("#alertCat").addClass("hide");
  $("#alertDog").addClass("hide");
}


