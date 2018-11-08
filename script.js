class App {
    constructor() {
        this.listView = new ListView()
        this.userView = new UserView()
        this.notFoundView = new NotFoundView()
    }

    renderView(viewName, params) {
        switch (viewName) {
            case 'listView':
                this.listView.render()
                    .then(viewContent => this.render(viewContent))
                break

            case 'userView':
                this.userView.render(params.uid)
                    .then(viewContent => this.render(viewContent))
                break

            case 'notFoundView':
                this.render(this.notFoundView.render())
                break
        }

    }

    render(viewContent) {
        document.body.innerHTML = ''
        document.body.appendChild(viewContent)
    }
}

class ListView {
    render() {
        const promise = fetch('./data/user.json')
            .then(response => response.json())
            .then(data => {
                const div = document.createElement('div')

                data.forEach(user => {
                    const userDiv = document.createElement('div')
                    userDiv.innerHTML = user.name + " " + user.lastname
                    div.appendChild(userDiv)
                })
                return div
            })
        return promise
    }
}


class UserView {
    render(uid) {
        const promise = fetch(`./data/users/${uid}.json`)
            .then(response => response.json())
            .then(data => {
                const div = document.createElement('div')
                div.innerText = data.email
                return div
            })
        return promise
    }
}


class NotFoundView {
    render() {

        const div = document.createElement('div')
        div.innerText = 'NotFoundView'
        return div
    }
}

const app = new App()
app.renderView('listView')
app.renderView('userView', {uid: '1111'})