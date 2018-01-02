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
        // localStorage.setItem("allFriends", allArray);
        // localStorage.setItem("added", addedArray);

        if ( localStorage.getItem("added") && localStorage.getItem("allArray")) {
            let returnAll = JSON.parse(localStorage.getItem("allArray"));
            let returnAdded = JSON.parse(localStorage.getItem("added"));

            templateGet.innerHTML = hbsGet(returnAll);
            templateAdded.innerHTML = hbsAdded(returnAdded)
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
        var col = document.querySelector('.friends-filter__user');
        var bin = document.querySelector('#friends-filter__lists');
        var eat = ['yum!', 'gulp', 'burp!', 'nom'];
        var yum = document.createElement('div');
        var msie = 0;
        // [].forEach.call(cols, function(col) {
            col.addEventListener('dragstart', handleDragStart, false);
        //     // col.addEventListener('dragenter', handleDragEnter, false)
            col.addEventListener('dragover', handleDragOver, false);
            col.addEventListener('dragleave', handleDragLeave, false);
        //     col.addEventListener('drop', handleDrop, false);
            col.addEventListener('dragend', handleDrop, false);
        // });
        let dragSrcEl = null;

        function handleDragStart(e) {
            console.log('start', this)
            // this.style.opacity = '0.4';  // this / e.target is the source node.
            dragSrcEl = this;
            e.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
            e.dataTransfer.setData('Text', this.id); // required otherwise doesn't work
        }

        function handleDragLeave(e) {
            this.className = '';

        }
        function handleDragOver (e) {
            if (e.preventDefault) e.preventDefault(); // allows us to drop
            this.className = 'over';
            e.dataTransfer.dropEffect = 'copy';
            return false;
        }

        function handleDrop(e) {
            if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting...why???
            let el = e.toElement.dataset.idUser;


            console.group()
            console.info(e)
            console.log(el)
            console.groupEnd()

            // el.parentNode.removeChild(el);
            //
            // stupid nom text + fade effect
            bin.className = '';
            // yum.innerHTML = eat[parseInt(Math.random() * eat.length)];

            // var y = yum.cloneNode(true);
            // bin.appendChild(y);

            // setTimeout(function () {
            //     let t = setInterval(function () {
            //         if (y.style.opacity <= 0) {
            //             if (msie) { // don't bother with the animation
            //                 y.style.display = 'none';
            //             }
            //             clearInterval(t);
            //         } else {
            //             y.style.opacity -= 0.1;
            //         }
            //     }, 50);
            // }, 250);

            return false;
        }
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
            console.log('click!!!!');
            let addedArray = JSON.stringify(filterModule.addedArray);
            let allArray = JSON.stringify(filterModule.allArray);
            localStorage.setItem("added", addedArray);
            localStorage.setItem("allFriends", allArray);
            console.log(typeof filterModule.addedArray)
            console.log(typeof filterModule.allArray)

            console.log(addedArray)
            // alert('Coхранено!!')
        })
    }

};

window.onload = filterModule.init();