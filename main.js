let url = `https://ghibliapi.herokuapp.com/people`;
const select = document.querySelector('select');
const info = document.querySelector('#info');
const shoutout = document.querySelector('#shoutout');
const header4 = document.querySelector('h4');

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    for (let i = 0; i < data.length; i++) {
      const name = data[i].name;
      const createOpt = document.createElement('option');
      createOpt.textContent = name;
      createOpt.value = data[i].id;
      select.append(createOpt);
    }
  })
  .catch((err) => console.log(err));

select.addEventListener('change', (e) => {
  fetch(`${url}/${select.value}`)
    .then((res) => res.json())
    .then((data) => {
      info.innerHTML = '';
      const h4 = document.createElement('h4');
      // h4.innerHTML = select.options[select.selectedIndex].value;
      h4.innerHTML = `Name: ${data.name}`;

      const paragraph1 = document.createElement('p');
      paragraph1.innerHTML = `Age: ${data.age}`;

      const paragraph2 = document.createElement('p');
      paragraph2.innerHTML = `Eyes: ${data.eye_color}`;

      const paragraph3 = document.createElement('p');
      paragraph3.innerHTML = `Hair Color: ${data.hair_color}`;

      info.append(h4, paragraph1, paragraph2, paragraph3);

      const form = document.querySelector('form');

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = data.name;

        const shoutoutValue = shoutout.value;

        const ul = document.querySelector('ul');

        const list = document.createElement('li');
        list.innerHTML = '';

        list.innerHTML = `<strong>${name}:</strong> ${shoutoutValue}`;
        ul.append(list);

        const errorP = document.createElement('p');
        errorP.innerHTML = '';
        errorP.classList.add('error');
        errorP.innerHTML = `Please add a shoutout for ${name}`;
        // if(!)
        if (name && shoutoutValue) {
          errorP.style.display = ' none';
          return;
        }
        if (name && !shoutoutValue) {
          errorP.style.display = 'block';
          errorP.style.color = 'red';
          // errorP.style.fontWeight = 'bold';
          errorP.style.fontSize = '13px';
          form.append(errorP);
          return;
        }

        form.reset();
      });
    })
    .catch((err) => console.log(err));
});
