// variables
const burger = document.querySelector('.burger');
const originalSrc = document.getElementById('profileImage').src;
const nav = document.querySelector('.nav');
let userProfileLink = document.querySelector(".user-profile");
let open_modals = document.querySelectorAll('.register-new');
let close_modal = document.getElementById('close_modal');
let modal = document.getElementById('modal');
let body = document.body;
let open_login_modals = document.querySelectorAll('.login-current');
let modal_login = document.getElementById('modal-login');
let body_login = document.body;
let close_modal_login = document.getElementById('close_modal_login');
const navLinks = document.querySelectorAll('.nav-link');
let dropdownContentList = document.querySelectorAll('.dropdown-content');
let buyButtons = document.querySelectorAll('.buy');
let checkIfLoggedIn = false;
let tempKey = null;
let loginForm = document.getElementById("loginForm");
let userForm = document.getElementById("userForm");
let modal_books = document.getElementById('modal-books');


// slider

const btnPrev = document.querySelector('.left-arrow');
const btnNext = document.querySelector('.right-arrow');
let position = 0;
const slidesToShow = window.innerWidth > 768 ? 3 : 1;
const slidesToScroll = 1;
const container = document.querySelector('.slider-container');
const track = document.querySelector('.slider-track');
const radioButtons = document.querySelectorAll('.picture-radio-buttons input[type="radio"]');
const items = document.querySelectorAll('.slider-item');
const itemsCount = items.length;
let gap = 25;
let itemWidth = (container.clientWidth - ((slidesToShow - 1) * gap)) / slidesToShow;
if (window.innerWidth <= 768) {
  itemWidth = 450;
}
const movePosition = slidesToScroll * itemWidth;


window.onload = function () {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let storedValue = localStorage.getItem(key);
    let userData = JSON.parse(storedValue);
    if (userData.isLoggedIn === true) {
      checkIfLoggedIn = true;
      tempKey = userData.bookCard;
      updateProfileImage(userData);
      updateDigitalCardform(userData)

      if (userData.numberOfBook) {
        userData.numberOfBook.forEach((item) => {
          console.log(item)
          const selector = `button[data-book-id="${item}"]`;
          const button = document.querySelector(selector);
          if (button) {
            button.classList.remove("buy");
            button.classList.add("own-button");
            button.disabled = true;
            button.textContent = 'Own';
          }
        });
      }

      break;
    }
  }
}


function closeMenu() {
  nav.classList.remove('open');
  burger.classList.remove('active');
  nav.classList.add('close');

  setTimeout(() => {
    nav.classList.remove('close');
  }, 300);
}


burger.addEventListener('click', function () {
  this.classList.toggle('active');
  if (nav.classList.contains('open')) {
    closeMenu();
  } else {
    nav.classList.add('open');
  }
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav').classList.remove('open');
    document.querySelector('.burger').classList.remove('active');
    nav.classList.add('close');

    setTimeout(() => {
      nav.classList.remove('close');
    }, 300);
  });
});


document.body.addEventListener('click', (event) => {
  const isInsideMenu = event.target.closest('.nav');
  const isBurgerIcon = event.target.closest('.burger');
  let isRegistrationIcon = event.target.closest('.user-profile');

  if (!isInsideMenu && !isRegistrationIcon) {
    dropdownContentList.forEach(dropdownContent => {
      dropdownContent.classList.remove('show');
    });
  }

  if (!isInsideMenu && !isBurgerIcon && nav.classList.contains('open')) {
    closeMenu();
  }
});



// slider
items.forEach((item) => {
  item.style.minWidth = `${itemWidth}px`;
})

const setPosition = () => {
  track.style.transform = `translateX(${position}px)`
};

radioButtons.forEach((radioButton, index) => {
  radioButton.addEventListener('change', () => {
    if (window.innerWidth <= 768) {
      position = -(index * itemWidth);
    } else {
      position = -(index * (itemWidth + gap));
    }
    setPosition();
    updateRadioButtons();
  });
});

btnNext.addEventListener('click', () => {
  const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth + (slidesToShow - 1)) / itemWidth;
  position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
  setPosition();
  checkBtns();
  const currentIndex = Math.floor(Math.abs(position) / itemWidth);
  radioButtons[currentIndex].checked = true;
  updateRadioButtons();
});

btnPrev.addEventListener('click', () => {
  const itemsLeft = Math.abs(position) / itemWidth;
  position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
  setPosition();
  checkBtns();
  const currentIndex = Math.floor(Math.abs(position) / itemWidth);
  radioButtons[currentIndex].checked = true;
  updateRadioButtons();
});


