import React from "react"
import ContentLoader from "react-content-loader"
import { generateList } from "../../../../Core/Utils/list";

const FilmCatalogLoad = () => {
    const loaderItems = generateList(4);

    return (
        <>
            {loaderItems.map(item => (
               <ContentLoader 
               key={item}
               speed={1}
               width={250}
               height={380}
               viewBox="0 0 250 380"
               backgroundColor="#ecebeb"
               foregroundColor="#6C6C6C"
               
             >
               <rect x="0" y="0" rx="10" ry="10" width="240" height="380" />
             </ContentLoader>
            ))}
        </>
    )
}

export default FilmCatalogLoad;