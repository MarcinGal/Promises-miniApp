class App {
    constructor() {
        this.listView = new ListView()
        this.userView = new UserView()
        this.notFoundView = new NotFoundView()
    }

    renderView(viewName) {
        switch (viewName) {
            case 'listView':
                this.render(this.listView.render())
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

        const div = document.createElement('div')
        div.innerText = 'ListView'
        return div
    }
}


class UserView {
    render() {

        const div = document.createElement('div')
        div.innerText = 'UserView'
        return div
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