const checkBtns = () => {
  btnPrev.classList.toggle('disabled', position === 0);
  btnNext.classList.toggle('disabled', position <= -(itemsCount - slidesToShow) * itemWidth);
}

const updateRadioButtons = () => {
  radioButtons.forEach((rb) => {
    rb.disabled = rb.checked;
  });
};

checkBtns();
updateRadioButtons();


// books-slider

const bookRadioLabels = document.querySelectorAll('.radio-label');
const sliderContainers = document.querySelectorAll('.books-slider-container');

sliderContainers[0].classList.add('active');

bookRadioLabels.forEach((label, index) => {
  label.addEventListener('click', () => {
    sliderContainers.forEach((container, i) => {
      if (i === index) {
        if (!container.classList.contains('active')) {
          setTimeout(function () {
            container.classList.add('active');
            container.classList.add("elementToFadeIn");
          }, 300);
        }
      } else {
        if (container.classList.contains('active')) {
          container.classList.remove("elementToFadeIn");
          container.classList.add("elementToFadeInAndOut");
          setTimeout(function () {
            container.classList.remove("elementToFadeInAndOut");
            container.classList.remove('active');
          }, 300);
        }
      }
    });
  });
});


// registration form

userProfileLink.addEventListener("click", function (event) {
  event.preventDefault();
  if (checkIfLoggedIn) {
    document.getElementById("loggedin-profile").classList.toggle("show");
    let sectionsTitle = document.querySelector(".book-number");
    sectionsTitle.textContent = tempKey;
  } else {
    document.getElementById("register").classList.toggle("show");
  }
});

for (let i = 0; i < open_modals.length; i++) {
  open_modals[i].addEventListener('click', function () {
    modal.classList.add('modal_vis');
    body.classList.add('body_block');
  });
}

close_modal.addEventListener('click', function () {
  modal.classList.add('modal_fade');

  setTimeout(function () {
    modal.classList.remove('modal_vis');
    body.classList.remove('body_block');
    modal.classList.remove('modal_fade');
    resetFormFields();
  }, 1000);
});

modal.addEventListener('click', function (event) {
  if (event.target === modal) {

    modal.classList.add('modal_fade');
    setTimeout(function () {
      modal.classList.remove('modal_vis');
      body.classList.remove('body_block');
      modal.classList.remove('modal_fade');
    }, 1000);
    resetFormFields();
  }
});


// login

function openModal() {
  modal_login.classList.add('modal_vis');
  body_login.classList.add('body_block');
}

for (let i = 0; i < open_login_modals.length; i++) {
  open_login_modals[i].addEventListener('click', openModal);
}

close_modal_login.addEventListener('click', function () {
  modal_login.classList.add('modal_fade');
  setTimeout(function () {
    modal_login.classList.remove('modal_vis');
    body_login.classList.remove('body_block');
    modal_login.classList.remove('modal_fade');
    resetFormFields();
  }, 1000);
});

modal_login.addEventListener('click', function (event) {
  if (event.target === modal_login) {
    modal_login.classList.add('modal_fade');
    setTimeout(function () {
      modal_login.classList.remove('modal_vis');
      body_login.classList.remove('body_block');
      modal_login.classList.remove('modal_fade');
      resetFormFields();
    }, 1000);
  }
});


// register

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("userForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var userName = document.getElementById("firstname").value;
    var surname = document.getElementById("surname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    let size = 9;
    var bookCard = [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16).toUpperCase()).join('');
    var visit = 1;
    var key = bookCard;
    var isLoggedIn = true;
    var booksOwn = 0;
    var enteredCard = false;

    const user = {
      userName,
      surname,
      email,
      password,
      visit,
      bookCard,
      isLoggedIn,
      booksOwn, enteredCard
    };

    localStorage.setItem(key, JSON.stringify(user));
    console.log("User data saved:", user);
    checkIfLoggedIn = true;
    tempKey = bookCard;
    updateProfileImage(user);
    updateDigitalCardform(user);
    modal.classList.add('modal_fade');
    setTimeout(function () {
      modal.classList.remove('modal_vis');
      body.classList.remove('body_block');
      modal.classList.remove('modal_fade');
      resetFormFields();
    }, 1000);
  });
});

let extra_modal = document.querySelector('.underline');

extra_modal.addEventListener('click', function () {
  modal.classList.remove('modal_vis');
  body.classList.remove('body_block');
  modal_login.classList.add('modal_vis');
  body_login.classList.add('body_block');
});

let register_button = document.querySelector('.underline-register');

