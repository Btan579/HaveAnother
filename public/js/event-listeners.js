const EventListeners = {
    listenersStarted: false,

    startListeners: function () {
        if (!this.listenersStarted) {
            this.handleLogin();
            this.handleLogout();
            this.handleLinks();
            this.handleFormsSubmit();
            this.listenersStarted = true;
        }
    },

    handleLinks: function () {
        $("body").on("click", ".register-link", function () {
            HTMLRenderer.showSection(".form-register");
        });
        $("body").on("click", ".login-link", function () {
            HTMLRenderer.showSection(".form-login");
            HTMLRenderer.showSpecificElement(".form-login");
        });
        $("body").on("click", ".welcome-link", function () {
            HTMLRenderer.showSection(".landing");
            HTMLRenderer.hideElement(".logged-in");
            HTMLRenderer.hideElement(".logout");
        });
    },

    handleFormsSubmit: function () {
        const minLength = 5;

        $(".form-signup").on("submit", function (event) {
            event.preventDefault();

            let username = $(".form-signup_userame").val();
            let password = $(".form-signup_password").val();

            if (username.length < minLength) {
                showError(`Please enter a username atleast ${minLength} characters long`);
                return;
            }

            if (password.length < minLength) {
                showError(`Please enter a password atleast ${minLength} characters long`);
                return;
            }

            App.signUpUser(username, password);

            $(".form-signup_username").val("");
            $(".form-signup_password").val("");
        });
        $(".form-login").on("submit", function (event) {
            event.preventDefault();

            let username = $(".form-login_username").val();
            let password = $(".form-login_password").val();

            App.loginUser(username, password);

            $(".form-signup_username").val("");
            $(".form-signup_password").val("");
        });
    },

    handleLogin: function () {
        $("body").on("click", ".login", function (event) {
            HTMLRenderer.showSpecificElement(".form-login");
            HTMLRenderer.hideSpecificElement(this);
        });
    },

    handleLogout: function () {
        $("body").on("click", ".logout", function (event) {
            HTMLRenderer.showSpecificElement(".login");
            HTMLRenderer.hideSpecificElement(this);
            HTMLRenderer.hideElement(".logged-in");
            App.logoutUser();
        });
    },



};