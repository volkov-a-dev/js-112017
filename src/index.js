const tempalteLists = require('../filter-lists.hbs');
console.log(tempalteLists)
const filterModule = {
    allArray : undefined,
    init: function () {
        let self = this;
        this.auth()
            .then(function() {
                self.getFriends('friends.get', { fields : 'city, country, photo_100' })
                    .then(function() {
                        console.log(self.allArray)
                        self.renderFriends();
                    })
            });
    },

    auth: function () {
        return new Promise((resolve, reject) => {
            console.log('auth', this)
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
        const left = tempalteLists(this.allArray)

        const template = document.querySelector('.test2');
        template.innerHTML = left;
    }
};

window.onload = filterModule.init();
// VK.init({
//     apiId: 6304461
// });
//
//
//
// function callAPI(method, params) {
//     params.v = '5.69';
//
//     return new Promise((resolve, reject) => {
//         VK.api(method, params, (data) => {
//             if (data.error) {
//                 reject(data.error);
//             } else {
//                 resolve(data.response);
//             }
//         });
//     })
// }
//
// (async () => {
//     try {
//         await authVk();
//
//         const [me] = await callAPI('users.get', { name_case : 'gen'});
//         const headerInfo = document.querySelector('#headerInfo');
//         headerInfo.textContent = `Друзья на странице ${me.first_name } ${me.last_name } `;
//
//         const friends = await callAPI('friends.get', { fields : 'city, country, photo_100' });
//         console.info('friends', friends);
//
//         const template = document.querySelector('#user-template').textContent;
//         console.log('template', template)
//
//         const render =  Handlebars.compile(template);
//         console.log('render', render)
//
//         const html = render(friends);
//         console.log('html', html)
//         const results = document.querySelector('#results');

//         results.innerHTML = html;
//     } catch (e) {
//         console.log(e)
//     }
//
// })();