register_button.addEventListener('click', function () {
  modal_login.classList.remove('modal_vis');
  body_login.classList.remove('body_block');
  modal.classList.add('modal_vis');
  body.classList.add('body_block');
});


// login

document.addEventListener("DOMContentLoaded", function () {
  const error = document.getElementById("error");
  retrieveButton.addEventListener("click", function (event) {
    event.preventDefault();

    const searchValue = loginForm.querySelector("#loginemail").value;
    const password = loginForm.querySelector("#login_password").value;
    let matchingUser = findMatchingUser(searchValue);

    if (matchingUser) {
      if (matchingUser.password === password) {
        loginUser(matchingUser);
      } else {
        showError("Email or password is not correct.");
      }
    } else {
      showError("User not found. Try again");
    }
  });

  function findMatchingUser(value) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const storedValue = localStorage.getItem(key);

      try {
        const userData = JSON.parse(storedValue);
        if (userData.email === value || userData.bookCard === value) {
          return userData;
        }
      } catch (error) {
        console.log("Error parsing JSON for key:", key);
      }
    }
    return null;
  }

  function loginUser(user) {
    console.log("Password is correct. You are logged in.");
    user.visit += 1;
    user.isLoggedIn = true;
    localStorage.setItem(user.bookCard, JSON.stringify(user));
    updateProfileImage(user);
    updateDigitalCardform(user);
    updateUserIconInfo(user);
    checkIfLoggedIn = true;
    tempKey = user.bookCard;
    if (user.numberOfBook != null) { 
    user.numberOfBook.forEach((item) => {
      console.log(item)
      const selector = `button[data-book-id="${item}"]`;
      const button = document.querySelector(selector);
      if (button) {
        button.classList.remove("buy");
        button.classList.add("own-button");
        button.disabled = true;
        button.textContent = 'Own';
      }
    });
  }

    modal_login.classList.add('modal_fade');
    setTimeout(function () {
      modal_login.classList.remove('modal_vis');
      body_login.classList.remove('body_block');
      modal_login.classList.remove('modal_fade');
    }, 1000);
    resetFormFields()
  }

  function showError(message) {
    error.textContent = message;

    setTimeout(function () {
      error.textContent = "";
    }, 5000);
  }
});


function updateProfileImage(user) {
  let initials = (user.userName[0] || "") + (user.surname[0] || "");
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");

  canvas.width = 28;
  canvas.height = 28;

  let font = new FontFace('intel-regular', 'url(../library/fonts/Inter-Regular.ttf)');
  ctx.beginPath();
  ctx.arc(14, 14, 14, 0, 2 * Math.PI, false);
  ctx.closePath();
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.fillStyle = "black";
  ctx.font = "bold 14px intel-regular";
  ctx.textAlign = "center";
  ctx.fillText(initials, 14, 19);

  let profileImage = document.getElementById("profileImage");
  profileImage.src = canvas.toDataURL();
  console.log(profileImage.src);
  profileImage.title = user.userName + " " + user.surname;
}


// logout

let logoutBtn = document.querySelector(".log-out");

logoutBtn.addEventListener('click', function () {
  let storedValue = localStorage.getItem(tempKey);
  let userData = JSON.parse(storedValue);
  userData.isLoggedIn = false;
  localStorage.setItem(tempKey, JSON.stringify(userData));
  checkIfLoggedIn = false;
  tempKey = null;

  const visits = document.querySelectorAll(".visits_count");
  visits.forEach(visit => {
    visit.textContent = '';
  });


  const myBooks = document.querySelectorAll('.books_count');
  myBooks.forEach(book => {
    book.textContent = '';
  });

  if (userData.numberOfBook) {
  userData.numberOfBook.forEach((item) => {
    console.log(item)
    const selector = `button[data-book-id="${item}"]`;
    const button = document.querySelector(selector);
    if (button) {
      button.classList.remove("own-button");
      button.classList.add("buy");
      button.disabled = true;
      button.textContent = 'Buy';
    }
  });
}
  restoreImageOnLogout()
  restoreDigitalCardForm();
});


function restoreImageOnLogout() {
  const profileImage = document.getElementById('profileImage');
  profileImage.src = originalSrc;
  profileImage.title = "";
}

function resetFormFields() {
  loginForm.reset();
  userForm.reset();
  // cardForm.reset();
}


// modal for user card

