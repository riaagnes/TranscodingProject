
const convertNetworkError = (err) => {
    return {
      code: "NETWORK-ERROR",
      err,
    };
  };

  const convertServiceError = (err) => Promise.reject(err);

  export const fetchLoginStatus = () => {
    return fetch("/session", {
      method: "GET",
    })
      .catch(convertNetworkError)
      .then((response) => {
        if (!response.ok) {
          return response.json().then(convertServiceError);
        }
        return response.json();
      });
  };

  export const fetchLogin = (username) => {
    return fetch("/session", {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify({ username }),
    })
      .catch(convertNetworkError)
      .then((response) => {
        if (!response.ok) {
          return response.json().then(convertServiceError);
        }
        return response.json();
      });
  };

export const initializeTranscoding = () => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/1/`, {
      method: "GET",
    })
      .catch(convertNetworkError)
      .then((response) => {
        if (!response.ok) {
          return response.json().then(convertServiceError);
        }
        return response.json();
      });
  };

  export const fetchVedio = (name) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`, {
      method: "GET",
    })
      .catch(convertNetworkError)
      .then((response) => {
        if (!response.ok) {
          return response.json().then(convertServiceError);
        }
        return response.json();
      });
  };