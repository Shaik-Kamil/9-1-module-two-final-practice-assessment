let url = `https://ghibliapi.herokuapp.com/people`;
const select = document.querySelector('select');
const info = document.querySelector('#info');
const shoutout = document.querySelector('#shoutout');
const header4 = document.querySelector('h4');
const body = document.querySelector('body');
const ul = document.querySelector('ul');
const form = document.querySelector('form');

let fetchCall;
// function populateDropDown() {
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    fetchCall = data;
    // console.log(fetchCall);
    for (let i = 0; i < data.length; i++) {
      const name = data[i].name;
      const age = data[i].age;
      const createOpt = document.createElement('option');
      createOpt.textContent = name;
      createOpt.value = name;
      select.append(createOpt);
    }
  })
  .catch((err) => console.log(err));

//! select add event listener

select.addEventListener('change', () => {
  const callBack = fetchCall.find(
    (element) => element.name === `${select.value}`
  );
  console.log(callBack);

  info.innerHTML = '';
  const h4 = document.createElement('h4');

  h4.innerHTML = `Name: ${callBack.name}`;

  const paragraph1 = document.createElement('p');
  paragraph1.innerHTML = `Age: ${callBack.age}`;

  const paragraph2 = document.createElement('p');
  paragraph2.innerHTML = `Eyes: ${callBack.eye_color}`;

  const paragraph3 = document.createElement('p');
  paragraph3.innerHTML = `Hair Color: ${callBack.hair_color}`;

  info.append(h4, paragraph1, paragraph2, paragraph3);
});

//! form add event listener

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = `${select.value}`;
  const shoutoutValue = shoutout.value;
  // console.log(shoutoutValue);

  const list = document.createElement('li');
  list.innerHTML = `<strong>${name}:</strong> ${shoutoutValue}`;
  ul.append(list);

  const errorP1 = document.createElement('p');
  errorP1.innerHTML = '';
  // errorP1.classList.add('error');
  errorP1.innerHTML = `Please Select a Person`;
  const errorP = document.createElement('p');
  errorP.innerHTML = '';
  errorP.classList.add('error');
  errorP.innerHTML = `Please add a shoutout for ${name}`;
  if (!`${select.value}`) {
    errorP1.style.display = 'block';
    errorP1.style.color = 'red';
    errorP1.style.fontWeight = 'bold';
    errorP1.style.fontSize = '13px';
    form.append(errorP1);
    select.addEventListener('click', () => {
      errorP1.innerHTML = '';
    });

    return;
  }

  if (!shoutoutValue) {
    errorP.style.display = 'block';
    errorP.style.color = 'red';
    errorP.style.fontWeight = 'bold';
    errorP.style.fontSize = '13px';
    form.append(errorP);
    shoutout.addEventListener('click', () => {
      errorP.innerHTML = '';
    });
    return;
  } else if (shoutoutValue) {
    errorP.style.display = 'none';
    return;
  }

  form.reset();
});

//! remove button
const button = document.createElement('button');
button.setAttribute('id', 'reset-shoutouts');
button.innerText = 'Remove Shoutouts';

// button.style.textAlign = 'center';
body.append(button);
button.addEventListener('click', () => {
  // const ul = document.getElementsByTagName('ul');
  ul.innerHTML = '';
});
