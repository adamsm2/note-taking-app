export const OidcConfig = {
    authority: import.meta.env.VITE_REACT_APP_KEYCLOAK_URL + '/realms/app',
    client_id: 'note-taking-app',
    onSigninCallback: () => {
        window.history.replaceState(
            {},
            document.title,
            window.location.pathname
        )
    }
}