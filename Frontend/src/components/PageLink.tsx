import React from "react"
import { Link } from "react-router-dom";
import PageLinkProps from "../types/PageLinkProps.types";



const PageLink: React.FC<PageLinkProps> = ({ pageLink, text }) => {
    return (
        <div className="mt-2">
                <Link
                  to={pageLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-spotify-dark text-spotify-green p-2 rounded-lg inline-block hover:bg-spotify-green hover:text-spotify-dark transition-all duration-200"
                >
                  {text}
                </Link>
              </div>
    )
}

export default PageLink