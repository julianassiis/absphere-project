const myKey = "563492ad6f91700001000001a3c5491964bc455fa8c04bfb9ed5a67b";
const container = document.getElementById("content");
let imgContainer;
let color = "";
let ogPhotos = [];
let newPhotos = [];

const input = document.getElementById("search");

let above = false;
let below = false;
let alphabetical = false;

/*search input reader*/
input.addEventListener("input",e =>{
    color=e.target.value;
})

getAbstract();

function displayPhotos(images) {
    images.map(image => {
        /*console.log(image);*/

        imgContainer = `<div class="col-xl-4 col-lg-6 col-sm-12">
                        <article class="post-grid mb-5">
                        <a class="photolink" href="${image.url}"><img src=${image.src.landscape} class="img-fluid shadow mb-3" alt=${image.alt} /></a>
                        
						<h3 class="post-title my-2 d-inline"><a href="${image.photographer_url}">${image.photographer}</a></h3>
						<p class="m-0 mt-1 cat-name text-color font-sm font-extra text-uppercase letter-spacing">Dimensions: ${image.width}x${image.height}</p>
						<p class="m-0 cat-name text-color font-sm font-extra text-uppercase letter-spacing">Average color: ${image.avg_color}</p>

						</article></div>`;
        container.innerHTML += imgContainer;
    })
}

function getAbstract() {
    fetch(`https://api.pexels.com/v1/search?query=abstract&per_page=30&color=${color}`,{
        headers: {
            Authorization: myKey
        }
    })

        .then(resp => {
            return resp.json()
        })
        .then(data => {
            displayPhotos(data.photos);

            newPhotos = data.photos.map( element => {
                return element;
            })
            console.log(newPhotos);
			ogPhotos = newPhotos;
        })
}

/*search*/
function searchPhotos() {
    clearAll();
    getAbstract();
}

/*filter 1*/
function getAbove() {
	if (below) {
		getBelow()
	}
	if (above) {
		document.getElementById("abovebtn").style.backgroundColor = '#f0f0f0';
		newPhotos = ogPhotos;
	} else {
		document.getElementById("abovebtn").style.backgroundColor = '#cc6600';
		newPhotos = newPhotos.filter(element => {
			return element.width > 4000;
		});
	}
	above = !above;
   
    /*console.log(newPhotos);*/
    clearAll();
    displayPhotos(newPhotos);
}

/*filter 2*/
function getBelow() {
	if (above) {
		getAbove()
	}
	if (below) {
		document.getElementById("belowbtn").style.backgroundColor = '#f0f0f0';
		newPhotos = ogPhotos;
	} else {
		document.getElementById("belowbtn").style.backgroundColor = '#cc6600';
		newPhotos = newPhotos.filter(element => {
			return element.width <= 4000;
		});
	}
	below = !below;
    
    /*console.log(newPhotos);*/
    clearAll();
    displayPhotos(newPhotos);
}

/*sort*/
function getAlphabetical() {
	if (alphabetical) {
		document.getElementById("alphabetbtn").style.backgroundColor = '#f0f0f0';
		if (above) {
			newPhotos = ogPhotos.filter(element => {
				return element.width > 4000;
			});
		} else if (below) {
			newPhotos = ogPhotos.filter(element => {
				return element.width <= 4000;
			});
		}
	} else {
		document.getElementById("alphabetbtn").style.backgroundColor = '#cc6600';
		newPhotos = newPhotos.sort(function (a, b) {
			if (a.photographer < b.photographer) {
				return -1;
			}
			if (a.name > b.name) {
				return 1;
			}
			return 0;
		});
	}
	alphabetical = !alphabetical;

    /*console.log(newPhotos);*/
    clearAll();
    displayPhotos(newPhotos);
}

function resetAll() {
	document.getElementById("abovebtn").style.backgroundColor = '#f0f0f0';
	document.getElementById("belowbtn").style.backgroundColor = '#f0f0f0';
	document.getElementById("alphabetbtn").style.backgroundColor = '#f0f0f0';
	above = false;
	below = false;
	alphabetical = false;
	
	newPhotos = ogPhotos;
	clearAll();
    displayPhotos(newPhotos);
}

function clearAll() {
    document.getElementById("content").innerHTML="";
}