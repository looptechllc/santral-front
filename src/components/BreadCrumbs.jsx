import React from "react";
import { NavLink } from "react-router-dom";

const BreadCrumbs = ({ route, showHome, showCurrent }) => {
  const renderCrumbs = (route) => {
    return (
      <>
        {route.parent ? renderCrumbs(route.parent) : null}
        {renderCurrent(route)}
      </>
    );
  };

  const renderCurrent = (route) => {
    if (route.view === "Home" && !showHome) return null;
    if (route.view === "Products") {
      return renderProductCrumbs(route.category);
    }
    if (["ProductItem", "BlogItem"].includes(route.view)) {
      return showCurrent ? <span>{unescape(route.title)}</span> : null;
    }
    return (
      <p>
        <NavLink to={route.route} className="ui-link" exact>
          {unescape(route.title)}
        </NavLink>
      </p>
    );
  };

  const renderProductCrumbs = (category) => {
    return (
      <>
        {category.parent ? renderProductCrumbs(category.parent) : null}
        <p>
          <NavLink to={category.route} className="ui-link" exact>
            {unescape(category.title)}
          </NavLink>
        </p>
      </>
    );
  };

  return (
    <section className={"ui-breadcrumbs"}>
      {renderCrumbs(route)}
    </section>
  );
};

export default BreadCrumbs;
