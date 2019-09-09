const VK = window.VK;
export const auth = (appId, perms) => {
    return new Promise((resolve, reject) => {
        VK.init({
            apiId: appId
        });

        VK.Auth.login(response => {
            if (response.session) {
                resolve(response);
            } else {
                reject(new Error('Не удалось авторизоваться'));
            }
        }, perms);
    });
};

export const callAPI = (method, params) => {
    return new Promise((resolve, reject) => {
        VK.api(method, params, function(data) {
            if (data.error) {
                reject(data.error);
            } else {
                resolve(data.response);
            }
        });
    });
};
