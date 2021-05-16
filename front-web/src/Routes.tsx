import { BrowserRouter, Route, Switch } from "react-router-dom";
import Catalog from "./Pages/Catalog";
import DetailsFilms from "./Pages/Catalog/Components/DetailsFilms";
import Home from "./Pages/Home";

function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/filmes" exact>
                    <Catalog />
                </Route>
                <Route path="/filmes/:filmeId">
                    <DetailsFilms />
                </Route>
                
            </Switch>
        </BrowserRouter>
    )
    
}

export default Routes;