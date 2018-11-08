class App {
    constructor() {
        this.listView = new ListView()
        this.userView = new UserView()
        this.notFoundView = new NotFoundView()
        this.init()
    }

    init() {
        this.renderView('listView')
    }

    renderView(viewName, params) {
        switch (viewName) {
            case 'listView':
                this.listView.render(this.renderView.bind(this))
                    .then(viewContent => this.render(viewContent))
                break

            case 'userView':
                this.userView.render(params.uid)
                    .then(viewContent => this.render(viewContent))
                    .catch(() => this.render(this.notFoundView.render()))
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
    render(renderView) {
        const promise = fetch('./data/user.json')
            .then(response => response.json())
            .then(data => {
                const div = document.createElement('div')

                data.forEach(user => {
                    const userDiv = document.createElement('div')
                    userDiv.innerHTML = user.name + " " + user.lastname
                    userDiv.addEventListener(
                        'click',
                        () => renderView('userView', { uid: user.uid })
                    )
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