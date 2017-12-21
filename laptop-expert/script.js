function loadDatabase(file) {
  let xhr = new XMLHttpRequest();
  let text = "";
  xhr.open("GET", file, false);
  xhr.overrideMimeType("text/plain");
  xhr.onreadystatechange = function ()
  {
    if(xhr.readyState === 4)
    {
      if(xhr.status === 200 || xhr.status == 0)
      {
          text = xhr.responseText;
      }
    }
  }
  xhr.send(null);
  return text;
}

function composeQuery(parameters) {
  let processor = parameters.Processor.toLowerCase()
    , display   = (parameters.Screen_diagonal  == "") ? "" : parameters.Screen_diagonal.number
    , ram       = (parameters.Ram              == "") ? "" : parameters.Ram.number
    , storage   = (parameters.Drive            == "") ? "" : parameters.Drive.number
    , price     = (parameters["unit-currency"] == "") ? "" : parameters["unit-currency"].amount.toString();

  let args = (price == "")
    ? [display, processor, ram, storage, "Link"]
    : [display, processor, ram, storage, price, "Link"];

  let res = 
     "search_laptops(" 
      + args.map(x => x == "" ? "_" : x).join()
      +").";
  return res;
}

function parsePrologAnswer(text) {
  return text.match(/\[(.+)\]/)[1]
             .split(', ')
             .map(x => String.fromCharCode(parseInt(x)))
             .join('');
}

function handleDatabaseQuery(dbSession, queryText) {
  dbSession.query(queryText);
  let links = [];
  while (true) {
    dbSession.answer(x => { links.push(pl.format_answer(x)); });
    if (links[links.length-1] == "false.") {
      links.pop();
      break;
    }
  }
  console.log(links.map(parsePrologAnswer));

  const modal = document.getElementById('modal');
  modal.querySelector('div.w3-container').innerHTML =
    links.map(parsePrologAnswer).map(x => '<p><a href="'+x+'">'+x+'</a></p>').join('\n');
  modal.style.display='block';
  
}

//==========================================================================================
const client = new ApiAi.ApiAiClient({accessToken: 'fa11e78b8c6e4657a4779658ff60f485'});
const laptopDescription = document.getElementById("description"); 
const prolog = pl.create(10000);
const db = loadDatabase("database.pl");
prolog.consult(db);


function sendQuestion() {
  const promise = client.textRequest(laptopDescription.value);
  promise
      .then(handleResponse)
      .catch(handleError);

  function handleResponse(serverResponse) {
    switch (serverResponse.result.action) {
      case "search":
        handleDatabaseQuery(prolog, composeQuery(serverResponse.result.parameters));
        break;
    
      default:
        alert("Enter proper description");
        break;
    }    
  }
  function handleError(serverError) {
    console.log(serverError);
  }
}


