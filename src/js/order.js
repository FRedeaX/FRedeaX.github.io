(function() {
    
  const orderForm = document.querySelector('.order-form'),
        orderButton = document.querySelector('.order-form__submit');

  orderButton.addEventListener('click', (event)=>{
    event.preventDefault()

    if (validateForm(orderForm)) {
      const data = {
        name: orderForm.elements.name.value,
        phone: orderForm.elements.phone.value,
        // street: orderForm.elements.street.value,
        // house: orderForm.elements.house.value,
        // body: orderForm.elements.body.value,
        // flat: orderForm.elements.flat.value,
        // floor: orderForm.elements.floor.value,
        comment: orderForm.elements.comment.value,
        email: 'email@test'
      };
      let formData = new FormData();
      formData.append('name', data.name);
      formData.append('phone', data.phone);
      formData.append('comment', data.comment);
      formData.append('email', data.email);
      
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail/fail');
      xhr.send(formData);
      xhr.addEventListener('load', ()=> {
        if (xhr.response.status) {
          document.body.appendChild(createModal(xhr.response.message));
        } else {
          document.body.appendChild(createModal(xhr.response.message));
        }
        
      })
    };
  });

  function validateForm(form) {
    let valid = true;

    if (!form.elements.name.checkValidity()) valid = !valid;
    if (!form.elements.phone.checkValidity()) valid = !valid;
    if (!form.elements.street.checkValidity()) valid = !valid;
    if (!form.elements.house.checkValidity()) valid = !valid;
    if (!form.elements.body.checkValidity()) valid = !valid;
    if (!form.elements.flat.checkValidity()) valid = !valid;
    if (!form.elements.floor.checkValidity()) valid = !valid;
    if (!form.elements.comment.checkValidity()) valid = !valid;

    return valid
  };

  function createModal(content) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const container = document.createElement('div');
    container.classList.add('modal__container');
    modal.appendChild(container);

    const title = document.createElement('div'),
          button = document.createElement('button');
    title.classList.add('modal__title');
    title.innerText = content;
    button.classList.add('modal__button');
    button.classList.add('btn');
    button.classList.add('btn--color--green');
    button.type = 'button';
    button.innerText = 'Закрыть';
    container.appendChild(title);
    container.appendChild(button);

    modal.addEventListener('click', (event)=>{
      const target = event.target;
      if (!(target === container || target === title)) {
        modal.remove();
      }
      // if (e.keyCode === 27) {
      //   modal.remove();
      // }
    })

    return modal
  };

})()
