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
                this.currentBalance + - amount;
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

let view = {
    hideLogin: function () {
        loginInput.style.display = 'none';
        loginButton.style.display = 'none';
    }
};

let handlers = {
    attemptLogin: function () {
        let loginInput = document.getElementById('loginInput');
        let loginInputValue = document.getElementById('loginInput').value;
        let loginButton = document.getElementById('loginButton');

        let userNameMatched = false;

        bank.accounts.forEach(function (item, index) {
            if (item.username === loginInputValue) {
                view.hideLogin();
                userNameMatched = true;
                return;
            }
        });
    }
};



