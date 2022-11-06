// spinner
const showSpinner = (displayProperty) => {
    document.getElementById('spinner').style.display = displayProperty;
} 

// search phone
const searchPhone = () => {
    const phoneInput = document.getElementById('phone-input');
    const phoneInputText = phoneInput.value;

    // show spinner
    showSpinner('block');

    // show error if nothing is written in input field
    if(!phoneInputText){
        document.getElementById('write-name').style.display = 'block';
    }
    else{
        document.getElementById('write-name').style.display = 'none';
        fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneInputText}`)
        .then(res => res.json())
        .then(data => showPhones(data.data));
    }
}

// show phones
const showPhones = (data) => {
    const phoneContainer = document.getElementById('phone-container');
    for(const phone of data){
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = ` 
        <div class="card border-0 shadow-lg">
            <img src="${phone.image}" class="card-img-top w-50 mx-auto my-4" alt="...">
            <div class="card-body">
                <h5 class="card-title">Name: ${phone.phone_name}</h5>
                <p class="card-text">Brand: ${phone.brand}</p>
            </div>
            <button onclick="loadDetails('${phone.slug}')" class="btn btn-secondary w-50 mx-auto mt-2 mb-4">Details</button>
        </div>
        `
        phoneContainer.appendChild(div);
    }

    // remove spinner
    showSpinner('none');
}

// load details

const loadDetails = (data) => {
    const url = `https://openapi.programming-hero.com/api/phone/${data}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.data));
}

// show details

const showDetails = (data) => {
    const detailContainer = document.getElementById('detail-container');
    detailContainer.textContent = '';
    const div =document.createElement('div');
    div.innerHTML = ` 
    <div class="card mx-auto my-5 border-0 shadow-lg" style="width: 18rem;">
        <img src="${data.image}" class="card-img-top w-50 mx-auto my-4" alt="...">
        <div class="card-body">
            <h5 class="card-title">Name: ${data.name}</h5>
            <p class="card-text">Brand: ${data.brand}</p>
            <p class="card-text">Realease Date: ${data.releaseDate ? data.releaseDate: 'Not Available'}</p>
            <p class="card-text">Chip Set: ${data.mainFeatures.chipSet}</p>
            <p class="card-text">Display Size: ${data.mainFeatures.displaySize}</p>
            <p class="card-text">Memory: ${data.mainFeatures.memory}</p>
            <p class="card-text">Storage: ${data.mainFeatures.storage}</p>
            <p class="card-text">Sensor-1: ${data.mainFeatures.sensors[0]}</p>
            <p class="card-text">Sensor-2: ${data.mainFeatures.sensors[1]}</p>
            <p class="card-text">Sensor-3: ${data.mainFeatures.sensors[2]}</p>
            <p class="card-text">Sensor-4: ${data.mainFeatures.sensors[3]}</p>
            <p class="card-text">Sensor-5: ${data.mainFeatures.sensors[4]}</p>
            <p class="card-text">Sensor-6: ${data.mainFeatures.sensors[5]}</p>
            <p class="card-text">Bluetooth: ${data.others.Bluetooth}</p>
            <p class="card-text">GPS: ${data.others.GPS}</p>
            <p class="card-text">NFC: ${data.others.NFC}</p>
            <p class="card-text">Radio: ${data.others.Radio}</p>
            <p class="card-text">USB: ${data.others.USB}</p>
            <p class="card-text">WLAN: ${data.others.WLAN}</p>
        </div>
    </div>
    `
    detailContainer.appendChild(div);
}