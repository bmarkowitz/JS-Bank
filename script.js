let loginInput = document.getElementById('loginInput');
let loginButton = document.getElementById('loginButton');
let loginPara = document.getElementById('loginParagraph');

//manages entire bank
let bank = {
    accounts: [],
    addAccount: function (username, password) {
        let account = {
            username: username,
            password: password,
            currentBalance: 0,
            depositMoney: function (amount) {
                this.currentBalance += amount;
            },
            withdrawMoney: function (amount) {
                this.currentBalance +- amount;
            },
            displayCurrentBalance: function () {
                console.log(this.currentBalance);
            }
        }
        this.accounts.push(account);
    },
    deleteAccount: function (index) {
        this.accounts.splice(index, 1);
    },

};

//manages the view
let view = {
    toggleLogin: function () {
        if(loginInput.style.display === 'none') {
            loginInput.style.display = 'inline';
            loginButton.style.display = 'inline';
            loginPara.style.dislay = 'Enter a username and click login.';
            
            let logOutButton = document.getElementById('logOutButton');
            logOutButton.style.display = 'none';
        }
        else {
            loginInput.style.display = 'none';
            loginButton.style.display = 'none';
        }
    },
    displayUserData: function (matchedUser) {

    },
    setLoginParagraph: function (message, name) {
        if (name) {
            loginPara.textContent = message + name + '!';
        }
        else {
            loginPara.textContent = message;
        }

    },
    createLogOutButton: function() {
        let body = document.querySelector('body');
        let logOutButton = document.createElement('button');
        logOutButton.setAttribute('id', 'logOutButton');
        logOutButton.textContent = 'Logout';
        logOutButton.setAttribute('onclick', "handlers.attemptLogout()");
        body.appendChild(logOutButton);
    }
};

//handles communication between the view and the model
let handlers = {
    attemptLogin: function () {
        let loginInputValue = loginInput.value;
        let userNameMatched = false;

        bank.accounts.forEach(function (item, index) {
            if (item.username === loginInputValue) {
                view.toggleLogin();
                userNameMatched = true;
                view.displayUserData(item);
                view.setLoginParagraph('Welcome, ', item.username);
                view.createLogOutButton();
                return;
            }
        });
        if (userNameMatched === false) {
            view.setLoginParagraph('The username you entered either doesn\'t exit or was not found. Please try again.');

        }
    },
    attemptLogout: function() {
        view.toggleLogin();
        view.setLoginParagraph('Enter a username and click login.');
        loginInput.value = '';
        loginInput.focus();
    }
};



