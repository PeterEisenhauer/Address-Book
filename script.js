window.onload = function () {

    var addNew = document.getElementById('addNew');
    var form = document.querySelector('.form');
    var cancelBtn = document.getElementById('cancel');
    var addBtn = document.getElementById('done');
    var searchBtn = document.getElementById('searchBtn');
    var sortOption = document.getElementById('sort');

    var firstname = document.getElementById('firstname');
    var lastname = document.getElementById('lastname');
    var email = document.getElementById('email');
    var phone = document.getElementById('phone');

    var addBookDiv = document.querySelector('.aBook');

    addNew.addEventListener("click", function () {
        // display the form div
        form.style.display = "block";
    });

    cancelBtn.addEventListener("click", function () {
        form.style.display = "none";
    });

    sortOption.addEventListener("click", function () {
        sort();
    });

    addBtn.addEventListener("click", addToBook);
    addBookDiv.addEventListener("click", remove);
    addBookDiv.addEventListener("click", update);
    searchBtn.addEventListener("click", search);

    var addressBook = [];

    function jsonArray(firstname, lastname, email, phone) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
    }

    function addToBook() {
        var isEmpty = firstname.value != '' && lastname.value != ''
                && email.value != '' && phone.value != '';
        if (isEmpty) {
            // format the input into a valid JSON structure
            var obj = new jsonArray(firstname.value, lastname.value,
                    email.value, phone.value);
            addressBook.push(obj);
            localStorage['addbook'] = JSON.stringify(addressBook);
            form.style.display = "none";
            clear();
            show();
        }
    }

    function remove(e) {
        // Remove an entry from the addressbook
        if (e.target.classList.contains('delbutton')) {
            var remID = e.target.getAttribute('data-id');
            addressBook.splice(remID, 1);
            localStorage['addbook'] = JSON.stringify(addressBook);
            show();
        }
    }

    function update(e) {
        // Remove an entry from the addressbook
        if (e.target.classList.contains('updbutton')) {
            var remID = e.target.getAttribute('data-id');
            addressBook.splice(remID, 1);
            localStorage['addbook'] = JSON.stringify(addressBook);
            form.style.display = "block";
            addToBook();
        }
    }


    function clear() {
        var formFields = document.querySelectorAll('.formFields');
        for (var i in formFields) {
            formFields[i].value = '';
        }
    }

    //Comparer Function  
    function sortOrder(x){
        return function (a, b) {
            if (a[x] > b[x]) {
                return 1;
            } else if (a[x] < b[x]) {
                return -1;
            }
            return 0;
        }
    }

    function sort() {
        //running out of time, sorting limited to firstname only
        addressBook.sort(sortOrder("firstname"));
        localStorage['addbook'] = JSON.stringify(addressBook);
        show();
    }

    function search() {
        var x = document.getElementById('search').value;
        document.write(addressBook.toString(x));
    }

    function show() {
        if (localStorage['addbook'] === undefined) {
            localStorage['addbook'] = '';
        } else {
            addressBook = JSON.parse(localStorage['addbook']);
            // Loop over the array addressBook and insert into the page
            addBookDiv.innerHTML = '';
            for (var n in addressBook) {
                var str = '<div class="entry">';
                str += '<div class="firstname"><p>' + addressBook[n].firstname
                        + '</p></div>';
                str += '<div class="lastname"><p>' + addressBook[n].lastname
                        + '</p></div>';
                str += '<div class="email"><p>' + addressBook[n].email
                        + '</p></div>';
                str += '<div class="phone"><p>' + addressBook[n].phone
                        + '</p></div>';
                str += '<div class="update"><a href="#" class="updbutton" \n\
                        data-id="' + n + '">Update</a></div>';
                str += '<div class="del"><a href="#" class="delbutton" \n\
                        data-id="' + n + '">Delete</a></div>';
                str += '</div>';
                addBookDiv.innerHTML += str;
            }
        }
    }
    show();
}
