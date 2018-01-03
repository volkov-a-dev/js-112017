import '../style/main.scss';

const hbsGet= require('../components/filter-lists.hbs');
const hbsAdded  = require('../components/added-lists.hbs');
const templateGet = document.querySelector('#friends-filter__get');
const templateAdded = document.querySelector('#friends-filter__lists');
const listsGet  = document.querySelector('.friends-filter__items');
const inputGet = document.querySelector('.friends-filter__input_get');
const inputAdded = document.querySelector('.friends-filter__input_picked');
const filterModule = {
    allArray : undefined,
    addedArray: [],
    init : async function() {
        let self = this;
        await self.auth();
        let allFriends = await self.getFriends('friends.get', { fields : 'city, country, photo_100' })
        await self.renderFriends();
        filterModule.filterGet();
        filterModule.dropEvent();
        filterModule.buttonEvent();
        filterModule.buttonSave();
        filterModule.filterAdded();
    },

    auth: function () {
        return new Promise((resolve, reject) => {

            VK.init({
                apiId: 6307165
            });

            VK.Auth.login(data => {
                if (data.session) {
                    resolve();
                } else {
                    reject(new Error('Не удалось авторизоваться'));
                }
            }, 2);
        });
    },
    getFriends: function (method, params) {
        params.v = '5.69';

        return new Promise((resolve, reject) => {
            VK.api(method, params, (data) => {
                if (data.error) {
                    reject(data.error);
                } else {
                    this.allArray = data.response;
                    resolve();
                }
            });
        })
    },
    renderFriends: function () {

        let returnAll = JSON.parse(localStorage.getItem("allFriends"));
        let returnAdded = JSON.parse(localStorage.getItem("added"));
console.log(returnAdded)
        if (returnAdded) {
            filterModule.addedArray.items = returnAdded;
            let addedArray = filterModule.addedArray;

            templateGet.innerHTML = hbsGet(returnAll);
            templateAdded.innerHTML = hbsAdded(addedArray)
        } else {
            templateGet.innerHTML = hbsGet(this.allArray);
        }
    },

    filterGet : function () {
        inputGet.addEventListener('keyup', function () {
            let filterArray = [];
            let inputVal = inputGet.value;
            let regex = new RegExp(inputVal.split(' ').join('|'));

            if (listsGet.length)
                templateGet.removeChild(listsGet);

            filterArray.items = [];

            for (let i = 0; i < filterModule.allArray.count; i++) {
                if ((`${filterModule.allArray.items[i].first_name} ${filterModule.allArray.items[i].last_name}`).match(regex)) {
                    filterArray.items.push(filterModule.allArray.items[i])
                }
            }

            templateGet.innerHTML = hbsGet(filterArray);
        })
    },

    filterAdded : function () {
        inputAdded.addEventListener('keyup', function () {
            console.log('filterAdded', filterModule.addedArray)
            let filterArray = [];
            let inputVal = inputGet.value;
            let regex = new RegExp(inputVal.split(' ').join('|'));

            if (listsGet.length)
                templateGet.removeChild(listsGet);

            filterArray.items = [];

            for (let i = 0; i < filterModule.addedArray.count; i++) {
                if ((`${filterModule.addedArray.items[i].first_name} ${filterModule.addedArray.items[i].last_name}`).match(regex)) {
                    filterArray.items.push(filterModule.addedArray.items[i])
                }
            }
            templateAdded.innerHTML = hbsAdded(filterArray);

            if (inputAdded.value.length == 0) {
                templateAdded.innerHTML = hbsAdded(filterModule.addedArray)
            }
        })
    },
    dropEvent : function () {
        let dragged, id;

        document.addEventListener("dragstart", function( event ) {
            // store a ref. on the dragged elem
            if (event.target.className == 'friends-filter__user') {
                dragged = event.target;
                id = event.target.id;
                console.log('-------------',event)
                // make it half transparent
                event.target.style.opacity = .1;
                event.dataTransfer.setData("text/plain", event.target.id);
            }

        }, false);
        document.addEventListener("dragend", function( event ) {
            // reset the transparency
            event.target.style.opacity = "";
        }, false);

        /* events fired on the drop targets */
        document.addEventListener("dragover", function( event ) {
            // prevent default to allow drop
            event.preventDefault();
        }, false);
        document.addEventListener("dragenter", function( event ) {
            // highlight potential drop target when the draggable element enters it
            // if ( event.target.id == "friends-filter__lists" ) {
            //     event.target.style.background = "purple";
            // }

            // console.log(event.target)
        }, false);

        document.addEventListener("dragleave", function( event ) {
            // reset background of potential drop target when the draggable element leaves it
            // if ( event.target.id == "friends-filter__lists" ) {
            //     event.target.style.background = "";
            // }

        }, false);

        document.addEventListener("drop", function( event ) {
            event.preventDefault();
            if (event.target.id == "friends-filter__lists" ) {
                event.target.style.background = "";

                filterModule.addedArray.items = [];
                dragged.parentNode.removeChild( dragged );
                event.target.appendChild( dragged );
                let tempArrayAll = filterModule.allArray.items;

                let removeItem =  tempArrayAll.filter( e => e.id != id);
                for (let i = 0; i < filterModule.allArray.count; i++) {
                    if ((`${filterModule.allArray.items[i].id} `).match(id)) {
                        filterModule.addedArray.items.push(filterModule.allArray.items[i])
                        filterModule.allArray.items = removeItem;
                        return false
                    }
                }
            }
        }, false);
    },

    findObject : function(array, key, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i][key] === Number(value)) {
                return array[i];
            }
        }
        return null;
    },

    buttonEvent : function () {
        let wrapper = document.querySelector('.friends-filter__blocks');
        wrapper.addEventListener('click', function (e) {
            if (e.target.closest('.friends-filter__user-cross-add')) {
                let elem =  e.target.closest('.friends-filter__user');
                let elemNumber = elem.getAttribute('data-id-user');
                if (!filterModule.addedArray.items) {
                    filterModule.addedArray.items = [];
                }

                let obj = filterModule.findObject(filterModule.allArray.items, 'id', elemNumber);
                filterModule.addedArray.items.push(obj);
                let removeItem =  filterModule.allArray.items.filter( e => e.id != elemNumber)
                filterModule.allArray.items = removeItem;
                templateAdded.innerHTML = '';
                templateGet.innerHTML = '';
                templateAdded.innerHTML = hbsAdded(filterModule.addedArray);
                templateGet.innerHTML = hbsGet(filterModule.allArray);
                return false
            }

            if (e.target.closest('.friends-filter__user-cross-remove')) {
                console.log('remove item')
                let elem =  e.target.closest('.friends-filter__user');
                let elemNumber = elem.getAttribute('data-id-user');
                let obj = filterModule.findObject(filterModule.addedArray.items, 'id', elemNumber);
                filterModule.allArray.items.push(obj);
                let removeItem =  filterModule.addedArray.items.filter( e => e.id != elemNumber);
                filterModule.addedArray.items = removeItem;
                templateAdded.innerHTML = '';
                templateGet.innerHTML = '';
                templateAdded.innerHTML = hbsAdded(filterModule.addedArray);
                templateGet.innerHTML = hbsGet(filterModule.allArray)
            }
        })
    },
    
    buttonSave : function () {
        let btn = document.querySelector('.friends-filter__footer-btn');
        btn.addEventListener('click', function () {
            let addedArray = JSON.stringify(filterModule.addedArray.items);
            let allArray = JSON.stringify(filterModule.allArray);
            localStorage.setItem("added", addedArray);
            localStorage.setItem("allFriends", allArray);

            alert('Coхранено!!')
        })
    }

};

window.onload = filterModule.init();