let modalProfile = document.getElementById('modal-profile');
let closeProfile = document.getElementById('close-profile');
let openProfileModals = document.querySelectorAll('.my-profile');

  openProfileModals.forEach(modal => {
    modal.addEventListener('click', function () {
      if (!checkIfLoggedIn) {
        openModal();
      } else {
        const sectionsTitle = document.querySelector(".card_number");
        sectionsTitle.textContent = tempKey;

        const storedValue = localStorage.getItem(tempKey);
        const userData = JSON.parse(storedValue);
        updateUserIconInfo(userData);


        if (userData.rentedList) {
          const rentedBooksList = document.querySelector('.rented-books-list ul');

          rentedBooksList.innerHTML = '';
          const transformedRentedList = Object.values(userData.rentedList);
          transformedRentedList.forEach(book => {
            const li = document.createElement('li');
            li.textContent = `${book.novel}, ${book.author}`;
            rentedBooksList.appendChild(li);
          });
        }

        const initialsMain = document.querySelector(".initials-main");
        const initialsSub = document.querySelector(".initials-sub");
        const initials = (userData.userName[0] || "") + (userData.surname[0] || "");
        initialsMain.textContent = initials;
        initialsSub.textContent = userData.userName + " " + userData.surname;

        modalProfile.classList.add('fade-in');
        setTimeout(function () {
          modalProfile.classList.add('modal_profile_test');
          body.classList.add('body_block');
          modalProfile.classList.remove('fade-in');
        }, 200);
      }
    });
  });

modalProfile.addEventListener('click', function (event) {
  if (event.target === modalProfile) {
    modalProfile.classList.remove('modal_profile_test');
    body.classList.remove('body_block');
  }
});

closeProfile.addEventListener('click', function () {
  modalProfile.classList.remove('modal_profile_test');
  body.classList.remove('body_block');
});


const copyIcon = document.getElementById('copy-icon');
const cardNumber = document.querySelector(".card_number");
const copyFeedback = document.getElementById('copy-feedback');

copyIcon.addEventListener('click', function () {
  const range = document.createRange();
  range.selectNode(cardNumber);
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
  copyFeedback.style.display = 'inline';
  setTimeout(() => {
    copyFeedback.style.display = 'none';
  }, 1000);
});

// card buy menu
document.addEventListener('DOMContentLoaded', function () {
buyButtons.forEach(button => {
  button.addEventListener('click', function () {
    let bookId = this.getAttribute("data-book-id");
    let card = this.closest('.card'); 
    let authorElement = card.querySelector('.author');
    let authorText = authorElement.textContent;
    let byIndex = authorText.indexOf('By');
    let bookName = authorText.substring(0, byIndex).trim();
    let bookAuthor = authorText.substring(byIndex + 2).trim();
        
        console.log("Book Name: ", bookName);
        console.log("Book Author: ", bookAuthor);
 
    let storedValue = localStorage.getItem(tempKey);
    let userData = JSON.parse(storedValue);

    if (userData && userData.enteredCard !== null) {
      if (!userData.enteredCard && checkIfLoggedIn) {
        modal_books.classList.add('fade-in');
        setTimeout(function () {
          modal_books.classList.add('modal_buy_books');
          body.classList.add('body_block');
          modal_books.classList.remove('fade-in');
        }, 200);
      } else if (userData.enteredCard) {
        updateBookValue(bookId, bookName, bookAuthor);
      }
    } else {
      modal_login.classList.add('modal_vis');
      body_login.classList.add('body_block');
    }

    document.getElementById("cardForm").addEventListener("submit", function (event) {
      event.preventDefault();
      let storedValue = localStorage.getItem(tempKey);
      let userData = JSON.parse(storedValue);
      userData.enteredCard = true;
      try {
        localStorage.setItem(tempKey, JSON.stringify(userData));
        console.log("Data successfully updated in local storage.");
        updateBookValue(bookId,bookName, bookAuthor);
        modal_books.classList.remove('modal_buy_books');
        body.classList.remove('body_block');
      } catch (error) {
        console.error("An error occurred while updating data in local storage:", error);
      }
    });
  });
});
});

function updateBookValue(id, novel, author) {
  let storedValue = localStorage.getItem(tempKey);
  let userData = JSON.parse(storedValue);
  if (!userData.numberOfBook) {
    userData.numberOfBook = [];
  }
  if (!userData.rentedList) {
    userData.rentedList = [];
  }
  userData.numberOfBook.push(id);
  userData.booksOwn += 1;

  const rentedBook = {
    novel: novel,
    author: author
  };

  userData.rentedList.push(rentedBook);
  try {
    localStorage.setItem(tempKey, JSON.stringify(userData));
    const selector = `button[data-book-id="${id}"]`;
    const button = document.querySelector(selector);
    updateUserIconInfo(userData)
    if (button) {
      button.classList.remove("buy");
      button.classList.add("own-button");
      button.disabled = true;
      button.textContent = 'Own';
    }
  } catch (error) {
    console.error("An error occurred while updating data in local storage:", error);
  }
}



