import {useEffect, useState} from "react";
import axios from "axios";
import '../css/Shop.css';
import Cookies from "universal-cookie";
import ShopDisplay from "../display/ShopDisplay";

const Shop = (loggedUser) => {
    const [additions, setAdditions] = useState([]);
    const [roles, setRoles] = useState([]);

    const cookies = new Cookies();
    const token = cookies.get("accessToken");

    useEffect(() => {
        getRoles();
        getAdditions();
    }, []);

    const getRoles = () => {
        let token_deserialized = JSON.parse(localStorage.getItem("token"));
        if(token_deserialized != null) {
            setRoles(token_deserialized.userRoles.map(element => element.role));
        }
    }

    const getAdditions = () => {
        var config = {
            method: "get",
            url: `http://localhost:8080/additions`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        };
        axios(config)
            .then(function (response) {
                setAdditions(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <ShopDisplay additions={additions} roles={roles}/>
    )
}
export default Shop;