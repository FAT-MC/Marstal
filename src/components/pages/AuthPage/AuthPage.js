import React, { useEffect } from "react";
import {
  useSelector,
  useDispatch,
} from "react-redux";
import { useNavigate, useLocation } from "react-router-dom"
import { Dna } from "react-loader-spinner";
import { login } from "../../../redux/features/authSlice";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest } from "../../../utils/authConfig";
import "./AuthPage.css";

export function AuthPage() {
  const location = useLocation()
  const naviate = useNavigate()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  // const isAzureAuthenticated = useIsAuthenticated()
  const { instance, accounts, inProgress } = useMsal();

  useEffect(() => {
    const isAzureAuthenticated = accounts.length > 0;
    if (!isAzureAuthenticated && inProgress === InteractionStatus.None) {
      instance.loginRedirect(loginRequest).catch((e) => {
        console.log(e);
      });
    } else if (isAzureAuthenticated && inProgress === InteractionStatus.None) {
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then((response) => {
          console.log(response)
          dispatch(login(response.accessToken))
        });
    }

  }, [accounts, inProgress, instance])

  const redirectUser = () => {
    const redirectTo = location.state && location.state.redirectTo;
    naviate(redirectTo || "/home");
  }

  useEffect(() => {
    if (isAuthenticated) {
      console.log("authenticated");
      redirectUser()
    }
  }, [isAuthenticated, naviate])

  return (
    <div className="p-Authpage__container">
      <Dna
        visible={true}
        height="200"
        width="200"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  )
}