let close_buy_button = document.getElementById('close-buy-button');
close_buy_button.addEventListener('click', function () {
  modal_books.classList.remove('modal_buy_books');
  body.classList.remove('body_block');
  resetFormFields();
});


modal_books.addEventListener('click', function (event) {
  if (event.target === modal_books) {
    modal_books.classList.remove('modal_buy_books');
    body.classList.remove('body_block');
    resetFormFields();
  }
});


// check the card
let checkCard = document.getElementById('check-card');
checkCard.addEventListener('click', function () {
  let name = document.getElementById('name').value;
  let number = document.getElementById('number').value;

  let errorDiv = document.getElementById('error-prelogin');
  errorDiv.textContent = '';

  if (name.trim() === '' || number.trim() === '') {
    showError("Fields cannot be empty");
    setTimeout(() => {
      errorDiv.textContent = '';
    }, 3000); 
  }
  let matchingUser = findMatchingUser(number, name);
  console.log(matchingUser);

  if (matchingUser === null) {
    showError("Please enter fullname (name and surname). And try again.");
    setTimeout(() => {
      errorDiv.textContent = '';
    }, 3000); 
  } else {
    let libraryCard = document.getElementById('library-card');
    let libraryAfterCheck = document.getElementById('library-after-check');
    libraryCard.style.display = 'none';
    libraryAfterCheck.style.display = 'block';
  
    let userInitials = document.querySelector(".userInitials");
    let bookNumber = document.querySelector(".bookNumber");
  
    userInitials.textContent = matchingUser.userName + " " + matchingUser.surname;
    console.log("test " + userInitials.textContent);
    bookNumber.textContent = number;
  
    setTimeout(() => {
      libraryCard.style.display = 'flex';
      libraryAfterCheck.style.display = 'none';
      
  
      userInitials.textContent = '';
      bookNumber.textContent = '';
      document.getElementById('name').value = '';
      document.getElementById('number').value = '';      
    }, 10000);
  }
});

function showError(errorMessage) {
  let errorDiv = document.getElementById('error-prelogin');
  errorDiv.textContent = errorMessage;
}

function findMatchingUser(bookCardNo, userEnteredName) {
  const trimmedName = userEnteredName.trim(); 
  const nameParts = trimmedName.split(/\s+/);
  console.log(nameParts);
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const storedValue = localStorage.getItem(key);

    try {
      const userData = JSON.parse(storedValue); 
      if (userData.bookCard === bookCardNo && userData.userName === firstName && userData.surname === lastName ) {
        return userData;
      }
    } catch (error) {
      console.log("Error parsing JSON for key:", key);
    }
  }
  return null;
}

function updateDigitalCardform(value){
  let libraryCard = document.getElementById('library-card');
  let libraryAfterCheck = document.getElementById('library-after-check');
  libraryCard.style.display = 'none';
  libraryAfterCheck.style.display = 'block';

  let userInitials = document.querySelector(".userInitials");
  let bookNumber = document.querySelector(".bookNumber");

  userInitials.textContent = value.userName + " " + value.surname;
  console.log("test " + userInitials.textContent);
  bookNumber.textContent = value.bookCard;

  let beforeLogin = document.getElementById('wrapper-before-login');
  let afterLogin = document.getElementById('wrapper-after-login');
  beforeLogin.style.display = 'none';
  afterLogin.style.display = 'block';

}


function restoreDigitalCardForm(){
  let beforeLogin = document.getElementById('wrapper-before-login');
  let afterLogin = document.getElementById('wrapper-after-login');
  beforeLogin.style.display ='block';
  afterLogin.style.display = 'none';

  let libraryCard = document.getElementById('library-card');
  let libraryAfterCheck = document.getElementById('library-after-check');

  libraryCard.style.display = 'flex';
  libraryAfterCheck.style.display = 'none';

  let userInitials = document.querySelector(".userInitials");
  let bookNumber = document.querySelector(".bookNumber");

  userInitials.textContent = '';
  bookNumber.textContent = '';
  document.getElementById('name').value = '';
  document.getElementById('number').value = '';      

}




function updateUserIconInfo(value){
  const visits = document.querySelectorAll(".visits_count");
  visits.forEach(visit => {
    visit.textContent = value.visit;
  });

  const myBooks = document.querySelectorAll('.books_count');
  myBooks.forEach(book => {
    book.textContent = value.booksOwn;
  });
}