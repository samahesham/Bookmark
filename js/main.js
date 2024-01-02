// Inputs
var bookmarkerName = document.getElementById("bookmarkerName");
var websiteURL = document.getElementById("websiteURL");

// Array of Bookmark
var bookmarkList = [];

if (localStorage.getItem("bookmarks") != null) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarks"));
  displayBookmark();
}

//
function addBookmark() {
  if (validBookmarkName()&&validBookmarkURL()) {
    var bookmark = {
      name: bookmarkerName.value,
      url: websiteURL.value,
    };
    bookmarkList.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
    bookmarkerName.classList.remove("is-valid");
    websiteURL.classList.remove("is-valid");
  } else {
    alert(`Site Name or Url is not valid, Please follow the rules below :
                Site name must contain at least 3 characters
                Site URL must be a valid one`);
    bookmarkerName.classList.remove("is-invalid");
    websiteURL.classList.remove("is-invalid");
  }
  clearInput();
  displayBookmark();
}

//
function clearInput() {
  bookmarkerName.value = "";
  websiteURL.value = "";
}

//
function displayBookmark() {
  var cartona = "";
  for (var i = 0; i < bookmarkList.length; i++) {
    cartona += `<tr>
                <td>${i + 1}</td>
                <td>${bookmarkList[i].name}</td>
                <td>
                    <button class="btn btn-warning btn-sm">
                        <a style="text-decoration: none; color:white;" href="http://${
                          bookmarkList[i].url
                        }">
                            <i class="fa-solid fa-eye pe-2"></i>Visit
                        </a>   
                    </button>
                </td>
                <td>
                    <button onclick="deleteBookmark(${i})" class="btn btn-danger btn-sm">
                        <i class="fa-solid fa-trash-can"></i>
                        Delete
                    </button>
                </td>
            </tr>`;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

//
function deleteBookmark(id) {
  bookmarkList.splice(id, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
  displayBookmark();
}

//

//
function validBookmarkName() {
  var nameInput = bookmarkerName.value;
  var nameRegex = /^[A-Za-z0-9]{3,}$/;
  if (nameRegex.test(nameInput)) {
    bookmarkerName.classList.add("is-valid");
    bookmarkerName.classList.remove("is-invalid");
    return true;
  } else {
    bookmarkerName.classList.add("is-invalid");
    bookmarkerName.classList.remove("is-valid");
    return false;
  }
}

//
function validBookmarkURL() {
  var urlInput = websiteURL.value;
  var urlRegex = /^(https?:\/\/)?(www\.)?\w+\.\w{2,}(\/\w*)*$/;
  if (urlRegex.test(urlInput)) {
    websiteURL.classList.add("is-valid");
    websiteURL.classList.remove("is-invalid");
    return true;
  } else {
    websiteURL.classList.add("is-invalid");
    websiteURL.classList.remove("is-valid");
    return false;
  }
}
