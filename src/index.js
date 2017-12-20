VK.init({
    apiId: 6304461
});

function authVk() {
    return new Promise((resolve, reject) => {
        VK.Auth.login(data => {
            if (data.session) {
                resolve();
            } else {
                reject(new Error('Не удалось авторизоваться'));
            }
        }, 2);
    });
}

function callAPI(method, params) {
    params.v = '5.69';

    return new Promise((resolve, reject) => {
        VK.api(method, params, (data) => {
            if (data.error) {
                reject(data.error);
            } else {
                resolve(data.response);
            }
        });
    })
}
(async () => {
    try {
        await authVk();

        const [me] = await callAPI('users.get', { name_case : 'gen'});
        const headerInfo = document.querySelector('#headerInfo');
        headerInfo.textContent = `Друзья на странице ${me.first_name } ${me.last_name } `;

        const friends = await callAPI('friends.get', { fields : 'city, country, photo_100'});
        console.info(friends);

        const template = document.querySelector('#user-template').textContent;
        console.log(template)

        const render = Handlebars.compile(template);
        console.log(render)

        const html = render(friends);
        console.log(html)
        const results = document.querySelector('#results');
        results.innerHTML = html;
    } catch (e) {
        console.log(e)
    }

})();
// authVk()
//     .then(() => {
//         return callAPI('users.get', { fields: 'photo_100' })
//     })
//     .then((data) => {
//         const headerInfo = document.querySelector('#headerInfo');
//         headerInfo.textContent = `Друзьян на странице ${data[0].first_name }`;
//         console.log(data)
//     });