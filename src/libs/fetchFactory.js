export const fetchFactory = (url, entity) => {

    url = url + "/" + entity

    const _getHeaders = (token) => {
        return {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }

    return {

        get: (id, token) => {
            let newUrl = url
            if (id) newUrl = url + "/" + id
            return fetch(newUrl, {
                method: "GET",
                headers: _getHeaders(token)
            }).then(res =>

                res.headers.get("content-length") == "0" || res.headers.get("content-length") == null ? {} : res.json()
            )

        },

        post: (body, token) => {
            return fetch(url, {
                method: "POST",
                body: JSON.stringify(body),
                headers: _getHeaders(token)
            }).then(res =>
                res.headers.get("content-length") == "0" || res.headers.get("content-length") == null ? {} : res.json()
            )

        },

        put: (id, body, token) => {
            let newUrl = url + "/" + id
            return fetch(newUrl, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: _getHeaders(token)
            }).then(res =>
                res.headers.get("content-length") == "0" || res.headers.get("content-length") == null ? {} : res.json()
            )

        },


        patch: (id, body, token) => {
            let newUrl = url + "/" + id
            return fetch(newUrl, {
                method: "PATCH",
                body: JSON.stringify(body),
                headers: _getHeaders(token)
            }).then(res =>
                res.headers.get("content-length") == "0" || res.headers.get("content-length") == null ? {} : res.json()
            )

        },

        delete: (id, token) => {
            let newUrl = url + "/" + id
            return fetch(newUrl, {
                method: "DELETE",
                headers: _getHeaders(token)
            }).then(res =>
                res.headers.get("content-length") == "0" || res.headers.get("content-length") == null ? {} : res.json()
            )

        }
    }
}