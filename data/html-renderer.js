const HTMLRenderer = {
    showSection: function (section) {
        const sections = [".welcome, '.form", ".review"];

    },

    showAlert: function (alert) {
        $(".alert").text(alert);

    },

    showError: function (error) {
        $(".error").text(error);
    },

    

    displayUserInfo(username) {
        $(".userinfo").parents(".column").prop("hidden", false);
        $(".logged-in").html(`Hi, ${username}!`);
    },

    hideUserInfo() {
        $(".userinfo").parents(".column").prop("hidden", true);
    },
    hideElement(element) {
        $(element).parents(".column").prop("hidden", true);
    },

    showElement(element) {
        $(element).parents(".column").prop("hidden", false);
    },

    hideSpecificElement(element) {
        $(element).hide();
    },

    showSpecificElement(element) {
        $(element).show();
    },
};