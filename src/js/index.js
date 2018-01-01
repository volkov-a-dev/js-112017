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
        filterModule.dragStart();
        filterModule.drapOver();
        filterModule.addedLists();
        filterModule.removeLists();
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
        if( localStorage.getItem("userGet")) {
            let returnObj = JSON.parse(localStorage.getItem("userGet"))
            console.log(returnObj)
            // const left = hbsGet(this.allArray);
            templateGet.innerHTML = hbsGet(returnObj);
        } else {
            let serialObj = JSON.stringify(this.allArray);
            localStorage.setItem("userGet", serialObj);
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
    dragStart : function () {
        document.addEventListener('dragstart', filterModule.handleDragStart.bind(this), false);
    },
    drapOver : function () {
        document.addEventListener('dragend', filterModule.handleDragOver.bind(this), false);
    },
    handleDragStart : function (elem) {
        // console.log('handleDragStart--------->', elem)
    },
    handleDragOver :function (elem) {
        // console.log('handleDragOver-----------::>', elem  )
        elem.preventDefault();
        let data = elem.dataTransfer.getData("text");
        // console.log('data--->>', data)
    },
    findObject : function(array, key, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i][key] === Number(value)) {
                return array[i];
            }
        }
        return null;
    },

    addedLists : function () {
        let btnAdd = document.querySelector('.friends-filter__items_get');
        btnAdd.addEventListener('click', function (e) {
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
                templateGet.innerHTML = hbsGet(filterModule.allArray)

                return false
            }

        })
    },

    removeLists : function () {
        let btnRemove = document.querySelector('#friends-filter__lists');
        btnRemove.addEventListener('click', function (e) {
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
    }

};

window.onload = filterModule.init();


// function drag(ev) {
//     ev.dataTransfer.setData("text", ev.target.id);
// }
//
// function drop(ev) {
//     ev.preventDefault();
//     var data = ev.dataTransfer.getData("text");
//     ev.target.appendChild(document.getElementById(data));
// }

// function findObjectByKey(array, key, value) {
//     for (var i = 0; i < array.length; i++) {
//         if (array[i][key] === value) {
//             return array[i];
//         }
//     }
//     return null;
// }
//
