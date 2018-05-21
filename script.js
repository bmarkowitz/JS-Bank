const loginDiv = document.getElementById('login');
const loginInput = document.getElementById('loginInput');
const loginButton = document.getElementById('loginButton');
const loginPara = document.getElementById('loginParagraph');
const body = document.querySelector('body');

//manages entire bank
let bank = {
    accounts: [],
    addAccount: function (username, password) {
        if (this.doesUsernameExist(username)) {
            loginPara.textContent = "Sorry, the username you entered is already in use. Please try again with a different username.";
        }
        else {
            const account = {
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
            };
            this.accounts.push(account);
            loginPara.textContent = "Account created.";
        }
    },
    deleteAccount: function (index) {
        this.accounts.splice(index, 1);
    },
    doesUsernameExist: function (username) {
        let userNameMatched = false;
        this.accounts.forEach((item, index) => {
            if (item.username === username) {
                userNameMatched = true;
            }
        });
        return userNameMatched;
    }

};

//manages the view
const view = {
    setUpLogoutView: function (matchedUser) { //after logging in

        loginDiv.style.display = 'none';
        let logOutButton = document.getElementById('logOutButton');
        if (logOutButton) {
            logOutButton.style.display = 'inline';
            view.displayUserData(matchedUser);
            return
        }
        else {
            logOutButton = this.createLogOutButton();
            view.displayUserData(matchedUser);
            body.appendChild(logOutButton);
        }
    },
    setUpLoginView: function () { //after logging out
        loginDiv.style.display = 'inline';
        const logOutButton = document.getElementById('logOutButton');
        logOutButton.style.display = 'none';
        document.getElementById('userDataDiv').style.display = 'none';
    },
    displayUserData: function (matchedUser) {
        if (!document.getElementById('userDataDiv')) {
            const userDataDiv = document.createElement('div');
            userDataDiv.setAttribute('id', 'userDataDiv');

            const currentBalancePara = document.createElement('p');
            currentBalancePara.setAttribute('id', 'currentBalancePara');
            currentBalancePara.textContent = 'Current balance: ' + matchedUser.currentBalance;

            userDataDiv.appendChild(currentBalancePara);
            body.appendChild(userDataDiv);
        }
        else {
            const currentBalancePara = document.getElementById('currentBalancePara');
            currentBalancePara.textContent = 'Current balance: ' + matchedUser.currentBalance;
            userDataDiv.style.display = 'inline';
        }
    },
    setLoginParagraph: function (message, name) {
        if (name) {
            loginPara.textContent = message + name + '!';
        }
        else {
            loginPara.textContent = message;
        }

    },
    createLogOutButton: function () {
        const logOutButton = document.createElement('button');
        logOutButton.setAttribute('id', 'logOutButton');
        logOutButton.textContent = 'Logout';
        logOutButton.setAttribute('onclick', "handlers.attemptLogout()");
        return logOutButton;
    },
};

//handles communication between the view and the model
const handlers = {
    attemptLogin: function () {
        const loginInputValue = loginInput.value;
        let userNameMatched = false;

        bank.accounts.forEach((item, index) => {
            if (item.username === loginInputValue) {
                userNameMatched = true;
                view.setLoginParagraph('Welcome, ', item.username);
                view.setUpLogoutView(item);
                return;
            }
        });
        if (userNameMatched === false) {
            view.setLoginParagraph('The username you entered either doesn\'t exist or was not found. Please try again.');

        }
    },
    attemptLogout: function () {
        view.setUpLoginView();
        view.setLoginParagraph('Enter a username and click login.');
        loginInput.value = '';
        loginInput.focus();
    }
};



