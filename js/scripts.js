(_ => {

    window.addEventListener('load', _ => {

        const authInfo = {
            login: 'admin',
            password: 'nimda'
        };

        const getCookie = function(name) {
            let matches = document.cookie.match(new RegExp(
              "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));

            return matches ? decodeURIComponent(matches[1]) : undefined;
        };

        const auth = function() {
            let form = this.closest('.form'),
                inputLogin = form.querySelector('input[name="login"]').value,
                inputPass = form.querySelector('input[name="password"]').value;

            console.log(inputLogin, inputPass);

            if(inputLogin === authInfo.login &&
                inputPass === authInfo.password) {
                    document.cookie = 'auth=true';
                    document.cookie = 'authLogin=' + inputLogin;
                    window.location = '/app.html';
            } else {
                alert('Login or password is incorrected');
            }
        };

        const logout = function() {
            if (!getCookie('auth') || !getCookie('authLogin')) return;

            document.cookie = 'auth=; max-age=-1' // max-age=-1 -- удфляет соответствующую кук
            document.cookie = 'authLogin=; max-age=-1'
            
            if (!getCookie('auth')) window.location.reload();
        };

        if (window.location.pathname == '/app.html' && !getCookie('auth'))
            window.location = '/index.html';


        if (window.location.pathname == '/index.html' && getCookie('auth') === 'true')
            window.location = '/app.html';

        let buttonSingin = document.querySelector('.form .signin'),
            buttonLogout = document.querySelector('.contacts .logout');
        
        if (buttonSingin) buttonSingin.addEventListener('click', auth);
        if (buttonLogout) buttonLogout.addEventListener('click', logout);


        //second part, video 12.3

        let contactsData = [];

        const contactsUpdate = function() {
            let localContactsData = localStorage.getItem('contactsData');
            if(localContactsData.length > 0) contactsData = JSON.parse(localContactsData);

            let contactsList = document.querySelector('.contacts_list ul');
            contactsList.innerHTML = '';
            contactsData.forEach(function(contact, id) {
                let elemContact = document.createElement('li');

                elemContact.innerHTML = `
                    <div class="id">${id + 1}</div>
                    <div class="name">${contact.name}</div>
                    <div class="phone">${contact.phone}</div>
                `;

                contactsList.appendChild(elemContact);
            });
        };

        const contactAdd = function() {
            let form = this.closest('.form_add'),
                inputName = form.querySelector('input[name="name"]').value,
                inputPhone = form.querySelector('input[name="phone"]').value;

            if (inputName.length == 0 ||
                inputName == ' ' ||
                inputPhone.length == 0 ||
                inputPhone == ' ') return;

            let contact = {
                name: inputName,
                phone: inputPhone
            };

            contactsData.push(contact);
            localStorage.setItem('contactsData', JSON.stringify(contactsData));
            
            contactsUpdate();

            sessionStorage.removeItem('contactInputName');
            sessionStorage.removeItem('contactInputPhone');
        };

        const contactSave = function() {
            let form = this.closest('.form_add'),
                inputName = form.querySelector('input[name="name"]').value,
                inputPhone = form.querySelector('input[name="phone"]').value;
        
            if (inputName.length == 0 ||
                inputName == ' ' ||
                inputPhone.length == 0 ||
                inputPhone == ' ') return;

            sessionStorage.setItem('contactInputName', inputName);
            sessionStorage.setItem('contactInputPhone', inputPhone);
        };

        let buttonAdd = document.querySelector('.form_add .add'),
            buttonSave = document.querySelector('.form_add .save');
        
        if (buttonAdd) buttonAdd.addEventListener('click', contactAdd);
        if (buttonSave) buttonSave.addEventListener('click', contactSave);
 
        
        if (window.location.pathname == '/app.html') {
            contactsUpdate();

            let contactInputName = sessionStorage.getItem('contactInputName'),
                contactInputPhone = sessionStorage.getItem('contactInputPhone');
            
            if (contactInputName && contactInputName.length > 0 &&
                contactInputPhone && contactInputPhone.length > 0) {
                let form = document.querySelector('.form_add'),
                    inputName = form.querySelector('input[name="name"]'),
                    inputPhone = form.querySelector('input[name="phone"]');
            
                inputName.value = contactInputName;
                inputPhone.value = contactInputPhone;    
            }
        }
                
        /* ----------------- sessionStorage && localStorage --------------- */
        
        /*
            setItem()
            getItem()
            removeItem()
            clear()
            length
        */

        //  // создание ключа
        //  window.sessionStorage.setItem('user', 'Bob');
        //  window.localStorage.setItem('user', 'Alex');
        //  
        //  window.sessionStorage.setItem('user2', 'Peter');
        //  window.localStorage.setItem('user2', 'Bill');
  
        //  //получение ключа
        //  console.log(window.localStorage.getItem('user'), window.localStorage.getItem('user2'));
        //  console.log(window.sessionStorage.getItem('user'), window.sessionStorage.getItem('user2'));
  
        //  //удаление ключей
        //  window.localStorage.removeItem('user2');
        //  window.sessionStorage.removeItem('user2');

        //  //для полного очищения хранилища
        //  window.localStorage.clear();
        //  window.sessionStorage.clear();
  
        //  window.sessionStorage.setItem('test', '1');
        //  window.sessionStorage.setItem('test2', '2');
  
        //  window.localStorage.setItem('test', '1');
        //  window.localStorage.setItem('test2', '2');
        //  window.localStorage.setItem('test3', '3');
  
        //  console.log(window.sessionStorage.length);
        //  console.log(window.localStorage.length);
  
        //  let keys = Object.keys(window.localStorage);
        //  for(let key of keys) {
        //      console.log(`${key}: ${localStorage.getItem(key)}`);
        //  }
  
        //  console.log(localStorage);
        //  console.log(sessionStorage);




        /* ---------------------- cookie -------------------- */

        //  document.cookie = 'user=Alex';
        //  document.cookie = 'login=user-alex';
 
        //  document.cookie = 'user=Bob';
        //  document.cookie = 'login=user-bob';

        //  //при хранение информации нужно производить кодирование во избежании неправильной кодировки спец-символов
        //  document.cookie = 'info=' + encodeURIComponent('Далеко-далеко за словесными горами в стране.');

        //  //декодирование
        //  console.log(decodeURIComponent('%D0%94%D0%B0%D0%BB%D0%B5%D0%BA%D0%BE-%D0%B4%D0%B0%D0%BB%D0%B5%D0%BA%D0%BE%20%D0%B7%D0%B0%20%D1%81%D0%BB%D0%BE%D0%B2%D0%B5%D1%81%D0%BD%D1%8B%D0%BC%D0%B8%20%D0%B3%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D0%B2%20%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B5.'));

        //  //кука для конкретной страницы
        //  document.cookie = 'user2=Peter; path=/news/post/post1'
        //  
        //  //создание куки для поддоменов (в этом случае: * - для всех)
        //  document.cookie = 'user3=Mike; domain=*.localhost';
 
        //  /* по умолчанию кука является сессионной (удаляется после закрытия браузера).
        //    Можно установить срок действия куки: Sun, 20 Sep 2020 15:20:08 GMT  
        //  */
        //  let date = new Date(Date.now() + 20000);
        //  date = date.toUTCString();
        //  //1 вариант
        //  document.cookie = 'user4=Bill; expires=' + date;

        //  //2 вариант - чаще всего используется
        //  document.cookie = 'user5=Gates; max-age=20';
 
        //  //параметр, который показывает по какому протоколу передавать куки
        //  document.cookie = 'user6=Alex; secure' // с данной кукой могут работать только по защищенному протоколу передачи данных
  
        //  console.log(document.cookie);
    });

})();