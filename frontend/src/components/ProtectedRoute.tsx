import {Outlet} from "react-router-dom";
import {useAuth} from "react-oidc-context";
import Loading from "./Loading";

const ProtectedRoute = () => {
    const auth = useAuth()

    if (auth.isLoading) {
        return (
            <div style={{marginTop: "100px"}}>
                <Loading text="Za chwile zostaniesz przekierowany na stronę logowania..."/>
            </div>
        )
    } else if (!auth.isAuthenticated) {
        auth.signinRedirect({redirect_uri: window.location.href})
        return null
    }

    return <Outlet/>
}

export default ProtectedRoute;