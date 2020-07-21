import {
  REST_REQUEST,
  REST_UPDATE,
  REST_DELETE,
  REST_ADD,
  REST_PATCH

} from "./actions";

export const middleware = ({
  dispatch
}) => next => action => {
  if (action.type === REST_REQUEST) {
    const {
      RESTfetch,
      id,
      onSuccess,
      onError,
      token
    } = action.meta;

    RESTfetch.get(id, token)
      .then(data => {
        dispatch({
          type: onSuccess,
          payload: {
            send: id,
            receive: data
          }
        })
      })
      .catch(error => {
        dispatch({
          type: onError,
          payload: {
            send: id,
            receive: error
          }
        })
      });
  }

  if (action.type === REST_PATCH) {
    const {
      RESTfetch,
      id,
      body,
      onSuccess,
      onError,
      token
    } = action.meta;

    RESTfetch.patch(id, body, token)
      .then(data => {

        dispatch({
          type: onSuccess,
          payload: {
            send: {
              id: id,
              body: body
            },
            receive: data
          }
        })
      })
      .catch(error => {

        dispatch({
          type: onError,
          payload: {
            send: {
              id: id,
              body: body
            },
            receive: error
          }
        })
      });
  }


  if (action.type === REST_UPDATE) {
    const {
      RESTfetch,
      id,
      body,
      onSuccess,
      onError,
      token
    } = action.meta;

    RESTfetch.put(id, body, token)
      .then(data => {

        dispatch({
          type: onSuccess,
          payload: {
            send: {
              id: id,
              body: body
            },
            receive: data
          }
        })
      })
      .catch(error => {

        dispatch({
          type: onError,
          payload: {
            send: {
              id: id,
              body: body
            },
            receive: error
          }
        })
      });
  }



  if (action.type === REST_DELETE) {
    const {
      RESTfetch,
      id,
      onSuccess,
      onError,
      token
    } = action.meta;

    RESTfetch.delete(id, token)
      .then(data => {

        dispatch({
          type: onSuccess,
          payload: {
            send: id,
            receive: data
          }
        })
      })
      .catch(error => {

        dispatch({
          type: onError,
          payload: {
            send: id,
            receive: error
          }
        })
      });
  }

  if (action.type === REST_ADD) {
    const {
      RESTfetch,
      body,
      onSuccess,
      onError,
      token
    } = action.meta;

    RESTfetch.post(body, token)
      .then(data => {

        dispatch({
          type: onSuccess,
          payload: {
            send: body,
            receive: data
          }
        })
      })
      .catch(error => {

        dispatch({
          type: onError,
          payload: {
            send: body,
            receive: error
          }
        })
      });
  }
  return next(action);
};