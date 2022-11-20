console.log('%c HI', 'color: firebrick')

let breedList = null;
let filterLetter = 'none';

const init = () => {

    const pics = getId('dog-image-container');
    breedList = getId('dog-breeds');
    const letterDropdown = getId('breed-dropdown');
    
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(res => res.json())
    .then(json => json.message.forEach(cv => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('imgDiv');
        const img = document.createElement('img');
        img.src = cv;
        img.alt = cv;
        imgDiv.appendChild(img);
        pics.appendChild(imgDiv);
    }));

    fetchBreeds();

    letterDropdown.addEventListener('change', e => {
        filterLetter = e.target.value;
        breedList.textContent = '';
        fetchBreeds();
    })

    document.addEventListener('click',handleFocus);
    
}

document.addEventListener('DOMContentLoaded',init);

/////////////////////////////////////////////////////////

function getId(id) {
    return document.getElementById(id);
}
    
function clearClasses(selector,newClasses) {
    document.querySelectorAll(selector).forEach(cvSuper => {
        const classStatic = [...cvSuper.classList];
        for(let i = 0; i < classStatic.length - 1; ++i) {
            cvSuper.classList.remove(classStatic[i]);
        }
        if(typeof newClasses === Array) {
            newClasses.forEach(cvSub => cvSuper.classList.add(cvSub));
        } else cvSuper.classList.add(newClasses);
    });
}

function handleFocus(e) {
    document.querySelectorAll('*').forEach(cv => {
        cv.classList.remove('focused');
    })
    e.target.classList.add('focused');
}

function filterByFunctions(array,...functions) {
    let newArray = [...array];
    for(fn of functions) {
        newArray = fn(newArray);
    }
    return newArray;
}

function filterByStartLetter(array) {
    const newArray = array.filter(cv => cv.startsWith(filterLetter));
    console.log(array);
    console.log(array.filter(cv => cv.startsWith(filterLetter)));
    if (filterLetter === "none") return array;
    else return newArray;
}

function fetchBreeds() {
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(res => res.json())
        .then(json => {
            const unFilt = [];
            console.log(json.message.bulldog[0]);
            for(keySuper in json.message) {
                console.log(json.message[keySuper][0]);
                if (json.message[keySuper][0]) {
                    for(keySub in json.message[keySuper]) unFilt.push(json.message[keySuper][keySub] + ' ' + keySuper);
                } else unFilt.push(keySuper);
                };
            
            const filtered = filterByFunctions(unFilt,filterByStartLetter);
            filtered.forEach(cv => {
                const li = document.createElement('li');
                li.textContent = cv;
                breedList.appendChild(li);
            })
            
        });
};

/* Deprecated vv

for(keySuper in json.message) {
    if (Object.keys(json.message[keySuper]).length) {
        for(keySub in json.message[keySuper]) {
            const list = document.createElement('li');
            list.textContent = json.message[keySuper][keySub] + ' ' + keySuper;
            breedList.appendChild(list);
        }

    } else {
        const list = document.createElement('li');
        list.textContent = keySuper;
        breedList.appendChild(list);
    };
} */

//first make list of all breeds, then filter, then make <p>s

