function myTest() {
    let popupParent = document.querySelector(".popup-parent");
    let btn = document.getElementById("btn");
    let btnClose = document.querySelector(".close");
    let mainSection = document.querySelector(".mainSection");


    btn.addEventListener("click", showPopup);

    function showPopup() {
        popupParent.style.display = "block";
    }

    btnClose.addEventListener("click", closePopup);

    function closePopup() {
        popupParent.style.display = "none";
    }
    popupParent.addEventListener("click", closeOutPopup);

    function closeOutPopup(o) {
        if (o.target.className == "popup-parent") {
            popupParent.style.display = "none";
        }
    }
}