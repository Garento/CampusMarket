// LOG OUT
const logoutBtn = document.querySelector(".logout-btn");

if (logoutBtn) {
    logoutBtn.onclick = () => {

        let confirmLogout = confirm("Are you sure you want to log out?");

        if (confirmLogout) {
            alert("You have been logged out.");
        }

    };
}