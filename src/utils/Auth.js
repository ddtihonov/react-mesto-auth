class Auth {
    constructor({baseAuthUrl, headers }) {
        this.baseAuthUrl = baseAuthUrl;
        this.headers = headers
    };

    register(registerData) {
        return fetch(`${this.baseAuthUrl}/signup`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(registerData),
    })
        .then(this._checkError);
    }

    _checkError(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

const auth = new Auth({
    baseAuthUrl: 'https://auth.nomoreparties.co',
    headers: {'Content-Type': 'application/json'}
});

export default auth 

/*email: "p.luyda@yandex.ru"
_id: "619a262b96bdf2001aa94fc3"*/